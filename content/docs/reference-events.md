---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

<<<<<<< HEAD
Aquesta guia de referència documenta el contenidor `SyntheticEvent` que forma part del sistema d'esdeveniments de React. Consulta la guia [Controlant esdeveniments](/docs/manage-events.html) per aprendre'n més.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Common components (e.g. `<div>`)](https://beta.reactjs.org/reference/react-dom/components/common)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

This reference guide documents the `SyntheticEvent` wrapper that forms part of React's Event System. See the [Handling Events](/docs/handling-events.html) guide to learn more.
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200

## Resum {#overview}

Als teus gestors d'esdeveniments se li passaran instàncies de `SyntheticEvent`, un contenidor compatible amb diversos navegadors que conté l'esdeveniment natiu del navegador. Té la mateixa interfície que l'esdeveniment natiu del navegador, incloent `stopPropagation()` i `preventDefault()`, excepte que els esdeveniments funcionen de forma idèntica a tots els navegadors.

Si creus que necessites l'esdeveniment natiu del navegador per alguna raó, només cal que facis servir l'atribut `nativeEvent` per obtenir-lo. Els esdeveniments sintètics són diferents dels esdeveniments natius del navegador i no es corresponen directament. Per exemple a `onMouseLeave` `event.nativeEvent` apuntarà a un esdeveniment `mouseout`. La relació específica no és part de l'API pública i pot canviar en qualsevol moment. Cada objecte `SyntheticEvent` té els següents atributs:

```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
void persist()
DOMEventTarget target
number timeStamp
string type
```

> Nota:
>
> A partir de la v17, `e.persist()` no fa res perquè `SyntheticEvent` ja no està [pooled](/docs/legacy-event-pooling.html).

> Nota:
>
> A partir de la v0.14, retornar `false` des d'un gestor d'esdeveniments ja no atura la propagació d'esdeveniments. Per tant, `e.stopPropagation()` o `e.preventionDefault()` s'han d'activar manualment, segons correspongui.

## Esdeveniments suportats {#supported-events}

React normalitza els esdeveniments perquè les seves propietats siguin coherents entre els diferents tipus de navegadors.

Els gestors d'esdeveniments que segueixen a continuació els desencadena un esdeveniment en la seva fase de propagació. Per registrar un gestor d'esdeveniments que es desencadeni a la fase de captura, cal afegir `Capture` al nom de l'esdeveniment; per exemple, en lloc d'utilitzar `onClick`, utilitzaríem `onClickCapture` per gestionar l'esdeveniment de clic a la fase de captura.

- [Esdeveniments de Porta-retalls](#clipboard-events)
- [Esdeveniments de Composició](#composition-events)
- [Esdeveniments de Teclat](#keyboard-events)
- [Esdeveniments d'Enfocament](#focus-events)
- [Esdeveniments de Formulari](#form-events)
- [Esdeveniments Genèrics](#generic-events)
- [Esdeveniments de Ratolí](#mouse-events)
- [Esdeveniments de Punter](#pointer-events)
- [Esdeveniments de Selecció](#selection-events)
- [Esdeveniments Tàctils](#touch-events)
- [Esdeveniments de UI](#ui-events)
- [Esdeveniments de Roda del Ratolí](#wheel-events)
- [Esdeveniments de Multimèdia](#media-events)
- [Esdeveniments d'Imatge](#image-events)
- [Esdeveniments d'Animació](#animation-events)
- [Esdeveniments de Transició](#transition-events)
- [Altres Esdeveniments](#other-events)

* * *

## Referència {#reference}

### Esdeveniments de Porta-retalls {#clipboard-events}

Nom dels esdeveniments:

```
onCopy onCut onPaste
```

Propietats:

```javascript
DOMDataTransfer clipboardData
```

* * *

### Esdeveniments de Composició {#composition-events}

Nom dels esdeveniments:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

Propietats:

```javascript
string data

```

* * *

### Esdeveniments de Teclat {#keyboard-events}

Nom dels esdeveniments:

```
onKeyDown onKeyPress onKeyUp
```

Propietats:

```javascript
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

La propietat `key` pot prendre qualsevol dels valors documentats en l'especificació [Esdeveniments del DOM de nivell 3 (en anglès)](https://www.w3.org/TR/uievents-key/#named-key-attribute-values).

* * *

### Esdeveniments d'Enfocament {#focus-events}

Nom dels esdeveniments:

```
onFocus onBlur
```

Aquests esdeveniments d'enfocament funcionen a tots els elements del DOM de React, no només als elements de formulari.

Propietats:

```js
DOMEventTarget relatedTarget
```

#### onFocus {#onfocus}

The `onFocus` event is called when the element (or some element inside of it) receives focus. For example, it's called when the user clicks on a text input.

```javascript
function Example() {
  return (
    <input
      onFocus={(e) => {
        console.log('Focused on input');
      }}
      placeholder="onFocus is triggered when you click this input."
    />
  )
}
```

#### onBlur {#onblur}

The `onBlur` event handler is called when focus has left the element (or left some element inside of it). For example, it's called when the user clicks outside of a focused text input.

```javascript
function Example() {
  return (
    <input
      onBlur={(e) => {
        console.log('Triggered because this input lost focus');
      }}
      placeholder="onBlur is triggered when you click this input and then you click outside of it."
    />
  )
}
```

#### Detecting Focus Entering and Leaving {#detecting-focus-entering-and-leaving}

You can use the `currentTarget` and `relatedTarget` to differentiate if the focusing or blurring events originated from _outside_ of the parent element. Here is a demo you can copy and paste that shows how to detect focusing a child, focusing the element itself, and focus entering or leaving the whole subtree.

```javascript
function Example() {
  return (
    <div
      tabIndex={1}
      onFocus={(e) => {
        if (e.currentTarget === e.target) {
          console.log('focused self');
        } else {
          console.log('focused child', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus entered self');
        }
      }}
      onBlur={(e) => {
        if (e.currentTarget === e.target) {
          console.log('unfocused self');
        } else {
          console.log('unfocused child', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus left self');
        }
      }}
    >
      <input id="1" />
      <input id="2" />
    </div>
  );
}
```

* * *

### Esdeveniments de Formulari {#form-events}

Nom dels esdeveniments:

```
onChange onInput onInvalid onReset onSubmit 
```

Per a més informació sobre l'esdeveniment onChange, consulta els [Formularis](/docs/forms.html).

* * *

### Esdeveniments Genèrics {#generic-events}

Nom dels esdeveniments:

```
onError onLoad
```

* * *

### Esdeveniments de Ratolí {#mouse-events}

Nom dels esdeveniments:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

Els esdeveniments `onMouseEnter` i `onMouseLeave` es propaguen des de l'element que es deixa fins a l'element on s'entra en lloc de fer la propagació normal i no tenen fase de captura.

Propietats:

```javascript
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

* * *

### Esdeveniments de Punter  {#pointer-events}

Nom dels esdeveniments:

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

Els esdeveniments `onPointerEnter` i `onPointerLeave` es propaguen des de l'element que es deixa fins a l'element on s'entra en lloc de fer la propagació normal i no tenen una fase de captura. 

Propietats:

Tal com es defineix a [W3 spec (en anglès)](https://www.w3.org/TR/pointerevents/), els esdeveniments del punter amplien els [Esdeveniments de Ratolí](#mouse-events) amb les següents propietats:

```javascript
number pointerId
number width
number height
number pressure
number tangentialPressure
number tiltX
number tiltY
number twist
string pointerType
boolean isPrimary
```

Una nota sobre la compatibilitat amb els diversos navegadors:

Els esdeveniments de punter encara no són compatibles en tots els navegadors (en el moment d'escriure aquest article, els navegadors compatibles són: Chrome, Firefox, Edge i Internet Explorer). React deliberadament no és compatible amb la resta de navegadors perquè un *polyfill* estàndard augmentaria significativament la mida del paquet `react-dom`.

Si la vostra aplicació requereix esdeveniments de punter, recomanem afegir un *polyfill* d'esdeveniments d'un altre proveïdor.

* * *

### Esdeveniments de Selecció {#selection-events}

Nom dels esdeveniments:

```
onSelect
```

* * *

### Esdeveniments Tàctils {#touch-events}

Nom dels esdeveniments:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

Propietats:

```javascript
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
```

* * *

### Esdeveniments de UI {#ui-events}

Nom dels esdeveniments:

```
onScroll
```

>Nota
>
>Començant amb React 17, l'esdveniment `onScroll` **no es propaga** a React. Això funciona igual que en navegador i evita la confusió quan elements embolcallats inicien esdveniments a un parent distant.

Propietats:

```javascript
number detail
DOMAbstractView view
```

* * *

### Esdeveniments de Roda de Ratolí {#wheel-events}

Nom dels esdeveniments:

```
onWheel
```

Propietats:

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### Esdeveniments de Multimèdia {#media-events}

Nom dels esdeveniments:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### Esdeveniments d'Imatge {#image-events}

Nom dels esdeveniments:

```
onLoad onError
```

* * *

### Esdeveniments d'Animació {#animation-events}

Nom dels esdeveniments:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

Propietats:

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### Esdeveniments de Transició {#transition-events}

Nom dels esdeveniments:

```
onTransitionEnd
```

Propietats:

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### Altres Esdeveniments {#other-events}

Nom dels esdeveniments:

```
onToggle
```
