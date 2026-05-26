import type { ReactNode } from "react"

interface StatCardProps {
  label: string
  value: ReactNode
  detail?: string
  icon?: ReactNode
  isLoading?: boolean
}

export function StatCard({ label, value, detail, icon, isLoading }: StatCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between pb-2">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-4 animate-pulse rounded bg-muted" />
        </div>
        <div className="mt-2 h-7 w-16 animate-pulse rounded bg-muted" />
        <div className="mt-1 h-4 w-20 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
    </div>
  )
}
