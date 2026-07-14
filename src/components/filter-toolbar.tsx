import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ChevronDown, type LucideIcon, X } from "lucide-react";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { useIsDesktop } from "../hooks/use-is-desktop";
import { cn } from "../lib/utils";

/**
 * Barra de filtros compacta para telas com muitos filtros.
 *
 * Mantém poucos controles visíveis (uma busca + 1–2 filtros primários) e recolhe
 * o restante atrás de um botão "Filtros" com contador, no lugar de uma fileira
 * poluída de dropdowns. Composicional e router-agnóstico: o app fornece os
 * controles reais (Combobox, listas) dentro de cada `FilterPopover`.
 */
export interface FilterToolbarProps {
	children: React.ReactNode;
	/** Mostra o botão "Limpar filtros" quando `true`. */
	isFilterActive?: boolean;
	onClear?: () => void;
	clearLabel?: string;
	className?: string;
}

export function FilterToolbar({
	children,
	isFilterActive = false,
	onClear,
	clearLabel = "Limpar filtros",
	className,
}: FilterToolbarProps) {
	return (
		<div className={cn("mb-6 flex flex-wrap items-center gap-2", className)}>
			{children}
			{isFilterActive && onClear && (
				<button
					type="button"
					onClick={onClear}
					className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					<X className="h-4 w-4" />
					{clearLabel}
				</button>
			)}
		</div>
	);
}

type FilterPopoverContent =
	| React.ReactNode
	| ((api: { close: () => void }) => React.ReactNode);

export interface FilterPopoverProps {
	/** Rótulo do gatilho (nome do filtro). */
	label: string;
	/** Ícone opcional à esquerda (ex.: `Filter` no botão de overflow). */
	icon?: LucideIcon;
	/** Ativo → gatilho destacado e badge visível. */
	active?: boolean;
	/** Conteúdo do badge quando ativo: uma contagem ou o rótulo do valor. */
	badge?: React.ReactNode;
	/** Largura/estilo do conteúdo no desktop. Padrão: `w-60`. */
	contentClassName?: string;
	align?: "start" | "center" | "end";
	/** Título do drawer no mobile (acessibilidade). Padrão: `label`. */
	title?: string;
	/** Nó ou render-prop que recebe `{ close }` para fechar após selecionar. */
	children: FilterPopoverContent;
}

/**
 * Gatilho compacto + popover (desktop) / drawer (mobile) para um filtro.
 * Mesmo idiom do `Combobox`: popover não-modal no desktop, bottom sheet no touch.
 */
export function FilterPopover({
	label,
	icon: Icon,
	active = false,
	badge,
	contentClassName,
	align = "start",
	title,
	children,
}: FilterPopoverProps) {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useIsDesktop();
	const close = React.useCallback(() => setOpen(false), []);
	const content =
		typeof children === "function" ? children({ close }) : children;

	const trigger = (
		<button
			type="button"
			aria-expanded={open}
			className={cn(
				"inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors hover:border-ring/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				active ? "border-ring/60 text-foreground" : "text-muted-foreground",
			)}
		>
			{Icon && <Icon className="h-4 w-4 shrink-0 opacity-70" />}
			<span className="truncate">{label}</span>
			{active && badge != null && (
				<span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium leading-none text-primary-foreground">
					{badge}
				</span>
			)}
			<ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
		</button>
	);

	if (isDesktop) {
		return (
			<PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
				<PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
				<PopoverPrimitive.Portal>
					<PopoverPrimitive.Content
						align={align}
						sideOffset={4}
						onInteractOutside={(event) => {
							// Mantém aberto quando o clique cai dentro de outro popover
							// aberto a partir daqui (ex.: o dropdown de um Combobox),
							// em vez de um clique genuíno fora.
							const target = event.target as HTMLElement | null;
							if (target?.closest("[data-radix-popper-content-wrapper]")) {
								event.preventDefault();
							}
						}}
						className={cn(
							"pointer-events-auto z-50 w-60 overflow-hidden rounded-md border bg-popover p-0 text-popover-foreground shadow-md",
							contentClassName,
						)}
					>
						{content}
					</PopoverPrimitive.Content>
				</PopoverPrimitive.Portal>
			</PopoverPrimitive.Root>
		);
	}

	return (
		<DrawerPrimitive.Root open={open} onOpenChange={setOpen}>
			<DrawerPrimitive.Trigger asChild>{trigger}</DrawerPrimitive.Trigger>
			<DrawerPrimitive.Portal>
				<DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
				<DrawerPrimitive.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[85vh] flex-col rounded-t-2xl border bg-popover text-popover-foreground outline-none">
					<DrawerPrimitive.Title className="sr-only">
						{title ?? label}
					</DrawerPrimitive.Title>
					<div className="mx-auto my-3 h-1.5 w-12 shrink-0 rounded-full bg-muted" />
					<div className="overflow-y-auto p-2">{content}</div>
				</DrawerPrimitive.Content>
			</DrawerPrimitive.Portal>
		</DrawerPrimitive.Root>
	);
}

export interface FilterOption {
	value: string;
	label: string;
	/** Classe do "dot" à esquerda (ex.: `bg-emerald-500` para um status). */
	dotClassName?: string;
}

export interface FilterOptionListProps {
	options: FilterOption[];
	/** `string` no modo simples; `string[]` no modo múltiplo. */
	value: string | string[];
	onChange: (value: string | string[]) => void;
	multiple?: boolean;
	/** Mostra o link "Limpar" no rodapé quando há seleção. */
	clearable?: boolean;
	clearLabel?: string;
}

/**
 * Lista de opções (seleção simples ou múltipla) para o conteúdo de um
 * `FilterPopover` — evita aninhar um Combobox para enums curtos.
 */
export function FilterOptionList({
	options,
	value,
	onChange,
	multiple = false,
	clearable = false,
	clearLabel = "Limpar",
}: FilterOptionListProps) {
	const selected = Array.isArray(value) ? value : value ? [value] : [];
	const hasSelection = selected.length > 0;

	const toggle = (optionValue: string) => {
		if (!multiple) {
			onChange(optionValue);
			return;
		}
		onChange(
			selected.includes(optionValue)
				? selected.filter((v) => v !== optionValue)
				: [...selected, optionValue],
		);
	};

	return (
		<div className="flex flex-col p-1">
			{options.map((option) => {
				const isChecked = selected.includes(option.value);
				return (
					<button
						key={option.value}
						type="button"
						onClick={() => toggle(option.value)}
						className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
					>
						{option.dotClassName && (
							<span
								className={cn(
									"h-2 w-2 shrink-0 rounded-full",
									option.dotClassName,
								)}
							/>
						)}
						<span className="flex-1 truncate">{option.label}</span>
						{isChecked && (
							<span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
						)}
					</button>
				);
			})}
			{clearable && hasSelection && (
				<button
					type="button"
					onClick={() => onChange(multiple ? [] : "")}
					className="mt-1 border-t px-2 pt-1.5 pb-0.5 text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
				>
					{clearLabel}
				</button>
			)}
		</div>
	);
}
