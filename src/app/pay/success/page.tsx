"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setPurchased } from "@/lib/purchase-storage";

export default function PaySuccessPage() {
  const router = useRouter();

  useEffect(() => {
    setPurchased(true);
    const t = setTimeout(() => router.replace("/dashboard"), 2200);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[hsl(var(--bg))] px-6 text-center">
      <div className="gradient-text text-2xl font-bold md:text-3xl">
        Доступ открыт!
      </div>
      <p className="mt-3 max-w-sm text-sm text-[hsl(var(--fg-muted))]">
        Уроки разблокируются по очереди. Перенаправляем в кабинет…
      </p>
      <Link
        href="/dashboard"
        className="mt-8 text-sm font-medium text-[hsl(var(--accent-text))] underline-offset-2 hover:underline"
      >
        Перейти сразу
      </Link>
    </div>
  );
}
