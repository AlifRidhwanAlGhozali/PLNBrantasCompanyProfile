import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/lib/auth";
import * as auth from "@/lib/auth";
import { readSettings, writeSettings } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const currentUser = getUser();
  const [users, setUsers] = useState<Array<{ name: string; email: string }>>([]);
  const settings = readSettings();
  const [totalKaryawan, setTotalKaryawan] = useState<number>(settings.totalKaryawan);
  const [assistantManager, setAssistantManager] = useState<number>(settings.assistantManager);
  const [karyawanFungsional, setKaryawanFungsional] = useState<number>(settings.karyawanFungsional);

  // Awards / Prestasi & Penghargaan editable list
  const [awards, setAwards] = useState(settings.awards || []);

  const handleAddAward = () => setAwards([...awards, { title: "", category: "", description: "", icon: "Trophy" }]);

  const handleChangeAward = (index: number, field: string, value: string) => {
    const next = [...awards];
    (next[index] as any)[field] = value;
    setAwards(next);
  };

  const handleSaveAwards = () => {
    writeSettings({ awards });
    toast({ title: "Disimpan", description: "Data penghargaan berhasil disimpan" });
  };

  const handleDeleteAward = (index: number) => {
    if (!confirm("Hapus penghargaan ini?")) return;
    const next = awards.filter((_, i) => i !== index);
    setAwards(next);
    writeSettings({ awards: next });
    toast({ title: "Dihapus", description: "Penghargaan dihapus" });
  };

  useEffect(() => {
    // only allow admin (email === "admin")
    if (!currentUser) {
      navigate("/");
      return;
    }
    if (currentUser.email !== "admin") {
      navigate("/");
      return;
    }

    setUsers(auth.listUsers().map((u) => ({ name: u.name, email: u.email })));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = (email: string) => {
    if (!confirm(`Hapus user dengan email ${email}?`)) return;
    auth.deleteUser(email);
    setUsers(auth.listUsers().map((u) => ({ name: u.name, email: u.email })));
    toast({ title: "Dihapus", description: `User ${email} berhasil dihapus` });
  };

  const handleSaveSettings = () => {
    writeSettings({
      totalKaryawan: Number(totalKaryawan) || 0,
      assistantManager: Number(assistantManager) || 0,
      karyawanFungsional: Number(karyawanFungsional) || 0,
    });
    toast({ title: "Disimpan", description: "Informasi organisasi berhasil disimpan" });
  };


  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-6 text-muted-foreground">Kelola pengguna dan data aplikasi.</p>

      <div className="bg-card border border-border rounded-lg p-4">
        <h2 className="font-semibold mb-3">Daftar Pengguna</h2>
        {users.length === 0 ? (
          <p className="text-sm text-muted-foreground">Tidak ada pengguna.</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2">Nama</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="border-t border-border">
                    <td className="py-3">{u.name}</td>
                    <td className="py-3">{u.email}</td>
                    <td className="py-3">
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(u.email)}>
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SETTINGS: editable stats */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold mb-4">Pengaturan Organisasi</h2>
        <div className="bg-card border border-border rounded-lg p-4 max-w-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Total Karyawan</label>
              <input type="number" value={totalKaryawan} onChange={(e) => setTotalKaryawan(Number(e.target.value))} className="w-full rounded-md border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Assistant Manager</label>
              <input type="number" value={assistantManager} onChange={(e) => setAssistantManager(Number(e.target.value))} className="w-full rounded-md border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Karyawan Fungsional</label>
              <input type="number" value={karyawanFungsional} onChange={(e) => setKaryawanFungsional(Number(e.target.value))} className="w-full rounded-md border px-3 py-2" />
            </div>
          </div>

          <div className="flex gap-2">
            <button className="btn btn-primary px-3 py-2 rounded-md bg-blue-600 text-white" onClick={handleSaveSettings}>Simpan</button>
            <button className="btn px-3 py-2 rounded-md border" onClick={() => {
              const s = readSettings();
              setTotalKaryawan(s.totalKaryawan);
              setAssistantManager(s.assistantManager);
              setKaryawanFungsional(s.karyawanFungsional);
              toast({ title: 'Dikembalikan', description: 'Nilai dikembalikan dari pengaturan saat ini' });
            }}>Reset</button>
          </div>
        </div>
      </div>

      {/* AWARDS: Prestasi & Penghargaan */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold mb-4">Prestasi &amp; Penghargaan</h2>
        <div className="bg-card border border-border rounded-lg p-4 max-w-3xl">
          <p className="text-sm text-muted-foreground mb-4">Kelola rekam jejak keunggulan — tambah, edit, atau hapus item penghargaan.</p>

          {awards.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada penghargaan.</p>
          ) : (
            <div className="space-y-4">
              {awards.map((a, idx) => (
                <div key={idx} className="border rounded-md p-3 grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                  <div className="md:col-span-1">
                    <input type="text" value={a.title} onChange={(e) => handleChangeAward(idx, 'title', e.target.value)} placeholder="Judul" className="w-full rounded-md border px-3 py-2" />
                  </div>
                  <div className="md:col-span-1">
                    <input type="text" value={a.category} onChange={(e) => handleChangeAward(idx, 'category', e.target.value)} placeholder="Kategori" className="w-full rounded-md border px-3 py-2" />
                  </div>
                  <div className="md:col-span-1">
                    <input type="text" value={a.icon} onChange={(e) => handleChangeAward(idx, 'icon', e.target.value)} placeholder="Icon (Trophy/Award/Medal/Star)" className="w-full rounded-md border px-3 py-2" />
                  </div>
                  <div className="md:col-span-1 flex gap-2">
                    <input type="text" value={a.description} onChange={(e) => handleChangeAward(idx, 'description', e.target.value)} placeholder="Deskripsi" className="w-full rounded-md border px-3 py-2" />
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteAward(idx)}>Hapus</Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button className="btn px-3 py-2 rounded-md border" onClick={handleAddAward}>Tambah Penghargaan</button>
            <button className="btn btn-primary px-3 py-2 rounded-md bg-green-600 text-white" onClick={handleSaveAwards}>Simpan Penghargaan</button>
            <button className="btn px-3 py-2 rounded-md border" onClick={() => { const s = readSettings(); setAwards(s.awards); toast({ title: 'Dikembalikan', description: 'Penghargaan dikembalikan dari pengaturan saat ini' }); }}>Reset</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Admin;
