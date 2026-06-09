import { Fragment, type ReactNode } from "react"
import { cn } from "../lib/utils"
import type { RenderLink } from "./types"
import { defaultRenderLink } from "./types"

export interface NavItem {
  label: string
  href: string
  icon?: ReactNode
  adminOnly?: boolean
}

export interface SidebarNavProps {
  items: NavItem[]
  activePath: string
  isActive?: (item: NavItem, activePath: string) => boolean
  isAdmin?: boolean
  isCollapsed?: boolean
  renderLink?: RenderLink
  onNavigate?: () => void
}

function defaultIsActive(item: NavItem, activePath: string): boolean {
  if (item.href === "/") return activePath === "/"
  return activePath === item.href || activePath.startsWith(item.href + "/")
}

export function SidebarNav({
  items,
  activePath,
  isActive = defaultIsActive,
  isAdmin = false,
  isCollapsed = false,
  renderLink = defaultRenderLink,
  onNavigate,
}: SidebarNavProps) {
  const visible = items.filter((item) => !item.adminOnly || isAdmin)

  return (
    <nav className="flex flex-col gap-1">
      {visible.map((item) => {
        const active = isActive(item, activePath)
        const link = renderLink({
          href: item.href,
          onClick: onNavigate,
          title: isCollapsed ? item.label : undefined,
          "aria-current": active ? "page" : undefined,
          className: cn(
            "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            active
              ? "bg-accent text-accent-foreground font-semibold"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            isCollapsed && "justify-center px-2",
          ),
          children: (
            <>
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </>
          ),
        })
        return <Fragment key={item.href}>{link}</Fragment>
      })}
    </nav>
  )
}
