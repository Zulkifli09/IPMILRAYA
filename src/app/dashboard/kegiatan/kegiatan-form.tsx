"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activitySchema, type ActivityInput } from "@/lib/validations";
import { createActivity, updateActivity } from "@/actions/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface KegiatanFormProps {
  initialData?: any;
}

export function KegiatanForm({ initialData }: KegiatanFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ActivityInput>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      date: initialData?.date ? new Date(initialData.date).toISOString().split("T")[0] : "",
      endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split("T")[0] : "",
      location: initialData?.location || "",
      poster: initialData?.poster || "",
      documentation: initialData?.documentation || [],
      status: initialData?.status || "DRAFT",
    },
  });

  async function onSubmit(data: ActivityInput) {
    setLoading(true);
    try {
      const res = initialData
        ? await updateActivity(initialData.id, data)
        : await createActivity(data);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`Kegiatan berhasil ${initialData ? "diperbarui" : "dibuat"}`);
        router.push("/dashboard/kegiatan");
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
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <Label>Nama Kegiatan <span className="text-destructive">*</span></Label>
                <Input {...form.register("name")} placeholder="Contoh: Seminar Nasional Teknologi..." />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Slug (URL) - Opsional</Label>
                <Input {...form.register("slug")} placeholder="seminar-nasional-teknologi" />
                <p className="text-xs text-muted-foreground">Biarkan kosong untuk generate otomatis dari nama kegiatan.</p>
              </div>

              <div className="space-y-2">
                <Label>Deskripsi Kegiatan</Label>
                <Textarea {...form.register("description")} rows={6} placeholder="Jelaskan detail mengenai kegiatan ini..." />
              </div>

              <div className="space-y-2">
                <Label>Lokasi / Tempat</Label>
                <Input {...form.register("location")} placeholder="Gedung XYZ / Zoom Meeting" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Status Publikasi</Label>
                <Select
                  value={form.watch("status")}
                  onValueChange={(val: any) => form.setValue("status", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Terbit (Published)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                <div className="space-y-2">
                  <Label>Tanggal Mulai <span className="text-destructive">*</span></Label>
                  <Input type="date" {...form.register("date")} />
                  {form.formState.errors.date && (
                    <p className="text-xs text-destructive">{form.formState.errors.date.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Selesai</Label>
                  <Input type="date" {...form.register("endDate")} />
                </div>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <Label>Poster Kegiatan</Label>
                <ImageUpload
                  value={form.watch("poster") ? [form.watch("poster")!] : []}
                  onChange={(url) => form.setValue("poster", url)}
                  onRemove={() => form.setValue("poster", "")}
                />
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <Label>Dokumentasi (Max 5)</Label>
                <ImageUpload
                  value={form.watch("documentation") || []}
                  onChange={(url) => {
                    const current = form.watch("documentation") || [];
                    if (current.length < 5) {
                      form.setValue("documentation", [...current, url]);
                    }
                  }}
                  onRemove={(url) => {
                    const current = form.watch("documentation") || [];
                    form.setValue("documentation", current.filter((u) => u !== url));
                  }}
                  maxFiles={5}
                />
              </div>

              <div className="pt-6">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Menyimpan..." : initialData ? "Simpan Perubahan" : "Buat Kegiatan"}
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
