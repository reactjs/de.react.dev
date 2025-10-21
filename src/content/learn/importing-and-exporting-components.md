---
title: Komponenten importieren und exportieren
---

<Intro>

Der Zauber von Komponenten liegt in ihrer Wiederverwendbarkeit: Du kannst Komponenten erstellen, die aus anderen Komponenten zusammengesetzt sind. Wenn du jedoch immer mehr Komponenten verschachtelst, ist es oft sinnvoll, sie in verschiedene Dateien aufzuteilen. So bleiben deine Dateien übersichtlich und du kannst Komponenten an mehreren Stellen wiederverwenden.

</Intro>

<YouWillLearn>

* Was eine Root-Komponentendatei ist
* Wie man eine Komponente importiert und exportiert
* Wann man Standard- und benannte Importe und Exporte verwendet
* Wie man mehrere Komponenten aus einer Datei importiert und exportiert
* Wie man Komponenten in mehrere Dateien aufteilt

</YouWillLearn>

## Die Root-Komponentendatei {/*the-root-component-file*/}

In [Deine erste Komponente](/learn/your-first-component) hast du eine `Profile`-Komponente und eine `Gallery`-Komponente erstellt, die sie rendert:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Wunderbare Wissenschaftler</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

Diese befinden sich derzeit in einer **Root-Komponentendatei**, in diesem Beispiel `App.js` genannt. Je nach deiner Konfiguration könnte sich deine Root-Komponente in einer anderen Datei befinden. Wenn du ein Framework mit dateibasiertem Routing verwendest, wie Next.js, wird deine Root-Komponente für jede Seite unterschiedlich sein.

## Eine Komponente exportieren und importieren {/*exporting-and-importing-a-component*/}

Was wäre, wenn du in Zukunft die Startseite ändern und eine Liste von Wissenschaftsbüchern dort platzieren möchtest? Oder alle Profile an einer anderen Stelle unterbringen möchtest? Es macht Sinn, `Gallery` und `Profile` aus der Root-Komponentendatei herauszubewegen. Das macht sie modularer und in anderen Dateien wiederverwendbar. Du kannst eine Komponente in drei Schritten verschieben:

1. **Erstelle** eine neue JS-Datei, um die Komponenten dort hineinzulegen.
2. **Exportiere** deine Funktionskomponente aus dieser Datei (mit [Standard-](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export) oder [benannten](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_named_exports) Exporten).
3. **Importiere** sie in der Datei, in der du die Komponente verwenden wirst (mit der entsprechenden Technik zum Importieren von [Standard-](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#importing_defaults) oder [benannten](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#import_a_single_export_from_a_module) Exporten).

Hier wurden sowohl `Profile` als auch `Gallery` aus `App.js` in eine neue Datei namens `Gallery.js` verschoben. Jetzt kannst du `App.js` ändern, um `Gallery` aus `Gallery.js` zu importieren:

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
```

```js src/Gallery.js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Wunderbare Wissenschaftler</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

Beachte, wie dieses Beispiel jetzt in zwei Komponenten-Dateien aufgeteilt ist:

1. `Gallery.js`:
     - Definiert die `Profile`-Komponente, die nur innerhalb derselben Datei verwendet und nicht exportiert wird.
     - Exportiert die `Gallery`-Komponente als **Standardexport.**
2. `App.js`:
     - Importiert `Gallery` als **Standardimport** aus `Gallery.js`.
     - Exportiert die Root-`App`-Komponente als **Standardexport.**


<Note>

Du könntest auf Dateien stoßen, die die `.js`-Dateiendung weglassen, etwa so:

```js 
import Gallery from './Gallery';
```

Sowohl `'./Gallery.js'` als auch `'./Gallery'` funktionieren mit React, wobei ersteres näher an der Funktionsweise von [nativen ES-Modulen](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules) liegt.

</Note>

<DeepDive>

#### Standard- vs. benannte Exporte {/*default-vs-named-exports*/}

Es gibt zwei Hauptwege, um Werte mit JavaScript zu exportieren: Standardexporte und benannte Exporte. Bisher haben unsere Beispiele nur Standardexporte verwendet. Du kannst aber einen oder beide davon in derselben Datei verwenden. **Eine Datei kann nicht mehr als einen <em>Standard</em>export haben, aber sie kann so viele _benannte_ Exporte haben, wie du möchtest.**

![Standard- und benannte Exporte](/images/docs/illustrations/i_import-export.svg)

Wie du deine Komponente exportierst, bestimmt, wie du sie importieren musst. Du erhältst einen Fehler, wenn du versuchst, einen Standardexport auf dieselbe Weise zu importieren wie einen benannten Export! Diese Tabelle kann dir helfen, den Überblick zu behalten:

| Syntax           | Export-Anweisung                           | Import-Anweisung                          |
| -----------      | -----------                                | -----------                               |
| Standard  | `export default function Button() {}` | `import Button from './Button.js';`     |
| Benannt    | `export function Button() {}`         | `import { Button } from './Button.js';` |

Wenn du einen <em>Standard</em>import verwendest, kannst du nach `import` jeden Namen verwenden, den du möchtest. Du könntest zum Beispiel `import Banana from './Button.js'` schreiben und würdest trotzdem denselben Standardexport erhalten. Im Gegensatz dazu muss bei benannten Importen der Name auf beiden Seiten übereinstimmen. Deshalb heißen sie _benannte_ Importe!

**Oft werden Standardexporte verwendet, wenn die Datei nur eine Komponente exportiert, und benannte Exporte, wenn sie mehrere Komponenten und Werte exportiert.** Unabhängig davon, welchen Programmierstil du bevorzugst, gib deinen Komponentenfunktionen und den Dateien, die sie enthalten, immer aussagekräftige Namen. Komponenten ohne Namen wie `export default () => {}` werden nicht empfohlen, da sie das Debugging erschweren.

</DeepDive>

## Mehrere Komponenten aus derselben Datei exportieren und importieren {/*exporting-and-importing-multiple-components-from-the-same-file*/}

Was wäre, wenn du nur ein `Profile` anstatt einer Galerie anzeigen möchtest? Du kannst auch die `Profile`-Komponente exportieren. Aber `Gallery.js` hat bereits einen *Standard*export, und du kannst nicht _zwei_ Standardexporte haben. Du könntest eine neue Datei mit einem Standardexport erstellen, oder du könntest einen *benannten* Export für `Profile` hinzufügen. **Eine Datei kann nur einen Standardexport haben, aber sie kann zahlreiche benannte Exporte haben!**

<Note>

Um Verwechslungen zwischen Standard- und benannten Exporten zu vermeiden, legen sich manche Teams auf einen Stil fest, oder vermeiden, beide in derselben Datei zu verwenden. Mach, was für dich am besten funktioniert!

</Note>

Zuerst **exportiere** `Profile` aus `Gallery.js` mit einem benannten Export (ohne `default`-Schlüsselwort):

```js
export function Profile() {
  // ...
}
```

Dann **importiere** `Profile` aus `Gallery.js` nach `App.js` mit einem benannten Import (mit den geschweiften Klammern):

```js
import { Profile } from './Gallery.js';
```

Schließlich **rendere** `<Profile />` aus der `App`-Komponente:

```js
export default function App() {
  return <Profile />;
}
```

Jetzt enthält `Gallery.js` zwei Exports: einen Standard-`Gallery`-Export und einen benannten `Profile`-Export. `App.js` importiert beide. Probiere in diesem Beispiel, `<Profile />` durch `<Gallery />` zu ersetzen und anschließend wieder zurückzuändern:

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <Profile />
  );
}
```

```js src/Gallery.js
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Wunderbare Wissenschaftler</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

