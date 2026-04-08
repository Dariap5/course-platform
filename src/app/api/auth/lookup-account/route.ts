import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/** Проверка: есть ли профиль платформы (регистрация с именем и т.д.). */
export async function POST(req: NextRequest) {
  try {
    const { email } = (await req.json()) as { email?: string };
    const clean = String(email ?? "").trim().toLowerCase();
    if (!clean) {
      return NextResponse.json({ error: "Email обязателен" }, { status: 400 });
    }

    const r1 = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", clean)
      .maybeSingle();
    if (r1.error) {
      console.error("[lookup-account]", r1.error.message);
    }

    let row = r1.data ?? null;
    if (!row) {
      const r2 = await supabaseAdmin
        .from("users")
        .select("id")
        .ilike("email", clean)
        .maybeSingle();
      if (r2.error) {
        console.error("[lookup-account] ilike", r2.error.message);
      }
      row = r2.data ?? null;
    }

    return NextResponse.json({ registered: Boolean(row) });
  } catch (e) {
    console.error("[lookup-account]", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
