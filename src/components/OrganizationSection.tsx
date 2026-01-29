import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Briefcase, Building2, Zap, Wrench, DollarSign, ShieldCheck, MapPin } from "lucide-react";

// --- DATA STRUKTUR ---
const divisionData = [
  {
    name: "Enjiniring & QA",
    icon: Zap,
    bgColor: "#000000", // HITAM PEKAT
    positions: [
      "Asman System Owner",
      "Asman Condition Based Maintenance",
      "Asman MMRK",
    ],
  },
  {
    name: "Operasi & Pemeliharaan",
    icon: Wrench,
    bgColor: "#FBBF24", // KUNING
    positions: [
      "Asman Rendal Operasi",
      "Asman Rendal Pemeliharaan",
      "Asman ICC & Gudang",
      "Asman PLTA Remote",
      "Asman Outage Management",
    ],
  },
  {
    name: "Keuangan & Adm",
    icon: DollarSign,
    bgColor: "#9CA3AF", // ABU-ABU
    positions: [
      "Asman Keuangan",
      "Asman SDM, Umum & CSR",
      "Asman Pengadaan",
    ],
  },
];

const staffData = [
    { name: "Asman K3 & Keamanan", icon: ShieldCheck },
    { name: "Asman Sipil & Lingkungan", icon: Building2 }
];

const unitData = [
    { name: "Asman Distrik A", desc: "PLTA Sutami & Sengguruh" },
    { name: "Asman Distrik B", desc: "PLTA Wlingi & Lodoyo" },
    { name: "Asman Distrik C", desc: "PLTA Tulungagung & Wonorejo" },
    { name: "Asman Distrik D", desc: "PLTA Selorejo, Mendalan, & Siman" },
    { name: "Asman Distrik E", desc: "PLTA Golang, Giringan, & Ngebel" },
    { name: "TL PLTA Ampelgading", desc: "Unit Pembangkitan" },
];

// --- DATA STATS ---
const stats = [
  { 
    icon: Users, 
    value: "533", 
    label: "Total Karyawan",
    colorHex: "#2563EB", 
    bgHex: "#EFF6FF",    
    shadowColor: "rgba(37, 99, 235, 0.2)"
  },
  { 
    icon: Briefcase, 
    value: "18", 
    label: "Assistant Manager",
    colorHex: "#D97706", 
    bgHex: "#FFFBEB",    
    shadowColor: "rgba(217, 119, 6, 0.2)"
  },
  { 
    icon: Building2, 
    value: "116", 
    label: "Karyawan Fungsional",
    colorHex: "#059669", 
    bgHex: "#ECFDF5",    
    shadowColor: "rgba(5, 150, 105, 0.2)"
  },
];

export const OrganizationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const lineStyle = { backgroundColor: 'black', opacity: 1 };

  return (
    <section className="py-24 bg-white text-slate-900 overflow-hidden" ref={ref}>
       
       {/* Background Decoration */}
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
          // UPDATE: Memberikan jarak manual 120px ke bawah agar tidak mepet
          style={{ marginBottom: '120px' }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold tracking-wide mb-6" style={{ color: '#2563EB' }}>
            <Zap className="w-4 h-4" style={{ fill: '#2563EB' }} />
            STRUKTUR ORGANISASI
          </span>
          
          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Tim <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Profesional</span> & Berdedikasi
          </h2>
          
          {/* Description */}
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
          style={{ marginBottom: '120px' }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="relative bg-white rounded-2xl p-8 shadow-xl border border-slate-100 group overflow-hidden"
            >
              {/* Garis Aksen Atas */}
              <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: stat.colorHex }}></div>
              
              {/* Watermark Icon */}
              <stat.icon 
                className="absolute -right-6 -bottom-6 w-32 h-32 transition-transform duration-500 group-hover:scale-110" 
                style={{ color: stat.colorHex, opacity: 0.05 }} 
              />

              <div className="relative z-10 flex flex-col items-center">
                 {/* Icon Bulat Tengah */}
                 <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:rotate-6"
                    style={{ backgroundColor: stat.bgHex }}
                 >
                    <stat.icon className="w-8 h-8" style={{ color: stat.colorHex }} />
                 </div>
                 
                 {/* Angka */}
                 <h3 className="text-5xl font-black text-slate-800 mb-2 tracking-tight">
                    {stat.value}
                 </h3>
                 
                 {/* Label */}
                 <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    {stat.label}
                 </p>
              </div>
            </motion.div>
          ))}
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
              <p className="text-sm text-white/90 mt-1">Tim Manajemen (4 Orang)</p>
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

            {/* DIVISI */}
            {divisionData.map((division, divIndex) => (
              <motion.div key={divIndex} variants={itemVariants} className="space-y-4 flex flex-col items-center">
                <div 
                    className="w-full p-4 rounded-xl text-white text-center shadow-md relative group min-h-[80px] flex flex-col justify-center items-center"
                    style={{ backgroundColor: division.bgColor }}
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <division.icon className="w-5 h-5 text-white" />
                    <h3 className="font-bold text-lg leading-tight">{division.name}</h3>
                  </div>
                  <div className="absolute top-full left-1/2 w-[2px] h-4 -translate-x-1/2" style={lineStyle}></div>
                </div>
                <div className="space-y-3 pt-2 w-full">
                  {division.positions.map((position, posIndex) => (
                    <motion.div
                      key={posIndex}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg bg-white border border-slate-300 shadow-sm text-center text-sm font-medium text-slate-800"
                    >
                      {position}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* STAFF KANAN */}
            <motion.div variants={itemVariants} className="space-y-4 flex flex-col items-center justify-start pt-0">
                 <div className="w-full space-y-4 mt-0">
                    {staffData.map((staff, index) => (
                        <motion.div 
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 rounded-xl bg-white border-2 border-slate-200 shadow-sm flex items-center gap-3 relative"
                            style={{ borderColor: '#e2e8f0' }}
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-2 rounded-l-lg bg-purple-600"></div>
                            <div className="pl-3 flex items-center gap-3">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <staff.icon className="w-5 h-5 text-purple-600" />
                                </div>
                                <span className="font-bold text-slate-800 text-sm">{staff.name}</span>
                            </div>
                             {index === 0 && (
                                <div className="hidden lg:block absolute bottom-full left-1/2 w-[2px] -translate-x-1/2" style={{ ...lineStyle, height: '2rem' }}></div> 
                             )}
                             {index > 0 && (
                                <div className="absolute bottom-full left-1/2 w-[2px] h-4 -translate-x-1/2" style={lineStyle}></div>
                             )}
                        </motion.div>
                    ))}
                 </div>
            </motion.div>
          </div>

          {/* UNIT KEWILAYAHAN */}
          <div className="relative pt-16 border-t-2 border-slate-200 mt-12">
             <div className="hidden lg:block absolute left-1/2 w-[2px] -translate-x-1/2 -z-10" style={{ ...lineStyle, top: '-600px', bottom: '100%', opacity: 0.1 }}></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unitData.map((unit, index) => (
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
                    <div>
                        <h4 className="font-bold text-slate-800">{unit.name}</h4>
                        <p className="text-xs text-slate-500 mt-1">{unit.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};