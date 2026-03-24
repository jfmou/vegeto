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

if ! git config user.email >/dev/null 2>&1; then
  echo "Erreur: git user.email n'est pas configuré." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain --untracked-files=all)" ]]; then
  :
else
  echo "Aucun changement à sauvegarder." >&2
  exit 1
fi

email="$(git config user.email)"
email_safe="$(echo "$email" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g; s/-\{2,\}/-/g; s/^-//; s/-$//')"
timestamp="$(date +%s)"
branch="f/new-content-${email_safe}-${timestamp}"

if git show-ref --verify --quiet "refs/heads/$branch"; then
  branch="${branch}-$(date +%N)"
fi

current_branch="$(git rev-parse --abbrev-ref HEAD)"

if [[ "$current_branch" == "HEAD" ]]; then
  echo "Erreur: HEAD détachée. Revenez sur une branche avant de lancer npm run save." >&2
  exit 1
fi

git switch -c "$branch"
git add -A

if git diff --cached --quiet; then
  echo "Aucun changement indexé après git add -A." >&2
  exit 1
fi

commit_message="content: update ${timestamp}"
git commit -m "$commit_message"

echo ""
echo "Branche créée: $branch"
echo "Commit créé: $commit_message"
echo "Prochaine étape: npm run publish"
