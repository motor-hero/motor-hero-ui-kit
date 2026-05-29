import { useState } from "react"
import { SearchInput } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function SearchInputPage() {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SearchInput</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Input de busca com icone de lupa integrado. Aceita todas as props de um input HTML.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-md space-y-4">
            <SearchInput
              placeholder="Buscar por nome ou email..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {value && (
              <p className="text-sm text-muted-foreground">
                Buscando por: <span className="text-foreground font-medium">{value}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { SearchInput } from "@motor-hero/ui-kit"

const [search, setSearch] = useState("")

<SearchInput
  placeholder="Buscar por nome ou email..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "containerClassName", type: "string", description: "Classes para o container externo" },
            { name: "className", type: "string", description: "Classes para o input" },
            { name: "...props", type: "InputHTMLAttributes", description: "Todas as props de input HTML (placeholder, value, onChange, etc.)" },
          ]}
        />
      </div>
    </div>
  )
}
