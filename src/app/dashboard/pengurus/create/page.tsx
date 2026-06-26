import { PengurusForm } from "../pengurus-form";

export const metadata = {
  title: "Tambah Pengurus | Dashboard",
};

export default function CreatePengurusPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Tambah Pengurus</h1>
        <p className="text-muted-foreground">
          Tambahkan data anggota pengurus baru ke dalam struktur organisasi.
        </p>
      </div>

      <PengurusForm />
    </div>
  );
}
