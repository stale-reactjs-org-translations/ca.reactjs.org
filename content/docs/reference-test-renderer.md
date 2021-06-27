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

Pots fer servir la funció d'instantània de test de Jest per desar automàticament una còpia de l'arbre JSON a un fitxer i comprovar als teus test que no ha canviat: [Aprèn més sobre això](https://jestjs.io/docs/en/snapshot-testing).

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

Crea una instància `TestRenderer` amb l'element React passat. No fa servir el DOM real, però tot i així renderitza completament l'arbre del component a la memòria perquè puguis fer afirmacions sobre aquest. Retorna una instància [TestRenderer](#testrenderer-instance).

### `TestRenderer.act()` {#testrendereract}

```javascript
TestRenderer.act(callback);
```

Semblant a l'assistent [`act()` de `react-dom/test-utils`](/docs/test-utils.html#act), `TestRenderer.act` prepara un component per a fer-hi afirmacions. Utilitza aquesta versió de `act()` per envoltar les crides a `TestRenderer.create` i `testRenderer.update`.

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

Retorna un objecte que representa l'arbre renderitzat. Aquest arbre només conté els nodes específics de la plataforma com `<div>` o `<View>` i els seus atributs, però no conté cap component escrit per l'usuari. És útil per a les [proves d'instantània](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest).

### `testRenderer.toTree()` {#testrenderertotree}

```javascript
testRenderer.toTree()
```

Retorna un objecte que representa l'arbre renderitzat. La representació és més detallada que la proporcionada per `toJSON()`, i inclou els components escrits per l'usuari. Probablement no necessitaràs aquest mètode excepte que estiguis escrivint la teva pròpia biblioteca d'afirmacions sobre el renderitzador de test. 

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

Retorna l'objecte arrel «instància de test» que és útil per fer afirmacions sobre nodes específics de l'arbre. Pots utilitzar-lo per trobar altres "instàncies de test" aigües avall.

### `testInstance.find()` {#testinstancefind}

```javascript
testInstance.find(test)
```

Cerca una única instància de test aigües avall per a la qual `test(testInstance)` retorna `true`. Si `test(testInstance)` no retorna `true` per a una i només una instància de test, es llançarà un error.

### `testInstance.findByType()` {#testinstancefindbytype}

```javascript
testInstance.findByType(type)
```

Cerca una única instància de test aigües avall amb el tipus `type` proporcionat. Si no hi ha exactament una instància de test amb el `type` proporcionat, es llançarà un error.

### `testInstance.findByProps()` {#testinstancefindbyprops}

```javascript
testInstance.findByProps(props)
```

Cerca una única instància de test aigües avall amb les `props` proporcionades. Si no hi ha exactament una i només una instància de test amb les `props` proporcionades, es produirà un error.

### `testInstance.findAll()` {#testinstancefindall}

```javascript
testInstance.findAll(test)
```

Cerca totes les instàncies de test aigües avall per a les quals `test(testInstance)` retorna `true`.

### `testInstance.findAllByType()` {#testinstancefindallbytype}

```javascript
testInstance.findAllByType(type)
```

Cerca totes les instàncies de test aigües avall amb el `type` proporcionat.

### `testInstance.findAllByProps()` {#testinstancefindallbyprops}

```javascript
testInstance.findAllByProps(props)
```

Cerca totes les instàncies de test aigües avall amb les `props` proporcionades..

### `testInstance.instance` {#testinstanceinstance}

```javascript
testInstance.instance
```

La instància del component corresponent a aquesta instància de test. Només està disponible per als components de classe, ja que els components de la funció no tenen instàncies. Coincideix amb el valor  `this` dins del component indicat.

### `testInstance.type` {#testinstancetype}

```javascript
testInstance.type
```

El tipus de component que corresponent a aquesta instància de test. Per exemple, un component `<Button />`  té un tipus de `Button`.

### `testInstance.props` {#testinstanceprops}

```javascript
testInstance.props
```

Les *props* corresponents a aquesta instància de test. Per exemple, un component `<Button size="small" />` té  com a *props* `{size: 'small'}`.

### `testInstance.parent` {#testinstanceparent}

```javascript
testInstance.parent
```

La instància de test pare d'aquesta instància de test.

### `testInstance.children` {#testinstancechildren}

```javascript
testInstance.children
```

Les instàncies de test filles d'aquesta instància de test.

## Idees {#ideas}

Pots passar la funció `createNodeMock` a `TestRenderer.create` com a opció, que permet fer simulacions de referències personalitzades.
`createNodeMock` accepta l'element actual i retornarà un objecte ref simulat.
És útil quan proves un component que es té referències.

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
        // simula una funció d'enfocament
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
