---
id: thinking-in-react
title: In React denken
permalink: docs/thinking-in-react.html
redirect_from:
  - 'blog/2013/11/05/thinking-in-react.html'
  - 'docs/thinking-in-react-zh-CN.html'
prev: composition-vs-inheritance.html
---

React ist unserer Meinung nach der beste Weg, um große, schnelle Web-Anwendungen mit JavaScript zu erstellen. Es hat sich für uns bei Facebook und Instagram sehr gelohnt.

Einer der vielen großartigen Teile von React ist, wie es dich zum Nachdenken über die Anwendungen bringt, während du sie erstellst. In diesem Dokument führen wir dich durch den Denkprozess, wie man eine durchsuchbare Produktdatentabelle mit React erstellt.

## Beginne mit einem Mock-Up {#start-with-a-mock}

Stell dir vor, dass wir bereits eine JSON API und ein Mock-Up unseres Designers haben. Das Mock-Up sieht so aus:

![Mockup](../images/blog/thinking-in-react-mock.png)

Unsere JSON API gibt uns Daten zurück, die folgendermaßen aussehen:

```
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

## Schritt 1: Zerlege die Benutzeroberfläche in eine Komponentenhierarchie {#step-1-break-the-ui-into-a-component-hierarchy}

Zuerst solltest du um jede Komponente (und Unterkomponente) des Mock-Ups eine Box zeichnen und jeder einen Name geben. Falls du mit einem Designer zusammenarbeitest, hat er das vielleicht schon getan, also geh und frage ihn! Die Namen der Photoshop-Ebenen könnten letztendlich die Namen deiner React-Komponenten sein!

Aber woher weißt du, was eine eigene Komponente sein sollte? Verwende einfach die gleichen Techniken, die du auch verwendest, um zu entscheiden, ob du eine neue Funktion oder ein neues Objekt anlegen möchtest. Eine dieser Techniken ist das[Single Responsibility Prinzip](https://en.wikipedia.org/wiki/Single_responsibility_principle), d.h. eine Komponente sollte idealerweise nur eine Aufgabe erledigen. Sobald sie wächst, sollte sie in kleinere Teilkomponenten zerlegt werden.

Da du einem Benutzer häufig ein JSON Datenmodell präsentieren wirst, wirst du feststellen, dass, falls dein Datenmodell korrekt aufgebaut wurde, deine Benutzeroberfläche (und damit auch deine Komponentenstruktur) gut dazu zusammenpasst. Das liegt daran, dass Benutzeroberfläche und Datenmodell tendenziell der gleichen *Informationsarchitektur* folgen, was bedeutet, dass es oft trivial ist, deine Benutzeroberfläche in Komponenten aufzuteilen. Zerlege sie einfach in Komponenten, die genau ein Stück deines Datenmodells darstellen.

![Diagram showing nesting of components](../images/blog/thinking-in-react-components.png)

<<<<<<< HEAD
Du siehst hier, dass wir fünf Komponenten in unserer einfachen Anwendung haben. Wir haben die Daten, die von jeder Komponente repräsentiert werden, kursiv dargestellt.
=======
You'll see here that we have five components in our app. We've italicized the data each component represents. The numbers in the image correspond to the numbers below.
>>>>>>> a11c2534062bd79cc1e6e34db0e149f928df35bb

  1. **`FilterableProductTable` (orange):** enthält das gesamte Beispiel
  2. **`SearchBar` (blau):** empfängt alle *Benutzereingaben*
  3. **`ProductTable` (grün):** zeigt und filtert die *Daten* basierend auf *Benutzereingaben* an
  4. **`ProductCategoryRow` (türkis):** zeigt eine Überschrift für jede *Kategorie* an
  5. **`ProductRow` (rot):** zeigt eine Zeile für jedes *Produkt* an

Wenn du dir `ProductTable` anschaust, wirst du feststellen, dass der Tabellenkopf (mit den Bezeichnungen "Name" und "Price") keine eigene Komponente ist. Das ist eine Frage der Präferenz und es gibt Argumente für beide Seiten. Für dieses Beispiel haben wir ihn als Teil von `ProductTable` gelassen, da er Teil der Darstellung der *Daten* ist, die in der Verantwortung von `ProductTable` liegt. Wenn diese Kopfzeile jedoch immer komplexer werden sollte (d.h. falls wir beispielsweise eine Sortierung hinzufügen würden), wäre es sicherlich sinnvoll, diese Kopfzeile zu einer eigenen `ProductTableHeader`-Komponente zu machen.

Lass uns nachdem wir nun die Komponenten in unserem Mock-Up identifiziert haben, sie in eine Hierarchie einordnen. Das ist einfach. Komponenten, die innerhalb einer anderen Komponente im Mock-Up erscheinen, sollten als Kind in der Hierarchie erscheinen:

  * `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
      * `ProductCategoryRow`
      * `ProductRow`

