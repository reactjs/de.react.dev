---
title: Schnelleinstieg
---

<Intro>

Willkommen bei der React Dokumentation! Diese Seite gibt dir eine Einführung in die wichtigsten React-Konzepte, die du täglich verwenden wirst.

</Intro>

<YouWillLearn>

- Wie man Komponenten erstellt und verschachtelt
- Wie man Markup und Styles hinzufügt
- Wie man Daten anzeigt
- Wie man Bedingungen und Listen rendert
- Wie man auf Ereignisse reagiert und die Anzeige aktualisiert
- Wie man Daten zwischen Komponenten teilt

</YouWillLearn>

## Komponenten erstellen und verschachteln {/*komponenten*/}

React Anwendungen bestehen aus *Komponenten*. Eine Komponente ist ein Teil der Benutzeroberfläche (UI), der seine eigene Logik und sein eigenes Aussehen hat. Eine Komponente kann so klein wie ein Button oder so groß wie eine ganze Seite sein.

React Komponenten sind JavaScript Funktionen, die Markup zurückgeben:

```js
function MyButton() {
  return (
    <button>Ich bin ein Button</button>
  );
}
```

Jetzt, da du `MyButton` deklariert hast, kannst du ihn in eine andere Komponente einbetten:

```js {5}
export default function MyApp() {
  return (
    <div>
      <h1>Willkommen zu meiner Anwendung</h1>
      <MyButton />
    </div>
  );
}
```

Beachte, dass `<MyButton />` mit einem Großbuchstaben beginnt. So weißt du, dass es sich um eine React Komponente handelt. React Komponentennamen müssen immer mit einem Großbuchstaben beginnen, während HTML-Tags kleingeschrieben werden müssen.

Schau dir das Ergebnis an:

<Sandpack>

```js
function MyButton() {
  return (
    <button>
      Ich bin ein Button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Willkommen zu meiner Anwendung</h1>
      <MyButton />
    </div>
  );
}
```

</Sandpack>

