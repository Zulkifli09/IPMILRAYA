"use client";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function BannerClient({ data }: { data: any[] }) {
  const columns = [
    {
      header: "Banner",
      cell: (item: any) => (
        <div className="relative h-16 w-32 overflow-hidden rounded-md border">
          <Image
            src={item.image}
            alt={item.title || "Banner"}
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
      ),
    },
    {
      header: "Judul",
      accessorKey: "title",
      cell: (item: any) => (
        <div className="font-medium">{item.title || "-"}</div>
      ),
    },
    {
      header: "Urutan",
      accessorKey: "order",
    },
    {
      header: "Status",
      cell: (item: any) => (
        <Badge variant={item.isActive ? "default" : "secondary"}>
          {item.isActive ? "Aktif" : "Nonaktif"}
        </Badge>
      ),
    },
    {
      header: "Aksi",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/banner/${item.id}/edit`}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4 text-blue-500" />
            </Button>
          </Link>
          <form onClick={async () => { await deleteHomepageBanner(item.id); }}>
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
        searchPlaceholder="Cari judul banner..."
      />
  );
}
