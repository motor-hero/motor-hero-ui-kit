import { CodeBlock } from "../components/CodeBlock"

const versionRows = [
  { commit: "fix:", bump: "patch", result: "0.5.2" },
  { commit: "feat:", bump: "minor", result: "0.6.0" },
  { commit: "feat! / BREAKING CHANGE:", bump: "minor (permanece em 0.x)", result: "0.6.0" },
  { commit: "docs: / chore: / build: / refactor: / test:", bump: "nenhum", result: "sem release" },
]

export function ContributingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Versionamento &amp; Releases</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          As versões e a publicação no npm são automatizadas a partir das mensagens de commit.
          Você não edita a versão à mão, não cria tags e não cria releases manualmente.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Mensagens de commit</h2>
        <p className="mb-4 text-muted-foreground">
          Seguimos o padrão <strong>Conventional Commits</strong> (<code className="font-mono text-sm">tipo: descrição</code>).
          A descrição do commit vira a linha do changelog, então escreva algo claro e no imperativo.
          Commits fora do padrão são bloqueados localmente por commitlint + husky, e o título do PR
          é validado no CI.
        </p>
        <CodeBlock
          language="bash"
          code={`feat: adiciona componente Tooltip
fix: corrige scroll do Sidebar no mobile
docs: atualiza exemplos do AuthCard`}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Como a versão é calculada</h2>
        <p className="mb-4 text-muted-foreground">
          A versão é derivada dos tipos de commit desde a última release (vale o maior bump).
          O projeto ainda está em <code className="font-mono text-sm">0.x</code>, então mudanças
          que quebram a API permanecem na faixa <code className="font-mono text-sm">0.x</code> por enquanto.
        </p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="px-4 py-2 font-medium">Commit</th>
                <th className="px-4 py-2 font-medium">Bump</th>
                <th className="px-4 py-2 font-medium">A partir de 0.5.1 →</th>
              </tr>
            </thead>
            <tbody>
              {versionRows.map((row) => (
                <tr key={row.commit} className="border-b last:border-0">
                  <td className="px-4 py-2 font-mono text-xs">{row.commit}</td>
                  <td className="px-4 py-2 text-muted-foreground">{row.bump}</td>
                  <td className="px-4 py-2 font-mono text-xs">{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-muted-foreground">
          A versão <code className="font-mono text-sm">1.0.0</code> é uma decisão deliberada
          (API estável). Para cortá-la, faça um commit com o rodapé:
        </p>
        <div className="mt-4">
          <CodeBlock language="bash" code={`Release-As: 1.0.0`} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Como uma release acontece</h2>
        <ol className="ml-5 list-decimal space-y-2 text-muted-foreground">
          <li>Faça merge dos PRs na <code className="font-mono text-sm">main</code> usando títulos no padrão de commit.</li>
          <li>O bot <strong>release-please</strong> abre/atualiza um PR de release com a versão e o <code className="font-mono text-sm">CHANGELOG</code> prontos.</li>
          <li>Ao fazer <strong>merge desse PR</strong>, a tag, a GitHub Release e o <code className="font-mono text-sm">npm publish --provenance</code> acontecem automaticamente.</li>
        </ol>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Testando localmente antes do merge</h2>
        <p className="mb-4 text-muted-foreground">
          O jeito mais rápido é o playground da própria documentação, que importa os componentes
          direto de <code className="font-mono text-sm">src/</code> com hot reload:
        </p>
        <CodeBlock
          language="bash"
          code={`# no motor-hero-ui-kit
npm run docs:dev      # documentação com os componentes ao vivo
npm run dev           # (opcional) tsup --watch, reconstrói dist/ a cada alteração`}
        />

        <h3 className="mb-3 mt-6 text-lg font-medium">Opção A — npm link (ao vivo)</h3>
        <p className="mb-4 text-muted-foreground">
          Para testar dentro de outro projeto que consome o kit, com atualização contínua:
        </p>
        <CodeBlock
          language="bash"
          code={`# 1) no motor-hero-ui-kit (symlink global + build em watch)
npm run build
npm link
npm run dev

# 2) no OUTRO projeto (o app que consome o kit)
npm link @motor-hero/ui-kit

# react/react-dom são peerDeps — evite React duplicado apontando para o do app:
# (rode no motor-hero-ui-kit)
npm link ../meu-app/node_modules/react ../meu-app/node_modules/react-dom

# para desfazer:
# no OUTRO projeto:  npm unlink @motor-hero/ui-kit
# no motor-hero-ui-kit:  npm unlink`}
        />

        <h3 className="mb-3 mt-6 text-lg font-medium">Opção B — npm pack (mais fiel ao publish)</h3>
        <p className="mb-4 text-muted-foreground">
          Gera exatamente o tarball que seria publicado (respeita o allowlist <code className="font-mono text-sm">files</code>).
          É o melhor teste de pré-release. É um snapshot: refaça o pack a cada alteração.
        </p>
        <CodeBlock
          language="bash"
          code={`# 1) no motor-hero-ui-kit (build + cria o tarball)
npm run build
npm pack              # gera motor-hero-ui-kit-0.5.1.tgz

# 2) no OUTRO projeto (instala como dependência real)
npm install ../motor-hero-ui-kit/motor-hero-ui-kit-0.5.1.tgz`}
        />
      </div>
    </div>
  )
}
