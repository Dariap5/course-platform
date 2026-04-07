"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
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

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (!isPaidPlan(user.plan) && !isPathAllowedForFreeUser(pathname)) {
      router.replace("/activate");
      return;
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--bg))] text-sm text-[hsl(var(--fg-muted))]">
        <div
          className="h-6 w-6 animate-spin rounded-full border-2 border-[#3B3BF5] border-t-transparent"
          aria-hidden
        />
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
