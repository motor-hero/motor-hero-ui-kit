import { FormDialog } from "@motor-hero/ui-kit"
import { useState } from "react"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function FormDialogPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">FormDialog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Modal padronizado e responsivo: bottom sheet no mobile, dialog
          centralizado no desktop. Cabeçalho e rodapé fixos; só o corpo rola —
          ideal para formulários longos. Já corrige o bug do Radix em que a
          página fica sem cliques (<code>pointer-events: none</code>) após
          fechar um modal que contém Select/Popover.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            Abrir modal
          </button>
          <FormDialog
            open={open}
            onOpenChange={setOpen}
            title="Adicionar registro"
            size="md"
            onSubmit={(e) => {
              e.preventDefault()
              setOpen(false)
            }}
            footer={
              <>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Salvar
                </button>
              </>
            }
          >
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Conteúdo do formulário aqui. Em telas pequenas o modal vira um
                bottom sheet; com muito conteúdo, apenas esta área rola.
              </p>
              {Array.from({ length: 8 }).map((_, i) => (
                <input
                  // biome-ignore lint/suspicious/noArrayIndexKey: demo
                  key={i}
                  placeholder={`Campo ${i + 1}`}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                />
              ))}
            </div>
          </FormDialog>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { FormDialog } from "@motor-hero/ui-kit"

<FormDialog
  open={open}
  onOpenChange={setOpen}
  title="Adicionar indicador"
  size="lg"
  onSubmit={handleSubmit(onSubmit)}
  footer={
    <>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
      <Button type="submit">Salvar</Button>
    </>
  }
>
  {/* só o corpo rola */}
  <FormFields />
</FormDialog>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            {
              name: "open",
              type: "boolean",
              required: true,
              description: "Estado de abertura (controlado)",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              required: true,
              description: "Callback ao abrir/fechar (ESC, overlay, X)",
            },
            {
              name: "title",
              type: "string",
              required: true,
              description: "Título no cabeçalho fixo",
            },
            {
              name: "description",
              type: "ReactNode",
              description: "Texto auxiliar abaixo do título",
            },
            {
              name: "children",
              type: "ReactNode",
              required: true,
              description: "Corpo rolável do modal",
            },
            {
              name: "footer",
              type: "ReactNode",
              description: "Ações no rodapé fixo (botões)",
            },
            {
              name: "onSubmit",
              type: "(e: FormEvent) => void",
              description:
                "Se informado, envolve corpo + rodapé num <form> (Enter envia)",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg" | "xl" | "2xl"',
              default: '"lg"',
              description: "Largura máxima no desktop",
            },
            {
              name: "className",
              type: "string",
              description: "Classes adicionais no container",
            },
          ]}
        />
      </div>
    </div>
  )
}
