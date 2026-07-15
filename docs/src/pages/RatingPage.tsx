import { useState } from "react"
import { Rating } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function RatingPage() {
  const [value, setValue] = useState(3)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rating</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Avaliação por estrelas, de 1 a 5. Interativa (clique e teclado) ou
          somente leitura, para exibir uma nota já registrada.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Interativo</h2>
        <div className="rounded-lg border bg-card p-6">
          <Rating value={value} onChange={setValue} />
          <p className="mt-3 text-sm text-muted-foreground">
            Nota atual: {value || "sem nota"}
          </p>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Somente leitura</h2>
        <div className="flex flex-wrap items-center gap-6 rounded-lg border bg-card p-6">
          <Rating value={2} readOnly />
          <Rating value={4} readOnly />
          <Rating value={0} readOnly />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Tamanhos</h2>
        <div className="flex items-center gap-6 rounded-lg border bg-card p-6">
          <Rating value={3} readOnly size="sm" />
          <Rating value={3} readOnly size="md" />
          <Rating value={3} readOnly size="lg" />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { Rating } from "@motor-hero/ui-kit"

const [value, setValue] = useState(0)

<Rating value={value} onChange={setValue} />

// Somente leitura, para exibir uma nota já registrada
<Rating value={4} readOnly />`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            {
              name: "value",
              type: "number",
              default: "0",
              description: "Nota atual, de 1 a 5. 0 ou undefined é \"sem nota\"",
            },
            {
              name: "onChange",
              type: "(value: number) => void",
              description:
                "Chamado com a nova nota (1-5) ao selecionar uma estrela. Não é chamado ao clicar de novo na estrela já selecionada, nem em modo readOnly",
            },
            {
              name: "readOnly",
              type: "boolean",
              default: "false",
              description:
                "Renderiza só a visualização estática (sem ToggleGroup nem interação)",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Tamanho das estrelas",
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
