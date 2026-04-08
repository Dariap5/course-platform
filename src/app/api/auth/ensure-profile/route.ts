import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * Если в auth есть пользователь, а строки в public.users нет — создаём free-профиль.
 * Вызывать с Bearer access_token клиента после входа / сброса пароля.
 */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;
    if (!token) {
      return NextResponse.json({ error: "Нет токена" }, { status: 401 });
    }

    const {
      data: { user: authUser },
      error: userErr,
    } = await supabaseAdmin.auth.getUser(token);

    if (userErr || !authUser?.email) {
      return NextResponse.json({ error: "Недействительная сессия" }, { status: 401 });
    }

    const email = authUser.email.trim().toLowerCase();

    const { data: existing } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("id", authUser.id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ ok: true, created: false });
    }

    const nameFromMeta =
      typeof authUser.user_metadata?.name === "string"
        ? authUser.user_metadata.name.trim()
        : null;

    const { error: insertErr } = await supabaseAdmin.from("users").insert({
      id: authUser.id,
      email,
      name: nameFromMeta && nameFromMeta.length > 0 ? nameFromMeta : null,
      plan: "free",
      accent_theme: "blue",
    });

    if (insertErr) {
      console.error("[ensure-profile] insert", insertErr);
      return NextResponse.json({ error: "Не удалось создать профиль" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, created: true });
  } catch (e) {
    console.error("[ensure-profile]", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
