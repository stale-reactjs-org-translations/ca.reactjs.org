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
> A diferència del mètode [shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) dels components de classe, la funció `areEqual` retorna `true` si les props són iguals i `false` si les props no ho són. Aquesta és la inversa de `shouldComponentUpdate`.

* * *

### `createElement()` {#createelement}

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

Crea i retorna un nou [element React](/docs/rendering-elements.html) del tipus indicat. L'argument `'type'` pot ser una etiqueta (com `'div'` o `'span'`), un [component de React](/docs/components-i-props.html) (de classe o bé de funció), o un [fragment de React](#reactfragment).

El codi escrit amb [JSX](/docs/introduint-jsx.html) es convertirà quan es faci servir `React.createElement()`. Normalment no faràs una crida a `React.createElement()` directament si utilitzes JSX. Consulta [React sense JSX](/docs/react-without-jsx.html) per aprendre'n més.

* * *

### `cloneElement()` {#cloneelement}

```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

Clona i retorna un nou element de React usant `element` com a punt de partida. L'element resultant tindrà les `props` de l'element original amb les noves `props` fusionades. Els nous fills substituiran els fills existents. Es conservaran la `key` i les `ref` de l'element original.

`React.cloneElement()` és gairebé equivalent a:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

Tanmateix, també conserva les `ref`s. Això vol dir que si hi ha un fill amb una `ref`, no el robareu accidentalment del seu ancestre. S'adjuntarà la mateixa `ref` a l'element nou.

Aquesta API s'ha introduït com a substitut de l'obsolet `React.addons.cloneWithProps()`.

* * *

### `createFactory()` {#createfactory}

```javascript
React.createFactory(type)
```

Retorna una funció que produeix elements React d'un tipus consignat a `type`. Com [`React.createElement()`](#createelement), l'argument `type` pot ser una etiqueta (com `'div'` o `'span'`), un [component de React](/docs/components-i-props.html) (de classe o bé de funció), o un [fragment de React](#reactfragment).

Aquest ajudant es considera antiquat, i us animem a utilitzar JSX o bé `React.createElement()` directament.

Normalment no faràs una crida a `React.createElement()` directament si utilitzes JSX. Consulta [React sense JSX](/docs/react-without-jsx.html) per aprendre'n més.

* * *

### `isValidElement()` {#isvalidelement}

```javascript
React.isValidElement(objecte)
```

Verifica que l'objecte és un element React. Retorna `true` o `false`.

* * *

### `React.Children` {#reactchildren}

`React.Children` proporciona eines per tractar amb l'estructura de dades opaques `this.props.children`.

#### `React.Children.map` {#reactchildrenmap}

```javascript
React.Children.map(children, function[(thisArg)])
```

Invoca una funció a cada fill immediat contingut dins dels `children`amb `this` establert a `thisArg`. Si `children` és una *array* es recorrerà i la funció es cridarà per a cada fill de l'*array*. Si els fills són `null` o `undefined`, aquest mètode retornarà `null` o `undefined` en lloc d'una *array*.

> Nota
>
> Si `children` és un `Fragment` serà tractat com un sol fill i no es recorrerà.

#### `React.Children.forEach` {#reactchildrenforeach}

```javascript
React.Children.forEach(children, function[(thisArg)])
```

Igual que [`React.Children.map()`](#reactchildrenmap) però no retorna una *array*.

#### `React.Children.count` {#reactchildrencount}

```javascript
React.Children.count(children)
```

Retorna el nombre total de components a `children`, igual al nombre de vegades que s'invocarà una crida de retorn a `map` o a `forEach`.

#### `React.Children.only` {#reactchildrenonly}

```javascript
React.Children.only(children)
```

Verifica que `children` només té un fill (un element de React) i el retorna. Si no és així, aquest mètode llança un error.

> Nota:
>
>`React.Children.only()` no accepta el valor que retorna [`React.Children.map()`](#reactchildrenmap) perquè és una *array* enlloc d'un element de React.

#### `React.Children.toArray` {#reactchildrentoarray}

```javascript
React.Children.toArray(children)
```

Retorna l'estructura de dades opaca `children` com una *array* plana amb les claus assignades a cada fill. És útil si voleu manipular col·leccions de fills en els vostres mètodes de renderització, especialment si voleu reordenar o tallar `this.props.children` abans de passar-lo avall.

> Nota:
>
> `React.Children.toArray()` canvia les claus per preservar la semàntica de *arrays* imbricades quan s'aplana les llistes de fills. És a dir, «toArray» prefixa cada clau de la matriu retornada de manera que cada clau de cada element s'amplia a la matriu d'entrada que la conté.

* * *

### `React.Fragment` {#reactfragment}

El component `React.Fragment` permet retornar múltiples elements en un mètode `render()` sense crear un element del DOM addicional: 

```javascript
render() {
  return (
    <React.Fragment>
      text.
      <h2>Encapçalament</h2>
    </React.Fragment>
  );
}
```

També el pots fer servir amb la sintaxi més curta `<></>` . Per a més informació, mira [React v16.2.0: Implementació millorada dels Fragments](/blog/2017/11/28/react-v16.2.0-fragment-support.html).


### `React.createRef` {#reactcreateref}

`React.createRef` crea una [ref](/docs/refs-and-the-dom.html) que es pot adjuntar als elements de React a través de l'atribut ref.
`embed:16-3-release-blog-post/create-ref-example.js`

### `React.forwardRef` {#reactforwardref}

`React.forwardRef` crea un component de React que reenvia l'atribut  [ref](/docs/refs-and-the-dom.html) que rep d'un altre component que es troba situat aigües avall dins l'arbre. Aquesta tècnica no és molt comuna, però és particularment útil en dos escenaris:

* [Reenviament de refs a components del DOM](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [Reenviament de refs en un component d'ordre superior](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` accepta una funció de renderització com a argument. React cridarà aquesta funció amb `props` i `ref` com a dos arguments. Aquesta funció ha de retornar un node de React.

