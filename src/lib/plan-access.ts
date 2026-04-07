import type { UserRow } from "@/lib/supabase/types";

/** Оплаченный тариф (код активирован). Всё остальное — как free: без уроков. */
export function isPaidPlan(
  plan: UserRow["plan"] | undefined | null,
): boolean {
  return plan === "course" || plan === "course_community";
}

export function hasCourseAccess(user: UserRow | null): boolean {
  if (!user) return false;
  return isPaidPlan(user.plan);
}
