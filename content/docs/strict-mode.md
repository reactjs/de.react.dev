---
id: strict-mode
title: Strict Mode
permalink: docs/strict-mode.html
---

> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [`StrictMode`](https://beta.reactjs.org/reference/react/StrictMode)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


`StrictMode` ist ein Werkzeug zum Aufzeigen potenzieller Probleme in einer Anwendung. `StrictMode` rendert wie `Fragment` keine sichtbare Benutzeroberfläche. Es aktiviert zusätzliche Prüfungen und Warnungen für seine Nachkommen.

> Hinweis:
>
> Prüfungen des strikten Modus werden nur im Entwicklungsmodus ausgeführt. _Sie wirken sich nicht auf den Produktions-Build aus_.

Du kannst den strikten Modus für jeden Teil deiner Anwendung aktivieren. Zum Beispiel:
`embed:strict-mode/enabling-strict-mode.js`

Im obigen Beispiel werden Prüfungen des strikten Modus *nicht* für die Komponenten `Header` und `Footer` ausgeführt. `ComponentOne` und `ComponentTwo` sowie alle ihre Nachkommen haben jedoch die Prüfungen.

`StrictMode` currently helps with:
* [Identifying components with unsafe lifecycles](#identifying-unsafe-lifecycles)
* [Warning about legacy string ref API usage](#warning-about-legacy-string-ref-api-usage)
* [Warning about deprecated findDOMNode usage](#warning-about-deprecated-finddomnode-usage)
* [Detecting unexpected side effects](#detecting-unexpected-side-effects)
* [Detecting legacy context API](#detecting-legacy-context-api)
* [Ensuring reusable state](#ensuring-reusable-state)

StrictMode hilft derzeit bei:

* [Identifizierung von Komponenten mit unsicheren Lifecycles](#identifying-unsafe-lifecycles)
* [Warnung über die Verwendung der String-Ref-API](#warning-about-legacy-string-ref-api-usage)
* [Warnung über veraltete Verwendung von findDOMNode](#warning-about-deprecated-finddomnode-usage)
* [Erkennen unerwarteter Nebenwirkungen](#detecting-unexpected-side-effects)
* [Ermitteln der alten Context-API](#detecting-legacy-context-api)

Zusätzliche Funktionalität wird mit zukünftigen Versionen von React hinzugefügt.

### Identifizierung unsicherer Lifecycles {#identifying-unsafe-lifecycles}

Wie [in diesem Blog-Beitrag](/blog/2018/03/27/update-on-async-rendering.html) erläutert, sind bestimmte Legacy-Lifecycle-Methoden für die Verwendung in asynchronen React-Anwendungen nicht sicher. Wenn deine Anwendung jedoch Bibliotheken von Drittanbietern verwendet, kann es schwierig sein sicherzustellen, dass diese Lifecycles nicht verwendet werden. Glücklicherweise kann der strikte Modus dabei helfen!

Wenn der strikte Modus aktiviert ist, erstellt React eine Liste aller Klassenkomponenten mit den unsicheren Lifecycles und protokolliert eine Warnmeldung mit Informationen zu diesen Komponenten wie folgt:

![](../images/blog/strict-mode-unsafe-lifecycles-warning.png)

Wenn du die im strikten Modus erkannten Probleme _jetzt_ behebst, kannst du asynchrones Rendern in zukünftigen Versionen von React einfacher nutzen.

### Warnung über die Verwendung der veralteten String-Ref-API {#warning-about-legacy-string-ref-api-usage}

Bisher bot React zwei Möglichkeiten zum Verwalten von Refs: die String-Ref-API und die Callback-API. Obwohl die String-Ref-API die bequemere von beiden war, hatte sie [mehrere Nachteile](https://github.com/facebook/react/issues/1373), und so war unsere offizielle Empfehlung [stattdessen die Callback-Variante zu verwenden](/docs/refs-and-the-dom.html#legacy-api-string-refs).

In React 16.3 wurde eine dritte Option hinzugefügt, die den Komfort eines String-Ref ohne Nachteile bietet:
`embed:16-3-release-blog-post/create-ref-example.js`

Da Objekt-Refs größtenteils als Ersatz für String-Refs hinzugefügt wurden, warnt der strikte Modus jetzt vor der Verwendung von String-Refs.

> **Hinweis:**
>
> Callback-Refs werden weiterhin zusätzlich zur neuen `createRef` API unterstützt`
>
> Du musst die Callback-Refs in deinen Komponenten nicht ersetzen. Sie sind etwas flexibler und bleiben daher als fortgeschrittenes Feature erhalten.

[Weitere Informationen zur neuen `createRef`-API findest du hier].(/docs/refs-and-the-dom.html)

### Warnung über die veraltete Verwendung von findDOMNode {#warning-about-deprecated-finddomnode-usage}

React hat in der Vergangenheit `findDOMNode` unterstützt um den Baum nach einem DOM-Knoten zu durchsuchen, der einer Klasseninstanz zugeordnet ist. Normalerweise benötigst du dies nicht, da du einen Verweis [direkt an einen DOM-Knoten anhängen](/docs/refs-and-the-dom.html#creating-refs) kannst.

`findDOMNode` kann auch für Klassenkomponenten verwendet werden, was jedoch ein Bruch in den Abstraktionsebenen war, da es einem übergeordnet Element erlaubte das Rendern bestimmter untergeordneter Elemente zu fordern. Es entsteht ein Refactoring-Risiko, bei dem du die Implementierungsdetails einer Komponente nicht ändern kannst, da ein übergeordnetes Element möglicherweise in den DOM-Knoten greift. `findDOMNode` gibt nur das erste untergeordnete Element zurück. Bei Verwendung von Fragments kann eine Komponente jedoch mehrere DOM-Knoten rendern. findDOMNode ist eine einmalige Lese-API. Es gab dir nur eine Antwort, als du danach gefragt hast. Wenn eine untergeordnete Komponente einen anderen Knoten darstellt, kann diese Änderung nicht verarbeitet werden. Daher funktioniert `findDOMNode` nur, wenn Komponenten immer einen einzelnen DOM-Knoten zurückgeben, der sich nie ändert.

Du kannst dies stattdessen explizit machen, indem du einen Verweis an deine benutzerdefinierte Komponente übergibst und diesen mithilfe der [Ref-Weiterleitung](/docs/forwarding-refs.html#forwarding-refs-to-dom-components) an das DOM weiterleitest.

Du kannst auch einen Wrapper-DOM-Knoten in deine Komponente einfügen und ein Ref direkt daran anhängen.

```javascript{4,7}
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }
  render() {
    return <div ref={this.wrapper}>{this.props.children}</div>;
  }
}
```

> Hinweis:
>
> In CSS kann das Attribut [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#display_contents) verwendet werden, wenn der Knoten nicht Teil des Layouts sein soll.

### Erkennen unerwarteter Nebenwirkungen {#detecting-unexpected-side-effects}

Konzeptionell funktioniert React in zwei Phasen:

* Die **Render-Phase** bestimmt, welche Änderungen z.B. am DOM vorgenommen werden müssen. In dieser Phase ruft React `render` auf und vergleicht das Ergebnis mit dem vorherigen Rendering.
* In der **Commit-Phase** wendet React alle Änderungen an. (Im Fall von React DOM fügt React DOM-Knoten ein, aktualisiert und entfernt sie.) React ruft in dieser Phase auch Lifecycles wie `componentDidMount` und `componentDidUpdate` auf.

Die Commit-Phase ist normalerweise sehr schnell, das Rendern kann jedoch langsam sein. Aus diesem Grund wird die Rendering-Arbeit durch den bevorstehenden Async-Modus (der noch nicht standardmäßig aktiviert ist) in Teile zerlegt, wobei die Arbeit angehalten und fortgesetzt wird, um das Blockieren des Browsers zu vermeiden. Dies bedeutet, dass React Render-Phasen-Lifecycles möglicherweise mehr als einmal vor dem Commit aufruft oder sie ohne Commit aufruft (aufgrund eines Fehlers oder einer Unterbrechung mit höherer Priorität).

Renderphasen-Lifecycles umfassen die folgenden Klassenkomponenten-Methoden:
* `constructor`
* `componentWillMount` (or `UNSAFE_componentWillMount`)
* `componentWillReceiveProps` (or `UNSAFE_componentWillReceiveProps`)
* `componentWillUpdate` (or `UNSAFE_componentWillUpdate`)
* `getDerivedStateFromProps`
* `shouldComponentUpdate`
* `render`
* `setState` Updater-Funktionen (das erste Argument)

Da die oben genannten Methoden möglicherweise mehrmals aufgerufen werden, ist es wichtig, dass sie keine Nebenwirkungen enthalten. Das Ignorieren dieser Regel kann zu einer Vielzahl von Problemen führen, einschließlich Speicherverlusten und ungültigem Anwendungsstatus. Leider kann es schwierig sein, diese Probleme zu erkennen, da sie oft nicht deterministisch sind.

Der strikte Modus kann Nebenwirkungen nicht automatisch für dich erkennen, er kann dir jedoch helfen sie zu erkennen, indem er sie etwas deterministischer gestaltet. Dazu werden absichtlich die folgenden Methoden doppelt aufgerufen:

* Klassenkomponenten `constructor`, `render` und `shouldComponentUpdate` Methoden
* Die statische `getDerivedStateFromProps` Methode
* Der Körper einer funktionalen Komponente
* `setState` Updater-Funktionen (das erste Argument)
* Funktionen die an `useState`, `useMemo` oder `useReducer` gegeben werden

> Hinweis:
>
> Dies gilt nur für den Entwicklungsmodus. Lifecycles werden im Produktionsmodus nicht doppelt aufgerufen.

Betrachte beispielsweise den folgenden Code:
`embed:strict-mode/side-effects-in-constructor.js`

Auf den ersten Blick scheint dieser Code nicht problematisch zu sein. Wenn `SharedApplicationState.recordEvent` jedoch nicht [idempotent](https://de.wikipedia.org/wiki/Idempotenz#Informatik) ist, kann das mehrmalige Instanziieren dieser Komponente zu einem ungültigen Anwendungsstatus führen. Diese Art von subtilen Fehlern kann während der Entwicklung gar nicht oder nur inkonsistent auftreten und daher übersehen werden.

Durch das absichtliche Doppelaufrufen von Methoden wie dem Komponentenkonstruktor erleichtert der strikte Modus das Erkennen solcher Muster.

> Hinweis:
>
> In React 17 werden Konsolenmethoden wie `console.log()` automatisch modifiziert, um die Logs beim zweiten Aufruf von Lifecycle-Methoden zu unterdrücken. Es kann jedoch in bestimmten Fällen zu unerwünschtem Verhalten führen, in denen [ein Workaround verwendet werden kann](https://github.com/facebook/react/issues/20090#issuecomment-715927125).
>
> Starting from React 18, React does not suppress any logs. However, if you have React DevTools installed, the logs from the second call will appear slightly dimmed. React DevTools also offers a setting (off by default) to suppress them completely.

### Ermitteln der alten Context-API {#detecting-legacy-context-api}

Die ältere Context-API ist fehleranfällig und wird in einer zukünftigen Hauptversion entfernt. Sie funktioniert weiterhin für alle 16.x-Versionen, zeigt jedoch diese Warnmeldung im strikten Modus an:

![](../images/blog/warn-legacy-context-in-strict-mode.png)

Lies die [Dokumentation zur neuen Context-API](/docs/context.html), um dir die Migration auf die neue Version zu erleichtern.

### Ensuring reusable state {#ensuring-reusable-state}

In the future, we’d like to add a feature that allows React to add and remove sections of the UI while preserving state. For example, when a user tabs away from a screen and back, React should be able to immediately show the previous screen. To do this, React will support remounting trees using the same component state used before unmounting.

This feature will give React better performance out-of-the-box, but requires components to be resilient to effects being mounted and destroyed multiple times. Most effects will work without any changes, but some effects do not properly clean up subscriptions in the destroy callback, or implicitly assume they are only mounted or destroyed once.

To help surface these issues, React 18 introduces a new development-only check to Strict Mode. This new check will automatically unmount and remount every component, whenever a component mounts for the first time, restoring the previous state on the second mount.

To demonstrate the development behavior you'll see in Strict Mode with this feature, consider what happens when React mounts a new component. Without this change, when a component mounts, React creates the effects:

```
* React mounts the component.
  * Layout effects are created.
  * Effects are created.
```

With Strict Mode starting in React 18, whenever a component mounts in development, React will simulate immediately unmounting and remounting the component:

```
* React mounts the component.
    * Layout effects are created.
    * Effects are created.
* React simulates effects being destroyed on a mounted component.
    * Layout effects are destroyed.
    * Effects are destroyed.
* React simulates effects being re-created on a mounted component.
    * Layout effects are created
    * Effect setup code runs
```

On the second mount, React will restore the state from the first mount. This feature simulates user behavior such as a user tabbing away from a screen and back, ensuring that code will properly handle state restoration.

When the component unmounts, effects are destroyed as normal:

```
* React unmounts the component.
  * Layout effects are destroyed.
  * Effects are destroyed.
```

Unmounting and remounting includes:

- `componentDidMount`
- `componentWillUnmount`
- `useEffect`
- `useLayoutEffect`
- `useInsertionEffect`

> Note:
>
> This only applies to development mode, _production behavior is unchanged_.

For help supporting common issues, see:
  - [How to support Reusable State in Effects](https://github.com/reactwg/react-18/discussions/18)
