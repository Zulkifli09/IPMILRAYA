import { BeritaForm } from "../berita-form";

export const metadata = {
  title: "Tulis Berita | Dashboard",
};

export default function CreateBeritaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Tulis Berita</h1>
        <p className="text-muted-foreground">
          Buat artikel atau pengumuman baru untuk dipublikasikan.
        </p>
      </div>

      <BeritaForm />
    </div>
  );
}
