---
id: lists-and-keys
title: Listen und Keys
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

Lass uns zuerst schauen, wie wir Listen in JavaScript transformieren können.

In dem untenstehenden Code verwenden wir die [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)-Funktion um die Werte eines `Nummern`-Arrays zu verdoppeln. Wir weisen das von `map()` neu zurückgegebene Array der Variable `double` zu und loggen es:

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

Dieser Code schreibt `[2, 4, 6, 8, 10]` in die Konsole.

In React ist das Transformieren von Arrays in [Element](/docs/rendering-elements.html)-Listen nahezu identisch.

### Rendern mehrerer Komponenten {#rendering-multiple-components}

Du kannst Sammlungen von Elementen erstellen und diese mit geschweiften Klammern `{}` [in JSX einbinden](/docs/introducing-jsx.html#embedding-expressions-in-jsx).

Nachfolgend wird ein `Nummern`-Array mit Hilfe der JavaScript [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)-Funktion durchlaufen. Wir geben für jeden Eintrag im Array ein `<li>` Element zurück. Schließlich weisen wir das Array der Variable `listItems` zu:

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

Wir fügen das gesamte `listItems`-Array in ein `<ul>`-Element und [rendern es in das DOM](/docs/rendering-elements.html#rendering-an-element-into-the-dom):

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**Auf CodePen ausprobieren**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

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

Wenn du diesen Code ausführst, dann wird dir eine Warnung angezeigt, die dir sagt, dass ein Key für jedes Element der Liste bereitgestellt werden soll. Ein `key` ist ein spezielles String-Attribut, das bei der Erstellung von Elementlisten berücksichtigt werden muss. Wir werden im nächsten Abschnitt sehen, warum es wichtig ist.

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

[**Auf CodePen ausprobieren**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Schlüssel (Keys) {#keys}

Schlüssel (im Weiteren Keys genannt) helfen React zu erkennen, welche Elemente geändert, hinzugefügt oder gelöscht wurden. Keys sollten Elementen in einem Array zugewiesen werden, um diesen eine beständige Identität zu geben:

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

Der beste Weg einen Key zu definieren, ist die Verwendung eines Strings, der das Listelemente eindeutig von seinen Geschwisterelementen unterscheiden lässt. Meistens würdest du IDs aus deinen Daten als Keys verwenden:

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

Wir empfehlen dir nicht die Indizes für die Keys zu verwenden, da sich die Reihenfolge der Listeneinträge verändern kann. Dies kann sich negativ auf die Performance auswirken und zu Problemen mit dem Komponenten-State führen. Im Artikel von Robin Pokorny kannst du eine [ausführlichere Erklärung über die negativen Auswirkungen beim Verwenden des Index als Key](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) finden. Wenn du Listenelemente keinen expliziten Key zuweist, verwendet React standardmäßig die Indizes als Key.

Wenn du dich dafür interessiert mehr zu lernen, ist hier [eine ausführliche Erklärung, warum Keys nötig sind](/docs/reconciliation.html#recursing-on-children).

### Extrahieren von Komponenten mit Keys {#extracting-components-with-keys}

Keys ergeben nur im Zusammenhang mit einem umgebenden Array Sinn.

Wenn du beispielsweise eine `ListItem`-Komponente [extrahierst](/docs/components-and-props.html#extracting-components), solltest du den Key auf das `<ListItem />`-Element im Array setzen und nicht auf das `<li>`-Element im `ListItem` selbst.

**Beispiel: Falsche Verwendung von Keys**

```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Falsch! Die Angabe des Keys ist hier nicht erforderlich:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Falsch! Der Key sollte hier angegeben werden:
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
  // Richtig! Die Angabe des Keys ist hier nicht erforderlich:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Richtig! Der Key sollte hier angegeben werden.
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

[**Auf CodePen ausprobieren**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

Eine gute Faustregel ist, dass Elemente innerhalb von `map()` einen Key benötigen.

### Keys müssen nur bei Geschwistern eindeutig sein {#keys-must-only-be-unique-among-siblings}

Keys, die in einem Array verwendet werden, sollten eindeutig unter ihren Geschwistern sein. Global müssen sie dies jedoch nicht. Man kann somit die gleichen Keys in zwei verschiedenen Arrays verwenden:

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

[**Auf CodePen ausprobieren**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Keys dienen React als Hinweise, aber werden nicht an die Komponente weitergegeben. Wenn du den gleichen Wert in deiner Komponente benötigst, dann übergib ihn explizit als Prop mit einem anderen Namen:

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

In dem obigen Beispiel kann die `Post`-Komponente `props.id` lesen, aber nicht `props.key`.

### Einbetten von map() in JSX {#embedding-map-in-jsx}

Im folgenden Beispiel deklarieren wir eine `listItems`-Variable und betten sie in JSX ein:

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

JSX erlaubt es, [jeden Ausdruck](/docs/introducing-jsx.html#embedding-expressions-in-jsx), der in geschweifte Klammern gesetzt wird, einzubetten. Somit können wir `map()` inline setzen:

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

[**Auf CodePen ausprobieren**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

Manchmal führt dies zu klarerem Code, aber dieser Stil kann ebenso missbraucht werden. Wie in JavaScript liegt es an dir zu entscheiden, ob es sich lohnt, eine Variable zur besseren Lesbarkeit zu benutzen. Behalte im Hinterkopf, dass wenn `map()` zu verschachtelt ist, es wahrscheinlich eine guter Zeitpunkt ist, diesen Code in eine [Komponente auszulagern](/docs/components-and-props.html#extracting-components).
