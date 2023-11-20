---
<<<<<<< HEAD
title: "Integrierte React Hooks"
=======
title: React Reference Overview
>>>>>>> 4f9e9a56611c7a56b9506cf0a7ca84ab409824bc
---

<Intro>

<<<<<<< HEAD
*Hooks* ermöglichen dir verschiedene React-Funktionen in deinen Komponenten zu verwenden. Du kannst entweder die integrierten Hooks verwenden oder sie kombinieren, um eigene zu erstellen. Diese Seite listet alle integrierten Hooks in React auf.
=======
This section provides detailed reference documentation for working with React. For an introduction to React, please visit the [Learn](/learn) section.
>>>>>>> 4f9e9a56611c7a56b9506cf0a7ca84ab409824bc

</Intro>

Our The React reference documentation is broken down into functional subsections:

## React {/*react*/}

<<<<<<< HEAD
Mit dem *State* kann sich eine Komponente [Informationen wie Benutzereingaben "merken"](/learn/state-a-components-memory). Zum Beispiel kann eine Formularkomponente den State verwenden, um den Eingabewert zu speichern, während eine Bildergaleriekomponente den State verwenden kann, um den ausgewählten Bildindex zu speichern.

Verwende eine dieser Hooks, um einen State zu einer Komponente hinzuzufügen:

* [`useState`](/reference/react/useState) deklariert eine Zustandsvariable, die man direkt aktualisieren kann.
* [`useReducer`](/reference/react/useReducer) deklariert eine Zustandsvariable mit der Aktualisierungslogik innerhalb einer [reducer-Funktion.](/learn/extracting-state-logic-into-a-reducer)
=======
Programmatic React features:

* [Hooks](/reference/react/hooks) - Use different React features from your components.
* [Components](/reference/react/components) - Documents built-in components that you can use in your JSX.
* [APIs](/reference/react/apis) - APIs that are useful for defining components.
* [Directives](/reference/react/directives) - Provide instructions to bundlers compatible with React Server Components.

## React DOM {/*react-dom*/}
>>>>>>> 4f9e9a56611c7a56b9506cf0a7ca84ab409824bc

React-dom contains features that are only supported for web applications (which run in the browser DOM environment). This section is broken into the following:

* [Hooks](/reference/react-dom/hooks) - Hooks for web applications which run in the browser DOM environment.
* [Components](/reference/react-dom/components) - React supports all of the browser built-in HTML and SVG components.
* [APIs](/reference/react-dom) - The `react-dom` package contains methods supported only in web applications.
* [Client APIs](/reference/react-dom/client) - The `react-dom/client` APIs let you render React components on the client (in the browser).
* [Server APIs](/reference/react-dom/server) - The `react-dom/server` APIs let you render React components to HTML on the server.

<<<<<<< HEAD
## Kontext Hooks {/*context-hooks*/}

*Kontext* ermöglicht einer Komponente, [Informationen von entfernten Eltern zu erhalten, ohne sie als Props weiterzugeben.](/learn/passing-props-to-a-component) So kann beispielsweise die oberste Komponente einer Anwendung das aktuelle Farbschema an alle darunter liegenden Komponenten weitergeben, egal wie tief sie sind.

* [`useContext`](/reference/react/useContext) liest und abonniert einen Kontext.

```js
function Button() {
  const theme = useContext(ThemeContext);
  // ...
```

---

## Ref Hooks {/*ref-hooks*/}

*Refs* ermöglichen einer Komponente [Informationen zu halten, die nicht zum Rendern verwendet werden,](/learn/referencing-values-with-refs) z. B. einen DOM-Knoten oder eine Timeout-ID. Anders als bei einem State wird bei der Aktualisierung einer Referenz die Komponente nicht neu gerendert. Refs sind eine Ausstiegsmöglichkeit aus dem React-Paradigma. Sie sind nützlich, wenn man mit Systemen arbeiten muss, die nicht zu React gehören, wie z. B. die integrierten Browser-APIs.

* [`useRef`](/reference/react/useRef) deklariert eine Referenz. Du kannst jeden beliebigen Wert darin speichern, aber meistens wird es verwendet, um einen DOM-Knoten zu referenzieren.
* [`useImperativeHandle`](/reference/react/useImperativeHandle) ermöglicht dir die Referenz zu deiner Komponente anzupassen. Diese Möglichkeit wird selten genutzt.

```js
function Form() {
  const inputRef = useRef(null);
  // ...
```

---

## Effekt Hooks {/*effect-hooks*/}

*Effekte* ermöglichen einer Komponente, [Verbindungen zu externen Systemen herzustellen und sich mit diesen zu synchronisieren.](/learn/synchronizing-with-effects) Dazu gehören Netzwerkanfragen, Browser-DOM-Zugriffe, Animationen, Widgets, die mit einer anderen UI-Bibliothek geschrieben wurden, und anderer Nicht-React-Code.

