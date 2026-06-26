import { getManagements } from "@/actions/manage";
import { PengurusClient } from "./client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteManagement } from "@/actions/manage";
import { revalidatePath } from "next/cache";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Kelola Pengurus | Dashboard",
};

export default async function PengurusPage() {
  const items = await getManagements();

  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Kelola Pengurus</h1>
          <p className="text-muted-foreground">
            Daftar struktur dan personalia pengurus organisasi.
          </p>
        </div>
        <Link href="/dashboard/pengurus/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Pengurus
          </Button>
        </Link>
      </div>

      <PengurusClient data={items} />
    </div>
  );
}
