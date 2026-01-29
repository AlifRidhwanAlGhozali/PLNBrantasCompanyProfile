import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Droplets, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

const powerPlants = [
  { name: "PLTA Sutami", location: "Malang", capacity: "3 x 35 MW", description: "Pembangkit Listrik Tenaga Air Sutami terletak di Malang dengan total kapasitas 105 MW. Merupakan salah satu PLTA terbesar di Jawa Timur dan memiliki peran strategis dalam pasokan listrik nasional." },
  { name: "PLTA Sengguruh", location: "Malang", capacity: "29 MW", description: "PLTA Sengguruh berlokasi di Malang dengan kapasitas 29 MW. Turut berkontribusi dalam sistem kelistrikan Jawa Timur sebagai bagian dari cascade Sungai Brantas." },
  { name: "PLTA Wlingi", location: "Blitar", capacity: "54 MW", description: "PLTA Wlingi di Blitar memiliki kapasitas 54 MW, menjadi pembangkit yang signifikan dalam menghasilkan energi terbarukan di kawasan Blitar." },
  { name: "PLTA Lodoyo", location: "Blitar", capacity: "4.5 MW", description: "PLTA Lodoyo berlokasi di Blitar dengan kapasitas 4.5 MW. Sebagai bagian dari cascade, turut menjaga stabilitas pasokan listrik di wilayah Blitar." },
  { name: "PLTA Selorejo", location: "Malang", capacity: "4.5 MW", description: "PLTA Selorejo di Malang memiliki kapasitas 4.5 MW dan berkontribusi dalam sistem pengelolaan air dan energi terbarukan di kawasan Malang." },
  { name: "PLTA Mendalan", location: "Malang", capacity: "23 MW", description: "PLTA Mendalan berlokasi di Malang dengan kapasitas 23 MW. Fasilitas ini memainkan peran penting dalam cascade Sungai Brantas." },
  { name: "PLTA Siman", location: "Malang", capacity: "10 MW", description: "PLTA Siman di Malang memiliki kapasitas 10 MW dan merupakan bagian integral dari sistem pembangkitan tenaga air di kawasan Malang." },
  { name: "PLTA Giringan", location: "Madiun", capacity: "2 MW", description: "PLTA Giringan berlokasi di Madiun dengan kapasitas 2 MW. Meskipun berkapasitas kecil, tetap berkontribusi pada ketersediaan energi terbarukan lokal." },
  { name: "PLTA Golang", location: "Madiun", capacity: "8 MW", description: "PLTA Golang di Madiun memiliki kapasitas 8 MW dan menjadi sumber energi terbarukan yang stabil di kawasan Madiun." },
  { name: "PLTA Tulungagung", location: "Tulungagung", capacity: "36 MW", description: "PLTA Tulungagung berlokasi di Tulungagung dengan kapasitas 36 MW, menjadi pembangkit signifikan dalam kawasan Tulungagung." },
  { name: "PLTA Wonorejo", location: "Tulungagung", capacity: "6.4 MW", description: "PLTA Wonorejo di Tulungagung memiliki kapasitas 6.4 MW dan turut mendukung ketersediaan listrik di wilayah Tulungagung." },
  { name: "PLTA Ngebel", location: "Ponorogo", capacity: "8.3 MW", description: "PLTA Ngebel berlokasi di Ponorogo dengan kapasitas 8.3 MW, menyediakan energi terbarukan untuk wilayah Ponorogo dan sekitarnya." },
  { name: "PLTA Ampelgading", location: "Malang", capacity: "2 MW", description: "PLTA Ampelgading di Malang memiliki kapasitas 2 MW. Meskipun berkapasitas kecil, tetap menjadi bagian dari sistem cascade Sungai Brantas." },
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
  const [selectedPlant, setSelectedPlant] = useState<(typeof powerPlants)[0] | null>(null);

  return (
    <section id="pembangkit" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
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

        {/* Power Plants Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16"
        >
          {powerPlants.map((plant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              onClick={() => setSelectedPlant(plant)}
              className="group relative p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
              
              <div className="relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{plant.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {plant.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Kapasitas</span>
                  <span className="font-semibold text-secondary">{plant.capacity}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Districts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Pembagian Distrik</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {districts.map((district, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-muted border border-border text-center"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium mb-2">
                  {district.name}
                </span>
                <p className="text-sm text-muted-foreground">{district.plants}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Dialog Popup */}
      <Dialog open={selectedPlant !== null} onOpenChange={(open) => !open && setSelectedPlant(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DialogTitle className="text-2xl">{selectedPlant?.name}</DialogTitle>
                <div className="flex items-center gap-2 text-muted-foreground mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedPlant?.location}</span>
                </div>
              </div>
              <DialogClose className="mt-1" />
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Kapasitas Terpasang</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{selectedPlant?.capacity}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedPlant?.description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
