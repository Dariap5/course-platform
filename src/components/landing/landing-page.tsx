"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LandingHeader } from "./landing-header";
import { LandingMobileSticky } from "./landing-mobile-sticky";
import { HeroPhotoCarousel } from "./hero-photo-carousel";
import { TypewriterWord } from "./typewriter-word";
import {
  getLandingTelegramCtaUrl,
  LANDING_PRODUCT_NAME,
  LANDING_TAGLINE,
} from "@/lib/landing-constants";
import {
  LANDING_CALL_PHOTO,
  LANDING_NOTION_PREVIEW,
  LANDING_PLANNER_PREVIEW,
  LANDING_VIDEO_PREVIEWS,
} from "@/lib/landing-media";
import { AUTHOR_NAME } from "@/lib/lessons-data";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

function fireMiniConfetti() {
  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.8 },
    colors: ["#3B3BF5", "#5B5BFF", "#818CF8", "#F59E0B"],
  });
}

function HeroFloatBadge({
  icon,
  title,
  sub,
  delaySec,
  className,
}: {
  icon: string;
  title: string;
  sub: string;
  delaySec: number;
  className: string;
}) {
  return (
    <div
      className={cn(
        "hero-float-badge float-card absolute z-[2] flex min-w-[155px] max-w-[min(100vw-3rem,260px)] items-center gap-2.5 rounded-[14px] bg-white px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.10)]",
        className,
      )}
      style={{ animationDelay: `${delaySec}s` }}
    >
      <span className="text-xl" aria-hidden>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="m-0 text-[13px] font-bold leading-tight text-[var(--lg-fg)]">
          {title}
        </p>
        <p className="m-0 text-[11px] leading-snug text-[var(--lg-fg3)]">{sub}</p>
      </div>
    </div>
  );
}

const faqItems = [
  {
    q: "Когда откроется доступ к урокам?",
    a: "Сразу после оплаты откроется доступ в личном кабинете. Доступ — навсегда, смотришь в своём темпе.",
  },
  {
    q: "Я полный новичок в планировании. Подойдёт?",
    a: "Как раз для тебя. Никакого опыта не нужно — каждый урок это конкретное действие прямо во время просмотра.",
  },
  {
    q: "Сколько времени нужно на курс?",
    a: "4 ролика по 13–15 минут. С паузами на заполнение инструментов — около 3–4 часов суммарно. Можно пройти за выходные.",
  },
  {
    q: "Я уже пробовала планировать. Почему это сработает?",
    a: "Здесь нет «просто веди ежеднивник». Разбираем ловушки целеполагания и строим систему под твой тип.",
  },
  {
    q: "Что если не понравится?",
    a: "Возвращаем деньги в течение 24 часов — без вопросов. Пиши в поддержку.",
  },
];

