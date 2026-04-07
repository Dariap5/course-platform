"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--accent-from))] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gradient:
          "gradient-bg text-white hover:opacity-90 hover:-translate-y-px shadow-sm",
        default: "bg-[hsl(var(--fg))] text-white hover:opacity-90",
        outline:
          "border border-[hsl(var(--border))] bg-transparent hover:bg-[hsl(var(--bg-tertiary))] text-[hsl(var(--fg))]",
        ghost: "hover:bg-[hsl(var(--bg-tertiary))] text-[hsl(var(--fg))]",
        destructive:
          "border border-red-200 bg-transparent text-red-600 hover:bg-red-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
