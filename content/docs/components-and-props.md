---
id: components-and-props
title: Komponenten und Props
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

Mit Komponenten kannst du deine Benutzeroberfläche in unabhängige, wiederverwendbare Teile aufteilen und jedes einzelne von ihnen als unabhängig betrachten. Diese Seite bietet dir eine Einführung in die Idee hinter Komponenten. Du kannst [detailierte Komponentenbeschreibung in der API Referenz](/docs/react-component.html) finden.

Vom Konzept her, sind Komponenten wie JavaScript-Funktionen. Sie akzeptieren beliebige Eingaben ("props" genannnt) und geben React-Elemente zurück, welche beschreiben was auf dem Bildschirm angezeigt werden soll.

## Funktions- und Klassenkomponenten {#function-and-class-components}

Der einfachste Weg eine Komponente zu definieren, ist eine JavaScript-Funktion zu schreiben:

```js
function Welcome(props) {
  return <h1>Hallo {props.name}</h1>;
}
```

Diese Funktion is eine gültige React-Komponente, da sie ein einziges "props" (steht für properties) Objekt mit Daten akzeptiert und eine React-Element zurückgibt. Wir nennen dies "Funktionskomponenten", weil es sich hier buchstäblich um JavaScript Funktionen handelt.

Du kannst auch [ES6 Klassen](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) benutzen um Komponenten zu definieren:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hallo {this.props.name}</h1>;
  }
}
```

Die beiden obrigen Komponenten sind aus der Sicht von React identisch.

Klassen haben noch ein paar zusätzliche Eigenschaften, diese besprechen wir aber erst im [nächsten Abschnitt](/docs/state-and-lifecycle.html). Bis dahin werden wir für die Funktionskomponenten wegen ihrer Übersichtlichkeit nehmen.

## Eine Komponente rendern {#rendering-a-component}

Bis jetzt haben wir nur React-Elemente kennegelernt, dir DOM-Tags repräsentiert haben:

```js
const element = <div />;
```

Elemente können aber auch benutzerdefinierte Komponenten darstellen:

```js
const element = <Welcome name="Sara" />;
```

React übergibt, wenn es ein Element als benutzerdefinierte Komponente erkennt, alle JSX Attribute als ein einziges Objekt. Dies sind die sogenannten "props" (Eigenschaften).

Zum Beispiel rendert dieser Code "Hallo Sara" auf die Seite:

```js{1,5}
function Welcome(props) {
  return <h1>Hallo {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[Auf CodePen ausprobieren](codepen://components-and-props/rendering-a-component)

Lass uns mal zusammen fassen, was in diesem Beispiel passiert:

1. Wir rufen `ReactDOM.render()` mit dem React-Element `<Welcome name="Sara" />` auf.
2. React ruft die `Welcome` Komponente mit den Eigenschaften (props) `{name: 'Sara'}` auf.
3. Unsere `Welcome` Komponente gibt als Ergebnis `<h1>Hallo Sara</h1>` zurück.
4. React aktualsiert effektiv das DOM um `<h1>Hallo Sara</h1>` abzugleichen.

>**Hinweis:** Starte Namen von Komponenten immer mit Großbuchstaben.
>
>React behandelt Komponenten, die mit Kleinbuchstaben beginnen, als DOM-Tags. Zum Beispiel stellt `<div />` ein HTML div-Tag dar, aber `<Welcome />` stellt eine Komponente dar und erfordert, dass `Welcome` im Scope ist.
>
>Bitte lese [JSX im Detail](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized), um mehr über diese Konvention zu erfahren.

## Komponenten zusammensetzen {#composing-components}

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as components.

For example, we can create an `App` component that renders `Welcome` many times:

```js{8-10}
function Welcome(props) {
  return <h1>Hallo {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[Auf CodePen ausprobieren](codepen://components-and-props/composing-components)

Typically, new React apps have a single `App` component at the very top. However, if you integrate React into an existing app, you might start bottom-up with a small component like `Button` and gradually work your way to the top of the view hierarchy.

## Komponenten auslagern {#extracting-components}

Hab keine Angst vor dem Aufteilen von Komponenten in kleinere Komponenten.

Nehmen wir mal als Beispiel diese `Comment` Komponente:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[Auf CodePen ausprobieren](codepen://components-and-props/extracting-components)

Diese Komponente nimmt `author` (ein object), `text` (ein string), and `date` (ein date) als Props entgegen und beschreibt einen Kommentar auf einer Social Media Webseite.

Aufgrund der Verschachtelung könnte diese Komponente schwer abänderbar sein, außerdem ist es auch schwierig einzelne Teile davon wiederzuverwenden. Lass uns doch mal ein paar Komponenten daraus ziehen.

Als erstes werden wir `Avatar` auslagern:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

Der `Avatar` muss nicht wissen, dass er in innerhalb `Comment` gerendert wird. Darum geben wir dem prop einen gebräuchlicheren namen als: `author` und nennen es `user`.

Wir empfehlen props nicht nach dem Kontext in dem sie verwenden werden, sondern aus dem sie kommen zu benennen.

Wir können nun `Comment` ein bisschen vereinfachen:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
Als nächstes werden wir eine `UserInfo` Komponente extrahieren, welche einen `Avatar` neben den Namen des Benutzers rendert:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

Dadurch können wir `Comment` noch ein wenig mehr vereinfachen:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[Auf CodePen ausprobieren](codepen://components-and-props/extracting-components-continued)

Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps. A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be a reusable component.

## Props und Read-Only {#props-are-read-only}

Es ist egal ob eine Komponente [als Funktion oder Klasse](#function-and-class-components) deklarierst, sie darf nie ihre eigenen props verändern. Schauen wir uns mal diese `sum` Funktion an:

```js
function sum(a, b) {
  return a + b;
}
```

Solch eine Funktion wird als ["pure"](https://en.wikipedia.org/wiki/Pure_function) bezeichnet, da sie nicht ihre Eingaben ändert und immer das gleiche Ergbenis für die gleichen Eingaben zurückgibt.

Im Umkehrschluss ist diese Funktion keine "pure function", sondern "impure", da sie ihre eigenen Eingaben ändert:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React ist sehr flexibel, es gibt aber eine strikte Regeln:

**Alle React-Komponenten müssen sich im Bezug auf ihre Props, als sogenannte "pure functions" verhalten.**

Natürlich sind Anwendungen dynamisch und ändern ihre Benutzeroberfläche über die Zeit. Im [nächsten Abschnitt](/docs/state-and-lifecycle.html) werden wir das "state" Konzept vorstellen. React-Komponenten reagieren auf Benutzereingaben, Netzwerkantworten und vieles mehr, dabei erlaubt uns der State (Zustand), die Ausgabe einer Komponente über die Zeit zu ändern.
