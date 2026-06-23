import { useState } from "react"
import { MultiCombobox } from "@motor-hero/ui-kit"
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

export function MultiComboboxPage() {
  const [value, setValue] = useState<string[]>([])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">MultiCombobox</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Combobox de <strong>múltipla seleção</strong> com busca por digitação.
          As opções escolhidas viram chips dentro do gatilho; clicar numa opção
          da lista alterna a seleção (a lista permanece aberta) e o <code>×</code>{" "}
          de cada chip remove a opção. <strong>Responsivo</strong>: no desktop
          abre um Popover; no mobile abre um Drawer (bottom sheet).
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-sm space-y-4">
            <MultiCombobox
              options={areas}
              value={value}
              onChange={setValue}
              placeholder="Selecione as áreas"
              searchPlaceholder="Buscar área..."
            />
            {value.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Selecionados:{" "}
                <span className="font-medium text-foreground">
                  {value
                    .map((v) => areas.find((a) => a.value === v)?.label)
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { MultiCombobox } from "@motor-hero/ui-kit"

const areas = [
  { value: "florestas", label: "Florestas" },
  { value: "financas", label: "Finanças" },
]

const [areasSelecionadas, setAreasSelecionadas] = useState<string[]>([])

<MultiCombobox
  options={areas}
  value={areasSelecionadas}
  onChange={setAreasSelecionadas}
  placeholder="Selecione as áreas"
  searchPlaceholder="Buscar área..."
/>

// Com FormField (a borda fica vermelha em erro via aria-invalid)
<FormField label="Áreas" htmlFor="areas" required error={errors.areas?.message}>
  <MultiCombobox
    id="areas"
    options={areas}
    value={areasSelecionadas}
    onChange={setAreasSelecionadas}
  />
</FormField>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Acessibilidade & responsividade</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>
            Gatilho com <code>role="combobox"</code> e <code>aria-expanded</code>,
            navegável por teclado (Enter / Espaço / ↓ abrem a lista); aceita{" "}
            <code>id</code> para associação com o label.
          </li>
          <li>
            Recebe <code>aria-invalid</code>/<code>aria-describedby</code> do{" "}
            <code>FormField</code> em erro e fica com borda vermelha.
          </li>
          <li>
            Cada chip tem um botão <code>×</code> com <code>aria-label</code> para
            remover a opção; clicar na lista alterna a seleção sem fechar.
          </li>
          <li>
            <strong>Desktop</strong>: Popover que acompanha a largura do gatilho.{" "}
            <strong>Mobile</strong>: Drawer (bottom sheet) com alvos de toque
            maiores, funcionando bem mesmo dentro de modais (FormDialog).
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "options", type: "ComboboxOption[]", required: true, description: "Lista de { value, label, disabled? }" },
            { name: "value", type: "string[]", required: true, description: "Valores selecionados (controlado)" },
            { name: "onChange", type: "(value: string[]) => void", required: true, description: "Chamado ao alternar/remover uma opção" },
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
