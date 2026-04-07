"use client";

import { useState } from "react";
import { LessonList } from "@/components/lessons/lesson-list";
import { getUser } from "@/lib/user-storage";

export default function DashboardPage() {
  const [name] = useState(() => getUser()?.name ?? "");

  return <LessonList userName={name || "друг"} />;
}
