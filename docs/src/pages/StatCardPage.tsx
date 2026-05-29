import { StatCard } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function StatCardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">StatCard</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Card de estatistica para dashboards com suporte a skeleton loading.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="Usuarios" value={42} detail="38 ativos" />
            <StatCard label="Empresas" value={8} detail="6 ativas" />
            <StatCard label="Receita" value="R$ 12.5k" detail="+15% este mes" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Loading</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="" value={0} isLoading />
            <StatCard label="" value={0} isLoading />
            <StatCard label="" value={0} isLoading />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { StatCard } from "@motor-hero/ui-kit"

<div className="grid grid-cols-3 gap-4">
  <StatCard label="Usuarios" value={42} detail="38 ativos" />
  <StatCard label="Empresas" value={8} detail="6 ativas" />
  <StatCard label="Carregando..." value={0} isLoading />
</div>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "label", type: "string", required: true, description: "Titulo do card" },
            { name: "value", type: "ReactNode", required: true, description: "Valor principal exibido" },
            { name: "detail", type: "string", description: "Texto auxiliar abaixo do valor" },
            { name: "icon", type: "ReactNode", description: "Icone no canto superior direito" },
            { name: "isLoading", type: "boolean", default: "false", description: "Exibe skeleton loading" },
          ]}
        />
      </div>
    </div>
  )
}
