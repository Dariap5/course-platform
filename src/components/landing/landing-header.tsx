"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { LANDING_LOGO } from "@/lib/landing-media";

const nunitoBrand = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["600"],
  display: "swap",
});

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="header"
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-4 py-3 transition-[background,box-shadow] duration-300 md:px-8 md:py-4",
        scrolled
          ? "border-b border-[var(--lg-border)] bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Link href="/" className="flex items-center gap-3">
        <span className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-xl shadow-lg">
          <Image
            src={LANDING_LOGO}
            alt="Комьюнити"
            width={36}
            height={36}
            className="h-full w-full object-cover"
            priority
          />
        </span>
        <span
          className={nunitoBrand.className}
          style={{
            fontWeight: 600,
            fontSize: "18px",
            color: "#3B3BF5",
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          Точка сборки
        </span>
      </Link>
      <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
        <div className="header-nav-links hidden items-center gap-2 md:flex md:gap-3">
          <Link
            href="/register"
            className="text-[13px] font-medium text-[var(--lg-fg2)] hover:text-[var(--lg-fg)]"
          >
            Регистрация
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-[var(--lg-border)] px-3 py-2 text-[13px] font-semibold text-[var(--lg-fg)] transition-colors hover:bg-[var(--lg-bg)]"
          >
            Войти
          </Link>
        </div>
        <a
          href="#pricing"
          className="header-cta landing-header-cta inline-flex min-h-[48px] items-center justify-center sm:min-h-0"
        >
          Купить курс
        </a>
      </nav>
    </header>
  );
}
