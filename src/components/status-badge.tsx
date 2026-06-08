import type { ReactNode } from "react"

export type StatusBadgeVariant =
  | "neutral"
  | "info"
  | "success"
  | "danger"
  | "warning"

interface StatusBadgeProps {
  variant?: StatusBadgeVariant
  dot?: boolean
  className?: string
  children: ReactNode
}

const variantClasses: Record<
  StatusBadgeVariant,
  { badge: string; dot: string }
> = {
  neutral: {
    badge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    dot: "bg-gray-400",
  },
  info: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  success: {
    badge: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    dot: "bg-green-500",
  },
  danger: {
    badge: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
    dot: "bg-red-500",
  },
  warning: {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    dot: "bg-amber-500",
  },
}

export function StatusBadge({
  variant = "neutral",
  dot = true,
  className,
  children,
}: StatusBadgeProps) {
  const classes = variantClasses[variant]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${classes.badge} ${className ?? ""}`}
    >
      {dot && (
        <span
          className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${classes.dot}`}
        />
      )}
      {children}
    </span>
  )
}
