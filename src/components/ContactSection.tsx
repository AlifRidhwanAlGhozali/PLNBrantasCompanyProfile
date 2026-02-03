import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, Phone, Globe, Mail, Edit, Check, X } from "lucide-react";
import { readSettings, subscribeSettings, writeSettings } from "@/lib/settings";
import { getUser } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [contact, setContact] = useState(() => readSettings().contact);
  useEffect(() => {
    const unsub = subscribeSettings((s) => setContact(s.contact));
    return unsub;
  }, []);

  const [user, setUser] = useState<any>(() => getUser());
  useEffect(() => setUser(getUser()), []);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(contact);

  useEffect(() => setDraft(contact), [contact]);

  const startEdit = () => setEditing(true);
  const cancelEdit = () => { setDraft(contact); setEditing(false); };
  const saveEdit = () => {
    writeSettings({ contact: draft });
    toast({ title: 'Disimpan', description: 'Informasi kontak berhasil disimpan' });
    setEditing(false);
  };

  return (
    <section id="kontak" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Hubungi Kami
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Informasi <span className="text-gradient">Kontak</span>
          </h2>
        </motion.div>

        {/* admin edit controls */}
        {user?.email === 'admin' && (
          <div className="text-center mb-6">
            {!editing ? (
              <button onClick={startEdit} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-white"><Edit className="w-4 h-4" /> Edit Kontak</button>
            ) : (
              <div className="inline-flex gap-2">
                <button onClick={saveEdit} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-white"><Check className="w-4 h-4" /> Simpan</button>
                <button onClick={cancelEdit} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border"><X className="w-4 h-4" /> Batal</button>
              </div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* PT PLN Nusantara Power */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">PT PLN Nusantara Power</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Kantor Pusat</p>
                  {editing ? (
                    <textarea className="w-full rounded-md border px-3 py-2 text-sm text-black" rows={3} value={draft.companyAddress} onChange={(e) => setDraft({ ...draft, companyAddress: e.target.value })} />
                  ) : (
                    <p className="text-sm text-muted-foreground" style={{ whiteSpace: 'pre-line' }}>{contact.companyAddress}</p>
                  )} 
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Telepon</p>
                  {editing ? (
                    <input className="w-full rounded-md border px-3 py-2 text-sm text-black" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  )} 
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Website</p>
                  {editing ? (
                    <input className="w-full rounded-md border px-3 py-2 text-sm text-black" value={draft.website} onChange={(e) => setDraft({ ...draft, website: e.target.value })} />
                  ) : (
                    <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">{contact.website.replace(/^https?:\/\//, '')}</a>
                  )} 
                </div>
              </div>
            </div>
          </motion.div>

          {/* UP Brantas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl hero-gradient text-primary-foreground"
          >
            <h3 className="text-xl font-bold mb-6">Unit Pembangkitan Brantas</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Wilayah Kerja</p>
                  {editing ? (
                    <textarea className="w-full rounded-md border px-3 py-2 text-sm text-black" rows={3} value={draft.unitRegion} onChange={(e) => setDraft({ ...draft, unitRegion: e.target.value })} />
                  ) : (
                    <p className={"text-sm " + (editing ? "text-black" : "text-primary-foreground/80")} style={{ whiteSpace: 'pre-line' }}>{contact.unitRegion}</p>
                  )} 
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Pelanggan</p>
                  {editing ? (
                    <textarea className="w-full rounded-md border px-3 py-2 text-sm text-black" rows={2} value={draft.unitCustomer} onChange={(e) => setDraft({ ...draft, unitCustomer: e.target.value })} />
                  ) : (
                    <p className={"text-sm " + (editing ? "text-black" : "text-primary-foreground/80")} style={{ whiteSpace: 'pre-line' }}>{contact.unitCustomer}</p>
                  )} 
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-primary-foreground/20">
                <p className={"text-sm " + (editing ? "text-black" : "text-primary-foreground/80")}>Network System</p>
                {editing ? (
                  <input className="w-full rounded-md border px-3 py-2 text-sm font-semibold text-black" value={draft.networkSystem} onChange={(e) => setDraft({ ...draft, networkSystem: e.target.value })} />
                ) : (
                  <p className={"font-semibold " + (editing ? "text-black" : "text-primary-foreground")}>{contact.networkSystem}</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
