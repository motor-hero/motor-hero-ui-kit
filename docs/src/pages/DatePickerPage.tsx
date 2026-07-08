import { useState } from "react"
import { DatePicker, DateTimePicker, FormField } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function DatePickerPage() {
  const [date, setDate] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [range, setRange] = useState<{ from: string; to: string }>({ from: "", to: "" })
  const [invalid, setInvalid] = useState("")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">DatePicker / DateTimePicker</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Calendário + campo digitável com máscara (nunca o <code>&lt;input type="date"/"time"&gt;</code>{" "}
          nativo do navegador — hora sempre em 24h). <strong>Responsivo</strong>: desktop abre um
          Popover, mobile abre um Drawer (bottom sheet).
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">DatePicker</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          <code>value</code> é uma data pura <code>"yyyy-MM-dd"</code>, sem conversão de fuso —
          nunca passa por <code>Date</code>/<code>toISOString()</code>. Selecionar um dia no
          calendário já confirma e fecha.
        </p>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-xs space-y-4">
            <DatePicker value={date} onChange={setDate} placeholder="Selecione a data" />
            {date && (
              <p className="text-sm text-muted-foreground">
                Valor: <span className="font-mono text-foreground">{date}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">DateTimePicker</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          <code>value</code> é ISO UTC completo (<code>...Z</code>). Escolher o dia e digitar o
          horário ficam pendentes até clicar em <strong>Aplicar</strong> — só então vira{" "}
          <code>value</code>.
        </p>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-xs space-y-4">
            <DateTimePicker
              value={dateTime}
              onChange={setDateTime}
              placeholder="Selecione a data e o horário"
            />
            {dateTime && (
              <p className="text-sm text-muted-foreground">
                Valor: <span className="font-mono text-foreground">{dateTime}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Intervalo (min/max)</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Não existe um DateRangePicker dedicado — o padrão é dois <code>DatePicker</code> com{" "}
          <code>minDate</code>/<code>maxDate</code> cruzados (mesmo padrão do filtro de auditoria).
        </p>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex max-w-md flex-wrap items-end gap-4">
            <div className="space-y-1.5">
              <span className="text-xs text-muted-foreground">De</span>
              <DatePicker
                value={range.from}
                maxDate={range.to || undefined}
                onChange={(v) => setRange((r) => ({ ...r, from: v }))}
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-xs text-muted-foreground">Até</span>
              <DatePicker
                value={range.to}
                minDate={range.from || undefined}
                onChange={(v) => setRange((r) => ({ ...r, to: v }))}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`<DatePicker value={from} maxDate={to || undefined} onChange={setFrom} />
<DatePicker value={to} minDate={from || undefined} onChange={setTo} />`}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Com FormField (erro)</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-xs">
            <FormField
              label="Vencimento"
              htmlFor="vencimento-demo"
              required
              error={invalid ? undefined : "Informe a data de vencimento."}
            >
              <DatePicker id="vencimento-demo" value={invalid} onChange={setInvalid} />
            </FormField>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { DatePicker, DateTimePicker } from "@motor-hero/ui-kit"

const [vencimento, setVencimento] = useState("")   // "yyyy-MM-dd"
<DatePicker value={vencimento} onChange={setVencimento} />

const [checkin, setCheckin] = useState("")         // ISO UTC "...Z"
<DateTimePicker value={checkin} onChange={setCheckin} />

// Com FormField (borda vermelha em erro via aria-invalid)
<FormField label="Vencimento" htmlFor="vencimento" required error={errors.vencimento?.message}>
  <DatePicker id="vencimento" value={vencimento} onChange={setVencimento} />
</FormField>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Acessibilidade & responsividade</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>
            Campo digitável mascarado (<code>dd/mm/aaaa</code>, ou{" "}
            <code>dd/mm/aaaa hh:mm</code> no DateTimePicker) — nunca dispara <code>onChange</code>{" "}
            com um valor incompleto ou inválido (dia 31/02, hora 25:99 são rejeitados).
          </li>
          <li>
            Recebe <code>aria-invalid</code>/<code>aria-describedby</code> do <code>FormField</code>{" "}
            em erro e fica com borda vermelha.
          </li>
          <li>
            <strong>Desktop</strong>: Popover não-modal ancorado no campo.
          </li>
          <li>
            <strong>Mobile</strong>: Drawer (bottom sheet), mesmo padrão de <code>Combobox</code>.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "value", type: "string", description: 'DatePicker: "yyyy-MM-dd". DateTimePicker: ISO UTC completo ("...Z"). "" = sem valor.' },
            { name: "onChange", type: "(value: string) => void", required: true, description: "Chamado só quando o valor digitado/selecionado é completo e válido" },
            { name: "placeholder", type: "string", description: "Placeholder do campo" },
            { name: "disabled", type: "boolean", description: "Desabilita o campo" },
            { name: "minDate", type: "string", description: '"yyyy-MM-dd", inclusive' },
            { name: "maxDate", type: "string", description: '"yyyy-MM-dd", inclusive' },
            { name: "disabledDates", type: "(date: Date) => boolean", description: "Predicado para desabilitar dias específicos" },
            { name: "id", type: "string", description: "ID do campo (associação com label)" },
            { name: "className", type: "string", description: "Classes para o campo" },
          ]}
        />
      </div>
    </div>
  )
}
