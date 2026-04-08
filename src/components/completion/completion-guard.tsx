"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCompletedLessons } from "@/lib/progress-storage";
import { hasCourseAccess } from "@/lib/plan-access";
import { CompletionPageContent } from "./completion-page";
import { useSession } from "@/lib/auth/useSession";
import { LESSONS } from "@/lib/lessons-data";

export function CompletionGuard() {
  const router = useRouter();
  const { user, loading } = useSession();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (!hasCourseAccess(user)) {
      router.replace("/tariffs");
      return;
    }

    void getCompletedLessons(user.id).then((ids) => {
      if (ids.length < LESSONS.length) {
        router.replace("/dashboard");
        return;
      }
      setOk(true);
    });
  }, [router, user, loading]);

  if (!ok) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-[hsl(var(--fg-muted))]">
        Загрузка…
      </div>
    );
  }

  return <CompletionPageContent />;
}
