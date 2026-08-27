import { RefreshCw } from "lucide-react"
import { cn } from "../lib/utils"
import { type UseVersionCheckOptions, useVersionCheck } from "../hooks/use-version-check"

export interface UpdateBannerProps extends UseVersionCheckOptions {
  title?: string
  description?: string
  actionLabel?: string
  className?: string
}

/**
 * A bar that appears when a newer build is deployed and stays until the
 * person reloads — not a toast: a notice that can be missed or dismissed
 * leaves the old bundle running against a new API. Themed with the product
 * tokens so it matches light and dark alike. Put it in `AppShell`'s
 * `banner` slot (or at the top of any page).
 */
export function UpdateBanner({
  title = "Nova versão disponível",
  description = "Atualize para continuar na versão mais recente.",
  actionLabel = "Atualizar",
  className,
  ...options
}: UpdateBannerProps) {
  const { updateAvailable, reload } = useVersionCheck(options)
  if (!updateAvailable) return null

  return (
    <div
      role="status"
      aria-live="polite"
      data-slot="update-banner"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-b border-primary/30 bg-primary px-4 py-2 text-sm text-primary-foreground",
        className,
      )}
    >
      <span className="flex min-w-0 items-center gap-2">
        <RefreshCw className="h-4 w-4 shrink-0 animate-spin [animation-duration:3s]" aria-hidden />
        <span className="font-medium">{title}</span>
        <span className="hidden truncate opacity-80 sm:inline">{description}</span>
      </span>
      <button
        type="button"
        onClick={reload}
        className="shrink-0 rounded-md bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-background/90"
      >
        {actionLabel}
      </button>
    </div>
  )
}
