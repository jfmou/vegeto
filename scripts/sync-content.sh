#!/usr/bin/env bash
set -euo pipefail

if ! command -v git >/dev/null 2>&1; then
  echo "Erreur: git est requis." >&2
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Erreur: commande a executer dans un depot git." >&2
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "Erreur: remote 'origin' introuvable." >&2
  exit 1
fi

current_branch="$(git rev-parse --abbrev-ref HEAD)"

if [[ "$current_branch" == "HEAD" ]]; then
  echo "Erreur: HEAD detachee. Revenez sur une branche avant de synchroniser." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain --untracked-files=all)" ]]; then
  echo "Erreur: la copie locale contient des changements non sauvegardes." >&2
  echo "Astuce: lancez d'abord 'npm run save' ou rangez les changements avant de synchroniser." >&2
  exit 1
fi

git fetch origin --prune

bash ./scripts/cleanup-merged-content-branches.sh

if git show-ref --verify --quiet refs/heads/master; then
  git switch master
else
  git switch -c master --track origin/master
fi

git merge --ff-only origin/master

echo ""
echo "Synchronisation terminee: master est a jour avec origin/master."
echo "Prochaine etape: npm install && npm run dev"