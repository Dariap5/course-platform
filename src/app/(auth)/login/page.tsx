"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import { COURSE_TITLE } from "@/lib/lessons-data";
import { useSession } from "@/lib/auth/useSession";
import { isPaidPlan } from "@/lib/plan-access";

export default function LoginPage() {
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
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    if (!email || !password) return;
    setSubmitting(true);
    const { error: signErr } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSubmitting(false);
    if (signErr) {
      setError("Неверный email или пароль");
      return;
    }
    router.refresh();
    router.replace("/dashboard");
  }

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
          Вход
        </h2>
        <p className="mt-2 text-center text-sm text-[hsl(var(--fg-muted))]">
          Email и пароль, который ты задала при регистрации
        </p>

        <form onSubmit={(e) => void handleSubmit(e)} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[hsl(var(--fg-muted))]">
              Email
            </label>
            <Input
              required
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[hsl(var(--fg-muted))]">
              Пароль
            </label>
            <Input
              required
              name="password"
              type="password"
              autoComplete="current-password"
            />
          </div>
          {error ? (
            <p className="text-center text-xs text-red-500">{error}</p>
          ) : null}
          <Button
            type="submit"
            variant="gradient"
            className="w-full"
            size="lg"
            disabled={submitting}
          >
            {submitting ? "Входим…" : "Войти"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[hsl(var(--fg-muted))]">
          Нет аккаунта?{" "}
          <Link
            href="/register"
            className="font-medium text-[hsl(var(--accent-text))] underline-offset-2 hover:underline"
          >
            Регистрация
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
