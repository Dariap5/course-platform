"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CourseOverviewCards } from "@/components/onboarding/course-overview-cards";
import { ProgressDots } from "@/components/onboarding/progress-dots";
import { OnboardingGuard } from "@/components/onboarding-guard";
import { useSession } from "@/lib/auth/useSession";
import { isPaidPlan } from "@/lib/plan-access";
import type { PlanId } from "@/lib/supabase/types";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, refreshProfile } = useSession();
  const [nameDraft, setNameDraft] = useState("");
  const [nameError, setNameError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.name?.trim()) setNameDraft(user.name.trim());
  }, [user?.name]);

  async function finish() {
    if (!user) return;
    setNameError("");

    let plan: PlanId = user.plan;

    if (!user.name?.trim()) {
      const t = nameDraft.trim();
      if (!t) {
        setNameError("Введи, как к тебе обращаться");
        return;
      }
      setSaving(true);
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({ name: t }),
      });
      setSaving(false);
      if (!res.ok) {
        setNameError("Не удалось сохранить. Попробуй ещё раз.");
        return;
      }
      const updated = (await res.json()) as { plan?: PlanId };
      if (updated.plan) plan = updated.plan;
      await refreshProfile();
    }

    if (isPaidPlan(plan)) router.push("/dashboard");
    else router.push("/activate");
  }

  const needsName = Boolean(user && !user.name?.trim());

  return (
    <OnboardingGuard>
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="mb-6 text-xl font-medium text-[hsl(var(--fg))]">
            Как проходить курс
          </h1>

          {needsName ? (
            <div className="mb-8 rounded-[var(--r-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--bg-secondary))] p-4">
              <label className="mb-1.5 block text-xs font-medium text-[hsl(var(--fg-muted))]">
                Как к тебе обращаться
              </label>
              <Input
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                placeholder="Твоё имя"
                autoComplete="name"
              />
              {nameError ? (
                <p className="mt-2 text-xs text-red-500">{nameError}</p>
              ) : (
                <p className="mt-2 text-xs text-[hsl(var(--fg-muted))]">
                  Этого не было при регистрации — допиши имя, чтобы продолжить.
                </p>
              )}
            </div>
          ) : null}

          <CourseOverviewCards />
          <Button
            variant="gradient"
            className="mt-8 w-full"
            size="lg"
            disabled={saving}
            onClick={() => void finish()}
          >
            {saving ? "Сохраняем…" : "Дальше →"}
          </Button>
          <ProgressDots current={2} total={2} />
        </motion.div>
      </div>
    </OnboardingGuard>
  );
}
