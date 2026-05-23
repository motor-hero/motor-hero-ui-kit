# @motor-hero/ui-kit

Componentes e utilitários compartilhados para projetos Motor Hero.

## Instalação

```bash
npm install @motor-hero/ui-kit
```

## O que inclui

### Componentes
- **ThemeProvider** + **useTheme** — gerenciamento de dark/light/system mode
- **ModeToggle** — dropdown para alternar tema
- **EmptyState** — estado vazio com ícone, título e ação
- **ConfirmDialog** — diálogo de confirmação reutilizável
- **PageHeader** — cabeçalho de página padronizado
- **StatusDot** — indicador de status (ativo/inativo)

### Utilitários
- **cn()** — helper para classes Tailwind (clsx + tailwind-merge)
- **useDisclosure()** — hook para estado aberto/fechado

### CSS Tokens
Importe o tema padrão Zinc:
```ts
import "@motor-hero/ui-kit/styles"
```

## Uso

```tsx
import { ThemeProvider, EmptyState, cn, useDisclosure } from "@motor-hero/ui-kit"
```

## Filosofia

Este pacote exporta apenas componentes **compostos** e **utilitários** compartilhados. Os componentes shadcn/ui primitivos (Button, Input, Dialog, etc.) ficam em cada projeto — isso é o modelo correto do shadcn.
