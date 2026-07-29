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

/**
 * Cada variante lê os tokens semânticos `--status-*` do app, com fallback para
 * a paleta Tailwind que o componente já usava. Um app que define os tokens
 * (ex.: IMMA, de neutros quentes) ganha as cores do seu design system; um app
 * que não define continua com a aparência de antes — a troca não quebra nenhum
 * consumidor. Também dispensa `dark:`, já que os tokens de quem os define
 * mudam sozinhos no escopo `.dark`.
 */
const variantClasses: Record<
  StatusBadgeVariant,
  { badge: string; dot: string }
> = {
  neutral: {
    badge:
      "bg-[var(--status-neutral-surface,#f3f4f6)] text-[var(--status-neutral-text,#374151)]",
    dot: "bg-[var(--status-neutral,#9ca3af)]",
  },
  info: {
    badge:
      "bg-[var(--status-info-surface,#dbeafe)] text-[var(--status-info-text,#1d4ed8)]",
    dot: "bg-[var(--status-info,#3b82f6)]",
  },
  success: {
    badge:
      "bg-[var(--status-success-surface,#dcfce7)] text-[var(--status-success-text,#15803d)]",
    dot: "bg-[var(--status-success,#22c55e)]",
  },
  danger: {
    badge:
      "bg-[var(--status-danger-surface,#fee2e2)] text-[var(--status-danger-text,#b91c1c)]",
    dot: "bg-[var(--status-danger,#ef4444)]",
  },
  warning: {
    badge:
      "bg-[var(--status-warning-surface,#fef3c7)] text-[var(--status-warning-text,#b45309)]",
    dot: "bg-[var(--status-warning,#f59e0b)]",
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
