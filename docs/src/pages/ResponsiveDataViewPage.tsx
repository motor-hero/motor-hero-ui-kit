import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function ResponsiveDataViewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ResponsiveDataView</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          View responsiva que exibe uma tabela no desktop e cards no mobile, com empty state e paginação integrados.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Comportamento</h2>
        <div className="rounded-lg border p-4 space-y-3">
          <div className="flex items-start gap-3">
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-mono shrink-0">Desktop</span>
            <p className="text-sm text-muted-foreground">Exibe o conteúdo passado em <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">table</code></p>
          </div>
          <div className="flex items-start gap-3">
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-mono shrink-0">Mobile</span>
            <p className="text-sm text-muted-foreground">Exibe o conteúdo passado em <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">cards</code></p>
          </div>
          <div className="flex items-start gap-3">
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-mono shrink-0">Vazio</span>
            <p className="text-sm text-muted-foreground">Exibe empty state quando <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">isEmpty</code> é true</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { ResponsiveDataView, MobileCardList, TableSkeleton, Pagination } from "@motor-hero/ui-kit"

<ResponsiveDataView
  table={
    <table>
      <thead>...</thead>
      <tbody>
        {isLoading ? <TableSkeleton /> : data.map(item => <tr>...</tr>)}
      </tbody>
    </table>
  }
  cards={
    <MobileCardList
      data={data}
      keyExtractor={(item) => item.id}
      renderCard={(item) => <div>...</div>}
      isLoading={isLoading}
    />
  }
  isEmpty={data.length === 0}
  isLoading={isLoading}
  emptyTitle="Nenhum registro encontrado"
  emptyDescription="Adicione um novo item para começar."
  pagination={
    <Pagination
      page={page}
      onPageChange={setPage}
      hasNextPage={hasNext}
      hasPreviousPage={page > 1}
    />
  }
/>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "table", type: "ReactNode", required: true, description: "Conteúdo da tabela (exibido no desktop)" },
            { name: "cards", type: "ReactNode", required: true, description: "Conteúdo dos cards (exibido no mobile)" },
            { name: "isEmpty", type: "boolean", required: true, description: "Se a lista está vazia" },
            { name: "isLoading", type: "boolean", required: true, description: "Se está carregando dados" },
            { name: "emptyIcon", type: "ReactNode", description: "Ícone do empty state" },
            { name: "emptyTitle", type: "string", default: '"Nenhum registro encontrado"', description: "Título do empty state" },
            { name: "emptyDescription", type: "string", description: "Descrição do empty state" },
            { name: "pagination", type: "ReactNode", description: "Componente de paginação" },
          ]}
        />
      </div>
    </div>
  )
}
