"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvatarPicker } from "./avatar-picker";
import { ThemePicker } from "./theme-picker";
import { clearAllSession } from "@/lib/user-storage";
import { getCompletedLessons } from "@/lib/progress-storage";
import { LESSONS } from "@/lib/lessons-data";
import * as Tabs from "@radix-ui/react-tabs";
import { useSession } from "@/lib/auth/useSession";
import { hasCourseAccess } from "@/lib/plan-access";

export function ProfileForm() {
  const router = useRouter();
  const { user, loading, signOut, refreshProfile } = useSession();
  const [name, setName] = useState("");
  const [tick, setTick] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.name != null) setName(user.name);
  }, [user?.name]);

  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    if (!user || !hasCourseAccess(user)) {
      setDoneCount(0);
      return;
    }
    void getCompletedLessons(user.id).then((ids) => {
      setDoneCount(ids.length);
    });
  }, [user, tick]);

  const total = LESSONS.length;
  const pct = total ? (doneCount / total) * 100 : 0;

  async function saveName() {
    if (!user) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    setSaving(true);
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": user.id,
      },
      body: JSON.stringify({ name: trimmed }),
    });
    setSaving(false);
    if (res.ok) await refreshProfile();
    setTick((n) => n + 1);
  }

  async function logout() {
    clearAllSession();
    await signOut();
    router.push("/login");
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center text-sm text-[hsl(var(--fg-muted))]">
        Загрузка…
      </div>
    );
  }

  return (
    <motion.div
      className="fade-up mx-auto max-w-lg py-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <h1 className="text-xl font-medium text-[hsl(var(--fg))]">Профиль</h1>
      <p className="mt-1 text-sm text-[hsl(var(--fg-muted))]">
        Настрой внешний вид и данные
      </p>

      <Tabs.Root defaultValue="look" className="mt-8">
        <Tabs.List className="flex gap-1 rounded-[var(--r)] bg-[hsl(var(--bg-secondary))] p-1">
          {[
            ["look", "Вид"],
            ["info", "Данные"],
          ].map(([v, l]) => (
            <Tabs.Trigger
              key={v}
              value={v}
              className="flex-1 rounded-[var(--r)] px-3 py-1.5 text-xs font-medium text-[hsl(var(--fg-muted))] data-[state=active]:bg-[hsl(var(--bg))] data-[state=active]:text-[hsl(var(--fg))] data-[state=active]:shadow-sm"
            >
              {l}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="look" className="mt-8 space-y-10 outline-none">
          <AvatarPicker onChange={() => setTick((n) => n + 1)} />
          <ThemePicker />
        </Tabs.Content>
        <Tabs.Content value="info" className="mt-8 space-y-6 outline-none">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[hsl(var(--fg-muted))]">
              Имя
            </label>
            <div className="flex gap-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => void saveName()}
                disabled={saving}
              >
                {saving ? "…" : "Сохранить"}
              </Button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[hsl(var(--fg-muted))]">
              Email
            </label>
            <Input
              value={user.email}
              readOnly
              className="bg-[hsl(var(--bg-secondary))]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[hsl(var(--fg-muted))]">
              Язык интерфейса
            </label>
            <Select defaultValue="ru">
              <SelectTrigger>
                <SelectValue placeholder="Язык" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ru">Русский</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-xs font-medium text-[hsl(var(--fg-muted))]">
              Прогресс курса
            </p>
            <p className="mt-1 text-sm text-[hsl(var(--fg))]">
              {doneCount} из {total} уроков пройдено
            </p>
            <Progress value={pct} className="mt-3" />
          </div>
        </Tabs.Content>
      </Tabs.Root>

      <div className="mt-10">
        <Button variant="destructive" className="w-full" onClick={() => void logout()}>
          Выйти
        </Button>
      </div>
    </motion.div>
  );
}
