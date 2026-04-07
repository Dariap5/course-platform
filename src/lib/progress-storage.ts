import { supabase } from "@/lib/supabase/client";

export async function getCompletedLessons(userId: string): Promise<number[]> {
  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", userId)
    .eq("completed", true);
  return data?.map((r) => r.lesson_id) ?? [];
}

export async function markLessonComplete(userId: string, lessonId: number) {
  const { error } = await supabase.from("lesson_progress").upsert({
    user_id: userId,
    lesson_id: lessonId,
    completed: true,
    completed_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export async function isLessonUnlocked(
  userId: string,
  lessonId: number,
): Promise<boolean> {
  if (lessonId === 1) return true;
  const completed = await getCompletedLessons(userId);
  return completed.includes(lessonId - 1);
}

export async function isLesson4Complete(userId: string): Promise<boolean> {
  const completed = await getCompletedLessons(userId);
  return completed.includes(4);
}
