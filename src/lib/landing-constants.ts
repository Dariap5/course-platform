/** Telegram для CTA «Написать Даше» на лендинге */
export function getLandingTelegramCtaUrl(): string {
  return (
    process.env.NEXT_PUBLIC_LANDING_TELEGRAM_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPPORT_URL?.trim() ||
    "https://t.me/daria_ya5"
  );
}

/** Ссылки на оплату: ЮKassa, Robokassa, Tribute, Stripe и т.д. Пустое значение → демо-страница /pay/success */
export function getCheckoutStandardUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CHECKOUT_STANDARD_URL?.trim() || "/pay/success"
  );
}

export function getCheckoutPremiumUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CHECKOUT_PREMIUM_URL?.trim() ||
    process.env.NEXT_PUBLIC_CHECKOUT_STANDARD_URL?.trim() ||
    "/pay/success"
  );
}

export const LANDING_PRODUCT_NAME = "Точка сборки";
export const LANDING_TAGLINE =
  "Система личной эффективности и ясности";