export function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const telegramCta = getLandingTelegramCtaUrl();

  return (
    <>
      <LandingHeader />
      <LandingMobileSticky />

      <section
        id="hero"
        className="hero relative flex min-h-[100svh] flex-col gap-16 overflow-hidden px-5 pb-28 pt-32 md:flex-row md:items-center md:justify-center md:gap-20 md:px-14 md:pb-24 md:pt-32"
      >
        <div
          className="landing-orb -right-24 -top-24 h-[min(500px,90vw)] w-[min(500px,90vw)] max-w-[500px]"
          style={{ background: "#3b3bf5", opacity: 0.12 }}
        />
        <div
          className="landing-orb -bottom-12 -left-24 h-[400px] w-[400px]"
          style={{
            background: "#818cf8",
            opacity: 0.1,
            animationDelay: "4s",
          }}
        />
        <div
          className="landing-orb right-[15%] top-1/2 h-[300px] w-[300px]"
          style={{
            background: "#f59e0b",
            opacity: 0.07,
            animationDelay: "2s",
          }}
        />

        <div className="hero-content relative z-10 mx-auto w-full max-w-[560px]">
          <motion.div
            className="hero-badge mb-8 inline-flex items-center gap-1.5 rounded-full border border-[rgba(59,59,245,0.22)] bg-[rgba(59,59,245,0.08)] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[var(--lg-from)] md:mb-6"
            {...fadeUp}
          >
            <span className="text-[10px]">✦</span>
            Мини-курс · 4 урока · Сразу после оплаты
          </motion.div>
          <motion.h1 className="hero-title" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }}>
            <span className="hero-title-top">
              <span className="shrink-0">Выйди</span>
              <span className="hero-title-type-wrap">
                <TypewriterWord />
              </span>
            </span>
            <span className="hero-title-trail">Собери себя</span>
          </motion.h1>
          <motion.p
            className="hero-sub"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
          >
            Мини-курс, который помогает перестать крутиться на месте — и наконец-то
            двигаться туда, куда хочешь
          </motion.p>
          <div className="hero-cta-wrap mt-9 flex flex-col gap-2.5 md:mt-8">
            <a
              href="#pricing"
              onClick={fireMiniConfetti}
              className="hero-cta landing-btn-gradient landing-btn-pulse relative z-0 inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl py-4 text-center font-landing-display text-base font-bold md:w-auto md:min-h-0 md:px-9"
            >
              Получить доступ к курсу →
            </a>
            <p className="text-xs text-[var(--lg-fg3)]">
              Доступ открывается сразу после оплаты
            </p>
            <Link
              href="/register"
              className="text-sm font-medium text-[var(--lg-from)] underline-offset-2 hover:underline"
            >
              Или сначала зарегистрируйся в кабинете — уроки откроются после оплаты
            </Link>
          </div>
          <div className="hero-social-mini mt-12 flex items-center gap-3 md:mt-8">
            <div className="flex">
              {["А", "М", "К"].map((l, i) => (
                <div
                  key={l}
                  className="-ml-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white first:ml-0"
                  style={{
                    background: ["#3B3BF5", "#5B5BFF", "#818CF8"][i],
                    zIndex: 3 - i,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
            <p className="text-[13px] text-[var(--lg-fg3)]">
              Уже проходят первые участницы
            </p>
          </div>
        </div>

        <div className="hero-photo-wrap relative z-10 mx-auto w-full max-w-[340px] shrink-0">
          <div className="relative mx-auto w-full max-w-[320px]">
            <div className="hero-photo-frame relative mx-auto aspect-[3/4] min-h-[300px] w-full overflow-hidden rounded-3xl border-2 border-[var(--lg-border)] bg-[var(--lg-bg)]">
              <HeroPhotoCarousel />
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent from-50% to-black/[0.15]"
                aria-hidden
              />
            </div>
            <HeroFloatBadge
              icon="🎯"
              title="3 живые цели"
              sub="вместо 20 мёртвых"
              delaySec={0}
              className="hero-float-badge--tr float-card-1 -right-4 -top-4"
            />
            <HeroFloatBadge
              icon="⚡"
              title="4 урока"
              sub="по 13–15 минут"
              delaySec={1.5}
              className="hero-float-badge--mr float-card-2 -right-3 top-[280px]"
            />
            <HeroFloatBadge
              icon="🗂️"
              title="Notion + Таблицы"
              sub="уже готовы для тебя"
              delaySec={3}
              className="hero-float-badge--bl float-card-3 -bottom-4 -left-6"
            />
          </div>
        </div>
      </section>

      <section className="quotes-section bg-[var(--lg-bg)] px-5 py-20 md:px-8">
        <div className="quotes-inner mx-auto max-w-[1100px]">
          <p className="mb-9 text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--lg-fg3)]">
            Что говорят те, кто уже прошёл
          </p>
          <div className="quotes-grid grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                text: "«Наконец-то почувствовала, что цели — это план, а не список мечт. За 4 ролика сделала больше, чем за год мотивационных книг.»",
                name: "Анастасия",
                role: "менеджер, 27 лет",
                grad: "linear-gradient(135deg,#3B3BF5,#818CF8)",
                a: "А",
              },
              {
                text: "«Ролик про лень — то, что нужно было услышать давно. Теперь понимаю, почему „просто сделай“ не работало.»",
                name: "Мария",
                role: "фрилансер, 24 года",
                grad: "linear-gradient(135deg,#F59E0B,#EF4444)",
                a: "М",
              },
              {
                text: "«Notion-шаблон — огонь. За 40 минут настроила базу, которую откладывала полгода.»",
                name: "Катерина",
                role: "студентка, 21 год",
                grad: "linear-gradient(135deg,#6366F1,#3B3BF5)",
                a: "К",
              },
            ].map((q, i) => (
              <motion.div
                key={i}
                className="quote-card landing-glass rounded-[20px] p-6"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              >
                <p className="quote-text mb-5 text-[15px] italic leading-relaxed text-[var(--lg-fg2)]">
                  {q.text}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: q.grad }}
                  >
                    {q.a}
                  </div>
                  <div>
                    <strong className="block text-sm text-[var(--lg-fg)]">
                      {q.name}
                    </strong>
                    <small className="text-xs text-[var(--lg-fg3)]">{q.role}</small>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="lessons-section relative overflow-hidden px-5 py-24 md:px-8">
        <div
          className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full opacity-[0.04] blur-[60px]"
          style={{
            background: "linear-gradient(135deg, var(--lg-from), var(--lg-to))",
          }}
        />
        <div className="section-inner relative z-10 mx-auto max-w-[1100px]">
          <motion.p
            className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--lg-from)]"
            {...fadeUp}
          >
            Программа
          </motion.p>
          <motion.h2
            className="section-title font-landing-display text-[clamp(1.65rem,4vw,2.65rem)] font-black leading-tight tracking-tight text-[var(--lg-fg)]"
            {...fadeUp}
          >
            4 коротких,{" "}
            <span className="landing-gradient-text">мясных ролика</span>
            <br />— никакой воды
          </motion.h2>
          <motion.p
            className="section-sub mb-12 mt-4 max-w-[500px] text-base leading-relaxed text-[var(--lg-fg2)]"
            {...fadeUp}
          >
            Каждый урок — инструмент, который применяешь прямо во время просмотра
          </motion.p>
          <div className="lessons-grid grid grid-cols-1 gap-5 md:grid-cols-2">
            {lessonCards.map((c, i) => (
              <motion.div
                key={c.t}
                className={`lesson-card rounded-[20px] border border-[var(--lg-border)] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1.5px_var(--lg-from),0_16px_40px_rgba(59,59,245,0.12)] ${c.bonus ? "border-[rgba(59,59,245,0.22)] bg-gradient-to-br from-[rgba(59,59,245,0.06)] to-[rgba(129,140,248,0.06)]" : "bg-white"}`}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              >
                <div className="lesson-num font-landing-display text-4xl font-black leading-none">
                  <span className="landing-gradient-text">{c.num}</span>
                </div>
                <span
                  className={`mt-2 inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${c.bonus ? "border-[rgba(59,59,245,0.22)] bg-[rgba(59,59,245,0.08)] text-[var(--lg-from)]" : "border-[var(--lg-border)] bg-[var(--lg-bg)] text-[var(--lg-fg3)]"}`}
                >
                  {c.badge}
                </span>
                <h3 className="lesson-title font-landing-display mt-4 text-[17px] font-bold leading-snug text-[var(--lg-fg)]">
                  {c.t}
                </h3>
                <p className="lesson-desc mt-2 text-sm leading-relaxed text-[var(--lg-fg2)]">
                  {c.d}
                </p>
                <ul className="lesson-points mt-4 flex flex-col gap-1.5">
                  {c.points.map((p) => (
                    <li
                      key={p}
                      className="relative pl-[18px] text-[13px] leading-snug text-[var(--lg-fg2)] before:absolute before:left-0 before:font-bold before:text-[var(--lg-from)] before:content-['✓']"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="lesson-thumb relative mt-5 aspect-video min-h-[200px] w-full overflow-hidden rounded-[12px] border border-[var(--lg-border)] bg-[var(--lg-bg)] sm:min-h-[220px] md:min-h-[240px]">
                  <Image
                    src={c.preview}
                    alt={`Превью: ${c.t}`}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 100vw, 520px"
                  />
                  <span className="pointer-events-none absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-sm text-white backdrop-blur-sm">
                    ▶
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <OutcomesSection />
      <ResultSection />
      <AfterSection />
      <PricingSection telegramUrl={telegramCta} onConfetti={fireMiniConfetti} />
      <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <FinalCta telegramUrl={telegramCta} onConfetti={fireMiniConfetti} />
      <Footer />
    </>
  );
}

const lessonCards = [
  {
    num: "01",
    badge: "13–15 мин",
    t: "Аудит амбиций и Ясность",
    d: "Перестань хотеть «всё и сразу». Три живые цели и таблица — прямо во время просмотра.",
    points: [
      "Почему цели не работали (3 ловушки)",
      "Образ жизни в 40 лет → цели сегодня",
      "Топ-3 цели года с алгоритмом",
    ],
    bonus: false,
    preview: LANDING_VIDEO_PREVIEWS[0],
  },
  {
    num: "02",
    badge: "12–14 мин",
    t: "Психология «лени»: найди свой тип",
    d: "Лень — сигнал. Разбираемся какой именно и что делать без насилия над собой.",
    points: [
      "Тип 1: истощение",
      "Тип 2: отвлечение — 3 протокола",
      "Диагностика в ролике",
    ],
    bonus: false,
    preview: LANDING_VIDEO_PREVIEWS[1],
  },
  {
    num: "03",
    badge: "13–15 мин",
    t: "Твой план на месяц и неделю",
    d: "Два планера прямо во время ролика: трекер привычек и недельный планер под твои цели.",
    points: [
      "Месячный трекер с аналитикой",
      "Одна главная задача в день",
      "Как не бросить через 2 недели",
    ],
    bonus: false,
    preview: LANDING_VIDEO_PREVIEWS[2],
  },
  {
    num: "04",
    badge: "Бонус",
    t: "Что тебя ждёт дальше — Клуб",
    d: "Система собрана. Сообщество, треки и что открывается после курса.",
    points: [
      "Карьера, бизнес, деньги, эффективность",
      "Диагностика точки роста",
      "Закрытый созвон — главный бонус",
    ],
    bonus: true,
    preview: LANDING_VIDEO_PREVIEWS[3],
  },
];

function OutcomesSection() {
  return (
    <section className="outcomes-section bg-[var(--lg-bg)] px-5 py-24 md:px-8">
      <div className="section-inner mx-auto max-w-[1100px]">
        <motion.p
          className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--lg-from)]"
          {...fadeUp}
        >
          Артефакты
        </motion.p>
        <motion.h2
          className="section-title font-landing-display text-[clamp(1.65rem,4vw,2.65rem)] font-black leading-tight text-[var(--lg-fg)]"
          {...fadeUp}
        >
          Выходишь не с теорией.
          <br />
          <span className="landing-gradient-text">А с готовыми инструментами.</span>
        </motion.h2>
        <div className="artifacts-grid mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <motion.a
            href="https://tranquil-wedelia-414.notion.site/1-33bec0c8ebbb80f7b735f5993ca49fb6"
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-[20px] border border-[var(--lg-border)] bg-white transition hover:-translate-y-1 hover:shadow-xl"
            {...fadeUp}
          >
            <div className="artifact-img relative h-[200px] w-full bg-[var(--lg-bg)]">
              <Image
                src={LANDING_NOTION_PREVIEW}
                alt="База знаний в Notion"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 520px"
              />
            </div>
            <div className="p-6">
              <h3 className="font-landing-display text-base font-bold text-[var(--lg-fg)]">
                База знаний в Notion
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--lg-fg2)]">
                Цели, горизонты, промпты для ИИ — настраиваешь один раз.
              </p>
              <span className="mt-3 inline-block text-[13px] font-semibold text-[var(--lg-from)] group-hover:underline">
                Посмотреть шаблон →
              </span>
            </div>
          </motion.a>
          <motion.div
            className="overflow-hidden rounded-[20px] border border-[var(--lg-border)] bg-white"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
          >
            <div className="artifact-img relative h-[200px] w-full bg-[var(--lg-bg)]">
              <Image
                src={LANDING_PLANNER_PREVIEW}
                alt="Планеры в Google Таблицах"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 520px"
              />
            </div>
            <div className="p-6">
              <h3 className="font-landing-display text-base font-bold text-[var(--lg-fg)]">
                Планеры в Google Таблицах
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--lg-fg2)]">
                Трекер привычек + недельный планер. 2 минуты в день.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="artifact-card-small flex flex-col items-center gap-6 rounded-[20px] border border-[var(--lg-border)] bg-white p-8 md:col-span-2 md:flex-row"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.16 }}
          >
            <span className="text-5xl">🤖</span>
            <div>
              <h3 className="font-landing-display text-lg font-bold text-[var(--lg-fg)]">
                PDF «Нейросети — твой личный ассистент»
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--lg-fg2)]">
                Как использовать ChatGPT и Claude не для деградации, а чтобы они
                структурировали мысли, планировали день и делали тебя продуктивнее.
                Промпт-библиотека внутри.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ResultSection() {
  return (
    <section className="result-section px-5 py-24 md:px-8">
      <div className="result-inner mx-auto max-w-[800px]">
        <motion.p
          className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--lg-from)]"
          {...fadeUp}
        >
          На выходе
        </motion.p>
        <motion.h2
          className="section-title font-landing-display text-[clamp(1.65rem,4vw,2.65rem)] font-black leading-tight text-[var(--lg-fg)]"
          {...fadeUp}
        >
          После курса у тебя будет{" "}
          <span className="landing-gradient-text">3 вида порядка</span>
        </motion.h2>
        <div className="mt-10 overflow-hidden rounded-[20px] border border-[var(--lg-border)]">
          {[
            {
              n: "01",
              t: "Порядок в голове",
              p: "Три живые цели. Образ будущего зафиксирован. Ты знаешь, куда идёшь.",
            },
            {
              n: "02",
              t: "Порядок в системе",
              p: "Notion и планеры связаны с целями — не висят в воздухе.",
            },
            {
              n: "03",
              t: "Порядок с нейросетями",
              p: "Промпты и сценарии: ИИ структурирует мысли и план — без бесцельного скролла.",
            },
          ].map((r, i) => (
            <div key={r.n}>
              {i > 0 && <div className="h-px bg-[var(--lg-border)]" />}
              <div className="result-item flex gap-6 p-8 transition-colors hover:bg-[var(--lg-bg)]">
                <span className="result-num font-landing-display shrink-0 bg-gradient-to-br from-[var(--lg-from)] to-[var(--lg-to)] bg-clip-text py-0.5 text-[28px] font-black leading-none text-transparent sm:min-w-[3.75rem] min-w-[3.25rem]">
                  {r.n}
                </span>
                <div className="result-content min-w-0 flex-1">
                  <h3 className="font-landing-display text-[17px] font-bold text-[var(--lg-fg)]">
                    {r.t}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--lg-fg2)]">
                    {r.p}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <blockquote className="trigger-quote font-landing-display mt-10 py-5 text-center text-[clamp(1.15rem,3vw,1.75rem)] font-bold leading-snug">
          «Ты не ленивая, у тебя просто не было системы»
        </blockquote>
      </div>
    </section>
  );
}

