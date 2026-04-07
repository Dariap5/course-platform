"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import { COURSE_TITLE } from "@/lib/lessons-data";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const allow = () => {
      if (mounted) setReady(true);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") allow();
    });

    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) allow();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Пароли не совпадают");
      return;
    }
    if (password.length < 8) {
      setError("Минимум 8 символов");
      return;
    }
    setLoading(true);
    setError("");
    const { error: updErr } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updErr) {
      setError("Не удалось обновить пароль. Попробуй ещё раз.");
      return;
    }
    router.replace("/dashboard");
  }

  if (!ready) {
    return (
      <div className="relative z-10 mx-auto w-full max-w-sm px-4 py-12">
        <div className="text-center text-sm text-[hsl(var(--fg-muted))]">
          Проверяем ссылку…
        </div>
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
          Новый пароль
        </h2>
        <p className="mt-2 text-center text-sm text-[hsl(var(--fg-muted))]">
          Придумай пароль — минимум 8 символов
        </p>

        <form onSubmit={(e) => void handleReset(e)} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[hsl(var(--fg-muted))]">
              Новый пароль
            </label>
            <Input
              required
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[hsl(var(--fg-muted))]">
              Повтори пароль
            </label>
            <Input
              required
              type="password"
              value={confirm}
              onChange={(ev) => setConfirm(ev.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
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
            disabled={loading || !password || !confirm}
          >
            {loading ? "Сохраняем…" : "Сохранить пароль"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
