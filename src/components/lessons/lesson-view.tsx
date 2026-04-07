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
  wasCompletionEmailSent,
  markCompletionEmailSent,
  getCompletedLessons,
} from "@/lib/progress-storage";
import { getUser } from "@/lib/user-storage";
import type { Lesson } from "@/types";
import { LESSONS } from "@/lib/lessons-data";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { hasPurchased } from "@/lib/purchase-storage";

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
  const paid = hasPurchased();
  const unlocked = isLessonUnlocked(lesson.id);
  const [status, setStatus] = useState<"idle" | "loading" | "done">(() => {
    if (typeof window === "undefined") return "idle";
    return getCompletedLessons().includes(lesson.id) ? "done" : "idle";
  });

  useEffect(() => {
    if (!hasPurchased()) {
      router.replace("/tariffs");
      return;
    }
    if (!isLessonUnlocked(lesson.id)) {
      router.replace("/dashboard");
    }
  }, [lesson.id, router]);

  const total = LESSONS.length;
  const doneCount = getCompletedLessons().length;
  const progressLabel = `${doneCount}/${total}`;

  if (!paid || !unlocked) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-[hsl(var(--fg-muted))]">
        {!paid
          ? "Перенаправление к тарифам…"
          : "Перенаправление к урокам…"}
      </div>
    );
  }

  async function handleComplete() {
    if (status !== "idle" || getCompletedLessons().includes(lesson.id)) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 500));

    markLessonComplete(lesson.id);

    if (lesson.id === 4) {
      fireLesson4Confetti();
      const user = getUser();
      if (user && !wasCompletionEmailSent()) {
        try {
          const res = await fetch("/api/send-completion-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: user.name, email: user.email }),
          });
          if (res.ok) markCompletionEmailSent();
        } catch {
          /* письмо — best effort */
        }
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
