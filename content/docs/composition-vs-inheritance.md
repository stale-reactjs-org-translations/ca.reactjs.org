---
id: composition-vs-inheritance
title: Composició vs. herència
permalink: docs/composition-vs-inheritance.html
redirect_from:
  - "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

React té un model potent de composició, i recomanem usar composició en lloc d'herència per reusar codi entre components.

En aquesta secció, considerem alguns problemes que desenvolupadors nous a React solucionen amb herència, i mostrem com podem resoldre'ls amb composició.

## Contenció {#containment}

Alguns components no conèixen els seus fills anticipadament. Això és especialment comú per components com `Sidebar` o `Dialog` que representen "capces" genèriques.

Recomanem que aquests components emprin la prop especial `children` per passar elements fill directament al seu resultat:

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

Això permet que altres components els hi passin fills arbitraris niant JSX:

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

**[Prova-ho a CodePen](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)**

Qualsevol cosa a dins l'etiqueta JSX `<FancyBorder>` és passat a dins el component `FancyBorder` com una propietat `children`. Com que `FancyBorder` renderitza `{props.children}` a dins un `<div>`, els elements que han estat passats apareixen en el resultat final.

Mentre que això és menys comú, a vegades pot ser que necessitis diversos "buits" en un component. En aquests casos pots inventar-te la teva convenció en lloc d'usar `children`:

```js{5,8,18,21}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

Elements de React com `<Contacts />` i `<Chat />` són només objectes, així que pots passar-los com props com qualsevol altra dada. Aquesta forma pot recordar-te a "forats" en altres llibreries però no hi ha limitacions en el que pots passar com props a React.

## Especialització {#specialization}

Alguns cops creiem que els components són "casos especials" d'altres components. Per exemple, podem dir que un `WelcomeDialog` és un cas especial de `Dialog`.

A React, això també es pot aconseguir per composició, on un component més "específic" en renderitza un de més "genèric" i el configura amb props:

```js{5,8,16-18}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

La composició funciona igualment bé per a components definits com a classes:

```js{10,27-31}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## Llavors què passa amb l'herència? {#so-what-about-inheritance}

A Facebook, usem React a mils de components, i no hem trobat cap cas on recomanaríem crear jerarquies d'herència de components.

Props i composició et donen tota la flexibilitat que necessites per personalitzar l'aparença d'un component i el comportament d'una forma explícita i segura. Recorda que els components poden acceptar props arbitràries, inclosos valors primitius, elements de React, o funcions.

Si vols reusar funcionalitat que no sigui d'interfície d'usuari entre components, suggerim extreure-la en un mòdul de JavaScript separat. Els components poden importar-lo i usar aquella funció, objecte, o classe, sense extendre'ls.
