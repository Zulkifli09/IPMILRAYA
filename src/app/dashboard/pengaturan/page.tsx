import { auth } from "@/lib/auth";
import { PengaturanForm } from "./pengaturan-form";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Pengaturan Akun | Dashboard",
};

export default async function PengaturanPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Pengaturan Akun</h1>
        <p className="text-muted-foreground">
          Kelola informasi profil dan keamanan akun Anda.
        </p>
      </div>

      <div className="max-w-2xl">
        <PengaturanForm user={{
          id: user.id,
          name: user.name || "",
          email: user.email,
        }} />
      </div>
    </div>
  );
}
