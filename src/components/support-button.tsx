"use client";

import { MessageCircle } from "lucide-react";
import { SUPPORT_URL } from "@/lib/lessons-data";

export function SupportButton() {
  return (
    <button
      type="button"
      aria-label="Поддержка в Telegram"
      onClick={() => window.open(SUPPORT_URL, "_blank")}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-bg text-white shadow-lg transition-transform hover:scale-105 hover:opacity-95"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2} />
    </button>
  );
}
