<div style="background-color: #a0b0a5; padding: 20px; display: flex; justify-content: center;">
  <img src="src/assets/logo-transparent.png" alt="Logo Vegeto">
</div>

# ✍️ Comment ajouter du contenu

Ordre recommande a chaque debut de session :

1. `npm run sync-content`
2. `npm run dev`
3. modifier le contenu dans Tina
4. `npm run save`
5. `npm run publish`

- [✍️ Comment ajouter du contenu](#️-comment-ajouter-du-contenu)
    - [1. un environement UNIX / OSX avec bash ou shell](#1-un-environement-unix--osx-avec-bash-ou-shell)
    - [2. node.js LTS](#2-nodejs-lts)
    - [3. git](#3-git)
  - [🌐 Récupérer la dernière version du site](#-récupérer-la-dernière-version-du-site)
  - [🤖 lancer le serveur](#-lancer-le-serveur)
  - [🎰 ouvrir l'interface d'administration dans un navigateur à jour](#-ouvrir-linterface-dadministration-dans-un-navigateur-à-jour)
  - [✅ effectuer les modifications et les enregistrer dans "Tina"](#-effectuer-les-modifications-et-les-enregistrer-dans-tina)
  - [💾 les sauvegarder dans git](#-les-sauvegarder-dans-git)
  - [🚀 les publier sur github](#-les-publier-sur-github)
  - [⛙ fusionner les modifications avec la base de code](#-fusionner-les-modifications-avec-la-base-de-code)

<details>
  <summary>Pré-requis</summary>


  ### 1. un environement UNIX / OSX avec bash ou shell

  ### 2. node.js LTS

  installation via [nvm](https://github.com/nvm-sh/nvm) :

  ```sh
  $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  ...


  $ source ~/.bashrc # ou .zshrc si vous utilisez zsh
  ...

  $ nvm install --lts
  Installing latest LTS version.
  Downloading and installing node v24.13.0...
  Downloading https://nodejs.org/dist/v24.13.0/node-v24.13.0-linux-x64.tar.xz...
  ########################################################################################################### 100.0%
  Computing checksum with shasum -a 256
  Checksums matched!
  Now using node v24.13.0 (npm v11.6.2)

  $ node -v
  v24.13.0
  ```

  ### 3. git

  ```sh
  $ sudo apt update
  ...

  $ sudo apt install git
  ...
  ```

</details>

## 🌐 Récupérer la dernière version du site

Commencer toujours par cette commande avant de lancer des modifications.

```sh
$ npm run sync-content
...
```

`npm run sync-content` recupere les changements depuis `origin`, nettoie les references obsoletes, supprime les branches locales `f/new-content-*` deja mergees, puis remet `master` a jour avec `origin/master`.

## 🤖 lancer le serveur

```sh
$ npm install && npm run dev
...
````

## 🎰 ouvrir l'interface d'administration dans un navigateur à jour

=> naviguer sur [http://localhost:8080/admin](http://localhost:8080/admin/)

## ✅ effectuer les modifications et les enregistrer dans "Tina"

## 💾 les sauvegarder dans git (ouvrir une nouvelle interface Ubuntu en gardant la première ouverte)

```sh
$ npm run save
```

`npm run save` crée une nouvelle branche `f/new-content-...`, ajoute tous les changements et crée un commit.

Cette commande s'utilise apres `npm run sync-content` et apres les modifications dans Tina.

## 🚀 les publier sur github

```sh
$ npm run publish
```

`npm run publish` pousse uniquement la branche courante (pas `--all`).

Cette commande s'utilise apres `npm run save`.

## ⛙ fusionner les modifications avec la base de code

=> [https://github.com/jfmou/vegeto/pulls](https://github.com/jfmou/vegeto/pulls) pour valider les modifications et les intégrer à la branche commune :)
Onglet "Pull Request", créer pull request "New Pull Request", "Base:Master - Compare:new-content", ATTENDRE que CI "validate-pr" devienne vert, commenter "/deploy-beta" dans commentaires, ATTENDRE que GitHub me commente que c'est un succès, "merge pull request" - "confirm merge"

## 🧹 nettoyer les branches locales deja mergees

```sh
$ npm run cleanup
```

`npm run cleanup` supprime uniquement les branches locales `f/new-content-*` deja integrees dans `origin/master`.

En pratique, `npm run sync-content` lance deja ce nettoyage. Cette commande reste utile seulement si tu veux nettoyer sans faire la synchronisation complete.
