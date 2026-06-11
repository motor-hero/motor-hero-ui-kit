import { useState } from "react"
import { Combobox } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

const areas = [
  { value: "florestas", label: "Florestas" },
  { value: "ecoturismo", label: "Ecoturismo & Ciência" },
  { value: "captacoes", label: "Captações Internacionais" },
  { value: "parcerias", label: "Parcerias & Eventos Brasil" },
  { value: "marketing", label: "Marketing & Comunicação" },
  { value: "rh", label: "Recursos Humanos" },
  { value: "financas", label: "Finanças" },
]

export function ComboboxPage() {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Combobox</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Select com busca por digitação. Montado sobre Radix Popover + cmdk,
          totalmente estilizável e responsivo — ideal para listas grandes ou
          vindas de API, onde o <code>Select</code> nativo fica limitado.
          Funciona dentro de modais (FormDialog).
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-sm space-y-4">
            <Combobox
              options={areas}
              value={value}
              onChange={setValue}
              placeholder="Selecione a área"
              searchPlaceholder="Buscar área..."
            />
            {value && (
              <p className="text-sm text-muted-foreground">
                Selecionado:{" "}
                <span className="font-medium text-foreground">
                  {areas.find((a) => a.value === value)?.label}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { Combobox } from "@motor-hero/ui-kit"

const areas = [
  { value: "florestas", label: "Florestas" },
  { value: "financas", label: "Finanças" },
]

const [area, setArea] = useState("")

<Combobox
  options={areas}
  value={area}
  onChange={setArea}
  placeholder="Selecione a área"
  searchPlaceholder="Buscar área..."
/>

// Com FormField (a borda fica vermelha em erro via aria-invalid)
<FormField label="Área" htmlFor="area" required error={errors.area?.message}>
  <Combobox id="area" options={areas} value={area} onChange={setArea} />
</FormField>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Acessibilidade & responsividade</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>
            Gatilho com <code>role="combobox"</code> e <code>aria-expanded</code>;
            aceita <code>id</code> para associação com o label.
          </li>
          <li>
            Recebe <code>aria-invalid</code>/<code>aria-describedby</code> do{" "}
            <code>FormField</code> em erro e fica com borda vermelha.
          </li>
          <li>
            O dropdown acompanha a largura do gatilho, rola em listas grandes e
            usa Portal com <code>z-50</code> — funciona dentro de modais.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "options", type: "ComboboxOption[]", required: true, description: "Lista de { value, label, disabled? }" },
            { name: "value", type: "string", description: "Valor selecionado (controlado)" },
            { name: "onChange", type: "(value: string) => void", required: true, description: "Chamado ao selecionar uma opção" },
            { name: "placeholder", type: "string", default: '"Selecione..."', description: "Texto do gatilho quando vazio" },
            { name: "searchPlaceholder", type: "string", default: '"Buscar..."', description: "Placeholder do campo de busca" },
            { name: "emptyMessage", type: "string", default: '"Nenhum resultado encontrado."', description: "Mensagem quando a busca não retorna nada" },
            { name: "disabled", type: "boolean", description: "Desabilita o gatilho" },
            { name: "id", type: "string", description: "ID do gatilho (associação com label)" },
            { name: "className", type: "string", description: "Classes para o gatilho" },
          ]}
        />
      </div>
    </div>
  )
}
