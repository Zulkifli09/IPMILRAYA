import { getDivisions } from "@/actions/manage";
import { DivisiClient } from "./client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteDivision } from "@/actions/manage";
import { revalidatePath } from "next/cache";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Kelola Divisi | Dashboard",
};

export default async function DivisiPage() {
  const items = await getDivisions();

  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Kelola Divisi</h1>
          <p className="text-muted-foreground">
            Daftar divisi atau departemen dalam organisasi.
          </p>
        </div>
        <Link href="/dashboard/divisi/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Divisi
          </Button>
        </Link>
      </div>

      <DivisiClient data={items} />
    </div>
  );
}
