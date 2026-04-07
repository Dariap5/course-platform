import type { UserData } from "@/types";

const KEY = "course_user";

export function getUser(): UserData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserData;
  } catch {
    return null;
  }
}

export function setUser(data: UserData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function clearUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function isOnboardingComplete(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("onboarding_complete") === "true";
}

export function setOnboardingComplete(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("onboarding_complete", "true");
}

export function clearAllSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  localStorage.removeItem("onboarding_complete");
  localStorage.removeItem("completed_lessons");
  localStorage.removeItem("completion_email_sent");
  localStorage.removeItem("theme");
  localStorage.removeItem("avatar_emoji");
  localStorage.removeItem("course_paid");
}
