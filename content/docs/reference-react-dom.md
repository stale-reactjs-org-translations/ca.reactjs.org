---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

Si carregues React des d'una etiqueta `<script>`, aquestes APIs de nivell superior estan disponibles en el `ReactDOM` global. Si fas servir ES6 amb npm, pots escriure `import ReactDOM from 'react-dom'`. Si utilitzes ES5 amb npm, pots escriure `var ReactDOM = require('react-dom')`.

## Resum {#overview}

El paquet `react-dom` proporciona mètodes específics del DOM que pots fer servir al nivell superior de la teva aplicació i com a escotilla per sortir del model React si cal. La majoria dels components no han de fer servir aquest mòdul.

- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)
- [`findDOMNode()`](#finddomnode)
- [`createPortal()`](#createportal)

### Navegadors Compatibles {#browser-support}

React és compatible amb tots els navegadors populars, incloent-hi Internet Explorer 9 i superiors, tot i que [fan falta alguns *polyfills*](/docs/javascript-environment-requirements.html) per als navegadors més antics com ara l'IE 9 i l'IE 10.

> Nota
>
> No garantim la compatibilitat amb els navegadors més antics que no suporten els mètodes ES5, però és possible que les teves aplicacions funcionin en navegadors més antics si els *polyfills* com ara [es5-shim i es5-sham](https://github.com/es-shims/es5-shim) s'inclouen a la pàgina. Si decideixes prendre aquest camí recorda que és sota la teva responsabilitat.

* * *

## Referències {#reference}

### `render()` {#render}

```javascript
ReactDOM.render(element, callback[, callback])
```

Renderitza un element React al DOM en el *callback* subministrat i retorna un [referència](/docs/more-about-refs.html) al component (o retorna `null` per a [components sense estat](/docs/components-and-props.html#function-and-class-components)).

Si l'element React s'ha renderitzat prèviament en el *callback*, en farà la seva actualització i només canviarà del DOM el que sigui necessari per reflectir l'últim element de React.

Si es proporciona la *callback* opcional, s'executarà després que el component es renderitzi o s'actualitzi.

> Nota:
>
> `ReactDOM.render()` controla el contingut del node *callback* que s'hi passi. Qualsevol altre element DOM que sigui al seu interior es substitueix quan es crida per primer cop. Les crides posteriors fan servir l'algoritme de comparació del DOM de React per fer actualitzacions eficients.
>
> `ReactDOM.render()` no modifica el node contenidor (només modifica els fills del contenidor). És possible inserir un component a un node DOM que ja existeix sense sobreescriure els fills existents.
>
<<<<<<< HEAD
> `ReactDOM.render()` actualment retorna una referència a la instància arrel `ReactComponent`. No obstant això, fer servir aquest valor de retorn és obsolet
> i s'ha d'evitar perquè les versions futures de React podran representar els components de forma asíncrona en alguns casos. Si necessites una referència a la instància arrel `ReactComponent`, la solució idònia és adjuntar una
> [callback ref](/docs/more-about-refs.html#the-ref-callback-attribute) a l'element arrel.
=======
> `ReactDOM.render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy
> and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a
> [callback ref](/docs/refs-and-the-dom.html#callback-refs) to the root element.
>>>>>>> 23d03a854ba21aeea0a03a0bd5185e0def9237d6
>
> Fer servir `ReactDOM.render()` per hidratar un contenidor amb renderització des del servidor és obsolet i s'eliminarà a la versió 17 de React. Fes servir en el seu lloc [`hydrate()`](#hydrate).

* * *

### `hydrate()` {#hydrate}

```javascript
ReactDOM.hydrate(element, callback[, callback])
```

El mateix que [`render()`](#render), però s'utilitza per 'hidratar' un contenidor el contingut HTML del qual ha sigut renderitzat per [`ReactDOMServer`](/docs/react-dom-server.html). React provarà d'adjuntar detectors d'esdeveniments al marcador existent.

React espera que el contingut renderitzat sigui idèntic entre el servidor i el client. Pot corregir les diferències del contingut de text, però hauràs de tractar les discordances com errors i solucionar-les. En el mode de desenvolupament, React adverteix sobre les discordances durant la hidratació. No hi ha garantia que les diferències d'atribut siguin arreglades en cas de discordança. Això és important per raons de rendiment perquè a la majoria d'aplicacions són rares les discordances, i per tant, validar tots els marcadors tindria un cost massa alt.

Si l'atribut d'un sol element o el contingut del text és inevitablement diferent entre el servidor i el client (per exemple, una marca de temps), pots silenciar l'avís afegint `suppressHydrationWarning={true}` a l'element. Només funciona amb un nivell de profunditat, i està destinat a ser una via de escapatòria. No n'abusis. Tret que sigui contingut de text, React no intentarà corregir-ho, de manera que pot ser que no sigui coherent fins a futures actualitzacions.

Si has de representar intencionadament quelcom diferent del servidor al client, pots fer-la en dos passos. Els components que renderitzen quelcom diferent del client poden llegir una variable d'estat com ara `this.state.isClient`, que pots establir a `true` dins de `componentDidMount()`. D'aquesta manera, en el pas inicial es renderitzarà el mateix contingut que en el servidor, evitant discordances i just després de la hidratació es renderitzarà síncronament un segon pas addicional. Tingues en compte que aquest enfocament farà que els teus components siguin més lents perquè s'han de renderitzar dues vegades, per tant fes-lo servir amb cura.

Recorda tenir en compte l'experiència d'usuari en connexions lentes. El codi JavaScript es pot carregar força més tard que la renderització HTML inicial, de manera que si es renderitza alguna cosa diferent només en la part del client, la transició pot ser que grinyoli. Tot i això, si s'executa bé, pot ser beneficiós representar una shell de l'aplicació al servidor, i només mostrar alguns dels ginys addicionals en el client. Per a aprendre a fer-ho sense que hi hagi problemes de discordances, consulta l'explicació del paràgraf anterior.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
ReactDOM.unmountComponentAtNode(callback)
```

Elimina un component de React muntat des del DOM i neteja els seus gestors d’esdeveniments i estat. Si no s'ha muntat cap component al contenidor, la crida a aquesta funció no fa res. Retorna `true` si un component s'ha desmuntat i `false` si no hi ha cap component per desmuntar.

* * *

### `findDOMNode()` {#finddomnode}

> Nota:
>
> `findDOMNode` és una escotilla de sortida feta servir per accedir al node DOM subjacent. En la majoria dels casos, l'ús d'aquesta sortida es desaconsella perquè trenca l'abstracció del component. [Ha quedat obsolet a l'`StrictMode`.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
ReactDOM.findDOMNode(component)
```
Si aquest component s'ha muntat en el DOM, retorna l'element corresponent del navegador natiu del DOM. Aquest mètode és útil per llegir els valors fora del DOM, com ara els valors de formulari i fer mesuraments de DOM. **En la majoria dels casos, pots adjuntar una referència al node DOM i així evitar utilitzar `find DOMNode`.**

Quan un component es renderitza a `null` o `false`, `findDOMNode` retorna `null`. Quan un component es renderitza a una cadena, `findDOMNode` retorna un node DOM que conté aquest valor. A partir de React 16, un component pot retornar un fragment amb diversos fills, en aquest cas `findDOMNode` retornarà el node DOM corresponent al primer fill que no estigui buit.

> Nota:
>
> `findDOMNode` només funciona amb components muntats (és a dir, components que s'han col·locat en el DOM). Si ho intentes amb un component que encara no s'ha muntat (com ara cridar `findDOMNode()` dins de `render()` en un component que encara no s'ha creat) es llançarà una excepció.
>
> `findDOMNode` no es pot fer servir en components funcionals.

* * *

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, callback)
```

Crea un portal. Els portals proporcionen una manera de [renderitzar els fills en un node DOM que existeix fora de la jerarquia del component DOM](/docs/portals.html).
