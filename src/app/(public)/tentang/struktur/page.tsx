import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Users, Crown, ChevronDown } from "lucide-react";

export const metadata = {
  title: "Struktur Organisasi | Tentang",
};

export default async function StrukturOrganisasiPage() {
  const managements = await prisma.management.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="pt-24 pb-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Struktur Organisasi</h1>
            <p className="text-xl text-muted-foreground">
              Susunan kepengurusan yang menggerakkan roda organisasi.
            </p>
          </div>

          {/* Visual Struktur - Simplified Tree */}
          <div className="flex flex-col items-center gap-8 relative py-8">
            
            {/* Top Level (Ketua dll) - Placeholder visual */}
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-4 border-background z-10">
                <Crown className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-bold text-xl">Badan Pengurus Harian</h3>
              <p className="text-sm text-muted-foreground">Ketua Umum, Sekretaris, Bendahara</p>
            </div>

            <ChevronDown className="h-8 w-8 text-border" />

            {/* Mid Level */}
            <div className="w-full max-w-3xl border-t-2 border-border pt-8 relative flex justify-around">
              {/* Connector lines are tricky without knowing exact divisions, using generic visual */}
              <div className="flex flex-col items-center text-center px-4">
                <div className="h-16 w-16 bg-muted text-primary rounded-xl flex items-center justify-center shadow-sm z-10">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold">Divisi-Divisi</h3>
                <p className="text-sm text-muted-foreground max-w-[150px]">Koordinator & Anggota Bidang</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <div className="h-16 w-16 bg-muted text-primary rounded-xl flex items-center justify-center shadow-sm z-10">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold">Departemen</h3>
                <p className="text-sm text-muted-foreground max-w-[150px]">Bidang Teknis & Pelaksana</p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-8 rounded-3xl text-center">
            <h2 className="text-2xl font-bold mb-4">Kenali Para Pengurus Kami</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Lihat profil lengkap dan susunan personalia Badan Pengurus secara detail di halaman Pengurus.
            </p>
            <a href="/pengurus" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2">
              Lihat Daftar Pengurus Lengkap
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
