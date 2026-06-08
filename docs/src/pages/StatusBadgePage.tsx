import { StatusBadge } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function StatusBadgePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">StatusBadge</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Badge em formato de pílula com dot colorido, para representar estados
          ou categorias. Cinco variantes semânticas prontas.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Variantes</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-wrap gap-3">
            <StatusBadge variant="neutral">Não iniciado</StatusBadge>
            <StatusBadge variant="info">Em andamento</StatusBadge>
            <StatusBadge variant="success">Concluído</StatusBadge>
            <StatusBadge variant="danger">Atrasado</StatusBadge>
            <StatusBadge variant="warning">Atenção</StatusBadge>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Sem dot</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-wrap gap-3">
            <StatusBadge variant="info" dot={false}>
              2026
            </StatusBadge>
            <StatusBadge variant="success" dot={false}>
              Ativo
            </StatusBadge>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { StatusBadge } from "@motor-hero/ui-kit"

<StatusBadge variant="success">Concluído</StatusBadge>
<StatusBadge variant="info">Em andamento</StatusBadge>
<StatusBadge variant="neutral" dot={false}>2026</StatusBadge>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"neutral" | "info" | "success" | "danger" | "warning"',
              default: '"neutral"',
              description:
                "Cor semântica: neutral (cinza), info (azul), success (verde), danger (vermelho), warning (âmbar)",
            },
            {
              name: "dot",
              type: "boolean",
              default: "true",
              description: "Exibe o dot colorido antes do texto",
            },
            {
              name: "children",
              type: "ReactNode",
              required: true,
              description: "Conteúdo do badge",
            },
            {
              name: "className",
              type: "string",
              description: "Classes adicionais",
            },
          ]}
        />
      </div>
    </div>
  )
}
