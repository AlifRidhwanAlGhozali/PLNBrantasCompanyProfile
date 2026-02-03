import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { login, getUser } from "@/lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (getUser()) navigate("/profile");
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      login(email, password);
      toast({ title: "Login berhasil", description: "Selamat datang", });
      navigate("/profile");
    } catch (err: any) {
      toast({ title: "Login gagal", description: err?.message || "Periksa kredensial", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-2xl border border-border">
        <h2 className="text-2xl font-bold mb-4">Masuk</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">User</label>
            <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="flex items-center justify-end">
            <Button type="submit" variant="default" className="bg-primary text-primary-foreground">Masuk</Button>
          </div>
        </form>

        {!import.meta.env?.PROD && (
          <div className="mt-4 p-3 rounded-md bg-primary/5 border border-primary/10 text-sm text-primary-700">
            <span className="font-semibold">Demo:</span>
            <span className="ml-2">User: <code className="font-mono">admin</code></span>
            <span className="mx-2">•</span>
            <span>Password: <code className="font-mono">admin</code></span>
          </div>
        )}

      </div>
    </div>
  );
}
