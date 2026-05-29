import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: __dirname,
  base: "/motor-hero-ui-kit/",
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
