import { HighlightPill } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function HighlightPillPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">HighlightPill</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Pílula com cor de fundo/texto livres, definidas pelo consumidor —
          diferente do <code>StatusBadge</code>, que é um enum fechado de
          variantes. Útil para atribuir cor a uma entidade (ex.: tag de
          usuário, categoria).
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Cores custom</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-wrap gap-3">
            <HighlightPill backgroundColor="#dbeafe" textColor="#1e40af">
              Azul
            </HighlightPill>
            <HighlightPill backgroundColor="#dcfce7" textColor="#166534">
              Verde
            </HighlightPill>
            <HighlightPill backgroundColor="#fce7f3" textColor="#9d174d">
              Rosa
            </HighlightPill>
            <HighlightPill backgroundColor="#fef3c7" textColor="#92400e">
              Âmbar
            </HighlightPill>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Sem cor (default muted)</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-wrap gap-3">
            <HighlightPill>João Silva</HighlightPill>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { HighlightPill } from "@motor-hero/ui-kit"

<HighlightPill backgroundColor="#dbeafe" textColor="#1e40af">
  João Silva
</HighlightPill>

// Sem cor definida — cai no tom neutro/muted do StatusBadge
<HighlightPill>João Silva</HighlightPill>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            {
              name: "backgroundColor",
              type: "string",
              description:
                "Cor de fundo (qualquer valor CSS válido). Ausente ⇒ tom neutro/muted (--status-neutral-surface)",
            },
            {
              name: "textColor",
              type: "string",
              description:
                "Cor do texto. Ausente ⇒ tom neutro/muted (--status-neutral-text)",
            },
            {
              name: "children",
              type: "ReactNode",
              required: true,
              description: "Conteúdo da pílula",
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
