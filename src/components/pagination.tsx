interface PaginationProps {
  page: number
  onPageChange: (page: number) => void
  hasNextPage: boolean
  hasPreviousPage: boolean
  className?: string
}

export function Pagination({ page, onPageChange, hasNextPage, hasPreviousPage, className }: PaginationProps) {
  return (
    <div className={`flex items-center justify-end gap-4 ${className ?? ""}`}>
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
  )
}
