---
id: thinking-in-react
title: Pensant en React
permalink: docs/thinking-in-react.html
redirect_from:
  - 'blog/2013/11/05/thinking-in-react.html'
  - 'docs/thinking-in-react-zh-CN.html'
prev: composition-vs-inheritance.html
---

React és, en la nostra opinió, la millor forma de contruir grans i ràpides aplicacions web amb JavaScript. Ha escalat molt bé per a nosaltres a Facebook i Instagram.

Una de les parts més grans de React és com et fa pensar de les aplicacions mentres les construeixes. En aquest document, t'ensenyarem el procés de contruir una taula de productes amb una funcionalitat de cerca emprant React.

## Comença amb una maqueta {#start-with-a-mock}

Imagina que ja tenim una API JSON i una maqueta del nostre dissenyador. La maqueta té aquesta pinta:

![Mockup](../images/blog/thinking-in-react-mock.png)

La nostra JSON API retorna dades que són així:

```
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

## Pas 1: Partir l'interfície d'usuari en una jerarquia de components {#step-1-break-the-ui-into-a-component-hierarchy}

La primera cosa que hauries de fer és dibuixar capces al voltant de cada component (i subcomponent) a la maqueta i donar-lis noms a tots. Si estàs treballant amb un equip de disseny, pot ser ja ha fet això, així que ves a comentar-ho! Les capes de Photoshop que hagin usat poden acabar sent els teus components de React!

Però com saps què hauria de ser el seu propi component? Usa la mateixa tècnica per decidir si hauries de crear una nova funció o objecte. Una tècnica és la del [principi de responsabilitat única](https://en.wikipedia.org/wiki/Single_responsibility_principle), que és, un component només hauria de fer idealment una sola cosa. Si acaba creixent, hauria de descomposar-se en components més petits.

Com que normalment mostres un model de dades JSON a l'usuari, veuràs que si el teu model ha estat construit de manera adequada, la teva interfície d'usuari (i llavors la teva estructura de components) encaixarà perfectament. Això passa perquè les interfícies d'usuari i els models de dades tendeixen a seguir la mateixa *arquitectura d'informació*. Separa la teva interfície d'usuari en components, on cada component representa una part del teu model de dades.

![Component diagram](../images/blog/thinking-in-react-components.png)

Veuràs aquí que tenim cinc components a la nostra aplicació. Hem escrit en itàlica les dades que cada component representa.

  1. **`FilterableProductTable` (taronja):** conté tot l'exemple
  2. **`SearchBar` (blau):** rep totes *les entrades de l'usuari*
  3. **`ProductTable` (verd):** mostra i filtra la *colecció de dades* basades en *les entrades de l'usuari*
  4. **`ProductCategoryRow` (turquesa):** mostra una capçalera per a cada *categoria*
  5. **`ProductRow` (vermell):** mostra una fila per cada *producte*

Si mires `ProductTable`, veuràs que la capçalera de la taula (contenint les etiquetes "Name" i "Price") no és el seu propi component. Això és qüestió de preferència, i hi ha una raons per fer-ho de distintes formes. Per a aquest exemple, l'hem deixat com a part de `ProductTable` perquè forma part de renderitzar la *colecció de dades* que és la responsabilitat de `ProductTable`. Malgrat això, si aquesta capçalera es torna complexa (per exemple, si volguéssim afegir una forma d'ordenar-la), tendria sentit que `ProductTableHeader` fos el seu propi component.

Ara que hem identificat els components a la maqueta, posem-los en jerarquia. Els components que apareixin a dins altres components a la maqueta haurien d'aparèixer com a fills a la jerarquia:

  * `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
      * `ProductCategoryRow`
      * `ProductRow`

## Pas 2: Contruir una versió estàtica amb React {#step-2-build-a-static-version-in-react}

<p data-height="600" data-theme-id="0" data-slug-hash="BwWzwm" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">Mira el Pen <a href="https://codepen.io/gaearon/pen/BwWzwm">Thinking In React: Step 2</a> a <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Ara que tens la jerarquia de components, és el moment d'implementar la teva aplicació. La forma més fàcil és construir una versió que agafa el teu model de dades i renderitza la interfície d'usuari però no té cap interactivitat. És millor separar aquests processos perquè contruir una versió estàtica requereix molta escriptura i no pensar, i afegir interactivitat requereix molt de pensar i poca escriptura. Veurem per què.

Per construir una versió estàtica de la teva aplicació que renderitzi el teu model de dades, voldràs crear components que reusin altres components i passin dades usant *props*. *props* són una forma de passar dades de pares a fills. Si ets familiar amb el concepte d'*estat*, **no usis estat de cap manera** per construir aquesta versió estàtica. L'estat està reservat només per a la interactivitat, que és, dades que canvien al llarg del temps. Com que això és una versió estàtica de l'aplicació, no el necessites.

You can build top-down or bottom-up. That is, you can either start with building the components higher up in the hierarchy (i.e. starting with `FilterableProductTable`) or with the ones lower in it (`ProductRow`). In simpler examples, it's usually easier to go top-down, and on larger projects, it's easier to go bottom-up and write tests as you build.

