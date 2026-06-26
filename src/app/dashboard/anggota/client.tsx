"use client";

import { getMembers } from "@/actions/manage";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { deleteMember } from "@/actions/manage";

export function AnggotaClient({ data }: { data: any[] }) {
  const columns = [
    {
      header: "Nama Lengkap",
      accessorKey: "fullName",
      cell: (item: any) => (
        <div className="font-medium">{item.fullName}</div>
      ),
    },
    {
      header: "NIM / Instansi",
      accessorKey: "nim",
      cell: (item: any) => (
        <div className="text-sm text-muted-foreground">{item.nim || "-"}</div>
      ),
    },
    {
      header: "Tanggal Daftar",
      cell: (item: any) => (
        <div className="text-sm">{formatDate(item.createdAt)}</div>
      ),
    },
    {
      header: "Status",
      cell: (item: any) => {
        const statusMap: Record<string, { label: string; variant: any }> = {
          PENDING: { label: "Menunggu", variant: "secondary" },
          ACCEPTED: { label: "Diterima", variant: "default" },
          REJECTED: { label: "Ditolak", variant: "destructive" },
        };
        const st = statusMap[item.status] || statusMap.PENDING;
        return <Badge variant={st.variant}>{st.label}</Badge>;
      },
    },
    {
      header: "Aksi",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/anggota/${item.id}`}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4 text-blue-500" />
            </Button>
          </Link>
          <form onClick={async () => { await deleteMember(item.id); }}>
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
        searchKey="fullName"
        searchPlaceholder="Cari nama anggota..."
      />
  );
}
