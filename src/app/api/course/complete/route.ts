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
      .select("email, name, completion_email_sent, course_completed")
      .eq("id", userId)
      .single();

    if (error || !user) {
      console.error("[course/complete] user lookup:", error?.message);
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
    }

    const alreadyDone = user.completion_email_sent || user.course_completed;

    if (!alreadyDone) {
      await sendCourseCompletionEmail({
        to: user.email,
        name: user.name ?? "Привет",
      });

      await supabaseAdmin
        .from("users")
        .update({
          completion_email_sent: true,
          course_completed: true,
          course_completed_at: new Date().toISOString(),
        })
        .eq("id", userId);
    } else if (user.completion_email_sent && !user.course_completed) {
      await supabaseAdmin
        .from("users")
        .update({
          course_completed: true,
          course_completed_at: new Date().toISOString(),
        })
        .eq("id", userId);
    }

    return NextResponse.json({ ok: true, skipped: alreadyDone });
  } catch (e: unknown) {
    console.error("[course/complete]", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Ошибка сервера" },
      { status: 500 },
    );
  }
}
