import type { ReactNode } from "react"

export function ComponentCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="rounded-md border bg-background p-4">
        {children}
      </div>
    </div>
  )
}
