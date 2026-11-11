import type * as React from "react"

export const TIME_MASK = "__:__"
export const MASK_REPLACEMENT = { _: /\d/ }

export function pad(n: number): string {
  return String(n).padStart(2, "0")
}

export const triggerInputClass =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive"

export const triggerIconButtonClass =
  "absolute right-1 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"

export const primaryButtonClass =
  "flex h-9 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"

export const popoverContentClass =
  "pointer-events-auto z-50 w-auto overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"

export const drawerOverlayClass = "fixed inset-0 z-50 bg-black/80"

export const drawerContentClass =
  "fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[85dvh] flex-col rounded-t-2xl border bg-popover text-popover-foreground outline-none"

export const drawerHandleClass = "mx-auto my-3 h-1.5 w-12 shrink-0 rounded-full bg-muted"

/** Popover/Drawer não-modais ancorados no campo: clicar no próprio campo não
 *  conta como "fora", senão o foco no input fecharia o painel que ele abriu. */
export function ignoreTriggerInteraction(triggerRef: React.RefObject<HTMLElement | null>) {
  return (event: Event) => {
    if (triggerRef.current?.contains(event.target as Node)) event.preventDefault()
  }
}
