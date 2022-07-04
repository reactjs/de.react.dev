---
id: hooks-reference
title: Hooks API Referenz
permalink: docs/hooks-reference.html
prev: hooks-custom.html
next: hooks-faq.html
---

*Hooks* sind ein neues Feature in React 16.8. Damit lassen sich State und andere React Features nutzen, ohne dass eine Klasse geschrieben werden muss.

Diese Seite beschreibt die APIs für die bereits in React implementierten Hooks.

Wenn Hooks neu für dich sind, schau dir zuerst [den Überblick](/docs/hooks-overview.html) an. Nützliche Informationen findest du außerdem in den [häufig gestellten Fragen](/docs/hooks-faq.html).

- [Grundlegende Hooks](#basic-hooks)
  - [`useState`](#usestate)
  - [`useEffect`](#useeffect)
  - [`useContext`](#usecontext)
- [Zusätzliche Hooks](#additional-hooks)
  - [`useReducer`](#usereducer)
  - [`useCallback`](#usecallback)
  - [`useMemo`](#usememo)
  - [`useRef`](#useref)
  - [`useImperativeHandle`](#useimperativehandle)
  - [`useLayoutEffect`](#uselayouteffect)
  - [`useDebugValue`](#usedebugvalue)
  - [`useDeferredValue`](#usedeferredvalue)
  - [`useTransition`](#usetransition)
  - [`useId`](#useid)
- [Library Hooks](#library-hooks)
  - [`useSyncExternalStore`](#usesyncexternalstore)
  - [`useInsertionEffect`](#useinsertioneffect)

## Grundlegende Hooks {#basic-hooks}

### `useState` {#usestate}

```js
const [state, setState] = useState(initialState);
```
Gibt einen zustandsbezogenen (engl. stateful) Wert zurück und eine Funktion, um diesen zu aktualisieren.

Während des initialen Renderns ist der zurückgegebene State (`state`) derselbe Wert, der als erstes Argument (`initialState`) übergeben wird.

Die Funktion `setState` wird verwendet, um den State zu aktualisieren. Sie akzeptiert einen neuen Wert für den State und veranlasst ein erneutes Rendern der Komponente.

```js
setState(newState);
```

Bei jedem folgenden erneuten Rendern ist der erste Wert, der von `useState` zurückgegeben wird, immer derjenige Wert, auf den als letztes aktualisiert wurde.

> Hinweis
>
>React garantiert, dass die Identität der `setState`-Funktion stabil ist und sie sich auch bei erneutem Rendern nicht ändert. Deshalb kann die Funktion problemlos aus der Liste der Abhängigkeiten des `useEffect` oder `useCallback` auslassen werden.

#### Aktualisieren mithilfe einer Funktion {#functional-updates}

Wenn der neue State mithilfe des vorherigen States ermittelt werden soll, kannst du eine Funktion an `setState` übergeben. Diese Funktion erhält den vorherigen Wert und gibt den aktualisierten Wert zurück. Das folgende Beispiel einer Counter-Komponente nutzt beide Formen von `setState`:

```js
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Aktueller Wert: {count}
      <button onClick={() => setCount(initialCount)}>Zurücksetzen</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```
Die Buttons "+" und "-" nutzen eine Funktion, weil der aktualisierte Wert auf dem vorherigen beruht. Der "Zurücksetzen"-Button dagegen benutzt die normale Form, weil er den Zähler immer auf den initialen Wert zurücksetzt.

Wenn die Aktualisierungsfunktion exakt denselben Wert wie der aktuelle State zurückgibt, wird das folgende erneute Rendern vollständig übersprungen.

> Hinweis
>
> Anders als die `setState`-Methode in Klassenkomponenten führt `useState` aktualisierte Objekte nicht automatisch zusammen. Du kannst dieses Verhalten nachahmen, indem du die Aktualisierung mithilfe einer Funktion mit der spread-Syntax für Objekte verbindest:
>
> ```js
> const [state, setState] = useState({});
> setState(prevState => {
>   // Object.assign würde auch funktionieren
>   return {...prevState, ...updatedValues};
> });
> ```
>
> Eine andere Option ist `useReducer`, was sich aber eher eignet, wenn man State-Objekte verwaltet, die mehrere Teilwerte enthalten.

#### Fauler initialer State {#lazy-initial-state}

Das `initialState`-Argument ist derjenige State, der während des initialen Renderns benutzt wird. Bei nachfolgendem Rendern wird er nicht beachtet. Wenn der initiale State das Ergebnis einer aufwendigen Berechnung ist, kannst Du stattdessen auch eine Funktion angeben, die nur beim ersten Rendern ausgeführt wird:

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

#### Abbruch der State-Aktualisierung {#bailing-out-of-a-state-update}

Wenn du einen State Hook auf den gleichen Wert wie den aktuellen aktualisierst, wird React den Vorgang abbrechen, ohne die Kinder zu rendern oder Effekte auszulösen. (React benutzt den [`Object.is`-Vergleichsalgorithmus](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description).)

Beachte, dass React diese spezielle Komponente möglicherweise noch einmal rendern muss, bevor es den Vorgang abbricht. Das sollte kein Problem sein, da React nicht unnötig "tiefer" in den Baum eindringt. Wenn du während des Renderns umfangreiche Berechnungen durchführst, kannst du diese mit `useMemo` optimieren.

#### Bündeln von State-Aktualisierungen {#batching-of-state-updates}

React kann mehrere State-Aktualisierungen in einem einzigen erneuten Rendern zusammenfassen, um die Leistung zu verbessern. Normalerweise verbessert dies die Leistung und sollte keine Auswirkungen auf das Verhalten der Anwendung haben.

Vor React 18 wurden nur Aktualisierungen innerhalb von React-Event-Handlern gebündelt. Seit React 18 [ist die gebündelte Verarbeitung für alle Aktualisierungen standardmäßig aktiviert](/blog/2022/03/08/react-18-upgrade-guide.html#automatic-batching). Beachte, dass React sicherstellt, dass Aktualisierungen von mehreren *verschiedenen* benutzerinitiierten Ereignissen - z.B. zweimaliges Klicken auf eine Schaltfläche - immer separat verarbeitet und nicht zusammengeführt werden. Dies verhindert logische Fehler.

In dem seltenen Fall, dass du die synchrone Anwendung der DOM-Aktualisierung erzwingen musst, kannst du sie in [`flushSync`](/docs/react-dom.html#flushsync) verpacken. Dies kann jedoch die Leistung beeinträchtigen, weshalb du dies nur bei Bedarf tun solltest.

### `useEffect` {#useeffect}

```js
useEffect(didUpdate);
```
Akzeptiert eine Funktion, die imperativen Code enthält, der möglicherweise auch einen Effekt hat.

Innerhalb des Hauptteils von funktionalen Komponenten (in React als _render phase_ bezeichnet) sind Mutationen, Abonnements, Timer, das Loggen (engl. logging) und andere Nebeneffekte nicht erlaubt. Dies hätte nämlich verwirrende Fehler und Ungereimtheiten in der UI zur Folge.

Benutze stattdessen `useEffect`. Die Funktion, die an `useEffect` übergeben wird, wird ausgeführt, nachdem das Rendern an den Bildschirm übertragen worden ist. Effekte sind also die Möglichkeit, aus der rein funktionalen Welt von React in die imperative Welt zu entfliehen.

Standardmäßig werden die Effekte nach jedem abgeschlossenen Rendern ausgeführt, aber du kannst festlegen, dass sie nur ausgelöst werden, [wenn sich bestimmte Werte geändert haben](#conditionally-firing-an-effect).

#### Bereinigung eines Effekts {#cleaning-up-an-effect}

Effekte erzeugen häufig Ressourcen, die bereinigt werden müssen, bevor die Komponente den Bildschirm verlässt, wie etwa ein Abonnement oder eine Timer-ID. Zu diesem Zweck kann die an `useEffect` übergebene Funktion eine Aufräumfunktion zurückgeben. Zum Beispiel, um ein Abonnement zu erstellen:


```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Bereinigen des Abonnements
    subscription.unsubscribe();
  };
});
```

Die Aufräumfunktion wird ausgeführt, bevor die Komponente aus der Benutzeroberfläche entfernt wird, um Speicherprobleme zu vermeiden. Wenn eine Komponente mehrfach gerendert wird (was in der Regel der Fall ist), wird außerdem der **vorherige Effekt bereinigt, bevor der nächste Effekt ausgeführt wird**. In unserem Beispiel bedeutet dies, dass bei jeder Aktualisierung ein neues Abonnement erstellt wird. Um zu vermeiden, dass bei jeder Aktualisierung ein Effekt ausgelöst wird, schau Dir den nächsten Abschnitt an.

#### Zeitlicher Ablauf der Effekte {#timing-of-effects}

Im Gegensatz zu `componentDidMount` und `componentDidUpdate` wird die Funktion, die an `useEffect` übergeben wird, **nach** dem Layouten und Malen (engl. paint), während eines verzögerten Ereignisses, ausgelöst. Deshalb ist `useEffect` geeignet für die vielen häufigen Nebeneffekte, wie die Einrichtung von Abonnements und Event Handlern, weil die meisten dieser Arbeiten den Browser nicht dabei blockieren sollten, den Bildschirm zu aktualisieren.

Allerdings können nicht alle Auswirkungen aufgeschoben werden. So muss beispielsweise eine DOM-Mutation, die für den Benutzer sichtbar ist, synchron vor dem nächsten Malvorgang erfolgen, damit der Benutzer keine visuelle Inkonsistenz wahrnimmt. (Die Unterscheidung ist konzeptionell ähnlich wie die zwischen passiven und aktiven Event Listenern).  Für diese Arten von Effekten bietet React einen zusätzlichen Hook namens [`useLayoutEffect`](#uselayouteffect). Er hat die gleiche Signatur wie `useEffect` und unterscheidet sich nur darin, wann er ausgelöst wird.

Zusätzlich wird ab React 18 die Funktion, die an `useEffect` übergeben wird, synchron **vor** dem Layouten und dem Malen ausgelöst, wenn sie das Ergebnis einer diskreten Benutzereingabe wie einem Klick ist, oder wenn sie das Ergebnis einer Aktualisierung ist, die in [`flushSync`](/docs/react-dom.html#flushsync) verpackt ist. Dieses Verhalten ermöglicht es, dass das Ergebnis des Effekts vom Ereignissystem oder vom Aufrufer von [`flushSync`](/docs/react-dom.html#flushsync) beobachtet werden kann.

> Hinweis
> 
> Dies wirkt sich nur auf den Zeitpunkt aus, zu dem die an `useEffect` übergebene Funktion aufgerufen wird - Aktualisierungen, die innerhalb dieser Effekte geplant sind, werden weiterhin aufgeschoben. Darin liegt der Unterschied zu [`useLayoutEffect`](#uselayouteffect), wo die Funktion ausgelöst und die Aktualisierungen innerhalb der Funktion sofort verarbeitet werden.

Sogar in Fällen, in denen `useEffect` aufgeschoben wird, bis der Browser gezeichnet hat, ist garantiert, dass es vor jedem neuen Rendering ausgelöst wird. React wird immer die Effekte eines vorherigen Renderings löschen, bevor eine neue Aktualisierung gestartet wird.

#### Bedingte Auslösung eines Effekts {#conditionally-firing-an-effect}

Standardmäßig wird der Effekt nach jedem abgeschlossenen Rendering ausgelöst. Auf diese Weise wird ein Effekt immer neu erstellt, wenn sich eine seiner Abhängigkeiten ändert.

In manchen Fällen kann dies jedoch zu viel sein, wie im Beispiel des Abonnements aus dem vorherigen Abschnitt. Wir müssen nicht bei jeder Aktualisierung ein neues Abonnement erstellen, sondern nur dann, wenn sich die `source` prop geändert hat.

Um dies zu implementieren, kannst du ein zweites Argument an `useEffect` übergeben, welches das Array derjenigen Werte ist, von denen der Effekt abhängt. Unser aktualisiertes Beispiel sieht nun wie folgt aus:

```js
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

Jetzt wird das Abonnement nur neu erstellt, wenn sich `props.source` ändert.

>Hinweis
>
> Wenn du diese Optimierung verwendest, musst du sicherstellen, dass das Array **alle Werte aus dem Geltungsbereich der Komponente (z. B. Props und State) enthält, die sich im Laufe der Zeit ändern und die vom Effekt verwendet werden**. Andernfalls verweist der Code auf veraltete Werte aus früheren Renderings. Lerne mehr darüber, [wie man mit Funktionen umgeht](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) und was zu tun ist, wenn sich [die Werte des Arrays zu oft ändern](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often).
>
> Wenn du einen Effekt nur einmal ausführen und aufräumen willst (beim Erstellen und Löschen), kannst du ein leeres Array (`[]`) als zweites Argument übergeben. Dies teilt React mit, dass der Effekt nicht von *irgendwelchen* Werten von Props oder State abhängt, so dass er nie wieder ausgeführt werden muss. Dies wird nicht als Sonderfall behandelt - es ergibt sich direkt daraus, wie das Abhängigkeits-Array immer funktioniert.
>
> Wenn man ein leeres Array (`[]`) übergibt, haben die Props und der State innerhalb des Effekts immer ihre initialen Werte. Während die Übergabe von `[]` als zweites Argument dem bekannten mentalen Modell von `componentDidMount` und `componentWillUnmount` näher kommt, gibt es normalerweise [bessere](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [Lösungen](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often), um eine zu häufige Wiederholung der Effekte zu vermeiden. Man sollte auch nicht vergessen, dass React die Ausführung von `useEffect` aufschiebt, bis der Browser gezeichnet hat, so dass zusätzlicher Aufwand weniger ein Problem darstellt.
>
>
> Wir empfehlen, die [`exhaustive-deps`](https://github.com/facebook/react/issues/14920)-Regel als Teil unseres [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation)-Packages zu benutzen. Es warnt, wenn Abhängigkeiten falsch angegeben sind, und schlägt eine Korrektur vor.

Das Array der Abhängigkeiten wird nicht als Argument an die Effektfunktion übergeben. Konzeptionell ist es jedoch genau das: Jeder Wert, auf den innerhalb der Effektfunktion verwiesen wird, sollte auch im Array der Abhängigkeiten erscheinen. In Zukunft könnte ein ausreichend fortgeschrittener Compiler dieses Array automatisch erstellen.

### `useContext` {#usecontext}

```js
const value = useContext(MyContext);
```

Akzeptiert ein Kontextobjekt (den von `React.createContext` zurückgegebenen Wert) und gibt den aktuellen Kontextwert für diesen Kontext zurück. Der aktuelle Kontextwert wird durch die `value`-prop des nächstgelegenen `<MyContext.Provider>` oberhalb der aufrufenden Komponente im Baum bestimmt.

Sobald sich der nächstgelegene `<MyContext.Provider>` oberhalb der Komponente aktualisiert, löst dieser Hook ein erneutes Rendering mit dem neuesten Kontext-`value` aus, der an den `MyContext`-Provider übergeben worden ist. Auch, wenn ein Vorfahre [`React.memo`](/docs/react-api.html#reactmemo) benutzt oder [`shouldComponentUpdate`](/docs/react-component.html#shouldcomponentupdate), wird ein erneutes Rendering immer noch von der Komponente selbst ausgehend unter Verwendung von `useContext` erfolgen.

Das Argument für `useContext` muss dabei das *Kontextobjekt selbst* sein:

 * **Korrekt:** `useContext(MyContext)`
 * **Inkorrekt:** `useContext(MyContext.Consumer)`
 * **Inkorrekt:** `useContext(MyContext.Provider)`

Eine Komponente, die `useContext` aufruft, wird immer neu gerendert, wenn sich der Kontextwert ändert. Wenn ein erneutes Rendering aufwendig is, kann man es [mithilfe von Memoisierung optimieren](https://github.com/facebook/react/issues/15156#issuecomment-474590693).

>Tipp
>
>Wenn du mit der Kontext-API vor Hooks vertraut bist, ist `useContext(MyContext)` gleichbedeutend mit `static contextType = MyContext` in einer Klasse, oder mit `<MyContext.Consumer>`.
>
> Mit `useContext(MyContext)` kann man den Kontext nur *lesen* und auf dessen Änderungen hören. Man benötigt immer noch einen `<MyContext.Provider>` weiter oben im Baum, um den Wert für diesen Kontext *bereitzustellen*.

**Zusammenstellung mit Context.Provider**
```js{31-36}
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      Ich bin gestylt mithilfe des theme-Kontextes!
    </button>
  );
}
```
Dieses Beispiel wurde für Hooks von einem früheren Beispiel im [fortgeschrittenen Guide zum Kontext](/docs/context.html) abgeändert, wo sich weitere Informationen darüber finden, wann und wie man Context verwenden kann.


## Additional Hooks {#additional-hooks}

The following Hooks are either variants of the basic ones from the previous section, or only needed for specific edge cases. Don't stress about learning them up front.

### `useReducer` {#usereducer}

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

An alternative to [`useState`](#usestate). Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch` method. (If you're familiar with Redux, you already know how this works.)

`useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. `useReducer` also lets you optimize performance for components that trigger deep updates because [you can pass `dispatch` down instead of callbacks](/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).

Here's the counter example from the [`useState`](#usestate) section, rewritten to use a reducer:

```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

>Note
>
>React guarantees that `dispatch` function identity is stable and won't change on re-renders. This is why it's safe to omit from the `useEffect` or `useCallback` dependency list.

#### Specifying the initial state {#specifying-the-initial-state}

There are two different ways to initialize `useReducer` state. You may choose either one depending on the use case. The simplest way is to pass the initial state as a second argument:

```js{3}
  const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
  );
```

>Note
>
>React doesn’t use the `state = initialState` argument convention popularized by Redux. The initial value sometimes needs to depend on props and so is specified from the Hook call instead. If you feel strongly about this, you can call `useReducer(reducer, undefined, reducer)` to emulate the Redux behavior, but it's not encouraged.

#### Lazy initialization {#lazy-initialization}

You can also create the initial state lazily. To do this, you can pass an `init` function as the third argument. The initial state will be set to `init(initialArg)`.

It lets you extract the logic for calculating the initial state outside the reducer. This is also handy for resetting the state later in response to an action:

```js{1-3,11-12,19,24}
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

#### Bailing out of a dispatch {#bailing-out-of-a-dispatch}

If you return the same value from a Reducer Hook as the current state, React will bail out without rendering the children or firing effects. (React uses the [`Object.is` comparison algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description).)

Note that React may still need to render that specific component again before bailing out. That shouldn't be a concern because React won't unnecessarily go "deeper" into the tree. If you're doing expensive calculations while rendering, you can optimize them with `useMemo`.

### `useCallback` {#usecallback}

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

Returns a [memoized](https://en.wikipedia.org/wiki/Memoization) callback.

Pass an inline callback and an array of dependencies. `useCallback` will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. `shouldComponentUpdate`).

`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

> Note
>
> The array of dependencies is not passed as arguments to the callback. Conceptually, though, that's what they represent: every value referenced inside the callback should also appear in the dependencies array. In the future, a sufficiently advanced compiler could create this array automatically.
>
> We recommend using the [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) rule as part of our [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) package. It warns when dependencies are specified incorrectly and suggests a fix.

### `useMemo` {#usememo}

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Returns a [memoized](https://en.wikipedia.org/wiki/Memoization) value.

Pass a "create" function and an array of dependencies. `useMemo` will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.

Remember that the function passed to `useMemo` runs during rendering. Don't do anything there that you wouldn't normally do while rendering. For example, side effects belong in `useEffect`, not `useMemo`.

If no array is provided, a new value will be computed on every render.

**You may rely on `useMemo` as a performance optimization, not as a semantic guarantee.** In the future, React may choose to "forget" some previously memoized values and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without `useMemo` — and then add it to optimize performance.

> Note
>
> The array of dependencies is not passed as arguments to the function. Conceptually, though, that's what they represent: every value referenced inside the function should also appear in the dependencies array. In the future, a sufficiently advanced compiler could create this array automatically.
>
> We recommend using the [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) rule as part of our [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) package. It warns when dependencies are specified incorrectly and suggests a fix.

### `useRef` {#useref}

```js
const refContainer = useRef(initialValue);
```

`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.

A common use case is to access a child imperatively:

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

Essentially, `useRef` is like a "box" that can hold a mutable value in its `.current` property.

You might be familiar with refs primarily as a way to [access the DOM](/docs/refs-and-the-dom.html). If you pass a ref object to React with `<div ref={myRef} />`, React will set its `.current` property to the corresponding DOM node whenever that node changes.

However, `useRef()` is useful for more than the `ref` attribute. It's [handy for keeping any mutable value around](/docs/hooks-faq.html#is-there-something-like-instance-variables) similar to how you'd use instance fields in classes.

This works because `useRef()` creates a plain JavaScript object. The only difference between `useRef()` and creating a `{current: ...}` object yourself is that `useRef` will give you the same ref object on every render.

Keep in mind that `useRef` *doesn't* notify you when its content changes. Mutating the `.current` property doesn't cause a re-render. If you want to run some code when React attaches or detaches a ref to a DOM node, you may want to use a [callback ref](/docs/hooks-faq.html#how-can-i-measure-a-dom-node) instead.


### `useImperativeHandle` {#useimperativehandle}

```js
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` customizes the instance value that is exposed to parent components when using `ref`. As always, imperative code using refs should be avoided in most cases. `useImperativeHandle` should be used with [`forwardRef`](/docs/react-api.html#reactforwardref):

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

In this example, a parent component that renders `<FancyInput ref={inputRef} />` would be able to call `inputRef.current.focus()`.

### `useLayoutEffect` {#uselayouteffect}

The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside `useLayoutEffect` will be flushed synchronously, before the browser has a chance to paint.

Prefer the standard `useEffect` when possible to avoid blocking visual updates.

> Tip
>
> If you're migrating code from a class component, note `useLayoutEffect` fires in the same phase as `componentDidMount` and `componentDidUpdate`. However, **we recommend starting with `useEffect` first** and only trying `useLayoutEffect` if that causes a problem.
>
>If you use server rendering, keep in mind that *neither* `useLayoutEffect` nor `useEffect` can run until the JavaScript is downloaded. This is why React warns when a server-rendered component contains `useLayoutEffect`. To fix this, either move that logic to `useEffect` (if it isn't necessary for the first render), or delay showing that component until after the client renders (if the HTML looks broken until `useLayoutEffect` runs).
>
>To exclude a component that needs layout effects from the server-rendered HTML, render it conditionally with `showChild && <Child />` and defer showing it with `useEffect(() => { setShowChild(true); }, [])`. This way, the UI doesn't appear broken before hydration.

### `useDebugValue` {#usedebugvalue}

```js
useDebugValue(value)
```

`useDebugValue` can be used to display a label for custom hooks in React DevTools.

For example, consider the `useFriendStatus` custom Hook described in ["Building Your Own Hooks"](/docs/hooks-custom.html):

```js{6-8}
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // Show a label in DevTools next to this Hook
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

> Tip
>
> We don't recommend adding debug values to every custom Hook. It's most valuable for custom Hooks that are part of shared libraries.

#### Defer formatting debug values {#defer-formatting-debug-values}

In some cases formatting a value for display might be an expensive operation. It's also unnecessary unless a Hook is actually inspected.

For this reason `useDebugValue` accepts a formatting function as an optional second parameter. This function is only called if the Hooks are inspected. It receives the debug value as a parameter and should return a formatted display value.

For example a custom Hook that returned a `Date` value could avoid calling the `toDateString` function unnecessarily by passing the following formatter:

```js
useDebugValue(date, date => date.toDateString());
```

### `useDeferredValue` {#usedeferredvalue}

```js
const deferredValue = useDeferredValue(value);
```

`useDeferredValue` accepts a value and returns a new copy of the value that will defer to more urgent updates. If the current render is the result of an urgent update, like user input, React will return the previous value and then render the new value after the urgent render has completed.

This hook is similar to user-space hooks which use debouncing or throttling to defer updates. The benefits to using `useDeferredValue` is that React will work on the update as soon as other work finishes (instead of waiting for an arbitrary amount of time), and like [`startTransition`](/docs/react-api.html#starttransition), deferred values can suspend without triggering an unexpected fallback for existing content.

#### Memoizing deferred children {#memoizing-deferred-children}
`useDeferredValue` only defers the value that you pass to it. If you want to prevent a child component from re-rendering during an urgent update, you must also memoize that component with [`React.memo`](/docs/react-api.html#reactmemo) or [`React.useMemo`](/docs/hooks-reference.html#usememo):

```js
function Typeahead() {
  const query = useSearchQuery('');
  const deferredQuery = useDeferredValue(query);

  // Memoizing tells React to only re-render when deferredQuery changes,
  // not when query changes.
  const suggestions = useMemo(() =>
    <SearchSuggestions query={deferredQuery} />,
    [deferredQuery]
  );

  return (
    <>
      <SearchInput query={query} />
      <Suspense fallback="Loading results...">
        {suggestions}
      </Suspense>
    </>
  );
}
```

Memoizing the children tells React that it only needs to re-render them when `deferredQuery` changes and not when `query` changes. This caveat is not unique to `useDeferredValue`, and it's the same pattern you would use with similar hooks that use debouncing or throttling.

### `useTransition` {#usetransition}

```js
const [isPending, startTransition] = useTransition();
```

Returns a stateful value for the pending state of the transition, and a function to start it.

`startTransition` lets you mark updates in the provided callback as transitions:

```js
startTransition(() => {
  setCount(count + 1);
})
```

`isPending` indicates when a transition is active to show a pending state:

```js
function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    })
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
```

> Note:
>
> Updates in a transition yield to more urgent updates such as clicks.
>
> Updates in a transitions will not show a fallback for re-suspended content. This allows the user to continue interacting with the current content while rendering the update.

### `useId` {#useid}

```js
const id = useId();
```

`useId` is a hook for generating unique IDs that are stable across the server and client, while avoiding hydration mismatches.

> Note
>
> `useId` is **not** for generating [keys in a list](/docs/lists-and-keys.html#keys). Keys should be generated from your data.

For a basic example, pass the `id` directly to the elements that need it:

```js
function Checkbox() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input id={id} type="checkbox" name="react"/>
    </>
  );
};
```

For multiple IDs in the same component, append a suffix using the same `id`:

```js
function NameFields() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id + '-firstName'}>First Name</label>
      <div>
        <input id={id + '-firstName'} type="text" />
      </div>
      <label htmlFor={id + '-lastName'}>Last Name</label>
      <div>
        <input id={id + '-lastName'} type="text" />
      </div>
    </div>
  );
}
```

> Note:
> 
> `useId` generates a string that includes the `:` token. This helps ensure that the token is unique, but is not supported in CSS selectors or APIs like `querySelectorAll`.
> 
> `useId` supports an `identifierPrefix` to prevent collisions in multi-root apps. To configure, see the options for [`hydrateRoot`](/docs/react-dom-client.html#hydrateroot) and [`ReactDOMServer`](/docs/react-dom-server.html).

## Library Hooks {#library-hooks}

The following Hooks are provided for library authors to integrate libraries deeply into the React model, and are not typically used in application code.

### `useSyncExternalStore` {#usesyncexternalstore}

```js
const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);
```

`useSyncExternalStore` is a hook recommended for reading and subscribing from external data sources in a way that's compatible with concurrent rendering features like selective hydration and time slicing.

This method returns the value of the store and accepts three arguments:
- `subscribe`: function to register a callback that is called whenever the store changes.
- `getSnapshot`: function that returns the current value of the store.
- `getServerSnapshot`: function that returns the snapshot used during server rendering.

The most basic example simply subscribes to the entire store:

```js
const state = useSyncExternalStore(store.subscribe, store.getSnapshot);
```

However, you can also subscribe to a specific field:

```js
const selectedField = useSyncExternalStore(
  store.subscribe,
  () => store.getSnapshot().selectedField,
);
```

When server rendering, you must serialize the store value used on the server, and provide it to `useSyncExternalStore`. React will use this snapshot during hydration to prevent server mismatches:

```js
const selectedField = useSyncExternalStore(
  store.subscribe,
  () => store.getSnapshot().selectedField,
  () => INITIAL_SERVER_SNAPSHOT.selectedField,
);
```

> Note:
>
> `getSnapshot` must return a cached value. If getSnapshot is called multiple times in a row, it must return the same exact value unless there was a store update in between.
> 
> A shim is provided for supporting multiple React versions published as `use-sync-external-store/shim`. This shim will prefer `useSyncExternalStore` when available, and fallback to a user-space implementation when it's not.
> 
> As a convenience, we also provide a version of the API with automatic support for memoizing the result of getSnapshot published as `use-sync-external-store/with-selector`.

### `useInsertionEffect` {#useinsertioneffect}

```js
useInsertionEffect(didUpdate);
```

The signature is identical to `useEffect`, but it fires synchronously _before_ all DOM mutations. Use this to inject styles into the DOM before reading layout in [`useLayoutEffect`](#uselayouteffect). Since this hook is limited in scope, this hook does not have access to refs and cannot schedule updates.

> Note:
>
> `useInsertionEffect` should be limited to css-in-js library authors. Prefer [`useEffect`](#useeffect) or [`useLayoutEffect`](#uselayouteffect) instead.
