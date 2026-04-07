import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-[var(--r-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-5 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        hoverable:
          "hover:border-transparent hover:gradient-border cursor-pointer",
        active: "gradient-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant }), className)} {...props} />
  );
}

export { Card, cardVariants };
