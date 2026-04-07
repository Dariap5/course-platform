import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-3 py-2 text-sm text-[hsl(var(--fg))] placeholder:text-[hsl(var(--fg-subtle))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-from))]/30 transition-colors",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
