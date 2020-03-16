---
id: lifting-state-up
title: Pujant l'estat
permalink: docs/lifting-state-up.html
prev: forms.html
next: composition-vs-inheritance.html
redirect_from:
  - "docs/flux-overview.html"
  - "docs/flux-todo-list.html"
---

Alguns cops, diversos components necessiten reflectir les mateixes dades canviants. Recomanem pujar l'estat cap a l'avantpassat comú més proper. Anem a veure com funciona.

En aquesta secció, crearem una calculadora de temperatura que calcularà si l'aigua bullirà a una certa temperatura.

Començarem amb un component anomenat `BoilingVerdict`. Aquest accepta la temperatura en `celsius` com una propietat, i imprimeix si és suficient per bullir l'aigua:

```js{3,5}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

A continuació, crearem un component anomenat `Calculator`. Aquest renderitza un `<input>` que permet inserir la temperatura, i guarda el seu valor a `this.state.temperature`.

Addicionalment, renderitza el `BoilingVerdict` per al valor inserit.

```js{5,9,13,17-21}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

## Afegint una segona entrada {#adding-a-second-input}

El nostre nou requeriment és que, a més de la temperatura en Celsius, donem la temperatura en Fahrenheit, i aquestes es mantenen sincronitzades.

Podem començar extraient el component `TemperatureInput` de `Calculator`. Li afegirem una nova propietat anomenada `scale` que podrà ser tan `"c"` com `"f"`:

```js{1-4,19,22}
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Ara podem canviar `Calculator` per renderitzar dues entrades separades per a la temperatura:

```js{5,6}
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

Ara tenim dues entrades, però quan insereixes la temperatura en una d'elles, l'altra no s'actualitza. Això contradiu el nostre requeriment: volem mantenir-les sincronitzades.

Tampoc podem mostrar el component `BoilingVerdict` de `Calculator`. `Calculator` no coneix la temperatura actual perquè està amagada a dins `TemperatureInput`.

## Escrivint funcions de conversió {#writing-conversion-functions}

Primer, escriurem dues funcions per convertir de Celsius a Fahrenheit i viceversa:

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

Aquestes dues funcions converteixen nombres. Escriurem una altra funció que agafa un string `temperature` i una funció de conversió com arguments i retorna un string. La usarem per calcular el valor d'una entrada basat en el de l'altra entrada.

Retorna un string buit si `temperature` és invàlida, i manté la sortida arrodonida al tercer decimal:

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

Per exemple, `tryConvert('abc', toCelsius)` retorna un string buit, i `tryConvert('10.22', toFahrenheit)` retorna `'50.396'`.

## Pujant l'estat {#lifting-state-up}

Actualment, els dos components `TemperatureInput` mantenen els seus valors a l'estat local de manera independent:

```js{5,9,13}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```

Malgrat això, volem que aquestes dues entrades estiguin en sincronització. Quan actualitzem l'entrada en Celsius, l'entrada en Fahrenheit hauria de relexar la conversió de temperatura, i viceversa.

A React, compartir l'estat es pot aconseguir movent-lo cap d'alt fins a l'avantpassat comú més proper dels components que el necessiten. Això s'anomena "pujar l'estat". Eliminarem l'estat local de `TemperatureInput` i el mourem a `Calculator`.

Si `Calculator` té l'estat compartit, llavors es converteix en "la font de veritat" per la temperatura actual a les dues entrades. Aquest pot intruir a les dues a tenir valors consistents entre si. Ja que les propietats dels components `TemperatureInput` vénen des del mateix avantpassat `Calculator`, les dues entrades estaran sempre sincronitzades.

Anem a veure com funciona pas per pas.

Primer, canviarem `this.state.temperature` amb `this.props.temperature` en el component `TemperatureInput`. Per ara, podem pretendre que `this.props.temperature` ja existeix, encara que l'haurem de passar des del component `Calculator` en el futur:

