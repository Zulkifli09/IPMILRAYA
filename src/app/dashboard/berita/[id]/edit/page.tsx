import { getNewsById } from "@/actions/content";
import { BeritaForm } from "../../berita-form";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Berita | Dashboard",
};

export default async function EditBeritaPage({
  params,
}: {
  params: { id: string };
}) {
  const news = await getNewsById(params.id);

  if (!news) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Edit Berita</h1>
        <p className="text-muted-foreground">
          Perbarui konten artikel atau berita.
        </p>
      </div>

      <BeritaForm initialData={news} />
    </div>
  );
}
