import { prisma } from "@/lib/prisma";
import { PenggunaClient } from "./client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Kelola Pengguna | Dashboard",
};

export default async function PenggunaPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    }
  });

  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Kelola Pengguna</h1>
          <p className="text-muted-foreground">
            Manajemen akses akun untuk masuk ke dashboard admin.
          </p>
        </div>
        <Link href="/dashboard/pengguna/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Pengguna
          </Button>
        </Link>
      </div>

      <PenggunaClient data={users} />
    </div>
  );
}
