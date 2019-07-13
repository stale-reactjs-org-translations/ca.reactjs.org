---
id: hello-world
title: Hola món
permalink: docs/hello-world.html
prev: cdn-links.html
next: introducing-jsx.html
---

El més curt dels exemples de React té aquesta pinta:

```js
ReactDOM.render(
  <h1>Hola, món!</h1>,
  document.getElementById('root')
);
```

L'exemple mostra una capçalera amb el text "Hola, món!" a la pàgina.

[](codepen://hello-world)

Fes clic a l'enllaç de dalt per obrir un editor en línia. Pren-te la llibertat de fer canvis, i mira com afecten el resultat. La majoria de pàgines en aquesta guia tindran exemples que pots editar en viu com aquest.

## Com llegir aquesta guia? {#how-to-read-this-guide}

En aquesta guia, examinarem els components bàsics de les aplicacions React: elements i components. Un cop els dominis, podràs crear aplicacions complexes a partir de petites peces reutilitzables.

> Consell
>
> Aquesta guia està dissenyada per a persones que prefereixen **aprendre els conceptes pas a pas**. Si prefereixes aprendre mitjançant pràctica, revisa el nostre [tutorial pràctic](/tutorial/tutorial.html). Trobaràs que aquesta guia i el tutorial es complementen l'un a l'altre.

Aquest és el primer capítol d'una guia pas a pas sobre els principals conceptes de React. Pots trobar una llista de tots els capítols a la barra de navegació lateral. Si estàs llegint això des d'un dispositiu mòbil, pots accedir a la navegació prement el botó a la part inferior dreta de la pantalla.

Cada capítol en aquesta guia es construeix sobre la base del coneixement presentat en capítols anteriors. **Pots aprendre la majoria de React llegint la guia de conceptes "Conceptes Principals" en l'ordre que apareixen a la barra lateral.** Per exemple, ["Introducció a JSX"](/docs/introducing-jsx.html) és el següent capítol després d'aquest.

## Suposicions del nivell de coneixement {#knowledge-level-assumptions}

React és una biblioteca JavaScript, i assumim que tens un coneixement bàsic del llenguatge JavaScript. **Si no et sents molt segur, et recomanem [fer un tutorial de JavaScript](https://developer.mozilla.org/ca/docs/Web/JavaScript/A_re-introduction_to_JavaScript) per comprovar el teu nivell de coneixement** i permetre't seguir endavant amb aquesta guia sense perdre't. Hauries de tardar entre 30 minuts i una hora, com a benefici, no sentiràs que estàs aprenent React i JavaScript al mateix temps.

> Nota
>
> Aquesta guia ocasionalment fa servir la nova sintaxi de JavaScript en els exemples. Si no has treballat amb JavaScript en els últims anys, [aquests tres punts](https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c) són un bon resum.

## Comencem! {#lets-get-started}

Segueix baixant, i trobaràs el link al [següent capítol d'aquesta guia](/docs/introducing-jsx.html) just abans del peu de la pàgina.
