import { DivisiForm } from "../divisi-form";

export const metadata = {
  title: "Tambah Divisi | Dashboard",
};

export default function CreateDivisiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Tambah Divisi</h1>
        <p className="text-muted-foreground">
          Tambahkan divisi atau departemen baru ke dalam organisasi.
        </p>
      </div>

      <DivisiForm />
    </div>
  );
}
