---
id: glossary
title: Glosari de Termes de React
layout: docs
category: Reference
permalink: docs/glossary.html

---

## Applicació de pàgina única {#single-page-application}

Una aplicació d'una sola pàgina és una aplicació que carrega una única pàgina HTML i totes les parts necessaries (com JavaScript i CSS) per a l'aplicació a executar. Qualsevol interacció amb la pàgina o pàgines posteriors no requereix una sol·licitud al servidor cosa que vol dir que la pàgina no s'ha de tornar a carregar.

Encara que pots construir una sol·licitud d'una sola pàgina a React, no és un requisit. React també es pot utilitzar per millorar petites parts dels llocs web existents amb interactivitat addicional. El codi escrit en React pot coexistir perfectament amb pàgines renderitzades al servidor per llenguatges com PHP, o amb altres biblioteques del costat del client. De fet, així és exactament com s'està fent servir React a *Facebook*.

## ES6, ES2015, ES2016, etc {#es6-es2015-es2016-etc}

Aquestes sigles es refereixen a les versions més recents de l'estàndard *ECMAScript Language Specification*, del qual el llenguatge JavaScript és una implementació. La versió ES6 (també coneguda com a ES2015) inclou moltes addicions a les versions anteriors com: funcions *arrow*, classes, plantilles de cadena de text, expressions `let` i `const`. Pots aprendre més sobre versions específiques [aquí](https://en.wikipedia.org/wiki/ECMAScript#Versions).

## Compiladors {#compilers}

