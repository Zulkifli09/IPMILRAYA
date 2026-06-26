import Image from "next/image";
import { cn } from "@/lib/utils";
import defaultLogo from "../../../assets/logo.jpeg";

interface AnimatedLogoProps {
  src?: string | null;
  alt?: string;
  size?: "sm" | "md" | "lg" | "hero";
  variant?: "default" | "subtle" | "hero";
  className?: string;
}

export function AnimatedLogo({
  src,
  alt = "Logo organisasi",
  size = "md",
  variant = "default",
  className,
}: AnimatedLogoProps) {
  const sizeClass = {
    sm: "h-10 w-10 md:h-11 md:w-11",
    md: "h-14 w-14 md:h-16 md:w-16",
    lg: "h-20 w-20 md:h-24 md:w-24",
    hero: "h-28 w-28 md:h-36 md:w-36",
  }[size];

  const orbitClass = {
    default: "animate-logo-orbit",
    subtle: "animate-logo-orbit",
    hero: "animate-logo-orbit",
  }[variant];

  const glowIntensity = {
    default: "from-primary/20 via-accent/15 to-transparent",
    subtle: "from-primary/10 via-accent/8 to-transparent",
    hero: "from-primary/30 via-accent/25 to-emerald-400/15",
  }[variant];

  return (
    <div className={cn("group relative flex shrink-0 items-center justify-center", className)}>


      {/* Inner container */}
      <div className={cn(
        "relative overflow-hidden rounded-full border bg-white shadow-lg transition-all duration-500 group-hover:scale-105",
        sizeClass,
        variant === "hero"
          ? "border-white/80 p-1.5 shadow-xl shadow-primary/15 group-hover:shadow-2xl group-hover:shadow-primary/25"
          : "border-white/70 p-1 shadow-primary/15"
      )}>
        {/* Shimmer effect */}
        <div className={cn(
          "absolute inset-y-0 -left-1/2 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent",
          variant === "hero" ? "animate-logo-shimmer" : "animate-logo-shimmer"
        )} />

        {/* Logo image */}
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={size === "hero" ? "(max-width: 768px) 112px, 144px" : "(max-width: 768px) 64px, 96px"}
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src={defaultLogo}
            alt={alt}
            fill
            sizes={size === "hero" ? "(max-width: 768px) 112px, 144px" : "(max-width: 768px) 64px, 96px"}
            className="object-cover"
            priority
          />
        )}
      </div>
    </div>
  );
}
