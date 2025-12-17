---
title: Deine Erste Komponente
---

<Intro>

*Komponenten* sind eines der Kernkonzepte von React. Sie sind die Grundlage, auf der du Benutzeroberflächen (UI) erstellst, was sie zum perfekten Einstiegspunkt für deine React Reise macht!

</Intro>

<YouWillLearn>

* Was eine Komponente ist
* Welche Rolle Komponenten in einer React Anwendung spielen
* Wie du deine erste React Komponente schreibst

</YouWillLearn>

## Komponenten: UI Bausteine {/*components-ui-building-blocks*/}

Im Web erlaubt HTML uns strukturierte Dokumente mit den eingebauten Tags wie `<h1>` und `<li>` zu erstellen:

```html
<article>
  <h1>Meine Erste Komponente</h1>
  <ol>
    <li>Komponenten: UI Bausteine</li>
    <li>Eine Komponente Definieren</li>
    <li>Eine Komponente Nutzen</li>
  </ol>
</article>
```

Dieses Markup repräsentiert diesen Artikel `<article>`, seine Überschrift `<h1>`, und ein (abgekürztes) Inhaltsverzeichnis als eine geordnete Liste `<ol>`. Kombiniert mit CSS für das Styling und JavaScript für die Interaktivität, liegt Markup wie dieses hinter jeder Sidebar, jedem Avatar, jedes Modals, jedes Dropdown - jedes Stück UI, das du im Web siehst.

React lässt dich Markup, CSS, und JavaScript in benutzerdefinierte "Komponenten", **wiederverwendbare UI Elemente für deine Anwendung** kombinieren. Der Code für das Inhaltsverzeichnis, das du oben gesehen hast, könnte in eine `<TableOfContents />` Komponente umgewandelt werden, die du auf jeder Seite rendern könntest. Unter der Haube werden immer noch die gleichen HTML Tags wie `<article>`, `<h1>`, etc. verwendet.

Genau wie mit HTML Tags, kannst du Komponenten kombinieren, ordnen und verschachteln um ganze Seiten zu designen. Zum Beispiel ist die Dokumentationsseite, die du gerade liest, aus React Komponenten aufgebaut:


```js
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

Wenn den Projekt wächst, wirst du meken, dass viele deiner Designs durch das Wiederverwenden von Komponenten, die du bereits geschrieben hast, zusammengesetzt werden können was deinen Entwicklungsprozess beschleunigt. Unser Inhaltsverzeichnis oben könnte zu jeder Seite mit `<TableOfContents />` hinzugefügt werden! Du kannst deinem Projekt sogar mit tausenden Komponenten, die von der React Open Source Community geteilt werden, auf die Sprünge helfen, wie [Chakra UI](https://chakra-ui.com/) und [Material UI](https://material-ui.com/).

## Eine Komponente definieren {/*defining-a-component*/}

Traditionell haben Webentwickler ihre Inhalte strukturiert und haben dann Interaktivität hinzugefügt, indem sie etwas JavaScript "drüber gestreut" haben. Das hat gut funktioniert, als Interaktionen eine nette Ergänzung im Web waren. Jetzt wird es von vielen Seiten und allen Apps erwartet. React stellt Interaktivität an erste Stelle, während es immer noch die gleiche Technologie verwendet: **eine React Komponente ist eine JavaScript Funktion, die du mit Markup _bestreuen kannst_.** So sieht das aus (du kannst das Beispiel unten bearbeiten):

<Sandpack>

```js
export default function Profil() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
```

```css
img { height: 200px; }
```

</Sandpack>

Und so erstellst du eine Komponente:

### Schritt 1: Exportiere die Komponente {/*step-1-export-the-component*/}

The `export default` prefix is a [standard JavaScript syntax](https://developer.mozilla.org/docs/web/javascript/reference/statements/export) (not specific to React). It lets you mark the main function in a file so that you can later import it from other files. (More on importing in [Importing and Exporting Components](/learn/importing-and-exporting-components)!)
Das `export default` Präfix ist eine [Standard JavaScript Syntax](https://developer.mozilla.org/docs/web/javascript/reference/statements/export) (nicht spezifisch für React). Es lässt dich die Hauptfunktion in einer Datei markieren, damit du sie später von anderen Dateien importieren kannst. (Mehr über das Importieren in [Importieren und Exportieren von Komponenten](/learn/importing-and-exporting-components)!)

### Schritt 2: Definiere die Funktion {/*step-2-define-the-function*/}

Mit `function Profil() { }` definierst du eine JavaScript Funktion mit dem Namen `Profil`.

<Pitfall>

React Komponenten sind normale JavaScript Funktionen, aber **ihre Namen müssen mit einem Großbuchstaben beginnen** oder sie funktionieren nicht!

</Pitfall>

### Schritt 3: Markup hinzufügen {/*step-3-add-markup*/}

Die Komponente gibt ein `<img />` Tag mit `src` und `alt` Attributen zurück. `<img />` ist wie HTML geschrieben, aber unter der Haube handelt es sich eigentlich um JavaScript. Diese Syntax wird [JSX](/learn/writing-markup-with-jsx) genannt und sie erlaubt es dir Markup in JavaScript einzubetten.

Return Statements können in einer Zeile geschrieben werden, wie in dieser Komponente:


```js
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

