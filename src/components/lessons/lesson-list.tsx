"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { LESSONS } from "@/lib/lessons-data";
import {
  getCompletedLessons,
  isLessonUnlocked,
} from "@/lib/progress-storage";
import { hasPurchased } from "@/lib/purchase-storage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function LessonList({ userName }: { userName: string }) {
  const [completed] = useState(() => getCompletedLessons());
  const [paid] = useState(() => hasPurchased());

  const nextId =
    LESSONS.find((l) => !completed.includes(l.id))?.id ?? LESSONS.length + 1;

  return (
    <div className="fade-up mx-auto max-w-4xl">
      <h1 className="text-xl font-medium text-[hsl(var(--fg))]">
        Привет, {userName} 👋
      </h1>
      <p className="mt-1 text-sm text-[hsl(var(--fg-muted))]">
        {paid
          ? "Продолжай там, где остановился"
          : "Ты видишь программу целиком — открой доступ, чтобы начать первый урок"}
      </p>

      {!paid && (
        <div className="mt-6 flex flex-col gap-3 rounded-[var(--r-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--bg-secondary))] p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[hsl(var(--fg-muted))]">
            Все уроки ниже доступны после оплаты. Разблокируются по одному —
            так проще дойти до конца.
          </p>
          <Button variant="gradient" asChild className="shrink-0">
            <Link href="/tariffs">Выбрать тариф</Link>
          </Button>
        </div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {LESSONS.map((lesson) => {
          const unlocked = paid && isLessonUnlocked(lesson.id);
          const done = completed.includes(lesson.id);
          const current =
            paid && lesson.id === nextId && !done && unlocked;

          const inner = (
            <>
              <div className="flex items-start justify-between gap-2">
                {unlocked ? (
                  <span className="text-3xl font-black gradient-text">
                    {String(lesson.id).padStart(2, "0")}
                  </span>
                ) : (
                  <Lock
                    className="mt-1 h-4 w-4 gradient-text"
                    strokeWidth={2.5}
                  />
                )}
                {done ? (
                  <Badge variant="gradient">Пройден</Badge>
                ) : unlocked ? (
                  <Badge variant="outline">Доступен</Badge>
                ) : (
                  <Badge variant="muted">
                    {!paid ? "Нужна оплата" : "Заблокирован"}
                  </Badge>
                )}
              </div>
              {current && (
                <span className="absolute right-4 top-5 h-2 w-2 rounded-full gradient-bg animate-pulse" />
              )}
              <h2 className="mt-3 text-base font-semibold text-[hsl(var(--fg))]">
                {lesson.title}
              </h2>
              <p className="mt-1 line-clamp-3 text-sm text-[hsl(var(--fg-muted))]">
                {lesson.description}
              </p>
              <p className="mt-2 flex items-center gap-1 text-xs text-[hsl(var(--fg-muted))]">
                <Clock className="h-3 w-3" />
                {lesson.duration}
              </p>
            </>
          );

          const cardClass = cn(
            "group relative block overflow-hidden rounded-[var(--r-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-5 transition-all duration-300",
            unlocked &&
              "cursor-pointer hover:-translate-y-0.5 hover:border-transparent hover:gradient-border",
            !unlocked &&
              "cursor-pointer opacity-[0.92] hover:border-[hsl(var(--accent-from))]/35 hover:opacity-100",
            current && "gradient-border",
          );

          return (
            <motion.div key={lesson.id} variants={item}>
              {unlocked ? (
                <Link href={`/lesson/${lesson.id}`} className={cardClass}>
                  {inner}
                </Link>
              ) : (
                <Link href="/tariffs" className={cardClass}>
                  {inner}
                </Link>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
