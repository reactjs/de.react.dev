---
title: React zu einem bestehenden Projekt hinzufügen
---

<Intro>

Wenn du zustäzliche Interaktivität zu deinem bestehenden Projekt hinzufügen möchtest, musst du es nicht komplett neu in React schreiben. Integriere React in dein vorhandenes Projekt und render überall interaktive React-Komponente.

</Intro>

<Note>

**Für die lokale Entwicklung muss [Node.js](https://nodejs.org/en/) installiert sein.** Obwohl du online oder mit einer einfachen HTML-Seite [React testen](/learn/installation#try-react) kannst, benötigt man für die meisten JavaScript-Tools, die man zum Entwickeln verwendet, Node.js.

</Note>

## React für eine ganze Subroute einer bestehenden Webseite verwenden {/*using-react-for-an-entire-subroute-of-your-existing-website*/}

Lass uns annehmen, du hast eine bestehende Webseite auf `example.com`, die mit einer anderen Servertechnologie (z.B. Rails) erstellt wurde und du willst nun alle 
Routen, die mit `example.com/deine-app/` beginnen vollständig mit React implementieren.

In diesem Fall empfehlen wir dir folgende Schritte:

1. **Erstelle den Teil der App, die mit React umgesetzt weren soll**, indem du eines der [auf React basierenden Frameworks](/learn/start-a-new-react-project) verwendest.
2. **Definiere `/deine-app` als *base path*** in der Konfiguration deines Framework's ( [Next.js](https://nextjs.org/docs/api-reference/next.config.js/basepath), [Gatsby](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/)).
3. **Konfiguriere deinen Server oder Proxy** so, dass alle Anfragen an `/deine-app/` von der React-Anwendung verarbeitet werden.

Damit ist sichergestellt, dass der React Teil der Anwendung von den [bewährten Praktiken](/learn/start-a-new-react-project#can-i-use-react-without-a-framework) profitieren kann, die in diese Frameworks eingebaut sind.

Viele der auf React basierenden Frameworks sind Fullstack und ermöglichen es deiner Anwendung den Server zu verwenden. Man kann den gleichen Ansatz aber auch verwenden, wenn man auf dem Server kein JavaScript ausführen kann oder will. In diesem Fall stellt man den HTML/CSS/JS export ([`next export`](https://nextjs.org/docs/advanced-features/static-html-export) für Next.js, default für Gatsby) unter `/deine-app/` bereit.

## React für einen Teil deiner bestehenden Seite verwenden {/*using-react-for-a-part-of-your-existing-page*/}

Nehmen wir an, du hast eine bestehende Seite, die mit einer anderen Technologie erstellt wurde (entweder mit einer Server-Technologie wie Rails oder einer Client-Technologie wie Backbone), und du möchtest interaktive React-Komponenten irgendwo auf dieser Seite darstellen. Das ist ein weit verbreiteter Weg, um React zu integrieren -
tatsächlich war dies über viele Jahre die am häufigsten verwendete Art React bei Meta einzusetzen!

Du kannst das in zwei Schritten tun:

1. **JavaScript Umgebung einrichten** damit man die [JSX syntax](/learn/writing-markup-with-jsx) verwenden kann, um Code mit der [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) / [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) Syntax in Module aufzuteilen und um Pakete (wie z.B. React) aus der [npm](https://www.npmjs.com/) Registry zu nutzen.
2. **Rendere deine React-Komponente** dort, wo du sie sehen möchtest.

Die konkrete Vorgehensweise hängt von deiner bestehenden Einrichtung ab, deshalb lass uns ein paar Details durchgehen.

### Step 1: Setze eine modulare JavaScript-Umgebung auf {/*step-1-set-up-a-modular-javascript-environment*/}

Eine modulare JavaScript-Umgebung ermöglicht es dir, deine React-Komponenten in einzelnen Dateien zu definieren, anstatt deinen gesamten Code in eine einzige Datei zu schreiben. Außerdem kannst du all die wunderbaren Pakete verwenden, die von anderen Entwicklern in der [npm](https://www.npmjs.com/) Registry veröffentlicht wurden - einschließlich React selbst! Wie du das machen kannst, ist abhängig von deiner bestehenden Konfiguration:

* **Wenn die Anwendung bereits in Dateien aufgeteilt ist, die `import` Statements benutzen**, versuche deine bestehende Konfiguration zu verwenden. Schreib in deinen JS Code ein `<div/>` und prüfe, ob das einen Syntaxfehler verursacht. Sollte dabei ein Syntaxfehler auftreten musst du [deinen Code vermutlich mit Babel umwandeln](https://babeljs.io/setup) und zudem die [Babel React Voreinstellung](https://babeljs.io/docs/babel-preset-react) aktivieren, um JSX nutzen zu können.

* **Wenn die Anwendung noch nicht für das Kompilieren von JavaScript-Modulen eingerichtet ist**, richte es mit [Vite](https://vitejs.dev/) ein. Die Vite Community pflegt [viele Integrationen mit Backend Frmeworks](https://github.com/vitejs/awesome-vite#integrations-with-backends), einschließlich Rails, Django und Laravel. [Folge dieser Anleitung](https://vitejs.dev/guide/backend-integration.html), falls dein Backend Framework nicht aufgelistet ist, um Vite manuell in dein Backend einzubinden.

Um zu prüfen ob die Einrichtung erfolgreich war, führe im Projektordner folgenden Befehl aus:

<TerminalBlock>
npm install react react-dom
</TerminalBlock>

Füge danach diese Zeilen am Anfang deiner primären JavaScript-Datei (vermutlich `index.js` or `main.js`) ein:

<Sandpack>

```html index.html hidden
<!DOCTYPE html>
<html>
  <head><title>Meine App</title></head>
  <body>
    <!-- Dein bestehender Seiteninhalt (in diesem Beispiel wird er ersetzt) -->
  </body>
</html>
```

```js index.js active
import { createRoot } from 'react-dom/client';

// Beseitige deinen existierent HTML-Inhalt
document.body.innerHTML = '<div id="app"></div>';

// Render stattdessen deine React-Komponente
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

</Sandpack>

Wenn der gesamte Inhalt deiner Seite mit "Hellow, world!" ersetzt wurde, hat alles funktioniert! Lies weiter.

<Note>

Eine modulare JavaScript-Umgebung zum ersten Mal in ein bestehendes Projekt zu integrieren, kann sich beängstigend anfühlen, aber es ist es wert! Wenn du nicht weiterkommst, versuche es mit unseren [Community-Ressourcen](/community) oder dem [Vite Chat](https://chat.vitejs.dev/).

</Note>

### Step 2: Render React components anywhere on the page {/*step-2-render-react-components-anywhere-on-the-page*/}

In the previous step, you put this code at the top of your main file:

```js
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

Of course, you don't actually want to clear the existing HTML content!

Delete this code.

Instead, you probably want to render your React components in specific places in your HTML. Open your HTML page (or the server templates that generate it) and add a unique [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) attribute to any tag, for example:

```html
<!-- ... somewhere in your html ... -->
<nav id="navigation"></nav>
<!-- ... more html ... -->
```

This lets you find that HTML element with [`document.getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) and pass it to [`createRoot`](/reference/react-dom/client/createRoot) so that you can render your own React component inside:

<Sandpack>

```html index.html
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <p>This paragraph is a part of HTML.</p>
    <nav id="navigation"></nav>
    <p>This paragraph is also a part of HTML.</p>
  </body>
</html>
```

```js index.js active
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  // TODO: Actually implement a navigation bar
  return <h1>Hello from React!</h1>;
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);
```

</Sandpack>

Notice how the original HTML content from `index.html` is preserved, but your own `NavigationBar` React component now appears inside the `<nav id="navigation">` from your HTML. Read the [`createRoot` usage documentation](/reference/react-dom/client/createRoot#rendering-a-page-partially-built-with-react) to learn more about rendering React components inside an existing HTML page.

When you adopt React in an existing project, it's common to start with small interactive components (like buttons), and then gradually keep "moving upwards" until eventually your entire page is built with React. If you ever reach that point, we recommend migrating to [a React framework](/learn/start-a-new-react-project) right after to get the most out of React.

## Using React Native in an existing native mobile app {/*using-react-native-in-an-existing-native-mobile-app*/}

[React Native](https://reactnative.dev/) can also be integrated into existing native apps incrementally. If you have an existing native app for Android (Java or Kotlin) or iOS (Objective-C or Swift), [follow this guide](https://reactnative.dev/docs/integration-with-existing-apps) to add a React Native screen to it.
