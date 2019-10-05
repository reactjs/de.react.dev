---
id: react-without-jsx
title: React ohne JSX
permalink: docs/react-without-jsx.html
---

JSX ist keine Voraussetzung für die Benutzung von React. Besonders praktisch ist der Verzicht auf JSX dann, wenn man in seiner Entwicklungsumgebung keine Kompilierung durchführen möchte.

Jedes JSX Element ist eigentlich nur "syntactic sugar" für den Aufruf von `React.createElement(component, props, ...children)`. Dementsprechend kannst du alles, was mit JSX möglich ist, auch in einfachem Javascript umsetzen.

Als Beispiel, dieser Code in JSX:

```js
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

ReactDOM.render(
  <Hello toWhat="World" />,
  document.getElementById('root')
);
```

kann in diesen Code kompiliert werden, welcher kein JSX benutzt.

```js
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

Wenn du neugierig auf weitere Beispiele bist, bei denen JSX in Javascript konvertiert wird, dann probiere gerne den [online Babel-Compiler](babel://jsx-simple-example) aus.

Die Komponente kann der Funktion entweder als String, als Unterklasse von `React.Component` oder als zustandslose (engl. stateless) Komponente in Form einer einfachen Funktion zur Verfügung gestellt werden.

Solltest du das häufige Tippen von `React.createElement` satt haben, ist ein gängiges Pattern, eine Kurzform zuzuweisen: 

```js
const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);
```

Wenn du mit dieser Kurzform von `React.createElement` arbeitest, ist es fast genauso bequem React ohne JSX zu benutzen.

Als weitere Möglichkeit kannst du dich auf Community-Projekte, wie etwa [`react-hyperscript`](https://github.com/mlmorg/react-hyperscript) und [`hyperscript-helpers`](https://github.com/ohanhi/hyperscript-helpers) beziehen, welche eine kürzere Syntax zur Verfügung stellen. 