Jetzt verwendest du eine Mischung aus Standard- und benannten Exporten:

* `Gallery.js`:
  - Exportiert die `Profile`-Komponente als **benannten Export namens `Profile`.**
  - Exportiert die `Gallery`-Komponente als **Standardexport.**
* `App.js`:
  - Importiert `Profile` als **benannten Import namens `Profile`** aus `Gallery.js`.
  - Importiert `Gallery` als **Standardimport** aus `Gallery.js`.
  - Exportiert die Root-`App`-Komponente als **Standardexport.**

<Recap>

Auf dieser Seite hast du gelernt:

* Was eine Root-Komponentendatei ist
* Wie man eine Komponente importiert und exportiert
* Wann und wie man Standard- und benannte Importe und Exporte verwendet
* Wie man mehrere Komponenten aus derselben Datei exportiert

</Recap>



<Challenges>

#### Teile die Komponenten weiter auf {/*split-the-components-further*/}

Derzeit exportiert `Gallery.js` sowohl `Profile` als auch `Gallery`, was etwas verwirrend ist.

Verschiebe die `Profile`-Komponente in ihre eigene `Profile.js`-Datei und ändere dann die `App`-Komponente so, dass sie sowohl `<Profile />` als auch `<Gallery />` nacheinander rendert.

Du kannst entweder einen Standard- oder einen benannten Export für `Profile` verwenden, aber stelle sicher, dass du die entsprechende Import-Syntax sowohl in `App.js` als auch in `Gallery.js` verwendest! Du kannst dich auf die Tabelle aus dem obigen Eintauchen-Abschnitt beziehen:

| Syntax           | Export-Anweisung                           | Import-Anweisung                          |
| -----------      | -----------                                | -----------                               |
| Standard  | `export default function Button() {}` | `import Button from './Button.js';`     |
| Benannt    | `export function Button() {}`         | `import { Button } from './Button.js';` |

<Hint>

Vergiss nicht, deine Komponenten dort zu importieren, wo sie aufgerufen werden. Verwendet nicht auch `Gallery` die `Profile`-Komponente?

</Hint>

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <div>
      <Profile />
    </div>
  );
}
```

```js src/Gallery.js active
// Verschiebe mich nach Profile.js!
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Wunderbare Wissenschaftler</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```js src/Profile.js
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

Wenn es mit einer Exportart funktioniert, bring es anschließend auch mit der anderen zum Laufen.

<Solution>

Das ist die Lösung mit benannten Exporten:

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';
import { Profile } from './Profile.js';

export default function App() {
  return (
    <div>
      <Profile />
      <Gallery />
    </div>
  );
}
```

```js src/Gallery.js
import { Profile } from './Profile.js';

export default function Gallery() {
  return (
    <section>
      <h1>Wunderbare Wissenschaftler</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```js src/Profile.js
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

Das ist die Lösung mit Standardexporten:

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';
import Profile from './Profile.js';

export default function App() {
  return (
    <div>
      <Profile />
      <Gallery />
    </div>
  );
}
```

```js src/Gallery.js
import Profile from './Profile.js';

export default function Gallery() {
  return (
    <section>
      <h1>Wunderbare Wissenschaftler</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```js src/Profile.js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

</Solution>

</Challenges>
