"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLesson4Complete } from "@/lib/progress-storage";
import { hasCourseAccess } from "@/lib/plan-access";
import { CompletionPageContent } from "./completion-page";
import { useSession } from "@/lib/auth/useSession";

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

    if (user.course_completed) {
      setOk(true);
      return;
    }

    void isLesson4Complete(user.id).then((complete) => {
      if (!complete) {
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
