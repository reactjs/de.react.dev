---
id: composition-vs-inheritance
title: Komposition vs. Vererbung
permalink: docs/composition-vs-inheritance.html
redirect_from:
  - "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

React verfügt über ein leistungsfähiges Kompositions-Modell, und wir empfehlen die Verwendung von Komposition anstelle von Vererbung um Code zwischen Komponenten wiederzuverwenden.

In diesem Abschnitt werden wir einige Problemstellungen betrachten, bei denen Entwickler für die React neu ist oftmals zu Vererbung greifen, und zeigen wie diese mit Hilfe von Komposition gelöst werden können.

## Eingrenzung {#containment}

Einige Komponenten kennen ihre Kinder nicht im Voraus. Dies ist besonders häufig bei Komponenten wie `Sidebar` oder `Dialog` der Fall, die generische "Boxen" darstellen.

Wir empfehlen, dass solche Komponenten die spezielle `children` Prop nutzen um Kind-Elemente direkt in ihre Ausgabe zu übergeben:

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

Dies ermöglicht es anderen Komponenten durch Schachtelung des JSX beliebige Kinder an sie zu übergeben:

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)

Alles innerhalb des `<FancyBorder>` JSX-Elements wird in die `FancyBorder` Komponente als eine `children` Prop übergeben. Da `{props.children}` von `FancyBorder` innerhalb eines `<div>` gerendert wird, erscheinen die übergebenen Elemente in der finalen Ausgabe.

Obwohl dies weniger üblich ist, wirst du manchmal möglicherweise mehrere "Lücken" in einer Komponente benötigen. In solchen Fällen kannst du dir eine eigene Konvention überlegen anstatt `children` zu nutzen:

```js{5,8,18,21}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

React-Elemente wie `<Contacts />` und `<Chat />` sind lediglich Objekte, somit kannst du sie wie beliebige andere Daten als Props übergeben. Dieser Ansatz wird dich möglicherweise an "slots" in anderen Bibliotheken erinnern, allerdings gibt es keinerlei Einschränkungen im Hinblick auf das, was du in React als Prop übergeben kannst.

## Spezialisierung {#specialization}

Manchmal betrachten wir Komponenten als "Sonderfälle" von anderen Komponenten. Zum Beispiel könnte man sagen, dass `WelcomeDialog` ein Sonderfall von `Dialog` ist.

In React wird dies ebenfalls durch Komposition erreicht, indem eine "spezifischere" Komponente eine "generischere" rendert und mit Props konfiguriert:

```js{5,8,16-18}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

Komposition funktioniert ebenso gut für Komponenten die als Klassen definiert sind:

```js{10,27-31}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## Und was ist mit Vererbung? {#so-what-about-inheritance}

Bei Facebook verwenden wir React in tausenden von Komponenten, und wir haben keinen Anwendungsfall gefunden, bei dem wir empfehlen würden eine Vererbungshierarchie zu erstellen.

Props und Komposition geben dir all die Flexibilität, die du brauchst um das Aussehen und Verhalten einer Komponente auf explizite und sichere Art anzupassen. Denk daran, dass Komponenten beliebige Props akzeptieren können, inklusive primitiver Werte, React-Elementen oder Funktionen.

Wenn du Funktionalität, die nicht UI-bezogen ist, zwischen Komponenten wiederverwenden möchtest, empfehlen wir dir diese in ein separates JavaScript-Modul auszulagern. Die Komponenten können dieses importieren und die Funktion, das Objekt oder eine Klasse nutzen, ohne sie zu erweitern.
