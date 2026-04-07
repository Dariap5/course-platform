"use client";

import { cn } from "@/lib/utils";

export function ProgressDots({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex justify-center gap-2 pt-6">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-colors",
            i < current
              ? "gradient-bg"
              : "bg-[hsl(var(--border-strong))]",
          )}
        />
      ))}
    </div>
  );
}
