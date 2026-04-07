"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { getLandingTelegramCtaUrl } from "@/lib/landing-constants";

const MOBILE_MAX = 768;

export function LandingMobileSticky() {
  const [heroIntersecting, setHeroIntersecting] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    const syncMq = () => setIsMobile(mq.matches);
    syncMq();
    mq.addEventListener("change", syncMq);

    const hero = document.getElementById("hero");
    if (!hero) {
      return () => mq.removeEventListener("change", syncMq);
    }

    const io = new IntersectionObserver(
      ([e]) => setHeroIntersecting(!!e?.isIntersecting),
      { threshold: 0.1 },
    );
    io.observe(hero);

    return () => {
      mq.removeEventListener("change", syncMq);
      io.disconnect();
    };
  }, []);

  const visible = !heroIntersecting && isMobile;

  function fireConfetti() {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.9 },
      colors: ["#3B3BF5", "#5B5BFF", "#818CF8", "#F59E0B"],
    });
  }

  if (!visible) return null;

  const href = getLandingTelegramCtaUrl();

  return (
    <div
      id="mobile-sticky-cta"
      className="fixed bottom-0 left-0 right-0 z-[90] border-t border-[var(--lg-border)] bg-white/95 px-4 pb-3 pt-3 backdrop-blur-md md:hidden"
      style={{
        paddingBottom: "max(12px, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={fireConfetti}
        className="landing-btn-gradient landing-btn-pulse flex min-h-[48px] w-full items-center justify-center rounded-xl px-4 py-3 text-center font-landing-display text-[15px] font-bold"
      >
        Написать Даше →
      </a>
    </div>
  );
}
