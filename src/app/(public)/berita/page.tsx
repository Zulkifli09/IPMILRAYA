import { getNews } from "@/actions/content";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Calendar, User } from "lucide-react";

export const metadata = {
  title: "Berita | Organisasi",
};

export default async function BeritaPublicPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const { items, pages: totalPages } = await getNews(page, 9); // Use 9 items per page for a 3-col grid

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900/20">
      <div className="container px-4 md:px-6">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Berita & Artikel</h1>
            <p className="text-xl text-muted-foreground">
              Dapatkan informasi terbaru, pengumuman, dan artikel seputar organisasi kami.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.length > 0 ? (
              items.map((news) => (
                <Link 
                  href={`/berita/${news.slug || news.id}`} 
                  key={news.id} 
                  className="group flex flex-col h-full bg-background rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-muted">
                    {news.thumbnail ? (
                      <Image 
                        src={news.thumbnail} 
                        alt={news.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-muted-foreground">
                        <span className="font-medium text-sm">Tidak ada gambar</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium mb-4">
                      {news.publishedAt && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(news.publishedAt)}
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {news.author?.name || "Admin"}
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {news.title}
                    </h2>
                    
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                      {news.excerpt || news.content.replace(/<[^>]*>?/gm, '')}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-sm font-semibold text-primary">
                      <span>Baca Artikel</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-muted-foreground border-2 border-dashed rounded-2xl">
                Belum ada berita yang dipublikasikan.
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
                    href={`/berita?page=${pageNum}`}
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
