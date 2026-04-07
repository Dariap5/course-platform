"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { MainWithMotion } from "./main-with-motion";
import { SupportButton } from "@/components/support-button";

export function Shell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="workspace-shell flex min-h-screen bg-[hsl(var(--bg))]">
      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-label="Закрыть меню"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
      <div className="max-md:w-0 max-md:min-w-0 max-md:shrink-0 md:w-[var(--sidebar-w)] md:shrink-0">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="workspace-main workspace-page flex-1 overflow-auto p-6">
          <MainWithMotion>{children}</MainWithMotion>
        </main>
      </div>
      <SupportButton />
    </div>
  );
}
