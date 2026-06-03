import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { LogOut, User } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "../lib/utils"
import type { RenderLink } from "./types"
import { defaultRenderLink } from "./types"

export interface AppUser {
  name?: string
  email?: string
  avatarUrl?: string
}

export interface UserMenuItem {
  label: string
  icon?: ReactNode
  href?: string
  onClick?: () => void
}

export interface UserMenuProps {
  user?: AppUser
  items?: UserMenuItem[]
  onLogout?: () => void
  logoutLabel?: string
  renderLink?: RenderLink
  align?: "start" | "center" | "end"
}

function initials(user?: AppUser): string {
  const source = user?.name?.trim() || user?.email?.trim()
  if (!source) return ""
  const parts = source.split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return source.slice(0, 2).toUpperCase()
}

const itemClass =
  "flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent"

export function UserMenu({
  user,
  items = [],
  onLogout,
  logoutLabel = "Sair",
  renderLink = defaultRenderLink,
  align = "end",
}: UserMenuProps) {
  const label = initials(user)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-input bg-background text-xs font-semibold shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          aria-label="Menu do usuário"
          data-testid="user-menu"
        >
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name ?? user.email ?? "Avatar"} className="h-full w-full object-cover" />
          ) : label ? (
            <span>{label}</span>
          ) : (
            <User className="h-4 w-4" />
          )}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          sideOffset={6}
          className="z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
        >
          {(user?.name || user?.email) && (
            <>
              <div className="px-2 py-1.5">
                {user.name && <p className="truncate text-sm font-medium">{user.name}</p>}
                {user.email && <p className="truncate text-xs text-muted-foreground">{user.email}</p>}
              </div>
              <DropdownMenu.Separator className="-mx-1 my-1 h-px bg-border" />
            </>
          )}

          {items.map((item) =>
            item.href ? (
              <DropdownMenu.Item key={item.label} asChild>
                {renderLink({ href: item.href, className: itemClass, children: (
                  <>
                    {item.icon}
                    {item.label}
                  </>
                ) })}
              </DropdownMenu.Item>
            ) : (
              <DropdownMenu.Item key={item.label} className={itemClass} onClick={item.onClick}>
                {item.icon}
                {item.label}
              </DropdownMenu.Item>
            ),
          )}

          {onLogout && (
            <>
              {items.length > 0 && <DropdownMenu.Separator className="-mx-1 my-1 h-px bg-border" />}
              <DropdownMenu.Item className={cn(itemClass, "text-destructive focus:bg-destructive/10")} onClick={onLogout}>
                <LogOut className="h-4 w-4" />
                {logoutLabel}
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
