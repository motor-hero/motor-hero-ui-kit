import { useDisclosure, useTheme, useCustomToast } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"

export function HooksPage() {
  const disclosure = useDisclosure()
  const { theme } = useTheme()
  const showToast = useCustomToast()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hooks</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Hooks personalizados exportados pelo ui-kit.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-4 text-xl font-semibold">useDisclosure()</h2>
          <p className="mb-4 text-muted-foreground">
            Hook para controlar estados booleanos de open/close. Ideal para modais, dialogs, drawers e popovers.
          </p>

          <div className="mb-4 rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4">
              <button
                onClick={disclosure.onToggle}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Toggle
              </button>
              <button
                onClick={disclosure.onOpen}
                className="rounded-md border border-input px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
              >
                Open
              </button>
              <button
                onClick={disclosure.onClose}
                className="rounded-md border border-input px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
              >
                Close
              </button>
              <span className="text-sm text-muted-foreground">
                Estado: <span className="font-mono font-medium text-foreground">{String(disclosure.open)}</span>
              </span>
            </div>
          </div>

          <CodeBlock
            code={`import { useDisclosure } from "@motor-hero/ui-kit"

function MyComponent() {
  const { open, onOpen, onClose, onToggle, setOpen } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Abrir modal</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleConfirm}
        title="Confirmar"
        description="Tem certeza?"
      />
    </>
  )
}

// Com estado inicial aberto:
const { open } = useDisclosure(true)`}
          />

          <div className="mt-4 rounded-lg border p-4">
            <h3 className="mb-2 text-sm font-semibold">Retorno</h3>
            <div className="space-y-1 text-sm">
              <p><code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">open: boolean</code> — Estado atual</p>
              <p><code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">onOpen: () =&gt; void</code> — Abre (seta true)</p>
              <p><code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">onClose: () =&gt; void</code> — Fecha (seta false)</p>
              <p><code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">onToggle: () =&gt; void</code> — Inverte o estado</p>
              <p><code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">setOpen: (v: boolean) =&gt; void</code> — Setter direto</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="mb-4 text-xl font-semibold">useTheme()</h2>
          <p className="mb-4 text-muted-foreground">
            Hook para acessar e alterar o tema atual. Requer ThemeProvider na árvore de componentes.
          </p>

          <div className="mb-4 rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              Tema atual: <span className="font-mono font-medium text-foreground">{theme}</span>
            </p>
          </div>

          <CodeBlock
            code={`import { useTheme } from "@motor-hero/ui-kit"

function MyComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <p>Tema atual: {theme}</p>
      <button onClick={() => setTheme("dark")}>Escuro</button>
      <button onClick={() => setTheme("light")}>Claro</button>
      <button onClick={() => setTheme("system")}>Sistema</button>
    </div>
  )
}`}
          />

          <div className="mt-4 rounded-lg border p-4">
            <h3 className="mb-2 text-sm font-semibold">Retorno</h3>
            <div className="space-y-1 text-sm">
              <p><code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">theme: "dark" | "light" | "system"</code> — Tema atual</p>
              <p><code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">setTheme: (theme: Theme) =&gt; void</code> — Altera o tema</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="mb-4 text-xl font-semibold">useCustomToast()</h2>
          <p className="mb-4 text-muted-foreground">
            Hook que retorna uma função para disparar notificações toast. Requer o componente Toaster na árvore.
          </p>

          <div className="mb-4 rounded-lg border bg-card p-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => showToast("Sucesso!", "Operação realizada.", "success")}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Toast de sucesso
              </button>
              <button
                onClick={() => showToast("Erro!", "Algo deu errado.", "error")}
                className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow hover:bg-destructive/90"
              >
                Toast de erro
              </button>
            </div>
          </div>

          <CodeBlock
            code={`import { useCustomToast } from "@motor-hero/ui-kit"

function MyComponent() {
  const showToast = useCustomToast()

  const handleSave = async () => {
    try {
      await api.save(data)
      showToast("Salvo", "Alterações aplicadas.", "success")
    } catch (err) {
      showToast("Erro", extractApiError(err), "error")
    }
  }
}`}
          />

          <div className="mt-4 rounded-lg border p-4">
            <h3 className="mb-2 text-sm font-semibold">Assinatura</h3>
            <div className="text-sm">
              <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
                showToast(title: string, description?: string, status?: "success" | "error" | "info" | "warning"): void
              </code>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="mb-4 text-xl font-semibold">useIsDesktop()</h2>
          <p className="mb-4 text-muted-foreground">
            Retorna <code>true</code> no desktop (&ge; 640px) e <code>false</code> no mobile, reagindo a mudanças de viewport. É o que permite componentes responsivos (Combobox, RowActionsMenu, UserMenu) trocarem Popover/DropdownMenu por Drawer/bottom sheet no mobile.
          </p>
          <CodeBlock
            code={`import { useIsDesktop } from "@motor-hero/ui-kit"

function MyComponent() {
  const isDesktop = useIsDesktop()

  return isDesktop ? <Popover>...</Popover> : <Drawer>...</Drawer>
}`}
          />

          <div className="mt-4 rounded-lg border p-4">
            <h3 className="mb-2 text-sm font-semibold">Assinatura</h3>
            <div className="text-sm">
              <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
                useIsDesktop(): boolean
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
