# Contribuindo com o @motor-hero/ui-kit

Este guia explica como desenvolver, testar e publicar componentes. O publish no npm é
disparado por **tags**: você trabalha na `main` e, quando quiser lançar, escolhe o bump com
`npm version` e dá push da tag — o resto (build, publish e GitHub Release) é automático.

## Sumário

- [Fluxo de trabalho](#fluxo-de-trabalho)
- [Mensagens de commit (Conventional Commits)](#mensagens-de-commit-conventional-commits)
- [Como escolher a versão](#como-escolher-a-versão)
- [Como uma release acontece](#como-uma-release-acontece)
- [Desenvolvimento e teste local](#desenvolvimento-e-teste-local)

## Fluxo de trabalho

1. Desenvolva e teste localmente (veja [Desenvolvimento e teste local](#desenvolvimento-e-teste-local)).
2. Commite na `main` usando o padrão de commit (ex.: `feat: adiciona Tooltip`) — a descrição vira a
   linha do changelog da release.
3. Quando quiser publicar, escolha o bump e dê push da tag:

   ```bash
   npm version minor      # bump no package.json + commit + cria a tag v0.7.0
   git push --follow-tags # a tag dispara o publish no npm + GitHub Release
   ```

Pushes na `main` sem tag apenas rodam o CI e atualizam a documentação — não publicam no npm.

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
> bloqueado antes de ser criado). Rodar `npm install` instala o hook automaticamente. O changelog da
> release é montado a partir dessas mensagens, agrupado por tipo.

## Como escolher a versão

O bump é decisão sua, feita com `npm version`, que atualiza o `package.json`, cria o commit e a tag
de uma vez. Use o critério dos Conventional Commits para escolher:

| Comando | Quando usar | A partir de `0.6.0` → |
|---|---|---|
| `npm version patch` | só correções (`fix:`) | `0.6.1` |
| `npm version minor` | novas funcionalidades (`feat:`) | `0.7.0` |
| `npm version major` | mudança que quebra a API | `1.0.0` |

> Em `0.x` é comum tratar `feat!` / breaking change ainda como `minor` (`npm version minor`).
> Ir para `1.0.0` é uma decisão deliberada (API estável / pronta para produção).

## Como uma release acontece

Tudo é orquestrado por `.github/workflows/release.yml`, disparado ao receber uma tag `v*`:

1. `npm ci` → `npm run build` → `npm publish --provenance` (com proveniência verificável no npm).
2. Gera o changelog a partir dos commits desde a tag anterior, agrupado por tipo, e cria a GitHub
   Release com essas notas.

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
