---
id: glossary
title: Glossari de Termes de React
layout: docs
category: Reference
permalink: docs/glossary.html

---

## Applicació de pàgina única {#single-page-application}

Una aplicació d'una sola pàgina és una aplicació que carrega una única pàgina HTML i tot el que porta associat (com JavaScript i CSS) per a la seva execució. Qualsevol interacció amb la pàgina o pàgines posteriors no requereix fer sol·licituds al servidor i per tant la pàgina no s'ha de tornar a carregar.

Tot i que pots construir una aplicació d'una sola pàgina a React, no és un requisit. React també es pot utilitzar per millorar petites parts dels llocs web existents amb interactivitat addicional. El codi escrit a React pot coexistir perfectament amb pàgines renderitzades al servidor per llenguatges com PHP, o amb altres biblioteques del costat del client. De fet, així és exactament com s'està fent servir React a *Facebook*.

## ES6, ES2015, ES2016, etc {#es6-es2015-es2016-etc}

Aquestes sigles es refereixen a les versions més recents de l'estàndard *ECMAScript Language Specification*, del qual el llenguatge JavaScript és una implementació. La versió ES6 (també coneguda com a ES2015) inclou molts afegits a les versions anteriors com ara: funcions *arrow*, classes, plantilles de cadena de text, expressions `let` i `const`. Pots aprendre més sobre versions específiques [aquí](https://en.wikipedia.org/wiki/ECMAScript#Versions).

## Compiladors {#compilers}

