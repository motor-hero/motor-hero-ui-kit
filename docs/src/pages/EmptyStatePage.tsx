import { EmptyState } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function EmptyStatePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">EmptyState</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Componente para estados vazios com ícone, título, descrição e ação opcional.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Com ação</h2>
        <div className="rounded-lg border bg-card p-6">
          <EmptyState
            icon={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
            }
            title="Nenhum usuário encontrado"
            description="Comece adicionando o primeiro usuário ao sistema."
            action={
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                + Adicionar usuário
              </button>
            }
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Sem ícone e sem ação</h2>
        <div className="rounded-lg border bg-card p-6">
          <EmptyState
            title="Nenhum resultado"
            description="Tente ajustar os filtros de busca."
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { EmptyState } from "@motor-hero/ui-kit"
import { Users } from "lucide-react"

<EmptyState
  icon={<Users className="h-12 w-12" />}
  title="Nenhum usuário encontrado"
  description="Comece adicionando o primeiro usuário."
  action={<Button>+ Adicionar</Button>}
/>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "title", type: "string", required: true, description: "Título do estado vazio" },
            { name: "description", type: "string", description: "Descrição auxiliar" },
            { name: "icon", type: "ReactNode", description: "Ícone exibido acima do título" },
            { name: "action", type: "ReactNode", description: "Botão ou elemento de ação" },
            { name: "className", type: "string", description: "Classes adicionais" },
          ]}
        />
      </div>
    </div>
  )
}
