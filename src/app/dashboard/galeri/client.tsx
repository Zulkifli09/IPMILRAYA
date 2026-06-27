"use client";

import { getGalleries } from "@/actions/manage";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { deleteGallery } from "@/actions/manage";
import Image from "next/image";

export function GaleriClient({ data }: { data: any[] }) {
  const columns = [
    {
      header: "Gambar",
      cell: (item: any) => (
        <div className="relative h-16 w-24 overflow-hidden rounded-md border">
          <Image
            src={item.fileUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      ),
    },
    {
      header: "Judul",
      accessorKey: "title",
      cell: (item: any) => (
        <div className="font-medium">{item.title}</div>
      ),
    },
    {
      header: "Divisi",
      cell: (item: any) => (
        <div className="text-sm text-muted-foreground">
          {item.division?.name || "Umum"}
        </div>
      ),
    },
    {
      header: "Tanggal",
      cell: (item: any) => (
        <div className="text-sm text-muted-foreground">
          {formatDate(item.date)}
        </div>
      ),
    },
    {
      header: "Aksi",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <form onClick={async () => { await deleteGallery(item.id); }}>
            <Button type="submit" variant="outline" size="icon" className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground">
              <Trash2 className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ),
    },
  ];


  return (
    <DataTable
        columns={columns as any}
        data={data}
        searchKey="title"
        searchPlaceholder="Cari judul galeri..."
      />
  );
}
