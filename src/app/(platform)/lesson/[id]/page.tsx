import { notFound } from "next/navigation";
import { LessonView } from "@/components/lessons/lesson-view";
import { getLessonById } from "@/lib/lessons-data";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const n = Number(id);
  if (!Number.isFinite(n)) notFound();
  const lesson = getLessonById(n);
  if (!lesson) notFound();

  return <LessonView lesson={lesson} />;
}
