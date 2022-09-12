# reactjs.org

Aquest repositori conté tant el codi font com la documentació necessària per a impulsar [reactjs.org](https://reactjs.org/).

## Per a començar

### Requisits previs

1. Git
<<<<<<< HEAD
1. Node: qualsevol versió 12.x començant per v12.0.0 o superior
1. Yarn: Veure [Lloc web de Yarn amb instruccions d'instal·lació](https://yarnpkg.com/lang/en/docs/install/)
1. Un fork del repositori (per a contribucions)
1. Un clon de [reactjs.org repo](https://github.com/reactjs/reactjs.org) a la teva màquina local
=======
1. Node: any 12.x version starting with v12.0.0 or greater
1. Yarn v1: See [Yarn website for installation instructions](https://yarnpkg.com/lang/en/docs/install/)
1. A fork of the repo (for any contributions)
1. A clone of the [reactjs.org repo](https://github.com/reactjs/reactjs.org) on your local machine
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

### Instal·lació

1. `cd reactjs.org` per anar a l'arrel del projecte
2. `yarn` per a instal·lar les dependències del lloc web

### Executant localment

1. `yarn dev` per a iniciar el servidor hot-reloading de desenvolupament (per [Gatsby](https://www.gatsbyjs.org))
2. `open http://localhost:8000` per a obrir el lloc web al teu navegador

## Contribuir

### Directrius

<<<<<<< HEAD
La documentació està dividida en diferents seccions amb diferent to i propòsit. Si planeja en fer una traducció extensa, pot trobar útil estar familiaritzat amb les directrius de contribució [contributing guidelines](https://github.com/reactjs/reactjs.org/blob/master/CONTRIBUTING.md#guidelines-for-text) per a la secció apropiada.
=======
The documentation is divided into several sections with a different tone and purpose. If you plan to write more than a few sentences, you might find it helpful to get familiar with the [contributing guidelines](https://github.com/reactjs/reactjs.org/blob/main/CONTRIBUTING.md#guidelines-for-text) for the appropriate sections.
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

### Crear una branca

<<<<<<< HEAD
1. `git checkout master` des de qualsevol directori dins del teu repositori local de `reactjs.org`
2. `git pull origin master` per a assegurar que el codi està actualitzat amb els canvis més recents
3. `git checkout -b nom-de-la-meva-branca` (reemplaça `nom-de-la-meva-branca` amb el nom adient) per a crear una nova branca
=======
1. `git checkout main` from any folder in your local `reactjs.org` repository
1. `git pull origin main` to ensure you have the latest main code
1. `git checkout -b the-name-of-my-branch` (replacing `the-name-of-my-branch` with a suitable name) to create a branch
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

### Fer canvis

1. Seguir les instruccions ["Executant localment"](#executant-localment)
1. Guarda els fitxers i comprova el navegador
  1. Canvis de components de React dins del directori `src` s'aplicaran automàticament
  1. Canvis de fitxers de markdown dins el directori `content` s'aplicaran automàticament
  1. Si treballa amb plugins, pot ser que hagi d'eliminar el directori `.cache` i reiniciar el servidor de desenvolupament

### Provar els canvis

1. Si li és possible, provi qualsevol canvi visual en totes les últimes versions dels navegadors més comuns, tant en versió d'escriptori com mòbil.
2. Executi la comanda `yarn check-all` des del directori arrel del projecte. (Aquesta comanda executarà Prettier, ESLint, i Flow.)

### Afegeix els canvis

<<<<<<< HEAD
1. `git add -A && git commit -m "El meu missatge"` (canviï `El meu missatge` amb un missatge de commit, tal com `Solucionar logotip en Android`) per a afegir i actualitzar el repositori
1. `git push el-meu-fork nom-de-la-meva-branca`
1. Vagi a [reactjs.org repo](https://github.com/reactjs/reactjs.org) i podrà veure els canvis mes recents a qualsevol de les branques actualitzades.
1. Segueixi les instruccions de GitHub.
1. A ser possible, inclogui captures de pantalla dels canvis visuals. Una build de [Netlify](https://www.netlify.com/) es crearà automàticament quan enviï la PR per tal que altra gent pugui visualitzar els canvis.
=======
1. `git add -A && git commit -m "My message"` (replacing `My message` with a commit message, such as `Fix header logo on Android`) to stage and commit your changes
1. `git push my-fork-name the-name-of-my-branch`
1. Go to the [reactjs.org repo](https://github.com/reactjs/reactjs.org) and you should see recently pushed branches.
1. Follow GitHub's instructions.
1. If possible, include screenshots of visual changes. A preview build is triggered after your changes are pushed to GitHub.
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

## Traduccions

<<<<<<< HEAD
Si està interessat a traduir `reactjs.org`, si us plau, comprovi l'estat actual de la traducció a [isreacttranslatedyet.com](https://www.isreacttranslatedyet.com/).
=======
If you are interested in translating `reactjs.org`, please see the current translation efforts at [translations.reactjs.org](https://translations.reactjs.org/).
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

## Resolució de problemes

- `yarn reset` per a buidar la caché local

## Llicència
Content submitted to [reactjs.org](https://reactjs.org/) is CC-BY-4.0 licensed, as found in the [LICENSE-DOCS.md](https://github.com/open-source-explorer/reactjs.org/blob/master/LICENSE-DOCS.md) file.
