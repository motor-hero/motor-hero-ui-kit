import { AuthCard, FormField } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function AuthCardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AuthCard</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Card centralizado full-screen para paginas de autenticacao (login, registro, recuperacao de senha).
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Renderizado em escala reduzida para visualizacao. Em producao, ocupa a tela inteira.
        </p>
        <div className="rounded-lg border bg-card">
          <div className="relative h-[420px] overflow-hidden rounded-lg">
            <div className="absolute inset-0 scale-75 origin-top">
              <AuthCard
                title="Entrar"
                description="Insira suas credenciais"
                footer={
                  <p className="text-center text-sm text-muted-foreground">
                    Nao tem conta?{" "}
                    <span className="text-primary underline">Cadastre-se</span>
                  </p>
                }
              >
                <FormField label="Email" htmlFor="auth-email" required>
                  <input
                    id="auth-email"
                    type="email"
                    placeholder="nome@exemplo.com"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </FormField>
                <FormField label="Senha" htmlFor="auth-password" required>
                  <input
                    id="auth-password"
                    type="password"
                    placeholder="Senha"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </FormField>
                <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                  Entrar
                </button>
              </AuthCard>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { AuthCard, FormField } from "@motor-hero/ui-kit"

<AuthCard
  title="Entrar"
  description="Insira suas credenciais"
  footer={<Link to="/register">Cadastre-se</Link>}
>
  <FormField label="Email" htmlFor="email" required>
    <Input id="email" type="email" {...register("email")} />
  </FormField>
  <FormField label="Senha" htmlFor="password" required>
    <Input id="password" type="password" {...register("password")} />
  </FormField>
  <Button type="submit" className="w-full">Entrar</Button>
</AuthCard>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "title", type: "string", required: true, description: "Titulo do card" },
            { name: "description", type: "string", description: "Subtitulo abaixo do titulo" },
            { name: "children", type: "ReactNode", required: true, description: "Conteudo do formulario" },
            { name: "footer", type: "ReactNode", description: "Conteudo no rodape (ex: link de cadastro)" },
          ]}
        />
      </div>
    </div>
  )
}
