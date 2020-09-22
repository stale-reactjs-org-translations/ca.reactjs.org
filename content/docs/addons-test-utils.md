---
id: test-utils
title: Utilitats de Test 
permalink: docs/test-utils.html
layout: docs
category: Reference
---

**Fent la Importació**

```javascript
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var ReactTestUtils = require('react-dom/test-utils'); // ES5 amb npm
```

## Resum {#overview}

`ReactTestUtils` facilita provar els components React en el marc de proves de la teva elecció. A Facebook utilitzem el [Jest](https://facebook.github.io/jest/) per als test de JavaScript sense esforç . Apren com començar amb *Jest* a través de la web de *Jest* [guies d'aprenentatge de Jest per React](https://jestjs.io/docs/tutorial-react).

> Nota:
>
> Recomanem utilitzar la [Biblioteca de Test de React](https://testing-library.com/react) que està dissenyada per habilitar i animar a escriure tests per als teus components que els provin de la mateixa manera que els faran servir els usuaris finals.
>
> Com a alternativa, Airbnb ha llançat una utilitat de test anomenada [Enzyme](https:airbnb.io/enzim/), que fa que sigui fàcil de fer test d'afirmació, de manipulació i que travessin la sortida dels components de React.

 - [`act()`](#act)
 - [`mockComponent()`](#mockcomponent)
 - [`isElement()`](#iselement)
 - [`isElementOfType()`](#iselementoftype)
 - [`isDOMComponent()`](#isdomcomponent)
 - [`isCompositeComponent()`](#iscompositecomponent)
 - [`isCompositeComponentWithType()`](#iscompositecomponentwithtype)
 - [`findAllInRenderedTree()`](#findallinrenderedtree)
 - [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass)
 - [`findRenderedDOMComponentWithClass()`](#findrendereddomcomponentwithclass)
 - [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag)
 - [`findRenderedDOMComponentWithTag()`](#findrendereddomcomponentwithtag)
 - [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype)
 - [`findRenderedComponentWithType()`](#findrenderedcomponentwithtype)
 - [`renderIntoDocument()`](#renderintodocument)
 - [`Simulate`](#simulate)

## Referència {#reference}

### `act()` {#act}

Per preparar un component per als test d'afirmacions, embolcalla el codi dins d'una crida `act()` que el renderitzarà i actualitzarà dins seu. Això fa que et teu test s'ajusti a la manera com funciona React al navegador.

>Nota
>
>Si utilitzes `react-test-renderer`, també et proporciona una exportació `act` que es comporta de la mateixa manera.

Per exemple, diguem que tenim aquest component `Counter`:

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  handleClick() {
    this.setState(state => ({
      count: state.count + 1,
    }));
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>
          Click me
        </button>
      </div>
    );
  }
}
```

Així és com pots testejar-lo:

```js{3,20-22,29-31}
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and update a counter', () => {
  // Test del primer render i componentDidMount
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('You clicked 0 times');

  // Test del segon  render i componentDidUpdate
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('You clicked 1 times');
  expect(document.title).toBe('You clicked 1 times');
});
```

- No oblidis que l'enviament d'esdeveniments DOM només funciona quan el contenidor DOM s'afegeix al `document`. Pots utilitzar una biblioteca com ara la [Biblioteca de Test React](https://testing-library.com/react) per reduir el codi de la plantilla.Don't forget that dispatching DOM events only works when the DOM container is added to the `document`. You can use a library like [React Testing Library](https://testing-library.com/react) to reduce the boilerplate code.

- El document [`receptes`](/docs/test-recipes.html) conté més detalls sobre com es comporta `act()`, amb exemples i formes d'utilitzar-lo.

* * *

### `mockComponent()` {#mockcomponent}

```javascript
mockComponent(
  componentClass,
  [mockTagName]
)
```

Passa un mòdul de prova d'aquest mètode per afegir-li mètodes útils que li permeten ser utilitzat com a component fictici de React. En lloc de ser renderitzat com és habitual, el component es convertirà en un simple div (o en una altra etiqueta si es passa `mocktagName`) que contindrà qualsevol fill proporcionat.

> Nota:
>
> `mockComponent()` és una API antiga. En el seu lloc, recomanem fer servir [`jest.mock()`](https://facebook.github.io/jest/docs/en/tutorial-react-native.html#mock-native-modules-using-jestmock).

* * *

### `isElement()` {#iselement}

```javascript
isElement(element)
```

Retorna `true` si `element` és qualsevol tipus d'element React.

* * *

### `isElementOfType()` {#iselementoftype}

```javascript
isElementOfType(
  element,
  componentClass
)
```

Retorna `true` si `element` és un element React del tipus `componentClass`.

* * *

### `isDOMComponent()` {#isdomcomponent}

```javascript
isDOMComponent(instance)
```

Retorna `true` si `instance` és un component DOM (com ara `<div>` or `<span>`).

* * *

### `isCompositeComponent()` {#iscompositecomponent}

```javascript
isCompositeComponent(instance)
```

Retorna `true` si `instance` és un component definit per l'usuari, com ara una classe o una funció.

* * *

### `isCompositeComponentWithType()` {#iscompositecomponentwithtype}

```javascript
isCompositeComponentWithType(
  instance,
  componentClass
)
```

Retorna `true` si `instance` és un component del tipus `componentClass`.

* * *

### `findAllInRenderedTree()` {#findallinrenderedtree}

```javascript
findAllInRenderedTree(
  tree,
  test
)
```

Travessa tots els components d'un `tree` i acumula tots els components on `test(component)` és `true`. Això no és gaire útil per si mateix, però es fa servir com a primitiva per a altres utilitats de test.

* * *

### `scryRenderedDOMComponentsWithClass()` {#scryrendereddomcomponentswithclass}

```javascript
scryRenderedDOMComponentsWithClass(
  tree,
  className
)
```

Cerca tots els elements DOM dels components de l'arbre renderitzat que són components DOM i tenen el nom de classe `className`.

* * *

### `findRenderedDOMComponentWithClass()` {#findrendereddomcomponentwithclass}

```javascript
findRenderedDOMComponentWithClass(
  tree,
  className
)
```

Com [scrryRenderedDOMComponentsWithClass()](#scrirendereddomcomponentswithclass) però espera que hi hagi un resultat, i retorna aquest resultat, o llança una excepció si hi ha un nombre de coincidències diferent de un.

* * *

### `scryRenderedDOMComponentsWithTag()` {#scryrendereddomcomponentswithtag}

```javascript
scryRenderedDOMComponentsWithTag(
  tree,
  tagName
)
```

Cerca tots els elements DOM dels components de l'arbre renderitzat que són components DOM i que tinguin el nom de l'etiqueta `tagName`.

* * *

### `findRenderedDOMComponentWithTag()` {#findrendereddomcomponentwithtag}

```javascript
findRenderedDOMComponentWithTag(
  tree,
  tagName
)
```

Com [scrryRenderedDOMComponentsWithTag()](#scrirendereddomcomponentswithtag) però espera que hi hagi un resultat, i retorna aquest resultat, o llança una excepció si hi ha un nombre de coincidències diferent de un.

* * *

### `scryRenderedComponentsWithType()` {#scryrenderedcomponentswithtype}

```javascript
scryRenderedComponentsWithType(
  tree,
  componentClass
)
```

Cerca totes les instàncies de components que el seu tipus sigui `componentClass`.

* * *

### `findRenderedComponentWithType()` {#findrenderedcomponentwithtype}

```javascript
findRenderedComponentWithType(
  tree,
  componentClass
)
```

Igual que [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype) però espera que hi hagi un resultat, i retorna aquest resultat, o llança una excepció si hi ha un nombre de coincidències diferent de un.

***

### `renderIntoDocument()` {#renderintodocument}

```javascript
renderIntoDocument(element)
```

Renderitza un element React en un node DOM separat del document. **Aquesta funció requereix un DOM.** És equivalent a:

```js
const domContainer = document.createElement('div');
ReactDOM.render(element, domContainer);
```

> Nota:
>
> Hauràs de tenir `window`, `window.document` i `window.document.createElement` disponible globalment **abans** que importis `React`. Sinó React creurà que no pot accedir al DOM i els mètodes com `setState` no funcionaran.

* * *

## Other Utilities {#other-utilities}

### `Simulate` {#simulate}

```javascript
Simulate.{eventName}(
  element,
  [eventData]
)
```

Simulate an event dispatch on a DOM node with optional `eventData` event data.

`Simulate` has a method for [every event that React understands](/docs/events.html#supported-events).

**Clicking an element**

```javascript
// <button ref={(node) => this.button = node}>...</button>
const node = this.button;
ReactTestUtils.Simulate.click(node);
```

**Changing the value of an input field and then pressing ENTER.**

```javascript
// <input ref={(node) => this.textInput = node} />
const node = this.textInput;
node.value = 'giraffe';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
```

> Note
>
> You will have to provide any event property that you're using in your component (e.g. keyCode, which, etc...) as React is not creating any of these for you.

* * *
