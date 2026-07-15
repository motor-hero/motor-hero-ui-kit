import * as ToggleGroup from "@radix-ui/react-toggle-group"
import { Star } from "lucide-react"
import { cn } from "../lib/utils"

const MAX_STARS = 5

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const

export interface RatingProps {
  value?: number
  onChange?: (value: number) => void
  readOnly?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
  "aria-label"?: string
}

function defaultLabel(value: number) {
  return value > 0
    ? `Avaliação: ${value} de ${MAX_STARS} estrelas`
    : "Avaliação: sem nota"
}

export function Rating({
  value = 0,
  onChange,
  readOnly = false,
  size = "md",
  className,
  "aria-label": ariaLabel,
}: RatingProps) {
  const clamped = Math.min(MAX_STARS, Math.max(0, value))
  const label = ariaLabel ?? defaultLabel(clamped)

  if (readOnly) {
    return (
      <div
        role="img"
        aria-label={label}
        className={cn("inline-flex items-center gap-0.5", className)}
      >
        {Array.from({ length: MAX_STARS }, (_, index) => (
          <Star
            key={index}
            aria-hidden
            className={cn(
              sizeClasses[size],
              index < clamped
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground",
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <ToggleGroup.Root
      type="single"
      value={clamped > 0 ? String(clamped) : ""}
      onValueChange={(next) => {
        // Radix emite "" ao clicar de novo na estrela já selecionada;
        // mantemos a nota atual em vez de zerar (onChange é sempre 1-5).
        if (next) onChange?.(Number(next))
      }}
      aria-label={label}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {Array.from({ length: MAX_STARS }, (_, index) => {
        const starValue = index + 1
        const filled = starValue <= clamped
        return (
          <ToggleGroup.Item
            key={starValue}
            value={String(starValue)}
            aria-label={`${starValue} ${starValue === 1 ? "estrela" : "estrelas"}`}
            className="inline-flex cursor-pointer items-center justify-center rounded-sm bg-transparent p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Star
              aria-hidden
              className={cn(
                sizeClasses[size],
                "transition-colors",
                filled
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground hover:text-amber-400",
              )}
            />
          </ToggleGroup.Item>
        )
      })}
    </ToggleGroup.Root>
  )
}
