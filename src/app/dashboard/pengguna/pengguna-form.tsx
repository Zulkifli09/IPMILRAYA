"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { updateUser } from "@/actions/manage";
import { createUserAction } from "@/actions/auth";

interface PenggunaFormProps {
  initialData?: any;
}

export function PenggunaForm({ initialData }: PenggunaFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Using simple state instead of react-hook-form for this simple form
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: "",
    role: "ADMIN" as const,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (!initialData && !formData.password) {
        toast.error("Password wajib diisi untuk pengguna baru!");
        setLoading(false);
        return;
      }

      const res = initialData
        ? await updateUser(initialData.id, formData)
        : await createUserAction(formData);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`Pengguna berhasil ${initialData ? "diperbarui" : "ditambahkan"}`);
        router.push("/dashboard/pengguna");
        router.refresh();
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-xl">
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Lengkap <span className="text-destructive">*</span></Label>
              <Input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama pengguna" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Alamat Email <span className="text-destructive">*</span></Label>
              <Input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@contoh.com" 
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Password {initialData && "(Kosongkan jika tidak ingin mengubah)"}</Label>
              <Input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="******" 
                required={!initialData}
              />
            </div>

            <input type="hidden" name="role" value="ADMIN" />
          </div>

          <div className="pt-4 border-t border-border flex gap-2">
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? "Menyimpan..." : initialData ? "Simpan Perubahan" : "Tambah Pengguna"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => router.back()}
              disabled={loading}
            >
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
