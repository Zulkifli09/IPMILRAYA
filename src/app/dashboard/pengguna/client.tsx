"use client";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { deleteUser } from "@/actions/manage";
export function PenggunaClient({ data }: { data: any[] }) {
  const columns = [
    {
      header: "Nama Lengkap",
      accessorKey: "name",
      cell: (item: any) => (
        <div className="font-medium">{item.name || "-"}</div>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Peran (Role)",
      cell: (item: any) => (
        <Badge variant={item.role === "ADMIN" ? "default" : "secondary"}>
          {item.role === "ADMIN" ? "Administrator" : "Pengurus"}
        </Badge>
      ),
    },
    {
      header: "Aksi",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/pengguna/${item.id}/edit`}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4 text-blue-500" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
            onClick={async () => { 
              await deleteUser(item.id); 
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];


  return (
    <DataTable
        columns={columns as any}
        data={data}
        searchKey="name"
        searchPlaceholder="Cari nama pengguna..."
      />
  );
}
