---
id: components-and-props
title: Components i propietats
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

<<<<<<< HEAD
Els components permeten separar la interfície d'usuari en peces independents, reutilitzables i pensar en cada peça de forma aïllada. Aquesta pàgina proporciona una introducció a la idea de components. Pots trobar una [API detallada sobre components aquí](/docs/react-component.html).
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Your First Component](https://beta.reactjs.org/learn/your-first-component)
> - [Passing Props to a Component](https://beta.reactjs.org/learn/passing-props-to-a-component)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. This page provides an introduction to the idea of components. You can find a [detailed component API reference here](/docs/react-component.html).
>>>>>>> 47adefd30c46f486428d8231a68e639d62f02c9e

Conceptualment, els components són com les funcions de JavaScript. Accepten entrades arbitràries (anomenades "props") i retornen elements React que descriuen el que ha d'aparèixer a la pantalla.

## Components funcionals i de classe {#function-and-class-components}

La forma més senzilla de definir un component és escriure una funció de JavaScript:

```js
function Welcome(props) {
  return <h1>Hola, {props.name}</h1>;
}
```

Aquesta funció és un component de React vàlid perquè accepta un sol argument d'objecte "props" (que prové de propietats) amb dades i retorna un element de React. Anomenem aquests components "funcionals" perquè literalment són funcions JavaScript.

També pots utilitzar una [classe d'ES6](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Classes) per definir un component:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hola, {this.props.name}</h1>;
  }
}
```

Els dos components anteriors són equivalents des del punt de vista de React.

Tant les classes com les funcions tenen algunes característiques addicionals que veurem en les [pròximes seccions](/docs/state-and-lifecycle.html).

## Renderitzant un component {#rendering-a-component}

Fins ara, només hem vist elements de React que representen etiquetes del DOM:

```js
const element = <div />;
```

No obstant això, els elements també poden representar components definits per l'usuari:

```js
const element = <Welcome name="Sara" />;
```

Quan React veu un element representant un component definit per l'usuari, passa els atributs JSX a aquest component com un sol objecte. Anomenem a aquest objecte "props".

Per exemple, aquest codi mostra "Hola, Sara" a la pàgina:

```js{1,6}
function Welcome(props) {
  return <h1>Hola, {props.name}</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Welcome name="Sara" />;
root.render(element);
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/YGYmEG?editors=1010)**

Recapitulem el que succeeix en aquest exemple:

<<<<<<< HEAD
1. Fem una crida a `ReactDOM.render()` amb l'element `<Welcome name="Sara"/>`.
2. React crida al component `Welcome` amb `{name: 'Sara'}` com "props".
3. El nostre component `Welcome` retorna un element `<h1>Hola, Sara</h1>` com a resultat.
4. React DOM actualitza eficientment el DOM perquè coincideixi amb `<h1>Hola, Sara</h1>`.
=======
1. We call `root.render()` with the `<Welcome name="Sara" />` element.
2. React calls the `Welcome` component with `{name: 'Sara'}` as the props.
3. Our `Welcome` component returns a `<h1>Hello, Sara</h1>` element as the result.
4. React DOM efficiently updates the DOM to match `<h1>Hello, Sara</h1>`.
>>>>>>> 47adefd30c46f486428d8231a68e639d62f02c9e

> **Nota:** Comença sempre els noms de components amb una lletra majúscula.
>
> React tracta els components que comencen amb lletres minúscules com etiquetes del DOM. Per exemple, `<div />` representa una etiqueta div HTML però `<Welcome />` representa un component i requereix que `Welcome` estigui definit.
>
> Per saber més sobre el raonament darrere d'aquesta convenció, pots consultar [JSX en profunditat](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

## Composició de components {#composing-components}

Els components poden referir-se a altres components en el seu interior. Això ens permet utilitzar la mateixa abstracció de component per a qualsevol nivell de detall. Un botó, un quadre de diàleg, un formulari, una pantalla: en aplicacions de React, tots són expressats comunament com a components.

Per exemple, podem crear un component `App` que renderitza `Welcome` moltes vegades:

```js{8-10}
function Welcome(props) {
  return <h1>Hola, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/KgQKPr?editors=1010)**

En general, les aplicacions de React noves tenen un únic component `App` al capdamunt. No obstant això, si s'integra React en una aplicació existent, es podria començar de baix cap a dalt amb un petit component com `Button` i a poc a poc fer camí cap al cim de la jerarquia de la vista.

## Extracció de components {#extracting-components}

No tinguis por de dividir els components en altres més petits.

Per exemple, considera aquest component `Comment`:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
        src={props.author.avatarUrl}
        alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/VKQwEo?editors=1010)**

Accepta `author` (un objecte), `text` (una cadena), i `date` (una data) com props, i descriu un comentari en una web de xarxes socials.

Aquest component pot ser difícil de canviar a causa de tota la nidificació, i també és difícil reutilitzar parts individuals d'ell. Extraiem alguns components d'aquest.

Primer, extraiem `Avatar`:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

L'`Avatar` no necessita saber que està sent renderitzat dins d'un `Comment`. Aquest és el motiu pel qual li donem a la seva propietat un nom més genèric: `user` en comptes de `author`.

Recomanem anomenar les props des del punt de vista del component, en comptes del context en què s'utilitza.

Ara podem simplificar `Comment` una miqueta:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

A continuació, extraurem el component `UserInfo` que renderitza un `Avatar` al costat del nom de l'usuari:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

Això ens permet simplificar `Comment` encara més:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/rrJNJY?editors=1010)**

Extreure components pot semblar una feina pesada al principi, però tenir una paleta de components reutilitzables val la pena en aplicacions més grans. Una bona regla general és que si una part de la interfície d'usuari es fa servir diverses vegades (`Button`, `Panel` o `Avatar`), o és prou complexa per si mateixa (`App`, `FeedStory`, `Comment`), és bon candidat per ser un component reutilitzable.

## Les props són només de lectura {#props-are-read-only}

Tant si declares un component, [com una funció o com una classe](#function-and-class-components), aquest mai ha de modificar les seves props. Considera aquesta funció `sum`:

```js
function sum(a, b) {
  return a + b;
}
```

Aquestes funcions són anomenades ["pures"](https://en.wikipedia.org/wiki/Functional_programming#Pure_functions) perquè no intenten canviar les seves entrades, i sempre tornen el mateix resultat per a les mateixes entrades.

En contrast, aquesta funció és impura perquè canvia la seva pròpia entrada:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React és bastant flexible però té una sola regla estricta:

**Tots els components de React han d'actuar com a funcions pures pel que fa a les seves props.**

Per descomptat, les interfícies d'usuari de les aplicacions són dinàmiques i canvien amb el temps. A la [següent secció](/docs/state-and-lifecycle.html), introduirem un nou concepte d'"estat". L'estat permet als components de React canviar la seva sortida al llarg del temps en resposta a accions de l'usuari, respostes de xarxa i qualsevol altra cosa, sense violar aquesta regla.
