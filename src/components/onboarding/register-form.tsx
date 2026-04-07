"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COURSE_TITLE } from "@/lib/lessons-data";
import { ProgressDots } from "./progress-dots";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase/client";
import { useSession } from "@/lib/auth/useSession";
import { isPaidPlan } from "@/lib/plan-access";

export function RegisterForm() {
  const router = useRouter();
  const { user, loading: sessionLoading } = useSession();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (sessionLoading) return;
    if (user) {
      if (isPaidPlan(user.plan)) router.replace("/dashboard");
      else router.replace("/activate");
      return;
    }
    queueMicrotask(() => setReady(true));
  }, [user, sessionLoading, router]);

  if (!ready || sessionLoading) {
    return (
      <div className="relative z-10 flex min-h-screen items-center justify-center text-sm text-[hsl(var(--fg-muted))]">
        Загрузка…
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    if (!name || !email || !password) return;
    if (password.length < 8) {
      setError("Пароль минимум 8 символов");
      return;
    }
    setSubmitting(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setSubmitting(false);
      setError(data.error ?? "Ошибка регистрации");
      return;
    }
    const { error: signErr } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSubmitting(false);
    if (signErr) {
      setError("Аккаунт создан, но вход не удался. Попробуй страницу «Вход».");
      return;
    }
    router.replace("/onboarding");
  }

  const fields = [
    {
      name: "name",
      label: "Имя",
      type: "text",
      placeholder: "Как к тебе обращаться",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
      placeholder: "Минимум 8 символов",
    },
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
          Создай аккаунт — затем введи код доступа, если он у тебя есть
        </p>

        <form onSubmit={(e) => void handleSubmit(e)} className="mt-8 space-y-4">
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
                autoComplete={
                  f.name === "email"
                    ? "email"
                    : f.name === "password"
                      ? "new-password"
                      : "name"
                }
              />
            </motion.div>
          ))}
          {error ? (
            <p className="text-center text-xs text-red-500">{error}</p>
          ) : null}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              size="lg"
              disabled={submitting}
            >
              {submitting ? "Создаём аккаунт…" : "Начать курс"}
            </Button>
          </motion.div>
        </form>

        <p className="mt-6 text-center text-sm text-[hsl(var(--fg-muted))]">
          Уже есть аккаунт?{" "}
          <Link
            href="/login"
            className="font-medium text-[hsl(var(--accent-text))] underline-offset-2 hover:underline"
          >
            Войти
          </Link>
        </p>

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
            <DialogTitle>Аккаунт и прогресс</DialogTitle>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--fg-muted))]">
              Регистрация идёт через Supabase: email и пароль хранятся в защищённой
              базе. Прогресс уроков синхронизируется с твоим аккаунтом. Письма
              отправляются через Resend. Тема и аватар в интерфейсе по-прежнему
              можно хранить локально в браузере.
            </p>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
