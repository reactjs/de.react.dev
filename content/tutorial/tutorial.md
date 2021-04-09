---
id: tutorial
title: "Tutorial: Einführung in React"
layout: tutorial
sectionid: tutorial
permalink: tutorial/tutorial.html
redirect_from:
  - "docs/tutorial.html"
  - "docs/why-react.html"
  - "docs/tutorial-ja-JP.html"
  - "docs/tutorial-ko-KR.html"
  - "docs/tutorial-zh-CN.html"
---

Für dieses Tutorial benötigst Du keine Vorkenntnisse in React.

## Bevor wir mit den Tutorial anfangen {#before-we-start-the-tutorial}

Wir werden im Laufe dieses Tutorials ein Spiel programmieren. ** Vielleicht möchtest du es überspringen, weil du keine Spiele programmieren willst -- aber gib es doch eine Chance.** Die Techniken, die du in diesem Tutorial lernen wirst, sind fundamental um eine React-App zu erstellen, es zu meistern wird dir ein tiefes Verständnis von React geben.

>Tipp
>
>Dieses Tutorial ist gestaltet für jene, die **learn by doing** bevorzugen. Solltest du es be bevorzugen, die Konzepte von grundauf zu lernen, schau doch auf unsere [Schritt für Schritt Anleitung](/docs/hello-world.html). Das Anleitung und das Tutorial können für dich ergänzend sein.

Dieses Tutorial ist in mehreren Sektionen aufgeteilt:

