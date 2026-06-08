import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import * as React from "react"
import type { ReactNode } from "react"

import { cn } from "../lib/utils"

interface FormDialogLayoutProps {
  title: string
  children: ReactNode
  onSubmit: (e: React.FormEvent) => void
  submitLabel?: string
  cancelLabel?: string
  onCancel: () => void
  isSubmitting?: boolean
  isDisabled?: boolean
}

export function FormDialogLayout({
  title,
  children,
  onSubmit,
  submitLabel = "Salvar",
  cancelLabel = "Cancelar",
  onCancel,
  isSubmitting = false,
  isDisabled = false,
}: FormDialogLayoutProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>
      </div>
      <div className="space-y-4 py-4">{children}</div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50"
        >
          {cancelLabel}
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isDisabled}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 cursor-pointer disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  )
}

const sizeClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
} as const

export type FormDialogSize = keyof typeof sizeClasses

interface FormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: ReactNode
  children: ReactNode
  footer?: ReactNode
  /** When provided, the dialog renders a <form> wrapping body + footer. */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  size?: FormDialogSize
  className?: string
}

/**
 * Standardized, responsive modal:
 * - mobile: bottom sheet (full width, up to 92vh tall)
 * - desktop: centered dialog (up to 90vh tall)
 * Header and footer stay fixed; only the body scrolls.
 *
 * Also fixes the known Radix bug where `body { pointer-events: none }`
 * can persist after closing a dialog that contained a Select/Popover,
 * which would otherwise make the rest of the page unclickable.
 */
export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  onSubmit,
  size = "lg",
  className,
}: FormDialogProps) {
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
      <div className="flex shrink-0 items-start justify-between gap-4 border-b px-6 py-4">
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
        <div className="flex shrink-0 flex-col-reverse gap-2 border-t px-6 py-4 sm:flex-row sm:justify-end">
          {footer}
        </div>
      )}
    </>
  )

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          onCloseAutoFocus={() => {
            document.body.style.pointerEvents = ""
          }}
          className={cn(
            "fixed z-50 flex max-h-[92vh] flex-col bg-background shadow-lg outline-none",
            "inset-x-0 bottom-0 rounded-t-2xl",
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[90vh] sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            sizeClasses[size],
            className,
          )}
        >
          {onSubmit ? (
            <form
              onSubmit={onSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              {body}
            </form>
          ) : (
            body
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
