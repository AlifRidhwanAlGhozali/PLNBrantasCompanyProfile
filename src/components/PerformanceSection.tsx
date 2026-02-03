import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Activity, Gauge, BarChart3, Edit, Check, X as XIcon } from "lucide-react";
import { readSettings, subscribeSettings, writeSettings } from "@/lib/settings";
import { getUser } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

// labels and descriptions are static, values come from settings
const performanceMeta = [
  { label: "EAF", description: "Equivalent Availability Factor", icon: Gauge },
  { label: "EFOR", description: "Equivalent Forced Outage Rate", icon: Activity },
  { label: "SOF", description: "Scheduled Outage Factor", icon: TrendingUp },
  { label: "Produksi", description: "Total Produksi Listrik", icon: BarChart3 },
];

const makeItemsFromSettings = (s: any) => [
  { label: "EAF", value: s.eaf, target: s.eafTarget, description: performanceMeta[0].description, icon: performanceMeta[0].icon, status: "above" },
  { label: "EFOR", value: s.efor, target: s.eforTarget, description: performanceMeta[1].description, icon: performanceMeta[1].icon, status: "below" },
  { label: "SOF", value: s.sof, target: s.sofTarget, description: performanceMeta[2].description, icon: performanceMeta[2].icon, status: "below" },
  { label: "Produksi", value: s.produksi, target: s.produksiTarget, description: performanceMeta[3].description, icon: performanceMeta[3].icon, status: "below" },
];


