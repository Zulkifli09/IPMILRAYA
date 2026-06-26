import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const news = await prisma.news.findFirst({
    where: { OR: [{ slug: params.slug }, { id: params.slug }] },
  });
  return {
    title: `${news?.title || "Berita"} | Organisasi`,
    description: news?.excerpt,
  };
}

export default async function BeritaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const news = await prisma.news.findFirst({
    where: { 
      OR: [{ slug: params.slug }, { id: params.slug }],
      status: "PUBLISHED"
    },
    include: {
      author: {
        select: { name: true }
      }
    }
  });

  if (!news) {
    notFound();
  }

  // Related news
  const relatedNews = await prisma.news.findMany({
    where: { 
      status: "PUBLISHED",
      id: { not: news.id }
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <div className="pt-24 pb-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          
          <Link href="/berita">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Berita
            </Button>
          </Link>

          {/* Article Header */}
          <header className="space-y-6 mb-10">
            <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight">
              {news.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y py-4">
              {news.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={news.publishedAt.toISOString()}>
                    {formatDate(news.publishedAt)}
                  </time>
                </div>
              )}
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Oleh: <span className="font-medium text-foreground">{news.author?.name || "Admin"}</span></span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Button variant="outline" size="sm" className="h-8 gap-2">
                  <Share2 className="h-3.5 w-3.5" /> Bagikan
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {news.thumbnail && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-md">
              <Image 
                src={news.thumbnail} 
                alt={news.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <article className="prose prose-lg md:prose-xl max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary prose-img:rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </article>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="mt-20 pt-10 border-t">
              <h3 className="text-2xl font-bold font-heading mb-6">Berita Terkait Lainnya</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedNews.map((related) => (
                  <Link href={`/berita/${related.slug || related.id}`} key={related.id} className="group">
                    <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3">
                      {related.thumbnail ? (
                        <Image 
                          src={related.thumbnail} 
                          alt={related.title} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-muted"></div>
                      )}
                    </div>
                    <h4 className="font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-2">
                      {related.publishedAt ? formatDate(related.publishedAt) : ""}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
