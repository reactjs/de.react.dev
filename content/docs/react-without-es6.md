---
id: react-without-es6
title: React ohne ES6
permalink: docs/react-without-es6.html
---

Normalerweise definierst du eine React-Komponente als einfache JavaScript-Klasse:

```javascript
class Gruss extends React.Component {
  render() {
    return <h1>Hallo, {this.props.name}</h1>;
  }
}
```

Wenn du ES6 noch nicht verwendest, kannst du stattdessen das Modul `create-react-class` verwenden:

```javascript
var createReactClass = require('create-react-class');
var Gruss = createReactClass({
  render: function() {
    return <h1>Hallo, {this.props.name}</h1>;
  }
});
```

Die API von ES6-Klassen ähnelt mit wenigen Ausnahmen der von `createReactClass()`.

## Default-Props deklarieren {#declaring-default-props}

Mit Funktionen und ES6-Klassen wird `defaultProps` als Eigenschaft für die Komponente selbst definiert:

```javascript
class Gruss extends React.Component {
  // ...
}

Gruss.defaultProps = {
  name: 'Maria'
};
```

Mit `createReactClass()` musst du `getDefaultProps()` als Funktion für das übergebene Objekt definieren:

```javascript
var Gruss = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Maria'
    };
  },

  // ...

});
```

## Anfangs-State einstellen {#setting-the-initial-state}

In ES6-Klassen kannst du die Anfangs-State definieren, indem im Konstruktor `this.state` zuweise:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  // ...
}
```
Mit `createReactClass()`musst du eine separate `getInitialState`-Methode bereitstellen,  die die Anfangs-State zurückgibt:

```javascript
var Counter = createReactClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  // ...
});
```

## Autobinding {#autobinding}

In als ES6-Klassen deklarierten React-Komponenten folgen Methoden der gleichen Semantik wie reguläre ES6-Klassen. Dies bedeutet, dass sie `this` nicht automatisch an die Instanz binden. Du musst im Konstruktor explizit `.bind(this)` verwenden:

```javascript
class SagHallo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hallo!'};
    // Diese Zeile ist wichtig!
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // Da `this.handleClick` gebunden ist, können wir es als Event-Handler verwenden.
    return (
      <button onClick={this.handleClick}>
        Sag Hallo
      </button>
    );
  }
}
```

Mit `createReactClass ()` ist dies nicht notwendig, da es alle Methoden bindet:

```javascript
var SagHallo = createReactClass({
  getInitialState: function() {
    return {message: 'Hallo!'};
  },

  handleClick: function() {
    alert(this.state.message);
  },

  render: function() {
    return (
      <button onClick={this.handleClick}>
        Sag Hallo
      </button>
    );
  }
});
```

Das bedeutet, dass das Schreiben von ES6-Klassen mit etwas mehr Boilerplate-Code für Ereignisbehandlungsroutinen geliefert wird, aber die Leistung bei großen Anwendungen ist etwas besser.

Wenn der Boilerplate-Code für dich zu unattraktiv ist, kannst du den Syntaxvorschlag **experimentell** [Class Properties](https://babeljs.io/docs/plugins/transform-class-properties/) mit Babel aktivieren:

```javascript
class SagHallo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hallo!'};
  }
  // WARNUNG: Dieser Syntax ist experimentell!
  // Die Verwendung eines Pfeils hier bindet die Methode:
  handleClick = () => {
    alert(this.state.message);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Sag Hallo
      </button>
    );
  }
}
```

Bitte beachte, dass der obige Syntax **experimentell** ist und sich der Syntax möglicherweise ändert oder der Vorschlag nicht in die Sprache übernommen wird.

Wenn Du lieber auf Nummer sicher gehen möchtest, hast du einige Möglichkeiten:

* Binde Methoden im Konstruktor.
* Verwende Pfeilfunktionen, z.b. `onClick = {(e) => this.handleClick (e)}`.
* Verwende weiterhin `createReactClass`.

## Mixins {#mixins}

>**Hinweis:**
>
>ES6 wird ohne Mixin-Unterstützung gestartet. Daher werden Mixins bei Verwendung von React with ES6 classes nicht unterstützt.
>
>**Wir haben auch zahlreiche Probleme in Codebasen festgestellt, die Mixins verwenden, [und empfehlen, diese nicht im neuen Code zu verwenden](/blog/2016/07/13/mixins-considered-harmful.html).**
>
>Dieser Abschnitt dient nur als Referenz.

Manchmal haben sehr unterschiedliche Komponenten gemeinsame Funktionen. Diese werden manchmal als [Querschnittsthemen](https://en.wikipedia.org/wiki/Cross-cutting_concern) bezeichnet. Mit `createReactClass` kannst du dafür ein altes `mixins`-System verwenden.

Ein häufiger Anwendungsfall ist eine Komponente, die sich in einem bestimmten Zeitintervall selbst aktualisieren möchte. Es ist einfach, `setInterval()` zu verwenden, aber es ist wichtig, das Intervall abzubrechen, wenn du es nicht mehr benötigst, um Speicherplatz zu sparen. React bietet [Lebenszyklusmethoden](/docs/react-component.html#the-component-lifecycle), mit denen du weißt, wann eine Komponente erstellt oder zerstört werden soll. Erstellen wir ein einfaches Mixin, das diese Methoden verwendet, um eine einfache `setInterval()`-Funktion bereitzustellen, die automatisch bereinigt wird, wenn deine Komponente zerstört wird.

```javascript
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var createReactClass = require('create-react-class');

var TickTock = createReactClass({
  mixins: [SetIntervalMixin], // Verwende das Mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // Rufe eine Methode für das Mixin auf
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React wurde {this.state.seconds} Sekunden lang ausgeführt.
      </p>
    );
  }
});

ReactDOM.render(
  <TickTock />,
  document.getElementById('example')
);
```

Wenn eine Komponente mehrere Mixins verwendet und mehrere Mixins dieselbe Lifecycle-Methode definieren (d. H. Mehrere Mixins möchten eine Bereinigung durchführen, wenn die Komponente zerstört wird), wird garantiert, dass alle Lifecycle-Methoden aufgerufen werden. Methoden, die für Mixins definiert wurden, die in der Reihenfolge Mixins ausgeführt wurden, wurden aufgelistet, gefolgt von einem Methodenaufruf für die Komponente.
