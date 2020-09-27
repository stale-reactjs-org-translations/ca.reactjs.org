---
id: test-renderer
title: Test de Renderitzat
permalink: docs/test-renderer.html
layout: docs
category: Reference
---

**Fent la Importació**

```javascript
import TestRenderer from 'react-test-renderer'; // ES6
const TestRenderer = require('react-test-renderer'); // ES5 amb npm
```

## Resum {#overview}

Aquest paquet proporciona un renderitzador de React que es pot fer servir per representar els components de React a objectes JavaScript purs, sense dependre del DOM o d'un entorn mòbil natiu.

Essencialment, aquest paquet facilita la captura de la jerarquia de visualització de la plataforma (similar a un DOM) renderitzada per a un DOM o un component natiu de React sense fer servir un navegador o [jsdom](https://github.com/tmpvar/jsdom).

Exemple:

```javascript
import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

Pots fer servir la funció de prova d'instantània de Jest per desar automàticament una còpia de l'arbre JSON a un fitxer i comprovar als teus test que no ha canviat: [Aprèn més sobre això](https://jestjs.io/docs/en/snapshot-testing).

També pots recórrer el resultat per trobar nodes específics i fer-hi afirmacions.

```javascript
import TestRenderer from 'react-test-renderer';

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Hello</p>
    </div>
  )
}

function SubComponent() {
  return (
    <p className="sub">Sub</p>
  );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);
```

### TestRenderer {#testrenderer}

* [`TestRenderer.create()`](#testrenderercreate)
* [`TestRenderer.act()`](#testrendereract)

### Instàncies de TestRenderer {#testrenderer-instance}

* [`testRenderer.toJSON()`](#testrenderertojson)
* [`testRenderer.toTree()`](#testrenderertotree)
* [`testRenderer.update()`](#testrendererupdate)
* [`testRenderer.unmount()`](#testrendererunmount)
* [`testRenderer.getInstance()`](#testrenderergetinstance)
* [`testRenderer.root`](#testrendererroot)

### TestInstance {#testinstance}

* [`testInstance.find()`](#testinstancefind)
* [`testInstance.findByType()`](#testinstancefindbytype)
* [`testInstance.findByProps()`](#testinstancefindbyprops)
* [`testInstance.findAll()`](#testinstancefindall)
* [`testInstance.findAllByType()`](#testinstancefindallbytype)
* [`testInstance.findAllByProps()`](#testinstancefindallbyprops)
* [`testInstance.instance`](#testinstanceinstance)
* [`testInstance.type`](#testinstancetype)
* [`testInstance.props`](#testinstanceprops)
* [`testInstance.parent`](#testinstanceparent)
* [`testInstance.children`](#testinstancechildren)

## Referència {#reference}

### `TestRenderer.create()` {#testrenderercreate}

```javascript
TestRenderer.create(element, options);
```

Crea una instància `TestRenderer` amb l'element React passat. No fa servir el DOM real, però encara fa que l'arbre del component sigui a la memòria perquè puguis fer afirmacions sobre aquest. Retorna una instància [TestRenderer](#testrenderer-instance).

### `TestRenderer.act()` {#testrendereract}

```javascript
TestRenderer.act(callback);
```

Semblant a l'assistent [`act()` de `react-dom/test-utils`(/docs/test-utils.html#act), `TestRenderer.act` prepara un component per a les afirmacions. Utilitza aquesta versió de `act()` per envoltar les crides a `TestRenderer.create` i `testRenderer.update`.

```javascript
import {create, act} from 'react-test-renderer';
import App from './app.js'; // El component sobre el que es fa el test

// renderitza el component
let root; 
act(() => {
  root = create(<App value={1}/>)
});

// fer afirmacions al root 
expect(root.toJSON()).toMatchSnapshot();

// actualitzar-lo amb algun atribut diferent
act(() => {
  root.update(<App value={2}/>);
})

