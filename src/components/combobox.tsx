import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronsUpDown, Loader2, Plus, Search } from "lucide-react";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { useInfiniteScrollSentinel } from "../hooks/use-infinite-scroll-sentinel";
import { useIsDesktop } from "../hooks/use-is-desktop";
import { cn } from "../lib/utils";

export interface ComboboxOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface ComboboxProps {
	options: ComboboxOption[];
	value?: string;
	onChange: (value: string) => void;
	/** Texto do gatilho quando nada está selecionado */
	placeholder?: string;
	/** Placeholder do campo de busca */
	searchPlaceholder?: string;
	/** Mensagem quando a busca não retorna nada */
	emptyMessage?: string;
	disabled?: boolean;
	id?: string;
	className?: string;
	"aria-invalid"?: boolean | "true" | "false";
	"aria-describedby"?: string;
	/** Modo servidor: chamado a cada tecla com o texto bruto da busca. Sua
	 *  presença ativa o modo servidor (filtro do cmdk desligado). */
	onSearchChange?: (search: string) => void;
	/** Modo servidor: chamado ao rolar até o fim da lista. */
	onLoadMore?: () => void;
	/** Modo servidor: mostra uma linha de carregamento no fim da lista. */
	loading?: boolean;
	/** Modo servidor: habilita o disparo de `onLoadMore`. */
	hasMore?: boolean;
	/** Modo servidor: rótulo do valor já selecionado que pode não estar na
	 *  página carregada (ex.: formulário de edição). */
	selectedOption?: ComboboxOption;
	/** Permite confirmar o texto digitado como valor, mesmo fora da lista
	 *  (ex.: unidade de medida com texto livre). Mostra uma linha "criar" no
	 *  topo e exibe o valor personalizado no gatilho. */
	creatable?: boolean;
	/** Rótulo da linha de criação. Padrão: `Usar "<texto>"`. */
	formatCreateLabel?: (search: string) => string;
	/** Permite limpar a seleção clicando na opção já selecionada (útil em
	 *  filtros: remover um filtro sem uma opção "Todos"). Emite `onChange("")`. */
	deselectable?: boolean;
}

/**
 * Select com busca (combobox) acessível e responsivo.
 *
 * - Desktop: Popover não-modal + cmdk — o dropdown acompanha a largura do
 *   gatilho. Não-modal (com `pointer-events-auto` no conteúdo) de propósito:
 *   dentro de um Dialog, um Popover modal trava `body { pointer-events: none }`
 *   e prende o foco, então a busca não recebe clique/digitação (mesmo motivo do
 *   MultiCombobox).
 * - Mobile: Drawer (bottom sheet) + cmdk — evita os problemas de foco/clique de
 *   Popover dentro de modal no touch, então a busca funciona no celular.
 *
 * Aceita `aria-invalid`/`aria-describedby` (encaminhados pelo FormField em
 * estado de erro) e fica com a borda vermelha quando inválido.
 */
