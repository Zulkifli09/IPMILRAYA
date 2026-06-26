import { getMembers } from "@/actions/manage";
import { notFound } from "next/navigation";
import { AnggotaClient } from "./client";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { deleteMember } from "@/actions/manage";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Kelola Anggota | Dashboard",
};

export default async function AnggotaPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  notFound();

  const statusFilter = searchParams.status || undefined;
  const { items } = await getMembers(1, 100, statusFilter);

  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Kelola Anggota</h1>
          <p className="text-muted-foreground">
            Daftar anggota dan verifikasi pendaftaran baru.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/anggota">
            <Button variant={!statusFilter ? "default" : "outline"} size="sm">
              Semua
            </Button>
          </Link>
          <Link href="/dashboard/anggota?status=PENDING">
            <Button variant={statusFilter === "PENDING" ? "default" : "outline"} size="sm">
              Menunggu Verifikasi
            </Button>
          </Link>
          <Link href="/dashboard/anggota?status=ACCEPTED">
            <Button variant={statusFilter === "ACCEPTED" ? "default" : "outline"} size="sm">
              Diterima
            </Button>
          </Link>
        </div>
      </div>

      <AnggotaClient data={items} />
    </div>
  );
}
