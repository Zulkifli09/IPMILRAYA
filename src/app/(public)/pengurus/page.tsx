import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Star, Link as LinkIcon, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Daftar Pengurus | Organisasi",
};

export default async function PengurusPublicPage() {
  const pengurus = await prisma.management.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="pt-24 pb-20 bg-muted/30 min-h-screen">
      <div className="container px-4 md:px-6">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Susunan Pengurus</h1>
            <p className="text-xl text-muted-foreground">
              Mengenal lebih dekat para pengurus yang mendedikasikan waktu dan tenaga untuk kemajuan organisasi.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pengurus.length > 0 ? (
              pengurus.map((person) => (
                <div key={person.id} className="group rounded-2xl border bg-background overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-64 w-full bg-muted overflow-hidden">
                    {person.image ? (
                      <Image 
                        src={person.image} 
                        alt={person.name} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-slate-100 dark:bg-slate-800">
                        <span className="text-4xl mb-2">👤</span>
                        <span className="text-sm">Tanpa Foto</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Social Links on Hover */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {person.instagram && (
                        <a href={person.instagram} target="_blank" rel="noopener noreferrer" className="h-10 w-10 bg-white/20 hover:bg-primary text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors">
                          <Star className="h-5 w-5" />
                        </a>
                      )}
                      {person.linkedin && (
                        <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="h-10 w-10 bg-white/20 hover:bg-primary text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors">
                          <LinkIcon className="h-5 w-5" />
                        </a>
                      )}
                      {person.email && (
                        <a href={`mailto:${person.email}`} className="h-10 w-10 bg-white/20 hover:bg-primary text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors">
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-6 text-center space-y-2 relative bg-background">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-md">
                      {person.position}
                    </div>
                    <h3 className="text-xl font-bold pt-2 line-clamp-1">{person.name}</h3>
                    <p className="text-sm font-medium text-muted-foreground">Periode {person.period}</p>
                    {person.bio && (
                      <p className="text-sm text-muted-foreground pt-3 line-clamp-3 leading-relaxed">
                        {person.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-muted-foreground border-2 border-dashed rounded-2xl">
                Belum ada data pengurus yang dipublikasikan.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
