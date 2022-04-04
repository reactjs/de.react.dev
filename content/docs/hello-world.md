---
id: hello-world
title: Hallo Welt
permalink: docs/hello-world.html
prev: cdn-links.html
next: introducing-jsx.html
---

Das wohl kleinste React-Beispiel sieht wie folgt aus:

<<<<<<< HEAD
```js
ReactDOM.render(
  <h1>Hallo, Welt!</h1>,
  document.getElementById('root')
);
=======
```jsx
ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<h1>Hello, world!</h1>);
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1
```

Es wird eine Überschrift mit dem Text "Hallo, Welt!" auf der Seite dargestellt.

**[Auf CodePen ausprobieren](https://codepen.io/gaearon/pen/rrpgNB?editors=1010)**

Klicke auf den Link um das obige Beispiel in einen Online-Editor zu öffnen.
Mache soviele Änderungen wie du magst, spiel ein bisschen mit dem Code rum und schaue was es für Auswirkungen auf die Seite hat.
Die meisten Seiten in diesem Leitfaden besitzen änderbare Beispiele wie dieses.


## Wie man diesen Leitfaden liest {#how-to-read-this-guide}

In diesem Leitfaden werden wir die React-Bestandteile: Elemente und Komponenten, behandeln.
Sobald du diese beherrschst, ist es dir möglich, komplexe Anwendungen aus vielen kleinen wiederverwendbaren Teilen zu erstellen.

>**Tipp:**
>
>Dieser Leitfaden richtet sich an Personen, die es bevorzugen Konzepte **Schritt für Schritt** zu erlernen, wenn du es lieber bevozugst
>mit Übungen zu lernen, dann ist vielleicht unser [praktisches Tutorial](/tutorial/tutorial.html) das Richtige für dich.
>Vielleicht findest du auch, dass sich der Leitfaden und das Tutorial gegenseitig ergänzen.

Dies ist das erste Kapitel im **Schritt für Schritt** Leitfaden. Du findest eine Liste aller vorhandenen Kapitel in der Navigationsleiste.
Solltest du dies auf der Mobilansicht lesen, klicke auf den Button in der unteren rechten Ecke um die Navigation zu öffnen.

Die Kapitel bauen aufeinander auf und greifen ggf. auf das Wissen des vorherigen zurück. **Das meiste über React kannst du in den Kapiteln unter "Hauptkonzepte" in der Reihenfolge wie sie dort aufgelistet sind, nachlesen.** [“Einführung in JSX”](/docs/introducing-jsx.html) ist beispielweise das folgende Kapitel.

## Annahme zu deinem Wissensstand {#knowledge-level-assumptions}

Da React eine JavaScript-Bibliothek ist, gehen wir davon aus, dass du ein gewisses Grundverständnis von JavaScript hast.
**Wenn du dich noch ein wenig unsicher fühlst können wir dir dieses [JavaScript Tutorial](https://developer.mozilla.org/de/docs/Web/JavaScript/Eine_Wiedereinfuehrung_in_JavaScript) sehr empfehlen.**
Es dauert ca. zwischen 30 Minuten und einer Stunde, aber danach solltest du keine Probleme mehr haben dem Leitfaden zu folgen
und nicht das Gefühl haben, React und JavaScript gleichzeitig zu lernen.

>**Hinweis:**
>
>Dieser Leitfaden benutzt in den Beispielen gelegentlich neuere JavaScript Syntaxen. Solltest in den letzten Jahren nicht mit JavaScript gearbeitet haben, helfen dir [diese drei Punkte](https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c) wieder ein wenig auf die Sprünge zu kommen.

## Auf geht's! {#lets-get-started}

Wenn du ein wenig hinuter scrollst findest du über dem Seitenende den Link [zum nächsten Kapitel](/docs/introducing-jsx.html) des Leitfadens.
