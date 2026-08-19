import type { CSSProperties, ReactNode } from "react"
import { cn } from "../lib/utils"

export interface HighlightPillProps {
  /** Pill background. Falls back to the neutral/muted status token when omitted. */
  backgroundColor?: string
  /** Pill text color. Falls back to the neutral/muted status token when omitted. */
  textColor?: string
  className?: string
  children: ReactNode
}

/**
 * Pílula de cor livre — `backgroundColor`/`textColor` vêm do consumidor, ao
 * invés de um enum fechado de variantes como o `StatusBadge`. Sem eles, cai
 * no mesmo tom neutro do `StatusBadge` (`--status-neutral-*`), servindo como
 * o "default muted" de qualquer feature que atribua cor por entidade (ex.:
 * cor de destaque por usuário admin, ADR 0081 do workspace IMMA).
 */
export function HighlightPill({
  backgroundColor,
  textColor,
  className,
  children,
}: HighlightPillProps) {
  const style: CSSProperties = {
    backgroundColor:
      backgroundColor ?? "var(--status-neutral-surface, #f3f4f6)",
    color: textColor ?? "var(--status-neutral-text, #374151)",
  }

  return (
    <span
      style={style}
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        className,
      )}
    >
      {children}
    </span>
  )
}
