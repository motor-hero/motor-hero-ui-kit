# @motor-hero/ui-kit

Biblioteca de componentes e utilitários compartilhados para projetos React com [shadcn/ui](https://ui.shadcn.com) + [Tailwind CSS v4](https://tailwindcss.com).

## Instalação

```bash
# Via GitHub Packages (org motor-hero)
npm install @motor-hero/ui-kit

# Via Git URL (cross-org ou sem registry auth)
npm install github:motor-hero/motor-hero-ui-kit
```

### Configuração do Tailwind

Adicione no `src/index.css` do projeto consumidor:

```css
@import "tailwindcss";
@source "../node_modules/@motor-hero/ui-kit/dist";
```

---

## Componentes

### ThemeProvider

Gerenciamento de tema (dark/light/system) com persistência em localStorage.

```tsx
import { ThemeProvider } from "@motor-hero/ui-kit"

<ThemeProvider defaultTheme="dark" storageKey="ui-theme">
  <App />
</ThemeProvider>
```

### useTheme

Hook para acessar e alterar o tema.

```tsx
import { useTheme } from "@motor-hero/ui-kit"

const { theme, setTheme } = useTheme()
```

### ModeToggle

Dropdown para alternar entre temas (Claro/Escuro/Sistema).

```tsx
import { ModeToggle } from "@motor-hero/ui-kit"

<ModeToggle />
```

---

### FormField

Wrapper para campos de formulário com label, erro e indicador de obrigatório.

```tsx
import { FormField } from "@motor-hero/ui-kit"

<FormField label="Email" htmlFor="email" error={errors.email?.message} required>
  <Input id="email" type="email" {...register("email")} />
</FormField>
```

| Prop | Tipo | Descrição |
|------|------|-----------|
| `label` | `string` | Texto do label |
| `htmlFor` | `string?` | ID do input associado |
| `error` | `string?` | Mensagem de erro |
| `required` | `boolean?` | Mostra indicador `*` |
| `children` | `ReactNode` | Input ou componente |

---

### AuthCard

Card centralizado full-screen para páginas de autenticação.

```tsx
import { AuthCard } from "@motor-hero/ui-kit"

<AuthCard title="Entrar" description="Insira suas credenciais">
  <form>...</form>
</AuthCard>
```

| Prop | Tipo | Descrição |
|------|------|-----------|
| `title` | `string` | Título centralizado |
| `description` | `string?` | Subtítulo |
| `children` | `ReactNode` | Conteúdo do card |
| `footer` | `ReactNode?` | Rodapé |

---

### StatCard

Card de estatística para dashboards com estado de loading.

```tsx
import { StatCard } from "@motor-hero/ui-kit"

<StatCard
  label="Usuários"
  value={42}
  detail="38 ativos"
  icon={<Users className="h-4 w-4" />}
  isLoading={isPending}
/>
```

| Prop | Tipo | Descrição |
|------|------|-----------|
| `label` | `string` | Rótulo |
| `value` | `ReactNode` | Valor principal |
| `detail` | `string?` | Detalhe |
| `icon` | `ReactNode?` | Ícone |
| `isLoading` | `boolean?` | Skeleton loading |

---

### SearchInput

Input de busca com ícone de lupa. Compatível com `react-hook-form`.

```tsx
import { SearchInput } from "@motor-hero/ui-kit"

<SearchInput placeholder="Buscar..." {...register("search")} />
```

---

### Pagination

Controles de paginação.

```tsx
import { Pagination } from "@motor-hero/ui-kit"

<Pagination page={page} onPageChange={setPage} hasNextPage={true} hasPreviousPage={page > 1} />
```

---

### TableSkeleton

Linhas de skeleton loading para tabelas.

```tsx
import { TableSkeleton } from "@motor-hero/ui-kit"

<TableBody>
  {isPending ? <TableSkeleton rows={10} columns={5} /> : data.map(...)}
</TableBody>
```

---

### MobileCardList

Lista de cards para mobile — substitui tabelas em telas pequenas.

```tsx
import { MobileCardList } from "@motor-hero/ui-kit"

<MobileCardList
  data={users}
  keyExtractor={(user) => user.id}
  isLoading={isPending}
  renderCard={(user) => (
    <div className="space-y-2">
      <span className="font-medium">{user.name}</span>
      <p className="text-sm text-muted-foreground">{user.email}</p>
    </div>
  )}
/>
```

| Prop | Tipo | Descrição |
|------|------|-----------|
| `data` | `T[]` | Array de dados |
| `renderCard` | `(item: T, index: number) => ReactNode` | Render do card |
| `keyExtractor` | `(item: T) => string` | Chave única |
| `isLoading` | `boolean?` | Skeleton cards |
| `loadingCount` | `number?` | Qtd skeletons (default: 5) |

---

### ResponsiveDataView

Tabela no desktop + cards no mobile + empty state + paginação.

```tsx
import { ResponsiveDataView, MobileCardList, TableSkeleton, Pagination } from "@motor-hero/ui-kit"

<ResponsiveDataView
  isEmpty={data.length === 0}
  isLoading={isPending}
  emptyTitle="Nenhum registro"
  emptyIcon={<Users className="h-12 w-12" />}
  pagination={<Pagination page={page} onPageChange={setPage} hasNextPage={hasNext} hasPreviousPage={page > 1} />}
  table={
    <Table>
      <TableHeader>...</TableHeader>
      <TableBody>{isPending ? <TableSkeleton rows={10} columns={4} /> : data.map(...)}</TableBody>
    </Table>
  }
  cards={
    <MobileCardList data={data} keyExtractor={(d) => d.id} isLoading={isPending} renderCard={(d) => ...} />
  }
/>
```

---

### EmptyState

Estado vazio com ícone, título, descrição e ação opcional.

```tsx
import { EmptyState } from "@motor-hero/ui-kit"

<EmptyState icon={<Users className="h-12 w-12" />} title="Nenhum usuário" action={<Button>Adicionar</Button>} />
```

---

### PageHeader

Cabeçalho de página com título, descrição e ação.

```tsx
import { PageHeader } from "@motor-hero/ui-kit"

<PageHeader title="Usuários" description="Gerencie os usuários" action={<Button size="sm">Adicionar</Button>} />
```

---

### StatusDot

Indicador de status ativo/inativo.

```tsx
import { StatusDot } from "@motor-hero/ui-kit"

<StatusDot active={true} label="Ativo" />
```

---

### ConfirmDialog

Diálogo de confirmação para ações destrutivas.

```tsx
import { ConfirmDialog } from "@motor-hero/ui-kit"

<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  onConfirm={handleDelete}
  title="Excluir usuário"
  description="Tem certeza? Esta ação não pode ser desfeita."
  variant="destructive"
/>
```

---

### FormDialogLayout

Layout para formulários dentro de modais.

```tsx
import { FormDialogLayout } from "@motor-hero/ui-kit"

<FormDialogLayout title="Adicionar" onSubmit={handleSubmit} onCancel={onClose} isSubmitting={isSubmitting}>
  <FormField label="Nome" required><Input {...register("name")} /></FormField>
</FormDialogLayout>
```

---

### DataTableWrapper

Wrapper para tabelas com empty state e paginação (desktop only).

```tsx
import { DataTableWrapper } from "@motor-hero/ui-kit"

<DataTableWrapper isEmpty={data.length === 0} isLoading={isPending} pagination={<Pagination ... />}>
  <Table>...</Table>
</DataTableWrapper>
```

---

## Utilitários

### cn()

Compor classes Tailwind condicionalmente.

```tsx
import { cn } from "@motor-hero/ui-kit"

<div className={cn("p-4", isActive && "bg-primary")} />
```

### extractApiError()

Extrair erro de respostas da API (FastAPI).

```tsx
import { extractApiError } from "@motor-hero/ui-kit"

toast.error(extractApiError(err, "Erro inesperado"))
```

---

## Hooks

### useDisclosure()

Estado aberto/fechado para modais, sheets, etc.

```tsx
import { useDisclosure } from "@motor-hero/ui-kit"

const { open, onOpen, onClose, onToggle } = useDisclosure()
```

---

## CSS Tokens

Tema base Zinc (opcional):

```css
@import "@motor-hero/ui-kit/styles";
```

---

## Filosofia

- Componentes **compostos** reutilizáveis entre projetos
- Primitivos shadcn/ui (Button, Input, Dialog) ficam em cada projeto
- Visual via **Tailwind CSS v4** — adicionar `@source` no CSS
- **TypeScript** com tipos exportados
- **PT-BR** por padrão
