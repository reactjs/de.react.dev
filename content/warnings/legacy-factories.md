---
title: React Element Factories and JSX Warnung
layout: single
permalink: warnings/legacy-factories.html
---

Du bist vermutlich hier, weil du deine Komponente als normale Funktion aufrufst. Das funktioniert jetzt nicht mehr:

```javascript
var MyComponent = require('MyComponent');

function render() {
  return MyComponent({ foo: 'bar' });  // WARNUNG
}
```

## JSX {#jsx}

React Komponenten können nicht mehr direkt aufgerufen werden, stattdessen kannst du [JSX nutzen](/docs/jsx-in-depth.html).

```javascript
var React = require('react');
var MyComponent = require('MyComponent');

function render() {
  return <MyComponent foo="bar" />;
}
```

## Ohne JSX {#without-jsx}

Wenn du JSX nicht nutzen möchtest oder nicht nutzen kannst, dann musst du deine Komponenten in einer Factory kapseln:

```javascript
var React = require('react');
var MyComponent = React.createFactory(require('MyComponent'));

function render() {
  return MyComponent({ foo: 'bar' });
}
```

Das ist ein einfacher Weg dein Projekt zu aktualisieren wenn es viele solcher Funktionsaufrufe darin gibt.

## Dynamische Komponenten ohne JSX {#dynamic-components-without-jsx}

Wenn du eine Komponentenklasse von einer dynamischen Quelle erhältst, dann ist es möglicherweise unnötig eine Factory hierfür zu erstellen und diese sofort aufzurufen. Stattdessen kannst du dein Element direkt erzeugen:

```javascript
var React = require('react');

function render(MyComponent) {
  return React.createElement(MyComponent, { foo: 'bar' });
}
```

## Weitere Details {#in-depth}

[Lies hier mehr dazu, WARUM wir diese Änderung durchgeführt haben.](https://gist.github.com/sebmarkbage/d7bce729f38730399d28)
