import { AuthCard, FormField, PasswordInput } from "@motor-hero/ui-kit"
import { CodeBlock } from "../components/CodeBlock"
import { PropsTable } from "../components/PropsTable"

export function AuthCardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AuthCard</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Card centralizado full-screen para páginas de autenticação (login, registro, recuperação de senha).
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Exemplo</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Em produção, o AuthCard ocupa a tela inteira. Abaixo está em container limitado para visualização.
        </p>
        <div className="auth-card-preview rounded-lg border bg-card">
          <AuthCard
            title="Entrar"
            description="Insira suas credenciais"
            footer={
              <p className="text-center text-sm text-muted-foreground">
                Não tem conta?{" "}
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
              <PasswordInput id="auth-password" placeholder="Senha" />
            </FormField>
            <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
              Entrar
            </button>
          </AuthCard>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Uso</h2>
        <CodeBlock
          code={`import { AuthCard, FormField, PasswordInput } from "@motor-hero/ui-kit"

<AuthCard
  title="Entrar"
  description="Insira suas credenciais"
  footer={<Link to="/register">Cadastre-se</Link>}
>
  <FormField label="Email" htmlFor="email" required>
    <Input id="email" type="email" {...register("email")} />
  </FormField>
  <FormField label="Senha" htmlFor="password" required>
    <PasswordInput id="password" {...register("password")} />
  </FormField>
  <Button type="submit" className="w-full">Entrar</Button>
</AuthCard>`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Props</h2>
        <PropsTable
          props={[
            { name: "title", type: "string", required: true, description: "Título do card" },
            { name: "description", type: "string", description: "Subtítulo abaixo do título" },
            { name: "children", type: "ReactNode", required: true, description: "Conteúdo do formulário" },
            { name: "footer", type: "ReactNode", description: "Conteúdo no rodapé (ex: link de cadastro)" },
          ]}
        />
      </div>
    </div>
  )
}
