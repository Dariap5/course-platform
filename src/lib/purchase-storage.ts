const KEY = "course_paid";

export function hasPurchased(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "true";
}

export function setPurchased(value = true): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, value ? "true" : "false");
}
