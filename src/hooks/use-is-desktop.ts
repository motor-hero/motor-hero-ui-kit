import * as React from "react"

const DESKTOP_QUERY = "(min-width: 640px)"

/**
 * Retorna `true` no desktop (>= 640px, breakpoint `sm`) e `false` no mobile.
 * Usado para alternar Popover/DropdownMenu (desktop) por Drawer/bottom sheet
 * (mobile) em componentes responsivos como Combobox e os menus de ação.
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = React.useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(DESKTOP_QUERY).matches
      : true,
  )

  React.useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => setIsDesktop(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isDesktop
}
