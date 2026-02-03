import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Users, Shield, TreePine, GraduationCap, Heart, Edit, Check, X as XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { readESG, subscribeESG, writeESG, ESGCategory, ESGData } from "@/lib/esg";
import { getUser } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

const ICON_MAP: Record<string, any> = { Leaf, Users, Shield, TreePine, GraduationCap, Heart };

const COLOR_PRESETS: Record<string, string> = {
  Green: 'text-green-500',
  Blue: 'text-blue-500',
  Amber: 'text-amber-500',
  Black: 'text-black',
  Slate: 'text-slate-600',
};

const socialPrograms = [
  { icon: TreePine, title: "Program Lingkungan", desc: "Konservasi dan reboisasi" },
  { icon: GraduationCap, title: "BAGOES Class", desc: "Edukasi kelistrikan" },
  { icon: Heart, title: "CSR", desc: "Bantuan masyarakat" },
];

export const ESGSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const user = getUser();

  const s0 = readESG();
  const [data, setData] = useState<ESGData>(s0);

  useEffect(() => {
    const unsub = subscribeESG((next) => setData(next));
    return unsub;
  }, []);

  // header edit
  const [editingHeader, setEditingHeader] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [intro, setIntro] = useState(data.intro);

  useEffect(() => {
    setTitle(data.title);
    setIntro(data.intro);
  }, [data]);

  const saveHeader = () => {
    writeESG({ title, intro });
    toast({ title: "Disimpan", description: "Header ESG diperbarui" });
    setEditingHeader(false);
  };

  // category/item editing
  const [editingItem, setEditingItem] = useState<{cat: number; idx: number} | null>(null);
  const [editingItemValue, setEditingItemValue] = useState("");
  const [newItemValue, setNewItemValue] = useState("");

  // highlight editing state
  const [editingHighlightIdx, setEditingHighlightIdx] = useState<number | null>(null);
  const [editingHighlightValue, setEditingHighlightValue] = useState<string>("");
  const [editingHighlightUnit, setEditingHighlightUnit] = useState<string>("");
  const [editingHighlightLabel, setEditingHighlightLabel] = useState<string>("");
  const [newHighlightValue, setNewHighlightValue] = useState<string>("");
  const [newHighlightUnit, setNewHighlightUnit] = useState<string>("");
  const [newHighlightLabel, setNewHighlightLabel] = useState<string>("");

  // category editing state
  const [editingCategoryIdx, setEditingCategoryIdx] = useState<number | null>(null);
  const [editingCategoryValue, setEditingCategoryValue] = useState<string>("");
  const [editingCategoryIcon, setEditingCategoryIcon] = useState<string>("Leaf");
  const [editingCategoryColor, setEditingCategoryColor] = useState<string>(COLOR_PRESETS.Green);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [newCategoryIcon, setNewCategoryIcon] = useState<string>("Leaf");
  const [newCategoryColor, setNewCategoryColor] = useState<string>(COLOR_PRESETS.Green);

  const startEditItem = (cat: number, idx: number) => { setEditingItem({cat, idx}); setEditingItemValue(data.categories[cat].items[idx]); };
  const cancelEditItem = () => { setEditingItem(null); setEditingItemValue(""); };
  const saveEditItem = (cat: number, idx: number) => {
    const v = editingItemValue.trim(); if (!v) return;
    const next = JSON.parse(JSON.stringify(data));
    next.categories[cat].items[idx] = v;
    writeESG({ categories: next.categories });
    toast({ title: "Disimpan", description: "Item diperbarui" });
    setEditingItem(null);
  };

  const addItem = (cat: number) => {
    const v = newItemValue.trim(); if (!v) return;
    const next = JSON.parse(JSON.stringify(data));
    next.categories[cat].items.push(v);
    writeESG({ categories: next.categories });
    setNewItemValue("");
    toast({ title: "Ditambahkan", description: "Item baru ditambahkan" });
  };

  const removeItem = (cat: number, idx: number) => {
    if (!confirm('Hapus item ini?')) return;
    const next = JSON.parse(JSON.stringify(data));
    next.categories[cat].items.splice(idx,1);
    writeESG({ categories: next.categories });
    toast({ title: "Dihapus", description: "Item berhasil dihapus" });
  };

  // category handlers
  const startEditCategory = (idx: number) => { setEditingCategoryIdx(idx); setEditingCategoryValue(data.categories[idx].category); setEditingCategoryIcon(data.categories[idx].icon || 'Leaf'); setEditingCategoryColor(data.categories[idx].color || COLOR_PRESETS.Green); };
  const cancelEditCategory = () => { setEditingCategoryIdx(null); setEditingCategoryValue(""); setEditingCategoryIcon('Leaf'); setEditingCategoryColor(COLOR_PRESETS.Green); };
  const saveEditCategory = (idx: number) => {
    const v = editingCategoryValue.trim(); if (!v) return;
    const next = JSON.parse(JSON.stringify(data));
    next.categories[idx].category = v;
    next.categories[idx].icon = editingCategoryIcon || '';
    const colorClass = editingCategoryColor || COLOR_PRESETS.Green;
    next.categories[idx].color = colorClass;
    next.categories[idx].bgColor = (colorClass.replace('text-','bg-')) + '/10';
    writeESG({ categories: next.categories });
    setEditingCategoryIdx(null);
    setEditingCategoryValue("");
    setEditingCategoryIcon('Leaf');
    setEditingCategoryColor(COLOR_PRESETS.Green);
    toast({ title: "Disimpan", description: "Kategori diperbarui" });
  };

  const addCategory = () => {
    const v = newCategoryName.trim(); if (!v) return;
    const next = JSON.parse(JSON.stringify(data));
    const colorClass = newCategoryColor || COLOR_PRESETS.Green;
    next.categories.push({ category: v, items: [], icon: newCategoryIcon || '', color: colorClass, bgColor: (colorClass.replace('text-','bg-')) + '/10' });
    writeESG({ categories: next.categories });
    setNewCategoryName("");
    setNewCategoryIcon('Leaf');
    setNewCategoryColor(COLOR_PRESETS.Green);
    toast({ title: "Ditambahkan", description: "Kategori baru ditambahkan" });
  };

  const removeCategory = (idx: number) => {
    if (!confirm('Hapus kategori ini?')) return;
    const next = JSON.parse(JSON.stringify(data));
    next.categories.splice(idx,1);
    writeESG({ categories: next.categories });
    toast({ title: "Dihapus", description: "Kategori berhasil dihapus" });
  };



  const startEditHighlight = (idx: number) => {
    const h = data.highlights[idx];
    setEditingHighlightIdx(idx);
    setEditingHighlightValue(h?.value || "");
    setEditingHighlightUnit(h?.unit || "");
    setEditingHighlightLabel(h?.label || "");
  };
  const cancelEditHighlight = () => { setEditingHighlightIdx(null); setEditingHighlightValue(""); setEditingHighlightUnit(""); setEditingHighlightLabel(""); };
  const saveEditHighlight = (idx: number) => {
    const v = editingHighlightValue.trim(); if (!v) return;
    const next = JSON.parse(JSON.stringify(data));
    next.highlights[idx] = { value: v, unit: editingHighlightUnit.trim(), label: editingHighlightLabel.trim() };
    writeESG({ highlights: next.highlights });
    setEditingHighlightIdx(null);
    toast({ title: "Disimpan", description: "Highlight diperbarui" });
  };

  const addHighlight = () => {
    const v = newHighlightValue.trim(); if (!v) return;
    const next = JSON.parse(JSON.stringify(data));
    next.highlights.push({ value: v, unit: newHighlightUnit.trim(), label: newHighlightLabel.trim() });
    writeESG({ highlights: next.highlights });
    setNewHighlightValue(""); setNewHighlightUnit(""); setNewHighlightLabel("");
    toast({ title: "Ditambahkan", description: "Highlight baru ditambahkan" });
  };

  const removeHighlight = (idx: number) => {
    if (!confirm('Hapus highlight ini?')) return;
    const next = JSON.parse(JSON.stringify(data));
    next.highlights.splice(idx,1);
    writeESG({ highlights: next.highlights });
    toast({ title: "Dihapus", description: "Highlight berhasil dihapus" });
  };

  return (
    <section id="esg" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">{data.subtitle}</span>

          {user?.email === 'admin' ? (
            <div className="max-w-2xl mx-auto">
              {editingHeader ? (
                <>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 bg-transparent border rounded-md px-2 py-1 text-center" />
                  <textarea value={intro} onChange={(e) => setIntro(e.target.value)} className="w-full text-lg text-muted-foreground max-w-2xl mx-auto bg-transparent border rounded-md px-2 py-1 text-center" />
                  <div className="mt-3 flex justify-center gap-2">
                    <button onClick={saveHeader} className="px-3 py-2 rounded-md bg-green-600 text-white text-sm">Simpan</button>
                    <button onClick={() => { setEditingHeader(false); setTitle(data.title); setIntro(data.intro); }} className="px-3 py-2 rounded-md border text-sm">Batal</button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">{data.title.split(' ')[0]} <span className="text-gradient">{data.title.split(' ').slice(1).join(' ')}</span></h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{data.intro}</p>
                  <div className="mt-3">
                    <button onClick={() => setEditingHeader(true)} className="px-3 py-2 rounded-md border text-sm">Edit Header</button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">{data.title.split(' ')[0]} <span className="text-gradient">{data.title.split(' ').slice(1).join(' ')}</span></h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{data.intro}</p>
            </>
          )}
        </motion.div>

        {/* ESG Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {data.categories.map((esg, index) => {
            const Icon = (ICON_MAP[esg.icon as string] as any) || Leaf;
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
              className="relative p-6 rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${esg.bgColor || 'bg-slate-100'} flex items-center justify-center mb-6`}>
                <Icon className={`w-7 h-7 ${esg.color || 'text-green-500'}`} />
              </div>

              <div className="flex items-center justify-between mb-4">
                {editingCategoryIdx === index ? (
                  <div className="flex items-center gap-2 w-full">
                    <input value={editingCategoryValue} onChange={(e) => setEditingCategoryValue(e.target.value)} className="flex-1 rounded-md border px-3 py-2 text-sm" />
                    <select value={editingCategoryIcon} onChange={(e) => setEditingCategoryIcon(e.target.value)} className="rounded-md border px-3 py-2 text-sm text-black">
                      {Object.keys(ICON_MAP).map((k) => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                    <select value={editingCategoryColor} onChange={(e) => setEditingCategoryColor(e.target.value)} className="rounded-md border px-3 py-2 text-sm text-black">
                      {Object.entries(COLOR_PRESETS).map(([name, cls]) => (
                        <option key={name} value={cls}>{name}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-foreground">{esg.category}</h3>
                    {user?.email === 'admin' && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => startEditCategory(index)} className="p-1 rounded-md hover:bg-slate-100 text-sm">Edit</button>
                        <button onClick={() => removeCategory(index)} className="p-1 rounded-md hover:bg-slate-100 text-sm text-red-600">Hapus</button>
                        <button onClick={() => startEditItem(index, -1)} className="p-1 rounded-md hover:bg-slate-100 text-sm">Tambah Item</button>
                      </div>
                    )}
                  </>
                )}
              </div>

              <ul className="space-y-3">
                {esg.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                    {editingItem && editingItem.cat === index && editingItem.idx === i ? (
                      <div className="flex gap-2 flex-1">
                        <input value={editingItemValue} onChange={(e) => setEditingItemValue(e.target.value)} className="flex-1 rounded-md border px-3 py-2 text-sm" />
                        <button onClick={() => saveEditItem(index, i)} className="px-3 py-2 rounded-md bg-green-600 text-white text-sm">Simpan</button>
                        <button onClick={cancelEditItem} className="px-3 py-2 rounded-md border text-sm">Batal</button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm">{item}</span>
                        {user?.email === 'admin' && (
                          <div className="ml-auto flex items-center gap-2">
                            <button onClick={() => startEditItem(index, i)} className="text-sm text-slate-600">Edit</button>
                            <button onClick={() => removeItem(index, i)} className="text-sm text-red-600">Hapus</button>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                ))}

                {user?.email === 'admin' && (
                  <li>
                    <div className="flex gap-2">
                      <input value={newItemValue} onChange={(e) => setNewItemValue(e.target.value)} placeholder="Item baru" className="flex-1 rounded-md border px-3 py-2 text-sm" />
                      <button onClick={() => addItem(index)} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Tambah</button>
                    </div>
                  </li>
                )}
              </ul>

              {editingCategoryIdx === index && (
                <div className="absolute left-1/2 top-12 -translate-x-1/2 flex items-center gap-2 z-10">
                  <button onClick={() => saveEditCategory(index)} className="px-3 py-2 rounded-md bg-green-600 text-white text-sm">Simpan</button>
                  <button onClick={cancelEditCategory} className="px-3 py-2 rounded-md border text-sm">Batal</button>
                  <button onClick={() => removeCategory(index)} className="px-3 py-2 rounded-md border text-sm text-red-600">Hapus</button>
                </div>
              )}

            </motion.div>
          );
          })}
        </div>

        {user?.email === 'admin' && (
          <div className="mb-8 flex items-center gap-2">
            <input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Nama kategori baru (mis. Environmental)" className="flex-1 rounded-md border px-3 py-2 text-sm" />
            <select value={newCategoryIcon} onChange={(e) => setNewCategoryIcon(e.target.value)} className="rounded-md border px-3 py-2 text-sm text-black">
              {Object.keys(ICON_MAP).map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
            <select value={newCategoryColor} onChange={(e) => setNewCategoryColor(e.target.value)} className="rounded-md border px-3 py-2 text-sm text-black">
              {Object.entries(COLOR_PRESETS).map(([name, cls]) => (
                <option key={name} value={cls}>{name}</option>
              ))}
            </select>
            <button onClick={addCategory} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Tambah Kategori</button>
          </div>
        )}

        {/* Carbon Reduction Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative p-8 rounded-3xl hero-gradient overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_70%)]" />
          </div>
          
          <div className="relative grid md:grid-cols-3 gap-8 text-center">
            {data.highlights.map((h, idx) => (
              <div key={idx} className="relative">
                {editingHighlightIdx === idx ? (
                  <div className="space-y-2">
                    <input value={editingHighlightValue} onChange={(e) => setEditingHighlightValue(e.target.value)} className="w-full text-5xl font-bold text-primary-foreground mb-2 bg-transparent border rounded-md px-2 py-1 text-center" />
                    <input value={editingHighlightUnit} onChange={(e) => setEditingHighlightUnit(e.target.value)} className="w-full text-primary-foreground/80 bg-transparent border rounded-md px-2 py-1 text-center" />
                    <input value={editingHighlightLabel} onChange={(e) => setEditingHighlightLabel(e.target.value)} className="w-full text-sm text-primary-foreground/60 mt-1 bg-transparent border rounded-md px-2 py-1 text-center" />
                    <div className="flex justify-center gap-2 mt-2">
                      <button onClick={() => saveEditHighlight(idx)} className="px-3 py-2 rounded-md bg-green-600 text-white text-sm">Simpan</button>
                      <button onClick={cancelEditHighlight} className="px-3 py-2 rounded-md border text-sm">Batal</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-5xl font-bold text-primary-foreground mb-2">{h.value}</p>
                    <p className="text-primary-foreground/80">{h.unit}</p>
                    <p className="text-sm text-primary-foreground/60 mt-1">{h.label}</p>
                    {user?.email === 'admin' && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                        <button onClick={() => startEditHighlight(idx)} className="px-2 py-1 rounded-md border text-sm">Edit</button>
                        <button onClick={() => removeHighlight(idx)} className="px-2 py-1 rounded-md border text-sm text-red-600">Hapus</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {user?.email === 'admin' && (
              <div className="col-span-3 mt-6 flex justify-center items-center gap-2">
                <input value={newHighlightValue} onChange={(e) => setNewHighlightValue(e.target.value)} placeholder="Value" className="rounded-md border px-3 py-2 text-sm w-36 text-center" />
                <input value={newHighlightUnit} onChange={(e) => setNewHighlightUnit(e.target.value)} placeholder="Unit" className="rounded-md border px-3 py-2 text-sm w-36 text-center" />
                <input value={newHighlightLabel} onChange={(e) => setNewHighlightLabel(e.target.value)} placeholder="Label" className="rounded-md border px-3 py-2 text-sm w-48 text-center" />
                <button onClick={addHighlight} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Tambah</button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
