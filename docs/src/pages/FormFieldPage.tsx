import { FormField } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function FormFieldPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">FormField</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Wrapper para campos de formulario com label, indicador de obrigatorio e mensagem de erro.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="max-w-sm space-y-4">
            <FormField label="Email" htmlFor="demo-email" required>
              <input
                id="demo-email"
                type="email"
                placeholder="nome@exemplo.com"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </FormField>
            <FormField label="Senha" error="Senha e obrigatoria" required>
              <input
                type="password"
                placeholder="Senha"
                className="flex h-9 w-full rounded-md border border-destructive bg-transparent px-3 py-1 text-sm shadow-sm"
              />
            </FormField>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { FormField } from "@motor-hero/ui-kit"

<FormField label="Email" htmlFor="email" required error={errors.email?.message}>
  <Input id="email" type="email" {...register("email")} />
</FormField>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "label", type: "string", required: true, description: "Texto do label" },
            { name: "htmlFor", type: "string", description: "ID do input associado" },
            { name: "error", type: "string", description: "Mensagem de erro" },
            { name: "required", type: "boolean", default: "false", description: "Mostra indicador *" },
            { name: "children", type: "ReactNode", required: true, description: "Input ou componente filho" },
            { name: "className", type: "string", description: "Classes adicionais" },
          ]}
        />
      </div>
    </div>
  )
}
