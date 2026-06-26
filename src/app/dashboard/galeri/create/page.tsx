import { getDivisions } from "@/actions/manage";
import { GaleriForm } from "../galeri-form";

export const metadata = {
  title: "Upload Galeri | Dashboard",
};

export default async function CreateGaleriPage() {
  const divisions = await getDivisions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Upload Foto Galeri</h1>
        <p className="text-muted-foreground">
          Tambahkan foto dokumentasi baru ke galeri organisasi.
        </p>
      </div>

      <GaleriForm divisions={divisions} />
    </div>
  );
}
