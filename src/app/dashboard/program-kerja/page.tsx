import { getWorkPrograms } from "@/actions/manage";
import { ProgramKerjaClient } from "./client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteWorkProgram } from "@/actions/manage";
import { revalidatePath } from "next/cache";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Kelola Program Kerja | Dashboard",
};

export default async function ProgramKerjaPage() {
  const items = await getWorkPrograms();

  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Program Kerja</h1>
          <p className="text-muted-foreground">
            Kelola daftar program kerja dan progres divisi.
          </p>
        </div>
        <Link href="/dashboard/program-kerja/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Program
          </Button>
        </Link>
      </div>

      <ProgramKerjaClient data={items} />
    </div>
  );
}
