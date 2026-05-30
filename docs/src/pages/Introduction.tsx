import { CodeBlock } from "../components/CodeBlock"

const componentItems = [
  { id: "form-field", name: "FormField", desc: "Wrapper para campos de formulário com label e erro" },
  { id: "auth-card", name: "AuthCard", desc: "Card centralizado para páginas de autenticação" },
  { id: "stat-card", name: "StatCard", desc: "Card de estatística para dashboards" },
  { id: "search-input", name: "SearchInput", desc: "Input de busca com ícone de lupa" },
  { id: "pagination", name: "Pagination", desc: "Controles de paginação" },
  { id: "table-skeleton", name: "TableSkeleton", desc: "Skeleton loading para tabelas" },
  { id: "mobile-card-list", name: "MobileCardList", desc: "Lista de cards responsiva para mobile" },
  { id: "empty-state", name: "EmptyState", desc: "Estado vazio com ícone e ação" },
  { id: "page-header", name: "PageHeader", desc: "Cabeçalho de página com título e ação" },
  { id: "status-dot", name: "StatusDot", desc: "Indicador de status ativo/inativo" },
  { id: "confirm-dialog", name: "ConfirmDialog", desc: "Dialog de confirmação com Radix UI" },
  { id: "mode-toggle", name: "ModeToggle", desc: "Alternador de tema claro/escuro" },
  { id: "responsive-data-view", name: "ResponsiveDataView", desc: "View responsiva tabela/cards" },
  { id: "toaster", name: "Toaster", desc: "Notificações toast com Sonner" },
]

const utilItems = [
  { id: "utilities", name: "cn()", desc: "Merge de classes CSS com clsx + tailwind-merge" },
  { id: "utilities", name: "extractApiError()", desc: "Extrai mensagem de erro de respostas da API" },
  { id: "hooks", name: "useDisclosure()", desc: "Hook para controlar estado open/close de modais" },
  { id: "hooks", name: "useTheme()", desc: "Hook para acessar e alterar o tema atual" },
  { id: "hooks", name: "useCustomToast()", desc: "Hook para disparar notificações toast" },
]

export function Introduction() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Motor Hero UI Kit</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Biblioteca de componentes React reutilizáveis construída com shadcn/ui e Tailwind CSS v4.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Instalação</h2>
        <CodeBlock
          language="bash"
          code={`npm install @motor-hero/ui-kit

# Peer dependencies
npm install react react-dom clsx tailwind-merge lucide-react sonner`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Configuração do CSS</h2>
        <p className="mb-4 text-muted-foreground">
          Importe os estilos base no seu arquivo CSS principal:
        </p>
        <CodeBlock
          language="css"
          code={`@import "@motor-hero/ui-kit/styles";`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">ThemeProvider</h2>
        <p className="mb-4 text-muted-foreground">
          Envolva sua aplicação com o ThemeProvider para habilitar o suporte a temas:
        </p>
        <CodeBlock code={`import { ThemeProvider, Toaster } from "@motor-hero/ui-kit"

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <MyApp />
      <Toaster />
    </ThemeProvider>
  )
}`} />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Componentes disponíveis</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {componentItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              className="group rounded-lg border p-4 transition-all hover:border-brand/40 hover:bg-brand/5 hover:shadow-sm"
            >
              <p className="font-medium group-hover:text-brand transition-colors">{item.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </a>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Utilitários e Hooks</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {utilItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              className="group rounded-lg border p-4 transition-all hover:border-brand/40 hover:bg-brand/5 hover:shadow-sm"
            >
              <p className="font-medium font-mono text-sm group-hover:text-brand transition-colors">{item.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
