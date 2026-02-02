import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Droplets, Activity, Settings, Zap, Calendar, Gauge } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- TIPE DATA BARU (Sesuai Gambar Referensi) ---
type MachineData = {
  label: string;
  unit1: string;
  unit2: string;
  unit3?: string; // Optional jika cuma 2 unit
};

type PowerPlantDetail = {
  name: string;
  location: string;
  capacity: string;
  image: string;
  description: string;
  // Detail Teknis Baru
  cod?: string;         // Commercial Operation Date
  type?: string;        // Tipe Turbin
  head?: string;        // Ketinggian air
  rpm?: string;         // Kecepatan putar
  machineData?: MachineData[];    // Tabel Data Mesin
  generatorData?: MachineData[];  // Tabel Data Generator
};

// --- DATA PLTA (SUTAMI LENGKAP SESUAI GAMBAR) ---
const powerPlants: PowerPlantDetail[] = [
  { 
    name: "PLTA Sutami", 
    location: "Malang", 
    capacity: "3 x 35.0 MW", 
    image: "/plta-sutami.jpg", // Pastikan file gambar ada
    description: "PLTA Sutami adalah salah satu pembangkit terbesar yang dikelola UP Brantas. Beroperasi sejak tahun 1973, pembangkit ini memiliki peran vital dalam sistem kelistrikan Jawa-Bali.",
    cod: "1973",
    type: "VERTICAL FRANCIS",
    head: "78.0 m",
    rpm: "250 rpm",
    machineData: [
      { label: "Jenis", unit1: "Turbin Air", unit2: "Turbin Air", unit3: "Turbin Air" },
      { label: "Merk", unit1: "TOSHIBA", unit2: "TOSHIBA", unit3: "TOSHIBA" },
      { label: "Model/Type", unit1: "VF - IRS (VERTICAL)", unit2: "VF - IRS (VERTICAL)", unit3: "VF - IRS (VERTICAL)" },
      { label: "Nomor Seri", unit1: "3600420A", unit2: "3600420B", unit3: "3600420C" },
      { label: "Buatan", unit1: "Japan/1972", unit2: "Japan/1972", unit3: "Japan/1973" },
      { label: "Daya (kW)", unit1: "36000", unit2: "36000", unit3: "36000" },
    ],
    generatorData: [
      { label: "Merk", unit1: "TOSHIBA", unit2: "TOSHIBA", unit3: "TOSHIBA" },
      { label: "Tipe", unit1: "TAK - RCU", unit2: "TAK - RCU", unit3: "TAK - RCU" },
      { label: "Kapasitas (kVA)", unit1: "39000", unit2: "39000", unit3: "39000" },
      { label: "Tegangan (V)", unit1: "13000", unit2: "13000", unit3: "13000" },
      { label: "Arus (A)", unit1: "2049", unit2: "2049", unit3: "2049" },
      { label: "Power Factor", unit1: "0,9", unit2: "0,9", unit3: "0,9" },
    ]
  },
  // --- Data PLTA Lain (Placeholder Standar) ---
  { name: "PLTA Sengguruh", location: "Malang", capacity: "2 x 14.5 MW", image: "/fotobrantas.jpeg", description: "PLTA Sengguruh berlokasi di Malang dengan kapasitas 29 MW. Turut berkontribusi dalam sistem kelistrikan Jawa Timur." },
  { name: "PLTA Wlingi", location: "Blitar", capacity: "2 x 27 MW", image: "/fotobrantas.jpeg", description: "PLTA Wlingi di Blitar memiliki kapasitas 54 MW, menjadi pembangkit yang signifikan dalam menghasilkan energi terbarukan." },
  { name: "PLTA Lodoyo", location: "Blitar", capacity: "1 x 4.5 MW", image: "/fotobrantas.jpeg", description: "PLTA Lodoyo berlokasi di Blitar dengan kapasitas 4.5 MW." },
  { name: "PLTA Selorejo", location: "Malang", capacity: "1 x 4.5 MW", image: "/fotobrantas.jpeg", description: "PLTA Selorejo di Malang memiliki kapasitas 4.5 MW." },
  { name: "PLTA Mendalan", location: "Malang", capacity: "23 MW", image: "/fotobrantas.jpeg", description: "PLTA Mendalan berlokasi di Malang dengan kapasitas 23 MW." },
  { name: "PLTA Siman", location: "Malang", capacity: "10 MW", image: "/fotobrantas.jpeg", description: "PLTA Siman di Malang memiliki kapasitas 10 MW." },
  { name: "PLTA Giringan", location: "Madiun", capacity: "2 MW", image: "/fotobrantas.jpeg", description: "PLTA Giringan berlokasi di Madiun dengan kapasitas 2 MW." },
  { name: "PLTA Golang", location: "Madiun", capacity: "8 MW", image: "/fotobrantas.jpeg", description: "PLTA Golang di Madiun memiliki kapasitas 8 MW." },
  { name: "PLTA Tulungagung", location: "Tulungagung", capacity: "2 x 18 MW", image: "/fotobrantas.jpeg", description: "PLTA Tulungagung berlokasi di Tulungagung dengan kapasitas 36 MW." },
  { name: "PLTA Wonorejo", location: "Tulungagung", capacity: "6.4 MW", image: "/fotobrantas.jpeg", description: "PLTA Wonorejo di Tulungagung memiliki kapasitas 6.4 MW." },
  { name: "PLTA Ngebel", location: "Ponorogo", capacity: "8.3 MW", image: "/fotobrantas.jpeg", description: "PLTA Ngebel berlokasi di Ponorogo dengan kapasitas 8.3 MW." },
  { name: "PLTA Ampelgading", location: "Malang", capacity: "2 MW", image: "/fotobrantas.jpeg", description: "PLTA Ampelgading di Malang memiliki kapasitas 2 MW." },
];

