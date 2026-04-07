"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { PageMotion } from "@/components/page-motion";

export function MainWithMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <PageMotion key={pathname}>{children}</PageMotion>
    </AnimatePresence>
  );
}
