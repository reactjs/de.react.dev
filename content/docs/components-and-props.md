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

Komponenten erlauben dir deine Benutzeroberfläche in unabhängige, wiederverwendbare Teile aufzubrechen und jeden als isoliert zu betrachten. Diese Seite bietet dir eine Einführung in die Idee hinter Komponenten. Du kannst eine [detailierte Komponentenbeschreibung in der API Referenz](/docs/react-component.html) finden.

Vom Konzept her sind Komponenten wie JavaScript-Funktionen. Sie akzeptieren beliebige Eingaben ("props" genannnt) und geben React-Elemente zurück, welche beschreiben was auf dem Bildschirm angezeigt werden soll.

## Funktions- und Klassenkomponenten {#function-and-class-components}

Der einfachste Weg eine Komponente zu definieren, ist eine JavaScript-Funktion zu schreiben:

```js
function Welcome(props) {
  return <h1>Hallo {props.name}</h1>;
}
```

Diese Funktion ist eine gültige React-Komponente, da sie ein einziges "props"- (engl. kurz für properties) Objekt mit Daten akzeptiert und ein React-Element zurückgibt. Wir nennen dies "Funktionskomponenten", weil es buchstäblich  JavaScript-Funktionen sind.

Du kannst ebenfalls [ES6-Klassen](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) benutzen um Komponenten zu definieren:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hallo {this.props.name}</h1>;
  }
}
```

Die beiden obigen Komponenten sind aus der Sicht von React identisch.

Funktion- und Klassen-Komponenten haben beide noch ein paar zusätzliche Eigenschaften, welche wir im [nächsten Abschnitt](/docs/state-and-lifecycle.html) besprechen.

## Eine Komponente rendern {#rendering-a-component}

Bis jetzt haben wir nur React-Elemente kennengelernt, die DOM-Tags repräsentiert haben:

```js
const element = <div />;
```

Elemente können aber auch benutzerdefinierte Komponenten darstellen:

```js
const element = <Welcome name="Sara" />;
```

React übergibt, wenn es ein Element als benutzerdefinierte Komponente erkennt, alle JSX Attribute als ein einziges Objekt. Dies sind die sogenannten "props" (Eigenschaften).

Zum Beispiel rendert dieser Code "Hallo Sarah" auf die Seite:

```js{1,5}
function Welcome(props) {
  return <h1>Hallo {props.name}</h1>;
}

const element = <Welcome name="Sarah" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[Auf CodePen ausprobieren](codepen://components-and-props/rendering-a-component)

Fassen wir mal zusammen, was in diesem Beispiel passiert:

1. Wir rufen `ReactDOM.render()` mit dem React-Element `<Welcome name="Sarah" />` auf.
2. React ruft die `Welcome` Komponente mit den Eigenschaften (props) `{name: 'Sarah'}` auf.
3. Unsere `Welcome`-Komponente gibt als Ergebnis `<h1>Hallo Sarah</h1>` zurück.
4. React aktualsiert effizient das DOM um `<h1>Hallo Sarah</h1>` abzugleichen.

>**Hinweis:** Beginne den Namen von Komponenten immer mit einem Großbuchstaben.
>
>React behandelt Komponenten, die mit Kleinbuchstaben beginnen, als DOM-Tags. Zum Beispiel stellt `<div />` ein HTML div-Tag dar, `<Welcome />` hingegen ist eine Komponente und erfordert, dass `Welcome` im Scope ist.
>
>Bitte lese [JSX im Detail](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized), um mehr über diese Konvention zu erfahren.

## Komponenten zusammensetzen {#composing-components}

Komponenten können bei ihrer Ausgabe auf andere Komponenten verweisen.
So können wir für jedes Detaillevel die selben abstrahierten Komponenten wiederverwenden. Denn sowohl Buttons, Formulare als auch Screens, werden in React-Apps allgemein als Komponenten bezeichnet.

Zum Beispiel können wir die `App` Komponente mehrmals `Welcome` rendern lassen:

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

Typischerweise haben neue React-Apps eine einzige `App` Komponente an erste Stelle. Wenn du aber React in ein bestehendes Projekt integrierst, fängst du wahrscheinlich von unten nach oben (bottom-up) an und erstellst Komponenten wie `Button`, dabei arbeitest dich Schritt für Schritt die View-Hierarchie nach oben.

## Komponenten auslagern {#extracting-components}

Hab keine Angst vor dem Aufteilen von Komponenten in kleinere Komponenten.

Nehmen wir mal als Beispiel diese `Comment`-Komponente:

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

Diese Komponente nimmt `author` (ein Objekt), `text` (ein String), und `date` (ein date-Objekt) als Props entgegen und beschreibt einen Kommentar auf einer Social Media Webseite.

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

Der `Avatar` muss nicht wissen, dass er in innerhalb von `Comment` gerendert wird. Darum geben wir dem prop einen gebräuchlicheren namen als: `author` und nennen es `user`.

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

Dadurch können wir `Comment` weiter vereinfachen:

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

Komponenten zu extrahieren mag sich wie Routinearbeit anfühlen, aber am Ende zahlt es sich für größere Apps aus, eine Palette an wiederverwendebaren Komponenten zu haben. Eine gute Faustregel ist es, dass wenn ein Teil der Benutzeroberfläche (`Button`, `Panel`, `Avatar`) öfters verwendet wird oder es ist für sich allein komplex genug ist (`App`, `FeedStory`, `Comment`), dies gute Kandidaten für wiederverwendbare Komponenten sind.

## Props sind Read-Only {#props-are-read-only}

Es ist egal, ob eine Komponente [als Funktion oder Klasse](#function-and-class-components) deklariert wird, sie darf nie ihre eigenen props verändern. Schauen wir uns mal diese `sum` Funktion an:

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
