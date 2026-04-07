import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { LANDING_PRODUCT_NAME, LANDING_TAGLINE } from "@/lib/landing-constants";

export const metadata: Metadata = {
  title: `${LANDING_PRODUCT_NAME} — ${LANDING_TAGLINE}`,
  description:
    "Мини-курс о целях, дисциплине и системе: 4 урока, Notion, таблицы и ясность без воды.",
};

export default function MarketingHomePage() {
  return <LandingPage />;
}
