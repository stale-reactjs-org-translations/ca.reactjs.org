---
id: dom-elements
title: Elements DOM
layout: docs
category: Reference
permalink: docs/dom-elements.html
redirect_from:
  - "docs/tags-and-attributes.html"
  - "docs/dom-differences.html"
  - "docs/special-non-dom-attributes.html"
  - "docs/class-name-manipulation.html"
  - "tips/inline-styles.html"
  - "tips/style-props-value-px.html"
  - "tips/dangerously-set-inner-html.html"
---

<<<<<<< HEAD
React implementa un sistema DOM independent del navegador per una qüestió de rendiment i de compatibilitat entre navegadors. Vam aprofitar l'oportunitat per polir algunes arestes en les implementacions DOM del navegadors.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Common components (e.g. `<div>`)](https://beta.reactjs.org/reference/react-dom/components/common)
> - [`<input>`](https://beta.reactjs.org/reference/react-dom/components/input)
> - [`<option>`](https://beta.reactjs.org/reference/react-dom/components/option)
> - [`<progress>`](https://beta.reactjs.org/reference/react-dom/components/progress)
> - [`<select>`](https://beta.reactjs.org/reference/react-dom/components/select)
> - [`<textarea>`](https://beta.reactjs.org/reference/react-dom/components/textarea)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

React implements a browser-independent DOM system for performance and cross-browser compatibility. We took the opportunity to clean up a few rough edges in browser DOM implementations.
>>>>>>> b0ccb47f33e52315b0ec65edb9a49dc4910dd99c

A React, totes les propietats i atributs del DOM (inclosos els gestors d'esdeveniments) han de ser *camelCased*. Per exemple, l'atribut HTML `tabindex` es correspon amb l'atribut `tabIndex` a React. L'excepció a aquesta norma són els atributs `aria-*` i `data-*`, que s'han d'escriure del tot en minúscules. Per exemple, has de mantenir `aria-label` com `aria-label`.

## Atributs diferents {#differences-in-attributes}

Hi ha una sèrie d'atributs que funcionen de manera diferent entre React i HTML:

### checked {#checked}

L'atribut `checked` és compatible amb els components `<input>` del tipus `checkbox` o `radio`. El pots fer servir per establir si el component està marcat o no. Aquest atribut és útil per construir components controlats. `defaultChecked` és l'equivalent per a no controlat, i estableix si el component es marca quan es munta per primera vegada.

### className {#classname}

Per especificar una classe CSS, s'utilitza l'atribut `className`. Aquest s'aplica a tots els elements regulars DOM i SVG com ara `<div>`, `<a>`, i d'altres.

Si fas servir React amb *Web Components* (que és poc habitual), llavors has de fer servir l'atribut `class`.

### dangerouslySetInnerHTML {#dangerouslysetinnerhtml}

`dangerouslySetInnerHTML` és la substitució de React per a `innerHTML` del DOM del navegador . En general, l'establiment d'HTML a partir del codi és arriscat perquè és fàcil exposar inadvertidament els usuaris a un atac [XSS](https://ca.wikipedia.org/wiki/Cross_Site_Scripting). Així que pots establir HTML directament des de React, però has d'escriure `dangerouslySetInnerHTML` i passar un objecte amb una clau `__html`, per recordar-te que és perillós. Per exemple:

```js
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

### htmlFor {#htmlfor}

Com que `for` és una paraula reservada a JavaScript, els elements de React fan servir `htmlFor`.

### onChange {#onchange}

L'esdeveniment `onChange` es comporta tal i com s'esperaria: quan es canvia un camp de formulari, aquest esdeveniment es dispara. No fem servir el comportament propi del navegador intencionadament perquè `onChange` és un nom poc apropiat pel comportament que té i React confia en aquest esdeveniment per gestionar l'entrada de l'usuari en temps real.

### selected {#selected}

Per marcar una `<option>` com a seleccionada, has de referenciar el valor d'aquesta opció a l'atribut `value` del seu `<select>` enlloc de fer servir l'atribut HTML `selected`. 

Consulta ["L'etiqueta seleccionada"](/docs/forms.html#the-select-tag) si busques instruccions detallades.

### style {#style}

>Nota
>
>Alguns exemples de la documentació utilitzen `style` per comoditat, però **en general no es recomana fer servir l'atribut `style` com a mitjà principal per donar estil als elements.** En la majoria de casos, faràs servir [`className`](#classname) per a fer referència a classes definides en un full d'estil CSS extern. La manera més comuna d'emprar `style` a les aplicacions React és quan vols afegir estils generats dinàmicament en el moment de la renderització. Consulta també [FAQ: Estils i CSS](/docs/faq-styling.html).

L'atribut `style` accepta un objecte JavaScript amb les propietats escrites en forma *camelCased* en lloc de la forma CSS. Això no només és coherent amb la propietat JavaScript `style` del DOM, sinó que és més eficient i també evita els forats de seguretat XSS. Per exemple:

```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

Tingues en compte que els estils no estan prefixats automàticament. Perque sigui compatible amb els navegadors més antics, cal afegir les propietats d'estil corresponents:

```js
const divStyle = {
  WebkitTransition: 'all', // fixat aquí amb la 'W' majúscula
  msTransition: 'all' // 'ms' és l'únic prefix de proveïdor en minúscules
};

function ComponentWithTransition() {
  return <div style={divStyle}>This should work cross-browser</div>;
}
```

Les claus d'estil s'escriuen en la forma *camelCased* per ser coherents amb la manera d'accedir a les propietats dels nodes DOM de JS (p. ex. `node.style.backgroundImage`). Els prefixos del proveïdor [excepte `ms`](https://www.andismith.com/blogs/2012/02/modernizr-prefixed/) començaran amb una lletra majúscula. Aquesta és la raó per la qual `WebkitTransition` té una «W» majúscula.

React afegirà automàticament un sufix «px» a certes propietats numèriques de `style`. Si vols fer servir unitats diferents de "px", especifica el valor com una cadena amb la unitat desitjada. Per exemple:

```js
// Result style: '10px'
<div style={{ height: 10 }}>
  Hola Món!
</div>

// Result style: '10%'
<div style={{ height: '10%' }}>
  Hola Món!
</div>
```

No totes les propietats d'estil numèriques es converteixen en cadenes de píxels. Algunes romanen sense unitats (p. ex. `zoom`, `order`, `flex`). Es pot veure una llista completa d'aquestes propietats sense unitats [aquí](https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js#L15-L59).

### suppressContentEditableWarning {#suppresscontenteditablewarning}

Normalment, salta un avís quan un element amb fills ha sigut marcat també com a `contentEditable`, perquè no funcionarà. Aquest atribut suprimeix aquest avís. No l'utilitzis llevat que estiguis construint una biblioteca com ara [Draft.js](https://facebook.github.io/draft-js/) que gestiona `contentEditable` manualment.

### suppressHydrationWarning {#suppresshydrationwarning}

Si fas servir la renderització de React a l'entorn del servidor, normalment salta un avís quan el servidor i el client renderitzen contingut diferent. De totes maneres, en alguns casos rars, és molt difícil o gairebé impossible garantir una coincidència exacta. Per exemple, s'espera que els codis de temps difereixin entre el servidor i el client. 

<<<<<<< HEAD
Si estableixes `suppressHydrationWarning` a `true`, React no t'avisarà de les diferències ni en els atributs ni en el contingut d'aquests elements. Només funciona amb un nivell de profunditat, i es pretén que es faci servir com una escotilla de sortida. No el facis servir en excès. Pots llegir més sobre la hidratació a [Documentació sobre `ReactDOM.hydrate()`](/docs/react-dom.html#hidrat).
=======
If you set `suppressHydrationWarning` to `true`, React will not warn you about mismatches in the attributes and the content of that element. It only works one level deep, and is intended to be used as an escape hatch. Don't overuse it. You can read more about hydration in the [`ReactDOM.hydrateRoot()` documentation](/docs/react-dom-client.html#hydrateroot).
>>>>>>> b0ccb47f33e52315b0ec65edb9a49dc4910dd99c

### value {#value}

L'atribut `value` és compatible amb els components `<input>`, `<select>` and `<textarea>`. Pots fer-lo servir per establir el valor del component. És útil per a construir components controlats. `defaultValue` és l'equivalent per a no controlat, i estableix el valor del component quan es munta per primera vegada.

## Tots els atributs HTML compatibles {#all-supported-html-attributes}

A partir de React 16, qualsevol atribut DOM [estàndard o personalitzat](/blog/2017/09/08/attributes-in-react-16.html) és totalment compatible.

React sempre ha proporcionat una API JavaScript del DOM. Com que els components de React sovint prenen tant *props* personalitzades com relacionades amb el DOM, React utilitza la convenció `camelCase` tal com ho fan les APIs del DOM:

```js
<div tabIndex={-1} />      // Igual que node.tabIndex de la API del DOM
<div className="Button" /> // Igual que node.className de la API del DOM
<input readOnly={true} />  // Igual que node.readOnly de la API del DOM
```

Aquestes *props* funcionen de la mateixa manera que els atributs HTML corresponents, amb l'excepció dels casos especials documentats més amunt.

Alguns dels atributs DOM compatibles amb React són:

```
accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap
```

Així també, tots els atributs SVG són totalment compatibles:

```
accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
clip clipPath clipPathUnits clipRule colorInterpolation
colorInterpolationFilters colorProfile colorRendering contentScriptType
contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
end exponent externalResourcesRequired fill fillOpacity fillRule filter
filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
limitingConeAngle local markerEnd markerHeight markerMid markerStart
markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
numOctaves offset opacity operator order orient orientation origin overflow
overlinePosition overlineThickness paintOrder panose1 pathLength
patternContentUnits patternTransform patternUnits pointerEvents points
pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
spacing specularConstant specularExponent speed spreadMethod startOffset
stdDeviation stemh stemv stitchTiles stopColor stopOpacity
strikethroughPosition strikethroughThickness string stroke strokeDasharray
strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
textDecoration textLength textRendering to transform u1 u2 underlinePosition
underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase
xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
```

I també pots fer servir atributs personalitzats sempre que estiguin en minúscules.
