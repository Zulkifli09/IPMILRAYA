"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { divisionSchema, type DivisionInput } from "@/lib/validations";
import { createDivision, updateDivision } from "@/actions/manage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface DivisiFormProps {
  initialData?: any;
}

export function DivisiForm({ initialData }: DivisiFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<DivisionInput>({
    resolver: zodResolver(divisionSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      duties: initialData?.duties || "",
      image: initialData?.image || "",
      leaderId: initialData?.leaderId || "",
      order: initialData?.order || 0,
      isActive: initialData?.isActive ?? true,
    },
  });

  async function onSubmit(data: DivisionInput) {
    setLoading(true);
    try {
      const res = initialData
        ? await updateDivision(initialData.id, data)
        : await createDivision(data);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`Divisi berhasil ${initialData ? "diperbarui" : "ditambahkan"}`);
        router.push("/dashboard/divisi");
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
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Nama Divisi <span className="text-destructive">*</span></Label>
                <Input {...form.register("name")} placeholder="Contoh: Divisi Humas" />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Slug (Opsional)</Label>
                <Input {...form.register("slug")} placeholder="divisi-humas" />
                <p className="text-xs text-muted-foreground">Biarkan kosong untuk otomatisasi dari nama divisi.</p>
              </div>

              <div className="space-y-2">
                <Label>Deskripsi Singkat</Label>
                <Textarea {...form.register("description")} rows={3} placeholder="Penjelasan mengenai divisi..." />
              </div>

              <div className="space-y-2">
                <Label>Tugas & Fungsi (Tupoksi)</Label>
                <Textarea {...form.register("duties")} rows={5} placeholder="Rincian tugas dan fungsi divisi..." />
              </div>

              <div className="space-y-2">
                <Label>Urutan Tampil (Order)</Label>
                <Input type="number" {...form.register("order", { valueAsNumber: true })} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Logo / Ikon Divisi</Label>
                <ImageUpload
                  value={form.watch("image") ? [form.watch("image")!] : []}
                  onChange={(url) => form.setValue("image", url)}
                  onRemove={() => form.setValue("image", "")}
                />
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t border-border">
                <Switch
                  checked={form.watch("isActive")}
                  onCheckedChange={(checked) => form.setValue("isActive", checked)}
                />
                <Label>Status Aktif</Label>
              </div>

              <div className="pt-6">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Menyimpan..." : initialData ? "Simpan Perubahan" : "Tambah Divisi"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
