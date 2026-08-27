import { useCallback, useEffect, useState } from "react"

export interface UseVersionCheckOptions {
  /** The build id baked into the running bundle (see `versionFile` in `@motor-hero/ui-kit/vite`). */
  currentBuild: string | undefined
  /** Where the deployed build id is published. */
  url?: string
  intervalMs?: number
}

export interface VersionCheckState {
  /** The deployed build differs from the running one. */
  updateAvailable: boolean
  /** Grows on every poll that still sees a newer build. */
  staleChecks: number
  latestBuild: string | null
  reload: () => void
}

/**
 * Polls the deployed `version.json` and compares its `buildTime` with the
 * build id baked into this bundle. Nothing is inferred from a first fetch —
 * a page loaded during a deploy, or a poll that fails while the server
 * restarts, cannot make the running code believe it is current. Polling
 * pauses while the tab is hidden and runs at once when it comes back.
 */
export function useVersionCheck({
  currentBuild,
  url = "/version.json",
  intervalMs = 60_000,
}: UseVersionCheckOptions): VersionCheckState {
  const [latestBuild, setLatestBuild] = useState<string | null>(null)
  const [staleChecks, setStaleChecks] = useState(0)

  useEffect(() => {
    if (!currentBuild) return
    let cancelled = false

    const check = async () => {
      if (document.visibilityState === "hidden") return
      try {
        const res = await fetch(url, { cache: "no-store" })
        const contentType = res.headers.get("content-type") ?? ""
        if (!res.ok || !contentType.includes("application/json")) return
        const data: { buildTime?: unknown } = await res.json()
        if (cancelled || typeof data.buildTime !== "string") return
        if (data.buildTime !== currentBuild) {
          setLatestBuild(data.buildTime)
          setStaleChecks((n) => n + 1)
        }
      } catch (error) {
        console.error("Version check failed", error)
      }
    }

    check()
    const interval = setInterval(check, intervalMs)
    const onVisible = () => {
      if (document.visibilityState === "visible") check()
    }
    document.addEventListener("visibilitychange", onVisible)
    return () => {
      cancelled = true
      clearInterval(interval)
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [currentBuild, url, intervalMs])

  const reload = useCallback(() => window.location.reload(), [])

  return { updateAvailable: latestBuild !== null, staleChecks, latestBuild, reload }
}
