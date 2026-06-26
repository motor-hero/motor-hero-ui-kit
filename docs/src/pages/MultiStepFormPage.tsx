import { FormDialog, FormField, cn } from "@motor-hero/ui-kit"
import { Check } from "lucide-react"
import { useState } from "react"
import { CodeBlock } from "../components/CodeBlock"

const inputClass =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"

const steps = [
  { id: "personal", label: "Dados pessoais" },
  { id: "address", label: "Endereço" },
  { id: "review", label: "Revisão" },
] as const

interface FormData {
  name: string
  email: string
  street: string
  city: string
  zip: string
}

const emptyForm: FormData = { name: "", email: "", street: "", city: "", zip: "" }

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center">
      {steps.map((step, i) => {
        const isDone = i < current
        const isActive = i === current
        return (
          <li
            key={step.id}
            aria-current={isActive ? "step" : undefined}
            className="flex flex-1 items-center last:flex-none"
          >
            <div className="flex items-center gap-2">
              <span
                aria-label={`Passo ${i + 1}: ${step.label}${isDone ? " (concluído)" : ""}`}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                  isDone && "border-primary bg-primary text-primary-foreground",
                  isActive && "border-primary text-primary",
                  !isDone && !isActive && "border-input text-muted-foreground",
                )}
              >
                {isDone ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-sm font-medium sm:inline",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                aria-hidden
                className={cn(
                  "mx-3 h-px flex-1 transition-colors",
                  isDone ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

function MultiStepFormDemo() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData((prev) => ({ ...prev, [key]: e.target.value }))

  const reset = () => {
    setStep(0)
    setData(emptyForm)
    setErrors({})
  }

  const close = () => {
    setOpen(false)
    reset()
  }

  const validateStep = () => {
    const next: Partial<Record<keyof FormData, string>> = {}
    if (step === 0) {
      if (!data.name.trim()) next.name = "Informe o nome."
      if (!data.email.trim()) next.email = "Informe o e-mail."
      else if (!/.+@.+\..+/.test(data.email)) next.email = "E-mail inválido."
    }
    if (step === 1) {
      if (!data.street.trim()) next.street = "Informe a rua."
      if (!data.city.trim()) next.city = "Informe a cidade."
      if (!data.zip.trim()) next.zip = "Informe o CEP."
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const goNext = () => {
    if (!validateStep()) return
    if (step < steps.length - 1) setStep((s) => s + 1)
    else {
      close()
    }
  }

  const goBack = () => {
    if (step === 0) close()
    else setStep((s) => s - 1)
  }

  const isLast = step === steps.length - 1

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
      >
        Iniciar cadastro
      </button>

      <FormDialog
        open={open}
        onOpenChange={(o) => {
          if (!o) close()
        }}
        title="Novo cadastro"
        description={`Passo ${step + 1} de ${steps.length} — ${steps[step].label}`}
        size="lg"
        onSubmit={(e) => {
          e.preventDefault()
          goNext()
        }}
        footer={
          <>
            <button
              type="button"
              onClick={goBack}
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent"
            >
              {step === 0 ? "Cancelar" : "Voltar"}
            </button>
            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {isLast ? "Concluir" : "Próximo"}
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <Stepper current={step} />

          {step === 0 && (
            <div className="space-y-4">
              <FormField label="Nome" htmlFor="msf-name" required error={errors.name}>
                <input
                  id="msf-name"
                  // biome-ignore lint/a11y/noAutofocus: foco intencional ao entrar no passo
                  autoFocus
                  value={data.name}
                  onChange={set("name")}
                  placeholder="Maria Silva"
                  className={inputClass}
                />
              </FormField>
              <FormField label="E-mail" htmlFor="msf-email" required error={errors.email}>
                <input
                  id="msf-email"
                  type="email"
                  value={data.email}
                  onChange={set("email")}
                  placeholder="maria@empresa.com"
                  className={inputClass}
                />
              </FormField>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <FormField label="Rua" htmlFor="msf-street" required error={errors.street}>
                <input
                  id="msf-street"
                  // biome-ignore lint/a11y/noAutofocus: foco intencional ao entrar no passo
                  autoFocus
                  value={data.street}
                  onChange={set("street")}
                  placeholder="Av. Paulista, 1000"
                  className={inputClass}
                />
              </FormField>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Cidade" htmlFor="msf-city" required error={errors.city}>
                  <input
                    id="msf-city"
                    value={data.city}
                    onChange={set("city")}
                    placeholder="São Paulo"
                    className={inputClass}
                  />
                </FormField>
                <FormField label="CEP" htmlFor="msf-zip" required error={errors.zip}>
                  <input
                    id="msf-zip"
                    value={data.zip}
                    onChange={set("zip")}
                    placeholder="01310-100"
                    className={inputClass}
                  />
                </FormField>
              </div>
            </div>
          )}

          {step === 2 && (
            <dl className="divide-y rounded-lg border text-sm">
              {[
                { label: "Nome", value: data.name },
                { label: "E-mail", value: data.email },
                { label: "Rua", value: data.street },
                { label: "Cidade", value: data.city },
                { label: "CEP", value: data.zip },
              ].map((row) => (
                <div key={row.label} className="flex justify-between gap-4 px-4 py-2.5">
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="text-right font-medium">{row.value || "—"}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </FormDialog>
    </>
  )
}

export function MultiStepFormPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Multi-step Form</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Cadastro faseado dentro de um{" "}
          <a href="#form-dialog" className="text-brand underline">
            FormDialog
          </a>{" "}
          (especialização do BaseDialog): o estado do passo vive no componente, o
          cabeçalho mostra o progresso, um stepper com <code>aria-current</code>{" "}
          indica em que etapa você está e o rodapé fixo navega entre as fases
          (Voltar / Próximo / Concluir). Cada passo valida antes de avançar, o foco
          cai no primeiro campo da etapa e <kbd>Enter</kbd> avança. Não é um
          componente novo do kit — é um padrão de composição sobre o dialog.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <MultiStepFormDemo />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Como funciona</h2>
        <CodeBlock
          code={`const steps = ["Dados pessoais", "Endereço", "Revisão"]
const [step, setStep] = useState(0)
const [data, setData] = useState(emptyForm)

const goNext = () => {
  if (!validateStep()) return            // valida o passo atual
  if (step < steps.length - 1) setStep(step + 1)
  else submit(data)                      // último passo: envia
}

// FormDialog envolve corpo + rodapé num <form>, então Enter dispara goNext
<FormDialog
  open={open}
  onOpenChange={(o) => { if (!o) close() }}
  title="Novo cadastro"
  description={\`Passo \${step + 1} de \${steps.length}\`}
  onSubmit={(e) => { e.preventDefault(); goNext() }}
  footer={
    <>
      <Button type="button" variant="outline" onClick={goBack}>
        {step === 0 ? "Cancelar" : "Voltar"}
      </Button>
      <Button type="submit">
        {step === steps.length - 1 ? "Concluir" : "Próximo"}
      </Button>
    </>
  }
>
  <Stepper current={step} />
  {step === 0 && <PersonalFields />}  {/* primeiro campo com autoFocus */}
  {step === 1 && <AddressFields />}
  {step === 2 && <Review data={data} />}
</FormDialog>`}
        />
      </div>
    </div>
  )
}