Das `export default` Schlüsselwort gibt die Hauptkomponente in der Datei an. Wenn du mit einer bestimmten JavaScript-Syntax nicht vertraut bist, haben [MDN](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) und [javascript.info](https://javascript.info/import-export) tolle Referenzen.

## JSX Markup schreiben {/*jsx-markup-schreiben*/}

Die Markup Syntax die du oben gesehen hast, wird *JSX* genannt. Sie ist optional, aber die meisten React Projekte verwenden JSX wegen seiner Bequemlichkeit. Alle [Tools, die wir für die lokale Entwicklung empfehlen](/learn/installation) unterstützen JSX von Haus aus.

JSX ist strenger als HTML. Du musst Tags wie `<br />` schließen. Deine Komponente kann auch nicht mehrere JSX-Tags zurückgeben. Du musst sie in einen gemeinsamen Eltern-Tag wie `<div>...</div>` oder einen leeren `<>...</>` Wrapper einwickeln:

```js {3,6}
function AboutPage() {
  return (
    <>
      <h1>Über uns</h1>
      <p>Hallo zusammen.<br />Wie geht es euch?</p>
    </>
  );
}
```

Wenn du viel HTML zu JSX umwandeln musst, kannst du einen [Online Konverter](https://transform.tools/html-to-jsx) verwenden.

## Styles hinzufügen {/*styles-hinzufügen*/}

In React gibst du eine CSS-Klasse mit `className` an. Es funktioniert genauso wie das HTML [`class`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) Attribut:

```js
<img className="avatar" />
```

Dann schreibst du die CSS Regeln in eine separate CSS Datei:

```css
/* In deiner CSS Datei */
.avatar {
  border-radius: 50%;
}
```

React schreibt dir nicht vor, wie du deine CSS Dateien hinzufügst. Im einfachsten Fall fügst du ein [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) Tag zu deinem HTML hinzu. Wenn du ein Build-Tool oder ein Framework verwendest, schau dir dessen Dokumentation an, um zu erfahren, wie du eine CSS Datei zu deinem Projekt hinzufügst.

## Daten anzeigen {/*daten-anzeigen*/}

Mit JSX kannst du deinem JavaScript Markup hinzufügen. Geschweifte Klammern lassen dich zu JavaScript "zurückkehren", so dass du eine Variable aus deinem Code einbetten und sie dem Benutzer anzeigen kannst. Zum Beispiel wird `user.name` angezeigt:

```js {3}
return (
  <h1>
    {user.name}
  </h1>
);
```

Du kannst auch von JSX Attributen zu JavaScript "zurückkehren", aber du musst geschweifte Klammern *anstatt von* Anführungszeichen verwenden. Zum Beispiel übergibt `className="avatar"` den String `"avatar"` als CSS Klasse, aber `src={user.imageUrl}` liest die JavaScript Variable `user.imageUrl` aus und übergibt dann diesen Wert als `src` Attribut:

```js {3,4}
return (
  <img
    className="avatar"
    src={user.imageUrl}
  />
);
```

Du kannst auch komplexere Ausdrücke innerhalb von JSX geschweiften Klammern verwenden, zum Beispiel [String Konkatenation](https://javascript.info/operators#string-concatenation-with-binary):

<Sandpack>

```js
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Foto von ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

```css
.avatar {
  border-radius: 50%;
}

.large {
  border: 4px solid gold;
}
```

</Sandpack>

`style={{}}` im obigen Beispiel ist keine spezielle Syntax, sondern ein reguläres `{}` Objekt innerhalb der `style={ }` JSX geschweiften Klammern. Du kannst das `style` Attribut verwenden, wenn deine Styles von JavaScript Variablen abhängen.
## Bedingtes Rendern {/*bedingtes-renden*/}

In React gibt es keine spezielle Syntax um Bedingungen zu schreiben. Stattdessen verwendest du die gleichen Techniken wie beim Schreiben von regulärem JavaScript Code. Zum Beispiel kannst du eine [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) Anweisung verwenden, um JSX bedingt zu rendern:

```js
let content;
if (isLogged) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```

Wenn du kompakteren Code bevorzugst, kannst du den [Ternary `?` Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) verwenden. Im Gegensatz zu `if` funktioniert er auch innerhalb von JSX:

```js
<div>
  {isLogged ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

Wenn du den `else` Zweig nicht brauchst, kannst du auch eine kürzere [logische `&&` Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#short-circuit_evaluation) verwenden:

```js
<div>
  {isLogged && <AdminPanel />}
</div>
```

Die selben Ansätze funktionieren auch, wenn du Attribute bedingt verwenden möchtest. Wenn du mit dieser JavaScript Syntax nicht vertraut bist, kannst du damit beginnen, immer `if...else` zu verwenden.

## Listen rendern {/*listen-rendern*/}

Um Listen von Komponenten zu rendern, kannst du eine [`for` Schleife](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) oder die [Array `map()` Funktion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) verwenden.

Nehmen wir an, dass du ein Array von Produkten hast:

```js
const products = [
  { title: 'Kohl', id: 1 },
  { title: 'Knoblauch', id: 2 },
  { title: 'Apfel', id: 3 },
];
```

Nutze die `map()` Funktion, um ein Array von Produkten in ein Array von `<li>` Elementen zu transformieren:

```js
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```

Beachte, wie jedes `<li>` ein `key` Attribut hat. Für jedes Element in einer Liste solltest du einen String oder eine Zahl übergeben, das dieses Element eindeutig unter seinen Geschwister Elementen identifiziert. Normalerweise sollte ein key aus deinen Daten stammen, wie z.B. eine Datenbank ID. React verwendet deine keys, um zu wissen, was passiert ist, wenn du später Elemente einfügst, löschst oder neu anordnest.

<Sandpack>

```js
const products = [
  { title: 'Kohl', isFruit: false, id: 1 },
  { title: 'Knoblauch', isFruit: false, id: 2 },
  { title: 'Apfel', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
```

</Sandpack>

## Auf Ereignisse reagieren {/*auf-ereignisse-reagieren*/}

Du kannst auf Ereignisse reagieren, indem du *event handler* Funktionen innerhalb deiner Komponenten deklarierst:

```js {2-4,7}
function MyButton() {
  function handleClick() {
    alert('Du hast mich gedrückt!');
  }

  return (
    <button onClick={handleClick}>
      Drück mich
    </button>
  );
}
```

Beachte, wie `onClick={handleClick}` keine Klammern am Ende hat! Rufe die Event Handler Funktion nicht auf: du musst sie nur *übergeben*. React wird deinen Event Handler aufrufen, wenn der Benutzer auf den Button klickt.

## Anzeige aktualisieren {/*anzeige-aktualisieren*/}

Oft möchtest du, dass deine Komponente sich an Informationen erinnert und sie anzeigt. Zum Beispiel möchtest du vielleicht die Anzahl der Klicks auf einen Button zählen. Um dies zu tun, füge *state* zu deiner Komponente hinzu.

Als Erstes musst du [`useState`](/reference/react/useState) aus React importieren:

```js
import { useState } from 'react';
```

Jetzt kannst du eine *state Variable* innerhalb deiner Komponente deklarieren:

```js
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
```

Du bekommst zwei Dinge von `useState`: den aktuellen state (`count`) und die Funktion, die es dir ermöglicht, ihn zu aktualisieren (`setCount`). Du kannst den beiden Dingen beliebige Namen geben, aber die Konvention ist es, `[something, setSomething]` zu schreiben.

Wenn der Button das erste Mal angezeigt wird, wird `count` `0` sein, weil du `0` an `useState()` übergeben hast. Wenn du den state ändern möchtest, rufe `setCount()` auf und übergebe den neuen Wert. Wenn du auf diesen Button klickst, wird der Zähler erhöht:

```js {5}
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      {count} mal gedrückt
    </button>
  );
}
```

React wird deine Komponenten Funktion erneut aufrufen. Dieses Mal wird `count` `1` sein. Danach wird es `2` sein. Und so weiter.

Wenn du die selbe Komponente mehrmals renderst, wird jede ihren eigenen state haben. Klicke jeden Button einzeln:

<Sandpack>

```js
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Counter, die seperaten state haben</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      {count} mal gedrückt
    </button>
  );
}
```

```css
button {
  display: block;
  margin-bottom: 5px;
}
```

</Sandpack>

Beachte, wie jeder Button sich seinen eigenen `count` state "merkt" und andere Buttons nicht beeinflusst.

## Hooks benutzen {/*hooks-benutzen*/}

Funktionen die mit `use` beginnen, werden *Hooks* genannt. `useState` ist ein eingebauter Hook, der von React bereitgestellt wird. Du kannst andere eingebaute Hooks in der [API Referenz](/reference/react) finden. Du kannst auch deine eigenen Hooks schreiben, indem du die existierenden kombinierst.

Hooks sind restriktiver als andere Funktionen. Du kannst Hooks nur *auf höchster Ebene* deiner Komponenten (oder anderen Hooks) aufrufen. Wenn du `useState` in einer Bedingung oder einer Schleife verwenden möchtest, extrahiere eine neue Komponente und platziere sie dort.

## Daten zwischen Komponenten teilen {/*daten-zwischen-komponenten-teilen*/}

Im vorherigen Beispiel hatte jedes `MyButton` seinen eigenen unabhängigen `count`, und wenn jeder Button geklickt wurde, änderte sich nur der `count` für den geklickten Button:

<DiagramGroup>

<Diagram name="sharing_data_child" height={367} width={407} alt="Diagramm, dass einen Baum von drei Komponenten zeigt, ein Parent ist MyApp und zwei Kinder sind MyButton. Beide MyButton Komponenten enthalten einen count mit dem Wert null.">

Zu Beginn ist der `count` state jeder `MyButton` Komponente `0`

</Diagram>

<Diagram name="sharing_data_child_clicked" height={367} width={407} alt="Dasselbe Diagramm wie zuvor, wobei der `count` der ersten `MyButton` Komponente hervorgehoben ist, was auf einen Klick hinweist, wobei der `count` Wert auf `1` erhöht wird. Die zweite `MyButton` Komponente enthält immer noch den Wert `0`." >

Die erste `MyButton` Komponente aktualisiert ihren `count` auf `1`

</Diagram>

</DiagramGroup>

Oft benötigst du jedoch Komponenten, die *Daten teilen und immer zusammen aktualisiert werden*.

Um beide `MyButton` Komponenten den selben `count` anzeigen zu lassen und zusammen zu aktualisieren, musst du den state von den einzelnen Buttons "nach oben" zur nächsten Komponente, die alle enthält, verschieben.

In diesem Beispiel ist es `MyApp`:

<DiagramGroup>

<Diagram name="sharing_data_parent" height={385} width={410} alt="Diagramm, dass einen Baum von drei Komponenten zeigt, ein Parent ist MyApp und zwei Kinder sind MyButton. MyApp enthält einen count mit dem Wert null, der an beide MyButton Komponenten weitergegeben wird, die ebenfalls den Wert null anzeigen." >

Zu Beginn ist der `count` state jeder `MyButton` Komponente `0`

</Diagram>

<Diagram name="sharing_data_parent_clicked" height={385} width={410} alt="Dasselbe Diagramm wie zuvor, wobei der `count` des ersten `MyButton` Komponente hervorgehoben ist, was auf einen Klick hinweist, wobei der `count` Wert auf `1` erhöht wird. Der Fluss an beide `MyButton` Komponenten wird ebenfalls hervorgehoben, und der `count` Wert in jeder Komponente wird auf `1` gesetzt, was anzeigt, dass der Wert weitergegeben wurde." >

Beim Drücken eines Buttons aktualisiert `MyApp` seinen `count` state auf `1` und gibt ihn an beide Kinder weiter

</Diagram>

</DiagramGroup>

Wenn du jetzt auf einen der Buttons klickst, wird der `count` in `MyApp` geändert, was beide `MyButton` Komponenten ändert. So kannst du das in Code ausdrücken.

Zuerst *verschiebe den state* von `MyButton` *nach oben* zu `MyApp`:

```js {2-6,18}
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counter, die sich zusammen ändern</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  // ... wir verschieben den Code von hier
}

```

Dann *geben wir den state* von `MyApp` an jedes `MyButton` weiter, zusammen mit dem gemeinsamen click handler. Du kannst Informationen an `MyButton` mit den JSX geschweiften Klammern weitergeben, genau wie du es zuvor mit eingebauten Tags wie `<img>` gemacht hast:

```js {11-12}
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counter, die sich zusammen ändern</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
```

Die Informationen, die du so weitergibst, werden *props* genannt. Jetzt enthält die `MyApp` Komponente den `count` state und den `handleClick` Event Handler, und *gibt beide als props* an jeden Button weiter.

Zuletzt, ändere `MyButton` so um, dass du die props *lesen* kannst, die du von der Parent Komponente übergeben hast:

```js {1,3}
function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      {count} mal gedrückt
    </button>
  );
}
```

Wenn du den Button drückst, wird der `onClick` event handler aufgerufen. Jeder Button hat als `onClick` prop die `handleClick` Funktion von `MyApp`, sodass dieser Code läuft. Dieser Code ruft `setCount(count + 1)` auf und erhöht die `count` state Variable. Der neue `count` Wert wird als prop an jeden Button weitergegeben, sodass sie alle den neuen Wert anzeigen. Dies wird "lifting state up" genannt. Indem du den state nach oben verschiebst, hast du ihn zwischen Komponenten geteilt.

<Sandpack>

```js
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counter die sich zusammen ändern</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      {count} mal gedrückt
    </button>
  );
}
```

```css
button {
  display: block;
  margin-bottom: 5px;
}
```

</Sandpack>

## Next Steps {/*next-steps*/}

Jetzt kennst du die Grundlagen, wie man React Code schreibt!

Schau dir das [Tutorial](/learn/tutorial-tic-tac-toe) an, um sie in die Praxis umzusetzen und deine erste Mini-App mit React zu bauen.
