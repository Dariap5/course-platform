"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Menu } from "lucide-react";
import { getUser } from "@/lib/user-storage";
import { getAvatarEmoji } from "@/lib/avatar-storage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const titles: Record<string, string> = {
  "/dashboard": "Уроки",
  "/profile": "Профиль",
  "/completion": "Поздравляем",
  "/tariffs": "Тарифы",
};

export function TopBar({ onMenuClick }: { onMenuClick?: () => void } = {}) {
  const pathname = usePathname();
  const { name, avatar, label } = useMemo(() => {
    const u = getUser();
    const base = pathname.split("/").slice(0, 2).join("/") || pathname;
    const labelText = pathname.startsWith("/lesson")
      ? "Урок"
      : (titles[base] ?? titles[pathname] ?? "Платформа");
    return {
      name: u?.name ?? "",
      avatar: getAvatarEmoji(),
      label: labelText,
    };
  }, [pathname]);

  return (
    <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        {onMenuClick ? (
          <button
            type="button"
            className="rounded-lg p-1.5 text-[hsl(var(--fg-muted))] transition-colors hover:bg-[hsl(var(--bg-tertiary))] md:hidden"
            onClick={onMenuClick}
            aria-label="Открыть меню"
          >
            <Menu size={20} />
          </button>
        ) : null}
        <span className="truncate text-sm font-medium text-[hsl(var(--fg-muted))]">
          {label}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-from))]/40"
            title={name || "Меню"}
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback>{avatar}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/profile">Профиль</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
