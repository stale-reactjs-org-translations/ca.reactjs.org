---
id: accessibility
title: Accessibilitat
permalink: docs/accessibility.html
---

## Per què l'Accessibilitat? {#why-accessibility}

L'accessibilitat del contingut web (també coneguda com  [**a11y**(en anglès)](https://en.wiktionary.org/wiki/a11y)) és el disseny i la creació de continguts web que tothom pot utilitzar. El suport a l'accessibilitat és necessari per permetre que la tecnologia assistida interpreti bé les pàgines web.

React suporta completament la construcció de llocs web amb continguts accessibles, sovint utilitzant tècniques HTML estàndard.

## Estàndards i Guies d'orientació {#standards-and-guidelines}

### WCAG {#wcag}

WCAG (del seu nom en anglès Web Content Accessibility Guidelines) són un conjunt de [directrius per a l'accessibilitat del contingut web (en anglès)](https://www.w3.org/WAI/intro/wcag) que compren un ampli ventall de recomanacions per fer el contingut web més accessible.

Les següents llistes de WCAG en proporcionen un resum (en anglès):

- [WCAG checklist from Wuhcag](https://www.wuhcag.com/wcag-checklist/)
- [WCAG checklist from WebAIM](https://webaim.org/standards/wcag/checklist)
- [Checklist from The A11Y Project](https://a11yproject.com/checklist.html)

### WAI-ARIA {#wai-aria}

WAI-ÀRIA - [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria) està pensada per a fer més accessible el contingut dinàmic. Principalment amb Javascript i Ajax.

Fixa't que tots els atributs HTML `aria-*` són del tot compatibles amb JSX. Mentre que la majoria de les propietats i atributs del DOM a React són CamelCased, aquests atributs haun de ser hyphen-cased (també conegut com a kebab-case, lisp-case, etc.) tal com són a l'HTML:

```javascript{3,4}
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```

## HTML semàntic {#semantic-html}
L'HTML semàntic és la base per l'accessibilitat d'una aplicació web. Fer servir els diversos elements HTML per reforçar el significat de la informació en els nostres llocs web sovint en resultarà l'accessibilitat de franc.

- [MDN Diccionari dels elements de l'HTML](https://developer.mozilla.org/ca/docs/Web/HTML/Element)

De vegades trenquem la semàntica HTML quan afegim elements `<div>` al nostre JSX per fer que funcioni el codi React, especialment quan es treballa amb llistes (`<ol>`, `<ul>` i `<dl>`) i amb l'element HTML `<table>`.
En aquests casos hauríem d'utilitzar [React Fragments](/docs/fragments.html) per agrupar-ne els diversos elements.


Per exemple,

```javascript{1,5,8}
import React, { Fragment } from 'react';

function LlistaDElements({ element }) {
  return (
    <Fragment>
      <dt>{element.terme}</dt>
      <dd>{element.descripcio}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.elements.map(element => (
        <LListaDElements element={element} key={element.id} />
      ))}
    </dl>
  );
}
```

Pots assignar a cada element d'una array  una llista de fragments de la mateixa manera que qualsevol altre tipus d'element:

```javascript{6,9}
function Glossary(props) {
  return (
    <dl>
      {props.elements.map(element => (
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={element.id}>
          <dt>{element.terme}</dt>
          <dd>{element.descripcio}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```
Quan no necessitis afegir cap atribut a l'etiqueta Fragment pots utilitzar la [sintaxi curta](/docs/fragments.html#short-syntax), si fas servir una versió de React que ho suporti:


```javascript{3,6}
function ListItem({ element }) {
  return (
    <>
      <dt>{element.terme}</dt>
      <dd>{element.descripcio}</dd>
    </>
  );
}
```

Per a més informació, ves a [la documentació de Fragments](/docs/fragments.html).

## L'Accessibilitat als Formularis {#accessible-forms}

### Etiquetant {#labeling}
Qualsevol control de formulari de l'HTML, com ara  `<input>` i `<textarea>`, ha de ser etiquetat de forma accessible. Hem de proporcionar etiquetes descriptives que també siguin reconeixibles pels lectors de pantalla.

Els següents recursos ensenyen com fer-ho:

- [El W3C ens ensenya com etiquetar elements (en anglès)](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WebAIM ens ensenya com etiquetar elements (en anglès)](https://webaim.org/techniques/forms/controls)
- [El Grup Paciello ens explica que són els noms accessibles (en anglès)](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

Tot i que aquestes pràctiques HTML estàndard es poden utilitzar directament a React, tingues en compte que l'atribut `for` s'escriu com `htmlFor` a JSX:

```javascript{1}
<label htmlFor="inputAmbNom">Name:</label>
<input id="inputAmbNom" type="text" name="name"/>
```

### Notificant Els Errors A L'usuari {#notifying-the-user-of-errors}

Les situacions d'error han de poder ser compreses per tots els usuaris. L'enllaç següent ens mostra com fer reconeixibles els textos d'error als lectors de pantalla:

- [El W3C ensenya com fer les notificiacions a l'usuari (en anglès)](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [WebAIM ensenya com fer la validació d'un formulari (en anglès)](https://webaim.org/techniques/formvalidation/)

## Control del Focus {#focus-control}

Assegura't que la teva aplicació web pugui funcionar bé si fas servir només el teclat:

- [WebAIM explica l'accessibilitat si fas servir només el teclat (en anglès)](https://webaim.org/techniques/keyboard/)

### Focus del Teclat i la línia de vora del Focus{#keyboard-focus-and-focus-outline}

El focus del teclat es refereix a l'element del DOM que està preparat per acceptar l'entrada del teclat. Ho veiem a tot arreu seguint un esquema d'enfocament similar al que es mostra a la següent imatge:

<img src="../images/docs/keyboard-focus.png" alt="Línia de vora blava del focus del teclat al voltant d'un enllaç seleccionat." />

Fes servir només el CSS que elimina aquest esquema, per exemple establint `outline: 0`, si l'estàs substituint per una altra implementació de la línia de vora del focus.


### Mecanismes per ometre el contingut no desitjat{#mechanisms-to-skip-to-desired-content}

Proporciona un mecanisme que permeti als usuaris ometre les seccions de navegació ja passades de la teva aplicació perque això ajuda i accelera la navegació amb el teclat.

"Skiplinks" o "Skip Navigation Links" són enllaços de navegació ocults que només es fan visibles quan els usuaris de teclat interaccionen amb la pàgina. Són molt fàcils d'implementar amb enllaços a pàgines internes i de donar-los estil:

- [WebAIM - Skip Navigation Links](https://webaim.org/techniques/skipnav/)

També s'utilitzen elements i rols de referència, com `<main>` i `<aside>`, per a delimitar les regions de la pàgina i que permeti a l'usuari navegar ràpidament fins aquestes seccions.

Llegiu més sobre l'ús d'aquests elements per millorar l'accessibilitat aquí:

- [Punts de referència accessibles (en anglès)](https://www.scottohara.me/blog/2018/03/03/landmarks.html)

### Gestió de l'Enfocament per codi  {#programmatically-managing-focus}

Les nostres aplicacions React modifiquen contínuament el DOM en temps d’execució, de vegades fent que el focus del teclat es perdi o s’estableixi a un element inesperat. Per tal d'arreglar-ho, hem de fer que el programa orienti el focus del teclat en la direcció correcta. Per exemple, restablint el focus de teclat al botó que ha obert una finestra modal després que es tanqui aquesta.

Els Documents MDN Web descriuen com ho podem fer [keyboard-navigable JavaScript widgets (en anglès)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).

Per establir l'enfocament al codi React, podem fer servir [Refs als elements del DOM](/docs/refs-and-the-dom.html).

Per fer-ho, primer creem una referència a un tipus de component de JSX:

```javascript{4-5,8-9,13}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    //Crea una referència per guardar l'element del DOM "textInput"
    this.textInput = React.createRef();
  }
  render() {
  // Utilitza la crida de retorn `ref` per guardar una referència  
  // a l'element DOM d'entrada de text en un camp d'instància
    return (
      <input
        type="text"
        ref={this.textInput}
      />
    );
  }
}
```

Llavors hi podrem establir el focus quan ens convingui en altres parts del nostre codi :

 ```javascript
 focus() {
   //Enfoca explícitament l'entrada de text usant l'API DOM en brut
   //Nota: estem accedint a "current" per obtenir el node DOM
   this.textInput.current.focus();
 }
 ```
 [posant les referències DOM als components dels pares](/docs/refs-and-the-dom. html#exposing-dom-refs-to-parent-components) a través d'un suport especial sobre el component fill que reenvia la referència del pare al node DOM del fill.

De vegades un component pare ha d'establir el focus a un element d'un component fill. Podem fer-ho [posant les referències DOM als components pare](/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) i a través d'un suport especial reenviar la referència del pare al node DOM del component fill.

```javascript{4,12,16}
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  render() {
    return (
      <CustomTextInput inputRef={this.inputElement} />
    );
  }
}

// Ara podràs establir-hi el focus quan sigui necessari.
this.inputElement.current.focus();
```

Quan s'utilitza un HOC per ampliar components, es recomana [reenviar la referència](/docs/forwarding-refs.html) al component envoltat fent servir la funció `forwardRef` de React. Si un HOC d'un tercer no implementa el reenviament de ref, el patró anterior es pot utilitzar com a alternativa.

Un gran exemple de gestió de l'enfocament és el [react-aria-modal](https://github.com/davidtheclark/react-aria-modal). Aquest és un exemple relativament estrany d'una finestra modal completament accessible. No només estableix el focus inicial en el botó de cancel·lació (prevenint que l'usuari del teclat activi accidentalment l'acció d'aprovació) i conserva el focus del teclat dins de la mateixa finestra modal, sinó que també retorna el focus a l'element que inicialment va activar la finestra.

>Nota:
>
>Tot i que es tracta d'una característica d'accessibilitat molt important, també és una tècnica que s'ha d'utilitzar de manera assenyada. Feu-la servir per reparar el flux d'enfocament del teclat quan estigui malament, però no per mirar d'anticipar com els usuaris voldran fer servir les aplicacions.

## Esdeveniments de ratolí i de punter {#mouse-and-pointer-events}

Assegura't que tota la funcionalitat exposada a través d'un esdeveniment de ratolí o punter també es pugui accedir utilitzant només el teclat. Si es depèn només d'un dispositiu de punter es produiran molts casos en què els usuaris de teclat no podran utilitzar la teva aplicació.

Per il·lustrar això, veiem un exemple prolífic de pèrdua d'accessibilitat causada per esdeveniments de clic. Aquí es mostra el patró de clic a fora, a on un usuari pot desactivar una finestra emergent fent clic fora de la finestra.

<img src="../images/docs/outerclick-with-mouse.gif" alt="Un botó de commutació obre una llista de finestres emergents implementada amb el patró de clic a fora i mostra que fent servir un ratolí l'acció de tancament funciona." />

Aquest patró s'implementa normalment afegint un esdeveniment de `click` a l'objecte `window` que tanca la finestra emergent:

```javascript{12-14,26-30}
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Selecciona una opció</button>
        {this.state.isOpen && (
          <ul>
            <li>Opció 1</li>
            <li>Opció 2</li>
            <li>Opció 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```

Aquest patró pot funcionar bé per als usuaris amb dispositius de punter, com ara un ratolí, però si només es fa servir el teclat es perd aquesta funcionalitat  perque amb la tecla tab el que es fa és passar al següent element, ja que l'objecte `window` no rep mai un esdeveniment `click`. Això portarà a una funcionalitat ofuscada que impedirà a alguns usuaris utilitzar la teva aplicació.

<img src="../images/docs/outerclick-with-keyboard.gif" alt="Un botó de commutació obrint una llista de finestres emergents implementada amb el patró del click a fora i que operada amb el teclat mostra que la finestra emergent no es tanca en difuminar i ocultar altres elements de la pantalla." />

La mateixa funcionalitat es pot aconseguir utilitzant gestors d'esdeveniments apropiats, com ara `onBlur` i `onFocus`:

```javascript{19-29,31-34,37-38,40-41}
class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  
  //Tancarem la finestra emergent a la propera  marca de 
  //temps fent servir setTimeout.
  //S'ha de fer així perquè primer hem de comprovar si un
  //altre fill de l'element ha rebut el focus perque 
  //l'esdeveniment de desenfocament es dispara abans que 
  //el nou esdeveniment de focus.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // Si un fill rep el focus, no tancar la finestra emergent
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    //React ens ajuda encapsulant els esdeveniments de 
    //difuminat i de focus cap al pare.
    return (
      <div onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```

Aquest codi exposa la funcionalitat tant als usuaris que fan servir un dispositiu de punter com als de teclat. Fixa't també amb els atributs `aria-*` afegits que permet la funcionalitat als usuaris que fan servir un lector de pantalla. Per simplicitat els esdeveniments del teclat per habilitar la interacció amb la `tecla de fletxa` de les opcions de finestra emergent no s'han implementat.

<img src="../images/docs/blur-popover-close.gif" alt="Una llista de finestres emergents que es tancarà correctament tant per als usuaris del ratolí com del teclat." />

Aquest és un exemple del molts casos a on si es depèn només dels esdeveniments del punter i ratolí es trencarà la funcionalitat per als usuaris de teclat. Si sempre fas les proves amb un dispositu de teclat trobaràs immediatament les àrees amb problemes que després pots corregir utilitzant gestors d'esdeveniments compatibles amb el teclat.

## Ginys més complexos {#more-complex-widgets}

Una experiència d'usuari més complexa no hauria de significar una menor accessibilitat. Tot i que l'accessibilitat s'aconsegueix més fàcilment com més propera sigui la  codificació a l'HTML , fins i tot el giny més complex es poden codificar de forma accessible.

Per això necessitarem coneixement sobre els [rols d'ARIA (en anglès)](https://www.w3.org/TR/wai-aria/#roles) així com de les [propietats i estats d'ARIA (en anglès)](https://www.w3.org/TR/wai-aria/#states_and_properties).
Els enllaços que venen a continuació són caixes d'eines plenes d'atributs HTML totalment compatibles amb JSX i que ens permeten construir components React completament accessibles i altament funcionals.

Cada tipus d'eina té un patró de disseny específic i s'espera que funcioni d'una manera determinada tant pels usuaris com pels agents d'usuari:

- [WAI-ARIA Authoring Practices - Disseny de patrons i ginys (en anglès)](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
- [Heydon Pickering - ARIA Exemples (en anglès)](https://heydonworks.com/practical_aria_examples/)
- [Components Inclussius (en anglès)](https://inclusive-components.design/)

## Altres Punts a Considerar {#other-points-for-consideration}

### Establir l'Idioma {#setting-the-language}

Indicar l'idioma humà dels textos de les pàgines és el que li dirà el programari de lectura de pantalla quina configuració de veu ha de seleccionar:

- [WebAIM - Idioma del Document (en anglès)](https://webaim.org/techniques/screenreader/#language)

### Posar Títol al Document {#setting-the-document-title}

Posa un títol `<title>` al document que descrigui correctament el contingut de la pàgina, ja que això garanteix que l'usuari conegui el context en el que es troba la pàgina que té al davant:

- [WCAG - Entendre per a que serveix posar un títol al document (en anglès)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

A React el podem posar amb el [Component del Títol (en anglès)](https://github.com/gaearon/react-document-title).

### Contrast del color {#color-contrast}

Assegura't que tot el text llegible del teu lloc web té suficient contrast de color per a ser el màxim de llegible pels usuaris amb poca visió:

- [WCAG - Comprendre el requeriment del contrast de color (en anglès)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- [Tot sobre el contrast del color i per què has de repensar-t'ho (en anglès)](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
- [A11yProject - Què és el contrast de color (en anglès)](https://a11yproject.com/posts/what-is-color-contrast/)

Pot ser feixuc calcular manualment les combinacions de colors adequades per a tots els casos del teu lloc web de manera que pots fer-ho amb [ Colorable. Calcular una paleta de colors accessible completa ](https://jxnblk.com/colorable/).

Tant les eines aXe com WAVE esmentades a continuació també inclouen proves de contrast de color i t'informaran sobre errors de contrast.

Si vols ampliar la teva capacitat per provar el contrast pots utilitzar també aquestes eines:


- [WebAIM - Test de Contrast de Color (en anglès)](https://webaim.org/resources/contrastchecker/)
- [The Paciello Group - Analitzador de Contrast de Color (en anglès)](https://www.paciellogroup.com/resources/contrastanalyser/)

## Eines de Desenvolupament i Prova {#development-and-testing-tools}

Hi ha una sèrie d'eines que podem utilitzar que ens ajudaran en la creació d'aplicacions web accessibles.

### El teclat {#the-keyboard}

Fr servir només el teclat, és de lluny, el més fàcil i també un dels controls més importants per provar si es pot accedir a tot el teu lloc web. Pots fer això:

1. Desconecta el teu ratolí.
1. Fes servir la tecla `Tab` i `Shift+Tab` per navegar.
1. Fes servir l'`Enter` per activar elements.
1. A on sigui necessari, fes servir les tecles de fletxa per interacturar amb els element que ho requereixin, com ara menus i desplegables.

### Ajuda al desenvolupament {#development-assistance}

Podem comprovar algunes funcions d'accessibilitat directament en el nostre codi JSX. Sovint, els controls intel·ligents per als rols, estats i propietats de l'ARIA ja ens són proporcionats en IDE's preparats per a JSX. També tenim accés a la següent eina:

#### eslint-plugin-jsx-a11y {#eslint-plugin-jsx-a11y}

El complement [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) per ESLint proporciona informació de retorn "AST linting" sobre els problemes d'accessibilitat en el teu JSX. Molts IDE's et permeten integrar aquests troballes directament a l'anàlisis del codi i a les finestres del codi font.

[Create React App](https://github.com/facebookincubator/create-react-app) té activat aquest connector amb un subconjunt de regles. Si voleu habilitar encara més regles d'accessibilitat podeu crear un fitxer `.eslintrc` a l'arrel del vostre projecte amb aquest contingut:

  ```json
  {
    "extends": ["react-app", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"]
  }
  ```

### Provant l'Accessibilitat al Navegador {#testing-accessibility-in-the-browser}

Hi ha una sèrie d'eines que poden executar auditories d'accessibilitat a les pàgines web del teu navegador. Utilitza-les en combinació amb altres comprovacions d'accessibilitat esmentades aquí ja que aquestes últimes només poden provar l'accessibilitat tècnica del teu HTML.

#### aXe, aXe-core i react-axe {#axe-axe-core-and-react-axe}

Deque Systems ofereix [aXe-core](https://github.com/dequelabs/axe-core) per a les proves d'accessibilitat automatitzades i d'extrem a extrem de les teves aplicacions. Aquest mòdul inclou integracions per Selenium.

[El Motor de l'Accessibilitat (en anglès)](https://www.deque.com/products/axe/) o aXe, és una extensió de l'inspector d'accessibilitat del navegador construïda sobre `aXe-core`.

També pots fer servir el mòdul [react-axe](https://github.com/dylanb/react-axe) per a informar d'aquests resultats d'accessibilitat directament a la consola mentre desenvolupes i depures.

#### WebAIM WAVE {#webaim-wave}

L'[Eina per Avaluar L'Accessibilitat de la Web (en anglès) ](https://wave.webaim.org/extension/) és una altra extensió del navegador per comprovar l'accessibilitat  .

#### Inspectors d'Accessibilitat I l'Arbre d'Accessibilitat {#accessibility-inspectors-and-the-accessibility-tree}

[L'Arbre de l'Accessibilitat (en anglès)](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) és un subconjunt de l'arbre DOM que conté objectes accessibles per a cada element del DOM que s'ha d'exposar per a la tecnologia d'assistència, com ara els lectors de pantalla.

En alguns navegadors podem veure fàcilment la informació d'accessibilitat per a cada element a l'arbre d'accessibilitat:

- [Fent servir l'inspector d'accessibilitat al Firefox (en anglès)](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
- [Fent servir l'inspector d'accessibilitat al Chrome (en anglès)](https://developers.google.com/web/tools/chrome-devtools/accessibility/reference#pane)
- [Fent servir l'inspector d'accessibilitat al OS X Safari (en anglès)](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

### Lectors de Pantalla {#screen-readers}

Les proves amb un lector de pantalla haurien de formar part de les teves proves d'accessibilitat.

Tingues en compte que les combinacions del navegador / lector de pantalla són importants. Es recomana que provis la teva aplicació en el navegador més adequat per al lector de pantalla que hagis escollit.

### Lectors de Pantalla d'Ús Comú {#commonly-used-screen-readers}

#### NVDA a Firefox {#nvda-in-firefox}

[Accés a l'escriptori no visual](https://www.nvaccess.org/) o NVDA és un lector de pantalla de Windows de codi obert que s'utilitza àmpliament.

Mira les següents guies sobre com fer servir millor el NVDA:

- [WebAIM - Ús de NVDA per avaluar l'accessibilitat web (en anglès)](https://webaim.org/articles/nvda/)
- [Deque - NVDA Dreceres de Teclat (en anglès)](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

#### VoiceOver a Safari {#voiceover-in-safari}

VoiceOver és un lector de pantalla integrat en dispositius Apple.

Mira les següents guies sobre com activar i fer servir millor el VoiceOver:

- [WebAIM - Fer Servir VoiceOver per avaluar l’accessibilitat web](https://webaim.org/articles/voiceover/)
- [Deque - Dreceres de Teclat per a VoiceOver de OS X (en anglès)](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
- [Deque - Dreceres per a VoiceOver de iOS (en anglès)](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)

#### JAWS a l'Internet Explorer {#jaws-in-internet-explorer}

[Accés a les tasques amb la veu (en anglès)](https://www.freedomscientific.com/Products/software/JAWS/) o JAWS, és un lector de pantalla molt utilitzat a Windows.

Mira les següents guies sobre com fer servir millor el JAWS:

- [WebAIM - Using JAWS to Evaluate Web Accessibility](https://webaim.org/articles/jaws/)
- [Deque - JAWS Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

### Altres Lectors de Pantalles {#other-screen-readers}

#### ChromeVox a Google Chrome {#chromevox-in-google-chrome}

[ChromeVox](https://www.chromevox.com/) és un lector de pantalla integrat a Chromebooks i està disponible [com una extensió](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en) per a Google Chrome.

Mira aquestes guies sobre com fer servir millor ChromeVox:

- [Google Chromebook Help - Utilitza el lector de pantalla integrat (en anglès)](https://support.google.com/chromebook/answer/7031755?hl=en)
- [ChromeVox Referència de dreceres de teclat clàssiques (en anglès)](https://www.chromevox.com/keyboard_shortcuts.html)
