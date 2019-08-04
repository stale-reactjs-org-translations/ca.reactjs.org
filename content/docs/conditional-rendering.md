---
id: conditional-rendering
title: Renderitzat condicional
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

A React, pots crear diferents components que encapsulin el comportament que necessitis. Llavors, pots renderitzar-ne només alguns, depenent de l'estat de la teva aplicació.

El renderitzat condicional a React funciona de la mateixa manera que les condicions funcionen a JavaScript. Usa operadors de JavaScript com [`if`](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Statements/if...else) o l'[operador condicional](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) per crear elements que representin l'estat actual, i deixa que React actualitzi la interfície d'usuari per emparellar-los.

Considera aquests dos components:

```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

Crearem un component `Greeting` que mostri qualsevol d'aquests dos components depenent de si un usuari ha iniciat sessió:

```javascript{3-7,11,12}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

Aquest exemple renderitza una salutació diferent depenent del valor de la prop `isLoggedIn`.

### Variables d'elements {#element-variables}

Pots usar variables per emmagatzemar elements. Això pot ajudar-te a renderitzar condicionalment una part del component mentre la resta del resultat no canvia.

Considera aquests dos components nous que representen botons d'inici i fi de sessió:

```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

A l'exemple de sota, crearem un [component amb estat](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) anomenat `LoginControl`.

Renderitzarà qualsevol de `<LoginButton />` o `<LogoutButton />` depenent del seu estat actual. També renderitzarà un `<Greeting />` de l'exemple anterior:

```javascript{20-25,29,30}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

Tot i que declarar una variable i usar una sentència `if` és una bona forma de renderitzar condicionalment un component, a vegades pot ser que vulguis usar una altra sintaxi. Hi ha unes quantes formes de fer condicions en línia amb JSX, explicades a sota.

### If en una línia amb l'operador lògic && {#inline-if-with-logical--operator}

Pots [introduir qualsevol expressió amb JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx) embolicant-la entre claus. Això inclou l'operador lògic `&&` de JavaScript. Aquest pot ser útil per incloure un element condicionalment:

```js{6-10}
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

Funciona perquè a JavaScript, `true && expressió` sempre s'avalua a `expressió`, i `false && expressió` sempre s'avalua a `false`.

Així que, si la condició és `true`, l'element just després de `&&` apareixerà al resultat. Si és `false`, React l'ignorarà.

### If-Else en una línia amb operador condicional {#inline-if-else-with-conditional-operator}

Un altre mètode per renderitzar condicionalment elements en línia és usar l'operador condicional de JavaScript [`condició ? true : false`](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

A l'exemple de sota, l'usem per renderitzar condicionalment un petit bloc de text.

```javascript{5}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

També pot ser usat per expressions més llargues, però és menys obvi el que està passant:

```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

De la mateixa forma que a JavaScript, tu ets qui decideixes usar un estil apropiat basat en el qual tu i el teu equip considereu més llegible. També recorda que sempre que les condicions es tornen massa complexes, pot ser un bon moment per [extreure un component](/docs/components-and-props.html#extracting-components).

### Prevenir que un component es renderitzi {#preventing-component-from-rendering}

En casos estranys pots voler que un component s'amagui ell mateix encara que hagi estat renderitzat per un altre component. Per fer això retorna `null` en lloc del seu resultat de renderitzat.

A l'exemple de sota, `<WarningBanner />` es renderitza depenent del valor de la prop anomenada `warn`. Si el valor de la prop és `false`, el component no es renderitza:

```javascript{2-4,29}
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

Retornar `null` des del mètode `render` d'un component no afecta que es cridin els mètodes del seu cicle de vida. Per exexmple `componentDidUpdate` es seguirà cridant.
