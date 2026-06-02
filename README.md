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
npm run docs:dev       # Dev server da documentação (playground ao vivo dos componentes)
npm run docs:build     # Build estático da documentação
```

### Testando o kit em outro projeto

Antes de publicar, dá para testar os componentes como dependência real de outro app:

```bash
# Opção A — npm link (ao vivo)
# no motor-hero-ui-kit:
npm run build && npm link && npm run dev
# no OUTRO projeto:
npm link @motor-hero/ui-kit
```

```bash
# Opção B — npm pack (mais fiel ao publish)
# no motor-hero-ui-kit:
npm run build && npm pack              # gera motor-hero-ui-kit-0.5.1.tgz
# no OUTRO projeto:
npm install ../motor-hero-ui-kit/motor-hero-ui-kit-0.5.1.tgz
```

Detalhes (peerDeps do React, unlink etc.) em [CONTRIBUTING.md](./CONTRIBUTING.md).

## Versionamento e Releases

As versões e o publish no npm são **automatizados** — você não edita a versão à mão nem cria tags.
A versão é derivada das mensagens de commit ([Conventional Commits](https://www.conventionalcommits.org)):

| Commit | Bump | A partir de `0.5.1` → |
|---|---|---|
| `fix:` | patch | `0.5.2` |
| `feat:` | minor | `0.6.0` |
| `feat!:` / `BREAKING CHANGE:` | minor (permanece em `0.x`) | `0.6.0` |

Ao fazer merge na `main`, o **release-please** abre um PR de release com a versão e o `CHANGELOG`
prontos; ao **fazer merge desse PR**, a tag, a GitHub Release e o `npm publish` acontecem
automaticamente. Guia completo em [CONTRIBUTING.md](./CONTRIBUTING.md).
