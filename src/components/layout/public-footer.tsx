import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight, Heart } from "lucide-react";
import { AnimatedLogo } from "@/components/ui/animated-logo";

interface PublicFooterProps {
  organization: any;
  socialMedias: any[];
}

export function PublicFooter({ organization, socialMedias }: PublicFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
      {/* Decorative mesh gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/[0.03] rounded-full blur-[100px]" />
      </div>

      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="relative container mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand & About */}
          <div className="space-y-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <AnimatedLogo src={organization?.logo} alt="Logo organisasi" size="sm" variant="subtle" className="ring-1 ring-white/10" />
              <div className="flex flex-col">
                <span className="font-bold font-heading text-xl text-white group-hover:text-emerald-400 transition-colors">
                  {organization?.shortName || "IPMIL"}
                </span>
                <span className="text-[10px] font-medium tracking-wider uppercase text-slate-500">
                  Pengurus Cabang Parepare
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 line-clamp-4">
              {organization?.description?.replace(/<[^>]*>?/gm, '').substring(0, 180)}
              {organization?.description && organization.description.length > 180 ? "..." : ""}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="font-semibold text-white tracking-wider uppercase text-xs flex items-center gap-2">
              <span className="h-px w-4 bg-emerald-500/60" />
              Tautan Cepat
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: "Sejarah", href: "/tentang/sejarah" },
                { name: "Visi & Misi", href: "/tentang/visi-misi" },
                { name: "Pengurus", href: "/pengurus" },
                { name: "Berita Terkini", href: "/berita" },
                { name: "Galeri", href: "/galeri" },
                { name: "Kontak", href: "/kontak" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-1 group/link">
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="font-semibold text-white tracking-wider uppercase text-xs flex items-center gap-2">
              <span className="h-px w-4 bg-emerald-500/60" />
              Hubungi Kami
            </h3>
            <ul className="space-y-4">
              {organization?.address && (
                <li className="flex items-start gap-3 text-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="leading-relaxed text-slate-400">{organization.address}</span>
                </li>
              )}
              {organization?.phone && (
                <li className="flex items-center gap-3 text-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-slate-400">{organization.phone}</span>
                </li>
              )}
              {organization?.email && (
                <li className="flex items-center gap-3 text-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <a href={`mailto:${organization.email}`} className="text-slate-400 hover:text-emerald-400 transition-colors">
                    {organization.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-5">
            <h3 className="font-semibold text-white tracking-wider uppercase text-xs flex items-center gap-2">
              <span className="h-px w-4 bg-emerald-500/60" />
              Sosial Media
            </h3>
            {socialMedias && socialMedias.length > 0 ? (
              <div className="flex flex-col space-y-2.5">
                {socialMedias.filter(sm => sm.isActive).map(sm => (
                  <a 
                    key={sm.id} 
                    href={sm.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-all duration-200 flex items-center gap-2 group/social"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 group-hover/social:bg-emerald-500/10 transition-colors">
                      <span className="text-xs font-bold">{sm.platform.charAt(0)}</span>
                    </div>
                    {sm.platform}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover/social:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-600">Belum ada sosial media.</p>
            )}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            &copy; {currentYear} {organization?.name || "IPMIL"}. Dibuat dengan <Heart className="h-3 w-3 text-emerald-500/60" /> untuk komunitas.
          </p>
          <div className="flex gap-5">
            <Link href="/login" className="text-xs text-slate-600 hover:text-emerald-400 transition-colors flex items-center gap-1">
              Login Admin
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
