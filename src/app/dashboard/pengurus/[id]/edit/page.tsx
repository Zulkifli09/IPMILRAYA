import { prisma } from "@/lib/prisma";
import { PengurusForm } from "../../pengurus-form";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Pengurus | Dashboard",
};

export default async function EditPengurusPage({
  params,
}: {
  params: { id: string };
}) {
  const management = await prisma.management.findUnique({
    where: { id: params.id },
  });

  if (!management) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Edit Pengurus</h1>
        <p className="text-muted-foreground">
          Perbarui data anggota pengurus.
        </p>
      </div>

      <PengurusForm initialData={management} />
    </div>
  );
}
