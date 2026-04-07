import type { ReactNode } from "react";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--bg))]">
      <div
        className="orb -right-16 top-12 z-0 h-64 w-64"
        style={{ background: "hsl(var(--accent-from))" }}
      />
      <div
        className="orb -bottom-8 -left-20 z-0 h-72 w-72"
        style={{
          background: "hsl(var(--accent-to))",
          animationDelay: "1.2s",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
