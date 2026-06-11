import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Command as CommandPrimitive } from "cmdk"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import * as React from "react"
import { cn } from "../lib/utils"

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onChange: (value: string) => void  
  placeholder?: string  
  searchPlaceholder?: string  
  emptyMessage?: string
  disabled?: boolean
  id?: string
  className?: string
  "aria-invalid"?: boolean | "true" | "false"
  "aria-describedby"?: string
}

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
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((option) => option.value === value)

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen} modal>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedby}
          disabled={disabled}
          className={cn(
            "flex h-9 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive",
            className,
          )}
        >
          <span
            className={cn("truncate", !selected && "text-muted-foreground")}
          >
            {selected ? selected.label : placeholder}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className="z-50 overflow-hidden rounded-md border bg-popover p-0 text-popover-foreground shadow-md"
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <CommandPrimitive className="flex h-full w-full flex-col overflow-hidden">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandPrimitive.Input
                placeholder={searchPlaceholder}
                className="flex h-9 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <CommandPrimitive.List className="max-h-60 overflow-y-auto overflow-x-hidden p-1">
              <CommandPrimitive.Empty className="py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </CommandPrimitive.Empty>
              {options.map((option) => (
                <CommandPrimitive.Item
                  key={option.value}
                  value={option.label}
                  disabled={option.disabled}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
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
            </CommandPrimitive.List>
          </CommandPrimitive>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
