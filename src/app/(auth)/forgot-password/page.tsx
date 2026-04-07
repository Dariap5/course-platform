"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import { COURSE_TITLE } from "@/lib/lessons-data";
import { useSession } from "@/lib/auth/useSession";
import { isPaidPlan } from "@/lib/plan-access";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { user, loading: sessionLoading } = useSession();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    const { error: resetErr } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo: `${window.location.origin}/reset-password` },
    );
    setLoading(false);
    if (resetErr) {
      setError("Не удалось отправить письмо. Проверь email.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="relative z-10 mx-auto w-full max-w-sm px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="mb-4 text-5xl" aria-hidden>
            📬
          </div>
          <h1 className="text-2xl font-medium text-[hsl(var(--fg))]">
            Письмо отправлено
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--fg-muted))]">
            Проверь почту <strong className="text-[hsl(var(--fg))]">{email}</strong> — там
            будет ссылка для сброса пароля. Если не видишь письмо, загляни в спам.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-block text-sm font-medium text-[hsl(var(--accent-text))] underline-offset-2 hover:underline"
          >
            ← Вернуться ко входу
          </Link>
        </motion.div>
      </div>
    );
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
          Сброс пароля
        </h2>
        <p className="mt-2 text-center text-sm text-[hsl(var(--fg-muted))]">
          Введи email — пришлём ссылку для нового пароля
        </p>

        <form onSubmit={(e) => void handleSubmit(e)} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[hsl(var(--fg-muted))]">
              Email
            </label>
            <Input
              required
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
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
            disabled={loading || !email.trim()}
          >
            {loading ? "Отправляем…" : "Выслать ссылку"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[hsl(var(--fg-muted))]">
          <Link
            href="/login"
            className="font-medium text-[hsl(var(--accent-text))] underline-offset-2 hover:underline"
          >
            ← Вернуться ко входу
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
