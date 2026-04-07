"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, isOnboardingComplete } from "@/lib/user-storage";

export function PlatformGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.replace("/register");
      return;
    }
    if (!isOnboardingComplete()) {
      router.replace("/onboarding");
      return;
    }
    queueMicrotask(() => setOk(true));
  }, [router]);

  if (!ok) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--bg))] text-sm text-[hsl(var(--fg-muted))]">
        Загрузка…
      </div>
    );
  }

  return <>{children}</>;
}
