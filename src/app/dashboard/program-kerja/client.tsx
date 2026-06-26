"use client";

import { getWorkPrograms } from "@/actions/manage";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteWorkProgram } from "@/actions/manage";
import { Badge } from "@/components/ui/badge";

export function ProgramKerjaClient({ data }: { data: any[] }) {
  const columns = [
    {
      header: "Nama Program",
      accessorKey: "name",
      cell: (item: any) => (
        <div className="font-medium">{item.name}</div>
      ),
    },
    {
      header: "Divisi Pelaksana",
      cell: (item: any) => (
        <div>{item.division?.name || "Lintas Divisi / Umum"}</div>
      ),
    },
    {
      header: "Status",
      cell: (item: any) => {
        const statusMap: Record<string, { label: string; variant: any }> = {
          planned: { label: "Direncanakan", variant: "secondary" },
          ongoing: { label: "Sedang Berjalan", variant: "default" },
          completed: { label: "Selesai", variant: "outline" },
          cancelled: { label: "Dibatalkan", variant: "destructive" },
        };
        const st = statusMap[item.status] || statusMap.planned;
        return <Badge variant={st.variant}>{st.label}</Badge>;
      },
    },
    {
      header: "Aksi",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/program-kerja/${item.id}/edit`}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4 text-blue-500" />
            </Button>
          </Link>
          <form onClick={async () => { await deleteWorkProgram(item.id); }}>
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
        searchPlaceholder="Cari nama program..."
      />
  );
}
