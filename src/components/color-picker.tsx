import * as PopoverPrimitive from "@radix-ui/react-popover"
import { ChevronsUpDown } from "lucide-react"
import * as React from "react"
import { HexColorInput, HexColorPicker } from "react-colorful"
import { cn } from "../lib/utils"

export interface ColorPickerProps {
  /** Current color as a hex string (e.g. `#8f27c2`). */
  value?: string | null
  onChange: (value: string) => void
  /** Trigger text shown when no color is set. */
  placeholder?: string
  disabled?: boolean
  id?: string
  className?: string
  "aria-invalid"?: boolean | "true" | "false"
  "aria-describedby"?: string
}

/**
 * Color picker — a brand swatch trigger opening a Popover with a
 * saturation/hue area (react-colorful) and a hex input.
 *
 * Controlled via `value`/`onChange` (hex string, with leading `#`). Forwards
 * `aria-invalid`/`aria-describedby` from FormField and shows a destructive
 * border when invalid, matching the other kit inputs.
 */
export function ColorPicker({
  value,
  onChange,
  placeholder = "Selecionar cor",
  disabled,
  id,
  className,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
}: ColorPickerProps) {
  const [open, setOpen] = React.useState(false)
  const color = value || ""

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen} modal>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          id={id}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedby}
          disabled={disabled}
          className={cn(
            "flex h-9 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive",
            className,
          )}
        >
          <span className="flex items-center gap-2 truncate">
            <span
              aria-hidden
              className={cn(
                "h-5 w-5 shrink-0 rounded border border-border",
                !color && "bg-[length:8px_8px] bg-[position:0_0,4px_4px]",
              )}
              style={
                color
                  ? { backgroundColor: color }
                  : {
                      backgroundImage:
                        "linear-gradient(45deg,var(--color-muted) 25%,transparent 25%,transparent 75%,var(--color-muted) 75%),linear-gradient(45deg,var(--color-muted) 25%,transparent 25%,transparent 75%,var(--color-muted) 75%)",
                    }
              }
            />
            <span className={cn("truncate", !color && "text-muted-foreground")}>
              {color || placeholder}
            </span>
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className="z-50 w-56 rounded-md border bg-popover p-3 text-popover-foreground shadow-md"
        >
          <div className="mh-color-picker flex flex-col gap-3">
            <HexColorPicker color={color} onChange={onChange} />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">#</span>
              <HexColorInput
                color={color}
                onChange={onChange}
                prefixed={false}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm uppercase shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
