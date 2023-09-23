---
title: Installation
---

<Intro>
React wurde von Anfang an für eine stufenweise Integration konzipiert. Du kannst React in dem Maße verwenden, wie es für dich passt. Unabhängig davon, ob du einen ersten Eindruck von React gewinnen möchtest, Interaktivität zu einer HTML-Seite hinzufügen oder eine komplexe React-basierte App starten möchtest, dieser Abschnitt wird dir helfen, den Einstieg zu finden.
</Intro>

<YouWillLearn isChapter={true}>

* [Wie man ein neues React-Projekt startet](/learn/start-a-new-react-project)
* [Wie man React zu einem bestehenden Projekt hinzufügt](/learn/add-react-to-an-existing-project)
* [Wie man seinen Editor einrichtet](/learn/editor-setup)
* [Wie man die React-Entwicklertools installiert](/learn/react-developer-tools)

</YouWillLearn>

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

Die meisten Seiten in der React-Dokumentation haben Sandboxen wie diese. Außerhalb davon gibt es viele Online-Sandboxen, die React unterstützen, zum Beispiel: [CodeSandbox](https://codesandbox.io/s/new), [StackBlitz](https://stackblitz.com/fork/react), oder [CodePen.](https://codepen.io/pen?&editors=0010&layout=left&prefill_data_id=3f4569d1-1b11-4bce-bd46-89090eed5ddb)

### Probiere React lokal aus {/*try-react-locally*/}

Um React lokal auf dem eigenen Computer auszuprobieren, [lade diese HTML-Seite herunter](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html). Öffne sie sowohl in deinem Code-Editor als auch in deinem Browser.

## Starte ein neues Projekt mit React {/*start-a-new-react-project*/}

Wenn du eine neue Anwendung oder eine Webseite vollständig mit React erstellen willst, dann [starte ein neues Projekt mit React.](/learn/start-a-new-react-project)

## Füge React zu einem bestehenden Projekt hinzu {/*add-react-to-an-existing-project*/}

Wenn du React in einer bestehenden Anwendung oder Webseite testen willst, [füge React zu einem bestehenden Projekt hinzu.](/learn/add-react-to-an-existing-project)

## Nächste Schritte {/*next-steps*/}

Sieh dir den [Schnelleinstieg](/learn) an, um dort eine Tour von den wichtigsten React-Konzepten zu bekommen, den du jeden Tag begegnen wirst.
