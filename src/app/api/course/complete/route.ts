import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendCourseCompletionEmail } from "@/lib/email/templates";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "userId обязателен" }, { status: 400 });
    }

    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("email, name, completion_email_sent")
      .eq("id", userId)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (user.completion_email_sent) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    await sendCourseCompletionEmail({
      to: user.email,
      name: user.name ?? "Привет",
    });

    await supabaseAdmin
      .from("users")
      .update({ completion_email_sent: true })
      .eq("id", userId);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[complete]", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
