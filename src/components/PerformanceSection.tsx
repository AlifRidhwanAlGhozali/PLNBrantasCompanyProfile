import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Activity, Gauge, BarChart3 } from "lucide-react";

const performanceData = [
  {
    label: "EAF",
    value: "98.07%",
    target: "97.39%",
    description: "Equivalent Availability Factor",
    icon: Gauge,
    status: "above",
  },
  {
    label: "EFOR",
    value: "0.01%",
    target: "0.19%",
    description: "Equivalent Forced Outage Rate",
    icon: Activity,
    status: "below",
  },
  {
    label: "SOF",
    value: "1.93",
    target: "2.48",
    description: "Scheduled Outage Factor",
    icon: TrendingUp,
    status: "below",
  },
  {
    label: "Produksi",
    value: "982.77 GWh",
    target: "1310.33",
    description: "Total Produksi Listrik",
    icon: BarChart3,
    status: "below",
  },
];

export const PerformanceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="kinerja" className="py-24 bg-muted/50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Kinerja Operasi
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Kinerja <span className="text-gradient">Tahun 2024</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pencapaian kinerja operasi yang melampaui target dengan standar keandalan tinggi
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="relative p-6 rounded-2xl bg-card border border-border overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  item.status === "above" 
                    ? "bg-secondary/10 text-secondary" 
                    : "bg-primary/10 text-primary"
                }`}>
                  Target: {item.target}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {item.value}
              </h3>
              <p className="text-lg font-semibold text-primary mb-1">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* ISO Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-card border border-border"
        >
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Sertifikasi Sistem Manajemen</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "ISO 9001:2015",
              "ISO 14001:2015",
              "ISO 45001:2018",
              "ISO 50001:2018",
              "ISO 55001:2014",
              "ISO 27001:2013",
              "ISO 20000-1:2018",
              "ISO 22301:2012",
              "ISO 37001:2016",
            ].map((cert, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-muted border border-border text-sm font-medium text-foreground"
              >
                {cert}
              </span>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6">
            PLN NP adalah perusahaan pembangkit pertama di Indonesia yang meraih sertifikat Asset Management System ISO 55001:2014
          </p>
        </motion.div>
      </div>
    </section>
  );
};
