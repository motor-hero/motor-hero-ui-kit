import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function ThemeProviderPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ThemeProvider</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          O wrapper de layout mais externo do app. Controla os dois eixos do
          tema — o <strong className="text-foreground">modo</strong> (claro/escuro/sistema)
          e a <strong className="text-foreground">marca</strong> (qual tenant) — e
          aplica tudo como CSS custom properties no <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">&lt;html&gt;</code>.
          A prop opcional <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">companyTheme</code> habilita
          o multi-tenancy. Sem ela, o kit usa o tema zinc padrão — apps existentes não mudam.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">ThemeProvider — Props</h2>
        <PropsTable
          props={[
            { name: "children", type: "ReactNode", required: true, description: "Sua árvore de aplicação." },
            { name: "defaultTheme", type: `"light" | "dark" | "system"`, default: `"system"`, description: "Modo inicial quando não há preferência salva no localStorage." },
            { name: "storageKey", type: "string", default: `"ui-theme"`, description: "Chave do localStorage onde a preferência de modo é persistida." },
            { name: "companyTheme", type: "CompanyTheme", description: "Tema da marca por tenant. Omitido = tema zinc padrão do kit." },
          ]}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso básico</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Envolva a aplicação inteira uma única vez, na raiz. Para um app de uma só
          marca, só o modo importa:
        </p>
        <CodeBlock
          code={`import { ThemeProvider } from "@motor-hero/ui-kit"

<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">useTheme()</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Dentro da árvore, leia ou troque o modo com o hook{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">useTheme()</code>.
          Fora de um <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">ThemeProvider</code> ele lança erro.
        </p>
        <CodeBlock
          code={`import { useTheme } from "@motor-hero/ui-kit"

function ModeSwitch() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Modo atual: {theme}
    </button>
  )
}`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Multi-tenancy: os dois eixos</h2>
        <p className="text-sm text-muted-foreground">
          Tema não é só "claro/escuro". São dois eixos independentes que se
          combinam: a <strong className="text-foreground">marca</strong> (qual tenant)
          e o <strong className="text-foreground">modo</strong> (claro/escuro). Cada
          tenant precisa de valores para os dois modos.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Tenant \ Modo</th>
                <th className="px-4 py-3 text-left font-medium">Claro</th>
                <th className="px-4 py-3 text-left font-medium">Escuro</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-medium">Company A</td>
                <td className="px-4 py-3 text-muted-foreground">primary verde</td>
                <td className="px-4 py-3 text-muted-foreground">primary verde (ou override)</td>
              </tr>
              <tr className="last:border-0">
                <td className="px-4 py-3 font-medium">Company B</td>
                <td className="px-4 py-3 text-muted-foreground">primary azul</td>
                <td className="px-4 py-3 text-muted-foreground">primary azul (ou override)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">O contrato mínimo</h2>
        <p className="text-sm text-muted-foreground">
          Só o grupo <strong className="text-foreground">marca</strong> é por
          tenant. Os neutros (<code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">background</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">card</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">border</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">muted</code>…) e os de
          status (<code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">destructive</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">success</code>) são
          compartilhados e respondem só ao modo — <strong className="text-foreground">não os configure por tenant</strong>.
        </p>
        <div className="mt-4">
          <PropsTable
            props={[
              { name: "primary", type: "string", required: true, description: "A cor principal da marca." },
              { name: "primaryForeground", type: "string", required: true, description: "Texto/ícone sobre a primary. Você garante o contraste, o kit não calcula." },
              { name: "secondary", type: "string", description: "Cor secundária da marca." },
              { name: "secondaryForeground", type: "string", description: "Texto/ícone sobre a secondary." },
              { name: "accent", type: "string", description: "Cor de destaque da marca." },
              { name: "accentForeground", type: "string", description: "Texto/ícone sobre o accent." },
              { name: "ring", type: "string", description: "Cor do anel de foco. Se omitida, herda o padrão neutro." },
            ]}
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Mínimo viável por tenant: <strong className="text-foreground">2 cores</strong>{" "}
          (<code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">primary</code> +{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">primaryForeground</code>).
          A marca completa tem três cores — <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">primary</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">secondary</code> e{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">accent</code> — cada uma com seu foreground.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Passando o tema do tenant</h2>
        <CodeBlock
          code={`import { ThemeProvider } from "@motor-hero/ui-kit"
import type { CompanyTheme } from "@motor-hero/ui-kit"

// Buscado da API por tenant (subdomínio, login etc.):
const companyTheme: CompanyTheme = {
  light: {
    primary: "hsl(145 63% 32%)",
    primaryForeground: "hsl(0 0% 100%)",
    secondary: "hsl(0 0% 96%)",
    secondaryForeground: "hsl(0 0% 12%)",
    accent: "hsl(45 95% 55%)",
    accentForeground: "hsl(0 0% 8%)",
  },
  // Opcional e parcial: só os tokens que mudam no escuro.
  dark: {
    primary: "hsl(145 50% 55%)",
  },
}

<ThemeProvider defaultTheme="dark" companyTheme={companyTheme}>
  <App />
