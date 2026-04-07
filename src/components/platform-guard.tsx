"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth/useSession";
import { isPaidPlan } from "@/lib/plan-access";

/** Страницы, где пользователь с plan=free может быть без кода (обзор, тарифы, профиль). */
function isPathAllowedForFreeUser(pathname: string): boolean {
  if (pathname === "/tariffs" || pathname.startsWith("/tariffs/")) return true;
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) return true;
  if (pathname === "/profile" || pathname.startsWith("/profile/")) return true;
  return false;
}

export function PlatformGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useSession();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading && !timedOut) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (!isPaidPlan(user.plan) && !isPathAllowedForFreeUser(pathname)) {
      router.replace("/activate");
      return;
    }
  }, [user, loading, timedOut, router, pathname]);

  if (loading && !timedOut) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[hsl(var(--bg))] text-sm text-[hsl(var(--fg-muted))]">
        <div
          className="h-8 w-8 animate-spin rounded-full border-[3px] border-[hsl(var(--border))] border-t-[#3B3BF5]"
          aria-hidden
        />
        <p>Загрузка…</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isPaidPlan(user.plan) && !isPathAllowedForFreeUser(pathname)) {
    return null;
  }

  return <>{children}</>;
}
