---
id: handling-events
title: Handhabung von Events
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

Die Handhabung von Events in React-Elementen ist ähnlich wie bei DOM-Elementen. Es gibt nur ein paar syntaktische Unterschiede:

* Events in React werden nicht in Kleinbuchstaben, sondern in camelCase benannt.
* In JSX wird eine Funktion als Eventhandler übergeben und kein String.

Zum Beispiel dieses HTML:

```html
<button onclick="activateLasers()">
  Aktiviere Laser
</button>
```

ist in React ein wenig anders:

```js{1}
<button onClick={activateLasers}>
  Aktiviere Laser
</button>
```

Ein weiterer Unterschied ist, dass `false` nicht zurückgegeben werden kann um das Standardverhalten von React zu unterbinden. Es muss explizit `preventDefault` aufgerufen werden. Um beispielsweise das Aufrufen eines Links in schlichtem HTML zu verhindern, kannst du folgendes schreiben:

```html
<a href="#" onclick="console.log('Der Link wurde geklickt.'); return false">
  Klicke mich
</a>
```

In React könnte es stattdessen so aussehen:

```js{2-5,8}
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('Der Link wurde geklickt.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Klicke mich
    </a>
  );
}
```

Hier ist `e` ein synthetisches Event. React definiert diese synthetischen Events gemäß des [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/), also brauchst du dir keine Sorgen über die browserübergreifende Kompatibilität machen. Mehr Informationen findest du im [`SyntheticEvent`](/docs/events.html) Referenz Handbuch.

Bei der Benutzung von React, solltest du im Normalfall den Aufruf von `addEventListener` nicht benötigen um Events an Elemente im DOM zu binden nach dem sie erstellt worden. Stelle stattdessen einfach einen Listener zur Verfügung, wenn das Element initial gerendert wurde.

Wenn du eine Komponente als [ES6 Klassse](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) definierst, ist ein gängiges Pattern, dass der Eventhandler eine Methode der Klasse ist. Zum Beispiel rendert diese `Toggle` Komponente eine Button, welcher zwischen den States "AN" und "AUS" wechselt:

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // Diese Bindung ist nötig, damit `this` in der Callback-Methode funktioniert
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'AN' : 'AUS'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[**Auf CodePen ausprobieren**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

Du musst Vorsichtig sein mit der Bedeutung von `this` in JSX Callbacks. In JavaScript sind Klassenmethoden nicht an diese standardmäßig [gebunden](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind). Wenn du vergisst `this.handleClick` and die Klasse zu binden und an `onClick` übergibst, wird `this` `undefined` sein, wenn die Funktion tatsächlich aufgerufen wird.

Dies ist kein spezielles Verhalten von React; Es ist Teil davon, [wie Funktionen in JavaScript arbeiten](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Generell solltest du eine Methode ohne `()` am Ende, wie `onClick={this.handleClick}`, binden.

Wenn es dich stört immer `bind` aufzurufen, gibt es zwei Möglichkeiten dies zu umgehen. Wenn du die experimentelle [public class fields sSyntax](https://babeljs.io/docs/plugins/transform-class-properties/) verwendest, kannst du Klassenfelder benutzen um Callbacks richtig zu binden:

```js{2-6}
class LoggingButton extends React.Component {
  // Diese Syntax stellt sicher, dass `this` innerhalb von handleClick gebunden ist.
  // Warnung: Dies ist *experimentelle* Syntax.
  handleClick = () => {
    console.log('this ist:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Klick mich
      </button>
    );
  }
}
```

Diese Syntax is standardmäßig in [Create React App](https://github.com/facebookincubator/create-react-app) aktiviert.

Wenn du die class field Syntax nicht verwendest, hast du die Möglichkeit im Callback eine [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) zu verwenden:

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this ist:', this);
  }

  render() {
    // Diese Syntax stellt sicher, dass `this` innerhalb von handleClick gebunden ist.
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Klick mich
      </button>
    );
  }
}
```

The problem with this syntax is that a different callback is created each time the `LoggingButton` renders. In most cases, this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering. We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.

## Passing Arguments to Event Handlers {#passing-arguments-to-event-handlers}

Inside a loop it is common to want to pass an extra parameter to an event handler. For example, if `id` is the row ID, either of the following would work:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Zeile entfernen</button>
<button onClick={this.deleteRow.bind(this, id)}>Zeile entfernen</button>
```

The above two lines are equivalent, and use [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) respectively.

In both cases, the `e` argument representing the React event will be passed as a second argument after the ID. With an arrow function, we have to pass it explicitly, but with `bind` any further arguments are automatically forwarded.
