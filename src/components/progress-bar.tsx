import type { ReactNode } from "react"

interface ProgressBarProps {
  value: number
  size?: "sm" | "md"
  label?: ReactNode
  valueLabel?: ReactNode
  className?: string
  indicatorClassName?: string
}

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2",
} as const

export function ProgressBar({
  value,
  size = "md",
  label,
  valueLabel,
  className,
  indicatorClassName,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      {(label || valueLabel) && (
        <div className="flex items-baseline justify-between gap-2">
          {label && (
            <span className="text-sm text-muted-foreground">{label}</span>
          )}
          {valueLabel && (
            <span className="text-sm font-semibold">{valueLabel}</span>
          )}
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full bg-muted ${sizeClasses[size]}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${indicatorClassName ?? "bg-primary"}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
