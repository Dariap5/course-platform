import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendPasswordResetEmail } from "@/lib/email/templates";

type GenerateLinkResponse = {
  properties?: {
    action_link?: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const { email } = (await req.json()) as { email?: string };
    const cleanEmail = String(email ?? "").trim().toLowerCase();

    if (!cleanEmail) {
      return NextResponse.json({ error: "Email обязателен" }, { status: 400 });
    }

    const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/reset-password`;

    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email: cleanEmail,
      options: { redirectTo },
    });

    if (error) {
      console.error("[forgot-password] generateLink:", error.message);
      // Не выдаем пользователю, существует ли email
      return NextResponse.json({ ok: true });
    }

    const linkData = data as GenerateLinkResponse;
    const actionLink = linkData?.properties?.action_link;
    if (!actionLink) {
      console.error("[forgot-password] action_link not returned");
      return NextResponse.json({ ok: true });
    }

    await sendPasswordResetEmail({
      to: cleanEmail,
      resetUrl: actionLink,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[forgot-password]", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
