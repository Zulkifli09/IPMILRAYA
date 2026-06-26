import { BannerForm } from "../banner-form";

export const metadata = {
  title: "Tambah Banner | Dashboard",
};

export default function CreateBannerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Tambah Banner</h1>
        <p className="text-muted-foreground">
          Upload gambar baru untuk dijadikan banner halaman utama.
        </p>
      </div>

      <BannerForm />
    </div>
  );
}
