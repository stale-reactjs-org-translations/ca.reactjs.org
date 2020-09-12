---
id: react-dom-server
title: ReactDOMServer
layout: docs
category: Reference
permalink: docs/react-dom-server.html
---

L'objecte `ReactDOMServer` fa possible que renderitzis components a un marcatge estàtic. Normalment, es fa servir en un servidor *Node*:

```js
// ES modules
import ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## Resum {#overview}

Els mètodes següents es poden fer servir tant en entorns de servidor com de navegador:

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

Els mètodes addicionals que venen a continuació depenen d'un paquet (`stream`) que *només està disponible per a servidor*, i no funcionarà en el navegador.

- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Referència {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Renderitza un element React al seu HTML inicial. React tornarà una cadena HTML. Pots fer servir aquest mètode per generar l'HTML en el servidor i enviar-lo en la sol·licitud inicial per tal que la pàgina carregui més ràpidament i també per permetre als motors de cerca rastrejar les teves pàgines pel seu posicionament *SEO*.

Si apliques el mètode [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) en un node que ja ve renderitzat des del servirdor, React el preservarà i només hi afegirà els gestors d'esdeveniments, cosa que et permetrà tenir una primera càrrega molt eficient.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Semblant a [`renderToString`](#rendertostring), excepte que aquest no crea els atributs DOM extres que React fa servir internament, com per exemple `data-reactroot`. Aquest mètode és útil si vols fer servir React com un simple generador de pàgines estàtiques, ja que eliminar els atributs extres et permetrà estalviar alguns bytes.

En canvi si planeges fer servir React a la part del client per fer que el marcatge sigui interactiu, no facis servir aquest mètode. Fes servir, en el seu lloc, [`renderToString`](#rendertostring) en el servidor i [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) a la part del client.

* * *

### `renderToNodeStream()` {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Representa un element React al seu HTML inicial. Retorna un [seqüència de lectura](https://nodejs.org/api/doll#stream.html_dolls_llegibles) que genera una cadena HTML. La sortida d'HTML per aquesta seqüència és exactament igual a la que [`Reactdomserver.rendertostring`](#rendertostring) retornaria. Pots utilitzar aquest mètode per generar HTML en el servidor i enviar el marcatge en la sol·licitud inicial per a càrregues de pàgina més ràpida i per facilitar que els motors de cerca rastregin les teves pàgines per al posicionament SEO.

Si apliques el mètode [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) en un node que ja ve renderitzat des del servirdor, React el preservarà i només hi afegirà els gestors d'esdeveniments, cosa que et permetrà tenir una primera càrrega molt eficient.

> Nota:
>
> Nomes-al-Servidor. Aquesta API no està disponible en els navegadors.
>
> La seqüència retornada des d'aquest mètode serà un flux de bytes codificats en format utf-8. Si necessites una seqüència codificada en un altre format, fes una ullada al projecte [iconv-lite](https://www.npmjs.com/package/iconv-lite), que proporciona fluxs de transformació per a la transcodificació de text.

* * *

### `renderToStaticNodeStream()` {#rendertostaticnodestream}

```javascript
ReactDOMServer.renderToStaticNodeStream(element)
```

Semblant a [`renderToNodeStream`](#rendertonodestream), excepte que aquest no crea els atributs DOM extres que React fa servir internament, com per exemple `data-reactroot`. Aquest mètode és útil si vols fer servir React com un simple generador de pàgines estàtiques, ja que eliminar els atributs extres et permetrà estalviar alguns bytes.

La sortida HTML d'aquest flux és exactament igual a la que obtindries amb [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup).

Si el que vols és fer servir React a la banda del client per fer que el marcatge sigui interactiu, no facis servir aquest mètode. Fes servir, en el seu lloc [`renderToNodeStream`](#rendertonodestream) a la part dels servidor i [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) a la part del client.

> Nota:
>
> Només-al-Servidor. Aquesta API no està disponible en els navegadors.
>
> La seqüència retornada des d'aquest mètode serà un flux de bytes codificats en format utf-8. Si necessites una seqüència codificada en un altre format, fes una ullada al projecte [iconv-lite](https://www.npmjs.com/package/iconv-lite), que proporciona fluxs de transformació per a la transcodificació de text.
