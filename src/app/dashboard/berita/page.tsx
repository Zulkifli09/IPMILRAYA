import { getNews } from "@/actions/content";
import { BeritaClient } from "./client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { deleteNews } from "@/actions/content";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Kelola Berita | Dashboard",
};

export default async function BeritaPage() {
  const { items } = await getNews(1, 100);

  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Kelola Berita</h1>
          <p className="text-muted-foreground">
            Daftar berita, artikel, dan pengumuman organisasi.
          </p>
        </div>
        <Link href="/dashboard/berita/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tulis Berita
          </Button>
        </Link>
      </div>

      <BeritaClient data={items} />
    </div>
  );
}
