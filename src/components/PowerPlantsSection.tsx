import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Droplets, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

const powerPlants = [
  { name: "PLTA Sutami", location: "Malang", capacity: "3 x 35 MW", image: "/plta-sutami.jpg", description: "Pembangkit Listrik Tenaga Air Sutami terletak di Malang dengan total kapasitas 105 MW. Merupakan salah satu PLTA terbesar di Jawa Timur dan memiliki peran strategis dalam pasokan listrik nasional." },
  { name: "PLTA Sengguruh", location: "Malang", capacity: "29 MW", image: "/fotobrantas.jpeg", description: "PLTA Sengguruh berlokasi di Malang dengan kapasitas 29 MW. Turut berkontribusi dalam sistem kelistrikan Jawa Timur sebagai bagian dari cascade Sungai Brantas." },
  { name: "PLTA Wlingi", location: "Blitar", capacity: "54 MW", image: "/fotobrantas.jpeg", description: "PLTA Wlingi di Blitar memiliki kapasitas 54 MW, menjadi pembangkit yang signifikan dalam menghasilkan energi terbarukan di kawasan Blitar." },
  { name: "PLTA Lodoyo", location: "Blitar", capacity: "4.5 MW", image: "/fotobrantas.jpeg", description: "PLTA Lodoyo berlokasi di Blitar dengan kapasitas 4.5 MW. Sebagai bagian dari cascade, turut menjaga stabilitas pasokan listrik di wilayah Blitar." },
  { name: "PLTA Selorejo", location: "Malang", capacity: "4.5 MW", image: "/fotobrantas.jpeg", description: "PLTA Selorejo di Malang memiliki kapasitas 4.5 MW dan berkontribusi dalam sistem pengelolaan air dan energi terbarukan di kawasan Malang." },
  { name: "PLTA Mendalan", location: "Malang", capacity: "23 MW", image: "/fotobrantas.jpeg", description: "PLTA Mendalan berlokasi di Malang dengan kapasitas 23 MW. Fasilitas ini memainkan peran penting dalam cascade Sungai Brantas." },
  { name: "PLTA Siman", location: "Malang", capacity: "10 MW", image: "/fotobrantas.jpeg", description: "PLTA Siman di Malang memiliki kapasitas 10 MW dan merupakan bagian integral dari sistem pembangkitan tenaga air di kawasan Malang." },
  { name: "PLTA Giringan", location: "Madiun", capacity: "2 MW", image: "/fotobrantas.jpeg", description: "PLTA Giringan berlokasi di Madiun dengan kapasitas 2 MW. Meskipun berkapasitas kecil, tetap berkontribusi pada ketersediaan energi terbarukan lokal." },
  { name: "PLTA Golang", location: "Madiun", capacity: "8 MW", image: "/fotobrantas.jpeg", description: "PLTA Golang di Madiun memiliki kapasitas 8 MW dan menjadi sumber energi terbarukan yang stabil di kawasan Madiun." },
  { name: "PLTA Tulungagung", location: "Tulungagung", capacity: "36 MW", image: "/fotobrantas.jpeg", description: "PLTA Tulungagung berlokasi di Tulungagung dengan kapasitas 36 MW, menjadi pembangkit signifikan dalam kawasan Tulungagung." },
  { name: "PLTA Wonorejo", location: "Tulungagung", capacity: "6.4 MW", image: "/fotobrantas.jpeg", description: "PLTA Wonorejo di Tulungagung memiliki kapasitas 6.4 MW dan turut mendukung ketersediaan listrik di wilayah Tulungagung." },
  { name: "PLTA Ngebel", location: "Ponorogo", capacity: "8.3 MW", image: "/fotobrantas.jpeg", description: "PLTA Ngebel berlokasi di Ponorogo dengan kapasitas 8.3 MW, menyediakan energi terbarukan untuk wilayah Ponorogo dan sekitarnya." },
  { name: "PLTA Ampelgading", location: "Malang", capacity: "2 MW", image: "/fotobrantas.jpeg", description: "PLTA Ampelgading di Malang memiliki kapasitas 2 MW. Meskipun berkapasitas kecil, tetap menjadi bagian dari sistem cascade Sungai Brantas." },
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

        {/* Power Plants Grid - Hidden, kept for reference */}
        {/* Tampilan diubah ke grid Distrik saja */}

        {/* Districts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {districts.map((district, index) => {
            // Mapping distrik dengan PLTA-nya
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
                  {/* Distrik Header */}
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-3">
                      {district.name}
                    </span>
                  </div>

                  {/* PLTA List in District */}
                  <div className="space-y-3">
                    {districtPlants.map((plant, plantIndex) => (
                      <div
                        key={plantIndex}
                        onClick={() => setSelectedPlant(plant)}
                        className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all cursor-pointer hover:shadow-md"
                      >
                        <div className="flex items-start gap-2">
                          <Droplets className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-foreground">{plant.name}</h4>
                            <p className="text-xs text-muted-foreground">{plant.capacity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Capacity Summary */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">Total PLTA: {districtPlants.length}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <Dialog open={selectedPlant !== null} onOpenChange={(open) => !open && setSelectedPlant(null)}>
        <DialogContent className="max-w-2xl">
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
            {/* Image */}
            <img 
              src={selectedPlant?.image} 
              alt={selectedPlant?.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            
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
