"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  AUTHOR_NAME,
  AUTHOR_PHOTO,
  AUTHOR_TITLE,
  CALENDLY_URL,
} from "@/lib/lessons-data";
import { Confetti } from "./confetti";

export function CompletionPageContent() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="relative flex min-h-[calc(100vh-52px)] flex-col items-center justify-center overflow-hidden px-4 py-12">
      <Confetti />

      <div
        className="completion-orb -right-24 -top-24 h-[min(600px,90vw)] w-[min(600px,90vw)] max-h-[600px] max-w-[600px]"
        style={{
          background: `hsl(var(--accent-from))`,
          opacity: 0.14,
        }}
      />
      <div
        className="completion-orb left-1/2 top-1/2 h-[min(480px,85vw)] w-[min(480px,85vw)] max-h-[480px] max-w-[480px] -translate-x-1/2 -translate-y-1/2 [animation:none]"
        style={{
          background: `hsl(var(--accent-mid))`,
          opacity: 0.1,
        }}
      />
      <div
        className="completion-orb -bottom-40 -left-32 h-[min(560px,92vw)] w-[min(560px,92vw)] max-h-[560px] max-w-[560px]"
        style={{
          background: `hsl(var(--accent-to))`,
          opacity: 0.12,
          animationDelay: "1.2s",
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-lg text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full gradient-bg px-3 py-1 text-xs font-medium text-white">
          <span>🏆</span> Курс пройден
        </div>

        <h1
          style={{ fontFamily: "var(--font-serif)" }}
          className="mb-4 text-4xl leading-tight text-[hsl(var(--fg))]"
        >
          <span className="gradient-text">Поздравляю!</span>
          <br />
          Ты сделала это ✨
        </h1>

        <p className="mb-8 text-sm leading-relaxed text-[hsl(var(--fg-muted))]">
          Ты прошла весь курс и это большой шаг. Теперь самое время поговорить —
          я готова ответить на все твои вопросы на личном созвоне.
        </p>

        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="relative h-20 w-20 overflow-hidden rounded-full gradient-border p-0.5">
            {imgOk ? (
              <Image
                src={AUTHOR_PHOTO}
                alt={AUTHOR_NAME}
                width={80}
                height={80}
                className="h-full w-full rounded-full object-cover bg-[hsl(var(--bg-secondary))]"
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[hsl(var(--bg-secondary))] text-2xl font-semibold gradient-text">
                {AUTHOR_NAME.slice(0, 1)}
              </div>
            )}
          </div>
          <p className="font-medium text-[hsl(var(--fg))]">{AUTHOR_NAME}</p>
          <p className="text-xs text-[hsl(var(--fg-muted))]">{AUTHOR_TITLE}</p>
        </div>

        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[var(--r-lg)] px-6 py-3 text-sm font-medium text-white gradient-bg transition-all hover:-translate-y-0.5 hover:opacity-90"
        >
          Записаться на созвон
          <ArrowRight size={16} />
        </a>

        <p className="mt-4 text-xs text-[hsl(var(--fg-subtle))]">
          или{" "}
          <Link
            href="/dashboard"
            className="gradient-text underline-offset-2 hover:underline"
          >
            вернуться к урокам
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
