import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Droplets, Activity, Settings, Zap, Gauge } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- TIPE DATA ---
type MachineData = {
  label: string;
  unit1: string;
  unit2?: string;
  unit3?: string;
  unit4?: string;
};

type PowerPlantDetail = {
  name: string;
  location: string;
  capacity: string;
  image: string;
  description: string;
  // Detail Teknis
  cod?: string;         // Commercial Operation Date
  type?: string;        // Tipe Turbin
  head?: string;        // Ketinggian air
  rpm?: string;         // Kecepatan putar
  machineData?: MachineData[];    // Tabel Data Mesin (Opsional)
  generatorData?: MachineData[];  // Tabel Data Generator (Opsional)
};

// --- DATA PLTA LENGKAP ---
const powerPlants: PowerPlantDetail[] = [
  { 
    name: "PLTA Sutami", 
    location: "Malang", 
    capacity: "3 x 35.0 MW", 
    image: "/plta-sutami.jpg", 
    description: "PLTA Sutami adalah salah satu pembangkit terbesar yang dikelola UP Brantas. Beroperasi sejak tahun 1973, pembangkit ini memiliki peran vital dalam sistem kelistrikan Jawa-Bali.",
    cod: "1973",
    type: "VERTICAL FRANCIS",
    head: "78.0 m",
    rpm: "250 rpm",
    machineData: [
      { label: "Jenis", unit1: "Turbin Air", unit2: "Turbin Air", unit3: "Turbin Air" },
      { label: "Merk", unit1: "TOSHIBA", unit2: "TOSHIBA", unit3: "TOSHIBA" },
      { label: "Model/Type", unit1: "VF - IRS", unit2: "VF - IRS", unit3: "VF - IRS" },
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
  { 
    name: "PLTA Sengguruh", 
    location: "Malang", 
    capacity: "2 x 14.5 MW", 
    image: "/plta-sengguruh.jpg", 
    description: "PLTA Sengguruh berlokasi di Malang, merupakan PLTA run-of-river yang memanfaatkan aliran Sungai Brantas setelah PLTA Sutami.",
    cod: "1988",
    type: "VERTICAL KAPLAN",
    head: "24.9 m",
    rpm: "176.5 rpm",
    machineData: [
      { label: "Jenis", unit1: "Turbin Air", unit2: "Turbin Air" },
      { label: "Merk", unit1: "BOVING", unit2: "BOVING" },
      { label: "Model/Type", unit1: "VKIRS (Vertical Kaplan)", unit2: "VKIRS (Vertical Kaplan)" },
      { label: "Buatan", unit1: "ENGLAND/1982", unit2: "ENGLAND/1982" },
      { label: "Daya (kW)", unit1: "15100", unit2: "15100" },
    ],
    generatorData: [
      { label: "Merk", unit1: "ELIN", unit2: "ELIN" },
      { label: "Tipe", unit1: "SSV 545 / 34 – 45", unit2: "SSV 545 / 34 – 45" },
      { label: "Kapasitas (kVA)", unit1: "16200", unit2: "16200" },
      { label: "Tegangan (V)", unit1: "11000", unit2: "11000" },
      { label: "Arus (A)", unit1: "850", unit2: "850" },
      { label: "Power Factor", unit1: "0,9", unit2: "0,9" },
    ]
  },
  { 
    name: "PLTA Wlingi", 
    location: "Blitar", 
    capacity: "2 x 27.0 MW", 
    image: "/plta-wlingi.jpg", 
    description: "PLTA Wlingi terletak di Blitar dan memanfaatkan bendungan Wlingi Raya. Memiliki kapasitas signifikan untuk mendukung kelistrikan daerah selatan Jawa Timur.",
    cod: "1978",
    type: "VERTICAL KAPLAN",
    head: "22.0 m",
    rpm: "143 rpm",
    machineData: [
      { label: "Jenis", unit1: "Turbin Air", unit2: "Turbin Air" },
      { label: "Merk", unit1: "TOSHIBA", unit2: "TOSHIBA" },
      { label: "Model/Type", unit1: "VK - RS (Vertical Kaplan)", unit2: "VK - RS (Vertical Kaplan)" },
      { label: "Nomor Seri", unit1: "3600762", unit2: "3600420B" },
      { label: "Buatan", unit1: "Japan/1976", unit2: "Japan/1976" },
      { label: "Daya (kW)", unit1: "27800", unit2: "27800" },
    ],
    generatorData: [
      { label: "Merk", unit1: "Meidensha Electric", unit2: "Meidensha Electric" },
      { label: "Tipe", unit1: "VTC – AF / 5J8600r1", unit2: "VTC – AF / 5P8200r1" },
      { label: "Nomor Seri", unit1: "5J8600R1", unit2: "5P8200R1" },
      { label: "Buatan", unit1: "Japan/1976", unit2: "Japan/1976" },
      { label: "Kapasitas (kVA)", unit1: "30000", unit2: "30000" },
      { label: "Tegangan (V)", unit1: "11000", unit2: "11000" },
      { label: "Arus (A)", unit1: "1575", unit2: "1575" },
      { label: "Power Factor", unit1: "0,9", unit2: "0,9" },
    ]
  },
  { 
    name: "PLTA Lodoyo", 
    location: "Blitar", 
    capacity: "1 x 4.5 MW", 
    image: "/plta-lodoyo.jpg", 
    description: "PLTA Lodoyo merupakan pembangkit yang memanfaatkan aliran air irigasi Lodoyo-Tulungagung.",
    cod: "1983",
    type: "HORIZONTAL KAPLAN",
    head: "8.5 m",
    rpm: "150 rpm",
    // PERBAIKAN: Hapus Unit 2
    machineData: [
      { label: "Jenis", unit1: "Turbin Air" },
      { label: "Merk", unit1: "TOSHIBA" },
      { label: "Model/Type", unit1: "HK / RT (Horizontal Kaplan)" },
      { label: "Buatan", unit1: "Japan/1983" },
      { label: "Daya (kW)", unit1: "4700" },
    ],
    generatorData: [
      { label: "Merk", unit1: "MEIDENSHA" },
      { label: "Tipe", unit1: "HORIZONTAL SHAFT" },
      { label: "Nomor Seri", unit1: "L119216R1" },
      { label: "Buatan", unit1: "Japan/1983" },
      { label: "Kapasitas (kVA)", unit1: "5300" },
      { label: "Kapasitas (kW)", unit1: "4505" },
      { label: "Tegangan (V)", unit1: "6600" },
      { label: "Arus (A)", unit1: "464" },
      { label: "Power Factor", unit1: "0,85" },
    ]
  },
  { 
    name: "PLTA Tulungagung", 
    location: "Tulungagung", 
    capacity: "1 x 18.0 MW", 
    image: "/plta-tulungagung.jpg", 
    description: "PLTA Tulungagung memanfaatkan potensi tenaga air di wilayah Tulungagung untuk mendukung keandalan sistem.",
    cod: "1993",
    type: "VERTICAL FRANCIS",
    head: "69.6 m",
    rpm: "375 rpm",
    machineData: [
      { label: "Jenis", unit1: "Turbin Air", unit2: "Turbin Air" },
      { label: "Merk", unit1: "VOEST-ALPINE M.C.E.", unit2: "VOEST-ALPINE M.C.E." },
      { label: "Model/Type", unit1: "F.S.V. 300/1,75 Francis", unit2: "F.S.V. 300/1,75 Francis" },
      { label: "Nomor Seri", unit1: "MB 9 – 097/2", unit2: "MB 9 – 097/2" },
      { label: "Buatan", unit1: "Austria/1988", unit2: "Austria/1988" },
      { label: "Daya (kW)", unit1: "19000", unit2: "19000" },
    ],
    generatorData: [
      { label: "Merk", unit1: "ELIN", unit2: "ELIN" },
      { label: "Tipe", unit1: "SSV 33C/16 – 140", unit2: "SSV 33C/16 – 140" },
      { label: "Kapasitas (kVA)", unit1: "20000", unit2: "20000" },
      { label: "Tegangan (V)", unit1: "11000", unit2: "11000" },
      { label: "Arus (A)", unit1: "1050", unit2: "1050" },
      { label: "Power Factor", unit1: "0,9", unit2: "0,9" },
    ]
  },
  { 
    name: "PLTA Wonorejo", 
    location: "Tulungagung", 
    capacity: "1 x 6.5 MW", 
    image: "/plta-wonorejo.jpg", 
    description: "PLTA Wonorejo terletak di kaki Bendungan Wonorejo, salah satu bendungan terbesar di Asia Tenggara.",
    cod: "2002",
    type: "VERTICAL FRANCIS",
    head: "54.0 m",
    rpm: "500 rpm",
    // PERBAIKAN: Hapus Unit 2
    machineData: [
      { label: "Jenis", unit1: "Turbin Air" },
      { label: "Merk", unit1: "Toshiba Corporation" },
      { label: "Model/Type", unit1: "VF 1 RS Francis, Vertical Shaft" },
      { label: "Nomor Seri", unit1: "A107481" },
      { label: "Buatan", unit1: "Japan/1999" },
      { label: "Daya (kW)", unit1: "6600" },
    ],
    generatorData: [
      { label: "Merk", unit1: "TOSHIBA CORPORATION" },
      { label: "Tipe", unit1: "TAKL" },
      { label: "Nomor Seri", unit1: "A107481" },
      { label: "Buatan", unit1: "Japan/1999" },
      { label: "Kapasitas (kVA)", unit1: "7000" },
      { label: "Kapasitas (kW)", unit1: "6300" },
      { label: "Tegangan (V)", unit1: "6600" },
      { label: "Arus (A)", unit1: "613" },
      { label: "Power Factor", unit1: "0,9" },
    ]
  },
  { 
    name: "PLTA Selorejo", 
    location: "Malang", 
    capacity: "1 x 4.48 MW", 
    image: "/plta-selorejo.jpg", 
    description: "PLTA Selorejo memanfaatkan air dari Waduk Selorejo di Ngantang, Malang.",
    cod: "1973",
    type: "VERTICAL KAPLAN",
    head: "37.1 m",
    rpm: "500 rpm",
    // PERBAIKAN: Hapus Unit 2
    machineData: [
      { label: "Jenis", unit1: "Turbin Air" },
      { label: "Merk", unit1: "EBARA" },
      { label: "Model/Type", unit1: "Vertical Kaplan" },
      { label: "Buatan", unit1: "Japan/1972" },
      { label: "Daya (kW)", unit1: "4500" },
    ],
    generatorData: [
      { label: "Merk", unit1: "MEIDENSHA" },
      { label: "Tipe", unit1: "Vertical Shaft" },
      { label: "Buatan", unit1: "Japan/1972" },
      { label: "Kapasitas (kVA)", unit1: "5000" },
      { label: "Tegangan (V)", unit1: "6300" },
      { label: "Power Factor", unit1: "0,9" },
    ]
  },
  { 
    name: "PLTA Mendalan", 
    location: "Malang", 
    capacity: "3x5.8 MW, 1x5.6 MW", 
    image: "/plta-mendalan.jpg", 
    description: "PLTA Mendalan adalah salah satu PLTA tertua yang bersejarah, dibangun pada masa kolonial dan masih beroperasi andal hingga kini.",
    cod: "1930 & 1955",
    type: "HORIZONTAL FRANCIS",
    head: "152.5 m",
    rpm: "750 rpm",
    machineData: [
      { label: "Jenis", unit1: "Turbin Air", unit2: "Turbin Air", unit3: "Turbin Air", unit4: "Turbin Air" },
      { label: "Merk", unit1: "Escher Wyss", unit2: "Escher Wyss", unit3: "Escher Wyss", unit4: "Escher Wyss" },
      { label: "Buatan", unit1: "Swiss/1928", unit2: "Swiss/1928", unit3: "Swiss/1928", unit4: "Swiss/1951" },
      { label: "Daya (kW)", unit1: "5800", unit2: "5800", unit3: "5800", unit4: "5600" },
    ],
    generatorData: [
      { label: "Merk", unit1: "Brown Boveri", unit2: "Brown Boveri", unit3: "Brown Boveri", unit4: "General Electric" },
      { label: "Buatan", unit1: "Swiss/1928", unit2: "Swiss/1928", unit3: "Swiss/1928", unit4: "USA/1951" },
      { label: "Kapasitas (kVA)", unit1: "7200", unit2: "7200", unit3: "7200", unit4: "7000" },
      { label: "Tegangan (V)", unit1: "6000", unit2: "6000", unit3: "6000", unit4: "6000" },
      { label: "Power Factor", unit1: "0,8", unit2: "0,8", unit3: "0,8", unit4: "0,8" },
    ]
  },
  { 
    name: "PLTA Siman", 
    location: "Malang", 
    capacity: "3 x 3.6 MW", 
    image: "/plta-siman.jpg", 
    description: "PLTA Siman berlokasi di Kepanjen, Malang, memanfaatkan aliran air sungai Konto.",
    cod: "1930",
    type: "VERTICAL FRANCIS",
    head: "98.0 m",
    rpm: "600 rpm",
    machineData: [
      { label: "Jenis", unit1: "Turbin Air", unit2: "Turbin Air", unit3: "Turbin Air" },
      { label: "Merk", unit1: "Escher Wyss", unit2: "Escher Wyss", unit3: "Escher Wyss" },
      { label: "Model/Type", unit1: "Francis Spiral", unit2: "Francis Spiral", unit3: "Francis Spiral" },
      { label: "Buatan", unit1: "Swiss/1927", unit2: "Swiss/1927", unit3: "Swiss/1927" },
      { label: "Daya (kW)", unit1: "3600", unit2: "3600", unit3: "3600" },
    ],
    generatorData: [
      { label: "Merk", unit1: "Brown Boveri", unit2: "Brown Boveri", unit3: "Brown Boveri" },
      { label: "Buatan", unit1: "Swiss/1927", unit2: "Swiss/1927", unit3: "Swiss/1927" },
      { label: "Kapasitas (kVA)", unit1: "4500", unit2: "4500", unit3: "4500" },
      { label: "Tegangan (V)", unit1: "6000", unit2: "6000", unit3: "6000" },
      { label: "Arus (A)", unit1: "434", unit2: "434", unit3: "434" },
      { label: "Power Factor", unit1: "0,8", unit2: "0,8", unit3: "0,8" },
    ]
  },
  { 
    name: "PLTA Golang", 
    location: "Madiun", 
    capacity: "3 x 0.9 MW", 
    image: "/plta-golang.jpg", 
    description: "PLTA Golang terletak di Madiun, merupakan pembangkit skala kecil yang memanfaatkan aliran sungai setempat.",
    cod: "1959",
    type: "HORIZONTAL FRANCIS",
    head: "84.2 m",
    rpm: "1000 rpm",
    machineData: [
      { label: "Jenis", unit1: "Turbin Air", unit2: "Turbin Air", unit3: "Turbin Air" },
      { label: "Merk", unit1: "Escher Wyss", unit2: "Escher Wyss", unit3: "Escher Wyss" },
      { label: "Buatan", unit1: "Swiss/1959", unit2: "Swiss/1959", unit3: "Swiss/1959" },
      { label: "Daya (kW)", unit1: "900", unit2: "900", unit3: "900" },
    ],
    generatorData: [
      { label: "Merk", unit1: "Brown Boveri", unit2: "Brown Boveri", unit3: "Brown Boveri" },
      { label: "Kapasitas (kVA)", unit1: "1150", unit2: "1150", unit3: "1150" },
      { label: "Tegangan (V)", unit1: "6300", unit2: "6300", unit3: "6300" },
      { label: "Power Factor", unit1: "0,8", unit2: "0,8", unit3: "0,8" },
    ]
  },
  { 
    name: "PLTA Ampelgading", 
    location: "Malang", 
    capacity: "2 x 5.23 MW", 
    image: "/plta-ampelgading.jpg", 
    description: "PLTA Ampelgading merupakan salah satu pembangkit yang lebih modern, mulai beroperasi tahun 2010 di Malang Selatan.",
    cod: "2010",
    type: "VERTICAL FRANCIS",
    head: "228.8 m",
    rpm: "1000 rpm",
    machineData: [
      { label: "Jenis", unit1: "Turbin Air", unit2: "Turbin Air" },
      { label: "Merk", unit1: "CHTC", unit2: "CHTC" },
      { label: "Model/Type", unit1: "HL – LJ – 86", unit2: "HL – LJ – 86" },
      { label: "Buatan", unit1: "China/2009", unit2: "China/2009" },
      { label: "Daya (kW)", unit1: "5230", unit2: "5230" },
    ],
    generatorData: [
      { label: "Merk", unit1: "CHTC", unit2: "CHTC" },
      { label: "Tipe", unit1: "SFW – 5000 – 6 / 1730", unit2: "SFW – 5000 – 6 / 1730" },
      { label: "Kapasitas (kVA)", unit1: "6250", unit2: "6250" },
      { label: "Tegangan (V)", unit1: "6300", unit2: "6300" },
      { label: "Power Factor", unit1: "0,8", unit2: "0,8" },
    ]
  },
  { 
    name: "PLTA Giringan", 
    location: "Madiun", 
    capacity: "2x0.9 MW, 1x1.3 MW", 
    image: "/plta-giringan.jpg", 
    description: "PLTA Giringan di Madiun merupakan pembangkit legendaris yang sudah beroperasi sejak tahun 1937.",
    cod: "1937",
    type: "HORIZONTAL FRANCIS",
    head: "100.0 m",
    rpm: "1000 rpm",
    machineData: [
      { label: "Jenis", unit1: "Turbin Air", unit2: "Turbin Air", unit3: "Turbin Air" },
      { label: "Merk", unit1: "J.M. Voith", unit2: "J.M. Voith", unit3: "Escher Wyss" },
      { label: "Buatan", unit1: "Germany/1937", unit2: "Germany/1937", unit3: "Swiss/1959" },
      { label: "Daya (kW)", unit1: "900", unit2: "900", unit3: "1300" },
    ],
    generatorData: [
      { label: "Merk", unit1: "Siemens", unit2: "Siemens", unit3: "Brown Boveri" },
      { label: "Kapasitas (kVA)", unit1: "1150", unit2: "1150", unit3: "1650" },
      { label: "Tegangan (V)", unit1: "6300", unit2: "6300", unit3: "6300" },
      { label: "Power Factor", unit1: "0,8", unit2: "0,8", unit3: "0,8" },
    ]
  },
  { 
    name: "PLTA Ngebel", 
    location: "Ponorogo", 
    capacity: "1 x 2.2 MW", 
    image: "/plta-ngebel.jpg", 
    description: "PLTA Ngebel memanfaatkan air dari Danau Ngebel di Ponorogo.",
    cod: "1968",
    type: "HORIZONTAL FRANCIS",
    head: "183.5 m",
    rpm: "1000 rpm",
    // PERBAIKAN: Hapus Unit 2 (Unit 1 saja)
    machineData: [
      { label: "Jenis", unit1: "Turbin Air" },
      { label: "Merk", unit1: "EBARA" },
      { label: "Model/Type", unit1: "Horizontal Francis" },
      { label: "Buatan", unit1: "Japan/1968" },
      { label: "Daya (kW)", unit1: "2200" },
    ],
    generatorData: [
      { label: "Merk", unit1: "FUJI ELECTRIC" },
      { label: "Buatan", unit1: "Japan/1968" },
      { label: "Kapasitas (kVA)", unit1: "2700" },
      { label: "Tegangan (V)", unit1: "6300" },
      { label: "Power Factor", unit1: "0,8" },
    ]
  },
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
                   <div className="rounded-xl overflow-hidden border-4 border-slate-100 shadow-lg relative h-64 lg:h-96 min-h-[250px]">
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
                            <p className="text-xs font-bold text-blue-600 uppercase">Head</p>
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
                               {selectedPlant.machineData[0]?.unit2 && <th className="p-2 font-semibold text-center">Unit 2</th>}
                               {selectedPlant.machineData[0]?.unit3 && <th className="p-2 font-semibold text-center">Unit 3</th>}
                               {selectedPlant.machineData[0]?.unit4 && <th className="p-2 font-semibold text-center">Unit 4</th>}
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {selectedPlant.machineData.map((row, idx) => (
                               <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                  <td className="p-2 font-medium text-slate-700">{row.label}</td>
                                  <td className="p-2 text-center text-slate-600">{row.unit1}</td>
                                  {row.unit2 && <td className="p-2 text-center text-slate-600">{row.unit2}</td>}
                                  {row.unit3 && <td className="p-2 text-center text-slate-600">{row.unit3}</td>}
                                  {row.unit4 && <td className="p-2 text-center text-slate-600">{row.unit4}</td>}
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
                                {selectedPlant.generatorData[0]?.unit2 && <th className="p-2 font-semibold text-center">Unit 2</th>}
                                {selectedPlant.generatorData[0]?.unit3 && <th className="p-2 font-semibold text-center">Unit 3</th>}
                                {selectedPlant.generatorData[0]?.unit4 && <th className="p-2 font-semibold text-center">Unit 4</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {selectedPlant.generatorData.map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                    <td className="p-2 font-medium text-slate-700">{row.label}</td>
                                    <td className="p-2 text-center text-slate-600">{row.unit1}</td>
                                    {row.unit2 && <td className="p-2 text-center text-slate-600">{row.unit2}</td>}
                                    {row.unit3 && <td className="p-2 text-center text-slate-600">{row.unit3}</td>}
                                    {row.unit4 && <td className="p-2 text-center text-slate-600">{row.unit4}</td>}
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
                    <p className="text-slate-500">Detail tabel data mesin & generator belum tersedia di database untuk unit ini.</p>
                 </div>
              )}

            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
};