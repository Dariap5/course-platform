import { Unbounded, Inter } from "next/font/google";
import "../landing.css";

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-landing-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-landing-body",
  display: "swap",
});

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`landing-root ${display.variable} ${inter.variable} min-h-screen bg-white font-landing-body text-[var(--lg-fg)] antialiased`}
    >
      {children}
    </div>
  );
}
