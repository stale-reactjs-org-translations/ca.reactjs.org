---
id: react-api
title: API d'Alt Nivell de React
layout: docs
category: Reference
permalink: docs/react-api.html
redirect_from:
  - "docs/reference.html"
  - "docs/clone-with-props.html"
  - "docs/top-level-api.html"
  - "docs/top-level-api-ja-JP.html"
  - "docs/top-level-api-ko-KR.html"
  - "docs/top-level-api-zh-CN.html"
---

`React` és el punt d'entrada de la biblioteca React. Si carregues React des d'una etiqueta `<script>`, aquestes APIs d'alt nivell estan disponibles a la `React` global. Si utilitzes ES6 amb npm, pots carregar-la escrivint `import React from 'react'`. Si fas servir ES5 amb npm, pots fer-ho escrivint `var React = require('react')`.

## Resum {#overview}

### Components {#components}

Els components React permeten dividir la interfície d'usuari en peces independents i reutilitzables, i pensar en cada peça de forma aïllada. Els components de React es poden definir per les subclasse `React. Component` o `React. PureComponent`.

 - [`React.Component`](#reactcomponent)
 - [`React.PureComponent`](#reactpurecomponent)

Si no fas servir classes ES6, pots fer servir el mòdul `create-react-class`. Consulta [Utilitzant React sense ES6](/docs/react-without-es6.html) per a més informació.

Els components de react també es poden definir com funcions que es poden embolcallar:

- [`React.memo`](#reactmemo)

### Crear Elements de React {#creating-react-elements}

Et recomanem [usant JSX](/docs/introduint-jsx.html) que descriu quina forma ha de tenir la teva interfície d'usuari. Cada element JSX és només sucre sintàctic per cridar [`React.createElement()`(#createelement). Els següents mètodes no els invocaràs normalment de forma directa si fas servir JSX.

- [`createElement()`](#createelement)
- [`createFactory()`](#createfactory)

Consulta [Fent servir React sense JSX](/docs/react-without-jsx.html) per a més informació.

### Transformant Elements {#transforming-elements}

`React` proporciona diverses APIs per manipular elements:

- [`cloneElement()`](#cloneelement)
- [`isValidElement()`](#isvalidelement)
- [`React.Children`](#reactchildren)

### Fragments {#fragments}

`React` també et proporciona un component per renderitzar multiples elements sense un embolcall.

- [`React.Fragment`](#reactfragment)

### Refs {#refs}

- [`React.createRef`](#reactcreateref)
- [`React.forwardRef`](#reactforwardref)

### Suspense {#suspense}

Suspense permet als components "esperar" alguna cosa abans de renderitzar. Actualment, Suspense només suporta un cas d'ús: [carregant els components dinàmicament amb `React.lazy`](/docs/code-splitting.html#reactlazy). En el futur, donarà suport a altres casos d'ús com la recollida de dades.

- [`React.lazy`](#reactlazy)
- [`React.Suspense`](#reactsuspense)

### Hooks {#hooks}

*Hooks* van ser afegits a la versió 16.8 de React. Et permeten utilitzar l'estat i altres funcions de React sense escriure una classe. Els hooks tenen aquesta [secció dedicada als documents](/docs/hooks-intro.html) i una referència de la API separada:

- [Hooks bàsics](/docs/hooks-reference.html#basic-hooks)
  - [`useState`](/docs/hooks-reference.html#usestate)
  - [`useEffect`](/docs/hooks-reference.html#useeffect)
  - [`useContext`](/docs/hooks-reference.html#usecontext)
- [Hooks Addicionals](/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](/docs/hooks-reference.html#usereducer)
  - [`useCallback`](/docs/hooks-reference.html#usecallback)
  - [`useMemo`](/docs/hooks-reference.html#usememo)
  - [`useRef`](/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](/docs/hooks-reference.html#usedebugvalue)

* * *

## Referència {#reference}

### `React.Component` {#reactcomponent}

`React.Component` és la classe base dels components React quan es defineixen utilitzant [classes ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes):

```javascript
class Salutacions extends React.Component {
  render() {
    return <h1>Hola, {this.props.nom}</h1>;
  }
}
```

Consulta [React.Component a la Referència de l'API](/docs/react-component.html) per a una llista de mètodes i propietats relacionades amb la calsse base `React.Component`.

* * *

### `React.PureComponent` {#reactpurecomponent}

`React.PureComponent` és semblant a [`React.Component`](#reactcomponent). La diferència entre ells és que [`React.Component`](#reactcomponent) no implementa [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate), i `React.PureComponent` la implementa amb unacomparació superficial dels valors de l'state i les props.

Si la funció `render()` del component de React dóna el mateix resultat amb les mateixes props i state, llavors pots utilitzar `React. PureComponent` i aconseguir un augment del rendiment en alguns casos.

> Nota
>
>  `shouldComponentUpdate()` del `React.PureComponent` només compara superficialment els objectes. Si contenen estructures de dades complexes, pot donar falsos negatius per a diferències més profundes. Usa només `PureComponent` quan tinguis props i state senzills, o fes servir [forceUpdate()`](/docs/react-component.html#forceupdate) quan sàpigues que les estructures de dades profundes han canviat. O considereu utilitzar objectes [immutables](https://facebook.github.io/immutable-js/) per facilitar les comparacions ràpides de les dades imbricaddes.
>
> A més, `shouldComponentUpdate()` del `React.PureComponent` omet les actualitzacions de props per a tot el subarbre del component. Assegura't que tots els components fills també són "pure".

* * *

### `React.memo` {#reactmemo}

```javascript
const ElMeuComponent = React.memo(function ElMeuComponent(props) {
  /* render using props */
});
```

`React.memo` és un [component d'ordre superior](/docs/higher-order-components.html).

Si el teu component genera el mateix resultat si té les mateix props i state, llavors pots embolcallar-lo en una crida a `React.memo` que augmentarà el seu rendiment en alguns casos memoritzant-ne el resultat. Això vol dir que React ometrà la renderització del component, i reutilitzarà l'últim resultat renderitzat.

`React.memo` només comprova els canvis de les props. Si el component de la teva funció embolcallat per `React.memo` té un Hook [`useState`](/docs/hooks-state.html) o [`usContext`](/docs/hooks-reference.html#usecontext) en la seva implementació, encara es seguirà re-renderitzant quan l'state o el context canviïn.

Per defecte només compararà superficialment els objectes complexos en l'objecte de props. Si vols controlar la comparació, també pots proporcionar una funció de comparació personalitzada com a segon argument.

```javascript
function ElMeuComponent(props) {
  /* renderitza fent servir props */
}
function esIgual(prevProps, nextProps) {
  /*
  retorna true si quan es passa «nextProps» a «render»
  retorna el mateix resultat que passant prevProps a render,
  en cas contrari retorna false
  */
}
export default React.memo(ElMeuComponent, esIgual);
```

 Aquest mètode només existeix per a **[optimitzar el rendiment](/docs/optimizació-rendiment.html).** No hi confiis per "prevenir" un renderitzat, ja que això pot provocar errors.

> Nota
>
> A diferència del mètode [shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) dels components de classe, la funció `areEqual` retorna `true` si les props són iguals i `false` si les props no són iguals. Aquesta és la inversa de `shouldComponentUpdate`.

* * *

### `createElement()` {#createelement}

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

Create and return a new [React element](/docs/rendering-elements.html) of the given type. The type argument can be either a tag name string (such as `'div'` or `'span'`), a [React component](/docs/components-and-props.html) type (a class or a function), or a [React fragment](#reactfragment) type.

Code written with [JSX](/docs/introducing-jsx.html) will be converted to use `React.createElement()`. You will not typically invoke `React.createElement()` directly if you are using JSX. See [React Without JSX](/docs/react-without-jsx.html) to learn more.

* * *

### `cloneElement()` {#cloneelement}

```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

Clone and return a new React element using `element` as the starting point. The resulting element will have the original element's props with the new props merged in shallowly. New children will replace existing children. `key` and `ref` from the original element will be preserved.

`React.cloneElement()` is almost equivalent to:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

However, it also preserves `ref`s. This means that if you get a child with a `ref` on it, you won't accidentally steal it from your ancestor. You will get the same `ref` attached to your new element.

This API was introduced as a replacement of the deprecated `React.addons.cloneWithProps()`.

* * *

### `createFactory()` {#createfactory}

```javascript
React.createFactory(type)
```

Return a function that produces React elements of a given type. Like [`React.createElement()`](#createelement), the type argument can be either a tag name string (such as `'div'` or `'span'`), a [React component](/docs/components-and-props.html) type (a class or a function), or a [React fragment](#reactfragment) type.

This helper is considered legacy, and we encourage you to either use JSX or use `React.createElement()` directly instead.

You will not typically invoke `React.createFactory()` directly if you are using JSX. See [React Without JSX](/docs/react-without-jsx.html) to learn more.

* * *

### `isValidElement()` {#isvalidelement}

```javascript
React.isValidElement(object)
```

Verifies the object is a React element. Returns `true` or `false`.

* * *

### `React.Children` {#reactchildren}

`React.Children` provides utilities for dealing with the `this.props.children` opaque data structure.

#### `React.Children.map` {#reactchildrenmap}

```javascript
React.Children.map(children, function[(thisArg)])
```

Invokes a function on every immediate child contained within `children` with `this` set to `thisArg`. If `children` is an array it will be traversed and the function will be called for each child in the array. If children is `null` or `undefined`, this method will return `null` or `undefined` rather than an array.

> Note
>
> If `children` is a `Fragment` it will be treated as a single child and not traversed.

#### `React.Children.forEach` {#reactchildrenforeach}

```javascript
React.Children.forEach(children, function[(thisArg)])
```

Like [`React.Children.map()`](#reactchildrenmap) but does not return an array.

#### `React.Children.count` {#reactchildrencount}

```javascript
React.Children.count(children)
```

Returns the total number of components in `children`, equal to the number of times that a callback passed to `map` or `forEach` would be invoked.

#### `React.Children.only` {#reactchildrenonly}

```javascript
React.Children.only(children)
```

Verifies that `children` has only one child (a React element) and returns it. Otherwise this method throws an error.

> Note:
>
>`React.Children.only()` does not accept the return value of [`React.Children.map()`](#reactchildrenmap) because it is an array rather than a React element.

#### `React.Children.toArray` {#reactchildrentoarray}

```javascript
React.Children.toArray(children)
```

Returns the `children` opaque data structure as a flat array with keys assigned to each child. Useful if you want to manipulate collections of children in your render methods, especially if you want to reorder or slice `this.props.children` before passing it down.

> Note:
>
> `React.Children.toArray()` changes keys to preserve the semantics of nested arrays when flattening lists of children. That is, `toArray` prefixes each key in the returned array so that each element's key is scoped to the input array containing it.

* * *

### `React.Fragment` {#reactfragment}

The `React.Fragment` component lets you return multiple elements in a `render()` method without creating an additional DOM element:

```javascript
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```

You can also use it with the shorthand `<></>` syntax. For more information, see [React v16.2.0: Improved Support for Fragments](/blog/2017/11/28/react-v16.2.0-fragment-support.html).


### `React.createRef` {#reactcreateref}

`React.createRef` creates a [ref](/docs/refs-and-the-dom.html) that can be attached to React elements via the ref attribute.
`embed:16-3-release-blog-post/create-ref-example.js`

### `React.forwardRef` {#reactforwardref}

`React.forwardRef` creates a React component that forwards the [ref](/docs/refs-and-the-dom.html) attribute it receives to another component below in the tree. This technique is not very common but is particularly useful in two scenarios:

* [Forwarding refs to DOM components](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [Forwarding refs in higher-order-components](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` accepts a rendering function as an argument. React will call this function with `props` and `ref` as two arguments. This function should return a React node.

`embed:reference-react-forward-ref.js`

In the above example, React passes a `ref` given to `<FancyButton ref={ref}>` element as a second argument to the rendering function inside the `React.forwardRef` call. This rendering function passes the `ref` to the `<button ref={ref}>` element.

As a result, after React attaches the ref, `ref.current` will point directly to the `<button>` DOM element instance.

For more information, see [forwarding refs](/docs/forwarding-refs.html).

### `React.lazy` {#reactlazy}

`React.lazy()` lets you define a component that is loaded dynamically. This helps reduce the bundle size to delay loading components that aren't used during the initial render.

You can learn how to use it from our [code splitting documentation](/docs/code-splitting.html#reactlazy). You might also want to check out [this article](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) explaining how to use it in more detail.

```js
// This component is loaded dynamically
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

Note that rendering `lazy` components requires that there's a `<React.Suspense>` component higher in the rendering tree. This is how you specify a loading indicator.

> **Note**
>
> Using `React.lazy`with dynamic import requires Promises to be available in the JS environment. This requires a polyfill on IE11 and below.

### `React.Suspense` {#reactsuspense}

`React.Suspense` lets you specify the loading indicator in case some components in the tree below it are not yet ready to render. Today, lazy loading components is the **only** use case supported by `<React.Suspense>`:

```js
// This component is loaded dynamically
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Displays <Spinner> until OtherComponent loads
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

It is documented in our [code splitting guide](/docs/code-splitting.html#reactlazy). Note that `lazy` components can be deep inside the `Suspense` tree -- it doesn't have to wrap every one of them. The best practice is to place `<Suspense>` where you want to see a loading indicator, but to use `lazy()` wherever you want to do code splitting.

While this is not supported today, in the future we plan to let `Suspense` handle more scenarios such as data fetching. You can read about this in [our roadmap](/blog/2018/11/27/react-16-roadmap.html).

>Note:
>
>`React.lazy()` and `<React.Suspense>` are not yet supported by `ReactDOMServer`. This is a known limitation that will be resolved in the future.
