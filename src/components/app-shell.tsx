import { ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { type ReactNode, useState } from "react"
import { cn } from "../lib/utils"
import { SidebarNav, type NavItem } from "./sidebar-nav"
import type { RenderLink } from "./types"
import { defaultRenderLink } from "./types"
import { UserMenu, type AppUser, type UserMenuItem } from "./user-menu"

export interface AppShellProps {
  brand: ReactNode
  brandCollapsed?: ReactNode
  navItems: NavItem[]
  activePath: string
  isActive?: (item: NavItem, activePath: string) => boolean
  isAdmin?: boolean
  user?: AppUser
  userMenuItems?: UserMenuItem[]
  onLogout?: () => void
  renderLink?: RenderLink
  headerActions?: ReactNode
  collapsible?: boolean
  defaultCollapsed?: boolean
  children: ReactNode
}

export function AppShell({
  brand,
  brandCollapsed,
  navItems,
  activePath,
  isActive,
  isAdmin = false,
  user,
  userMenuItems,
  onLogout,
  renderLink = defaultRenderLink,
  headerActions,
  collapsible = true,
  defaultCollapsed = false,
  children,
}: AppShellProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [mobileOpen, setMobileOpen] = useState(false)

  const nav = (isCollapsed: boolean, onNavigate?: () => void) => (
    <SidebarNav
      items={navItems}
      activePath={activePath}
      isActive={isActive}
      isAdmin={isAdmin}
      isCollapsed={isCollapsed}
      renderLink={renderLink}
      onNavigate={onNavigate}
    />
  )

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-r bg-card transition-all duration-300 md:flex",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <div className="flex h-14 shrink-0 items-center border-b px-4">
          {collapsed ? (brandCollapsed ?? brand) : brand}
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-4">{nav(collapsed)}</div>
        {collapsible && (
          <div className="border-t p-2">
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              className="flex w-full items-center justify-center rounded-md px-2 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
        )}
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 transition-opacity duration-300 md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div
          className={cn(
            "absolute left-0 top-0 flex h-full w-64 flex-col border-r bg-card transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-14 shrink-0 items-center border-b px-4">{brand}</div>
          <div className="flex-1 overflow-y-auto px-2 py-4">{nav(false, () => setMobileOpen(false))}</div>
        </div>
      </div>

      {/* Main column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground md:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="ml-auto flex items-center gap-2">
            {headerActions}
            {(user || onLogout) && (
              <UserMenu user={user} items={userMenuItems} onLogout={onLogout} renderLink={renderLink} />
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
