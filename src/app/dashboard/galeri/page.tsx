import { getGalleries } from "@/actions/manage";
import { GaleriClient } from "./client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { deleteGallery } from "@/actions/manage";
import { revalidatePath } from "next/cache";
import Image from "next/image";

export const metadata = {
  title: "Kelola Galeri | Dashboard",
};

export default async function GaleriPage() {
  const { items } = await getGalleries(1, 100);

  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Kelola Galeri</h1>
          <p className="text-muted-foreground">
            Daftar foto dan dokumentasi kegiatan.
          </p>
        </div>
        <Link href="/dashboard/galeri/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Upload Foto
          </Button>
        </Link>
      </div>

      <GaleriClient data={items} />
    </div>
  );
}
