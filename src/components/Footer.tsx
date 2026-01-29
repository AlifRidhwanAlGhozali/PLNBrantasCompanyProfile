export const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/pln.png" alt="PLN Logo" className="h-12 w-auto" />
            <div>
              <p className="text-base font-semibold text-background/80">PLN Nusantara Power</p>
              <p className="font-bold text-lg">UP Brantas</p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-background/60 mb-2">
              Go Beyond Power, Energizing the Future
            </p>
            <p className="text-xs text-background/40">
              © {new Date().getFullYear()} Unit Pembangkitan Brantas. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
