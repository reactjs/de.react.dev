---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

<<<<<<< HEAD
Falls du React von einem `<script>`-Tag heraus lädst, sind diese Top-Level APIs im globalen `ReactDOM`-Objekt verfügbar. Solltest du ES6 mit npm verwenden, kannst du `import ReactDOM from 'react-dom'` schreiben. Wenn du ES5 mit npm verwendest, kannst du `var React = require('react-dom')` schreiben.
=======
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
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

## Übersicht {#overview}

<<<<<<< HEAD
Das `react-dom` Paket stellt DOM-spezifische Methoden zur Verfügung, die bei Bedarf am Einstiegspunkt deiner Applikation und als Notausstieg, um aus dem React Model auszubrechen, genutzt werden können. Die meisten deiner Komponenten sollten nicht auf dieses Modul angewiesen sein.
=======
The `react-dom` package exports these methods:
- [`createPortal()`](#createportal)
- [`flushSync()`](#flushsync)
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

These `react-dom` methods are also exported, but are considered legacy:
- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`findDOMNode()`](#finddomnode)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)

> Note: 
> 
> Both `render` and `hydrate` have been replaced with new [client methods](/docs/react-dom-client.html) in React 18. These methods will warn that your app will behave as if it's running React 17 (learn more [here](https://reactjs.org/link/switch-to-createroot)).

### Browser-Unterstützung {#browser-support}

<<<<<<< HEAD
React unterstützt alle populären Browser, einschließlich Internet Explorer 9 und höher, auch wenn für ältere Browser, wie IE9 und IE10, [einige Polyfills notwendig](/docs/javascript-environment-requirements.html) sind.
=======
React supports all modern browsers, although [some polyfills are required](/docs/javascript-environment-requirements.html) for older versions.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> Hinweis
>
<<<<<<< HEAD
> Wir unterstützen keine älteren Browser, die über keine ES5 Methoden verfügen. Möglicherweise funktionieren deine Anwendungen auch in älteren Browsern, wenn Polyfills wie z.B. [es5-shim und es5-sham](https://github.com/es-shims/es5-shim) auf deiner Seite eingebunden sind. Du bist jedoch dann auf dich alleine gestellt, wenn du diesen Weg gehst.

* * *
=======
> We do not support older browsers that don't support ES5 methods or microtasks such as Internet Explorer. You may find that your apps do work in older browsers if polyfills such as [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) are included in the page, but you're on your own if you choose to take this path.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

## Referenz {#reference}

### `createPortal()` {#createportal}

```javascript
createPortal(child, container)
```

<<<<<<< HEAD
Rendert ein React-Element in das DOM in dem zur Verfügung gestellten `container` und gibt eine [Referenz](/docs/more-about-refs.html) zur Komponente zurück (oder `null` für [Funktionale(stateless) Komponenten](/docs/components-and-props.html#functional-and-class-components)).
=======
Creates a portal. Portals provide a way to [render children into a DOM node that exists outside the hierarchy of the DOM component](/docs/portals.html).

### `flushSync()` {#flushsync}

```javascript
flushSync(callback)
```

Force React to flush any updates inside the provided callback synchronously. This method is useful for being able to read the result of those updates immediately.

> Note:
> 
> `flushSync` can have a significant impact on performance. Use sparingly.
> 
> `flushSync` may force pending Suspense boundaries to show their `fallback` state.
> 
> `flushSync` may also run pending effects and synchronously apply any updates they contain before returning.
> 
> `flushSync` may also flush updates outside the callback when necessary to flush the updates inside the callback. For example, if there are pending updates from a click, React may flush those before flushing the updates inside the callback.

## Legacy Reference {#legacy-reference}
### `render()` {#render}
```javascript
render(element, container[, callback])
```

> Note:
>
> `render` has been replaced with `createRoot` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Render a React element into the DOM in the supplied `container` and return a [reference](/docs/more-about-refs.html) to the component (or returns `null` for [stateless components](/docs/components-and-props.html#function-and-class-components)).
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

Wenn das React Element zuvor bereits in einem `container` gerendert wurde, führt diese Operation ein Update aus und ändert nur das DOM so wie es notwendig ist, um das aktuellste React Element darzustellen.

Wird ein optionaler Callback zur Verfügung gestellt, wird dieser ausgeführt nachdem die Komponente gerendert oder geupdated wurde.

> Hinweis:
>
<<<<<<< HEAD
> `ReactDOM.render()` kontrolliert den Inhalt des Container-Knoten den du übergeben hast. Jedes darin existierende DOM Element wird beim ersten Aufruf ersetzt. Spätere Aufrufe nutzen Reacts DOM Differenzierungs-Algorithmus für effiziente Updates.
>
> `ReactDOM.render()` verändert nicht den Container-Knoten (es werden nur die untergeordneten Container Elemente modifiziert). Es kann möglich sein, eine Komponente in einen existierenden DOM Knoten einzufügen ohne die bereits existierenden untergeordneten Elemente zu überschreiben.
>
> `ReactDOM.render()` gibt aktuell eine Referenz zur Root `ReactComponent`-Instanz zurück. Nichtsdestotrotz ist der Gebrauch dieses Rückgabewerts historisch bedingt und sollte vermieden werden, da in zukünftigen Versionen von React das Rendern von Komponenten in einigen Fällen asynchron erfolgen kann. Solltest du eine Referenz zur Instanz der Wurzel `ReactComponent` benötigen, sieht die bevorzugte Lösung vor, ein [callback ref](/docs/refs-and-the-dom.html#callback-refs) des Wurzel-Elements hinzuzufügen.
>
> Die Nutzung von `ReactDOM.render()` um eine auf dem Server gerenderte Komponente zu hydrieren ist veraltet und wird in React 17 entfernt. Nutze stattdessen [`hydrate()`](#hydrate).
=======
> `render()` controls the contents of the container node you pass in. Any existing DOM elements inside are replaced when first called. Later calls use React’s DOM diffing algorithm for efficient updates.
>
> `render()` does not modify the container node (only modifies the children of the container). It may be possible to insert a component to an existing DOM node without overwriting the existing children.
>
> `render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy
> and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a
> [callback ref](/docs/refs-and-the-dom.html#callback-refs) to the root element.
>
> Using `render()` to hydrate a server-rendered container is deprecated. Use [`hydrateRoot()`](#hydrateroot) instead.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `hydrate()` {#hydrate}

```javascript
hydrate(element, container[, callback])
```

<<<<<<< HEAD
Genauso wie [`render()`](#render), aber es wird genutzt um einen Container, dessen HTML Inhalt durch [`ReactDOMServer`](/docs/react-dom-server.html) gerendert wurde, zu hydrieren. React wird versuchen Event Listener dem existierendem Markup hinzuzufügen.
=======
> Note:
>
> `hydrate` has been replaced with `hydrateRoot` in React 18. See [hydrateRoot](/docs/react-dom-client.html#hydrateroot) for more info.

Same as [`render()`](#render), but is used to hydrate a container whose HTML contents were rendered by [`ReactDOMServer`](/docs/react-dom-server.html). React will attempt to attach event listeners to the existing markup.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

React erwartet, dass der gerenderte Inhalt identisch zwischen Server und Client ist. Unterschiede im textlichen Inhalt werden zwar behoben, sollten aber als Fehler betrachtet und repariert werden. Im Entwicklungsmodus warnt React bei Nichtübereinstimmung während der Hydration. Es wird keine Garantie gegeben, dass Unterschiede bei Attributen behoben werden, wenn diese nicht übereinstimmen. Dies ist aus Leistungsgründen für die meisten Applikationen wichtig, da Nichtübereinstimmungen selten sind und dem gegenüber ihre Überprüfung unverhältnismäßig aufwendig wäre.

Wenn das Attribut eines einzelnen Elements oder der Textinhalt zwischen Server und Client unvermeidbar unterschiedlich ist (z.B. bei einem Timestamp), kannst du die Warnungen durch das Hinzufügen von `suppressHydrationWarning={true}` am Element unterdrücken. Dies funktioniert aber nur eine Ebene tief und ist als Notlösung vorgesehen. Überstrapaziere die Nutzung daher nicht. Sollte es kein Textinhalt sein, wird React weiterhin nicht versuchen, die Unterschiede zu beheben, daher kann das Verhalten bis zu zukünftigen Updates inkonsistenz bleiben.

Versuchst du absichtlich etwas anderes auf dem Server als auf dem Client zu rendern, kannst du ein Rendern mit zwei Durchgängen durchführen. Eine Komponente, die etwas anderes auf dem Client rendert kann eine State Variable wie `this.state.isClient` auslesen, welche von dir in `componentDidMount()` auf `true` gesetzt wird. Dadurch wird beim ersten Render Durchgang dasselbe wie auf dem Server gerendert und Nichtübereinstimmungen vermieden, aber ein zusätzlicher Client Render Durchgang geschieht synchron direkt nach der Hydration.
Vergesse nicht, dass dieses Vorgehen deine Komponenten verlangsamt, da dass rendern zweimal geschieht. Nutze es daher mit Vorsicht.

Vergesse nicht das Benutzererlebnis bei langsamen Verbindungen zu berücksichtigen. Der JavaScript-Code kann deutlich später geladen werden als das erste initiale Rendern des HTML. Renderst du daher etwas anderes beim Client-Render-Durchgang kann der Übergang ruckhaft sein. Wird dieses Vorgehen aber gut ausgeführt, kann es von Vorteil sein eine "Hülle" der Applikation auf dem Server zu rendern und nur zusätzliche Widgets erst auf dem Client anzuzeigen. Um zu erfahren, wie dies getan werden kann und dabei das Problem der Nichtübereinstimmung von Markup zu umgehen, schaue dir den vorherigen Paragraph an.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
unmountComponentAtNode(container)
```

<<<<<<< HEAD
Entfernt eine React Komponente die gemounted wurde von dem DOM und entfernt ihren State, sowie Event-Handler. Wenn keine Komponente im Container gemounted ist, macht der Aufruf dieser Funktion nichts. Gibt `true` zurück, wenn eine Komponente erfolgreich geunmounted wurde, andernfalls `false`.
=======
> Note:
>
> `unmountComponentAtNode` has been replaced with `root.unmount()` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns `true` if a component was unmounted and `false` if there was no component to unmount.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `findDOMNode()` {#finddomnode}

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
<<<<<<< HEAD

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```

Erstellt ein Portal. Portale sind ein Weg um [untergeordnete Elemente in einen DOM-Knoten zu rendern der außerhalb der Hierarchie, der DOM-Komponente liegt](docs/portals.html).
=======
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1
