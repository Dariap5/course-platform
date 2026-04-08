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

export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Аудит амбиций и Ясность",
    description:
      "Перестань хотеть «всё и сразу». Выбери три живые цели вместо двадцати мёртвых. Заполнишь таблицу прямо во время просмотра.",
    duration: "13–15 мин",
    videoUrl: "https://kinescope.io/qQVq59fvksnJ19YeCYrHpT",
    notionUrl:
      "https://tranquil-wedelia-414.notion.site/1-1-33cec0c8ebbb807d98fdf7465a1ed621?source=copy_link",
    notionLabel: "Открыть материалы урока",
  },
  {
    id: 2,
    title: "Психология «лени»: найди свой тип",
    description:
      "Лень — это не характер, это сигнал. Разбираемся какой именно — и что с этим делать без насилия над собой.",
    duration: "12–14 мин",
    videoUrl: "https://kinescope.io/wCcx1Sf3GMfekEuRFhZjKi",
    notionUrl:
      "https://tranquil-wedelia-414.notion.site/1-33cec0c8ebbb8003b51dd29bc73cbda8?source=copy_link",
    notionLabel: "Открыть материалы урока",
  },
  {
    id: 3,
    title: "Твой план на месяц и неделю",
    description:
      "Настраиваем два планера прямо во время ролика. Трекер привычек и недельный планер — связанные с твоими целями.",
    duration: "13–15 мин",
    videoUrl: "https://kinescope.io/8GWoYpDuy7XAZgQy8g3Hut",
    notionUrl:
      "https://tranquil-wedelia-414.notion.site/1-33bec0c8ebbb8009a4c4f2c5077791e8?source=copy_link",
    notionLabel: "Открыть материалы урока",
  },
  {
    id: 4,
    title: "Что тебя ждёт дальше — Клуб",
    description:
      "Система собрана. Куда направить эту энергию? Знакомство с сообществом, треками и тем, что открывается после курса.",
    duration: "8–10 мин",
    videoUrl: "https://kinescope.io/w1scHbshk1uwvn7FFmCf85",
    notionUrl:
      "https://tranquil-wedelia-414.notion.site/1-78dec0c8ebbb8351b1928180cefb20d0?source=copy_link",
    notionLabel: "Открыть материалы урока",
  },
];

export function getLessonById(id: number): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
