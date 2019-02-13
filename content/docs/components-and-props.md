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
function Willkommen(props) {
  return <h1>Hallo {props.name}</h1>;
}
```

This function is a valid React component because it accepts a single "props" (which stands for properties) object argument with data and returns a React element. We call such components "function components" because they are literally JavaScript functions.

Du kannst auch [ES6 Klassen](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) benutzen um Komponenten zu definieren:

```js
class Willkommen extends React.Component {
  render() {
    return <h1>Hallo {this.props.name}</h1>;
  }
}
```

The above two components are equivalent from React's point of view.

Classes have some additional features that we will discuss in the [next sections](/docs/state-and-lifecycle.html). Until then, we will use function components for their conciseness.

## Eine Komponente rendern {#rendering-a-component}

Previously, we only encountered React elements that represent DOM tags:

```js
const element = <div />;
```

However, elements can also represent user-defined components:

```js
const element = <Willkommen name="Sara" />;
```

When React sees an element representing a user-defined component, it passes JSX attributes to this component as a single object. We call this object "props".

For example, this code renders "Hallo Sara" on the page:

```js{1,5}
function Willkommen(props) {
  return <h1>Hallo {props.name}</h1>;
}

const element = <Willkommen name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[Auf CodePen ausprobieren](codepen://components-and-props/rendering-a-component)

Let's recap what happens in this example:

1. We call `ReactDOM.render()` with the `<Willkommen name="Sara" />` element.
2. React calls the `Willkommen` component with `{name: 'Sara'}` as the props.
3. Our `Willkommen` component returns a `<h1>Hallo Sara</h1>` element as the result.
4. React DOM efficiently updates the DOM to match `<h1>Hallo Sara</h1>`.

>**Note:** Always start component names with a capital letter.
>
>React treats components starting with lowercase letters as DOM tags. For example, `<div />` represents an HTML div tag, but `<Willkommen />` represents a component and requires `Willkommen` to be in scope.
>
>To learn more about the reasoning behind this convention, please read [JSX In Depth](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

## Komponenten zusammensetzen {#composing-components}

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as components.

For example, we can create an `App` component that renders `Willkommen` many times:

```js{8-10}
function Willkommen(props) {
  return <h1>Hallo {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Willkommen name="Sara" />
      <Willkommen name="Cahal" />
      <Willkommen name="Edite" />
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

Whether you declare a component [as a function or a class](#function-and-class-components), it must never modify its own props. Consider this `sum` function:

```js
function sum(a, b) {
  return a + b;
}
```

Such functions are called ["pure"](https://en.wikipedia.org/wiki/Pure_function) because they do not attempt to change their inputs, and always return the same result for the same inputs.

In contrast, this function is impure because it changes its own input:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React ist sehr flexibel, es gibt aber eine strikte Regel:
React is pretty flexible but it has a single strict rule:

**Alle React-Komponenten müssen sich im Bezug auf ihre Props, als sogenannte "pure functions" verhalten.**

Of course, application UIs are dynamic and change over time. In the [next section](/docs/state-and-lifecycle.html), we will introduce a new concept of "state". State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.
