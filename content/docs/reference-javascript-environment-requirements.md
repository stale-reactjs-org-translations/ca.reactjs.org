---
id: javascript-environment-requirements
title: Requeriments de l'Entorn de JavaScript
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

React 16 depèn dels tipus de col·lecció [Map](https://developer.mozilla.org/ca/docs/Web/JavaScript/Referencia/Objectes_globals/Map) i [Set](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_Objects/Set). Si vols compatibilitat amb els navegadors i dispositius més antics que no poden proporcionar aquests productes de forma nativa (per exemple, IE < 11) o que tenen implementacions no compatibles (per exemple IE 11), considera incloure un *polyfill* global a la teva aplicació, com ara [core-js](https:github.com/zloirock/core-js) o [babel-polyfill](https:babeljs.io/docs/age).

Un entorn *polyfilled* de React 16 que faci servir *core-js* per fer-lo compatible amb els navegadors més antics es podria semblar a:

```js
import 'core-js/es/map';
import 'core-js/es/set';

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
