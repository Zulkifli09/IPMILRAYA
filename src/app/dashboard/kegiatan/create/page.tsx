import { KegiatanForm } from "../kegiatan-form";

export const metadata = {
  title: "Tambah Kegiatan | Dashboard",
};

export default function CreateKegiatanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Tambah Kegiatan</h1>
        <p className="text-muted-foreground">
          Buat pengumuman atau agenda kegiatan baru.
        </p>
      </div>

      <KegiatanForm />
    </div>
  );
}
