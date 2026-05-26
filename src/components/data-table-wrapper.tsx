import type { ReactNode } from "react"

interface DataTableWrapperProps {
  children: ReactNode
  isEmpty: boolean
  isLoading: boolean
  emptyIcon?: ReactNode
  emptyTitle?: string
  emptyDescription?: string
  page?: number
  onPageChange?: (page: number) => void
  hasNextPage?: boolean
  hasPreviousPage?: boolean
}

export function DataTableWrapper({
  children,
  isEmpty,
  isLoading,
  emptyIcon,
  emptyTitle = "Nenhum registro encontrado",
  emptyDescription,
  page,
  onPageChange,
  hasNextPage = false,
  hasPreviousPage = false,
}: DataTableWrapperProps) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-md border">{children}</div>

      {!isLoading && isEmpty && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          {emptyIcon && <div className="mb-4 text-muted-foreground">{emptyIcon}</div>}
          <h3 className="text-lg font-semibold tracking-tight">{emptyTitle}</h3>
          {emptyDescription && (
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">{emptyDescription}</p>
          )}
        </div>
      )}

      {page !== undefined && onPageChange && (
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPreviousPage}
            className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm text-muted-foreground">Página {page}</span>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNextPage}
            className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  )
}
