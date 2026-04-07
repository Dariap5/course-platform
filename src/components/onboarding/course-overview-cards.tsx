"use client";

import { motion } from "framer-motion";
import { Clapperboard, BookOpen, MessageCircle, Trophy } from "lucide-react";

const cards = [
  {
    icon: Clapperboard,
    title: "Смотри по порядку",
    body: "Уроки открываются последовательно — так материал ложится лучше всего",
  },
  {
    icon: BookOpen,
    title: "Изучай материалы",
    body: "Под каждым видео есть описание и ссылки на ресурсы",
  },
  {
    icon: MessageCircle,
    title: "Задавай вопросы",
    body: "Кнопка поддержки всегда рядом — пиши, если что-то непонятно",
  },
  {
    icon: Trophy,
    title: "Получи результат",
    body: "После финала запишись на созвон — разберём твои вопросы лично",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
};

export function CourseOverviewCards() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={c.title}
            variants={item}
            className="cursor-default select-none rounded-[var(--r-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-5 transition-all duration-300 hover:border-transparent hover:gradient-border"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg text-white">
              <Icon className="h-4 w-4" strokeWidth={2} />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-[hsl(var(--fg))]">
              {c.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[hsl(var(--fg-muted))]">
              {c.body}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