Un compilador de JavaScript pren el codi JavaScript, el transforma i retorna aquest codi JavaScript en un format diferent. El cas d'ús més comú és prendre la sintaxi ES6 i transformar-la en una sintaxi que els navegadors més antics són capaços d'interpretar. [Babel](https://babeljs.io/) és el compilador més utilitzat amb React.

## Bundlers {#bundlers}

Els *bundlers* prenen el codi JavaScript i CSS escrit com a mòduls separats (sovint centenars d'ells), i els combinen junts en uns pocs fitxers més optimitzats per als navegadors. Alguns paquets que es fan servir habitualment en aplicacions de React inclouen [Webpack](https:webpack.js.org/) i [Browserify](http://browserify.org/).

## Gestors de Paquets {#package-managers}

Els gestors de paquets són eines que et permeten gestionar les dependències del teu projecte. [npm](https://www.npmjs.com/) i [Yarn](https://yarnpkg.com/) són dos gestors de paquets que s'utilitzen habitualment en aplicacions de React. Ambdós són clients del mateix registre de paquets npm.

## CDN {#cdn}

*CDN* (de  l'anglès *Content Delivery Network* ) vol dir xarxa de lliurament de continguts. Els *CDN* proporcionen el contingut estàtic i en memòria cau d'una xarxa de servidors de tot el món. 

## JSX {#jsx}

JSX és una extensió de sintaxi pel JavaScript. És similar a un llenguatge de plantilla, però té tot el poder de JavaScript. JSX es compila a les crides `React.createElement()` que retornen objectes en JavaScript pla anomenats "Elements de React". Per aconseguir una introducció bàsica a JSX [vegeu els documents aquí](/docs/introduint-jsx.html) i per trobar una guia d'aprenentatge més en profunditat sobre JSX [aquí](/docs/jsx-in-depth.html).

El Dom de React escriu els noms seguint la convenció anomenada *camelCase* en lloc dels noms d'atribut HTML. Per exemple, `tabindex` es converteix en `tabIndex` a JSX. L'atribut `class` es converteix en `className` ja que `class` és una paraula reservada de JavaScript:

```js
const nom = 'Clementine';
ReactDOM.render(
  <h1 className="hola">El meu nom és {nom}!</h1>,
  document.getElementById('root')
);
```  

## [Elements](/docs/rendering-elements.html) {#elements}

Els elements de React són els blocs de construcció de les aplicacions de React. Es fàcil confondre'ls amb el concepte més àmpliament conegut de "components". Un element descriu el que vols veure a la pantalla. Els elements React són immutables.

```js
const element = <h1>Hola, mon</h1>;
```

Típicament, els elements no s'utilitzen directament, sinó que són el que retorna un component.

## [Components](/docs/components-and-props.html) {#components}

Els components React són peces de codi petites i reutilitzables que retornen un element React que es renderitzarà a la pàgina. La versió més simple del component React és una funció JavaScript senzilla que retorna un element React:

```js
function Benvinguda(props) {
  return <h1>Hola, {props.nom}</h1>;
}
```

Els components poden ser també classes ES6:

```js
class Benvinguda extends React.Component {
  render() {
    return <h1>Hola, {this.props.nom}</h1>;
  }
}
```

Els components es poden descompondre en peces amb diferents funcionalitats i utilitzar-se dins d'altres components. Els components poden retornar altres components, matrius, cadenes i números. Una bona regla d'or per saber si un tros de codi és un bon candidat per ser un component és veure si una part de la interfície d'usuari s'utilitza diverses vegades (Botó, Plafó, Avatar), o bé és prou complexa per si sola (App, FeedStory, Comment). Els noms dels components han de començar sempre amb una lletra majúscula (`<Wrapper/>` **no** `<wrapper/>`). Consulta [aquesta documentació](/docs/components-and-props.html#rendering-a-component) per obtenir més informació sobre la renderització dels components.

### [`props`](/docs/components-and-props.html) {#props}

`props` són les entrades a un component de React. Són les dades transmeses d'un component pare a un component fill.

Recorda que les `props` són només de lectura. No s'han de modificar de cap manera:

```js
// Malament!
props.number = 42;
```

Si necessites modificar algun dels seus valors en resposta a l'entrada de l'usuari o a una resposta de xarxa, has de fer servir `state`.

### `props.children` {#propschildren}

`props.children` està disponible en tots els components. Conté el contingut entre les etiquetes d'obertura i tancament d'un component. Per exemple:

```js
<Benvinguda>Hola món!</Benvinguda>
```

La cadena `Hola món!` està disponible a `props.children` al component `Benvinguda`:

```js
function Benvinguda(props) {
  return <p>{props.children}</p>;
}
```

Per als components definits com a classes, has de fer servir `this.props.children`:

```js
class Benvinguda extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```

### [`state`](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) {#state}

Un component necessita `state` quan algunes de les seves dades associades canvien amb el temps. Per exemple, un component `Checkbox` podria necessitar `isChecked` en el seu `state`, i un component `NewsFeed` podria voler seguir `fetchedPosts` en el seu `state`.

La diferència més important entre `state` i `props` és que les `props` es passen des d'un component pare, però l'`state` és gestionat pel mateix component. Un component no pot canviar les seves `props`, però pot canviar el seu `state`.

Per a cada peça concreta de dades modificables, hi hauria d'haver només un component que en fos "propietari" en el seu estat. No intentis sincronitzar els estats de dos components diferents. En lloc d'això, [puja-les](/docs/lifting-state-up.html) al seu ancestre comú més proper, i passa-les com a `props` d'ambdós.

## [Mètodes de Cicle de Vida](/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) {#lifecycle-methods}

Els mètodes de cicle de vida són funcionalitats personalitzades que s'executen durant les diferents fases d'un component. Hi ha mètodes disponibles quan el component es crea i s'insereix al DOM ([montatge](/docs/react-component.html#mounting)), quan el component s'actualitza, i quan el component es desmunta o s'elimina del DOM. 

 ## [Components Controlats](/docs/forms.html#controlled-components) vs. [ No controlats](/docs/uncontrolled-components.html)

React té dos enfocaments diferents per tractar les entrades de formulari.

Un element del formulari d'entrada el valor del qual és controlat per React s'anomena un component *controlat*. Quan un usuari introdueix dades en un component controlat s'activa un gestor d'esdeveniments de canvi i el codi decideix si l'entrada és vàlida (rerenderitzant amb el valor actualitzat). Si no re-renderitzes l'element del formulari aquest romandrà sense canvis.

Un component *no controlat* es comporta com ho fan els elements de formulari fora de React. Quan un usuari introdueix dades en un camp de formulari (una casella d'entrada, un menú desplegable, etc) la informació actualitzada es reflecteix sense necessitat que React hagi de fer res. Tanmateix, això també significa que no es pot forçar el camp a tenir un cert valor.

En la majoria dels casos hauràs de fer servir components controlats.

## [keys](/docs/lists-and-keys.html) {#keys}

Una *"key"* és un atribut de cadena especial que has d'incloure quan creis *arrays* d'elements. Les *keys* ajuden a React a identificar quins elements han canviat , quins s'afegeixen o quins s'eliminen. Cal donar *keys* als elements dins d'una *array* per donar als elements una identitat estable.

Les *keys* només han de ser úniques entre els elements germans de la mateixa *array*. No han de ser únics en tota l'aplicació o fins i tot en un mateix component.

No passis res semblant a `Matth.random()` a les *keys*. És important que les *keys* tinguin una "identitat estable" a través de les re-renderitzacions de manera que React pugui determinar quan els elements s'afegeixen, s'eliminen o es reordenen. Idealment, les claus han de correspondre a identificadors únics i estables que provenen de les vostres dades, com `post.id`.

## [Refs](/docs/refs-and-the-dom.html) {#refs}

React suporta un atribut especial que pots adjuntar a qualsevol component. L'atribut `ref` pot ser un objecte creat per la [funció `React.createRef()`](/docs/react-api.html#reactcreateref) o una funció de crida de retorn, o una cadena (a l'API anterior). Quan l'atribut `ref` és una funció de crida de retorn, la funció rep l'element DOM subjacent o la instància de classe (depenent del tipus d'element) com a argument. Això et permet tenir accés directe a l'element DOM o a la instància del component.

Utilitza *refs* amb moderació. Si et trobes sovint amb referències per "fer que les coses passin" a la teva aplicació, pensa a familiaritzar-te amb el [flux de dades de dalt a baix](/docs/lifting-state-up.html).

## [Esdeveniments](/docs/handling-events.html) {#events}

El tractament d’esdeveniments amb elements React té algunes diferències sintàctiques:

* Els gestors d’esdeveniments React s’escriuen seguint la convenció *camelCase* en lloc de fer-ho en minúscules.
* Amb JSX es passa una funció com a gestor d'esdeveniments, en lloc d'una cadena.

## [Reconciliació](/docs/reconciliation.html) {#reconciliation}

Quan les *props* o l'*state* d'un component canvien, React decideix si és necessària una actualització real de DOM comparant l'element recentment retornat amb el renderitzat anteriorment. Quan no siguin iguals, React actualitzarà el DOM. Aquest procés s’anomena “reconciliació”.
