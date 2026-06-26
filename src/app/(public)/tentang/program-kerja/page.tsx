import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Zap, XCircle } from "lucide-react";

export const metadata = {
  title: "Program Kerja | Tentang",
};

export default async function ProgramKerjaPublicPage() {
  const prokers = await prisma.workProgram.findMany({
    orderBy: [
      { order: "asc" },
      { name: "asc" }
    ],
    include: {
      division: true,
    }
  });

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
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Program Kerja</h1>
            <p className="text-xl text-muted-foreground">
              Daftar kegiatan utama yang menjadi fokus organisasi.
            </p>
          </div>

          <div className="grid gap-6">
            {prokers.length > 0 ? (
              prokers.map((proker) => {
                const status = statusConfig[proker.status] || statusConfig.planned;
                const StatusIcon = status.icon;

                return (
                  <div key={proker.id} className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all">
                    <div className={`flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-xl ${status.bgClass} ${status.colorClass}`}>
                      <StatusIcon className="h-8 w-8" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="text-xl font-bold">{proker.name}</h3>
                        <Badge variant="outline" className={`${status.colorClass} border-current`}>
                          {status.label}
                        </Badge>
                      </div>
                      <div className="text-sm font-medium text-primary bg-primary/5 inline-block px-2 py-1 rounded-md">
                        {proker.division?.name || "Lintas Divisi"} {proker.period ? `(${proker.period})` : ""}
                      </div>
                      <p className="text-muted-foreground pt-2">
                        {proker.description || "Tidak ada deskripsi rinci untuk program ini."}
                      </p>
                      {(proker.startDate || proker.endDate) && (
                        <div className="text-sm text-muted-foreground pt-2 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {proker.startDate ? new Date(proker.startDate).toLocaleDateString("id-ID") : "?"} 
                            {" - "} 
                            {proker.endDate ? new Date(proker.endDate).toLocaleDateString("id-ID") : "Selesai"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-muted-foreground border border-dashed rounded-xl">
                Belum ada data program kerja.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
