---
id: forwarding-refs
title: Weiterleiten von Refs
permalink: docs/forwarding-refs.html
---
Weiterleiten von Refs ist eine Technik für die automatische Übergabe einer [Ref](/docs/refs-and-the-dom.html) durch eine Komponente an eines seiner Kinder. Normalerweise besteht für die meisten Komponenten innerhalb einer Anwendung kein Bedarf dafür. Nichtsdestotrotz, kann es für gewisse Arten von Komponenten nützlich sein, vor allem wenn es sich dabei um wiederverwendbare Komponenten-Bibliotheken handelt. Die gängigsten Szenarien werden unterhalb beschrieben.

<<<<<<< HEAD
## Weiterleiten von Refs zu DOM-Komponenten {#forwarding-refs-to-dom-components}
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Manipulating the DOM with Refs](https://beta.reactjs.org/learn/manipulating-the-dom-with-refs)
> - [`forwardRef`](https://beta.reactjs.org/reference/react/forwardRef)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

Ref forwarding is a technique for automatically passing a [ref](/docs/refs-and-the-dom.html) through a component to one of its children. This is typically not necessary for most components in the application. However, it can be useful for some kinds of components, especially in reusable component libraries. The most common scenarios are described below.
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

Stelle dir eine `FancyButton` Komponente vor, welche das native `button` DOM-Element rendert:
`embed:forwarding-refs/fancy-button-simple.js`

React Komponenten verbergen ihre Implementierungsdetails, einschließlich der gerenderten Ausgabe. Andere Komponenten die `FancyButton` benutzen, werden **in den meisten Fällen keine Notwendigkeit** für den [Abruf einer Ref](/docs/refs-and-the-dom.html) zum inneren `button` DOM-Element haben. Das ist gut so, da dies eine zu starke Abhängigkeit unter den Komponenten auf die gegenseitige DOM-Struktur verhindert.

Trotz der Tatsache, dass solch eine Kapselung für Komponenten in der Anwendungsebene wie `FeedStory` oder `Comment` erwünscht ist, kann dies für "Blatt-Komponenten" mit einem hohen Wiederverwendbarkeitsgrad, wie `FancyButton` oder `MyTextInput` unpraktisch sein. Diese Komponenten werden oft in der ganzen Anwendung als reguläre DOM `button` und `input` auf ähnliche Weise eingesetzt und der Zugriff auf dessen DOM-Knoten könnte für die Regelung von Fokus, Auswahl oder Animationen unvermeidlich sein.

**Die Weiterleitung von Refs ist ein Opt-In Feature, welches manchen Komponenten die Möglichkeit bereitstellt, eine erhaltene `ref`, weiter nach unten zu einem Kind durchzulassen (in anderen Worten, "weiterzuleiten").**

Im unteren Beispiel benutzt `FancyButton` `React.forwardRef`, um die übermittelte `ref` abzurufen und diese anschließend an den gerenderten DOM `button` weiterzuleiten.

`embed:forwarding-refs/fancy-button-simple-ref.js`

In diesem Fall, können die Komponenten die `FancyButton` nutzen, das Ref zum unterliegenden `button` DOM-Knoten abrufen und dies bei bedarf nutzen—so als ob sie direkt auf den DOM `button` zugreifen würden.

Hier ist eine Schritt für Schritt Erklärung was im oberen Beispiel passiert:

1. Wir erstellen eine [React Ref](/docs/refs-and-the-dom.html) mit dem Aufruf von `React.createRef` und weisen es der `ref` Variable zu.
1. Wir geben unsere `ref` an `<FancyButton ref={ref}>` weiter, in dem wir diese als JSX Attribut definieren.
1. React gibt die `ref` der `(props, ref) => ...` Funktion innerhalb von `forwardRef` als zweites Argument weiter.
1. Mit der Definition als JSX Attribut, leiten wir das `ref` Argument weiter zum `<button ref={ref}>`.
1. When das Ref zugewiesen ist, zeigt `ref.current` auf den `<button>` DOM-Knoten.

> Hinweis
>
> Das zweite `ref` Argument existiert nur dann, wenn du eine Komponente mit `React.forwardRef` Aufruf definierst. Normale Funktion- oder Klassenkomponenten erhalten das `ref` Argument nicht, es ist auch nicht in den Props verfügbar.
>
> Das Weiterleiten von Refs ist nicht nur auf DOM-Komponenten limitiert. Du kannst auch Refs zu Instanzen von Klassenkomponenten weiterleiten.

## Hinweis für Betreiber von Komponentenbibliotheken {#note-for-component-library-maintainers}

**Wenn du anfängst `forwardRef` in einer Komponentenbibliothek zu nutzen, solltest du es als funktionsgefährdende Änderung behandeln und eine neue Major-Version deiner Bibliothek veröffentlichen.** Deine Bibliothek wird höchstwahrscheinlich ein wahrnehmbar anderes Verhalten aufweisen (z.B. Zuordnung von Refs, welche Typen werden exportiert), dies könnte negative Auswirkungen auf andere Anwendungen und Bibliotheken haben, die auf das alte Verhalten angewiesen sind.

Bedingte Anwendung von `React.forwardRef` bei Vorhandensein, ist ebenso aus den gleichen Gründen nicht ratsam: es verändert das Verhalten deiner Bibliothek und könnte negative Auswirkungen auf die Anwendungen deiner User haben, wenn sie ein React-Upgrade durchführen.

## Weiterleiten von Refs in Higher-Order-Komponenten {#forwarding-refs-in-higher-order-components}

Diese Technik kann besonders in Verbindung mit [Higher-Order-Komponenten](/docs/higher-order-components.html) (auch bekannt als HOC) nützlich sein. Beginnen wir mit einer Beispiel-HOC, welche die Eigenschaften einer Komponente in die Konsole loggt:
`embed:forwarding-refs/log-props-before.js`

Die "logProps" HOC gibt alle `props` an die Komponente durch, die von ihr umschlossen wird, aus diesem Grund wird die gerenderte Ausgabe gleich sein. Wir können zum Beispiel diese HOC nutzen, um alle Eigenschaften zu loggen, die an unsere "fancy button" Komponente weitergegeben werden:
`embed:forwarding-refs/fancy-button.js`

Folgendes muss im oberen Beispiel beachtet werden: es werden keine Refs weitergegeben. Das ist der Tatsache zu entnehmen, dass `ref` keine Eigenschaft ist. Ähnlich dem `key`, wird es anders von React behandelt. Wenn du eine Ref zu einer HOC hinzufügst, wird diese die äußerste Container-Komponente und nicht die umschlossene Komponente referenzieren.

Dies bedeutet, dass Refs die für unsere `FancyButton` Komponente bestimmt waren, eigentlich der `LogProps` Komponente zugewiesen sein werden:
`embed:forwarding-refs/fancy-button-ref.js`

Glücklicherweise, können wir Refs explizit an die innere `FancyButton` Komponente weiterleiten, in dem wir die `React.forwardRef` API benutzen. `React.forwardRef` akzeptiert eine render-Funktion, die `props` und `ref` Eigenschaften enthält und einen React-Knoten zurückgibt. Beispiel:
`embed:forwarding-refs/log-props-after.js`

## Anzeigen von benutzerdefinierten Namen in DevTools {#displaying-a-custom-name-in-devtools}

`React.forwardRef` akzeptiert eine render-Funktion. React DevTools nutzt diese Funktion um zu bestimmen, was für die Ref-weiterleitende Komponente angezeigt werden soll.

Zum Beispiel, folgende Komponente wird als "*ForwardRef*" in DevTools aufscheinen.

`embed:forwarding-refs/wrapped-component.js`

Wenn du die render-Funktion benennst, wird dieser auch innerhalb von DevTools inkludiert (z.B. "*ForwardRef(myFunction)*"):

`embed:forwarding-refs/wrapped-component-with-function-name.js`

Du kannst sogar die Eigenschaft `displayName` setzen, um die umschlossene Komponente zu inkludieren.

`embed:forwarding-refs/customized-display-name.js`
