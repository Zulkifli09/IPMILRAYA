import { getAllSocialMedias } from "@/actions/organization";
import { SocialMediaManager } from "./social-media-manager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Kelola Kontak & Sosial Media | Dashboard",
};

export default async function KontakPage() {
  const socialMedias = await getAllSocialMedias();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Kontak & Sosial Media</h1>
        <p className="text-muted-foreground">
          Kelola informasi kontak dan tautan sosial media organisasi.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Kontak Utama</CardTitle>
            <CardDescription>
              Alamat email, nomor telepon, dan lokasi diatur melalui halaman Profil Organisasi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/profil-organisasi">
              <Button variant="outline" className="w-full justify-between">
                Ke Pengaturan Profil Dasar <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <SocialMediaManager items={socialMedias} />
    </div>
  );
}
