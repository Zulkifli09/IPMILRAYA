"use client";

import { useTheme } from "next-themes";
import { logoutAction } from "@/actions/auth";
import {
  Sun,
  Moon,
  LogOut,
  Bell,
  Globe,
} from "lucide-react";
import Link from "next/link";

interface TopbarProps {
  user: {
    name?: string | null;
    role?: string;
    image?: string | null;
  };
}

export function DashboardTopbar({ user }: TopbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card/60 backdrop-blur-xl px-4 md:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4 ml-12 md:ml-0">
        <h2 className="text-lg font-semibold font-heading text-foreground">
          Dashboard
        </h2>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        {/* View Site */}
        <Link
          href="/"
          target="_blank"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
          title="Lihat Website"
        >
          <Globe className="h-4 w-4" />
        </Link>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-sm shadow-emerald-500/30">
            3
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
          title="Toggle Theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 ml-2 pl-3 border-l border-border">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-[11px] text-muted-foreground">{user.role}</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
