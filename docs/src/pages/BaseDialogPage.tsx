import { BaseDialog } from "@motor-hero/ui-kit"
import { useState } from "react"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function BaseDialogPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">BaseDialog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Estrutura base de modal padronizado e responsivo: bottom sheet no
          mobile, dialog centralizado no desktop. Cabeçalho e rodapé fixos; só o
          corpo rola. Já corrige o bug do Radix em que a página fica sem cliques
          (<code>pointer-events: none</code>) após fechar um modal que contém
          Select/Popover. É agnóstico a formulário e a botões — use o{" "}
          <code>footer</code> para as ações que quiser. Para formulários, veja{" "}
          <a href="#form-dialog" className="text-brand underline">
            FormDialog
          </a>
          , uma especialização que envolve o corpo num <code>&lt;form&gt;</code>.
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
          <BaseDialog
            open={open}
            onOpenChange={setOpen}
            title="Detalhes do registro"
            description="Um dialog genérico, sem formulário."
            size="md"
            footer={
              <>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Ok
                </button>
              </>
            }
          >
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Conteúdo livre. Em telas pequenas o modal vira um bottom sheet;
                com muito conteúdo, apenas esta área rola.
              </p>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: demo
                  key={i}
                  className="rounded-md border px-3 py-2 text-sm"
                >
                  Linha {i + 1}
                </div>
              ))}
            </div>
          </BaseDialog>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { BaseDialog } from "@motor-hero/ui-kit"

<BaseDialog
  open={open}
  onOpenChange={setOpen}
  title="Detalhes"
  size="lg"
  footer={
    <>
      <Button variant="outline" onClick={() => setOpen(false)}>Fechar</Button>
      <Button onClick={handleOk}>Ok</Button>
    </>
  }
>
  {/* só o corpo rola */}
  <Content />
</BaseDialog>`}
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
            {
              name: "blurBackdrop",
              type: "boolean",
              default: "true",
              description:
                "Desfoca o fundo atrás do modal. Passe false para manter o scrim liso.",
            },
            {
              name: "backdropClassName",
              type: "string",
              description:
                "Classes extras no scrim/overlay. Ajusta o escurecimento por diálogo, ex.: bg-black/40 (mais leve) ou bg-transparent (só o blur). O default é bg-black/50.",
            },
            {
              name: "contentWrapper",
              type: "(content: ReactNode) => ReactNode",
              description:
                "Avançado: envolve o conteúdo interno dentro do Content. Usado pelo FormDialog para injetar um <form>.",
            },
          ]}
        />
      </div>
    </div>
  )
}
