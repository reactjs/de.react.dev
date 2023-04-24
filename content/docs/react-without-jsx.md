---
id: react-without-jsx
title: React ohne JSX
permalink: docs/react-without-jsx.html
---

<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.

</div>

JSX ist keine Voraussetzung für die Benutzung von React. Besonders praktisch ist der Verzicht auf JSX dann, wenn man in seiner Entwicklungsumgebung keine Kompilierung durchführen möchte.

Jedes JSX Element ist eigentlich nur "syntactic sugar" für den Aufruf von `React.createElement(component, props, ...children)`. Dementsprechend kannst du alles, was mit JSX möglich ist, auch in einfachem Javascript umsetzen.

Als Beispiel, dieser Code in JSX:

```js
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello toWhat="World" />);
```

kann in diesen Code kompiliert werden, welcher kein JSX benutzt.

```js
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Hello, {toWhat: 'World'}, null));
```

Wenn du neugierig auf weitere Beispiele bist, bei denen JSX in Javascript konvertiert wird, dann probiere gerne den [online Babel-Compiler](babel://jsx-simple-example) aus.

Die Komponente kann entweder als String, als Unterklasse von `React.Component` oder als Funktion zur Verfügung gestellt werden.

Solltest du das häufige Tippen von `React.createElement` satt haben, ist ein gängiges Pattern, eine Kurzform zuzuweisen: 

```js
const e = React.createElement;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e('div', null, 'Hello World'));
```

Wenn du mit dieser Kurzform von `React.createElement` arbeitest, ist es fast genauso bequem React ohne JSX zu benutzen.

Als weitere Möglichkeit kannst du dich auf Community-Projekte, wie etwa [`react-hyperscript`](https://github.com/mlmorg/react-hyperscript) und [`hyperscript-helpers`](https://github.com/ohanhi/hyperscript-helpers) beziehen, welche eine kürzere Syntax zur Verfügung stellen. 

