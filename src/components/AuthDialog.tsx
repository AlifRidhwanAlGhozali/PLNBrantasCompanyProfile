import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { getUser, login, logout } from "@/lib/auth";

type View = "login" | "profile";

export default function AuthDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const u = getUser();
    if (open) {
      if (u) {
        // close dialog immediately if already logged in to avoid showing profile
        setOpen(false);
      } else {
        setView("login");
      }
    }
  }, [open, setOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const u = login(email, password);
      setUser({ name: u.name, email: u.email });
      toast({ title: "Login berhasil", description: `Selamat datang, ${u.name}` });
      // close dialog and let header show logout button
      setOpen(false);
    } catch (err: any) {
      toast({ title: "Login gagal", description: err?.message || "Periksa kredensial", variant: "destructive" });
    }
  };



  const handleLogout = () => {
    logout();
    toast({ title: "Keluar", description: "Anda telah keluar" });
    setUser(null);
    setView("login");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) setOpen(false); }}>
      <DialogContent className="max-w-md bg-primary text-primary-foreground">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl">{view === "login" ? "Masuk" : "Profil"}</DialogTitle>
            </div>
            <DialogClose />
          </div>
        </DialogHeader>

        <div className="mt-2">
          {view === "login" && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <img src="/pln.png" alt="PLN Logo" className="h-10 w-auto" />
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-primary-foreground">PLN Nusantara Power</p>
                  <p className="font-bold text-lg text-primary-foreground">UP Brantas</p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-sm text-primary-foreground/80">User</label>
                  <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div>
                  <label className="text-sm text-primary-foreground/80">Password</label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className="flex items-center justify-end">
                  <Button type="submit" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">Masuk</Button>
                </div>
              </form>
            </>
          )}



          {view === "profile" && (
            <div className="space-y-4">
              {user && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Nama</p>
                    <p className="font-medium text-foreground">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{user.email}</p>
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-border flex justify-end gap-2">
                <Button variant="default" className="bg-primary-foreground text-primary" onClick={() => { setView("login"); }}>Tutup</Button>
                <Button variant="destructive" onClick={handleLogout}>Keluar</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
