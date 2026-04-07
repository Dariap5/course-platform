"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setUser, getUser, isOnboardingComplete } from "@/lib/user-storage";
import { COURSE_TITLE } from "@/lib/lessons-data";
import { ProgressDots } from "./progress-dots";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function RegisterForm() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (u) {
      if (isOnboardingComplete()) router.replace("/dashboard");
      else router.replace("/onboarding");
      return;
    }
    queueMicrotask(() => setReady(true));
  }, [router]);

  if (!ready) {
    return (
      <div className="relative z-10 flex min-h-screen items-center justify-center text-sm text-[hsl(var(--fg-muted))]">
        Загрузка…
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    if (!name || !email) return;
    setUser({ name, email });
    router.push("/onboarding");
  }

  const fields = [
    { name: "name", label: "Имя", type: "text", placeholder: "Как к тебе обращаться" },
    { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  ] as const;

  return (
    <div className="relative z-10 mx-auto w-full max-w-sm px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="gradient-text text-center text-2xl font-semibold tracking-tight">
          {COURSE_TITLE}
        </h1>
        <h2 className="mt-6 text-center text-2xl font-medium text-[hsl(var(--fg))]">
          Добро пожаловать
        </h2>
        <p className="mt-2 text-center text-sm text-[hsl(var(--fg-muted))]">
          Заполни данные — и начнём обучение
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {fields.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.35 }}
            >
              <label className="mb-1.5 block text-xs font-medium text-[hsl(var(--fg-muted))]">
                {f.label}
              </label>
              <Input
                required
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                autoComplete={f.name === "email" ? "email" : "name"}
              />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            <Button type="submit" variant="gradient" className="w-full" size="lg">
              Начать курс
            </Button>
          </motion.div>
        </form>

        <ProgressDots current={1} total={2} />

        <Dialog>
          <div className="mt-6 text-center">
            <DialogTrigger asChild>
              <button
                type="button"
                className="text-xs text-[hsl(var(--fg-muted))] underline-offset-2 hover:underline"
              >
                Как хранятся мои данные
              </button>
            </DialogTrigger>
          </div>
          <DialogContent>
            <DialogTitle>Локальное хранение</DialogTitle>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--fg-muted))]">
              Имя, email, прогресс и настройки сохраняются только в браузере на
              твоём устройстве — без серверной базы данных. Письмо после финала
              уходит один раз через безопасный сервис отправки.
            </p>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
