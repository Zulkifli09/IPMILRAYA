import { getContactMessages } from "@/actions/manage";
import { PesanClient } from "./client";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PesanActions } from "./pesan-actions";

export const metadata = {
  title: "Pesan Masuk | Dashboard",
};

export default async function PesanMasukPage() {
  const { items } = await getContactMessages(1, 100);

  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Pesan Masuk</h1>
        <p className="text-muted-foreground">
          Kelola pesan yang dikirimkan pengunjung melalui halaman kontak.
        </p>
      </div>

      <PesanClient data={items} />
    </div>
  );
}
