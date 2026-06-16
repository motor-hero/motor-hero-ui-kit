import { useState } from "react"

export type UseCompanySubdomainOptions = {
  enableOverride?: boolean
  overrideStorageKey?: string
}

export type UseCompanySubdomainResult = {
  subdomain: string | undefined
}

export function getSubdomain(hostname: string): string | undefined {
  const labels = hostname.split(".")
  if (labels.length < 2) return undefined
  const first = labels[0]
  if (!first || first === "www" || first === "localhost") return undefined
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
  const { enableOverride = false, overrideStorageKey = "company-subdomain" } =
    opts

  const [subdomain] = useState<string | undefined>(() => {
    if (enableOverride) {
      const override = resolveOverride(overrideStorageKey)
      if (override) return override
    }
    if (typeof window === "undefined") return undefined
    return getSubdomain(window.location.hostname)
  })

  return { subdomain }
}
