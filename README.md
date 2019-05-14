# reactjs.org

Aquest repositori conté tant el codi font com la documentació necessaris per a impulsar [reactjs.org](https://reactjs.org/).

## Per a començar

### Requisits previs

1. Git
2. Node: qualsevol versió 8.x començant per 8.4.0 o superior
3. Yarn: Veure [Lloc web de Yarn amb instructions d'instal·lació](https://yarnpkg.com/lang/en/docs/install/)
4. Un fork del repositori (per a contribucions)
5. Un clon de [reactjs.org repo](https://github.com/reactjs/reactjs.org) a la teva màquina local

### Instal·lació

1. `cd reactjs.org` per anar a l'arrel del projecte
2. `yarn` per a instal·lar les dependències del lloc web

### Executant localment

1. `yarn dev` per a iniciar el servidor hot-reloading de desenvolupament (per [Gatsby](https://www.gatsbyjs.org))
2. `open http://localhost:8000` per a obrir el lloc web al teu navegador

## Contribuïnt

### Directrius

La documentació està dividida en diferents seccions amb diferent to i propòsit. Si planeja en fer una traducció extensa, pot trobar útil estar familiaritzat amb les directrius de contribució [contributing guidelines](https://github.com/reactjs/reactjs.org/blob/master/CONTRIBUTING.md#guidelines-for-text) per a la secció apropiada.

### Crear una branca

1. `git checkout master` desde qualsevol directori dins del teu repositori local de `reactjs.org`
2. `git pull origin master` per a assegurar que el codi està actualitzat amb els canvis mes recents
3. `git checkout -b nom-de-la-meva-branca` (reemplaça `nom-de-la-meva-branca` amb el nom adient) per a crear una nova branca

### Fer canvis

1. Seguir les instruccions "Executant localment"
2. Guarda els fitxers i comprova el navegador
  1. Canvis de components de React dins de el directori `src` s'aplicaran automàticament
  2. Cavnis de fitxers de markdowndins el directori `content` s'aplicaran automàticament
  3. Si treballa amb plugins, pot ser que hagi d'eliminar el directori `.cache` i reiniciar el servidor de desenvolupament

### Provar els canvis

1. Si li és possible, provi qualsevol canvi visual en totes les últimes versions dels navegadors més comuns, tant en versió d'escriptori com mòbil.
2. Executi la comanda `yarn check-all` des del directori arrel del projecte. (Aquesta comanda executarà Prettier, ESLint, i Flow.)

### Afegeix els canvis

1. `git add -A && git commit -m "El meu missatge"` (canviï `El meu missatge` amb un missatge de commit, tal com `Solucionat logotip en Android`) per a afegir i actualitzar el repositori
2. `git push el-meu-fork nom-de-la-meva-branca`
3. Vagi a [reactjs.org repo](https://github.com/reactjs/reactjs.org) i podrà veure els canvis mes recents a qualsevol de les branques actualitzades.
4. Segueixi les instruccions de GitHub.
5. If possible, include screenshots of visual changes. A Netlify build will also be automatically created once you make your PR so other people can see your change.

## Traduccions

Si estàs interessat en traduïr `reactjs.org`, siusplau, comprova l'estat actual de la traducció a [isreacttranslatedyet.com](https://www.isreacttranslatedyet.com/).

## Resolució de problemes

- `yarn reset` per a buidar la caché local

## Llicència
Content submitted to [reactjs.org](https://reactjs.org/) is CC-BY-4.0 licensed, as found in the [LICENSE-DOCS.md](https://github.com/open-source-explorer/reactjs.org/blob/master/LICENSE-DOCS.md) file.
