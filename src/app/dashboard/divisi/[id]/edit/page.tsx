import { prisma } from "@/lib/prisma";
import { DivisiForm } from "../../divisi-form";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Divisi | Dashboard",
};

export default async function EditDivisiPage({
  params,
}: {
  params: { id: string };
}) {
  const division = await prisma.division.findUnique({
    where: { id: params.id },
  });

  if (!division) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Edit Divisi</h1>
        <p className="text-muted-foreground">
          Perbarui informasi divisi organisasi.
        </p>
      </div>

      <DivisiForm initialData={division} />
    </div>
  );
}
