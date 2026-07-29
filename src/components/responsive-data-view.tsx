import type { ReactNode } from "react"
import { EmptyState } from "./empty-state"

interface ResponsiveDataViewProps {
  table: ReactNode
  cards: ReactNode
  isEmpty: boolean
  isLoading: boolean
  emptyIcon?: ReactNode
  emptyTitle?: string
  emptyDescription?: string
  /** CTA do estado vazio — normalmente o mesmo botão "Adicionar X" da página. */
  emptyAction?: ReactNode
  pagination?: ReactNode
}

export function ResponsiveDataView({
  table,
  cards,
  isEmpty,
  isLoading,
  emptyIcon,
  emptyTitle = "Nenhum registro encontrado",
  emptyDescription,
  emptyAction,
  pagination,
}: ResponsiveDataViewProps) {
  // Lista vazia mostra só o EmptyState. Antes renderizava a caixa com o
  // cabeçalho da tabela vazio, o bloco de texto por fora dela e a paginação
  // desabilitada — três blocos empilhados para zero registro.
  if (!isLoading && isEmpty) {
    return (
      <div className="rounded-md border">
        <EmptyState
          icon={emptyIcon}
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="hidden overflow-x-auto rounded-md border md:block">
        {table}
      </div>
      <div className="md:hidden">{cards}</div>
      {pagination}
    </div>
  )
}
