import { motion } from "framer-motion";
import { ChevronDown, Zap, Droplets, Leaf, Edit, Check, X } from "lucide-react";
import heroImage from "@/assets/fotobrantas.jpeg";
import { useEffect, useState } from "react";
import { readSettings, subscribeSettings, writeSettings } from "@/lib/settings";
import { getUser } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

export const HeroSection = () => {
  const s0 = readSettings();
  const [karyawan, setKaryawan] = useState<number>(s0.totalKaryawan);
  const [kapasitas, setKapasitas] = useState<string>(s0.kapasitasTerpasang || "286");
  const [plta, setPlta] = useState<number>(s0.totalPlta || 13);
  const [assetValue, setAssetValue] = useState<string>(s0.assetValue || "5.4T");

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [draftValue, setDraftValue] = useState<string>("");
  const [user, setUser] = useState<any>(() => getUser());

  useEffect(() => setUser(getUser()), []);

  useEffect(() => {
    const unsub = subscribeSettings((next) => {
      setKaryawan(next.totalKaryawan);
      setKapasitas(next.kapasitasTerpasang || "286");
      setPlta(next.totalPlta || 13);
      setAssetValue(next.assetValue || "5.4T");
    });
    return unsub;
  }, []);

  const startEdit = (key: string, current: string) => { setEditingKey(key); setDraftValue(current); };
  const cancelEdit = () => { setEditingKey(null); setDraftValue(""); };
  const saveEdit = (key: string) => {
    const v = draftValue.trim();
    if (!v) return toast({ title: 'Gagal', description: 'Nilai kosong' });

    if (key === 'kapasitas') {
      writeSettings({ kapasitasTerpasang: v });
    }
    if (key === 'plta') {
      const n = Number(v);
      if (Number.isNaN(n)) return toast({ title: 'Gagal', description: 'Masukkan angka untuk PLTA' });
      writeSettings({ totalPlta: n });
    }
    if (key === 'karyawan') {
      const n = Number(v);
      if (Number.isNaN(n)) return toast({ title: 'Gagal', description: 'Masukkan angka untuk Karyawan' });
      writeSettings({ totalKaryawan: n });
    }
    if (key === 'asset') {
      writeSettings({ assetValue: v });
    }

    toast({ title: 'Disimpan', description: 'Statistik berhasil diperbarui' });
    setEditingKey(null);
  };

  return (
    <section id="beranda" className="relative min-h-screen flex items-center justify-center overflow-hidden">      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Hydroelectric Power Plant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-85" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm font-medium">
              <Leaf className="w-4 h-4" />
              Energi Terbarukan untuk Indonesia
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-6"
          >
            Unit Pembangkitan
            <br />
            <span className="text-secondary">Brantas</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto"
          >
            Go Beyond Power, Energizing the Future
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-primary-foreground/70 mb-12 max-w-3xl mx-auto"
          >
            PT PLN Nusantara Power - Mengoperasikan 13 PLTA dengan total kapasitas 286 MW 
            yang tersebar di wilayah Jawa Timur untuk mendukung kelistrikan nasional.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto"
          >
            {/* dynamic karyawan value from settings with inline editing for admin */}
          {(() => {
            const stats = [
              { key: 'kapasitas', icon: Zap, value: kapasitas, unit: 'MW', label: 'Kapasitas Terpasang' },
              { key: 'plta', icon: Droplets, value: String(plta), unit: 'Unit', label: 'PLTA' },
              { key: 'karyawan', value: String(karyawan), unit: 'Orang', label: 'Karyawan' },
              { key: 'asset', value: assetValue, unit: 'T', label: 'Nilai Aset (Rp)' },
            ];

            return stats.map((stat, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 relative"
              >
                {user?.email === 'admin' && (
                  <div className="absolute top-3 right-3 flex gap-1">
                    {editingKey === stat.key ? (
                      <>
                        <button onClick={() => saveEdit(stat.key)} className="p-1 rounded-md bg-green-600 text-white"><Check className="w-4 h-4" /></button>
                        <button onClick={cancelEdit} className="p-1 rounded-md border"><X className="w-4 h-4" /></button>
                      </>
                    ) : (
                      <button onClick={() => startEdit(stat.key, stat.value)} className="p-1 rounded-md hover:bg-slate-100"><Edit className="w-4 h-4 text-slate-600" /></button>
                    )}
                  </div>
                )}

                <div className="text-3xl md:text-4xl font-bold text-primary-foreground">
                  {editingKey === stat.key ? (
                    <span className="inline-flex items-center gap-2">
                      <input value={draftValue} onChange={(e) => setDraftValue(e.target.value)} className="w-16 rounded-md border px-2 py-1 text-black" />
                      <span className="text-lg text-secondary">{stat.unit}</span>
                    </span>
                  ) : (
                    <>
                      {stat.value}
                      <span className="text-lg text-secondary">{stat.unit}</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-primary-foreground/70 mt-1">{stat.label}</p>
              </div>
            ));
          })()}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#tentang"
          className="flex flex-col items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
        >
          <span className="text-sm">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};
