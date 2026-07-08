import * as PopoverPrimitive from "@radix-ui/react-popover"
import { InputMask } from "@react-input/mask"
import { format, isValid, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import * as React from "react"
import { DayPicker, type Matcher } from "react-day-picker"
import { Drawer as DrawerPrimitive } from "vaul"
import { useIsDesktop } from "../hooks/use-is-desktop"
import { cn } from "../lib/utils"

const DATE_MASK = "__/__/____"
const TIME_MASK = "__:__"
const MASK_REPLACEMENT = { _: /\d/ }

const DATE_FORMAT = "dd/MM/yyyy"
const TIME_FORMAT = "HH:mm"
const DATE_VALUE_FORMAT = "yyyy-MM-dd"

export interface DatePickerProps {
  /** `DatePicker`: data pura `"yyyy-MM-dd"`, sem conversão de fuso. `DateTimePicker`:
   *  ISO UTC completo (`...Z`). `""`/`undefined` = sem valor. */
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  /** `"yyyy-MM-dd"`, inclusive. */
  minDate?: string
  /** `"yyyy-MM-dd"`, inclusive. */
  maxDate?: string
  disabledDates?: (date: Date) => boolean
  id?: string
  className?: string
  "aria-invalid"?: boolean | "true" | "false"
  "aria-describedby"?: string
}

interface DatePickerImplProps extends DatePickerProps {
  withTime?: boolean
}

function pad(n: number): string {
  return String(n).padStart(2, "0")
}

/** Parseia `text` num formato estrito, rejeitando rollover (ex. 31/02 -> 03/03,
 *  25:99 -> next day) via round-trip: só é válido se formatar de volta pro
 *  mesmo texto exato digitado. */
function parseStrict(text: string, fmt: string): Date | null {
  const parsed = parse(text, fmt, new Date())
  if (!isValid(parsed)) return null
  return format(parsed, fmt) === text ? parsed : null
}

function dateOnlyToDate(value: string | undefined): Date | undefined {
  if (!value) return undefined
  const parsed = parse(value, DATE_VALUE_FORMAT, new Date())
  return isValid(parsed) ? parsed : undefined
}

function dateTimeToDate(value: string | undefined): Date | undefined {
  if (!value) return undefined
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed
}

function displayFor(value: string | undefined, withTime: boolean): string {
  const date = withTime ? dateTimeToDate(value) : dateOnlyToDate(value)
  if (!date) return ""
  const datePart = format(date, DATE_FORMAT)
  return withTime ? `${datePart} ${pad(date.getHours())}:${pad(date.getMinutes())}` : datePart
}

function toMatchers(
  minDate: string | undefined,
  maxDate: string | undefined,
  disabledDates: ((date: Date) => boolean) | undefined,
): Matcher[] {
  const matchers: Matcher[] = []
  const min = dateOnlyToDate(minDate)
  const max = dateOnlyToDate(maxDate)
  if (min) matchers.push({ before: min })
  if (max) matchers.push({ after: max })
  if (disabledDates) matchers.push(disabledDates)
  return matchers
}

const triggerInputClass =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive"

const fieldInputClass =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

/** Botão "ghost" (sem borda, hover:bg-accent) — mesma variante que o shadcn usa nas
 *  setas de navegação do calendário; inline porque o ui-kit não tem um Button próprio. */
const navButtonClass =
  "inline-flex size-(--cell-size) shrink-0 select-none items-center justify-center rounded-md p-0 transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:opacity-50"

const calendarClassNames = {
  months: "relative flex flex-col gap-4",
  month: "flex w-full flex-col gap-4",
  month_caption: "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
  caption_label: "text-sm font-medium select-none",
  nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
  button_previous: navButtonClass,
  button_next: navButtonClass,
  month_grid: "w-full border-collapse",
  weekdays: "flex",
  weekday: "flex-1 select-none rounded-md text-[0.8rem] font-normal text-muted-foreground",
  week: "mt-2 flex w-full",
  day: "relative aspect-square h-full w-full select-none p-0 text-center aria-selected:[&>button]:bg-primary aria-selected:[&>button]:text-primary-foreground aria-selected:[&>button]:hover:bg-primary",
  day_button:
    "inline-flex aspect-square size-auto w-full min-w-(--cell-size) items-center justify-center rounded-md p-0 font-normal transition-colors hover:bg-accent hover:text-accent-foreground",
  today: "bg-accent text-accent-foreground rounded-md",
  outside: "text-muted-foreground opacity-50",
  disabled: "text-muted-foreground opacity-50 pointer-events-none",
  hidden: "invisible",
}

const calendarComponents = {
  Chevron: ({ orientation }: { orientation?: string }) =>
    orientation === "left" ? (
      <ChevronLeft className="size-4" />
    ) : (
      <ChevronRight className="size-4" />
    ),
}

/**
 * DatePicker / DateTimePicker — calendário + campo digitável com máscara
 * (nunca o `<input type="date"/time">` nativo). Desktop: Popover não-modal;
 * mobile: Drawer (bottom sheet) — mesmo padrão de `Combobox`/`ColorPicker`.
 *
 * `DatePicker` fecha ao escolher o dia (não tem hora pra confirmar).
 * `DateTimePicker` exige "Aplicar" — calendário e campo de horário só viram
 * `value` quando os dois estão preenchidos.
 */
function DatePickerImpl({
  value,
  onChange,
  placeholder,
  disabled,
  minDate,
  maxDate,
  disabledDates,
  withTime = false,
  id,
  className,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
}: DatePickerImplProps) {
  const isDesktop = useIsDesktop()
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const [open, setOpenRaw] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [editText, setEditText] = React.useState("")
  const [pendingDate, setPendingDate] = React.useState<Date | undefined>()
  const [pendingTime, setPendingTime] = React.useState("")

  const committedDate = withTime ? dateTimeToDate(value) : dateOnlyToDate(value)
  const displayValue = displayFor(value, withTime)
  const matchers = toMatchers(minDate, maxDate, disabledDates)

  const setOpen = (next: boolean) => {
    setOpenRaw(next)
    if (next) {
      setEditText(displayValue)
      setPendingDate(committedDate)
      setPendingTime(
        committedDate ? `${pad(committedDate.getHours())}:${pad(committedDate.getMinutes())}` : "",
      )
    }
  }

  const commitDateOnly = (date: Date) => {
    onChange(format(date, DATE_VALUE_FORMAT))
    setOpen(false)
  }

  const commitDateTime = (date: Date, timeText: string) => {
    const time = parseStrict(timeText, TIME_FORMAT)
    if (!time) return
    const combined = new Date(date)
    combined.setHours(time.getHours(), time.getMinutes(), 0, 0)
    onChange(combined.toISOString())
    setOpen(false)
  }

  const handleCalendarSelect = (date: Date) => {
    if (!withTime) {
      commitDateOnly(date)
      return
    }
    setPendingDate(date)
    setEditText(`${format(date, DATE_FORMAT)} ${pendingTime}`.trim())
  }

  const handleTriggerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    setEditText(text)
    if (!withTime) {
      const parsed = parseStrict(text, DATE_FORMAT)
      if (parsed) commitDateOnly(parsed)
      return
    }
    const [datePart, timePart] = [text.slice(0, 10), text.slice(11)]
    const parsedDate = parseStrict(datePart, DATE_FORMAT)
    if (parsedDate) {
      setPendingDate(parsedDate)
      if (timePart) setPendingTime(timePart)
    }
    if (parsedDate && timePart && parseStrict(timePart, TIME_FORMAT)) {
      commitDateTime(parsedDate, timePart)
    }
  }

  const handleTimeFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPendingTime(event.target.value)
    if (pendingDate) {
      setEditText(`${format(pendingDate, DATE_FORMAT)} ${event.target.value}`.trim())
    }
  }

  const canApply = withTime && !!pendingDate && !!parseStrict(pendingTime, TIME_FORMAT)

  const trigger = (
    <div ref={triggerRef} className="relative">
      <InputMask
        id={id}
        mask={withTime ? `${DATE_MASK} ${TIME_MASK}` : DATE_MASK}
        replacement={MASK_REPLACEMENT}
        value={focused ? editText : displayValue}
        onChange={handleTriggerChange}
        onFocus={() => {
          setFocused(true)
          setOpen(true)
        }}
        onBlur={() => setFocused(false)}
        placeholder={placeholder ?? (withTime ? "dd/mm/aaaa hh:mm" : "dd/mm/aaaa")}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        className={cn(triggerInputClass, className)}
      />
      <button
        type="button"
        disabled={disabled}
        aria-label={withTime ? "Abrir calendário e horário" : "Abrir calendário"}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
      >
        {withTime ? <Clock className="h-4 w-4" /> : <CalendarIcon className="h-4 w-4" />}
      </button>
    </div>
  )

  const content = (
    <div className={withTime ? "p-3" : ""}>
      <DayPicker
        mode="single"
        locale={ptBR}
        selected={withTime ? pendingDate : committedDate}
        defaultMonth={(withTime ? pendingDate : committedDate) ?? new Date()}
        onSelect={(date) => date && handleCalendarSelect(date)}
        disabled={matchers}
        className={cn(withTime ? "p-0" : "p-3", "[--cell-size:2rem]")}
        classNames={calendarClassNames}
        components={calendarComponents}
      />
      {withTime && (
        <>
          <div className="mt-2 flex items-center gap-2 border-t pt-3">
            <span className="text-sm text-muted-foreground">Horário</span>
            <InputMask
              mask={TIME_MASK}
              replacement={MASK_REPLACEMENT}
              value={pendingTime}
              onChange={handleTimeFieldChange}
              placeholder="hh:mm"
              aria-label="Horário"
              className={cn(fieldInputClass, "flex-1")}
            />
          </div>
          <button
            type="button"
            disabled={!canApply}
            onClick={() => pendingDate && commitDateTime(pendingDate, pendingTime)}
            className="mt-3 flex h-9 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
          >
            Aplicar
          </button>
        </>
      )}
    </div>
  )

  if (isDesktop) {
    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Anchor asChild>{trigger}</PopoverPrimitive.Anchor>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            onOpenAutoFocus={(event) => event.preventDefault()}
            onInteractOutside={(event) => {
              if (triggerRef.current?.contains(event.target as Node)) event.preventDefault()
            }}
            className="pointer-events-auto z-50 w-auto overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
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
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DrawerPrimitive.Content
          onOpenAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => {
            if (triggerRef.current?.contains(event.target as Node)) event.preventDefault()
          }}
          className="fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[85vh] flex-col rounded-t-2xl border bg-popover text-popover-foreground outline-none"
        >
          <DrawerPrimitive.Title className="sr-only">
            {withTime ? "Selecione a data e o horário" : "Selecione a data"}
          </DrawerPrimitive.Title>
          <div className="mx-auto my-3 h-1.5 w-12 shrink-0 rounded-full bg-muted" />
          <div className="flex justify-center overflow-y-auto pb-4">{content}</div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}

export function DatePicker(props: DatePickerProps) {
  return <DatePickerImpl {...props} />
}

export function DateTimePicker(props: DatePickerProps) {
  return <DatePickerImpl {...props} withTime />
}
