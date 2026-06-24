import { useState } from "react"
import { Combobox } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"
import { useFakeInfiniteOptions } from "../lib/fake-options-source"

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
  const server = useFakeInfiniteOptions()
  const [serverValue, setServerValue] = useState("42")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Combobox</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Select com busca por digitação — ideal para listas grandes ou vindas
          de API, onde o <code>Select</code> nativo fica limitado.{" "}
          <strong>Responsivo</strong>: no desktop abre um Popover; no mobile
          abre um Drawer (bottom sheet), o que faz a busca funcionar bem no
          touch mesmo dentro de modais (FormDialog).
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
        <h2 className="mb-4 text-xl font-semibold">Modo servidor (paginação)</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Passe <code>onSearchChange</code> para ativar o modo servidor: o filtro
          do cmdk é desligado, a busca é enviada ao backend e a lista pagina ao
          rolar até o fim. <code>selectedOption</code> garante o rótulo do valor
          já selecionado mesmo que ele não esteja na página carregada (caso de
          formulário de edição — aqui pré-selecionamos o item 42).
        </p>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-sm space-y-4">
            <Combobox
              options={server.options}
              value={serverValue}
              onChange={setServerValue}
              selectedOption={{ value: "42", label: "Fornecedor 042" }}
              onSearchChange={server.onSearchChange}
              onLoadMore={server.onLoadMore}
              loading={server.loading}
              hasMore={server.hasMore}
              placeholder="Selecione o fornecedor"
              searchPlaceholder="Buscar fornecedor..."
            />
            {serverValue && (
              <p className="text-sm text-muted-foreground">
                Selecionado:{" "}
                <span className="font-medium text-foreground">{serverValue}</span>
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`// O hook de dados vive no app (não no ui-kit), sobre TanStack Query:
import { useInfiniteOptions } from "@/hooks/useInfiniteOptions"

const props = useInfiniteOptions({
  queryKey: ["supplier-options"],
  queryFn: ({ page, size, search }) =>
    SuppliersService.readSuppliers({ page, size, search }),
  toOption: (s) => ({ value: s.id, label: s.name }),
})

<Combobox
  value={id}
  onChange={setId}
  selectedOption={current}   // rótulo do valor salvo (form de edição)
  {...props}
/>`}
          />
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
            <strong>Desktop</strong>: Popover que acompanha a largura do
            gatilho e rola em listas grandes.
          </li>
          <li>
            <strong>Mobile</strong>: Drawer (bottom sheet) com alvos de toque
            maiores — a busca funciona no touch mesmo aberto de dentro de um
            modal, evitando os problemas de Popover-em-Dialog.
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
            { name: "onSearchChange", type: "(search: string) => void", description: "Modo servidor: chamado a cada tecla; sua presença ativa o modo servidor" },
            { name: "onLoadMore", type: "() => void", description: "Modo servidor: chamado ao rolar até o fim da lista" },
            { name: "loading", type: "boolean", description: "Modo servidor: mostra a linha de carregamento" },
            { name: "hasMore", type: "boolean", description: "Modo servidor: habilita o disparo de onLoadMore" },
            { name: "selectedOption", type: "ComboboxOption", description: "Modo servidor: rótulo do valor selecionado fora da página carregada" },
          ]}
        />
      </div>
    </div>
  )
}
