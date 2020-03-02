---
id: rendering-elements
title: Renderitzant elements
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

Els elements són la unitat més petita de les aplicacions de React.

Un element descriu el que voleu veure a la pantalla:

```js
const element = <h1>Hola, món</h1>;
```

A diferència dels elements del DOM dels navegadors, els elements de React són objectes plans, i la seva creació és de baix cost. React DOM es cuida d'actualitzar el DOM per sincronitzar-se amb els elements de React.

> **Nota:**
>
> Un podria confondre els elements amb un altre concepte anomenat "components". En la [següent secció](/docs/components-and-props.html) parlarem de components. Els elements formen els components. Us recomanem aquesta secció abans de continuar.

## Renderitzant un element en el DOM {#rendering-an-element-in-the-dom}

Suposem que hi ha un `<div>` en alguna part del vostre fitxer HTML:

```html
<div id="root"></div>
```

En diem un node "arrel" perquè tot el que estigui dins d'ell serà gestionat per React DOM.

Les aplicacions construïdes solament amb React normalment tenen un únic node arrel al DOM. Si estàs integrant React en una aplicació existent, pots tenir tants nodes arrel del DOM aïllats com vulguis.

Per renderitzar un element de React en un node arrel del DOM, passa'ls tots dos a `ReactDOM.render()`:

`embed:rendering-elements/render-an-element.js`

[](codepen://rendering-elements/render-an-element)

Això mostra "Hello, world" a la pàgina.

## Actualitzant l'element renderitzat {#updating-the-rendered-element}

Els elements de React són [immutables](https://en.wikipedia.org/wiki/Immutable_object). Un cop crees un element, no pots canviar els seus fills o atributs. Un element és com un fotograma solitari en una pel·lícula: aquest representa la interfície d'usuari en cert punt en el temps.

Amb el nostre coneixement fins a aquest punt, l'única manera d'actualitzar la interfície d'usuari és creant un nou element, i passar-ho a `ReactDOM.render()`.

Considera aquest exemple d'un rellotge en marxa:

`embed:rendering-elements/update-rendered-element.js`

[](codepen://rendering-elements/update-rendered-element)

Aquest crida a `ReactDOM.render()` cada segon des d'un callback del ['setInterval()'](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval).

> **Nota:**
>
> A la pràctica, a la majoria de les aplicacions de React només es crida 'ReactDOM.render()' una vegada. En les següents seccions aprendrem com el codi es pot encapsular en [components amb estat](/docs/state-and-lifecycle.html).
>
> Recomanem que no et saltis cap tema perquè aquests es relacionen entre ells.

## React només actualitza el que cal {#react-only-updates-whats-necessary}

React DOM compara l'element i els seus fills amb l'element anterior, i només aplica les actualitzacions del DOM que són necessàries perquè el DOM estigui en l'estat desitjat.

Pots fer això inspeccionant l'[últim exemple](codepen://rendering-elements/update-rendered-element) amb les eines del navegador:

![Inspector del DOM mostrant actualitzacions diminutes](../images/docs/granular-dom-updates.gif)

<<<<<<< HEAD
Tot i que hem creat un element que descriu completament l'arbre de la interfície d'usuari en cada instant, React DOM només actualitza el node del qual el contingut ha canviat.
=======
Even though we create an element describing the whole UI tree on every tick, only the text node whose contents have changed gets updated by React DOM.
>>>>>>> 2ab1ca5007a37ca509863a212293f1c6b26d0afc

En la nostra experiència, pensar com s'hauria de veure en un moment donat la interfície d'usuari i no en com canviar-la en el temps elimina tota classe d'errors.
