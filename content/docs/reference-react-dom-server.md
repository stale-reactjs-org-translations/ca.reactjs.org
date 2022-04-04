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

Els mètodes addicionals que venen a continuació depenen d'un paquet (`stream`) que **només està disponible per a entorns de servidor**, i no funcionarà en els de navegador.

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToReadableStream()`](#rendertoreadablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Referència {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Renderitza un element React al seu HTML inicial. React retornarà una cadena HTML. Pots utilitzar-lo per generar l'HTML en el servidor i enviar el marcatge en la sol·licitud inicial per a càrregues de pàgina més eficients i facilitar que els motors de cerca rastregin les teves pàgines pel posicionament SEO.

<<<<<<< HEAD
Si apliques el mètode [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) en un node que ja ve renderitzat des del servirdor, React el preservarà i només hi afegirà els gestors d'esdeveniments, cosa que permetrà tenir una primera càrrega molt eficient.
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Semblant a [`renderToString`](#rendertostring), excepte que aquest no crea els atributs DOM extres que React fa servir internament, com per exemple `data-reactroot`. Aquest mètode és útil si vols fer servir React com un simple generador de pàgines estàtiques, ja que eliminar els atributs extres t'estalviarà alguns bytes.

<<<<<<< HEAD
En canvi si planeges fer servir React a la part del client per fer que el marcatge sigui interactiu, no facis servir aquest mètode. Fes servir, en lloc seu, [`renderToString`](#rendertostring) en el servidor i [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) en el client.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

Render a React element to its initial HTML. Returns a [Control object](https://github.com/facebook/react/blob/3f8990898309c61c817fbf663f5221d9a00d0eaa/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L49-L54) that allows you to pipe the output or abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" later through javascript execution. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note:
>
> This is a Node.js specific API and modern server environments should use renderToReadableStream instead.
>

```
const {pipe, abort} = renderToPipeableStream(
  <App />,
  {
    onAllReady() {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      pipe(res);
    },
    onShellError(x) {
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    }
  }
);
```

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
    ReactDOMServer.renderToReadableStream(element, options);
```

Streams a React element to its initial HTML. Returns a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```
let controller = new AbortController();
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
    }
  );
  
  // This is to wait for all suspense boundaries to be ready. You can uncomment
  // this line if you don't want to stream to the client
  // await stream.allReady;

  return new Response(stream, {
    headers: {'Content-Type': 'text/html'},
  });
} catch (error) {
  return new Response(
    '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>',
    {
      status: 500,
      headers: {'Content-Type': 'text/html'},
    }
  );
}
```
* * *

### `renderToNodeStream()` {#rendertonodestream} (Deprecated)

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Representa un element React al seu HTML inicial. Retorna una [seqüència de lectura](https://nodejs.org/api/doll#stream.html_dolls_llegibles) que genera una cadena HTML. La sortida d'HTML per aquesta seqüència és exactament igual a la que [`Reactdomserver.rendertostring`](#rendertostring) retornaria. Pots utilitzar-lo per generar l'HTML en el servidor i enviar el marcatge en la sol·licitud inicial per a càrregues de pàgina més eficients i facilitar que els motors de cerca rastregin les teves pàgines pel posicionament SEO.

<<<<<<< HEAD
Si apliques el mètode [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) en un node que ja ve renderitzat des del servirdor, React el preservarà i només hi afegirà els gestors d'esdeveniments, cosa que permetrà tenir una primera càrrega molt eficient.
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> Nota:
>
> Nomes-al-Servidor. Aquesta API no està disponible en els navegadors.
>
> La seqüència retornada des d'aquest mètode serà un flux de bytes codificats en format utf-8. Si la necessites en un altre format, fes una ullada al projecte [iconv-lite](https://www.npmjs.com/package/iconv-lite), que proporciona fluxs de transformació per a la transcodificació de text.

* * *

### `renderToStaticNodeStream()` {#rendertostaticnodestream}

```javascript
ReactDOMServer.renderToStaticNodeStream(element)
```

Semblant a [`renderToNodeStream`](#rendertonodestream), excepte que aquest no crea els atributs DOM extres que React fa servir internament, com per exemple `data-reactroot`. Aquest mètode és útil si vols fer servir React com un simple generador de pàgines estàtiques, ja que eliminar els atributs extres et permetrà estalviar alguns bytes.

La sortida HTML d'aquest flux és exactament igual a la que obtindries amb [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup).

<<<<<<< HEAD
Si el que vols és fer servir React a la banda del client per fer que el marcatge sigui interactiu, no facis servir aquest mètode. Fes servir, en el seu lloc [`renderToNodeStream`](#rendertonodestream) a la part dels servidor i [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) a la part del client.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToNodeStream`](#rendertonodestream) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> Nota:
>
> Només al servidor. Aquesta API no està disponible en els navegadors.
>
> La seqüència retornada des d'aquest mètode serà un flux de bytes codificats en format utf-8. Si la necessites codificada en un altre format, fes una ullada al projecte [iconv-lite](https://www.npmjs.com/package/iconv-lite), que proporciona fluxs de transformació per a la transcodificació de text.
