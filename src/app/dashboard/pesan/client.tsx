"use client";

import { getContactMessages } from "@/actions/manage";
import { DataTable } from "@/components/ui/data-table";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PesanActions } from "./pesan-actions";

export function PesanClient({ data }: { data: any[] }) {
  const columns = [
    {
      header: "Status",
      cell: (item: any) => (
        <Badge variant={item.isRead ? "secondary" : "default"}>
          {item.isRead ? "Dibaca" : "Baru"}
        </Badge>
      ),
    },
    {
      header: "Tanggal",
      cell: (item: any) => (
        <div className="text-sm">{formatDate(item.createdAt)}</div>
      ),
    },
    {
      header: "Pengirim",
      cell: (item: any) => (
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.email}</p>
        </div>
      ),
    },
    {
      header: "Subjek & Pesan",
      cell: (item: any) => (
        <div className="max-w-[300px]">
          <p className="font-medium text-sm truncate">{item.subject || "Tanpa Subjek"}</p>
          <p className="text-xs text-muted-foreground truncate">{item.message}</p>
        </div>
      ),
    },
    {
      header: "Aksi",
      cell: (item: any) => (
        <PesanActions 
          id={item.id} 
          isRead={item.isRead} 
          message={item} 
        />
      ),
    },
  ];


  return (
    <DataTable
        columns={columns as any}
        data={data}
        searchKey="name"
        searchPlaceholder="Cari nama pengirim..."
      />
  );
}
