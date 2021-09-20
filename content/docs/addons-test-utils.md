---
id: test-utils
title: Utilitats de Test 
permalink: docs/test-utils.html
layout: docs
category: Reference
---

**Importació**

```javascript
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var ReactTestUtils = require('react-dom/test-utils'); // ES5 amb npm
```

## Resum {#overview}

`ReactTestUtils` facilita provar els components React en el marc de proves que escullis. A Facebook utilitzem [Jest](https://facebook.github.io/jest/) per als test de JavaScript. Consulta a la web de *Jest* les [guies d'aprenentatge de Jest per React](https://jestjs.io/docs/tutorial-react) per començar a aprendre'n.

> Nota:
>
> Et recomanem que facis servir la [React Testing Library](https://testing-library.com/react) que està dissenyada per escriure tests pels teus components i que aquests siguin provats de la mateixa manera que els faran servir els usuaris finals.
>
> Per versions de React <= 16, la llibreria [Enzyme](https://airbnb.io/enzyme/) fa que sigui fàcil afirmar, manipular i recórrer la sortida dels components de React.



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

Es fa servir per preparar un component per afirmacions. S'embolcalla el codi dins d'una crida `act()` que renderitzarà i actualitzarà el component que porta dins seu. Això fa que el test s'ajusti a la manera com funciona React en el navegador.

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

Així és com pots provar-lo:

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

- No oblidis que l'enviament d'esdeveniments DOM només funciona quan el contenidor DOM s'afegeix al `document`. Pots utilitzar una biblioteca com ara la [Biblioteca de Test React](https://testing-library.com/react) per reduir el codi redundant.

- El document [`receptes`](/docs/testing-recipes.html) conté més detalls sobre com es comporta `act()`, amb exemples i formes de com utilitzar-lo.

* * *

### `mockComponent()` {#mockcomponent}

```javascript
mockComponent(
  componentClass,
  [mockTagName]
)
```

Passa un mòdul de prova a aquest mètode per afegir-li mètodes útils que li permetin ser utilitzat com a component fictici de React. En lloc de ser renderitzat com és habitual, el component es convertirà en un simple `<div>` (o en una altra etiqueta si es passa `mockTagName`) que contindrà tots els fills proporcionats.

> Nota:
>
<<<<<<< HEAD
> `mockComponent()` és una API antiga. En lloc seu, et recomanem fer servir [`jest.mock()`](https://facebook.github.io/jest/docs/en/tutorial-react-native.html#mock-native-modules-using-jestmock).
=======
> `mockComponent()` is a legacy API. We recommend using [`jest.mock()`](https://jestjs.io/docs/tutorial-react-native#mock-native-modules-using-jestmock) instead.
>>>>>>> f0a9793dff9f8e86ec365bfadb0b4b23c6f618ce

* * *

### `isElement()` {#iselement}

```javascript
isElement(element)
```

Retorna `true` si `element` és qualsevol tipus d'element de React.

* * *

### `isElementOfType()` {#iselementoftype}

```javascript
isElementOfType(
  element,
  componentClass
)
```

Retorna `true` si `element` és un element de React del tipus `componentClass`.

* * *

### `isDOMComponent()` {#isdomcomponent}

```javascript
isDOMComponent(instance)
```

Retorna `true` si `instance` és un component del DOM (com ara `<div>` or `<span>`).

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

Recorre tots els components del `tree` i acumula tots els components a on `test(component)` és `true`. Això no és gaire útil per si mateix, però es fa servir com a primitiva per a altres utilitats de test.

* * *

### `scryRenderedDOMComponentsWithClass()` {#scryrendereddomcomponentswithclass}

```javascript
scryRenderedDOMComponentsWithClass(
  tree,
  className
)
```

Troba tots els elements DOM dels components de l'arbre renderitzat que són components DOM i tenen el nom de classe `className`.

* * *

### `findRenderedDOMComponentWithClass()` {#findrendereddomcomponentwithclass}

```javascript
findRenderedDOMComponentWithClass(
  tree,
  className
)
```

Igual que [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass) però espera que hi hagi un resultat, i retorna aquest resultat, o bé llança una excepció si hi ha un nombre de coincidències diferent a u.

* * *

### `scryRenderedDOMComponentsWithTag()` {#scryrendereddomcomponentswithtag}

```javascript
scryRenderedDOMComponentsWithTag(
  tree,
  tagName
)
```

Cerca tots els elements DOM dels components del `tree` renderitzat que siguin components DOM i que tinguin el nom de l'etiqueta `tagName`.

* * *

### `findRenderedDOMComponentWithTag()` {#findrendereddomcomponentwithtag}

```javascript
findRenderedDOMComponentWithTag(
  tree,
  tagName
)
```

Igual que [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag) però espera que hi hagi un resultat, i retorna aquest resultat, o llança una excepció si hi ha un nombre de coincidències diferent a u.

* * *

### `scryRenderedComponentsWithType()` {#scryrenderedcomponentswithtype}

```javascript
scryRenderedComponentsWithType(
  tree,
  componentClass
)
```

Troba totes les instàncies de components del tipus `componentClass`.

* * *

### `findRenderedComponentWithType()` {#findrenderedcomponentwithtype}

```javascript
findRenderedComponentWithType(
  tree,
  componentClass
)
```

Igual que [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype) però espera que hi hagi un resultat, i retorna aquest resultat, o llança una excepció si hi ha un nombre de coincidències diferent a u.

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
> Hauràs de tenir `window`, `window.document` i `window.document.createElement` disponible globalment **abans** que importis `React`. Si no és així, React creurà que no pot accedir al DOM i els mètodes com `setState` no funcionaran.

* * *

## Altres Utilitats {#other-utilities}

### `Simulate` {#simulate}

```javascript
Simulate.{eventName}(
  element,
  [eventData]
)
```

Simula un enviament d'esdeveniments en un node DOM amb dades d'esdeveniments `eventData`, que són opcionals.

`Simulate` té un mètode per a [cada esdeveniment que React entén](/docs/events.html#supported-events).

**Clicant un element**

```javascript
// <button ref={(node) => this.button = node}>...</button>
const node = this.button;
ReactTestUtils.Simulate.click(node);
```

**Canviant el valor d'un camp d'entrada i després prement RETORN.**

```javascript
// <input ref={(node) => this.textInput = node} />
const node = this.textInput;
node.value = 'giraffe';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
```

> Nota
>
> Hauràs de proporcionar qualsevol propietat d'esdeveniments que estiguis utilitzant en el component (p. ex. *keyCode*, *which*, etc.) perquè React no en crearà cap d'aquestes per tu.

* * *
