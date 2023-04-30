---
title: React zu einem bestehenden Projekt hinzufügen
---

<Intro>

Wenn dein bestehendes Projekt lediglich interaktiver werden soll, ist es nicht nötig es vollständig neu in React zu scheiben. Du kannst React einfach hinzufügen und interaktive Komponenten rendern

</Intro>

<Note>

**Für die lokale Entwicklung muss [Node.js](https://nodejs.org/en/) installiert sein.** Man kann React zwar online oder mit einer einfachen HTML-Seite [testen](/learn/installation#try-react) aber in der Praxis benötigt man für die meisten JavaScript Tools die man zum Entwickeln benutzen wird ohnehin Node.js.

</Note>

## React für eine ganze Subroute einer bestehenden Webseite nutzen {/*using-react-for-an-entire-subroute-of-your-existing-website*/}

Lass uns annehmen, du hast eine bestehende Webseite auf `example.com` die mit einer anderen Servertechnologie (z.B. Rails) erstellt wurde und du willst nun alle 
Routen die mit `example.com/some-app/` beginnen vollständig mit React implementieren

dann würden wir empfehlen, das wie folgt einzurichten:

1. **Erstelle den Teil der in der App mit React umgesetzt weren soll** indem du eines der [auf React basierenden Frameworks](/learn/start-a-new-react-project) benutzt.
2. **Definiere `/some-app` als *base path*** in der Konfiguration deines Framework's (so geht's: [Next.js](https://nextjs.org/docs/api-reference/next.config.js/basepath), [Gatsby](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/)).
3. **Konfiguriere deinen Server oder Proxy** so, dass alle Anfragen (requests) an `/some-app/` von der React Anwendung behandelt werden.

Damit ist sichergestellt, dass der React Teil der Anwendung von den [best practices](/learn/start-a-new-react-project#can-i-use-react-without-a-framework), die in diese Frameworks bereits eingebaut sind, profitieren kann.

Viele der auf React basierenden Frameworks sind Fullstack und ermöglichen es deiner Anwendung den Server zu nutzen. Man kann den gleichen Ansatz aber auch dann verwenden, wenn man auf dem Server kein JavaScript ausführen kann oder will. In diesem Fall wird stellt man den HTML/CSS/JS export ([`next export` Output](https://nextjs.org/docs/advanced-features/static-html-export) für Next.js, default für Gatsby) unter `/some-app/` bereit.

## React für Teile einer bestehenden Seite nutzen {/*using-react-for-a-part-of-your-existing-page*/}

Lass uns annehmen du hast eine Seite mit einer anderen technologie erstellt (entweder ein Server wie Rails oder ein Client wie Backbone) und du willst nun eine irgendwo auf der Seite eine interaktive React Komponente einfügen. Das ist eine übliche Methode um React zu integrieren -- tatsächlich ist es die Methode wie React in den meisten Anwendungsfällen über viele Jahre bei META benutzt benutzt wurde. 

Du kannst das in zwei Schritten erreichen:

1. **JavaScript Umgebung einrichten** damit man die [JSX syntax](/learn/writing-markup-with-jsx) verwenden kann, um Code mit der [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) / [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) Syntax in Module aufzuteilen und um Pakete (wie z.B. React) aus der [npm](https://www.npmjs.com/) Registry zu nutzen
2. **Rendere deine React Komponenten** irgendwo in der Anwendung um sie auf der Seite sichtbar zu machen.

Die genaue Vorgehensweise hängt vom Setup deiner bestehenden Seite ab. Wir müssen uns deshalb noch ein paar Details ansehen

### Schritt 1: Eine modulare JavaScript Umgebung einrichten {/*step-1-set-up-a-modular-javascript-environment*/}

Eine modulare Javascript Umgebung ermöglicht es, jede React Komponente in eine Eigene Datei zu schreiben, anstatt den gesamten Code in eine Datei zu schreiben.
Sie ermöglicht uns ausserdem, die unzähligen, nützlichen Pakete aus der [npm](https://www.npmjs.com/) Registry zu nutzen die andere Entwickler veröffentlich haben. -- inklusive React selbst!   
Die Einrichtung hängt vom bestehenden Setup ab:

* **Wenn die Anwendung bereits in Dateien aufgeteilt ist die `import` Statements benutzen** versuche den Setup zu verwenden den du bereits hast. Schreib in deinen JS Code ein `<div/>` und prüfe ob das einen Syntaxfehler verursacht. Sollte dabei ein Syntaxfehler auftreten musst du [deinen Code vermutlich mit Babel umwandeln](https://babeljs.io/setup) und zudem die [Babel React Voreinstellung](https://babeljs.io/docs/babel-preset-react) einschalten um JSX nutzen zu können

* **Wenn die Anwendung noch nicht für das kompilieren von JavaScript Modulen eingerichtet ist,** richte es mit [Vite](https://vitejs.dev/) ein. Die Vite Community pfelgt [viele Integrationen mit Backend Frmeworks](https://github.com/vitejs/awesome-vite#integrations-with-backends), darunter Rails, Django und Laravel. Falls dein Backend Framework nich aufgelistet ist [folge dieser Anleitung](https://vitejs.dev/guide/backend-integration.html) um  Vite manuell in dein Backend einzubinden

Um zu prüfen ob die Einrichtung erfolgreich war führe im Projektordner folgenden Befehl aus:

<TerminalBlock>
npm install react react-dom
</TerminalBlock>

danach füge diese Codezeilen am Beginn deiner main JavaScript Datei aus (die Datei heisst meistens `index.js` oder `main.js`)

<Sandpack>

```html index.html hidden
<!DOCTYPE html>
<html>
  <head><title>Meine App</title></head>
  <body>
    <!-- Your existing page content (in this example, it gets replaced) -->
  </body>
</html>
```

```js index.js active
import { createRoot } from 'react-dom/client';

// löscht den vorhandenen HTML-Inhalt
document.body.innerHTML = '<div id="app"></div>';

// und rendert stattdessen die React Komponente
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hallo, Welt</h1>);
```

</Sandpack>

Wenn der komplette Inhalt deiner Seite durch "Hallo, Welt" ersetzt wurde hat alles richtig funktioniert! Lies weiter

<Note>

Wenn man das erste Mal eine modulare JavaScript Umgebung in ein bestehendes Projekt einbindet, kann das einschüchternd wirken, aber das ist es wert! 
Integrating a modular JavaScript environment into an existing project for the first time can feel intimidating, but it's worth it! Falls du dabei nicht weitere kommst, sieh dir unsere [Community Resssourcen](/community) an oder schau im [Vite Chat](https://chat.vitejs.dev/) vorbei.

</Note>

### Schritt 2: React Komponenten an beliebiger Stelle auf der Seite rendern {/*step-2-render-react-components-anywhere-on-the-page*/}

Im vorhergehenden Schritt hast du diesen Code ganz oben in der main Datei eingesetzt: 

```js
import { createRoot } from 'react-dom/client';

// löscht den vorhandenen HTML-Inhalt
document.body.innerHTML = '<div id="app"></div>';

// und rendert stattdessen die React Komponente
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

Natürlich will man den vorhandenen HTML-Inhalt nicht wirklich löschen !
Lösche diesen Code.

Vermutlich willst du stattdessen deine React Komponente an einer bestimmten Stelle in deinem HTML rendern. Öffne dazu die HTML-Seite (oder die Server Templates die diese generieren) und füge ein einzigartiges [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) Attribut zu einem beliebigen Element hinzu, zum Beispiel:  

```html
<!-- ... irgendwo in deinem html ... -->
<nav id="navigation"></nav>
<!-- ... mehr html ... -->
```

Dieser Code wählt das HTML Element mit [`document.getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) aus und reicht es an [`createRoot`](/reference/react-dom/client/createRoot) weiter. Auf diese Weise kannst du deine React Komponente innerhalb des Elements mit der id rendern: 

<Sandpack>

```html index.html
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <p>Dieser Paragraph ist teil des HTML</p>
    <nav id="navigation"></nav>
    <p>Dieser Paragraph ist auch Teil des HTML.</p>
  </body>
</html>
```

```js index.js active
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  // TODO: implementiere eine Navigationsleiste
  return <h1>Hallo von React!</h1>;
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);
```

</Sandpack>

Beobachte wie hier der ursprüngliche HTML Inhalt aus der `index.html` erhalten bleibt, während deine eigene `NavigationBar` React Komponente jetzt innerhalb des `<nav id="navigation">` Elements deines HTML Markups erscheint. Lies in der [`createRoot` Dokumentation](/reference/react-dom/client/createRoot#rendering-a-page-partially-built-with-react) wenn du mehr über das Rendern von React Komponenten innerhalb bestehender HTML-Seiten lernen willst

Wenn man React in ein bestehendes Projekt übernimmt ist es üblich mit kleinen interaktiven Komponenten (wie Buttons) zu beginnen und sich dann zu komplexeren Komponenten zu steigern bis am Ende eventuell die gesamte Seite aus React besteht. 


When you adopt React in an existing project, it's common to start with small interactive components (like buttons), and then gradually keep "moving upwards" until eventually your entire page is built with React. Sollte dieser Punkt erreicht sein, empfehlen wir direkt danach die Migration zu einem [React Framework](/learn/start-a-new-react-project) vozunehmen um das meiste aus React herauszuholen.

## React Native in einer bestehenden Native Mobile App nutzen {/*using-react-native-in-an-existing-native-mobile-app*/}

[React Native](https://reactnative.dev/) kann auch schrittweise in bestehende Native Apps integriert werden. Wenn du eine bestehende Native App für Android (JAVA oder Kotlin) oder iOS (Objective-C oder Swift) hast, [folge dieser Anleitung](https://reactnative.dev/docs/integration-with-existing-apps) um einen React Native Screen hinzuzufügen


