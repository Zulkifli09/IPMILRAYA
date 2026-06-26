"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gallerySchema, type GalleryInput } from "@/lib/validations";
import { createGallery } from "@/actions/manage";
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

export function GaleriForm({ divisions }: { divisions: any[] }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<GalleryInput>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: "",
      description: "",
      fileUrl: "",
      fileType: "image",
      divisionId: null,
      date: new Date().toISOString().split("T")[0],
      order: 0,
    },
  });

  async function onSubmit(data: GalleryInput) {
    setLoading(true);
    try {
      const res = await createGallery(data);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Foto berhasil diupload ke galeri");
        router.push("/dashboard/galeri");
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
                <Label>Judul Foto / Kegiatan <span className="text-destructive">*</span></Label>
                <Input {...form.register("title")} placeholder="Masukkan judul..." />
                {form.formState.errors.title && (
                  <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Deskripsi (Opsional)</Label>
                <Textarea {...form.register("description")} rows={3} placeholder="Deskripsi singkat..." />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tanggal</Label>
                  <Input type="date" {...form.register("date")} />
                </div>
                <div className="space-y-2">
                  <Label>Terkait Divisi</Label>
                  <Select
                    value={form.watch("divisionId") || "none"}
                    onValueChange={(val) => form.setValue("divisionId", val === "none" ? null : val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Divisi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Umum (Tidak Ada)</SelectItem>
                      {divisions.map((div) => (
                        <SelectItem key={div.id} value={div.id}>
                          {div.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Upload Foto <span className="text-destructive">*</span></Label>
                <ImageUpload
                  value={form.watch("fileUrl") ? [form.watch("fileUrl")!] : []}
                  onChange={(url) => form.setValue("fileUrl", url)}
                  onRemove={() => form.setValue("fileUrl", "")}
                />
                {form.formState.errors.fileUrl && (
                  <p className="text-xs text-destructive">{form.formState.errors.fileUrl.message}</p>
                )}
              </div>

              <div className="pt-6">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Menyimpan..." : "Upload ke Galeri"}
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
