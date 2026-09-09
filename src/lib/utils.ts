import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind CSS classes with `clsx` and resolve conflicts with `tailwind-merge`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as a currency string.
 * Defaults to USD with no fractional digits.
 */
export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format a large number using compact notation (e.g. 1.5K, 1M).
 */
export function formatNumber(num: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(num)
}

/**
 * Format a date or date string as a human-readable string.
 */
export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

/**
 * Return a relative time string (e.g. "2h ago", "Just now").
 */
export function formatRelativeTime(date: Date | string) {
  const now = new Date()
  const then = new Date(date)
  const diff = now.getTime() - then.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 7) return formatDate(date)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return "Just now"
}

/**
 * Convert a string into a URL-friendly slug.
 */
export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/**
 * Truncate a string to a maximum length, appending an ellipsis when truncated.
 */
export function truncate(str: string, length: number) {
  return str.length > length ? str.slice(0, length) + "..." : str
}

/**
 * Generate a random API key with a `sk_live_` prefix.
 */
export function generateApiKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const prefix = "sk_live_"
  let key = prefix
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return key
}

export const APP_VERSION = "2.0.1"