* Das [Setup für das Tutorial](#setup-for-the-tutorial) gibt dir **eine Basis** um das Tutorial zu verfolgen.
* Die [Übersicht](#overview) bringt dir die **Fundamente** von React bei: Komponenten, Props und State.
* [Das Spiel fertigstellen](#completing-the-game) zeigt dir **die am häufigsten vorkommenen Techniken** bei der Entwicklung mit React.
* [Zeitreisen hinzufügen](#adding-time-travel) gibt dir **einen tieferen Einblick** in die einzigartigen Stärken von React.

Du musst nicht alle Abschnitte des Tutorials direkt abschließen um einen Mehrwert aus dem Tutorial zu gewinnen. Komme so weit du kannst, selbst wenn es nur ein oder zwei Abschnitte sind.

### Was werden wir erstellen? {#what-are-we-building}

In diesem Tutorial werden wir dir zeigen, wie du ein interaktives Tic-Tac-Toe-Spiel mit React bauen kannst.

Du kannst das Ziel unseres Projektes hier einsehen: **[Finales Ergebnis](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. Sollte der Code keinen Sinn für dich ergeben oder du dich mit dem Syntax nicht auskennst, kein Problem! Das Ziel dieses Tutorials ist es, dir zu helfen React und seinen Syntax zu verstehen.

Wir empfehlen dir, dass du dir das Tic-Tac-Toe anschaust, bevor du mit dem Tutorial weitermachst. Eines der Features, die du bemerken wirst, ist, dass rechts vom Spielbrett eine nummerierte Liste ist. Diese Liste zeigt alle getätigten Züge an und wird mit dem Fortschreiten des Spiels aktualisiert.

Du kannst das Tic-Tac-Toe-Spiel schließen, sobald du dich damit vertraut gemacht hast. Wir werden in diesem Tutorial mit einem einfacheren Template beginnen. Im nächsten Schritt helfen wir dir alles einzurichten, damit du anfangen kannst, das Spiel zu bauen.

### Vorraussetzungen {#prerequisites}

Wir nehmen an, dass du bereits HTML und JavaScript ein wenig kennst, aber selbst wenn du vorher eine andere Sprache erlernt hast, solltest du in der Lage sein, folgen zu können. Desweiteren nehmen wir ebenfalls an, dass dir die Programmierkonzepte wie Funktionen, Objekte, Arrays und in geringerem Maße auch Klassen ein Begriff sind.

Wenn du die Grundlagen von JavaScript noch einmal wiederholen möchtest, empfehlen wir dir [dieses Handbuch](https://developer.mozilla.org/de/docs/Web/JavaScript/Eine_Wiedereinfuehrung_in_JavaScript) zu lesen. Behalte in Erinnerung, dass wir auch Features von ES6 nutzen werden -- eine aktuellere Version von JavaScript. In diesem Tutorial verwenden wir unteranderem die sogenannte [arrow-Funktion](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/Pfeilfunktionen), [Klasses](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Klassen), [`let`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/let), und [`const`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/const) Ausdrücke. Schaue dir [Babel REPL](babel://es5-syntax-example) an, um zu sehen, in was ES6-Features kompiliert werden.

## Setup für das Tutorial {#setup-for-the-tutorial}

Es gibt zwei Möglichkeiten um das Tutorial zu absolvieren: Entweder du schreibst den Code direkt im Browser oder du erstellst dir Lokal eine Entwicklungsumgebung.

### Möglichkeit 1: Code direkt im Browser schreiben {#setup-option-1-write-code-in-the-browser}

Das ist der schnellste Weg um direkt anfangen zu können.

Zuerst öffnest du diesen **[Basiscode](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)** in einem neuen Tab. Im neuen Tab solltest du ein leeres Tic-Tac-Toe-Spielbrett und etwas React-Code sehen können. Den React-Code werden wir innerhalb dieses Tutorials bearbeiten.

Von hier aus kannst du auch die andere Option überspringen und direkt zum Abschnitt [Übersicht](#overview) springen um eine Übersicht über React zu erhalten.

### Möglichkeit 2: Lokale Entwicklungsumgebung {#setup-option-2-local-development-environment}

Das ist komplett optional und nicht für dieses Tutorial benötigt!

<br>

<details>

<summary><b>Optional: Anleitung um lokal in deinem bevorzugten Editor mit dem Tutorial weiterzumachen</b></summary>

Dieses Setup benötigt mehr initialen Aufwand, ermöglicht dir jedoch, das Tutorial in einem Editor deiner Wahl zu vollführen. Folgende Schritte sind dafür notwendig:

1. Stelle sicher, dass du die aktuelle Version von [Node.js](https://nodejs.org/de/) installiert hast.
2.Folge den [Installationsanweisungen zum erstellen einer React App](/docs/create-a-new-react-app.html#create-react-app) um ein neues Projekt zu erstellen.

```bash
npx create-react-app meine-app
```

3. Lösche alle Dateien innerhalb vom `src/`-Ordner des neuen Projektes. 

> Hinweis:
>
>**Lösche nicht den gesamten `src`-Ordner sondern lediglich die Dateien innerhalb des Verzeichnisses.** Wir werden den Standard-Quellcode in den nächsten Schritten ersetzen.

```bash
cd meine-app
cd src

# Wenn du Mac oder Linux benutzt:
rm -f *

# Oder wenn du auf Windows unterwegs bist:
del *

# Danach wechsle zurück zum Projekt-Verzeichnis
cd ..
```

4. Füge eine Datei mit dem Namen `index.css` in den `src/`-Ordner mit [diesem CSS-Code](https://codepen.io/gaearon/pen/oWWQNa?editors=0100).

5. Füge eine Datei mit dem Namen `index.js` in den `src/`-Ordner mit [diesem JS-Code](https://codepen.io/gaearon/pen/oWWQNa?editors=0010).

6. Schreibe diese drei Zeilen an den Anfang von `index.js` im `src/`-Ordner:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```

Wenn du jetzt `npm start` in deinem Projektverzeichnis ausführst und dann im Browser `http://localhost:3000` aufrufst, Solltest du ein leeres Tic-Tac-Toe-Feld sehen.

Wir empfehlen dir [diese Anweisungen](https://babeljs.io/docs/editors/) durchzugehen um Syntax-Highlighting für deinen Editor zu konfigurieren.

</details>

### Hilfe, ich hänge fest! {#help-im-stuck}

Wenn du nicht mehr weiterkommst, schau am Besten in die [Community-Support-Ressourcen](/community/support.html). Im speziellen ist der [Reactiflux Chat](https://discord.gg/reactiflux) ein guter Weg um schnell Antworten und Hilfestellungen zu bekommen. Solltest du keine Antwort bekommen, oder weiterhin festhängen, erstelle ein Issue-Ticket und wir werden dir raushelfen.

## Übersicht {#overview}

Da du jetzt alles vorbereitet hast, lass uns erstmal einen Überblick über React gewinnen!

### Was ist React? {#what-is-react}

React ist eine deklarative, effiziente und flexible JavaScript-Bibliothek für das erstellen von Benutzerschnittstellen. Es erlaubt dir komplexe Oberflächen aus kleinen isolierten Code-Schnipseln, sogenannte "Komponente" (engl. components), zu komponieren.

React hat ein paar unterschiedliche Arten von Komponenten, aber wir beginnen mit `React.Component` Subklassen:

```javascript
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shoppingliste für {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Anwendungsbeispiel: <ShoppingList name="Mark" />
```

Wir kommen zu den merkwürdigen XML-ähnlichen Tags gleich. Wir nutzen Komponenten um React zu sagen, was wir angezeigt haben wollen. Wenn sich die Daten ändern wird React effizient die Komponenten aktualisieren und neu darstellen.

In unserem Beispiel ist ShoppingList eine **React Komponenten-Klasse** bzw. ein **React Komponententyp**. Eine Komponente nimmt Parameter, sogenannte `props` (kurz für engl. "properties" - Eigenschaften) entgegen und gibt eine Darstellungs-Hierarchie via der `render` Methode zurück.

Die `render`-Methode gibt eine *Beschreibung* von dem zurück, was auf dem Bilschirm zu sehen sein wird. React nimmt diese Beschreibung und zeigt dann das Ergebnis an. Genauergesagt gibt `render` ein **React-Element** zurück, welches eine leichtgewichtige Beschreibung des Darzustellenden ist. Die meisten React-Entwickler nutzen einen speziellen Syntax namens "JSX" welches es leichter macht, solche Strukturen zu schreiben. Der `<div />`-Syntax wird während der Laufzeit zu `React.createElement('div')` transformiert. Das Beispiel oben entspricht daher:

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 Kindelemente ... */),
  React.createElement('ul', /* ... ul Kindelemente ... */)
);
```

[See full expanded version.](babel://tutorial-expanded-version)

Wenn du mehr über `createElement()` wissen willst, findest du eine detaillierte Beschreibung in der [API Referenz](/docs/react-api.html#createelement), aber wir werden es in diesem Tutorial nicht verwenden. Anstelle dessen werden wir weiterhin JSX nutzen.

JSX hat den vollen Funktionsumfang von JavaScript. Du kannst jeden JavaScript-Ausdruck innerhalb von Klammern in JSX benutzen. Jedes React-Element ist ein JavaScript-Objekt, dass in eine Variable gespeichert werden oder innerhalb des Programms hin- und hergereicht werden kann.

Die `ShoppingList`-Kompontente von oben stellt nur eingebaute DOM-Komponenten wie `<div />` und `<li />` dar. Dennoch kannst du auch jede Art von React-Komponente zusammenstellen und darstellen. Wir können jetzt zum Beispiel auf die Shopping-Liste immer referenzieren indem wir `<ShoppingList />` schreiben. Jede React-Komponente ist abgekapselt und kann unabhängig voneinander operieren; Das erlaubt es dir komplexe Benutzeroberflächen aus einzelnen Komponenten zu kreieren.

### Betrachten des Basiscodes {#inspecting-the-starter-code}

Wenn du an dem Tutorial **in deinem Browser** arbeitest, öffne diesen Code in einem neuen Tab: **[Basiscode](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Wenn du an dem Tutorial **lokal** arbeitest, öffne stattdessen `src/index.js` in deinem Projektverzeichnis (du hast diese Datei bereits während des [Setups](#setup-option-2-local-development-environment) erstellt).

Dieser Basiscode ist die Grundlage auf der wir bauen. Wir haben bereits das CSS vorbereitet, sodass du dich nur auf das Lernen von React fokussieren und das Tic-Tac-Toe-Spiel programmieren kannst.

Bei genauer Betrachtung des Codes wirst du sehen, dass wir drei React-Kompontente haben:

* Square (folgend auch Quadrat genannt)
* Board (folgend auch Spielbrett genannt)
* Game

Die "Square"-Komponente stellt einen einzelnen `<button>` dar und das Spielbrett "Board" besitzt 9 davon. Die "Game"-Komponente besitzt ein "board" mit Platzhalter-Werten welche wir später modifizieren werden. Derzeit gibt es keine interaktiven Komponente.

### Daten über props weitergeben {#passing-data-through-props}

Um einen ersten Schritt wagen zu können, werden wir erstmal probieren Daten von der "Board"-Komponente in die "Square"-Komponente weiterzugeben.

Wir empfehlen dir, während du das Tutorial durcharbeitesst, den Code von Hand einzutippen, statt ihn kopieren und einzufügen. Dies hilft dir, dein Gedächtnis zu trainieren und ein besseres Verständnis zu entwickeln.

In der `renderSquare`-Methode vom "Board", ändere den Code um einen prop namens `value` zum "Square" weiterzureichen:

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}
```

Passe die `render`-Methode von "Square" an, indem du `{/* TODO */}` mit `{this.props.value}` ersetzt, sodass es den Wert anzeigen kann:

```js{5}
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```

Vorher:

![React Devtools](../images/tutorial/tictac-empty.png)

Danach: Du müsstest eine Nummer in jedem Quadrat sehen können.

![React Devtools](../images/tutorial/tictac-numbers.png)

**[Schau dir den vollständigen Code bis zu dieser Stelle an](https://codepen.io/gaearon/pen/aWWQOG?editors=0010)**

Glückwunsch! Du hast gerade von der "Board"-Komponente in das Kindelement "Square" "eine prop weitergegeben". Props weitergeben stellt den Informationsfluss in React dar, immer von einem übergeordneten in ein darunterliegendes Kindelement.

### Erstellen einer interaktiven Komponente {#making-an-interactive-component}

Nun werden wir ein Quadrat mit einem "X" füllen, sobald es geklickt wird.
Zu erst werden wir den Button-Tag, der von der `render()`-Methode der "Square"-Komponente zurückgegeben wird, in folgendes ändern:

```javascript{4}
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { alert('Klick'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

Klicken wir nun unser Quadrat, meldet der Browser sich mit einem PopUp-Fenster.

>Hinweis
>
>Um weniger zu schreiben und das [verwirrende Verhalten von `this`](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) zu vermiden, verwenden wir die [Pfeilfunktion](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/Pfeilfunktionen) für Event-Handler hier und weiter unten:
>
>```javascript{4}
>class Square extends React.Component {
>  render() {
>    return (
>      <button className="square" onClick={() => alert('Klick')}>
>        {this.props.value}
>      </button>
>    );
>  }
>}
>```
>
>Wenn du `onClick={() => alert('click')}` betrachtest, kannst du feststellen, dass wir *eine Funktion* im `onClick`-Prop mitgeben. Es wird nur mit einem Klick ausgelöst. `() =>` zu vergessen und anstelle dessen `onClick={alert('click')}` zu schreiben, ist ein häufiger Fehler und führt dazu, dass alert jedes Mal aufgerufen wird, wenn die Komponente neurendert.

Als nächstes möchten wir, dass die "Square"-Kompontente sich daran "erinnern" kann, dass sie geklickt worden ist und schreiben ein X rein. Damit Komponenten sich an Dinge "erinnern" können, brauchen sie einen **state**.

React-Komponente haben einen state indem man `this.state` im Konstruktor setzt. `this.state` sollte als private Eigenschaft einer React-Komponente verstanden werden. Nun werden wir den aktuellen Wert eines Quadrats in `this.state` speichern und ändern sobald das Quadrat geklickt wird.

Zu erst fügen wir einen Konstruktor hinzu um den State zu initialisieren:

```javascript{2-7}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => alert('Klick')}>
        {this.props.value}
      </button>
    );
  }
}
```

>Hinweis
>
>In [JavaScript-Klassen](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Klassen) musst du immer `super` aufrufen wenn du den Konstruktor einer Subklasse definierst. Alle React-Komponente, die einen `constructor` haben sollten mit einem `super(props)`-Aufruf starten.

Jetzt werden wir die `render`-Methode von "Square" anpassen, um den aktuellen State darzustellen sobald es geklickt wird:

* Ersetze `this.props.value` mit `this.state.value` im `<button>`-Tag.
* Ersetze den `onClick={...}` Event-Handler mit `() => this.setState({value: 'X'})`.
* Füge`className` und `onClick` props auf zwei separate Zeilen um die Lesbarkeit zu verbessern.

Nachdem wir diese Änderungen gemacht haben wird der `<button>`-Tag der von der `render`-Methode von "Square" zurückgegeben wird wie folgt aussehen:

```javascript{12-13,15}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}
```

Der Aufruf von `this.setState` durch einen `onClick`-Handler in der `render`-Methode von "Square" sagt React, dass es "Square" neurendern soll sobald sein `<button>` geklickt wird. Nach dem aktualisieren wird `this.state.value` vom "Square" ein `'X'` sein, somit werden wir ein `X` auf dem Spielbrett sehen. Klickst du auf irgendein Feld, sollte ein  `X` erscheinen.

Wenn du `setState` in einer Komponente aufrufst wird React automatisch alle Kinderelemente mit aktualisieren.

**[Schau dir den vollständigen Code bis zu dieser Stelle an](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### Entwicklerwerkzeuge {#developer-tools}

Die React Devtools Erweiterung für [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) und [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) erlauben es dir den Baum der React-Komponenten in den Entwicklerwerkzeugen anzusehen.

<img src="../images/tutorial/devtools.png" alt="React Devtools" style="max-width: 100%">

Die React-DevTools ermöglichen es dir Props und State deiner React Komponente anzuschauen.

Nach dem installieren der React DevTools kannst du mit Rechtsklick auf ein jedes Element der Seite im Kontextmenü mit "untersuchen" die Developer Tools öffnen. Ein React-Tab ("⚛️ Components" und "⚛️ Profiler") taucht dann als letztes ganz rechts auf. Verwende "⚛️ Components", um den Komponentenbaum zu untersuchen.

**Jedoch sind noch ein paar Zusatzschritte notwendig um es mit CodePen benutzen zu können:**

1. Logge dich ein/Registriere dich und bestätige deine E-Mail (Benötigt um Spam zu vermeiden).
2. Klicke auf "Fork".
3. Klicke auf "Change View" und wähle dann "Debug mode".
4. Im neuen Tab, der sich öffnet sollten die Devtools jetzt einen React-Tab haben.

## Das Spiel fertigstellen {#completing-the-game}

Jetzt haben wir die Basis-Blöcke für unser Tic-Tac-Toe-Spiel. Um das Spiel zu vervollständigen, brauchen wir die abwechselnde Platzierung von 'X'en und '0'en auf dem Spielfeld und wir brauchen noch einen Weg um den Gewinner festzustellen.

### Den State hochholen {#lifting-state-up}

Zurzeit verwaltet jede Quadrat-Komponente seinen eigenen Spiel-State. Um herauszufinden, ob es einen Gewinner gibt, werden wir die Werte jedes der 9 Quadrate an einem Ort verwalten.

Man könnte denken, dass man jedes Quadrat zu seinem aktuellen State befragen sollte. Dieser Weg ist zwar eine mögliche Herangehensweise in React, wir raten jedoch davon ab, da dies zu unverständlichen Code führt, der mehr Bugs haben kann und  schwer überarbeitbar ist.
Anstelle dessen ist die beste Herangehensweise den aktuellen State in die Board-Elternkomponente zu speichern statt in jedem Quadrat selbst. Die Board-Komponente kann jedem Quadrat durch props mitteilen, was sie anzeigen sollen, [genau wie wir Zahlen an die Quadrate mitgegeben haben](#passing-data-through-props).

**Um Daten in mehreren Kindelementen zu sammeln oder um zwei Komponente miteinader kommunizieren zu lassen, musst du einen geteilten State in einer Elternkomponente definieren. Die Elternkomponente kann den State zurück an die Kinder mittels props weiterreichen. So können Kindkomponente und ihre Elternkomponente miteinander in Synchronisation gehalten werden**

Das Anheben des States in eine übergeordnete Komponente ist üblich, wenn React-Komponenten refactored werden -- lassen uns diese Gelegenheit nutzen, um es auszuprobieren.

Füge dem Board einen Konstruktor hinzu und setze den initialen State zu einem Array mit 9 null Einträgen, die den 9 Quadraten entsprechen:

```javascript{2-7}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={i} />;
  }
```

Wenn wir das Spielfeld später ausfüllen, wird das Array `this.state.squares` in etwa so aussehen:

```javascript
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

Die `renderSquare`-Methode sieht aktuell so aus:

```javascript
  renderSquare(i) {
    return <Square value={i} />;
  }
```

Am Anfang haben wir vom Board [`value` als Prop weitergegeben](#passing-data-through-props) um die Nummern 0 bis 8 in jedem Quadrat anzuzeigen. In einem weiteren vorherigen Schritt haben wir die Zahlen dann mit einem "X", [bestimmt durch den State der Quadrate](#making-an-interactive-component), ersetzt. Deshalb ignoriert das Quadrat gerade den als prop übermittelten `value`.

Wir werden jetzt den Machanismus zur Weitergabe von Props wieder verwenden. Wir werden das Spielbrett so anpassen, dass es jedem einzelnen Quadrat seinem aktuellen State (`'X'`, `'O'`, oder `null`) mitteilt. Wir haben bereits das `squares` Array im Konstruktor des Boards definiert und werden nun die `renderSquare`-Methode anpassen, sodass diese davon liest:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[Schau dir den vollständigen Code bis zu diesem Punkt an](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

Jedes Quadrat erhält nun `value` als prop, welches entweder den Wert `'X'`, `'O'`, oder `null` für leere Quadrate enthält.

Als nächstes müssen wir das Verhalten ändern, wenn ein Quadrat geklickt wird. Die Board-Komponente verwaltet bereits welche Quadrate gefüllt sind. Wir brauchen jetzt einen Weg für die Quadrate den State im Board anzupassen. Da der State als private Variable in der Komponente definiert ist, können wir es nicht direkt vom Quadrat aktualisieren.

Stattdessen übergeben wir eine Funktion vom Board an das Quadrat und lassen Square diese aufrufen, wenn ein Quadrat angeklickt wird. Wir ändern die Methode "renderSquare" im Board in:

```javascript{5}
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
```

>Hinweis
>
>Wir haben das zurückgegebene Element aus Gründen der Lesbarkeit in mehrere Zeilen aufgeteilt und Klammern hinzugefügt, damit JavaScript kein Semikolon nach `return` einfügt und unseren Code kaputt macht

Jetzt geben wir zwei Props von Board zu Square: `value` und `onClick`. Der `onClick`-Prop ist eine Funktion, die von Square immer aufgerufen wird, wenn es geklickt wird. Dafür machen wir folgende Änderungen in Square:

* Ersetzen von `this.state.value` mit `this.props.value` in der `render`-Methode vom Quadrat.
* Ersetzen von `this.setState()` mit `this.props.onClick()` in der `render`-Methode vom Quadrat.
* Löschen des `constructor` in Square, da Square nicht mehr den State des Spiels verfolgen muss

Nach diesen Änderungen sieht unsere Square-Komponente so aus:

```javascript{1,2,6,8}
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
```

Wenn ein Quadrat geklickt wird, wird die vom Board bereitgestellte `onClick`-Funktion aufgerufen. Nachfolgend ist eine Zusammenfassung, wie das funktioniert:

1. Die `onClick`-prop der im DOM eingebauten `<button>`-Komponente teilt React mit, einen Event Listener zu installieren.
2. Wenn ein Button geklickt wird ruft React den `onClick` Event Handler auf, der in der `render()`-Methode des Quadrats definiert ist.
3. Der Event Handler ruft `this.props.onClick()` auf. Die `onClick`-prop des Quadrats wurde vom Spielbrett spezifiziert.
4. Da das Spielbrett `onClick={() => this.handleClick(i)}` dem Quadrat übergeben hat, ruft das Quadrat `this.handleClick(i)` auf, wenn es geklickt wird.
5. Wir haben die Methode `handleClick()` noch nicht definiert, daher stürzt unser Code ab. Wenn du jetzt auf ein Quadrat klickst, solltest du einen roten Fehlerbildschirm sehen, der etwas sagt wie "this.handleClick is not a function".

>Hinweis
>
>Das DOM-`<button>`-Element `onClick`-Attribut hat eine besondere Bedeutung für React, weil es eine vor-eingebaute Komponente ist. Die Benamung bei eigenen Komponenten, wie Quadrat, ist dir überlassen. Wir könnten die `onClick`-prop vom Quadrat oder die `handleClick`-Methode des Spielbretts auch anders benennen. In React, jedoch, ist es eine Konvention `on[Event]` für props zu benutzen, die Events repräsentieren und `handle[Event]` für Methoden, die Events behandeln.

Wenn wir versuchen ein Quadrat anzuklicken, sollten wir noch eine Fehlermeldung bekommen, da wir `handleClick` bisher noch nicht definiert haben. Wir fügen `handleClick` nun zur Spielbrett-Klasse hinzu:

```javascript{9-13}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[Schau dir den vollständigen Code bis zu dieser Stelle an](https://codepen.io/gaearon/pen/ybbQJX?editors=0010)**

Nach diesen Änderungen sind wir wieder in der Lage die Quadrate zu füllen, wenn wir diese klicken. Jedoch wird jetzt der State im Spielbrett anstelle jedes einzelnen Quadrats gespeichert. Wenn das Spielbrett seinen State ändert, wird automatisch die Quadrat-Komponente neu-gerendert. Den State aller Quadrate im Spielbrett zu speichern gibt uns auch die Möglichkeit den Gewinner zu bestimmen.

Dadurch, dass die Quadrate nicht mehr ihren eigenen state verwalten, erhalten die Quadrate die Werte vom Spielbrett und informieren die Spielbrett-Komponente, wenn sie geklickt wurden. Im React-Jargon, die Quadrate sind nun **kontrollierte Komponente** (engl. **controlled components**). Das Spielbrett hat volle Kontrolle über sie.

Ist dir aufgefallen, wie wir in `handleClick` die Methode `.slice()` aufgerufen haben, um jedes mal eine neue Kopie vom `squares`-Array zu erzeugen? Wir werden im nächsten Abschnitt erklären, warum wir eine Kopie vom `squares`-Array erzeugen.

### Warum ist Unveränderlichkeit (engl. Immutability) wichtig {#why-immutability-is-important}

Im vorherigen Code-Beispiel haben wir empfohlen, `.slice()` zu verwenden um eine Kopie vom `squares`-Array zu erzeugen anstelle direkt das existierende Array zu modifizieren. Nun besprechen wir Unveränderlichkeit (engl. Immutability) und warum Unveränderlichkeit wichtig ist zu lernen.

Es gibt prinzipiell zwei Herangehensweisen Daten verändern. Die erste ist, die Daten *abzuändern* (engl. *mutate*) indem man den Wert direkt überschreibt. Der zweite Weg ist, den alten Datensatz durch eine neue Kopie zu ersetzen und die Änderungen der Kopie zuzuweisen.

#### Verändern von Datensätzen durch direktes Abändern {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// player ist jetzt {score: 2, name: 'Jeff'}
```

#### Verändern von Datensätzen ohne direktes Abändern {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// player ist unverändert, aber newPlayer ist jetzt {score: 2, name: 'Jeff'}

// Oder alternativ, wenn du den object spread syntax proposal verwendest:
// var newPlayer = {...player, score: 2};
```

Das Endresultat ist das gleiche, aber dadurch, dass du nicht direkt die Daten (oder die darunterliegenden Eigenschaften) abänderst, gewinnen wir einige Vorteile, die nachfolgend aufgelistet sind:

#### Komplexe Funktionalitäten werden Einfach {#complex-features-become-simple}

Unveränderlichkeit macht komplexe Funktionalität einfacher zum Implementieren. Weiter unten in diesem Tutorial werden wir eine "Zeitreisen"- (engl. time travel) Funktionalität einbauen, die es uns erlaubt Einsicht in die Tic-Tac-Toe-Spielhistorie zu gewinnen und zu vorherigen Zügen zurückzuspringen. Diese Funktionalität ist nicht nur für Spiele geeignet -- die Möglichkeit bestimmte Aktionen rückgängig zu machen und wiederherzustellen ist eine häufige Anforderung für Anwendungen. Das Vermeiden vom direkten Abändern der Daten ermöglicht uns die alten Zustände intakt zu lassen und diese zu einem späteren Zeitpunkt wieder zu verwenden.

#### Veränderung erkennen {#detecting-changes}

Veränderungen in variablen Objekten zu erkennen ist schwierig, da sie direkt verändert werden.
 Zur Erkennung müsste das variable Objekt mit seinen alten Kopien verglichen werden --
somit müsste der ganzen Objekt-Baum durchlaufen werden.

Veränderungen in unveränderlichen Objekten zu erkennen ist deutlich leichter. Falls das unveränderliche Objekt, auf das verwiesen wird, ein anderes ist als das vorhergehende, dann hat sich das Objekt verändert.

#### Entscheiden, wann neu gerendert werden soll {#determining-when-to-re-render-in-react}

Der Hauptvorteil von Unveränderlichkeit ist, dass es Dir hilft _pure components_ in React zu entwickeln. Durch unveränderbare Daten kann leicht ermittelt werden, ob Veränderungen gemacht worden sind, was hilft zu entscheiden, ob eine Komponente neu gerendert werden muss.

Du kannst mehr über `shouldComponentUpdate()` lernen und wie Du *pure components* entwickelst, wenn Du das hier liest [Optimizing Performance](/docs/optimizing-performance.html#examples).

### Funktionskomponenten {#function-components}

Wir verändern nun die Square-Komponente zu einer **Funktionskomponente**.

In React sind **Funktionskomponenten** ein leichterer Weg, um Komponenten zu schreiben,
 welche nur eine `render`-Methode beinhalten und keinen eigenen State haben.
 Statt eine Klasse zu definieren, welche `React.Component` erweitert, können wir eine Funktion schreiben, welche `props` als Input nimmt und zurückgibt, was gerendert werden soll.
 Funktionskomponenten sind weniger ermüdend zu schreiben als normale Klassen und viele Komponenten können mittels diesen Weges geschrieben werden.

Ersetze die Square-Klasse mit diesem Code:

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

Wir haben alle vorkommenden `this.props` mit `props` ersetzt.

**[Ganzen Quellcode bis zu diesem Punkt anschauen](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>Hinweis
>
>Als wir die Square-Klasse zu einer Funktionskomponente verändert haben, haben wir auch `onClick={() => this.props.onClick()}` zu einem kürzeren `onClick={props.onClick}` geändert (bemerke, dass die Klammern auf *beiden* Seiten fehlen).

### Einen Zug machen {#taking-turns}

Nun müssen wir einen offensichtlichen Fehler in unserer Tic-Tac-Toe Anwendung beheben: Die "O"s können nicht auf dem Spielfeld markiert werden.

Wir setzen den ersten Zug standardmäßig auf "X" .
Wir können diesen Zug standardmäßig setzen, indem wir den initialen State in unserem Board-Konstruktor verändern:

```javascript{6}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
```

Jedes Mal wenn ein Spieler einen Zug unternimmt, wird `xIsNext` (ein Boolean) geändert, um den nächsten Spieler zu bestimmen und den State des Spiels zu speichern.
Wir aktualisieren die `handleClick`-Funktion des Boards, um den Wert von `xIsNext` umzudrehen:

```javascript{3,6}
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

Durch diese Änderung wechseln sich "X"s und "O"s ab. Versuchs!

Lass uns ebenfalls den "status"-Text in Boards `render`-Funktion ändern, so dass sie anzeigt, welcher Spieler als nächstes an der Reihe ist:

```javascript{2}
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // the rest has not changed
```

Nachdem wir diese Veränderungen angewandt haben, sollte die Board-Komponente nun so aussehen:

```javascript{6,11-16,29}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[View the full code at this point](https://codepen.io/gaearon/pen/KmmrBy?editors=0010)**

### Einen Gewinner verkünden {#declaring-a-winner}

Da wir nun den nächsten Spieler anzeigen können, sollten wir ebenfalls anzeigen, wann das Spiel gewonnen ist und dass keine Züge mehr möglich sind. Wir können einen Gewinner bestimmen, indem wir diese Helfer-Funktion an das Ende der Datei schreiben:

```javascript
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

Bei einem Array mit 9 Quadraten prüft diese Funktion, ob es einen Gewinner gibt, und gibt entsprechend `'X'`, `'O'` oder `null` zurück.

Wir werden `calculateWinner(squares)` in der `render`-Funktion des Boards aufrufen, um zu prüfen, ob ein Spieler gewonnen hat. Falls ein Spieler gewonnen hat, können wir beispielsweise folgenden Text anzeigen: "Winner: X" or "Winner: O". Wir ersetzen die `status`-Deklaration in der `render`-Funktion des Boards mit folgendem Code:

```javascript{2-8}
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // Der Rest hat sich nicht verändert
```
Wir können nun die Funktion `handleClick` des Boards so ändern, dass sie vorzeitig zurückkehrt, indem wir einen Klick ignorieren, wenn jemand das Spiel gewonnen hat oder wenn ein Feld bereits gefüllt ist:

```javascript{3-5}
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

**[Den ganzen Quellcode an diesem Punkt anschauen](https://codepen.io/gaearon/pen/LyyXgK?editors=0010)**

Herzlichen Glückwunsch! Du hast nun ein funktionierendes Tic-Tac-Toe Spiel. 
Dazu hast du noch die grundlegenden Techniken von React gelernt. Demnach bist *Du* wahrscheinlich der echte Gewinner hier.

## Zeitreisen hinzufügen {#adding-time-travel}

Lass uns als abschließende Übung eine "Versionsgeschichte" hinzufügen, um zu älteren Zügen im Spiel zurückzukommen.

### Einen Zug-Verlauf speichern {#storing-a-history-of-moves}

Hätten wir das `squares`-Array veränderbar gemacht, wäre die Implementierung einer Versionsgeschichte sehr schwierig..

Wir verwendeten jedoch `slice()`, um eine neue Kopie des `squares`-Arrays nach jedem Zug zu erstellen und [behandelten den Array als unveränderbar](#why-immutability-is-important). 
Dies erlaubt uns, jede ältere Version des `squares`-Array zu speichern, und zwischen den Zügen zu springen, welche schon stattfanden.

Wir werden die alten `squares`-Arrays in einem anderen Array mit dem Namen `history` speichern. Das `history`-Array repräsentiert alle Zustände des Spielfelds, vom ersten bis zum letzten Zug und hat folgende Form:

```javascript
history = [
  // Before first move
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // After first move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // After second move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]
```

Nun müssen wir entscheiden, welche Komponente den `history`-State beinhalten wird.

### Den State nochmal hochholen {#lifting-state-up-again}

Wir möchten, dass die oberste Komponente, `Game`, eine Liste der bisherigen Züge anzeigt.
Um dies zu tun, benötigt diese Liste Zugriff auf `history`.
Deshalb platzieren wir den `history`-State in der obersten Komponente, `Game`.

Das Platzieren des `history`-States in der `Game`-Komponente erlaubt uns das Entfernen des `squares`-States von dessen Unterkomponente `Board`. So wie wir den State von der `Square`-Komponente in die `Board`-Komponente ["angehoben haben"](#lifting-state-up), so heben wir diesen nun von der `Board` in die `Game`-Komponente. Das gibt der `Game`-Komponente völlige Kontrolle über die Daten des Boards und lässt sie das Board anweisen, frühere Züge aus der `history` zu rendern.

Als erstes setzen wir den initialen State für die Game-Komponente in deren KonstruKtor:

```javascript{2-10}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

Als nächstes haben wir die Board-Komponente, welche die `squares` und `onClick`-Props von der Game-Komponente erhält.
Da wir nun einen einzigen Klick-Handler im Board für viele Squares haben, müssen wir die Position von jedem Square in den `onClick`-Handler übergeben, um anzugeben, welches Square geklickt worden ist. Hier sind die benötigten Schritte, um die Board-Komponente zu verändern:

* Lösche den `constructor` im Board.
* Ersetze `this.state.squares[i]` mit `this.props.squares[i]` in der Board `renderSquare`-Funktion.
* Ersetze `this.handleClick(i)` mit `this.props.onClick(i)` in der Board `renderSquare`-Funktion.

Die Board-Komponente sieht nun so aus:

```javascript{17,18}
class Board extends React.Component {
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

Wir aktualisieren die `render`-Funktion in der Game-Komponente, um den letzten Eintrag der Versionshistorie zu verwenden und den aktuellen Spielzustand anzuzeigen.

```javascript{2-11,16-19,22}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
```

Da die Game-Komponente nun den Spielzustand rendert, können wir den dazugehörigen Code aus Boards `render`-Methode entfernen. Nach dem Veränderung sollte die `render`-Funktion im Board so aussehen:

```js{1-4}
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
```

Als letztes müssen wir nun die `handleClick`-Methode aus der Board-Komponente in die Game-Komponente verlagern.
Wir müssen `handleClick` auch verändern, da der State der Game-Komponente eine andere Struktur hat.
In der `handleClick`-Methode von Game fügen wir die neuen Einträge der Versionsgeschichte der bestehenden `history` hinzu.

```javascript{2-4,10-12}
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
```

>Note
>
>Anders als die Array `push()`-Methode, welche Du vielleicht eher kennst, verändert die `concat()`-Methode den ursprünglichen Array nicht, weshalb wir diese bevorzugen.

An diesem Punkte benötigt die Board-Komponente nur noch die `renderSquare` und `render` -Methoden.
Der Spielzustand und die `handleClick`-Methode sollten sich in der Game-Komponente befinden.

**[Den ganzen Quellcode an diesem Punkt anschauen](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### Die letzten Züge anzeigen {#showing-the-past-moves}

Seit wir den Verlauf des Tic-Tac-Toes Spiel speichern, können wir diesen dem Spieler als eine Liste der letzten Züge anzeigen.

Wir haben vorhin gelernt, dass React-Elemente erstklassige JavaScript-Objekte sind; wir können diese in unserer Anwendung herumbewegen. Um mehrere Elemente in React rendern zu können, können wir einen Array an React-Elementen verwenden.

Arrays haben in JavaScript eine [`map()`-Methode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), welche verwendet wird um Daten auf andere Daten zu mappen, wie zum Beispiel:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
```

Durch das Verwenden der `map`-Methode können wir den Verlauf unserer Züge auf React-Elemente abbilden, die Buttons auf dem Bildschirm darstellen und eine Liste von Buttons anzeigen, um zu vergangenen Zügen zu "springen".

Lass und über die `history` in Games `render`-Methode mappen.

```javascript{6-15,34}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
```

**[View the full code at this point](https://codepen.io/gaearon/pen/EmmGEa?editors=0010)**

For each move in the tic-tac-toe game's history, we create a list item `<li>` which contains a button `<button>`. The button has a `onClick` handler which calls a method called `this.jumpTo()`. We haven't implemented the `jumpTo()` method yet. For now, we should see a list of the moves that have occurred in the game and a warning in the developer tools console that says:

>  Warning:
>  Each child in an array or iterator should have a unique "key" prop. Check the render method of "Game".

Let's discuss what the above warning means.

### Einen Schlüssel (key) auswählen {#picking-a-key}

When we render a list, React stores some information about each rendered list item. When we update a list, React needs to determine what has changed. We could have added, removed, re-arranged, or updated the list's items.

Imagine transitioning from

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

to

```html
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

In addition to the updated counts, a human reading this would probably say that we swapped Alexa and Ben's ordering and inserted Claudia between Alexa and Ben. However, React is a computer program and does not know what we intended. Because React cannot know our intentions, we need to specify a *key* property for each list item to differentiate each list item from its siblings. One option would be to use the strings `alexa`, `ben`, `claudia`. If we were displaying data from a database, Alexa, Ben, and Claudia's database IDs could be used as keys.

```html
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

When a list is re-rendered, React takes each list item's key and searches the previous list's items for a matching key. If the current list has a key that didn't exist before, React creates a component. If the current list is missing a key that existed in the previous list, React destroys the previous component. If two keys match, the corresponding component is moved. Keys tell React about the identity of each component which allows React to maintain state between re-renders. If a component's key changes, the component will be destroyed and re-created with a new state.

`key` is a special and reserved property in React (along with `ref`, a more advanced feature). When an element is created, React extracts the `key` property and stores the key directly on the returned element. Even though `key` may look like it belongs in `props`, `key` cannot be referenced using `this.props.key`. React automatically uses `key` to decide which components to update. A component cannot inquire about its `key`.

**It's strongly recommended that you assign proper keys whenever you build dynamic lists.** If you don't have an appropriate key, you may want to consider restructuring your data so that you do.

If no key is specified, React will present a warning and use the array index as a key by default. Using the array index as a key is problematic when trying to re-order a list's items or inserting/removing list items. Explicitly passing `key={i}` silences the warning but has the same problems as array indices and is not recommended in most cases.

Keys do not need to be globally unique; they only need to be unique between components and their siblings.


### Zeitreisen implementieren {#implementing-time-travel}

In the tic-tac-toe game's history, each past move has a unique ID associated with it: it's the sequential number of the move. The moves are never re-ordered, deleted, or inserted in the middle, so it's safe to use the move index as a key.

In the Game component's `render` method, we can add the key as `<li key={move}>` and React's warning about keys should disappear:

```js{6}
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
```

**[View the full code at this point](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

Clicking any of the list item's buttons throws an error because the `jumpTo` method is undefined. Before we implement `jumpTo`, we'll add `stepNumber` to the Game component's state to indicate which step we're currently viewing.

First, add `stepNumber: 0` to the initial state in Game's `constructor`:

```js{8}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
```

Next, we'll define the `jumpTo` method in Game to update that `stepNumber`. We also set `xIsNext` to true if the number that we're changing `stepNumber` to is even:

```javascript{5-10}
  handleClick(i) {
    // this method has not changed
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // this method has not changed
  }
```

We will now make a few changes to the Game's `handleClick` method which fires when you click on a square.

The `stepNumber` state we've added reflects the move displayed to the user now. After we make a new move, we need to update `stepNumber` by adding `stepNumber: history.length` as part of the `this.setState` argument. This ensures we don't get stuck showing the same move after a new one has been made.

We will also replace reading `this.state.history` with `this.state.history.slice(0, this.state.stepNumber + 1)`. This ensures that if we "go back in time" and then make a new move from that point, we throw away all the "future" history that would now become incorrect.

```javascript{2,13}
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
```

Finally, we will modify the Game component's `render` method from always rendering the last move to rendering the currently selected move according to `stepNumber`:

```javascript{3}
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // the rest has not changed
```

If we click on any step in the game's history, the tic-tac-toe board should immediately update to show what the board looked like after that step occurred.

**[View the full code at this point](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### Zusammenfassung {#wrapping-up}

Glückwunsch! Du hast ein Tic-Tac-Toe-Spiel entwickelt welches:

* Dir erlaubt Tic-Tac-Toe zu spielen,
* Versteht, falls ein Spieler gewonnen hat,
* Den Spielverlauf speichert,
* Den Spielverlauf zu betrachten und alte Ansichten des Spielbretts aufzurufen.

Gute Arbeit! Wir hoffen, dass Du nun einen guten Überblick hast wie React funktioniert.

Sieh dir das finale Ergebnis hier an: **[Final Result](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

Falls Du noch Zeit hast oder an deinen React-Fähigkeiten arbeiten möchtest -- Hier sind ein paar Ideen für Verbesserungen welche Du in das Tic-Tac-Toe-Spiel implementieren könntest.
Die Liste ist aufsteigend nach Schwierigkeit sortiert.

1. Zeige die Position für jeden Zug im Format (col, row) in der Zug-Verlaufs-Liste.
2. Markiere das ausgewählte Element in der Zugliste fett.
3. Schreibe Board so, dass Du zwei Schleifen verwendest um die Quadrate im Spielbrett zu erzeugen, anstatt sie zu hardcoden.
4. Füge einen Umschalt-Button hinzu, welcher dir erlaubt die Züge in aufsteigender oder absteigender Ordnung zu sortieren.
5. Falls jemand gewinnen sollte, markiere die 3 Gewinner-Kästchen.
6. Falls keiner gewinnen sollte, soll eine Nachricht angezeigt werden, dass es ein Untentschieden ist.

Mit diesem Tutorial haben wir die Konzepte von React betrachtet, inkl. elements, components, props und state.
Detailliertere Informationen zu diesen Themen findet man [im Rest der Dokumentation](/docs/hello-world.html)

Um mehr über Komponenten herauszufinden, lohnt sich ein Blick in [`React.Component` API reference](/docs/react-component.html).
