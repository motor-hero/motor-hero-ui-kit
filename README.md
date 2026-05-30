<p align="center">
  <img src="docs/public/mh-logo-light.png" alt="Motor Hero" width="80" />
</p>

<h1 align="center">@motor-hero/ui-kit</h1>

<p align="center">
  Biblioteca de componentes e utilitários compartilhados para projetos React com
  <a href="https://ui.shadcn.com">shadcn/ui</a> +
  <a href="https://tailwindcss.com">Tailwind CSS v4</a>.
</p>

<p align="center">
  <a href="https://ui.motorhero.com.br">Documentação</a>
</p>

---

## Instalação

```bash
npm install @motor-hero/ui-kit
```

### Peer dependencies

```bash
npm install react react-dom clsx tailwind-merge lucide-react sonner
```

### Configuração do Tailwind

No `src/index.css` do projeto consumidor:

```css
@import "tailwindcss";
@source "../node_modules/@motor-hero/ui-kit/dist";
```

### Setup mínimo

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

---

## O que inclui

### Componentes

| Componente | Descrição |
|---|---|
| `ThemeProvider` | Gerenciamento de tema dark/light/system |
| `ModeToggle` | Dropdown para alternar tema |
| `FormField` | Wrapper para campos de formulário com label e erro |
| `AuthCard` | Card centralizado para páginas de autenticação |
| `StatCard` | Card de estatística com skeleton loading |
| `SearchInput` | Input de busca com ícone |
| `Pagination` | Controles de paginação |
| `TableSkeleton` | Skeleton loading para tabelas |
| `MobileCardList` | Lista de cards para mobile com skeleton |
| `ResponsiveDataView` | Tabela (desktop) + cards (mobile) + empty state |
| `EmptyState` | Estado vazio com ícone, título e ação |
| `PageHeader` | Cabeçalho de página com título e ação |
| `StatusDot` | Indicador visual ativo/inativo |
| `ConfirmDialog` | Dialog de confirmação (Radix UI) |
| `FormDialogLayout` | Layout para formulários em modais |
| `DataTableWrapper` | Wrapper para tabelas com empty state |
| `Toaster` | Notificações toast (Sonner) |

### Utilitários

| Utilitário | Descrição |
|---|---|
| `cn()` | Merge de classes Tailwind (clsx + tailwind-merge) |
| `extractApiError()` | Extrai mensagem de erro de respostas da API |

### Hooks

| Hook | Descrição |
|---|---|
| `useTheme()` | Acessar e alterar o tema atual |
| `useDisclosure()` | Estado open/close para modais e drawers |
| `useCustomToast()` | Disparar notificações toast |
| `toast` | API direta do Sonner para toasts avançados |

---

## Documentação

A documentação completa com exemplos interativos, props e código está disponível em:

**[ui.motorhero.com.br](https://ui.motorhero.com.br)**

---

## Filosofia

- Componentes **compostos** reutilizáveis entre projetos Motor Hero
- Primitivos shadcn/ui (Button, Input, Dialog) ficam em cada projeto
- Visual via **Tailwind CSS v4** com `@source` no CSS do consumidor
- **TypeScript** com tipos exportados
- **PT-BR** por padrão

---

## Desenvolvimento

```bash
git clone https://github.com/motor-hero/motor-hero-ui-kit.git
cd motor-hero-ui-kit
npm install

# Build da library
npm run build

# Dev server da documentação
npx vite --config docs/vite.config.ts
```
