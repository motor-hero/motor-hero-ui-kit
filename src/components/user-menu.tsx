import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { LogOut, User } from "lucide-react"
import { type ReactNode, useState } from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { useIsDesktop } from "../hooks/use-is-desktop"
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
const sheetItemClass =
  "flex w-full cursor-pointer select-none items-center gap-3 rounded-md px-3 py-3 text-base outline-none transition-colors hover:bg-accent active:bg-accent"

export function UserMenu({
  user,
  items = [],
  onLogout,
  logoutLabel = "Sair",
  renderLink = defaultRenderLink,
  align = "end",
}: UserMenuProps) {
  const isDesktop = useIsDesktop()
  const [open, setOpen] = useState(false)
  const label = initials(user)

  const trigger = (
    <button
      type="button"
      className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-input bg-background text-xs font-semibold shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Menu do usuário"
      data-testid="user-menu"
    >
      {user?.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.name ?? user.email ?? "Avatar"}
          className="h-full w-full object-cover"
        />
      ) : label ? (
        <span>{label}</span>
      ) : (
        <User className="h-4 w-4" />
      )}
    </button>
  )

  const userInfo = (user?.name || user?.email) && (
    <div className="px-2 py-1.5">
      {user.name && (
        <p className="truncate text-sm font-medium">{user.name}</p>
      )}
      {user.email && (
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      )}
    </div>
  )

  if (isDesktop) {
    return (
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align={align}
            sideOffset={6}
            className="z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
          >
            {userInfo && (
              <>
                {userInfo}
                <DropdownMenu.Separator className="-mx-1 my-1 h-px bg-border" />
              </>
            )}

            {items.map((item) =>
              item.href ? (
                <DropdownMenu.Item key={item.label} asChild>
                  {renderLink({
                    href: item.href,
                    className: itemClass,
                    children: (
                      <>
                        {item.icon}
                        {item.label}
                      </>
                    ),
                  })}
                </DropdownMenu.Item>
              ) : (
                <DropdownMenu.Item
                  key={item.label}
                  className={itemClass}
                  onClick={item.onClick}
                >
                  {item.icon}
                  {item.label}
                </DropdownMenu.Item>
              ),
            )}

            {onLogout && (
              <>
                {items.length > 0 && (
                  <DropdownMenu.Separator className="-mx-1 my-1 h-px bg-border" />
                )}
                <DropdownMenu.Item
                  className={cn(
                    itemClass,
                    "text-destructive focus:bg-destructive/10",
                  )}
                  onClick={onLogout}
                >
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

  // Mobile: bottom sheet (Drawer)
  return (
    <DrawerPrimitive.Root open={open} onOpenChange={setOpen}>
      <DrawerPrimitive.Trigger asChild>{trigger}</DrawerPrimitive.Trigger>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DrawerPrimitive.Content className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-2xl border bg-popover p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-popover-foreground outline-none">
          <DrawerPrimitive.Title className="sr-only">
            Menu do usuário
          </DrawerPrimitive.Title>
          <div className="mx-auto my-3 h-1.5 w-12 shrink-0 rounded-full bg-muted" />
          {userInfo && (
            <>
              {userInfo}
              <div className="-mx-1 my-1 h-px bg-border" />
            </>
          )}
          {items.map((item) =>
            item.href ? (
              <span
                key={item.label}
                onClick={() => setOpen(false)}
                onKeyDown={() => setOpen(false)}
              >
                {renderLink({
                  href: item.href,
                  className: sheetItemClass,
                  children: (
                    <>
                      {item.icon}
                      {item.label}
                    </>
                  ),
                })}
              </span>
            ) : (
              <button
                key={item.label}
                type="button"
                className={sheetItemClass}
                onClick={() => {
                  item.onClick?.()
                  setOpen(false)
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ),
          )}
          {onLogout && (
            <>
              {items.length > 0 && <div className="-mx-1 my-1 h-px bg-border" />}
              <button
                type="button"
                className={cn(sheetItemClass, "text-destructive")}
                onClick={() => {
                  onLogout()
                  setOpen(false)
                }}
              >
                <LogOut className="h-4 w-4" />
                {logoutLabel}
              </button>
            </>
          )}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}
