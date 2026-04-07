import { hasPurchased } from "@/lib/purchase-storage";

export function getCompletedLessons(): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("completed_lessons") ?? "[]") as number[];
  } catch {
    return [];
  }
}

export function markLessonComplete(id: number): void {
  if (typeof window === "undefined") return;
  const completed = getCompletedLessons();
  if (!completed.includes(id)) {
    localStorage.setItem(
      "completed_lessons",
      JSON.stringify([...completed, id]),
    );
  }
}

export function isLessonUnlocked(id: number): boolean {
  if (!hasPurchased()) return false;
  if (id === 1) return true;
  return getCompletedLessons().includes(id - 1);
}

export function wasCompletionEmailSent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("completion_email_sent") === "true";
}

export function markCompletionEmailSent(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("completion_email_sent", "true");
}

export function isLesson4Complete(): boolean {
  return getCompletedLessons().includes(4);
}
