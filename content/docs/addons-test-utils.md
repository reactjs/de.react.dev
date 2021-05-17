---
id: test-utils
title: Test-Utilities
permalink: docs/test-utils.html
layout: docs
category: Reference
---

**Import**

```javascript
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var ReactTestUtils = require('react-dom/test-utils'); // ES5 mit npm
```

## Übersicht {#overview}

`ReactTestUtils` bieten eine einfache Möglichkeit, React-Komponenten in einem Test-Framework deiner Wahl zu testen. Bei Facebook benutzen wir [Jest](https://facebook.github.io/jest/) für schmerzfreie Javascript-Tests. Du kannst das [React-Tutorial](https://jestjs.io/docs/tutorial-react) auf Jest's Webseite besuchen, um Jest zu lernen.

> Hinweis:
>
<<<<<<< HEAD
> Wir empfehlen die Verwendung der [React Testing Library](https://testing-library.com/react), die konzipiert wurde, um das Schreiben von Tests zu ermöglichen, in denen Komponenten auf die gleiche Weise verwendet werden wie von Endnutzern.
>
> Alternativ dazu gibt es von Airbnb eine Test-Utility namens [Enzyme](https://airbnb.io/enzyme/), mit der auf einfache Weise die Ausgabe von React-Komponenten zugesichert (asserted), manipuliert und durchlaufen werden kann.
=======
> We recommend using [React Testing Library](https://testing-library.com/react) which is designed to enable and encourage writing tests that use your components as the end users do.
> 
> For React versions <= 16, the [Enzyme](https://airbnb.io/enzyme/) library makes it easy to assert, manipulate, and traverse your React Components' output.


>>>>>>> abcf0358d43caa0772e599949458df9e6578489a

 - [`act()`](#act)
 - [`mockComponent()`](#mockcomponent)
 - [`isElement()`](#iselement)
 - [`isElementOfType()`](#iselementoftype)
 - [`isDOMComponent()`](#isdomcomponent)
 - [`isCompositeComponent()`](#iscompositecomponent)
 - [`isCompositeComponentWithType()`](#iscompositecomponentwithtype)
 - [`findAllInRenderedTree()`](#findallinrenderedtree)
 - [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass)
 - [`findRenderedDOMComponentWithClass()`](#findrendereddomcomponentwithclass)
 - [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag)
 - [`findRenderedDOMComponentWithTag()`](#findrendereddomcomponentwithtag)
 - [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype)
 - [`findRenderedComponentWithType()`](#findrenderedcomponentwithtype)
 - [`renderIntoDocument()`](#renderintodocument)
 - [`Simulate`](#simulate)

## Referenz {#reference}

### `act()` {#act}

Um eine Komponente für Assertionen vorzubereiten, setze den Code, der sie rendert und aktualisiert, in einen `act()`-Aufruf. Damit läuft der Test so ähnlich ab, wie React auch im Browser funktioniert.

> Hinweis
>
> Falls du `react-test-renderer` verwendest, kannst du dessen `act`-Export verwenden, der sich gleich verhält.

Stelle dir als Beispiel vor, du hast diese `Counter`-Komponente:

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.title = `Du hast ${this.state.count} Mal geklickt`;
  }
  componentDidUpdate() {
    document.title = `Du hast ${this.state.count} Mal geklickt`;
  }
  handleClick() {
    this.setState(state => ({
      count: state.count + 1,
    }));
  }
  render() {
    return (
      <div>
        <p>Du hast {this.state.count} Mal geklickt</p>
        <button onClick={this.handleClick}>
          Klick mich
        </button>
      </div>
    );
  }
}
```

So können wir sie testen:

```js{3,20-22,29-31}
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('kann einen Counter rendern und updaten', () => {
  // Erstes Rendern und componentDidMount testen
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('Du hast 0 Mal geklickt');
  expect(document.title).toBe('Du hast 0 Mal geklickt');

  // Zweites Rendern und componentDidUpdate testen
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('Du hast 1 Mal geklickt');
  expect(document.title).toBe('Du hast 1 Mal geklickt');
});
```

- Vergiss nicht, dass das Abschicken von DOM-Events nur funktioniert, wenn der DOM-Container zum `document` hinzugefügt wurde. Du kannst [`React Testing Library`](https://testing-library.com/react) zur Hilfe nehmen, um Boilerplate-Code zu reduzieren.

- Das [`recipes`](/docs/testing-recipes.html) Dokument enthält mehr Details dazu, wie sich `act()` verhält, mit Beispiele und Anwendungsgebieten.

* * *

### `mockComponent()` {#mockcomponent}

```javascript
mockComponent(
  componentClass,
  [mockTagName]
)
```

Übergebe dieser Methode ein gemocktes Komponenten-Modul, um es mit nützlichen Methoden zu erweitern, mit denen es als Dummy-React-Komponente verwendet werden kann. Anstatt wie üblich zu rendern, wird die Komponente zu einem einfachen `<div>` (oder zu einem anderen `Tag`, falls `mockTagName` angegeben wurde), das die ihr übergegebenen Children-Elemente enthält.

> Hinweis:
>
> `mockComponent()` ist eine veraltete API. Wir empfehlen, stattdessen [`jest.mock()`](https://facebook.github.io/jest/docs/en/tutorial-react-native.html#mock-native-modules-using-jestmock) zu verwenden.

* * *

### `isElement()` {#iselement}

```javascript
isElement(element)
```

Gibt `true` zurück, falls `element` ein React-Element ist.

* * *

### `isElementOfType()` {#iselementoftype}

```javascript
isElementOfType(
  element,
  componentClass
)
```

Gibt `true` zurück, falls `element` ein React-Element vom Typ React `componentClass` ist.

* * *

### `isDOMComponent()` {#isdomcomponent}

```javascript
isDOMComponent(instance)
```

Gibt `true` zurück, falls `instance` eine DOM-Komponente (z. B. ein `<div>` oder `<span>`) ist.

* * *

### `isCompositeComponent()` {#iscompositecomponent}

```javascript
isCompositeComponent(instance)
```

Gibt `true` zurück, falls `instance` eine benutzerdefinierte Komponente, z. B. eine Klasse oder Funktion, ist.

* * *

### `isCompositeComponentWithType()` {#iscompositecomponentwithtype}

```javascript
isCompositeComponentWithType(
  instance,
  componentClass
)
```

Gibt `true` zurück, falls `instance` eine Komponente vom Typ React `componentClass` ist.

* * *

### `findAllInRenderedTree()` {#findallinrenderedtree}

```javascript
findAllInRenderedTree(
  tree,
  test
)
```

Durchläuft alle Komponenten in `tree` und sammelt alle Komponenten, bei denen `test(component)` `true` ist. Das ist für sich allein genommen nicht besonders nützlich, wird aber als Primitive für andere Test-Utilities verwendet.

* * *

### `scryRenderedDOMComponentsWithClass()` {#scryrendereddomcomponentswithclass}

```javascript
scryRenderedDOMComponentsWithClass(
  tree,
  className
)
```

Findet alle DOM-Elemente von Komponenten im gerenderten Baum, bei denen der Klassennamen der Komponenten mit `className` übereinstimmt.

* * *

### `findRenderedDOMComponentWithClass()` {#findrendereddomcomponentwithclass}

```javascript
findRenderedDOMComponentWithClass(
  tree,
  className
)
```

Verhält sich wie [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass), erwartet aber genau ein Resultat und gibt dieses zurück. Gibt einen Fehler aus, falls es mehr oder weniger als eine Übereinstimmung gibt.

* * *

### `scryRenderedDOMComponentsWithTag()` {#scryrendereddomcomponentswithtag}

```javascript
scryRenderedDOMComponentsWithTag(
  tree,
  tagName
)
```

Findet alle DOM-Elemente von Komponenten im gerenderten Baum, bei denen der Tagname der Komponenten mit `tagName` übereinstimmt.

* * *

### `findRenderedDOMComponentWithTag()` {#findrendereddomcomponentwithtag}

```javascript
findRenderedDOMComponentWithTag(
  tree,
  tagName
)
```

Verhält sich wie [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag), erwartet aber genau ein Resultat und gibt dieses zurück. Gibt einen Fehler aus, falls es mehr oder weniger als eine Übereinstimmung gibt.

* * *

### `scryRenderedComponentsWithType()` {#scryrenderedcomponentswithtype}

```javascript
scryRenderedComponentsWithType(
  tree,
  componentClass
)
```

Findet alle Instanzen von Komponenten, deren Typ mit `componentClass` übereinstimmt.

* * *

### `findRenderedComponentWithType()` {#findrenderedcomponentwithtype}

```javascript
findRenderedComponentWithType(
  tree,
  componentClass
)
```

Verhält sich wie [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype), erwartet aber genau ein Resultat und gibt dieses zurück. Gibt einen Fehler aus, falls es mehr oder weniger als eine Übereinstimmung gibt.

***

### `renderIntoDocument()` {#renderintodocument}

```javascript
renderIntoDocument(element)
```

Rendert ein React-Element in einen separaten DOM-Knoten im Dokument. **Diese Funktion benötigt ein DOM.** Effektiv ist sie äquivalent zu:

```js
const domContainer = document.createElement('div');
ReactDOM.render(element, domContainer);
```

> Hinweis:
>
> `window`, `window.document` und `window.document.createElement` müssen global verfügbar sein, **bevor** du `React` importierst. Ansonsten denkt React, dass es nicht auf das DOM zugreifen kann, und Methoden wie `setState` werden nicht funktionieren.

* * *

## Andere Utilities {#other-utilities}

### `Simulate` {#simulate}

```javascript
Simulate.{eventName}(
  element,
  [eventData]
)
```

Simuliere das Abschicken eines Events auf einen DOM-Knoten mit optionalen `eventData`-Eventdaten.

`Simulate` hat eine Methode für [jedes Event, das React versteht](/docs/events.html#supported-events).

**Ein Element anklicken**

```javascript
// <button ref={(node) => this.button = node}>...</button>
const node = this.button;
ReactTestUtils.Simulate.click(node);
```

**Den Wert eines Input-Feldes verändern und dann ENTER drücken**

```javascript
// <input ref={(node) => this.textInput = node} />
const node = this.textInput;
node.value = 'Giraffe';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
```

> Hinweis
>
> Du musst jede Event-Eigenschaft angeben, die du in deiner Komponente verwendest (z. B. keyCode, which, etc.), da React keine davon für dich erstellt.

* * *