```js{3}
  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

Sabem que les [props són només de lectura](/docs/components-and-props.html#props-are-read-only). Quan la `temperature` estava a l'estat local, `TemperatureInput` només podia cridar `this.setState()` per canviar-la. No obstant això, ara que la `temperature` ve des de l'avantpassat com a prop, `TemperatureInput` no té cap control sobre ella.

A React, això normalment es soluciona fent el component "controlat". Així com l'`<input>` del DOM accepta un `value` i una `onChange` prop, també `TemperatureInput` accepta les propietats `temperature` i `onTemperatureChange` de l'avantpassat `Calculator`.

Ara, quan `TemperatureInput` vol actualitzar la seva temperatura, crida `this.props.onTemperatureChange`:

```js{3}
  handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

>Nota:
>
>No hi ha cap significat especial en els noms `temperature` o `onTemperatureChange` en els components. Podríem haver-los anomenat qualsevol cosa, com `value` i `onChange` que són una convenció comuna.

La propietat `onTemperatureChange` serà proveïda amb la propietat `temperature` per l'avantpassat `Calculator`. Controlarà el canvi modificant el seu estat local, així tornant a renderitzar les dues entrades amb els nous valors. Analitzarem a la nova implementació de `Calculator` ben prest.

Abans de començar a canviar `Calculator`, tornem a mirar els nostres canvis a `TemperatureInput`. Hem eliminat el seu estat local, i en lloc de llegit `this.state.temperature`, ara llegim `this.props.temperature`. En lloc de cridar `this.setState()` quan volem fer un canvi, ara cridem `this.props.onTemperatureChange()`, que serà proveïda per `Calculator`:

```js{8,12}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Ara anem a mirar el component `Calculator`.

Guardarem l'entrada actual de `temperature` i `scale` en el seu estat local. Això és l'estat que hem "pujat" de les entrades, i servirà com a "font de veritat" per a les dues. És la mínima representació de totes les dades que necessitem per poder renderitzar les dues entrades.

Per exemple, si introduïm 37 a l'entrada en Celsius, l'estat de `Calculator` serà:

```js
{
  temperature: '37',
  scale: 'c'
}
```

Si després editem el camp en Fahrenheit per a que sigui 212, l'estat de `Calculator` serà:

```js
{
  temperature: '212',
  scale: 'f'
}
```

Podríem haver guardat el valor de les dues entrades però resulta ser innecessari. És suficient guardar el valor de l'entrada que ha estat modificada més recentment, i l'escala que representa. Així podem extreure el valor de l'altra entrada des del valor actual de `temperature` i `scale` tots sols.

Les entrades estan en sincronització perquè els seus valor estan computats des del mateix estat:

```js{6,10,14,18-21,27-28,31-32,34}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

