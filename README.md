# ✍️ Comment ajouter du contenu

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
  $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
  ...


  $ source ~/.bashrc # ou .zshrc si vous utilisez zsh
  ...

  $ nvm install --lts
  Installing latest LTS version.
  Downloading and installing node v18.16.1...
  Downloading https://nodejs.org/dist/v18.16.1/node-v18.16.1-darwin-arm64.tar.xz...
  ########################################################################################################### 100.0%
  Computing checksum with shasum -a 256
  Checksums matched!
  Now using node v18.16.1 (npm v9.5.1)

  $ node -v
  v18.16.1
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

```sh
$ git fetch --prune
...

$ git checkout origin/master -B master
...
```

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
$ git fetch --prune
$ npm run save
```

## 🚀 les publier sur github

```sh
$ npm run publish
```

## ⛙ fusionner les modifications avec la base de code

=> [https://github.com/jfmou/vegeto/pulls](https://github.com/jfmou/vegeto/pulls) pour valider les modifications et les intégrer à la branche commune :)
Onglet "Pull Request", créer pull request "New Pull Request", "Base:Master - Compare:new-content", ATTENDRE que CI "validate-pr" devienne vert, commenter "/deploy-beta" dans commentaires, ATTENDRE que GitHub me commente que c'est un succès, "merge pull request" - "confirm merge"
