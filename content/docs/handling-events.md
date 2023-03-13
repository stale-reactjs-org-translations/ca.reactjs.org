---
id: handling-events
title: Controlant esdeveniments
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

<<<<<<< HEAD
Controlar esdeveniments amb elements de React és molt similar a controlar esdeveniments amb elements del DOM. Hi ha algunes diferències sintàctiques:
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Responding to Events](https://beta.reactjs.org/learn/responding-to-events)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


Handling events with React elements is very similar to handling events on DOM elements. There are some syntax differences:
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

* Els esdeveniments de React s'anomenen usant camelCase, en lloc de minúscules.
* Amb JSX es passa una funció com el controlador de l'esdeveniment, en lloc d'un string.

Per exemple, en HTML:

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

és una mica diferent amb React:

```js{1}
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

Una altra diferència és que no pots retornar `false` per prevenir el comportament per defecte a React. Has de cridar `preventDefault` explícitament. Per exemple, amb HTML pur, per prevenir el comportament per defecte dels formularis quan s'envien, pots escriure:

```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

Però a React, això seria:

```js{3}
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

Aquí, `e` és un esdeveniment sintètic. React defineix aquests esdeveniments sintètics d'acord amb [l'especificaió W3C](https://www.w3.org/TR/DOM-Level-3-Events/), així que no necessites preocupar-te de la compatibilitat amb diferents navegadors. Els esdeveniments de React no funcionen exactament com els natius. Llegeix la referència [`SyntheticEvent`](/docs/events.html) per aprendre'n més.

Quan usis React no hauries de necessitar cridar `addEventListener` per afegir oients a un element del DOM després que sigui creat. Contràriament, només proveeix un oient quan l'element sigui renderitzar inicialment.

Quan defineixis un compoenent usant una [classe ES6](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Classes), un patró comú per un controlador d'esdeveniments és que aquest sigui un mètode de la classe. Per exemple, aquest component `Toggle` renderitza un botó que permet a l'usuari escollir entre els estats "ON" i "OFF":

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

Has d'anar amb compte amb el significat de `this` a callbacks de JSX. A JavaScript, els mètodes de classes no estan [lligats](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_objects/Function/bind) per defecte. Si t'oblides de lligar `this.handleClick` i passar-lo a `onClick`, `this` serà `undefined` quan la funció sigui relament cridada.

Aquest comportament no és específic de React; forma part de [com funcionen les funcions a JavaScript](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Generalment, si refereixes un mètode sense `()` després d'ell, com `onClick={this.handleClick}`, hauries de lligar aquell mètode.

<<<<<<< HEAD
Si cridar `bind` et molesta, hi ha dues formes d'evitar-ho. Si uses la sintaxi experimental de [camps públics de classes](https://babeljs.io/docs/plugins/transform-class-properties/), pots usar els camps de classes per lligar els callbacks correctament:
=======
If calling `bind` annoys you, there are two ways you can get around this. You can use [public class fields syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields) to correctly bind callbacks:
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

```js{2-6}
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is:', this);
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

Aquesta sintaxi està habilitada per defecte a [Create React App](https://github.com/facebookincubator/create-react-app).

Si no estàs usant la sintaxi de camps de classes, pots usar una [funció fletxa](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Functions/Arrow_functions) al callback:

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

El problema amb aquesta sintaxi és que un callback diferent és creat cada cop que `LoggingButton` és renderitzat. En la majoria dels casos, això ja està bé. No obstant això, si aquest callback es passa com a prop a components inferiors, aquests components podrien dur a terme renderitzats extra. Normalment recomanem lligar en el constructor o usar la sintaxi de camps de classes, per evitar aquest tipus de problemes.

## Passant arguments a controladors d'esdeveniments {#passing-arguments-to-event-handlers}

A dins un bucle és comú voler passar un paràmetre extra a un controlador d'esdeveniments. Per exemple, si `id` és l'ID fila, qualsevol dels següents funcionaria:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

Les dues línies anteriors són equivalents, i usen [funcions fletxa](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Functions/Arrow_functions) i [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) respectivament.

En els dos casos, l'argument `e` que representa l'esdeveniment de React es passa com a segon argument després de l'ID. Amb una funció fletxa, hem de passar-lo explícitament, però amb `bind` tots els arguments següents es passen automàticament.