[**Prova-ho a CodePen**](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

Ara, no importa quina entrada editis, que `this.state.temperature` i `this.state.scale` a `Calculator` són actualitzats. Una de les entrades té el valor introduït, de tal manera que qualsevol entrada de l'usuari és preservada, i l'altra entrada és sempre recalculada depenent d'aquesta.

Recordem què passa quan edites una entrada:

<<<<<<< HEAD
* React crida la funció especificada com `onChange` en el DOM `<input>`. En el nostre cas, això és el mètode `handleChange` en el component `TemperatureInput`.
* El mètode `handleChange` en el component `TemperatureInput` crida `this.props.onTemperatureChange()` amb el nou valor desitjat. Les seves propietats, inclosa `onTemperatureChange`, han estat proporcionades pel component avantpassat, `Calculator`.
* Quan prèviament s'ha renderitzat, `Calculator` ha especificat que `onTemperatureChange` del `TemperatureInput` en Celsius és el mètode de `handleCelsiusChange` de `Calculator`, i `onTemperatureChange` del `TemperatureInput` en Fahrenheit és el mètode `handleFahrenheitChange` de `Calculator`. Així que qualsevol dels dos mètodes de `Calculator` és cridat depenent de quina entrada hem editat.
* A dins aquests mètodes, el component `Calculator` demana a React que torni a renderitzar-se cridant `this.setState()` amb la nova entrada i l'escala actual de l'entrada que acabem d'editar.
* React crida el mètode `render` del component `Calculator` per veure com la interfície d'usuari hauria de mostrar-se. Els valors de les dues entrades són computats un altre cop depenent dels valors actuals de temperatura i escala. La conversió de temperatura succeeix aquí.
* React crida els mètodes `render` dels components individuals `TemperatureInput` amb les seves noves props especificades per `Calculator`. Aprèn com les seves interfícies d'usuari haurien de mostrar-se.
* React crida el mètode `render` del component `BoilingVerdict`, passant la temperatura en Celsius com a prop.
* React DOM actualitza el DOM amb el veredicte d'ebullició i depenent de les entrades desitjades. L'entrada que just hem editat rep el seu valor actual, i l'altra entrada és actualitzada després de la conversió.
=======
* React calls the function specified as `onChange` on the DOM `<input>`. In our case, this is the `handleChange` method in the `TemperatureInput` component.
* The `handleChange` method in the `TemperatureInput` component calls `this.props.onTemperatureChange()` with the new desired value. Its props, including `onTemperatureChange`, were provided by its parent component, the `Calculator`.
* When it previously rendered, the `Calculator` had specified that `onTemperatureChange` of the Celsius `TemperatureInput` is the `Calculator`'s `handleCelsiusChange` method, and `onTemperatureChange` of the Fahrenheit `TemperatureInput` is the `Calculator`'s `handleFahrenheitChange` method. So either of these two `Calculator` methods gets called depending on which input we edited.
* Inside these methods, the `Calculator` component asks React to re-render itself by calling `this.setState()` with the new input value and the current scale of the input we just edited.
* React calls the `Calculator` component's `render` method to learn what the UI should look like. The values of both inputs are recomputed based on the current temperature and the active scale. The temperature conversion is performed here.
* React calls the `render` methods of the individual `TemperatureInput` components with their new props specified by the `Calculator`. It learns what their UI should look like.
* React calls the `render` method of the `BoilingVerdict` component, passing the temperature in Celsius as its props.
* React DOM updates the DOM with the boiling verdict and to match the desired input values. The input we just edited receives its current value, and the other input is updated to the temperature after conversion.
>>>>>>> 2ef0ee1e4fc4ce620dce1f3e0530471195dc64d1

Cada actualització passa pels mateixos passos perquè les entrades estiguin en sincronització.

## Lliçons apreses {#lessons-learned}

Hi hauria d'haver una sola "font de veritat" per qualsevol dada que canviï en una aplicació de React. Usualment, l'estat és primer afegit al component que el necessita per renderitzar-se. Llavors, si un altre component també el necessita, es pot pujar cap a l'avantpassat comú més proper. En lloc d'intentar sincronitzar l'estat entre distints components, hauries de basar-te en el [flux de dades de dalt a baix](/docs/state-and-lifecycle.html#the-data-flows-down).

Pujar l'estat suposa escriure més codi que en casos "two-way binding", però com a benefici, es tarda menys en trobar errors. Com que cada estat "viu" en algun component i només aquell component sol pot canviar-lo, l'àrea per cometre errors és molt reduïda. Addicionalment, pots implementar qualsevol lògica per rebutjar o transformar les entrades de l'usuari.

Si alguna cosa podria estar derivada tan de props com d'estat, probablement no hauria de trobar-se a l'estat. Per exemple, en lloc de guardar `celsiusValue` i `fahrenheitValue`, només guardem la darrera `temperature` i la seva `scale`. Amb això, el valor de l'altra entrada sempre es pot calcular en el mètode `render()`. Això ens permet no perdre cap precisió en els decimals de les entrades de l'usuari.

<<<<<<< HEAD
Quan veus alguna cosa incorrecta en la interfície d'usuari, pots usar [React Developer Tools](https://github.com/facebook/react-devtools) per inspeccionar les props i l'arbre fins que trobis el component responsable d'actualitzar l'estat. Això permet seguir error fins a la seva font:
=======
When you see something wrong in the UI, you can use [React Developer Tools](https://github.com/facebook/react/tree/master/packages/react-devtools) to inspect the props and move up the tree until you find the component responsible for updating the state. This lets you trace the bugs to their source:
>>>>>>> 2ef0ee1e4fc4ce620dce1f3e0530471195dc64d1

<img src="../images/docs/react-devtools-state.gif" alt="Monitoring State in React DevTools" max-width="100%" height="100%">

