import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, Nunito } from "next/font/google";
import "./globals.css";
import { ThemeRoot } from "@/components/theme-root";
import { COURSE_TITLE } from "@/lib/lessons-data";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  style: ["normal", "italic"],
});

/* В next/font для DM Sans нет subset cyrillic — кириллица идёт через system-ui из tailwind theme */
const sans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: COURSE_TITLE,
  description: "Авторский онлайн-курс",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      data-theme="blue"
      className={`${serif.variable} ${sans.variable} ${nunito.variable} h-full`}
    >
      <body className="min-h-full bg-[hsl(var(--bg))] font-sans text-[hsl(var(--fg))] antialiased">
        <ThemeRoot>{children}</ThemeRoot>
      </body>
    </html>
  );
}
