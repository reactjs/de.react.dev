---
id: glossary
title: Glossar der React Begriffe
layout: docs
category: Reference
permalink: docs/glossary.html

---

## Single-Page Anwendnung {#single-page-application}

Eine Single-Page Anwendung ist eine Anwendungen, die eine einzelne HTML Seite und all deren Ressourcen (wie JavaScript oder CSS) lädt, die für das Ausführen der Anwendung erforderlich sind. Jegliche Interaktionen mit der Seite und deren Unterseiten benötigen keine erneute Serveranfrage, d. h. die Seite muss nicht neu geladen werden.

Obwohl du mit React komplette Single-Page Anwendungen erstellen kannst, ist dies kein Muss. React kann auch nur für kleine Teile bestehender Webseiten verwendet werden um die Interaktivität zu erweitern. In React geschriebener Code kann in Ruhe mit Markup koexistieren, welches auf dem Server von beispielsweise PHP oder auch clientseitig anderen Bibliotheken gerendert wird. Tatsächlich wird React genau so bei Facebook eingesetzt.

## ES6, ES2015, ES2016, etc {#es6-es2015-es2016-etc}

All diese Kürzel beziehen sich auf den neuesten Standard der ECMAScript Language Specification, von dem JavaScript eine Implementierung ist. Die ES6-Version (auch bekannt als ES2015) enthält viele Ergänzugen zu den Vorgängerversionen wie: Pfeilfunktionen, Klassen, Template-Literale, `let` und `const` Anweiseungen. Du kannst [hier](https://en.wikipedia.org/wiki/ECMAScript#Versions) mehr über bestimmte Versionen lernen.

## Kompiler {#compilers}

Ein JavaScript-Kompiler nimmt JavaScript Code, wandelt ihn um und gibt JavaScript Code in einem anderen Format zurück. Der häufigste Anwendungsfall ist die Umwandlung von ES6-Syntax in eine Syntax, die ältere Browser interpretieren können. [Babel](https://babeljs.io/) ist der Kompiler, der am häufigsten mit React verwendet wird.

## Bundler {#bundlers}

Bundler nehmen JavaScript und CSS-Code, geschrieben als seperate Module (oft hunderte von ihnen), und fügen diese zusammen in ein paar Dateien, die besser für den Browser optimiert sind. Einige der in React-Anwendungen häufig verwendeten Bundler sind [Webpack](https://webpack.js.org/) und [Browserify](http://browserify.org/).

## Paketmanager {#package-managers}

Paketmanager sind Tools, welche dir das Verwalten deiner Projekt-Abhängigkeiten ermöglichen. [npm](https://www.npmjs.com/) und [Yarn](https://yarnpkg.com/) sind zwei Paketmanager, die häufig in React-Anwendungen verwendet werden. Beides Beide sind Clients für die gleiche npm-Paketregistrierung.

## CDN {#cdn}

CDN steht für Content Delivery Network. CDNs sind Netzwerke von Servern auf der ganzen Welt, die gecachte, statische Inhalte ausliefern.

## JSX {#jsx}

JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript. JSX gets compiled to `React.createElement()` calls which return plain JavaScript objects called "React elements". To get a basic introduction to JSX [see the docs here](/docs/introducing-jsx.html) and find a more in-depth tutorial on JSX [here](/docs/jsx-in-depth.html).

React DOM uses camelCase property naming convention instead of HTML attribute names. For example, `tabindex` becomes `tabIndex` in JSX. The attribute `class` is also written as `className` since `class` is a reserved word in JavaScript:

```js
const name = 'Clementine';
ReactDOM.render(
  <h1 className="hello">Mein Name ist {name}!</h1>,
  document.getElementById('root')
);
```

## [Elemente](/docs/rendering-elements.html) {#elements}

React-Elemente sind die Bausteine von React-Anwendungen. Elemente könnten mit dem allgemein bekannteren Konzept der "Komponenten" verwechselt werden. Ein Element beschreibt was du auf dem Bildschirm sehen möchtest. React-Elemente sind unveränderbar.

```js
const element = <h1>Hallo, Welt</h1>;
```

Normalerweise werden Elemente nicht direkt verwendet, sondern von Komponenten zurückgegeben.

## [Komponenten](/docs/components-and-props.html) {#components}

React-Komponenten sind kleine, wiederverwendebare Codestücke, die ein zu renderndes React-Element an die Seite zurückgeben. Die einfachste Version einer React-Komponente ist eine simple JavaScript-Funktion, die ein React-Element zurückgibt:

```js
function Welcome(props) {
  return <h1>Hallo, {props.name}</h1>;
}
```

Komponenten können ebenso ES6-Klassen sein:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hallo, {this.props.name}</h1>;
  }
}
```

Components can be broken down into distinct pieces of functionality and used within other components. Components can return other components, arrays, strings and numbers. A good rule of thumb is that if a part of your UI is used several times (Button, Panel, Avatar), or is complex enough on its own (App, FeedStory, Comment), it is a good candidate to be a reusable component. Component names should also always start with a capital letter (`<Wrapper/>` **not** `<wrapper/>`). See [this documentation](/docs/components-and-props.html#rendering-a-component) for more information on rendering components.

### [`props`](/docs/components-and-props.html) {#props}

`props` sind die Daten die in eine React-Komponenten gegeben werden. Es handelt sich hierbei um Daten, die von einer übergeordneten Komponente an eine untergeordnete Komponente weitergegeben werden.

Denke daran, dass `props` nur lesbar(`readonly`) sind. Sie sollten in keiner Weise verändert werden:

```js
// Wrong!
props.number = 42;
```

Wenn du einen Wert aufgrund von Nutzereingaben oder Netzwerkantworten verändern möchtest, verwende `state`.

### `props.children` {#propschildren}

`props.children` ist in jeder Komponente verfügar. Es enthält den Inhalt, der zwischen dem öffnenden und schließenden Tag einer Komponente steht. Zum Beispiel:

```js
<Welcome>Hallo Welt!</Welcome>
```

Der String `Hallo Welt!` ist in `props.children` in der `Welcome`-Komponente verfügbar:

```js
function Welcome(props) {
  return <p>{props.children}</p>;
}
```

Für Komponenten die als Klassen definiert worden, verwende `this.props.children`:

```js
class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```

### [`state`](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) {#state}

A component needs `state` when some data associated with it changes over time. For example, a `Checkbox` component might need `isChecked` in its state, and a `NewsFeed` component might want to keep track of `fetchedPosts` in its state.

The most important difference between `state` and `props` is that `props` are passed from a parent component, but `state` is managed by the component itself. A component cannot change its `props`, but it can change its `state`.

For each particular piece of changing data, there should be just one component that "owns" it in its state. Don't try to synchronize states of two different components. Instead, [lift it up](/docs/lifting-state-up.html) to their closest shared ancestor, and pass it down as props to both of them.

## [Lifecycle Methoden](/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) {#lifecycle-methods}

Lifecycle methods are custom functionality that gets executed during the different phases of a component. There are methods available when the component gets created and inserted into the DOM ([mounting](/docs/react-component.html#mounting)), when the component updates, and when the component gets unmounted or removed from the DOM.

 ## [Kontrollierte](/docs/forms.html#controlled-components) vs. [Unkontrollierte Komponenten](/docs/uncontrolled-components.html)

React besitzt zwei verschiedene Ansätze, um mit Formulareingaben umzugehen.

An input form element whose value is controlled by React is called a *controlled component*. When a user enters data into a controlled component a change event handler is triggered and your code decides whether the input is valid (by re-rendering with the updated value). If you do not re-render then the form element will remain unchanged.

An *uncontrolled component* works like form elements do outside of React. When a user inputs data into a form field (an input box, dropdown, etc) the updated information is reflected without React needing to do anything. However, this also means that you can't force the field to have a certain value.

In den meisten Fällen solltest du kontrollierte Komponenten verwenden.

## [Keys](/docs/lists-and-keys.html) {#keys}

A "key" is a special string attribute you need to include when creating arrays of elements. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside an array to give the elements a stable identity.

Keys only need to be unique among sibling elements in the same array. They don't need to be unique across the whole application or even a single component.

Don't pass something like `Math.random()` to keys. It is important that keys have a "stable identity" across re-renders so that React can determine when items are added, removed, or re-ordered. Ideally, keys should correspond to unique and stable identifiers coming from your data, such as `post.id`.

## [Refs](/docs/refs-and-the-dom.html) {#refs}

React supports a special attribute that you can attach to any component. The `ref` attribute can be an object created by [`React.createRef()` function](/docs/react-api.html#reactcreateref) or a callback function, or a string (in legacy API). When the `ref` attribute is a callback function, the function receives the underlying DOM element or class instance (depending on the type of element) as its argument. This allows you to have direct access to the DOM element or component instance.

Use refs sparingly. If you find yourself often using refs to "make things happen" in your app, consider getting more familiar with [top-down data flow](/docs/lifting-state-up.html).

## [Events](/docs/handling-events.html) {#events}

Die Handhabung von Events in React-Elementen weist einige syntaktische Unterschiede auf:

* React Event-Handler werden nicht in Kleinbuchstaben, sondern in camelCase geschrieben.
* Bei JSX übergibst du als Event-Handler eine Funktion und keinen String.

## [Abgleich](/docs/reconciliation.html) {#reconciliation}

When a component's props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM. This process is called "reconciliation".
