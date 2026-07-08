export interface PaginationProps {
  page: number
  onPageChange: (page: number) => void
  hasNextPage: boolean
  hasPreviousPage: boolean
  /** Total de páginas. Quando informado, o rótulo vira "Página {page} de {totalPages}". */
  totalPages?: number
  /** Exibe o seletor de itens por página. Use com `pageSize`, `onPageSizeChange` e `pageSizeOptions`. */
  showPageSizeSelector?: boolean
  pageSize?: number
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
  className?: string
}

const navButtonClass =
  "inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50"

export function Pagination({
  page,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
  totalPages,
  showPageSizeSelector = false,
  pageSize,
  onPageSizeChange,
  pageSizeOptions,
  className,
}: PaginationProps) {
  return (
    <div
      className={`flex items-center ${showPageSizeSelector ? "justify-between" : "justify-end"} gap-4 ${className ?? ""}`}
    >
      {showPageSizeSelector && (
        <div className="flex items-center gap-2">
          <label htmlFor="pagination-page-size" className="text-sm text-muted-foreground">
            Itens por página
          </label>
          <select
            id="pagination-page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            className="h-8 rounded-md border border-input bg-background px-2 text-xs font-medium shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
          >
            {(pageSizeOptions ?? []).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPreviousPage}
          className={navButtonClass}
        >
          Anterior
        </button>
        <span className="text-sm text-muted-foreground">
          Página {page}
          {totalPages ? ` de ${totalPages}` : ""}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          className={navButtonClass}
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
