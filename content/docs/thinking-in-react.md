---
id: thinking-in-react
title: Denken in React
permalink: docs/thinking-in-react.html
redirect_from:
  - 'blog/2013/11/05/thinking-in-react.html'
  - 'docs/thinking-in-react-zh-CN.html'
prev: composition-vs-inheritance.html
---

React ist unserer Meinung nach der beste Weg, um große, schnelle Web Applikationen mit JavaScript zu erstellen. Es hat sich für uns bei Facebook und Instagram sehr gelohnt.

Einer der vielen großartigen Teile von React ist, wie es dich zum Nachdenken über die Applikationen bringt, während du sie erstellst. In diesem Dokument führen wir dich durch den Denkprozess, wie man eine durchsuchbare Produktdatentabelle mit React erstellt.

## Beginne mit einem Mock-Up {#start-with-a-mock}

Stell dir vor, dass wir bereits eine JSON API und ein Mock-Up unseres Designers haben. Das Mock-Up sieht so aus:

![Mockup](../images/blog/thinking-in-react-mock.png)

Unsere JSON API gibt uns Daten zurück, die folgendermaßen aussehen:

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

## Schritt 1: Zerlege die Benutzeroberfläche in eine Komponentenhierarchie {#step-1-break-the-ui-into-a-component-hierarchy}

Zuerst solltest du um jede Komponente und Unterkomponente des Mock-Ups eine Box zeichnen und jeder einen Name geben. Falls du mit einem Designer zusammenarbeitest, hat er das vielleicht schon getan, also geh und frage ihn! Die Namen der Photoshop-Ebenen könnten letztendlich die Namen deiner React-Komponenten sein!

