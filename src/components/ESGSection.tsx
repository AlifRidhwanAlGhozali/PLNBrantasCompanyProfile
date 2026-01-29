import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Users, Shield, TreePine, GraduationCap, Heart } from "lucide-react";

const esgData = [
  {
    category: "Environmental",
    icon: Leaf,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    items: [
      "Penanaman 20.000 bibit pohon Gaharu di Arboretum Sumber Brantas",
      "Pengurangan emisi karbon 470.067 ton CO2 eq/tahun",
      "Setara dengan penanaman 16.500 pohon Trembesi",
      "PLTS & PLTB untuk optimalisasi pemakaian sendiri",
    ],
  },
  {
    category: "Social",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    items: [
      "Program BAGOES (Brantas Goes To School)",
      "Sekolah Alam MIBA untuk pendidikan berkualitas",
      "Bantuan renovasi masjid dan sarana umum",
      "Uji Blackstart & Line Charging untuk keandalan sistem",
    ],
  },
  {
    category: "Governance",
    icon: Shield,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    items: [
      "Sertifikasi kompetensi operator PLTA",
      "Implementasi ISO dan sistem manajemen terintegrasi",
      "Business Continuity Plan (BCP)",
      "Program K3 dan keselamatan kerja",
    ],
  },
];

const socialPrograms = [
  { icon: TreePine, title: "Program Lingkungan", desc: "Konservasi dan reboisasi" },
  { icon: GraduationCap, title: "BAGOES Class", desc: "Edukasi kelistrikan" },
  { icon: Heart, title: "CSR", desc: "Bantuan masyarakat" },
];

export const ESGSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="esg" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            Environmental, Social & Governance
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Komitmen <span className="text-gradient">Keberlanjutan</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Menjalankan operasi bisnis yang bertanggung jawab terhadap lingkungan dan masyarakat
          </p>
        </motion.div>

        {/* ESG Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {esgData.map((esg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
              className="p-6 rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${esg.bgColor} flex items-center justify-center mb-6`}>
                <esg.icon className={`w-7 h-7 ${esg.color}`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{esg.category}</h3>
              <ul className="space-y-3">
                {esg.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className={`w-1.5 h-1.5 rounded-full ${esg.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

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
            <div>
              <p className="text-5xl font-bold text-primary-foreground mb-2">470,067</p>
              <p className="text-primary-foreground/80">ton CO₂ eq/tahun</p>
              <p className="text-sm text-primary-foreground/60 mt-1">Pengurangan Emisi Karbon</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary-foreground mb-2">16,500</p>
              <p className="text-primary-foreground/80">Pohon Trembesi</p>
              <p className="text-sm text-primary-foreground/60 mt-1">Ekuivalen Penyerapan CO₂</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary-foreground mb-2">540,307</p>
              <p className="text-primary-foreground/80">MWh/tahun</p>
              <p className="text-sm text-primary-foreground/60 mt-1">Produksi PLTA Sutami</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
