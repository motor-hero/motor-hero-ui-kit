<p align="center">
  <img src="docs/public/mh-logo-dark.png" alt="MotorHero" width="80" />
</p>

<h1 align="center">@motor-hero/ui-kit</h1>

<p align="center">
  Componentes React reutilizáveis para o ecossistema <strong>MotorHero</strong>.<br />
  Construído com <a href="https://ui.shadcn.com">shadcn/ui</a>, <a href="https://tailwindcss.com">Tailwind CSS v4</a> e TypeScript.
</p>

<p align="center">
  <a href="https://ui.motorhero.com.br"><strong>Documentação →</strong></a>
</p>

---

## Sobre

Biblioteca interna da **MotorHero** que centraliza componentes de UI, hooks e utilitários compartilhados entre os projetos da empresa. Evita duplicação de código e garante consistência visual.

**Inclui:** ThemeProvider, ModeToggle, FormField, AuthCard, StatCard, Pagination, TableSkeleton, MobileCardList, ResponsiveDataView, EmptyState, PageHeader, StatusDot, ConfirmDialog, Toaster, e mais.

**Utilitários e hooks:** `cn()`, `extractApiError()`, `useTheme()`, `useDisclosure()`, `useCustomToast()`.

## Instalação

```bash
npm install @motor-hero/ui-kit
npm install react react-dom clsx tailwind-merge lucide-react sonner
```

## Setup

**CSS** — adicione no `src/index.css`:

```css
@import "tailwindcss";
@source "../node_modules/@motor-hero/ui-kit/dist";
```

**Root** — envolva a aplicação:

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

Exemplos interativos, props e código: **[ui.motorhero.com.br](https://ui.motorhero.com.br)**

## Desenvolvimento

```bash
git clone https://github.com/motor-hero/motor-hero-ui-kit.git
cd motor-hero-ui-kit && npm install

npm run build          # Build da library
npm run docs:dev       # Dev server da documentação
npm run docs:build     # Build estático da documentação
```

## Licença

Uso interno MotorHero.
