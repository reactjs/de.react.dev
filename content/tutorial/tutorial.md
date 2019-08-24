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

Für diese Einführung sind keine Vorkenntnisse in Reach nötig.

## Bevor wir mit den Tutorial anfangen {#before-we-start-the-tutorial}

Wir werden im Laufe dieses Tutorials ein Spiel programmieren. **Vielleicht möchtest du es überspringen, weil du keine Spiele programmieren willst -- aber gib es doch eine Chance.** Die Techniken die du in diesem Tutorial lernen wirst, sind fundamental um eine React-App zu erstellen, es zu meistern wird dir ein tiefes Verständnis von React geben.

>Tipp
>
>Dieses Tutorial ist gestaltet für jene, die **learn by doing** bevorzugen. Solltest du es be bevorzugen, die Konzepte von grundauf zu lernen, schau doch auf unsere [Schritt für Schritt Anleitung](/docs/hello-world.html). Das Anleitung und das Tutorial können für dich ergänzend sein.

Dieses Tutorial ist in mehreren Sektionen aufgeteilt:

* Das [Setup für das Tutorial](#setup-for-the-tutorial) gibt dir **eine Basis** um das Tutorial zu verfolgen.
* Die [Übersicht](#overview) bringt dir die **Fundamente** von React bei: Komponenten, Props und State.
* [Das Spiel fertigstellen](#completing-the-game) zeigt dir **die am häufigsten vorkommenen Techniken** bei der Entwicklung mit React.
* [Zeitreisen hinzufügen](#adding-time-travel) gibt dir **einen tieferen Einblick** in die einzigartigen Stärken von React.

Du musst nicht alle Abschnitte des Tutorials direkt abschließen um einen Mehrwert aus dem Tutorial zu gewinnen. Komme so weit du kannst, selbst wenn es nur ein oder zwei Abschnitte sind.

Es ist völlig in Ordnung Code während du das Tutorial machst zu kopieren, jedoch empfehlen wir dir selbst den Code zu schreiben. Das hilft dir effektivier die Informationen zu verinnerlichen und ein besseres Verständnis für die Techniken zu gewinnen.

### Was werden wir erstellen? {#what-are-we-building}

In diesem Tutorial werden wir dir zeigen, wie du ein interaktives Tic-Tac-Toe-Spiel mit React bauen kannst.

Du kannst das Ziel unseres Projektes hier einsehen: **[Finales Ergebnis](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. Sollte der Code keinen Sinn für dich ergeben oder du dich mit dem Syntax nicht auskennst, kein Problem! Das Ziel dieses Tutorials ist es, dir zu helfen React und seinen Syntax zu verstehen.

Wir empfehlen dir, dass du dir das Tic-Tac-Toe anschaust, bevor du mit dem Tutorial weitermachst. Eines der Features, die du bemerken wirst, ist, dass rechts vom Spielbrett eine numerierte Liste ist. Diese Liste zeigt alle vergangenen getätigten Züge und wird mit dem Fortschreiten des Spiels aktualisiert.

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

Wenn du nicht mehr weiterkommst, schau am Besten in die [Community-Support-Ressourcen](/community/support.html). Im speziellen ist der [Reactiflux Chat](https://discord.gg/0ZcbPKXt5bZjGY5n) ein guter Weg um schnell Antworten und Hilfestellungen zu bekommen. Solltest du keine Antwort bekommen, oder weiterhin festhängen, erstelle ein Issue-Ticket und wir werden dir raushelfen.

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

## Betrachten des Basiscodes {#inspecting-the-starter-code}

Wenn du an dem Tutorial **in deinem Browser** arbeitest, öffne diesen Code in einem neuen Tab: **[Basiscode](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Wenn du an dem Tutorial **lokal** arbeitest, öffne stattdessen `src/index.js` in deinem Projektverzeichnis (du hast diese Datei bereits während des [Setups](#setup-option-2-local-development-environment) erstellt).

Dieser Basiscode ist die Grundlage auf der wir bauen. Wir haben bereits das CSS vorbereitet, sodass du dich nur auf das Lernen von React fokussieren und das Tic-Tac-Toe-Spiel programmieren kannst.

Bei genauer Betrachtung des Codes wirst du sehen, dass wir drei React-Kompontente haben:

* Square
* Board
* Game

Die "Square"-Komponente stellt einen einzelnen `<button>` dar und das Spielbrett "Board" besitzt 9 davon. Die "Game"-Komponente besitzt ein "board" mit Platzhalter-Werten welche wir später modifizieren werden. Derzeit gibt es keine interaktiven Komponente.

### Daten über props weitergeben {#passing-data-through-props}

Um einen ersten Schritt wagen zu können, werden wir erstmal probieren Daten von der "Board"-Komponente in die "Square"-Komponente weiterzugeben.

In der `renderSquare`-Methode vom "Board", ändere den Code um einen prop namens `value` zum "Square" weiterzureichen:

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
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

Klicken wir nun unser Quadrat, meldet der Browser sich mit einem PopUp.

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
* Ersetze den `() => alert()` Event-Handler mit `() => this.setState({value: 'X'})`.
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

Nach dem installieren der React DevTools kannst du mit Rechtsklick auf ein jedes Element der Seite im Kontextmenü mit "untersuchen" die Developer Tools öffnen. Ein React-Tab taucht dann als letztes ganz rechts auf.

**Jedoch sind noch ein paar Zusatzschritte notwendig um es mit CodePen benutzen zu können:**

1. Logge dich ein/Registriere dich und bestätige deine E-Mail (Benötigt um Spam zu vermeiden).
2. Klicke auf "Fork".
3. Klicke auf "Change View" und wähle dann "Debug mode".
4. Im neuen Tab, der sich öffnet sollten die Devtools jetzt einen React-Tab haben.

## Das Spiel fertigstellen {#completing-the-game}

Jetzt haben wir die Basis-Blöcke für unser Tic-Tac-Toe-Spiel. Um das Spiel zu vervollständigen, brauchen wir die abwechselnde Platzierung von 'X'en und '0'en auf dem Spielfeld und wir brauchen noch einen Weg um den Gewinner festzustellen.

### Den State hochholen {#lifting-state-up}

Zurzeit verwaltet jede Quadrat-Komponente seinen eigenen Spiel-State. Um herauszufinden, ob es einen Gewinner gibt, werden wir die Werte jedes der 9 Quadrate an einem Ort verwalten.

Man könnte denken, dass man jedes Quadrat zu seinem aktuellen Zustand (engl. state) befragen sollte. Dieser Weg ist zwar eine mögliche Herangehensweise in React, wir raten jedoch davon ab, da dies zu unverständlichen Code führt, der mehr Bugs haben kann und  schwer überarbeitbar ist.
Anstelle dessen ist die beste Herangehensweise den aktuellen Zustand in die Spielbrett-Elternkomponente zu speichern statt in jedem Quadrat selbst. Die Spielbrett-Komponente kann jedem Quadrat durch props mitteilen, was sie anzeigen sollen, [genau wie wir Zahlen an die Quadrate mitgegeben haben](#passing-data-through-props).

**Um Daten in mehreren Kindelementen zu sammeln oder um zwei Komponente miteinader kommunizieren zu lassen, musst du einen geteilten State in einer Elternkomponente definieren. Die Elternkomponente kann den State zurück an die Kinder mittels props weiterreichen. So können Kindkomponente und ihre Elternkomponente miteinander in Synchronisation gehalten werden**

Den State in die Elternkomponente hochzubringen ist ein häufiges Vorkommen, wenn React-Komponente überarbeitet werden -- Lass uns diese Möglichkeit nutzen und es ausprobieren. Wir fügen einen Konstruktor zum Spielbrett hinzu und setzen den initialen State zu einem array mit 9 nulls. Diese 9 nulls korrespondieren dann mit den 9 Quadraten.

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

Wenn wir später das Spielbrett füllen, wird das Spielbrett so aussieht:

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

Am Anfang haben wir vom Spielbrett [`value` als prop weitergegeben](#passing-data-through-props) um die Nummern 0 bis 8 in jedem Quadrat anzuzeigen. In einem weiteren vorherigen Schritt haben wir die Zahlen dann mit einem "X", [bestimmt durch den State der Quadrate](#making-an-interactive-component), ersetzt. Deshalb ignoriert das Quadrat gerade den als prop übermittelten `value`.

Wir werden jetzt den prop-Weitergeben-Mechanismus wieder verwenden. Wir werden das Spielbrett so anpassen, dass es jedem einzelnen Quadrat seinem aktuellen Zustand (`'X'`, `'O'`, oder `null`) mitteilt. Wir haben bereits das `squares` array im Konstruktor des Spielbretts definiert und werden nun die `renderSquare`-Methode anpassen, sodass diese davon liest:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[Schau dir den vollständigen Code bis zu diesem Punkt an](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

Jedes Quadrat erhält nun `value` als prop, welches entweder den Wert `'X'`, `'O'`, oder `null` für leere Quadrate enthält. 

Als nächstes müssen wir das Verhalten ändern, wenn ein Quadrat geklickt wird. Die Spielbrett-Komponente verwaltet bereits welche Quadrate gefüllt sind. Wir brauchen jetzt einen Weg für die Quadrate den state im Spielbrett anzupassen. Da state als private Variable in der Komponente definiert ist, können wir es nicht direkt vom Quadrat aktualisieren.

Um die Privatsphäre des Spielbretts zu wahren, müssen wir eine Funktion vom Spielbrett runter in die Quadrate mitgeben. Diese Funktion wird dann aufgerufen, wenn ein Quadrat geklickt wird. Dafür ändern wir `renderSquare` im Spielbrett ab: 

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
>Wir spalten das zurückgegebene Element in mehrere Zeilen wegen der Lesbarkeit auf und haben Klammern hinzugefügt, damit JavaScript kein Semikolon hinter das `return` setzt und somit unseren Code zerstört

Jetzt geben wir zwei props vom Spielbrett zum Quadrat: `value` und `onClick`. Der `onClick`-prop ist eine Funktion, die vom Quadrat immer aufgerufen wird, wenn es geklickt wird. Dafür machen wir folgende Änderungen im Quadrat:

* Ersetzen von `this.state.value` mit `this.props.value` in der `render`-Methode vom Quadrat.
* Ersetzen von `this.setState()` mit `this.props.onClick()` in der `render`-Methode vom Quadrat. 
* Löschen des `constructor` im Quadrat, da das Quadrat nicht mehr den Zustand des Spiels verfolgen muss

Nach diesen Änderungen sieht unsere Quadrat-Komponente so aus:

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

Wenn ein Quadrat geklickt wird, die vom Spielbrett bereitgestellte `onClick`-Funktion wird aufgerufen. Nachfolgend ist eine Zusammenfassung, wie das funktioniert:

1. Die `onClick`-prop der im DOM eingebauten `<button>`-Komponente teilt React mit, einen Event Listener zu installieren.
2. Wenn ein Button geklickt wird ruft React den `onClick` Event Handler auf, der in der `render()`-Methode des Quadrats definiert ist.
3. Der Event Handler ruft `this.props.onClick()` auf. Die `onClick`-prop des Quadrats wurde vom Spielbrett spezifiziert.
4. Da das Spielbrett `onClick={() => this.handleClick(i)}` dem Quadrat übergeben hat, ruft das Quadrat `this.handleClick(i)` auf, wenn es geklickt wird.
5. Wir haben `handleClick()` noch nicht definiert, daher crasht unser Code noch.

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

Nach diesen Änderungen sind wir wieder in der Lage die Quadrate zu füllen, wenn wir diese klicken. Jedoch wird jetzt der Zustand im Spielbrett anstelle jedes einzelnen Quadrats gespeichert. Wenn das Spielbrett seinen Zustand ändert, wird automatisch die Quadrat-Komponente neu-gerendert. Den Zustand aller Quadrate im Spielbrett zu speichern gibt uns auch die Möglichkeit den Gewinner zu bestimmen.

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

Detecting changes in mutable objects is difficult because they are modified directly. This detection requires the mutable object to be compared to previous copies of itself and the entire object tree to be traversed.

Detecting changes in immutable objects is considerably easier. If the immutable object that is being referenced is different than the previous one, then the object has changed.

#### Determining When to Re-render in React {#determining-when-to-re-render-in-react}

The main benefit of immutability is that it helps you build _pure components_ in React. Immutable data can easily determine if changes have been made which helps to determine when a component requires re-rendering.

You can learn more about `shouldComponentUpdate()` and how you can build *pure components* by reading [Optimizing Performance](/docs/optimizing-performance.html#examples).

### Funktionskomponente {#function-components}

We'll now change the Square to be a **function component**.

In React, **function components** are a simpler way to write components that only contain a `render` method and don't have their own state. Instead of defining a class which extends `React.Component`, we can write a function that takes `props` as input and returns what should be rendered. Function components are less tedious to write than classes, and many components can be expressed this way.

Replace the Square class with this function:

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

We have changed `this.props` to `props` both times it appears.

**[View the full code at this point](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>Note
>
>When we modified the Square to be a function component, we also changed `onClick={() => this.props.onClick()}` to a shorter `onClick={props.onClick}` (note the lack of parentheses on *both* sides). In a class, we used an arrow function to access the correct `this` value, but in a function component we don't need to worry about `this`.

### Einen Zug machen {#taking-turns}

We now need to fix an obvious defect in our tic-tac-toe game: the "O"s cannot be marked on the board.

We'll set the first move to be "X" by default. We can set this default by modifying the initial state in our Board constructor:

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

Each time a player moves, `xIsNext` (a boolean) will be flipped to determine which player goes next and the game's state will be saved. We'll update the Board's `handleClick` function to flip the value of `xIsNext`:

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

With this change, "X"s and "O"s can take turns. Let's also change the "status" text in Board's `render` so that it displays which player has the next turn:

```javascript{2}
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // the rest has not changed
```

After applying these changes, you should have this Board component:

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

Now that we show which player's turn is next, we should also show when the game is won and there are no more turns to make. We can determine a winner by adding this helper function to the end of the file:

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

We will call `calculateWinner(squares)` in the Board's `render` function to check if a player has won. If a player has won, we can display text such as "Winner: X" or "Winner: O". We'll replace the `status` declaration in Board's `render` function with this code:

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
      // the rest has not changed
```

We can now change the Board's `handleClick` function to return early by ignoring a click if someone has won the game or if a Square is already filled:

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

**[View the full code at this point](https://codepen.io/gaearon/pen/LyyXgK?editors=0010)**

Congratulations! You now have a working tic-tac-toe game. And you've just learned the basics of React too. So *you're* probably the real winner here.

## Zeitreisen hinzufügen {#adding-time-travel}

As a final exercise, let's make it possible to "go back in time" to the previous moves in the game.

### Einen Zug-Verlauf speichern {#storing-a-history-of-moves}

If we mutated the `squares` array, implementing time travel would be very difficult.

However, we used `slice()` to create a new copy of the `squares` array after every move, and [treated it as immutable](#why-immutability-is-important). This will allow us to store every past version of the `squares` array, and navigate between the turns that have already happened.

We'll store the past `squares` arrays in another array called `history`. The `history` array represents all board states, from the first to the last move, and has a shape like this:

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

Now we need to decide which component should own the `history` state.

### Den State nochmal hochholen {#lifting-state-up-again}

We'll want the top-level Game component to display a list of past moves. It will need access to the `history` to do that, so we will place the `history` state in the top-level Game component.

Placing the `history` state into the Game component lets us remove the `squares` state from its child Board component. Just like we ["lifted state up"](#lifting-state-up) from the Square component into the Board component, we are now lifting it up from the Board into the top-level Game component. This gives the Game component full control over the Board's data, and lets it instruct the Board to render previous turns from the `history`.

First, we'll set up the initial state for the Game component within its constructor:

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

Next, we'll have the Board component receive `squares` and `onClick` props from the Game component. Since we now have a single click handler in Board for many Squares, we'll need to pass the location of each Square into the `onClick` handler to indicate which Square was clicked. Here are the required steps to transform the Board component:

* Delete the `constructor` in Board.
* Replace `this.state.squares[i]` with `this.props.squares[i]` in Board's `renderSquare`.
* Replace `this.handleClick(i)` with `this.props.onClick(i)` in Board's `renderSquare`.

The Board component now looks like this:

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

We'll update the Game component's `render` function to use the most recent history entry to determine and display the game's status:

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

Since the Game component is now rendering the game's status, we can remove the corresponding code from the Board's `render` method. After refactoring, the Board's `render` function looks like this:

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

Finally, we need to move the `handleClick` method from the Board component to the Game component. We also need to modify `handleClick` because the Game component's state is structured differently. Within the Game's `handleClick` method, we concatenate new history entries onto `history`.

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
>Unlike the array `push()` method you might be more familiar with, the `concat()` method doesn't mutate the original array, so we prefer it.

At this point, the Board component only needs the `renderSquare` and `render` methods. The game's state and the `handleClick` method should be in the Game component.

**[View the full code at this point](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### Die letzten Züge anzeigen {#showing-the-past-moves}

Since we are recording the tic-tac-toe game's history, we can now display it to the player as a list of past moves.

We learned earlier that React elements are first-class JavaScript objects; we can pass them around in our applications. To render multiple items in React, we can use an array of React elements.

In JavaScript, arrays have a [`map()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) that is commonly used for mapping data to other data, for example:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
``` 

Using the `map` method, we can map our history of moves to React elements representing buttons on the screen, and display a list of buttons to "jump" to past moves.

Let's `map` over the `history` in the Game's `render` method:

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

For each move in the tic-tac-toes's game's history, we create a list item `<li>` which contains a button `<button>`. The button has a `onClick` handler which calls a method called `this.jumpTo()`. We haven't implemented the `jumpTo()` method yet. For now, we should see a list of the moves that have occurred in the game and a warning in the developer tools console that says:

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

Congratulations! You've created a tic-tac-toe game that:

* Lets you play tic-tac-toe,
* Indicates when a player has won the game,
* Stores a game's history as a game progresses,
* Allows players to review a game's history and see previous versions of a game's board.

Nice work! We hope you now feel like you have a decent grasp on how React works.

Check out the final result here: **[Final Result](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game which are listed in order of increasing difficulty:

1. Display the location for each move in the format (col, row) in the move history list.
2. Bold the currently selected item in the move list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.

Throughout this tutorial, we touched on React concepts including elements, components, props, and state. For a more detailed explanation of each of these topics, check out [the rest of the documentation](/docs/hello-world.html). To learn more about defining components, check out the [`React.Component` API reference](/docs/react-component.html).
