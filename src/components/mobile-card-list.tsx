import type { ReactNode } from "react"

interface MobileCardListProps<T> {
  data: T[]
  renderCard: (item: T, index: number) => ReactNode
  keyExtractor: (item: T) => string
  isLoading?: boolean
  loadingCount?: number
  className?: string
}

export function MobileCardList<T>({
  data,
  renderCard,
  keyExtractor,
  isLoading = false,
  loadingCount = 5,
  className,
}: MobileCardListProps<T>) {
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
    <div className={`space-y-3 ${className ?? ""}`}>
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
