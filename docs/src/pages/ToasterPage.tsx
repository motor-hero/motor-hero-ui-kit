import { useCustomToast } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function ToasterPage() {
  const showToast = useCustomToast()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Toaster</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Sistema de notificações toast construído com Sonner. Integra automaticamente com o tema atual via ThemeProvider.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => showToast("Salvo com sucesso", "As alterações foram aplicadas.", "success")}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Sucesso
            </button>
            <button
              onClick={() => showToast("Erro ao salvar", "Verifique os campos obrigatórios.", "error")}
              className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow hover:bg-destructive/90"
            >
              Erro
            </button>
            <button
              onClick={() => showToast("Informação", "O processo pode levar alguns minutos.", "info")}
              className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
            >
              Info
            </button>
            <button
              onClick={() => showToast("Atenção", "Sua sessão expira em 5 minutos.", "warning")}
              className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
            >
              Warning
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Setup</h2>
        <p className="mb-4 text-muted-foreground">
          Adicione o componente <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Toaster</code> no
          root da aplicação, dentro do ThemeProvider:
        </p>
        <CodeBlock
          code={`import { ThemeProvider, Toaster } from "@motor-hero/ui-kit"

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <MyApp />
      <Toaster />
    </ThemeProvider>
  )
}`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">useCustomToast</h2>
        <p className="mb-4 text-muted-foreground">
          Hook que retorna uma função para disparar toasts com título, descrição e tipo:
        </p>
        <CodeBlock
          code={`import { useCustomToast } from "@motor-hero/ui-kit"

function MyComponent() {
  const showToast = useCustomToast()

  const handleSave = async () => {
    try {
      await api.save(data)
      showToast("Salvo", "Alterações aplicadas com sucesso.", "success")
    } catch (err) {
      showToast("Erro", extractApiError(err), "error")
    }
  }
}`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">API direta</h2>
        <p className="mb-4 text-muted-foreground">
          Para casos mais avançados, use o <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">toast</code> do
          Sonner diretamente:
        </p>
        <CodeBlock
          code={`import { toast } from "@motor-hero/ui-kit"

// Com ação
toast("Arquivo deletado", {
  description: "O arquivo foi movido para a lixeira.",
  action: {
    label: "Desfazer",
    onClick: () => restoreFile(),
  },
})

// Promise
toast.promise(saveData(), {
  loading: "Salvando...",
  success: "Dados salvos!",
  error: "Erro ao salvar.",
})`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props do Toaster</h2>
        <PropsTable
          props={[
            { name: "position", type: '"top-left" | "top-right" | "bottom-left" | "bottom-right" | ...', default: '"bottom-right"', description: "Posição dos toasts na tela" },
            { name: "duration", type: "number", default: "4000", description: "Duração em ms antes de fechar" },
            { name: "richColors", type: "boolean", default: "false", description: "Usar cores de fundo por tipo" },
            { name: "closeButton", type: "boolean", default: "false", description: "Mostrar botão de fechar" },
          ]}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">useCustomToast</h2>
        <div className="rounded-lg border p-4">
          <code className="text-sm font-mono">
            showToast(title: string, description?: string, status?: "success" | "error" | "info" | "warning"): void
          </code>
        </div>
      </div>
    </div>
  )
}