export const PerformanceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // state and hooks moved to top-level to avoid invalid hook calls inside render
  const s0 = readSettings();
  const [items, setItems] = useState(makeItemsFromSettings(s0));
  const user = getUser();

  // per-item inline edit
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [editTarget, setEditTarget] = useState<string>("");

  // global edit mode for all performance metrics
  const [globalEditing, setGlobalEditing] = useState<boolean>(false);
  const [globalEdits, setGlobalEdits] = useState<Array<{ value: string; target: string }>>(() =>
    makeItemsFromSettings(s0).map((i) => ({ value: String(i.value ?? ""), target: String(i.target ?? "") }))
  );

  // validation helper for percent fields
  const isPercent = (v: string) => /^\d+(\.\d+)?%$/.test(v.trim());

  const startGlobalEdit = () => {
    setGlobalEdits(makeItemsFromSettings(readSettings()).map((i) => ({ value: String(i.value ?? ""), target: String(i.target ?? "") })));
    setGlobalEditing(true);
  };

  const cancelGlobalEdit = () => {
    setGlobalEdits(makeItemsFromSettings(readSettings()).map((i) => ({ value: String(i.value ?? ""), target: String(i.target ?? "") })));
    setGlobalEditing(false);
  };

  const saveGlobalEdit = () => {
    // validate EAF (index 0) and EFOR (index 1) require percent format
    if (!isPercent(globalEdits[0].value)) return toast({ title: 'Format Salah', description: 'EAF harus berformat persen, mis. 98.07%' });
    if (!isPercent(globalEdits[1].value)) return toast({ title: 'Format Salah', description: 'EFOR harus berformat persen, mis. 0.01%' });

    writeSettings({
      eaf: globalEdits[0].value,
      eafTarget: globalEdits[0].target,
      efor: globalEdits[1].value,
      eforTarget: globalEdits[1].target,
      sof: globalEdits[2].value,
      sofTarget: globalEdits[2].target,
      produksi: globalEdits[3].value,
      produksiTarget: globalEdits[3].target,
    });

    setGlobalEditing(false);
    toast({ title: 'Disimpan', description: 'Semua metrik kinerja berhasil diperbarui' });
  };

  // certifications state
  const [certs, setCerts] = useState<string[]>(s0.certifications || []);
  const [editingCertIdx, setEditingCertIdx] = useState<number | null>(null);
  const [editingCertValue, setEditingCertValue] = useState<string>("");
  const [newCertValue, setNewCertValue] = useState<string>("");
  const [certNote, setCertNote] = useState<string>(s0.certificationsNote || "");
  const [editingNote, setEditingNote] = useState<boolean>(false);

  useEffect(() => {
    const unsub = subscribeSettings((next) => {
      setItems(makeItemsFromSettings(next));
      setCerts(next.certifications || []);
      setCertNote(next.certificationsNote || "");
    });
    return unsub;
  }, []);

  const startEditCert = (idx: number) => {
    setEditingCertIdx(idx);
    setEditingCertValue(certs[idx] || "");
  };

  const cancelEditCert = () => {
    setEditingCertIdx(null);
    setEditingCertValue("");
  };

  const saveEditCert = (idx: number) => {
    const v = editingCertValue.trim();
    if (!v) return;
    const next = [...certs];
    next[idx] = v;
    writeSettings({ certifications: next });
    setEditingCertIdx(null);
    setEditingCertValue("");
    toast({ title: "Disimpan", description: "Sertifikasi berhasil diperbarui" });
  };

  const addCertification = () => {
    const v = newCertValue.trim();
    if (!v) return;
    const next = [...certs, v];
    writeSettings({ certifications: next });
    setNewCertValue("");
    toast({ title: "Ditambahkan", description: "Sertifikasi berhasil ditambahkan" });
  };

  const removeCertification = (idx: number) => {
    if (!confirm("Hapus sertifikasi ini?")) return;
    const next = [...certs];
    next.splice(idx, 1);
    writeSettings({ certifications: next });
    toast({ title: "Dihapus", description: "Sertifikasi berhasil dihapus" });
  };

  const saveCertNote = () => {
    writeSettings({ certificationsNote: certNote });
    setEditingNote(false);
    toast({ title: "Disimpan", description: "Catatan sertifikasi berhasil diperbarui" });
  };

  const startEdit = (index: number) => {
    setEditingIdx(index);
    setEditValue(items[index].value ?? "");
    setEditTarget(items[index].target ?? "");
  };

  const cancelEdit = () => {
    setEditingIdx(null);
    setEditValue("");
    setEditTarget("");
  };

  const saveEdit = (index: number) => {
    if (index === 0) writeSettings({ eaf: editValue, eafTarget: editTarget });
    if (index === 1) writeSettings({ efor: editValue, eforTarget: editTarget });
    if (index === 2) writeSettings({ sof: editValue, sofTarget: editTarget });
    if (index === 3) writeSettings({ produksi: editValue, produksiTarget: editTarget });
    toast({ title: "Disimpan", description: `${items[index].label} berhasil diperbarui` });
    setEditingIdx(null);
  };

  return (
    <section id="kinerja" className="py-24 bg-muted/50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Kinerja Operasi
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Kinerja <span className="text-gradient">Tahun 2024</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pencapaian kinerja operasi yang melampaui target dengan standar keandalan tinggi
          </p>

          {user?.email === 'admin' && (
            <div className="mt-4 text-center">
              {!globalEditing ? (
                <button onClick={startGlobalEdit} className="px-3 py-2 rounded-md bg-primary text-white">Edit Kinerja (Semua)</button>
              ) : (
                <div className="inline-flex gap-2">
                  <button onClick={saveGlobalEdit} className="px-3 py-2 rounded-md bg-green-600 text-white">Simpan Semua</button>
                  <button onClick={cancelGlobalEdit} className="px-3 py-2 rounded-md border">Batal</button>
                </div>
              )}
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* dynamic items from settings, with inline editing for admin */}
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="relative p-6 rounded-2xl bg-card border border-border overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  item.status === "above" 
                    ? "bg-secondary/10 text-secondary" 
                    : "bg-primary/10 text-primary"
                }`}>
                  Target: {item.target}
                </span>
              </div>

              {globalEditing ? (
                <div className="space-y-2">
                  <input value={globalEdits[index]?.value} onChange={(e) => { const next = [...globalEdits]; next[index] = { ...next[index], value: e.target.value }; setGlobalEdits(next); }} className="w-full rounded-md border px-3 py-2 text-black" />
                  <input value={globalEdits[index]?.target} onChange={(e) => { const next = [...globalEdits]; next[index] = { ...next[index], target: e.target.value }; setGlobalEdits(next); }} className="w-full rounded-md border px-3 py-2" />
                </div>
              ) : editingIdx === index ? (
                <div className="space-y-2">
                  <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full rounded-md border px-3 py-2" />
                  <input value={editTarget} onChange={(e) => setEditTarget(e.target.value)} className="w-full rounded-md border px-3 py-2" />
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(index)} className="btn btn-primary px-3 py-2 rounded-md bg-green-600 text-white"><Check className="w-4 h-4" /></button>
                    <button onClick={cancelEdit} className="btn px-3 py-2 rounded-md border"><XIcon className="w-4 h-4" /></button>
                  </div>
                </div>
              ) : (
                <>
                  {user?.email === "admin" && (
                    <div className="absolute top-3 right-3">
                      <button onClick={() => startEdit(index)} className="p-1 rounded-md hover:bg-slate-100"><Edit className="w-4 h-4 text-slate-600" /></button>
                    </div>
                  )}
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{item.value}</h3>
                  <p className="text-lg font-semibold text-primary mb-1">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* ISO Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-card border border-border"
        >
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Sertifikasi Sistem Manajemen</h3>

          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {certs.map((cert, index) => (
              <div key={index} className="flex items-center gap-2">
                {editingCertIdx === index ? (
                  <div className="flex items-center gap-2">
                    <input value={editingCertValue} onChange={(e) => setEditingCertValue(e.target.value)} className="rounded-md border px-3 py-2 text-sm" />
                    <button onClick={() => saveEditCert(index)} className="px-3 py-2 rounded-md bg-green-600 text-white text-sm">Simpan</button>
                    <button onClick={cancelEditCert} className="px-3 py-2 rounded-md border text-sm">Batal</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="px-4 py-2 rounded-full bg-muted border border-border text-sm font-medium text-foreground">{cert}</span>
                    {user?.email === 'admin' && (
                      <div className="flex items-center gap-1">
                        <button onClick={() => startEditCert(index)} className="text-sm text-slate-600">Edit</button>
                        <button onClick={() => removeCertification(index)} className="text-sm text-red-600">Hapus</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {user?.email === 'admin' && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <input value={newCertValue} onChange={(e) => setNewCertValue(e.target.value)} placeholder="Sertifikasi baru" className="rounded-md border px-3 py-2 text-sm" />
              <button onClick={addCertification} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Tambah</button>
            </div>
          )}

          <div className="text-center">
            {editingNote ? (
              <div className="max-w-2xl mx-auto">
                <textarea value={certNote} onChange={(e) => setCertNote(e.target.value)} className="w-full rounded-md border px-3 py-2" rows={3} />
                <div className="flex justify-center gap-2 mt-2">
                  <button onClick={saveCertNote} className="px-3 py-2 rounded-md bg-green-600 text-white text-sm">Simpan</button>
                  <button onClick={() => { setEditingNote(false); setCertNote(s0.certificationsNote || ''); }} className="px-3 py-2 rounded-md border text-sm">Batal</button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-center text-muted-foreground mt-6">{certNote}</p>
                {user?.email === 'admin' && (
                  <div className="mt-4 flex justify-center">
                    <button onClick={() => setEditingNote(true)} className="px-3 py-2 rounded-md border text-sm">Edit Catatan</button>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
