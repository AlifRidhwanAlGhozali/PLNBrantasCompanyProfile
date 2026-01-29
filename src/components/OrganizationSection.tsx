import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Briefcase, Building2 } from "lucide-react";

const orgStructure = {
  seniorManager: "Tim Manajemen (4 orang)",
  managers: [
    "Manajer Enjiniring & QA",
    "Manajer Operasi & Pemeliharaan",
    "Manajer Keuangan & Administrasi",
  ],
  departments: [
    { name: "Asman System Owner", category: "Engineering" },
    { name: "Asman Condition Based Maintenance", category: "Engineering" },
    { name: "Asman PLTA Remote", category: "Engineering" },
    { name: "Asman Outage Management", category: "Engineering" },
    { name: "Asman Rendal Operasi", category: "Operasi" },
    { name: "Asman Rendal Pemeliharaan", category: "Operasi" },
    { name: "Asman K3 & Keamanan", category: "Operasi" },
    { name: "Asman ICC & Gudang", category: "Operasi" },
    { name: "Asman Sipil & Lingkungan", category: "Operasi" },
    { name: "Asman Keuangan", category: "Keuangan" },
    { name: "Asman MMRK", category: "Keuangan" },
    { name: "Asman SDM, Umum & CSR", category: "Keuangan" },
    { name: "Asman Pengadaan", category: "Keuangan" },
  ],
};

const stats = [
  { icon: Users, value: "533", label: "Total Karyawan" },
  { icon: Briefcase, value: "18", label: "Assistant Manager" },
  { icon: Building2, value: "116", label: "Karyawan Fungsional" },
];

export const OrganizationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Struktur Organisasi
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tim <span className="text-gradient">Profesional</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Berdasarkan Perdir No. 0033.P/DIR/2024 tentang Susunan Organisasi PT PLN Nusantara Power Unit Pembangkitan
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 md:p-6 rounded-2xl bg-card border border-border text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Organization Tree */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* Senior Manager */}
          <div className="flex justify-center mb-8">
            <div className="p-4 md:p-6 rounded-2xl hero-gradient text-primary-foreground text-center min-w-[200px]">
              <p className="font-bold text-lg">Senior Manager</p>
              <p className="text-sm text-primary-foreground/80">{orgStructure.seniorManager}</p>
            </div>
          </div>

          {/* Managers */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {orgStructure.managers.map((manager, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-primary text-primary-foreground text-center"
              >
                <p className="font-semibold text-sm">{manager}</p>
              </div>
            ))}
          </div>

          {/* Departments */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {orgStructure.departments.map((dept, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-muted border border-border text-center hover:border-primary/30 transition-colors"
              >
                <p className="text-sm font-medium text-foreground">{dept.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{dept.category}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
