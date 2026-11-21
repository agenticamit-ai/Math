export const pct = (x: number | null | undefined) => (x === null || x === undefined ? "–" : `${Math.round(x * 100)}%`);
export const num = (x: number | null | undefined) => (x === null || x === undefined ? "–" : String(Math.round(x)));
export const bandLabel = (b: number) => `Band ${Number.isInteger(b) ? b : b.toFixed(1)}`;
export function shortDate(d: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone }).format(d);
}
export function dateTime(d: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone }).format(d);
}
