"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLesson4Complete } from "@/lib/progress-storage";
import { hasPurchased } from "@/lib/purchase-storage";
import { CompletionPageContent } from "./completion-page";

export function CompletionGuard() {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!hasPurchased()) {
      router.replace("/tariffs");
      return;
    }
    if (!isLesson4Complete()) {
      router.replace("/dashboard");
      return;
    }
    queueMicrotask(() => setOk(true));
  }, [router]);

  if (!ok) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-[hsl(var(--fg-muted))]">
        Загрузка…
      </div>
    );
  }

  return <CompletionPageContent />;
}
