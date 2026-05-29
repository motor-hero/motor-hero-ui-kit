import { PageHeader } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function PageHeaderPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">PageHeader</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Cabecalho de pagina com titulo, descricao e area para acao (botao de adicionar, por exemplo).
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Com acao</h2>
        <div className="rounded-lg border bg-card p-6">
          <PageHeader
            title="Usuarios"
            description="Gerencie os usuarios do sistema"
            action={
              <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                + Adicionar
              </button>
            }
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Sem acao</h2>
        <div className="rounded-lg border bg-card p-6">
          <PageHeader
            title="Dashboard"
            description="Visao geral do sistema"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { PageHeader } from "@motor-hero/ui-kit"

<PageHeader
  title="Usuarios"
  description="Gerencie os usuarios do sistema"
  action={<Button>+ Adicionar</Button>}
/>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "title", type: "string", required: true, description: "Titulo da pagina" },
            { name: "description", type: "string", description: "Descricao abaixo do titulo" },
            { name: "action", type: "ReactNode", description: "Elemento de acao (botao, link, etc.)" },
            { name: "className", type: "string", description: "Classes adicionais" },
          ]}
        />
      </div>
    </div>
  )
}
