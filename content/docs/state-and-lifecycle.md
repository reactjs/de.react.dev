---
id: state-and-lifecycle
title: State und Lifecycle
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

Diese Seite stellt das Konzept von States und Lifecycles in einer React-Komponente vor. Hier kannst du eine [detailiertere API Referenz für Komponenten](/docs/react-component.html) finden.

Schauen wir uns das Beispiel der tickenden Uhr aus dem [vorherigen Abschnitt](/docs/rendering-elements.html#updating-the-rendered-element) an. Im Kapitel [Elemente rendern](/docs/rendering-elements.html#rendering-an-element-into-the-dom), haben wir nur einen Weg kennengelernt, das UI zu aktualisieren. Wir rufen `ReactDOM.render()` auf, um die gerenderte Ausgabe zu ändern:

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

In diesem Abschnitt werden wir lernen, wie wir die `Clock` Komponente wirklich wiederverwendbar und in sich gekapselt machen. Sie richtet sich ihren eigenen Timer ein und aktualisiert sich jede Sekunde.

Wir können mit der Kapselung des Erscheinungsbildes der Uhr anfangen:

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

Es fehlt jedoch eine entscheidende Anforderung: Die Tatsache, dass `Clock` einen Timer anlegt und das UI jede Sekunden aktualisiert sollte ein Detail der Implementierung von `Clock` sein.

Idealerweise wollen wir dies nur einmal schreiben und `Clock` die Aktualisierung selbständig durchführen lassen:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Um dies zu implementieren, müssen wir der `Clock` Komponente einen "State" hinzufügen.

Der State ähnelt den Props, aber er ist privat und wird vollständig von der Komponente kontrolliert.

Wir haben schon [vorher erwähnt](/docs/components-and-props.html#functional-and-class-components), dass Komponenten die als Klassen definiert werden, über einige zusätzliche Features verfügen. Der lokale State ist genau das: Ein Feature, welches nur in Klassen verfügbar ist.

## Umwandeln einer Funktion in eine Klasse {#converting-a-function-to-a-class}

Eine Komponente wie `Clock` kannst du in fünf Schritten in eine Klasse umwandeln:

1. Erstelle eine [ES6 Klasse](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) mit dem selben Namen, die `React.Component` erweitert.

2. Erstelle eine leere Methode namens `render()`.

3. Verschiebe den Inhalt der Funktion in die `render()` Methode.

4. Ersetze `props` mit `this.props` in der `render()` Methode.

5. Lösche alle übrigen, leeren Funktionsdeklarationen.

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

Die `render` Methode wird jedes mal aufgerufen, wenn ein Update stattfindet, aber solange wir `<Clock />` in den selben DOM-Knoten rendern, wird nur eine einzige Instanz der `Clock` Klasse verwendet. Diese lässt uns zusätzliche Features, wie den lokalen State und Lifecycle-Methoden verwenden.

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

2) Füge einen [Klassenkonstruktor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) hinzu, der das initiale `this.state` zuweist:

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
Beachte wie wir `props` an den Basiskonstruktor übergeben:

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
Wir werden später den Code des Timers zurück in die Komponente einfügen.

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

In Anwendungen mit vielen Komponenten ist es wichtig Ressourcen wieder freizugeben, wenn die Komponente gelöscht wird.

Wir wollen einen [Timer anlegen](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval), wenn `Clock` zum ersten Mal ins DOM gerendert wird. Dies wird in React als "mounting" bezeichnet.

Wir wollen auch, dass der [Timer entfernt](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) wird, wenn das von `Clock` erstellte DOM Element gelöscht wird. Dies wird in React als "unmounting" bezeichnet.

Wir können spezielle Methoden in der Komponentenklasse deklarieren um in dieser beim mounting und unmounting bestimmten Code auszuführen:

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

Die `componentDidMount()` Methode wird ausgeführt nachdem die Komponenten in das DOM gerendert wurde. Dies ist eine gute Stelle um den Timer anzulegen:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Beachte, wie wir die Timer-ID in `this` (`this.timerID`) speichern.

Während `this.props` von React selbst eingerichtet wird, und `this.state` eine besondere Bedeutung hat, steht es dir frei, der Klasse manuell zusätzliche Felder hinzuzufügen, wenn du etwas speichern musst, das nicht am Datenfluss teilnimmt (wie eine Timer-ID).

Wir werden den Timer in der `componentWillUnmount()` Lifecycle Methode abbrechen:

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

1) Wenn `Clock` an `ReactDOM.render()` gegeben wird, ruft React den Konstruktor der `Clock` Komponente auf. Da `Clock` die aktuelle Uhrzeit anzeigen muss, initialisiert es `this.state` mit einem Objekt, welches die aktuelle Uhrzeit enthält. Wir werden diesen State später aktualisieren.

