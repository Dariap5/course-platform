"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  getCheckoutPremiumUrl,
  getCheckoutStandardUrl,
  LANDING_PRODUCT_NAME,
} from "@/lib/landing-constants";
import { hasCourseAccess } from "@/lib/plan-access";
import { useSession } from "@/lib/auth/useSession";
import { SUPPORT_URL } from "@/lib/lessons-data";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TariffsPageContent() {
  const { user, loading } = useSession();
  const paid = hasCourseAccess(user);
  const standard = getCheckoutStandardUrl();
  const premium = getCheckoutPremiumUrl();

  function burst() {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.85 },
      colors: ["#3B3BF5", "#5B5BFF", "#818CF8"],
    });
  }

  if (loading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center text-sm text-[hsl(var(--fg-muted))]">
        Загрузка…
      </div>
    );
  }

  return (
    <div className="fade-up mx-auto max-w-4xl">
      <h1 className="text-xl font-medium text-[hsl(var(--fg))]">Тарифы</h1>
      <p className="mt-1 text-sm text-[hsl(var(--fg-muted))]">
        Оплата на карту — напиши в Telegram, после перевода я пришлю код доступа.
        Ввести код можно в разделе «Код доступа» или на странице активации.
      </p>

      {paid && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-[var(--r-lg)] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        >
          У тебя уже есть доступ. Переходи к{" "}
          <Link href="/dashboard" className="font-medium underline">
            урокам
          </Link>
          .
        </motion.div>
      )}

      <div className="pricing-cards-grid mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[var(--r-lg)] bg-gradient-to-br from-[hsl(var(--accent-from))] to-[hsl(var(--accent-to))] p-[2px] shadow-lg"
        >
          <div className="rounded-[calc(var(--r-lg)-1px)] bg-[hsl(var(--bg))] p-6">
            <span className="inline-block rounded-full gradient-bg px-3 py-1 text-xs font-semibold text-white">
              Старт
            </span>
            <h2 className="mt-4 text-lg font-semibold text-[hsl(var(--fg))]">
              «{LANDING_PRODUCT_NAME}»
            </h2>
            <p className="text-sm text-[hsl(var(--fg-muted))]">
              Мини-курс + материалы
            </p>
            <p className="mt-4">
              <span className="gradient-text font-sans text-4xl font-black">
                1 990 ₽
              </span>
              <span className="ml-2 text-sm text-[hsl(var(--fg-muted))] line-through">
                4 990 ₽
              </span>
            </p>
            <ul className="mt-6 space-y-2 text-sm text-[hsl(var(--fg-muted))]">
              {[
                "4 урока навсегда",
                "Notion и таблицы",
                "PDF и созвон",
              ].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-2">
              {standard ? (
                <Button variant="gradient" className="w-full" size="lg" asChild>
                  <a
                    href={standard}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Оплатить онлайн
                  </a>
                </Button>
              ) : (
                <>
                  <Button variant="gradient" className="w-full" size="lg" asChild>
                    <a
                      href={SUPPORT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Написать в Telegram (оплата)
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <Link href="/activate">У меня уже есть код</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-[var(--r-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--bg-secondary))] p-6"
        >
          <span className="inline-block rounded-full bg-[hsl(var(--bg-tertiary))] px-3 py-1 text-xs font-semibold text-[hsl(var(--fg-muted))]">
            С комьюнити
          </span>
          <h2 className="mt-4 text-lg font-semibold text-[hsl(var(--fg))]">
            Курс + поддержка
          </h2>
          <p className="text-sm text-[hsl(var(--fg-muted))]">
            Всё из базового тарифа и закрытый чат
          </p>
          <p className="mt-4">
            <span className="gradient-text font-sans text-4xl font-black">
              4 990 ₽
            </span>
          </p>
          <ul className="mt-6 space-y-2 text-sm text-[hsl(var(--fg-muted))]">
            {[
              "Всё из мини-курса",
              "Комьюнити и ответы",
              "Приоритет в поддержке",
            ].map((x) => (
              <li key={x} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-2">
            {premium ? (
              <Button
                variant="outline"
                className="w-full border-[hsl(var(--accent-from))]/40"
                size="lg"
                asChild
              >
                <a
                  href={premium}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Оплатить онлайн (премиум)
                </a>
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full border-[hsl(var(--accent-from))]/40"
                  size="lg"
                  asChild
                >
                  <a
                    href={SUPPORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={burst}
                  >
                    Написать в Telegram (оплата)
                  </a>
                </Button>
                <Button variant="outline" className="w-full" size="lg" asChild>
                  <Link href="/activate">У меня уже есть код</Link>
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <p className="mt-8 text-center text-xs text-[hsl(var(--fg-muted))]">
        Тестовая страница после «оплаты» без реального платёжного шлюза:{" "}
        <Link
          href="/pay/success"
          className="text-[hsl(var(--accent-text))] underline-offset-2 hover:underline"
        >
          /pay/success
        </Link>{" "}
        — доступ к урокам не открывает, нужен код из Telegram.
      </p>
    </div>
  );
}
