---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

Si carregus React des d'una etiqueta `<script>`, aquestes APIs de nivell superior estan disponibles en el `ReactDOM` global. Si s'utilitza ES6 amb npm, pots escriure `import ReactDOM from 'react-dom'`. Si utilitzes ES5 amb npm, pots escriure `var ReactDOM = require('react-dom')`.

## Resum {#overview}

El paquet `react-dom` proporciona mètodes específics del DOM que pots fer servir al nivell superior de la teva aplicació i com a escotilla per sortir del model React si cal. La majoria dels components no han de fer servir aquest mòdul.

- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)
- [`findDOMNode()`](#finddomnode)
- [`createPortal()`](#createportal)

### Suport del Navegador {#browser-support}

React suporta tots els navegadors populars, incloent Internet Explorer 9 i superior, encara que [alguns 'polyfills' són necessaris](/docs/javascript-environment-requirements.html) per a navegadors més antics com l'IE 9 i l'IE 10.

> Nota
>
> No donem suport als navegadors més antics que no suporten els mètodes ES5, però pot passar que les teves aplicacions funcionen en navegadors més antics si els polifills com ara [es5-shim i es5-sham](https://github.com/es-shims/es5-shim) s'inclouen a la pàgina. Si decideixes prendre aquest camí ho fas pel teu compte i risc.

* * *

## Referències {#reference}

### `render()` {#render}

```javascript
ReactDOM.render(element, container[, callback])
```

Renderitza un element React en el DOM en el `container` subministrat i retorna un [referència](/docs/more-about-refs.html) al component (o retorna `null` per [components sense estat](/docs/components-and-props.html#function-and-class-components)).

Si l'element React s'ha renderitzat prèviament en el `container`, farà una actualització seva i només mutarà el DOM en allò necessari per reflectir l'últim element de React.

Si es proporciona la crida de retorn opcional, s'executarà després que el component es renderitzi o s'actualitzi.

> Nota:
>
> `ReactDOM.render()` controla el contingut del node 'container' que s'hi passi. Qualsevol altre element DOM que sigui a dins es reemplaça quan es crida per primer cop. Les crides posteriors fan servir l'algoritme de comparació del DOM de React per fer actualitzacions eficients.
>
> `ReactDOM.render()` no modifica el node contenidor (només modifica els fills del contenidor). És possible inserir un component a un node DOM existent sense sobreescriure els fills existents.
>
> `ReactDOM.render()` actualment retorna una referència a la instància arrel `ReactComponent`. No obstant això, fer servir aquest valor de retorn és obsolet
> i s'ha d'evitar perquè les versions futures de React podran representar els components de forma asíncrona en alguns casos. Si necessites una referència a la instància arrel `ReactComponent`, la solució idònia és adjuntar una
> [callback ref](/docs/more-about-refs.html#the-ref-callback-attribute) a l'element arrel.
>
> Using `ReactDOM.render()` to hydrate a server-rendered container is deprecated and will be removed in React 17. Use [`hydrate()`](#hydrate) instead.

* * *

### `hydrate()` {#hydrate}

```javascript
ReactDOM.hydrate(element, container[, callback])
```

El mateix que [`render()`(#render), però s'utilitza per 'hidratar' un contenidor el contingut HTML del qual ha sigut renderitzat per [`ReactDOMServer`](/docs/react-dom-server.html). React intentarà adjuntar detectors d'esdeveniments al marcador existent.

React espera que el contingut renderitzat sigui idèntic entre el servidor i el client. Pot arreglar les diferències del contingut de text, però hauràs de tractar els desaparellaments com errors i solucionar-los. En el mode de desenvolupament, React adverteix sobre els desencaixos durant la hidratació. No hi ha garantia que les diferències d'atribut siguin arreglades en cas de desaparellaments. Això és important per raons de rendiment perquè en la majoria d'aplicacions, els desaparellaments són rars, i per tant, validar tots els marcadors seria massa costos.

Si l'atribut d'un sol element o el contingut del text és inevitablement diferent entre el servidor i el client (per exemple, una marca de temps), pots silenciar l'avís afegint `suppressHydrationWarning={true}` a l'element. Només funciona amb un nivell de profunditat, i està destinat a ser una via de fugida. No n'abusis. Excepte que sigui contingut de text, React encara no intentarà arreglar-lo, de manera que pot ser que no sigui coherent fins a futures actualitzacions.

Si heu de representar intencionadament quelcom diferent al servidor i al client, podeu fer una representació en dos passos. Els components que renderitzen quelcom diferent al client poden llegir una variable d'estat com `this.state.isClient`, que podeu establir a `true` en `componentDidMount()`. D'aquesta manera, en el pas inicial es renderitzarà el mateix contingut que en el servidor, evitant desaparellaments i  es produirà síncronament un pas addicional just després de la hidratació. Tingues en compte que aquest enfocament farà que els teus components siguin més lents perquè s'han de renderitzar dues vegades, per tant fes-lo servir amb cura.

Recorda tenir en compte l'experiència de l'usuari en connexions lentes. El codi JavaScript es pot carregar força més tard que la renderització HTML inicial, de manera que si es renderitza alguna cosa diferent només en la part del client, la transició pot ser jarring. No obstant això, si s'executa bé, pot ser beneficiós representar una shell de l'aplicació al servidor, i només mostrar alguns dels ginys addicionals en el client. Per a aprendre a fer-ho sense que hi hagi problemes de marcat que no coincideixin, consulteu l'explicació del paràgraf anterior.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
ReactDOM.unmountComponentAtNode(container)
```

Elimina un component de React muntat des del DOM i neteja els seus gestors d’esdeveniments i estat. Si no s'ha muntat cap component al contenidor, cridar aquesta funció no fa res. Retorna `true` si un component s'ha desmuntat i `false` si no hi ha cap component per desmuntar.

* * *

### `findDOMNode()` {#finddomnode}

> Nota:
>
> `findDOMNode` és una escotilla de sortida utilitzada per accedir al node DOM subjacent. En la majoria dels casos, l'ús d'aquesta sortida es desaconsella perquè trenca l'abstracció del component. [Ha quedat obsolet a `StrictMode`.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
ReactDOM.findDOMNode(component)
```
Si aquest component s'ha muntat en el DOM, retorna l'element corresponent del navegador natiu del DOM. Aquest mètode és útil per llegir els valors fora del DOM, com ara els valors de formulari i fer mesuraments de DOM. **En la majoria dels casos, podeu adjuntar una referència al node DOM i evitar utilitzar `find DOMNode`.**

Quan un component es renderitza a `null` o `false`, `findDOMNode` retorna `null`. Quan un component es renderitza a una cadena, `findDOMNode` retorna un node DOM que conté aquest valor. A partir de React 16, un component pot retornar un fragment amb diversos fills, en aquest cas `findDOMNode` retornarà el node DOM corresponent al primer fill que no estigui buit.

> Nota:
>
> `findDOMNode` només funciona amb components muntats (és a dir, components que s'han col·locat en el DOM). Si l'intenteu en un component que encara no s'ha muntat (com ara cridar `findDOMNode()` a `render()` en un component que encara no s'ha creat) es llançarà una excepció.
>
> `findDOMNode` no es pot fer servir en components funcionals.

* * *

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```

Crea un portal. Els portals proporcionen una manera de [renderitzar els fills en un node DOM que existeix fora de la jerarquia del component DOM](/docs/portals.html).
