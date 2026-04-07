import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center font-medium rounded-full", {
  variants: {
    variant: {
      gradient: "gradient-bg text-white text-xs px-2 py-0.5",
      outline:
        "border border-[hsl(var(--border))] text-[hsl(var(--fg))] text-xs px-2 py-0.5",
      muted:
        "bg-[hsl(var(--bg-tertiary))] text-[hsl(var(--fg-muted))] text-xs px-2 py-0.5",
    },
  },
  defaultVariants: {
    variant: "outline",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
