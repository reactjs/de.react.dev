---
id: state-and-lifecycle
title: State und Lifecycle
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

Diese Seite stellt das Konzept des States und Lifecycles in einer React-Komponente vor. Du kannst eine [detailiertere API Referenz für Komponenten hier finden](/docs/react-component.html).

Gucken wir uns das Beispiel der tickenden Uhr aus dem [vorherigen Abschnitt](/docs/rendering-elements.html#updating-the-rendered-element) an. In dem Kapitel [Elemente rendern](/docs/rendering-elements.html#rendering-an-element-into-the-dom), haben wir nur einen Weg gelernt, die UI zu aktualisieren. Wir rufen `ReactDOM.render()` auf, um die gerenderte Ausgabe zu ändern:

```js{8-11}
function tick() {
  const element = (
    <div>
      <h1>Hallo Welt!</h1>
      <h2>Es ist {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

In diesem Abschnitt lernen wir, wie wir die `Clock` Komponente wirklich wiederverwenbar und in sich gekapselt machen. Sie richtet sich ihren eigenen Timer ein und aktualisiert sich jede Sekunde.

Wir können mit der Kapslung starten, so sieht die Uhr aus:

```js{3-6,12}
function Clock(props) {
  return (
    <div>
      <h1>Hallo Welt!</h1>
      <h2>Es ist {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

Es fehlt jedoch eine entscheidende Anforderung: Die Tatsache, dass `Clock` einen Timer aufsetzt und die UI jede Sekunden aktualisiert sollte ein Teil der Implementierung von `Clock` sein.

Idealerweise wollen wir dies nur einmal schreiben und `Clock` die Aktualisierung selbständig durchführen lassen:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Um dies zu implementieren, müssen wir der `Clock` Komponente einen "State" hinzufügen.

Der State ist ähnlich wie die Props, aber er ist privat und wird vollständig von der Komponente kontrolliert.

Wir haben schon [vorher erwähnt](/docs/components-and-props.html#functional-and-class-components), dass Komponenten die als Klassen definiert werden, ein paar zusätzliche Features haben. Der lokale State genau das: Ein Feature, welches nur in Klassen verfügbar ist.

## Umwandeln einer Funktion in eine Klasse {#converting-a-function-to-a-class}

Du kannst in fünf Schritten eine Komponente, wie `Clock`, in eine Klasse umwandeln:

1. Erstelle eine [ES6 Klasse](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) mit dem selben Namen, die mit Hilfe von `extends` durch `React.Component` erweitert wird.

2. Erstelle eine leere Methode namens `render()`.

3. Verschiebe den Inhalt der Funktion in die `render()` Methode.

4. Ersetze `props` mit `this.props` in der `render()` Methode.

5. Lösche alle übrigen leeren Funktionsdeklarationen.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hallo Welt!</h1>
        <h2>Es ist {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

`Clock` ist nun als Klasse und nicht mehr als Funktion definiert.

Die `render` Methode wird jedes mal aufgerufen, wenn ein Update stattfindet, aber solange wir `<Clock />` in den selben DOM-Knoten rendern, wird nur eine einzige Instanz der `Clock` Klasse verwendet. Diese lässt uns zusätzliche Features, wie den lokalen State und Lifecycle Methoden verwenden.

## Lokalen State einer Klasse hinzufügen {#adding-local-state-to-a-class}

Wir verschieben `date` von Props hin zum State in drei Schritten:

1) Ersetze `this.props.date` mit `this.state.date` in der `render()` Methode:

```js{6}
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hallo Welt!</h1>
        <h2>Es ist {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2) Füge einen [Klassenkonstruktor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) der den initialen `this.state` zuweist, hinzu:

```js{4}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hallo Welt!</h1>
        <h2>Es ist {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
Beachte wie wir `props` an den Basiskonstruktor geben:

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

Klassenkomponenten sollten den Basiskonstruktor immer mit `props` aufrufen.

3) Entferne das `date` Prop vom `<Clock />` Element:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
Wir werden später den Code des Timers zurück in die Komponente fügen.

Das Ergebnis sieht so aus:

```js{2-5,11,18}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hallo Welt!</h1>
        <h2>Es ist {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

Als nächstes werden wir dafür sorgen, dass `Clock` einen eigenen Timer einrichtet und sich jede Sekunde aktualisiert.

## Lifecycle Methoden zu einer Klasse hinzufügen {#adding-lifecycle-methods-to-a-class}

In Anwendungen mit vielen Komponenten, ist es wichtig Ressourcen wieder freizugeben, wenn die Komponente gelöscht wird.

Wir wollen einen [Timer aufsetzen](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval), wenn `Clock` zum ersten Mal ins DOM gerendert wird. Dies wird in React als "mounting" genannt.

Wir wollen auch, dass der [Timer entfernt](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) wird, wenn das von `Clock` erstellte DOM Element gelöscht wird. Dies wird in React als "unmounting" genannt.

Wir können spezielle Methoden in der Komponentenklasse deklarieren um in diesen beim mount und unmounting etwas Code auszuführen:

```js{7-9,11-13}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hallo Welt!</h1>
        <h2>Es ist {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Diese Methoden werden "Lifecycle Methoden" genannt.

Die `componentDidMount()` Methode wir nachdem die Komponenten in das DOM gerendert wurde ausgeführt. Dies ist eine gute Stelle um den Timer aufzusetzen:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Beachte, wie wir die Timer-ID in `this` speichern.

Während `this.reps` von React selbst eingerichtet wird und `this.state` eine besondere Bedeutung hat, steht es dir frei, der Klasse manuell zusätzliche Felder hinzuzufügen, wenn du etwas was nicht am Datenfluss teilnimmt (wie eine Timer-ID) speichern musst.

Wir werden den Timer in der `componentWillUnmount()` Lifecycle Mthode abbrechen:

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Zum Schluss werden wir noch eine Methode namens `tick` implementieren, die `Clock` jede Sekunde aufrufen wird.

Sie wird `this.setState()` verwenden, um die Aktualisierung des lokalen States der Komponente zu planen:

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hallo Welt!</h1>
        <h2>Es ist {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

Jetzt tickt die Uhr jede Sekunde.

Lass uns kurz zusammenfassen, was hier vor sich geht und in welcher Reihenfolge die Methoden aufgerufen werden:

1) When `<Clock />` is passed to `ReactDOM.render()`, React calls the constructor of the `Clock` component. Since `Clock` needs to display the current time, it initializes `this.state` with an object including the current time. We will later update this state.

2) React then calls the `Clock` component's `render()` method. This is how React learns what should be displayed on the screen. React then updates the DOM to match the `Clock`'s render output.

3) When the `Clock` output is inserted in the DOM, React calls the `componentDidMount()` lifecycle method. Inside it, the `Clock` component asks the browser to set up a timer to call the component's `tick()` method once a second.

4) Every second the browser calls the `tick()` method. Inside it, the `Clock` component schedules a UI update by calling `setState()` with an object containing the current time. Thanks to the `setState()` call, React knows the state has changed, and calls the `render()` method again to learn what should be on the screen. This time, `this.state.date` in the `render()` method will be different, and so the render output will include the updated time. React updates the DOM accordingly.

5) If the `Clock` component is ever removed from the DOM, React calls the `componentWillUnmount()` lifecycle method so the timer is stopped.

## Benutze State korrekt {#using-state-correctly}

Es gibt drei Dinge die du über `setState()` wissen solltest.

### Bearbeite den State nicht direkt {#do-not-modify-state-directly}

Dies wird zum Beispiel kein neu Rendern der Komponente bewirken:

```js
// Wrong
this.state.comment = 'Hello';
```

Benutze stattdessen `setState()`:

```js
// Correct
this.setState({comment: 'Hello'});
```

Der einzige Ort, an dem du `this.state` setzen kannst, ist der Konstruktor.

### Stateaktualsierungen können asynchron sein {#state-updates-may-be-asynchronous}

React may batch multiple `setState()` calls into a single update for performance.

Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state.

Beispielsweise, kann dieser Code den Counter nicht aktualisieren.

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

To fix it, use a second form of `setState()` that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:

```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

Wir haben eine [Lamda Funktion](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) oben verwendet, aber normale Funktionen funktionieren ebenso:

```js
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### Stateaktualsierungen werden zusammengeführt {#state-updates-are-merged}

Wenn du `setState()?` aufrufst, führt React das von dir bereitgestellte Objekt mit dem aktuellen State zusammen.

So kann dein State beispielsweise mehrere unabhängige Variablen beinhalten:

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Dann kannst du sie unabhängig in verschiedenen `setState()` aufrufen aktualsieren.

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

Das Zusammenführen ist nur oberflächlich und `this.setState({comments})` lässt `this.state.posts` bestehen, aber ersetzt `this.state.comments`.

## Der Datenfluss nach unten {#the-data-flows-down}

Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn't care whether Es ist defined as a function or a class.

This is why state is often called local or encapsulated. Es ist not accessible to any component other than the one that owns and sets it.

A component may choose to pass its state down as props to its child components:

```js
<h2>Es ist {this.state.date.toLocaleTimeString()}.</h2>
```

Dies funktioniert auch für benutzerdefinierte Komponenten:

```js
<FormattedDate date={this.state.date} />
```

The `FormattedDate` component would receive the `date` in its props and wouldn't know whether it came from the `Clock`'s state, from the `Clock`'s props, or was typed by hand:

```js
function FormattedDate(props) {
  return <h2>Es ist {props.date.toLocaleTimeString()}.</h2>;
}
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

This is commonly called a "top-down" or "unidirectional" data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components "below" them in the tree.

If you imagine a component tree as a waterfall of props, each component's state is like an additional water source that joins it at an arbitrary point but also flows down.

To show that all components are truly isolated, we can create an `App` component that renders three `<Clock>`s:

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

Jede `Clock` setzt ihren eigenen Timer auf und aktualisiert sich selbstständig.

In React apps, whether a component is stateful or stateless is considered an implementation detail of the component that may change over time. You can use stateless components inside stateful components, and vice versa.
