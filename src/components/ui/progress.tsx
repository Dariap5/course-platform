"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  height = 3,
}: {
  value: number;
  className?: string;
  height?: number;
}) {
  const v = Math.min(100, Math.max(0, value));

  return (
    <ProgressPrimitive.Root
      value={v}
      max={100}
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-[hsl(var(--bg-tertiary))]",
        className,
      )}
      style={{ height }}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full rounded-full bg-gradient-to-r from-[hsl(var(--accent-from))] to-[hsl(var(--accent-to))] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: `translateX(-${100 - v}%)`,
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </ProgressPrimitive.Root>
  );
}
