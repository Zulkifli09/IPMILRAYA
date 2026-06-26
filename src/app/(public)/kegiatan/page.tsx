import { getActivities } from "@/actions/content";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Calendar, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Agenda & Kegiatan | Organisasi",
};

export default async function KegiatanPublicPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const { items, pages: totalPages } = await getActivities(page, 9); 

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900/20">
      <div className="container px-4 md:px-6">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Agenda Kegiatan</h1>
            <p className="text-xl text-muted-foreground">
              Jadwal acara, event, dan berbagai kegiatan yang diselenggarakan oleh organisasi.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.length > 0 ? (
              items.map((kegiatan) => {
                const startDate = kegiatan.date ? new Date(kegiatan.date) : null;
                const isUpcoming = startDate ? startDate > new Date() : false;

                return (
                  <Link 
                    href={`/kegiatan/${kegiatan.slug || kegiatan.id}`} 
                    key={kegiatan.id} 
                    className="group flex flex-col h-full bg-background rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 relative"
                  >
                    {isUpcoming && (
                      <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        Akan Datang
                      </div>
                    )}
                    
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      {kegiatan.poster ? (
                        <Image 
                          src={kegiatan.poster} 
                          alt={kegiatan.name} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/5 text-primary">
                          <Calendar className="h-10 w-10 mb-2 opacity-50" />
                          <span className="font-medium text-sm">Tidak ada poster</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                        {kegiatan.name}
                      </h2>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                          <span>
                            {startDate ? formatDate(startDate) : "TBA"}
                            {kegiatan.endDate && ` - ${formatDate(new Date(kegiatan.endDate))}`}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                          <span className="line-clamp-2">{kegiatan.location || "Lokasi belum ditentukan"}</span>
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-border">
                        <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
                          Detail Kegiatan
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 text-muted-foreground border-2 border-dashed rounded-2xl">
                Belum ada data kegiatan.
              </div>
            )}
          </div>

          {/* Simple Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-8">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <Link 
                    key={pageNum} 
                    href={`/kegiatan?page=${pageNum}`}
                    className={`h-10 w-10 flex items-center justify-center rounded-lg border font-medium transition-colors ${
                      pageNum === page 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-background hover:bg-muted'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
