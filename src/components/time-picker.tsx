import * as PopoverPrimitive from "@radix-ui/react-popover"
import { InputMask } from "@react-input/mask"
import { Clock } from "lucide-react"
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { useIsDesktop } from "../hooks/use-is-desktop"
import { cn } from "../lib/utils"
import {
  drawerContentClass,
  drawerHandleClass,
  drawerOverlayClass,
  ignoreTriggerInteraction,
  MASK_REPLACEMENT,
  pad,
  popoverContentClass,
  primaryButtonClass,
  TIME_MASK,
  triggerIconButtonClass,
  triggerInputClass,
} from "./picker-shared"

export interface TimePickerProps {
  /** Hora de parede `"HH:mm"` (24h), sem fuso. Aceita `"HH:mm:ss"` na entrada
   *  (exibe só `HH:mm`); `onChange` emite sempre `"HH:mm"` ou `""`. */
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  /** Intervalo das opções de minuto no painel. Digitar aceita qualquer minuto. */
  minuteStep?: number
  id?: string
  className?: string
  "aria-label"?: string
  "aria-invalid"?: boolean | "true" | "false"
  "aria-describedby"?: string
}

interface Time {
  hour: number
  minute: number
}

const TIME_PREFIX = /^([01]\d|2[0-3]):([0-5]\d)/
const HOUR_TEXT = /^([01]\d|2[0-3])$/
const HOURS = Array.from({ length: 24 }, (_, i) => i)
const DEFAULT_SCROLL_HOUR = 12

function parseTime(text: string | undefined): Time | null {
  const match = text ? TIME_PREFIX.exec(text) : null
  return match ? { hour: Number(match[1]), minute: Number(match[2]) } : null
}

function formatTime({ hour, minute }: Time): string {
  return `${pad(hour)}:${pad(minute)}`
}

function minuteOptions(step: number, current: number | undefined): number[] {
  const safeStep = Number.isFinite(step) && step >= 1 ? Math.min(Math.floor(step), 60) : 5
  const options: number[] = []
  for (let m = 0; m < 60; m += safeStep) options.push(m)
  if (current !== undefined && !options.includes(current)) {
    options.push(current)
    options.sort((a, b) => a - b)
  }
  return options
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
}

/** Mexe só no `scrollTop` da coluna — `scrollIntoView` rolaria também o
 *  drawer e a página. */
function centerOption(column: HTMLElement | null, value: number | undefined, behavior: ScrollBehavior) {
  if (!column || value === undefined) return
  const item = column.querySelector<HTMLElement>(`[data-value="${value}"]`)
  if (!item) return
  column.scrollTo({ top: item.offsetTop - (column.clientHeight - item.offsetHeight) / 2, behavior })
}

function keepOptionVisible(column: HTMLElement, item: HTMLElement) {
  if (item.offsetTop < column.scrollTop) {
    column.scrollTop = item.offsetTop
  } else if (item.offsetTop + item.offsetHeight > column.scrollTop + column.clientHeight) {
    column.scrollTop = item.offsetTop + item.offsetHeight - column.clientHeight
  }
}

function handleColumnKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
  const column = event.currentTarget
  const items = Array.from(column.querySelectorAll<HTMLElement>("[role=option]"))
  const current = items.indexOf(document.activeElement as HTMLElement)
  const last = items.length - 1
  const next =
    event.key === "ArrowDown"
      ? Math.min(current + 1, last)
      : event.key === "ArrowUp"
        ? Math.max(current - 1, 0)
        : event.key === "Home"
          ? 0
          : event.key === "End"
            ? last
            : null
  if (next === null) return
  event.preventDefault()
  items[next].focus({ preventScroll: true })
  keepOptionVisible(column, items[next])
}

interface TimeColumnProps {
  label: string
  options: number[]
  selected: number | undefined
  tabStop: number
  onPick: (value: number) => void
  isDesktop: boolean
  columnRef: React.RefObject<HTMLDivElement | null>
}

