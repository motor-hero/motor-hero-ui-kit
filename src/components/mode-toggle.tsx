import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          aria-label="Alternar tema"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute inset-0 m-auto h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
        >
          <DropdownMenu.Item
            className="flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent"
            onClick={() => setTheme("light")}
          >
            <Sun className="h-4 w-4" /> Claro
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent"
            onClick={() => setTheme("dark")}
          >
            <Moon className="h-4 w-4" /> Escuro
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent"
            onClick={() => setTheme("system")}
          >
            <Monitor className="h-4 w-4" /> Sistema
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