* [`useEffect`](/reference/react/useEffect) verbindet eine Komponente mit einem externen System.

```js
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  // ...
```

Effekte sind eine Ausstiegsmöglichkeit aus dem React-Paradigma. Verwende keine Effekte, um den Datenfluss deiner Anwendung zu orchestrieren. Wenn du nicht mit einem externen System interagierst, [benötigst du vielleicht keinen Effekt.](/learn/you-might-not-need-an-effect)

Es gibt zwei selten verwendete Varianten von `useEffect`, die sich im Ausführungszeitpunkt unterscheiden:

* [`useLayoutEffect`](/reference/react/useLayoutEffect) wird ausgeführt, bevor der Browser den Bildschirm neu rendert. Hier kannst du das Layout messen.
* [`useInsertionEffect`](/reference/react/useInsertionEffect) wird ausgeführt, bevor React Änderungen am DOM vornimmt. Hier können Bibliotheken dynamisches CSS einfügen.

---

## Leistungsorientierte Hooks {/*performance-hooks*/}

Das Vermeiden von überflüssiger Arbeit ist eine gängige Methode, um die Leistung des Re-Renderns zu optimieren. React kann zum Beispiel angewiesen werden, zwischengespeicherte Berechnung wiederzuverwenden oder das Re-Rendern zu verhindern, wenn sich die Daten seit dem letzten Rendering nicht geändert haben.

Verwende eine dieser Hooks, um überflüssige Berechnungen oder Re-Renderings zu vermeiden:

- [`useMemo`](/reference/react/useMemo) ermöglicht dir das Ergebnis einer teuren Berechnung zwischenzuspeichern.
- [`useCallback`](/reference/react/useCallback) ermöglicht dir Funktionsdefinition zwischenzuspeichern, bevor sie an eine optimierte Komponente weitergegeben werden.

```js
function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```

Manchmal kann man das Re-Rendering nicht umgehen, weil der Bildschirminhalt tatsächlich aktualisiert werden muss. In diesem Fall kannst du die Leistung verbessern, indem du blockierende Aktualisierungen, die synchron sein müssen (wie die Eingabe in ein Eingabefeld), von nicht blockierenden Aktualisierungen trennst, die die Benutzeroberfläche nicht blockieren müssen (wie die Aktualisierung eines Diagramms).

Verwende eine dieser Hooks, um Renderings zu priorisieren:

- [`useTransition`](/reference/react/useTransition) ermöglicht dir einen Zustandsübergang als nicht blockierend zu kennzeichnen und andere Aktualisierungen zuzulassen, die ihn unterbrechen.
- [`useDeferredValue`](/reference/react/useDeferredValue) ermöglicht dir die Aktualisierung eines nicht kritischen Teils der Benutzeroberfläche aufzuschieben und andere Teile zuerst zu aktualisieren.

---

## Resource Hooks {/*resource-hooks*/}

Auf *Ressourcen* kann eine Komponente zugreifen, ohne dass sie Teil ihres States sind. Zum Beispiel kann eine Komponente eine Nachricht aus einem Promise oder Styling-Informationen aus einem Context lesen.

Um einen Wert aus einer Ressource zu lesen, verwende diesen Hook:

- [`use`](/reference/react/use) lässt dich den Wert einer Ressource wie [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) oder [context](/learn/passing-data-deeply-with-context) lesen.

```js
function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext);
  // ...
}
```

---

## Andere Hooks {/*other-hooks*/}

Diese Hooks sind vor allem für Bibliotheksautoren nützlich und werden in der Regel nicht in Anwendungscode verwendet.

- [`useDebugValue`](/reference/react/useDebugValue) ermöglicht dir die Beschriftung anzupassen, die React DevTools für deine benutzerdefinierte Hook anzeigt.
- [`useId`](/reference/react/useId) ermöglicht dir einer Komponente eine eindeutige ID zuzuordnen. Wird in der Regel mit Accessibility-APIs verwendet.
- [`useSyncExternalStore`](/reference/react/useSyncExternalStore) ermöglicht einer Komponente einen externen Speicher zu abonnieren.

---

## Deine eigenen Hooks {/*your-own-hooks*/}

Du kannst auch [deine eigenen Hooks](/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component) als JavaScript-Funktionen definieren.
=======
## Legacy APIs {/*legacy-apis*/}

* [Legacy APIs](/reference/react/legacy) - Exported from the `react` package, but not recommended for use in newly written code.
>>>>>>> 4f9e9a56611c7a56b9506cf0a7ca84ab409824bc
