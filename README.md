<p align="center">
  <img src="docs/public/mh-logo-dark.png" alt="Motor Hero" width="80" />
</p>

<h1 align="center">@motor-hero/ui-kit</h1>

<p align="center">
  Biblioteca de componentes React reutilizáveis com
  <a href="https://ui.shadcn.com">shadcn/ui</a> +
  <a href="https://tailwindcss.com">Tailwind CSS v4</a>.
  <br />
  <a href="https://ui.motorhero.com.br"><strong>Documentação completa →</strong></a>
</p>

---

## Quick Start

```bash
npm install @motor-hero/ui-kit

# Peer dependencies
npm install react react-dom clsx tailwind-merge lucide-react sonner
```

No `src/index.css` do projeto consumidor:

```css
@import "tailwindcss";
@source "../node_modules/@motor-hero/ui-kit/dist";
```

```tsx
import { ThemeProvider, Toaster } from "@motor-hero/ui-kit"

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <MyApp />
      <Toaster />
    </ThemeProvider>
  )
}
```

Para exemplos interativos, props e código de cada componente, acesse **[ui.motorhero.com.br](https://ui.motorhero.com.br)**.

---

## Desenvolvimento

```bash
git clone https://github.com/motor-hero/motor-hero-ui-kit.git
cd motor-hero-ui-kit && npm install

npm run build                              # Build da library
npx vite --config docs/vite.config.ts      # Dev server da documentação
```
