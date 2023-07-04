# ✍️ Comment ajouter du contenu

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

  $ nvm instal --lts
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
$ git fetch
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

## 💾 les sauvegarder dans git

```sh
$ npm run save
```

## 🚀 les publier sur github

```sh
$ npm run publish
```

## ⛙ fusionner les modifications avec la base de code

=> [https://github.com/jfmou/vegeto/pulls](https://github.com/jfmou/vegeto/pulls) pour valider les modifications et les intégrer à la branche commune :)