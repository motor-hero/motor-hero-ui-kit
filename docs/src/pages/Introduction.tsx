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
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-brand/10 via-background to-background p-8 sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            v{__APP_VERSION__} · shadcn/ui + Tailwind CSS v4
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Motor Hero UI Kit</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Biblioteca de componentes React reutilizáveis do ecossistema MotorHero — acessíveis, tipados e prontos para produção.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#form-field"
              className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand/90"
            >
              Explorar componentes
            </a>
            <a
              href="https://github.com/motor-hero/motor-hero-ui-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              GitHub
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <span>
              <span className="font-semibold text-foreground">{componentItems.length}</span> componentes
            </span>
            <span>
              <span className="font-semibold text-foreground">3</span> hooks
            </span>
            <span>
              <span className="font-semibold text-foreground">2</span> utilitários
            </span>
          </div>
        </div>
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
