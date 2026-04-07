"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LessonLockOverlay() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
      <Lock className="h-10 w-10 gradient-text" strokeWidth={2} />
      <p className="max-w-sm text-sm text-[hsl(var(--fg-muted))]">
        Этот урок пока закрыт. Сначала завершите предыдущий.
      </p>
      <Button variant="outline" asChild>
        <Link href="/dashboard">К списку уроков</Link>
      </Button>
    </div>
  );
}