`embed:reference-react-forward-ref.js`

En l'exemple anterior, React passa una `ref` donada a l'element `<FancyButton ref={ref}>` com a segon argument a la funció de renderització dins de la crida `React.forwardRef`. Aquesta funció de renderització passa la `ref` a l'element <button ref={ref}>..

Com a resultat, després que React adjunti la referència,  `ref.current` apuntarà directament a la .instància de l'element del  DOM `<button>`.

Per a més informació, mira [Reenviament de refs](/docs/forwarding-refs.html).

### `React.lazy` {#reactlazy}

`React.lazy()` permet definir un component que es carrega dinàmicament. Això ajuda a reduir la mida del paquet per retardar la càrrega dels components que no es fan servir durant la renderització inicial.

Pots aprendre com utilitzar-ho de la nostra [documentació de divisió de codi](/docs/code-splitting.html#reactlazy). Potser també voldràs llegir [aquest article](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) que explica com fer-la servir amb més detall.

```js
// Aquest components es carrega dinàmicament
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

Note that rendering `lazy` components requires that there's a `<React.Suspense>` component higher in the rendering tree. This is how you specify a loading indicator.Tingues en compte que la renderització dels components «lazy» requereix que hi hagi un component `<React.Suspense>` aigües amunt en l'arbre que es renderitza.Així és como s'especifica un indicador de càrrega.

> **Nota**
>
> Using `React.lazy`with dynamic import requires Promises to be available in the JS environment. This requires a polyfill on IE11 and below. L'ús de «React.lazy» amb importació dinàmica requereix que les *Promises* estiguin disponibles a l'entorn JS. Això requereix un *polyfill* a IE11 i anteriors.

### `React.Suspense` {#reactsuspense}

`React.Suspense` permet especificar l'indicador de càrrega en cas que alguns components aigües avall de l'arbre encara no estiguin preparats per ser renderitzats. Avui, els components `lazy` són els *únics**  admesos per `<React.Suspense>`:

```js
// Aquest components es carrega dinàmicament
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Mostra l'<Spinner> fins que es carregui <OtherComponent />
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

Està documentat a la nostra [documentació de divisió de codi](/docs/code-splitting.html#reactlazy). Tingues en compte que els components `lazy` poden estar molt aigües avall dins de l'arbre `Suspense`. No cal que els envoltis tots. La millor pràctica és posar `<Suspense>` on volguis veure un indicador de càrrega, i fer servir  `lazy()` on vulguis fer la divisió de codi.

While this is not supported today, in the future we plan to let `Suspense` handle more scenarios such as data fetching. You can read about this in [our roadmap](/blog/2018/11/27/react-16-roadmap.html). Encara que avui no està suportat, en el futur tenim previst deixar que el `Suspense` gestioni més escenaris com ara la recollida de dades. Pots llegir sobre això a [el nostre full de ruta](/blog/2018/11/27/react-16-roadmap.html).

>Nota:
>
>`React.lazy()` i `<React.Suspense>` encara no són compatibles amb `ReactDOMServer`. Aquesta és una limitació coneguda que es resoldrà en el futur.
