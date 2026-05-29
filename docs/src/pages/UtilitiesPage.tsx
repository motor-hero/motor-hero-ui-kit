import { CodeBlock } from "../components/CodeBlock"

export function UtilitiesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Utilitarios</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Funcoes utilitarias exportadas pelo ui-kit.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-4 text-xl font-semibold">cn()</h2>
          <p className="mb-4 text-muted-foreground">
            Combina classes CSS usando <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">clsx</code> e
            resolve conflitos com <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">tailwind-merge</code>.
            Padrao do shadcn/ui para composicao de classes.
          </p>
          <CodeBlock
            code={`import { cn } from "@motor-hero/ui-kit"

// Combina classes condicionalmente
<div className={cn(
  "rounded-lg border p-4",
  isActive && "border-primary bg-primary/10",
  className
)} />

// Resolve conflitos do Tailwind
cn("px-4 py-2", "px-6")  // => "px-6 py-2"
cn("text-red-500", "text-blue-500")  // => "text-blue-500"`}
          />
        </div>

        <div className="border-t pt-6">
          <h2 className="mb-4 text-xl font-semibold">extractApiError()</h2>
          <p className="mb-4 text-muted-foreground">
            Extrai a mensagem de erro de respostas da API. Suporta o formato do FastAPI
            (com <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">body.detail</code>) e fallback generico.
          </p>
          <CodeBlock
            code={`import { extractApiError } from "@motor-hero/ui-kit"

try {
  await api.createUser(data)
} catch (err) {
  const message = extractApiError(err, "Erro ao criar usuario")
  toast.error(message)
}

// Suporta formatos:
// { body: { detail: "Mensagem" } }
// { body: { detail: [{ msg: "Mensagem" }] } }
// { message: "Mensagem" }`}
          />
        </div>

        <div className="border-t pt-6">
          <h2 className="mb-4 text-xl font-semibold">Assinaturas</h2>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <code className="text-sm font-mono">
                cn(...inputs: ClassValue[]): string
              </code>
            </div>
            <div className="rounded-lg border p-4">
              <code className="text-sm font-mono">
                extractApiError(err: any, fallbackMessage?: string): string
              </code>
              <p className="mt-2 text-sm text-muted-foreground">
                O <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">fallbackMessage</code> padrao
                e <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">"Ocorreu um erro inesperado."</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
