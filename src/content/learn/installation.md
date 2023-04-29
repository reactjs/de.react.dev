---
title: Installation
---

<Intro>

React wurde von Anfang an für eine stufenweise Integration konzipiert. Du kannst React für deine ganze Anwendung nutzen oder nur die Teile davon, die du benötigst. React eignet sich sowohl dazu um eine einfache HTML-Seite reaktiv zu machen als auch ganze Projekte von Grund auf damit zu erstellen

</Intro>

<YouWillLearn isChapter={true}>

* [How to start a new React project](/learn/start-a-new-react-project)
* [How to add React to an existing project](/learn/add-react-to-an-existing-project)
* [How to set up your editor](/learn/editor-setup)
* [How to install React Developer Tools](/learn/react-developer-tools)

</YouWillLearn>

## React testen {/*try-react*/}

Um React zu testen musst du nichts installieren. Probier es einfach in dieser Sandbox aus!

<Sandpack>

```js
function Greeting({ name }) {
  return <h1>Hallo, {name}</h1>;
}

export default function App() {
  return <Greeting name="Welt" />
}
```

</Sandpack>

Du kannst den Code direkt in der Box editieren oder dazu ein neues Browserfenster öffnen indem du den "Fork" Button in der oberen rechten Ecke benutzt

Die meisten Seiten in der React Dokumentation haben Sandboxen wie diese.
Ausserhalb davon gibt es viele online Sandboxen die React unterstützen,
zum Beispiel: [CodeSandbox](https://codesandbox.io/s/new), [StackBlitz](https://stackblitz.com/fork/react), or [CodePen.](https://codepen.io/pen?&editors=0010&layout=left&prefill_data_id=3f4569d1-1b11-4bce-bd46-89090eed5ddb)

### React lokal testen {/*try-react-locally*/}

Um React lokal auf dem eigenen Computer zu testen, [downloade diese HTML Seite.](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html) und öffne sowohl in deinem Code-Editor als auch in deinem Browser
( React wird hier über CDN eingebudnen )

## Starte ein neues React Projekt {/*start-a-new-react-project*/}

Wenn du eine neue Anwendung oder eine Webseite vollständig mit React erstellen willst, dann [starte ein neues React Projekt.](/learn/start-a-new-react-project)

## Add React to an existing project {/*add-react-to-an-existing-project*/}

If want to try using React in your existing app or a website, [add React to an existing project.](/learn/add-react-to-an-existing-project)

## Nächste Schritte {/*next-steps*/}

Geh zum [Schnelleinstieg](/learn) und sieh dir eine kurze Einfuhrung in die wichtigsten React Konzepte an, denen man täglich begegnen wird wenn man mit React arbeitet

