import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Calendar, MapPin, ArrowLeft, Share2, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const kegiatan = await prisma.activity.findFirst({
    where: { OR: [{ slug: params.slug }, { id: params.slug }] },
  });
  return {
    title: `${kegiatan?.name || "Kegiatan"} | Organisasi`,
    description: kegiatan?.description,
  };
}

export default async function KegiatanDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const kegiatan = await prisma.activity.findFirst({
    where: { 
      OR: [{ slug: params.slug }, { id: params.slug }],
      status: "PUBLISHED"
    },
  });

  if (!kegiatan) {
    notFound();
  }

  const startDate = kegiatan.date ? new Date(kegiatan.date) : null;
  const isUpcoming = startDate ? startDate > new Date() : false;

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          
          <Link href="/kegiatan">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Jadwal Kegiatan
            </Button>
          </Link>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Left Column: Image & Details */}
            <div className="md:col-span-1 space-y-6">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border">
                {isUpcoming && (
                  <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                    Akan Datang
                  </div>
                )}
                {kegiatan.poster ? (
                  <Image 
                    src={kegiatan.poster} 
                    alt={kegiatan.name} 
                    fill 
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center text-muted-foreground">
                    <Calendar className="h-16 w-16 mb-4 opacity-50" />
                    <span>Tidak ada poster</span>
                  </div>
                )}
              </div>

              <div className="bg-muted/50 rounded-2xl p-6 border space-y-4">
                <h3 className="font-bold font-heading text-lg border-b pb-2">Informasi Kegiatan</h3>
                
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Calendar className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Tanggal</p>
                      <p className="text-sm text-muted-foreground">
                        {startDate ? formatDate(startDate) : "TBA"}
                        {kegiatan.endDate && ` - ${formatDate(new Date(kegiatan.endDate))}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Lokasi</p>
                      <p className="text-sm text-muted-foreground">{kegiatan.location || "TBA"}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t">
                  <Button className="w-full gap-2">
                    <Share2 className="h-4 w-4" /> Bagikan Kegiatan
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight mb-4">
                  {kegiatan.name}
                </h1>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {kegiatan.description || "Tidak ada deskripsi rinci untuk kegiatan ini."}
                </div>
              </div>

              {/* Documentation Gallery if Past Event */}
              {kegiatan.documentation && Array.isArray(kegiatan.documentation) && kegiatan.documentation.length > 0 && (
                <div className="pt-8 border-t">
                  <h3 className="text-2xl font-bold font-heading mb-6">Galeri Dokumentasi</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {kegiatan.documentation.map((img: string, i: number) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden border">
                        <Image 
                          src={img} 
                          alt={`Dokumentasi ${i+1}`} 
                          fill 
                          className="object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