## Schritt 2: Erstelle eine statische Version in React {#step-2-build-a-static-version-in-react}

<p data-height="600" data-theme-id="0" data-slug-hash="BwWzwm" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/BwWzwm">Thinking In React: Step 2</a> on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Jetzt, da du deine Komponentenhierarchie hast, ist es an der Zeit, die Anwendung zu implementieren. Der einfachste Weg ist, eine Version zu erstellen, die dein Datenmodell verwendet und die Benutzeroberfläche rendert, aber keine Interaktivität hat. Es ist am besten, diese Prozesse zu entkoppeln, denn die Erstellung einer statischen Version erfordert viel Tippen und weniger Nachdenken, und das Hinzufügen von Interaktivität erfordert viel Nachdenken und weniger Tippen. Wir werden sehen, warum.

Um eine statische Version deiner Anwendung zu erstellen, die dein Datenmodell rendert, solltest du Komponenten erstellen, die andere Komponenten wiederverwenden und Daten per *Props* weitergeben. *Props* sind eine Möglichkeit, Daten von Eltern zu Kind zu übertragen. Wenn du mit dem Konzept von *state* vertraut bist, verwende **state hierfür noch nicht**, um diese statische Version zu erstellen. State ist nur für Interaktivität reserviert, d.h. Daten, die sich im Laufe der Zeit ändern. Da es sich um eine statische Version der Anwendung handelt, benötigst du ihn nicht.

Du kannst von oben nach unten (top-down) oder von unten nach oben (bottom-up) vorgehen. Das heißt, du kannst entweder mit dem Aufbau der Komponenten von oben in der Hierarchie beginnen (d.h. mit `FilterableProductTable`) oder mit denjenigen weiter unten (`ProductRow`). In simpleren Beispielen ist es in der Regel einfacher, von oben nach unten zu gehen, und bei größeren Projekten ist es einfacher, beim Erstellen von unten nach oben zu gehen und gleichzeitig Tests zu schreiben.

Am Ende dieses Schrittes steht dir eine Ansammlung von wiederverwendbaren Komponenten zur Verfügung, die dein Datenmodell darstellt. Die Komponenten haben jeweils nur eine `render()` Methode, da es sich um eine statische Version deiner Anwendung handelt. Die Komponente an der Spitze der Hierarchie (`FilterableProductTable`) nimmt dein Datenmodell als Prop. Wenn du eine Änderung an deinem zugrunde liegenden Datenmodell vornimmst und `ReactDOM.render()` erneut aufrufst, wird die Benutzeroberfläche aktualisiert. Es ist leicht zu erkennen, wie deine Benutzeroberfläche aktualisiert wird und wo Änderungen vorgenommen werden können, da nichts kompliziertes vor sich geht. React's **One-Way-Data Flow** (Daten fließen nur in eine Richtung) (auch *One-Way-Binding* genannt) hält alles modular und schnell.

Wenn du Hilfe bei der Ausführung dieses Schrittes benötigst, schaue einfach in die [React docs](/docs/).

### Ein kurzer Einschub: Props vs State {#a-brief-interlude-props-vs-state}

