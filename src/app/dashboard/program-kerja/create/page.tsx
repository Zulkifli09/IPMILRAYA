import { getDivisions } from "@/actions/manage";
import { ProkerForm } from "../proker-form";

export const metadata = {
  title: "Tambah Program Kerja | Dashboard",
};

export default async function CreateProkerPage() {
  const divisions = await getDivisions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Tambah Program Kerja</h1>
        <p className="text-muted-foreground">
          Rencanakan program kerja baru untuk organisasi.
        </p>
      </div>

      <ProkerForm divisions={divisions} />
    </div>
  );
}
