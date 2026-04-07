"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, MessageCircle, Sparkles, KeyRound, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { COURSE_TITLE, LESSONS, SUPPORT_URL } from "@/lib/lessons-data";
import { getCompletedLessons } from "@/lib/progress-storage";
import { hasCourseAccess } from "@/lib/plan-access";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth/useSession";

const baseNav = [
  { href: "/dashboard", label: "Уроки", icon: Home },
  { href: "/profile", label: "Профиль", icon: User },
];

export function Sidebar({
  open = false,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
} = {}) {
  const pathname = usePathname();
  const { user } = useSession();
  const paid = hasCourseAccess(user);
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (!user || !paid) {
      setDone(0);
      return;
    }
    void getCompletedLessons(user.id).then((ids) => setDone(ids.length));
  }, [user, paid, pathname]);

  const nav = !paid
    ? [
        baseNav[0],
        { href: "/tariffs", label: "Тарифы", icon: Sparkles },
        { href: "/activate", label: "Код доступа", icon: KeyRound },
        baseNav[1],
      ]
    : baseNav;

  const total = LESSONS.length;
  const pct = total ? (done / total) * 100 : 0;

  return (
    <aside
      className={cn(
        "flex h-screen w-[var(--sidebar-w)] flex-col border-r border-[hsl(var(--border))] bg-[hsl(var(--bg-secondary))] px-3 py-4",
        "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out",
        "md:relative md:inset-auto md:z-auto md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}
    >
      {onClose ? (
        <button
          type="button"
          className="absolute right-2 top-3 rounded-lg p-1.5 text-[hsl(var(--fg-muted))] transition-colors hover:bg-[hsl(var(--bg-tertiary))] md:hidden"
          onClick={onClose}
          aria-label="Закрыть меню"
        >
          <X size={18} />
        </button>
      ) : null}
      <div className="px-1">
        <Link href="/dashboard" className="block">
          <span className="gradient-text text-base font-semibold">
            {COURSE_TITLE}
          </span>
        </Link>
        <p className="mt-0.5 text-xs text-[hsl(var(--fg-muted))]">
          Мини-курс · 4 урока
        </p>
      </div>

      <div className="mb-4 mt-6 px-2">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-[hsl(var(--fg-muted))]">
          <span>Прогресс</span>
          <span>
            {done}/{total}
          </span>
        </div>
        <Progress value={pct} />
        <p className="mt-2 text-xs text-[hsl(var(--fg-muted))]">
          {done} из {total} уроков пройдено
        </p>
      </div>

      <nav className="flex flex-col gap-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-[var(--r)] px-2 py-1.5 text-sm transition-colors",
                active
                  ? "bg-[hsl(var(--bg-tertiary))] font-medium text-[hsl(var(--fg))]"
                  : "text-[hsl(var(--fg-muted))] hover:bg-[hsl(var(--bg-tertiary))] hover:text-[hsl(var(--fg))]",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-4">
        <Link
          href="/"
          className="mx-1 block rounded-[var(--r-md)] px-2 py-1.5 text-center text-xs font-medium text-[hsl(var(--fg-muted))] transition-colors hover:bg-[hsl(var(--bg-tertiary))] hover:text-[hsl(var(--fg))]"
        >
          Сайт курса
        </Link>

        <button
          type="button"
          onClick={() => window.open(SUPPORT_URL, "_blank")}
          className="gradient-border mx-1 cursor-pointer rounded-[var(--r-md)] p-3 text-left transition-opacity hover:opacity-80"
        >
          <div className="flex items-center gap-2">
            <MessageCircle
              size={15}
              className="gradient-text shrink-0"
              strokeWidth={2}
            />
            <div>
              <p className="text-sm font-medium text-[hsl(var(--fg))]">
                Поддержка
              </p>
              <p className="text-xs text-[hsl(var(--fg-muted))]">Напиши мне</p>
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
}
