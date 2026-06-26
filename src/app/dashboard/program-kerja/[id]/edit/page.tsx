import { prisma } from "@/lib/prisma";
import { getDivisions } from "@/actions/manage";
import { ProkerForm } from "../../proker-form";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Program Kerja | Dashboard",
};

export default async function EditProkerPage({
  params,
}: {
  params: { id: string };
}) {
  const [proker, divisions] = await Promise.all([
    prisma.workProgram.findUnique({
      where: { id: params.id },
    }),
    getDivisions(),
  ]);

  if (!proker) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Edit Program Kerja</h1>
        <p className="text-muted-foreground">
          Perbarui informasi atau status pelaksanaan program kerja.
        </p>
      </div>

      <ProkerForm initialData={proker} divisions={divisions} />
    </div>
  );
}
