import * as React from "react"
import type { ComboboxOption } from "@motor-hero/ui-kit"

const ALL: ComboboxOption[] = Array.from({ length: 200 }, (_, i) => {
  const n = String(i + 1).padStart(3, "0")
  return { value: String(i + 1), label: `Fornecedor ${n}` }
})

function fetchPage(page: number, size: number, search: string) {
  return new Promise<{ items: ComboboxOption[]; pages: number }>((resolve) => {
    setTimeout(() => {
      const filtered = search
        ? ALL.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
        : ALL
      const start = (page - 1) * size
      resolve({
        items: filtered.slice(start, start + size),
        pages: Math.max(1, Math.ceil(filtered.length / size)),
      })
    }, 400)
  })
}

/** Espelha o contrato do hook real `useInfiniteOptions` (do app admin), mas
 *  com `setTimeout` — mantém a doc sem dependência de dados. */
export function useFakeInfiniteOptions(size = 20) {
  const [options, setOptions] = React.useState<ComboboxOption[]>([])
  const [page, setPage] = React.useState(1)
  const [pages, setPages] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const searchRef = React.useRef("")
  const debounceRef = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  const load = React.useCallback(
    (nextPage: number) => {
      setLoading(true)
      fetchPage(nextPage, size, searchRef.current).then((res) => {
        setOptions((prev) =>
          nextPage === 1 ? res.items : [...prev, ...res.items],
        )
        setPage(nextPage)
        setPages(res.pages)
        setLoading(false)
      })
    },
    [size],
  )

  React.useEffect(() => {
    load(1)
  }, [load])

  const onSearchChange = (q: string) => {
    searchRef.current = q
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => load(1), 300)
  }

  const onLoadMore = () => {
    if (!loading && page < pages) load(page + 1)
  }

  return { options, loading, hasMore: page < pages, onSearchChange, onLoadMore }
}
