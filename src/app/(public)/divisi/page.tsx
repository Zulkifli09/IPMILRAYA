import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

export const metadata = {
  title: "Divisi | Organisasi",
};

export default async function DivisiPublicPage() {
  const divisions = await prisma.division.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="pt-24 pb-20 bg-muted/20 min-h-screen">
      <div className="container px-4 md:px-6">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Divisi & Departemen</h1>
            <p className="text-xl text-muted-foreground">
              Kenali lebih dekat berbagai divisi yang bekerja untuk mencapai visi misi organisasi.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {divisions.length > 0 ? (
              divisions.map((div) => (
                <Link 
                  href={`/divisi/${div.slug || div.id}`} 
                  key={div.id} 
                  className="group flex flex-col h-full bg-background rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="p-8 flex flex-col items-center text-center flex-1">
                    {div.image ? (
                      <div className="relative h-24 w-24 mb-6 transition-transform duration-500 group-hover:scale-110">
                        <Image 
                          src={div.image} 
                          alt={div.name} 
                          fill 
                          className="object-contain"
                          sizes="96px"
                        />
                      </div>
                    ) : (
                      <div className="h-24 w-24 mb-6 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                        <Users className="h-10 w-10" />
                      </div>
                    )}
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{div.name}</h2>
                    <p className="text-muted-foreground line-clamp-3 text-sm flex-1">
                      {div.description || "Divisi strategis dalam struktur organisasi."}
                    </p>
                  </div>
                  <div className="border-t bg-muted/30 p-4 text-center font-medium text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    Lihat Program Kerja <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-muted-foreground border-2 border-dashed rounded-2xl">
                Belum ada data divisi yang dipublikasikan.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
