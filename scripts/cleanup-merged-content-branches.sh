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

git fetch origin --prune >/dev/null 2>&1

base_ref="origin/master"
current_branch="$(git rev-parse --abbrev-ref HEAD)"
deleted_count=0

if ! git show-ref --verify --quiet "refs/remotes/$base_ref"; then
  echo "Erreur: la reference distante '$base_ref' est introuvable." >&2
  exit 1
fi

while IFS= read -r branch; do
  [[ -z "$branch" ]] && continue

  if [[ "$branch" == "$current_branch" || "$branch" == "master" ]]; then
    continue
  fi

  if git merge-base --is-ancestor "$branch" "$base_ref"; then
    git branch -d "$branch"
    deleted_count=$((deleted_count + 1))
  fi
done < <(git for-each-ref --format='%(refname:short)' refs/heads/f/new-content-*)

if [[ "$deleted_count" == "0" ]]; then
  echo "Aucune branche locale de contenu deja mergee dans $base_ref a supprimer."
else
  echo ""
  echo "Nettoyage termine: $deleted_count branche(s) locale(s) supprimee(s)."
fi