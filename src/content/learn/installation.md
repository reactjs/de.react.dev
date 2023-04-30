---
title: Installation
---

<Intro>

React wurde von Anfang an für eine stufenweise Integration konzipiert. Du kannst React für deine ganze Anwendung nutzen oder nur die Teile davon, die du benötigst. React eignet sich sowohl dazu um eine einfache HTML-Seite reaktiv zu machen, als auch ganze Projekte von Grund auf damit zu erstellen

</Intro>

<YouWillLearn isChapter={true}>

* [Wie man ein neues React Projekt startet](/learn/start-a-new-react-project)
* [Wie man React zu einem bestehenden Projekt hinzufügt](/learn/add-react-to-an-existing-project)
* [Wie man seinen Editor einrichtet](/learn/editor-setup)
* [Wie man die React Entwicklertools installiert](/learn/react-developer-tools)

</YouWillLearn>

## React testen {/*try-react*/}

Um React zu testen, musst du nichts installieren. Probier es einfach in dieser Sandbox aus!

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

Du kannst den Code direkt in der Box editieren, oder dazu ein neues Browserfenster öffnen indem du den "Fork" Button in der oberen rechten Ecke benutzt

Die meisten Seiten in der React-Dokumentation haben Sandboxen wie diese.
Ausserhalb davon gibt es viele Online-Sandboxen die React unterstützen,
zum Beispiel: [CodeSandbox](https://codesandbox.io/s/new), [StackBlitz](https://stackblitz.com/fork/react), oder [CodePen.](https://codepen.io/pen?&editors=0010&layout=left&prefill_data_id=3f4569d1-1b11-4bce-bd46-89090eed5ddb)

### React lokal testen {/*try-react-locally*/}

Um React lokal auf dem eigenen Computer zu testen, [downloade diese HTML Seite](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html) und öffne sie sowohl in deinem Code-Editor als auch in deinem Browser

## Starte ein neues React Projekt {/*start-a-new-react-project*/}

Wenn du eine neue Anwendung oder eine Webseite vollständig mit React erstellen willst, dann [starte ein neues React Projekt.](/learn/start-a-new-react-project)

## React zu einem bestehenden Projekt hinzufügen {/*add-react-to-an-existing-project*/}

Wenn du React in einer bestehenden Anwendung oder Webseite testen willst, [füge React zu einem bestehenden Projekt hinzu.](/learn/add-react-to-an-existing-project)

## Nächste Schritte {/*next-steps*/}

Sieh dir den [Schnelleinstieg](/learn) an, dort findest du eine kurze Einfuhrung in die wichtigsten React Konzepte, denen man täglich begegnen wird, wenn man mit React arbeitet

