---
title: React zu einem bestehenden Projekt hinzufügen
---

<Intro>

Wenn du zusätzliche Interaktivität zu deinem bestehenden Projekt hinzufügen möchtest, musst du es nicht komplett neu in React schreiben. Integriere React in dein vorhandenes Projekt und render überall interaktive React-Komponente.

</Intro>

<Note>

**Für die lokale Entwicklung muss [Node.js](https://nodejs.org/en/) installiert sein.** Obwohl du online oder mit einer einfachen HTML-Seite [React testen](/learn/installation#try-react) kannst, ist Node.js für die meisten JavaScript-Tools, die zur Entwicklung benötigt werden, eine Voraussetzung.

</Note>

## React für eine ganze Subroute einer bestehenden Webseite verwenden {/*using-react-for-an-entire-subroute-of-your-existing-website*/}

Lass uns annehmen, du hast eine bestehende Webseite auf `example.com`, die mit einer anderen Server-Technologie (z.B. Rails) erstellt wurde und du willst nun alle 
Routen, die mit `example.com/deine-app/` beginnen, vollständig mit React implementieren.

In diesem Fall empfehlen wir dir folgende Schritte:

1. **Erstelle den Teil der App, die mit React umgesetzt werden soll**, indem du eines der [auf React basierenden Frameworks](/learn/start-a-new-react-project) verwendest.
2. **Definiere `/deine-app` als *base path*** in der Konfiguration deines Frameworks ( [Next.js](https://nextjs.org/docs/api-reference/next.config.js/basepath), [Gatsby](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/)).
3. **Konfiguriere deinen Server oder Proxy** so, dass alle Anfragen an `/deine-app/` von der React-Anwendung verarbeitet werden.

Damit ist sichergestellt, dass der React Teil der Anwendung von den [bewährten Praktiken](/learn/start-a-new-react-project#can-i-use-react-without-a-framework) profitieren kann, die in diese Frameworks eingebaut sind.

Viele der auf React basierenden Frameworks sind Fullstack und ermöglichen es deiner Anwendung den Server zu verwenden. Der gleiche Ansatzu kann aaber auch verwendet werden, wenn man auf dem Server kein JavaScript ausführen kann oder will. In diesem Fall stellt man den HTML/CSS/JS export ([`next export`](https://nextjs.org/docs/advanced-features/static-html-export) für Next.js, default für Gatsby) unter `/deine-app/` bereit.

## React für einen Teil deiner bestehenden Seite verwenden {/*using-react-for-a-part-of-your-existing-page*/}

Nehmen wir an, du hast eine bestehende Seite, die mit einer anderen Technologie erstellt wurde (entweder mit einer Server-Technologie wie Rails oder einer Client-Technologie wie Backbone), und du möchtest interaktive React-Komponenten irgendwo auf dieser Seite darstellen. Das ist ein weit verbreiteter Weg, um React zu integrieren - tatsächlich war dies über viele Jahre die am häufigsten verwendete Art React bei Meta einzusetzen!

Du kannst das in zwei Schritten tun:

1. **JavaScript Umgebung einrichten**, damit du die [JSX-Syntax](/learn/writing-markup-with-jsx) verwenden kannst, um Code mit der [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) / [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) Syntax in Module aufzuteilen und um Pakete (wie z.B. React) aus der [npm](https://www.npmjs.com/) Registry zu nutzen.
2. **Rendere deine React-Komponente** dort, wo du sie sehen möchtest.

Die konkrete Vorgehensweise hängt von deiner bestehenden Konfiguration ab, deshalb lass uns ein paar Details durchgehen.

### Schritt 1: Setze eine modulare JavaScript-Umgebung auf {/*step-1-set-up-a-modular-javascript-environment*/}

Eine modulare JavaScript-Umgebung ermöglicht es dir, deine React-Komponenten in einzelnen Dateien zu definieren, anstatt deinen gesamten Code in eine einzige Datei zu schreiben. Außerdem kannst du all die wunderbaren Pakete verwenden, die von anderen Entwicklern in der [npm](https://www.npmjs.com/) Registry veröffentlicht wurden - einschließlich React selbst! Wie du das machen kannst, ist abhängig von deiner bestehenden Konfiguration:

* **Wenn die Anwendung bereits in Dateien aufgeteilt ist, die `import` Statements benutzen**, versuche deine bestehende Konfiguration zu verwenden. Schreibe in deinen JS Code ein `<div/>` und prüfe, ob das einen Syntaxfehler verursacht. Sollte dabei ein Syntaxfehler auftreten, musst du [deinen Code vermutlich mit Babel umwandeln](https://babeljs.io/setup) und zudem die [Babel React Voreinstellung](https://babeljs.io/docs/babel-preset-react) aktivieren, um JSX nutzen zu können.

* **Wenn die Anwendung noch nicht für das Kompilieren von JavaScript-Modulen eingerichtet ist**, richte es mit [Vite](https://vitejs.dev/) ein. Die Vite Community pflegt [viele Integrationen mit Backend Frameworks](https://github.com/vitejs/awesome-vite#integrations-with-backends), einschließlich Rails, Django und Laravel. [Folge dieser Anleitung](https://vitejs.dev/guide/backend-integration.html), falls dein Backend Framework nicht aufgelistet ist, um Vite manuell in dein Backend einzubinden.

Um zu prüfen, ob die Einrichtung erfolgreich war, führe im Projektordner folgenden Befehl aus:

<TerminalBlock>
npm install react react-dom
</TerminalBlock>

Füge danach diese Zeilen am Anfang deiner primären JavaScript-Datei (vermutlich `index.js` oder `main.js`) ein:

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

```js src/index.js active
import { createRoot } from 'react-dom/client';

// Beseitige deinen existierenden HTML-Inhalt
document.body.innerHTML = '<div id="app"></div>';

// Render stattdessen deine React-Komponente
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

</Sandpack>

Wenn der gesamte Inhalt deiner Seite mit "Hello, world!" ersetzt wurde, hat alles funktioniert! Lies weiter.

<Note>

Eine modulare JavaScript-Umgebung zum ersten Mal in ein bestehendes Projekt zu integrieren, kann sich beängstigend anfühlen, aber es ist es wert! Wenn du nicht weiterkommst, versuche es mit unseren [Community-Ressourcen](/community) oder dem [Vite Chat](https://chat.vitejs.dev/).

</Note>

### Schritt 2: Rendern Sie React-Komponenten überall auf der Seite. {/*step-2-render-react-components-anywhere-on-the-page*/}

Im vorherigen Schritt haben wir diesen Code am Anfang unserer primären Datei hinzugefügt:

```js
import { createRoot } from 'react-dom/client';

// Beseitige deinen existierenden HTML-Inhalt
document.body.innerHTML = '<div id="app"></div>';

// Render stattdessen deine React-Komponente
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

Natürlich willst du das existierende HTML nicht wirklich beseitigen!

Lösche den Code!

Stattdessen möchtest du wahrscheinlich die React-Komponente an spezifischen Stellen in deinem HTML rendern. Öffne deine HTML-Seite (oder die Servervorlagen, die sie generieren), und füge einem beliebigen Tag ein eindeutiges [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)-Attribut hinzu, zum Beispiel:


```html
<!-- ... irgendwo in deinem html ... -->
<nav id="navigation"></nav>
<!-- ... mehr html ... -->
```

Das ermöglicht dir das HTML-Element mit [`document.getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) zu finden und es an [`createRoot`](/reference/react-dom/client/createRoot) zu übergeben, damit du darin deine eigene React-Komponente rendern kannst:

<Sandpack>

```html index.html
<!DOCTYPE html>
<html>
  <head><title>Meine App</title></head>
  <body>
    <p>Dieser Paragraph ist Teil des HTMLs.</p>
    <nav id="navigation"></nav>
    <p>Dieser Paragraph ist auch Teil des HTMLs.</p>
  </body>
</html>
```

```js src/index.js active
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  // TODO: Implementiere die Navigationsleiste
  return <h1>Hallo von React!</h1>;
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);
```

</Sandpack>

Beachte, wie der ursprüngliche HTML-Inhalt aus `index.html` erhalten bleibt, aber deine eigene React-Komponente `NavigationBar` nun innerhalb des `<nav id="navigation">` in deinem HTML erscheint. Lies die Dokumentation von [`createRoot`](/reference/react-dom/client/createRoot#rendering-a-page-partially-built-with-react), um mehr darüber zu erfahren, wie man React-Komponenten in einer vorhandenen HTML-Seite rendert.

Wenn du React in ein bestehendes Projekt integrierst, ist es üblich, mit kleinen interaktiven Komponenten (wie Buttons) zu beginnen und dich dann schrittweise "nach oben zu arbeiten", bis schließlich deine gesamte Seite mit React erstellt ist. Wenn du diesen Punkt einmal erreichst, empfehlen wir, kurz danach auf [ein React-Framework](/learn/start-a-new-react-project) umzusteigen, um das Beste aus React herauszuholen.

## React Native für eine bestehende mobile App verwenden {/*using-react-native-in-an-existing-native-mobile-app*/}

[React Native](https://reactnative.dev/) kann auch inkrementell in eine bestehende native App integriert werden. Wenn du bereits eine native App für Android (Java oder Kotlin) oder iOS (Objective-C oder Swift) hast, [folge dieser Anleitung](https://reactnative.dev/docs/integration-with-existing-apps), um eine React Native Ansicht hinzuzufügen.