export function Combobox({
	options,
	value,
	onChange,
	placeholder = "Selecione...",
	searchPlaceholder = "Buscar...",
	emptyMessage = "Nenhum resultado encontrado.",
	disabled,
	id,
	className,
	"aria-invalid": ariaInvalid,
	"aria-describedby": ariaDescribedby,
	onSearchChange,
	onLoadMore,
	loading,
	hasMore,
	selectedOption,
	creatable,
	formatCreateLabel,
	deselectable,
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [search, setSearch] = React.useState("");
	const isDesktop = useIsDesktop();
	const isServer = onSearchChange !== undefined;
	const selected =
		selectedOption?.value === value
			? selectedOption
			: (options.find((option) => option.value === value) ??
				(creatable && value ? { value, label: value } : undefined));

	const handleOpenChange = (next: boolean) => {
		setOpen(next);
		if (!next) setSearch("");
	};

	const handleSelect = (next: string) => {
		onChange(deselectable && next === value ? "" : next);
		handleOpenChange(false);
	};

	const handleSearchChange = (next: string) => {
		setSearch(next);
		onSearchChange?.(next);
	};

	const trimmedSearch = search.trim();
	const showCreate =
		!!creatable &&
		trimmedSearch.length > 0 &&
		!options.some(
			(option) => option.value.toLowerCase() === trimmedSearch.toLowerCase(),
		);
	const { listRef, sentinelRef } = useInfiniteScrollSentinel({
		enabled: isServer && !!hasMore,
		loading,
		onLoadMore,
	});

	const trigger = (
		<button
			type="button"
			id={id}
			role="combobox"
			aria-expanded={open}
			aria-invalid={ariaInvalid}
			aria-describedby={ariaDescribedby}
			disabled={disabled}
			className={cn(
				"flex h-9 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors hover:border-ring/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive",
				className,
			)}
		>
			<span className={cn("truncate", !selected && "text-muted-foreground")}>
				{selected ? selected.label : placeholder}
			</span>
			<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
		</button>
	);

	const command = (
		<CommandPrimitive
			shouldFilter={!isServer}
			className="flex h-full w-full flex-col overflow-hidden"
		>
			<div className="flex items-center border-b px-3">
				<Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
				<CommandPrimitive.Input
					placeholder={searchPlaceholder}
					onValueChange={isServer || creatable ? handleSearchChange : undefined}
					className="flex h-11 w-full bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground sm:h-9 sm:text-sm"
				/>
			</div>
			<CommandPrimitive.List
				ref={listRef}
				className="max-h-[50vh] overflow-y-auto overflow-x-hidden p-1 sm:max-h-60"
			>
				{!isServer && !showCreate && (
					<CommandPrimitive.Empty className="py-6 text-center text-sm text-muted-foreground">
						{emptyMessage}
					</CommandPrimitive.Empty>
				)}
				{showCreate && (
					<CommandPrimitive.Item
						// cmdk pontua pelo `value`; igualar à busca mantém a linha sempre no topo.
						value={trimmedSearch}
						onSelect={() => handleSelect(trimmedSearch)}
						className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-2.5 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground sm:py-1.5"
					>
						<Plus className="h-4 w-4 shrink-0" />
						<span className="truncate">
							{(formatCreateLabel ?? ((text) => `Usar "${text}"`))(
								trimmedSearch,
							)}
						</span>
					</CommandPrimitive.Item>
				)}
				{options.map((option) => (
					<CommandPrimitive.Item
						key={option.value}
						// cliente: cmdk filtra pelo `value`, então usamos o label; servidor:
						// o servidor já filtrou, então usamos o id (único, evita colisão de labels).
						value={isServer ? option.value : option.label}
						disabled={option.disabled}
						onSelect={() => handleSelect(option.value)}
						className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-2.5 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 sm:py-1.5"
					>
						<Check
							className={cn(
								"h-4 w-4 shrink-0",
								value === option.value ? "opacity-100" : "opacity-0",
							)}
						/>
						<span className="truncate">{option.label}</span>
					</CommandPrimitive.Item>
				))}
				{isServer && !loading && options.length === 0 && (
					<div className="py-6 text-center text-sm text-muted-foreground">
						{emptyMessage}
					</div>
				)}
				{isServer && loading && (
					<div className="flex items-center justify-center py-6">
						<Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
					</div>
				)}
				{isServer && hasMore && (
					<div ref={sentinelRef} aria-hidden className="h-1" />
				)}
			</CommandPrimitive.List>
		</CommandPrimitive>
	);

	if (isDesktop) {
		return (
			<PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
				<PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
				<PopoverPrimitive.Portal>
					<PopoverPrimitive.Content
						align="start"
						sideOffset={4}
						className="pointer-events-auto z-50 overflow-hidden rounded-md border bg-popover p-0 text-popover-foreground shadow-md"
						style={{ width: "var(--radix-popover-trigger-width)" }}
					>
						{command}
					</PopoverPrimitive.Content>
				</PopoverPrimitive.Portal>
			</PopoverPrimitive.Root>
		);
	}

	return (
		<DrawerPrimitive.Root open={open} onOpenChange={handleOpenChange}>
			<DrawerPrimitive.Trigger asChild>{trigger}</DrawerPrimitive.Trigger>
			<DrawerPrimitive.Portal>
				<DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
				<DrawerPrimitive.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[85vh] flex-col rounded-t-2xl border bg-popover text-popover-foreground outline-none">
					<DrawerPrimitive.Title className="sr-only">
						{placeholder}
					</DrawerPrimitive.Title>
					<div className="mx-auto my-3 h-1.5 w-12 shrink-0 rounded-full bg-muted" />
					{command}
				</DrawerPrimitive.Content>
			</DrawerPrimitive.Portal>
		</DrawerPrimitive.Root>
	);
}
