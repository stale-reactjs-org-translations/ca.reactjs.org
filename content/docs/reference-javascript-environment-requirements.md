---
id: javascript-environment-requirements
title: Requeriments de l'Entorn de JavaScript
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

<<<<<<< HEAD
React 16 depèn dels tipus de col·lecció [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) i [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). Si vols compatibilitat amb els navegadors i dispositius més antics que no poden proporcionar aquests productes de forma nativa (per exemple, IE < 11) o que tenen implementacions no compatibles (per exemple IE 11), considera incloure un *polyfill* global a la teva aplicació, com ara [core-js](https:github.com/zloirock/core-js).

Un entorn *polyfilled* de React 16 que faci servir *core-js* per fer-lo compatible amb els navegadors més antics es podria semblar a:
=======
React 18 supports all modern browsers (Edge, Firefox, Chrome, Safari, etc).

If you support older browsers and devices such as Internet Explorer which do not provide modern browser features natively or have non-compliant implementations, consider including a global polyfill in your bundled application.
>>>>>>> 664dd5736287e01a4557cd03c9a8736682911b34

Here is a list of the modern features React 18 uses:
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

React també depèn de `requestAnimationFrame` (fins i tot en entorns de test). 
Pots fer servir el paquet [raf](https://www.npmjs.com/package/raf) per a apedaçar `requestAnimationFrame`:

```js
import 'raf/polyfill';
```
=======
The correct polyfill for these features depend on your environment. For many users, you can configure your [Browserlist](https://github.com/browserslist/browserslist) settings. For others, you may need to import polyfills like [`core-js`](https://github.com/zloirock/core-js) directly.
>>>>>>> 664dd5736287e01a4557cd03c9a8736682911b34
