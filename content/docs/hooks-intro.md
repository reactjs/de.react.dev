---
id: hooks-intro
title: Einführung in Hooks
permalink: docs/hooks-intro.html
next: hooks-overview.html
---
<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.
>
> These new documentation pages teach React with Hooks:
>
> - [Quick Start](https://react.dev/learn)
> - [Tutorial](https://react.dev/learn/tutorial-tic-tac-toe)
> - [`react`: Hooks](https://react.dev/reference/react)

</div>

*Hooks* sind ein neues Feature in React 16.8. Damit lassen sich State und andere React Features nutzen, ohne dass eine Klasse geschrieben werden muss.

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Deklariere eine neue State Variable, die wir "count" nennen
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Du hast mich {count} mal gedrückt</p>
      <button onClick={() => setCount(count + 1)}>
        Drück mich
      </button>
    </div>
  );
}
```
Die neue Funktion `useState` ist der erste Hook, mit dem wir uns beschäftigen werden. Bei diesem Beispiel handelt es sich nur um eine Vorschau. Keine Angst, wenn es jetzt noch keinen Sinn ergibt!

**[Auf der nächsten Seite](/docs/hooks-overview.html) kannst du anfangen Hooks zu erlernen.** Auf dieser Seite werden wir erklären, wieso wir Hooks zu React hinzufügen und wie sie dir helfen können, großartige Applikationen zu schreiben.

>Hinweis
>
>React 16.8.0 ist das erste Release, welches Hooks unterstützt. Beim Upgrade nicht vergessen, alle Pakete inklusive React DOM zu aktualisieren.
>React Native unterstützt Hooks seit [dem 0.59 Release von React Native](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059).

## Videoeinführung {#video-introduction}

Auf der React Conf 2018 gaben Sophie Alpert und Dan Abramov eine Einführung zu Hooks. Anschließend demonstrierte Ryan Florence das Refactoring einer Applikation mit Hooks. Schau dir das Video hier an:

<br>

<iframe width="650" height="366" src="//www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allowfullscreen></iframe>

## Keine funktionsgefährdende Änderungen {#no-breaking-changes}

Bevor wir weitermachen, beachte, dass Hooks:

* **Vollständig optional** sind. Du kannst Hooks in einigen Komponenten ausprobieren, ohne dass existierender Code neugeschrieben muss. Du musst Hooks momentan weder erlernen, noch benutzen, wenn du nicht möchtest. 

* **100% abwärtskompatibel** sind. Hooks beinhalten keine funktionsgefährdende Änderungen.

* **Nun verfügbar** sind. Hooks sind nun mit dem Release v16.8.0 verfügbar.

**Es gibt keine Pläne Klassen aus React zu entfernen.** Du kannst [unten auf dieser Seite](#gradual-adoption-strategy) mehr über die schrittweise Einführung von Hooks erfahren.

**Hooks ersetzen nicht dein Wissen über React-Konzepte**. Stattdessen geben Hooks eine direktere Schnittstelle zu den React-Konzepten, die du schon kennst: Props, State, Context, Refs, und Lifecycle. Wie wir später sehen werden, erlauben Hooks auch neue, mächtige Mittel, diese zu kombinieren.

**Wenn du Hooks sofort erlernen möchtest, dann [springe direkt zur nächsten Seite!](/docs/hooks-overview.html)** Du kannst aber auch weiterlesen, um zu erfahren, wieso wir Hooks hinzugefügt haben und wie wir sie benutzen, ohne unsere Applikationen neuzuschreiben.

## Motivation {#motivation}

Hooks lösen eine große Vielzahl an augenscheinlich zusammenhanglose Problemen in React auf die wir in über fünf Jahren Schreiben und Warten von tausenden Komponenten gestoßen sind. Ganz gleich, ob du React lernst, es täglich nutzt, oder sogar eine andere Bibliothek mit einem ähnlichen Komponenten-Modell bevorzugst, einige dieser Probleme könnten dir bekannt vorkommen. 

### Es ist schwer, State-behaftete Logik zwischen Komponenten wiederzuverwenden {#its-hard-to-reuse-stateful-logic-between-components}

React bietet nicht die Möglichkeit, wiederverwendbares Verhalten an eine Komponente zu hängen (z.B. das Verbinden an einen Store). Wenn du schon länger mit React gearbeitet hast, dann bist du vielleicht mit Pattern wie Render Props und Higher-Order Komponenten vertraut. Diese Pattern versuchen wiederverwendbares Verhalten zu ermöglichen. Allerdings verlangen diese Pattern, dass du deine Komponenten restrukturierst, wenn du diese nutzen möchtest. Das kann umständlich sein und macht es schwerer den Code zu verstehen. Wenn du dir eine typische React Applikation in den React DevTools anschaust, dann wirst du wahrscheinlich eine "Wrapper Hölle" auffinden. Komponenten sind umgeben von mehreren Ebenen von Providern, Consumern, Higher-Order Komponenten, Render Props, und anderen Abstraktionen. Obwohl wir sie in den DevTools ausblenden könnten, zeigen sie auf ein tieferliegendes Problem: React braucht eine bessere Primitive für das Teilen von State-behafteter Logik.

Mit Hooks kannst du State-behaftete Logik aus deinen Komponenten extrahieren, sodass diese unabhängig getestet und wiederverwendet werden können. **Hooks erlauben dir das Wiederverwenden von State-behafteter Logik, ohne das dafür deine Komponenten-Hierarchie geändert werden muss.** Dies macht es einfach Hooks mit mehreren Komponenten oder der Community zu teilen.

Wir werden das mehr in [Baue Deine Eigenen Hooks](/docs/hooks-custom.html) erörtern.

### Komplexe Komponenten sind schwer zu verstehen {#complex-components-become-hard-to-understand}

Oft mussten wir Komponenten pflegen, die klein starteten, aber zu einem unübersichtlichen Durcheinander aus State-behafteter Logik und Nebeneffekten heranwuchsen. Jede Lifecycle-Methode beinhaltet oft einen Mix aus Logik ohne Bezug zueinander. Komponenten könnten zum Beispiel in `componentDidMount` und `componentDidUpdate` Datenabrufe durchführen. Die gleiche `componentDidMount` Methode könnte Logik ohne Bezug zum bisherigen Datenabruf-Logik beinhalten. Hier könnten Event Listener erstellt werden, während `componentWillUnmount` dann für das Aufräumen dieser Listener zuständig wäre. Zusammenhängender Code, der sich gemeinsam ändert, wird getrennt und Code ohne Bezug zueinander wird in eine Methode geschrieben. Das macht es zu einfach, Bugs und Inkonsistenzen einzuführen.

In vielen Fällen ist es nicht möglich, diese Komponenten in kleinere aufzuteilen, weil dann die State-behaftete Logik überall verteilt wäre. Zudem ist es schwer diese zu testen. Dieses ist einer der Gründe, wieso viele Leute es bevorzugen, React zusammen mit einer separaten State-Management Bibliothek zu benutzen. Das allerdings führt oft dazu, dass zu viele Abstraktionen eingeführt werden, dass man zwischen verschiedenen Daten wechseln muss, und macht es schwerer Komponenten wiederzuverwenden.

Um diese Probleme zu lösen, **geben dir Hooks die Möglichkeit eine Komponente in mehrere kleine Funktionen ohne Bezug zueinander aufzuteilen (z.B. Funktionen für Datenabrufe oder Abonnements)**, anstatt das Aufteilen anhand der Lifecycle-Methoden zu erzwingen. Optional kannst du den lokalen State auch mit einem Reducer verwalten, um den State vorhersagbarer zu machen.

Wir werden das mehr in [den Effect Hook benutzen](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns) erörtern.

### Klassen verwirren Mensch und Maschine {#classes-confuse-both-people-and-machines}

Zusätzlich zur Erschwerung von Wiederverwendbarkeit und Organisation von Code, finden wir, dass Klassen ein großes Hindernis für das Erlernen von React sein können. Du musst verstehen, wie `this` in JavaScript funktioniert, welches in vielen anderen Programmiersprachen ganz anders funktioniert. Du darfst nicht vergessen, deine Event Handler an die Instanz zu binden. Ohne [ES2022 public class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields) ist der Code sehr ausschweifend. Die Leute verstehen Props, State und die von oben nach unten fließenden Daten sehr gut, aber haben trotzdem Probleme mit Klassen. Der Unterschied zwischen Funktion- und Klassenkomponenten in React und wann welche benutzt wird, führt gar zwischen erfahrenden React-Entwicklern zu Uneinigkeiten.

Des Weiteren gibt es React nun schon seit ungefähr fünf Jahren und wir möchten sichergehen, dass es auch in den nächsten fünf Jahren relevant bleibt. Wie [Svelte](https://svelte.dev/), [Angular](https://angular.io/), [Glimmer](https://glimmerjs.com/), und andere zeigen, [Ahead-Of-Time Kompilierung](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) von Komponenten hat großes Potenzial für die Zukunft. Gerade wenn es nicht nur auf Templates beschränkt ist. Seit kurzer Zeit experimentieren wir mit [Komponenten Folding](https://github.com/facebook/react/issues/7323) mit [Prepack](https://prepack.io/), und wir haben vielversprechende Ergebnisse gesehen. Wir haben jedoch herausgefunden, dass Klassen-Komponenten unabsichtliche Entwurfsmuster fördern können, die diese Optimierungen wieder auf einen langsameren Pfad bringen können. Klassen bieten auch Probleme für moderne Werkzeuge. Klassen lassen sich zum Beispiel nicht gut minifizieren und machen Hot Reloading brüchig und unzuverlässig. Wir möchten eine API vorstellen die es wahrscheinlicher macht, das Code optimierbar bleibt.

Um diese Probleme zu lösen, **lassen Hooks dich mehr React-Features ohne Klassen nutzen.** Konzeptionell sind React-Komponenten näher an Funktionen. Hooks umschließen Funktionen, aber ohne den praktischen Geist von React zu opfern. Hooks geben Zugriff auf notwendige Rettungsluken und verlangen es nicht von dir, komplexe funktionale oder reaktive Programmiertechniken zu erlernen. 

>Beispiele
>
>[Hooks auf einen Blick](/docs/hooks-overview.html) ist ein guter Ort, um mit dem Erlernen von Hooks zu beginnen.

## Strategie zur schrittweisen Einführung {#gradual-adoption-strategy}

>**TLDR: Es gibt keine Pläne Klassen aus React zu entfernen.**

Wir wissen, dass React Entwickler darauf fokussiert sind, Produkte auszuliefern und haben daher keine Zeit sich jede neuveröffentlichte API anzueignen. Hooks sind sehr neu und es könnte besser sein, mit dem Erlernen oder Einführen zu warten, bis es mehr Beispiele und Tutorials gibt.

Wir verstehen zudem, dass die Hürde, eine neue Primitive zu React hinzuzufügen, extrem hoch ist. Für neugierige Leser haben wir einen [detaillierten RFC](https://github.com/reactjs/rfcs/pull/68) erstellt, welcher die Motivation detaillierter beschreibt und außerdem weitere Perspektive zu spezifischen Designentscheidungen und verwandter Stand der Technik bietet.

**Entscheidend ist, dass Hooks Seite an Seite mit dem existierendem Code funktionieren, so dass du sie nach und nach einführen kannst.** Es gibt keine Eile zu Hooks zu migrieren. Wir empfehlen Abstand von "großen Umschreibungen" zu nehmen. Dies gilt erst recht für existierende, komplexe Klassen-Komponenten. Es verlangt eine leichte Änderung der Denkweise um mit "Denken in Hooks" zu starten. Laut unserer Erfahrung ist es besser das Benutzen von Hooks zuerst in neuen und unkritischen Komponenten zu proben. Darüberhinaus sollte sichergestellt sein, dass jedes Teammitglied sich mit ihnen wohlfühlt. Nachdem du Hooks ausprobiert, sei Willkommen [dein Feedback](https://github.com/facebook/react/issues/new), egal ob positiv oder negativ, an uns heranzureichen.

Wir beabsichtigen für Hooks das Abdecken von allen existierenden Anwendungsfällen von Klassen, aber **wir werden Klassen-Komponenten auch in der nahen Zukunft weiter unterstützen.** Hier bei Facebook, haben wir zehntausende von Komponenten, die wir mit Klassen geschrieben haben und wir haben absolut keine Pläne diese neuzuschreiben. Stattdessen fangen wir an Hooks in neuem Code zu benutzen - Seite an Seite mit Klassen.

## Häufig gestellte Fragen {#frequently-asked-questions}

Wir haben eine [Hooks FAQ Seite](/docs/hooks-faq.html) vorbereitet, die die häufigsten Fragen zu Hooks beantwortet.

## Nächste Schritte {#next-steps}

Am Ende dieser Seite solltest du eine grobe Idea davon haben, welche Probleme Hooks lösen. Wahrscheinlich sind aber noch einige Details etwas unklar. Keine Angst! **Lasst uns nun zur [nächsten Seite](/docs/hooks-overview.html) gehen, wo wir Hooks anhand von Beispielen kennenlernen.**
