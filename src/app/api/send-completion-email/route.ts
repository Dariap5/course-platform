import { Resend } from "resend";
import { FROM_EMAIL } from "@/lib/lessons-data";

const calendly =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/dariapaivina/meet-with-me";

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return Response.json(
      { ok: false, error: "RESEND_API_KEY не задан" },
      { status: 500 },
    );
  }

  let body: { name?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Некорректный JSON" }, { status: 400 });
  }

  const rawName = String(body.name ?? "").trim() || "участник";
  const name = rawName
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  const email = String(body.email ?? "").trim();
  if (!email) {
    return Response.json({ ok: false, error: "Email обязателен" }, { status: 400 });
  }

  const resend = new Resend(key);

  const { error } = await resend.emails.send({
    from: `Курс <${FROM_EMAIL}>`,
    to: email,
    subject: "🎉 Ты прошёл курс! Следующий шаг...",
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">
          Поздравляю, ${name}! 🎉
        </h1>
        <p style="color: #737373; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
          Ты прошёл курс от начала до конца — это требует настоящей дисциплины и мотивации.
          Я рада, что ты здесь.
        </p>
        <p style="color: #0a0a0a; font-size: 15px; line-height: 1.6; margin-bottom: 32px;">
          Следующий шаг — давай созвонимся! Я хочу разобрать твои вопросы лично
          и помочь тебе двигаться дальше.
        </p>
        <a href="${calendly}"
           style="display: inline-block; background: linear-gradient(135deg, #3B3BF5, #818CF8);
                  color: white; text-decoration: none; padding: 12px 28px;
                  border-radius: 8px; font-size: 15px; font-weight: 500;">
          Записаться на созвон →
        </a>
        <p style="color: #a3a3a3; font-size: 13px; margin-top: 40px;">
          С уважением 💜
        </p>
      </div>
    `,
  });

  if (error) {
    return Response.json(
      { ok: false, error: error.message },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
