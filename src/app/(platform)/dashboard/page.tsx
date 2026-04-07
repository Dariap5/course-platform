"use client";

import { LessonList } from "@/components/lessons/lesson-list";
import { useSession } from "@/lib/auth/useSession";

export default function DashboardPage() {
  const { user, loading } = useSession();

  if (loading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center text-sm text-[hsl(var(--fg-muted))]">
        Загрузка…
      </div>
    );
  }

  const name = user?.name ?? "друг";

  return <LessonList userName={name} />;
}
