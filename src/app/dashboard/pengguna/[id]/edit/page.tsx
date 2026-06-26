import { prisma } from "@/lib/prisma";
import { PenggunaForm } from "../../pengguna-form";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Pengguna | Dashboard",
};

export default async function EditPenggunaPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    notFound();
  }

  // Dont pass password to the client
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Edit Pengguna</h1>
        <p className="text-muted-foreground">
          Perbarui informasi akun.
        </p>
      </div>

      <PenggunaForm initialData={safeUser} />
    </div>
  );
}
