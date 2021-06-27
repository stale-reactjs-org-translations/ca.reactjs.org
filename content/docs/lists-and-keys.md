---
id: lists-and-keys
title: Llistes i Claus
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

Primer, revisem com es transformen les llistes a JavaScript.

En el codi que segueix a sota, utilitzem la funció [`map()`](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_Objects/Array/map) per prendre una matriu de `numeros` i duplicar-ne els seus valors. Assignem la nova array retornada per `map()` a la variable `doblat` i la mostrem a la consola:

```javascript{2}
const numeros = [1, 2, 3, 4, 5];
const doblat = numeros.map((num) => num * 2);
console.log(doblat);
```

Aquest codi mostra  `[2, 4, 6, 8, 10]` a la consola.

A React, transformar arrays en llistes d'[elements](/docs/rendering-elements.html) és gairebé idèntic.

### Renderització de múltiples components {#rendering-multiple-components}

Podem construir col·leccions d'elements i [incloure-les a JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx) fent servir claus `{}`.

A continuació, farem servir el mètode de Javascript [`map()`](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_Objects/Array/map) a l'array `numeros`. Aquest ens retornarà un element `<li>` per a cada element de l'array. Després, assignarem l'array resultant a la variable `llistaDElements`

```javascript{2-4}
const numeros = [1, 2, 3, 4, 5];
const llistaDElements = numeros.map((numero) =>
  <li>{numero}</li>
);
```

Finalment, incloem tota la llista sencera dins un element `<ul>`, i [la renderitzem al DOM](/docs/rendering-elements.html#rendering-an-element-into-the-dom):

```javascript{2}
ReactDOM.render(
  <ul>{llistaDElements}</ul>,
  document.getElementById('root')
);
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

Aquest codi mostra una llista de números entre l'1 i el 5.

### Component de llista bàsic {#basic-list-component}

Normalment renderitzaràs les llistes dins d'un [component](/docs/components-and-props.html).

Podem refer l'exemple anterior fent un component que accepti una array de `numeros` i generi una llista d'elements.

```javascript{3-5,7,13}
function LlistaNumeros(props) {
  const numeros = props.numeros;
  const llistaDElements = numeros.map((numero) =>
    <li>{numero}</li>
  );
  return (
    <ul>{llistaDElements}</ul>
  );
}

const numeros = [1, 2, 3, 4, 5];
ReactDOM.render(
  <LlistaNumeros numeros={numeros} />,
  document.getElementById('root')
);
```

Quan executis aquest codi rebràs un avís que diu que s'ha de donar una clau (`key`) a cada element de la llista. Una clau (`key`) és un atribut de cadena especial que has d'incloure en crear llistes d'elements. Parlarem de per què és important a la següent secció.

Assignem doncs, una clau (`key`) als elements de la nostra llista dins de `numeros.map()` que corregeixi el problema de la clau que falta.

```javascript{4}
function LlistaNumeros(props) {
  const numeros = props.numeros;
  const llistaDElements = numeros.map((numero) =>
    <li key={numero.toString()}>
      {numero}
    </li>
  );
  return (
    <ul>{llistaDElements}</ul>
  );
}

const numeros = [1, 2, 3, 4, 5];
ReactDOM.render(
  <LlistaNumeros numeros={numeros} />,
  document.getElementById('root')
);
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Claus {#keys}

Les claus ajuden React a identificar quins elements han canviat, afegit o eliminat. Les claus s'han de donar als elements de dins de l'array per donar-los una identitat estable:

```js{3}
const numeros = [1, 2, 3, 4, 5];
const llistaDElements = numeros.map((numero) =>
  <li key={numero.toString()}>
    {numero}
  </li>
);
```

La millor manera de triar una clau és fer servir una cadena que identifiqui de manera única un element de la llista d'entre tots els altres elements d'aquesta mateixa llista. Molt sovint faràs servir la ID de les dades com a claus:

```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

Quan no tinguis més remei perquè no tens una ID estable per a cada elements de la llista, pots fer servir l'índex de l'element com a clau:

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Fes-ho només quan els elements no tinguin una ID estable
  <li key={index}>
    {todo.text}
  </li>
);
```

No et recomanem que facis servir els índexs per a les claus si l'ordre dels elements pot canviar. Això pot afectar negativament el rendiment i pot causar problemes amb l'estat del component. Llegeix l'article de Robin Pokorny que dóna una [explicació en profunditat sobre els impactes negatius d'utilitzar un índex com a clau](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318). Si tries no assignar una clau explícita als elements de la llista, React farà servir els índexs com a claus per defecte.

Aquí hi trobaràs una [explicació en profunditat sobre per què les claus són necessàries](/docs/reconciliation.html#recursing-on-children) si estàs interessat en saber-ne més.

### Identificant components amb claus {#extracting-components-with-keys}

Les claus només tenen sentit en el context de l'array a la que pertanyen.

Per exemple, si [extreus](/docs/components-and-props.html#extracting-components) un component  `ElementDeLaLlista`, hauràs de donar la clau a l'element `<ElementDeLaLlista />` de l'array enlloc de a l'element `<li>` de la pròpia llista `LlistadElemets`.

**Exemple: Ús incorrecte de 'key'**

```javascript{4,5,14,15}
function LlistadElemets(props) {
  const valor = props.valor;
  return (
    // Malament! No hi ha cap necessitat d'especificar una clau ('key') aquí:
    <li key={valor.toString()}>
      {valor}
    </li>
  );
}

function LlistaDeNumeros(props) {
  const numeros = props.numeros;
  const LlistadElemets = numeros.map((numeros) =>
    // Malament! La clau hauria d'haver sigut especificada aquí:
    <ElementDeLaLlista valor={numero} />
  );
  return (
    <ul>
      {LlistadElemets}
    </ul>
  );
}

const numeros = [1, 2, 3, 4, 5];
ReactDOM.render(
  <LlistaDeNumeros numeros={numeros} />,
  document.getElementById('root')
);
```

**Exemple: Ús correcte de 'key'**

```javascript{2,3,9,10}
function ElementDeLaLlista(props) {
  // Correcte! No cal especificar la clau aquí:
  return <li>{props.valor}</li>;
}

function LlistaDeNumeros(props) {
  const numeros = props.numeros;
  const LlistadElemets = numeros.map((numeros) =>
    // Correcte! La clau ha de ser especificada dins de l'array.
    <ElementDeLaLlista key={numero.toString()} valor={numero} />
  );
  return (
    <ul>
      {LlistadElemets}
    </ul>
  );
}

const numeros = [1, 2, 3, 4, 5];
ReactDOM.render(
  <LlistaDeNumeros numeros={numeros} />,
  document.getElementById('root')
);
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

Una bona regla d'or, que pots fer servir, és saber que els elements inclosos dins del mètode `map()` necessiten una clau.

### Les claus han de ser úniques només entre els elements de la mateixa array (germans) {#keys-must-only-be-unique-among-siblings}

Les claus que es fan servir dins de les matrius han de ser úniques entre els seus germans. No obstant, no necessiten ser globalment úniques. Podem fer servir les mateixes claus quan produïm dos arrays diferents:

```js{2,5,11,12,19,21}
function Blog(props) {
  const barraLateral = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.titol}
        </li>
      )}
    </ul>
  );
  const contingut = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.titol}</h3>
      <p>{post.contingut}</p>
    </div>
  );
  return (
    <div>
      {barraLateral}
      <hr />
      {contingut}
    </div>
  );
}

