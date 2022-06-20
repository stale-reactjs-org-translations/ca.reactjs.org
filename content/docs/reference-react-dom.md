---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

<<<<<<< HEAD
Si carregues React des d'una etiqueta `<script>`, aquestes APIs de nivell superior estan disponibles en el `ReactDOM` global. Si fas servir ES6 amb npm, pots escriure `import ReactDOM from 'react-dom'`. Si utilitzes ES5 amb npm, pots escriure `var ReactDOM = require('react-dom')`.
=======
The `react-dom` package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model if you need to.

```js
import * as ReactDOM from 'react-dom';
```

If you use ES5 with npm, you can write:

```js
var ReactDOM = require('react-dom');
```

The `react-dom` package also provides modules specific to client and server apps:
- [`react-dom/client`](/docs/react-dom-client.html)
- [`react-dom/server`](/docs/react-dom-server.html)
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

## Resum {#overview}

<<<<<<< HEAD
El paquet `react-dom` proporciona mètodes específics del DOM que pots fer servir al nivell superior de la teva aplicació i com a escotilla per sortir del model React si cal. La majoria dels components no han de fer servir aquest mòdul.
=======
The `react-dom` package exports these methods:
- [`createPortal()`](#createportal)
- [`flushSync()`](#flushsync)
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

These `react-dom` methods are also exported, but are considered legacy:
- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`findDOMNode()`](#finddomnode)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)

> Note: 
> 
> Both `render` and `hydrate` have been replaced with new [client methods](/docs/react-dom-client.html) in React 18. These methods will warn that your app will behave as if it's running React 17 (learn more [here](https://reactjs.org/link/switch-to-createroot)).

### Navegadors Compatibles {#browser-support}

<<<<<<< HEAD
React és compatible amb tots els navegadors populars, incloent-hi Internet Explorer 9 i superiors, tot i que [fan falta alguns *polyfills*](/docs/javascript-environment-requirements.html) per als navegadors més antics com ara l'IE 9 i l'IE 10.
=======
React supports all modern browsers, although [some polyfills are required](/docs/javascript-environment-requirements.html) for older versions.
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

> Nota
>
<<<<<<< HEAD
> No garantim la compatibilitat amb els navegadors més antics que no suporten els mètodes ES5, però és possible que les teves aplicacions funcionin en navegadors més antics si els *polyfills* com ara [es5-shim i es5-sham](https://github.com/es-shims/es5-shim) s'inclouen a la pàgina. Si decideixes prendre aquest camí recorda que és sota la teva responsabilitat.

* * *
=======
> We do not support older browsers that don't support ES5 methods or microtasks such as Internet Explorer. You may find that your apps do work in older browsers if polyfills such as [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) are included in the page, but you're on your own if you choose to take this path.
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

## Referències {#reference}

### `createPortal()` {#createportal}

```javascript
<<<<<<< HEAD
ReactDOM.render(element, callback[, callback])
```

Renderitza un element React al DOM en el *callback* subministrat i retorna un [referència](/docs/more-about-refs.html) al component (o retorna `null` per a [components sense estat](/docs/components-and-props.html#function-and-class-components)).
=======
createPortal(child, container)
```

Creates a portal. Portals provide a way to [render children into a DOM node that exists outside the hierarchy of the DOM component](/docs/portals.html).

### `flushSync()` {#flushsync}

```javascript
flushSync(callback)
```

Force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.

```javascript
// Force this state update to be synchronous.
flushSync(() => {
  setCount(count + 1);
});
// By this point, DOM is updated.
```

> Note:
> 
> `flushSync` can significantly hurt performance. Use sparingly.
> 
> `flushSync` may force pending Suspense boundaries to show their `fallback` state.
> 
> `flushSync` may also run pending effects and synchronously apply any updates they contain before returning.
> 
> `flushSync` may also flush updates outside the callback when necessary to flush the updates inside the callback. For example, if there are pending updates from a click, React may flush those before flushing the updates inside the callback.

## Legacy Reference {#legacy-reference}
### `render()` {#render}
```javascript
render(element, container[, callback])
```

> Note:
>
> `render` has been replaced with `createRoot` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Render a React element into the DOM in the supplied `container` and return a [reference](/docs/more-about-refs.html) to the component (or returns `null` for [stateless components](/docs/components-and-props.html#function-and-class-components)).
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

Si l'element React s'ha renderitzat prèviament en el *callback*, en farà la seva actualització i només canviarà del DOM el que sigui necessari per reflectir l'últim element de React.

Si es proporciona la *callback* opcional, s'executarà després que el component es renderitzi o s'actualitzi.

> Nota:
>
<<<<<<< HEAD
> `ReactDOM.render()` controla el contingut del node *callback* que s'hi passi. Qualsevol altre element DOM que sigui al seu interior es substitueix quan es crida per primer cop. Les crides posteriors fan servir l'algoritme de comparació del DOM de React per fer actualitzacions eficients.
>
> `ReactDOM.render()` no modifica el node contenidor (només modifica els fills del contenidor). És possible inserir un component a un node DOM que ja existeix sense sobreescriure els fills existents.
>
> `ReactDOM.render()` actualment retorna una referència a la instància arrel `ReactComponent`. No obstant això, fer servir aquest valor de retorn és obsolet
> i s'ha d'evitar perquè les versions futures de React podran representar els components de forma asíncrona en alguns casos. Si necessites una referència a la instància arrel `ReactComponent`, la solució idònia és adjuntar una
> [callback ref](/docs/more-about-refs.html#the-ref-callback-attribute) a l'element arrel.
>
> Fer servir `ReactDOM.render()` per hidratar un contenidor amb renderització des del servidor és obsolet i s'eliminarà a la versió 17 de React. Fes servir en el seu lloc [`hydrate()`](#hydrate).
=======
> `render()` controls the contents of the container node you pass in. Any existing DOM elements inside are replaced when first called. Later calls use React’s DOM diffing algorithm for efficient updates.
>
> `render()` does not modify the container node (only modifies the children of the container). It may be possible to insert a component to an existing DOM node without overwriting the existing children.
>
> `render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy
> and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a
> [callback ref](/docs/refs-and-the-dom.html#callback-refs) to the root element.
>
> Using `render()` to hydrate a server-rendered container is deprecated. Use [`hydrateRoot()`](#hydrateroot) instead.
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

* * *

### `hydrate()` {#hydrate}

```javascript
<<<<<<< HEAD
ReactDOM.hydrate(element, callback[, callback])
```

El mateix que [`render()`](#render), però s'utilitza per 'hidratar' un contenidor el contingut HTML del qual ha sigut renderitzat per [`ReactDOMServer`](/docs/react-dom-server.html). React provarà d'adjuntar detectors d'esdeveniments al marcador existent.
=======
hydrate(element, container[, callback])
```

> Note:
>
> `hydrate` has been replaced with `hydrateRoot` in React 18. See [hydrateRoot](/docs/react-dom-client.html#hydrateroot) for more info.

Same as [`render()`](#render), but is used to hydrate a container whose HTML contents were rendered by [`ReactDOMServer`](/docs/react-dom-server.html). React will attempt to attach event listeners to the existing markup.
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

React espera que el contingut renderitzat sigui idèntic entre el servidor i el client. Pot corregir les diferències del contingut de text, però hauràs de tractar les discordances com errors i solucionar-les. En el mode de desenvolupament, React adverteix sobre les discordances durant la hidratació. No hi ha garantia que les diferències d'atribut siguin arreglades en cas de discordança. Això és important per raons de rendiment perquè a la majoria d'aplicacions són rares les discordances, i per tant, validar tots els marcadors tindria un cost massa alt.

Si l'atribut d'un sol element o el contingut del text és inevitablement diferent entre el servidor i el client (per exemple, una marca de temps), pots silenciar l'avís afegint `suppressHydrationWarning={true}` a l'element. Només funciona amb un nivell de profunditat, i està destinat a ser una via de escapatòria. No n'abusis. Tret que sigui contingut de text, React no intentarà corregir-ho, de manera que pot ser que no sigui coherent fins a futures actualitzacions.

Si has de representar intencionadament quelcom diferent del servidor al client, pots fer-la en dos passos. Els components que renderitzen quelcom diferent del client poden llegir una variable d'estat com ara `this.state.isClient`, que pots establir a `true` dins de `componentDidMount()`. D'aquesta manera, en el pas inicial es renderitzarà el mateix contingut que en el servidor, evitant discordances i just després de la hidratació es renderitzarà síncronament un segon pas addicional. Tingues en compte que aquest enfocament farà que els teus components siguin més lents perquè s'han de renderitzar dues vegades, per tant fes-lo servir amb cura.

Recorda tenir en compte l'experiència d'usuari en connexions lentes. El codi JavaScript es pot carregar força més tard que la renderització HTML inicial, de manera que si es renderitza alguna cosa diferent només en la part del client, la transició pot ser que grinyoli. Tot i això, si s'executa bé, pot ser beneficiós representar una shell de l'aplicació al servidor, i només mostrar alguns dels ginys addicionals en el client. Per a aprendre a fer-ho sense que hi hagi problemes de discordances, consulta l'explicació del paràgraf anterior.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
<<<<<<< HEAD
ReactDOM.unmountComponentAtNode(callback)
```

Elimina un component de React muntat des del DOM i neteja els seus gestors d’esdeveniments i estat. Si no s'ha muntat cap component al contenidor, la crida a aquesta funció no fa res. Retorna `true` si un component s'ha desmuntat i `false` si no hi ha cap component per desmuntar.
=======
unmountComponentAtNode(container)
```

> Note:
>
> `unmountComponentAtNode` has been replaced with `root.unmount()` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns `true` if a component was unmounted and `false` if there was no component to unmount.
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

* * *

### `findDOMNode()` {#finddomnode}

> Nota:
>
> `findDOMNode` és una escotilla de sortida feta servir per accedir al node DOM subjacent. En la majoria dels casos, l'ús d'aquesta sortida es desaconsella perquè trenca l'abstracció del component. [Ha quedat obsolet a l'`StrictMode`.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
findDOMNode(component)
```
Si aquest component s'ha muntat en el DOM, retorna l'element corresponent del navegador natiu del DOM. Aquest mètode és útil per llegir els valors fora del DOM, com ara els valors de formulari i fer mesuraments de DOM. **En la majoria dels casos, pots adjuntar una referència al node DOM i així evitar utilitzar `find DOMNode`.**

Quan un component es renderitza a `null` o `false`, `findDOMNode` retorna `null`. Quan un component es renderitza a una cadena, `findDOMNode` retorna un node DOM que conté aquest valor. A partir de React 16, un component pot retornar un fragment amb diversos fills, en aquest cas `findDOMNode` retornarà el node DOM corresponent al primer fill que no estigui buit.

> Nota:
>
> `findDOMNode` només funciona amb components muntats (és a dir, components que s'han col·locat en el DOM). Si ho intentes amb un component que encara no s'ha muntat (com ara cridar `findDOMNode()` dins de `render()` en un component que encara no s'ha creat) es llançarà una excepció.
>
> `findDOMNode` no es pot fer servir en components funcionals.

* * *
<<<<<<< HEAD

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, callback)
```

Crea un portal. Els portals proporcionen una manera de [renderitzar els fills en un node DOM que existeix fora de la jerarquia del component DOM](/docs/portals.html).
=======
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6