Aber woher weißt du, was eine eigene Komponente sein sollte? Verwende einfach die gleichen Techniken, die du auch verwendest, um zu entscheiden, ob du eine neue Funktion oder ein neues Objekt anlegen möchtest. Eine dieser Techniken ist das[Single Responsibility Prinzip](https://de.wikipedia.org/wiki/Single-Responsibility-Prinzip), d.h. eine Komponente sollte idealerweise nur eine Aufgabe erledigen. Sobald sie wächst, sollte sie in kleinere Teilkomponenten zerlegt werden.

Da du einem Benutzer häufig ein JSON Datenmodell präsentieren wirst, wirst du feststellen, dass, falls dein Datenmodell korrekt aufgebaut wurde, deine Benutzeroberfläche (und damit auch deine Komponentenstruktur) gut dazu zusammenpasst. Das liegt daran, dass Benutzeroberfläche und Datenmodell tendenziell der gleichen *Informationsarchitektur* folgen, was bedeutet, dass es oft trivial ist, deine Benutzeroberfläche in Komponenten aufzuteilen. Zerlege sie einfach in Komponenten, die genau ein Stück deines Datenmodells darstellen.

![Component diagram](../images/blog/thinking-in-react-components.png)

Du siehst hier, dass wir fünf Komponenten in unserer einfachen App haben. Wir haben die Daten, die von jeder Komponente repräsentiert werden, kursiv dargestellt.

  1. **`FilterableProductTable` (orange):** enthält das gesamte Beispiel
  2. **`SearchBar` (blau):** empfängt alle *Benutzereingaben*
  3. **`ProductTable` (grün):** zeigt und filtert die *Daten* basierend auf *Benutzereingaben* an
  4. **`ProductCategoryRow` (türkis):** zeigt eine Überschrift für jede *Kategorie* an
  5. **`ProductRow` (rot):** zeigt eine Zeile für jedes *Produkt* an

Wenn du dir `ProductTable` anschaust, wirsts du feststellen, dass der Tabellenkopf (mit den Bezeichnungen "Name" und "Price") keine eigene Komponente ist. Das ist eine Frage der Präferenz und es gibt Argumente für beide Seiten. Für dieses Beispiel haben wir ihn als Teil von `ProductTable` gelassen, da er Teil der Darstellung der *Daten* ist, die in der Verantwortung von `ProductTable` liegt. Wenn diese Kopfzeile jedoch immer komplexer werden sollte (d.h. falls wir beispielsweise eine Sortierung hinzufügen würden), wäre es sicherlich sinnvoll, diese Kopfzeile zu einer eigenen `ProductTableHeader`-Komponente zu machen.

Nachdem wir nun die Komponenten in unserem Mock-Up identifiziert haben, lass uns diese in eine Hierarchie einordnen. Das ist einfach. Komponenten, die innerhalb einer anderen Komponente im Mock-Up erscheinen, sollten als Kind in der Hierarchie erscheinen:

  * `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
      * `ProductCategoryRow`
      * `ProductRow`

## Schritt 2: Erstelle eine statische Version in React {#step-2-build-a-static-version-in-react}

<p data-height="600" data-theme-id="0" data-slug-hash="BwWzwm" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/BwWzwm">Thinking In React: Step 2</a> on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Jetzt, da du deine Komponentenhierarchie hast, ist es an der Zeit, die Applikation zu implementieren. Der einfachste Weg ist, eine Version zu erstellen, die dein Datenmodell verwendet und die Benutzeroberfläche rendert, aber keine Interaktivität hat. Es ist am besten, diese Prozesse zu entkoppeln, denn die Erstellung einer statischen Version erfordert viel Tippen und weniger Nachdenken, und das Hinzufügen von Interaktivität erfordert viel Nachdenken und weniger Tippen. Wir werden sehen, warum.

Um eine statische Version deiner App zu erstellen, die dein Datenmodell rendert, solltest du Komponenten erstellen, die andere Komponenten wiederverwenden und Daten per *Props* weitergeben. *Props* sind eine Möglichkeit, Daten von Eltern zu Kind zu übertragen. Wenn du mit dem Konzept von *state* vertraut bist, verwende **state hierfür noch nicht**, um diese statische Version zu erstellen. State ist nur für Interaktivität reserviert, d.h. Daten, die sich im Laufe der Zeit ändern. Da es sich um eine statische Version der App handelt, benötigst du ihn nicht.

Du kannst von oben nach unten (top-down) oder von unten nach oben (bottom-up) vorgehen. Das heißt, du kannst entweder mit dem Aufbau der Komponenten von oben in der Hierarchie beginnen (d.h. mit `FilterableProductTable`) oder mit denjenigen weiter unten (`ProductRow`). In simpleren Beispielen ist es in der Regel einfacher, von oben nach unten zu gehen, und bei größeren Projekten ist es einfacher, beim Erstellen von unten nach oben zu gehen und gleichzeitig Tests zu schreiben.

Am Ende dieses Schrittes steht dir eine Ansammlung von wiederverwendbaren Komponenten zur Verfügung, die dein Datenmodell darstellt. Die Komponenten haben jeweils nur eine `render()` Methode, da es sich um eine statische Version deiner App handelt. Die Komponente an der Spitze der Hierarchie (`FilterableProductTable`) nimmt dein Datenmodell als Prop. Wenn du eine Änderung an deinem zugrunde liegenden Datenmodell vornimmst und `ReactDOM.render()` erneut aufrufst, wird die Benutzeroberfläche aktualisiert. Es ist leicht zu erkennen, wie deine Benutzeroberfläche aktualisiert wird und wo Änderungen vorgenommen werden können, da nichts Kompliziertes vor sich geht. React's **One-Way-Data Flow** (Daten fließen nur in eine Richtung) (auch *One-Way-Binding* genannt) hält alles modular und schnell.

Wenn du Hilfe bei der Ausführung dieses Schrittes benötigst, schaue einfach in die [React docs](/docs/).

### Ein kurzer Einschub: Props vs State {#a-brief-interlude-props-vs-state}

Es gibt zwei Arten von Daten in React: Props und State. Es ist wichtig, den Unterschied zwischen den beiden zu verstehen; durchforste [die offiziellen React-Docs](/docs/interactivity-and-dynamic-uis.html), wenn du sich nicht sicher bist, was der Unterschied ist.

## Step 3: Identify The Minimal (but complete) Representation Of UI State {#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

To make your UI interactive, you need to be able to trigger changes to your underlying data model. React makes this easy with **state**.

To build your app correctly, you first need to think of the minimal set of mutable state that your app needs. The key here is [DRY: *Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Figure out the absolute minimal representation of the state your application needs and compute everything else you need on-demand. For example, if you're building a TODO list, just keep an array of the TODO items around; don't keep a separate state variable for the count. Instead, when you want to render the TODO count, simply take the length of the TODO items array.

Think of all of the pieces of data in our example application. We have:

  * The original list of products
  * The search text the user has entered
  * The value of the checkbox
  * The filtered list of products

Let's go through each one and figure out which one is state. Simply ask three questions about each piece of data:

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
  * If you can't find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.

Let's run through this strategy for our application:

  * `ProductTable` needs to filter the product list based on state and `SearchBar` needs to display the search text and checked state.
  * The common owner component is `FilterableProductTable`.
  * It conceptually makes sense for the filter text and checked value to live in `FilterableProductTable`

Cool, so we've decided that our state lives in `FilterableProductTable`. First, add an instance property `this.state = {filterText: '', inStockOnly: false}` to `FilterableProductTable`'s `constructor` to reflect the initial state of your application. Then, pass `filterText` and `inStockOnly` to `ProductTable` and `SearchBar` as a prop. Finally, use these props to filter the rows in `ProductTable` and set the values of the form fields in `SearchBar`.

You can start seeing how your application will behave: set `filterText` to `"ball"` and refresh your app. You'll see that the data table is updated correctly.

## Step 5: Add Inverse Data Flow {#step-5-add-inverse-data-flow}

<p data-height="600" data-theme-id="0" data-slug-hash="LzWZvb" data-default-tab="js,result" data-user="rohan10" data-embed-version="2" data-pen-title="Thinking In React: Step 5" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/LzWZvb">Thinking In React: Step 5</a> on <a href="https://codepen.io">CodePen</a>.</p>

So far, we've built an app that renders correctly as a function of props and state flowing down the hierarchy. Now it's time to support data flowing the other way: the form components deep in the hierarchy need to update the state in `FilterableProductTable`.

React makes this data flow explicit to make it easy to understand how your program works, but it does require a little more typing than traditional two-way data binding.

If you try to type or check the box in the current version of the example, you'll see that React ignores your input. This is intentional, as we've set the `value` prop of the `input` to always be equal to the `state` passed in from `FilterableProductTable`.

Let's think about what we want to happen. We want to make sure that whenever the user changes the form, we update the state to reflect the user input. Since components should only update their own state, `FilterableProductTable` will pass callbacks to `SearchBar` that will fire whenever the state should be updated. We can use the `onChange` event on the inputs to be notified of it. The callbacks passed by `FilterableProductTable` will call `setState()`, and the app will be updated.

Though this sounds complex, it's really just a few lines of code. And it's really explicit how your data is flowing throughout the app.

## And That's It {#and-thats-it}

Hopefully, this gives you an idea of how to think about building components and applications with React. While it may be a little more typing than you're used to, remember that code is read far more than it's written, and it's extremely easy to read this modular, explicit code. As you start to build large libraries of components, you'll appreciate this explicitness and modularity, and with code reuse, your lines of code will start to shrink. :)
