---
id: state-and-lifecycle
title: Estat i cicle de vida
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

Aquesta pàgina introdueix el concepte d'estat i cicle de vida en un component de React. Pots trobar una [referència detallada de l'API d'un component aquí](/docs/react-component.html).

Considerem l'exemple del rellotge d'[una de les seccions anteriors](/docs/rendering-elements.html#updating-the-rendered-element). A [renderitzant elements](/docs/rendering-elements.html#rendering-an-element-into-the-dg), vam aprendre només una manera d'actualitzar la interfície d'usuari: invocant `ReactDOM.render()` perquè canviï el resultat renderitzat.

```js{8-11}
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**Prova-ho a codepen**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

En aquesta secció, aprendrem com fer el component `Clock` veritablement reutilitzable i encapsulat. Configuraràs teu propi temporitzador i s'actualitzarà cada segon.

Podem començar per encapsular com es veu el rellotge:

```js{3-6,12}
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**Prova-ho a codepen**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

No obstant això, es perd un requisit crucial: el fet que `Clock` configuri un temporitzador i actualitzi la interfície d'usuari cada segon ha de ser un detall d'implementació de `Clock`.

Idealment, volem escriure això una vegada i que `Clock` s'actualitzi a si mateix:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Per implementar això, necessitem afegir "estat" al component `Clock`.

L'estat és similar a les props, però és privat i està completament controlat pel component.

## Convertir una funció en una classe {#converting-a-function-to-a-class}

Es pot convertir un component de funció com `Clock` en una classe en cinc passos:

1. Crear una [classe ES6](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Classes) amb el mateix nom que hereti de `React.Component`.

2. Afegir un únic mètode buit anomenat `render()`.

3. Moure el cos de la funció al mètode `render()`.

4. Substitueix `props` amb `this.props` en el cos de `render()`.

5. Elimina la resta de la declaració de la funció ja buida.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[**Prova-ho a codepen**](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

`Clock` ara es defineix com una classe en lloc d'una funció.

El mètode `render` s'invocarà cada vegada que ocorre una actualització; però, sempre que renderitzem `<Clock />` en el mateix node del DOM, es farà servir només una única instància de la classe `Clock`. Això ens permet utilitzar característiques addicionals com l'estat local i els mètodes de cicle de vida.

## Afegir estat local a una classe {#adding-local-state-to-a-class}

Mourem la data des de les props cap a l'estat en tres passos:

1) Substituir `this.props.date` per `this.state.date` al mètode `render()`:

```js{6}
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2) Afegir un [constructor de classe](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Classes#Constructor) que assigni el `this.state` inicial:

```js{4}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Nota com vam passar `props` al constructor base:

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

Els components de classe sempre han d'invocar al constructor base amb `props`.

3) Eliminar la prop `date` de l'element `<Clock />`:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Posteriorment tornarem a afegir el codi del temporitzador al mateix component.

El resultat és el següent:

```js{2-5,11,18}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**Prova-ho a codepen**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

A continuació, farem que `Clock` configuri el seu propi temporitzador i s'actualitzi cada segon.

## Afegir mètodes de cicle de vida a una classe {#adding-lifecycle-methods-to-a-class}

En aplicacions amb molts components, és molt important alliberar recursos presos pels components quan es destrueixen.

Volem [configurar un temporitzador](https://developer.mozilla.org/es/docs/Web/API/WindowTimers/setInterval) cada vegada que `Clock` es renderitzi al DOM per primera vegada. Això a React es diu "muntatge".

També volem [esborrar aquest temporitzador](https://developer.mozilla.org/es/docs/Web/API/WindowTimers/clearInterval) cada vegada que el DOM produït per `Clock` s'elimini. Això a React es diu "desmuntatge".

Podem declarar mètodes especials a la classe del component per executar algun codi quan un component es munta i desmunta:

```js{7-9,11-13}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Aquests mètodes són anomenats "mètodes de cicle de vida".

El mètode `componentDidMount()` s'executa després que la sortida del component ha estat renderitzada al DOM. Aquest és un bon lloc per configurar un temporitzador:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Pren nota de com guardem l'ID del temporitzador a `this`.

Si bé `this.props` és configurat pel mateix React i `this.state` té un significat especial, ets lliure d'afegir camps addicionals a la classe manualment si necessites emmagatzemar alguna cosa que no participa en el flux de dades (com l'ID d'un temporitzador).

Eliminarem el temporitzador en el mètode de cicle de vida `componentWillUnmount()`:

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Finalment, implementarem un mètode anomenat `tick()` que el component `Clock` executarà cada segon.

Utilitzarà `this.setState()` per programar actualitzacions a l'estat local del component.

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**Prova-ho a codepen**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

Ara el rellotge canvia cada segon.

Repassem ràpidament el que està succeint i l'ordre en què s'invoquen els mètodes:

1) Quan es passa `<Clock />` a `ReactDOM.render()`, React invoca al constructor del component `Clock`. Ja que `Clock` necessita mostrar l'hora actual, inicialitza `this.state` amb un objecte que inclou l'hora actual. Després actualitzarem aquest estat.

2) React invoca llavors al mètode `render()` del component `Clock`. Així és com React sap el que s'ha de mostrar en pantalla. React llavors actualitza el DOM perquè coincideixi amb la sortida del renderitzat de `Clock`.

3) Quan la sortida de `Clock` s'insereix al DOM, React invoca al mètode de cicle de vida `componentDidMount()`. Dins d'ell, el component `Clock` li demana al navegador que configuri un temporitzador per invocar el mètode `tick()` del component una vegada per segon.

4) Cada segon el navegador invoca al mètode `tick()`. Dins d'ell, el component `Clock` planifica una actualització de la interfície d'usuari a l'invocar `setState()` amb un objecte que conté l'hora actual. Gràcies a la invocació de `setState()`, React sap que l'estat ha canviat i invoca de nou al mètode `render()` per saber què ha d'estar a la pantalla. Aquest cop, `this.state.date` al mètode `render()` serà diferent, de manera que el resultat del renderitzat inclourà l'hora actualitzada. D'acord amb això React actualitza el DOM.

5) Si el component `Clock` s'elimina en algun moment del DOM, React invoca al mètode de cicle de vida `componentWillUnmount()`, de manera que el temporitzador s'atura.

## Utilitza l'estat correctament {#using-state-correctly}

Hi ha tres coses que cal saber sobre `setState()`.

### No modifiquis l'estat directament {#do-not-modify-state-directly}

Per exemple, això no tornarà a renderitzar un component:

```js
// Incorrecte
this.state.comment = 'Hello';
```

En el seu lloc utilitza `setState()`:

```js
// Correcte
this.setState({comment: 'Hello'});
```

L'únic lloc on pots assignar `this.state` és el constructor.

### Les actualitzacions de l'estat poden ser asíncrones {#state-updates-mai-be-asynchronous}

React pot agrupar diverses invocacions a `setState()` en una sola actualització per millorar el rendiment.

A causa que `this.props` i `this.state` poden actualitzar-se de forma asincrònica, no has de confiar en els seus valors per calcular el següent estat.

Per exemple, aquest codi pot fallar en actualitzar el comptador:

```js
// Incorrecte
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Per arreglar-ho, fa servir una segona forma de `setState()` que accepta una funció en lloc d'un objecte. Aquesta funció rebrà l'estat previ com a primer argument, i les props en el moment en què s'aplica l'actualització com a segon argument:

```js
// Correcte
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

En l'exemple hem usat una [funció fletxa](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/Arrow_functions), però es podria haver fet igualment amb funcions comunes:

```js
// Correcte
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### Les actualitzacions d'estat es fusionen {#state-updates-are-merged}

Quan invoques a `setState()`, React combina l'objecte que vas proporcionar amb l'estat actual.

Per exemple, el teu estat pot contenir diverses variables independents:

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Després pots actualitzar-les independentment amb invocacions separades a `setState()`:

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

La fusió és superficial, així que `this.setState({comments})` deixa intacte `this.state.posts`, però substitueix completament `this.state.comments`.

## Les dades flueixen cap avall {#the-data-flows-down}

Ni els components pares ni els fills poden saber si un determinat component té o no té estat i no els hauria d'importar si es defineix com una funció o una classe.

És per això que a l'estat sovint se l'anomena local o encapsulat. No és accessible des d'un altre component excepte d'aquell que el posseeix i l'assigna.

Un component pot triar passar el seu estat com props als seus components fills:

```js
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

Això també funciona per a components definits per l'usuari:

```js
<FormattedDate date={this.state.date} />
```

El component `FormattedDate` rebria `date` en els seus props i no sabria si ha vingut de l'estat de `Clock`, dels props de `Clock`, o si s'ha escrit manualment:

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

[**Prova-ho a codepen**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

A això comunament se l'anomena flux de dades "descendent" o "unidireccional"  Qualsevol estat sempre és propietat d'algun component específic, i qualsevol dada o interfície d'usuari derivats d'aquest estat només poden afectar els components "sota" d'ells en l'arbre.

Si imagineu un arbre de components com una cascada de props, l'estat de cada component és com una font d'aigua addicional que se li uneix en un punt arbitrari, però també flueix cap avall.

Per mostrar que tots els components estan veritablement aïllats, podem crear un component `App` que representi tres components `<Clock>`:

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[**Prova-ho a codepen**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

Cada `Clock` configura el seu propi temporitzador i s'actualitza de forma independent.

En les aplicacions de React, si un component té o no estat es considera un detall d'implementació del component que pot canviar amb el temps. Podeu fer servir components sense estat dins de components amb estat i viceversa.
