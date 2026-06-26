"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { homepageBannerSchema, type HomepageBannerInput } from "@/lib/validations";
import { createHomepageBanner, updateHomepageBanner } from "@/actions/organization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface BannerFormProps {
  initialData?: any;
}

export function BannerForm({ initialData }: BannerFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(homepageBannerSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      subtitle: initialData?.subtitle ?? "",
      image: initialData?.image ?? "",
      buttonText: initialData?.buttonText ?? "",
      buttonLink: initialData?.buttonLink ?? "",
      order: typeof initialData?.order === "number" ? initialData.order : 0,
      isActive: initialData?.isActive ?? true,
    },
  });

  async function onSubmit(data: HomepageBannerInput) {
    setLoading(true);
    try {
      const res = initialData
        ? await updateHomepageBanner(initialData.id, data)
        : await createHomepageBanner(data);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`Banner berhasil ${initialData ? "diperbarui" : "ditambahkan"}`);
        router.push("/dashboard/banner");
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
                <Label>Gambar Banner <span className="text-destructive">*</span></Label>
                <ImageUpload
                  value={form.watch("image") ? [form.watch("image")!] : []}
                  onChange={(url) => form.setValue("image", url)}
                  onRemove={() => form.setValue("image", "")}
                />
                {form.formState.errors.image && (
                  <p className="text-xs text-destructive">{form.formState.errors.image.message}</p>
                )}
                <p className="text-xs text-muted-foreground">Disarankan: Resolusi HD (1920x1080px) landscape.</p>
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t border-border">
                <Switch
                  checked={form.watch("isActive")}
                  onCheckedChange={(checked) => form.setValue("isActive", checked)}
                />
                <Label>Status Aktif</Label>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Judul Teks (Opsional)</Label>
                <Input {...form.register("title")} placeholder="Contoh: Selamat Datang di IPMIL" />
              </div>

              <div className="space-y-2">
                <Label>Subjudul (Opsional)</Label>
                <Input {...form.register("subtitle")} placeholder="Satu langkah lebih maju..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Teks Tombol</Label>
                  <Input {...form.register("buttonText")} placeholder="Contoh: Baca Selengkapnya" />
                </div>
                <div className="space-y-2">
                  <Label>Link Tombol</Label>
                  <Input {...form.register("buttonLink")} placeholder="https://..." />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Urutan Tampil (Order)</Label>
                <Input type="number" {...form.register("order", { valueAsNumber: true })} />
              </div>

              <div className="pt-6">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Menyimpan..." : initialData ? "Simpan Perubahan" : "Tambah Banner"}
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
