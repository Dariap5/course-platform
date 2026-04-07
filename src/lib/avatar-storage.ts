const KEY = "avatar_emoji";

const DEFAULT_EMOJI = "✨";

export function getAvatarEmoji(): string {
  if (typeof window === "undefined") return DEFAULT_EMOJI;
  return localStorage.getItem(KEY) ?? DEFAULT_EMOJI;
}

export function setAvatarEmoji(emoji: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, emoji);
}
