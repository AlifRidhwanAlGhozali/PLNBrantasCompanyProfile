import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Target, Eye, Shield, Users, Edit, Check, X } from "lucide-react";
import { readSettings, subscribeSettings, writeSettings } from "@/lib/settings";
import { getUser } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

const features = [
  {
    icon: Target,
    title: "Blackstart Facility",
    description: "Fasilitas blackstart PLTA Sutami untuk mendukung pemulihan sistem kelistrikan",
  },
  {
    icon: Shield,
    title: "Zero Operator",
    description: "Operasi jarak jauh (remotely operated) dengan sistem kontrol modern",
  },
  {
    icon: Eye,
    title: "Free GOV & AGC",
    description: "PLTA Sutami dilengkapi dengan Free Governor dan Automatic Generation Control",
  },
  {
    icon: Users,
    title: "TMC GBG Facilities",
    description: "Fasilitas Trash Management Center untuk pengelolaan sampah waduk",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // settings-driven EAF / EFOR with admin inline edit
  const [eaf, setEaf] = useState<string>(readSettings().eaf);
  const [efor, setEfor] = useState<string>(readSettings().efor);
  useEffect(() => {
    const unsub = subscribeSettings((s) => { setEaf(s.eaf); setEfor(s.efor); });
    return unsub;
  }, []);

  const [user, setUser] = useState<any>(() => getUser());
  useEffect(() => setUser(getUser()), []);

  const [editing, setEditing] = useState<{ eaf: boolean; efor: boolean }>({ eaf: false, efor: false });
  const [draftEaf, setDraftEaf] = useState<string>(eaf);
  const [draftEfor, setDraftEfor] = useState<string>(efor);
  useEffect(() => setDraftEaf(eaf), [eaf]);
  useEffect(() => setDraftEfor(efor), [efor]);

  const isPercent = (v: string) => /^\d+(\.\d+)?%$/.test(v.trim());

  const startEdit = (key: 'eaf' | 'efor') => setEditing({ ...editing, [key]: true });
  const cancelEdit = (key: 'eaf' | 'efor') => {
    if (key === 'eaf') setDraftEaf(eaf);
    else setDraftEfor(efor);
    setEditing({ ...editing, [key]: false });
  };

  const saveEdit = (key: 'eaf' | 'efor') => {
    if (key === 'eaf') {
      if (!isPercent(draftEaf)) return toast({ title: 'Format Salah', description: 'EAF harus berformat persen, mis. 98.07%' });
      writeSettings({ eaf: draftEaf });
      toast({ title: 'Disimpan', description: 'EAF berhasil diperbarui' });
      setEditing({ ...editing, eaf: false });
      return;
    }

    if (key === 'efor') {
      if (!isPercent(draftEfor)) return toast({ title: 'Format Salah', description: 'EFOR harus berformat persen, mis. 0.01%' });
      writeSettings({ efor: draftEfor });
      toast({ title: 'Disimpan', description: 'EFOR berhasil diperbarui' });
      setEditing({ ...editing, efor: false });
      return;
    }
  };

  return (
    <section id="tentang" className="py-24 bg-muted/50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Tentang Kami
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Unit Pembangkitan{" "}
              <span className="text-gradient">Brantas</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              UP Brantas merupakan unit pembangkitan di bawah PT PLN Nusantara Power yang mengoperasikan 
              13 Pembangkit Listrik Tenaga Air (PLTA) yang tersebar di 4 kabupaten: Blitar, Tulungagung, 
              Madiun, dan Ponorogo.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Dengan total 28 unit dan kapasitas terpasang 286 MW, UP Brantas berkomitmen untuk 
              menyediakan energi listrik yang andal, bersih, dan berkelanjutan bagi masyarakat Indonesia.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-card border border-border relative">
                {user?.email === 'admin' && (
                  <div className="absolute top-3 right-3 flex gap-2 z-10">
                    {editing.eaf ? (
                      <>
                        <button onClick={() => saveEdit('eaf')} className="p-1 rounded-md bg-green-600 text-white"><Check className="w-4 h-4" /></button>
                        <button onClick={() => cancelEdit('eaf')} className="p-1 rounded-md border"><X className="w-4 h-4" /></button>
                      </>
                    ) : (
                      <button onClick={() => startEdit('eaf')} className="p-1 rounded-md hover:bg-slate-100"><Edit className="w-4 h-4 text-slate-600" /></button>
                    )}
                  </div>
                )}

                {editing.eaf ? (
                  <div className="space-y-2">
                    <input className="w-full rounded-md border px-3 py-2 text-black text-3xl font-bold" value={draftEaf} onChange={(e) => setDraftEaf(e.target.value)} />
                    <p className="text-sm text-muted-foreground">EAF (Ketersediaan)</p>
                  </div>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-primary">{eaf}</p>
                    <p className="text-sm text-muted-foreground">EAF (Ketersediaan)</p>
                  </>
                )}
              </div>

              <div className="p-4 rounded-xl bg-card border border-border relative">
                {user?.email === 'admin' && (
                  <div className="absolute top-3 right-3 flex gap-2 z-10">
                    {editing.efor ? (
                      <>
                        <button onClick={() => saveEdit('efor')} className="p-1 rounded-md bg-green-600 text-white"><Check className="w-4 h-4" /></button>
                        <button onClick={() => cancelEdit('efor')} className="p-1 rounded-md border"><X className="w-4 h-4" /></button>
                      </>
                    ) : (
                      <button onClick={() => startEdit('efor')} className="p-1 rounded-md hover:bg-slate-100"><Edit className="w-4 h-4 text-slate-600" /></button>
                    )}
                  </div>
                )}

                {editing.efor ? (
                  <div className="space-y-2">
                    <input className="w-full rounded-md border px-3 py-2 text-black text-3xl font-bold" value={draftEfor} onChange={(e) => setDraftEfor(e.target.value)} />
                    <p className="text-sm text-muted-foreground">EFOR (Gangguan)</p>
                  </div>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-secondary">{efor}</p>
                    <p className="text-sm text-muted-foreground">EFOR (Gangguan)</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Content - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
