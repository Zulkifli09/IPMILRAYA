import { getHomepageBanners } from "@/actions/organization";
import { BannerClient } from "./client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteHomepageBanner } from "@/actions/organization";
import { revalidatePath } from "next/cache";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Kelola Banner | Dashboard",
};

export default async function BannerPage() {
  const items = await prisma.homepageBanner.findMany({ orderBy: { order: "asc" } });

  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Kelola Banner</h1>
          <p className="text-muted-foreground">
            Kelola gambar banner (carousel) yang tampil di halaman beranda.
          </p>
        </div>
        <Link href="/dashboard/banner/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Banner
          </Button>
        </Link>
      </div>

      <BannerClient data={items} />
    </div>
  );
}
