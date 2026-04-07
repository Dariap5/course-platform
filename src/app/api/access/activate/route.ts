import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendAccessGrantedEmail } from "@/lib/email/templates";

function normalizeCode(raw: string): string {
  return raw.trim();
}

export async function POST(req: NextRequest) {
  try {
    const { code, userId } = await req.json();

    if (!code || !userId) {
      return NextResponse.json(
        { error: "Нет кода или userId" },
        { status: 400 },
      );
    }

    const normalized = normalizeCode(String(code));

    const { data: codeRow, error: codeError } = await supabaseAdmin
      .from("access_codes")
      .select("*")
      .eq("code", normalized)
      .maybeSingle();

    if (codeError || !codeRow) {
      return NextResponse.json({ error: "Код не найден" }, { status: 404 });
    }

    if (codeRow.used) {
      return NextResponse.json(
        { error: "Код уже использован" },
        { status: 400 },
      );
    }

    const { error: updateCodeError } = await supabaseAdmin
      .from("access_codes")
      .update({
        used: true,
        used_by: userId,
        used_at: new Date().toISOString(),
      })
      .eq("id", codeRow.id);

    if (updateCodeError) {
      console.error("[activate] code update", updateCodeError);
      return NextResponse.json({ error: "Ошибка активации" }, { status: 500 });
    }

    const { error: planError } = await supabaseAdmin
      .from("users")
      .update({
        plan: codeRow.plan,
        plan_activated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (planError) {
      console.error("[activate] plan update", planError);
      return NextResponse.json({ error: "Не удалось обновить тариф" }, { status: 500 });
    }

    const { data: userRow } = await supabaseAdmin
      .from("users")
      .select("email, name")
      .eq("id", userId)
      .single();

    if (userRow) {
      await sendAccessGrantedEmail({
        to: userRow.email,
        name: userRow.name ?? "Привет",
        plan: codeRow.plan,
      });
    }

    return NextResponse.json({ ok: true, plan: codeRow.plan });
  } catch (e) {
    console.error("[activate]", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
