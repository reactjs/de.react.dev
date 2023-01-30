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

> Try the new React documentation for [`useState`](https://beta.reactjs.org/reference/react/useState).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```js
const [state, setState] = useState(initialState);
```
Gibt einen zustandsbezogenen (engl. stateful) Wert zurück und eine Funktion, um diesen zu aktualisieren.

Während des initialen Renderns ist der zurückgegebene State (`state`) derselbe Wert, der als erstes Argument (`initialState`) übergeben wird.

Die Funktion `setState` wird verwendet, um den State zu aktualisieren. Sie akzeptiert einen neuen Wert für den State und veranlasst ein erneutes Rendern der Komponente.

```js
setState(newState);
```

Bei nachfolgenden Re-Renderings ist der erste Wert, der von `useState` zurückgegeben wird, immer der letzte State nach der Anwendung von Updates.

> Hinweis
>
>React garantiert, dass die Identität der `setState`-Funktion stabil ist und sie sich auch bei erneutem Rendern nicht ändert. Deshalb kann die Funktion problemlos aus der Liste der Abhängigkeiten des `useEffect` oder `useCallback` ausgelassen werden.

#### Aktualisieren mithilfe einer Funktion {#functional-updates}

Wenn der neue State mit Hilfe des vorherigen States ermittelt werden soll, kannst du eine Funktion an `setState` übergeben. Diese Funktion nimmt den vorherigen Wert entgegen und gibt den aktualisierten Wert zurück. Das folgende Beispiel einer Counter-Komponente nutzt beide Formen von `setState`:

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

Wenn die Aktualisierungsfunktion exakt denselben Wert wie der aktuelle State zurückgibt, wird das darauf folgende erneute Rendern vollständig übersprungen.

> Hinweis
>
> Anders als die `setState`-Methode in Klassenkomponenten führt `useState` aktualisierte Objekte nicht automatisch zusammen. Du kannst dieses Verhalten nachahmen, indem du die spread-Syntax für Objekte mit einer Aktualisierungsfunktion verbindest:
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

#### Lazy initialer State {#lazy-initial-state}

Das `initialState`-Argument ist der State, der während des initialen Renderns benutzt wird. Bei nachfolgendem Rendern wird er nicht beachtet. Wenn der initiale State das Ergebnis einer aufwendigen Berechnung ist, kannst Du stattdessen auch eine Funktion angeben, die nur beim ersten Rendern ausgeführt wird:

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

#### Abbruch der State-Aktualisierung {#bailing-out-of-a-state-update}

Wenn du eine State-Hook auf den gleichen Wert wie den aktuellen aktualisierst, wird React den Vorgang abbrechen, ohne die Kindelemente zu rendern oder Effekte auszulösen. (React benutzt den [`Object.is`-Vergleichsalgorithmus](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description).)

Beachte, dass React diese spezielle Komponente möglicherweise noch einmal rendern muss, bevor es den Vorgang abbricht. Das sollte kein Problem sein, da React nicht unnötig "tiefer" in den Baum eindringt. Wenn du während des Renderns umfangreiche Berechnungen durchführst, kannst du diese mit `useMemo` optimieren.

#### Bündeln von State-Aktualisierungen {#batching-of-state-updates}

React kann mehrere State-Aktualisierungen in einem einzigen erneuten Rendern zusammenfassen, um die Performance zu verbessern. Normalerweise verbessert dies die Performance und sollte keine Auswirkungen auf das Verhalten der Anwendung haben.

Vor React 18 wurden nur Aktualisierungen innerhalb von React-Event-Handlern gebündelt. Seit React 18 [ist die gebündelte Verarbeitung für alle Aktualisierungen standardmäßig aktiviert](/blog/2022/03/08/react-18-upgrade-guide.html#automatic-batching). Beachte, dass React sicherstellt, dass Aktualisierungen von mehreren *verschiedenen* benutzerinitiierten Ereignissen - z.B. zweimaliges Klicken auf eine Schaltfläche - immer separat verarbeitet und nicht zusammengeführt werden. Dies verhindert logische Fehler.

In dem seltenen Fall, dass du die synchrone Anwendung der DOM-Aktualisierung erzwingen musst, kannst du sie in [`flushSync`](/docs/react-dom.html#flushsync) verpacken. Dies kann jedoch die Performance beeinträchtigen, weshalb du dies nur bei Bedarf tun solltest.

### `useEffect` {#useeffect}

> Try the new React documentation for [`useEffect`](https://beta.reactjs.org/reference/react/useEffect).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```js
useEffect(didUpdate);
```
Akzeptiert eine Funktion, die imperativen Code enthält, der möglicherweise auch einen Effekt hat.

Innerhalb des Hauptteils von funktionalen Komponenten (in React als _render phase_ bezeichnet) sind Mutationen, Subscriptions, Timer, das Loggen und andere Nebeneffekte (engl. side effects) nicht erlaubt. Dies hätte nämlich verwirrende Fehler und Ungereimtheiten in der UI zur Folge.

Benutze stattdessen `useEffect`. Die Funktion, die an `useEffect` übergeben wird, wird ausgeführt, nachdem das Rendern an den Bildschirm übertragen worden ist. Effekte sind also die Möglichkeit, aus der rein funktionalen Welt von React in die imperative Welt zu entfliehen.

Standardmäßig werden die Effekte nach jedem abgeschlossenen Rendern ausgeführt, aber du kannst festlegen, dass sie nur ausgelöst werden, [wenn sich bestimmte Werte geändert haben](#conditionally-firing-an-effect).

#### Bereinigung eines Effekts {#cleaning-up-an-effect}

Effekte erzeugen häufig Ressourcen, die bereinigt werden müssen, bevor die Komponente den Bildschirm verlässt, wie etwa ein Abonnement oder eine Timer-ID. Zu diesem Zweck kann die an `useEffect` übergebene Funktion eine Aufräumfunktion zurückgeben. Zum Beispiel, um eine Subscription zu erstellen:


```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Bereinigen des Abonnements
    subscription.unsubscribe();
  };
});
```

Die Aufräumfunktion wird ausgeführt, bevor die Komponente aus der Benutzeroberfläche entfernt wird, um Speicherprobleme zu vermeiden. Wenn eine Komponente mehrfach gerendert wird (was in der Regel der Fall ist), wird außerdem der **vorherige Effekt bereinigt, bevor der nächste Effekt ausgeführt wird**. In unserem Beispiel bedeutet dies, dass bei jeder Aktualisierung eine neue Subscription erstellt wird. Um zu vermeiden, dass bei jeder Aktualisierung ein Effekt ausgelöst wird, schau Dir den nächsten Abschnitt an.

#### Zeitlicher Ablauf der Effekte {#timing-of-effects}

Im Gegensatz zu `componentDidMount` und `componentDidUpdate` wird die Funktion, die an `useEffect` übergeben wird, **nach** dem Layouten und Malen (engl. paint), während eines verzögerten Ereignisses, ausgelöst. Deshalb ist `useEffect` geeignet für die vielen häufigen Nebeneffekte, wie die Einrichtung von Subscriptions und Event Handlern, weil die meisten dieser Arbeiten den Browser nicht dabei blockieren sollten, den Bildschirm zu aktualisieren.

Allerdings können nicht alle Auswirkungen aufgeschoben (engl. deferred) werden. So muss beispielsweise eine DOM-Mutation, die für den Benutzer sichtbar ist, synchron vor dem nächsten Malvorgang erfolgen, damit der Benutzer keine visuelle Inkonsistenz wahrnimmt. (Die Unterscheidung ist konzeptionell ähnlich wie die zwischen passiven und aktiven Event Listenern). Für diese Arten von Effekten bietet React einen zusätzlichen Hook namens [`useLayoutEffect`](#uselayouteffect). Dieser hat die gleiche Signatur wie `useEffect` und unterscheidet sich nur darin, wann er ausgelöst wird.

Zusätzlich wird ab React 18 die Funktion, die an `useEffect` übergeben wird, synchron **vor** dem Layouten und dem Malen ausgelöst, wenn sie das Ergebnis einer diskreten Benutzereingabe wie einem Klick ist, oder wenn sie das Ergebnis einer Aktualisierung ist, die in [`flushSync`](/docs/react-dom.html#flushsync) verpackt ist. Dieses Verhalten ermöglicht es, dass das Ergebnis des Effekts vom Ereignissystem oder vom Aufrufer von [`flushSync`](/docs/react-dom.html#flushsync) beobachtet werden kann.

> Hinweis
> 
> Dies wirkt sich nur auf den Zeitpunkt aus, zu dem die an `useEffect` übergebene Funktion aufgerufen wird - Aktualisierungen, die innerhalb dieser Effekte geplant sind, werden weiterhin aufgeschoben. Darin liegt der Unterschied zu [`useLayoutEffect`](#uselayouteffect), wo die Funktion ausgelöst und die Aktualisierungen innerhalb der Funktion sofort verarbeitet werden.

Sogar in Fällen, in denen `useEffect` aufgeschoben wird, bis der Browser gezeichnet hat, ist garantiert, dass es vor jedem neuen Rendering ausgelöst wird. React wird immer die Effekte eines vorherigen Renderings löschen, bevor eine neue Aktualisierung gestartet wird.

#### Bedingte Auslösung eines Effekts {#conditionally-firing-an-effect}

Standardmäßig wird der Effekt nach jedem abgeschlossenen Rendering ausgelöst. Auf diese Weise wird ein Effekt immer neu erstellt, wenn sich eine seiner Abhängigkeiten ändert.

In manchen Fällen kann dies jedoch zu viel sein, wie im Beispiel der Subscription aus dem vorherigen Abschnitt. Wir müssen nicht bei jeder Aktualisierung eine neue Subscription erstellen, sondern nur dann, wenn sich die `source` Prop geändert hat.

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

Jetzt wird die Subscription nur neu erstellt, wenn sich `props.source` ändert.

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

> Try the new React documentation for [`useContext`](https://beta.reactjs.org/reference/react/useContext).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


```js
const value = useContext(MyContext);
```

Akzeptiert ein Kontextobjekt (den von `React.createContext` zurückgegebenen Wert) und gibt den aktuellen Kontextwert für diesen Kontext zurück. Der aktuelle Kontextwert wird durch die `value`-Prop des nächstgelegenen `<MyContext.Provider>` oberhalb der aufrufenden Komponente im Baum bestimmt.

Sobald sich der nächstgelegene `<MyContext.Provider>` oberhalb der Komponente aktualisiert, löst dieser Hook ein erneutes Rendering mit dem neuesten Kontext-`value` aus, der an den `MyContext`-Provider übergeben worden ist. Auch, wenn ein Vorfahre [`React.memo`](/docs/react-api.html#reactmemo) benutzt oder [`shouldComponentUpdate`](/docs/react-component.html#shouldcomponentupdate), wird ein erneutes Rendering immer noch von der Komponente selbst ausgehend unter Verwendung von `useContext` erfolgen.

Das Argument für `useContext` muss dabei das *Kontextobjekt selbst* sein:

 * **Korrekt:** `useContext(MyContext)`
 * **Inkorrekt:** `useContext(MyContext.Consumer)`
 * **Inkorrekt:** `useContext(MyContext.Provider)`

Eine Komponente, die `useContext` aufruft, wird immer neu gerendert, wenn sich der Kontextwert ändert. Wenn ein erneutes Rendering aufwendig ist, kann man es [mit Hilfe von Memoisierung optimieren](https://github.com/facebook/react/issues/15156#issuecomment-474590693).

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
      Ich bin gestylt mit Hilfe des theme-Kontextes!
    </button>
  );
}
```
Dieses Beispiel wurde für Hooks von einem früheren Beispiel im [fortgeschrittenen Guide zum Kontext](/docs/context.html) abgeändert, wo sich weitere Informationen darüber finden, wann und wie man Context verwenden kann.