At the end of this step, you'll have a library of reusable components that render your data model. The components will only have `render()` methods since this is a static version of your app. The component at the top of the hierarchy (`FilterableProductTable`) will take your data model as a prop. If you make a change to your underlying data model and call `ReactDOM.render()` again, the UI will be updated. You can see how your UI is updated and where to make changes. React's **one-way data flow** (also called *one-way binding*) keeps everything modular and fast.

Refer to the [React docs](/docs/) if you need help executing this step.

### A Brief Interlude: Props vs State {#a-brief-interlude-props-vs-state}

There are two types of "model" data in React: props and state. It's important to understand the distinction between the two; skim [the official React docs](/docs/state-and-lifecycle.html) if you aren't sure what the difference is. See also [FAQ: What is the difference between state and props?](/docs/faq-state.html#what-is-the-difference-between-state-and-props)

## Step 3: Identify The Minimal (but complete) Representation Of UI State {#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

To make your UI interactive, you need to be able to trigger changes to your underlying data model. React achieves this with **state**.

To build your app correctly, you first need to think of the minimal set of mutable state that your app needs. The key here is [DRY: *Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Figure out the absolute minimal representation of the state your application needs and compute everything else you need on-demand. For example, if you're building a TODO list, keep an array of the TODO items around; don't keep a separate state variable for the count. Instead, when you want to render the TODO count, take the length of the TODO items array.

Think of all of the pieces of data in our example application. We have:

  * The original list of products
  * The search text the user has entered
  * The value of the checkbox
  * The filtered list of products

Let's go through each one and figure out which one is state. Ask three questions about each piece of data:

  1. Is it passed in from a parent via props? If so, it probably isn't state.
  2. Does it remain unchanged over time? If so, it probably isn't state.
  3. Can you compute it based on any other state or props in your component? If so, it isn't state.

The original list of products is passed in as props, so that's not state. The search text and the checkbox seem to be state since they change over time and can't be computed from anything. And finally, the filtered list of products isn't state because it can be computed by combining the original list of products with the search text and value of the checkbox.

So finally, our state is:

  * The search text the user has entered
  * The value of the checkbox

## Step 4: Identify Where Your State Should Live {#step-4-identify-where-your-state-should-live}

<p data-height="600" data-theme-id="0" data-slug-hash="qPrNQZ" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/qPrNQZ">Thinking In React: Step 4</a> on <a href="https://codepen.io">CodePen</a>.</p>

OK, so we've identified what the minimal set of app state is. Next, we need to identify which component mutates, or *owns*, this state.

Remember: React is all about one-way data flow down the component hierarchy. It may not be immediately clear which component should own what state. **This is often the most challenging part for newcomers to understand,** so follow these steps to figure it out:

For each piece of state in your application:

  * Identify every component that renders something based on that state.
  * Find a common owner component (a single component above all the components that need the state in the hierarchy).
  * Either the common owner or another component higher up in the hierarchy should own the state.
  * If you can't find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.

Let's run through this strategy for our application:

  * `ProductTable` needs to filter the product list based on state and `SearchBar` needs to display the search text and checked state.
  * The common owner component is `FilterableProductTable`.
  * It conceptually makes sense for the filter text and checked value to live in `FilterableProductTable`

Cool, so we've decided that our state lives in `FilterableProductTable`. First, add an instance property `this.state = {filterText: '', inStockOnly: false}` to `FilterableProductTable`'s `constructor` to reflect the initial state of your application. Then, pass `filterText` and `inStockOnly` to `ProductTable` and `SearchBar` as a prop. Finally, use these props to filter the rows in `ProductTable` and set the values of the form fields in `SearchBar`.

You can start seeing how your application will behave: set `filterText` to `"ball"` and refresh your app. You'll see that the data table is updated correctly.

## Step 5: Add Inverse Data Flow {#step-5-add-inverse-data-flow}

<p data-height="600" data-theme-id="0" data-slug-hash="LzWZvb" data-default-tab="js,result" data-user="rohan10" data-embed-version="2" data-pen-title="Thinking In React: Step 5" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/LzWZvb">Thinking In React: Step 5</a> on <a href="https://codepen.io">CodePen</a>.</p>

So far, we've built an app that renders correctly as a function of props and state flowing down the hierarchy. Now it's time to support data flowing the other way: the form components deep in the hierarchy need to update the state in `FilterableProductTable`.

React makes this data flow explicit to help you understand how your program works, but it does require a little more typing than traditional two-way data binding.

If you try to type or check the box in the current version of the example, you'll see that React ignores your input. This is intentional, as we've set the `value` prop of the `input` to always be equal to the `state` passed in from `FilterableProductTable`.

Let's think about what we want to happen. We want to make sure that whenever the user changes the form, we update the state to reflect the user input. Since components should only update their own state, `FilterableProductTable` will pass callbacks to `SearchBar` that will fire whenever the state should be updated. We can use the `onChange` event on the inputs to be notified of it. The callbacks passed by `FilterableProductTable` will call `setState()`, and the app will be updated.

## And That's It {#and-thats-it}

Hopefully, this gives you an idea of how to think about building components and applications with React. While it may be a little more typing than you're used to, remember that code is read far more than it's written, and it's less difficult to read this modular, explicit code. As you start to build large libraries of components, you'll appreciate this explicitness and modularity, and with code reuse, your lines of code will start to shrink. :)
