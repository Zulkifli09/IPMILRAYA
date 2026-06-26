"use client";

import { getDivisions } from "@/actions/manage";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteDivision } from "@/actions/manage";
import { Badge } from "@/components/ui/badge";

export function DivisiClient({ data }: { data: any[] }) {
  const columns = [
    {
      header: "Nama Divisi",
      accessorKey: "name",
      cell: (item: any) => (
        <div className="font-medium">{item.name}</div>
      ),
    },
    {
      header: "Jumlah Anggota",
      cell: (item: any) => (
        <div>{item._count.members} Anggota</div>
      ),
    },
    {
      header: "Program Kerja",
      cell: (item: any) => (
        <div>{item._count.workPrograms} Proker</div>
      ),
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
          <Link href={`/dashboard/divisi/${item.id}/edit`}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4 text-blue-500" />
            </Button>
          </Link>
          <form onClick={async () => { await deleteDivision(item.id); }}>
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
        searchKey="name"
        searchPlaceholder="Cari nama divisi..."
      />
  );
}
