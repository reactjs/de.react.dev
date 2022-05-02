---
id: conditional-rendering
title: Bedingte Darstellung
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

Mit React können verschiedene Komponenten erstellt werden, die ein gewünschtes Verhalten kapseln. In Abhängigkeit vom State der Anwendung können dann einige davon dargestellt werden.

Die bedingte Darstellung (engl. conditional rendering) in React funktioniert genauso wie Bedingungen in JavaScript. Benutze JavaScript Operatoren wie [`if`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/if...else) oder den [Bedingten Operator](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) um Elemente zu erstellen, welche den aktuellen State widerspiegeln. React aktualisiert dementsprechend die aktuelle Benutzeroberfläche.

Stelle dir diese beiden Komponenten vor:

```js
function UserGreeting(props) {
  return <h1>Willkommen zurück!</h1>;
}

function GuestGreeting(props) {
  return <h1>Bitte melde dich an.</h1>;
}
```

Wir erstellen eine `Greeting` Komponente, die eine dieser Komponenten anzeigt, je nachdem ob der Benutzer angemeldet ist oder nicht.

```javascript{3-7,11,12}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

<<<<<<< HEAD
ReactDOM.render(
  // Probiere mal isLoggedIn={true} aus:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
=======
const root = ReactDOM.createRoot(document.getElementById('root')); 
// Try changing to isLoggedIn={true}:
root.render(<Greeting isLoggedIn={false} />);
>>>>>>> 5f3a9756e00e256735a5f52df19b403d8fdd3a9d
```

**[Auf CodePen ausprobieren](codepen://conditional-rendering/conditional-rendering)**

Abhängig vom Wert des `isLoggedIn` Prop stellt das Beispiel eine der Begrüßungen dar.

### Element Variablen {#element-variables}

Man kann Elemente auch in Variablen speichern. Das kann hilfreich sein, wenn man einen Teil der Komponente bedingt darstellen und den Rest unverändert lassen möchte.

Betrachten wir diese beiden neuen Komponenten, welche Anmelde- und Abmeldebuttons darstellen:

```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Anmelden
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Abmelden
    </button>
  );
}
```

Im unteren Beispiel erstellen wir eine [zustandsbehaftete Komponente](/docs/state-and-lifecycle.html#adding-local-state-to-a-class), die wir `LoginControl` nennen.

Sie wird je nach aktuellem State entweder einen `<LoginButton />` oder einen `<LogoutButton />` darstellen. Außerdem wird sie immer das `<Greeting />` aus dem vorherigen Beispiel anzeigen.

```javascript{20-25,29,30}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<LoginControl />);
```

**[Auf CodePen ausprobieren](codepen://conditional-rendering/element-variable)**

Während Variablen und `if` Ausdrücke einen guten Weg darstellen um eine Komponente bedingt anzuzeigen, benötigt man manchmal eine etwas kürzere Schreibweise. Es gibt mehrere Wege, Bedingungen direkt in JSX mit aufzunehmen. Diese werden anschließend erklärt.

### Bedingung in JSX mit dem logischen && Operator {#inline-if-with-logical--operator}

Es können [beliebige Ausdrücke in JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx) verwendet werden, indem man sie in geschweifte Klammern schreibt. Das beinhaltet auch den logischen `&&` Operator aus JavaScript. Dieser kann beim bedingten Darstellen eines Elements sehr nützlich sein.

```js{6-10}
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hallo!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          Du hast {unreadMessages.length} ungelesene Nachrichten.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<Mailbox unreadMessages={messages} />);
```

**[Auf CodePen ausprobieren](codepen://conditional-rendering/inline-if-else-with-logical-operator)**

Das funktioniert, weil `true && ausdruck` in JavaScript immer zu `ausdruck` evaluiert und `false && ausdruck` immer zu `false` evaluiert.

Wenn die Bedingung also `true` ergibt, wird das Element rechts neben dem `&&` angezeigt. Wenn sie hingegen `false` ergibt wird sie von React ignoriert und übersprungen.

Beachte, dass die Rückgabe eines falschen Ausdrucks immer noch dazu führt, dass das Element nach `&&` übersprungen wird, aber den falschen Ausdruck zurückgibt. Im Beispiel unten wird `<div>0</div>` von der Render-Methode zurückgegeben.

```javascript{2,5}
render() {
  const count = 0;
  return (
    <div>
      {count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

### In JSX eingebettetes If-Else mit Bedingungs-Operator {#inline-if-else-with-conditional-operator}

Eine andere Methode wie man Elemente bedingt in JSX eingebettet darstellen kann, ist die Nutzung des bedingten Operators [`bedingung ? true : false`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) aus JavaScript.

Im folgenden Beispiel wird er genutzt um einen kurzen Text bedingt darzustellen.

```javascript{5}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      Der Benutzer ist <b>{isLoggedIn ? 'zur Zeit' : 'nicht'}</b> eingeloggt.
    </div>
  );
}
```

Der Operator kann auch für größere Ausdrücke genutzt werden, wobei es dann schwerer nachzuvollziehen ist was passiert:

```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

Wie in JavaScript auch, ist es dir überlassen welche Methode du für passend hälst und was du und dein Team lesbarer findet. Bedenke: Wenn Bedingungen zu komplex werden, könnte ein guter Zeitpunkt sein um sie in eine eigene [Komponente auszulagern](/docs/components-and-props.html#extracting-components).

### Darstellung einer Komponente unterbinden {#preventing-component-from-rendering}

In seltenen Fällen möchtest du womöglich eine Komponente ausblenden, obwohl sie von einer anderen Komponente dargestellt wird. Dafür kannst du `null` anstelle des Inhalts als Ausgabewert zurückgeben.

Im folgenden Beispiel, wird der `<WarningBanner />` in Abhängigkeit vom Wert `warn` aus den Props dargestellt. Wenn der Wert des Props `false` ist, wird die Komponente nicht dargestellt:

```javascript{2-4,29}
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warnung!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Ausblenden' : 'Anzeigen'}
        </button>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<Page />);
```

**[Auf CodePen ausprobieren](codepen://conditional-rendering/preventing-component-rendering)**

Der Rückgabewert `null` aus der `render` Methode einer Komponente hat keinen Einfluss auf die Aufrufe der Lifecycle-Methoden. `componentDidUpdate` wird beispielsweise weiterhin aufgerufen.
