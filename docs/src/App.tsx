import {
  AuthCard,
  EmptyState,
  FormField,
  MobileCardList,
  PageHeader,
  Pagination,
  SearchInput,
  StatCard,
  StatusDot,
  TableSkeleton,
} from "@motor-hero/ui-kit"
import { ComponentCard } from "./components/ComponentCard"

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Motor Hero UI Kit</h1>
              <p className="mt-1 text-muted-foreground">Componentes reutilizáveis para projetos React + shadcn/ui + Tailwind CSS v4</p>
            </div>
            <a href="https://github.com/motor-hero/motor-hero-ui-kit" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
              GitHub →
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-8 space-y-8">

        {/* Navigation */}
        <nav className="flex flex-wrap gap-2">
          {["FormField", "AuthCard", "StatCard", "SearchInput", "Pagination", "TableSkeleton", "MobileCardList", "EmptyState", "PageHeader", "StatusDot", "ModeToggle"].map(name => (
            <a key={name} href={`#${name.toLowerCase()}`} className="rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-accent">{name}</a>
          ))}
        </nav>

        {/* Components */}
        <section id="formfield" className="space-y-4">
          <ComponentCard title="FormField" description="Wrapper para campos de formulário com label, erro e indicador de obrigatório.">
            <div className="space-y-4 max-w-sm">
              <FormField label="Email" htmlFor="demo-email" required>
                <input id="demo-email" type="email" placeholder="nome@exemplo.com" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
              </FormField>
              <FormField label="Senha" error="Senha é obrigatória" required>
                <input type="password" placeholder="Senha" className="flex h-9 w-full rounded-md border border-destructive bg-transparent px-3 py-1 text-sm shadow-sm" />
              </FormField>
            </div>
          </ComponentCard>
        </section>

        <section id="statcard">
          <ComponentCard title="StatCard" description="Card de estatística para dashboards com skeleton loading.">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <StatCard label="Usuários" value={42} detail="38 ativos" />
              <StatCard label="Empresas" value={8} detail="6 ativas" />
              <StatCard label="Carregando..." value={0} isLoading />
            </div>
          </ComponentCard>
        </section>

        <section id="searchinput">
          <ComponentCard title="SearchInput" description="Input de busca com ícone de lupa integrado.">
            <div className="max-w-md">
              <SearchInput placeholder="Buscar por nome ou email..." />
            </div>
          </ComponentCard>
        </section>

        <section id="pagination">
          <ComponentCard title="Pagination" description="Controles de paginação.">
            <div className="space-y-4">
              <Pagination page={1} onPageChange={() => {}} hasNextPage hasPreviousPage={false} />
              <Pagination page={3} onPageChange={() => {}} hasNextPage hasPreviousPage />
              <Pagination page={5} onPageChange={() => {}} hasNextPage={false} hasPreviousPage />
            </div>
          </ComponentCard>
        </section>

        <section id="tableskeleton">
          <ComponentCard title="TableSkeleton" description="Linhas de skeleton loading para tabelas.">
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full"><tbody><TableSkeleton rows={3} columns={4} /></tbody></table>
            </div>
          </ComponentCard>
        </section>

        <section id="mobilecardlist">
          <ComponentCard title="MobileCardList" description="Lista de cards para mobile — substitui tabelas em telas pequenas.">
            <div className="max-w-sm">
              <MobileCardList
                data={[
                  { id: "1", name: "João Silva", email: "joao@example.com", role: "Admin" },
                  { id: "2", name: "Maria Santos", email: "maria@example.com", role: "Gestor" },
                  { id: "3", name: "Ana Oliveira", email: "ana@example.com", role: "Gestor" },
                ]}
                keyExtractor={(u) => u.id}
                renderCard={(user) => (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.role}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                )}
              />
            </div>
          </ComponentCard>
        </section>

        <section id="emptystate">
          <ComponentCard title="EmptyState" description="Estado vazio com ícone, título, descrição e ação.">
            <EmptyState
              title="Nenhum registro encontrado"
              description="Comece adicionando o primeiro item."
              action={<button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Adicionar</button>}
            />
          </ComponentCard>
        </section>

        <section id="pageheader">
          <ComponentCard title="PageHeader" description="Cabeçalho de página com título, descrição e ação.">
            <PageHeader title="Administração de Usuários" description="Gerencie os usuários do sistema" action={<button className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground">+ Adicionar</button>} />
          </ComponentCard>
        </section>

        <section id="statusdot">
          <ComponentCard title="StatusDot" description="Indicador de status ativo/inativo.">
            <div className="flex gap-6">
              <StatusDot active label="Ativo" />
              <StatusDot active={false} label="Inativo" />
              <StatusDot active />
            </div>
          </ComponentCard>
        </section>

        <section id="modetoggle">
          <ComponentCard title="ModeToggle" description="Dropdown para alternar tema (requer ThemeProvider).">
            <p className="text-sm text-muted-foreground">O ModeToggle requer ThemeProvider no root da aplicação.</p>
          </ComponentCard>
        </section>

        <section id="authcard">
          <ComponentCard title="AuthCard" description="Card centralizado full-screen para páginas de autenticação. Exemplo renderizado em escala reduzida.">
            <div className="relative h-[400px] overflow-hidden rounded-md border">
              <div className="absolute inset-0 scale-75 origin-top">
                <AuthCard title="Entrar" description="Insira suas credenciais">
                  <div className="space-y-4">
                    <FormField label="Email">
                      <input type="email" placeholder="nome@exemplo.com" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" />
                    </FormField>
                    <FormField label="Senha">
                      <input type="password" placeholder="Senha" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" />
                    </FormField>
                    <button className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Entrar</button>
                  </div>
                </AuthCard>
              </div>
            </div>
          </ComponentCard>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-muted-foreground">
          Motor Hero UI Kit · Componentes para React + shadcn/ui + Tailwind CSS v4
        </div>
      </footer>
    </div>
  )
}
