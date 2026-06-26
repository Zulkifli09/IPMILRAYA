"use client";

import { getNews } from "@/actions/content";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { deleteNews } from "@/actions/content";

export function BeritaClient({ data }: { data: any[] }) {
  const columns = [
    {
      header: "Judul Berita",
      accessorKey: "title",
      cell: (item: any) => (
        <div className="max-w-[300px] truncate font-medium">
          {item.title}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item: any) => (
        <Badge variant={item.status === "PUBLISHED" ? "default" : "secondary"}>
          {item.status === "PUBLISHED" ? "Terbit" : "Draft"}
        </Badge>
      ),
    },
    {
      header: "Tanggal Terbit",
      accessorKey: "publishedAt",
      cell: (item: any) => (
        <div className="text-sm text-muted-foreground">
          {item.publishedAt ? formatDate(item.publishedAt) : "-"}
        </div>
      ),
    },
    {
      header: "Aksi",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/berita/${item.id}/edit`}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4 text-blue-500" />
            </Button>
          </Link>
          <form onClick={async () => { await deleteNews(item.id); }}>
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
        searchPlaceholder="Cari judul berita..."
      />
  );
}
