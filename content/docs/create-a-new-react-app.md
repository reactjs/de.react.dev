---
id: create-a-new-react-app
title: Erstelle eine neue React Anwendung
permalink: docs/create-a-new-react-app.html
redirect_from:
  - "docs/add-react-to-a-new-app.html"
prev: add-react-to-a-website.html
next: cdn-links.html
---

Nutze integrierte Werkzeugketten für die beste Benutzer- und Entwicklererfahrung.

Diese Seite beschreibt einige beliebte Werkzeuge für React, die bei Aufgaben helfen wie:

* Auf viele Dateien und Komponenten skalieren.
* Drittbibliotheken von npm verwenden.
* Häufige Fehler früh erkennen.
* CSS und JS während der Entwicklung live editieren.
* Den Output für die Produktionsumgebung optimieren.

Die auf dieser Seite empfohlenen Werkzeuge **benötigen keine Konfiguration um loszulegen**.

## Du brauchst vielleicht keine Werkzeuge {#you-might-not-need-a-toolchain}

Falls du die oben beschriebenen Probleme nicht kennst oder dich noch nicht bei der Benutzung von JavaScript Werkzeugen wohlfühlst, überlege, [React als einfachen `<script>` Tag einer HTML Seite hinzuzufügen](/docs/add-react-to-a-website.html), optional [mit JSX](/docs/add-react-to-a-website.html#optional-try-react-with-jsx).

Das ist auch **der einfachste Weg, um React in eine existierende Webseite zu integrieren.** Falls du es hilfreich findest, kannst du immer eine größere Ansammlung von Werkzeugen hinzufügen!

## Empfohlene Werkzeuge {#recommended-toolchains}

Das React Team empfiehlt bevorzugt diese Lösungen:

- Wenn du **React lernst** oder **eine neue [Single Page](/docs/glossary.html#single-page-application) Anwendung** erstellst, dann benutze [Create React App](#create-react-app).
- Wenn du eine **vom Server gerenderte Webseite mit Node.js** baust, dann probier [Next.js](#nextjs).
- Wenn du eine **statische auf Inhalt orientierte Webseite baust**, dann probier [Gatsby](#Gatsby).
- Wenn du eine **Komponentenbibliothek** baust oder **mit einer existierenden Codebasis integrierst**, dann probiere [flexiblere Werkzeuge](#more-flexible-toolchains).

### Create React App {#create-react-app}

[Create React App](https://github.com/facebookincubator/create-react-app) ist eine komfortable Umgebung, um **React zu lernen** und ist der beste Weg, mit **einer neuen [Single Page](/docs/glossary.html#single-page-application) Anwendung** in React zu beginnen.

Es setzt deine Entwicklungsumgebung so auf, dass du die neuesten JavaScript Features benutzen kannst, eine angenehme Entwicklungserfahrung zur Verfügung hast und deine Anwendung für die Produktionsumgebung optimiert ist. Du benötigst dafür [Node >= 8.10 und npm >= 5.6](https://nodejs.org/en/) auf deinem Computer. Um ein Projekt zu erstellen, führen diese Befehle aus:

```bash
npx create-react-app meine-anwendung
cd meine-anwendung
npm start
```

>Hinweis
>
>`npx` in der ersten Zeile ist kein Schreibfehler -- es ist ein [Werkzeug, um Pakete direkt auszuführen (package runner tool), welches seit npm 5.2 mitgeliefert wird](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)

Create React App handhabt weder Backend-Logik noch Datenbanken; es erzeugt einfach nur eine Frontend Build Pipeline, so dass du es mit jedem gewünschten Backend verwenden kannst. Unter der Haube verwendet es [Babel](https://babeljs.io/) und [webpack](https://webpack.js.org/), aber darüber musst du nichts wissen.

Wenn du bereit bist auf die Produktionsumgebung zu deployen, führe `npm run build` aus. Dies erstellt einen optimierten Build für deine Anwendung im `build` Ordner. Du kannst mehr über Create React App [in der README](https://github.com/facebookincubator/create-react-app#create-react-app--) und dem [Benutzerhandbuch](https://facebook.github.io/create-react-app/) erfahren.

### Next.js {#nextjs}

[Next.js](https://nextjs.org/) ist ein beliebtes und leichtgewichtiges Framework für mit React gebaute, **statische und vom Server gerenderte Anwendungen**. Es beinhaltet **Styling- und Routinglösungen** out of the box und nimmt an, dass du als Serverumgebung [Node.js](https://nodejs.org/) verwendest.

Lerne Next.js durch den [offizielen Leitfaden](https://nextjs.org/learn/).

### Gatsby {#gatsby}

[Gatsby](https://www.gatsbyjs.org/) ist der beste Weg, um mit React **statische Webseiten** zu erstellen. Es lässt dich React Komponenten benutzen, erzeugt aber vorgerendertes HTML und CSS, um die schnellstmögliche Ladezeit zu garantieren.

Lerne Gatsby durch den [offiziellen Leitfaden](https://www.gatsbyjs.org/docs/) und einer [Galerie mit Starter Kits](https://www.gatsbyjs.org/docs/gatsby-starters/).

### Flexiblere Werkzeuge {#more-flexible-toolchains}

Die folgenden Werkzeuge bieten mehr Flexibilität und Freiheiten. Wir empfehlen sie für erfahrenere Benutzer:

- **[Neutrino](https://neutrinojs.org/)** kombiniert die Stärke von [webpack](https://webpack.js.org/) mit der Einfachheit von Voreinstellungen und bringt eine Voreinstellung für [React Anwendungen](https://neutrinojs.org/packages/react/) und [React Komponenten](https://neutrinojs.org/packages/react-components/) mit.

<<<<<<< HEAD
- **[Parcel](https://parceljs.org/)** ist ein schneller konfigurationsloser Bundler für Webanwendungen, der [mit React funktioniert](https://parceljs.org/recipes.html#react).
=======
- **[Nx](https://nx.dev/react)** is a toolkit for full-stack monorepo development, with built-in support for React, Next.js, [Express](https://expressjs.com/), and more.

- **[Parcel](https://parceljs.org/)** is a fast, zero configuration web application bundler that [works with React](https://parceljs.org/recipes.html#react).
>>>>>>> f81b909ce97dc253998a192f367551cb2b40d66f

- **[Razzle](https://github.com/jaredpalmer/razzle)** ist ein Framework für Server-Rendering. Es benötigt keine Konfiguration, bietet aber mehr Flexibilität als Next.js.

## Eine Werkzeugkette von Grund auf erstellen {#creating-a-toolchain-from-scratch}

Typischerweise besteht eine JavaScript Build Werkzeugkette aus:

* Einem **Paket Manager** wie [Yarn](https://yarnpkg.com/) oder [npm](https://www.npmjs.com/). Dadurch erhältst du Zugriff auf ein breites Ökosystem von Drittbibliotheken, die du einfach installieren oder aktualisieren kannst.

* Einem **Bundler** wie [webpack](https://webpack.js.org/) oder [Parcel](https://parceljs.org/). Das erlaubt dir modularen Code zu schreiben und ihn in kleine Pakete zu packen, um die Ladezeit zu optimieren.

* Einem **Compiler** wie [Babel](https://babeljs.io/). Erlaubt es dir modernen JavaScript Code zu schreiben, der trotzdem in alten Browsern funktioniert.

Falls du es bevorzugst deine eigene JavaScript Werkzeugkette von Grund auf aufzusetzen, [schau dir diesen Leitfaden an](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658), der Teile der Funktionalität von Create React App nachbaut.

Vergiss nicht dafür zu sorgen, dass deine eigene Werkzeugkette [korrekt für die Produktionsumgebung aufgesetzt](/docs/optimizing-performance.html#use-the-production-build) ist.
