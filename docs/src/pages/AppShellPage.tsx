import { ModeToggle, SidebarNav, UserMenu, type NavItem } from "@motor-hero/ui-kit"
import { Building2, Home, Settings, Users } from "lucide-react"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

const demoItems: NavItem[] = [
  { label: "Início", href: "/", icon: <Home className="h-4 w-4" /> },
  { label: "Empresas", href: "/companies", icon: <Building2 className="h-4 w-4" /> },
  { label: "Usuários", href: "/admin", icon: <Users className="h-4 w-4" />, adminOnly: true },
  { label: "Configurações", href: "/settings", icon: <Settings className="h-4 w-4" /> },
]

const demoUser = { name: "Leonardo Florentino", email: "leo@motorhero.com.br" }

export function AppShellPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AppShell</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Layout de aplicação completo — sidebar colapsável, drawer mobile e topbar com menu do usuário.
          Agnóstico de router: você passa <code className="rounded bg-muted px-1 py-0.5 text-sm">renderLink</code> e{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-sm">activePath</code>.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Anatomia do layout</h2>
        <p className="mb-4 text-muted-foreground">
          Preview contido com os componentes reais. Em uso real o <code className="rounded bg-muted px-1 py-0.5 text-sm">AppShell</code>{" "}
          ocupa a altura total da viewport.
        </p>
        <div className="h-[440px] overflow-hidden rounded-lg border">
          <div className="flex h-full">
            <div className="flex w-56 shrink-0 flex-col border-r bg-card">
              <div className="flex h-14 shrink-0 items-center border-b px-4 font-semibold tracking-tight">
                Motor Hero
              </div>
              <div className="flex-1 overflow-y-auto px-2 py-4">
                <SidebarNav items={demoItems} activePath="/companies" isAdmin />
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
                <div className="ml-auto flex items-center gap-2">
                  <ModeToggle />
                  <UserMenu user={demoUser} onLogout={() => {}} items={[{ label: "Meu perfil", href: "/settings" }]} />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 text-sm text-muted-foreground">
                Conteúdo da página…
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { AppShell } from "@motor-hero/ui-kit"
import { Link, useLocation } from "react-router-dom"
import { Home, Building2, Users, Settings } from "lucide-react"

const navItems = [
  { label: "Início", href: "/", icon: <Home className="h-4 w-4" /> },
  { label: "Empresas", href: "/companies", icon: <Building2 className="h-4 w-4" /> },
  { label: "Usuários", href: "/admin", icon: <Users className="h-4 w-4" />, adminOnly: true },
  { label: "Configurações", href: "/settings", icon: <Settings className="h-4 w-4" /> },
]

function Layout({ children }) {
  const { pathname } = useLocation()
  return (
    <AppShell
      brand={<span className="font-semibold">Motor Hero</span>}
      navItems={navItems}
      activePath={pathname}
      isAdmin={user.isSuperuser}
      user={{ name: user.name, email: user.email }}
      onLogout={logout}
      headerActions={<ModeToggle />}
      renderLink={({ href, children, ...props }) => (
        <Link to={href} {...props}>{children}</Link>
      )}
    >
      {children}
    </AppShell>
  )
}`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Integração com o router</h2>
        <p className="mb-4 text-muted-foreground">
          O kit não depende de nenhum router. O <code className="rounded bg-muted px-1 py-0.5 text-sm">renderLink</code>{" "}
          recebe <code className="rounded bg-muted px-1 py-0.5 text-sm">{`{ href, children, className, onClick }`}</code> e
          você renderiza o link do seu router. Sem ele, cai num <code className="rounded bg-muted px-1 py-0.5 text-sm">&lt;a href&gt;</code> nativo.
        </p>
        <CodeBlock
          code={`// react-router
renderLink={({ href, children, ...p }) => <Link to={href} {...p}>{children}</Link>}

// TanStack Router
renderLink={({ href, children, ...p }) => <Link to={href} {...p}>{children}</Link>}

// Next.js
renderLink={({ href, children, ...p }) => <Link href={href} {...p}>{children}</Link>}`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">AppShell — Props</h2>
        <PropsTable
          props={[
            { name: "brand", type: "ReactNode", required: true, description: "Logo/título exibido no topo da sidebar" },
            { name: "brandCollapsed", type: "ReactNode", description: "Versão compacta da marca (sidebar recolhida)" },
            { name: "navItems", type: "NavItem[]", required: true, description: "Itens de navegação" },
            { name: "activePath", type: "string", required: true, description: "Rota atual (ex.: useLocation().pathname)" },
            { name: "isActive", type: "(item, activePath) => boolean", description: "Override do matcher de item ativo" },
            { name: "isAdmin", type: "boolean", description: "Exibe itens marcados como adminOnly" },
            { name: "user", type: "AppUser", description: "Dados do usuário para o menu (name, email, avatarUrl)" },
            { name: "userMenuItems", type: "UserMenuItem[]", description: "Itens extras no menu do usuário" },
            { name: "onLogout", type: "() => void", description: "Callback de logout" },
            { name: "renderLink", type: "RenderLink", description: "Render prop do link do seu router (default <a>)" },
            { name: "headerActions", type: "ReactNode", description: "Ações à direita da topbar (ex.: ModeToggle)" },
            { name: "collapsible", type: "boolean", description: "Permite recolher a sidebar (default true)" },
            { name: "defaultCollapsed", type: "boolean", description: "Inicia recolhida (default false)" },
            { name: "children", type: "ReactNode", required: true, description: "Conteúdo da página (área que rola)" },
          ]}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">SidebarNav — isolado</h2>
        <p className="mb-4 text-muted-foreground">A navegação também é exportada separadamente. Expandida e recolhida:</p>
        <div className="flex gap-4">
          <div className="w-56 rounded-lg border bg-card p-2">
            <SidebarNav items={demoItems} activePath="/companies" isAdmin />
          </div>
          <div className="w-16 rounded-lg border bg-card p-2">
            <SidebarNav items={demoItems} activePath="/companies" isAdmin isCollapsed />
          </div>
        </div>
        <div className="mt-4">
          <PropsTable
            props={[
              { name: "items", type: "NavItem[]", required: true, description: "Itens de navegação" },
              { name: "activePath", type: "string", required: true, description: "Rota atual" },
              { name: "isActive", type: "(item, activePath) => boolean", description: "Override do matcher" },
              { name: "isAdmin", type: "boolean", description: "Exibe itens adminOnly" },
              { name: "isCollapsed", type: "boolean", description: "Modo recolhido (só ícones)" },
              { name: "renderLink", type: "RenderLink", description: "Render prop do link" },
              { name: "onNavigate", type: "() => void", description: "Callback ao clicar (ex.: fechar drawer)" },
            ]}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">UserMenu — isolado</h2>
        <p className="mb-4 text-muted-foreground">Avatar com iniciais (ou imagem) e dropdown de conta:</p>
        <div className="flex items-center gap-4 rounded-lg border bg-card p-6">
          <UserMenu user={demoUser} onLogout={() => {}} items={[{ label: "Meu perfil", href: "/settings" }]} />
          <span className="text-sm text-muted-foreground">← clique para abrir</span>
        </div>
        <div className="mt-4">
          <PropsTable
            props={[
              { name: "user", type: "AppUser", description: "name, email, avatarUrl — gera iniciais quando sem imagem" },
              { name: "items", type: "UserMenuItem[]", description: "Itens do menu (label, icon, href ou onClick)" },
              { name: "onLogout", type: "() => void", description: "Callback de logout (item destacado)" },
              { name: "logoutLabel", type: "string", description: 'Texto do logout (default "Sair")' },
              { name: "renderLink", type: "RenderLink", description: "Render prop do link" },
              { name: "align", type: '"start" | "center" | "end"', description: "Alinhamento do dropdown (default end)" },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
