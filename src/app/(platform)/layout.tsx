import { PlatformGuard } from "@/components/platform-guard";
import { Shell } from "@/components/layout/shell";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlatformGuard>
      <Shell>{children}</Shell>
    </PlatformGuard>
  );
}
