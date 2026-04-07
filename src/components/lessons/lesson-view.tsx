"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { LessonPlayer, NotionButton } from "./lesson-player";
import {
  markLessonComplete,
  isLessonUnlocked,
  getCompletedLessons,
} from "@/lib/progress-storage";
import type { Lesson } from "@/types";
import { LESSONS } from "@/lib/lessons-data";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { hasCourseAccess } from "@/lib/plan-access";
import { useSession } from "@/lib/auth/useSession";

function fireLesson4Confetti() {
  const fire = (particleRatio: number, opts: confetti.Options) =>
    confetti({
      origin: { y: 0.7 },
      ...opts,
      particleCount: Math.floor(200 * particleRatio),
    });
  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

export function LessonView({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const { user, loading: sessionLoading } = useSession();
  const paid = hasCourseAccess(user);
  const [unlocked, setUnlocked] = useState(false);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    if (sessionLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (!paid) {
      router.replace("/tariffs");
      return;
    }
    let cancelled = false;
    void (async () => {
      const ids = await getCompletedLessons(user.id);
      if (cancelled) return;
      setCompletedIds(ids);
      const u = await isLessonUnlocked(user.id, lesson.id);
      if (cancelled) return;
      setUnlocked(u);
      if (!u) {
        router.replace("/dashboard");
        return;
      }
      setStatus(ids.includes(lesson.id) ? "done" : "idle");
    })();
    return () => {
      cancelled = true;
    };
  }, [user, sessionLoading, paid, lesson.id, router]);

  const total = LESSONS.length;
  const doneCount = completedIds.length;
  const progressLabel = `${doneCount}/${total}`;

  if (sessionLoading || !user || !paid || !unlocked) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-[hsl(var(--fg-muted))]">
        {!paid
          ? "Перенаправление к тарифам…"
          : "Перенаправление к урокам…"}
      </div>
    );
  }

  async function handleComplete() {
    if (status !== "idle" || completedIds.includes(lesson.id) || !user) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 500));

    try {
      await markLessonComplete(user.id, lesson.id);
    } catch {
      setStatus("idle");
      return;
    }

    setCompletedIds((prev) =>
      prev.includes(lesson.id) ? prev : [...prev, lesson.id],
    );

    if (lesson.id === 4) {
      fireLesson4Confetti();
      try {
        const res = await fetch("/api/course/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });
        if (!res.ok) {
          /* письмо — best effort */
        }
      } catch {
        /* ignore */
      }
    }

    setStatus("done");

    if (lesson.id === 4) {
      setTimeout(() => router.push("/completion"), 1500);
    } else {
      setTimeout(() => router.push("/dashboard"), 1000);
    }
  }

  return (
    <div className="fade-up mx-auto max-w-3xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm">
        <Link
          href="/dashboard"
          className="text-[hsl(var(--fg-muted))] transition-colors hover:text-[hsl(var(--fg))]"
        >
          ← Назад к урокам
        </Link>
        <span className="text-[hsl(var(--fg-muted))]">
          Прогресс: {progressLabel}
        </span>
      </div>

      <LessonPlayer videoUrl={lesson.videoUrl} title={lesson.title} />

      <h1 className="mt-6 text-xl font-semibold text-[hsl(var(--fg))]">
        {lesson.title}
      </h1>
      <p className="mt-1 text-sm text-[hsl(var(--fg-muted))]">
        {lesson.duration}
      </p>

      <hr className="my-6 border-[hsl(var(--border))]" />

      <p className="text-sm leading-relaxed text-[hsl(var(--fg-muted))]">
        {lesson.description}
      </p>

      <div className="mt-6">
        <NotionButton url={lesson.notionUrl} label={lesson.notionLabel} />
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div
              key="done"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Button
                variant="gradient"
                className="w-full"
                size="lg"
                disabled
              >
                <CheckCircle2 className="h-5 w-5" />
                Засчитано!
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="action"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                variant="gradient"
                className="w-full"
                size="lg"
                disabled={status === "loading"}
                onClick={() => void handleComplete()}
              >
                {status === "loading" ? "Сохраняем…" : "Урок пройден ✓"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
