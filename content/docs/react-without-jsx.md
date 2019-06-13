---
id: react-without-jsx
title: React Without JSX
permalink: docs/react-without-jsx.html
---

JSX ist keine Voraussetzung für die Benutzung von React. Besonders praktisch ist der Verzicht auf JSX dann, wenn man in seiner Entwicklungsumgebung keine Kompilierung durchführen möchte.

Jedes JSX Element ist eigentlich nur syntaktischer Zucker für den Aufruf von `React.createElement(component, props, ...children)`. Dementsprechend kannst du alles, was mit JSX möglich ist, auch in einfachem Javascript umsetzen.

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

If you're curious to see more examples of how JSX is converted to JavaScript, you can try out [the online Babel compiler](babel://jsx-simple-example).

The component can either be provided as a string, or as a subclass of `React.Component`, or a plain function for stateless components.

If you get tired of typing `React.createElement` so much, one common pattern is to assign a shorthand:

```js
const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);
```

If you use this shorthand form for `React.createElement`, it can be almost as convenient to use React without JSX.

Alternatively, you can refer to community projects such as [`react-hyperscript`](https://github.com/mlmorg/react-hyperscript) and [`hyperscript-helpers`](https://github.com/ohanhi/hyperscript-helpers) which offer a terser syntax.

