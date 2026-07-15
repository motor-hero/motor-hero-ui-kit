import {
	Combobox,
	FilterPopover,
	FilterToolbar,
	SearchInput,
} from "@motor-hero/ui-kit";
import { Filter } from "lucide-react";
import { useState } from "react";
import { CodeBlock } from "../components/CodeBlock";
import { PropsTable } from "../components/PropsTable";

const statusOptions = [
	{ value: "all", label: "Todos os status" },
	{ value: "solicitado", label: "Solicitado" },
	{ value: "em_analise", label: "Em Análise" },
	{ value: "concluido", label: "Concluído" },
	{ value: "cancelado", label: "Cancelado" },
];

const tipoOptions = [
	{ value: "all", label: "Todos os tipos" },
	{ value: "gift_card", label: "Gift card" },
	{ value: "physical_product", label: "Produto físico" },
	{ value: "experience", label: "Experiência" },
];

const responsavelOptions = [
	{ value: "all", label: "Todos os responsáveis" },
	{ value: "ana", label: "Ana Prado" },
	{ value: "bruno", label: "Bruno Lima" },
	{ value: "patricia", label: "Patrícia Mendes" },
];

export function FilterToolbarPage() {
	const [status, setStatus] = useState("all");
	const [tipo, setTipo] = useState("all");
	const [responsavel, setResponsavel] = useState("all");

	const active = [status, tipo, responsavel].filter((v) => v !== "all");
	const activeCount = active.length;
	const isFilterActive = activeCount > 0;

	const clearAll = () => {
		setStatus("all");
		setTipo("all");
		setResponsavel("all");
	};

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">FilterToolbar</h1>
				<p className="mt-2 text-lg text-muted-foreground">
					Barra de filtros <strong>compacta</strong> para telas com muitos
					filtros. O padrão é sempre <strong>um campo de texto livre</strong>{" "}
					(se houver) <strong>ao lado de um único botão “Filtros”</strong> que
					recolhe todos os filtros adicionais atrás de um popover com contador —
					no lugar de uma fileira poluída de dropdowns.{" "}
					<strong>Responsivo</strong>: lado a lado no desktop, empilhado no
					mobile (e cada popover vira um Drawer/bottom sheet).
				</p>
			</div>

			<div>
				<h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
				<div className="rounded-lg border bg-card p-6">
					<FilterToolbar isFilterActive={isFilterActive} onClear={clearAll}>
						<SearchInput
							placeholder="Buscar por código"
							containerClassName="w-full sm:w-72 sm:flex-none"
						/>

						<FilterPopover
							label="Filtros"
							icon={Filter}
							active={activeCount > 0}
							badge={activeCount || undefined}
							contentClassName="w-80"
						>
							<div className="space-y-3 p-3">
								<div className="space-y-1.5">
									<span className="text-xs font-medium text-muted-foreground">
										Status
									</span>
									<Combobox
										className="w-full"
										options={statusOptions}
										value={status}
										onChange={setStatus}
									/>
								</div>
								<div className="space-y-1.5">
									<span className="text-xs font-medium text-muted-foreground">
										Tipo de resgate
									</span>
									<Combobox
										className="w-full"
										options={tipoOptions}
										value={tipo}
										onChange={setTipo}
									/>
								</div>
								<div className="space-y-1.5">
									<span className="text-xs font-medium text-muted-foreground">
										Responsável
									</span>
									<Combobox
										className="w-full"
										options={responsavelOptions}
										value={responsavel}
										onChange={setResponsavel}
									/>
								</div>
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
  SearchInput,
  Combobox,
} from "@motor-hero/ui-kit"
import { Filter } from "lucide-react"

<FilterToolbar isFilterActive={isFilterActive} onClear={clearFilters}>
  {/* 1) campo de texto livre (se houver) */}
  <SearchInput placeholder="Buscar por código" className="w-full sm:w-72" />

  {/* 2) um único "Filtros" com todos os filtros adicionais */}
  <FilterPopover
    label="Filtros"
    icon={Filter}
    active={activeCount > 0}
    badge={activeCount || undefined}
    contentClassName="w-80"
  >
    <div className="space-y-3 p-3">
      <Combobox className="w-full" options={statusOptions} value={status} onChange={setStatus} />
      <Combobox className="w-full" {...clientOptions} value={clientId ?? "all"} onChange={...} />
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
						<strong>FilterToolbar</strong> é o contêiner responsivo: lado a lado
						no desktop, empilhado no mobile (<code>flex-col sm:flex-row</code>).
						Mostra o botão “Limpar filtros” quando <code>isFilterActive</code>.
					</li>
					<li>
						<strong>FilterPopover</strong> segue o idiom do{" "}
						<code>Combobox</code>: Popover não-modal no desktop, Drawer (bottom
						sheet) no mobile; o gatilho fica full-width no mobile. O{" "}
						<code>badge</code> mostra a contagem de filtros ativos.
					</li>
					<li>
						O <code>onInteractOutside</code> ignora cliques que caem dentro de
						outro popover (ex.: o dropdown de um <code>Combobox</code> ou o
						calendário de um <code>DatePicker</code> aninhados), então o painel
						“Filtros” não fecha ao operar os controles internos.
					</li>
					<li>
						Para enums curtos, <code>FilterOptionList</code> (seleção simples ou
						múltipla) evita aninhar um <code>Combobox</code>; para listas
						grandes/assíncronas use um <code>Combobox</code> dentro do painel.
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
							description: "A busca e o(s) FilterPopover da barra",
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
							description: "Rótulo do gatilho",
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
							description: "Ícone à esquerda (ex.: Filter)",
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
							description: "Conteúdo do badge quando ativo (ex.: contagem)",
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
