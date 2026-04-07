import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.FROM_EMAIL ?? "onboarding@resend.dev";
const CALENDLY =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/dariapaivina/meet-with-me";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

function wrap(content: string) {
  return `
  <div style="font-family: -apple-system, 'Segoe UI', sans-serif; max-width: 560px;
              margin: 0 auto; padding: 40px 24px; color: #0a0a0a;">
    <div style="margin-bottom: 32px;">
      <span style="font-size: 16px; font-weight: 700; color: #3B3BF5;">Точка сборки</span>
    </div>
    ${content}
    <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #e5e5e5;
                font-size: 12px; color: #a3a3a3;">
      С теплом, Даша · Точка сборки
    </div>
  </div>`;
}

export async function sendWelcomeEmail({ to, name }: { to: string; name: string }) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Добро пожаловать в Точку сборки 👋",
    html: wrap(`
      <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 12px;">
        Привет, ${name}!
      </h1>
      <p style="font-size: 15px; line-height: 1.7; color: #404040; margin-bottom: 20px;">
        Ты зарегистрировалась в Точке сборки. Если у тебя есть код доступа к курсу —
        введи его в личном кабинете и уроки откроются сразу.
      </p>
      <a href="${APP_URL}/onboarding"
         style="display: inline-block; background: #3B3BF5; color: white;
                padding: 14px 28px; border-radius: 10px; text-decoration: none;
                font-weight: 600; font-size: 15px;">
        Перейти в кабинет →
      </a>
    `),
  });
}

export async function sendAccessGrantedEmail({
  to,
  name,
  plan,
}: {
  to: string;
  name: string;
  plan: string;
}) {
  const isCommunity = plan === "course_community";
  return resend.emails.send({
    from: FROM,
    to,
    subject: "🎉 Доступ к курсу открыт!",
    html: wrap(`
      <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 12px;">
        ${name}, доступ открыт!
      </h1>
      <p style="font-size: 15px; line-height: 1.7; color: #404040; margin-bottom: 8px;">
        Твой тариф: <strong>${isCommunity ? "Курс + Комьюнити" : "Мини-курс"}</strong>
      </p>
      <p style="font-size: 15px; line-height: 1.7; color: #404040; margin-bottom: 24px;">
        Все уроки уже ждут тебя в личном кабинете. Начинай в любое время —
        доступ бессрочный.
      </p>
      <a href="${APP_URL}/dashboard"
         style="display: inline-block; background: #3B3BF5; color: white;
                padding: 14px 28px; border-radius: 10px; text-decoration: none;
                font-weight: 600; font-size: 15px;">
        Начать первый урок →
      </a>
      ${
        isCommunity
          ? `
        <p style="margin-top: 24px; font-size: 14px; color: #737373;">
          Доступ в Комьюнити пришлём отдельным письмом в течение 24 часов.
        </p>`
          : ""
      }
    `),
  });
}

export async function sendCourseCompletionEmail({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  const result = await resend.emails.send({
    from: FROM,
    to,
    subject: "🏆 Ты прошла курс — поздравляю!",
    html: wrap(`
      <h1 style="font-size: 28px; font-weight: 700; margin-bottom: 12px;
                 background: linear-gradient(135deg, #3B3BF5, #818CF8);
                 -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        Поздравляю, ${name}!
      </h1>
      <p style="font-size: 15px; line-height: 1.7; color: #404040; margin-bottom: 20px;">
        Ты прошла курс целиком — это требует настоящей дисциплины.
        Система собрана, цели прописаны, инструменты под рукой.
      </p>
      <p style="font-size: 15px; line-height: 1.7; color: #404040; margin-bottom: 32px;">
        Следующий шаг — давай созвонимся. Разберём твои вопросы лично
        и найдём куда направить эту энергию дальше.
      </p>
      <a href="${CALENDLY}"
         style="display: inline-block; background: #3B3BF5; color: white;
                padding: 16px 32px; border-radius: 12px; text-decoration: none;
                font-weight: 700; font-size: 16px;">
        Записаться на созвон →
      </a>
    `),
  });

  if (result.error) {
    throw new Error(`Resend error: ${JSON.stringify(result.error)}`);
  }

  return result;
}
