import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { MoreVertical } from "lucide-react"
import { type ReactNode, useState } from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { useIsDesktop } from "../hooks/use-is-desktop"
import { cn } from "../lib/utils"
import type { RenderLink } from "./types"
import { defaultRenderLink } from "./types"

export interface RowAction {
  label: string
  icon?: ReactNode
  onClick?: () => void
  href?: string
  destructive?: boolean
  disabled?: boolean
}

export interface RowActionsMenuProps {
  actions: RowAction[]
  disabled?: boolean
  align?: "start" | "center" | "end"
  label?: string
  renderLink?: RenderLink
}

const triggerClass =
  "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

// Desktop: itens compactos do dropdown. Mobile: alvos de toque maiores.
const itemClass =
  "flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
const sheetItemClass =
  "flex w-full cursor-pointer select-none items-center gap-3 rounded-md px-3 py-3 text-base outline-none transition-colors hover:bg-accent active:bg-accent disabled:pointer-events-none disabled:opacity-50"

export function RowActionsMenu({
  actions,
  disabled = false,
  align = "end",
  label = "Ações",
  renderLink = defaultRenderLink,
}: RowActionsMenuProps) {
  const isDesktop = useIsDesktop()
  const [open, setOpen] = useState(false)

  if (actions.length === 0) return null

  const trigger = (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      className={triggerClass}
    >
      <MoreVertical className="h-4 w-4" />
    </button>
  )

  if (isDesktop) {
    return (
      <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align={align}
            sideOffset={6}
            className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
          >
            {actions.map((action) => {
              const cls = cn(
                itemClass,
                action.destructive &&
                "text-destructive focus:bg-destructive/10",
              )
              return action.href ? (
                <DropdownMenu.Item
                  key={action.label}
                  asChild
                  disabled={action.disabled}
                >
                  {renderLink({
                    href: action.href,
                    className: cls,
                    children: (
                      <>
                        {action.icon}
                        {action.label}
                      </>
                    ),
                  })}
                </DropdownMenu.Item>
              ) : (
                <DropdownMenu.Item
                  key={action.label}
                  className={cls}
                  disabled={action.disabled}
                  onClick={action.onClick}
                >
                  {action.icon}
                  {action.label}
                </DropdownMenu.Item>
              )
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }

  // Mobile: action sheet (Drawer)
  return (
    <DrawerPrimitive.Root open={open} onOpenChange={setOpen}>
      <DrawerPrimitive.Trigger asChild>{trigger}</DrawerPrimitive.Trigger>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DrawerPrimitive.Content className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-2xl border bg-popover p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-popover-foreground outline-none">
          <DrawerPrimitive.Title className="sr-only">
            {label}
          </DrawerPrimitive.Title>
          <div className="mx-auto my-3 h-1.5 w-12 shrink-0 rounded-full bg-muted" />
          {actions.map((action) => {
            const cls = cn(
              sheetItemClass,
              action.destructive && "text-destructive",
            )
            const inner = (
              <>
                {action.icon}
                {action.label}
              </>
            )
            return action.href ? (
              <span
                key={action.label}
                onClick={() => setOpen(false)}
                onKeyDown={() => setOpen(false)}
              >
                {renderLink({
                  href: action.href,
                  className: cls,
                  children: inner,
                })}
              </span>
            ) : (
              <button
                key={action.label}
                type="button"
                disabled={action.disabled}
                className={cls}
                onClick={() => {
                  action.onClick?.()
                  setOpen(false)
                }}
              >
                {inner}
              </button>
            )
          })}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}
