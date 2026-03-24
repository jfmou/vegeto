#!/usr/bin/env bash
set -euo pipefail

if ! command -v git >/dev/null 2>&1; then
  echo "Erreur: git est requis." >&2
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Erreur: commande à exécuter dans un dépôt git." >&2
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "Erreur: remote 'origin' introuvable." >&2
  exit 1
fi

branch="$(git rev-parse --abbrev-ref HEAD)"

if [[ "$branch" == "HEAD" ]]; then
  echo "Erreur: HEAD détachée. Revenez sur une branche avant de publier." >&2
  exit 1
fi

if [[ "$branch" == "master" ]]; then
  echo "Refus: publication depuis 'master' bloquée pour éviter une mauvaise manipulation." >&2
  echo "Astuce: lancez d'abord 'npm run save' pour créer une branche de contenu." >&2
  exit 1
fi

if git ls-remote --exit-code --heads origin "$branch" >/dev/null 2>&1; then
  ahead_count="$(git rev-list --count "origin/$branch..$branch")"

  if [[ "$ahead_count" == "0" ]]; then
    echo "Aucun commit local en avance sur origin/$branch."
  fi
else
  echo "Première publication de la branche '$branch' (absente sur origin)."
fi

git push -u origin "$branch"

echo ""
echo "✅ Branche publiée: $branch"
echo "🔎 Ouvrir les PR: https://github.com/jfmou/vegeto/pulls"
