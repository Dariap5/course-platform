"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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
import { getUser, setUser, clearAllSession } from "@/lib/user-storage";
import { getCompletedLessons } from "@/lib/progress-storage";
import { LESSONS } from "@/lib/lessons-data";
import * as Tabs from "@radix-ui/react-tabs";

export function ProfileForm() {
  const router = useRouter();
  const [name, setName] = useState(() => getUser()?.name ?? "");
  const [email] = useState(() => getUser()?.email ?? "");
  const [tick, setTick] = useState(0);
  const done = useMemo(() => {
    void tick;
    return getCompletedLessons().length;
  }, [tick]);

  const total = LESSONS.length;
  const pct = total ? (done / total) * 100 : 0;

  function saveName() {
    const u = getUser();
    if (!u) return;
    setUser({ ...u, name: name.trim() || u.name });
    setTick((n) => n + 1);
  }

  function logout() {
    clearAllSession();
    router.push("/register");
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
                <Button type="button" variant="outline" onClick={saveName}>
                  Сохранить
                </Button>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[hsl(var(--fg-muted))]">
                Email
              </label>
              <Input value={email} readOnly className="bg-[hsl(var(--bg-secondary))]" />
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
                {done} из {total} уроков пройдено
              </p>
              <Progress value={pct} className="mt-3" />
            </div>
          </Tabs.Content>
        </Tabs.Root>

        <div className="mt-10">
          <Button variant="destructive" className="w-full" onClick={logout}>
            Выйти
          </Button>
        </div>
    </motion.div>
  );
}
