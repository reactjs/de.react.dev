---
id: lists-and-keys
title: Listen und Schlüssel
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

Lass uns zuerst schauen, wie wir Listen in JavaScript transformieren können.

In dem untenstehenden Code verwenden wir die [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) Funktion um die Werte eines `Nummern`-Arrays zu verdoppeln. Wir weisen das von `map()` neu zurückgegebene Array der Variable `double` zu und loggen es:

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

Dieser Code schreibt `[2, 4, 6, 8, 10]` in die Konsole.

In React, ist das transformieren von Arrays in [Element](/docs/rendering-elements.html)-Listen nahezu identisch.

### Rendern meherer Komponenten {#rendering-multiple-components}

Du kannst Sammlungen von Elementen erstellen und diese mit geschweiften Klammern `{}` [in JSX einbinden](/docs/introducing-jsx.html#embedding-expressions-in-jsx).

Nachfolgend wird ein `Nummern`-Array mit Hilfe der JavaScript [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) Funktion. Wir geben für jeden Eintrag im Array ein `<li>` Element zurück. Schließlich weisen wir das Array der Variable `listItems` zu:

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

Wir fügen das gesamte `listItems` Array in ein `<ul>` Element, und [rendern es in das DOM](/docs/rendering-elements.html#rendering-an-element-into-the-dom):

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**Probiere es auf Codepen**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

Dieser Code stellt eine Liste von Aufzählungen von 1 bis 5 dar.

### Grundlegende Listen-Komponente {#basic-list-component}

Normalerweise würdest du Listen innerhalb einer [Komponente](/docs/components-and-props.html) rendern.

Wir können das vorherige Beispiel in eine Komponente überführen. Diese akzeptiert ein `Nummern`-Array und gibt dieses als Liste von Elementen aus.

```javascript{3-5,7,13}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

Wenn du diesen Code ausführst, dann wird dir eine Warnung angezeigt, die dir sagt, dass ein Schlüssel(key) für jedes Element der Liste bereitgestellt werden soll. Ein `key` ist ein spezielles String-Attribut, das bei der Erstellung von Elementlisten berücksichtigt werden muss. Wir werden im nächsten Abschnitt sehen, warum es wichtig ist.

Weisen wir nun innerhalb von `numbers.map()` das `key`-Attribut hinzu, um die Warnung des fehlenden Schlüssels zu beheben.

```javascript{4}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**Probiere es auf Codepen**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Schlüssel(Keys) {#keys}

Schlüssel helfen React zu erkennen, welche Elemente geändert, hinzugefügt oder gelöscht wurden. Schlüssel sollten Elementen in einem Array zugewiesen werden, um diesen eine beständige Identität zu geben:

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

Der beste Weg einen Schlüssel zu definieren, ist die Verwendung einen Strings, der das Listelemente eindeutig von seinen Geschwisterelementen unterscheiden lässt. Meistens würdest du IDs aus deinen Daten als Schlüssel nehmen:

```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

Wenn du keine IDs für die gerenderten Elemente hast, kannst du als letzte Maßnahme auch den Listenindex benutzen:

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Mache dies nur, wenn dir keine IDs zur Verfügung stehen
  <li key={index}>
    {todo.text}
  </li>
);
```

Wir empfehlen dir nicht die Indizes für die Schlüssel zu verwenden, da sich die Reihenfolge der Listeneinträge verändern kann. Dies kann sich negativ auf die Performance auswirken und zu Problemen mit dem Komponenten-State führen. Lese mehr darüber im Artikel von Robin Pokorny's über eine asuführliche Erklärung über die na
Check out Robin Pokorny's article for an [in-depth explanation on the negative impacts of using an index as a key](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318). If you choose not to assign an explicit key to list items then React will default to using indexes as keys.

Here is an [in-depth explanation about why keys are necessary](/docs/reconciliation.html#recursing-on-children) if you're interested in learning more.

### Extrahieren von Komponenten mit Schlüsseln {#extracting-components-with-keys}

Keys only make sense in the context of the surrounding array.

For example, if you [extract](/docs/components-and-props.html#extracting-components) a `ListItem` component, you should keep the key on the `<ListItem />` elements in the array rather than on the `<li>` element in the `ListItem` itself.

**Beispiel: Falsche Schlüsselverwendung**

```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**Beispiel: Richtige Schlüsselverwendung**

```javascript{2,3,9,10}
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**Probiere es auf Codepen**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

A good rule of thumb is that elements inside the `map()` call need keys.

### Schlüssel müssen nur bei Geschwistern eindeutig sein {#keys-must-only-be-unique-among-siblings}

Keys used within arrays should be unique among their siblings. However they don't need to be globally unique. We can use the same keys when we produce two different arrays:

```js{2,5,11,12,19,21}
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hallo Welt', content: 'Willkommen beim Lernen von React!'},
  {id: 2, title: 'Installation', content: 'Du kannst React via npm installieren.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[**Probiere es auf Codepen**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Keys serve as a hint to React but they don't get passed to your components. If you need the same value in your component, pass it explicitly as a prop with a different name:

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

With the example above, the `Post` component can read `props.id`, but not `props.key`.

### Einbetten von map() in JSX {#embedding-map-in-jsx}

In the examples above we declared a separate `listItems` variable and included it in JSX:

```js{3-6}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX allows [embedding any expression](/docs/introducing-jsx.html#embedding-expressions-in-jsx) in curly braces so we could inline the `map()` result:

```js{5-8}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**Probiere es auf Codepen**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

Sometimes this results in clearer code, but this style can also be abused. Like in JavaScript, it is up to you to decide whether it is worth extracting a variable for readability. Keep in mind that if the `map()` body is too nested, it might be a good time to [extract a component](/docs/components-and-props.html#extracting-components).
