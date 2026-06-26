import { getGalleries } from "@/actions/manage";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const metadata = {
  title: "Galeri | Organisasi",
};

export default async function GaleriPublicPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const { items } = await getGalleries(page, 50); // Get more items for gallery

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900/20">
      <div className="container px-4 md:px-6">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Galeri Dokumentasi</h1>
            <p className="text-xl text-muted-foreground">
              Kumpulan momen dan dokumentasi dari berbagai kegiatan organisasi.
            </p>
          </div>

          {/* Masonry or Grid Layout */}
          {items.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {items.map((item) => (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <div className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden bg-muted shadow-sm hover:shadow-lg transition-all duration-300">
                      <Image
                        src={item.fileUrl}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <h3 className="text-white font-bold text-lg line-clamp-1">{item.title}</h3>
                        <p className="text-white/80 text-xs">
                          {formatDate(item.date)} {item.division?.name ? `• ${item.division.name}` : ""}
                        </p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0">
                    <div className="relative w-full h-[80vh] flex flex-col justify-center items-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={item.fileUrl}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="bg-black/50 text-white p-4 rounded-xl backdrop-blur-md absolute bottom-4 text-center max-w-lg">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        {item.description && <p className="text-sm text-white/80 mt-1">{item.description}</p>}
                        <p className="text-xs text-white/60 mt-2">{formatDate(item.date)}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-2xl">
              Belum ada foto dalam galeri.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