const districts = [
  { name: "Distrik A", plants: "PLTA Sutami & PLTA Sengguruh" },
  { name: "Distrik B", plants: "PLTA Wlingi & PLTA Lodoyo" },
  { name: "Distrik C", plants: "PLTA Tulungagung & PLTA Wonorejo" },
  { name: "Distrik D", plants: "PLTA Selorejo, Mendalan & Siman" },
  { name: "Distrik E", plants: "PLTA Golang, Ampelgading, Giringan & Ngebel" },
];

export const PowerPlantsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPlant, setSelectedPlant] = useState<PowerPlantDetail | null>(null);

  return (
    <section id="pembangkit" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            Pembangkit Listrik
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            13 PLTA di <span className="text-gradient">Jawa Timur</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cascade Sungai Brantas dan Konto yang menghasilkan energi listrik ramah lingkungan
          </p>
        </motion.div>

        {/* Districts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {districts.map((district, index) => {
            const districtPlants = powerPlants.filter(plant => {
              if (district.name === "Distrik A") return ["PLTA Sutami", "PLTA Sengguruh"].includes(plant.name);
              if (district.name === "Distrik B") return ["PLTA Wlingi", "PLTA Lodoyo"].includes(plant.name);
              if (district.name === "Distrik C") return ["PLTA Tulungagung", "PLTA Wonorejo"].includes(plant.name);
              if (district.name === "Distrik D") return ["PLTA Selorejo", "PLTA Mendalan", "PLTA Siman"].includes(plant.name);
              if (district.name === "Distrik E") return ["PLTA Golang", "PLTA Ampelgading", "PLTA Giringan", "PLTA Ngebel"].includes(plant.name);
              return false;
            });

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                
                <div className="relative">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-3">
                      {district.name}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {districtPlants.map((plant, plantIndex) => (
                      <div
                        key={plantIndex}
                        onClick={() => setSelectedPlant(plant)}
                        className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all cursor-pointer hover:shadow-md group"
                      >
                        <div className="flex items-start gap-2">
                          <Droplets className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 group-hover:text-blue-600" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-foreground group-hover:text-blue-700">{plant.name}</h4>
                            <p className="text-xs text-muted-foreground">{plant.capacity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">Total PLTA: {districtPlants.length}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* --- NEW TECHNICAL POPUP DESIGN --- */}
      <Dialog open={selectedPlant !== null} onOpenChange={(open) => !open && setSelectedPlant(null)}>
        <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden flex flex-col bg-white">
          <DialogHeader className="px-6 py-4 border-b bg-slate-50 flex flex-row items-center justify-between shrink-0">
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                {selectedPlant?.name} 
                {selectedPlant?.cod && (
                   <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">
                     COD {selectedPlant.cod}
                   </span>
                )}
              </DialogTitle>
              <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                <MapPin className="w-4 h-4" />
                <span>{selectedPlant?.location}</span>
              </div>
            </div>
            <DialogClose className="mt-0" />
          </DialogHeader>
          
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-8">
                
              {/* Top Section: Image & Main Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Image */}
                <div className="lg:col-span-5">
                   <div className="rounded-xl overflow-hidden border-4 border-slate-100 shadow-lg relative h-64 lg:h-full min-h-[250px]">
                      <img 
                        src={selectedPlant?.image} 
                        alt={selectedPlant?.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white text-sm font-medium">PLN Nusantara Power UP Brantas</p>
                      </div>
                   </div>
                </div>

                {/* Main Stats Cards */}
                <div className="lg:col-span-7 space-y-4">
                   <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                      <p className="text-slate-700 leading-relaxed text-sm">
                        {selectedPlant?.description}
                      </p>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      {/* Capacity */}
                      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-6 h-6 text-emerald-600" />
                         </div>
                         <div>
                            <p className="text-xs font-bold text-emerald-600 uppercase">Inst. Capacity</p>
                            <p className="text-xl font-bold text-slate-800">{selectedPlant?.capacity}</p>
                         </div>
                      </div>

                      {/* Turbine Type */}
                      <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100 flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                            <Settings className="w-6 h-6 text-cyan-600" />
                         </div>
                         <div>
                            <p className="text-xs font-bold text-cyan-600 uppercase">Turbine Type</p>
                            <p className="text-lg font-bold text-slate-800 truncate" title={selectedPlant?.type || "-"}>
                                {selectedPlant?.type || "-"}
                            </p>
                         </div>
                      </div>

                      {/* Head */}
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Droplets className="w-6 h-6 text-blue-600" />
                         </div>
                         <div>
                            <p className="text-xs font-bold text-blue-600 uppercase">Head (m)</p>
                            <p className="text-xl font-bold text-slate-800">{selectedPlant?.head || "-"}</p>
                         </div>
                      </div>

                      {/* RPM */}
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <Gauge className="w-6 h-6 text-amber-600" />
                         </div>
                         <div>
                            <p className="text-xs font-bold text-amber-600 uppercase">Speed</p>
                            <p className="text-xl font-bold text-slate-800">{selectedPlant?.rpm || "-"}</p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Technical Tables Section */}
              {selectedPlant?.machineData && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-slate-200">
                  
                  {/* Tabel Data Mesin */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                       <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                       Data Mesin (Turbin)
                    </h3>
                    <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                      <table className="w-full text-sm text-left">
                         <thead className="bg-cyan-500 text-white">
                            <tr>
                               <th className="p-2 font-semibold">Data Mesin</th>
                               <th className="p-2 font-semibold text-center">Unit 1</th>
                               <th className="p-2 font-semibold text-center">Unit 2</th>
                               {selectedPlant.machineData[0]?.unit3 && <th className="p-2 font-semibold text-center">Unit 3</th>}
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {selectedPlant.machineData.map((row, idx) => (
                               <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                  <td className="p-2 font-medium text-slate-700">{row.label}</td>
                                  <td className="p-2 text-center text-slate-600">{row.unit1}</td>
                                  <td className="p-2 text-center text-slate-600">{row.unit2}</td>
                                  {row.unit3 && <td className="p-2 text-center text-slate-600">{row.unit3}</td>}
                               </tr>
                            ))}
                         </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Tabel Data Generator */}
                  {selectedPlant.generatorData && (
                    <div className="space-y-3">
                        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                            <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                            Data Generator
                        </h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-emerald-500 text-white">
                                <tr>
                                <th className="p-2 font-semibold">Data Generator</th>
                                <th className="p-2 font-semibold text-center">Unit 1</th>
                                <th className="p-2 font-semibold text-center">Unit 2</th>
                                {selectedPlant.generatorData[0]?.unit3 && <th className="p-2 font-semibold text-center">Unit 3</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {selectedPlant.generatorData.map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                    <td className="p-2 font-medium text-slate-700">{row.label}</td>
                                    <td className="p-2 text-center text-slate-600">{row.unit1}</td>
                                    <td className="p-2 text-center text-slate-600">{row.unit2}</td>
                                    {row.unit3 && <td className="p-2 text-center text-slate-600">{row.unit3}</td>}
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                  )}

                </div>
              )}

              {/* Warning jika data teknis tidak tersedia */}
              {!selectedPlant?.machineData && (
                 <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <Activity className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500">Detail data teknis untuk unit ini belum tersedia di database.</p>
                 </div>
              )}

            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
};