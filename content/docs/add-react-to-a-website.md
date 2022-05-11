---
id: add-react-to-a-website
title: React einer Webseite hinzufügen
permalink: docs/add-react-to-a-website.html
redirect_from:
  - "docs/add-react-to-an-existing-app.html"
prev: getting-started.html
next: create-a-new-react-app.html
---

Verwende so wenig oder so viel React wie du möchtest.

React wurde von Beginn an für eine schrittweise Benutzung konzipiert und du kannst so wenig oder so viel React benutzen, wie du möchtest. Vielleicht möchtest du zu einer existierenden Seite nur an wenigen Stellen ein paar kleine "Spritzer von Interaktivität" hinzufügen. React Komponenten sind perfekt dafür geeignet.

Die Mehrheit der Webseiten sind und brauchen keine SPAs zu sein. Probiere React in einem kleinen Teil deiner Webseite mit **ein paar Zeilen Code und ohne Build-Werkzeuge** aus. Dann kannst du die Verwendung entweder schrittweise erweitern oder auf ein paar dynamische Widgets beschränken.

---

- [Füge React in einer Minute hinzu](#add-react-in-one-minute)
- [Optional: Benutze React mit JSX](#optional-try-react-with-jsx) (Kein Bundler benötigt!)

## Füge React in einer Minute hinzu {#add-react-in-one-minute}

Wir wollen in diesem Abschnitt zeigen, wie man einer existierenden HTML Seite eine React Komponente hinzufügen kann. Um zu üben kannst du deine eigene Webseite benutzen oder eine leere HTML Seite erstellen. 

Es sind keine komplizierten Werkzeuge oder Installationen nötig -- **Um diesem Abschnitt zu folgen, brauchst du nur eine Internetverbindung und eine Minute deiner Zeit.**

Optional: [Komplettes Beispiel herunterladen (2KB gezippt)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/87f0b6f34238595b44308acfb86df6ea43669c08.zip)

### Schritt 1: Einen DOM Container dem HTML hinzufügen {#step-1-add-a-dom-container-to-the-html}

Öffne als erstes die HTML Seite, die du editieren möchtest. Füge ein leeres `<div>` Tag hinzu, um die Stelle zu markieren, an der du mit React etwas anzeigen möchtest. Zum Beispiel:

```html{3}
<!-- ... existierendes HTML ... -->

<div id="like_button_container"></div>

<!-- ... existierendes HTML ... -->
```

Wir haben diesem `div` ein eindeutiges `id` HTML Attribut gegeben. Das erlaubt es uns es später mit JavaScript wiederzufinden und darin eine React Komponente anzuzeigen.

>Tipp
>
>Du kannst einen "Container" `<div>` wie das oben **überall** im `<body>` Tag setzen. Du kannst so viele unabhängige DOM Container in einer Seite haben wie du brauchst. Normalerweise sind sie leer -- Falls die DOM Container Inhalt besitzen, wird React diesen überschreiben.

### Schritt 2: Füge die Script Tags hinzu {#step-2-add-the-script-tags}

Als nächstes fügen wir direkt vor dem schließenden `</body>` Tag drei `<script>` Tags der HTML Seite hinzu:

```html{5,6,9}
  <!-- ... anderes HTML ... -->

  <!-- React laden. -->
  <!-- Hinweis: Wenn du die Seite bereitstellen willst, ersetze "development.js" mit "production.min.js". -->
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

  <!-- Unsere React Komponente laden. -->
  <script src="like_button.js"></script>

</body>
```

Die ersten zwei Tags laden React. Der dritte läd deinen Komponenten Code.

### Schritt 3: Erstelle eine React Komponente {#step-3-create-a-react-component}

Erstelle eine Datei mit dem Namen `like_button.js` und speichere sie neben deiner HTML Seite.

Öffne **[den Starter Code](https://gist.github.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** und füge Sie in die Datei ein, die du erstellt hast.

>Tipp
>
>Dieser Code definiert eine React Komponente mit dem Namen `LikeButton`. Mach dir keine Sorgen, falls du das noch nicht verstehst -- Wir werden die Bausteine von React später in unserem [hands-on Tutorial](/tutorial/tutorial.html) und dem [Leitfaden der Hauptkonzepte](/docs/hello-world.html) behandeln. Jetzt wollen wir sie erstmal im Browser angezeigt bekommen!

Nach **[dem Starter Code](https://gist.github.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)**, füge zwei Zeilen am Ende von `like_button.js` an:

```js{3,4,5}
// ... Der Start Code, den du gerade eingefügt hast ...

const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));
```

Diese drei Codezeilen finden den `<div>` Container aus dem ersten Schritt und zeigen dann unsere React Komponente mit dem "Like" Button darin an.

### Das ist alles! {#thats-it}

Es gibt keinen vierten Schritt. **Du hast gerade deine erste React Komponente zu deiner Webseite hinzugefügt.**

Sieh dir die nächsten Abschnitte an, um mehr Tipps zu erhalten, wie du React integrieren kannst.

**[Öffne den ganzen Beispiel Source Code](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)**

**[Das komplette Beispiel herunterladen (2KB gezippt)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/87f0b6f34238595b44308acfb86df6ea43669c08.zip)**

### Tipp: Verwende Komponeten wieder {#tip-reuse-a-component}

Häufig wirst du React Komponenten an verschiedenen Stellen einer HTML Seite anzeigen wollen. Hier ist ein Beispiel, welches den "Like" Button dreimal anzeigt und einige Daten hinzufügt.

[Öffne den ganzen Beispiel Source Code](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda)

[Das komplette Beispiel herunterladen (2KB gezippt)](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda/archive/279839cb9891bd41802ebebc5365e9dec08eeb9f.zip)

>Hinweis
>
>Diese Herangehensweise ist besonders sinnvoll, wenn mit React gebaute Teile der Seite voneinander isoliert sind. In React Code selbst ist es einfacher stattdessen [Komponenten Komposition](/docs/components-and-props.html#composing-components) zu verwenden.

### Tipp: Minifiziere JavaScript für die Produktionsumgebung {#tip-minify-javascript-for-production}

Bevor du deine Webseite für die Produktionsumgebung deployst, denke daran, dass unminifiziertes JavaScript die Seite für deine User signifankt verlangsamen kann.

Falls du bereits die Anwendungsscripts minifiziert hast, **ist deine Seite fertig für die Produktionsumgebung**, sobald du sichergestellt hast, dass das bereitgestellte HTML die Versionen von React lädt, die auf `production.min.js` enden:

```js
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
```

Falls du deine Skripte nicht minifizierst, wird [hier wird ein möglicher Weg zur Minifizierung](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3) gezeigt. 

## Optional: Benutze React mit JSX {#optional-try-react-with-jsx}

In den Beispielen haben wir nur Funktionalitäten verwendet, die von Browsern nativ unterstützt werden. Deswegen haben wir einen Methodenaufruf in JavaScript benutzt, um React zu sagen, was angezeigt werden soll:

```js
const e = React.createElement;

// Zeige einen "Like" <button> an
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);
```

React bietet allerdings auch die Option an, stattdessen [JSX](/docs/introducing-jsx.html) zu benutzen.

```js
// Zeige einen "Like" <button> an
return (
  <button onClick={() => this.setState({ liked: true })}>
    Like
  </button>
);
```

Diese zwei Codebeispiele sind äquivalent. Obwohl **JSX [komplett optional](/docs/react-without-jsx.html) ist**, finden es viele Leute beim Schreiben von UI Code hilfreich -- sowohl mit React als auch mit anderen Bibliotheken.

Du kannst JSX mit [diesem Online Konverter](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.15.7) ausprobieren.

### Schnell JSX ausprobieren {#quickly-try-jsx}

Du kannst JSX in deinem Projekt am schnellsten ausprobieren, indem du diesen `<script>` Tag deiner Seite hinzufügst:

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

Jetzt kannst JSX in jedem `<script>` Tag verwenden, indem du diesem ein `type="text/babel"` Attribut hinzufügst. Hier kannst du [eine Besipiel HTML Datei mit JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html) herunterladen und mit ihr experimentieren.

Um zu lernen und einfache Demos zu bauen ist dieser Ansatz ausreichend. Allerdings macht er deine Webseite langsam und **ist nicht für die Produktionsumgebung geeignet**. Wenn du bereit bist weiter zu machen, entferne den neuen `<script>` Tag und das `type="text/babel"`, das du eben hinzugefügt hast. Im nächsten Abschnitt wirst du stattdessen einen JSX Präprozessor aufsetzen, der alle deine `<script>` Tags automatisch konvertiert.

### Füge JSX einem Projekt hinzu {#add-jsx-to-a-project}

Einem Projekt JSX hinzuzufügen benötigt keine komplizierten Werkzeuge wie einen Bundler oder einen Entwicklungsserver. JSX einbinden **ist ähnlich wie einen CSS Präprozessor einzubinden**. Als einzige Voraussetzung musst du [Node.js](https://nodejs.org/) auf deinem Computer installiert haben.

Navigiere im Terminal zu deinem Projektordner und führe diese zwei Befehle aus:

1. **Schritt 1:** Führe `npm init -y` aus (falls es fehlgeschlägt, [gibt es hier Hilfe](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. **Schritt 2:** Führe `npm install babel-cli@6 babel-preset-react-app@3` aus

>Tipp
>
>Wir **benutzen hier npm nur, um den JSX Präprozessor zu installieren;** Du wirst es für nichts anderes brauchen. Sowohl React als auch der Anwendungscode können ohne Änderung weiter als `<script>` Tags eingebunden werden.

Herzlichen Glückwunsch! Du hast gerade ein **JSX Setup** eingerichtet, das **für die Produktionsumgebung bereit ist**.

### Starte den JSX Präprozessor {#run-jsx-preprocessor}

Erzeuge einen Ordner mit dem Namen `src` und führe folgenden Befehl aus:

```
npx babel --watch src --out-dir . --presets react-app/prod
```

>Hinweis
>
>`npx` ist kein Schreibfehler --  es ist ein [Werkzeug um Pakete direkt auszuführen (package runner tool), welches seit npm 5.2 mitgeliefert wird](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)
>
>Falls du eine Fehlermeldung mit dem Text "You have mistakenly installed the `babel` package" siehst, hast du vielleicht den [vorherigen Schritt](#add-jsx-to-a-project) übersprungen. Führe diesen im gleichen Ordner aus und probier es nochmal.

Du brauchst nicht darauf zu warten, dass der Befehl fertig ausgeführt wird -- er startet einen automatisierten Watcher für JSX.

Wenn du jetzt eine Datei unter `src/like_button.js` mit diesem **[JSX Starter Code](https://gist.github.com/gaearon/c8e112dc74ac44aac4f673f2c39d19d1/raw/09b951c86c1bf1116af741fa4664511f2f179f0a/like_button.js)** erstellst, wird der Watcher eine präprozessierte `like_button.js` mit einfachem JavaScript Code erstellen, der im Browser ausgeführt werden kann. Wenn Sie die Quelldatei mit JSX bearbeiten, wird das Bauen der Datei automatisch erneut ausgeführt.

Zusätzlich kannst du durch diesen Ansatz moderne JavaScript Syntax Funktionalitäten wie Klassen verwenden, ohne dass dein Code in alten Browsern nicht funktionieren würde.

Falls du merkst, dass du im Umgang mit Build-Werkzeugen sicher wirst und du von ihnen mehr machen lassen willst, beschreibt [der nächste Abschnitt](/docs/create-a-new-react-app.html) einige der beliebtesten und zugänglichsten Ansammlungen von diesen. Falls aber nicht -- Script Tags sind genauso ok!