2) React ruft dann die `render()` Methode der `Clock` Komponente auf. So weiß React, was auf dem Bildschirm angezeigt werden soll. Dann aktualisiert React das DOM entsprechend der gerenderten Ausgabe von `Clock`.

3) Wenn die Ausgabe von `Clock` in das DOM eingefügt wurde, ruft React die Lifecycle Methode `componentDidMount()` auf. In dieser fordert die `Clock` Komponente den Browser auf einen Timer anzulegen, der jede Sekunde die `tick()` Methode aufruft.

4) Jede Sekunde ruft der Browser die `tick()` Methode auf. Innerhalb dieser plant die `Clock` Komponente das Aktualisieren der UI in dem `setState()` mit einem Objekt, welches die aktuelle Uhrzeit beinhaltet, aufruft. Dank des `setState()`-Aufrufs weiß React, dass sich der State geändert hat und ruft die `render()` Methode auf um erneut zu erfahren, was auf dem Bildschirm dargestellt werden soll. Diesmal wird `this.state.date` in der `render()` Methode anders sein und der gerenderte Inhalt die aktualsierte Zeit beinhalten. React aktualisiert dementsprechend das DOM.

5) Wenn die `Clock` Komponente jemals aus dem DOM entfernt wird, ruft React die `componentWillUnmount()` Lifecycle Methode auf und der Timer stoppt.

## State korrekt verwenden {#using-state-correctly}

Es gibt drei Dinge, die du über `setState()` wissen solltest.

### Bearbeite State nicht direkt {#do-not-modify-state-directly}

Dies wird zum Beispiel kein neurendern der Komponente bewirken:

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

React kann aus Preformancegründen mehrere `setState()` Aufrufe in einem Update zusammenfassen.

Da `this.props` und `this.state` asynchron aktualisiert werden können, solltest du dich nicht darauf verlassen, die Werte für Berechnungen des nächsten State verwenden zu können.

Beispielsweise, kann dieser Code den Counter nicht aktualisieren.

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Um dies zu verhindern, verwenden wir eine zweite Form von `setState()`, die eine Funktion anstatt eines Objektes entgegennimmt. Diese Funktion besitzt als erstes Argument den vorherigen State und die Props zum Zeitpunkt der Aktualisierung als zweites Argument:

```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

Wir haben oben eine [Lamda Funktion](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) verwendet, aber normale Funktionen funktionieren ebenso:

```js
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### Stateaktualisierungen werden zusammengeführt {#state-updates-are-merged}

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

## Der "top-down" Datenfluss {#the-data-flows-down}

Weder Eltern- noch Kind-Komponenten können wissen ob eine bestimmte Komponente stateful oder stateless ist, und sollten sich auch nicht darum kümmern ob sie als Funktion oder Klasse definiert wurde.

Deshalb wird der State oft als lokal oder gekapselt bezeichnet. Er ist nur für die Komponente, die ihn besitzt und erstellt hat zugänglich. Für sonst keine andere Komponente.

Eine Komponente kann sich aussuchen ob sie ihren State als Props weitergeben möchte:

```js
<h2>Es ist {this.state.date.toLocaleTimeString()}.</h2>
```

Dies funktioniert auch für benutzerdefinierte Komponenten:

```js
<FormattedDate date={this.state.date} />
```

Die `FormattedDate` Komponente nimmt `date` als Prop entgegen und wüsste nicht ob es aus dem State oder den Props von `Clock` stammt, oder von Hand eingegeben wurde:

```js
function FormattedDate(props) {
  return <h2>Es ist {props.date.toLocaleTimeString()}.</h2>;
}
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

Dies wird allgemein als "top-down" oder "unidirektionaler" Datenfluss bezeichnet. Jeder State ist immer im Besitz einer bestimmten Komponente und alle Daten oder Benutzeroberflächen die von diesem State abgeleitet sind, können nur alle "unteren" Komponenten im Baum betreffen.

Wenn du dir einen Komponentenbaum als Prop-Wasserfall vorstellst, ist jeder State der Komponente wie eine zusätzliche Wasserquelle, die an einer belieben Stelle entspringt und mit nach unten fließt.

Um zu zeigen, dass wirklich alle Elemente in sich geschlossen sind, erstellen wir eine `App` Komponente die drei `<Clock>`s rendert:

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

Jede `Clock` legt ihren eigenen Timer an und aktualisiert sich selbstständig.

In React Apps wird das Implementierungsdetail der Komponente, das sich im Laufe der Zeit ändern kann, als stateless oder stateful betrachtet. Du kannst stateless Komponenten innerhalb von stateful Komponenten benutzen und umgekehrt.