const posts = [
  {id: 1, titol: 'Hola Món', contingut: "Benvinguts a l'aprenentatge de React!"},
  {id: 2, titol: 'Instal·lació', contingut: 'Pots instal·lar React des de npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Les claus serveixen com a una ajuda per a React però no es passen als components. Si necessites el mateix valor en el teu component, passa'l explícitament com un atribut amb un nom diferent:

```js{3,4}
const contingut = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    titol={post.titol} />
);
```

A l'exemple anterior, el component `Post` pot llegir `props.id`, però no `props.key`.

### Incrustant map() dins de JSX {#embedding-map-in-jsx}

En els exemples anteriors hem declarat una variable `listItems` separada i l'hem inclòs dins el JSX:

```js{3-6}
function LlistaDeNumeros(props) {
  const numeros = props.numeros;
  const llistaDElements = numeros.map((numero) =>
    <ElementDeLaLlista key={numero.toString()}
              valor={numero} />
  );
  return (
    <ul>
      {llistaDElements}
    </ul>
  );
}
```

JSX permet [incrustar expressions](/docs/introducing-jsx.html#embedding-expressions-in-jsx) tancades entre claus de manera que podem tenir-hi el resultat de `map()`:

```js{5-8}
function LlistaDeNumeros(props) {
  const numeros = props.numeros;
  return (
    <ul>
      {numeros.map((numero) =>
        <ElementDeLaLlista key={numero.toString()}
                  valor={numero} />
      )}
    </ul>
  );
}
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

 A vegades amb això queda en un codi més clar, però mira de no fer-ne un abús. Com a JavaScript, depèn de tu decidir si val la pena extreure una variable per a la llegibilitat del codi. Tingues en compte que si el cos de `map()` és massa imbricat, pot ser un bon moment per [extreure un component](/docs/components-and-props.html#extracting-components).
