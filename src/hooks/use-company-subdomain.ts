import { useState } from "react"

export type UseCompanySubdomainOptions = {
  enableOverride?: boolean
  overrideStorageKey?: string
  /**
   * Host labels that are *not* tenants. A product whose default host carries
   * a label of its own (`app.example.com`, `admin.example.com`) must list it
   * here, or that label is read as a tenant slug and sent downstream as one.
   *
   * Added to the built-in `www`; `localhost` is always excluded structurally.
   * Case-insensitive.
   */
  reservedSubdomains?: string[]
}

export type UseCompanySubdomainResult = {
  subdomain: string | undefined
}

const ALWAYS_RESERVED = ["www", "localhost"]

/**
 * The tenant slug in a hostname, or `undefined` when there is none.
 *
 * The first label is only a tenant if it isn't reserved. Callers whose
 * default host is `app.<domain>` must pass `["app"]` (plus any sibling
 * surfaces like `admin`), otherwise visiting the default host yields the
 * literal `"app"` as if it were a customer.
 */
export function getSubdomain(
  hostname: string,
  reservedSubdomains: string[] = [],
): string | undefined {
  const labels = hostname.split(".")
  if (labels.length < 2) return undefined
  const first = labels[0]
  if (!first) return undefined
  const reserved = [...ALWAYS_RESERVED, ...reservedSubdomains].map((label) =>
    label.toLowerCase(),
  )
  if (reserved.includes(first.toLowerCase())) return undefined
  return first
}

function resolveOverride(storageKey: string): string | undefined {
  if (typeof window === "undefined") return undefined
  const params = new URLSearchParams(window.location.search)
  if (params.has("company")) {
    const value = params.get("company")
    if (value) {
      window.localStorage.setItem(storageKey, value)
      return value
    }
    window.localStorage.removeItem(storageKey)
    return undefined
  }
  return window.localStorage.getItem(storageKey) ?? undefined
}

export function useCompanySubdomain(
  opts: UseCompanySubdomainOptions = {},
): UseCompanySubdomainResult {
  const {
    enableOverride = false,
    overrideStorageKey = "company-subdomain",
    reservedSubdomains = [],
  } = opts

  const [subdomain] = useState<string | undefined>(() => {
    if (enableOverride) {
      const override = resolveOverride(overrideStorageKey)
      if (override) return override
    }
    if (typeof window === "undefined") return undefined
    return getSubdomain(window.location.hostname, reservedSubdomains)
  })

  return { subdomain }
}
