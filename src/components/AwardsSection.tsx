import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Trophy, Medal, Star } from "lucide-react";

const awards = [
  {
    title: "Penghargaan Subroto 2023",
    category: "Keselamatan Ketenagalistrikan",
    description: "Sub Kategori Sistem Grid Code Jawa, Madura, dan Bali (Skala Menengah)",
    icon: Trophy,
  },
  {
    title: "Penghargaan Subroto 2022",
    category: "Keselamatan Ketenagalistrikan",
    description: "Bidang Keselamatan Ketenagalistrikan PLTA",
    icon: Trophy,
  },
  {
    title: "PROPER BIRU",
    category: "Kategori PLTA",
    description: "Penghargaan Lingkungan Periode 2018-2023",
    icon: Award,
  },
  {
    title: "Zero Accident",
    category: "Keselamatan Kerja",
    description: "27.402.379 Jam Kerja (Nov 2006 - Mei 2024)",
    icon: Medal,
  },
  {
    title: "Bendera EMAS SMK3",
    category: "Sistem Manajemen K3",
    description: "Penghargaan dari Gubernur Jawa Timur sejak 2012",
    icon: Star,
  },
  {
    title: "SPKI 2024 - Juara 2",
    category: "PLN Inovasi",
    description: "Kategori Aplikasi - Implementasi TMC GBG",
    icon: Trophy,
  },
];

export const AwardsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
              
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <award.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                  {award.category}
                </span>
                
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {award.title}
                </h3>
                <p className="text-sm text-muted-foreground">{award.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
