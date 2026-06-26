"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialMediaSchema, type SocialMediaInput } from "@/lib/validations";
import { upsertSocialMedia, deleteSocialMedia } from "@/actions/organization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trash2, Plus, Edit } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export function SocialMediaManager({ items }: { items: any[] }) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SocialMediaInput>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      platform: "",
      url: "",
      icon: "",
      order: 0,
      isActive: true,
    },
  });

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    form.reset({
      platform: item.platform,
      url: item.url,
      icon: item.icon || "",
      order: item.order,
      isActive: item.isActive,
    });
    setIsOpen(true);
  };

  const handleCreateNew = () => {
    setEditingId(null);
    form.reset({
      platform: "",
      url: "",
      icon: "",
      order: 0,
      isActive: true,
    });
    setIsOpen(true);
  };

  async function onSubmit(data: SocialMediaInput) {
    setLoading(true);
    try {
      const res = await upsertSocialMedia(data);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Social Media berhasil disimpan");
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Apakah Anda yakin ingin menghapus platform ini?")) {
      try {
        await deleteSocialMedia(id);
        toast.success("Social Media dihapus");
        router.refresh();
      } catch (error) {
        toast.error("Gagal menghapus");
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-heading">Sosial Media</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateNew} size="sm">
              <Plus className="h-4 w-4 mr-2" /> Tambah Platform
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Tambah"} Sosial Media</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Platform (contoh: Instagram, Facebook)</Label>
                <Input {...form.register("platform")} disabled={!!editingId} />
              </div>
              <div className="space-y-2">
                <Label>URL Profile / Halaman</Label>
                <Input {...form.register("url")} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Ikon (opsional - nama class lucide)</Label>
                <Input {...form.register("icon")} placeholder="contoh: instagram" />
              </div>
              <div className="space-y-2">
                <Label>Urutan Tampil</Label>
                <Input type="number" {...form.register("order", { valueAsNumber: true })} />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  checked={form.watch("isActive")}
                  onCheckedChange={(checked) => form.setValue("isActive", checked)}
                />
                <Label>Status Aktif</Label>
              </div>
              <Button type="submit" disabled={loading} className="w-full mt-4">
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border bg-card p-4">
            <div>
              <p className="font-medium">{item.platform}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[150px]">{item.url}</p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            Belum ada data sosial media.
          </div>
        )}
      </div>
    </div>
  );
}
