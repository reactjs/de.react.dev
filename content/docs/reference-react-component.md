---
id: react-component
title: React.Component
layout: docs
category: Reference
permalink: docs/react-component.html
redirect_from:
  - "docs/component-api.html"
  - "docs/component-specs.html"
  - "docs/component-specs-ko-KR.html"
  - "docs/component-specs-zh-CN.html"
  - "tips/UNSAFE_componentWillReceiveProps-not-triggered-after-mounting.html"
  - "tips/dom-event-listeners.html"
  - "tips/initial-ajax.html"
  - "tips/use-react-with-other-libraries.html"
---

Diese Seite enthält eine detaillierte API-Referenz für die React-Component-Klassendefinition. Sie nimmt an, dass du mit den grundlegenden React-Konzepten, wie [Komponenten und Props](/docs/components-and-props.html) und [State und Lifecycle](/docs/state-and-lifecycle.html), vertraut bist. Falls nicht, lies darüber zuerst.

## Überblick {#overview}

React erlaubt das Definieren von Komponenten als Klassen oder Funktionen. Als Klasse definierte Komponenten bieten aktuell mehr Funktionen, auf welche hier im Detail eingegangen wird. Um eine React-Komponente als Klasse zu definieren, muss `React.Component` erweitert werden:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hallo, {this.props.name}</h1>;
  }
}
```

Die einzige Methode, die in einer `React.Component`-Unterklasse implementiert werden *muss*, heißt [`render()`](#render). Alle anderen auf dieser Seite beschriebenen Methoden sind optional.

**Wir raten streng davon ab, eigene Basiskomponentenklassen zu schreiben.** In React-Komponenten wird [hauptsächlich Code-Wiederverwendung eher durch Komposition als durch Vererbung erreicht](/docs/composition-vs-inheritance.html).

>Hinweis:
>
>React zwingt dich nicht die ES6-Klassensyntax zu verwenden. Falls du sie vermeiden möchtest, kannst du das `create-react-class`-Modul oder eine ähnliche eigene Abstraktion verwenden. Sieh dir [React ohne ES6](/docs/react-without-es6.html) an, um mehr darüber zu lernen.

### Der Lebenszyklus von Komponenten {#the-component-lifecycle}

Jede Komponente hat verschiedene "Lifecycle-Methoden", welche du überschreiben kannst, um Code zu einem bestimmten Zeitpunkt des Prozesses laufen zu lassen. **Du kannst [dieses Lifecycle-Diagramm](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) als Spickzettel nutzen.** In der Liste unten sind die häufig verwendeten Methoden **fett** hervorgehoben. Die restlichen Methoden existiert für relativ seltene Anwendungsfälle.

#### Das Einfügen {#mounting}

Diese Methoden werden, sobald eine Instanz einer Komponente erzeugt und in die DOM eingefügt wird, in der folgenden Reihenfolge aufgerufen:

- [**`constructor()`**](#constructor)
- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [**`render()`**](#render)
- [**`componentDidMount()`**](#componentdidmount)

>Hinweis:
>
>Diese Methoden werden als Altlasten angesehen und in neuem Code solltest du [diese meiden](/blog/2018/03/27/update-on-async-rendering.html):
>
>- [`UNSAFE_componentWillMount()`](#unsafe_componentwillmount)

#### Das Aktualisieren {#updating}

Eine Aktualisierung kann durch Änderungen an Props oder State ausgelöst werden. Diese Methoden werden, sobald eine Komponente erneut gerendert wird, in der folgenden Reihenfolge aufgerufen:

- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](#shouldcomponentupdate)
- [**`render()`**](#render)
- [`getSnapshotBeforeUpdate()`](#getsnapshotbeforeupdate)
- [**`componentDidUpdate()`**](#componentdidupdate)

>Hinweis:
>
>Diese Methoden werden als Altlasten angesehen und in neuem Code solltest du [diese meiden](/blog/2018/03/27/update-on-async-rendering.html):
>
>- [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate)
>- [`UNSAFE_componentWillReceiveProps()`](#unsafe_componentwillreceiveprops)

#### Das Entfernen {#unmounting}

Diese Methode wird aufgerufen, sobald eine Komponente aus der DOM entfernt wird:

- [**`componentWillUnmount()`**](#componentwillunmount)

#### Fehlerbehandlung {#error-handling}

Diese Methoden werden aufgerufen, sobald während des Rendern, in einer Lifecycle-Methode oder im Konstruktor einer Kindkomponente ein Fehler auftritt.

- [`static getDerivedStateFromError()`](#static-getderivedstatefromerror)
- [`componentDidCatch()`](#componentdidcatch)

### Andere APIs {#other-apis}

Jede Komponente bietet zudem noch andere APIs an:

  - [`setState()`](#setstate)
  - [`forceUpdate()`](#forceupdate)

### Klassenattribute {#class-properties}

  - [`defaultProps`](#defaultprops)
  - [`displayName`](#displayname)

### Instanzattribute {#instance-properties}

  - [`props`](#props)
  - [`state`](#state)

* * *

## Referenz {#reference}

### Meistgenutzte Lifecycle Methods {#commonly-used-lifecycle-methods}

Die Methoden in diesem Abschnitt decken die große Mehrheit der Anwendungsfälle ab, denen du beim Erzeugen von React-Komponenten begegnen wirst. **Für eine visuelle Referenz, sieh dir dieses [Lifecycle-Diagramm](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) an.**

### `render()` {#render}

```javascript
render()
```

Die `render()`-Methode ist die einzige erforderliche Methode einer Klassenkomponente.

Beim Aufruf überprüft sie `this.props` und `this.state` und gibt eines der folgenden Typen zurück:

- **React Elemente.** Typischerweise erzeugt durch [JSX](/docs/introducing-jsx.html). Beispielsweise geben `<div />` und `<MyComponent />` React-Elemente zurück, welche React anweisen, entsprechend einen DOM-Knoten oder eine andere benutzerdefinierte Komponente zu rendern.
- **Arrays und Fragmente.** Erlaubt mehrere Elemente von der render-Methode zurückgeben zu lassen. Lies die Dokumentation bezüglich [Fragmente](/docs/fragments.html) für mehr Informationen.
- **Portale**. Erlaubt das Rendern von Kindelementen innerhalb eines anderen DOM-Unterbaums. Lies die Dokumentation bezüglich [Portale](/docs/portals.html) für mehr Informationen.
- **Zeichenketten und Zahlen.** Diese werden als Textknoten in der DOM gerendert.
- **Booleans or `null`**. Nichts wird gerendert. (Existiert hauptsächlich um das `return test && <Child />`-Muster zu unterstützen, wobei `test` ein Boolean ist.)

Die `render()`-Funktion sollte rein sein, was bedeutet, dass es den State der Komponente nicht verändert, jedesmal das gleiche Ergebnis beim Aufruf liefert und nicht direkt mit dem Browser interagiert.

Wenn du mit dem Browser interagieren musst, tue dies innerhalb von `componentDidMount()` oder den anderen Lifecycle-Methoden. Eine reine `render()`-Funktion hilft dabei Komponenten simpel zu halten.

> Hinweis
>
> `render()` wird nicht aufgerufen, falls [`shouldComponentUpdate()`](#shouldcomponentupdate) false zurückgibt.

* * *

### `constructor()` {#constructor}

```javascript
constructor(props)
```
**Wenn du den State nicht initialisierst und keine Methoden bindest, musst du keinen Konstruktor in deiner React-Komponente implementieren**

The Konstruktor wird vor dem mounten der React-Komponente aufgerufen. Wenn du den Konstruktor für eine `React.Component` Sub-Klasse implementierst, solltest du `super(props)` vor jeder anderen Anweisung im Konstruktor aufrufen.
The constructor for a React component is called before it is mounted. When implementing the constructor for a `React.Component` subclass, you should call `super(props)` before any other statement. Andernfalls wird `this.props` im Konstruktor nicht definiert sein, was zu Fehlern führen kann.

Üblicherweise werden in React, Konstruktoren nur für zwei Sachen verwendet:

* Initialisieren des [lokalen State](/docs/state-and-lifecycle.html), in dem `this.state` ein Objekt zugewiesen wird.
* Um [Event-Handler](/docs/handling-events.html)-Methoden an eine Instanz zu binden.

Du solltest **`setState()` nicht im `constructor()` aurufen**. Stattdessen **weise `this.state` direkt im Konstruktor einen initialen State zu**, wenn deine Komponente einen lokalen State benötigt:

```js
constructor(props) {
  super(props);
  // Rufe hier nicht this.setState() auf!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

Der Konstruktur ist die einzige Stelle, an dem du `this.state` direkt einen Wert zuweisen solltest. In allen anderen Methoden solltest du stattdessen `this.setState()` aufrufen.

Vermeide Nebeneffekten (engl. side-effects) oder Subscriptions im Konstruktor. Verwende diese Anwendungsfälle stattdessen `componentDidMount()`.

>Hinweis
>
>**Vermeide das Kopieren von Props in den State! Dies ist ein häufiger Fehler:**
>
>```js
>constructor(props) {
>  super(props);
>  // Tue das nicht!
>  this.state = { color: props.color };
>}
>```
>
>Das Problem ist, dass es sowohl unnötig ist (du kannst stattdessen `this.props.color` direkt verwenden), als auch Fehler erzeugt (Aktualisierungen des `color`-Prop werden nicht im State widergespiegelt).
>
>**Verwende dieses Pattern nur, wenn du absichtlich Prop-Aktualisierungen ignorieren willst.** In diesem Fall ist es sinnvoll, das Prop in `initialColor` oder `defaultColor` umzubenennen. Du kannst dann eine Komponente zwingen, ihren internen State "zurückzusetzen", indem du [ihren `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) wenn nötig änderst.
>
>Lese unseren [Blog-Beitrag zur Vermeidung eines abgeleiteten State](/blog/2018/06/07/you-probably-dont-need-derived-state.html) um zu erfahren, was zu tun ist, wenn du glaubst, dass du einen State brauchst, der auf die Props angewiesen ist.


* * *

### `componentDidMount()` {#componentdidmount}

```javascript
componentDidMount()
```

`componentDidMount()` wird unmittelbar nach dem Mounten einer Komponente (Einfügen in den Baum) aufgerufen. Initialisierungen, die DOM-Knoten erfordern, sollten hier stattfinden. Wenn du Daten von einem entfernten Endpunkt laden musst, ist dies ein guter Ort, um die Netzwerkanfragen zu instanziieren.

Diese Methode ist ein guter Ort, um etwaige Subscriptions zu tätigen. Wenn du das tust, vergiss sie nicht in `componentWillUnmount()` zu unsubscriben.

Du **kannst `setState()` sofort** in `componentDidMount()` aufrufen. Dies wird ein zusätzliches Rendering auslösen, aber es wird geschehen, bevor der Browser den Bildschirm aktualisiert. Das garantiert, dass, obwohl `render()` in diesem Fall zweimal aufgerufen wird, der Benutzer den State dazwischen nicht sieht. Verwende dieses Patterm mit Vorsicht, da es oft zu Performancenproblemen führt. In den meisten Fällen solltest du stattdessen den intialen State im `constructor()` zuweisen. Es kann jedoch für Fälle wie Modals und Tooltips notwendig sein, wenn du einen DOM-Knoten messen musst, bevor du etwas renderst, das von dessen Größe oder Position abhängt.

* * *

### `componentDidUpdate()` {#componentdidupdate}

```javascript
componentDidUpdate(prevProps, prevState, snapshot)
```

Die Methode `componentDidUpdate()` wird unmittelbar nach dem Aktualisieren aufgerufen. Beim ersten Rendering wird diese Methode nicht aufgerufen.

Nutze dies als Gelegenheit, auf dem DOM zu operieren, wenn die Komponente aktualisiert wurde. Dies ist auch ein guter Ort, um Netzwerkanfragen durchzuführen, solange du die aktuellen Props mit den vorherigen Props vergleichst (z. B. ist eine Netzwerkanfrage möglicherweise nicht mehr erforderlich, wenn sich die Props nicht geändert haben).

```js
componentDidUpdate(prevProps) {
  // Typische Anwendung (vergiss nicht, die Props miteinander zu vergleichen)
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

Du **kannst `setState()` sofort** in `componentDidUpdate()` aufrufen, aber beachte, dass **es mit einer Bedingung umschlossen sein muss**, wie im obigen Beispiel, oder du verursachst eine Endlosschleife. Es würde auch ein zusätzliches Re-Rendering verursachen, das zwar für den Benutzer nicht sichtbar ist, aber die Performance der Komponente beeinträchtigen kann. Wenn du versuchst, einen State auf ein von oben kommendes Prop zu "spiegeln", solltest du stattdessen das Prop direkt verwenden. Lese hier mehr darüber [warum das Kopieren von Props in den State Fehler verursacht](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

Wenn deine Komponente den `getSnapshotBeforeUpdate()` Lifecycle implementiert (was selten vorkommt), wird der Wert, den sie zurückgibt, als dritter "Snapshot"-Parameter an `componentDidUpdate()` übergeben. Andernfalls wird dieser Parameter undefined sein.

> Hinweis
>
> `componentDidUpdate()` wird nicht aufgerufen, wenn [`shouldComponentUpdate()`](#shouldcomponentupdate) false zurückgibt.

* * *

### `componentWillUnmount()` {#componentwillunmount}

```javascript
componentWillUnmount()
```

`componentWillUnmount()` wird unmittelbar vor dem Unmounten und Entfernen einer Komponente aufgerufen.
Führe in dieser Methode alle notwendigen Bereinigungen durch, wie z. B. das Ungültigmachen von Timern, das Abbrechen von Netzwerkanfragen oder das Aufräumen von Subscriptions, die in `componentDidMount()` erstellt wurden.

Du **solltest `setState()` nicht** in `componentWillUnmount()` aufrufen, da die Komponente niemals neu gerendert wird. Sobald eine Komponenteninstanz geunmountet ist, wird sie nie wieder gemountet.

* * *

### Selten genutzte Lifecycle Methoden {#rarely-used-lifecycle-methods}

Die Methoden in diesem Abschnitt beziehen sich auf seltene Anwendungsfälle. Sie sind hin und wieder praktisch, aber die meisten deiner Komponenten benötigen wahrscheinlich keine von ihnen. **Die meisten der unten aufgeführten Methoden kannst du in [diesem Lifecyclediagramm] (https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) sehen, wenn du oben auf die Checkbox "Weniger gebräuchliche Lifecycles anzeigen" klickst.**


### `shouldComponentUpdate()` {#shouldcomponentupdate}

```javascript
shouldComponentUpdate(nextProps, nextState)
```

Verwende `shouldComponentUpdate()`, um React wissen zu lassen, ob die Ausgabe einer Komponente nicht von der aktuellen Änderung des States oder der Props betroffen ist. Das Standardverhalten ist, dass bei jeder State-Veränderung neu gerendert wird, und in den allermeisten Fällen solltest du dich auf dieses verlassen.

`shouldComponentUpdate()` wird vor dem Rendern aufgerufen, wenn neue Props oder State empfangen werden. Der Standardwert ist `true`. Diese Methode wird nicht für das erste Rendering aufgerufen oder wenn `forceUpdate()` verwendet wird.

Diese Methode existiert nur als **[Performance-Optimierung](/docs/optimizing-performance.html).** Verlasse dich nicht darauf, damit ein Rendering zu "verhindern", da dies zu Fehlern führen kann. **Ziehe in Betracht, die eingebaute [`PureComponent`](/docs/react-api.html#reactpurecomponent)** zu verwenden, anstatt `shouldComponentUpdate()` von Hand zu schreiben. `PureComponent` führt einen oberflächlichen (engl. shallow) Vergleich von Props und State durch und verringert die Wahrscheinlichkeit, dass du eine notwendige Aktualisierung überspringst.

Wenn du dir sicher bist, dass du es von Hand schreiben willst, kannst du `this.props` mit `nextProps` und `this.state` mit `nextState` vergleichen und `false` zurückgeben, um React mitzuteilen, dass die Aktualisierung übersprungen werden kann. Beachte, dass die Rückgabe von `false` nicht verhindert, dass untergeordnete Komponenten neu gerendert werden, wenn sich *ihr* State ändert.

Wir raten davon ab, tiefe Gleichheitsprüfungen durchzuführen oder `JSON.stringify()` in `shouldComponentUpdate()` zu verwenden. Das ist sehr ineffizient und schadet der Performance.

Wenn `shouldComponentUpdate()` `false` zurückgibt, werden derzeit [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate), [`render()`](#render) und [`componentDidUpdate()`](#componentdidupdate) nicht aufgerufen. In Zukunft wird React `shouldComponentUpdate()` möglicherweise eher als Tipp anstatt als strikte Anweisung behandeln, und die Rückgabe von `false` kann immer noch zu einem erneuten Rendering der Komponente führen.

* * *

### `static getDerivedStateFromProps()` {#static-getderivedstatefromprops}

```js
static getDerivedStateFromProps(props, state)
```

`getDerivedStateFromProps` is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or `null` to update nothing.

This method exists for [rare use cases](/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state) where the state depends on changes in props over time. For example, it might be handy for implementing a `<Transition>` component that compares its previous and next children to decide which of them to animate in and out.

Deriving state leads to verbose code and makes your components difficult to think about.
[Make sure you're familiar with simpler alternatives:](/blog/2018/06/07/you-probably-dont-need-derived-state.html)

* If you need to **perform a side effect** (for example, data fetching or an animation) in response to a change in props, use [`componentDidUpdate`](#componentdidupdate) lifecycle instead.

* If you want to **re-compute some data only when a prop changes**, [use a memoization helper instead](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).

* If you want to **"reset" some state when a prop changes**, consider either making a component [fully controlled](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) or [fully uncontrolled with a `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) instead.

This method doesn't have access to the component instance. If you'd like, you can reuse some code between `getDerivedStateFromProps()` and the other class methods by extracting pure functions of the component props and state outside the class definition.

Note that this method is fired on *every* render, regardless of the cause. This is in contrast to `UNSAFE_componentWillReceiveProps`, which only fires when the parent causes a re-render and not as a result of a local `setState`.

* * *

### `getSnapshotBeforeUpdate()` {#getsnapshotbeforeupdate}

```javascript
getSnapshotBeforeUpdate(prevProps, prevState)
```

`getSnapshotBeforeUpdate()` is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle will be passed as a parameter to `componentDidUpdate()`.

This use case is not common, but it may occur in UIs like a chat thread that need to handle scroll position in a special way.

A snapshot value (or `null`) should be returned.

For example:

`embed:react-component-reference/get-snapshot-before-update.js`

In the above examples, it is important to read the `scrollHeight` property in `getSnapshotBeforeUpdate` because there may be delays between "render" phase lifecycles (like `render`) and "commit" phase lifecycles (like `getSnapshotBeforeUpdate` and `componentDidUpdate`).

* * *

### Fehlerbegrenzungen {#error-boundaries}

[Error boundaries](/docs/error-boundaries.html) are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

A class component becomes an error boundary if it defines either (or both) of the lifecycle methods `static getDerivedStateFromError()` or `componentDidCatch()`. Updating state from these lifecycles lets you capture an unhandled JavaScript error in the below tree and display a fallback UI.

Only use error boundaries for recovering from unexpected exceptions; **don't try to use them for control flow.**

For more details, see [*Error Handling in React 16*](/blog/2017/07/26/error-handling-in-react-16.html).

> Hinweis
>
> Error boundaries only catch errors in the components **below** them in the tree. An error boundary can’t catch an error within itself.

### `static getDerivedStateFromError()` {#static-getderivedstatefromerror}
```javascript
static getDerivedStateFromError(error)
```

This lifecycle is invoked after an error has been thrown by a descendant component.
It receives the error that was thrown as a parameter and should return a value to update state.

```js{7-10,13-16}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

> Hinweis
>
> `getDerivedStateFromError()` is called during the "render" phase, so side-effects are not permitted.
For those use cases, use `componentDidCatch()` instead.

* * *

### `componentDidCatch()` {#componentdidcatch}

```javascript
componentDidCatch(error, info)
```

This lifecycle is invoked after an error has been thrown by a descendant component.
It receives two parameters:

1. `error` - The error that was thrown.
2. `info` - An object with a `componentStack` key containing [information about which component threw the error](/docs/error-boundaries.html#component-stack-traces).


`componentDidCatch()` is called during the "commit" phase, so side-effects are permitted.
It should be used for things like logging errors:

```js{12-19}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

Production and development builds of React slightly differ in the way `componentDidCatch()` handles errors.

On development, the errors will bubble up to `window`, this means that any `window.onerror` or `window.addEventListener('error', callback)` will intercept the errors that have been caught by `componentDidCatch()`.

On production, instead, the errors will not bubble up, which means any ancestor error handler will only receive errors not explicitly caught by `componentDidCatch()`.

> Hinweis
>
> In the event of an error, you can render a fallback UI with `componentDidCatch()` by calling `setState`, but this will be deprecated in a future release.
> Use `static getDerivedStateFromError()` to handle fallback rendering instead.

* * *

### Veraltete Lifecycle Methods {#legacy-lifecycle-methods}

The lifecycle methods below are marked as "legacy". They still work, but we don't recommend using them in the new code. You can learn more about migrating away from legacy lifecycle methods in [this blog post](/blog/2018/03/27/update-on-async-rendering.html).

### `UNSAFE_componentWillMount()` {#unsafe_componentwillmount}

```javascript
UNSAFE_componentWillMount()
```

> Hinweis
>
> This lifecycle was previously named `componentWillMount`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

`UNSAFE_componentWillMount()` is invoked just before mounting occurs. It is called before `render()`, therefore calling `setState()` synchronously in this method will not trigger an extra rendering. Generally, we recommend using the `constructor()` instead for initializing state.

Avoid introducing any side-effects or subscriptions in this method. For those use cases, use `componentDidMount()` instead.

This is the only lifecycle method called on server rendering.

* * *

### `UNSAFE_componentWillReceiveProps()` {#unsafe_componentwillreceiveprops}

```javascript
UNSAFE_componentWillReceiveProps(nextProps)
```

> Hinweis
>
> This lifecycle was previously named `componentWillReceiveProps`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

> Hinweis:
>
> Using this lifecycle method often leads to bugs and inconsistencies
>
> * If you need to **perform a side effect** (for example, data fetching or an animation) in response to a change in props, use [`componentDidUpdate`](#componentdidupdate) lifecycle instead.
> * If you used `componentWillReceiveProps` for **re-computing some data only when a prop changes**, [use a memoization helper instead](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).
> * If you used `componentWillReceiveProps` to **"reset" some state when a prop changes**, consider either making a component [fully controlled](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) or [fully uncontrolled with a `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) instead.
>
> For other use cases, [follow the recommendations in this blog post about derived state](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

`UNSAFE_componentWillReceiveProps()` is invoked before a mounted component receives new props. If you need to update the state in response to prop changes (for example, to reset it), you may compare `this.props` and `nextProps` and perform state transitions using `this.setState()` in this method.

Note that if a parent component causes your component to re-render, this method will be called even if props have not changed. Make sure to compare the current and next values if you only want to handle changes.

React doesn't call `UNSAFE_componentWillReceiveProps()` with initial props during [mounting](#mounting). It only calls this method if some of component's props may update. Calling `this.setState()` generally doesn't trigger `UNSAFE_componentWillReceiveProps()`.

* * *

### `UNSAFE_componentWillUpdate()` {#unsafe_componentwillupdate}

```javascript
UNSAFE_componentWillUpdate(nextProps, nextState)
```

> Hinweis
>
> This lifecycle was previously named `componentWillUpdate`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

`UNSAFE_componentWillUpdate()` is invoked just before rendering when new props or state are being received. Use this as an opportunity to perform preparation before an update occurs. This method is not called for the initial render.

Note that you cannot call `this.setState()` here; nor should you do anything else (e.g. dispatch a Redux action) that would trigger an update to a React component before `UNSAFE_componentWillUpdate()` returns.

Typically, this method can be replaced by `componentDidUpdate()`. If you were reading from the DOM in this method (e.g. to save a scroll position), you can move that logic to `getSnapshotBeforeUpdate()`.

> Hinweis
>
> `UNSAFE_componentWillUpdate()` will not be invoked if [`shouldComponentUpdate()`](#shouldcomponentupdate) returns false.

* * *

## Andere APIs {#other-apis-1}

Unlike the lifecycle methods above (which React calls for you), the methods below are the methods *you* can call from your components.

There are just two of them: `setState()` and `forceUpdate()`.

### `setState()` {#setstate}

```javascript
setState(updater, [callback])
```

`setState()` enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. This is the primary method you use to update the user interface in response to event handlers and server responses.

Think of `setState()` as a *request* rather than an immediate command to update the component. For better perceived performance, React may delay it, and then update several components in a single pass. React does not guarantee that the state changes are applied immediately.

`setState()` does not always immediately update the component. It may batch or defer the update until later. This makes reading `this.state` right after calling `setState()` a potential pitfall. Instead, use `componentDidUpdate` or a `setState` callback (`setState(updater, callback)`), either of which are guaranteed to fire after the update has been applied. If you need to set the state based on the previous state, read about the `updater` argument below.

`setState()` will always lead to a re-render unless `shouldComponentUpdate()` returns `false`. If mutable objects are being used and conditional rendering logic cannot be implemented in `shouldComponentUpdate()`, calling `setState()` only when the new state differs from the previous state will avoid unnecessary re-renders.

The first argument is an `updater` function with the signature:

```javascript
(state, props) => stateChange
```

`state` is a reference to the component state at the time the change is being applied. It should not be directly mutated. Instead, changes should be represented by building a new object based on the input from `state` and `props`. For instance, suppose we wanted to increment a value in state by `props.step`:

```javascript
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

Both `state` and `props` received by the updater function are guaranteed to be up-to-date. The output of the updater is shallowly merged with `state`.

The second parameter to `setState()` is an optional callback function that will be executed once `setState` is completed and the component is re-rendered. Generally we recommend using `componentDidUpdate()` for such logic instead.

You may optionally pass an object as the first argument to `setState()` instead of a function:

```javascript
setState(stateChange[, callback])
```

This performs a shallow merge of `stateChange` into the new state, e.g., to adjust a shopping cart item quantity:

```javascript
this.setState({quantity: 2})
```

This form of `setState()` is also asynchronous, and multiple calls during the same cycle may be batched together. For example, if you attempt to increment an item quantity more than once in the same cycle, that will result in the equivalent of:

```javaScript
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

Subsequent calls will override values from previous calls in the same cycle, so the quantity will only be incremented once. If the next state depends on the current state, we recommend using the updater function form, instead:

```js
this.setState((state) => {
  return {quantity: state.quantity + 1};
});
```

For more detail, see:

* [State and Lifecycle guide](/docs/state-and-lifecycle.html)
* [In depth: When and why are `setState()` calls batched?](https://stackoverflow.com/a/48610973/458193)
* [In depth: Why isn't `this.state` updated immediately?](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

* * *

### `forceUpdate()` {#forceupdate}

```javascript
component.forceUpdate(callback)
```

By default, when your component's state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.

Calling `forceUpdate()` will cause `render()` to be called on the component, skipping `shouldComponentUpdate()`. This will trigger the normal lifecycle methods for child components, including the `shouldComponentUpdate()` method of each child. React will still only update the DOM if the markup changes.

Normally you should try to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.

* * *

## Klassenattribute {#class-properties-1}

### `defaultProps` {#defaultprops}

`defaultProps` can be defined as a property on the component class itself, to set the default props for the class. This is used for `undefined` props, but not for `null` props. For example:

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};
```

If `props.color` is not provided, it will be set by default to `'blue'`:

```js
  render() {
    return <CustomButton /> ; // props.color will be set to blue
  }
```

If `props.color` is set to `null`, it will remain `null`:

```js
  render() {
    return <CustomButton color={null} /> ; // props.color will remain null
  }
```

* * *

### `displayName` {#displayname}

Der `displayName`-String wird in Debug-Nachrichten verwendet. Normalerweise musst du ihn nicht explizit festlegen, da er aus dem Namen der Funktion oder der Klasse, die die Komponente definiert, abgeleitet wird. Du solltest ihn explizit festlegen, wenn du zu Debugging-Zwecken einen anderen Namen anzeigen möchtest oder du eine "High-Order"-Komponente erstellst, schau dir [Den Anzeigenamen umschließen zu reinfachen Fehlersuche](/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging) für mehr Details an.

* * *

## Instanzattribute {#instance-properties-1}

### `props` {#props}

`this.props` contains the props that were defined by the caller of this component. See [Components and Props](/docs/components-and-props.html) for an introduction to props.

In particular, `this.props.children` is a special prop, typically defined by the child tags in the JSX expression rather than in the tag itself.

### `state` {#state}

The state contains data specific to this component that may change over time. The state is user-defined, and it should be a plain JavaScript object.

If some value isn't used for rendering or data flow (for example, a timer ID), you don't have to put it in the state. Such values can be defined as fields on the component instance.

See [State and Lifecycle](/docs/state-and-lifecycle.html) for more information about the state.

Never mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat `this.state` as if it were immutable.
