import * as React from "react"
import type { ReactNode } from "react"

import { BaseDialog, type BaseDialogProps, type BaseDialogSize } from "./base-dialog"

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

export type FormDialogSize = BaseDialogSize

export interface FormDialogProps extends Omit<BaseDialogProps, "contentWrapper"> {
  /** When provided, the dialog renders a <form> wrapping body + footer. */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

/**
 * Form-oriented specialization of {@link BaseDialog}: when `onSubmit` is
 * provided, the body and footer are wrapped in a <form> (so footer submit
 * buttons and Enter trigger submission). Without `onSubmit` it behaves like a
 * plain BaseDialog.
 */
export function FormDialog({ onSubmit, ...rest }: FormDialogProps) {
  return (
    <BaseDialog
      {...rest}
      contentWrapper={
        onSubmit
          ? (content) => (
              <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
                {content}
              </form>
            )
          : undefined
      }
    />
  )
}
