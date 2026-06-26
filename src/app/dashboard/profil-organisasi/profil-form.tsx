"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { organizationProfileSchema, type OrganizationProfileInput } from "@/lib/validations";
import { updateOrganizationProfile } from "@/actions/organization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

export function ProfilForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<OrganizationProfileInput>({
    resolver: zodResolver(organizationProfileSchema),
    defaultValues: {
      name: initialData?.name || "",
      shortName: initialData?.shortName || "",
      description: initialData?.description || "",
      logo: initialData?.logo || "",
      favicon: initialData?.favicon || "",
      foundedDate: initialData?.foundedDate ? new Date(initialData.foundedDate).toISOString().split("T")[0] : "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
      mapEmbed: initialData?.mapEmbed || "",
    },
  });

  async function onSubmit(data: OrganizationProfileInput) {
    setLoading(true);
    try {
      const res = await updateOrganizationProfile(data);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Profil berhasil diperbarui");
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
              <Label>Nama Organisasi <span className="text-destructive">*</span></Label>
              <Input {...form.register("name")} placeholder="Contoh: Ikatan Pelajar Mahasiswa..." />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Nama Singkat / Singkatan</Label>
              <Input {...form.register("shortName")} placeholder="Contoh: IPMIL" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Deskripsi Organisasi</Label>
            <RichTextEditor 
              value={form.watch("description") || ""} 
              onChange={(val) => form.setValue("description", val)} 
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Logo Organisasi</Label>
              <ImageUpload
                value={form.watch("logo") ? [form.watch("logo")!] : []}
                onChange={(url) => form.setValue("logo", url)}
                onRemove={() => form.setValue("logo", "")}
              />
            </div>
            <div className="space-y-2">
              <Label>Favicon (Ikon Tab)</Label>
              <ImageUpload
                value={form.watch("favicon") ? [form.watch("favicon")!] : []}
                onChange={(url) => form.setValue("favicon", url)}
                onRemove={() => form.setValue("favicon", "")}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Tanggal Berdiri</Label>
              <Input type="date" {...form.register("foundedDate")} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" {...form.register("email")} placeholder="email@organisasi.com" />
            </div>
            <div className="space-y-2">
              <Label>Nomor Telepon / WhatsApp</Label>
              <Input {...form.register("phone")} placeholder="+62 8..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Alamat Lengkap</Label>
            <Textarea {...form.register("address")} rows={3} />
          </div>

          <div className="space-y-2">
            <Label>Google Maps Embed HTML</Label>
            <Textarea {...form.register("mapEmbed")} rows={4} placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>' />
            <p className="text-xs text-muted-foreground">Paste kode iframe dari Google Maps (Share {'>'} Embed a map)</p>
          </div>

          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
