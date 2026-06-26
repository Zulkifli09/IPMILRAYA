import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { getOrganizationProfile } from "@/actions/organization";
import { prisma } from "@/lib/prisma";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [organization, socialMedias] = await Promise.all([
    getOrganizationProfile(),
    prisma.socialMedia.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar organization={organization} />
      <main className="flex-1">{children}</main>
      <PublicFooter organization={organization} socialMedias={socialMedias} />
    </div>
  );
}
