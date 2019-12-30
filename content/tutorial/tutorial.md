---
id: tutorial
title: "Tutorial: Introducció a React"
layout: tutorial
sectionid: tutorial
permalink: tutorial/tutorial.html
redirect_from:
  - "docs/tutorial.html"
  - "docs/why-react.html"
  - "docs/tutorial-ja-JP.html"
  - "docs/tutorial-ko-KR.html"
  - "docs/tutorial-zh-CN.html"
---

Aquest tutorial no assumeix cap coneixement previ sobre React.

## Abans de començar el tutorial {#before-we-start-the-tutorial}

Construirem un petit joc durant aquest tutorial. **Podries estar temptat a obviar-lo perquè tu no estàs construint jocs al dia a dia, però dóna-li una oportunitat.** Les tècniques que aprendràs al tutorial són fonamentals per a construir qualsevol aplicació de React, i dominar-les et donarà una comprensió profunda de React.

>Consell
>
>Aquest tutorial està dissenyat per a persones que prefereixen **aprendre fent**. Si tu prefereixes aprendre els conceptes des del principi, revisa la nostra [guia pas a pas](/docs/hello-world.html). Podries trobar aquest tutorial i la guia, complementàries entre si.

Aquest tutorial està dividit en diverses seccions:

* [Configuració per al tutorial](#setup-for-the-tutorial) et donarà un punt de partida per seguir el tutorial.
* [Visió general](#overview) t'ensenyarà **els fonaments** de React: components, props i estat.
* [Completant el joc](#completing-the-game) t'ensenyarà **les tècniques més comunes** en desenvolupament de React.
* [Afegint viatge a través del temps](#adding-time-travel) et donarà una **visió més profunda** de les fortaleses úniques de React.

No has de completar totes les seccions alhora per a poder treure partit del tutorial. Prova d'arribar tan lluny com puguis, fins i tot si només són una o dues seccions.

### Què estem construint? {#what-are-we-building}

En aquest tutorial, et mostrarem com construir un joc de tres en ratlla interactiu amb React.

Pots veure el que construirem aquí: **[Resultat Final](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. Si creus que el codi no té sentit, o si no estàs familiaritzat amb la sintaxi de codi, no et preocupis! L'objectiu d'aquest tutorial és ajudar-te a entendre React i la seva sintaxi.

Recomanem que revisis el joc de tres en ratlla abans de continuar amb el tutorial. Una de les característiques que notaràs és que hi ha una llista enumerada a la dreta del tauler del jugador. Aquesta llista dóna un historial de tots els moviments que han ocorregut en el joc, i es va actualitzant a mesura que el joc progressa.

Pots tancar el joc de tres en ratlla una vegada que et familiaritzis amb ell. Començarem des d'una plantilla més simple en aquest tutorial. El següent pas és preparar-te perquè puguis començar a construir el joc.

### Prerequisits {#prerequisites}

Assumim que tens certa familiaritat amb HTML i JavaScript, de totes maneres hauries de ser capaç d'entendre-ho tot fins i tot si véns d'un llenguatge de programació diferent. També suposem que estàs familiaritzat amb conceptes de programació com a funcions, objectes, arrays, i en menor mesura, classes.

Si necessites revisar JavaScript, et recomanem llegir [aquesta guia](https://developer.mozilla.org/ca/docs/Web/JavaScript/A_re-introduction_to_JavaScript). Tingues en compte que també fem servir algunes característiques d'ES6, una versió recent de JavaScript. En aquest tutorial, estem fent servir [funcions fletxa](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [classes](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Classes), sentències [`let`](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Statements/let) i [`const`](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Statements/const). Pots fer servir [Babel REPL](babel://es5-syntax-example) per revisar a quin codi compila ES6.

## Configuració per al tutorial {#setup-for-the-tutorial}

Hi ha dues maneres de completar aquest tutorial: pots escriure el codi al teu navegador, o pots configurar el teu entorn de desenvolupament local en el teu ordinador.

### Opció 1: Escriu codi al navegador {#setup-option-1-write-code-in-the-browser}

Aquesta és la manera més ràpida de començar!

Primer, obre aquest **[codi inicial](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)** en una nova pestanya. La nova pestanya haurà de mostrar un tauler buit del joc de tres en ratlla i codi de React. Estarem editant el codi de React en aquest tutorial.

Ara pots saltar a la segona opció de configuració o anar a la secció de [visió general](#overview) per obtenir una idea general de React.

### Opció 2: Entorn de desenvolupament local {#setup-option-2-local-development-environment}

Aquesta és completament opcional i no és requerida per a aquest tutorial!

<br>

<details>

<summary><b>Opcional: Instruccions per seguir endavant localment utilitzant el teu editor de text preferit</b></summary>

Aquesta configuració requereix més feina però et permet completar el tutorial usant un editor de la teva elecció. Aquí els passos a seguir:

1. Assegura't de tenir una versió recent de [NODE.JS](https://nodejs.org/en/) instal·lada.
2. Segueix les [instruccions d'instal·lació de Create React App](/docs/create-a-new-react-app.html#create-react-app) per fer un nou projecte.

```bash
npx create-react-app mi-app
```

3. Elimina tots els arxius a la carpeta `src/` del nou projecte.

> Nota:
>
> **No eliminis la carpeta `src` per complet, només els arxius de codi font originals dins d'ella**. Reemplaçarem els arxius de codi font per defecte amb exemples per a aquest projecte en el següent pas.

```bash
cd my-app
cd src

# Si fas servir Mac o Linux:
rm -f *

# O, si fas servir Windows:
del *

# Després, torna a la carpeta del projecte
cd ..
```

4. Afegeix un fitxer anomenat `index.css` a la carpeta `src/` amb [aquest codi CSS](https://codepen.io/gaearon/pen/oWWQNa?editors=0100).

5. Afegeix un fitxer anomenat `index.js` a la carpeta `src/` amb [aquest codi JS](https://codepen.io/gaearon/pen/oWWQNa?editors=0010).

6. Afegeix aquestes 3 línies a la part superior de l'arxiu `index.js` a la carpeta `src/`:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```

Ara, si executes `npm start` a la carpeta del projecte i obres `http://localhost:3000` al navegador, hauries de veure un camp de tres en ratlla buit.

Recomanem seguir [aquestes instruccions](https://babeljs.io/docs/editors/) per configurar el ressaltat de sintaxi per al teu editor.

</details>

### Ajuda, estic encallat! {#help-im-stuck}

<<<<<<< HEAD
Si t'encalles, revisa els [recursos de suport de la comunitat](/community/support.html). En particular, [xat de React i flux](https://discord.gg/0ZcbPKXt5bZjGY5n) és una gran manera d'obtenir ajuda ràpidament. Si no reps una resposta, o segueixes encallat, si us plau crea un issue, i t'ajudarem.
=======
If you get stuck, check out the [community support resources](/community/support.html). In particular, [Reactiflux Chat](https://discord.gg/reactiflux) is a great way to get help quickly. If you don't receive an answer, or if you remain stuck, please file an issue, and we'll help you out.
>>>>>>> 5b6ad388804aaa5cf5504ccd04329f52960e17ae

## Visió general {#overview}

Ara que està el teu entorn configurat, t'ensenyarem una visió general de React!

### Què és React? {#what-is-react}

React és una llibreria de JavaScript declarativa, eficient i flexible per construir interfícies d'usuari. Permet compondre interfícies complexes de petites i aïllades peces de codi anomenades "components".

React té pocs tipus diferents de components, però comencem amb la subclasse `React.Component`:

```javascript
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Llista de compres per {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Ús d'exemple: <ShoppingList name="Mark" />
```

Aviat pararem atenció a les etiquetes que semblen XML. Fem servir components per dir-li a React el que volem que es vegi a la pantalla. Quan les nostres dades canviïn, React actualitzarà eficientment i tornarà a renderitzar els nostres components.

Aquí, ShoppingList és una **classe de component de React**, o **tipus de component de React**. Un component accepta paràmetres, anomenats `props` (abreviatura de "propietats"), i retorna una jerarquia de vistes a mostrar a través del mètode `render`.

El mètode `render` retorna una *descripció* del que vols veure a la pantalla. React pren la descripció i mostra el resultat. En particular, `render` retorna un **element de React**, el qual és una lleugera descripció del que cal renderitzar. La majoria de desenvolupadors de React usen una sintaxi especial anomenada "JSX" que facilita l'escriptura d'aquestes estructures. La sintaxi `<div />` és transformada en temps de construcció (build time) a `React.createElement('div')`. L'exemple anterior és equivalent a:

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

[Veure la versió completa estesa.](babel://tutorial-expanded-version)

Si tens curiositat, `createElement()` està descrit en més detall a la [referència de l'API](/docs/react-api.html#createelement), però no ho farem servir en aquest tutorial. En canvi, seguirem fent servir JSX.

JSX ve amb tot el poder de JavaScript. Pots posar *qualsevol* expressió de JavaScript en l'interior de les claus dins de JSX. Cada element de React és un objecte de JavaScript que pots emmagatzemar en una variable o passar al voltant del teu programa.

El component anterior `ShoppingList` només renderitza components preconstruïts del DOM com `<div />` i `<li />`. Però, també pots compondre i renderitzar components personalitzats de React. Per exemple, ara podem referir-nos al llistat complet de compres escrivint `<ShoppingList />`. Cada compoent de React està encapsulat i pot operar independentment; això et permet construir interfícies complexes des de components simples.

## Inspeccionant el codi inicial {#inspecting-the-starter-code}

Si treballes amb el tutorial **al navegador,** obre aquest codi en una nova pestanya: **[Codi inicial](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Si treballes **localment**, obre `src/index.js` a la carpeta del teu projecte (ja has tocat aquest arxiu durant la [configuració](#setup-option-2-local-development-environment)).

Aquest codi inicial és la base del que estàs construint. Ens han proveït els estils de CSS així que només necessites enfocar-te a aprendre React i programar el joc tres en ratlla.

Inspeccionant el codi, notaràs que tenim 3 components de React:

* Square
* Board
* Game

El component Square renderitza un simple `<button>` i el Board renderitza 9 quadrats. El component Game renderitza una taula amb valors de posició per defecte que modificarem després. Actualment no hi ha components interactius.

### Passant dades a través de props {#passing-data-through-props}

Només per embrutar-nos les mans, passarem algunes dades del nostre component Board al nostre component Square.

Recomanem fermament escriure el codi a mà mentre segueixes el tutorial sense copiar i enganxar. Això t'ajudarà a desenvolupar una memòria muscular i una entesa més sòlida.

Al mètode `renderSquare` de Board, canvia el codi per a passar una prop anomenada `value` a Square:

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}
```

Canvia el mètode `render` de Square per mostrar aquest valor, reemplaçant `{/* TODO */}` amb `{this.props.value}`:

```js{5}
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```

abans:

![React Devtools Library](../images/tutorial/tictac-empty.png)

Després: Hauries de veure un número a cada quadrat del resultat renderitzat.

![React Devtools Library](../images/tutorial/tictac-numbers.png)

**[Veure el codi complet en aquest punt](https://codepen.io/gaearon/pen/aWWQOG?editors=0010)**

Felicitats! Acabes de "passar una prop" d'un component pare Board a un component fill Square. Passant props és com la informació flueix en apps de React, de pares a fills.

### Fent un component interactiu {#making-an-interactive-component}

Omplirem el component Square amb una "X" quan li fem clic.
Primer, canviarem l'etiqueta button que és retornada del mètode `render()` del component Square pel següent codi:

```javascript{4}
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() {alert('clic'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

Si fas clic a un quadrat ara, hauries de veure un avís al teu navegador.

> Nota
>
> Per continuar escrivint codi sense problemes i evitar el [confús comportament de `this`](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/), farem servir la [sintaxi de funcions fletxa](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) per manejar esdeveniments aquí i més avall:
>
>```javascript{4}
>class Square extends React.Component {
>  render() {
>    return (
>      <button className="square" onClick={() => alert('clic')}>
>        {this.props.value}
>      </button>
>    );
>  }
>}
>```
>
> Tingues en compte com amb `onClick={() => alert('clic')}`, estem passant *una funció* com a valor de la prop `onClick`. React només cridarà aquesta funció després d'un clic. Oblidar `() =>` i escriure `onClick={alert('clic')}` és un error comú, i executaria l'alerta cada vegada que el component es rerenderitzi.

Com un següent pas, volem que el component Square "recordi" que va ser clicat, i s'ompli amb una "X". Per "recordar" coses, els components fan servir l'**estat**.

Els components de React poden tenir estat establint `this.state` als seus constructors. `this.state` ha de ser considerat com privat pel component de React en que és definit. Emmagatzemarem el valor actual d'un quadrat a `this.state`, i el canviarem quan el quadrat sigui clicat.

Primer, afegim el constructor a la classe per inicialitzar l'estat:

```javascript{2-7}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
  }
}
```

> Nota
>
> A les [classes de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes), necessites sempre cridar `super` quan defineixes el constructor d'una subclasse. Totes les classes de components de React que tenen un `constructor` han de començar amb una crida a ` super(props) `.

Ara canviarem el mètode `render` de Square per mostrar el valor de l'estat actual quan és clicat:

* Canvia `this.props.value` per `this.state.value` dins de l'etiqueta `<button>`.
* Canvia el gestor d'esdeveniment `onClick={...}` per `onClick={() => this.setState ({value: 'X'})}`.
* Posa les props `className` i `onClick` en línies separades per millor llegibilitat.

Després d'aquests canvis, l'etiqueta `<button>` que és retornada del mètode `render` de Square es veu així:

```javascript{12-13,15}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}
```

Cridant a `this.setState` des del gestor `onClick` al mètode `render` de Square, diem a React que rerenderitzi el quadrat sempre que la seva `<button>` és clicada. Després de l'actualització, el `this.state.value` del quadrat serà `'X'`, així que veurem `X` al tauler de joc. Si tu fas clic a qualsevol quadrat, una `X` s'hauria de mostrar al mateix.

Quan crides `setState` a un component, React actualitza automàticament els components fills dins el mateix també.

**[Veure el codi complet en aquest punt](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### Eines de desenvolupament {#developer-tools}

L'extensió de React DevTools Library per [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) i [Firefox](https://addons.mozilla.org/a-uS/firefox/addon/react-devtools/) et permet inspeccionar l'arbre de components de React amb les teves eines de desenvolupament del navegador.

<img src="../images/tutorial/devtools.png" alt="React Devtools Library" style="max-width: 100%">

React DevTools et permet revisar les props i l'estat dels teus components de React.

<<<<<<< HEAD
Després d'instal·lar React DevTools, pots fer clic dret a qualsevol element de la pàgina, clic a "Inspeccionar element" per obrir les eines de desenvolupament, i la pestanya de React apareixerà com l'última pestanya a la dreta.
=======
After installing React DevTools, you can right-click on any element on the page, click "Inspect" to open the developer tools, and the React tabs ("⚛️ Components" and "⚛️ Profiler") will appear as the last tabs to the right. Use "⚛️ Components" to inspect the component tree.
>>>>>>> 5b6ad388804aaa5cf5504ccd04329f52960e17ae

**No obstant això, notar que hi ha uns quants passos extres per fer-lo funcionar amb CodePen:**

1. Entra o registra't i confirma el teu correu electrònic (requerit per prevenir spam).
2. Clic al botó "Fork".
3. Click a "Change View" i després selecciona "Debug mode".
4. A la nova pestanya que s'obre, les DevTools ara haurien de tenir una pestanya de React.

## Completant el joc {#completing-the-game}

Ara tenim els blocs de construcció bàsics per al nostre joc de tres en ratlla. Per completar el joc, necessitem alternar col·locant "X" i "O" al tauler, i necessites una manera de determinar el guanyador.

### Elevant l'estat {#lifting-state-up}

Actualment, cada component Square manté l'estat del joc. Per determinar un guanyador, necessitem mantenir el valor de cada un dels 9 quadrats a un sol lloc.

Podríem pensar que el tauler simplement hauria de preguntar a cada quadrat pel seu estat. Encara que aquest enfocament és possible en React, t'incentivem a què no ho facis servir perquè el codi es torna difícil d'entendre, susceptible a errors, i difícil de refactorizar. Enlloc seu, el millor enfocament és emmagatzemar l'estat del joc al component pare Board en comptes de cada component Square. El component Board pot dir-li a cada quadrat què mostrar passant-li un prop [tal com hem fet quan hem passat un número a cada quadrat](#passing-data-through-props).

**Per recopilar dades de múltiples fills, o tenir dos components fills comunicats entre si, necessites declarar l'estat compartit al seu component pare. El component pare pot passar l'estat cap als fills usant props; això manté els components fills sincronitzats entre ells i amb el seu component pare.**

Elevar l'estat al component pare és comú quan components de React són refactoritzats, fem servir aquesta oportunitat per intentar-ho.

Afegeix un constructor al Board i estableix l'estat inicial de Board per contenir un array amb 9 valors null. Aquests 9 nulls corresponen als 9 quadrats:

```javascript{2-7}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={i} />;
  }
```

Després, quan omplim el tauler, l'array `this.state.squares` tindrà el següent aspecte:

```javascript
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

El mètode `renderSquare` del component Board actualment es veu així:

```javascript
  renderSquare(i) {
    return <Square value={i} />;
  }
```

Al principi, [passem el prop `value`](#passing-data-through-props) des del Board per mostrar els números de 0 a 8 a cada quadrat. En un pas previ, reemplacem els números amb una marca "X" [determinat per l'estat del propi Square](#making-an-interactive-component). Això és perquè el quadrat actualment ignora el prop `value` passat pel Board.

Ara farem servir el prop passant el mecanisme altra vegada. Modificarem el Board per instruir cada Square sobre el seu valor actual (`'X'`,`'O'`, o `null`). Ja tenim definit l'array `squares` al constructor del Board, i modificarem el mètode` renderSquare` perquè el llegeixi des d'allà:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[Veure el codi complet en aquest punt](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

Cada Square ara rebrà un prop `value` que serà `'X'`, `'O'`, o `null` per quadrats buits.

Després, ens cal canviar el que passa quan un quadrat és clicat. El component Board ara manté quins quadrats estan omplerts. Necessitem crear un mètode perquè el quadrat actualitzi l'estat del component Board. A causa que l'estat és considerat privat al component que el defineix, no podem actualitzar l'estat de Board directament des de Square.

En canvi, passarem una funció com prop des del Board a Square i farem que Square cridi a aquesta funció quan un quadrat sigui clicat. Canviarem el mètode `renderSquare` a Board a:

```javascript{5}
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
```

> Nota
>
> Dividim l'element retornat en múltiples línies per llegibilitat, i afegim parèntesi perquè JavaScript no insereixi un punt i coma després del `return` i trenqui el nostre codi.

Ara estem passant dues props des Board a Square: `value` i `onClick`. El prop `onClick` és una funció que Square pot cridar quan sigui clicat. Farem els següents canvis a Square:

* Substituir `this.state.value` per `this.props.value` al mètode `render` de Square
* Substituir `this.setState()` per `this.props.onClick()` al mètode `render` de Square
* Eliminar el `constructor` de Square perquè el component ja no faci el seguiment de l'estat del joc

Després d'aquests canvis, el component Square té aquesta pinta:

```javascript{1,2,6,8}
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
```

Quan un quadrat és clicat, la funció `onClick` proveïda pel component Board és cridada. Fem un repàs de com hem aconseguit això:

1. El prop `onClick` al component preconstruït del DOM `<button>` li diu a React per establir un escoltador de l'esdeveniment clic.
2. Quan el botó és clicat, React trucarà al gestor d'esdeveniment `onClick` que està definit al mètode `render()` de Square.
3. Aquest gestor d'esdeveniment crida a `this.props.onClick()`. El prop `onClick` del component Square va ser especificat pel component Board.
4. Com que el Board va passar `onClick={() => this.handleClick(i)}` a Square, el component Square crida a `this.handleClick(i)` quan és clicat.
5. No tenim definit el mètode `handleClick()`, així que el nostre codi falla. Si fas clic ara veuràs una pantalla vermella d'error que diu alguna cosa com *"this.handleClick is not a function"* (this.handleClick no és una funció).

> Nota
>
> L'atribut `onClick` de l'element `<button>` del DOM té un significat especial per a React perquè és un component preconstruït. Per components personalitzats com Square, la nomenclatura la decideixes tu. Podríem donar-li qualsevol nom al prop `onClick` de Square o al mètode `handleClick` de Board, i el codi funcionaria de la mateixa forma. En React, però, és una convenció usar els noms `on[Event]` per props que representen esdeveniments i `handle[Event]` per als mètodes que manegen els esdeveniments.

Quan intentem clicar un quadrat, hauríem d'obtenir un error perquè no hem definit `handleClick` encara. Ara afegirem `handleClick` a la classe Board:

```javascript{9-13}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[Veure el codi complet en aquest punt](https://codepen.io/gaearon/pen/ybbQJX?editors=0010)**

Després d'aquests canvis, podem clicar novament els quadrats per omplir-los de la mateixa manera que ho hem fet abans. No obstant això, ara l'estat està emmagatzemat al component Board en lloc de cada component Square. Quan l'estat del Board canvia, els components Square es rerenderitzen automàticament. Mantenir l'estat de tots els quadrats al component Board ens permetrà determinar el guanyador al futur.

A causa que el component Square ara no manté estat, els components Square reben valors del component Board i informen al mateix quan són clicats. En termes de React, els components Square ara són **components controlats**. El component Board té control complet sobre ells.

Notar com a `handleClick`, cridem `.slice()` per crear una còpia de l'array de `squares` per modificar-lo en comptes de modificar l'array existent. Ara explicarem per què crear una còpia de l'array `squares` en la següent secció.

### Per què és important la immutabilitat? {#why-immutability-is-important}

A l'exemple de codi anterior, hem suggerit que usessis el mètode `.slice()` per crear una còpia de l'array de `squares` per modificar-lo en comptes de modificar l'array existent. Ara discutirem la immutabilitat i per què és important aprendre-la.

Hi ha generalment dos enfocaments per canviar dades. El primer enfocament és *mutar* les dades directament canviant els seus valors. El segon enfocament és reemplaçar les dades amb una nova còpia que té els canvis desitjats.

#### Canvi de dades amb mutació {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Ara `player` és {score: 2, name: 'Jeff'}
```

#### Canvi de dades sense mutació {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Ara `player` no ha canviat, però` newPlayer` és {score: 2, name: 'Jeff'}

// O si fas servir la sintaxi proposada de propagació d'objecte, pots escriure:
// var newPlayer={... player, score: 2};
```

El resultat final és el mateix, però com que no mutem (o canviem les dades subjacents) directament, obtenim molts beneficis descrits a continuació.

#### Funcionalitats complexes es tornen simples {#complex-features-become-simple}

La immutabilitat fa que funcionalitats complexes siguin molt més fàcil d'implementar. Després en aquest tutorial, implementarem una funcionalitat de "viatge a través del temps" que ens permet repassar l'historial del joc tres en ratlla i "tornar" a moviments previs. Aquesta funcionalitat no és específica de jocs, una habilitat de desfer i refer certes accions és un requeriment comú en aplicacions. Evitar la mutació de dades directament ens permet mantenir intactes versions prèvies de l'historial del joc, i reusar després.

#### Detectar canvis {#detecting-changes}

Detectar canvis en objectes mutables és difícil perquè són modificats directament. Aquesta detecció requereix que els objectes mutables siguin comparats a la còpia prèvia del mateix i que l'arbre sencer de l'objecte sigui recorregut.

Detectar canvis en objectes immutables és considerablement més senzill. Si l'objecte immutable que està sent referenciat és diferent de l'anterior, vol dir que l'objecte ha canviat.

#### Determinar quan rerenderitzar en React {#determining-when-to-re-render-in-react}

El benefici principal d'immutabilitat és que t'ajuda a construir _components purs_ a React. Dades immutables poden determinar fàcilment si s'han realitzat canvis, que ajuda també a determinar quan un component requereix ser rerenderitzat.

Pots aprendre més sobre `shouldComponentUpdate()` i com pots construir *components purs* llegint [Optimitzant el rendiment](/docs/optimizing-performance.html#examples).

### Funcions com a components {#function-components}

Ara canviarem el component Square a ser un **funció com a component**.

A React, **funcions com a components** són una forma més simple d'escriure components que només contenen un mètode `render` i no tenen estat propi. En lloc de definir una classe que extén `React.Component`, podem escriure una funció que pren `props` com a paràmetres i retorna el que s'ha de renderitzar. Funcions com a components són menys tediosos d'escriure que classes, i molts components poden ser expressats d'aquesta manera.

Reemplaça la classe Square per aquesta funció:

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

Hem canviat `this.props` per `props` les dues vegades que apareix.

**[Veure el codi complet en aquest punt](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

> Nota
>
> Quan modifiquem el component Square a ser un component de funció, també hem canviat `onClick={() => this.props.onClick()}` a una més curta `onClick={props.onClick}` (notar la manca de parèntesi en *amdós* costats).

### Prenent torns {#taking-turns}

Ara ens cal corregir un defecte obvi en el nostre joc tres en ratlla: les "O" no poden ser marcades al tauler.

Establirem que el primer moviment sigui una "X" per defecte. Podem establir el valor per defecte modificant l'estat inicial en el nostre constructor del component Board:

```javascript{6}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
```

Cada vegada que el jugador faci un moviment, `xIsNext` (un booleà) serà invertit per determinar quin jugador segueix i l'estat del joc serà desat. Actualitzarem la funció `handleClick` del component Board per invertir el valor de `xIsNext`:

```javascript{3,6}
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

Amb aquest canvi, "X"s i "O"s poden prendre torns. Intenta-ho!

També canviarem el text de "status" al `render` del Board perquè mostri quin jugador té el següent torn:

```javascript{2}
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // la resta no ha canviat
```

Després d'aplicar aquests canvis, hauríem de tenir aquest component Board:

```javascript{6,11-16,29}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[Veure el codi complert en aquest punt](https://codepen.io/gaearon/pen/KmmrBy?editors=0010)**

### Declarant un guanyador {#declaring-a-winner}

Ara que hem mostrat quin jugador té el següent torn, també hem de mostrar quan algú ha guanyat el joc i si no hi ha més moviments a fer. Copia aquesta funció de suport i enganxa-la al final de l'arxiu.

```javascript
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

Donat un array de 9 quadrats, aquesta funció comprovarà si hi ha un guanyador i retornarà `'X'`, `'O'` o `null` segons correspongui.

Cridarem a `calculateWinner (squares)` al mètode `render` del component Board per revisar si un jugador ha guanyat. Si un jugador ha guanyat, podem mostrar un text com: "Winner: X" o "Winner: O". Reemplaçarem la declaració de l'`status` al mètode `render` del Board amb aquest codi:

```javascript{2-8}
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // la resta del codi no ha canviat
```

Ara podem canviar la funció `handleClick` del component Board per retornar ràpidament ignorant un clic si algú ha guanyat el joc o si un quadrat està ja emplenat:

```javascript{3-5}
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

**[Veure el codi complet en aquest punt](https://codepen.io/gaearon/pen/LyyXgK?editors=0010)**

Felicitats! Ara tens un joc tres en ratlla funcionant. I també acabes d'aprendre la base de React. Així que *ets* probablement el veritable guanyador aquí.

## Afegint viatge a través del temps {#adding-time-travel}

Com a exercici final, farem possible "retrocedir a través del temps" al moviment previ del joc.

### Emmagatzemar un historial de moviments {#storing-a-history-of-moves}

Si mutéssim l'array de `squares`, implementar viatge a través del temps seria molt difícil.

No obstant això, fem servir `slice()` per crear una còpia nova de l'array de `squares` després de cada moviment, i [el tractem com immutable](#why-immutability-is-important). Això ens permet emmagatzemar cada versió prèvia de l'array de `squares`, i navegar entre els torns que ja han passat.

Emmagatzemarem els passats arrays de `squares` a un altre array anomenat `history`. La matriu `history` representa tots els estats del tauler, des del primer moviment fins a l'últim, i té una forma com aquesta:

```javascript
history = [
  // Abans del primer moviment
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // Després del primer moviment
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // Després del segon moviment
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]
```

Ara ens cal decidir quin component ha de ser el propietari de l'estat `history`.

### Elevant l'estat, una altra vegada {#lifting-state-up-again}

Volem que el component de nivell superior, Game, mostri una llista dels moviments passats. Us cal accés a l'historial per fer-ho, així que col·locarem l'estat `history` al component Game.

Col·locant l'estat `history` al component Game et permet eliminar l'estat `squares` del seu component fill Board. Tal com hem ["elevat l'estat"](#lifting-state-up) del component Square al component Board, ara elevarem del Board al component Game. Això donarà al component Game complet control sobre les dades de Board, i permetrà instruir el tauler que renderitzi els torns previs des del `history`.

Primer, establim l'estat inicial per al component Game al seu constructor:

```javascript{2-10}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

Després hem de fer que el component Board rebi els props `squares` i `onClick` del component Game. Com que ara tenim un sol gestor de clic al Board per a molts Squares, necessitem passar la ubicació de cada Square al gestor `onClick` per indicar quin cuadrat es clicat. Aquí hi ha els passos requerits per transformar el component Board:

* Eliminar el `constructor` al Board.
* Substituir `this.state.squares[i]` per `this.props.squares[i]` al mètode `renderSquare` del component Board.
* Substituir `this.handleClick(i)` per `this.props.onClick(i)` al mètode `renderSquare` del component Board.

El component Board ara es veu així:

```javascript{17,18}
class Board extends React.Component {
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

Actualitzarem el mètode `render` del component Game per utilitzar l'entrada més recent de l'historial per determinar i mostrar l'estat del joc:

```javascript{2-11,16-19,22}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
```

Atès que el component ara està renderitzant l'estat del joc, podem eliminar el codi corresponent del mètode `render` del Board. Després de refactorizar, el mètode `render` es veu així:

```js{1-4}
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
```

Finalment, ens cal moure el mètode `handleClick` del component Board al component Game. També necessitarem modificar `handleClick` ja que l'estat del component Game està estructurat diferent. Al mètode `handleClick` de Game, concatenarem la nova entrada de l'historial amb `history`.

```javascript{2-4,10-12}
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
```

> Nota
>
> A diferència del mètode `push()` dels arrays que has d'estar més familiaritzat, el mètode `concat()` no muta l'array original, per això ho preferim.

En aquest punt, el component Board només necessita els mètodes `renderSquare` i `render`. L'estat del joc i el mètode `handleClick` haurien d'estar al component Game.

**[Veure el codi complet en aquest punt](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### Ara es mostren els moviments anteriors {#showing-the-past-moves}

Com que hem guardat l'historial del joc tres en ratlla, ara podem mostrar-lo al jugador com una llista de moviments anteriors.

Abans hem après que els elements de React són objectes de primera classe a JavaScript; així que podem passar-los d'un lloc a l'altre dins de les nostres aplicacions. Per renderitzar múltiples elements a React podem usar una matriu d'elements de React.

A JavaScript, els arrays tenen un [mètode `map()`](https://developer.mozilla.org/ca/docs/Web/JavaScript/Referencia/Objectes_globals/Array/map) que és comunament usat per mapejar dades a altres dades, per exemple:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
```

Usant el mètode `map`, podem mapejar el nostre historial de moviments a elements de React representant botons a la pantalla, i mostrant una llista de botons per "saltar" a moviments anteriors.

"Mapejarem" sobre l'historial dins el mètode `render` del component Game:

```javascript{6-15,34}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
```

**[Veure el codi complet en aquest punt](https://codepen.io/gaearon/pen/EmmGEa?editors=0010)**

Per cada moviment de l'historial del joc de tres en ratlla, hem creat un element de llista `<li>` que conté un botó `<button>`. El botó té un gestor `onClick` que invoca un mètode anomenat `this.jumpTo()`. No hem implementat el mètode `jumpTo()` encara. Per ara, hem de veure una llista dels moviments que han ocorregut en el joc i un avís a la consola de les eines de desenvolupador que diu:

> Warning:
> Each child in an array or Iterator should have a unique "key" prop. Check the render method of "Game".

Ara explicarem que significa l'advertència anterior.

### Triant una key {#picking-a-key}

Quan renderitzem una llista, React emmagatzema informació sobre cada element de la llista renderitzat. Quan actualitzem una llista, React necessita determinar què ha canviat. Podríem haver afegit, eliminat, reorganitzat, o actualitzat els elements de la llista.

Imagina canviar de

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

a

```html
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

A més dels comptadors actualitzats, un humà llegint això probablement diria que es van intercanviar l'ordre d'Alexa i Ben i van inserir Claudia entre ells. No obstant això, React és un programa d'ordinador i no sap el que intentem. Perquè React no pot saber les nostres intencions, ens cal especificar una propietat *key* per a cada element de la llista per diferenciar cada un dels seus germans. Una opció seria fer servir els strings `alexa`, `ben`, `claudia`. Si anéssim a mostrar dades d'una base de dades, els ids de base de dades d'Alexa, Ben i Claudia podrien ser usats com keys.

```html
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

Quan una llista és rerenderitzada, React pren cada key de l'element de la llista i busca l'element de la llista anterior que coincideixi la key. Si la llista actual té un key que no existia abans, React crea un component. Si a la llista actual li falta un key que existia en la llista anterior, React destrueix el component previ. Si dos keys coincideixen, el component corresponent és mogut. Els keys li diuen a React sobre la identitat de cada component la qual cosa permet a React mantenir el seu estat entre rerenderitzats. Si la key d'un component canvia, el component serà destruït i recreat amb un nou estat.

`key` és una propietat especial i reservada a React (igual que amb `ref`, una característica més avançada). Quan un element és creat, React extreu la propietat `key` i l'emmagatzema directament a l'element retornat. Tot i que el `key` es pot veure que pertany a les `props`, `key` no pot ser referenciada usant `this.props.key`. React automàticament fa servir `key` per decidir quins components actualitzar. Un component no pot esbrinar sobre la seva `key`.

**Es recomana fortament que facis servir la key apropiada quan construeixis llistes dinàmiques**. Si no tens una key apropiada, potser vols considerar reestructurar les teves dades perquè puguis tenir-la.

Si la key no està especificada, React presentarà una advertència i farà servir l'índex de l'array com a índex per defecte. Usant l'índex de l'array com una key és problemàtic quan intentes reordenar els elements d'una llista o inserir/eliminar elements de la llista. Passar explícitament `key={i}` silencia l'advertència però té els mateixos problemes que els índexs de l'array i no és recomanat en la majoria dels casos.

Les keys no necessiten ser globalment úniques; només necessiten ser úniques entre components i els seus germans.


### Implementant viatge a través del temps {#implementing-time-travel}

A l'historial del joc de tres en ratlla, cada moviment anterior té un ID únic associat; és el nombre seqüencial del moviment. Els moviments mai són reordenats, eliminats, o inserits al medi, així que és segur usar els índexs del moviment com una key.

Al mètode `render` del component Game, podem afegir el key com `<li key={move}` l'advertència de React hauria de desaparèixer:

```js{6}
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
```

**[Veure el codi complet en aquest punt](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

Fer clic a qualsevol dels botons de la llista llança un error perquè el mètode `jumpTo` no està definit. Abans d'implementar `jumpTo`, afegirem `stepNumber` a l'estat del component Game per indicar quin pas estem veient actualment.

Primer, afegeix `stepNumber: 0` a l'estat inicial al constructor de Game:

```js{8}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
```

Després, definirem el mètode `jumpTo` al component Game per actualitzar el `stepNumber`. També establirem `xIsNext` a veritable si el nombre que estem canviant a `stepNumber` és parell:

```javascript{5-10}
  handleClick(i) {
    // aquest mètode no ha canviat
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // aquest mètode no ha canviat
  }
```

Ara farem uns petits canvis al mètode `handleClick` de Game, el qui es dispara quan fas clic sobre un quadrat.

L'estat `stepNumber` que hem afegit ara reflecteix el moviment mostrat a l'usuari. Després de fer un nou moviment, necessitem actualitzar `stepNumber` afegint `stepNumber: history.length` com a part de l'argument de `this.setState`. Això assegura que no ens estanquem mostrant el mateix moviment després d'un de nou realitzat.

També reemplaçarem `this.state.history` per `this.state.history.slice(0, this.state.stepNumber + 1)`. Això assegura que si "tornem a través del temps" i després fem un nou moviment des d'aquest punt, llançarem tota la història "futura" que ara seria incorrecta.

```javascript{2,13}
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
```

Finalment, modificarem el mètode `render` del component Game de sempre renderitzar l'últim moviment a renderitzar el moviment seleccionat actualment d'acord a `stepNumber`:

```javascript{3}
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // la resta no ha canviat
```

Si cliquem en qualsevol pas de la història del joc, el tauler tres en ratlla s'hauria d'actualitzar immediatament per mostrar el tauler com es veia després que el pas va ocórrer.

**[Veure el codi complet en aquest punt](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### En conclusió {#wrapping-up}

Felicitats! Has creat un joc de tres en ratlla que:

* Et permet jugar al tres en ratlla,
* Indica quan un jugador ha guanyat el joc,
* Emmagatzema l'historial del joc com va progressant,
* Permet als jugadors revisar l'historial del joc i veure versions anteriors del tauler de joc.

Bona feina! Esperem que ara sentis que tens una comprensió decent sobre com funciona React.

Revisa el resultat final aquí: **[Resultat final](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

Si tens temps addicional o vols practicar les teves noves habilitats de React, aquí hi ha algunes idees de millores que pots fer al joc de tres en ratlla, les quals estan llistades en ordre de dificultat creixent:

1. Mostra la ubicació per a cada moviment en el format (columna, fila) a la llista de l'historial de moviments.
2. Converteix en negreta l'element actualment seleccionat a la llista de moviments.
3. Reescriu el Board per utilitzar 2 cicles per fer els quadrats en comptes d'escriure'ls a mà.
4. Afegeix un botó de switch que et permeti ordenar els moviments en ordre ascendent o descendent.
5. Quan algú guanya, ressalta els 3 quadrats que han fet que guanyi.
6. Quan ningú guanya, mostra un missatge que digui que el resultat és un empat.

Al llarg d'aquest tutorial, hem abordat conceptes de React incloent elements, components, props, i estat. Per a una explicació més detallada de cada un d'aquests temes, revisa [la resta de la documentació](/docs/hello-world.html). Per aprendre més sobre definir components, revisa la [referència de l'API de `React.Component`](/docs/react-component.html).