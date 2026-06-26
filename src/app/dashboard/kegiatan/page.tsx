import { getActivities } from "@/actions/content";
import { KegiatanClient } from "./client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { deleteActivity } from "@/actions/content";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Kelola Kegiatan | Dashboard",
};

export default async function KegiatanPage() {
  const { items } = await getActivities(1, 100);

  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Kelola Kegiatan</h1>
          <p className="text-muted-foreground">
            Daftar event, acara, dan aktivitas organisasi.
          </p>
        </div>
        <Link href="/dashboard/kegiatan/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Kegiatan
          </Button>
        </Link>
      </div>

      <KegiatanClient data={items} />
    </div>
  );
}
