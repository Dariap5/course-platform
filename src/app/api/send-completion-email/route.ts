import { sendCourseCompletionEmail } from "@/lib/email/templates";

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

  try {
    await sendCourseCompletionEmail({
      to: email,
      name,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Ошибка отправки";
    return Response.json({ ok: false, error: message }, { status: 502 });
  }

  return Response.json({ ok: true });
}
