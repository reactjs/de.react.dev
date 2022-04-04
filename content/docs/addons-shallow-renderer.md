---
id: shallow-renderer
title: Shallow Renderer
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

Wenn du zum Beispiel folgende Komponente hast:

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

Flaches Rendering hat derzeit die Einschränkung, dass refs nicht unterstützt werden.

> Hinweis:
>
> Wir empfehlen auch, sich die [Shallow Rendering API](https://airbnb.io/enzyme/docs/api/shallow.html) von Enzyme anzusehen. Sie stellt eine angenehmere *übergeordnete API* mit den gleichen Funktionalitäten bereit.


## Referenz {#reference}

### `shallowRenderer.render()` {#shallowrendererrender}

Du kannst dir den shallowRenderer als den "Ort" vorstellen an dem die zu testende Komponente gerendert wird, und du daraus die Ausgabe der Komponente entnehmen kannst.

<<<<<<< HEAD
`shallowRenderer.render()` ist ähnlich wie [`ReactDOM.render()`](/docs/react-dom.html#render), nur dass es kein DOM benötigt und nur einen Level tief rendert. Das bedeutet, dass du Komponenten abgegrenzt testen kannst, unabhängig davon wie die Kind-Komponenten implementiert sind.
=======
`shallowRenderer.render()` is similar to [`root.render()`](/docs/react-dom-client.html#createroot) but it doesn't require DOM and only renders a single level deep. This means you can test components isolated from how their children are implemented.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

### `shallowRenderer.getRenderOutput()` {#shallowrenderergetrenderoutput}

Nachdem `shallowRenderer.render()` aufgerufen wurde, kannst du dir mit `shallowRenderer.getRenderOutput()` die flach gerenderte Ausgabe zurückgeben lassen.

Dann kann man anfangen, die Ausgabe zu testen.
