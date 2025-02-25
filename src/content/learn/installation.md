---
title: Installation
---

<Intro>
React wurde von Anfang an für eine stufenweise Integration konzipiert. Du kannst React in dem Maße verwenden, wie es für dich passt. Unabhängig davon, ob du einen ersten Eindruck von React gewinnen möchtest, Interaktivität zu einer HTML-Seite hinzufügen oder eine komplexe React-basierte App starten möchtest, dieser Abschnitt wird dir helfen, den Einstieg zu finden.
</Intro>

## React ausprobieren {/*try-react*/}

Um React zu testen, musst du nichts installieren. Probiere es einfach in dieser Sandbox aus!

<Sandpack>

```js
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return <Greeting name="world" />
}
```

</Sandpack>

Du kannst den Code direkt editieren oder dazu ein neues Browserfenster öffnen, indem du den "Fork"-Button in der oberen rechten Ecke verwendest.

Die meisten Seiten in der React-Dokumentation haben Sandboxen wie diese. Außerhalb davon gibt es viele Online-Sandboxen, die React unterstützen, zum Beispiel: [CodeSandbox](https://codesandbox.io/s/new), [StackBlitz](https://stackblitz.com/fork/react), oder [CodePen.](https://codepen.io/pen?template=QWYVwWN)

<<<<<<< HEAD
### Probiere React lokal aus {/*try-react-locally*/}

Um React lokal auf dem eigenen Computer auszuprobieren, [lade diese HTML-Seite herunter](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html). Öffne sie sowohl in deinem Code-Editor als auch in deinem Browser.

## Starte ein neues Projekt mit React {/*start-a-new-react-project*/}

Wenn du eine neue Anwendung oder eine Webseite vollständig mit React erstellen willst, dann [starte ein neues Projekt mit React.](/learn/creating-a-react-app)

## Eine React-App von Grund auf neu erstellen {/*build-a-react-app-from-scratch*/}

Wenn ein Framework für dein Projekt nicht geeignet ist, du es bevorzugst dein eigenes Framework zu bauen, oder du einfach nur die Grundlagen einer React-App lernen willst, kannst du [eine React-App von Grund auf bauen](/learn/build-a-react-app-from-scratch).

## Füge React zu einem bestehenden Projekt hinzu {/*add-react-to-an-existing-project*/}

Wenn du React in einer bestehenden Anwendung oder Webseite testen willst, [füge React zu einem bestehenden Projekt hinzu.](/learn/add-react-to-an-existing-project)

<Note>

#### Should I use Create React App? {/*should-i-use-create-react-app*/}

No. Create React App has been deprecated. For more information, see [Sunsetting Create React App](/blog/2025/02/14/sunsetting-create-react-app).

</Note>

## Nächste Schritte {/*next-steps*/}

Sieh dir den [Schnelleinstieg](/learn) an, um dort eine Tour von den wichtigsten React-Konzepten zu bekommen, den du jeden Tag begegnen wirst.
