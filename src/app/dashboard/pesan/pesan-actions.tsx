"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Check, X } from "lucide-react";
import { toggleMessageReadStatus, deleteContactMessage } from "@/actions/manage";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function PesanActions({ id, isRead, message }: { id: string, isRead: boolean, message: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleView() {
    setIsOpen(true);
    if (!isRead) {
      await toggleMessageReadStatus(id, true);
      router.refresh();
    }
  }

  async function handleToggleRead() {
    try {
      await toggleMessageReadStatus(id, !isRead);
      toast.success(`Pesan ditandai sebagai ${!isRead ? 'dibaca' : 'belum dibaca'}`);
      router.refresh();
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  }

  async function handleDelete() {
    if (confirm("Hapus pesan ini secara permanen?")) {
      try {
        await deleteContactMessage(id);
        toast.success("Pesan dihapus");
        router.refresh();
      } catch (error) {
        toast.error("Gagal menghapus pesan");
      }
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleView}>
          <Eye className="h-4 w-4 text-blue-500" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8" 
          onClick={handleToggleRead}
          title={isRead ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
        >
          {isRead ? <X className="h-4 w-4" /> : <Check className="h-4 w-4 text-green-500" />}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Pesan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Pengirim:</span>
                <p className="font-medium">{message.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p className="font-medium">{message.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground">No. Telepon:</span>
                <p className="font-medium">{message.phone || "-"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Tanggal:</span>
                <p className="font-medium">{formatDate(message.createdAt)}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <span className="text-sm text-muted-foreground">Subjek:</span>
              <p className="font-medium mb-2">{message.subject || "Tanpa Subjek"}</p>
              
              <span className="text-sm text-muted-foreground">Pesan:</span>
              <div className="mt-1 p-3 bg-muted rounded-md text-sm whitespace-pre-wrap">
                {message.message}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
