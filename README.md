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

O publish no npm é disparado por **tags**. Você trabalha normalmente na `main` e, quando quiser
lançar uma versão, basta um comando:

```bash
npm version minor      # bump no package.json + commit + cria a tag v0.7.0
git push --follow-tags # a tag dispara o publish no npm + GitHub Release
```

Use [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, `docs:`,
`chore:`…) — o changelog da GitHub Release é gerado a partir deles, agrupado por categoria.
Escolha o bump conforme o que mudou:

| Comando | Bump | A partir de `0.6.0` → |
|---|---|---|
| `npm version patch` | patch | `0.6.1` |
| `npm version minor` | minor | `0.7.0` |
| `npm version major` | major | `1.0.0` |

Ao receber a tag `v*`, o workflow `release.yml` faz `build` → `npm publish --provenance` → cria a
GitHub Release com as notas. Guia completo em [CONTRIBUTING.md](./CONTRIBUTING.md).