Un compilador de JavaScript pren codi JavaScript, el transforma i retorna codi JavaScript en un format diferent. El cas d'ús més comú és prendre la sintaxi ES6 i transformar-la en sintaxi que els navegadors més antics són capaços d'interpretar. [Babel](https://babeljs.io/) és el compilador més utilitzat amb React.

## Bundlers {#bundlers}

Els *bundlers* prenen el codi JavaScript i CSS escrit com a mòduls separats (sovint centenars d'ells), i els combinen junts en uns pocs fitxers més optimitzats per als navegadors. Alguns paquets que es fan servir habitualment en aplicacions de React inclouen [Webpack](https:webpack.js.org/) i [Browserify](http://browserify.org/).

## Gestors de Paquets {#package-managers}

Els gestors de paquets són eines que et permeten gestionar les dependències del teu projecte. [npm](https://www.npmjs.com/) i [Yarn](https://yarnpkg.com/) són dos gestors de paquets que s'utilitzen habitualment en aplicacions de React. Ambdós són clients del mateix registre de paquets npm.

## CDN {#cdn}

*CDN* vol dir *Content Delivery Network*. Els *CDN* proporcionen contingut en memòria cau i estàtic d'una xarxa de servidors de tot el món. 

## JSX {#jsx}

JSX és una extensió de sintaxi per al JavaScript. És similar a un llenguatge de plantilla, però té tot el poder de JavaScript. JSX es compila a les crides `React.createElement()` que retornen objectes en JavaScript pla anomenats "Elements de React". Per aconseguir una introducció bàsica a JSX [vegeu els documents aquí](/docs/introduint-jsx.html) i per trobar una guia d'aprenentatge més en profunditat sobre JSX [aquí](/docs/jsx-in-depth.html).

El Dom de React escriu els noms seguint la convenció anomenada *camelCase* en lloc dels noms d'atribut HTML. Per exemple, `tabindex` es converteix en `tabIndex` a JSX. L'atribut `class` es converteix en `className` ja que `class` és una paraula reservada de JavaScript:

```js
const nom = 'Clementine';
ReactDOM.render(
  <h1 className="hola">El meu nom és {nom}!</h1>,
  document.getElementById('root')
);
```  

## [Elements](/docs/rendering-elements.html) {#elements}

Els elements de React són els blocs de construcció de les aplicacions de React. Es fàcil confondre'ls amb un concepte més àmpliament conegut de "components". Un element descriu el que vols veure a la pantalla. Els elements React són immutables.

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

Els components es poden descompondre en diferents peces de funcionalitat i utilitzar-se dins d'altres components. Els components poden retornar altres components, matrius, cadenes i números. Una bona regla d'or és que si una part de la interfície d'usuari s'utilitza diverses vegades (Botó, Plafó, Avatar), o és prou complexa per si sola (App, FeedStory, Comment), és un bon candidat per ser un component reutilitzable. Els noms dels components també han de començar sempre amb una lletra majúscula (`<Wrapper/>` **no** `<wrapper/>`). Consulta [aquesta documentació](/docs/components-and-props.html#rendering-a-component) per obtenir més informació sobre la renderització dels components.

### [`props`](/docs/components-and-props.html) {#props}

`props` are inputs to a React component. They are data passed down from a parent component to a child component.

Remember that `props` are readonly. They should not be modified in any way:

```js
// Wrong!
props.number = 42;
```

If you need to modify some value in response to user input or a network response, use `state` instead.

### `props.children` {#propschildren}

`props.children` is available on every component. It contains the content between the opening and closing tags of a component. For example:

```js
<Welcome>Hello world!</Welcome>
```

The string `Hello world!` is available in `props.children` in the `Welcome` component:

```js
function Welcome(props) {
  return <p>{props.children}</p>;
}
```

For components defined as classes, use `this.props.children`:

```js
class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```

### [`state`](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) {#state}

A component needs `state` when some data associated with it changes over time. For example, a `Checkbox` component might need `isChecked` in its state, and a `NewsFeed` component might want to keep track of `fetchedPosts` in its state.

The most important difference between `state` and `props` is that `props` are passed from a parent component, but `state` is managed by the component itself. A component cannot change its `props`, but it can change its `state`.

For each particular piece of changing data, there should be just one component that "owns" it in its state. Don't try to synchronize states of two different components. Instead, [lift it up](/docs/lifting-state-up.html) to their closest shared ancestor, and pass it down as props to both of them.

## [Lifecycle Methods](/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) {#lifecycle-methods}

Lifecycle methods are custom functionality that gets executed during the different phases of a component. There are methods available when the component gets created and inserted into the DOM ([mounting](/docs/react-component.html#mounting)), when the component updates, and when the component gets unmounted or removed from the DOM.

 ## [Controlled](/docs/forms.html#controlled-components) vs. [Uncontrolled Components](/docs/uncontrolled-components.html)

React has two different approaches to dealing with form inputs. 

An input form element whose value is controlled by React is called a *controlled component*. When a user enters data into a controlled component a change event handler is triggered and your code decides whether the input is valid (by re-rendering with the updated value). If you do not re-render then the form element will remain unchanged.

An *uncontrolled component* works like form elements do outside of React. When a user inputs data into a form field (an input box, dropdown, etc) the updated information is reflected without React needing to do anything. However, this also means that you can't force the field to have a certain value.

In most cases you should use controlled components.

## [Keys](/docs/lists-and-keys.html) {#keys}

A "key" is a special string attribute you need to include when creating arrays of elements. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside an array to give the elements a stable identity.

Keys only need to be unique among sibling elements in the same array. They don't need to be unique across the whole application or even a single component.

Don't pass something like `Math.random()` to keys. It is important that keys have a "stable identity" across re-renders so that React can determine when items are added, removed, or re-ordered. Ideally, keys should correspond to unique and stable identifiers coming from your data, such as `post.id`.

## [Refs](/docs/refs-and-the-dom.html) {#refs}

React supports a special attribute that you can attach to any component. The `ref` attribute can be an object created by [`React.createRef()` function](/docs/react-api.html#reactcreateref) or a callback function, or a string (in legacy API). When the `ref` attribute is a callback function, the function receives the underlying DOM element or class instance (depending on the type of element) as its argument. This allows you to have direct access to the DOM element or component instance.

Use refs sparingly. If you find yourself often using refs to "make things happen" in your app, consider getting more familiar with [top-down data flow](/docs/lifting-state-up.html).

## [Events](/docs/handling-events.html) {#events}

Handling events with React elements has some syntactic differences:

* React event handlers are named using camelCase, rather than lowercase.
* With JSX you pass a function as the event handler, rather than a string.

## [Reconciliation](/docs/reconciliation.html) {#reconciliation}

When a component's props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM. This process is called "reconciliation".
