"use client";

import { useState } from "react";
import { verifyMember } from "@/actions/manage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function VerifyButtons({ memberId }: { memberId: string }) {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const router = useRouter();

  async function handleVerify(status: "ACCEPTED" | "REJECTED") {
    if (status === "REJECTED" && !notes.trim()) {
      toast.error("Alasan penolakan (catatan) wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyMember(memberId, status, notes);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`Pendaftaran berhasil ${status === "ACCEPTED" ? "diterima" : "ditolak"}`);
        router.push("/dashboard/anggota");
        router.refresh();
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Catatan Verifikasi (Opsional jika Diterima, Wajib jika Ditolak)</label>
        <Textarea 
          placeholder="Alasan penolakan atau catatan tambahan..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="flex gap-4">
        <Button 
          onClick={() => handleVerify("ACCEPTED")} 
          disabled={loading}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="mr-2 h-4 w-4" /> Terima Pendaftaran
        </Button>
        <Button 
          onClick={() => handleVerify("REJECTED")} 
          disabled={loading}
          variant="destructive"
          className="flex-1"
        >
          <XCircle className="mr-2 h-4 w-4" /> Tolak Pendaftaran
        </Button>
      </div>
    </div>
  );
}
