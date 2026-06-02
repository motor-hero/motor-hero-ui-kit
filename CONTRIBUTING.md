# Contribuindo com o @motor-hero/ui-kit

Este guia explica como desenvolver, testar e publicar componentes. As versões e o
publish no npm são **totalmente automatizados** a partir das suas mensagens de commit —
você não edita a versão à mão, não cria tags e não cria releases manualmente.

## Sumário

- [Fluxo de trabalho](#fluxo-de-trabalho)
- [Mensagens de commit (Conventional Commits)](#mensagens-de-commit-conventional-commits)
- [Como a versão é calculada](#como-a-versão-é-calculada)
- [Como uma release acontece](#como-uma-release-acontece)
- [Desenvolvimento e teste local](#desenvolvimento-e-teste-local)

## Fluxo de trabalho

1. Crie uma branch a partir da `main`.
2. Desenvolva e teste localmente (veja [Desenvolvimento e teste local](#desenvolvimento-e-teste-local)).
3. Abra um Pull Request. **O título do PR precisa seguir o padrão de commit** (ex.: `feat: adiciona Tooltip`),
   porque ele vira a mensagem do commit ao fazer *Squash and merge*.
4. Após o merge na `main`, o bot **release-please** abre/atualiza um PR de release com a próxima
   versão e o `CHANGELOG.md` já preenchidos.
5. Quando quiser publicar, **faça merge do PR de release** — isso cria a tag, a GitHub Release e
   publica no npm automaticamente.

## Mensagens de commit (Conventional Commits)

O padrão é `tipo: descrição` (ex.: `fix: corrige scroll do Sidebar no mobile`). A **descrição do
commit vira a linha do changelog**, então escreva algo claro e no imperativo.

| Tipo | Quando usar | Gera release? |
|---|---|---|
| `feat:` | nova funcionalidade / novo componente | sim (minor) |
| `fix:` | correção de bug | sim (patch) |
| `feat!:` ou rodapé `BREAKING CHANGE:` | mudança que quebra a API | sim (ver tabela abaixo) |
| `docs:` | só documentação | não |
| `chore:` | manutenção, configs | não |
| `build:` | build, dependências, CI | não |
| `refactor:` | refatoração sem mudar comportamento | não |
| `test:` | apenas testes | não |

Exemplo de mudança que quebra a API:

```
feat!: renomeia a prop `variant` do Button para `intent`

BREAKING CHANGE: a prop `variant` foi removida; use `intent` no lugar.
```

> As mensagens são validadas localmente por **commitlint + husky** (um commit fora do padrão é
> bloqueado antes de ser criado) e o título do PR é validado no CI. Rodar `npm install` instala o
> hook automaticamente.

## Como a versão é calculada

O número da versão **não é escolhido à mão** — ele é derivado dos tipos de commit desde a última
release. Vale sempre o maior bump encontrado. O projeto ainda está em `0.x`, então mantemos a
faixa `0.x` por enquanto (config `bump-minor-pre-major: true`):

| Commit | Bump | A partir de `0.5.1` → |
|---|---|---|
| `fix:` | patch | `0.5.2` |
| `feat:` | minor | `0.6.0` |
| `feat!:` / `BREAKING CHANGE:` | minor (permanece em `0.x`) | `0.6.0` |
| `docs:` / `chore:` / `build:` / `refactor:` / `test:` | nenhum | sem release |

### Quando ir para `1.0.0`

`1.0.0` é uma decisão deliberada (API estável / pronta para produção), não automática. Para cortar
a `1.0.0`, faça um commit com o rodapé:

```
Release-As: 1.0.0
```

## Como uma release acontece

Tudo é orquestrado por `.github/workflows/release-please.yml`:

1. A cada push na `main`, o release-please mantém um PR de release atualizado (`chore(main): release X.Y.Z`)
   contendo o bump em `package.json`, o `.release-please-manifest.json` e o `CHANGELOG.md` gerado.
2. Ao **fazer merge desse PR**, o mesmo workflow cria a tag `vX.Y.Z`, a GitHub Release e roda
   `npm publish --provenance` (com proveniência verificável no npm).

## Desenvolvimento e teste local

### Playground (mesmo repositório) — recomendado para iterar

A documentação é um app Vite que importa os componentes direto de `src/`, com hot reload:

```bash
# no motor-hero-ui-kit
npm run docs:dev      # sobe a documentação com os componentes ao vivo
npm run dev           # (opcional) tsup --watch, reconstrói dist/ a cada alteração
```

### Opção A — `npm link` (ao vivo, bom para iteração ativa)

Útil para testar o kit dentro de outro projeto que o consome, com atualização contínua.

```bash
# 1) no motor-hero-ui-kit  (registra um symlink global e mantém o build rodando)
npm run build         # garante que dist/ existe
npm link
npm run dev           # deixe rodando para dist/ atualizar enquanto você edita
```

```bash
# 2) no OUTRO projeto (o app que consome o kit)
npm link @motor-hero/ui-kit
```

`react` e `react-dom` são *peerDependencies*. Para evitar duas cópias do React (erro de "Invalid
hook call"), aponte o kit para o React do app consumidor:

```bash
# no motor-hero-ui-kit, apontando para o node_modules do consumidor
npm link ../meu-app/node_modules/react ../meu-app/node_modules/react-dom
```

Para desfazer ao terminar:

```bash
# no OUTRO projeto
npm unlink @motor-hero/ui-kit
# no motor-hero-ui-kit
npm unlink
```

### Opção B — `npm pack` (mais fiel ao publish; teste final recomendado)

Gera exatamente o tarball que seria publicado, respeitando o allowlist `files` do `package.json`.
É o melhor teste de pré-release porque pega bugs de "funciona local mas faltou no pacote publicado".

```bash
# 1) no motor-hero-ui-kit  (build + cria o tarball que o npm publicaria)
npm run build
npm pack              # gera motor-hero-ui-kit-0.5.1.tgz (só dist/, src/ e README.md)
```

```bash
# 2) no OUTRO projeto (instala o tarball como uma dependência real)
npm install ../motor-hero-ui-kit/motor-hero-ui-kit-0.5.1.tgz
```

> `npm pack` é um snapshot (sem hot reload) — refaça o `pack` e reinstale a cada alteração.