Aber falls nicht dein gesamtes Markup in der gleichen Zeile wie das `return` keyword ist, musst du das Markup in ein Paar Klammern einschließen:

```js
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

<Pitfall>

Ohne Klammern wird jeglicher Code nach dem `return` [ignoriert](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)!

</Pitfall>

## Eine Komponente nutzen {/*using-a-component*/}

Da du nun deine `Profil` Komponente definiert hast, kannst du sie in anderen Komponenten nutzen. Zum Beispiel kannst du eine `Galerie` Komponente exportieren, die mehrere `Profil` Komponenten nutzt:

<Sandpack>

```js
function Profil() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Galerie() {
  return (
    <section>
      <h1>Großartige Wissenschaftlerinnen</h1>
      <Profil />
      <Profil />
      <Profil />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

### Was der Browser sieht {/*what-the-browser-sees*/}

Beachte den Unterschied in der Groß- und Kleinschreibung:

* `<section>` wird klein geschrieben, damit React weiß, dass wir uns auf einen HTML Tag beziehen.
* `<Profil />` beginnt mit einem Großbuchstaben `P`, damit React weiß, dass wir unsere Komponente `Profil` nutzen wollen.

Und `Profil` enthält sogar noch mehr HTML: `<img />`. Am Ende sieht der Browser das:

```html
<section>
  <h1>Großartige Wissenschaftlerinnen</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

### Verschachteln und Organisieren von Komponenten {/*nesting-and-organizing-components*/}

Komponenten sind normale JavaScript Funktionen, also kannst du mehrere Komponenten in der gleicen Datei haben. Das ist praktisch, wenn Komponenten relativ klein sind oder eng miteinander verbunden sind. Falls diese Datei zu voll wird, kannst du `Profil` immer in eine separate Datei verschieben. Du wirst gleich auf [der Seite über das Importieren](/learn/importing-and-exporting-components) lernen wie das geht.

Weil die `Profil` Komponenten - sogar mehrmals! - innerhalb der `Galerie` Komponente gerendert werden, können wir sagen, dass `Galerie` eine **Übergeordnete Komponente** ist, die jede `Profil` Komponente als "untergeordnete Komponente" rendert. Das ist ein Teil der Magie von React: du kannst eine Komponente einmal definieren und sie dann so oft und an so vielen Stellen nutzen wie du möchtest.

<Pitfall>

Komponten können andere Komponenten rendern, aber **du darfst ihre Definitionen niemals verschachteln:**

```js {2-5}
export default function Galerie() {
  // 🔴 Definiere niemals eine Komponente innerhalb einer anderen!
  function Profil() {
    // ...
  }
  // ...
}
```

Der Code-Schnipsel oben ist [sehr langsam und verursacht Fehler.](/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state) Definiere stattdessen jede Komponente in der obersten Ebene:

```js {5-8}
export default function Galerie() {
  // ...
}

// ✅ Definiere Komponenten in der obersten Ebene
function Profil() {
  // ...
}
```

Wenn eine untergeordnete Komponente Daten von einer übergeordneten Komponente benötigt, [übergebe sie als Parameter](/learn/passing-props-to-a-component) anstatt die Definitionen zu verschachteln.

</Pitfall>

<DeepDive>

#### Komponenten bis zum Ende {/*components-all-the-way-down*/}

Deine React Anwendung startet bei einer "root" Komponente. Normalerweise wird sie automatisch erstellt, wenn du ein neues Projekt startest. Zum Beispiel, wenn du [CodeSandbox](https://codesandbox.io/) nutzt oder das Framework [Next.js](https://nextjs.org/), wird die root Komponente in `pages/index.js` definiert. In diesen Beispielen hast du root Komponenten exportiert.

Die meisten React Anwendungn nutzen Komponenten bis zum Ende. Das bedeutet, dass du nicht nur Komponenten für wiederverwendbare Teile wie Buttons nutzt, sondern auch für größere Teile wie Sidebars, Listen und letztendlich komplette Seiten! Komponenten sind ein praktischer Weg um UI Code und Markup zu organisieren, selbst wenn einige von ihnen nur einmal genutzt werden.

[React basierte frameworks](/learn/start-a-new-react-project) gehen noch einen Schritt weiter. Anstatt eine leere HTML Datei zu nutzen und React "übernehmen" zu lassen, generieren sie *auch* das HTML automatisch aus deinen React Komponenten. Das erlaubt deiner Anwendung etwas Inhalt anzuzeigen bevor der JavaScript Code geladen wird.

Weiterhin nutzen viele Webseiten nur React um [Interaktivität zu bestehenden HTML Seiten hinzuzufügen.](/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page) Sie haben viele root Komponenten anstatt einer einzigen für die gesamte Seite. Du kannst so viel - oder so wenig - React nutzen wie du brauchst.

</DeepDive>

<Recap>

Du hast gerade deine erste Komponente erstellt! Lass uns nochmal die wichtigsten Punkte zusammenfassen.

* React lässt dich Komponenten erstellen, **wiederverwendbare UI Elemente für deine Anwendung.**
* In einer React Anwendung ist jedes Stück UI eine Komponente.
* React Komponenten sind normale JavaScript Funktionen, abgesehen davon:

  1. Sie müssen mit einem Großbuchstaben beginnen.
  2. Sie geben JSX-Markup zurück

</Recap>



<Challenges>

#### Exportiere die Komponente {/*export-the-component*/}

Dieser Sandkasten funktioniert nicht, weil die root Komponente nicht exportiert ist:

<Sandpack>

```js
function Profil() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

```css
img { height: 181px; }
```

</Sandpack>

Probiere es selbst zu korrigieren bevor du dir die Lösung ansiehst!

<Solution>

Füge `export default` vor der Funktionsdefinition hinzu:

<Sandpack>

```js
export default function Profil() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

```css
img { height: 181px; }
```

</Sandpack>

Vielleicht fragst du dich, warum es nicht reicht nur `export` zu schreiben. Den Unterschied zwischen `export` und `export default` lernst du in [Importieren und Exportieren von Komponenten.](/learn/importing-and-exporting-components)

</Solution>

#### Korrigiere das return Statement {/*fix-the-return-statement*/}

Irgendetwas stimmt mit diesem `return` Statement nicht. Kannst du es korrigieren?

<Hint>

Eventuell bekommst du einen "Unexpected token" Fehler während du versuchst das zu korrigieren. In diesem Fall, überprüfe, dass das Semikolon *nach* der schließenden Klammer steht. Ein Semikolon innerhalb von `return ( )` zu lassen wird einen Fehler verursachen.

</Hint>


<Sandpack>

```js
export default function Profil() {
  return
    <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img { height: 180px; }
```

</Sandpack>

<Solution>

Korrigiere diese Komponente, indem du das return Statement in eine Zeile schreibst:

<Sandpack>

```js
export default function Profil() {
  return <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img { height: 180px; }
```

</Sandpack>

Oder indem du das zurückgegebene JSX markup in KLaammern einschließt, die direkt nach `return` geöffnet werden:

<Sandpack>

```js
export default function Profil() {
  return (
    <img 
      src="https://i.imgur.com/jA8hHMpm.jpg" 
      alt="Katsuko Saruhashi" 
    />
  );
}
```

```css
img { height: 180px; }
```

</Sandpack>

</Solution>

#### Finde den Fehler {/*spot-the-mistake*/}

Irgendetwas stimmt mit der Deklaration und Nutzung der `Profil` Komponente nicht. Kannst du den Fehler finden? (Versuche dich daran zu erinnern, wie sich React Komponenten von regulären HTML Tags unterscheidet!)

<Sandpack>

```js
function profil() {
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
      <h1>Großartige Wissenschaftler</h1>
      <profil />
      <profil />
      <profil />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

<Solution>

React Komponenten müssen mit einem Großbuchstaben beginnen.

Ändere `function profil()` zu `function Profil()`, und ändere dann jedes `<profil />` zu `<Profil />`:

<Sandpack>

```js
function profil() {
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
      <h1>Großartige Wissenschaftler</h1>
      <profil />
      <profil />
      <profil />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

</Solution>

#### Deine eigene Komponente {/*your-own-component*/}

Schreibe deine eigene Komponente von Grund auf. Du kannst ihr irgendeinen zulässigen Namen geben und irgendwelches Markup zurückgeben. Wenn du keine Idee hast, kannst du eine `Gratulation` Kompontente schreiben, die `<h1>Gute Arbeit!</h1>` anzeigt. Vergiss nicht sie zu exportieren!

<Sandpack>

```js
// Schreibe deine Komponente hier unten!

```

</Sandpack>

<Solution>

<Sandpack>

```js
export default function Gratulation() {
  return (
    <h1>Gute Arbeit!</h1>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
