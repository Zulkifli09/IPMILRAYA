"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedLogo } from "@/components/ui/animated-logo";

interface PublicNavbarProps {
  organization: any;
}

export function PublicNavbar({ organization }: PublicNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Beranda", href: "/" },
    {
      name: "Tentang",
      children: [
        { name: "Sejarah Organisasi", href: "/tentang/sejarah" },
        { name: "Visi & Misi", href: "/tentang/visi-misi" },
        { name: "Struktur Organisasi", href: "/tentang/struktur" },
        { name: "Program Kerja", href: "/tentang/program-kerja" },
      ],
    },
    { name: "Pengurus", href: "/pengurus" },
    { name: "Divisi", href: "/divisi" },
    { name: "Berita", href: "/berita" },
    { name: "Kegiatan", href: "/kegiatan" },
    { name: "Galeri", href: "/galeri" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "glass-navbar py-2.5"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <AnimatedLogo src={organization?.logo} alt="Logo organisasi" size="sm" variant="subtle" />
            <div className="flex flex-col">
              <span className={cn(
                "font-bold font-heading text-lg leading-tight transition-colors duration-300",
                isScrolled ? "text-foreground" : "text-foreground md:text-white"
              )}>
                {organization?.shortName || "IPMIL"}
              </span>
              {!isScrolled && (
                <span className="hidden md:block text-[10px] font-medium tracking-wider uppercase text-white/50">
                  Pengurus Cabang
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.children ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 outline-none",
                      pathname.startsWith("/tentang") 
                        ? "text-primary" 
                        : isScrolled ? "text-foreground/80 hover:text-foreground" : "text-white/85 hover:text-white"
                    )}>
                      {link.name} <ChevronDown className="h-3 w-3 transition-transform" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52 rounded-xl border-border/50 shadow-xl shadow-black/10 backdrop-blur-xl bg-popover/95">
                      {link.children.map((child) => (
                        <Link key={child.name} href={child.href} className="w-full block">
                          <DropdownMenuItem className={cn(
                            "w-full cursor-pointer rounded-lg transition-colors py-2",
                            pathname === child.href && "text-primary bg-primary/5 font-medium"
                          )}>
                            {child.name}
                          </DropdownMenuItem>
                        </Link>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      "after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-current after:rounded-full after:transition-all after:duration-300 hover:after:w-[60%]",
                      pathname === link.href 
                        ? "text-primary after:w-[60%]" 
                        : isScrolled 
                          ? "text-foreground/70 hover:text-foreground hover:bg-muted/50" 
                          : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            
            <div className="ml-2 flex items-center gap-1.5 pl-2 border-l border-white/15">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Toggle & Theme */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              className={cn(
                "p-2.5 rounded-lg transition-colors",
                isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className={cn(
        "lg:hidden absolute top-full left-0 w-full transition-all duration-300 ease-out",
        mobileMenuOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      )}>
        <div className="bg-background/95 backdrop-blur-xl border-b shadow-xl shadow-black/10">
          <div className="container px-4 py-5 flex flex-col space-y-1">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col">
                {link.children ? (
                  <>
                    <div className="font-medium text-foreground/60 text-xs uppercase tracking-wider px-3 py-2 mt-2">
                      {link.name}
                    </div>
                    <div className="flex flex-col space-y-0.5 pl-3 border-l-2 border-primary/20 ml-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "text-sm py-2 px-3 rounded-md transition-colors",
                            pathname === child.href ? "text-primary font-medium bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "font-medium py-2.5 px-3 rounded-lg transition-all text-sm",
                      pathname === link.href ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted/50"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

          </div>
        </div>
      </div>
    </header>
  );
}
