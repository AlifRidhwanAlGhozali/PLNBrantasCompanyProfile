import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/AuthDialog";

const navLinks = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#pembangkit", label: "Pembangkit" },
  { href: "#kinerja", label: "Kinerja" },
  { href: "#esg", label: "ESG" },
  { href: "#penghargaan", label: "Penghargaan" },
  { href: "#kontak", label: "Kontak" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-3">
            <img src="/pln.png" alt="PLN Logo" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <p className={`text-sm font-semibold ${isScrolled ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
                PLN Nusantara Power
              </p>
              <p className={`font-bold text-lg ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}>
                UP Brantas
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 ml-4">
              <Button variant="default" size="sm" onClick={() => setIsAuthOpen(true)}>Masuk</Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${isScrolled ? "" : "text-primary-foreground hover:bg-primary-foreground/10"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-border flex gap-2">
                <Button variant="default" onClick={() => setIsAuthOpen(true)}>Masuk</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <AuthDialog open={isAuthOpen} setOpen={setIsAuthOpen} />
    </motion.header>
  );
};
