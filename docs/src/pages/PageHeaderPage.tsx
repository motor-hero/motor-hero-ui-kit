import { PageHeader } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function PageHeaderPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">PageHeader</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Cabeçalho de página com título, descrição e área para ação (botão de adicionar, por exemplo).
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Com ação</h2>
        <div className="rounded-lg border bg-card p-6">
          <PageHeader
            title="Usuários"
            description="Gerencie os usuários do sistema"
            action={
              <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                + Adicionar
              </button>
            }
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Sem ação</h2>
        <div className="rounded-lg border bg-card p-6">
          <PageHeader
            title="Dashboard"
            description="Visão geral do sistema"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { PageHeader } from "@motor-hero/ui-kit"

<PageHeader
  title="Usuários"
  description="Gerencie os usuários do sistema"
  action={<Button>+ Adicionar</Button>}
/>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "title", type: "string", required: true, description: "Título da página" },
            { name: "description", type: "string", description: "Descrição abaixo do título" },
            { name: "action", type: "ReactNode", description: "Elemento de ação (botão, link, etc.)" },
            { name: "className", type: "string", description: "Classes adicionais" },
          ]}
        />
      </div>
    </div>
  )
}
