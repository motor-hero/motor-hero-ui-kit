interface TableSkeletonProps {
  rows?: number
  columns?: number
}

export function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        // p-2/h-4 espelha o TableCell real. Com p-4/h-5 a linha do skeleton
        // ficava ~16px mais alta que a linha de dados, e a tabela encolhia
        // visivelmente quando a resposta chegava.
        <tr key={i} className="border-b transition-colors">
          {Array.from({ length: columns }).map((_, j) => (
            <td key={j} className="p-2 align-middle first:pl-4 last:pr-4">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}
