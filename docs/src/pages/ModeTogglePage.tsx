import { ModeToggle } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function ModeTogglePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ModeToggle</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Dropdown para alternar entre temas claro, escuro e sistema. Requer ThemeProvider no root da aplicacao.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <ModeToggle />
            <span className="text-sm text-muted-foreground">Clique para alternar o tema</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { ThemeProvider, ModeToggle } from "@motor-hero/ui-kit"

// No root da aplicacao:
<ThemeProvider defaultTheme="dark">
  <App />
</ThemeProvider>

// Em qualquer lugar da arvore:
<ModeToggle />`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Dependencias</h2>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            O ModeToggle depende do <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">ThemeProvider</code> para
            funcionar. Certifique-se de que ele esta envolvendo sua aplicacao.
            Utiliza <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">@radix-ui/react-dropdown-menu</code> e
            icones do <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">lucide-react</code>.
          </p>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "(nenhuma)", type: "\u2014", description: "Este componente nao recebe props. Utiliza o useTheme() internamente." },
          ]}
        />
      </div>
    </div>
  )
}
