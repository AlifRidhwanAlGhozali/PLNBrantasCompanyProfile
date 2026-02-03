import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { signup, getUser } from "@/lib/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (getUser()) navigate("/profile");
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      signup({ name, email, password });
      toast({ title: "Akun dibuat", description: "Anda berhasil mendaftar", });
      navigate("/profile");
    } catch (err: any) {
      toast({ title: "Gagal mendaftar", description: err?.message || "Terjadi kesalahan", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-2xl border border-border">
        <h2 className="text-2xl font-bold mb-4">Daftar</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Nama</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="flex items-center justify-between">
            <Link to="/login" className="text-sm text-primary underline">Sudah punya akun? Masuk</Link>
            <Button type="submit">Daftar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
