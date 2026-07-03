import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import * as React from "react"
import type { ReactNode } from "react"

import { useIsDesktop } from "../hooks/use-is-desktop"
import { cn } from "../lib/utils"

const sizeClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
  "6xl": "sm:max-w-6xl",
  "7xl": "sm:max-w-7xl",
} as const

export type BaseDialogSize = keyof typeof sizeClasses

export interface BaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: ReactNode
  children: ReactNode
  footer?: ReactNode
  size?: BaseDialogSize
  className?: string
  /**
   * Radix `modal` for the underlying Dialog. Defaults to `!isDesktop`: on
   * desktop the dialog is non-modal so a Combobox/Select popover (portaled
   * outside the dialog) can receive focus and keystrokes; on mobile it stays
   * modal so the bottom-sheet behaves. Pass explicitly to override.
   */
  modal?: boolean
  /**
   * Applies backdrop-blur to the overlay behind the dialog.
   * Defaults to true; pass false to keep the plain scrim.
   */
  blurBackdrop?: boolean
  /**
   * Extra classes appended to the backdrop/overlay. Use it to tune the scrim
   * per dialog, e.g. `bg-black/40` for a lighter tint or `bg-transparent` to
   * drop the darkening and keep only the blur. Wins over the default via
   * tailwind-merge.
   */
  backdropClassName?: string
  /**
   * Advanced: wraps the dialog's inner content (header + body + footer) inside
   * Content. Used by FormDialog to inject a <form>. Defaults to identity.
   */
  contentWrapper?: (content: ReactNode) => ReactNode
}

/**
 * Standardized, responsive dialog shell:
 * - mobile: bottom sheet (full width, up to 92vh tall)
 * - desktop: centered dialog (up to 90vh tall)
 * Header and footer stay fixed; only the body scrolls.
 *
 * Also fixes the known Radix bug where `body { pointer-events: none }`
 * can persist after closing a dialog that contained a Select/Popover,
 * which would otherwise make the rest of the page unclickable.
 */
export function BaseDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "lg",
  className,
  modal,
  blurBackdrop = true,
  backdropClassName,
  contentWrapper = (content) => content,
}: BaseDialogProps) {
  const isDesktop = useIsDesktop()
  React.useEffect(() => {
    if (open) return
    const id = window.setTimeout(() => {
      if (document.body.style.pointerEvents === "none") {
        document.body.style.pointerEvents = ""
      }
    }, 0)
    return () => window.clearTimeout(id)
  }, [open])

  const body = (
    <>
      <div className="flex shrink-0 items-start justify-between gap-4 border-b px-6 py-3">
        <div className="min-w-0 space-y-1">
          <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
            {title}
          </Dialog.Title>
          {description && (
            <Dialog.Description className="text-sm text-muted-foreground">
              {description}
            </Dialog.Description>
          )}
        </div>
        <Dialog.Close
          className="-mr-1 shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </Dialog.Close>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">{children}</div>
      {footer && (
        <div className="flex shrink-0 flex-col-reverse gap-2 border-t px-6 py-3 sm:flex-row sm:justify-end">
          {footer}
        </div>
      )}
    </>
  )

  const isModal = modal ?? !isDesktop

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal={isModal}>
      <Dialog.Portal>
        {isModal ? (
          <Dialog.Overlay
            className={cn(
              "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              blurBackdrop && "backdrop-blur-sm",
              backdropClassName,
            )}
          />
        ) : (
          // Radix skips Dialog.Overlay when non-modal, so the backdrop is
          // rendered by hand; pointer-events-none keeps outside interactions
          // working (the reason the dialog is non-modal on desktop).
          (blurBackdrop || backdropClassName) && (
            <div
              aria-hidden
              className={cn(
                "pointer-events-none fixed inset-0 z-50 bg-black/50 animate-in fade-in-0",
                blurBackdrop && "backdrop-blur-sm",
                backdropClassName,
              )}
            />
          )
        )}
        <Dialog.Content
          onCloseAutoFocus={() => {
            document.body.style.pointerEvents = ""
          }}
          className={cn(
            "fixed z-50 flex max-h-[92vh] flex-col bg-background shadow-lg outline-none",
            "inset-x-0 bottom-0 rounded-t-2xl",
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[92vh] sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            sizeClasses[size],
            className,
          )}
        >
          {contentWrapper(body)}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
