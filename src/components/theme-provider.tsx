import { createContext, useContext, useEffect, useState } from "react"
import { applyTenantTheme, type TenantTheme } from "../lib/tenant-theme"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  tenantTheme?: TenantTheme
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  tenantTheme,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    const applyResolved = (resolved: "light" | "dark") => {
      root.classList.remove("light", "dark")
      root.classList.add(resolved)
      applyTenantTheme(root, tenantTheme, resolved)
    }

    if (theme === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)")
      applyResolved(mql.matches ? "dark" : "light")
      const onChange = (e: MediaQueryListEvent) =>
        applyResolved(e.matches ? "dark" : "light")
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    }

    applyResolved(theme)
  }, [theme, tenantTheme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export type { Theme, ThemeProviderProps, ThemeProviderState }
