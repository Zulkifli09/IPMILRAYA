export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/80 to-slate-950" />
      
      {/* Decorative gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-emerald-500/[0.08] rounded-full blur-[120px] animate-float-slow" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-teal-500/[0.06] rounded-full blur-[100px] animate-float-slow" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[150px]" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60" />
      
      {/* Particles */}
      <div className="hero-particles">
        <div className="particle particle-1" />
        <div className="particle particle-4" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
