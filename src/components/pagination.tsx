import { useId, useState } from "react"

interface PaginationBaseProps {
  page: number
  onPageChange: (page: number) => void
  hasNextPage: boolean
  hasPreviousPage: boolean
  /** Exibe o seletor de itens por página. Use com `pageSize`, `onPageSizeChange` e `pageSizeOptions`. */
  showPageSizeSelector?: boolean
  pageSize?: number
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
  className?: string
}

type PageJumpProps =
  | {
      /** Total de páginas. Quando informado, o rótulo vira "Página {page} de {totalPages}". */
      totalPages?: number
      showPageJump?: false
    }
  | {
      totalPages: number
      /** Torna o número da página editável para pular direto a uma página. Exige `totalPages`. */
      showPageJump: true
    }

export type PaginationProps = PaginationBaseProps & PageJumpProps

// `max-sm:h-10`: alvo de toque de 40px no celular; o desktop segue em 32px.
const navButtonClass =
  "inline-flex h-8 max-sm:h-10 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50"

export function Pagination({
  page,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
  totalPages,
  showPageJump = false,
  showPageSizeSelector = false,
  pageSize,
  onPageSizeChange,
  pageSizeOptions,
  className,
}: PaginationProps) {
  return (
    <div
      // Quebra em vez de empurrar: num celular de 360px os dois grupos não
      // cabem na mesma linha e o "Próximo" saía da área visível, com a lista
      // inteira rolando de lado atrás dele.
      className={`flex flex-wrap items-center ${showPageSizeSelector ? "justify-between" : "justify-end"} gap-x-4 gap-y-2 ${className ?? ""}`}
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
            className="h-8 max-sm:h-10 rounded-md border border-input bg-background px-2 text-xs font-medium shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
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
        {showPageJump && totalPages !== undefined ? (
          <PageJumpInput page={page} totalPages={totalPages} onPageChange={onPageChange} />
        ) : (
          <span className="text-sm text-muted-foreground">
            Página {page}
            {totalPages ? ` de ${totalPages}` : ""}
          </span>
        )}
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

interface PageJumpInputProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

function PageJumpInput({ page, totalPages, onPageChange }: PageJumpInputProps) {
  const inputId = useId()
  // `null` = sem edição em andamento; o campo mostra a página atual.
  const [draft, setDraft] = useState<string | null>(null)
  const [prevPage, setPrevPage] = useState(page)
  if (page !== prevPage) {
    setPrevPage(page)
    setDraft(null)
  }

  // Enter e blur confirmam; valores fora do intervalo são ajustados em silêncio.
  const commit = () => {
    if (draft === null) return
    setDraft(null)
    if (draft === "") return
    const target = Math.max(1, Math.min(Number(draft), totalPages))
    if (target !== page) onPageChange(target)
  }

  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground">
      <label htmlFor={inputId} className="max-sm:sr-only">
        Página
      </label>
      <input
        id={inputId}
        type="text"
        inputMode="numeric"
        enterKeyHint="go"
        autoComplete="off"
        aria-label="Ir para a página"
        value={draft ?? String(page)}
        onChange={(e) => setDraft(e.target.value.replace(/\D/g, ""))}
        onFocus={(e) => e.target.select()}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit()
          else if (e.key === "Escape") setDraft(null)
        }}
        style={{ width: `${String(totalPages).length + 3}ch` }}
        className="h-8 max-sm:h-10 rounded-md border border-input bg-background px-1.5 text-center text-xs font-medium tabular-nums text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
      <span>de {totalPages}</span>
    </span>
  )
}
