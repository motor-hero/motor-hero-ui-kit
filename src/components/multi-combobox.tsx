import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Command as CommandPrimitive } from "cmdk"
import { Check, ChevronsUpDown, Loader2, Search, X } from "lucide-react"
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { useInfiniteScrollSentinel } from "../hooks/use-infinite-scroll-sentinel"
import { useIsDesktop } from "../hooks/use-is-desktop"
import { cn } from "../lib/utils"
import type { ComboboxOption } from "./combobox"

export interface MultiComboboxProps {
  options: ComboboxOption[]
  value: string[]
  onChange: (value: string[]) => void
  /** Texto do gatilho quando nada está selecionado */
  placeholder?: string
  /** Placeholder do campo de busca */
  searchPlaceholder?: string
  /** Mensagem quando a busca não retorna nada */
  emptyMessage?: string
  disabled?: boolean
  id?: string
  className?: string
  "aria-invalid"?: boolean | "true" | "false"
  "aria-describedby"?: string
  /** Modo servidor: chamado a cada tecla com o texto bruto da busca. Sua
   *  presença ativa o modo servidor (filtro do cmdk desligado). */
  onSearchChange?: (search: string) => void
  /** Modo servidor: chamado ao rolar até o fim da lista. */
  onLoadMore?: () => void
  /** Modo servidor: mostra uma linha de carregamento no fim da lista. */
  loading?: boolean
  /** Modo servidor: habilita o disparo de `onLoadMore`. */
  hasMore?: boolean
  /** Modo servidor: rótulos dos valores já selecionados que podem não estar
   *  na página carregada (chips do formulário de edição). */
  selectedOptions?: ComboboxOption[]
}

/**
 * Combobox de múltipla seleção com chips, acessível e responsivo.
 *
 * - Desktop: Popover não-modal + cmdk — o dropdown acompanha a largura do gatilho.
 *   Não-modal de propósito: dentro de um Dialog, um Popover modal trava
 *   `body { pointer-events: none }` e marca o resto do Dialog como aria-hidden,
 *   o que deixava a página/Dialog presos ao fechar com o picker aberto.
 * - Mobile: Drawer (bottom sheet) + cmdk — evita os problemas de foco/clique de
 *   Popover dentro de modal no touch, então a busca funciona no celular.
 *
 * As opções selecionadas aparecem como chips dentro do gatilho; clicar numa
 * opção da lista alterna a seleção (a lista permanece aberta) e o `×` de cada
 * chip remove a opção. Aceita `aria-invalid`/`aria-describedby` (encaminhados
 * pelo FormField em estado de erro) e fica com a borda vermelha quando inválido.
 */
export function MultiCombobox({
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
  selectedOptions,
}: MultiComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useIsDesktop()
  const isServer = onSearchChange !== undefined
  // Chips a partir de selectedOptions (rótulos salvos) + página atual, dedup
  // por value (primeira ocorrência vence → o rótulo salvo prevalece).
  const seen = new Set<string>()
  const selected = [...(selectedOptions ?? []), ...options].filter((option) => {
    if (!value.includes(option.value) || seen.has(option.value)) return false
    seen.add(option.value)
    return true
  })
  const { listRef, sentinelRef } = useInfiniteScrollSentinel({
    enabled: isServer && !!hasMore,
    loading,
    onLoadMore,
  })

  const toggleValue = (optionValue: string) => {
    onChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue],
    )
  }

  const removeValue = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue))
  }

  const trigger = (
    <div
      id={id}
      role="combobox"
      tabIndex={disabled ? -1 : 0}
      aria-expanded={open}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
      aria-disabled={disabled}
      onKeyDown={(event) => {
        if (disabled) return
        if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
          event.preventDefault()
          setOpen(true)
        }
      }}
      className={cn(
        "flex min-h-9 w-full cursor-pointer flex-wrap items-center gap-1 rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-ring/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive",
        className,
      )}
    >
      {selected.length === 0 ? (
        <span className="text-muted-foreground">{placeholder}</span>
      ) : (
        selected.map((option) => (
          <span
            key={option.value}
            className="inline-flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground"
          >
            {option.label}
            <button
              type="button"
              tabIndex={-1}
              aria-label={`Remover ${option.label}`}
              onClick={(event) => {
                event.stopPropagation()
                removeValue(option.value)
              }}
              onPointerDown={(event) => event.stopPropagation()}
              className="rounded-sm opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))
      )}
      <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
    </div>
  )

  const command = (
    <CommandPrimitive
      shouldFilter={!isServer}
      className="flex h-full w-full flex-col overflow-hidden"
    >
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandPrimitive.Input
          placeholder={searchPlaceholder}
          onValueChange={isServer ? onSearchChange : undefined}
          className="flex h-11 w-full bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground sm:h-9 sm:text-sm"
        />
      </div>
      <CommandPrimitive.List
        ref={listRef}
        className="max-h-[50vh] overflow-y-auto overflow-x-hidden p-1 sm:max-h-60"
      >
        {!isServer && (
          <CommandPrimitive.Empty className="py-6 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </CommandPrimitive.Empty>
        )}
        {options.map((option) => (
          <CommandPrimitive.Item
            key={option.value}
            value={isServer ? option.value : option.label}
            disabled={option.disabled}
            onSelect={() => toggleValue(option.value)}
            className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-2.5 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 sm:py-1.5"
          >
            <Check
              className={cn(
                "h-4 w-4 shrink-0",
                value.includes(option.value) ? "opacity-100" : "opacity-0",
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
  )

  if (isDesktop) {
    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild disabled={disabled}>
          {trigger}
        </PopoverPrimitive.Trigger>
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
    )
  }

  return (
    <DrawerPrimitive.Root open={open} onOpenChange={setOpen}>
      <DrawerPrimitive.Trigger asChild disabled={disabled}>
        {trigger}
      </DrawerPrimitive.Trigger>
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
  )
}
