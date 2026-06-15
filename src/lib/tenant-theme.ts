export type TenantTokenSet = {
  primary?: string
  primaryForeground?: string
  secondary?: string
  secondaryForeground?: string
  accent?: string
  accentForeground?: string
  ring?: string
}

export type TenantTheme = {
  light: TenantTokenSet
  dark?: Partial<TenantTokenSet>
}

const VAR_MAP: Record<keyof TenantTokenSet, string> = {
  primary: "--color-primary",
  primaryForeground: "--color-primary-foreground",
  secondary: "--color-secondary",
  secondaryForeground: "--color-secondary-foreground",
  accent: "--color-accent",
  accentForeground: "--color-accent-foreground",
  ring: "--color-ring",
}

export function applyTenantTheme(
  root: HTMLElement,
  tenantTheme: TenantTheme | undefined,
  mode: "light" | "dark"
) {
  const tokens: TenantTokenSet = tenantTheme
    ? mode === "dark"
      ? { ...tenantTheme.light, ...tenantTheme.dark }
      : tenantTheme.light
    : {}

  for (const key of Object.keys(VAR_MAP) as (keyof TenantTokenSet)[]) {
    const value = tokens[key]
    if (value) root.style.setProperty(VAR_MAP[key], value)
    else root.style.removeProperty(VAR_MAP[key])
  }
}
