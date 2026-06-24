import * as React from "react"

/**
 * Dispara `onLoadMore` quando o `sentinelRef` entra na viewport do `listRef`
 * (raiz = a lista rolável, não a janela — a lista rola por dentro do Popover/
 * Drawer). Usa refs "latest" para `loading`/`onLoadMore` e evita reassinar o
 * observer a cada render.
 */
export function useInfiniteScrollSentinel({
  enabled,
  loading,
  onLoadMore,
}: {
  enabled: boolean
  loading?: boolean
  onLoadMore?: () => void
}) {
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const sentinelRef = React.useRef<HTMLDivElement | null>(null)
  const loadingRef = React.useRef(loading)
  const onLoadMoreRef = React.useRef(onLoadMore)

  React.useEffect(() => {
    loadingRef.current = loading
    onLoadMoreRef.current = onLoadMore
  })

  React.useEffect(() => {
    if (!enabled) return
    const root = listRef.current
    const sentinel = sentinelRef.current
    if (!root || !sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !loadingRef.current) {
          onLoadMoreRef.current?.()
        }
      },
      { root, rootMargin: "0px 0px 100px 0px" },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [enabled])

  return { listRef, sentinelRef }
}
