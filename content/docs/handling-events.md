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
* In JSX übergibst du eine Funktion als Eventhandler und keinen String.

Zum Beispiel dieses HTML:

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

ist in React ein wenig anders:

```js{1}
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

Ein weiterer Unterschied ist, dass `false` nicht zurückgegeben werden kann, um das Standardverhalten von React zu unterbinden. Es muss explizit `preventDefault` aufgerufen werden. Um beispielsweise das Aufrufen eines Links in einfachem HTML zu verhindern, kannst du folgendes schreiben:

```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

In React könnte es stattdessen so aussehen:

```js{3}
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

Hier ist `e` ein synthetisches Event. React definiert diese synthetischen Events gemäß der [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/), also brauchst du dir keine Sorgen über browserübergreifende Kompatibilität machen. React-Events arbeiten genauso wie native Events. Mehr Informationen findest du unter [`SyntheticEvent`](/docs/events.html).

Mit React solltest du im Normalfall `addEventListener` nicht aufrufen müssen, um Events an DOM Elemente zu binden, nachdem sie erstellt wurden. Stattdessen stellst du einfach einen Listener zur Verfügung, wenn das Element initial gerendert wurde.

Wenn du eine Komponente als [ES6 Klassse](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) definierst, ist es ein gängiges Pattern, dass der Eventhandler eine Methode der Klasse ist. Zum Beispiel rendert diese `Toggle` Komponente einen Button, der zwischen den States "AN" und "AUS" wechselt:

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // Diese Bindung ist nötig, damit `this` in der Callback-Methode funktioniert
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

Mit der Bedeutung von `this` musst du in JSX Callbacks vorsichtig sein. In JavaScript sind Klassenmethoden nicht standardmäßig [gebunden](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind). Wenn du vergisst `this.handleClick` an die Klasse zu binden und an `onClick` übergibst, wird `this` beim Aufruf der Funktion `undefined` sein.

Dies ist kein spezielles Verhalten von React; Es ist Teil davon, [wie Funktionen in JavaScript arbeiten](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Generell solltest du eine Methode ohne `()` am Ende wie `onClick={this.handleClick}` binden.

<<<<<<< HEAD
Wenn es dich stört immer `bind` aufzurufen, gibt es zwei Möglichkeiten dies zu umgehen. Wenn du die experimentelle [public class fields Syntax](https://babeljs.io/docs/plugins/transform-class-properties/) verwendest, kannst du Klassenfelder benutzen, um Callbacks richtig zu binden:

```js{2-6}
class LoggingButton extends React.Component {
  // Diese Syntax stellt sicher, dass `this` innerhalb von handleClick gebunden ist.
  // Warnung: Dies ist *experimentelle* Syntax.
=======
If calling `bind` annoys you, there are two ways you can get around this. You can use [public class fields syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields) to correctly bind callbacks:

```js{2-6}
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
>>>>>>> c1c3d1db304adfa5446accb0312e60d515188414
  handleClick = () => {
    console.log('this is:', this);
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

Diese Syntax ist standardmäßig in [Create React App](https://github.com/facebookincubator/create-react-app) aktiviert.

Wenn du die class field Syntax nicht verwendest, hast du die Möglichkeit im Callback eine [Lambda-Funktion](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) zu verwenden:

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this ist:', this);
  }

  render() {
    // Diese Syntax stellt sicher, dass `this` innerhalb von handleClick gebunden ist.
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

Das Problem mit dieser Syntax ist, dass jedes Rendern des `LoggingButton` einen anderen Callback erzeugt. In den meisten Fällen, ist das ok. Wenn jedoch dieser Callback an tiefer gelegene Komoponenten als Prop weitergegeben wird, könnten diese sich ein weiteres Mal neu rendern. Generell empfehlen wir die Events im Konstruktor zu binden oder die class field Syntax zu verwenden, um diese Art von Performance Problemen zu vermeiden.

## Argumente an Eventhandler übergeben {#passing-arguments-to-event-handlers}

Innerhalb einer Schleife ist es üblich, einen zusätzlichen Parameter an den Eventhandler zu übergeben. Wenn beispielsweise `id` die ID einer Zeile ist, würde folgendes funktionieren:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Zeile entfernen</button>
<button onClick={this.deleteRow.bind(this, id)}>Zeile entfernen</button>
```

Die beiden obigen Zeilen sind äquivalent und benutzen [Lambda-Funktionen](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) bzw. [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind).

In beiden Fällen repräsentiert das `e` Argument das React Event und wird als zweites Argument nach der ID mitgeliefert. Bei einer Lambda-Funktion müssen wir es explizit übergeben, aber mit `bind` werden alle weiteren Argumente automatisch weitergeleitet.
