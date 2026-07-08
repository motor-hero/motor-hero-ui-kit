import { useState } from "react"
import { Pagination } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

const SIZE_DEMO_TOTAL_ITEMS = 237

export function PaginationPage() {
  const [page, setPage] = useState(1)
  const totalPages = 5

  const [pageWithTotal, setPageWithTotal] = useState(1)

  const [pageWithSize, setPageWithSize] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const sizeTotalPages = Math.ceil(SIZE_DEMO_TOTAL_ITEMS / pageSize)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pagination</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Controles de paginação com botões anterior/próximo, indicador de página atual (com
          total de páginas opcional) e seletor de itens por página.
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
        <h2 className="mb-4 text-xl font-semibold">Com total de páginas</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Informe <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">totalPages</code> para
          mostrar "Página X de Y" no lugar de apenas "Página X".
        </p>
        <div className="rounded-lg border bg-card p-6">
          <Pagination
            page={pageWithTotal}
            onPageChange={setPageWithTotal}
            hasNextPage={pageWithTotal < totalPages}
            hasPreviousPage={pageWithTotal > 1}
            totalPages={totalPages}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Com seletor de itens por página</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          A flag <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">showPageSizeSelector</code>{" "}
          exibe um dropdown de itens por página. Ao trocar o valor, volte a página para 1 — é
          responsabilidade de quem consome o componente.
        </p>
        <div className="rounded-lg border bg-card p-6">
          <Pagination
            page={pageWithSize}
            onPageChange={setPageWithSize}
            hasNextPage={pageWithSize < sizeTotalPages}
            hasPreviousPage={pageWithSize > 1}
            totalPages={sizeTotalPages}
            showPageSizeSelector
            pageSize={pageSize}
            onPageSizeChange={(size) => {
              setPageSize(size)
              setPageWithSize(1)
            }}
            pageSizeOptions={[10, 25, 50, 100]}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Estados</h2>
        <div className="rounded-lg border bg-card p-6 space-y-6">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Primeira página:</p>
            <Pagination page={1} onPageChange={() => {}} hasNextPage hasPreviousPage={false} />
          </div>
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Página intermediária:</p>
            <Pagination page={3} onPageChange={() => {}} hasNextPage hasPreviousPage />
          </div>
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Última página:</p>
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
        <h2 className="mb-4 text-xl font-semibold">Uso avançado</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Combinando <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">totalPages</code> com{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">showPageSizeSelector</code> — o
          padrão típico de uma listagem paginada pelo backend, que já devolve{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">pages</code> na resposta:
        </p>
        <CodeBlock
          code={`import { Pagination } from "@motor-hero/ui-kit"

const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(10)

const setPageSizeAndReset = (size: number) => {
  setPageSize(size)
  setPage(1)
}

<Pagination
  page={page}
  onPageChange={setPage}
  hasNextPage={page < (data?.pages ?? page)}
  hasPreviousPage={page > 1}
  totalPages={data?.pages}
  showPageSizeSelector
  pageSize={pageSize}
  onPageSizeChange={setPageSizeAndReset}
  pageSizeOptions={[10, 25, 50, 100]}
/>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "page", type: "number", required: true, description: "Página atual" },
            { name: "onPageChange", type: "(page: number) => void", required: true, description: "Callback ao mudar de página" },
            { name: "hasNextPage", type: "boolean", required: true, description: "Habilita botão próximo" },
            { name: "hasPreviousPage", type: "boolean", required: true, description: "Habilita botão anterior" },
            { name: "totalPages", type: "number", description: "Total de páginas. Quando informado, mostra \"Página X de Y\"." },
            { name: "showPageSizeSelector", type: "boolean", default: "false", description: "Exibe o seletor de itens por página." },
            { name: "pageSize", type: "number", description: "Itens por página selecionado (usar com showPageSizeSelector)." },
            { name: "onPageSizeChange", type: "(size: number) => void", description: "Callback ao mudar itens por página." },
            { name: "pageSizeOptions", type: "number[]", description: "Opções do seletor, ex.: [10, 25, 50, 100]." },
            { name: "className", type: "string", description: "Classes adicionais" },
          ]}
        />
      </div>
    </div>
  )
}
