import { type MouseEvent, type ReactNode, type TouchEvent, useRef } from "react"

interface MobileCardListProps<T> {
  data: T[]
  renderCard: (item: T, index: number) => ReactNode
  keyExtractor: (item: T) => string
  isLoading?: boolean
  loadingCount?: number
  className?: string
}

// Movimento (px) acima do qual o gesto é tratado como scroll, não tap.
const SCROLL_THRESHOLD = 8

export function MobileCardList<T>({
  data,
  renderCard,
  keyExtractor,
  isLoading = false,
  loadingCount = 5,
  className,
}: MobileCardListProps<T>) {
  // Guard contra tap acidental durante o scroll: se o dedo se moveu além do
  // threshold, o clique seguinte (ex.: botão de ações dentro do card) é
  // cancelado na fase de captura, antes de chegar no elemento interativo.
  const start = useRef<{ x: number; y: number } | null>(null)
  const scrolled = useRef(false)

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0]
    start.current = { x: t.clientX, y: t.clientY }
    scrolled.current = false
  }

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!start.current) return
    const t = e.touches[0]
    if (
      Math.abs(t.clientX - start.current.x) > SCROLL_THRESHOLD ||
      Math.abs(t.clientY - start.current.y) > SCROLL_THRESHOLD
    ) {
      scrolled.current = true
    }
  }

  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (scrolled.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  if (isLoading) {
    return (
      <div className={`space-y-3 ${className ?? ""}`}>
        {Array.from({ length: loadingCount }).map((_, i) => (
          <div key={i} className="rounded-xl border p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-5 w-32 animate-pulse rounded bg-muted" />
                <div className="h-5 w-16 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-4 w-48 animate-pulse rounded bg-muted" />
              <div className="flex justify-between">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className={`space-y-3 ${className ?? ""}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onClickCapture={onClickCapture}
    >
      {data.map((item, index) => (
        <div
          key={keyExtractor(item)}
          className="rounded-xl border p-4 transition-all duration-150 hover:border-foreground/20 active:scale-[0.99]"
        >
          {renderCard(item, index)}
        </div>
      ))}
    </div>
  )
}
