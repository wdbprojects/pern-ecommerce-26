import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (cents: number, currency: string) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: (currency ?? "usd").toUpperCase(),
  }).format(cents / 100);
};

export const formatOrderWhen = (
  iso: string,
  opts: Intl.DateTimeFormatOptions = {},
) => {
  const { dateStyle = "medium" } = opts;
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: dateStyle,
    timeStyle: "short",
  }).format(date);
};
