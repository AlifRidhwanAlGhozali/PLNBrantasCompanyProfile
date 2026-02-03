import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Award, Trophy, Medal, Star, Edit, Trash2, Plus, Check, X } from "lucide-react";
import { readSettings, subscribeSettings, writeSettings } from "@/lib/settings";
import { getUser } from "@/lib/auth";

const ICONS = { Trophy, Award, Medal, Star } as const;

export const AwardsSection = () => {
  const [awards, setAwards] = useState(() => readSettings().awards || []);
  useEffect(() => {
    const unsub = subscribeSettings((s) => setAwards(s.awards || []));
    return unsub;
  }, []);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // admin state for inline editing
  const [user, setUser] = useState<any>(() => getUser());
  useEffect(() => setUser(getUser()), []);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState({ title: "", category: "", description: "", icon: "Trophy" });

  const startEdit = (i: number) => {
    setEditIndex(i);
    const a = awards[i] || { title: "", category: "", description: "", icon: "Trophy" };
    setDraft({ ...a });
  };
  const cancelEdit = () => { setEditIndex(null); setDraft({ title: "", category: "", description: "", icon: "Trophy" }); };
  const saveEdit = (i: number) => {
    const next = [...awards];
    next[i] = { ...draft };
    setAwards(next);
    writeSettings({ awards: next });
    setEditIndex(null);
  };
  const deleteAwardInline = (i: number) => {
    if (!confirm('Hapus penghargaan ini?')) return;
    const next = awards.filter((_, idx) => idx !== i);
    setAwards(next);
    writeSettings({ awards: next });
  };
  const addAwardInline = () => {
    const next = [...awards, { title: 'Judul baru', category: 'Kategori', description: '', icon: 'Trophy' }];
    setAwards(next);
    writeSettings({ awards: next });
    setEditIndex(next.length - 1);
    setDraft(next[next.length - 1]);
  };

  return (
    <section id="penghargaan" className="py-24 bg-muted/50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-6">
            Prestasi & Penghargaan
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Rekam Jejak <span className="text-gradient">Keunggulan</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pengakuan atas komitmen kami dalam keandalan operasi, keselamatan, dan keberlanjutan
          </p>

          {/* admin add button */}
          {user?.email === 'admin' && (
            <div className="mt-4">
              <button onClick={addAwardInline} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-white">
                <Plus className="w-4 h-4" />
                Tambah Penghargaan
              </button>
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-accent/30 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

              {/* admin controls */}
              {user?.email === 'admin' && (
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                  <button onClick={() => startEdit(index)} className="p-1 rounded bg-muted/80 hover:bg-muted"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => deleteAwardInline(index)} className="p-1 rounded bg-destructive/80 hover:bg-destructive"><Trash2 className="w-4 h-4" /></button>
                </div>
              )}

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  {(() => {
                    const Icon = (ICONS as any)[award.icon] ?? Trophy;
                    return <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />;
                  })()}
                </div>

                {editIndex === index ? (
                  <div className="space-y-3">
                    <input className="w-full rounded-md border px-3 py-2" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Judul" />
                    <input className="w-full rounded-md border px-3 py-2" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} placeholder="Kategori" />
                    <input className="w-full rounded-md border px-3 py-2" value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} placeholder="Icon (Trophy/Award/Medal/Star)" />
                    <input className="w-full rounded-md border px-3 py-2" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="Deskripsi" />
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(index)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-white"><Check className="w-4 h-4" /> Simpan</button>
                      <button onClick={cancelEdit} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border"><X className="w-4 h-4" /> Batal</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                      {award.category}
                    </span>

                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {award.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{award.description}</p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
