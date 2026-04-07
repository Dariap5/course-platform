"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  getCheckoutPremiumUrl,
  getCheckoutStandardUrl,
  LANDING_PRODUCT_NAME,
} from "@/lib/landing-constants";
import { hasPurchased } from "@/lib/purchase-storage";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TariffsPageContent() {
  const [paid] = useState(() => hasPurchased());
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

  return (
    <div className="fade-up mx-auto max-w-4xl">
      <h1 className="text-xl font-medium text-[hsl(var(--fg))]">Тарифы</h1>
      <p className="mt-1 text-sm text-[hsl(var(--fg-muted))]">
        Оформи доступ — уроки откроются в том же кабинете сразу после оплаты.
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
                  <span className="flex h-5 w-5 items-center justify-center rounded-full gradient-bg text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <a
              href={standard}
              onClick={burst}
              className="mt-6 block w-full"
            >
              <Button variant="gradient" className="w-full" size="lg">
                Оплатить 1 990 ₽
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="rounded-[var(--r-lg)] border-2 border-amber-200/80 bg-[hsl(var(--bg))] p-6 shadow-md"
        >
          <span className="inline-block rounded-full bg-gradient-to-r from-amber-500 to-red-500 px-3 py-1 text-xs font-semibold text-white">
            С клубом
          </span>
          <h2 className="mt-4 text-lg font-semibold text-[hsl(var(--fg))]">
            Курс + месяц Клуба
          </h2>
          <p className="text-sm text-[hsl(var(--fg-muted))]">
            Максимум поддержки
          </p>
          <p className="mt-4 text-4xl font-black text-[hsl(var(--fg))]">
            4 990 ₽
          </p>
          <ul className="mt-6 space-y-2 text-sm text-[hsl(var(--fg-muted))]">
            {[
              "Всё из тарифа «Старт»",
              "Клуб 30 дней",
              "Приоритет на созвоне",
            ].map((x) => (
              <li key={x} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-red-500 text-[10px] text-white">
                  ✓
                </span>
                {x}
              </li>
            ))}
          </ul>
          <a href={premium} onClick={burst} className="mt-6 block w-full">
            <Button
              className="w-full bg-gradient-to-r from-amber-500 to-red-500 text-white hover:opacity-95"
              size="lg"
            >
              Оплатить 4 990 ₽
            </Button>
          </a>
        </motion.div>
      </div>

      <p className="mt-8 text-center text-xs text-[hsl(var(--fg-muted))]">
        Нет платёжки? Ссылка по умолчанию ведёт на{" "}
        <Link href="/pay/success" className="underline">
          демо-подтверждение
        </Link>
        . Укажи{" "}
        <code className="rounded bg-[hsl(var(--bg-tertiary))] px-1">
          NEXT_PUBLIC_CHECKOUT_*_URL
        </code>{" "}
        в .env.local
      </p>
      <div className="mt-6 flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/">На лендинг</Link>
        </Button>
      </div>
    </div>
  );
}
