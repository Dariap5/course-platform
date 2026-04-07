/** Telegram для CTA «Написать Даше» на лендинге */
export function getLandingTelegramCtaUrl(): string {
  return (
    process.env.NEXT_PUBLIC_LANDING_TELEGRAM_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPPORT_URL?.trim() ||
    "https://t.me/daria_ya5"
  );
}

/**
 * Ссылка на реальную оплату (ЮKassa, Robokassa, Tribute…).
 * Пустая строка = в интерфейсе показываем Telegram и ввод кода, без «фейковой» оплаты.
 */
export function getCheckoutStandardUrl(): string {
  return process.env.NEXT_PUBLIC_CHECKOUT_STANDARD_URL?.trim() ?? "";
}

export function getCheckoutPremiumUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CHECKOUT_PREMIUM_URL?.trim() ||
    process.env.NEXT_PUBLIC_CHECKOUT_STANDARD_URL?.trim() ||
    ""
  );
}

export const LANDING_PRODUCT_NAME = "Точка сборки";
export const LANDING_TAGLINE =
  "Система личной эффективности и ясности";
