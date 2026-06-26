"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workProgramSchema, type WorkProgramInput } from "@/lib/validations";
import { createWorkProgram, updateWorkProgram } from "@/actions/manage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface ProkerFormProps {
  initialData?: any;
  divisions: any[];
}

export function ProkerForm({ initialData, divisions }: ProkerFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<WorkProgramInput>({
    resolver: zodResolver(workProgramSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      divisionId: initialData?.divisionId || null,
      period: initialData?.period || new Date().getFullYear().toString(),
      startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split("T")[0] : "",
      endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split("T")[0] : "",
      status: initialData?.status || "planned",
      order: initialData?.order || 0,
    },
  });

  async function onSubmit(data: WorkProgramInput) {
    setLoading(true);
    try {
      const res = initialData
        ? await updateWorkProgram(initialData.id, data)
        : await createWorkProgram(data);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`Program kerja berhasil ${initialData ? "diperbarui" : "ditambahkan"}`);
        router.push("/dashboard/program-kerja");
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
                <Label>Nama Program Kerja <span className="text-destructive">*</span></Label>
                <Input {...form.register("name")} placeholder="Contoh: Latihan Dasar Kepemimpinan" />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Deskripsi Kegiatan</Label>
                <Textarea {...form.register("description")} rows={4} placeholder="Penjelasan mengenai program..." />
              </div>

              <div className="space-y-2">
                <Label>Divisi Pelaksana</Label>
                <Select
                  value={form.watch("divisionId") || "none"}
                  onValueChange={(val) => form.setValue("divisionId", val === "none" ? null : val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Divisi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Lintas Divisi / Umum</SelectItem>
                    {divisions.map((div) => (
                      <SelectItem key={div.id} value={div.id}>
                        {div.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status Pelaksanaan</Label>
                  <Select
                    value={form.watch("status")}
                    onValueChange={(val) => form.setValue("status", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Direncanakan</SelectItem>
                      <SelectItem value="ongoing">Sedang Berjalan</SelectItem>
                      <SelectItem value="completed">Selesai</SelectItem>
                      <SelectItem value="cancelled">Dibatalkan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Periode Kepengurusan</Label>
                  <Input {...form.register("period")} placeholder="Contoh: 2026-2027" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tanggal Mulai (Opsional)</Label>
                  <Input type="date" {...form.register("startDate")} />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Selesai (Opsional)</Label>
                  <Input type="date" {...form.register("endDate")} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Urutan Tampil (Order)</Label>
                <Input type="number" {...form.register("order", { valueAsNumber: true })} />
              </div>

              <div className="pt-6 border-t border-border">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Menyimpan..." : initialData ? "Simpan Perubahan" : "Tambah Program Kerja"}
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
