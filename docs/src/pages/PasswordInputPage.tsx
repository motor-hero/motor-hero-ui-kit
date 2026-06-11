import { useState } from "react"
import { PasswordInput } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function PasswordInputPage() {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">PasswordInput</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Campo de senha com botão de mostrar/ocultar integrado. Aceita todas as
          props de um input HTML (exceto <code>type</code>) e encaminha a ref,
          então funciona direto com <code>react-hook-form</code>.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-md">
            <PasswordInput
              placeholder="Sua senha"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { PasswordInput } from "@motor-hero/ui-kit"

// Controlado
const [password, setPassword] = useState("")

<PasswordInput
  placeholder="Sua senha"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

// Com react-hook-form (encaminha a ref)
<PasswordInput placeholder="Senha" {...register("password")} />`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Acessibilidade</h2>
        <p className="text-sm text-muted-foreground">
          O botão de alternância tem <code>aria-label</code> ("Mostrar senha" /
          "Ocultar senha") e fica fora da ordem de tabulação (
          <code>tabIndex=-1</code>). Ao receber <code>aria-invalid</code> (por
          exemplo, via <code>FormField</code> em erro), a borda fica vermelha.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            {
              name: "containerClassName",
              type: "string",
              description: "Classes para o container externo (relative)",
            },
            {
              name: "className",
              type: "string",
              description: "Classes para o input",
            },
            {
              name: "...props",
              type: "Omit<InputHTMLAttributes, 'type'>",
              description:
                "Todas as props de input HTML, exceto type (placeholder, value, onChange, ref, aria-invalid, etc.)",
            },
          ]}
        />
      </div>
    </div>
  )
}
