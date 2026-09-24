#!/usr/bin/env bash
#
# Publica no npm o que mudou desde a última versão do kit.
#
#   npm run release -- [major|minor|patch] [--force] [--dry-run]
#   (ou scripts/release.sh …)
#
# Sem argumentos o script decide sozinho se há o que publicar e com que salto,
# seguindo a tabela do CONTRIBUTING.md:
#   1. lê os commits desde a última tag `vX.Y.Z` (Conventional Commits):
#      `feat` → minor, `fix`/`perf` → patch; `docs`, `chore`, `build`,
#      `refactor`, `test`, `ci` e `style` não geram versão — se só houver
#      esses, nada é publicado;
#   2. mudança que quebra a API (`tipo!:` ou `BREAKING CHANGE`) é major a
#      partir de 1.0.0; em 0.x vira minor, porque ir para 1.0.0 é decisão
#      deliberada (passe `major` para isso);
#   3. roda o build e o type check do CI, grava a versão no package.json e no
#      lockfile, faz um commit `chore(release): X.Y.Z`, cria a tag anotada
#      `vX.Y.Z` e envia commit e tag — a tag dispara `release.yml`, que
#      publica no npm, cria a GitHub Release e avisa no Slack.
#
# Passar `major|minor|patch` força o salto (e publica mesmo sem feat/fix);
# `--force` publica um patch mesmo sem feat/fix;
# `--dry-run` mostra o que seria feito sem tocar em nada.

set -euo pipefail

usage() {
  echo "uso: $0 [major|minor|patch] [--force] [--dry-run]" >&2
  exit 2
}

forced_bump=""
force=false
dry_run=false

for arg in "$@"; do
  case "$arg" in
    major | minor | patch) forced_bump="$arg" ;;
    --force) force=true ;;
    --dry-run) dry_run=true ;;
    *) usage ;;
  esac
done

root="$(git rev-parse --show-toplevel)"
cd "$root"
remote="origin"

say() { printf '\033[1;34m▸\033[0m %s\n' "$*"; }
die() { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; exit 1; }

# --- pré-condições -----------------------------------------------------------

branch="$(git rev-parse --abbrev-ref HEAD)"
[[ "$branch" == "main" ]] || die "faça o release a partir de main (você está em $branch)"
[[ -z "$(git status --porcelain)" ]] || die "há alterações não commitadas; commite ou guarde antes"

say "buscando $remote…"
git fetch --quiet --tags "$remote"
[[ "$(git rev-parse HEAD)" == "$(git rev-parse "$remote/main")" ]] \
  || die "main local difere de $remote/main; faça pull/push antes"

# --- o que há para publicar ---------------------------------------------------

last_tag_version() {
  git tag --list "v*" | sed -E 's/^v//' \
    | grep -E '^[0-9]+\.[0-9]+\.[0-9]+$' | sort -V | tail -1 || true
}

max_version() {
  printf '%s\n%s\n' "$1" "$2" | grep -E '^[0-9]+\.[0-9]+\.[0-9]+$' | sort -V | tail -1
}

next_version() {
  local IFS=. major minor patch
  read -r major minor patch <<<"$1"
  case "$2" in
    major) echo "$((major + 1)).0.0" ;;
    minor) echo "$major.$((minor + 1)).0" ;;
    patch) echo "$major.$minor.$((patch + 1))" ;;
  esac
}

tag="$(last_tag_version)"
range="HEAD"
[[ -n "$tag" ]] && range="v$tag..HEAD"

# Assunto + corpo de cada commit (sem merges), para achar `BREAKING CHANGE`.
log="$(git log --no-merges --format='%s%n%b' "$range")"
subjects="$(git log --no-merges --format='%s' "$range")"

current="$(max_version "$(node -p "require('./package.json').version")" "$tag")"
[[ -n "$current" ]] || current="0.0.0"

bump_from_commits() {
  if grep -qE '^[a-z]+(\([^)]*\))?!:|^BREAKING CHANGE' <<<"$log"; then
    [[ "${current%%.*}" == "0" ]] && echo minor || echo major
  elif grep -qE '^feat(\([^)]*\))?:' <<<"$subjects"; then echo minor
  elif grep -qE '^(fix|perf)(\([^)]*\))?:' <<<"$subjects"; then echo patch
  fi
  return 0
}

bump="${forced_bump:-$(bump_from_commits)}"
if [[ -z "$bump" ]]; then
  if $force; then
    bump="patch"
  else
    say "nenhum feat/fix desde v${tag:-(nenhuma)}; nada a publicar (use --force ou passe o salto)"
    exit 0
  fi
fi

next="$(next_version "$current" "$bump")"
git rev-parse -q --verify "refs/tags/v$next" >/dev/null && die "a tag v$next já existe"

say "$current → $next  ($bump; tag v$next)"
say "entra no changelog:"
grep -E '^(feat|fix|perf)(\([^)]*\))?!?:' <<<"$subjects" | sed 's/^/     /' || echo "     (só manutenção)"

if $dry_run; then
  say "dry-run: nada foi alterado"
  exit 0
fi

# --- confere o que o CI confere, antes de existir tag -----------------------

say "build e type check…"
npm run --silent build >/dev/null
npx --no tsc --noEmit --skipLibCheck

# --- grava a versão, commit, tag, envia --------------------------------------

npm version "$next" --no-git-tag-version --allow-same-version >/dev/null
git add package.json package-lock.json
git commit --quiet -m "chore(release): $next"
git tag -a "v$next" -m "$next"

say "enviando commit e tag para $remote…"
git push --quiet "$remote" main "v$next"

say "pronto: v$next. Acompanhe em:"
echo "   $(git remote get-url "$remote" | sed -E 's#(git@github.com:|https://github.com/)##; s#\.git$##; s#^#https://github.com/#')/actions"
