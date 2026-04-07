import type { Lesson } from "@/types";

export const COURSE_TITLE = "Точка сборки";

/** Портрет на экране поздравления и в данных курса */
export const AUTHOR_PHOTO = "/landing/photo-dasha-2.png";

export const AUTHOR_NAME = "Дарья";

/** Уточни позже — подставь свою должность/описание */
export const AUTHOR_TITLE = "Автор курса";

export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/dariapaivina/meet-with-me";

export const SUPPORT_URL =
  process.env.NEXT_PUBLIC_SUPPORT_URL ?? "https://t.me/daria_ya5";

export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "dariapaivina@gmail.com";

export const FROM_EMAIL =
  process.env.FROM_EMAIL ??
  process.env.RESEND_FROM_EMAIL ??
  "onboarding@resend.dev";

/** Замени videoUrl на свои ссылки (YouTube embed, Vimeo, MP4) когда будут готовы */
export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Введение в курс",
    description:
      "Знакомство с программой, целями и тем, что тебя ждёт дальше",
    duration: "15 мин",
    videoUrl: "",
    notionUrl: "https://www.notion.so",
    notionLabel: "Открыть материалы урока",
  },
  {
    id: 2,
    title: "Основы и практика",
    description: "Ключевые идеи модуля и первые шаги в работе с материалом",
    duration: "20 мин",
    videoUrl: "",
    notionUrl: "https://www.notion.so",
    notionLabel: "Открыть материалы урока",
  },
  {
    id: 3,
    title: "Углубление",
    description: "Разбираем нюансы и типичные вопросы",
    duration: "25 мин",
    videoUrl: "",
    notionUrl: "https://www.notion.so",
    notionLabel: "Открыть материалы урока",
  },
  {
    id: 4,
    title: "Финальный урок",
    description: "Итоги курса и что делать дальше",
    duration: "18 мин",
    videoUrl: "",
    notionUrl: "https://www.notion.so",
    notionLabel: "Открыть материалы урока",
  },
];

export function getLessonById(id: number): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
