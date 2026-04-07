"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CourseOverviewCards } from "@/components/onboarding/course-overview-cards";
import { ProgressDots } from "@/components/onboarding/progress-dots";
import { OnboardingGuard } from "@/components/onboarding-guard";
import { useSession } from "@/lib/auth/useSession";
import { isPaidPlan } from "@/lib/plan-access";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useSession();

  function finish() {
    if (!user) return;
    if (isPaidPlan(user.plan)) router.push("/dashboard");
    else router.push("/activate");
  }

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
          <CourseOverviewCards />
          <Button
            variant="gradient"
            className="mt-8 w-full"
            size="lg"
            onClick={finish}
          >
            Дальше →
          </Button>
          <ProgressDots current={2} total={2} />
        </motion.div>
      </div>
    </OnboardingGuard>
  );
}
