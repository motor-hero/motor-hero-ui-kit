import {
	FilterOptionList,
	FilterPopover,
	FilterToolbar,
	SearchInput,
} from "@motor-hero/ui-kit";
import { Filter } from "lucide-react";
import { useState } from "react";
import { CodeBlock } from "../components/CodeBlock";
import { PropsTable } from "../components/PropsTable";

const statusOptions = [
	{ value: "solicitado", label: "Solicitado" },
	{ value: "em_analise", label: "Em Análise" },
	{ value: "concluido", label: "Concluído" },
	{ value: "cancelado", label: "Cancelado" },
];

const tipoOptions = [
	{ value: "gift_card", label: "Gift card" },
	{ value: "physical_product", label: "Produto físico" },
	{ value: "experience", label: "Experiência" },
];

const responsavelOptions = [
	{ value: "ana", label: "Ana Prado" },
	{ value: "bruno", label: "Bruno Lima" },
	{ value: "patricia", label: "Patrícia Mendes" },
];

export function FilterToolbarPage() {
	const [status, setStatus] = useState("");
	const [tipo, setTipo] = useState("");
	const [responsaveis, setResponsaveis] = useState<string[]>([]);

	const statusLabel = statusOptions.find((o) => o.value === status)?.label;
	const tipoLabel = tipoOptions.find((o) => o.value === tipo)?.label;
	const secondaryCount = responsaveis.length;
	const isFilterActive = !!status || !!tipo || secondaryCount > 0;

	const clearAll = () => {
		setStatus("");
		setTipo("");
		setResponsaveis([]);
	};

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">FilterToolbar</h1>
				<p className="mt-2 text-lg text-muted-foreground">
					Barra de filtros <strong>compacta</strong> para telas com muitos
					filtros. Mantém poucos controles visíveis (uma busca + 1–2 filtros
					primários) e recolhe o restante atrás de um botão{" "}
					<strong>“Filtros”</strong> com contador, no lugar de uma fileira
					poluída de dropdowns. Composicional: o app fornece os controles reais
					(<code>Combobox</code>, <code>FilterOptionList</code>) dentro de cada{" "}
					<code>FilterPopover</code>. <strong>Responsivo</strong>: cada popover
					vira um Drawer (bottom sheet) no mobile.
				</p>
			</div>

			<div>
				<h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
				<div className="rounded-lg border bg-card p-6">
					<FilterToolbar isFilterActive={isFilterActive} onClear={clearAll}>
						<SearchInput
							placeholder="Buscar por código"
							className="w-full sm:w-56"
						/>

						<FilterPopover label={statusLabel ?? "Status"} active={!!status}>
							{({ close }) => (
								<FilterOptionList
									options={statusOptions}
									value={status}
									clearable
									onChange={(v) => {
										setStatus(v as string);
										close();
									}}
								/>
							)}
						</FilterPopover>

						<FilterPopover label={tipoLabel ?? "Tipo"} active={!!tipo}>
							{({ close }) => (
								<FilterOptionList
									options={tipoOptions}
									value={tipo}
									clearable
									onChange={(v) => {
										setTipo(v as string);
										close();
									}}
								/>
							)}
						</FilterPopover>

						<FilterPopover
							label="Filtros"
							icon={Filter}
							active={secondaryCount > 0}
							badge={secondaryCount || undefined}
							contentClassName="w-72"
						>
							<div className="space-y-1.5 p-3">
								<span className="text-xs font-medium text-muted-foreground">
									Responsável
								</span>
								<FilterOptionList
									options={responsavelOptions}
									value={responsaveis}
									multiple
									onChange={(v) => setResponsaveis(v as string[])}
								/>
							</div>
						</FilterPopover>
					</FilterToolbar>
				</div>
			</div>

			<div>
				<h2 className="mb-4 text-xl font-semibold">Uso</h2>
				<CodeBlock
					code={`import {
  FilterToolbar,
  FilterPopover,
  FilterOptionList,
  SearchInput,
  Combobox,
} from "@motor-hero/ui-kit"
import { Filter } from "lucide-react"

<FilterToolbar isFilterActive={isFilterActive} onClear={clearFilters}>
  <SearchInput placeholder="Buscar por código" className="w-full sm:w-56" />

  {/* Filtro primário inline — a lista fecha ao selecionar via { close } */}
  <FilterPopover label={status ? statusLabel(status) : "Status"} active={!!status}>
    {({ close }) => (
      <FilterOptionList
        options={statusOptions}
        value={status}
        clearable
        onChange={(v) => {
          setStatus(v as string)
          close()
        }}
      />
    )}
  </FilterPopover>

  {/* Overflow — recolhe os filtros menos usados atrás de um botão com badge */}
  <FilterPopover label="Filtros" icon={Filter} active={count > 0} badge={count || undefined} contentClassName="w-80">
    <div className="space-y-3 p-3">
      <Combobox className="w-full" {...clientOptions} value={clientId ?? "all"} onChange={...} />
      <Combobox className="w-full" {...campaignOptions} value={campaignId ?? "all"} onChange={...} />
    </div>
  </FilterPopover>
</FilterToolbar>`}
				/>
			</div>

			<div>
				<h2 className="mb-4 text-xl font-semibold">
					Composição & responsividade
				</h2>
				<ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
					<li>
						<strong>FilterToolbar</strong> é só o contêiner responsivo (
						<code>flex flex-wrap</code>) que mostra o botão “Limpar filtros”
						quando <code>isFilterActive</code>.
					</li>
					<li>
						<strong>FilterPopover</strong> segue o idiom do{" "}
						<code>Combobox</code>: Popover não-modal no desktop, Drawer (bottom
						sheet) no mobile. Aceita <code>children</code> como nó ou
						render-prop <code>{"({ close }) => ..."}</code> para fechar após
						selecionar.
					</li>
					<li>
						O <code>onInteractOutside</code> ignora cliques que caem dentro de
						outro popover (ex.: o dropdown de um <code>Combobox</code> aninhado
						no overflow), então o painel “Filtros” não fecha ao operar os
						controles internos.
					</li>
					<li>
						<strong>FilterOptionList</strong> cobre enums curtos (seleção
						simples ou múltipla) sem aninhar um Combobox; para listas
						grandes/assíncronas use um <code>Combobox</code> dentro do{" "}
						<code>FilterPopover</code>.
					</li>
				</ul>
			</div>

			<div>
				<h2 className="mb-4 text-xl font-semibold">Props — FilterToolbar</h2>
				<PropsTable
					props={[
						{
							name: "children",
							type: "ReactNode",
							required: true,
							description: "A busca e os FilterPopover da barra",
						},
						{
							name: "isFilterActive",
							type: "boolean",
							default: "false",
							description: "Mostra o botão “Limpar filtros”",
						},
						{
							name: "onClear",
							type: "() => void",
							description: "Chamado ao clicar em “Limpar filtros”",
						},
						{
							name: "clearLabel",
							type: "string",
							default: '"Limpar filtros"',
							description: "Rótulo do botão de limpar",
						},
						{
							name: "className",
							type: "string",
							description: "Classes para o contêiner",
						},
					]}
				/>
			</div>

			<div>
				<h2 className="mb-4 text-xl font-semibold">Props — FilterPopover</h2>
				<PropsTable
					props={[
						{
							name: "label",
							type: "string",
							required: true,
							description: "Rótulo do gatilho (ou o valor selecionado)",
						},
						{
							name: "children",
							type: "ReactNode | (({ close }) => ReactNode)",
							required: true,
							description:
								"Conteúdo do popover; a render-prop recebe { close }",
						},
						{
							name: "icon",
							type: "LucideIcon",
							description: "Ícone à esquerda (ex.: Filter no overflow)",
						},
						{
							name: "active",
							type: "boolean",
							default: "false",
							description: "Destaca o gatilho e exibe o badge",
						},
						{
							name: "badge",
							type: "ReactNode",
							description: "Conteúdo do badge quando ativo (contagem/rótulo)",
						},
						{
							name: "contentClassName",
							type: "string",
							default: '"w-60"',
							description: "Largura/estilo do conteúdo no desktop",
						},
						{
							name: "align",
							type: '"start" | "center" | "end"',
							default: '"start"',
							description: "Alinhamento do popover",
						},
						{
							name: "title",
							type: "string",
							description: "Título do drawer no mobile (padrão: label)",
						},
					]}
				/>
			</div>

			<div>
				<h2 className="mb-4 text-xl font-semibold">Props — FilterOptionList</h2>
				<PropsTable
					props={[
						{
							name: "options",
							type: "FilterOption[]",
							required: true,
							description: "Lista de { value, label, dotClassName? }",
						},
						{
							name: "value",
							type: "string | string[]",
							required: true,
							description: "string no modo simples; string[] no múltiplo",
						},
						{
							name: "onChange",
							type: "(value: string | string[]) => void",
							required: true,
							description: "Chamado ao selecionar/alternar uma opção",
						},
						{
							name: "multiple",
							type: "boolean",
							default: "false",
							description: "Habilita seleção múltipla",
						},
						{
							name: "clearable",
							type: "boolean",
							default: "false",
							description: "Mostra o link “Limpar” quando há seleção",
						},
						{
							name: "clearLabel",
							type: "string",
							default: '"Limpar"',
							description: "Rótulo do link de limpar",
						},
					]}
				/>
			</div>
		</div>
	);
}
