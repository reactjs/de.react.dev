---
id: react-without-es6
title: React ohne ES6
permalink: docs/react-without-es6.html
---

Normalerweise definiere eine React-Komponente als einfache JavaScript-Klasse:

```javascript
class Gruss extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Wenn du ES6 noch nicht verwende, kannst du stattdessen das Modul `create-react-class` verwenden:

```javascript
var createReactClass = require('create-react-class');
var Gruss = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```

Die API von ES6-Klassen ähnelt mit wenigen Ausnahmen der von `createReactClass()`.

## Default-Props deklarieren {#declaring-default-props}

Mit Funktionen und ES6-Klassen wird `defaultProps` als Eigenschaft für die Komponente selbst definiert:

```javascript
class Gruss extends React.Component {
  // ...
}

Gruss.defaultProps = {
  name: 'Maria'
};
```

Mit `createReactClass()` musst du `getDefaultProps()` als Funktion für das übergebene Objekt definieren:

```javascript
var Gruss = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Maria'
    };
  },

  // ...

});
```

## Anfangs-State einstellen {#setting-the-initial-state}

In ES6-Klassen kannst du den Anfangs-State definieren, indem Sie im Konstruktor `this.state` zuweisen:
In ES6 classes, you can define the initial state by assigning `this.state` in the constructor:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  // ...
}
```

With `createReactClass()`, you have to provide a separate `getInitialState` method that returns the initial state:

```javascript
var Counter = createReactClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  // ...
});
```

## Autobinding {#autobinding}

In React components declared as ES6 classes, methods follow the same semantics as regular ES6 classes. This means that they don't automatically bind `this` to the instance. You'll have to explicitly use `.bind(this)` in the constructor:

```javascript
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // This line is important!
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // Because `this.handleClick` is bound, we can use it as an event handler.
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```

With `createReactClass()`, this is not necessary because it binds all methods:

```javascript
var SayHello = createReactClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },

  handleClick: function() {
    alert(this.state.message);
  },

  render: function() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
});
```

This means writing ES6 classes comes with a little more boilerplate code for event handlers, but the upside is slightly better performance in large applications.

If the boilerplate code is too unattractive to you, you may enable the **experimental** [Class Properties](https://babeljs.io/docs/plugins/transform-class-properties/) syntax proposal with Babel:


```javascript
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
  }
  // WARNING: this syntax is experimental!
  // Using an arrow here binds the method:
  handleClick = () => {
    alert(this.state.message);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```

Please note that the syntax above is **experimental** and the syntax may change, or the proposal might not make it into the language.

If you'd rather play it safe, you have a few options:

* Bind methods in the constructor.
* Use arrow functions, e.g. `onClick={(e) => this.handleClick(e)}`.
* Keep using `createReactClass`.

## Mixins {#mixins}

>**Note:**
>
>ES6 launched without any mixin support. Therefore, there is no support for mixins when you use React with ES6 classes.
>
>**We also found numerous issues in codebases using mixins, [and don't recommend using them in the new code](/blog/2016/07/13/mixins-considered-harmful.html).**
>
>This section exists only for the reference.

Sometimes very different components may share some common functionality. These are sometimes called [cross-cutting concerns](https://en.wikipedia.org/wiki/Cross-cutting_concern). `createReactClass` lets you use a legacy `mixins` system for that.

One common use case is a component wanting to update itself on a time interval. It's easy to use `setInterval()`, but it's important to cancel your interval when you don't need it anymore to save memory. React provides [lifecycle methods](/docs/react-component.html#the-component-lifecycle) that let you know when a component is about to be created or destroyed. Let's create a simple mixin that uses these methods to provide an easy `setInterval()` function that will automatically get cleaned up when your component is destroyed.

```javascript
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var createReactClass = require('create-react-class');

var TickTock = createReactClass({
  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // Call a method on the mixin
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});

ReactDOM.render(
  <TickTock />,
  document.getElementById('example')
);
```

If a component is using multiple mixins and several mixins define the same lifecycle method (i.e. several mixins want to do some cleanup when the component is destroyed), all of the lifecycle methods are guaranteed to be called. Methods defined on mixins run in the order mixins were listed, followed by a method call on the component.
