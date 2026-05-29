import { StatusDot } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function StatusDotPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">StatusDot</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Indicador visual de status ativo/inativo com dot colorido e label opcional.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-wrap gap-8">
            <StatusDot active label="Ativo" />
            <StatusDot active={false} label="Inativo" />
            <StatusDot active />
            <StatusDot active={false} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Em contexto</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nome</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">Joao Silva</td>
                  <td className="px-4 py-3"><StatusDot active label="Ativo" /></td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Maria Santos</td>
                  <td className="px-4 py-3"><StatusDot active label="Ativo" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Carlos Lima</td>
                  <td className="px-4 py-3"><StatusDot active={false} label="Inativo" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { StatusDot } from "@motor-hero/ui-kit"

<StatusDot active label="Ativo" />
<StatusDot active={false} label="Inativo" />
<StatusDot active />  {/* Sem label */}`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "active", type: "boolean", required: true, description: "Define se o status e ativo (verde) ou inativo (vermelho)" },
            { name: "label", type: "string", description: "Texto exibido ao lado do dot" },
            { name: "className", type: "string", description: "Classes adicionais" },
          ]}
        />
      </div>
    </div>
  )
}
