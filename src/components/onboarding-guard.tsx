"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/user-storage";

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!getUser()) {
      router.replace("/register");
      return;
    }
    queueMicrotask(() => setOk(true));
  }, [router]);

  if (!ok) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-[hsl(var(--fg-muted))]">
        Загрузка…
      </div>
    );
  }

  return <>{children}</>;
}
