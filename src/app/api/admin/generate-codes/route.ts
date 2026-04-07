import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const random = Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
  return `ТСБК-${random}`;
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  const expected = process.env.ADMIN_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { plan?: string; count?: number; note?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { plan, count = 1, note } = body;

  if (!plan || !["course", "course_community"].includes(plan)) {
    return NextResponse.json({ error: "Неверный plan" }, { status: 400 });
  }

  const n = Math.min(100, Math.max(1, Number(count) || 1));

  const codes = Array.from({ length: n }, () => ({
    code: generateCode(),
    plan: plan as "course" | "course_community",
    used: false,
    used_by: null,
    used_at: null,
    note: note ?? null,
  }));

  const { data, error } = await supabaseAdmin
    .from("access_codes")
    .insert(codes)
    .select("code");

  if (error) {
    console.error("[generate-codes]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    codes: data.map((r) => r.code),
  });
}
