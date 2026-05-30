import { TableSkeleton } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function TableSkeletonPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">TableSkeleton</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Linhas de skeleton loading para uso dentro de tabelas durante carregamento de dados.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Nome</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Função</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                <TableSkeleton rows={4} columns={4} />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo compacto</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full">
              <tbody>
                <TableSkeleton rows={2} columns={3} />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { TableSkeleton } from "@motor-hero/ui-kit"

<table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Email</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {isLoading ? (
      <TableSkeleton rows={5} columns={3} />
    ) : (
      data.map(item => <tr key={item.id}>...</tr>)
    )}
  </tbody>
</table>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "rows", type: "number", default: "5", description: "Quantidade de linhas skeleton" },
            { name: "columns", type: "number", default: "4", description: "Quantidade de colunas por linha" },
          ]}
        />
      </div>
    </div>
  )
}
