import * as React from "react"

/**
 * Dispara `onLoadMore` quando o sentinela entra na viewport da lista rolável
 * (raiz = a lista, não a janela — ela rola por dentro do Popover/Drawer). Usa
 * refs "latest" para `loading`/`onLoadMore` e não reassina o observer a cada
 * render.
 *
 * Os nós entram como **estado** (callback refs), não como `useRef`: lista e
 * sentinela vivem dentro do Portal do Popover/Drawer e só existem no DOM com o
 * dropdown aberto, o que acontece bem depois de `enabled` virar `true`. Com
 * `useRef` + deps `[enabled]` o efeito rodava uma única vez, com o dropdown
 * fechado e os dois refs `null`, e o observer nunca chegava a ser registrado —
 * a paginação por scroll simplesmente não acontecia. Guardar os nós em estado
 * também refaz a assinatura quando o sentinela desmonta e remonta (`hasMore`
 * oscilando), em vez de deixar o observer preso a um nó já destacado.
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
  const [listNode, setListNode] = React.useState<HTMLDivElement | null>(null)
  const [sentinelNode, setSentinelNode] = React.useState<HTMLDivElement | null>(
    null,
  )
  const loadingRef = React.useRef(loading)
  const onLoadMoreRef = React.useRef(onLoadMore)

  // Memoizadas de propósito: uma callback ref recriada a cada render é chamada
  // com `null` e de novo com o nó em *todo* render, realimentando o estado.
  const listRef = React.useCallback((node: HTMLDivElement | null) => {
    setListNode(node)
  }, [])
  const sentinelRef = React.useCallback((node: HTMLDivElement | null) => {
    setSentinelNode(node)
  }, [])

  React.useEffect(() => {
    loadingRef.current = loading
    onLoadMoreRef.current = onLoadMore
  })

  React.useEffect(() => {
    if (!enabled || !listNode || !sentinelNode) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !loadingRef.current) {
          onLoadMoreRef.current?.()
        }
      },
      { root: listNode, rootMargin: "0px 0px 100px 0px" },
    )
    observer.observe(sentinelNode)
    return () => observer.disconnect()
  }, [enabled, listNode, sentinelNode])

  return { listRef, sentinelRef }
}
