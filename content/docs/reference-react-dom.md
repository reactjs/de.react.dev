---
id: react-api
title: React Top-Level API
layout: docs
category: Reference
permalink: docs/react-api.html
redirect_from:
  - "docs/reference.html"
  - "docs/clone-with-props.html"
  - "docs/top-level-api.html"
  - "docs/top-level-api-ja-JP.html"
  - "docs/top-level-api-ko-KR.html"
  - "docs/top-level-api-zh-CN.html"
---

`React` ist der Zugangspunkt zur React-Bibliothek. Falls du React von einem `<script>`-Tag heraus lädst, sind diese Top-Level APIs im globalen `React`-Objekt verfügbar. Solltest du ES6 mit npm verwenden, kannst du `import React from 'react'` schreiben. Wenn du ES5 mit npm verwendest, kannst du `var React = require('react')` schreiben.

## Übersicht {#overview}

### Komponenten {#components}

Mit React-Komponenten kann die Benutzeroberfläche in unabhängige, wiederverwendbare Bestandteile aufgeteilt werden, die jeweils isoliert betrachtet werden können. React-Komponenten können als Unterklassen von `React.Component` oder `React.PureComponent` definiert werden.

 - [`React.Component`](#reactcomponent)
 - [`React.PureComponent`](#reactpurecomponent)

Solltest du keine ES6-Klassen benutzen, kannst du stattdessen das `create-react-class`-Modul verwenden. Siehe [React ohne ES6](/docs/react-without-es6.html) für mehr Informationen.

React-Komponenten können auch als Funktionen definiert werden, die ummantelt werden können:

- [`React.memo`](#reactmemo)

### React-Elemente erstellen {#creating-react-elements}

Um zu beschreiben, wie die Benutzeroberfläche aussehen soll, empfehlen wir, [JSX](/docs/introducing-jsx.html) zu verwenden. Ein JSX-Element ist eine alternative Schreibweise für das Aufrufen von [`React.createElement()`](#createelement). Wenn du JSX verwendest, rufst du die folgenden Methoden normalerweise nicht direkt auf:
- [`createElement()`](#createelement)
- [`createFactory()`](#createfactory)

Siehe [React ohne JSX](/docs/react-without-jsx.html) für mehr Informationen.

### Elemente verändern {#transforming-elements}

`React` stellt mehrere APIs zur Verfügung, um Elemente zu manipulieren:

- [`cloneElement()`](#cloneelement)
- [`isValidElement()`](#isvalidelement)
- [`React.Children`](#reactchildren)

### Fragmente {#fragments}

`React` stellt auch eine Komponente zu Verfügung, mit der mehrere Elemente ohne Wrapper gerendert werden können:

- [`React.Fragment`](#reactfragment)

### Refs {#refs}

- [`React.createRef`](#reactcreateref)
- [`React.forwardRef`](#reactforwardref)

### Suspense {#suspense}

Mit Suspense können Komponenten vor dem Rendern auf etwas "warten". Momentan unterstützt Suspense nur einen Anwendungsfall: [Komponenten dynamisch laden mit `React.lazy`](/docs/code-splitting.html#reactlazy). In Zukunft wird es auch andere Anwendungsfälle wie z.B. das Abrufen von Daten unterstützen.

- [`React.lazy`](#reactlazy)
- [`React.Suspense`](#reactsuspense)

### Transitions {#transitions}

*Transitions* are a new concurrent feature introduced in React 18. They allow you to mark updates as transitions, which tells React that they can be interrupted and avoid going back to Suspense fallbacks for already visible content.

- [`React.startTransition`](#starttransition)
- [`React.useTransition`](/docs/hooks-reference.html#usetransition)

### Hooks {#hooks}

*Hooks* sind neu in React 16.8. Sie erlauben die Verwendung von State und anderen React-Features ohne Klassen. Hooks haben einen [eigenen Bereich in der Dokumentation](/docs/hooks-intro.html) und eine eigene API-Referenz:

- [Grundlegende Hooks](/docs/hooks-reference.html#basic-hooks)
  - [`useState`](/docs/hooks-reference.html#usestate)
  - [`useEffect`](/docs/hooks-reference.html#useeffect)
  - [`useContext`](/docs/hooks-reference.html#usecontext)
- [Weitere Hooks](/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](/docs/hooks-reference.html#usereducer)
  - [`useCallback`](/docs/hooks-reference.html#usecallback)
  - [`useMemo`](/docs/hooks-reference.html#usememo)
  - [`useRef`](/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](/docs/hooks-reference.html#usedebugvalue)
  - [`useDeferredValue`](/docs/hooks-reference.html#usedeferredvalue)
  - [`useTransition`](/docs/hooks-reference.html#usetransition)
  - [`useId`](/docs/hooks-reference.html#useid)
- [Library Hooks](/docs/hooks-reference.html#library-hooks)
  - [`useSyncExternalStore`](/docs/hooks-reference.html#usesyncexternalstore)
  - [`useInsertionEffect`](/docs/hooks-reference.html#useinsertioneffect)

* * *

## Referenz {#reference}

### `React.Component` {#reactcomponent}

> Try the new React documentation for [`Component`](https://beta.reactjs.org/reference/react/Component).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.Component` ist die Basis-Klasse für React-Komponenten, die mit [ES6-Klassen](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) definiert werden:

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Unter [React.Component API-Referenz](/docs/react-component.html) gibt es eine Liste der Methoden und Eigenschaften, die sich auf die `React.Component`-Basisklasse beziehen.

* * *

### `React.PureComponent` {#reactpurecomponent}

> Try the new React documentation for [`PureComponent`](https://beta.reactjs.org/reference/react/PureComponent).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.PureComponent` ähnelt [`React.Component`](#reactcomponent), unterscheidet sich aber dahingehend, dass [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) von [`React.Component`](#reactcomponent) nicht implementiert wird, während `React.PureComponent` es durch das oberflächliche Vergleichen von Props und State implementiert.

Wenn die `render()`-Funktion einer React-Komponente bei Gleichbleiben von Props und State das gleiche Ergebnis rendert, kann die Nutzung von `React.PureComponent` in manchen Fällen die Performance verbessern.

> Hinweis
>
> `shouldComponentUpdate()` von `React.PureComponent` vergleicht Objekte nur oberflächlich. Falls diese komplexe Datenstrukturen enthalten, könnte es für tiefer gelegene Unterschiede zu falschen Negativbefunden kommen. Benutze `PureComponent` nur dann, wenn Props und State einfach sind, oder verwende [`forceUpdate()`](/docs/react-component.html#forceupdate) wenn du weißt, dass tiefergelegene Datenstrukturen sich verändert haben. Oder überlege dir, [unveränderliche (immutable) Objekte](https://immutable-js.com/) zu verwenden, um das schnelle Vergleichen geschachtelter Daten zu erleichtern.
>
> Darüber hinaus überspringt `shouldComponentUpdate()` von `React.PureComponent` den kompletten der Komponente untergeordneten Teilbaum. Es sollte also sichergestellt werden, dass alle Kind-Komponenten auch "pur" sind.

* * *

### `React.memo` {#reactmemo}

> Try the new React documentation for [`memo`](https://beta.reactjs.org/reference/react/memo).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* rendere mit Props */
});
```

`React.memo` ist eine [Higher-Order-Komponente](/docs/higher-order-components.html).

Wenn deine Komponente das gleiche Ergebnis mit den gleichen Props liefert, kannst du es mit `React.memo` umschließen um in einigen Fällen die Performance zu verbessern, in dem sich das Ergebnis gemerkt wird. Das bedeutet, dass React das Rendern der Komponente überspringt und stattdessen das zuletzt gerenderte Ergebnis wiederverwendet.

`React.memo` betrifft nur Änderungen von Props. Wenn deine Funktionskomponente von `React.memo` umschloßen ist, eine [`useState`](/docs/hooks-state.html), [`useReducer`](/docs/hooks-reference.html#usereducer) oder [`useContext`](/docs/hooks-reference.html#usecontext) Hook in ihrer Implementierung hat, wird sie immer noch gerendert, wenn sich der State oder der Context ändert.

Standardmäßig wird es nur oberflächlich komplexe Objekte im Props-Objekt vergleichen. Wenn du die Kontrolle über den Vergleich haben möchtest, kannst du auch eine benutzerdefinierte Vergleichsfunktion als zweites Argument angeben.

```javascript
function MyComponent(props) {
  /* rendere mit Props */
}
function areEqual(prevProps, nextProps) {
  /*
  Gib 'true' zurück, wenn nextProps das gleiche Ergebnis rendern würde 
  wie prevProps, ansonsten gib 'false' zurück
  */
}
export default React.memo(MyComponent, areEqual);
```

Diese Methode existiert nur zur **[Performance-Optimierung](/docs/optimizing-performance.html).** Verlasse dich nicht auf sie, um das Rendern zu "verhindern", da dadurch Bugs entstehen können.

> Hinweis
>
> Im Gegensatz zur [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate)-Methode in Klassen-Komponenten gibt die `areEqual`-Funktion `true` zurück, wenn die Props gleich sind und `false`, wenn die Props unterschiedlich sind, also genau andersherum als `shouldComponentUpdate`.

* * *

### `createElement()` {#createelement}

> Try the new React documentation for [`createElement`](https://beta.reactjs.org/reference/react/createElement).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

Erzeugt und gibt ein neues [React-Element](/docs/rendering-elements.html) eines bestimmten Typs zurück. Das Typ-Argument kann entweder ein Tag-Name als String (z.B. `'div'` oder `'span'`), ein  [React-Komponenten](/docs/components-and-props.html)-Typ  (eine Klasse oder eine Funktion) oder ein [React-Fragment](#reactfragment)-Typ sein.

In [JSX](/docs/introducing-jsx.html) geschriebener Code wird konvertiert, um `React.createElement()` zu benutzen. Wenn du JSX verwendest, rufst du `React.createElement()` normalerweise nicht direkt auf. Siehe [React ohne JSX](/docs/react-without-jsx.html) für mehr Informationen.

* * *

### `cloneElement()` {#cloneelement}

> Try the new React documentation for [`cloneElement`](https://beta.reactjs.org/reference/react/cloneElement).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```
React.cloneElement(
  element,
  [config],
  [...children]
)
```

Klone und gebe ein neues React-Element mit `element` als Ausgangspunkt zurück. `config` sollte alle neuen Props, `key`s oder `ref`s enthalten. Das resultierende Element hat die Props des ursprünglichen Elements, in die die neuen Props oberflächlich eingefügt werden. Neue Kinder ersetzen die existierenden Kinder. `key` und `ref` des ursprünglichen Elements bleiben erhalten, wenn kein `key` und `ref` in der `config` vorhanden sind.

`React.cloneElement()` ist fast äquivalent zu:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

Es bewahrt jedoch auch die Refs. Das bedeutet, wenn du ein Kind mit einem Ref erhälst, dieses nicht versehentlich vom Vorgänger stiehlst. Du bekommst das selbe Ref an dein neues Element angehängt. Das neue Ref oder der neue Key ersetzt die alten, falls vorhanden.

Diese API wurde als Ersatz für das veraltete `React.addons.cloneWithProps()` eingeführt.

* * *

### `createFactory()` {#createfactory}

> Try the new React documentation for [`createFactory`](https://beta.reactjs.org/reference/react/createFactory).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
React.createFactory(type)
```

Gibt eine Funktion zurück, die React-Elemente eines bestimmten Typs erzeugt. Wie bei [`React.createElement()`](#createelement) kann das Typ-Argument entweder ein Tag-Name als String (z.B. `'div'` oder `'span'`), ein  [React-Komponenten](/docs/components-and-props.html)-Typ (eine Klasse oder eine Funktion) oder ein [React-Fragment](#reactfragment)-Typ sein.

Dieser Helfer gilt als veraltet, und wir empfehlen, entweder JSX oder `React.createElement()` direkt zu verwenden.

Wenn du JSX verwendest, rufst du `React.createFactory()` normalerweise nicht direkt auf. Siehe [React ohne JSX](/docs/react-without-jsx.html) für mehr Informationen.

* * *

### `isValidElement()` {#isvalidelement}

> Try the new React documentation for [`isValidElement`](https://beta.reactjs.org/reference/react/isValidElement).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
React.isValidElement(object)
```

Überprüft, ob das Objekt ein React-Element ist. Gibt `true` oder `false` zurück.

* * *

### `React.Children` {#reactchildren}

> Try the new React documentation for [`Children`](https://beta.reactjs.org/reference/react/Children).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.Children` bietet Hilfsmittel, um mit der eher undurchschaubaren Datenstruktur von `this.props.children` umzugehen.

#### `React.Children.map` {#reactchildrenmap}

```javascript
React.Children.map(children, function[(thisArg)])
```

Ruft für jedes unmittelbare Kind aus `children` eine Funktion auf, bei der `this` auf `thisArg` gesetzt ist. Wenn `children` ein Array ist, wird dieses durchlaufen und die Funktion wird für jedes Kind im Array aufgerufen. Falls `children` `null` oder `undefined` ist, gibt diese Methode statt einem Array `null` oder `undefined` zurück.

> Hinweis
>
> Falls `children` ein `Fragment` ist, wird es wie ein einziges Kind behandelt und nicht durchlaufen.

#### `React.Children.forEach` {#reactchildrenforeach}

```javascript
React.Children.forEach(children, function[(thisArg)])
```

Wie [`React.Children.map()`](#reactchildrenmap), gibt jedoch kein Array zurück.

#### `React.Children.count` {#reactchildrencount}

```javascript
React.Children.count(children)
```

Gibt die Gesamtzahl der Komponenten in `children` zurück, und gleicht der Anzahl der Callbacks, die mit der `map`- oder `forEach`-Methode aufgerufen werden würden.

#### `React.Children.only` {#reactchildrenonly}

```javascript
React.Children.only(children)
```

Überprüft, ob `children` nur ein Kind (ein React-Element) hat und gibt es zurück. Ansonsten wirft diese Methode einen Fehler.

> Hinweis:
>
>`React.Children.only()` akzeptiert nicht den Rückgabewert von [`React.Children.map()`](#reactchildrenmap), da dieser ein Array ist und kein React-Element.

#### `React.Children.toArray` {#reactchildrentoarray}

```javascript
React.Children.toArray(children)
```

Gibt die eher undurchschaubare `children`-Datenstruktur als flaches Array zurück, wobei jedem Kind ein Key zugeordnet ist. Nützlich, falls in render-Methoden Kinder-Ansammlungen manipuliert werden sollen, insbesondere beim Umordnen oder Slicen von `this.props.children`, bevor diese weitergegeben werden.

> Hinweis:
>
> `React.Children.toArray()` ändert Keys, um die Semantik verschachtelter Arrays zu erhalten, während Listen von Kindern geflattet werden. Das bedeutet, dass `toArray` ein Präfix vor jeden Key des zurückgegebenen Arrays setzt, damit der Key jedes Elements dem Input-Array, dem es angehört, zugeordnet ist.

* * *

### `React.Fragment` {#reactfragment}

> Try the new React documentation for [`Fragment`](https://beta.reactjs.org/reference/react/Fragment).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

Die `React.Fragment`-Komponente erlaubt dir, mehrere Elemente in einer `render()`-Methode zurückzugeben, ohne ein zusätzliches DOM-Element zu kreieren:

```javascript
render() {
  return (
    <React.Fragment>
      Irgendein Text.
      <h2>Eine Überschrift</h2>
    </React.Fragment>
  );
}
```

Du kannst auch die Kurzschreibweise `<></>` verwenden. Für mehr Informationen siehe [React v16.2.0: Verbesserte Unterstützung für Fragmente](/blog/2017/11/28/react-v16.2.0-fragment-support.html).

* * *

### `React.createRef` {#reactcreateref}

> Try the new React documentation for [`createRef`](https://beta.reactjs.org/reference/react/createRef).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.createRef` erstellt eine [Referenz](/docs/refs-and-the-dom.html), die über das `ref`-Attribut an React-Elemente angehängt werden kann.
`embed:16-3-release-blog-post/create-ref-example.js`

* * *

### `React.forwardRef` {#reactforwardref}

> Try the new React documentation for [`forwardRef`](https://beta.reactjs.org/reference/react/forwardRef).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.forwardRef` erstellt eine React-Komponente, die das [ref](/docs/refs-and-the-dom.html)-Attribut, das sie erhält, an eine ihr in der Baumstruktur untergeordnete Komponente weitergibt. Diese Technik ist nicht sehr verbreitet, ist jedoch in zwei Fällen besonders nützlich:

* [Refs an DOM-Komponenten weitergeben](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [Refs and Higher-Order-Komponenten weitergeben](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` akzeptiert eine render-Funktion als Argument. React ruft diese Funktion mit den zwei Argumenten `props` und `ref` auf und sollte einen React-Knoten zurückgeben.

`embed:reference-react-forward-ref.js`

Im obigen Beispiel übergibt React eine `ref`, die dem `<FancyButton ref={ref}>`-Element gegeben wurde, als zweites Argument an die render-Funktion innerhalb des `React.forwardRef`-Aufrufs. Diese render-Funktion gibt die `ref` an das `<button ref={ref}>`-Element weiter.

Dadurch zeigt `ref.current` direkt auf die `<button>`-DOM-Element-Instanz, nachdem React die `ref` eingefügt hat.

Für mehr Informationen siehe [Refs weitergeben](/docs/forwarding-refs.html).

* * *

### `React.lazy` {#reactlazy}

> Try the new React documentation for [`lazy`](https://beta.reactjs.org/reference/react/lazy).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.lazy()` lässt dich eine Komponente definieren, die dynamisch geladen wird. Das hilft, die Bundlegröße zu reduzieren, indem das Laden von Komponenten, die im ursprünglichen Render nicht benutzt werden, verzögert wird.

In unserer [Code-Splitting-Dokumentation](/docs/code-splitting.html#reactlazy) kannst du lernen, wie es benutzt wird. Du kannst auch [diesen Artikel](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) lesen, in dem die Verwendung im Detail erläutert wird.

```js
// Diese Komponente wird dynamisch geladen
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

Beachte, dass das Rendern von `lazy`-Komponenten ein `<React.Suspense>` weiter oben im Rendering-Baum benötigt. Damit wird ein Lade-Indikator bestimmt.

> **Hinweis**
>
> Die Verwendung von `React.lazy` mit dynamischen Imports setzt voraus, dass in der JS-Umgebung `Promises` verfügbar sind. Hierzu braucht man ein Polyfill für IE11 und darunter.

* * *

### `React.Suspense` {#reactsuspense}

> Try the new React documentation for [`Suspense`](https://beta.reactjs.org/reference/react/Suspense).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.Suspense` lässt dich den Lade-Indikator bestimmen, der angezeigt wird, falls einige Komponenten weiter unten im Rendering-Baum noch nicht render-bereit sind. In the future we plan to let `Suspense` handle more scenarios such as data fetching. You can read about this in [our roadmap](/blog/2018/11/27/react-16-roadmap.html).

Momentan ist das Laden von `lazy`-Komponenten der **einzige** Anwendungsfall, den `<React.Suspense>` unterstützt:

```js
// Diese Komponente wird dynamisch geladen
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Zeigt <Spinner>, bis OtherComponent geladen ist
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

Das ist in unserem [Code-Splitting-Guide](/docs/code-splitting.html#reactlazy) dokumentiert. Beachte, dass sich `lazy`-Komponenten tief im `Suspense`-Baum befinden können -- es muss nicht jede einzelne davon ummantelt werden. Es wird empfohlen, `<Suspense>` dort zu verwenden, wo ein Lade-Indikator angezeigt werden soll, und `lazy(`) dort zu verwenden, wo Code-Splitting stattfinden soll.

> Note
>
> For content that is already shown to the user, switching back to a loading indicator can be disorienting. It is sometimes better to show the "old" UI while the new UI is being prepared. To do this, you can use the new transition APIs [`startTransition`](#starttransition) and [`useTransition`](/docs/hooks-reference.html#usetransition) to mark updates as transitions and avoid unexpected fallbacks.

#### `React.Suspense` in Server Side Rendering {#reactsuspense-in-server-side-rendering}
During server side rendering Suspense Boundaries allow you to flush your application in smaller chunks by suspending.
When a component suspends we schedule a low priority task to render the closest Suspense boundary's fallback. If the component unsuspends before we flush the fallback then we send down the actual content and throw away the fallback.

#### `React.Suspense` during hydration {#reactsuspense-during-hydration}
Suspense boundaries depend on their parent boundaries being hydrated before they can hydrate, but they can hydrate independently from sibling boundaries. Events on a boundary before it is hydrated will cause the boundary to hydrate at a higher priority than neighboring boundaries. [Read more](https://github.com/reactwg/react-18/discussions/130)

### `React.startTransition` {#starttransition}

> Try the new React documentation for [`startTransition`](https://beta.reactjs.org/reference/react/startTransition).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```js
React.startTransition(callback)
```
`React.startTransition` lets you mark updates inside the provided callback as transitions. This method is designed to be used when [`React.useTransition`](/docs/hooks-reference.html#usetransition) is not available.

> Note:
>
> Updates in a transition yield to more urgent updates such as clicks.
>
> Updates in a transition will not show a fallback for re-suspended content, allowing the user to continue interacting while rendering the update.
>
> `React.startTransition` does not provide an `isPending` flag. To track the pending status of a transition see [`React.useTransition`](/docs/hooks-reference.html#usetransition).
---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

The `react-dom` package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model if you need to.

```js
import * as ReactDOM from 'react-dom';
```

If you use ES5 with npm, you can write:

```js
var ReactDOM = require('react-dom');
```

The `react-dom` package also provides modules specific to client and server apps:
- [`react-dom/client`](/docs/react-dom-client.html)
- [`react-dom/server`](/docs/react-dom-server.html)

## Übersicht {#overview}

The `react-dom` package exports these methods:
- [`createPortal()`](#createportal)
- [`flushSync()`](#flushsync)

These `react-dom` methods are also exported, but are considered legacy:
- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`findDOMNode()`](#finddomnode)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)

> Note: 
> 
> Both `render` and `hydrate` have been replaced with new [client methods](/docs/react-dom-client.html) in React 18. These methods will warn that your app will behave as if it's running React 17 (learn more [here](https://reactjs.org/link/switch-to-createroot)).

### Browser-Unterstützung {#browser-support}

React unterstützt alle modernen Browser, auch wenn für für ältere Browser [einige Polyfills notwendig](/docs/javascript-environment-requirements.html) sind.

> Hinweis
>
> Wir unterstützen keine älteren Browser, die über keine ES5 Methoden oder microtasks wie der Internet Explorer verfügen. Möglicherweise funktionieren deine Anwendungen auch in älteren Browsern, wenn Polyfills wie z.B. [es5-shim und es5-sham](https://github.com/es-shims/es5-shim) auf deiner Seite eingebunden sind. Du bist jedoch dann auf dich alleine gestellt, wenn du diesen Weg gehst.

* * *

## Referenz {#reference}

### `createPortal()` {#createportal}

> Try the new React documentation for [`createPortal`](https://beta.reactjs.org/reference/react-dom/createPortal).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
createPortal(child, container)
```

Creates a portal. Portals provide a way to [render children into a DOM node that exists outside the hierarchy of the DOM component](/docs/portals.html).

### `flushSync()` {#flushsync}

> Try the new React documentation for [`flushSync`](https://beta.reactjs.org/reference/react-dom/flushSync).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
flushSync(callback)
```

Force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.

```javascript
// Force this state update to be synchronous.
flushSync(() => {
  setCount(count + 1);
});
// By this point, DOM is updated.
```

> Note:
> 
> `flushSync` can significantly hurt performance. Use sparingly.
> 
> `flushSync` may force pending Suspense boundaries to show their `fallback` state.
> 
> `flushSync` may also run pending effects and synchronously apply any updates they contain before returning.
> 
> `flushSync` may also flush updates outside the callback when necessary to flush the updates inside the callback. For example, if there are pending updates from a click, React may flush those before flushing the updates inside the callback.

## Legacy Reference {#legacy-reference}
### `render()` {#render}

> Try the new React documentation for [`render`](https://beta.reactjs.org/reference/react-dom/render).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
render(element, container[, callback])
```

> Note:
>
> `render` has been replaced with `createRoot` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Rendert ein React-Element in das DOM in dem zur Verfügung gestellten `container` und gibt eine [Referenz](/docs/more-about-refs.html) zur Komponente zurück (oder `null` für [Funktionale(stateless) Komponenten](/docs/components-and-props.html#functional-and-class-components)).

Wenn das React Element zuvor bereits in einem `container` gerendert wurde, führt diese Operation ein Update aus und ändert nur das DOM so wie es notwendig ist, um das aktuellste React Element darzustellen.

Wird ein optionaler Callback zur Verfügung gestellt, wird dieser ausgeführt nachdem die Komponente gerendert oder geupdated wurde.

> Hinweis:
>
> `render()` kontrolliert den Inhalt des Container-Knoten den du übergeben hast. Jedes darin existierende DOM Element wird beim ersten Aufruf ersetzt. Spätere Aufrufe nutzen Reacts DOM Differenzierungs-Algorithmus für effiziente Updates.
>
> `render()` verändert nicht den Container-Knoten (es werden nur die untergeordneten Container Elemente modifiziert). Es kann möglich sein, eine Komponente in einen existierenden DOM Knoten einzufügen ohne die bereits existierenden untergeordneten Elemente zu überschreiben.
>
> `render()` gibt aktuell eine Referenz zur Root `ReactComponent`-Instanz zurück. Nichtsdestotrotz ist der Gebrauch dieses Rückgabewerts historisch bedingt und sollte vermieden werden, da in zukünftigen Versionen von React das Rendern von Komponenten in einigen Fällen asynchron erfolgen kann. Solltest du eine Referenz zur Instanz der Wurzel `ReactComponent` benötigen, sieht die bevorzugte Lösung vor, ein [callback ref](/docs/refs-and-the-dom.html#callback-refs) des Wurzel-Elements hinzuzufügen.
>
> Die Nutzung von `render()` um eine auf dem Server gerenderte Komponente zu hydrieren ist veraltet. Nutze stattdessen [`hydrateRoot()`](/docs/react-dom-client.html#hydrateroot).

* * *

### `hydrate()` {#hydrate}

> Try the new React documentation for [`hydrate`](https://beta.reactjs.org/reference/react-dom/hydrate).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
hydrate(element, container[, callback])
```

> Note:
>
> `hydrate` has been replaced with `hydrateRoot` in React 18. See [hydrateRoot](/docs/react-dom-client.html#hydrateroot) for more info.

Genauso wie [`render()`](#render), aber es wird genutzt um einen Container, dessen HTML Inhalt durch [`ReactDOMServer`](/docs/react-dom-server.html) gerendert wurde, zu hydrieren. React wird versuchen Event Listener dem existierendem Markup hinzuzufügen.

React erwartet, dass der gerenderte Inhalt identisch zwischen Server und Client ist. Unterschiede im textlichen Inhalt werden zwar behoben, sollten aber als Fehler betrachtet und repariert werden. Im Entwicklungsmodus warnt React bei Nichtübereinstimmung während der Hydration. Es wird keine Garantie gegeben, dass Unterschiede bei Attributen behoben werden, wenn diese nicht übereinstimmen. Dies ist aus Leistungsgründen für die meisten Applikationen wichtig, da Nichtübereinstimmungen selten sind und dem gegenüber ihre Überprüfung unverhältnismäßig aufwendig wäre.

Wenn das Attribut eines einzelnen Elements oder der Textinhalt zwischen Server und Client unvermeidbar unterschiedlich ist (z.B. bei einem Timestamp), kannst du die Warnungen durch das Hinzufügen von `suppressHydrationWarning={true}` am Element unterdrücken. Dies funktioniert aber nur eine Ebene tief und ist als Notlösung vorgesehen. Überstrapaziere die Nutzung daher nicht. Sollte es kein Textinhalt sein, wird React weiterhin nicht versuchen, die Unterschiede zu beheben, daher kann das Verhalten bis zu zukünftigen Updates inkonsistenz bleiben.

Versuchst du absichtlich etwas anderes auf dem Server als auf dem Client zu rendern, kannst du ein Rendern mit zwei Durchgängen durchführen. Eine Komponente, die etwas anderes auf dem Client rendert kann eine State Variable wie `this.state.isClient` auslesen, welche von dir in `componentDidMount()` auf `true` gesetzt wird. Dadurch wird beim ersten Render Durchgang dasselbe wie auf dem Server gerendert und Nichtübereinstimmungen vermieden, aber ein zusätzlicher Client Render Durchgang geschieht synchron direkt nach der Hydration.
Vergesse nicht, dass dieses Vorgehen deine Komponenten verlangsamt, da dass rendern zweimal geschieht. Nutze es daher mit Vorsicht.

Vergesse nicht das Benutzererlebnis bei langsamen Verbindungen zu berücksichtigen. Der JavaScript-Code kann deutlich später geladen werden als das erste initiale Rendern des HTML. Renderst du daher etwas anderes beim Client-Render-Durchgang kann der Übergang ruckhaft sein. Wird dieses Vorgehen aber gut ausgeführt, kann es von Vorteil sein eine "Hülle" der Applikation auf dem Server zu rendern und nur zusätzliche Widgets erst auf dem Client anzuzeigen. Um zu erfahren, wie dies getan werden kann und dabei das Problem der Nichtübereinstimmung von Markup zu umgehen, schaue dir den vorherigen Paragraph an.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

> Try the new React documentation for [`unmountComponentAtNode`](https://beta.reactjs.org/reference/react-dom/unmountComponentAtNode).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
unmountComponentAtNode(container)
```

> Note:
>
> `unmountComponentAtNode` has been replaced with `root.unmount()` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Entfernt eine React Komponente die gemounted wurde von dem DOM und entfernt ihren State, sowie Event-Handler. Wenn keine Komponente im Container gemounted ist, macht der Aufruf dieser Funktion nichts. Gibt `true` zurück, wenn eine Komponente erfolgreich geunmounted wurde, andernfalls `false`.

* * *

### `findDOMNode()` {#finddomnode}

> Try the new React documentation for [`findDOMNode`](https://beta.reactjs.org/reference/react-dom/findDOMNode).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

> Hinweis:
>
> `findDOMNode` ist eine Notlösung die genutzt wird um auf den zugrunde liegenden DOM-Knoten zuzugreifen. In den meisten Fällen wird von der Nutzung abgeraten, da es die Abstraktion durch Komponenten löchrig macht. [Die Nutzung ist im `StrictMode` veraltet.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
findDOMNode(component)
```

Ist die übergebene Komponente im DOM gemounted, gibt sie das passende native Browser-DOM-Element zurück. Die Methode ist nützlich um Werte aus Formfelder im DOM auszulesen oder Messungen im DOM auszuführen. **In den meisten Fällen kannst du eine Referenz an den DOM-Knoten anhängen und die Nutzung von `findDOMNode` komplett vermeiden.**

Wenn eine Komponente `null` oder `false` rendert, gibt `findDOMNode` `null` zurück. Wenn eine Komponente einen String rendert, gibt `findDOMNode` einen DOM Text-Knoten zurück, welche diesen Text enthält. Mit React 16 kann eine Komponente ein Fragment zurückgeben, dass mehrere untergeordnete Komponenten enthält. In diesem Fall gibt `findDOMNode` den DOM Knoten zurück, der dem ersten nicht leeren untergeordneten Element entspricht.

> Hinweis:
>
> `findDOMNode` funktioniert nur bei gemounteten Komponenten (Komponenten die in das DOM platziert wurden). Versuchst du einen Aufruf bei einer Komponente die noch nicht gemounted wurde (z.B. beim Aufruf von `findDOMNode()` in `render()` innerhalb einer Komponente die noch nicht erstellt wurde) wird eine Ausnahme geworfen.
>
> `findDOMNode` kann nicht bei Funktionskomponenten genutzt werden.

* * *
