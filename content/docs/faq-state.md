---
id: faq-state
title: Zustand von Komponenten
permalink: docs/faq-state.html
layout: docs
category: FAQ
---

### Was macht `setState`? {#what-does-setstate-do}

`setState()` veranlasst eine Änderung am `state`-Objekt einer Komponente. Sobald sich das Objekt ändert, reagiert die Komponente mit erneutem Rendern.

### Was ist der Unterschied zwischen `state` und `props`? {#what-is-the-difference-between-state-and-props}

[`props`](/docs/components-and-props.html) (kurz für englisch "properties") und [`state`](/docs/state-and-lifecycle.html) sind beide einfache JavaScript-Objekte. Obwohl beide Informationen halten, die das Erebnis des Renderns beeinflussen, unterscheiden sie sich in einem entscheidenden Punkt: `props` werden *an* die Komponente gereicht (ähnlich zu Funktionsparametern), während `state` *in* der Komponente verwaltet wird (ähnlich zu Variablen, die in einer Funktion deklariert werden).

Hier sind einige gute Quellen dazu, wann man `props` verwenden sollte und wann `state`:
* [Props vs State](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
* [ReactJS: Props vs. State](https://lucybain.com/blog/2016/react-state-vs-pros/)

### Warum gibt `setState` mir einen falschen Wert? {#why-is-setstate-giving-me-the-wrong-value}

In React repräsentieren sowohl `this.props` als auch `this.state` den *gerenderten* Wert, d.h. das was aktuell angezeigt wird.

Aufrufe an  `setState` sind asynchron - verlasse dich nicht darauf, dass `this.state` direkt nach einem Aufruf an `setState` den neuen Wert repräsentiert. Verwende eine Updater-Funktion statt einem Objekt, wenn du Werte basierend auf dem aktuellen Zustand berechnen musst (siehe folgendes Beispiel für Details).

Beispiel-Code, der sich *nicht* wie erwartet verhält:

```jsx
erhoeheZaehler() {
  // Achtung: dies verhält sich *nicht* wie erwartet.
  this.setState({count: this.state.zaehler + 1});
}

behandleEtwas() {
  // Nehmen wir an, `this.state.zaehler` startet bei 0.
  this.erhoeheZaehler();
  this.erhoeheZaehler();
  this.erhoeheZaehler();
  // Wenn React die Komponente neu rendert, wird `this.state.zaehler` 1 sein, obwohl du 3 erwartest.

  // Das liegt daran, dass `erhoeheZaehler()` von `this.state.zaehler` liest,
  // aber React `this.state.zaehler` nicht verändert bevor die Komponente neu gerendert wird.
  // Daher liest `erhoeheZaehler()` jedes Mal den Wert 0 von `this.state.zaehler`,
  // und setzt ihn auf 1.

  // Die richtige Lösung findet sich weiter unten!
}
```

Siehe im Folgenden, wie man das Problem beheben kann.

### Wie kann ich den Zustand verändern mit Werten, die vom aktuellen Zustand abhängen? {#how-do-i-update-state-with-values-that-depend-on-the-current-state}

Gib eine Funktion statt einem Objekt an `setState` um sicherzustellen, dass der Aufruf immer den aktuellsten Wert des Zustands verwendet (siehe unten). 

### Was ist der Unterschied, wenn man ein Objekt oder eine Funktion an `setState` gibt? {#what-is-the-difference-between-passing-an-object-or-a-function-in-setstate}

Gibt man eine Funktion an `setState`, so kann man in der Funktion auf den aktuellen Wert des Zustands zugreifen. Nachdem Aufrufe an `setState` gebündelt durchgeführt werden, lässt dich das Veränderungen aufeinanderfolgend durchführen und du kannst dir sicher sein, dass die Veränderungen aufeinander aufbauen anstatt zu konkurrieren:

```jsx
erhoeheZaehlerCount() {
  this.setState((state) => {
    // Wichtig: verwende `state` statt `this.state` beim Update.
    return {count: state.zaehler + 1}
  });
}

behandleEtwas() {
  // Nehmen wir an, `this.state.zaehler` startet bei 0.
  this.erhoeheZaehler();
  this.erhoeheZaehler();
  this.erhoeheZaehler();

  // Wenn du `this.state.zaehler` verwenden würdest, wäre es immer noch 0.
  // Wenn React aber die Komponente neu rendert, wird es 3 sein.
}
```

[Lerne mehr über `setState`](/docs/react-component.html#setstate)

### Wann ist `setState` asynchron? {#when-is-setstate-asynchronous}

Aktuell ist `setState` in Event Handlern asynchron.

Das stellt z.B. sicher, dass `Kind` nicht zwei mal gerendert wird, wenn sowohl `Mutter` und `Kind` `setState` während eines Klick-Events aufrufen. Stattdessen "leert" React die Zustandsveränderungen am Ende des Browser-Events. Das führt in größeren Apps zu signifikanten Performance-Gewinnen.

Das ist ein Implementierungdetail, verlasse dich also nicht direkt darauf. In zukünftigen Versionen wird React Updates standardmäßig in mehr Fällen bündeln.

### Warum updated React `this.state` nicht synchron? {#why-doesnt-react-update-thisstate-synchronously}

Wie im vorherigen Abschnitt erklärt, wartet React absichtlich bis alle Komponenten `setState()` in ihren Event-Handlern aufrufen, bevor neu gerendert wird. Das verbessert die Performance, da unnötiges Rendern vermieden wird.

Du magst dich immer noch fragen, warum React nicht einfach `this.state` sofort ohne neues Rendern verändert.

Die zwei wichtigsten Gründe sind:

* Das würde die Konsitenz zwischen `props` und `state` brechen, was zu sehr schwer verständlichen Problemen führen würde.
* Das würde einige der neuen Features, an denen wir arbeiten, unmöglich machen.

Dieser [GitHub-Kommentar](https://github.com/facebook/react/issues/11527#issuecomment-360199710) nennt spezifische Beispiele.

### Sollte ich eine Zustandsverwaltungsbibliothek wie Redux oder MobX verwenden? {#should-i-use-a-state-management-library-like-redux-or-mobx}

[Vielleicht.](https://redux.js.org/faq/general#when-should-i-use-redux)

Es ist eine ziemlich gute Idee, React zu verstehen, bevor man weitere Bibliotheken hinzufügt. Du kannst recht komplexe Applikationen auch mit ausschließlich der Zustandsverwaltung von React bauen.
