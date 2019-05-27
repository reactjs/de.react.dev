---
id: shallow-renderer
title: Flaches Rendern
permalink: docs/shallow-renderer.html
layout: docs
category: Reference
---

**Import**

```javascript
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
var ShallowRenderer = require('react-test-renderer/shallow'); // ES5 mit npm
```

## Übersicht {#overview}

Beim Schreiben von *unit tests* kann flaches Rendering (engl. shallow rendering) hilfreich sein. Flaches Rendering ermöglicht es, eine Komponente "einen Level tief" zu rendern, und vergleicht den zurückgegebenen Wert der Render Methode, ohne sich über das Verhalten der Kind-Komponenten, welche nicht instanziiert oder gerendert werden, Sorgen zu machen. Ein DOM wird hierbei nicht verlangt.

Wenn du zum Beispiel folgendes Komponent hast:

```javascript
function MyComponent() {
  return (
    <div>
      <span className="heading">Titel</span>
      <Subcomponent foo="bar" />
    </div>
  );
}
```
So können wir sie testen:

```javascript
import ShallowRenderer from 'react-test-renderer/shallow';

// in deinem Test:
const renderer = new ShallowRenderer();
renderer.render(<MyComponent />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <span className="heading">Titel</span>,
  <Subcomponent foo="bar" />
]);
```

Zurzeit hat flaches Rendering die Einschränkung, dass `refs` nicht unterstützt werden.

> Hinweis:
>
> Wir empfehlen, sich die [Shallow Rendering API](https://airbnb.io/enzyme/docs/api/shallow.html) von Enzyme anzusehen. Sie ermöglicht eine bessere *high-level API* mit denselben Funktionalitäten.

## Referenz {#reference}

### `shallowRenderer.render()` {#shallowrendererrender}

Man kann sich shallowRenderer als den "Ort" vorstellen, in der man die Komponente testet, und von wo aus der Output der Komponente entnommen wird.

`shallowRenderer.render()` ist ähnlich wie [`ReactDOM.render()`](/docs/react-dom.html#render), nur dass es keinen DOM benötigt und nur einen Level tief rendert. Das bedeutet, dass man Komponenten isoliert von der Art und Weise wie deren Kinder-Komponenten implementiert werden, testen kann.

### `shallowRenderer.getRenderOutput()` {#shallowrenderergetrenderoutput}

Nachdem `shallowRenderer.render()` aufgerufen worden ist, bekommt man mit `shallowRenderer.getRenderOutput()` den flachen gerenderten Output.

Dann kann man anfangen, den Output zu testen.
