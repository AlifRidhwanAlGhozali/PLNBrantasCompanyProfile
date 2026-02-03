import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Briefcase, Building2, Zap, Wrench, DollarSign, ShieldCheck, MapPin } from "lucide-react";

// organization now stored in localStorage with CRUD helpers
import {
  readOrg,
  subscribeOrg,
  addDivision,
  removeDivision,
  addPosition,
  removePosition,
  updateDivisionName,
  updateDivisionColor,
  updateDivisionIcon,
  addStaff,
  removeStaff,
  updateStaff,
  addUnit,
  removeUnit,
} from "@/lib/org";

// icon key -> component map (icons imported at top)
const ICON_MAP: Record<string, any> = { Zap, Wrench, DollarSign, ShieldCheck, Building2, MapPin };

// a list of available icon keys for admin selects
const ICON_KEYS = Object.keys(ICON_MAP);

import { useEffect, useState } from "react";
import { readSettings, subscribeSettings, writeSettings } from "@/lib/settings";
import { getUser } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";
import { Edit, Check, X as XIcon } from "lucide-react";

const initialSettings = readSettings();

const stats = [
  { 
    icon: Users, 
    label: "Total Karyawan",
    colorHex: "#2563EB", 
    bgHex: "#EFF6FF",    
    shadowColor: "rgba(37, 99, 235, 0.2)"
  },
  { 
    icon: Briefcase, 
    label: "Assistant Manager",
    colorHex: "#D97706", 
    bgHex: "#FFFBEB",    
    shadowColor: "rgba(217, 119, 6, 0.2)"
  },
  { 
    icon: Building2, 
    label: "Karyawan Fungsional",
    colorHex: "#059669", 
    bgHex: "#ECFDF5",    
    shadowColor: "rgba(5, 150, 105, 0.2)"
  },
];