Es gibt zwei Arten von Daten(model) in React: Props und State. Es ist wichtig, den Unterschied zwischen den beiden zu verstehen; durchforste [die offiziellen React-Docs](/docs/state-and-lifecycle.html), wenn du dir nicht sicher bist, was der Unterschied ist. Schaue auch ins [FAQ: Was ist der Unterschied zwischen State und Props?](/docs/faq-state.html#what-is-the-difference-between-state-and-props)

## Schritt 3: Identifiziere die minimale (aber vollständige) Darstellung des Zustandes der Benutzeroberfläche {#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

Um deine Benutzeroberfläche interaktiv zu machen, musst du in der Lage sein, Änderungen an deinem zugrunde liegenden Datenmodell auszulösen. React macht dies mit **state** einfach.

Um deine Anwendung korrekt zu erstellen, musst du zunächst an den minimalen Satz von veränderbaren **states** denken, die deine Anwendung benötigt. Der Schlüssel dazu ist[DRY: *Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Finde die absolut minimale Darstellung des **states**, den deine Anwendung benötigt und berechne bei Bedarf alles andere, was du benötigst. Wenn du beispielsweise eine TODO-Liste erstellst, nutze einfach einen Array für die TODO-Elemente; nutze keine separate **state**-Variable für die Anzahl der Elemente. Möchtest du die Anzahl an TODO-Elementen darstellen, nimm einfach die Länge des TODO-Arrays.

Denke an alle Daten in unserer Beispielanwendung. Wir haben:

  * die ursprüngliche Liste der Produkte
  * den vom Benutzer eingegebenen Suchtext
  * der Wert des Auswahlfeldes
  * die gefilterte Liste der Produkte

Lass uns jeden einzelnen Punkt durchgehen und herausfinden, welcher davon **state** ist. Stelle einfach drei Fragen zu jedem Datenelement:

  1. Wird es von einem Elternteil über **props** weitergegeben? Wenn ja, dann ist es wahrscheinlich kein **state**.
  2. Bleibt es im Laufe der Zeit unverändert? Wenn ja, dann ist es wahrscheinlich kein **state**.
  3. Kann es basierend auf einem anderen **state** oder **props** berechnet werden? Wenn ja, dann ist es kein **state**.

Die ursprüngliche Liste der Produkte wird als **props** übergeben, also ist dies kein **state**. Der Suchtext und das Auswahlfeld scheinen **state** zu sein, da sie sich im Laufe der Zeit ändern und aus nichts berechnet werden können. Und schließlich ist die gefilterte Liste der Produkte kein **state**, da sie berechnet werden kann, indem man die ursprüngliche Liste der Produkte mit dem Suchtext und dem Wert des Auswahlfeldes kombiniert.

Letztendlich sieht unser **state** folgendermaßen aus:

  * der vom Benutzer eingegebene Suchtext
  * der Wert des Auswahlfeldes

## Schritt 4: Identifiziere, wo dein **state** leben soll {#step-4-identify-where-your-state-should-live}

<p data-height="600" data-theme-id="0" data-slug-hash="qPrNQZ" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">Schau dir <a href="https://codepen.io/gaearon/pen/qPrNQZ">In React denken: Schritt 4</a> auf <a href="https://codepen.io">CodePen</a> an.</p>

OK, wir haben also herausgefunden, was die minimalste Menge des **state**s der Anwendung ist. Als Nächstes müssen wir herausfinden, welche Komponente diesen **state** verändert oder *besitzt*.

Denk daran: Bei React geht es um den einseitigen Datenfluss (One-Way-Data Flow) entlang der Komponentenhierarchie. Es ist möglicherweise nicht sofort klar, welche Komponente welchen **state** besitzen soll. **Dies ist oft der am schwierigsten zu verstehende Teil für Neueinsteiger, ** also folge diesen Schritten, um es herauszufinden:

Für jedes Stück **state** in deiner Anwendung:

  * Identifiziere jede Komponente, die etwas rendert, das auf diesem **state** basiert.
  * Suche eine gemeinsame "Eigentümer"-Komponente (eine einzelne Komponente, die oberhalb der untersuchten Komponenten liegt, die den **state** benötigen).
  * Entweder der gemeinsame Eigentümer oder eine andere Komponente, die in der Hierarchie oberhalb liegt, sollte den **state** besitzen.
  * Kannst du keine Komponente finden, für die es sinnvoll ist, den **state** zu besitzen, erstelle eine neue Komponente, nur um den **state** zu halten, und füge sie irgendwo in der Hierarchie über der gemeinsamen Eigentümer-Komponente hinzu.

Lass uns diese Strategie für unsere Anwendung durchgehen:

  * `ProductTable` muss die Produktliste basierend auf **state** filtern und `SearchBar` muss den Suchtext und den Zustand des Auswahlfeldes anzeigen.
  * Die gemeinsame Eigentümer-Komponente ist `FilterableProductTable`.
  * Es ist konzeptionell sinnvoll, dass der Filtertext und der Zustand des Auswahlfeldes in `FilterableProductTable` leben.

Cool, wir haben uns also dazu entschieden, dass unser **state** in `FilterableProductTable` lebene wird. Füge zuerst `this.state = {filterText: '', inStockOnly: false}` zu `FilterableProductTable`'s `constructor` hinzu, um den initialen **state** (initial state) deiner Anwendung darzustellen. Sende dann `filterText` und `inStockOnly` zu `ProductTable` und `SearchBar` als **prop**. Verwende schließlich diese **props**, um die Zeilen in `ProductTable` zu filtern und die Werte der Formularfelder in `SearchBar` einzustellen.

Du wirst sehen können, wie sich deine Anwendung verhalten wird: Setze `filterText` auf `"ball"` und aktualisiere deine Anwendung. Du wirst sehen, dass die Tabelle korrekt aktualisiert wurde.

## Schritt 5: Füge inversen Datenfluss hinzu {#step-5-add-inverse-data-flow}

<p data-height="600" data-theme-id="0" data-slug-hash="LzWZvb" data-default-tab="js,result" data-user="rohan10" data-embed-version="2" data-pen-title="Thinking In React: Step 5" class="codepen">Schau dir <a href="https://codepen.io/gaearon/pen/LzWZvb">In React denken: Schritt 4</a> auf <a href="https://codepen.io">CodePen</a> an.</p>

Bisher haben wir eine Anwendung entwickelt, die in Abhängigkeit von **props** und **state**, die in der Hierarchie nach unten fließen, korrekt gerendert wird. Jetzt ist es an der Zeit, den Datenfluss in die andere Richtung zu unterstützen: Die Formular-Komponenten tief in der Hierarchie müssen den **state** in `FilterableProductTable` aktualisieren.

React macht diesen Datenfluss explizit, um es leicht verständlich zu machen, wie dein Programm funktioniert, aber es erfordert ein wenig mehr Tippen als herkömmliches **Two-Way-Binding** (Daten fließen in beide Richtungen).

Wenn du in der aktuellen Version des Beispiels versuchst, das Auswahlfeld anzuklicken, wirst du feststellen, dass React deine Eingabe ignoriert. Dies ist beabsichtigt, da wir den `value` **prop** des `input`s so eingestellt haben, dass er immer gleich des **state** ist, der von `FilterableProductTable` übergeben wird.

Lass uns darüber nachdenken, was wir erreichen wollen. Wir möchten sicherstellen, dass wir bei jeder Änderung des Formulars durch den Benutzer den **states** aktualisieren, um die Benutzereingaben widerzuspiegeln. Da Komponenten nur ihren eigenen **state** aktualisieren sollten, leitet `FilterableProductTable` Callbacks an `SearchBar` weiter, die ausgelöst werden, wenn **state** aktualisiert werden soll. Wir können den `onChange` Event auf die Eingabefelder anwenden, um darüber informiert zu werden. Die von `FilterableProductTable` übergebenen Callbacks rufen `setState()` auf und die Anwendung wird aktualisiert.

Obwohl das komplex klingt, handelt es sich eigentlich nur um ein paar Zeilen Code. Und es ist sehr explizit dargestellt, wie deine Daten in der Anwendung fließen.

## Und das war's dann auch schon {#and-thats-it}

Hoffentlich gibt dies dir eine Vorstellung davon, wie du mit React über die Entwicklung von Komponenten und Anwendungen nachdenken kannst. Auch wenn es ein wenig mehr Tippen sein kann, als du es gewohnt bist, denk daran, dass Code viel mehr gelesen als geschrieben wird, und es extrem einfach ist, diesen modularen, expliziten Code zu lesen. Wenn du beginnst, große Bibliotheken von Komponenten zu erstellen, dann wirst du diese Explizität und Modularität zu schätzen wissen und mit der Wiederverwendung von Code wird die Anzahl deiner Codezeilen schrumpfen. :)
