"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { visionMissionSchema, type VisionMissionInput } from "@/lib/validations";
import { updateVisionMission } from "@/actions/organization";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import { toast } from "sonner";

export function VisiMisiForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<VisionMissionInput>({
    resolver: zodResolver(visionMissionSchema),
    defaultValues: {
      vision: initialData?.vision || "",
      missions: initialData?.missions?.length ? initialData.missions : [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "missions" as never, // Typings workaround for flat string array
  });

  // Since react-hook-form useFieldArray doesn't natively support arrays of primitives without wrapping in object,
  // we handle it carefully or we use a workaround map. But let's adapt to ensure Zod accepts string[].
  // The schema expects string[], but useFieldArray requires `{ value: string }[]`.
  // To keep it simple, we manage missions natively or map on submit.
  
  // Alternative simpler approach without useFieldArray for primitive string array:
  const missions = form.watch("missions") || [];

  const updateMission = (index: number, value: string) => {
    const newMissions = [...missions];
    newMissions[index] = value;
    form.setValue("missions", newMissions);
  };

  const addMission = () => {
    form.setValue("missions", [...missions, ""]);
  };

  const removeMission = (index: number) => {
    const newMissions = missions.filter((_, i) => i !== index);
    form.setValue("missions", newMissions.length ? newMissions : [""]);
  };

  async function onSubmit(data: VisionMissionInput) {
    setLoading(true);
    try {
      // Filter out empty missions
      const cleanedData = {
        ...data,
        missions: data.missions.filter(m => m.trim() !== "")
      };
      
      const res = await updateVisionMission(cleanedData);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Visi & Misi berhasil diperbarui");
        form.setValue("missions", cleanedData.missions.length ? cleanedData.missions : [""]);
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
          <div className="space-y-2">
            <Label>Visi Organisasi <span className="text-destructive">*</span></Label>
            <Textarea 
              {...form.register("vision")} 
              rows={4} 
              placeholder="Tuliskan visi utama organisasi..." 
              className="text-lg"
            />
            {form.formState.errors.vision && (
              <p className="text-xs text-destructive">{form.formState.errors.vision.message}</p>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <Label>Misi Organisasi <span className="text-destructive">*</span></Label>
              <Button type="button" variant="outline" size="sm" onClick={addMission}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Misi
              </Button>
            </div>

            {missions.map((mission, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="mt-2 text-sm font-bold text-muted-foreground w-6 shrink-0">
                  {index + 1}.
                </div>
                <div className="flex-1">
                  <Input
                    value={mission}
                    onChange={(e) => updateMission(index, e.target.value)}
                    placeholder={`Misi ${index + 1}`}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="shrink-0"
                  onClick={() => removeMission(index)}
                  disabled={missions.length === 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {form.formState.errors.missions && (
              <p className="text-xs text-destructive">{form.formState.errors.missions.message}</p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
