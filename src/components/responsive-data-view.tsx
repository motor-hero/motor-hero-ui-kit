import type { ReactNode } from "react"

interface ResponsiveDataViewProps {
  table: ReactNode
  cards: ReactNode
  isEmpty: boolean
  isLoading: boolean
  emptyIcon?: ReactNode
  emptyTitle?: string
  emptyDescription?: string
  pagination?: ReactNode
}

export function ResponsiveDataView({
  table, cards, isEmpty, isLoading, emptyIcon, emptyTitle = "Nenhum registro encontrado", emptyDescription, pagination,
}: ResponsiveDataViewProps) {
  return (
    <div className="space-y-4">
      <div className="hidden overflow-x-auto rounded-md border md:block">{table}</div>
      <div className="md:hidden">{cards}</div>
      {!isLoading && isEmpty && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          {emptyIcon && <div className="mb-4 text-muted-foreground">{emptyIcon}</div>}
          <h3 className="text-lg font-semibold tracking-tight">{emptyTitle}</h3>
          {emptyDescription && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{emptyDescription}</p>}
        </div>
      )}
      {pagination}
    </div>
  )
}
