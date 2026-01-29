import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Blackstart Facility",
    description: "Fasilitas blackstart PLTA Sutami untuk mendukung pemulihan sistem kelistrikan",
  },
  {
    icon: Shield,
    title: "Zero Operator",
    description: "Operasi jarak jauh (remotely operated) dengan sistem kontrol modern",
  },
  {
    icon: Eye,
    title: "Free GOV & AGC",
    description: "PLTA Sutami dilengkapi dengan Free Governor dan Automatic Generation Control",
  },
  {
    icon: Users,
    title: "TMC GBG Facilities",
    description: "Fasilitas Trash Management Center untuk pengelolaan sampah waduk",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tentang" className="py-24 bg-muted/50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Tentang Kami
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Unit Pembangkitan{" "}
              <span className="text-gradient">Brantas</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              UP Brantas merupakan unit pembangkitan di bawah PT PLN Nusantara Power yang mengoperasikan 
              13 Pembangkit Listrik Tenaga Air (PLTA) yang tersebar di 4 kabupaten: Blitar, Tulungagung, 
              Madiun, dan Ponorogo.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Dengan total 28 unit dan kapasitas terpasang 286 MW, UP Brantas berkomitmen untuk 
              menyediakan energi listrik yang andal, bersih, dan berkelanjutan bagi masyarakat Indonesia.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-3xl font-bold text-primary">98.07%</p>
                <p className="text-sm text-muted-foreground">EAF (Ketersediaan)</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-3xl font-bold text-secondary">0.01%</p>
                <p className="text-sm text-muted-foreground">EFOR (Gangguan)</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
