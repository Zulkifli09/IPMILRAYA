import { PenggunaForm } from "../pengguna-form";

export const metadata = {
  title: "Tambah Pengguna | Dashboard",
};

export default function CreatePenggunaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Tambah Pengguna</h1>
        <p className="text-muted-foreground">
          Buat akun baru untuk memberikan akses masuk ke dashboard.
        </p>
      </div>

      <PenggunaForm />
    </div>
  );
}
