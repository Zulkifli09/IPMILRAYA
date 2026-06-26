import { getStats } from "@/actions/organization";
import { auth } from "@/lib/auth";
import Link from "next/link";
import {
  Users,
  FolderTree,
  Briefcase,
  CalendarDays,
  Newspaper,
  Mail,
  Image,
  ArrowRight,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const stats = await getStats();

  const statCards = [
    {
      title: "Pengurus Aktif",
      value: stats.totalManagement,
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      bgGlow: "bg-blue-500/10",
      textColor: "text-blue-500",
    },
    {
      title: "Divisi Aktif",
      value: stats.totalDivisions,
      icon: FolderTree,
      gradient: "from-teal-500 to-teal-600",
      bgGlow: "bg-teal-500/10",
      textColor: "text-teal-500",
    },
    {
      title: "Program Kerja",
      value: stats.totalWorkPrograms,
      icon: Briefcase,
      gradient: "from-amber-500 to-amber-600",
      bgGlow: "bg-amber-500/10",
      textColor: "text-amber-500",
    },
    {
      title: "Kegiatan",
      value: stats.totalActivities,
      icon: CalendarDays,
      gradient: "from-purple-500 to-purple-600",
      bgGlow: "bg-purple-500/10",
      textColor: "text-purple-500",
    },
    {
      title: "Berita Terbit",
      value: stats.totalNews,
      icon: Newspaper,
      gradient: "from-rose-500 to-rose-600",
      bgGlow: "bg-rose-500/10",
      textColor: "text-rose-500",
    },
    {
      title: "Pesan Belum Dibaca",
      value: stats.totalMessages,
      icon: Mail,
      gradient: "from-orange-500 to-orange-600",
      bgGlow: "bg-orange-500/10",
      textColor: "text-orange-500",
    },
    {
      title: "Galeri",
      value: stats.totalGalleries,
      icon: Image,
      gradient: "from-emerald-500 to-emerald-600",
      bgGlow: "bg-emerald-500/10",
      textColor: "text-emerald-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-card to-card/50 p-6 md:p-8">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-48 w-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
            Selamat Datang, {session?.user?.name} 👋
          </h1>
          <p className="mt-2 text-muted-foreground max-w-lg">
            Kelola semua konten website IPMIL dari dashboard ini. Semua perubahan akan langsung terlihat di website publik.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statCards.map((card, i) => (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 card-shine"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <p className="mt-2 text-3xl font-bold font-heading text-foreground">
                  {card.value}
                </p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            {/* Bottom gradient line on hover */}
            <div className={`absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r ${card.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold font-heading text-foreground mb-4 flex items-center gap-2">
          <span className="h-5 w-1 bg-primary rounded-full" />
          Aksi Cepat
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Tulis Berita", href: "/dashboard/berita/create", icon: Newspaper, desc: "Buat artikel baru" },
            { label: "Tambah Kegiatan", href: "/dashboard/kegiatan/create", icon: CalendarDays, desc: "Catat kegiatan baru" },
            { label: "Upload Galeri", href: "/dashboard/galeri/create", icon: Image, desc: "Tambah foto/video" },
            { label: "Lihat Pesan", href: "/dashboard/pesan", icon: Mail, desc: `${stats.totalMessages} belum dibaca` },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <action.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  {action.label}
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </p>
                <p className="text-xs text-muted-foreground truncate">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
