import { useState } from "react"
import { DatePicker, FormField, TimePicker } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function TimePickerPage() {
  const [time, setTime] = useState("")
  const [quarter, setQuarter] = useState("09:15")
  const [date, setDate] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [invalid, setInvalid] = useState("")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">TimePicker</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Campo de horário digitável com máscara <code>hh:mm</code> + painel com colunas de Hora e
          Minuto (nunca o <code>&lt;input type="time"&gt;</code> nativo — sempre 24h).{" "}
          <strong>Responsivo</strong>: desktop abre um Popover, mobile abre um Drawer (bottom
          sheet).
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Básico</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          <code>value</code> é hora de parede <code>"HH:mm"</code>, sem conversão de fuso — nunca
          passa por <code>Date</code>. Digitar um horário completo e válido já confirma; nas
          colunas, a escolha fica pendente até <strong>Aplicar</strong>. <strong>Limpar</strong>{" "}
          (ou apagar o campo) emite <code>""</code>.
        </p>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-xs space-y-4">
            <TimePicker value={time} onChange={setTime} aria-label="Horário" />
            <p className="text-sm text-muted-foreground">
              Valor: <span className="font-mono text-foreground">{time === "" ? '""' : time}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">minuteStep</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          <code>minuteStep</code> (padrão 5) só define as opções da coluna de minutos — digitar
          aceita qualquer minuto e não arredonda. Um minuto fora do intervalo aparece na coluna,
          na posição certa, para a seleção ficar visível.
        </p>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-xs space-y-4">
            <TimePicker value={quarter} onChange={setQuarter} minuteStep={15} aria-label="Horário" />
            <p className="text-sm text-muted-foreground">
              Valor:{" "}
              <span className="font-mono text-foreground">{quarter === "" ? '""' : quarter}</span>
            </p>
          </div>
        </div>
        <div className="mt-4">
          <CodeBlock code={`<TimePicker value={horario} onChange={setHorario} minuteStep={15} />`} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Data + horário em campos separados</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Prefira <code>DatePicker</code> + <code>TimePicker</code> ao <code>DateTimePicker</code>{" "}
          quando o horário é <strong>opcional</strong> (dá para salvar só a data) ou quando data e
          horário são <strong>guardados em campos distintos</strong> (ex. <code>date</code> +{" "}
          <code>time</code> no backend). Quando os dois formam um único instante obrigatório, use o{" "}
          <code>DateTimePicker</code>.
        </p>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex max-w-md flex-wrap items-end gap-4">
            <div className="flex-1 space-y-1.5">
              <span className="text-xs text-muted-foreground">Data</span>
              <DatePicker value={date} onChange={setDate} />
            </div>
            <div className="w-32 space-y-1.5">
              <span className="text-xs text-muted-foreground">Horário (opcional)</span>
              <TimePicker value={dateTime} onChange={setDateTime} aria-label="Horário" />
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Valores: <span className="font-mono text-foreground">{date || '""'}</span> ·{" "}
            <span className="font-mono text-foreground">{dateTime || '""'}</span>
          </p>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`<DatePicker value={data} onChange={setData} />           // "yyyy-MM-dd"
<TimePicker value={horario} onChange={setHorario} />   // "HH:mm" ou ""`}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Com FormField (erro)</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-xs">
            <FormField
              label="Horário de check-in"
              htmlFor="checkin-demo"
              required
              error={invalid ? undefined : "Informe o horário de check-in."}
            >
              <TimePicker id="checkin-demo" value={invalid} onChange={setInvalid} />
            </FormField>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { TimePicker } from "@motor-hero/ui-kit"

const [horario, setHorario] = useState("")   // hora de parede "HH:mm", "" = sem horário
<TimePicker value={horario} onChange={setHorario} />

// Valor vindo do backend como "HH:mm:ss" é aceito (exibe "HH:mm")
<TimePicker value="19:30:00" onChange={setHorario} />

// Com FormField (borda vermelha em erro via aria-invalid)
<FormField label="Horário" htmlFor="horario" error={errors.horario?.message}>
  <TimePicker id="horario" value={horario} onChange={setHorario} />
</FormField>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Acessibilidade & responsividade</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>
            Campo mascarado (<code>hh:mm</code>, <code>inputMode="numeric"</code>) — nunca dispara{" "}
            <code>onChange</code> com valor incompleto ou inválido (<code>25:99</code> é rejeitado).
            Texto incompleto volta ao valor confirmado ao sair do campo.
          </li>
          <li>
            Colunas são <code>listbox</code> ("Hora"/"Minuto") com opções <code>option</code> +{" "}
            <code>aria-selected</code>. <kbd>Tab</kbd> chega em cada coluna, <kbd>↑</kbd>/
            <kbd>↓</kbd> (e <kbd>Home</kbd>/<kbd>End</kbd>) navegam, <kbd>Enter</kbd>/
            <kbd>Espaço</kbd> selecionam, <kbd>Esc</kbd> fecha.
          </li>
          <li>
            Ao abrir, a hora e o minuto selecionados ficam centralizados nas colunas (sem seleção,
            as horas abrem perto das 12h). Sem animação de rolagem com{" "}
            <code>prefers-reduced-motion</code>.
          </li>
          <li>
            Recebe <code>aria-invalid</code>/<code>aria-describedby</code> do <code>FormField</code>{" "}
            em erro e fica com borda vermelha.
          </li>
          <li>
            <strong>Desktop</strong>: Popover não-modal ancorado no campo.
          </li>
          <li>
            <strong>Mobile</strong>: Drawer (bottom sheet) com opções de 44px; rolar uma coluna não
            arrasta o drawer.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "value", type: "string", description: 'Hora de parede "HH:mm" (24h), sem fuso. Aceita "HH:mm:ss". "" = sem valor.' },
            { name: "onChange", type: "(value: string) => void", required: true, description: 'Emite sempre "HH:mm" completo e válido, ou "" ao limpar' },
            { name: "placeholder", type: "string", default: '"hh:mm"', description: "Placeholder do campo" },
            { name: "disabled", type: "boolean", description: "Desabilita o campo" },
            { name: "minuteStep", type: "number", default: "5", description: "Intervalo das opções de minuto no painel (digitar aceita qualquer minuto)" },
            { name: "id", type: "string", description: "ID do campo (associação com label)" },
            { name: "className", type: "string", description: "Classes para o campo" },
            { name: "aria-label", type: "string", description: "Rótulo acessível quando não há <label> associado" },
            { name: "aria-invalid", type: "boolean", description: "Estado de erro (borda vermelha); o FormField injeta" },
            { name: "aria-describedby", type: "string", description: "ID da mensagem de erro/ajuda; o FormField injeta" },
          ]}
        />
      </div>
    </div>
  )
}
