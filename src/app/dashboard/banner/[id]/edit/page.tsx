import { prisma } from "@/lib/prisma";
import { BannerForm } from "../../banner-form";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Banner | Dashboard",
};

export default async function EditBannerPage({
  params,
}: {
  params: { id: string };
}) {
  const banner = await prisma.homepageBanner.findUnique({
    where: { id: params.id },
  });

  if (!banner) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Edit Banner</h1>
        <p className="text-muted-foreground">
          Perbarui informasi banner.
        </p>
      </div>

      <BannerForm initialData={banner} />
    </div>
  );
}
