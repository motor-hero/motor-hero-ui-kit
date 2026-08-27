import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Plugin } from "vite"

/**
 * One build id in two places: baked into the bundle as
 * `import.meta.env.VITE_BUILD_TIME` and written to `dist/version.json`.
 * `UpdateBanner` / `useVersionCheck` compare the two at runtime, so the
 * running app knows its own version instead of guessing it from a fetch.
 *
 *   // vite.config.ts
 *   import { versionFile } from "@motor-hero/ui-kit/vite"
 *   export default defineConfig({ plugins: [react(), versionFile()] })
 */
export function versionFile(options: { fileName?: string } = {}): Plugin {
  const fileName = options.fileName ?? "version.json"
  const buildTime = new Date().toISOString()
  let outDir = "dist"
  return {
    name: "motor-hero:version-file",
    config: () => ({
      define: { "import.meta.env.VITE_BUILD_TIME": JSON.stringify(buildTime) },
    }),
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      mkdirSync(outDir, { recursive: true })
      writeFileSync(
        join(outDir, fileName),
        JSON.stringify({ buildTime, timestamp: Date.parse(buildTime) }, null, 2),
      )
    },
  }
}
