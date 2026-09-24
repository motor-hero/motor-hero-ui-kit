import type { ReactNode } from "react"
import { EmptyState } from "./empty-state"

import { cn } from "../lib/utils"

interface ResponsiveDataViewProps {
  table: ReactNode
  cards: ReactNode
  isEmpty: boolean
  isLoading: boolean
  /**
   * Dados desatualizados na tela enquanto um refetch está em voo (ex.:
   * `isPlaceholderData` do TanStack Query). Esmaece e bloqueia a interação
   * com table/cards; a paginação continua clicável.
   */
  isBusy?: boolean
  emptyIcon?: ReactNode
  emptyTitle?: string
  emptyDescription?: string
  /** CTA do estado vazio — normalmente o mesmo botão "Adicionar X" da página. */
  emptyAction?: ReactNode
  pagination?: ReactNode
  /**
   * A partir de qual largura a tabela substitui os cards. Padrão `md`. Use
   * `lg`/`xl` quando a tabela tem colunas demais para caber ao lado da barra
   * lateral num tablet — os cards leem melhor do que uma tabela rolando de lado.
   */
  breakpoint?: ResponsiveDataViewBreakpoint
}

export type ResponsiveDataViewBreakpoint = "md" | "lg" | "xl"

// Classes literais: o Tailwind do consumidor só gera o que encontra escrito.
const BREAKPOINT_CLASSES: Record<
  ResponsiveDataViewBreakpoint,
  { table: string; cards: string }
> = {
  md: { table: "md:block", cards: "md:hidden" },
  lg: { table: "lg:block", cards: "lg:hidden" },
  xl: { table: "xl:block", cards: "xl:hidden" },
}

export function ResponsiveDataView({
  table,
  cards,
  isEmpty,
  isLoading,
  isBusy = false,
  emptyIcon,
  emptyTitle = "Nenhum registro encontrado",
  emptyDescription,
  emptyAction,
  pagination,
  breakpoint = "md",
}: ResponsiveDataViewProps) {
  // Lista vazia mostra só o EmptyState. Antes renderizava a caixa com o
  // cabeçalho da tabela vazio, o bloco de texto por fora dela e a paginação
  // desabilitada — três blocos empilhados para zero registro.
  if (!isLoading && !isBusy && isEmpty) {
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

  const busyClass = isBusy && "pointer-events-none opacity-50"
  const visibility = BREAKPOINT_CLASSES[breakpoint]
  return (
    <div className="space-y-4">
      <div
        aria-busy={isBusy}
        className={cn(
          "hidden overflow-x-auto rounded-md border transition-opacity",
          visibility.table,
          busyClass,
        )}
      >
        {table}
      </div>
      <div aria-busy={isBusy} className={cn("transition-opacity", visibility.cards, busyClass)}>
        {cards}
      </div>
      {pagination}
    </div>
  )
}
