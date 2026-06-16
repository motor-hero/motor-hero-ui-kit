export type CompanyThemeTokens = {
  primary?: string | null
  primaryForeground?: string | null
  secondary?: string | null
  secondaryForeground?: string | null
  accent?: string | null
  accentForeground?: string | null
  ring?: string | null
}

export type CompanyTheme = {
  light: CompanyThemeTokens
  dark?: Partial<CompanyThemeTokens>
}

const VAR_MAP: Record<keyof CompanyThemeTokens, string> = {
  primary: "--color-primary",
  primaryForeground: "--color-primary-foreground",
  secondary: "--color-secondary",
  secondaryForeground: "--color-secondary-foreground",
  accent: "--color-accent",
  accentForeground: "--color-accent-foreground",
  ring: "--color-ring",
}

// A dark token that is null/undefined means "no override" — inherit the light
// value. The API serializes unset *_dark columns as explicit null, so spreading
// the raw dark object would clobber the inherited light values; strip them first.
function definedTokens(
  tokens: Partial<CompanyThemeTokens> | undefined
): Partial<CompanyThemeTokens> {
  if (!tokens) return {}
  return Object.fromEntries(
    Object.entries(tokens).filter(([, value]) => value != null)
  )
}

export function applyCompanyTheme(
  root: HTMLElement,
  companyTheme: CompanyTheme | undefined,
  mode: "light" | "dark"
) {
  const tokens: CompanyThemeTokens = companyTheme
    ? mode === "dark"
      ? { ...companyTheme.light, ...definedTokens(companyTheme.dark) }
      : companyTheme.light
    : {}

  for (const key of Object.keys(VAR_MAP) as (keyof CompanyThemeTokens)[]) {
    const value = tokens[key]
    if (value) root.style.setProperty(VAR_MAP[key], value)
    else root.style.removeProperty(VAR_MAP[key])
  }
}
