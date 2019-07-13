---
id: introducing-jsx
title: Introduïnt JSX
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

Considera la declaració d'aquesta variable:

```js
const element = <h1>Hello, world!</h1>;
```

Aquesta divertida sintaxi d'etiquetes no és ni un string ni HTML.

S'anomena JSX, i és una extensió de la sintaxi de JavaScript. Recomanem usar-lo amb React per a descriure com la interfície d'usuari hauria de ser. JSX podria recordar-te a un llenguatge de plantilles, però ve amb tot el poder de JavaScript. 

JSX produeix "elements" de React. Explorarem com renderitzar-los en el DOM a la següent secció. A continuació pots trobar els fonaments de JSX per a poder començar.

### Per què JSX? {#why-jsx}

React accepta el fet que la lògica de renderització està inherentment unida a la lògica de la interfície d'usuari: com es gestionen els esdeveniments, com canvia l'estat en el temps i com es preparen les dades per a la seva visualització.

En lloc de separar artificialment *tecnologies* posant el maquetat i la lògica en arxius separats, React [separa *interessos*](https://en.wikipedia.org/wiki/Separation_of_concerns) amb unitats lleugerament acoblades que s'anomenen "components" i que contenen ambdues. Tornarem als components en una [altra secció](/docs/components-and-props.html), però si encara no estàs còmode maquetant en JS, [aquesta xerrada](https://www.youtube.com/watch?v=x7cQ3mrcKaY) et pot convèncer del contrari.

React [no requereix](/docs/react-without-jsx.html) usar JSX, però la majoria de la gent ho troba útil com una ajuda visual quan treballen amb la interfície d'usuari a dins el codi de JavaScript. Això també permet que React mostri missatges d'error i avís més útils.

Un cop dit això, anem a començar!

### Inserint expressions en JSX {#embedding-expressions-in-jsx}

A l'exemple de sota, declarem una variable anomenada `name` i després l'usem a dins JSX embolicant-la entre claus:

```js{1,2}
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

Pots posar qualsevol [expressió de JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) vàlida a dins les claus en JSX. Per exemple, `2 + 2`, `user.firstName`, o `formatName(user)` són tot expressions vàlides de JavaScript.

A l'exemple que hi ha a continuació, inserim el resultat de cridar la funció de JavaScript, `formatName(user)`, a dins un element `<h1>`.

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://introducing-jsx)

Dividim JSX en diverses línies per a facilitar-ne la lectura. Tot i que no és necessari, quan es fa així també recomanem embolicar-lo entre parèntesis per a evitar errors causats per la [inserció automàtica del punt i coma](https://stackoverflow.com/q/2846283).

### JSX també és una expressió {#jsx-is-an-expression-too}

Després de compilar-se, les expressions JSX es converteixen en cridades a funcions JavaScript regulars i s'avaluen a objectes de JavaScript.

Això significa que pots usar JSX a dins de declaracions `if` i bucles `for`, pots assignar-lo a variables, acceptar-lo com argument, i retornar-lo des de funcions.

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### Especificant atributs amb JSX {#specifying-attributes-with-jsx}

Pots usar cometes per a especificar strings literals com atributs:

```js
const element = <div tabIndex="0"></div>;
```

També pots usar claus per a inserir una expressió JavaScript en un atribut:

```js
const element = <img src={user.avatarUrl}></img>;
```

No posis cometes al voltant de claus quan insereixis una expressió JavaScript en un atribut. Hauries d'usar cometes (pels valors string) o claus (per les expressions), però no ambdues en el mateix atribut.

>**Advertiment:**
>
>Com que JSX és més proper a JSX que HTML, React DOM usa la convenció de nomenclatura `camelCase` en lloc de noms d'atributs HTML.
>
>Per exemple, `class` es converteix en [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) en JSX, i `tabindex` es converteix en [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex).

### Especificant fills amb JSX {#specifying-children-with-jsx}

Si una etiqueta està buida, la pots tancar immediatament amb `/>`, com en XML:

```js
const element = <img src={user.avatarUrl} />;
```

Les etiquetes JSX poden contenir fills:

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX prevé atacs d'injecció {#jsx-prevents-injection-attacks}

És segur que un usuari insereixi dades en JSX:

```js
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

Per defecte, React DOM [escapa](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) qualsevol valor inserit en JSX abans de renderitzar-lo. Així s'assegura que no es pugui inserir res que no hagi estat explícitament escrit a la teva aplicació. Tot es converteix a un string abans que es renderitzi. Això ajuda a prevenir atacs [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting).

### JSX representa objectes {#jsx-represents-objects}

Babel compila JSX a cridades `React.createElement()`.

Aquests dos exemples són idèntics:

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` realitza qualcunes comprovacions per a ajudar-te a escriure codi lliure d'errors, però essencialment crea objectes com aquest:

```js
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

Aquests objectes s'anomenen "elements de React". Pots pensar que són descripcions del que vols veure en la pantalla. React llegeix aquests objectes i els usa per a construir el DOM i mantenir-lo actualitzat.

Anem a explorar el renderitzat d'elements de React en el DOM a la següent secció.

>**Consell:**
>
>Recomanem usar la [definició del llenguatge "Babel"](https://babeljs.io/docs/editors) pel teu editor de preferència perquè tant el codi en ES6 com JSX sigui emfatitzat correctament. Aquesta pàgina web utilitza l'esquema de color [Oceanic Next](https://labs.voronianski.com/oceanic-next-color-scheme/) que és compatible amb això.
