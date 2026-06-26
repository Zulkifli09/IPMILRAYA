import { getActivityById } from "@/actions/content";
import { KegiatanForm } from "../../kegiatan-form";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Kegiatan | Dashboard",
};

export default async function EditKegiatanPage({
  params,
}: {
  params: { id: string };
}) {
  const kegiatan = await getActivityById(params.id);

  if (!kegiatan) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Edit Kegiatan</h1>
        <p className="text-muted-foreground">
          Perbarui informasi atau status kegiatan.
        </p>
      </div>

      <KegiatanForm initialData={kegiatan} />
    </div>
  );
}
