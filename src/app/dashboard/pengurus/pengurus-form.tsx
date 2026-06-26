"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { managementSchema, type ManagementInput } from "@/lib/validations";
import { createManagement, updateManagement } from "@/actions/manage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface PengurusFormProps {
  initialData?: any;
}

export function PengurusForm({ initialData }: PengurusFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ManagementInput>({
    resolver: zodResolver(managementSchema),
    defaultValues: {
      name: initialData?.name || "",
      position: initialData?.position || "",
      period: initialData?.period || new Date().getFullYear().toString(),
      image: initialData?.image || "",
      bio: initialData?.bio || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      instagram: initialData?.instagram || "",
      linkedin: initialData?.linkedin || "",
      order: initialData?.order || 0,
      isActive: initialData?.isActive ?? true,
      userId: initialData?.userId || null,
    },
  });

  async function onSubmit(data: ManagementInput) {
    setLoading(true);
    try {
      const res = initialData
        ? await updateManagement(initialData.id, data)
        : await createManagement(data);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`Data pengurus berhasil ${initialData ? "diperbarui" : "ditambahkan"}`);
        router.push("/dashboard/pengurus");
        router.refresh();
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Nama Lengkap <span className="text-destructive">*</span></Label>
              <Input {...form.register("name")} placeholder="Masukkan nama..." />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Jabatan <span className="text-destructive">*</span></Label>
              <Input {...form.register("position")} placeholder="Contoh: Ketua Umum" />
              {form.formState.errors.position && (
                <p className="text-xs text-destructive">{form.formState.errors.position.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Periode <span className="text-destructive">*</span></Label>
              <Input {...form.register("period")} placeholder="Contoh: 2026-2027" />
            </div>

            <div className="space-y-2">
              <Label>No. Telepon / WhatsApp</Label>
              <Input {...form.register("phone")} placeholder="+62..." />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" {...form.register("email")} placeholder="email@contoh.com" />
            </div>

            <div className="space-y-2">
              <Label>Instagram URL</Label>
              <Input {...form.register("instagram")} placeholder="https://instagram.com/..." />
            </div>

            <div className="space-y-2">
              <Label>LinkedIn URL</Label>
              <Input {...form.register("linkedin")} placeholder="https://linkedin.com/in/..." />
            </div>

            <div className="space-y-2">
              <Label>Urutan Tampil (Order)</Label>
              <Input type="number" {...form.register("order", { valueAsNumber: true })} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Biografi Singkat</Label>
            <Textarea {...form.register("bio")} rows={3} placeholder="Deskripsi singkat tentang pengurus..." />
          </div>

          <div className="space-y-2">
            <Label>Foto Profil</Label>
            <ImageUpload
              value={form.watch("image") ? [form.watch("image")!] : []}
              onChange={(url) => form.setValue("image", url)}
              onRemove={() => form.setValue("image", "")}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={form.watch("isActive")}
              onCheckedChange={(checked) => form.setValue("isActive", checked)}
            />
            <Label>Status Aktif</Label>
          </div>

          <div className="pt-6 border-t border-border">
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? "Menyimpan..." : initialData ? "Simpan Perubahan" : "Tambah Pengurus"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2"
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