// fer afirmacions al root 
expect(root.toJSON()).toMatchSnapshot();
```

### `testRenderer.toJSON()` {#testrenderertojson}

```javascript
testRenderer.toJSON()
```

Retorna un objecte que representa l'arbre renderitzat. Aquest arbre només conté els nodes específics de la plataforma com `<div>` o `<View>` i els seus atributs, però no conté cap component escrit per l'usuari. És útil per a les proves d'[instantània](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest).

### `testRenderer.toTree()` {#testrenderertotree}

```javascript
testRenderer.toTree()
```

Retorna un objecte que representa l'arbre renderitzat. La representació és més detallada que la proporcionada per `toJSON()`, i inclou els components escrits per l'usuari. Probablement no necessitaràs aquest mètode excepte que estiguis escrivint la teva pròpia biblioteca d'assercions a la part superior del renderitzador de test. 

### `testRenderer.update()` {#testrendererupdate}

```javascript
testRenderer.update(element)
```

Torna a renderitzar l'arbre en memòria amb un nou element arrel. Això simula una actualització de React a l'arrel. Si el nou element té el mateix tipus i clau que l'element anterior, l'arbre s'actualitzarà; en cas contrari, es tornarà a muntar un nou arbre.

### `testRenderer.unmount()` {#testrendererunmount}

```javascript
testRenderer.unmount()
```

Desmunta l'arbre en memòria, desencadenant els esdeveniments de cicle de vida apropiats.

### `testRenderer.getInstance()` {#testrenderergetinstance}

```javascript
testRenderer.getInstance()
```

Retorna la instància corresponent a l'element arrel, si està disponible. No funcionarà si l'element arrel és un component de funció perquè aquests no tenen instàncies.

### `testRenderer.root` {#testrendererroot}

```javascript
testRenderer.root
```

Retorna l'objecte arrel «instància de prova» que és útil per fer afirmacions sobre nodes específics de l'arbre. Pots utilitzar-lo per trobar altres "instàncies de prova" a nivells inferiors.

### `testInstance.find()` {#testinstancefind}

```javascript
testInstance.find(test)
```

Find a single descendant test instance for which `test(testInstance)` returns `true`. If `test(testInstance)` does not return `true` for exactly one test instance, it will throw an error.

### `testInstance.findByType()` {#testinstancefindbytype}

```javascript
testInstance.findByType(type)
```

Find a single descendant test instance with the provided `type`. If there is not exactly one test instance with the provided `type`, it will throw an error.

### `testInstance.findByProps()` {#testinstancefindbyprops}

```javascript
testInstance.findByProps(props)
```

Find a single descendant test instance with the provided `props`. If there is not exactly one test instance with the provided `props`, it will throw an error.

### `testInstance.findAll()` {#testinstancefindall}

```javascript
testInstance.findAll(test)
```

Find all descendant test instances for which `test(testInstance)` returns `true`.

### `testInstance.findAllByType()` {#testinstancefindallbytype}

```javascript
testInstance.findAllByType(type)
```

Find all descendant test instances with the provided `type`.

### `testInstance.findAllByProps()` {#testinstancefindallbyprops}

```javascript
testInstance.findAllByProps(props)
```

Find all descendant test instances with the provided `props`.

### `testInstance.instance` {#testinstanceinstance}

```javascript
testInstance.instance
```

The component instance corresponding to this test instance. It is only available for class components, as function components don't have instances. It matches the `this` value inside the given component.

### `testInstance.type` {#testinstancetype}

```javascript
testInstance.type
```

The component type corresponding to this test instance. For example, a `<Button />` component has a type of `Button`.

### `testInstance.props` {#testinstanceprops}

```javascript
testInstance.props
```

The props corresponding to this test instance. For example, a `<Button size="small" />` component has `{size: 'small'}` as props.

### `testInstance.parent` {#testinstanceparent}

```javascript
testInstance.parent
```

The parent test instance of this test instance.

### `testInstance.children` {#testinstancechildren}

```javascript
testInstance.children
```

The children test instances of this test instance.

## Ideas {#ideas}

You can pass `createNodeMock` function to `TestRenderer.create` as the option, which allows for custom mock refs.
`createNodeMock` accepts the current element and should return a mock ref object.
This is useful when you test a component that relies on refs.

```javascript
import TestRenderer from 'react-test-renderer';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.input = null;
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return <input type="text" ref={el => this.input = el} />
  }
}

let focused = false;
TestRenderer.create(
  <MyComponent />,
  {
    createNodeMock: (element) => {
      if (element.type === 'input') {
        // mock a focus function
        return {
          focus: () => {
            focused = true;
          }
        };
      }
      return null;
    }
  }
);
expect(focused).toBe(true);
```
