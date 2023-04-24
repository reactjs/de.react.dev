---
id: rendering-elements
title: Elemente rendern
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

<div class="scary">

>
> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.
>
> These new documentation pages teach how to write JSX and show it on an HTML page:
>
> - [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
> - [Add React to an Existing Project](https://react.dev/learn/add-react-to-an-existing-project#step-2-render-react-components-anywhere-on-the-page)

</div>

Elemente sind die kleinsten Bestandteile von React-Apps.

Ein Element beschreibt, was du auf dem Bildschirm sehen möchtest:

```js
const element = <h1>Hallo Welt</h1>;
```

Anders als die DOM-Elemente eines Browsers sind React-Elemente schlichte kosteneffektive Objekte.
React DOM kümmert sich um das Aktualisieren des DOMs und den dazugehörigen React-Elementen.

>**Hinweis:**
>
>Man könnte Elemente mit dem allgemein bekannterem Konzept der "Komponenten" verwechseln. Komponenten werden wir
>im [nächsten Abschnitt](/docs/components-and-props.html) behandeln.
>Elemente sind das, woraus Komponenten "gemacht" werden und wir empfehlen dir, erst diesen Abschnitt zu lesen, bevor du weiter machst.

## Ein Element in das DOM rendern {#rendering-an-element-into-the-dom}

Nehmen wir mal an, wir haben ein `<div>`-Element irgendwo in einer HTML-Datei:

```html
<div id="root"></div>
```

Dieses Element nennen wir "root"-DOM-Knoten. Alles innerhalb dieses Elements wird von React DOM verwaltet.

Anwendungen, die mit React gebaut worden, haben normalerweise nur einen root-DOM-Knoten. Wenn du React in eine bestehende Anwendung einfügst, kannst du aber so viele DOM-Knoten haben, wie du möchtest.

Um ein Element in den root-DOM-Knoten zu rendern, muss du zuerst das DOM-Element an [`ReactDOM.createRoot()`](/docs/react-dom-client.html#createroot) übergeben und danach an `root.render()`:

`embed:rendering-elements/render-an-element.js`

[Auf CodePen ausprobieren](https://codepen.io/gaearon/pen/ZpvBNJ?editors=1010)

Es wird "Hallo Welt" auf der Seite angezeigt.

## Aktualisieren des gerenderten Elements {#updating-the-rendered-element}

React-Elemente sind [immutable](https://en.wikipedia.org/wiki/Immutable_object) (unveränderbar). Wenn du einmal ein Element erstellt hast, kannst du dessen
Kind-Elemente oder Attribute nicht mehr verändern. Eine Element kannst du dir vorstellen wie ein einzelnes Bild eines Filmes: Es repräsentiert die Benutzeroberfläche (UI) zu einem bestimmten Zeitpunkt.

Mit unserem bisherigen Wissen besteht die einzige Möglichkeit, die Benutzeroberfläche zu aktualisieren, darin, ein neues Element zu erstellen und es an `root.render()` zu übergeben.

Wir nehmen uns einmal dieses Beispiel einer tickenden Uhr:

`embed:rendering-elements/update-rendered-element.js`

[Auf CodePen ausprobieren](https://codepen.io/gaearon/pen/gwoJZk?editors=1010)

Jede Sekunde wird [`root.render()`](/docs/react-dom.html#render) mit Hilfe einer Callback-Funktion von [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) aufgerufen.

>**Hinweis:**
>
>In der Praxis rufen die meisten React-Anwendungen `root.render()` nur einmal auf. Im nächsten Abschnitt lernen wir, wie solch ein Code in einzelne [Zustandskomponenten](/docs/state-and-lifecycle.html) gekapselt wird.
>
>Wir empfehlen dir, Abschnitte nicht zu überspringen, da sie aufeinander aufbauen.

## React aktualisiert nur das Nötigste {#react-only-updates-whats-necessary}

React DOM vergleicht das vorherige und jetzige Element und dessen Kindelemente miteinander.
Um das DOM in den gewünschten Zustand zu bringen, werden nur die Elemente im DOM aktualisiert, die wirklich eine Änderung beinhalten.

Du kannst es nachprüfen, indem du das [letzte Beispiel](https://codepen.io/gaearon/pen/gwoJZk?editors=1010) mit den Browser-Werkzeugen aufrufst:

![DOM-Inspektor mit detaillierten Updates](../images/docs/granular-dom-updates.gif)

Obwohl wir jede Sekunde ein Element erstellen, das den kompletten UI-Baum aktualisiert, wird nur der Text-Inhalt durch React DOM aktualisiert, dessen Inhalt sich wirklich geändert hat.

Nach unserer Erfahrung ergibt es mehr Sinn, darüber nachzudenken, wie die Benutzeroberfläche zu einem bestimmten Zeitpunkt aussieht, anstatt
sich darüber Gedanken zu machen, wie sie sich im Laufe der Zeit verändert. Dieses Denken verhindert eine ganze Reihe von Fehlern.