function AfterSection() {
  return (
    <section id="after" className="after-section relative overflow-hidden bg-[#0a0a0a] px-5 py-24 text-white md:px-8">
      <div
        className="pointer-events-none absolute -top-[150px] right-[-100px] h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,59,245,0.3), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[-80px] left-[-80px] h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.2), transparent 70%)",
        }}
      />

      <div className="after-inner">
        <motion.div
          style={{
            color: "rgba(129,140,248,0.8)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
          {...fadeUp}
        >
          Бонусный урок + Что дальше
        </motion.div>

        <motion.h2
          style={{
            color: "white",
            fontSize: "clamp(26px, 4vw, 42px)",
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: "16px",
            letterSpacing: "-0.02em",
          }}
          className="font-landing-display"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
        >
          После курса ты попадаешь
          <br />
          <span className="landing-gradient-text [text-fill-color:transparent]">
            в Комьюнити
          </span>
        </motion.h2>

        <motion.p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "16px",
            lineHeight: 1.7,
            maxWidth: "600px",
            marginBottom: "52px",
          }}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
        >
          Комьюнити — закрытое пространство для людей, которые хотят больше:
          больше зарабатывать, расти в карьере или запустить своё дело. Здесь не
          просто контент — живое сообщество, треки развития и поддержка тех, кто
          идёт тем же путём.
        </motion.p>

        <div
          className="club-grid mb-[52px] grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {(
            [
              {
                icon: "🎯",
                title: "Диагностика роста",
                text: "Тест за 10 минут покажет твою зону развития прямо сейчас: карьера, бизнес, деньги или личная эффективность. Больше не нужно гадать — куда идти становится видно.",
              },
              {
                icon: "🚀",
                title: "Треки развития",
                text: "Карьера, свой проект, первые деньги онлайн — каждый трек это конкретные шаги, а не общие советы. Ты выбираешь направление и двигаешься, а не тонешь в теории.",
              },
              {
                icon: "👥",
                title: "Живое сообщество",
                text: "Люди, которые тоже собирают себя — делятся результатами, поддерживают в сложные дни, отмечают победы вместе. Одной идти сложнее.",
              },
              {
                icon: "💬",
                title: "Эфиры с Дашей",
                text: "Регулярные живые встречи: разборы реальных ситуаций, ответы на вопросы, совместные планирования. Живые — не записи, можно задать свой вопрос.",
              },
            ] as const
          ).map((card, i) => (
            <motion.div
              key={card.title}
              className="shutter-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div className="shutter-front">
                <span className="shutter-icon">{card.icon}</span>
                <h3 className="shutter-title">{card.title}</h3>
              </div>
              <div className="shutter-back" data-icon={card.icon}>
                <p className="shutter-text">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.1)",
            marginBottom: "48px",
          }}
        />

        <motion.div
          className="after-call-block"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
        >
          <div className="after-call-photo relative overflow-hidden rounded-full ring-2 ring-white/25">
            <Image
              src={LANDING_CALL_PHOTO}
              alt="Личный созвон с Дашей"
              fill
              className="object-cover object-[center_25%]"
              sizes="96px"
            />
          </div>
          <div className="after-call-text">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                fontWeight: 700,
                color: "#818CF8",
                background: "rgba(59,59,245,0.15)",
                border: "1px solid rgba(59,59,245,0.3)",
                padding: "4px 12px",
                borderRadius: "999px",
                marginBottom: "12px",
              }}
            >
              🎁 Включено в стоимость курса
            </div>
            <h3
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "10px",
              }}
              className="font-landing-display"
            >
              Личный созвон с Дашей
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "14px",
                lineHeight: 1.7,
                marginBottom: "20px",
              }}
            >
              После прохождения курса ты получаешь приглашение на личный созвон.
              Разберём твои цели, твои препятствия — и ты уйдёшь с конкретным
              следующим шагом, а не с ощущением «понравилось, но непонятно что
              делать».
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "13px",
                fontStyle: "italic",
              }}
            >
              «Именно такие созвоны дают тот самый первый импульс, который
              превращает план в движение» — Даша
            </p>
          </div>
        </motion.div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <motion.a
            href="#pricing"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #3B3BF5, #818CF8)",
              color: "white",
              padding: "14px 32px",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 600,
              boxShadow: "0 8px 32px rgba(59,59,245,0.4)",
              transition: "all 0.2s ease",
            }}
            {...fadeUp}
          >
            Начать — и попасть в Комьюнити
            <span>→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

