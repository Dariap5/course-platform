"use client";

import { cn } from "@/lib/utils";
import { getAvatarEmoji, setAvatarEmoji } from "@/lib/avatar-storage";
import { useState } from "react";

const EMOJIS = ["🦋", "🌸", "⭐", "🔥", "🌊", "🌿", "💎", "🎯", "🚀", "✨"];

export function AvatarPicker({ onChange }: { onChange?: () => void }) {
  const [active, setActive] = useState(() => getAvatarEmoji());

  function pick(emoji: string) {
    setAvatarEmoji(emoji);
    setActive(emoji);
    onChange?.();
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-[hsl(var(--fg))]">Аватар</h2>
      <p className="mt-1 text-xs text-[hsl(var(--fg-muted))]">
        Выбери эмодзи — он отображается в шапке
      </p>
      <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10">
        {EMOJIS.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => pick(e)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all",
              active === e
                ? "gradient-border scale-[1.02]"
                : "border border-[hsl(var(--border))] bg-[hsl(var(--bg-secondary))] hover:bg-[hsl(var(--bg-tertiary))]",
            )}
            aria-label={`Аватар ${e}`}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}
