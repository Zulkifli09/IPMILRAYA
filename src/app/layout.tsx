import type { Metadata } from "next";
import { Inter, Outfit, Geist } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IPMIL - Organisasi",
    template: "%s | IPMIL",
  },
  description:
    "Website resmi organisasi IPMIL. Media informasi, berita, kegiatan, dan keanggotaan organisasi.",
  keywords: ["IPMIL", "organisasi", "komunitas", "keanggotaan"],
  authors: [{ name: "IPMIL" }],
  openGraph: {
    title: "IPMIL - Organisasi",
    description:
      "Website resmi organisasi IPMIL. Media informasi, berita, kegiatan, dan keanggotaan organisasi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className={`${geist.variable} ${outfit.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
