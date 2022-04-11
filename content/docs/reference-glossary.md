---
id: glossary
title: Glossari de Termes de React
layout: docs
category: Reference
permalink: docs/glossary.html

---

## Aplicació de pàgina única {#single-page-application}

Una aplicació de pàgina única és una aplicació que carrega una única pàgina HTML i tot el que porta associat (com ara JavaScript i CSS) per executar-se. Qualsevol interacció posterior amb la pàgina no requereix fer noves sol·licituds al servidor i per tant la pàgina no s'ha de tornar a carregar.

Tot i que pots construir una aplicació de pàgina única amb React, no és un requisit per fer-lo servir. React també es pot utilitzar per millorar petites parts dels llocs web existents amb interactivitat addicional. El codi escrit amb React pot coexistir perfectament amb pàgines renderitzades des del servidor per llenguatges com PHP, o amb altres biblioteques del costat del client. De fet, així és exactament com s'està fent servir React a Facebook.

## ES6, ES2015, ES2016, etc {#es6-es2015-es2016-etc}

Aquestes sigles es refereixen a les versions més recents del llenguatge de programació estàndard  *ECMAScript*, del qual el llenguatge JavaScript n'és una implementació. La versió ES6 (també coneguda com a ES2015) inclou moltes novetats respecte les versions anteriors com ara: funcions *arrow*, classes, plantilles de cadena de text, expressions `let` i `const`. Per aprendre'n més sobre les versions específiques consulta [aquí](https://en.wikipedia.org/wiki/ECMAScript#Versions).

## Compiladors {#compilers}

Els compiladors de JavaScript agafen el codi JavaScript, el transformen i el retornen en un format diferent. L'ús més extés és utilitzar-los per transformar la sintaxi ES6 en una altra d'anterior perque els navegadors més antics la puguin interpretar. [Babel](https://babeljs.io/) és el compilador més utilitzat amb React.

## Bundlers {#bundlers}

Els *bundlers* agafen el codi JavaScript i el codi CSS que s'han escrits per separat (i sovint centenars d'ells), i els combinen tots junts en uns pocs fitxers optimitzats pels navegadors. Alguns *bundlers* que es fan servir habitualment en aplicacions de React són [Webpack](https:webpack.js.org/) i [Browserify](http://browserify.org/).

## Gestors de Paquets {#package-managers}

Els gestors de paquets són eines que et permeten gestionar les dependències del teu projecte. [npm](https://www.npmjs.com/) i [Yarn](https://yarnpkg.com/) són dos gestors de paquets que s'utilitzen habitualment en aplicacions amb React. Ambdós són clients del mateix registre de paquets npm.

## CDN {#cdn}

*CDN* (de  l'anglès *Content Delivery Network* ) vol dir xarxa de lliurament de continguts. Els *CDN* proporcionen el contingut estàtic guardat en la memòria cau d'una xarxa de servidors de tot el món. 

## JSX {#jsx}

JSX és una extensió de sintaxi per a JavaScript. És similar a un llenguatge de plantilla, però té tot el poder de JavaScript. JSX es compila a les crides `React.createElement()` que retornen objectes JavaScript que s'anomenen "Elements de React". Per a una introducció bàsica a JSX [consulta aquests documents](/docs/introduint-jsx.html) i per a un aprenentatge més a fons de JSX consulta [aquests altres](/docs/jsx-in-depth.html).

El Dom de React escriu els noms seguint la convenció *camelCase* en lloc dels noms d'atributs HTML. Per exemple, `tabindex` és `tabIndex` a JSX. L'atribut `class` es converteix en `className` ja que `class` és una paraula reservada de JavaScript:

<<<<<<< HEAD
```js
const nom = 'Clementine';
ReactDOM.render(
  <h1 className="hola">El meu nom és {nom}!</h1>,
  document.getElementById('root')
);
```  
=======
```jsx
<h1 className="hello">My name is Clementine!</h1>
```
>>>>>>> 84ad3308338e2bb819f4f24fa8e9dfeeffaa970b

## [Elements](/docs/rendering-elements.html) {#elements}

Els elements de React són els blocs de construcció de les aplicacions de React. És fàcil confondre'ls amb un concepte més àmpliament conegut com és el de "components". Un element descriu el que es veurà a la pantalla. Els elements de React són immutables.

```js
const element = <h1>Hola, mon</h1>;
```

Normalment, els elements, no s'utilitzen directament sinó que són les peces que retorna un component.

## [Components](/docs/components-and-props.html) {#components}

Els components de React són peces de codi petites i reutilitzables que retornen un element de React que és el que es renderitzarà a la pàgina. La versió més simple d'un component de React és una funció JavaScript que retorna un element de React:

```js
function Benvinguda(props) {
  return <h1>Hola, {props.nom}</h1>;
}
```

Els components poden ser també una classe ES6:

```js
class Benvinguda extends React.Component {
  render() {
    return <h1>Hola, {this.props.nom}</h1>;
  }
}
```

Els components es poden descomposar en peces amb diferents funcionalitats i també poden utilitzar-se dins d'altres components. Els components poden retornar altres components, *arrays*, cadenes i números. Una bona manera de saber si un tros de codi és un bon candidat per ser un component és comprobar si és una part de la interfície d'usuari que s'utilitza diverses vegades (Botó, Plafó, Avatar), o bé si és prou complexa per si sola (App, FeedStory, Comment). Els noms dels components han de començar sempre amb una lletra majúscula (`<Wrapper/>` **no** `<wrapper/>`). Consulta [aquesta documentació](/docs/components-and-props.html#rendering-a-component) per tenir més informació sobre la renderització dels components.

### [`props`](/docs/components-and-props.html) {#props}

Les `props` són les entrades a un component de React. Són les dades transmeses d'un component pare a un component fill.

Recorda que les `props` són només de lectura. No es poden modificar de cap manera:

```js
// Malament!
props.number = 42;
```

Si has de modificar algun dels seus valors com a resposta a l'entrada que fa un usuari o a una resposta que ve de la xarxa, has de fer servir l'`state`.

### `props.children` {#propschildren}

La `props.children` està disponible en tots els components. Conté el contingut entre les etiquetes d'obertura i tancament d'aquest mateix component. Per exemple:

```js
<Benvinguda>Hola món!</Benvinguda>
```

La cadena `Hola món!` està disponible a la `props.children` del component `Benvinguda`:

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

Un component necessita l'`state` quan alguna de les seves dades associades canvien amb el temps. Per exemple, un component `Checkbox` podria necessitar `isChecked` en el seu `state`, i un component `NewsFeed` podria voler seguir `fetchedPosts` en el seu.

La diferència més important entre l'`state` i les `props` és que les `props` es passen des d'un component pare i que l'`state` és gestionat pel mateix component. Un component no pot canviar les seves `props`, però si que pot canviar el seu `state`.

Per a cada peça concreta de dades modificables, hi hauria d'haver només un component que la tingués com a "propietat" en el seu `state`. No intentis sincronitzar els `state` de dos components diferents. En lloc d'això, [puja-les](/docs/lifting-state-up.html) al seu ancestre comú més proper, i passa-les com a `props` d'ambdós.

## [Mètodes de Cicle de Vida](/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) {#lifecycle-methods}

Els mètodes de cicle de vida són funcionalitats personalitzades que s'executen durant les diferents fases de vida d'un component. Hi ha mètodes que estan disponibles quan el component es crea i s'inserta al DOM ([montatge](/docs/react-component.html#mounting)), quan el component s'actualitza, i quan el component es desmunta o s'elimina del DOM. 

 ## [Components Controlats](/docs/forms.html#controlled-components) vs. [ No controlats](/docs/uncontrolled-components.html)

React té dos maneres diferents de tractar les entrades de formulari.

Quan el valor d'entrada d'un element del formulari és controlat per React, aquest component es diu que és *controlat*. Quan un usuari introdueix dades en un component controlat s'activa un gestor d'esdeveniments de canvi i el codi decideix si l'entrada és vàlida (tornant a renderitzar el component però ara amb el valor actualitzat). Si no es torna a renderitzar l'element del formulari aquest es quedarà sense canvis.

Un component *no controlat* es comporta igual que els elements d'un formulari que no és de React. Quan un usuari introdueix dades en un camp d'un formulari d'aquest tipus (una casella d'entrada, un menú desplegable, etc), la informació actualitzada es reflecteix sense necessitat que React intervingui. Tanmateix, això també vol dir que no es pot forçar aquest camp per a donar-li un valor determinat.

La majoria de vegades faràs servir components controlats.

## [keys](/docs/lists-and-keys.html) {#keys}

Una *key* és un atribut de cadena especial que has d'incloure quan crees *arrays* d'elements. Les *keys* ajuden a React a identificar quins elements han canviat, quins s'han afegit o quins s'han eliminat. Cal donar *keys* als elements dins d'una *array* perque aquesta els hi dona una identitat estable.

Les *keys* només han de ser úniques entre els elements germans de la mateixa *array*. No han de ser úniques ni en tota l'aplicació ni tampoc han de ser-ho dins un mateix component.

Com a valor de les *keys* no hi passis res semblant a `Math.random()`. És important que les *keys* tinguin una "identitat estable" durant les diverses renderitzacions de manera que React pugui determinar quan els elements s'afegeixen, s'eliminen o es reordenen. Allò ideal seria que les claus es corresponguessin amb identificadors únics i estables que provinguessin de les teves dades, com ara `post.id`.

## [Refs](/docs/refs-and-the-dom.html) {#refs}

React té un atribut especial que pots afegir a qualsevol component. L'atribut `ref` pot ser un objecte creat per la [funció `React.createRef()`](/docs/react-api.html#reactcreateref) o una funció de crida de retorn, o bé una cadena (a l'API anterior). Quan l'atribut `ref` és una funció de crida de retorn, la funció rep l'element del DOM subjacent o la instància de classe (depenent del tipus d'element) com a argument. Això et permet tenir accés directe a l'element del DOM o a la instància del component.

Utilitza les *refs* amb moderació. Si et trobes que les fas servir sovint per "fer que les coses passin" a la teva aplicació, pensa a familiaritzar-te amb el [flux de dades de dalt cap a baix](/docs/lifting-state-up.html).

## [Esdeveniments](/docs/handling-events.html) {#events}

El tractament d’esdeveniments en els elements de React té algunes diferències sintàctiques:

* Els gestors d’esdeveniments de React s’escriuen seguint la convenció *camelCase* en lloc de fer-ho en minúscules.
* Amb JSX es passa una funció com a gestor d'esdeveniments, en lloc d'una cadena.

## [Reconciliació](/docs/reconciliation.html) {#reconciliation}

Quan les *props* o l'*state* d'un component canvien, React comprovarà si fa falta realment una actualització del DOM. Ho fa, comparant l'element retornat més recent amb el renderitzat anteriorment. Si troba que no són iguals, React actualitzarà el DOM. Aquest procés s’anomena “reconciliació”.
