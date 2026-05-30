<p align="center">
  <img src="docs/public/mh-logo-dark.png" alt="MotorHero" width="80" />
</p>

<h1 align="center">@motor-hero/ui-kit</h1>

<p align="center">
  Design system interno da MotorHero.<br />
  React + shadcn/ui + Tailwind CSS v4 + TypeScript.
</p>

<p align="center">
  <a href="https://ui.motorhero.com.br">ui.motorhero.com.br</a>
</p>

---

## Instalação

```bash
npm install @motor-hero/ui-kit
npm install react react-dom clsx tailwind-merge lucide-react sonner
```

## Setup

```css
/* src/index.css */
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

## Desenvolvimento

```bash
npm run build          # Build da library
npm run docs:dev       # Dev server da documentação
npm run docs:build     # Build estático da documentação
```
