---
id: forwarding-refs
title: Reenviament de Refs
permalink: docs/forwarding-refs.html
---

El reenviament de referències és una tècnica per passar automàticament una [ref](/docs/refs-and-the-dom.html) a través d'un component a un dels seus fills. Això normalment no és necessari per a la majoria dels components de l'aplicació. Tanmateix, pot ser útil per a alguns tipus de components, especialment en biblioteques de components reutilitzables. Els escenaris més comuns es descriuen a continuació.

## Reenviament de referències als components del DOM {#forwarding-refs-to-dom-components}

Considera un component (ButoElegant)`FancyButton` que renderitza l'element `button` nadiu del  DOM:
`embed:forwarding-refs/fancy-button-simple.js`

Els components de React amaguen els seus detalls d'implementació, incloent la seva sortida renderitzada. Altres components que fan servir el `FancyButton` **normalment no caldrà** [obtenen una ref](/docs/refs-and-the-dom.html) a l'element intern `button` del DOM. Això és bo perquè evita que els components es basin massa en l'estructura DOM dels altres.

Encara que aquesta encapsulació és desitjable per a components de nivell d'aplicació com `ElMeuTema` o `Comentari`, pot ser inconvenient per a components molt reutilitzables com `ButoElegant` o `ElMeuInputDeText`. Aquests components tendeixen a ser utilitzats en tota l'aplicació d'una manera similar a un `button` i `input` DOM, i accedir als seus nodes DOM pot ser inevitable per gestionar el focus, la selecció o les animacions.

**El reenviament de ref és una característica opcional que permet a alguns components prendre una `ref` que reben, i passar-la més avall (en altres paraules, "reenviant" a un component fill.**

A l'exemple de sota el component (ButoElegant) `FancyButton` utilitza `React.forwardRef` per obtenir la `ref` que se li ha passat, i després es dirigeix al `button` del DOM que el renderitza:

`embed:forwarding-refs/fancy-button-simple-ref.js`

D'aquesta manera, els components que utilitzen `FancyButton` poden obtenir una referència al node subjacent `button` del DOM i accedir-hi si és necessari, igual que si utilitzen un `button` del DOM directament.

A continuació hi trobaràs una explicació pas a pas del que passa a l'exemple anterior:

1. Creem una [ref de React](/docs/refs-and-the-dom.html) cridant `React.createRef` i assignant-la a una variable `ref`.
2. Passa la  nostra `ref` a `<FancyButton ref={ref}>` especificant-la com un atribut JSX.
3. React passa el `ref` a la funció `(props, ref) => ...` dins de `forwardRef` com a segon argument.
4. Reenviem aquest argument `ref` avall fins a `<button ref={ref}>` lligant-la com un atribut JSX.
5. Quan la referència està lligada , `ref.current` apuntarà al node `<button>` del DOM.

>Nota
>
>El segon argument `ref` només existeix quan definiu un component amb la crida `React.forwardRef`. Ni les funcions normals ni els components de classe reben l'argument `ref`, i la referència tampoc està disponible en les `props`.
>
>El reenviament de referències no està limitat als components del DOM. També podeu reenviar referències a instàncies de components de classe.

## Nota pels mantenidors de biblioteques de components {#note-for-component-library-maintainers}

**Quan comencis a fer servir `forwardRef` en una biblioteca de components hauries de tractar-la com un canvi incompatible i publicar una nova versió major de la teva biblioteca.** Això es deu al fet que la teva biblioteca probablement tindrà un comportament molt diferent (com ara a quins elements s'assignen les refs i a quins tipus s'exporten), i això pot fer incompatibles altres aplicacions i biblioteques que depenen del comportament antic.

Aplicar condicionadament `React.forwardRef` quan existeix no es recomana per les mateixes raons: canvia el comportament de la biblioteca i pot fer incompatibles les aplicacions dels usuaris quan actualitzin el mateix React.

## Reenviament de Referències en Components d'Ordre Superior {#forwarding-refs-in-higher-order-components}

This technique can also be particularly useful with [higher-order components](/docs/higher-order-components.html) (also known as HOCs). Let's start with an example HOC that logs component props to the console:
`embed:forwarding-refs/log-props-before.js`

The "logProps" HOC passes all `props` through to the component it wraps, so the rendered output will be the same. For example, we can use this HOC to log all props that get passed to our "fancy button" component:
`embed:forwarding-refs/fancy-button.js`

There is one caveat to the above example: refs will not get passed through. That's because `ref` is not a prop. Like `key`, it's handled differently by React. If you add a ref to a HOC, the ref will refer to the outermost container component, not the wrapped component.

This means that refs intended for our `FancyButton` component will actually be attached to the `LogProps` component:
`embed:forwarding-refs/fancy-button-ref.js`

Fortunately, we can explicitly forward refs to the inner `FancyButton` component using the `React.forwardRef` API. `React.forwardRef` accepts a render function that receives `props` and `ref` parameters and returns a React node. For example:
`embed:forwarding-refs/log-props-after.js`

## Displaying a custom name in DevTools {#displaying-a-custom-name-in-devtools}

`React.forwardRef` accepts a render function. React DevTools uses this function to determine what to display for the ref forwarding component.

For example, the following component will appear as "*ForwardRef*" in the DevTools:

`embed:forwarding-refs/wrapped-component.js`

If you name the render function, DevTools will also include its name (e.g. "*ForwardRef(myFunction)*"):

`embed:forwarding-refs/wrapped-component-with-function-name.js`

You can even set the function's `displayName` property to include the component you're wrapping:

`embed:forwarding-refs/customized-display-name.js`
