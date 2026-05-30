import { MobileCardList } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

interface User {
  id: string
  name: string
  email: string
  role: string
}

const mockUsers: User[] = [
  { id: "1", name: "João Silva", email: "joao@example.com", role: "Admin" },
  { id: "2", name: "Maria Santos", email: "maria@example.com", role: "Gestor" },
  { id: "3", name: "Ana Oliveira", email: "ana@example.com", role: "Operador" },
]

export function MobileCardListPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">MobileCardList</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Lista de cards para dispositivos móveis. Substitui tabelas em telas pequenas com suporte a skeleton loading.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-sm">
            <MobileCardList
              data={mockUsers}
              keyExtractor={(u) => u.id}
              renderCard={(user) => (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.role}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              )}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Loading</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-sm">
            <MobileCardList
              data={[]}
              keyExtractor={() => ""}
              renderCard={() => null}
              isLoading
              loadingCount={3}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { MobileCardList } from "@motor-hero/ui-kit"

<MobileCardList
  data={users}
  keyExtractor={(user) => user.id}
  renderCard={(user) => (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="font-medium">{user.name}</span>
        <span className="text-muted-foreground">{user.role}</span>
      </div>
      <p className="text-sm text-muted-foreground">{user.email}</p>
    </div>
  )}
  isLoading={isLoading}
/>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "data", type: "T[]", required: true, description: "Array de itens a renderizar" },
            { name: "renderCard", type: "(item: T, index: number) => ReactNode", required: true, description: "Função que renderiza cada card" },
            { name: "keyExtractor", type: "(item: T) => string", required: true, description: "Função que retorna key única do item" },
            { name: "isLoading", type: "boolean", default: "false", description: "Exibe skeleton loading" },
            { name: "loadingCount", type: "number", default: "5", description: "Quantidade de skeletons no loading" },
            { name: "className", type: "string", description: "Classes adicionais" },
          ]}
        />
      </div>
    </div>
  )
}
