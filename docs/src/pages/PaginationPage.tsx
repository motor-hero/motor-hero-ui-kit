import { useState } from "react"
import { Pagination } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function PaginationPage() {
  const [page, setPage] = useState(1)
  const totalPages = 5

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pagination</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Controles de paginacao com botoes anterior/proximo e indicador de pagina atual.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Interativo</h2>
        <div className="rounded-lg border bg-card p-6">
          <Pagination
            page={page}
            onPageChange={setPage}
            hasNextPage={page < totalPages}
            hasPreviousPage={page > 1}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Estados</h2>
        <div className="rounded-lg border bg-card p-6 space-y-6">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Primeira pagina:</p>
            <Pagination page={1} onPageChange={() => {}} hasNextPage hasPreviousPage={false} />
          </div>
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Pagina intermediaria:</p>
            <Pagination page={3} onPageChange={() => {}} hasNextPage hasPreviousPage />
          </div>
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Ultima pagina:</p>
            <Pagination page={5} onPageChange={() => {}} hasNextPage={false} hasPreviousPage />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { Pagination } from "@motor-hero/ui-kit"

const [page, setPage] = useState(1)

<Pagination
  page={page}
  onPageChange={setPage}
  hasNextPage={page < totalPages}
  hasPreviousPage={page > 1}
/>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "page", type: "number", required: true, description: "Pagina atual" },
            { name: "onPageChange", type: "(page: number) => void", required: true, description: "Callback ao mudar de pagina" },
            { name: "hasNextPage", type: "boolean", required: true, description: "Habilita botao proximo" },
            { name: "hasPreviousPage", type: "boolean", required: true, description: "Habilita botao anterior" },
            { name: "className", type: "string", description: "Classes adicionais" },
          ]}
        />
      </div>
    </div>
  )
}
