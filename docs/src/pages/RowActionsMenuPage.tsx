import { RowActionsMenu } from "@motor-hero/ui-kit"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

const rows = [
  { id: 1, name: "Oficina Central", city: "São Paulo" },
  { id: 2, name: "Auto Peças Norte", city: "Belo Horizonte" },
  { id: 3, name: "Garage Hero Sul", city: "Porto Alegre" },
]

export function RowActionsMenuPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">RowActionsMenu</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          O menu de ações (⋮) das linhas de tabela — editar, excluir, ver — com as ações vindas por
          props. Substitui o <code className="rounded bg-muted px-1 py-0.5 text-sm">ActionsMenu</code>{" "}
          copiado em cada projeto.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Em uma tabela</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Empresa</th>
                <th className="px-4 py-2 font-medium">Cidade</th>
                <th className="w-12 px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b last:border-0">
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2 text-muted-foreground">{row.city}</td>
                  <td className="px-4 py-2 text-right">
                    <RowActionsMenu
                      actions={[
                        { label: "Ver", icon: <Eye className="h-4 w-4" />, onClick: () => {} },
                        { label: "Editar", icon: <Pencil className="h-4 w-4" />, onClick: () => {} },
                        { label: "Excluir", icon: <Trash2 className="h-4 w-4" />, destructive: true, onClick: () => {} },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { RowActionsMenu } from "@motor-hero/ui-kit"
import { Pencil, Trash2 } from "lucide-react"

<RowActionsMenu
  actions={[
    { label: "Editar", icon: <Pencil className="h-4 w-4" />, onClick: () => openEdit(row) },
    { label: "Excluir", icon: <Trash2 className="h-4 w-4" />, destructive: true, onClick: () => openDelete(row) },
  ]}
/>

// Ação como link (router-agnostic, via renderLink):
<RowActionsMenu
  actions={[{ label: "Detalhes", href: \`/empresas/\${row.id}\` }]}
  renderLink={({ href, children, ...p }) => <Link to={href} {...p}>{children}</Link>}
/>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "actions", type: "RowAction[]", required: true, description: "Ações do menu" },
            { name: "disabled", type: "boolean", description: "Desabilita o gatilho inteiro" },
            { name: "align", type: '"start" | "center" | "end"', description: "Alinhamento do dropdown (default end)" },
            { name: "label", type: "string", description: 'aria-label do gatilho (default "Ações")' },
            { name: "renderLink", type: "RenderLink", description: "Render prop p/ ações com href" },
          ]}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">RowAction</h2>
        <PropsTable
          props={[
            { name: "label", type: "string", required: true, description: "Texto da ação" },
            { name: "icon", type: "ReactNode", description: "Ícone à esquerda" },
            { name: "onClick", type: "() => void", description: "Callback ao clicar" },
            { name: "href", type: "string", description: "Renderiza a ação como link (usa renderLink)" },
            { name: "destructive", type: "boolean", description: "Estilo destrutivo (vermelho), ex.: excluir" },
            { name: "disabled", type: "boolean", description: "Desabilita só esta ação" },
          ]}
        />
      </div>
    </div>
  )
}
