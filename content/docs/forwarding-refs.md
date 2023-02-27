---
id: forwarding-refs
title: Reenviament de Refs
permalink: docs/forwarding-refs.html
---

<<<<<<< HEAD
El reenviament de referències és una tècnica per passar automàticament una [ref](/docs/refs-and-the-dom.html) a través d'un component a un dels seus fills. Això normalment no és necessari per a la majoria dels components de l'aplicació. Tanmateix, pot ser útil per a alguns tipus de components, especialment en biblioteques de components reutilitzables. Els escenaris més comuns es descriuen a continuació.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Manipulating the DOM with Refs](https://beta.reactjs.org/learn/manipulating-the-dom-with-refs)
> - [`forwardRef`](https://beta.reactjs.org/reference/react/forwardRef)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

Ref forwarding is a technique for automatically passing a [ref](/docs/refs-and-the-dom.html) through a component to one of its children. This is typically not necessary for most components in the application. However, it can be useful for some kinds of components, especially in reusable component libraries. The most common scenarios are described below.
>>>>>>> b0ccb47f33e52315b0ec65edb9a49dc4910dd99c

## Reenviament de referències als components del DOM {#forwarding-refs-to-dom-components}

Considera un component (BotoElegant)`FancyButton` que renderitza l'element `button` nadiu del DOM:
`embed:forwarding-refs/fancy-button-simple.js`

Els components de React amaguen els seus detalls d'implementació, incloent la seva sortida renderitzada. Altres components que fan servir el `FancyButton` **normalment no caldrà** [que obtenguin una ref](/docs/refs-and-the-dom.html) a l'element intern `button` del DOM. Això és bo perquè evita que els components es basin massa en l'estructura DOM dels altres.

Encara que aquesta encapsulació és desitjable per a components de nivell d'aplicació com `ElMeuTema` o `Comentari`, pot ser inconvenient per a components molt reutilitzables com `BotoElegant` o `ElMeuInputDeText`. Aquests components tendeixen a ser utilitzats en tota l'aplicació d'una manera similar a un `button` i `input` DOM, i accedir als seus nodes DOM pot ser inevitable per gestionar el focus, la selecció o les animacions.

**El reenviament de ref és una característica opcional que permet a alguns components prendre una `ref` que reben, i passar-la més avall (en altres paraules, "reenviant" a un component fill.**

A l'exemple de sota el component (BotoElegant) `FancyButton` utilitza `React.forwardRef` per obtenir la `ref` que se li ha passat, i després es dirigeix al `button` del DOM que el renderitza:

`embed:forwarding-refs/fancy-button-simple-ref.js`

D'aquesta manera, els components que utilitzen `FancyButton` poden obtenir una referència al node subjacent `button` del DOM i accedir-hi si és necessari, igual que si utilitzen un `button` del DOM directament.

A continuació hi trobaràs una explicació pas a pas del que passa a l'exemple anterior:

1. Creem una [ref de React](/docs/refs-and-the-dom.html) cridant `React.createRef` i assignant-la a una variable `ref`.
1. Passem la  nostra `ref` a `<FancyButton ref={ref}>` especificant-la com un atribut JSX.
1. React passa la `ref` a la funció `(props, ref) => ...` dins de `forwardRef` com a segon argument.
1. Reenviem aquest argument `ref` avall fins a `<button ref={ref}>` lligant-lo com un atribut JSX.
1. Quan la referència estigui lligada , `ref.current` apuntarà al node `<button>` del DOM.

>Nota
>
>El segon argument `ref` només existeix quan definiu un component amb la crida `React.forwardRef`. Ni les funcions normals ni els components de classe reben l'argument `ref`, i la referència tampoc està disponible en les `props`.
>
>El reenviament de referències no està limitat als components del DOM. També podeu reenviar referències a instàncies de components de classe.

## Nota pels mantenidors de biblioteques de components {#note-for-component-library-maintainers}

**Quan comencis a fer servir `forwardRef` en una biblioteca de components hauries de tractar-la com un canvi incompatible i publicar una nova versió major de la teva biblioteca.** Això es deu al fet que la teva biblioteca probablement tindrà un comportament molt diferent (com ara a quins elements s'assignen les refs i a quins tipus s'exporten), i això pot fer incompatibles altres aplicacions i biblioteques que depenen del comportament antic.

Aplicar condicionadament `React.forwardRef` quan existeix no es recomana per les mateixes raons: canvia el comportament de la biblioteca i pot fer incompatibles les aplicacions dels usuaris quan actualitzin el mateix React.

## Reenviament de Referències en components d'ordre superior {#forwarding-refs-in-higher-order-components}

Aquesta tècnica també pot ser particularment útil amb [components d'ordre superior](/docs/higher-order-components.html) (també coneguts com a HOCs). Comencem amb un exemple HOC que mostra a console les `props` dels components que embolica:
`embed:forwarding-refs/log-props-before.js`

L'HOC "logProps" mostra totes les `props` del component que embolica, de manera que la sortida renderitzada serà la mateixa. Per exemple, podem utilitzar aquest HOC per mostrar totes les `props` que es passen al nostre component de "botó elegant":
`embed:forwarding-refs/fancy-button.js`

Hi ha, però, un problema a l'exemple anterior: les referències no es passaran. Això és perquè `ref` no és una `prop`. Igual que `key`, és gestionat de manera diferent per React. Si afegiu una referència a un HOC, la referència es refereix al component de contenidor més extern, no al component embolicat.

Això significa que les referències destinades al nostre component `FancyButton` s'afegiran al component `LogProps`:
`embed:forwarding-refs/fancy-button-ref.js`

Per sort, però, podem reenviar explícitament les referències al component interior `FancyButton` utilitzant l'API `React.forwardRef`. `React.forwardRef` accepta una funció de renderització que rep els paràmetres `props` i `ref` i retorna un node React. Per exemple:
`embed:forwarding-refs/log-props-after.js`

## Mostrar un nom personalitzat a DevTools {#displaying-a-custom-name-in-devtools}

`React.forwardRef` accepta una funció de renderitzat. React DevTools utilitza aquesta funció per saber què ha de mostrar del component que fa el reenviament.

Per exemple, el component següent apareixerà com a "*ForwardRef*" en les DevTools:

`embed:forwarding-refs/wrapped-component.js`

Si dones nom a la funció de renderització, DevTools també n'inclourà el seu nom (e.g. "*ForwardRef(myFunction)*"):

`embed:forwarding-refs/wrapped-component-with-function-name.js`

Fins i tot pots establir la propietat `displayName` de la funció per incloure el component que està embolicat:

`embed:forwarding-refs/customized-display-name.js`