## Zusätzliche Hooks {#additional-hooks}

Die folgenden Hooks sind entweder Varianten der grundlegenden Hooks aus dem vorigen Abschnitt oder werden nur für bestimmte Sonderfälle benötigt. Es besteht also kein Grund, sie im Voraus zu lernen.

### `useReducer` {#usereducer}

> Try the new React documentation for [`useReducer`](https://beta.reactjs.org/reference/react/useReducer).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

Eine Alternative zu [`useState`](#usestate). Akzeptiert einen Reducer vom Typ `(state, action) => newState`, und gibt den aktuellen State zusammen mit einer `dispatch`-Methode zurück. (Wenn du mit Redux vertraut bist, weißt du bereits, wie das funktioniert.)

`useReducer` ist in der Regel besser als `useState`, wenn man eine komplexe Statelogik hat, die mehrere Teilwerte umfasst, oder wenn der nächste State vom vorherigen abhängt.  Mit `useReducer` lässt sich auch die Leistung für Komponenten optimieren, die tiefe Aktualisierungen auslösen, weil [man `dispatch` anstelle von Callbacks weitergeben kann](/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).

Hier ist das Beispiel eines Counters aus dem Abschnitt [`useState`](#usestate), umgeschrieben mithilfe eines Reducers:

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
      Aktueller Wert: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

>Hinweis
>
>React garantiert, dass die Identität der Funktion `dispatch` stabil ist und sich bei erneuten Renderings nicht ändert.  Deshalb kann die Funktion problemlos aus der Liste der Abhängigkeiten von `useEffect` oder `useCallback` ausgelassen werden.

#### Festlegen des initialen States {#specifying-the-initial-state}

Es gibt zwei verschiedene Möglichkeiten, den State von `useReducer` zu initialisieren. Je nach Anwendungsfall kann man eine der beiden Möglichkeiten wählen. Der einfachste Weg ist die Übergabe des Ausgangszustands als zweites Argument:

```js{3}
  const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
  );
```

>Hinweis
>
>React verwendet nicht die Konvention `state = initialState`, die durch Redux populär wurde. Der Anfangswert muss manchmal von den Props abhängen und wird daher stattdessen beim Hook-Aufruf angegeben. Wenn dir das wichtig ist, kannst du `useReducer(reducer, undefined, reducer)` aufrufen, um das Redux-Verhalten nachzuahmen, aber das ist nicht empfehlenswert.

#### Verzögerte Initialisierung {#lazy-initialization}

Man kann den initialen Wert auch verzögert erstellen. Dafür muss man eine `init`-Funktion als drittes Argument übergeben. Der initiale State wird dann auf `init(initialArg)` gesetzt.

Hierdurch wird die Logik, um den initialen State zu kalkulieren, aus dem Reducer ausgelagert. Das ist auch dann nützlich, wenn der State später in Reaktion auf eine Handlung zurückgesetzt werden soll:

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
      Aktueller Wert: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Zurücksetzen
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

#### Abbruch des Dispatch {#bailing-out-of-a-dispatch}

Wenn du vom Reducer-Hook denselben Wert zurückgibst wie der aktuelle State, wird React den Vorgang abbrechen, ohne die Kind-Elemente zu rendern oder Effekte auszulösen. (React benutzt den [`Object.is` Vergleichsalgorithmus](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description).)

Beachte, dass React diese spezielle Komponente möglicherweise noch einmal rendern muss, bevor es den Vorgang abbricht. Das sollte kein Problem sein, da React nicht unnötig "tiefer" in den Baum eindringt. Wenn du während des Renderns umfangreiche Berechnungen durchführst, kannst du diese mit `useMemo` optimieren.

### `useCallback` {#usecallback}

> Try the new React documentation for [`useCallback`](https://beta.reactjs.org/reference/react/useCallback).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

Gibt einen [memoisierten](https://en.wikipedia.org/wiki/Memoization) Callback zurück.

Übergib ein Inline-Callback und ein Array von Abhängigkeiten. `useCallback` wird eine memoisierte Version des Callbacks zurückgeben, die sich nur dann ändert, wenn sich eine der Abhängigkeiten geändert hat. Das ist nützlich, um Callbacks an optimierte Kindkomponenten zu übergeben, die sich auf gleichbleibende Referenzen verlassen, um unnötigem Rendern vorzubeugen (e.g. `shouldComponentUpdate`).

`useCallback(fn, deps)` ist gleichbedeutend mit `useMemo(() => fn, deps)`.

> Hinweis
>
> Das Array der Abhängigkeiten wird nicht als Argument an den Callback übergeben. Konzeptionell ist es jedoch genau das: Jeder Wert, auf den innerhalb des Callbacks verwiesen wird, sollte auch im Array der Abhängigkeiten erscheinen. In Zukunft könnte ein ausreichend fortgeschrittener Compiler dieses Array automatisch erstellen.
>
> Wir empfehlen, die [`exhaustive-deps`](https://github.com/facebook/react/issues/14920)-Regel als Teil unseres [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation)-Packages zu benutzen. Es warnt, wenn Abhängigkeiten falsch angegeben sind, und schlägt eine Korrektur vor.

### `useMemo` {#usememo}

> Try the new React documentation for [`useMemo`](https://beta.reactjs.org/reference/react/useMemo).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Gibt einen [memoisierten](https://en.wikipedia.org/wiki/Memoization) Wert zurück.

Übergib eine "create"-Funktion und ein Array von Abhängigkeiten. `useMemo` wird den memoisierten Wert nur dann neu berechnen, wenn sich eine der Abhängigkeiten geändert hat. Diese Optimierung hilft dabei, aufwendige Berechnungen bei jedem Rendern zu vermeiden.

Beachte, dass die Funktion, die an `useMemo` übergeben wird, während des Renderns abläuft. Vermeide es, dort irgendetwas zu tun, was du normalerweise während des Renderns tun würdest. Seiteneffekte zum Beispiel gehören in `useEffect`, nicht in `useMemo`.

Wenn kein Array angegeben wird, wird der Wert bei jedem Rendern berechnet.

**Du könntest dich auf `useMemo` als Leistungsoptimierung verlassen, anstatt es als semantische Garantie anzusehen.** In der Zukunft könnte React sich dafür entscheiden, einige zuvor memoisierte Werte zu "vergessen" und sie beim nächsten Rendern neu zu berechnen, z.B. um Speicher für Offscreen-Komponenten freizugeben. Schreibe deinen Code deshalb so, dass er auch ohne `useMemo` funktioniert - und dann füge ihn hinzu, um die Leistung zu optimieren.

> Hinweis
>
> Das Array der Abhängigkeiten wird nicht als Argument an die Funktion übergeben. Konzeptionell ist es jedoch genau das: Jeder Wert, auf den innerhalb der Funktion verwiesen wird, sollte auch im Array der Abhängigkeiten erscheinen. In Zukunft könnte ein ausreichend fortgeschrittener Compiler dieses Array automatisch erstellen.
>
> Wir empfehlen, die [`exhaustive-deps`](https://github.com/facebook/react/issues/14920)-Regel als Teil unseres [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation)-Packages zu benutzen. Es warnt, wenn Abhängigkeiten falsch angegeben sind, und schlägt eine Korrektur vor.

### `useRef` {#useref}

> Try the new React documentation for [`useRef`](https://beta.reactjs.org/reference/react/useRef).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


```js
const refContainer = useRef(initialValue);
```
`useRef` gibt ein veränderbares ref-Objekt zurück, dessen Eigenschaft `.current` mit dem übergebenen Argument (`initialValue`) initialisiert wird. Das zurückgegebene Objekt bleibt während der gesamten Lebensdauer der Komponente bestehen.

Ein häufiger Anwendungsfall ist der imperative Zugriff auf ein Kind:

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` zeigt auf das gemountete Texteingabeelement
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Fokussiere das Inputfeld</button>
    </>
  );
}
```

Im Wesentlichen ist `useRef` wie eine "Box", die einen veränderbaren Wert in ihrer Eigenschaft `.current` enthalten kann.

Du kennst Refs vielleicht in erster Linie als eine Möglichkeit [auf das DOM zuzugreifen](/docs/refs-and-the-dom.html). Wenn du ein Ref-Objekt an React mit `<div ref={myRef} />` übergibst, wird React dessen Eigenschaft `.current` auf den entsprechenden DOM-Knoten setzen, sobald sich dieser ändert.

`useRef()` ist jedoch nicht nur für das `ref`-Attribut nützlich. Es ist [praktisch, um einen veränderlichen Wert zu behalten](/docs/hooks-faq.html#is-there-something-like-instance-variables), ähnlich wie man Instanzfelder in Klassen verwenden würde.

Das funktioniert, weil `useRef()` ein einfaches JavaScript-Objekt erzeugt. Der einzige Unterschied zwischen `useRef()` und der Erstellung eines `{current: ...}`-Objekts ist, dass `useRef` bei jedem Rendering das gleiche ref-Objekt erzeugt.

Beachte, dass `useRef` dich *nicht* benachrichtigt, wenn sich sein Inhalt ändert. Die Änderung der `.current`-Eigenschaft führt nicht zu einem erneuten Rendern. Wenn du einen Code ausführen möchtest, sobald React eine Ref an einen DOM-Knoten anhängt oder abnimmt, solltest du stattdessen einen [callback ref](/docs/hooks-faq.html#how-can-i-measure-a-dom-node) verwenden.


### `useImperativeHandle` {#useimperativehandle}

> Try the new React documentation for [`useImperativeHandle`](https://beta.reactjs.org/reference/react/useImperativeHandle).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


```js
useImperativeHandle(ref, createHandle, [deps])
```
`useImperativeHandle` passt den Instanzwert an, der bei der Verwendung von `ref` für übergeordnete Komponenten sichtbar ist. Wie immer sollte imperativer Code mit Refs in den meisten Fällen vermieden werden. `useImperativeHandle` sollte mit [`forwardRef`](/docs/react-api.html#reactforwardref) verwendet werden:

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

In diesem Beispiel wäre eine übergeordnete Komponente, die `<FancyInput ref={inputRef} />` rendert, in der Lage `inputRef.current.focus()` aufzurufen.

### `useLayoutEffect` {#uselayouteffect}

<<<<<<< HEAD
Die Signatur dieser Hook ist identisch mit `useEffect`, aber er wird synchron nach allen DOM-Mutationen ausgelöst. Verwende ihn, um das Layout aus dem DOM zu lesen und synchron neu zu rendern. Aktualisierungen, die innerhalb von `useLayoutEffect` geplant sind, werden synchron vorgenommen, bevor der Browser die Chance hat zu malen.
=======
> Try the new React documentation for [`useLayoutEffect`](https://beta.reactjs.org/reference/react/useLayoutEffect).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside `useLayoutEffect` will be flushed synchronously, before the browser has a chance to paint.
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

Bevorzuge, wenn möglich, den Standard `useEffect`, um zu vermeiden, dass visuelle Aktualisierungen blockiert werden.

> Tipp
>
> Wenn du Code von einer Klassenkomponente migrierst, beachte, dass `useLayoutEffect` in der gleichen Phase ausgelöst wird wie `componentDidMount` und `componentDidUpdate`. **Wir empfehlen aber, zuerst mit `useEffect` zu beginnen** und `useLayoutEffect` nur dann auszuprobieren, wenn dies ein Problem verursacht.
>
> Wenn du Server-Rendering verwendest, beachte, dass *weder* `useLayoutEffect` noch `useEffect` ausgeführt werden können, bis das JavaScript heruntergeladen ist. Aus diesem Grund warnt React, wenn eine vom Server gerenderte Komponente `useLayoutEffect` enthält. Um dies zu beheben, verschiebe entweder diese Logik zu `useEffect` (wenn sie für das erste Rendern nicht notwendig ist), oder verzögere die Anzeige dieser Komponente bis nach dem Rendern des Clients (wenn das HTML kaputt aussieht, bis `useLayoutEffect` läuft).
>
> Um eine Komponente, die Layout-Effekte benötigt, von dem vom Server gerenderten HTML auszuschließen, rendere sie bedingt mit `showChild && <Child />` und verzögere ihre Anzeige mit `useEffect(() => { setShowChild(true); }, [])`. Auf diese Weise erscheint die Benutzeroberfläche vor der Hydration nicht beschädigt.
>

### `useDebugValue` {#usedebugvalue}

> Try the new React documentation for [`useDebugValue`](https://beta.reactjs.org/reference/react/useDebugValue).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


```js
useDebugValue(value)
```

`useDebugValue` kann verwendet werden, um ein Label für eigene Hooks in den React DevTools anzuzeigen.

Betrachten wir zum Beispiel den benutzerdefinierten Hook `useFriendStatus`, der in ["Eigene Hooks bauen"](/docs/hooks-custom.html) beschrieben wird:

```js{6-8}
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // Zeige ein Label in den DevTools neben diesem Hook an
  // z.B. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

> Tipp
>
> Wir empfehlen nicht, Debug-Werte zu jedem eigenen Hook hinzuzufügen. Dies ist am nützlichsten für eigene Hooks, die Teil von gemeinsam genutzten Libraries sind.

#### Aufschieben der Formatierung von Debug-Werten {#defer-formatting-debug-values}

In einigen Fällen kann die Formatierung eines Wertes für die Anzeige ein aufwendiger Vorgang sein. Sie ist auch unnötig, es sei denn, ein Hook wird tatsächlich inspiziert.

Aus diesem Grund akzeptiert `useDebugValue` eine Formatierungsfunktion als optionalen zweiten Parameter. Diese Funktion wird nur aufgerufen, wenn die Hooks inspiziert werden. Sie erhält den Debug-Wert als Parameter und sollte einen formatierten Anzeigewert zurückgeben.

Ein eigener Hook, der einen `Date`-Wert zurückgegeben hat, könnte beispielsweise den unnötigen Aufruf der `toDateString`-Funktion vermeiden, indem er den folgenden Formatierer übergibt:

```js
useDebugValue(date, date => date.toDateString());
```

### `useDeferredValue` {#usedeferredvalue}

> Try the new React documentation for [`useDeferredValue`](https://beta.reactjs.org/reference/react/useDeferredValue).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


```js
const deferredValue = useDeferredValue(value);
```

`useDeferredValue` akzeptiert einen Wert und gibt eine neue Kopie des Wertes zurück, die auf dringendere Aktualisierungen warten wird. Wenn das aktuelle Rendering das Ergebnis einer dringenden Aktualisierung ist, wie z.B. einer Benutzereingabe, gibt React den vorherigen Wert zurück und rendert dann den neuen Wert, nachdem das dringende Rendering abgeschlossen ist.

Dieser Hook ähnelt den User-Space-Hooks, die durch Entprellung (engl. debouncing) oder Drosselung Aktualisierungen aufschieben. Der Vorteil der Verwendung von `useDeferredValue` ist, dass React an der Aktualisierung arbeitet, sobald andere Arbeiten beendet sind (anstatt auf eine beliebige Zeitspanne zu warten), und wie [`startTransition`](/docs/react-api.html#starttransition) können aufgeschobene Werte ausgesetzt werden, ohne einen unerwarteten Fallback für bestehende Inhalte auszulösen.

#### Memoisierte aufgeschobene Kinder {#memoizing-deferred-children}
`useDeferredValue` verschiebt nur den Wert, den man übergibt. Wenn du verhindern willst, dass eine untergeordnete Komponente während einer dringenden Aktualisierung neu gerendert wird, musst du diese Komponente auch mit [`React.memo`](/docs/react-api.html#reactmemo) oder [`React.useMemo`](/docs/hooks-reference.html#usememo) memoisieren:

```js
function Typeahead() {
  const query = useSearchQuery('');
  const deferredQuery = useDeferredValue(query);

  // Memoisierung weist React an, nur neu zu rendern, wenn sich deferredQuery ändert, 
  // und nicht, wenn sich die Abfrage ändert.
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

Die Kinder zu memoisieren sagt React, dass sie nur neu gerendert werden müssen, wenn sich `deferredQuery` ändert, und nicht, wenn sich `query` ändert. Dieser Vorbehalt gilt nicht nur für `useDeferredValue`, sondern auch für ähnliche Hooks, die Entprellung (engl. debouncing) oder Drosselung verwenden.

### `useTransition` {#usetransition}

> Try the new React documentation for [`useTransition`](https://beta.reactjs.org/reference/react/useTransition).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


```js
const [isPending, startTransition] = useTransition();
```

Gibt einen zustandsbezogenen Wert für den anstehenden State der Transition und eine Funktion zum Starten dieser zurück.

Mit `startTransition` können Aktualisierungen in dem angegebenen Callback als Übergänge markiert werden:

```js
startTransition(() => {
  setCount(count + 1);
});
```

`isPending` markiert, wenn eine Transition aktiv ist, um einen ausstehenden State anzuzeigen:

```js
function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
```

> Hinweis:
>
> Aktualisierungen in einer Transitions-Phase führen zu dringlicheren Aktualisierungen wie etwa Klicks.
>
> Bei Aktualisierungen in Transitionen wird kein Fallback für wieder ausgesetzte Inhalte angezeigt. Dadurch kann der Benutzer weiterhin mit dem aktuellen Inhalt interagieren, während die Aktualisierung gerendert wird.


### `useId` {#useid}

> Try the new React documentation for [`useId`](https://beta.reactjs.org/reference/react/useId).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


```js
const id = useId();
```

`useId` ist ein Hook für die Erzeugung eindeutiger IDs, die auf dem Server und dem Client stabil sind, während sie gleichzeitig Hydrationsabweichungen vermeiden.

> Hinweis
>
> `useId` dient **nicht** zum Erzeugen von [Keys in einer Liste](/docs/lists-and-keys.html#keys). Keys sollten aus den Daten generiert werden.

In diesem einfachen Beispiel wird die `id` direkt an diejenigen Elemente übergeben, die sie benötigen:

```js
function Checkbox() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Magst du React?</label>
      <input id={id} type="checkbox" name="react"/>
    </>
  );
};
```

Bei mehreren IDs in derselben Komponente kann man ein Suffix mit derselben `id` anhängen:

```js
function NameFields() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id + '-firstName'}>Vorname</label>
      <div>
        <input id={id + '-firstName'} type="text" />
      </div>
      <label htmlFor={id + '-lastName'}>Nachname</label>
      <div>
        <input id={id + '-lastName'} type="text" />
      </div>
    </div>
  );
}
```

> Hinweis:
> 
> `useId` erzeugt eine Zeichenfolge, die das Token ":" enthält. Dies hilft sicherzustellen, dass das Token eindeutig ist, wird aber in CSS-Selektoren oder APIs wie `querySelectorAll` nicht unterstützt.
> 
> `useId` unterstützt einen `identifierPrefix`, um Kollisionen in Anwendungen mit mehreren Roots zu verhindern. Zur Konfiguration siehe die Optionen für [`hydrateRoot`](/docs/react-dom-client.html#hydrateroot) und [`ReactDOMServer`](/docs/react-dom-server.html).
> 

## Library Hooks {#library-hooks}

Die folgenden Hooks sind für Autoren von Libraries vorgesehen, um diese tief in das React-Modell zu integrieren, und werden normalerweise nicht im Anwendungscode verwendet.

### `useSyncExternalStore` {#usesyncexternalstore}

> Try the new React documentation for [`useSyncExternalStore`](https://beta.reactjs.org/reference/react/useSyncExternalStore).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


```js
const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);
```

`useSyncExternalStore` ist ein Hook, der für das Lesen und Subscriben von externen Datenquellen empfohlen wird, und zwar in einer Weise, die mit gleichzeitigen Rendering-Funktionen wie selektiver Hydration und Time-Slicing kompatibel ist.

Diese Methode gibt den Wert des Speichers (engl. store) zurück und nimmt drei Argumente entgegen:
- `subscribe`: Funktion, um einen Callback zu registrieren, der immer dann aufgerufen wird, wenn sich der Speicher ändert.
- `getSnapshot`: Funktion, die den aktuellen Wert des Speichers zurückgibt.
- `getServerSnapshot`: Funktion, die den beim Server-Rendering verwendeten Snapshot zurückgibt.

Das einfachste Beispiel ist das Subscriben des gesamten Speichers:

```js
const state = useSyncExternalStore(store.subscribe, store.getSnapshot);
```

Man kann aber auch ein bestimmtes Feld abonnieren:

```js
const selectedField = useSyncExternalStore(
  store.subscribe,
  () => store.getSnapshot().selectedField,
);
```

Beim serverseitigen Rendering muss man den auf dem Server verwendeten Speicherwert serialisieren und an `useSyncExternalStore` übergeben. React verwendet diesen Snapshot während der Hydration, um serverseitige Fehlanpassungen zu vermeiden:

```js
const selectedField = useSyncExternalStore(
  store.subscribe,
  () => store.getSnapshot().selectedField,
  () => INITIAL_SERVER_SNAPSHOT.selectedField,
);
```

> Hinweis:
>
> `getSnapshot` muss einen zwischengespeicherten Wert zurückgeben. Wenn getSnapshot mehrmals hintereinander aufgerufen wird, muss es genau denselben Wert zurückgeben, es sei denn, es wurde zwischendurch eine Speicheraktualisierung vorgenommen.
> 
> Für die Unterstützung mehrerer React-Versionen wird ein Verbindungsstück (engl. shim) zur Verfügung gestellt, der als `use-sync-external-store/shim` veröffentlicht wird. Dieses Verbindungsstück wird `useSyncExternalStore` bevorzugen, wenn es verfügbar ist, und auf eine User-Space-Implementierung zurückgreifen, wenn es nicht verfügbar ist.
> 
> Zur Vereinfachung bieten wir auch eine Version der API mit automatischer Unterstützung für die Memoisierung des Ergebnisses von getSnapshot, das als `use-sync-external-store/with-selector` veröffentlicht wird.

### `useInsertionEffect` {#useinsertioneffect}

> Try the new React documentation for [`useInsertionEffect`](https://beta.reactjs.org/reference/react/useInsertionEffect).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```js
useInsertionEffect(didUpdate);
```

Die Signatur dieses Hooks ist identisch mit `useEffect`, aber er feuert synchron _vor_ allen DOM-Mutationen. Verwende ihn, um Styling in das DOM zu injizieren, bevor das Layout in [`useLayoutEffect`](#uselayouteffect) gelesen wird. Da der Geltungsbereich dieses Hooks begrenzt ist, hat er keinen Zugriff auf refs und kann keine Aktualisierungen planen.

> Hinweis:
>
> `useInsertionEffect` sollte beschränkt sein auf Autoren von CSS-in-JS-Libraries. Ziehe ihm stattdessen [`useEffect`](#useeffect) oder [`useLayoutEffect`](#uselayouteffect) vor.
