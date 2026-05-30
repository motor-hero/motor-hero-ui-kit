import { useState } from "react"
import { ConfirmDialog } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function ConfirmDialogPage() {
  const [open, setOpen] = useState(false)
  const [destructiveOpen, setDestructiveOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ConfirmDialog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Dialog de confirmação construído com Radix UI AlertDialog. Suporta variantes default e destructive.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex gap-4">
            <button
              onClick={() => setOpen(true)}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Confirmar ação
            </button>
            <button
              onClick={() => setDestructiveOpen(true)}
              className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow hover:bg-destructive/90"
            >
              Excluir item
            </button>
          </div>

          <ConfirmDialog
            open={open}
            onOpenChange={setOpen}
            onConfirm={() => setOpen(false)}
            title="Confirmar ação"
            description="Tem certeza que deseja realizar esta ação?"
          />

          <ConfirmDialog
            open={destructiveOpen}
            onOpenChange={setDestructiveOpen}
            onConfirm={() => setDestructiveOpen(false)}
            title="Excluir item"
            description="Esta ação não pode ser desfeita. O item será removido permanentemente."
            confirmLabel="Excluir"
            variant="destructive"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { ConfirmDialog } from "@motor-hero/ui-kit"
import { useDisclosure } from "@motor-hero/ui-kit"

const { open, onOpen, onClose, setOpen } = useDisclosure()

<Button onClick={onOpen}>Excluir</Button>

<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  onConfirm={handleDelete}
  title="Excluir usuário"
  description="Esta ação não pode ser desfeita."
  confirmLabel="Excluir"
  variant="destructive"
  loading={isDeleting}
/>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "open", type: "boolean", required: true, description: "Controla visibilidade do dialog" },
            { name: "onOpenChange", type: "(open: boolean) => void", required: true, description: "Callback ao mudar estado" },
            { name: "onConfirm", type: "() => void", required: true, description: "Callback ao confirmar" },
            { name: "title", type: "string", required: true, description: "Título do dialog" },
            { name: "description", type: "ReactNode", required: true, description: "Descrição/mensagem" },
            { name: "confirmLabel", type: "string", default: '"Confirmar"', description: "Texto do botão de confirmação" },
            { name: "cancelLabel", type: "string", default: '"Cancelar"', description: "Texto do botão de cancelar" },
            { name: "loading", type: "boolean", default: "false", description: "Exibe estado de carregamento" },
            { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Estilo visual do botão de confirmação" },
          ]}
        />
      </div>
    </div>
  )
}