function PricingSection({
  telegramUrl,
  onConfetti,
}: {
  telegramUrl: string;
  onConfetti: () => void;
}) {
  return (
    <section id="pricing" className="pricing-section bg-[var(--lg-bg)] px-5 py-24 md:px-8">
      <div className="pricing-inner mx-auto max-w-[920px]">
        <motion.p
          className="mb-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-[var(--lg-from)]"
          {...fadeUp}
        >
          Тарифы
        </motion.p>
        <motion.h2
          className="section-title font-landing-display text-center text-[clamp(1.65rem,4vw,2.65rem)] font-black leading-tight text-[var(--lg-fg)]"
          {...fadeUp}
        >
          Выбери формат.
          <br />
          <span className="landing-gradient-text">Всё включено.</span>
        </motion.h2>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            className="pricing-card rounded-[20px] border border-[var(--lg-border)] bg-white p-8 shadow-sm"
            {...fadeUp}
          >
            <span className="inline-block rounded-full border border-[var(--lg-border)] bg-[var(--lg-bg)] px-4 py-1.5 text-xs font-bold text-[var(--lg-fg3)]">
              Мини-курс
            </span>
            <h3 className="font-landing-display mt-6 text-2xl font-black text-[var(--lg-fg)]">
              Мини-курс
            </h3>
            <p className="text-sm text-[var(--lg-fg2)]">
              Курс + все артефакты + созвон с Дашей
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-landing-display text-lg font-bold text-[var(--lg-fg)]">₽</span>
              <span className="price-amount font-landing-display text-5xl font-black tracking-tight text-[var(--lg-fg)]">
                1 990
              </span>
            </div>
            <ul className="pricing-includes mt-8 flex flex-col gap-3 border-t border-[var(--lg-border)] pt-6">
              {[
                "4 видеоурока (доступ навсегда)",
                "Notion + Google Таблицы + PDF",
                "Личный созвон с Дашей",
              ].map((x) => (
                <li key={x} className="flex items-center gap-2.5 text-sm text-[var(--lg-fg2)]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--lg-from)] to-[var(--lg-to)] text-[10px] font-bold text-white">
                    ✓
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onConfetti}
              className="pricing-cta landing-btn-gradient landing-btn-pulse relative z-0 mt-8 block w-full rounded-2xl py-4 text-center font-landing-display text-sm font-semibold"
            >
              Написать Даше
            </a>
          </motion.div>
          <motion.div
            className="relative"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
          >
            <div className="absolute left-1/2 top-[-14px] z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#3B3BF5] shadow-[0_2px_12px_rgba(59,59,245,0.3)]">
              Выгоднее всего
            </div>
            <div className="pricing-pro-shell pricing-card-featured">
              <div className="pricing-card rounded-[20px] bg-white p-8">
                <div className="pricing-header flex flex-col gap-3">
                  <span className="inline-block w-fit rounded-full bg-gradient-to-r from-[var(--lg-from)] to-[var(--lg-to)] px-4 py-1.5 text-xs font-bold text-white">
                    Курс + Комьюнити
                  </span>
                  <h3 className="font-landing-display text-2xl font-black text-[var(--lg-fg)]">
                    Курс + Комьюнити
                  </h3>
                </div>
                <p className="mt-3 text-sm text-[var(--lg-fg2)]">
                  Курс, артефакты, созвон + первый месяц в Комьюнити
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-landing-display text-lg font-bold text-[var(--lg-fg)]">₽</span>
                  <span className="price-amount price-shimmer font-landing-display text-[44px] font-black tracking-tight">
                    3 990
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[var(--lg-fg3)] line-through">
                  Комьюнити отдельно — 2 400 ₽/мес
                </p>
                <ul className="pricing-includes mt-8 flex flex-col gap-3 border-t border-[var(--lg-border)] pt-6">
                  {[
                    "Всё из тарифа «Мини-курс»",
                    "Первый месяц в Комьюнити",
                    "Приоритет на созвоне",
                  ].map((x) => (
                    <li key={x} className="flex items-center gap-2.5 text-sm text-[var(--lg-fg2)]">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--lg-from)] to-[var(--lg-to)] text-[10px] font-bold text-white">
                        ✓
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onConfetti}
                  className="pricing-cta pricing-pro-cta mt-8 font-landing-display text-sm font-semibold"
                >
                  Написать Даше
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        <p
          className="text-center text-[13px] text-[var(--lg-fg3)]"
          style={{ marginTop: "24px", lineHeight: 1.6 }}
        >
          После сообщения Даша пришлёт реквизиты для оплаты и откроет доступ в течение
          15 минут 🙌
        </p>
        <div className="mx-auto mt-6 flex max-w-lg items-start gap-3 rounded-2xl border border-[var(--lg-border)] bg-white p-4">
          <span className="text-xl">🛡️</span>
          <p className="text-[13px] leading-relaxed text-[var(--lg-fg2)]">
            Не подошло? Вернём деньги в течение 24 часов — без вопросов.
          </p>
        </div>
      </div>
    </section>
  );
}

function FaqSection({
  openFaq,
  setOpenFaq,
}: {
  openFaq: number | null;
  setOpenFaq: (i: number | null) => void;
}) {
  return (
    <section className="faq-section px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[700px]">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--lg-from)]">
          Вопросы
        </p>
        <h2 className="section-title font-landing-display text-3xl font-black text-[var(--lg-fg)]">
          Часто спрашивают
        </h2>
        <div className="faq-list mt-10 border-t border-[var(--lg-border)]">
          {faqItems.map((item, i) => {
            const open = openFaq === i;
            return (
              <div key={i} className="border-b border-[var(--lg-border)]">
                <button
                  type="button"
                  className="faq-q flex min-h-[48px] w-full items-center justify-between gap-4 py-4 text-left font-landing-display text-[15px] font-semibold text-[var(--lg-fg)] md:min-h-0 md:py-5"
                  onClick={() => setOpenFaq(open ? null : i)}
                >
                  {item.q}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[var(--lg-fg3)] transition-transform ${open ? "rotate-180 text-[var(--lg-from)]" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="faq-a pb-5 pl-0 pr-8 text-sm leading-relaxed text-[var(--lg-fg2)]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta({
  telegramUrl,
  onConfetti,
}: {
  telegramUrl: string;
  onConfetti: () => void;
}) {
  return (
    <section className="final-cta-section relative overflow-hidden bg-[var(--lg-bg)] px-5 py-28 text-center md:px-8">
      <div
        className="landing-orb left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2"
        style={{ background: "#3b3bf5", opacity: 0.14 }}
      />
      <div className="relative z-10 mx-auto max-w-[600px]">
        <h2 className="final-cta-title font-landing-display text-[clamp(1.75rem,5vw,3.25rem)] font-black leading-tight text-[var(--lg-fg)]">
          Начни собирать себя
          <br />
          <span className="landing-gradient-text">прямо сейчас</span>
        </h2>
        <p className="mt-4 text-lg text-[var(--lg-fg2)]">
          Напиши в Telegram — Даша ответит с реквизитами и откроет доступ.
        </p>
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onConfetti}
          className="final-cta-btn landing-btn-gradient landing-btn-pulse relative z-0 mt-10 inline-block rounded-2xl px-12 py-5 font-landing-display text-lg font-extrabold"
        >
          Написать Даше →
        </a>
        <p className="mt-5 text-[13px] text-[var(--lg-fg3)]">
          От 1 990 ₽ · Доступ навсегда · Гарантия 24ч
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--lg-border)] bg-white px-5 py-10 text-center text-sm text-[var(--lg-fg3)] md:px-8">
      <p className="font-landing-display font-semibold text-[var(--lg-fg)]">
        {LANDING_PRODUCT_NAME}
      </p>
      <p className="mt-1">{LANDING_TAGLINE}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <Link href="/register" className="hover:text-[var(--lg-from)]">
          Кабинет
        </Link>
        <Link href="/login" className="hover:text-[var(--lg-from)]">
          Войти
        </Link>
        <a href="#pricing" className="hover:text-[var(--lg-from)]">
          Тарифы
        </a>
      </div>
      <p className="mt-6 text-xs">© {new Date().getFullYear()} {AUTHOR_NAME}</p>
    </footer>
  );
}
