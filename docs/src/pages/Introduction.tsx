import { CodeBlock } from "../components/CodeBlock"

const componentItems = [
  { id: "form-field", name: "FormField", desc: "Wrapper para campos de formulário com label e erro" },
  { id: "auth-card", name: "AuthCard", desc: "Card centralizado para páginas de autenticação" },
  { id: "stat-card", name: "StatCard", desc: "Card de estatística para dashboards" },
  { id: "search-input", name: "SearchInput", desc: "Input de busca com ícone de lupa" },
  { id: "password-input", name: "PasswordInput", desc: "Campo de senha com botão de mostrar/ocultar" },
  { id: "pagination", name: "Pagination", desc: "Controles de paginação" },
  { id: "table-skeleton", name: "TableSkeleton", desc: "Skeleton loading para tabelas" },
  { id: "mobile-card-list", name: "MobileCardList", desc: "Lista de cards responsiva para mobile" },
  { id: "empty-state", name: "EmptyState", desc: "Estado vazio com ícone e ação" },
  { id: "form-dialog", name: "FormDialog", desc: "Modal responsivo padronizado (bottom sheet/desktop)" },
  { id: "page-header", name: "PageHeader", desc: "Cabeçalho de página com título e ação" },
  { id: "progress-bar", name: "ProgressBar", desc: "Barra de progresso de 0 a 100% com rótulo" },
  { id: "status-badge", name: "StatusBadge", desc: "Badge de status com dot e variantes semânticas" },
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
      <div className="space-y-4 border-b pb-10">
        <p className="font-mono text-sm text-muted-foreground">
          v{__APP_VERSION__} · shadcn/ui + Tailwind CSS v4
        </p>
        <h1 className="text-4xl font-bold tracking-tight">Motor Hero UI Kit</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          O conjunto de componentes React compartilhado entre os frontends da MotorHero — a
          navegação, os formulários, as tabelas e os estados que antes eram copiados de projeto
          em projeto, agora num só lugar.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href="#app-shell"
            className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand/90"
          >
            Começar
          </a>
          <a
            href="https://github.com/motor-hero/motor-hero-ui-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            GitHub
          </a>
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
