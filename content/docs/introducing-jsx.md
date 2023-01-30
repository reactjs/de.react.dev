---
id: introducing-jsx
title: Einführung in JSX
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

<<<<<<< HEAD
Betrachte die folgende Variablendeklaration:
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Writing Markup with JSX](https://beta.reactjs.org/learn/writing-markup-with-jsx)
> - [JavaScript in JSX with Curly Braces](https://beta.reactjs.org/learn/javascript-in-jsx-with-curly-braces)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

Consider this variable declaration:
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

```js
const element = <h1>Hallo Welt!</h1>;
```

Diese seltsame Tag-Schreibweise ist weder ein String noch HTML.

Dies ist eine syntaktische Erweiterung zu JavaScript und heißt JSX. Wir empfehlen sie zusammen mit React zu benutzen um zu beschreiben wie die Benutzeroberfläche (UI) aussehen soll. JSX mag vielleicht an eine Template-Sprache erinnern, besitzt jedoch den vollen Funktionsumfang von JavaScript.

JSX erzeugt React-Elemente "elements". Wie diese im DOM gerendert werden, behandeln wir im [nächsten Kapitel](/docs/rendering-elements.html). Weiter unten findest du die Grundlagen von JSX, die du zum Starten benötigst.

### Warum JSX? {#why-jsx}

React lebt den Fakt, dass die Logik des Renderings und andere UI-Logiken grundsätzlich miteinander verbunden sind: Wie Events behandelt werden, wie sich der State über die Zeit verändert und wie Daten für die Darstellung vorbereitet werden.

Anstelle von künstlich separierten *Technologien*, bei denen Markup und Logik in getrennten Dateien liegen, trennt React die Dateien [nach *Zuständigkeit*](https://en.wikipedia.org/wiki/Separation_of_concerns) auf und bindet die daraus resultierenden Einheiten in sogenannten Komponenten ("components") lose zusammen. Diese Komponenten enthalten sowohl Markup als auch Logik. Zu den Komponenten werden wir noch [in einem anderen Kapitel](/docs/components-and-props.html) mehr erfahren. Wenn Du dich immer noch unwohl dabei fühlst, Markup in JavaScript zu schreiben, dann schaue Dir doch am Besten [diesen Talk](https://www.youtube.com/watch?v=x7cQ3mrcKaY) an.

React [benötigt kein](/docs/react-without-jsx.html) JSX, aber die Meisten empfinden es als hilfreiches Werkzeug, wenn sie in JavaScript-Code an der UI arbeiten. Zusätzlich bietet es React die Möglichkeit, bessere Fehlermeldungen und Warnungen anzuzeigen.

Soviel zum Warum, lass uns starten!

### JavaScript-Ausdrücke in JSX {#embedding-expressions-in-jsx}

In dem folgenden Beispiel deklarieren wir eine Variable `name` und nutzen diese dann in JSX zwischen geschweiften Klammern.

```js{1,2}
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```

Jeder valide [JavaScript Ausdruck](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators) ist zwischen den geschweiften Klammern in JSX erlaubt. Zum Beispiel, `2 + 2`, `user.firstName`, oder `formatName(user)` sind völlig valide JavaScript Ausdrücke.

Im folgenden Beispiel geben wir das Ergebnis des JavaScript-Funktionsaufrufs `formatName(user)` direkt in das `<h1>` Element.

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hallo {formatName(user)}!
  </h1>
);
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/PGEjdG?editors=1010)**

Aus gründen der Lesbarkeit haben wir JSX auf mehrere Zeilen verteilt. Dies ist prinzipiell nicht notwendig und wenn man es macht, empfehlen wir, Klammern drumherum zu setzen, um etwaige Fehler durch das [automatische Einfügen von Semikolons](https://stackoverflow.com/q/2846283) zu vermeiden.

### JSX ist auch ein Ausdruck {#jsx-is-an-expression-too}

Nach dem Kompilieren werden JSX Ausdrücke als normale JavaScript-Funktionsaufrufe und als JavaScript-Objekte ausgewertet.

Das bedeutet, dass du JSX innerhalb von `if`-Blöcken und `for`-Schleifen verwenden, Variablen zuweisen, als Argument entgegennehmen oder aus einer Funktion zurückgeben kannst:

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Hallo {formatName(user)}!</h1>;
  }
  return <h1>Hallo Fremder.</h1>;
}
```

### Attribute mit JSX festlegen {#specifying-attributes-with-jsx}

Benutze Anführungszeichen um string-Literale als Attribute zu verwenden:

```js
const element = <a href="https://www.reactjs.org"> link </a>;
```

Ebenfalls kannst du geschweifte Klammern verwenden, um JavaScript-Ausdrücke in ein Attribut einzubinden:

```js
const element = <img src={user.avatarUrl}></img>;
```

Setze keine Anführungszeichen um geschweifte Klammern um JavaScript-Ausdrücke in ein Attribut einzubinden. Benutze entweder Anführungszeichen (für Strings) oder geschweifte Klammern (für Ausdrücke) aber nicht beides zusammen im selben Attribut.

>**Warnung:**
>
>Da JSX näher an JavaScript als an HTML ist, verwendet React DOM `camelCase` als Namenskonvention für Eigenschaften anstelle der für HTML typischen schreibweise.
>
>`class` wird in JSX zum Beispiel zu [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className), und `tabindex` zu [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex).

### Kind-Elemente mit JSX angeben {#specifying-children-with-jsx}

Ist ein Element leer, kannst du es wie in XML mit `/>` schließen:

```js
const element = <img src={user.avatarUrl} />;
```

JSX-Tags können Kind-Elemente enthalten:

```js
const element = (
  <div>
    <h1>Hallo!</h1>
    <h2>Schön dich hier zu sehen.</h2>
  </div>
);
```

### JSX verhindert Injection-Angriffe {#jsx-prevents-injection-attacks}

Nutzereingaben können über JSX sicher getätigt werden:

```js
const title = response.potentiallyMaliciousInput;
// Das dagegen ist abgesichert:
const element = <h1>{title}</h1>;
```

Standardmäßig [escaped](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) React DOM jeden in JSX eingebetteten Wert vor dem Darstellen. Damit wird sichergestellt, dass niemals etwas in die Anwendung gelangt, was nicht explizit so implementiert wurde. Alles wird zu einem String konvertiert und danach erst gerendert. Das hilft [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting)-Attakten vorzubeugen.

### JSX repräsentiert Objekte {#jsx-represents-objects}

Babel kompiliert JSX zu `React.createElement()`-Aufrufe.

Diese zwei Beispiele sind identisch:

```js
const element = (
  <h1 className="greeting">
    Hallo Welt!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hallo Welt!'
);
```

`React.createElement()` prüft erst die Eingabeparameter, um dich dabei zu unterstützen fehlerfrei zu programmieren, aber im Prinzip erstellt es ein Objekt wie dieses:

```js
// Hinweis: Dies ist eine vereinfachte Struktur
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hallo Welt!'
  }
};
```

Diese Objekte nennen sich "React elements". Stell sie dir als Beschreibung für das was du auf dem Bildschirm sehen willst, vor. React liest diese Objekte und verwendet sie um das DOM zu erstellen und es aktuell zu halten.

Im [nächsten Abschnitt](/docs/rendering-elements.html) gehen wir auf das Rendering von React-Elementen ins DOM ein.

>**Tipp:**
>
>Wir empfehlen das Verwenden der ["Babel" Sprachdefinition](https://babeljs.io/docs/en/next/editors) für den Editor deiner Wahl, sodass sowohl ES6 als auch JSX-Code vernünftig dargestellt werden kann.
