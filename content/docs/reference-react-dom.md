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

<<<<<<< HEAD
> Hinweis:
=======
> Try the new React documentation for [`findDOMNode`](https://beta.reactjs.org/reference/react-dom/findDOMNode).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

> Note:
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b
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
