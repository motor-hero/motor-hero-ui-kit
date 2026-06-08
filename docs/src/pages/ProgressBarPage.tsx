import { ProgressBar } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function ProgressBarPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ProgressBar</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Barra de progresso de 0 a 100%, com rótulo e valor opcionais acima da
          barra. O valor é sempre limitado entre 0 e 100.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="space-y-6 rounded-lg border bg-card p-6">
          <ProgressBar value={25} />
          <ProgressBar value={60} />
          <ProgressBar value={100} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Com rótulo e valor</h2>
        <div className="rounded-lg border bg-card p-6">
          <ProgressBar
            value={24.67}
            label="37 / 150 hectares"
            valueLabel="24,67%"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Tamanhos</h2>
        <div className="space-y-6 rounded-lg border bg-card p-6">
          <ProgressBar value={70} size="sm" />
          <ProgressBar value={70} size="md" />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Cor personalizada</h2>
        <div className="space-y-6 rounded-lg border bg-card p-6">
          <ProgressBar value={80} indicatorClassName="bg-green-500" />
          <ProgressBar value={40} indicatorClassName="bg-red-500" />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { ProgressBar } from "@motor-hero/ui-kit"

<ProgressBar value={70} />

<ProgressBar
  value={24.67}
  label="37 / 150 hectares"
  valueLabel="24,67%"
/>

<ProgressBar value={80} size="sm" indicatorClassName="bg-green-500" />`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            {
              name: "value",
              type: "number",
              required: true,
              description: "Progresso de 0 a 100 (limitado automaticamente)",
            },
            {
              name: "size",
              type: '"sm" | "md"',
              default: '"md"',
              description: "Altura da barra (sm = 6px, md = 8px)",
            },
            {
              name: "label",
              type: "ReactNode",
              description: "Rótulo exibido à esquerda, acima da barra",
            },
            {
              name: "valueLabel",
              type: "ReactNode",
              description: "Valor exibido à direita, acima da barra",
            },
            {
              name: "indicatorClassName",
              type: "string",
              default: '"bg-primary"',
              description: "Classe da barra de preenchimento (cor)",
            },
            {
              name: "className",
              type: "string",
              description: "Classes adicionais no container",
            },
          ]}
        />
      </div>
    </div>
  )
}
