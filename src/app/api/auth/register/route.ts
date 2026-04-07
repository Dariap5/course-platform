import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendWelcomeEmail } from "@/lib/email/templates";

export async function POST(req: NextRequest) {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Сервер не настроен: добавь NEXT_PUBLIC_SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY в Vercel",
        },
        { status: 503 },
      );
    }

    const { email, name, password } = await req.json();

    if (!email || !name || !password) {
      return NextResponse.json({ error: "Заполни все поля" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Пароль минимум 8 символов" },
        { status: 400 },
      );
    }

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      const msg = authError.message.toLowerCase();
      if (
        msg.includes("already") ||
        msg.includes("registered") ||
        msg.includes("exists")
      ) {
        return NextResponse.json(
          { error: "Email уже используется" },
          { status: 400 },
        );
      }
      throw authError;
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Не удалось создать пользователя" }, { status: 500 });
    }

    const { error: profileError } = await supabaseAdmin.from("users").insert({
      id: authData.user.id,
      email,
      name,
      plan: "free",
      accent_theme: "blue",
    });

    if (profileError) {
      console.error("[register] profile insert", profileError);
      return NextResponse.json(
        { error: "Профиль не создан, попробуй войти или напиши в поддержку" },
        { status: 500 },
      );
    }

    try {
      await sendWelcomeEmail({ to: email, name });
    } catch (mailErr) {
      console.error("[register] welcome email", mailErr);
    }

    return NextResponse.json({ ok: true, userId: authData.user.id });
  } catch (e) {
    console.error("[register]", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
