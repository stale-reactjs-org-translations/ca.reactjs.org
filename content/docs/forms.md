---
id: forms
title: Formularis
permalink: docs/forms.html
prev: lists-and-keys.html
next: lifting-state-up.html
redirect_from:
  - "tips/controlled-input-null-value.html"
  - "docs/forms-zh-CN.html"
---

Els elements de formularis HTML funcionen una mica diferent d'altres elements del DOM a React, ja que els elements de formulari intrínsecament conserven algun estat intern. Per exemple, aquest formulari només en HTML, accepta un sol nom.

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

Aquest formulari té el comportament predeterminat d'HTML que consisteix a navegar a una nova pàgina quan l'usuari envia el formulari. Per tenir el mateix comportament a React no cal fer cap modificació. Però en la majoria de casos, és convenient tenir una funció de JavaScript que s'encarregui de la tramesa del formulari, i que tingui accés a les dades que l'usuari ha introduït en el formulari. La manera per defecte per aconseguir-ho és una tècnica anomenada "components controlats".

## Components controlats {#controlled-components}

En HTML, els elements de formularis com `<input>`, `<textarea>` i `<select>` normalment mantenen el seu propi estat i l'actualitzen d'acord amb la interacció de l'usuari. A React, l'estat mutable s'emmagatzema normalment a la propietat `state` dels components, i només s'actualitza amb [`setState()`](/docs/react-component.html#setstate).

Podem combinar-los tots dos fent que l'estat de React sigui l'única "font de veritat". D'aquesta manera, els components React que renderitzin un formulari també controlen el que passa en aquest formulari amb les subsegüents entrades de l'usuari. Un camp de formulari on els valors són controlats per React d'aquesta manera es denomina "component controlat".

Per exemple, si volem fer que l'exemple anterior mostri el nom que està contingut a l'estat, podem escriure el formulari com un component controlat:

```javascript{4,10-12,24}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

Ja que l'atribut `value` és assignat al nostre element del formulari, el valor mostrat sempre serà `this.state.value`, fent que l'estat de React sigui la font de veritat. Ja que `handleChange` corre cada vegada que una tecla és oprimida per actualitzar l'estat de React, el valor mostrat serà actualitzat mentre l'usuari escriu.

<<<<<<< HEAD
Amb un component controlat, tota mutació de l'estat tindrà associada una funció controladora. Això fa que modificar o validar l'entrada de l'usuari sigui més directe. Per exemple, si volguéssim assegurar que els noms fossin escrits amb totes les lletres en majúscula, podríem escriure el `handleChange` com:

```javascript{2}
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```
=======
With a controlled component, the input's value is always driven by the React state. While this means you have to type a bit more code, you can now pass the value to other UI elements too, or reset it from other event handlers.
>>>>>>> dea4f329ea3a7bba116e07adf67eb5c8b6c528cd

## L'etiqueta textarea {#the-textarea-tag}

En HTML, l'element `<textarea>` defineix el seu text amb els seus fills:

```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

En React, un `<textarea>` utilitza un atribut `value` enlloc seu. D'aquesta manera, un formulari que fa ús d'un `<textarea>` pot ser escrit de manera similar a un formulari que utilitza un camp en una sola línia:

```javascript{4-6,12-14,26}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Fixa't que `this.state.value` és inicialitzat al constructor, de manera que l'àrea de text comenci amb una mica de text.

## L'etiqueta select {#the-select-tag}

En HTML, `<select>` crea una llista desplegable. Per exemple, aquest HTML crea una llista desplegable de gustos:

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

Tingues en compte que l'opció *Coco* és inicialment seleccionada, a causa de l'atribut `selected`. React, en lloc d'utilitzar l'atribut `selected`, utilitza un atribut `value` a l'arrel de l'etiqueta `select`. Això és més convenient en un component controlat pel fet que només necessites actualitzar-lo en un sol lloc, per exemple:

```javascript{4,10-12,24}
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**Prova-ho en CodePen**](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

En resum, això fa que `<input type="text">`, `<textarea>`, i `<select>` treballin de manera similar, tots accepten un atribut `value` el qual pots fer servir per implementar un component controlat.

> Nota
>
> Pots passar una matriu a l'atribut `value`, permetent seleccions de múltiples opcions en una etiqueta `select`:
>
>```js
><select multiple={true} value={['B', 'C']}>
>```

## L'etiqueta file input {#the-file-input-tag}

En HTML, un `<input type="file">` permet que l'usuari esculli un o diversos fitxers del dispositiu d'emmagatzematge per ser carregats a un servidor o ser manipulats per JavaScript mitjançant l'[API d'Arxius](https://developer.mozilla.org/ca/docs/Web/API/File/Using_files_from_web_applications).

```html
<input type="file" />
```

Ja que el seu valor és només de lectura, és un component **no controlat** a React. S'explica en detall conjuntament amb els altres components no controlats [més endavant a la documentació](/docs/uncontrolled-components.html#the-file-input-tag).

## Manejant múltiples inputs {#handling-multiple-inputs}

Quan necessitis utilitzar diversos elements `input` controlats, pots afegir un atribut `name` a cada un dels elements i deixar que la funció controladora decideixi que fer basant-se en el valor de `event.target.name`.

Per exemple:

```javascript{15,18,28,37}
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

Fixa't com utilitzem la sintaxi de la [propietat *name* computada d'ES6](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) per actualitzar la clau de l'estat corresponent al nom del *input*.

```js{2}
this.setState({
  [name]: value
});
```

Això és equivalent a aquest codi ES5:

```js{2}
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

Ja que `setState()` automàticament [combina un estat parcial a l'estat actual](/docs/state-and-lifecycle.html#state-updates-are-merged), només necessitem cridar `setState` amb les parts que han canviat.

## Valor nul en un input controlat {#controlled-input-null-value}

Especificar la propietat `value` en un [component controlat](/docs/forms.html#controlled-components) evita que l'usuari canviï l'entrada a no ser que així ho vulguis. Si has especificat un `value` però l'entrada encara és editable, potser has assignat accidentalment al `value` un valor `undefined` o `null`.

El codi a continuació demostra això. (L'input està inicialment bloquejat, però es torna editable després d'un curt retard).

```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);

```

## Alternatives a components controlats {#alternatives-to-controlled-components}

A vegades pot ser tediós utilitzar components controlats, pel fet que es necessita escriure un controlador d'esdeveniments per a cada camp on les dades puguin canviar i passar l'estat a través del component de React. Això pot tornar-se particularment molest quan estàs convertint una base de codi existent a React, o integrant una aplicació React amb una biblioteca que no integra React. En aquestes situacions, pot ser que vulguis llegir sobre [components no controlats](/docs/uncontrolled-components.html), una tècnica alternativa per implementar *inputs* a formularis.

## Solucions completes {#fully-fledged-solutions}

Si el que estàs buscant és una solució completa incloent validació, tenir en compte els camps visitats i gestionar l'enviament del formulari, [Formik](https://jaredpalmer.com/formik) és una de les opcions populars. No obstant això, està construït amb els mateixos principis dels components controlats i maneig d'estat, així que no els deixis d'aprendre.
