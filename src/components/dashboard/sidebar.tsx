"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Image as ImageIcon,
  Users,
  FolderTree,
  Briefcase,
  Newspaper,
  CalendarDays,
  GalleryHorizontalEnd,
  Mail,
  UserCog,
  Settings,
  ChevronLeft,
  Menu,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { AnimatedLogo } from "@/components/ui/animated-logo";

interface SidebarProps {
  user: {
    name?: string | null;
    role?: string;
    image?: string | null;
  };
}

const adminMenuItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Profil Organisasi", href: "/dashboard/profil-organisasi", icon: Building2 },
  { title: "Banner Homepage", href: "/dashboard/banner", icon: ImageIcon },
  { title: "Pengurus", href: "/dashboard/pengurus", icon: Users },
  { title: "Divisi", href: "/dashboard/divisi", icon: FolderTree },
  { title: "Program Kerja", href: "/dashboard/program-kerja", icon: Briefcase },
  { title: "Berita", href: "/dashboard/berita", icon: Newspaper },
  { title: "Kegiatan", href: "/dashboard/kegiatan", icon: CalendarDays },
  { title: "Galeri", href: "/dashboard/galeri", icon: GalleryHorizontalEnd },
  { title: "Pesan Masuk", href: "/dashboard/pesan", icon: Mail },
  { title: "Pengguna", href: "/dashboard/pengguna", icon: UserCog },
  { title: "Pengaturan", href: "/dashboard/pengaturan", icon: Settings },
];

export function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = adminMenuItems;

  const SidebarContent = () => (
    <>
      {/* Logo / Brand */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <AnimatedLogo size="sm" variant="subtle" className="!h-8 !w-8" />
            <span className="text-lg font-bold font-heading text-sidebar-foreground">
              IPMIL
            </span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/60 hover:text-sidebar-foreground transition-all"
        >
          <ChevronLeft
            className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5">
        <ul className="space-y-0.5">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-r-full" />
                  )}
                  <item.icon className={cn("h-[18px] w-[18px] shrink-0 transition-colors", isActive && "text-accent")} />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* View Website Link */}
      {!collapsed && (
        <div className="px-3 py-2 border-t border-sidebar-border">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            Lihat Website
          </Link>
        </div>
      )}

      {/* User Info */}
      {!collapsed && (
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-accent font-semibold text-sm ring-1 ring-accent/10">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {user.name}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/40">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar text-sidebar-foreground shadow-lg shadow-black/10 md:hidden border border-sidebar-border"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar transition-transform duration-300 shadow-2xl md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-sidebar transition-all duration-300 border-r border-sidebar-border",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
