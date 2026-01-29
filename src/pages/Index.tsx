import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { OrganizationSection } from "@/components/OrganizationSection";
import { PowerPlantsSection } from "@/components/PowerPlantsSection";
import { PerformanceSection } from "@/components/PerformanceSection";
import { ESGSection } from "@/components/ESGSection";
import { AwardsSection } from "@/components/AwardsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <OrganizationSection />
        <PowerPlantsSection />
        <PerformanceSection />
        <ESGSection />
        <AwardsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
