import { prisma } from "@/lib/prisma";
import { getOrganizationProfile, getVisionMission } from "@/actions/organization";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Trophy, Sparkles, Compass, MapPin, Newspaper, ShieldCheck, Users, FolderTree, Send } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { AnimatedLogo } from "@/components/ui/animated-logo";

export const metadata = {
  title: "Beranda | IPMIL Raya PC Parepare",
  description: "Website resmi IPMIL Raya Pengurus Cabang Parepare. Pusat informasi kegiatan, berita, dan profil organisasi.",
};

export default async function BerandaPage() {
  const [
    organization,
    visionMission,
    banners,
    latestNews,
    latestActivities,
    divisionCount,
    managementCount,
  ] = await Promise.all([
    getOrganizationProfile(),
    getVisionMission(),
    prisma.homepageBanner.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.news.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.activity.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { date: "desc" },
      take: 3,
    }),
    prisma.division.count({ where: { isActive: true } }),
    prisma.management.count({ where: { isActive: true } }),
  ]);

  const heroBanner = banners.length > 0 ? banners[0] : null;

  return (
    <div className="flex flex-col w-full">
      {/* ================================================================
          HERO SECTION - Premium full-screen with particles
          ================================================================ */}
      <section className="relative min-h-[800px] w-full overflow-hidden bg-slate-950">
        {heroBanner ? (
          <>
            {/* Background image with slow drift animation */}
            <div className="absolute inset-0 z-0">
              <Image 
                src={heroBanner.image} 
                alt="Hero Banner" 
                fill 
                className="object-cover animate-hero-bg"
                priority
              />
              {/* Multi-layer gradient overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.55)_40%,rgba(2,6,23,0.75)_70%,rgba(2,6,23,0.88)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            {/* Particle effects */}
            <div className="hero-particles">
              <div className="particle particle-1" />
              <div className="particle particle-2" />
              <div className="particle particle-3" />
              <div className="particle particle-4" />
              <div className="particle particle-5" />
            </div>

            {/* Hero content */}
            <div className="relative z-10 container flex min-h-[800px] items-center px-4 py-32 md:px-6">
              <div className="max-w-3xl">
                {/* Logo + badge row */}
                <div className="mb-8 flex flex-wrap items-center gap-5 animate-fade-in">
                  <AnimatedLogo src={organization?.logo} alt="Logo IPMIL" size="hero" variant="hero" />
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    Website resmi {organization?.shortName || "IPMIL"}
                  </div>
                </div>

                {/* Title */}
                <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] text-white md:text-6xl lg:text-7xl animate-text-reveal">
                  {heroBanner.title || organization?.name}
                </h1>

                {/* Subtitle */}
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 md:text-lg animate-text-reveal delay-200" style={{ animationDelay: '200ms' }}>
                  {heroBanner.subtitle || organization?.description?.replace(/<[^>]*>?/gm, '').substring(0, 180) || "Pusat informasi resmi organisasi untuk pengunjung umum."}
                </p>

                {/* CTA buttons */}
                <div className="mt-10 flex flex-col gap-3 sm:flex-row animate-fade-in-up delay-400" style={{ animationDelay: '400ms' }}>
                  {heroBanner.buttonText && heroBanner.buttonLink && (
                    <Link href={heroBanner.buttonLink}>
                      <Button size="lg" className="h-13 rounded-full px-8 text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
                        {heroBanner.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  <Link href="/tentang/sejarah">
                    <Button size="lg" variant="outline" className="h-13 rounded-full border-white/20 bg-white/[0.06] px-8 text-base text-white hover:bg-white/15 backdrop-blur-sm transition-all">
                      <Compass className="mr-2 h-4 w-4" /> Jelajahi Profil
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* No-banner hero: centered logo + gradient background */}
            <div className="absolute inset-0 gradient-hero" />
            <div className="hero-particles">
              <div className="particle particle-1" />
              <div className="particle particle-2" />
              <div className="particle particle-3" />
            </div>
            <div className="relative z-10 flex min-h-[800px] items-center justify-center px-4 text-center">
              <div className="space-y-8">
                <AnimatedLogo src={organization?.logo} size="hero" variant="hero" className="mx-auto" />
                <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl animate-text-reveal">
                  {organization?.name || "Selamat Datang"}
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-white/60 animate-text-reveal delay-200">
                  {organization?.shortName ? `Website Resmi ${organization.shortName}` : "Website Resmi Organisasi"}
                </p>
                <div className="flex justify-center gap-3 animate-fade-in-up delay-400">
                  <Link href="/tentang/sejarah">
                    <Button size="lg" className="rounded-full px-8 shadow-xl shadow-primary/25">
                      <Compass className="mr-2 h-4 w-4" /> Jelajahi
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* ================================================================
          STATS SECTION - Glassmorphism counters
          ================================================================ */}
      <section className="relative -mt-16 z-20 pb-8">
        <div className="container px-4 md:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Konten Dikelola Admin", value: "Dashboard", icon: ShieldCheck, gradient: "from-emerald-500/15 to-teal-500/10" },
              { label: "Divisi Aktif", value: divisionCount, icon: FolderTree, gradient: "from-blue-500/15 to-cyan-500/10" },
              { label: "Pengurus Aktif", value: managementCount, icon: Users, gradient: "from-amber-500/15 to-orange-500/10" },
              { label: "Berita Terpublikasi", value: latestNews.length + "+", icon: Newspaper, gradient: "from-purple-500/15 to-pink-500/10" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-6 card-hover-lift animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                  <stat.icon className="h-5 w-5 text-foreground/80" />
                </div>
                <h3 className="text-2xl font-bold font-heading animate-counter-up">{stat.value}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          TENTANG KAMI - Profile & Vision section
          ================================================================ */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 -right-32 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-10 -left-20 w-[300px] h-[300px] bg-accent/[0.03] rounded-full blur-[80px]" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Tentang Kami
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight">
                Mengenal Lebih Dekat{" "}
                <span className="gradient-text">{organization?.shortName || "IPMIL"}</span>
              </h2>
              <div 
                className="text-muted-foreground leading-relaxed line-clamp-5 prose-sm"
                dangerouslySetInnerHTML={{ __html: organization?.description || "" }}
              />
              <Link href="/tentang/sejarah" className="inline-flex">
                <Button variant="outline" className="group rounded-full px-6 border-primary/20 hover:border-primary/40 hover:bg-primary/5">
                  Baca Sejarah Lengkap
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Vision card */}
            <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-primary/8 blur-3xl" />
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 h-32 w-32 rounded-full bg-accent/6 blur-2xl" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  Visi Organisasi
                </h3>
                <blockquote className="italic text-foreground/75 leading-relaxed mb-6 border-l-[3px] border-primary/40 pl-5 py-2">
                  &ldquo;{visionMission?.vision || "Menjadi organisasi yang unggul dan bermanfaat bagi masyarakat."}&rdquo;
                </blockquote>

                {visionMission?.missions && visionMission.missions.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-border/50">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      {visionMission.missions.length} Misi Utama
                    </p>
                  </div>
                )}

                <Link href="/tentang/visi-misi" className="text-primary text-sm font-medium hover:underline flex items-center mt-2 group/link">
                  Lihat Visi & Misi Lengkap 
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          BERITA TERBARU - News cards
          ================================================================ */}
      {latestNews.length > 0 && (
        <section className="py-24 bg-muted/20 border-t relative">
          <div className="absolute inset-0 gradient-mesh-bg opacity-30 pointer-events-none" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex items-end justify-between mb-12">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                  <Newspaper className="h-3.5 w-3.5" />
                  Informasi Terkini
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Berita Terkini</h2>
                <p className="text-muted-foreground max-w-lg">Informasi dan kabar terbaru seputar organisasi.</p>
              </div>
              <Link href="/berita" className="hidden md:block">
                <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary rounded-full px-5">
                  Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {latestNews.map((news, i) => (
                <Link 
                  href={`/berita/${news.slug || news.id}`} 
                  key={news.id} 
                  className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm card-hover-lift card-shine"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative h-52 w-full overflow-hidden bg-muted">
                    {news.thumbnail ? (
                      <Image 
                        src={news.thumbnail} 
                        alt={news.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-muted to-muted/50">
                        <Newspaper className="h-8 w-8 opacity-30" />
                      </div>
                    )}
                    {/* Date badge overlay */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-medium">
                      {news.publishedAt ? formatDate(news.publishedAt) : ""}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                      {news.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-5 flex-1 leading-relaxed">
                      {news.excerpt || news.content.replace(/<[^>]*>?/gm, '')}
                    </p>
                    <div className="text-sm font-medium flex items-center text-primary/80 group-hover:text-primary transition-colors">
                      Baca selengkapnya 
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link href="/berita">
                <Button variant="outline" className="w-full rounded-full">
                  Lihat Semua Berita
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          KEGIATAN TERBARU - Activities
          ================================================================ */}
      {latestActivities.length > 0 && (
        <section className="py-24 bg-background border-t relative">
          <div className="container px-4 md:px-6">
            <div className="flex items-end justify-between mb-12">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                  <Calendar className="h-3.5 w-3.5" />
                  Aktivitas
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Agenda & Kegiatan</h2>
                <p className="text-muted-foreground max-w-lg">Ikuti berbagai kegiatan dan acara yang kami selenggarakan.</p>
              </div>
              <Link href="/kegiatan" className="hidden md:block">
                <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary rounded-full px-5">
                  Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {latestActivities.map((kegiatan, i) => (
                <Link 
                  href={`/kegiatan/${kegiatan.slug || kegiatan.id}`}
                  key={kegiatan.id} 
                  className="group flex gap-5 p-5 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  {/* Date badge */}
                  <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-2xl p-4 min-w-[80px] h-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {kegiatan.date ? new Date(kegiatan.date).toLocaleString('id-ID', { month: 'short' }) : ''}
                    </span>
                    <span className="text-2xl font-bold leading-none mt-0.5">
                      {kegiatan.date ? new Date(kegiatan.date).getDate() : ''}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {kegiatan.name}
                    </h3>
                    <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{kegiatan.location || "TBA"}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link href="/kegiatan">
                <Button variant="outline" className="w-full rounded-full">
                  Lihat Semua Kegiatan
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          CTA SECTION - Contact call-to-action
          ================================================================ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="hero-particles">
          <div className="particle particle-1" />
          <div className="particle particle-3" />
        </div>
        <div className="relative z-10 container px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-full text-sm font-medium backdrop-blur-sm border border-white/10">
              <Send className="h-3.5 w-3.5 text-emerald-400" />
              Hubungi Kami
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white leading-tight">
              Punya Pertanyaan atau Ingin Berkolaborasi?
            </h2>
            <p className="text-white/55 text-lg max-w-xl mx-auto">
              Jangan ragu untuk menghubungi kami. Tim IPMIL siap membantu dan menjawab setiap pertanyaan Anda.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Link href="/kontak">
                <Button size="lg" className="rounded-full px-8 h-13 text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
                  <Send className="mr-2 h-4 w-4" />
                  Kirim Pesan
                </Button>
              </Link>
              <Link href="/tentang/sejarah">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-13 text-base border-white/20 bg-white/[0.06] text-white hover:bg-white/15 backdrop-blur-sm transition-all">
                  Tentang Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
