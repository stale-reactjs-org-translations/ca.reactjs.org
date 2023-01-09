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
import * as ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## Resum {#overview}

<<<<<<< HEAD
Els mètodes següents es poden fer servir tant en entorns de servidor com de navegador:
=======
These methods are only available in the **environments with [Node.js Streams](https://nodejs.org/api/stream.html):**

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

These methods are only available in the **environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)** (this includes browsers, Deno, and some modern edge runtimes):

- [`renderToReadableStream()`](#rendertoreadablestream)

The following methods can be used in the environments that don't support streams:
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

<<<<<<< HEAD
Els mètodes addicionals que venen a continuació depenen d'un paquet (`stream`) que **només està disponible per a entorns de servidor**, i no funcionarà en els de navegador.

- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Referència {#reference}
=======
## Reference {#reference}
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

<<<<<<< HEAD
Renderitza un element React al seu HTML inicial. React retornarà una cadena HTML. Pots utilitzar-lo per generar l'HTML en el servidor i enviar el marcatge en la sol·licitud inicial per a càrregues de pàgina més eficients i facilitar que els motors de cerca rastregin les teves pàgines pel posicionament SEO.

Si apliques el mètode [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) en un node que ja ve renderitzat des del servirdor, React el preservarà i només hi afegirà els gestors d'esdeveniments, cosa que permetrà tenir una primera càrrega molt eficient.
=======
Render a React element to its initial HTML. Returns a stream with a `pipe(res)` method to pipe the output and `abort()` to abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" via inline `<script>` tags later. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```javascript
let didError = false;
const stream = renderToPipeableStream(
  <App />,
  {
    onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    onShellError(error) {
      // Something errored before we could complete the shell so we emit an alternative shell.
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    },
    onAllReady() {
      // If you don't want streaming, use this instead of onShellReady.
      // This will fire after the entire page content is ready.
      // You can use this for crawlers or static generation.

      // res.statusCode = didError ? 500 : 200;
      // res.setHeader('Content-type', 'text/html');
      // stream.pipe(res);
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  }
);
```

See the [full list of options](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L36-L46).

> Note:
>
> This is a Node.js-specific API. Environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), like Deno and modern edge runtimes, should use [`renderToReadableStream`](#rendertoreadablestream) instead.
>
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
ReactDOMServer.renderToReadableStream(element, options);
```

<<<<<<< HEAD
Semblant a [`renderToString`](#rendertostring), excepte que aquest no crea els atributs DOM extres que React fa servir internament, com per exemple `data-reactroot`. Aquest mètode és útil si vols fer servir React com un simple generador de pàgines estàtiques, ja que eliminar els atributs extres t'estalviarà alguns bytes.

En canvi si planeges fer servir React a la part del client per fer que el marcatge sigui interactiu, no facis servir aquest mètode. Fes servir, en lloc seu, [`renderToString`](#rendertostring) en el servidor i [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) en el client.
=======
Streams a React element to its initial HTML. Returns a Promise that resolves to a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```javascript
let controller = new AbortController();
let didError = false;
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
      onError(error) {
        didError = true;
        console.error(error);
      }
    }
  );
  
  // This is to wait for all Suspense boundaries to be ready. You can uncomment
  // this line if you want to buffer the entire HTML instead of streaming it.
  // You can use this for crawlers or static generation:

  // await stream.allReady;

  return new Response(stream, {
    status: didError ? 500 : 200,
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

See the [full list of options](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerBrowser.js#L27-L35).

> Note:
>
> This API depends on [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API). For Node.js, use [`renderToPipeableStream`](#rendertopipeablestream) instead.
>
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0

* * *

### `renderToNodeStream()`  (Deprecated) {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

<<<<<<< HEAD
Representa un element React al seu HTML inicial. Retorna una [seqüència de lectura](https://nodejs.org/api/doll#stream.html_dolls_llegibles) que genera una cadena HTML. La sortida d'HTML per aquesta seqüència és exactament igual a la que [`Reactdomserver.rendertostring`](#rendertostring) retornaria. Pots utilitzar-lo per generar l'HTML en el servidor i enviar el marcatge en la sol·licitud inicial per a càrregues de pàgina més eficients i facilitar que els motors de cerca rastregin les teves pàgines pel posicionament SEO.

Si apliques el mètode [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) en un node que ja ve renderitzat des del servirdor, React el preservarà i només hi afegirà els gestors d'esdeveniments, cosa que permetrà tenir una primera càrrega molt eficient.
=======
Render a React element to its initial HTML. Returns a [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) that outputs an HTML string. The HTML output by this stream is exactly equal to what [`ReactDOMServer.renderToString`](#rendertostring) would return. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0

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
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0

> Nota:
>
> Només al servidor. Aquesta API no està disponible en els navegadors.
>
<<<<<<< HEAD
> La seqüència retornada des d'aquest mètode serà un flux de bytes codificats en format utf-8. Si la necessites codificada en un altre format, fes una ullada al projecte [iconv-lite](https://www.npmjs.com/package/iconv-lite), que proporciona fluxs de transformació per a la transcodificació de text.
=======
> The stream returned from this method will return a byte stream encoded in utf-8. If you need a stream in another encoding, take a look at a project like [iconv-lite](https://www.npmjs.com/package/iconv-lite), which provides transform streams for transcoding text.

* * *

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Render a React element to its initial HTML. React will return an HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note
>
> This API has limited Suspense support and does not support streaming.
>
> On the server, it is recommended to use either [`renderToPipeableStream`](#rendertopipeablestream) (for Node.js) or [`renderToReadableStream`](#rendertoreadablestream) (for Web Streams) instead.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Similar to [`renderToString`](#rendertostring), except this doesn't create extra DOM attributes that React uses internally, such as `data-reactroot`. This is useful if you want to use React as a simple static page generator, as stripping away the extra attributes can save some bytes.

If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0
