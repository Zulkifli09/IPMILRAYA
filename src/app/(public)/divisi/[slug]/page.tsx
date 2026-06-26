import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, Clock, Zap, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const division = await prisma.division.findFirst({
    where: { OR: [{ slug: params.slug }, { id: params.slug }] },
  });
  return {
    title: `${division?.name || "Detail Divisi"} | Organisasi`,
  };
}

export default async function DivisiDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const division = await prisma.division.findFirst({
    where: { 
      OR: [{ slug: params.slug }, { id: params.slug }],
      isActive: true 
    },
    include: {
      workPrograms: {
        orderBy: { order: "asc" }
      }
    }
  });

  if (!division) {
    notFound();
  }

  const statusConfig: Record<string, { label: string; icon: any; colorClass: string; bgClass: string }> = {
    planned: { label: "Direncanakan", icon: Clock, colorClass: "text-blue-500", bgClass: "bg-blue-500/10" },
    ongoing: { label: "Sedang Berjalan", icon: Zap, colorClass: "text-amber-500", bgClass: "bg-amber-500/10" },
    completed: { label: "Selesai", icon: CheckCircle, colorClass: "text-green-500", bgClass: "bg-green-500/10" },
    cancelled: { label: "Dibatalkan", icon: XCircle, colorClass: "text-red-500", bgClass: "bg-red-500/10" },
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <Link href="/divisi">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Divisi
            </Button>
          </Link>

          {/* Header Divisi */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-muted/30 p-8 rounded-3xl border">
            {division.image && (
              <div className="relative h-32 w-32 shrink-0">
                <Image 
                  src={division.image} 
                  alt={division.name} 
                  fill 
                  className="object-contain"
                />
              </div>
            )}
            <div className="text-center md:text-left space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold font-heading">{division.name}</h1>
              {division.description && (
                <p className="text-lg text-muted-foreground">
                  {division.description}
                </p>
              )}
            </div>
          </div>

          {/* Tupoksi */}
          {division.duties && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold border-b pb-2">Tugas & Fungsi Indikator</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-muted-foreground bg-card border rounded-2xl p-6">
                {division.duties}
              </div>
            </div>
          )}

          {/* Program Kerja */}
          <div className="space-y-6 pt-8">
            <h2 className="text-2xl font-bold border-b pb-2">Program Kerja Divisi</h2>
            <div className="grid gap-4">
              {division.workPrograms.length > 0 ? (
                division.workPrograms.map((proker) => {
                  const status = statusConfig[proker.status] || statusConfig.planned;
                  const StatusIcon = status.icon;

                  return (
                    <div key={proker.id} className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                      <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg ${status.bgClass} ${status.colorClass}`}>
                        <StatusIcon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-lg font-bold">{proker.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {proker.description || "Tidak ada rincian deskripsi."}
                        </p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 mt-4 sm:mt-0">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bgClass} ${status.colorClass}`}>
                          {status.label}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          Periode {proker.period}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
                  Belum ada program kerja yang ditambahkan untuk divisi ini.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
