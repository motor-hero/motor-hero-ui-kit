import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { MoreVertical } from "lucide-react"
import type { ReactNode } from "react"
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

const itemClass =
  "flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50"

export function RowActionsMenu({
  actions,
  disabled = false,
  align = "end",
  label = "Ações",
  renderLink = defaultRenderLink,
}: RowActionsMenuProps) {
  if (actions.length === 0) return null

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          aria-label={label}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          sideOffset={6}
          className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
        >
          {actions.map((action) => {
            const cls = cn(itemClass, action.destructive && "text-destructive focus:bg-destructive/10")
            return action.href ? (
              <DropdownMenu.Item key={action.label} asChild disabled={action.disabled}>
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