export const OrganizationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // org state from storage
  const [org, setOrg] = useState(readOrg());
  const user = getUser();

  useEffect(() => {
    const unsub = subscribeOrg((next) => setOrg(next));
    return unsub;
  }, []);

  // helpers for adding/removing divisions/positions/staff/units (admin only)
  const [newDivisionName, setNewDivisionName] = useState("");
  const [newDivisionIcon, setNewDivisionIcon] = useState<string>("Zap");
  const [newDivisionColor, setNewDivisionColor] = useState<string>("#1F2937");
  const [newPositionValue, setNewPositionValue] = useState<string>("");
  const [editingDivisionIdx, setEditingDivisionIdx] = useState<number | null>(null);
  const [editingDivisionName, setEditingDivisionName] = useState<string>("");
  const [newStaffName, setNewStaffName] = useState("");
  const [editingStaffIdx, setEditingStaffIdx] = useState<number | null>(null);
  const [editingStaffValue, setEditingStaffValue] = useState<string>("");
  const [newUnitName, setNewUnitName] = useState("");
  const [newUnitDesc, setNewUnitDesc] = useState("");

  const handleAddDivision = () => {
    if (!newDivisionName.trim()) return;
    addDivision(newDivisionName.trim(), newDivisionIcon, newDivisionColor);
    setNewDivisionName("");
    setNewDivisionIcon("Zap");
    setNewDivisionColor("#1F2937");
    toast({ title: "Ditambahkan", description: "Divisi baru berhasil ditambahkan" });
  };

  const handleRemoveDivision = (idx: number) => {
    if (!confirm("Hapus divisi ini?")) return;
    removeDivision(idx);
    toast({ title: "Dihapus", description: "Divisi berhasil dihapus" });
  };

  const handleAddPosition = (divIdx: number) => {
    if (!newPositionValue.trim()) return;
    addPosition(divIdx, newPositionValue.trim());
    setNewPositionValue("");
    toast({ title: "Ditambahkan", description: "Posisi berhasil ditambahkan" });
  };

  const handleRemovePosition = (divIdx: number, posIdx: number) => {
    if (!confirm("Hapus posisi ini?")) return;
    removePosition(divIdx, posIdx);
    toast({ title: "Dihapus", description: "Posisi berhasil dihapus" });
  };

  const startEditDivision = (idx: number) => {
    setEditingDivisionIdx(idx);
    setEditingDivisionName(org.divisions[idx].name);
  };

  const saveEditDivision = (idx: number) => {
    updateDivisionName(idx, editingDivisionName.trim() || org.divisions[idx].name);
    setEditingDivisionIdx(null);
    setEditingDivisionName("");
    toast({ title: "Disimpan", description: "Nama divisi diperbarui" });
  };

  const handleUpdateDivisionColor = (divIdx: number, color: string) => {
    updateDivisionColor(divIdx, color);
    toast({ title: "Disimpan", description: "Warna divisi diperbarui" });
  };

  const handleUpdateDivisionIcon = (divIdx: number, icon: string) => {
    updateDivisionIcon(divIdx, icon);
    toast({ title: "Disimpan", description: "Ikon divisi diperbarui" });
  };


  const handleAddStaff = () => {
    if (!newStaffName.trim()) return;
    addStaff(newStaffName.trim());
    setNewStaffName("");
    toast({ title: "Ditambahkan", description: "Staff berhasil ditambahkan" });
  };

  const handleRemoveStaff = (idx: number) => {
    if (!confirm("Hapus staff ini?")) return;
    removeStaff(idx);
    toast({ title: "Dihapus", description: "Staff berhasil dihapus" });
  };

  const startEditStaff = (idx: number) => {
    setEditingStaffIdx(idx);
    setEditingStaffValue(org.staff[idx] || "");
  };

  const cancelEditStaff = () => {
    setEditingStaffIdx(null);
    setEditingStaffValue("");
  };

  const saveEditStaff = (idx: number) => {
    const val = editingStaffValue.trim();
    if (!val) return;
    updateStaff(idx, val);
    setEditingStaffIdx(null);
    setEditingStaffValue("");
    toast({ title: "Disimpan", description: "Staff berhasil diperbarui" });
  };

  const handleAddUnit = () => {
    if (!newUnitName.trim()) return;
    addUnit(newUnitName.trim(), newUnitDesc.trim() || undefined);
    setNewUnitName("");
    setNewUnitDesc("");
    toast({ title: "Ditambahkan", description: "Unit berhasil ditambahkan" });
  };

  const handleRemoveUnit = (idx: number) => {
    if (!confirm("Hapus unit ini?")) return;
    removeUnit(idx);
    toast({ title: "Dihapus", description: "Unit berhasil dihapus" });
  };


  // dynamic settings state (subscribe to changes made from Admin)
  const [vals, setVals] = useState(initialSettings);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  useEffect(() => {
    const unsub = subscribeSettings((next) => setVals(next));
    return unsub;
  }, []);

  const startEditing = (index: number) => {
    setEditingIdx(index);
    const mapping = [String(vals.totalKaryawan), String(vals.assistantManager), String(vals.karyawanFungsional)];
    setEditValue(mapping[index] ?? "");
  };

  const cancelEditing = () => {
    setEditingIdx(null);
    setEditValue("");
  };

  const saveEditing = (index: number) => {
    const valNum = Number(editValue) || 0;
    if (index === 0) writeSettings({ totalKaryawan: valNum });
    if (index === 1) writeSettings({ assistantManager: valNum });
    if (index === 2) writeSettings({ karyawanFungsional: valNum });
    toast({ title: "Disimpan", description: "Perubahan berhasil disimpan" });
    setEditingIdx(null);
  }; 

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const lineStyle = { backgroundColor: 'black', opacity: 1 };

  return (
    <section className="py-24 bg-white text-slate-900 overflow-hidden" ref={ref}>
       
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full blur-3xl opacity-40" style={{ backgroundColor: '#EFF6FF' }}></div>
          <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full blur-3xl opacity-40" style={{ backgroundColor: '#FFFBEB' }}></div>
       </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
          style={{ paddingBottom: '140px' }} 
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold tracking-wide mb-6" style={{ color: '#2563EB' }}>
            <Zap className="w-4 h-4" style={{ fill: '#2563EB' }} />
            STRUKTUR ORGANISASI
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Tim <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Profesional</span> & Berdedikasi
          </h2>
          
          <div className="relative inline-block">
             <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto relative z-10">
                Berdasarkan <strong>Perdir No. 0033.P/DIR/2024</strong> tentang Susunan Organisasi PT PLN Nusantara Power Unit Pembangkitan Brantas
             </p>
             <div className="absolute bottom-0 left-1/4 right-1/4 h-3 -z-0 rounded-full blur-sm" style={{ backgroundColor: 'rgba(253, 224, 71, 0.3)' }}></div>
          </div>
        </motion.div>

        {/* --- STATS SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          style={{ marginBottom: '120px', marginTop: '20px' }}
        >
          {/* Hook-based state for settings (top-level in component) */}
          {/* (moved out of render so hooks rules are respected) */}
          {/* state initialization */}
          {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
          {(() => null)()}

          {/* We'll render using local state values */}
          {(() => {
            const mapVals = [vals.totalKaryawan, vals.assistantManager, vals.karyawanFungsional];
            return stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="relative bg-white rounded-2xl p-8 shadow-xl border border-slate-100 group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: stat.colorHex }}></div>
                
                <stat.icon 
                  className="absolute -right-6 -bottom-6 w-32 h-32 transition-transform duration-500 group-hover:scale-110" 
                  style={{ color: stat.colorHex, opacity: 0.05 }} 
                />

                <div className="relative z-10 flex flex-col items-center">
                   <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:rotate-6"
                      style={{ backgroundColor: stat.bgHex }}
                   >
                      <stat.icon className="w-8 h-8" style={{ color: stat.colorHex }} />
                   </div>
                   
                   {editingIdx === index ? (
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-28 rounded-md border px-2 py-1 text-3xl font-black text-slate-800"
                        />
                        <button onClick={() => saveEditing(index)} className="p-2 rounded-md bg-green-600 text-white">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={cancelEditing} className="p-2 rounded-md border">
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                   ) : (
                      <>
                        {user?.email === "admin" && (
                          <div className="absolute top-3 right-3">
                            <button onClick={() => startEditing(index)} className="p-1 rounded-md hover:bg-slate-100">
                              <Edit className="w-4 h-4 text-slate-600" />
                            </button>
                          </div>
                        )}
                        <h3 className="text-5xl font-black text-slate-800 mb-2 tracking-tight">{mapVals[index]}</h3>
                      </>
                   )}
                   
                   <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                      {stat.label}
                   </p>
                </div>
              </motion.div>
            ));
          })()}
        </motion.div>

        {/* ORGANIZATION CHART START */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-[1400px] mx-auto relative"
        >
          {/* LEVEL 1: SENIOR MANAGER */}
          <div className="flex justify-center relative z-10" style={{ marginBottom: '120px' }}>
            <div className="absolute left-1/2 w-[2px] -translate-x-1/2" style={{ ...lineStyle, top: '100%', height: '60px' }}></div>
            <motion.div 
                variants={itemVariants} 
                className="p-6 rounded-2xl text-white text-center min-w-[240px] shadow-lg z-10 relative"
                style={{ backgroundColor: '#10B981' }} 
            >
              <p className="font-bold text-xl">Senior Manager</p>
              <p className="text-sm text-white/90 mt-1">Tim Manajemen (1 Orang)</p>
            </motion.div>
          </div>

          {/* LEVEL 2: MANAGERS & STAFF */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 relative z-10">
             <div className="hidden lg:block absolute h-[2px]" style={{ ...lineStyle, top: '-60px', left: '12.5%', right: '12.5%' }}></div>
             
             <div className="hidden lg:block absolute w-[2px]" style={{ ...lineStyle, top: '-60px', height: '60px', left: '12.5%' }}></div>
             <div className="hidden lg:block absolute w-[2px]" style={{ ...lineStyle, top: '-60px', height: '60px', left: '37.5%' }}></div>
             <div className="hidden lg:block absolute w-[2px]" style={{ ...lineStyle, top: '-60px', height: '60px', left: '62.5%' }}></div>
             <div className="hidden lg:block absolute w-[2px]" style={{ ...lineStyle, top: '-60px', height: '60px', left: '87.5%' }}></div>
             
             <div className="lg:hidden absolute left-1/2 w-[2px] -translate-x-1/2" style={{ ...lineStyle, top: '-60px', height: '60px' }}></div>

            {/* DIVISI (dynamic) */}
            {org.divisions.map((division, divIndex) => {
              const Icon = ICON_MAP[division.icon || 'Zap'] || Zap;
              return (
                <motion.div key={divIndex} variants={itemVariants} className="space-y-4 flex flex-col items-center">
                  <div 
                      className="w-full p-4 rounded-xl text-white text-center shadow-md relative group min-h-[80px] flex flex-col justify-center items-center"
                      style={{ backgroundColor: division.bgColor || '#111827' }}
                  >
                    <div className="flex flex-col items-center gap-2 mb-1">
                      <div className="flex items-center justify-center gap-2">
                        <Icon className="w-5 h-5 text-white" />
                        <h3 className="font-bold text-lg leading-tight">{division.name}</h3>
                      </div>

                      {user?.email === 'admin' && (
                        <div className="flex flex-wrap items-center gap-2 justify-center mt-1">
                          {editingDivisionIdx === divIndex ? (
                            <>
                              <input value={editingDivisionName} onChange={(e) => setEditingDivisionName(e.target.value)} className="rounded-md px-2 py-1 text-sm text-black" />
                              <select
                                value={division.icon || 'Zap'}
                                onChange={(e) => handleUpdateDivisionIcon(divIndex, e.target.value)}
                                title="Ubah ikon divisi"
                                className="rounded-md border bg-white text-black text-sm py-1 px-2"
                                aria-label="Ubah ikon divisi"
                                style={{ color: '#000' }}
                              >
                                {ICON_KEYS.map((k) => (
                                  <option key={k} value={k}>{k}</option>
                                ))}
                              </select>
                              <input
                                type="color"
                                value={division.bgColor || '#111827'}
                                onChange={(e) => handleUpdateDivisionColor(divIndex, e.target.value)}
                                title="Ubah warna divisi"
                                className="w-8 h-8 rounded-full border-0 p-0"
                                aria-label="Ubah warna divisi"
                              />
                              <button onClick={() => saveEditDivision(divIndex)} className="ml-2 px-2 py-1 rounded bg-green-600 text-white text-sm">Simpan</button>
                              <button onClick={() => { setEditingDivisionIdx(null); setEditingDivisionName(''); }} className="ml-1 px-2 py-1 rounded border text-sm">Batal</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => startEditDivision(divIndex)} className="p-1 rounded hover:bg-white/10 text-sm">Edit</button>
                              <select
                                value={division.icon || 'Zap'}
                                onChange={(e) => handleUpdateDivisionIcon(divIndex, e.target.value)}
                                title="Ubah ikon divisi"
                                className="rounded-md border bg-white text-black text-sm py-1 px-2"
                                aria-label="Ubah ikon divisi"
                                style={{ color: '#000' }}
                              >
                                {ICON_KEYS.map((k) => (
                                  <option key={k} value={k}>{k}</option>
                                ))}
                              </select>
                              <input
                                type="color"
                                value={division.bgColor || '#111827'}
                                onChange={(e) => handleUpdateDivisionColor(divIndex, e.target.value)}
                                title="Ubah warna divisi"
                                className="w-8 h-8 rounded-full border-0 p-0"
                                aria-label="Ubah warna divisi"
                              />
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="absolute top-full left-1/2 w-[2px] h-4 -translate-x-1/2" style={lineStyle}></div>
                  </div>
                  <div className="space-y-3 pt-2 w-full">
                    {division.positions.map((position, posIndex) => (
                      <motion.div key={posIndex} whileHover={{ scale: 1.02 }} className="p-3 rounded-lg bg-white border border-slate-300 shadow-sm text-center text-sm font-medium text-slate-800 relative">
                        {position}
                        {user?.email === 'admin' && (
                          <button onClick={() => handleRemovePosition(divIndex, posIndex)} className="absolute right-3 top-3 text-sm text-red-600">Hapus</button>
                        )}
                      </motion.div>
                    ))}

                    {user?.email === 'admin' && (
                      <div className="flex gap-2">
                        <input value={newPositionValue} onChange={(e) => setNewPositionValue(e.target.value)} placeholder="Posisi baru" className="flex-1 rounded-md border px-3 py-2 text-sm" />
                        <button onClick={() => handleAddPosition(divIndex)} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Tambah</button>
                        <button onClick={() => handleRemoveDivision(divIndex)} className="px-3 py-2 rounded-md border text-sm text-red-600">Hapus Divisi</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* ADD DIVISION (admin) */}
            {user?.email === 'admin' && (
              <motion.div variants={itemVariants} className="space-y-4 flex flex-col items-center">
                <div className="w-full p-4 rounded-xl text-white text-center shadow-md relative group min-h-[80px] flex flex-col justify-center items-center" style={{ backgroundColor: '#1F2937' }}>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h3 className="font-bold text-lg leading-tight">Tambah Divisi</h3>
                  </div>
                </div>
                <div className="pt-2 w-full">
                  <div className="flex gap-2">
                    <input value={newDivisionName} onChange={(e) => setNewDivisionName(e.target.value)} placeholder="Nama divisi baru" className="flex-1 rounded-md border px-3 py-2 text-sm" />
                    <select value={newDivisionIcon} onChange={(e) => setNewDivisionIcon(e.target.value)} className="rounded-md border bg-white text-black px-2 py-2 text-sm" style={{ color: '#000' }}>
                      {ICON_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
                    </select>
                    <input type="color" value={newDivisionColor} onChange={(e) => setNewDivisionColor(e.target.value)} className="w-10 h-10 p-0 border-0" title="Warna divisi" />
                    <button onClick={handleAddDivision} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Tambah Divisi</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STAFF KANAN (dynamic) */}
            <motion.div variants={itemVariants} className="space-y-4 flex flex-col items-center justify-start pt-0">
                 <div className="w-full space-y-3 mt-0 p-4 rounded-xl bg-white border border-slate-200">
                    {org.staff.map((s, index) => (
                        <div key={index} className="p-3 rounded-lg bg-white border border-slate-200 text-sm flex justify-between items-center">
                            {editingStaffIdx === index ? (
                              <div className="flex gap-2 w-full items-center">
                                <input value={editingStaffValue} onChange={(e) => setEditingStaffValue(e.target.value)} className="flex-1 rounded-md border px-3 py-2 text-sm" />
                                <button onClick={() => saveEditStaff(index)} className="px-3 py-2 rounded-md bg-green-600 text-white text-sm">Simpan</button>
                                <button onClick={cancelEditStaff} className="px-3 py-2 rounded-md border text-sm">Batal</button>
                              </div>
                            ) : (
                              <>
                                <span className="font-medium">{s}</span>
                                {user?.email === 'admin' && (
                                  <div className="flex items-center gap-2">
                                    <button onClick={() => startEditStaff(index)} className="text-sm text-slate-600">Edit</button>
                                    <button onClick={() => handleRemoveStaff(index)} className="text-sm text-red-600">Hapus</button>
                                  </div>
                                )}
                              </>
                            )}
                        </div>
                    ))}

                    {user?.email === 'admin' && (
                      <div className="mt-3 flex gap-2">
                        <input value={newStaffName} onChange={(e) => setNewStaffName(e.target.value)} placeholder="Asman baru" className="flex-1 rounded-md border px-3 py-2 text-sm" />
                        <button onClick={handleAddStaff} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Tambah</button>
                      </div>
                    )}
                 </div>
            </motion.div>
          </div>

          {/* UNIT KEWILAYAHAN */}
          <div className="relative pt-16 border-t-2 border-slate-200 mt-12">
             <div className="hidden lg:block absolute left-1/2 w-[2px] -translate-x-1/2 -z-10" style={{ ...lineStyle, top: '-600px', bottom: '100%', opacity: 0.1 }}></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {org.units.map((unit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-800">{unit.name}</h4>
                          {user?.email === 'admin' && (
                            <button onClick={() => handleRemoveUnit(index)} className="text-red-600 text-sm">Hapus</button>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{unit.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {user?.email === 'admin' && (
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-sm font-medium mb-2">Tambah Unit</div>
                  <input value={newUnitName} onChange={(e) => setNewUnitName(e.target.value)} placeholder="Nama unit" className="w-full rounded-md border px-3 py-2 mb-2" />
                  <input value={newUnitDesc} onChange={(e) => setNewUnitDesc(e.target.value)} placeholder="Deskripsi (opsional)" className="w-full rounded-md border px-3 py-2 mb-2" />
                  <button onClick={handleAddUnit} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Tambah Unit</button>
                </div>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};