</ThemeProvider>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Wrapper no front-end</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Na prática você não passa um objeto literal. Cada app cria um wrapper
          (ex.: <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">AppThemeProvider</code>) que
          descobre o tenant, busca o tema na API e só então renderiza o{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">ThemeProvider</code>. O
          hook <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">useCompanySubdomain</code> faz
          a detecção pelo subdomínio (lendo <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">window.location</code>,
          então roda no cliente).
        </p>
        <CodeBlock
          code={`import { useEffect, useState } from "react"
import {
  ThemeProvider,
  useCompanySubdomain,
  type CompanyTheme,
} from "@motor-hero/ui-kit"

// A forma do retorno é sua; só precisa terminar como um CompanyTheme.
async function fetchCompanyTheme(
  subdomain: string,
): Promise<CompanyTheme | undefined> {
  const res = await fetch(\`/api/companies/\${subdomain}/theme\`)
  if (!res.ok) return undefined
  return res.json()
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  // 1. Descobre o tenant pelo subdomínio (acme.motorhero.com.br -> "acme").
  //    enableOverride permite ?company=acme em dev/QA.
  const { subdomain } = useCompanySubdomain({ enableOverride: true })

  // Guardar o tema em estado mantém a referência estável entre renders.
  const [companyTheme, setCompanyTheme] = useState<CompanyTheme>()
  const [loading, setLoading] = useState(Boolean(subdomain))

  // 2. Resolve o tema do tenant uma vez, na borda do app.
  useEffect(() => {
    if (!subdomain) return
    let active = true
    fetchCompanyTheme(subdomain)
      .then((theme) => active && setCompanyTheme(theme))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [subdomain])

  // 3. Não pisque a marca errada: segure o render até o tema chegar.
  if (loading) return null // ou um splash/skeleton

  // 4. Sem tenant/tema, companyTheme é undefined e cai no zinc padrão.
  return (
    <ThemeProvider defaultTheme="system" companyTheme={companyTheme}>
      {children}
    </ThemeProvider>
  )
}`}
        />
        <p className="mt-4 mb-2 text-sm text-muted-foreground">
          E na raiz, este é o único provider que o app conhece:
        </p>
        <CodeBlock
          code={`import { AppThemeProvider } from "./AppThemeProvider"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppThemeProvider>
    <App />
  </AppThemeProvider>,
)`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Por que um wrapper</h2>
        <div className="rounded-lg border p-5">
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Uma só borda.</strong> Detecção do tenant,
              fetch e fallback vivem em um único lugar. Os componentes do app nunca sabem
              qual tenant é — só consomem os tokens. Trocar a fonte do tema (API, login,
              config) muda este arquivo e mais nada.
            </li>
            <li>
              <strong className="text-foreground">Resolve antes de renderizar.</strong> Buscar
              o tema e só então montar a árvore evita o flash da marca errada (FOUC). Por
              isso o <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">if (loading)</code> segura
              o render até o <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">companyTheme</code> chegar.
            </li>
            <li>
              <strong className="text-foreground">Referência estável.</strong> Guardar o tema em
              estado (ou <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">useMemo</code>) mantém
              a identidade do objeto. O <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">ThemeProvider</code> só
              reaplica as CSS vars quando o tema realmente muda — não a cada render.
              Nunca construa o objeto inline no JSX.
            </li>
            <li>
              <strong className="text-foreground">Fallback seguro.</strong> Sem subdomínio ou
              sem tema, <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">companyTheme</code> fica{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">undefined</code> e o kit usa o
              zinc padrão. Nada quebra.
            </li>
            <li>
              <strong className="text-foreground">Trocar de tenant = trocar de subdomínio.</strong> O
              subdomínio é lido uma vez no mount, então alternar entre marcas é uma
              navegação de página inteira. Não há estado de tenant para limpar dentro do app.
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Regras &amp; convenções</h2>
        <div className="rounded-lg border p-5">
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Só a marca é por tenant.</strong> Neutros e
              status são compartilhados — não os coloque no <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">companyTheme</code>.
            </li>
            <li>
              <strong className="text-foreground"><code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">dark</code> é opcional e parcial.</strong> Informe
              apenas os tokens que mudam no escuro; o resto herda do <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">light</code>.
              Muitas marcas usam a mesma cor nos dois modos.
            </li>
            <li>
              <strong className="text-foreground">Formato do valor:</strong> qualquer cor CSS
              válida (<code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">hsl(...)</code>,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">#hex</code>,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">oklch(...)</code>).
              Prefira <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">hsl(...)</code> para casar com o resto do kit.
            </li>
            <li>
              <strong className="text-foreground">Contraste é responsabilidade sua.</strong> Defina
              os <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">*Foreground</code> com contraste AA sobre a cor de fundo — o kit não os deriva.
            </li>
            <li>
              <strong className="text-foreground">Sem conflito de cascata.</strong> As cores entram
              como estilo inline no <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">&lt;html&gt;</code>, então
              vencem o <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">.dark</code> e qualquer{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">@theme</code> do app, e são reaplicadas a cada troca de modo.
            </li>
            <li>
              <strong className="text-foreground">Memoize o objeto.</strong> Use{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">useMemo</code> ou estado no{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">companyTheme</code> para não reaplicar a cada render.
            </li>
            <li>
              <strong className="text-foreground">Compatível por padrão.</strong> Sem a prop{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">companyTheme</code>, o kit
              usa o tema zinc claro/escuro de sempre. Nenhum app existente é afetado.
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Tipos</h2>
        <CodeBlock
          language="ts"
          code={`type CompanyThemeTokens = {
  primary?: string | null
  primaryForeground?: string | null
  secondary?: string | null
  secondaryForeground?: string | null
  accent?: string | null
  accentForeground?: string | null
  ring?: string | null
}

type CompanyTheme = {
  light: CompanyThemeTokens
  dark?: Partial<CompanyThemeTokens>
}`}
        />
      </div>
    </div>
  )
}
