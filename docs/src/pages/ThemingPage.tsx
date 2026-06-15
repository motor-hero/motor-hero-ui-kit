import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function ThemingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Temas Multi-tenant</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Um mesmo app pode servir várias marcas (tenants), cada uma com suas
          cores, e ainda alternar entre claro e escuro. O <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">ThemeProvider</code> aceita
          uma prop opcional <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">tenantTheme</code> para
          isso. Sem ela, o kit usa o tema zinc padrão — apps existentes não mudam.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Os dois eixos</h2>
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
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { ThemeProvider } from "@motor-hero/ui-kit"
import type { TenantTheme } from "@motor-hero/ui-kit"

// Buscado da API por tenant (subdomínio, login etc.):
const tenantTheme: TenantTheme = {
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

<ThemeProvider defaultTheme="dark" tenantTheme={tenantTheme}>
  <App />
</ThemeProvider>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Regras &amp; convenções</h2>
        <div className="rounded-lg border p-5">
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Só a marca é por tenant.</strong> Neutros e
              status são compartilhados — não os coloque no <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">tenantTheme</code>.
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
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">useMemo</code> no{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">tenantTheme</code> para não reaplicar a cada render.
            </li>
            <li>
              <strong className="text-foreground">Compatível por padrão.</strong> Sem a prop{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">tenantTheme</code>, o kit
              usa o tema zinc claro/escuro de sempre. Nenhum app existente é afetado.
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Tipos</h2>
        <CodeBlock
          language="ts"
          code={`type TenantTokenSet = {
  primary?: string
  primaryForeground?: string
  secondary?: string
  secondaryForeground?: string
  accent?: string
  accentForeground?: string
  ring?: string
}

type TenantTheme = {
  light: TenantTokenSet
  dark?: Partial<TenantTokenSet>
}`}
        />
      </div>
    </div>
  )
}
