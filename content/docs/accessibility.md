---
id: accessibility
title: Accessibilitat
permalink: docs/accessibility.html
---

## Per què l'Accessibilitat? {#why-accessibility}

L'accessibilitat del contingut web (també coneguda com  [**a11y**](https://en.wiktionary.org/wiki/a11y)) és el disseny i la creació de continguts web que tots poden utilitzar. El suport a l'accessibilitat és necessari per permetre que la tecnologia assistida interpreti bé les pàgines web.

React suporta completament la construcció de llocs web amb continguts accessibles, sovint utilitzant tècniques HTML estàndard.

## Estàndards i Guies d'orientació {#standards-and-guidelines}

### WCAG {#wcag}

WCAG (del seu nom en anglès Web Content Accessibility Guidelines) són un conjunt de [directrius per a l'accessibilitat del contingut web](https://www.w3.org/Translations/WCAG20-ca/) compren un ampli ventall de recomanacions per fer el contingut web més accessible.

Les següents llistes de WCAG en proporcionen un resum (en anglès):

- [WCAG checklist from Wuhcag](https://www.wuhcag.com/wcag-checklist/)
- [WCAG checklist from WebAIM](https://webaim.org/standards/wcag/checklist)
- [Checklist from The A11Y Project](https://a11yproject.com/checklist.html)

### WAI-ARIA {#wai-aria}

WAI-ÀRIA - [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria) està pensat per a fer més accessible el contingut dinàmic. Principalment Javascript i Ajax.

Fixa't que tots els atributs HTML `aria-*` són totalment compatibles amb JSX. Mentre que la majoria de les propietats i atributs de DOM a React són CamelCased, aquests atributs haurien de ser hyphen-cased (també conegut com a kebab-case, lisp-case, etc.) tal com són a l'HTML:

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
L'HTML semàntic és la base per l'accessibilitat en una aplicació web. Fer servir els diversos elements HTML per reforçar el significat de la informació en els nostres llocs web sovint ens donarà l'accessibilitat de franc.

- [MDN Diccionari dels elements de l'HTML](https://developer.mozilla.org/ca/docs/Web/HTML/Element)

De vegades trenquem la semàntica HTML quan afegim elements `<div>` al nostre JSX per fer que funcioni el codi de React, especialment quan es treballa amb llistes (`<ol>`, `<ul>` i `<dl>`) i amb l'element HTML `<table>`.
En aquests casos hauríem d'utilitzar [React Fragments](/docs/fragments.html) per agrupar diversos elements.


Per exemple,

```javascript{1,5,8}
import React, { Fragment } from 'react';

function LListaDElements({ element }) {
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

Podeu assignar una llista d'elements a una array de fragments de la mateixa manera que qualsevol altre tipus d'element:

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
Quan no necessitis cap 'props' a l'etiqueta Fragment pots utilitzar la [sintaxi curta](/docs/fragments.html#short-syntax), si la teva versió ho suporta:


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

Per a més informació, dirigeix-te a [la documentació de Fragments](/docs/fragments.html).

## Accessibilitat als Formularis {#accessible-forms}

### Etiquetant {#labeling}
Tot control de formularis HTML, com ara  `<input>` i `<textarea>`, ha de ser etiquetat de forma accessible. Hem de proporcionar etiquetes descriptives que també siguin reconeixibles pels lectors de pantalla.

Els següents recursus ensenyen com fer-ho:

- [El W3C ens ensenya com etiquetar elements (en anglès)](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WebAIM ens ensenya com etiquetar elements (en anglès)](https://webaim.org/techniques/forms/controls)
- [El Grup Paciello ens explica que són els noms accessibles (en anglès)](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

Tot i que aquestes pràctiques HTML estàndard es poden utilitzar directament a React, tingueu en compte que l'atribut `for` s'escriu com `htmlFor` a JSX:

```javascript{1}
<label htmlFor="inputAmbNom">Name:</label>
<input id="inputAmbNom" type="text" name="name"/>
```

### Notificant Els Errors A L'usuari {#notifying-the-user-of-errors}

Les situacions d'error han de ser compreses per tots els usuaris. L'enllaç següent ens mostra com fer reconeixibles els textos d'error als lectors de pantalla:

- [El W3C ensenya com fer les notificiacions a l'usuari](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [WebAIM ensenya com fer la validació d'un formulari](https://webaim.org/techniques/formvalidation/)

## Control del Focus {#focus-control}

Assegura't que la teva aplicació web pugui funcionar si només fas servir el teclat:

- [WebAIM explica l'accessibilitat si només fas servir el teclat](https://webaim.org/techniques/keyboard/)

### Focus del Teclat i el Focus and focus outline {#keyboard-focus-and-focus-outline}

El focus del teclat es refereix a l'element actual del DOM que està seleccionat per acceptar l'entrada del teclat. Ho veiem a tot arreu com un esquema d'enfocament similar al que es mostra a la següent imatge:

<img src="../images/docs/keyboard-focus.png" alt="Vora blava del focus del teclat al voltant d'un enllaç seleccionat." />

Fes servir només un CSS que elimini aquest esquema, per exemple establint `outline: 0`, si l'estàs substituint per una altra implementació de la vora del focus.


### Mecanismes per ometre el contingut no desitjat{#mechanisms-to-skip-to-desired-content}

Proporciona un mecanisme que permeti als usuaris ometre les seccions de navegació ja passades de la teva aplicació perque això ajuda i accelera la navegació del teclat.

"Skiplinks" o "Skip Navigation Links" són enllaços de navegació ocults que només es fan visibles quan els usuaris de teclat interaccionen amb la pàgina. Són molt fàcils d'implementar amb enllaços a pàgines internes i de donar-los estil:

- [WebAIM - Skip Navigation Links](https://webaim.org/techniques/skipnav/)

També s'utilitzen elements i rols de referència, com `<main>` i `<aside>`, per a delimitar les regions de la pàgina com a tecnologia d'assistència que permeti a l'usuari navegar ràpidament fins aquestes seccions.

Llegiu més sobre l'ús d'aquests elements per millorar l'accessibilitat aquí:

- [Punts de referència accessibles](https://www.scottohara.me/blog/2018/03/03/landmarks.html)

### Gestió de l'Enfocament pel propi programa  {#programmatically-managing-focus}

Les nostres aplicacions React modifiquen contínuament el DOM en temps d’execució, de vegades fent que el focus del teclat es perdi o s’estableixi a un element inesperat. Per tal d'arreglar-ho, hem de fer que el programa orienti el focus del teclat en la direcció correcta. Per exemple, restablint el focus de teclat a un botó que ha obert una finestra modal després que es tanqui aquesta finestra modal.

MDN Web Docs takes a look at this and describes how we can build 
Els Documents MDN Web descriuen com ho podem fer[keyboard-navigable JavaScript widgets (en anglès)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).

Per establir l'enfocament a React, podem fer servir [Refs als elements del DOM](/docs/refs-and-the-dom.html).

Per fer-ho, primer creem una referència a un tipus de components de JSX:

```javascript{4-5,8-9,13}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    //Crea una referència per guardar l'element del DOM "textInput"
    this.textInput = React.createRef();
  }
  render() {
  // Utilitza la crida de retorn `ref` per guarda una referència  
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

Llavors hi podrem establir el focus quan ens convingui en altres parts del nostre component :

 ```javascript
 focus() {
   //Enfoca explícitament l'entrada de text usant l'API DOM en brut
   //Nota: estem accedint a "current" per obtenir el node DOM
   this.textInput.current.focus();
 }
 ```
 [posant les referències DOM als components dels pares](/docs/refs-and-the-dom. html#exposing-dom-refs-to-parent-components) a través d'un suport especial sobre el component fill que reenvia la referència del pare al node DOM del fill.

De vegades un component pare ha d'establir el focus a un element d'un component fill. Podem fer-ho [posant les referències DOM als components pare ](/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) a través d'un suport especial al component fill que reenvia la referència del pare al node DOM del fill.

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

Quan s'utilitza un HOC per ampliar components, es recomana [reenviar la referència](/docs/endavanting-refs. html) al component ajustat usant la funció `forwardRef` de React. Si un tercer HOC no implementa el reenviament  de referència, el patró anterior encara es pot utilitzar com a alternativa.

Un gran exemple de gestió de l'enfocament és el [react-aria-modal](https://github.com/davidtheclark/react-aria-modal). Aquest és un exemple relativament estrany d'una finestra modal completament accessible. No només estableix el focus inicial en el botó de cancel·lació (prevenint que l'usuari del teclat activi accidentalment l'acció d'aprovació) i conserva el focus del teclat dins de la mateixa finestra modal, sinó que també retorna el focus a l'element que inicialment va activar la finestra.

>Nota:
>
>Tot i que es tracta d'una característica d'accessibilitat molt important, també és una tècnica que s'ha d'utilitzar de manera assenyada. Feu-la servir per reparar el flux d'enfocament del teclat quan estigui malament, però no per mirar d'anticipar com els usuaris voldran fer servir les aplicacions.

## Mouse and pointer events {#mouse-and-pointer-events}

Ensure that all functionality exposed through a mouse or pointer event can also be accessed using the keyboard alone. Depending only on the pointer device will lead to many cases where keyboard users cannot use your application.

To illustrate this, let's look at a prolific example of broken accessibility caused by click events. This is the outside click pattern, where a user can disable an opened popover by clicking outside the element.

<img src="../images/docs/outerclick-with-mouse.gif" alt="A toggle button opening a popover list implemented with the click outside pattern and operated with a mouse showing that the close action works." />

This is typically implemented by attaching a `click` event to the `window` object that closes the popover:

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
        <button onClick={this.onClickHandler}>Select an option</button>
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

This may work fine for users with pointer devices, such as a mouse, but operating this with the keyboard alone leads to broken functionality when tabbing to the next element as the `window` object never receives a `click` event. This can lead to obscured functionality which blocks users from using your application.

<img src="../images/docs/outerclick-with-keyboard.gif" alt="A toggle button opening a popover list implemented with the click outside pattern and operated with the keyboard showing the popover not being closed on blur and it obscuring other screen elements." />

The same functionality can be achieved by using appropriate event handlers instead, such as `onBlur` and `onFocus`:

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

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // If a child receives focus, do not close the popover.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React assists us by bubbling the blur and
    // focus events to the parent.
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

This code exposes the functionality to both pointer device and keyboard users. Also note the added `aria-*` props to support screen-reader users. For simplicity's sake the keyboard events to enable `arrow key` interaction of the popover options have not been implemented.

<img src="../images/docs/blur-popover-close.gif" alt="A popover list correctly closing for both mouse and keyboard users." />

This is one example of many cases where depending on only pointer and mouse events will break functionality for keyboard users. Always testing with the keyboard will immediately highlight the problem areas which can then be fixed by using keyboard aware event handlers.

## More Complex Widgets {#more-complex-widgets}

A more complex user experience should not mean a less accessible one. Whereas accessibility is most easily achieved by coding as close to HTML as possible, even the most complex widget can be coded accessibly.

Here we require knowledge of [ARIA Roles](https://www.w3.org/TR/wai-aria/#roles) as well as [ARIA States and Properties](https://www.w3.org/TR/wai-aria/#states_and_properties).
These are toolboxes filled with HTML attributes that are fully supported in JSX and enable us to construct fully accessible, highly functional React components.

Each type of widget has a specific design pattern and is expected to function in a certain way by users and user agents alike:

- [WAI-ARIA Authoring Practices - Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
- [Heydon Pickering - ARIA Examples](https://heydonworks.com/practical_aria_examples/)
- [Inclusive Components](https://inclusive-components.design/)

## Other Points for Consideration {#other-points-for-consideration}

### Setting the language {#setting-the-language}

Indicate the human language of page texts as screen reader software uses this to select the correct voice settings:

- [WebAIM - Document Language](https://webaim.org/techniques/screenreader/#language)

### Setting the document title {#setting-the-document-title}

Set the document `<title>` to correctly describe the current page content as this ensures that the user remains aware of the current page context:

- [WCAG - Understanding the Document Title Requirement](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

We can set this in React using the [React Document Title Component](https://github.com/gaearon/react-document-title).

### Color contrast {#color-contrast}

Ensure that all readable text on your website has sufficient color contrast to remain maximally readable by users with low vision:

- [WCAG - Understanding the Color Contrast Requirement](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- [Everything About Color Contrast And Why You Should Rethink It](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
- [A11yProject - What is Color Contrast](https://a11yproject.com/posts/what-is-color-contrast/)

It can be tedious to manually calculate the proper color combinations for all cases in your website so instead, you can [calculate an entire accessible color palette with Colorable](https://jxnblk.com/colorable/).

Both the aXe and WAVE tools mentioned below also include color contrast tests and will report on contrast errors.

If you want to extend your contrast testing abilities you can use these tools:

- [WebAIM - Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [The Paciello Group - Color Contrast Analyzer](https://www.paciellogroup.com/resources/contrastanalyser/)

## Development and Testing Tools {#development-and-testing-tools}

There are a number of tools we can use to assist in the creation of accessible web applications.

### The keyboard {#the-keyboard}

By far the easiest and also one of the most important checks is to test if your entire website can be reached and used with the keyboard alone. Do this by:

1. Disconnecting your mouse.
1. Using `Tab` and `Shift+Tab` to browse.
1. Using `Enter` to activate elements.
1. Where required, using your keyboard arrow keys to interact with some elements, such as menus and dropdowns.

### Development assistance {#development-assistance}

We can check some accessibility features directly in our JSX code. Often intellisense checks are already provided in JSX aware IDE's for the ARIA roles, states and properties. We also have access to the following tool:

#### eslint-plugin-jsx-a11y {#eslint-plugin-jsx-a11y}

The [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) plugin for ESLint provides AST linting feedback regarding accessibility issues in your JSX. Many IDE's allow you to integrate these findings directly into code analysis and source code windows.

[Create React App](https://github.com/facebookincubator/create-react-app) has this plugin with a subset of rules activated. If you want to enable even more accessibility rules, you can create an `.eslintrc` file in the root of your project with this content:

  ```json
  {
    "extends": ["react-app", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"]
  }
  ```

### Testing accessibility in the browser {#testing-accessibility-in-the-browser}

A number of tools exist that can run accessibility audits on web pages in your browser. Please use them in combination with other accessibility checks mentioned here as they can only
test the technical accessibility of your HTML.

#### aXe, aXe-core and react-axe {#axe-axe-core-and-react-axe}

Deque Systems offers [aXe-core](https://github.com/dequelabs/axe-core) for automated and end-to-end accessibility tests of your applications. This module includes integrations for Selenium.

[The Accessibility Engine](https://www.deque.com/products/axe/) or aXe, is an accessibility inspector browser extension built on `aXe-core`.

You can also use the [react-axe](https://github.com/dylanb/react-axe) module to report these accessibility findings directly to the console while developing and debugging.

#### WebAIM WAVE {#webaim-wave}

The [Web Accessibility Evaluation Tool](https://wave.webaim.org/extension/) is another accessibility browser extension.

#### Accessibility inspectors and the Accessibility Tree {#accessibility-inspectors-and-the-accessibility-tree}

[The Accessibility Tree](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) is a subset of the DOM tree that contains accessible objects for every DOM element that should be exposed
to assistive technology, such as screen readers.

In some browsers we can easily view the accessibility information for each element in the accessibility tree:

- [Using the Accessibility Inspector in Firefox](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
- [Using the Accessibility Inspector in Chrome](https://developers.google.com/web/tools/chrome-devtools/accessibility/reference#pane)
- [Using the Accessibility Inspector in OS X Safari](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

### Screen readers {#screen-readers}

Testing with a screen reader should form part of your accessibility tests.

Please note that browser / screen reader combinations matter. It is recommended that you test your application in the browser best suited to your screen reader of choice.

### Commonly Used Screen Readers {#commonly-used-screen-readers}

#### NVDA in Firefox {#nvda-in-firefox}

[NonVisual Desktop Access](https://www.nvaccess.org/) or NVDA is an open source Windows screen reader that is widely used.

Refer to the following guides on how to best use NVDA:

- [WebAIM - Using NVDA to Evaluate Web Accessibility](https://webaim.org/articles/nvda/)
- [Deque - NVDA Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

#### VoiceOver in Safari {#voiceover-in-safari}

VoiceOver is an integrated screen reader on Apple devices.

Refer to the following guides on how to activate and use VoiceOver:

- [WebAIM - Using VoiceOver to Evaluate Web Accessibility](https://webaim.org/articles/voiceover/)
- [Deque - VoiceOver for OS X Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
- [Deque - VoiceOver for iOS Shortcuts](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)

#### JAWS in Internet Explorer {#jaws-in-internet-explorer}

[Job Access With Speech](https://www.freedomscientific.com/Products/software/JAWS/) or JAWS, is a prolifically used screen reader on Windows.

Refer to the following guides on how to best use JAWS:

- [WebAIM - Using JAWS to Evaluate Web Accessibility](https://webaim.org/articles/jaws/)
- [Deque - JAWS Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

### Other Screen Readers {#other-screen-readers}

#### ChromeVox in Google Chrome {#chromevox-in-google-chrome}

[ChromeVox](https://www.chromevox.com/) is an integrated screen reader on Chromebooks and is available [as an extension](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en) for Google Chrome.

Refer to the following guides on how best to use ChromeVox:

- [Google Chromebook Help - Use the Built-in Screen Reader](https://support.google.com/chromebook/answer/7031755?hl=en)
- [ChromeVox Classic Keyboard Shortcuts Reference](https://www.chromevox.com/keyboard_shortcuts.html)
