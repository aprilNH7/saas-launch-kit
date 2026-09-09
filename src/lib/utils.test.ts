import { describe, it, expect } from "vitest"
import {
  cn,
  formatCurrency,
  formatNumber,
  formatDate,
  generateSlug,
  truncate,
  generateApiKey,
} from "./utils"

describe("cn", () => {
  it("merges tailwind classes correctly", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4")
  })

  it("resolves conflicting classes", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500")
  })
})

describe("formatCurrency", () => {
  it("formats USD by default", () => {
    expect(formatCurrency(1000)).toBe("$1,000")
  })

  it("supports other currencies", () => {
    expect(formatCurrency(500, "EUR")).toBe("€500")
  })
})

describe("formatNumber", () => {
  it("compacts large numbers", () => {
    expect(formatNumber(1500)).toBe("1.5K")
    expect(formatNumber(1_000_000)).toBe("1M")
  })
})

describe("formatDate", () => {
  it("formats a date string", () => {
    expect(formatDate("2025-01-15")).toContain("Jan")
    expect(formatDate("2025-01-15")).toContain("2025")
  })
})

describe("generateSlug", () => {
  it("converts text to a url-safe slug", () => {
    expect(generateSlug("Hello World")).toBe("hello-world")
  })

  it("trims leading and trailing separators", () => {
    expect(generateSlug("--Hello World--")).toBe("hello-world")
  })
})

describe("truncate", () => {
  it("does not modify short strings", () => {
    expect(truncate("short", 100)).toBe("short")
  })

  it("truncates long strings with ellipsis", () => {
    expect(truncate("longer text", 5)).toBe("longe...")
  })
})

describe("generateApiKey", () => {
  it("returns a key with the expected prefix and length", () => {
    const key = generateApiKey()
    expect(key.startsWith("sk_live_")).toBe(true)
    expect(key.length).toBe(40) // 8 char prefix + 32 random chars
  })
})
