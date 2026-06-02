import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  root: __dirname,
  base: "/",
  publicDir: path.resolve(__dirname, "public"),
  resolve: {
    alias: {
      "@motor-hero/ui-kit": path.resolve(__dirname, "../src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../docs-dist"),
    emptyOutDir: true,
  },
})
