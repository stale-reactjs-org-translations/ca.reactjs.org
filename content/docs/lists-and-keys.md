---
id: lists-and-keys
title: LListes i Claus
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

Primer, revisem com es transformen les llistes en JavaScript.

En el codi que hi ha a sota, utilitzem el mètode [`map()`](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_Objects/Array/map) per prendre una matriu de `numeros` i duplicar els seus valors. Assignem la nova matriu retornada per `map()` a la variable `doblat` i fem que es mostri a la consola:

```javascript{2}
const numeros = [1, 2, 3, 4, 5];
const doblat = numeros.map((num) => num * 2);
console.log(doblat);
```

Aquest codi mostra `[2, 4, 6, 8, 10]` a la consola.

En React, transformar matrius en llistes [d'elements](/docs/rendering-elements.html) és gairebé idèntic.

### Renderització de múltiples components {#rendering-multiple-components}

Pots construir col·leccions d'elements i [incloure-les a JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx) fent servir claus `{}`.

Per començar, farem servir el mètode de Javascript [`map()`](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_Objects/Array/map) a l'array `numeros`. Aquest ens retornarà un element `<li>` per a cada element de l'array. Per últim, li assignarem l'array resultant a la variable `llistaDElements`

```javascript{2-4}
const numeros = [1, 2, 3, 4, 5];
const llistaDElements = numeros.map((numero) =>
  <li>{numero}</li>
);
```

Finalment Incluim tota la llista sencera dins un element `<ul>`, i [la renderitzem al DOM](/docs/rendering-elements.html#rendering-an-element-into-the-dom):

```javascript{2}
ReactDOM.render(
  <ul>{llistaDElements}</ul>,
  document.getElementById('root')
);
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

Aquest codi mostra una llista de números entre 1 i 5.

### Component bàsic de la llista {#basic-list-component}

Normalment renderitzaràs les llistes dins d'un [component](/docs/components-and-props.html).

Podem refer l'exemple anterior fent un component que accepti una array de `numeros` i generi una llista d'elements.

```javascript{3-5,7,13}
function LListaNumeros(props) {
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
  <LListaNumeros numeros={numeros} />,
  document.getElementById('root')
);
```

Quan executis aquest codi rebràs un avís que diu que s'ha de donat una 'clau' a cada elements de la llista. Una clau (`key`) és un atribut de cadena especial que has d'incloure en crear llistes d'elements. Parlarem de per què és important a la següent secció.

Assignem doncs, una clau (`key`) als elements de la nostra llista dins de `numeros. map()` que corregeixi el problema de la clau que falta.

```javascript{4}
function LListaNumeros(props) {
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
  <LListaNumeros numeros={numeros} />,
  document.getElementById('root')
);
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Claus {#keys}

Les claus ajuden React a identificar quins elements han canviat. O bé s'han afegit, o bé s'han eliminat. Les claus s'han de donar als elements de dins de la matriu per donar-los una identitat estable:

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

Quan no tinguis més remei perque no tens un ID estable per a cada elements de la llista, pots fer servir l'índex de l'element com a clau :

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Fes-ho només quan els elements no tinguin una ID estable
  <li key={index}>
    {todo.text}
  </li>
);
```
 
No et recomanem que facis servir els índexs per a les claus si l'ordre dels elements pot canviar. Això pot afectar negativament el rendiment i pot causar problemes amb l'estat del component. Comprova l'article de Robin Pokorny per a una [explicació en profunditat sobre els impactes negatius d'utilitzar un índex com a clau](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318). Si tries no assignar una clau explícita als elements de la llista llavors React farà servir els índexs com a claus per defecte.

Aquí hi ha una [explicació en profunditat sobre per què les claus són necessàries](/docs/reconciliation.html#recursing-on-children) si estàs interessat en saber-ne més.

### Identificant components amb claus {#extracting-components-with-keys}

Les claus només tenen sentit en el context de l'array a la que pertanyen.

Per exemple, si [extreus](/docs/components-and-props.html#extracting-components) un component  `ElementDeLaLLista`, hauràs de donar la clau a l'element `<ElementDeLaLLista />` de l'array enlloc de a l'element `<li>` de la pròpia llista `LListaDElemets`.

**Exemple: ÚS INCORRECTE de 'key'**

```javascript{4,5,14,15}
function LListaDElemets(props) {
  const valor = props.valor;
  return (
    //Malament!. No hi ha cap necessitat d'especificar una clau ('key') aquí:
    <li key={valor.toString()}>
      {valor}
    </li>
  );
}

function LListaDeNumeros(props) {
  const numeros = props.numeros;
  const LListaDElemets = numeros.map((numeros) =>
    //Malament!. La clau hauria d'haver sigut especificada aquí:
    <ElementDeLaLLista valor={numero} />
  );
  return (
    <ul>
      {LListaDElemets}
    </ul>
  );
}

const numeros = [1, 2, 3, 4, 5];
ReactDOM.render(
  <LListaDeNumeros numeros={numeros} />,
  document.getElementById('root')
);
```

**Exemple: ÚS CORRECTE de 'key'**

```javascript{2,3,9,10}
function ElementDeLaLLista(props) {
  // Correcte! No cal especificar la clau aquí:
  return <li>{props.valor}</li>;
}

function LListaDeNumeros(props) {
  const numeros = props.numeros;
  const LListaDElemets = numeros.map((numeros) =>
    // Correcte! La clau ha de ser especificada dins de l'array.
    <ElementDeLaLLista key={numero.toString()} valor={numero} />
  );
  return (
    <ul>
      {LListaDElemets}
    </ul>
  );
}

const numeros = [1, 2, 3, 4, 5];
ReactDOM.render(
  <LListaDeNumeros numeros={numeros} />,
  document.getElementById('root')
);
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

Una bona regla d'or és saber que els elements inclosos dins del mètode `map()` necessiten una clau.

### Les claus han de ser úniques només entre els elements de la mateixa array {#keys-must-only-be-unique-among-siblings}

Les claus que es fan servir dins de les matrius han de ser úniques entre els seus "germans". No obstant això, no necessiten ser globalment úniques. Podem fer servir les mateixes claus quan produïm dos arrays diferents:

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

Les claus serveixen d'ajuda per a React però no es passen als components. Si necessites el mateix valor que el de la clau en el teu component, passa'l explícitament com un atribut amb un nom diferent:

```js{3,4}
const contingut = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    titol={post.titol} />
);
```

A l'exemple anterior, el component `Post` pot llegir `props.id`, però no `props.key`


### Incrustant map() dins de JSX {#embedding-map-in-jsx}

En els exemples anteriors hem declarat una variable `listItems` separada i l'hem inclòs dins el JSX:

```js{3-6}
function LListaDeNumeros(props) {
  const numeros = props.numeros;
  const llistaDElements = numeros.map((numero) =>
    <ElementDeLaLLista key={numero.toString()}
              valor={numero} />
  );
  return (
    <ul>
      {llistaDElements}
    </ul>
  );
}
```

JSX permet [incrustar expressions](/docs/introducing-jsx.html#embedding-expressions-in-jsx) tancades entre claus de manera que podem tenir-hi el resultat de `map()` :

```js{5-8}
function LListaDeNumeros(props) {
  const numeros = props.numeros;
  return (
    <ul>
      {numeros.map((numero) =>
        <ElementDeLaLLista key={numero.toString()}
                  valor={numero} />
      )}
    </ul>
  );
}
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

 A vegades amb això queda en un codi més clar, però mira de no fer-ne un abús. Com a JavaScript, depèn de tu decidir si val la pena extreure una variable per a la llegibilitat del codi. Tingues en compte que si el cos de `map()` és massa imbricat, potser és un bon moment per [extreure un component](/docs/components-and-props.html#extracting-components).
