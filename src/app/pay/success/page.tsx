"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaySuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/activate"), 2800);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[hsl(var(--bg))] px-6 text-center">
      <div className="gradient-text text-2xl font-bold md:text-3xl">
        Спасибо за оплату
      </div>
      <p className="mt-3 max-w-md text-sm text-[hsl(var(--fg-muted))]">
        Это демо-страница: тариф в личном кабинете{" "}
        <strong className="text-[hsl(var(--fg))]">не активируется</strong> сам.
        Код придёт в Telegram после реальной оплаты — введи его на странице
        активации.
      </p>
      <Link
        href="/activate"
        className="mt-8 text-sm font-medium text-[hsl(var(--accent-text))] underline-offset-2 hover:underline"
      >
        Ввести код сейчас
      </Link>
    </div>
  );
}
