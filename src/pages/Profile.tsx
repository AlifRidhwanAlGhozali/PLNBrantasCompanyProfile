import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getUser, logout } from "@/lib/auth";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      navigate("/login");
      return;
    }
    setUser({ name: u.name, email: u.email });
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-2xl border border-border">
        <h2 className="text-2xl font-bold mb-4">Profil</h2>
        {user && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nama</p>
              <p className="font-medium text-foreground">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{user.email}</p>
            </div>

            <div className="pt-4 border-t border-border">
              <Button variant="destructive" onClick={handleLogout}>Keluar</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
