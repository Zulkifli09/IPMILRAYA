"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSchema, type NewsInput } from "@/lib/validations";
import { createNews, updateNews } from "@/actions/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
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

interface BeritaFormProps {
  initialData?: any;
}

export function BeritaForm({ initialData }: BeritaFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<NewsInput>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      thumbnail: initialData?.thumbnail || "",
      content: initialData?.content || "",
      excerpt: initialData?.excerpt || "",
      status: initialData?.status || "DRAFT",
    },
  });

  async function onSubmit(data: NewsInput) {
    setLoading(true);
    try {
      const res = initialData
        ? await updateNews(initialData.id, data)
        : await createNews(data);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`Berita berhasil ${initialData ? "diperbarui" : "dibuat"}`);
        router.push("/dashboard/berita");
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
                <Label>Judul Berita <span className="text-destructive">*</span></Label>
                <Input {...form.register("title")} placeholder="Masukkan judul berita..." />
                {form.formState.errors.title && (
                  <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Slug (URL) - Opsional</Label>
                <Input {...form.register("slug")} placeholder="judul-berita-anda" />
                <p className="text-xs text-muted-foreground">Biarkan kosong untuk generate otomatis dari judul.</p>
              </div>

              <div className="space-y-2">
                <Label>Ringkasan (Excerpt)</Label>
                <Textarea {...form.register("excerpt")} rows={3} placeholder="Ringkasan singkat tentang berita ini..." />
              </div>

              <div className="space-y-2">
                <Label>Konten Berita <span className="text-destructive">*</span></Label>
                <RichTextEditor 
                  value={form.watch("content") || ""} 
                  onChange={(val) => form.setValue("content", val)} 
                  placeholder="Tulis konten berita di sini..."
                />
                {form.formState.errors.content && (
                  <p className="text-xs text-destructive">{form.formState.errors.content.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Status</Label>
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

              <div className="space-y-2 border-t border-border pt-4">
                <Label>Thumbnail Berita</Label>
                <ImageUpload
                  value={form.watch("thumbnail") ? [form.watch("thumbnail")!] : []}
                  onChange={(url) => form.setValue("thumbnail", url)}
                  onRemove={() => form.setValue("thumbnail", "")}
                />
              </div>

              <div className="pt-6">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Menyimpan..." : initialData ? "Simpan Perubahan" : "Buat Berita"}
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
