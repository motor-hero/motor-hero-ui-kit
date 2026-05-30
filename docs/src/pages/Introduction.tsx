import { CodeBlock } from "../components/CodeBlock"

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
npm install react react-dom clsx tailwind-merge lucide-react`}
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
        <CodeBlock code={`import { ThemeProvider } from "@motor-hero/ui-kit"

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <MyApp />
    </ThemeProvider>
  )
}`} />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Componentes disponíveis</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { name: "FormField", desc: "Wrapper para campos de formulário com label e erro" },
            { name: "AuthCard", desc: "Card centralizado para páginas de autenticação" },
            { name: "StatCard", desc: "Card de estatística para dashboards" },
            { name: "SearchInput", desc: "Input de busca com ícone de lupa" },
            { name: "Pagination", desc: "Controles de paginação" },
            { name: "TableSkeleton", desc: "Skeleton loading para tabelas" },
            { name: "MobileCardList", desc: "Lista de cards responsiva para mobile" },
            { name: "EmptyState", desc: "Estado vazio com ícone e ação" },
            { name: "PageHeader", desc: "Cabeçalho de página com título e ação" },
            { name: "StatusDot", desc: "Indicador de status ativo/inativo" },
            { name: "ConfirmDialog", desc: "Dialog de confirmação com Radix UI" },
            { name: "ModeToggle", desc: "Alternador de tema claro/escuro" },
            { name: "ResponsiveDataView", desc: "View responsiva tabela/cards" },
            { name: "DataTableWrapper", desc: "Wrapper para tabelas com empty state e paginação" },
            { name: "FormDialogLayout", desc: "Layout padrão para formulários em dialogs" },
          ].map((item) => (
            <div key={item.name} className="rounded-lg border p-4 transition-colors hover:border-brand/30 hover:bg-brand/5">
              <p className="font-medium">{item.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Utilitários e Hooks</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border p-4 transition-colors hover:border-brand/30 hover:bg-brand/5">
            <p className="font-medium font-mono text-sm">cn()</p>
            <p className="mt-1 text-sm text-muted-foreground">Merge de classes CSS com clsx + tailwind-merge</p>
          </div>
          <div className="rounded-lg border p-4 transition-colors hover:border-brand/30 hover:bg-brand/5">
            <p className="font-medium font-mono text-sm">extractApiError()</p>
            <p className="mt-1 text-sm text-muted-foreground">Extrai mensagem de erro de respostas da API</p>
          </div>
          <div className="rounded-lg border p-4 transition-colors hover:border-brand/30 hover:bg-brand/5">
            <p className="font-medium font-mono text-sm">useDisclosure()</p>
            <p className="mt-1 text-sm text-muted-foreground">Hook para controlar estado open/close de modais</p>
          </div>
          <div className="rounded-lg border p-4 transition-colors hover:border-brand/30 hover:bg-brand/5">
            <p className="font-medium font-mono text-sm">useTheme()</p>
            <p className="mt-1 text-sm text-muted-foreground">Hook para acessar e alterar o tema atual</p>
          </div>
        </div>
      </div>
    </div>
  )
}