function TimeColumn({ label, options, selected, tabStop, onPick, isDesktop, columnRef }: TimeColumnProps) {
  const labelId = React.useId()
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span id={labelId} className="text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <div
        ref={columnRef}
        role="listbox"
        aria-labelledby={labelId}
        data-vaul-no-drag=""
        onKeyDown={handleColumnKeyDown}
        className={cn(
          "relative flex flex-col gap-0.5 overflow-y-auto overscroll-contain rounded-md border p-1 [scrollbar-width:thin]",
          isDesktop ? "h-56 w-16" : "h-[40dvh] w-24",
        )}
      >
        {options.map((option) => {
          const isSelected = option === selected
          return (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={isSelected}
              data-value={option}
              tabIndex={option === tabStop ? 0 : -1}
              onClick={() => onPick(option)}
              className={cn(
                "flex w-full shrink-0 items-center justify-center rounded-md text-sm tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                isDesktop ? "h-8" : "h-11 text-base",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {pad(option)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface TimePanelProps {
  hour: number | undefined
  minute: number | undefined
  minuteStep: number
  syncToken: number
  isDesktop: boolean
  onPickHour: (hour: number) => void
  onPickMinute: (minute: number) => void
  onApply: () => void
  onClear: () => void
  canClear: boolean
  panelRef: React.RefObject<HTMLDivElement | null>
  onShiftTabOut: () => void
}

function TimePanel({
  hour,
  minute,
  minuteStep,
  syncToken,
  isDesktop,
  onPickHour,
  onPickMinute,
  onApply,
  onClear,
  canClear,
  panelRef,
  onShiftTabOut,
}: TimePanelProps) {
  const hourColumnRef = React.useRef<HTMLDivElement>(null)
  const minuteColumnRef = React.useRef<HTMLDivElement>(null)
  const initialSyncToken = React.useRef(syncToken)
  const minutes = minuteOptions(minuteStep, minute)

  // Sincroniza a rolagem das colunas ao abrir (instantâneo) e quando o campo
  // digitado muda a seleção. Clique numa opção não re-centraliza, senão a lista
  // pularia debaixo do dedo.
  React.useLayoutEffect(() => {
    const behavior: ScrollBehavior =
      syncToken === initialSyncToken.current || prefersReducedMotion() ? "auto" : "smooth"
    centerOption(hourColumnRef.current, hour ?? DEFAULT_SCROLL_HOUR, behavior)
    centerOption(minuteColumnRef.current, minute, behavior)
  }, [syncToken])

  const buttonHeight = isDesktop ? "h-9" : "h-11"

  return (
    <div
      ref={panelRef}
      className="p-3"
      onKeyDown={(event) => {
        if (event.key === "Tab" && event.shiftKey && hourColumnRef.current?.contains(event.target as Node)) {
          event.preventDefault()
          onShiftTabOut()
        }
      }}
    >
      <div className="flex justify-center gap-2">
        <TimeColumn
          label="Hora"
          options={HOURS}
          selected={hour}
          tabStop={hour ?? DEFAULT_SCROLL_HOUR}
          onPick={onPickHour}
          isDesktop={isDesktop}
          columnRef={hourColumnRef}
        />
        <TimeColumn
          label="Minuto"
          options={minutes}
          selected={minute}
          tabStop={minute ?? 0}
          onPick={onPickMinute}
          isDesktop={isDesktop}
          columnRef={minuteColumnRef}
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 border-t pt-3">
        <button
          type="button"
          disabled={!canClear}
          onClick={onClear}
          className={cn(
            "inline-flex items-center justify-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            buttonHeight,
          )}
        >
          Limpar
        </button>
        <button
          type="button"
          disabled={hour === undefined || minute === undefined}
          onClick={onApply}
          className={cn(
            primaryButtonClass,
            "px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            buttonHeight,
          )}
        >
          Aplicar
        </button>
      </div>
    </div>
  )
}

/**
 * TimePicker — campo digitável com máscara `hh:mm` (24h, nunca o
 * `<input type="time">` nativo) + painel de colunas Hora/Minuto. Desktop:
 * Popover não-modal; mobile: Drawer (bottom sheet) — mesmo padrão do `DatePicker`.
 *
 * Digitar um horário completo e válido já confirma; pelas colunas, a escolha só
 * vira `value` em "Aplicar". Diferente do `DatePicker`, esvaziar o campo emite
 * `""` (horário costuma ser opcional).
 */
export function TimePicker({
  value,
  onChange,
  placeholder = "hh:mm",
  disabled,
  minuteStep = 5,
  id,
  className,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
}: TimePickerProps) {
  const isDesktop = useIsDesktop()
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const iconButtonRef = React.useRef<HTMLButtonElement>(null)
  const closedFromPanelRef = React.useRef(false)
  const [open, setOpenRaw] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [editText, setEditText] = React.useState("")
  const [pendingHour, setPendingHour] = React.useState<number | undefined>()
  const [pendingMinute, setPendingMinute] = React.useState<number | undefined>()
  const [syncToken, setSyncToken] = React.useState(0)

  const committed = parseTime(value)
  const displayValue = committed ? formatTime(committed) : ""

  const setOpen = (next: boolean) => {
    setOpenRaw(next)
    if (!next) closedFromPanelRef.current = !!panelRef.current?.contains(document.activeElement)
    if (next) {
      setEditText(displayValue)
      setPendingHour(committed?.hour)
      setPendingMinute(committed?.minute)
    }
  }

  const close = (text: string) => {
    setEditText(text)
    setOpen(false)
  }

  const handleTriggerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    setEditText(text)
    if (text === "") {
      setPendingHour(undefined)
      setPendingMinute(undefined)
      if (value) onChange("")
      return
    }
    const typed = text.length === TIME_MASK.length ? parseTime(text) : null
    if (typed) {
      setPendingHour(typed.hour)
      setPendingMinute(typed.minute)
      setSyncToken((t) => t + 1)
      onChange(formatTime(typed))
      return
    }
    const hourText = text.slice(0, 2)
    if (HOUR_TEXT.test(hourText) && Number(hourText) !== pendingHour) {
      setPendingHour(Number(hourText))
      setSyncToken((t) => t + 1)
    }
  }

  const handlePickHour = (hour: number) => {
    setPendingHour(hour)
    if (pendingMinute === undefined) setPendingMinute(0)
  }

  const handleApply = () => {
    if (pendingHour === undefined || pendingMinute === undefined) return
    const next = formatTime({ hour: pendingHour, minute: pendingMinute })
    onChange(next)
    close(next)
  }

  const handleClear = () => {
    if (value) onChange("")
    setPendingHour(undefined)
    setPendingMinute(undefined)
    close("")
  }

  const trigger = (
    <div
      ref={triggerRef}
      className="relative"
      onKeyDown={(event) => {
        // O painel fica num portal, fora da ordem de Tab: leva o foco direto
        // pra coluna de horas em vez de sair do campo e fechar o painel.
        if (event.key !== "Tab" || event.shiftKey || !open) return
        const firstOption = panelRef.current?.querySelector<HTMLElement>('[role=option][tabindex="0"]')
        if (!firstOption) return
        event.preventDefault()
        firstOption.focus({ preventScroll: true })
      }}
    >
      <InputMask
        id={id}
        mask={TIME_MASK}
        replacement={MASK_REPLACEMENT}
        inputMode="numeric"
        value={focused ? editText : displayValue}
        onChange={handleTriggerChange}
        onFocus={(event) => {
          // Máscara cheia não aceita dígito novo: seleciona tudo pra digitar por
          // cima. No próximo frame, senão o mouseup do clique desfaz a seleção.
          const input = event.currentTarget
          requestAnimationFrame(() => input.select())
          setFocused(true)
          if (open) setEditText(displayValue)
          else setOpen(true)
        }}
        onClick={() => {
          if (!open) setOpen(true)
        }}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        className={cn(triggerInputClass, "tabular-nums", className)}
      />
      <button
        ref={iconButtonRef}
        type="button"
        disabled={disabled}
        aria-label="Abrir seletor de horário"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={triggerIconButtonClass}
      >
        <Clock className="h-4 w-4" />
      </button>
    </div>
  )

  const content = (
    <TimePanel
      hour={pendingHour}
      minute={pendingMinute}
      minuteStep={minuteStep}
      syncToken={syncToken}
      isDesktop={isDesktop}
      onPickHour={handlePickHour}
      onPickMinute={setPendingMinute}
      onApply={handleApply}
      onClear={handleClear}
      canClear={!!value || pendingHour !== undefined || pendingMinute !== undefined}
      panelRef={panelRef}
      onShiftTabOut={() => triggerRef.current?.querySelector("input")?.focus()}
    />
  )

  // Sem Radix Trigger, o foco que estava no painel cairia no <body> (ou no
  // primeiro focável da página, no Drawer). Volta pro botão, não pro input —
  // o onFocus do input reabriria o painel.
  const handleCloseAutoFocus = (event: Event) => {
    if (!closedFromPanelRef.current) return
    closedFromPanelRef.current = false
    event.preventDefault()
    iconButtonRef.current?.focus()
  }

  if (isDesktop) {
    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Anchor asChild>{trigger}</PopoverPrimitive.Anchor>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            onOpenAutoFocus={(event) => event.preventDefault()}
            onCloseAutoFocus={handleCloseAutoFocus}
            onInteractOutside={ignoreTriggerInteraction(triggerRef)}
            className={popoverContentClass}
          >
            {content}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    )
  }

  return (
    <DrawerPrimitive.Root open={open} onOpenChange={setOpen}>
      {trigger}
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className={drawerOverlayClass} />
        <DrawerPrimitive.Content
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={handleCloseAutoFocus}
          onInteractOutside={ignoreTriggerInteraction(triggerRef)}
          className={drawerContentClass}
        >
          <DrawerPrimitive.Title className="sr-only">Selecione o horário</DrawerPrimitive.Title>
          <div className={drawerHandleClass} />
          <div className="flex justify-center overflow-y-auto pb-4">{content}</div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}
