import { getOrganizationProfile } from "@/actions/organization";
import { Clock } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Sejarah Organisasi | Tentang",
};

export default async function SejarahPage() {
  const profile = await getOrganizationProfile();

  return (
    <div className="pt-24 pb-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Sejarah Organisasi</h1>
            <p className="text-xl text-muted-foreground">
              Jejak langkah dan perjalanan {profile?.shortName || profile?.name} dari masa ke masa.
            </p>
          </div>

          {/* Founded Info */}
          {profile?.foundedDate && (
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full font-medium">
                <Clock className="h-5 w-5" />
                <span>Didirikan pada: {new Date(profile.foundedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          )}

          {/* Hero Image if any (Logo used as fallback) */}
          <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden bg-muted border shadow-sm">
            {profile?.logo ? (
              <Image 
                src={profile.logo} 
                alt="Logo Organisasi" 
                fill 
                className="object-contain p-8"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-xl">
                Tidak ada gambar
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-lg md:prose-xl max-w-none dark:prose-invert">
            {profile?.description ? (
              <div dangerouslySetInnerHTML={{ __html: profile.description }} />
            ) : (
              <p className="text-center text-muted-foreground">Sejarah organisasi belum ditambahkan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
