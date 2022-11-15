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

## Bevor wir mit dem Tutorial anfangen {#before-we-start-the-tutorial}

Wir werden im Laufe dieses Tutorials ein kleines Spiel programmieren. ** Vielleicht neigst du dazu, es zu überspringen, weil du keine Spiele programmieren willst -- aber gib ihm doch eine Chance.** Die Techniken, die du in diesem Tutorial lernen wirst, sind notwendig um eine React-App zu erstellen. Wenn du das Tutorial bewältigst, wird dir das ein tiefes Verständnis von React geben.

>Tipp
>
>Dieses Tutorial ist gestaltet für jene, die **learn by doing** bevorzugen. Solltest du es bevorzugen, die Konzepte von Grund auf zu lernen, schau doch in unsere [Schritt für Schritt Anleitung](/docs/hello-world.html). Das Tutorial und die Anleitung ergänzen sich gegenseitig.

Dieses Tutorial ist in mehrere Abschnitte aufgeteilt:

* Das [Setup für das Tutorial](#setup-for-the-tutorial) gibt dir **einen Ausgangspunkt** um das Tutorial durchzuführen.
* Die [Übersicht](#overview) bringt dir die **Grundlagen** von React bei: Components, Props und State.
* [Das Spiel fertigstellen](#completing-the-game) zeigt dir **die am häufigsten vorkommenden Techniken** während der Entwicklung mit React.
* [Zeitreisen hinzufügen](#adding-time-travel) gibt dir **einen tieferen Einblick** in die einzigartigen Stärken von React.

Du musst nicht sofort alle Abschnitte abschließen, um einen Mehrwert aus dem Tutorial zu ziehen. Versuche so weit zu kommen, wie du kannst, selbst wenn es nur ein oder zwei Abschnitte sind.

### Was werden wir erstellen? {#what-are-we-building}

In diesem Tutorial werden wir dir zeigen, wie du ein interaktives Tic-Tac-Toe-Spiel mit React erstellen kannst.

Hier kannst du sehen, was wir erstellen werden: **[Finales Ergebnis](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. Sollte der Code keinen Sinn für dich ergeben oder solltest du dich mit der Syntax nicht auskennen, kein Problem! Das Ziel dieses Tutorials ist es, dir zu helfen React und dessen Syntax zu verstehen.

Wir empfehlen dir, dass du dir das Tic-Tac-Toe-Spiel anschaust, bevor du mit dem Tutorial weitermachst. Eines der Features, die du bemerken wirst, ist, dass sich rechts vom Spielbrett eine nummerierte Liste befindet. Diese Liste zeigt alle getätigten Züge an und wird mit dem Spielfortschritt aktualisiert.

Du kannst das Tic-Tac-Toe-Spiel schließen, sobald du dich damit vertraut gemacht hast. Wir werden in diesem Tutorial mit einem einfacheren Template beginnen. Im nächsten Schritt helfen wir dir alles einzurichten, damit du anfangen kannst, das Spiel zu erstellen.

### Voraussetzungen {#prerequisites}

Wir nehmen an, dass du bereits ein wenig mit HTML und JavaScript vertraut bist. Selbst wenn du vorher eine andere Sprache erlernt hast, solltest du trotzdem in der Lage sein, folgen zu können. Des Weiteren nehmen wir an, dass dir Programmierkonzepte wie Funktionen, Objekte, Arrays und in geringerem Maße auch Klassen ein Begriff sind.

Wenn du die Grundlagen von JavaScript noch einmal wiederholen möchtest, empfehlen wir dir [dieses Handbuch](https://developer.mozilla.org/de/docs/Web/JavaScript/Eine_Wiedereinfuehrung_in_JavaScript) zu lesen. Beachte, dass wir auch Features von ES6 nutzen werden -- eine aktuelle Version von JavaScript. In diesem Tutorial verwenden wir unter anderem die sogenannte [arrow-Funktion](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/Pfeilfunktionen), [Klassen](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Klassen), [`let`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/let), und [`const`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/const) Ausdrücke. Schaue dir [Babel REPL](babel://es5-syntax-example) an, um zu sehen, in was ES6-Code kompiliert wird.

## Setup für das Tutorial {#setup-for-the-tutorial}

Es gibt zwei Möglichkeiten, das Tutorial durchzuführen: Entweder du schreibst den Code direkt im Browser oder du richtest dir eine lokale Entwicklungsumgebung ein.

### Möglichkeit 1: Code direkt im Browser schreiben {#setup-option-1-write-code-in-the-browser}

Das ist der schnellste Weg um direkt anfangen zu können!

Zuerst öffnest du diesen **[Einstiegscode](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)** in einem neuen Tab. Im neuen Tab solltest du ein leeres Tic-Tac-Toe-Spielbrett und React-Code sehen können. Den React-Code werden wir innerhalb dieses Tutorials bearbeiten.

Jetzt kannst du die zweite Setup-Option überspringen und direkt zum Abschnitt [Übersicht](#overview) springen, um eine Übersicht über React zu erhalten.

### Möglichkeit 2: Lokale Entwicklungsumgebung {#setup-option-2-local-development-environment}

Das ist komplett optional und für dieses Tutorial nicht notwendig!

<br>

<details>

<summary><b>Optional: Anleitung um lokal in deinem bevorzugten Texteditor mit dem Tutorial weiterzumachen</b></summary>

Dieses Setup benötigt mehr initialen Aufwand, ermöglicht dir jedoch, das Tutorial in einem Editor deiner Wahl durchzuführen. Folgende Schritte sind dafür notwendig:

1. Stelle sicher, dass du eine aktuelle Version von [Node.js](https://nodejs.org/de/) installiert hast.
2. Folge den [Installationsanweisungen für Create React App](/docs/create-a-new-react-app.html#create-react-app) um ein neues Projekt zu erstellen.

```bash
npx create-react-app meine-app
```

3. Lösche alle Dateien innerhalb des `src/`-Ordners des neuen Projektes. 

> Hinweis:
>
>**Lösche nicht den gesamten `src`-Ordner sondern lediglich die Dateien innerhalb des Verzeichnisses.** Wir werden die Standard-Quellcode-Dateien im nächsten Schritt mit Beispielen für dieses Projekt ersetzen.

```bash
cd meine-app
cd src

# Wenn du einen Mac oder Linux benutzt:
rm -f *

# Oder wenn du Windows nutzt:
del *

# Wechsle danach zurück zum Projekt-Verzeichnis
cd ..
```

4. Füge eine Datei mit dem Namen `index.css` in den `src/`-Ordner mit [diesem CSS-Code](https://codepen.io/gaearon/pen/oWWQNa?editors=0100) ein.

5. Füge eine Datei mit dem Namen `index.js` in den `src/`-Ordner mit [diesem JS-Code](https://codepen.io/gaearon/pen/oWWQNa?editors=0010) ein.

6. Schreibe diese drei Zeilen an den Anfang von `index.js` im `src/`-Ordner:

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
```

Wenn du jetzt `npm start` in deinem Projektverzeichnis ausführst und dann im Browser `http://localhost:3000` aufrufst, solltest du ein leeres Tic-Tac-Toe-Feld sehen.

Wir empfehlen dir [diese Anweisungen](https://babeljs.io/docs/editors/) zu befolgen, um Syntax-Highlighting für deinen Editor zu konfigurieren.

</details>

### Hilfe, ich hänge fest! {#help-im-stuck}

Wenn du nicht mehr weiterkommst, schau am besten in die [Community-Support-Ressourcen](/community/support.html). Insbesondere ist der [Reactiflux Chat](https://discord.gg/reactiflux) ein guter Weg um schnell Hilfe zu bekommen. Solltest du keine Antwort bekommen, oder weiterhin festhängen, erstelle ein Issue-Ticket und wir werden dich unterstützen.

## Übersicht {#overview}

Da du jetzt alles vorbereitet hast, lass uns erstmal einen Überblick über React bekommen!

### Was ist React? {#what-is-react}

React ist eine deklarative, effiziente und flexible JavaScript-Bibliothek für das Erstellen von Benutzeroberflächen. Es ermöglicht dir, komplexe Oberflächen aus kleinen isolierten Code-Schnipseln, sogenannten "Komponenten" (engl. components), zusammenzustellen.

React bietet ein paar unterschiedliche Arten von Komponenten an, aber wir beginnen mit den `React.Component` Subklassen:

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

Wir kommen bald zu den merkwürdigen XML-ähnlichen Tags. Wir nutzen Komponenten um React mitzuteilen, was wir dargestellt haben wollen. Wenn sich unsere Daten ändern wird React die Komponenten effizient aktualisieren und neu darstellen.

In unserem Beispiel ist ShoppingList eine **React Komponenten-Klasse** bzw. ein **React Komponententyp**. Eine Komponente nimmt Parameter, sogenannte `props` (kurz für engl. "properties" - Eigenschaften) entgegen und gibt über die `render`-Methode eine Darstellungs-Hierarchie zurück.

Die `render`-Methode gibt eine *Beschreibung* von dem zurück, was du auf dem Bildschirm sehen willst. React nimmt diese Beschreibung und zeigt das Ergebnis an. Genauergesagt gibt `render` ein **React-Element** zurück, welches eine leichtgewichtige Beschreibung von dem ist, was dargestellt werden soll. Die meisten React-Entwickler nutzen eine spezielle Syntax namens "JSX" welche es leichter macht, solche Strukturen zu schreiben. Die `<div />`-Syntax wird während des Builds in ein `React.createElement('div')` umgewandelt. Das Beispiel oben entspricht:

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 Kindelemente ... */),
  React.createElement('ul', /* ... ul Kindelemente ... */)
);
```

[Gesamtes Beispiel anzeigen.](babel://tutorial-expanded-version)

Wenn du mehr über `createElement()` wissen willst, findest du eine detaillierte Beschreibung in der [API Referenz](/docs/react-api.html#createelement). Jedoch werden wir `createElement()` in diesem Tutorial nicht verwenden. Stattdessen werden wir weiterhin JSX nutzen.

JSX hat den vollen Funktionsumfang von JavaScript. Du kannst *jeden* JavaScript-Ausdruck innerhalb von Klammern in JSX benutzen. Jedes React-Element ist ein JavaScript-Objekt, welches in eine Variable gespeichert oder innerhalb des Programms hin- und hergereicht werden kann.

Die `ShoppingList`-Kompontente von oben stellt nur native DOM-Komponenten wie `<div />` und `<li />` dar. Dennoch kannst du auch eigene  React-Komponenten zusammenstellen und darstellen. Wir können jetzt zum Beispiel immer auf die Shopping-Liste verweisen indem wir `<ShoppingList />` schreiben. Jede React-Komponente ist abgekapselt und kann eigenständig operieren; das erlaubt dir, komplexe Benutzeroberflächen aus einfachen Komponenten zu kreieren.

### Untersuchen des Einstiegscodes {#inspecting-the-starter-code}

Wenn du an dem Tutorial **in deinem Browser** arbeitest, öffne diesen Code in einem neuen Tab: **[Einstiegscode](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Wenn du **lokal** an dem Tutorial arbeitest, öffne stattdessen `src/index.js` in deinem Projektverzeichnis (du hast diese Datei bereits während des [Setups](#setup-option-2-local-development-environment) angelegt).

Dieser Einstiegscode ist die Grundlage auf der wir aufbauen. Wir haben bereits den CSS-Code vorbereitet, sodass du dich nur auf das Lernen von React und das Programmieren des Tic-Tac-Toe-Spiels fokussieren musst.

Beim Betrachten des Codes wirst du feststellen, dass wir drei React-Kompontenten haben:

* Square (Quadrat)
* Board (Spielbrett)
* Game (Spiel)

Die Square-Komponente visualisiert einen einzelnen `<button>` und das Board visualisiert 9 Quadrate. Die Game-Komponente visualisiert ein Spielbrett mit Platzhalter-Werten, welche wir später modifizieren werden. Derzeit gibt es keine interaktiven Komponenten.

### Daten über Props weitergeben {#passing-data-through-props}

Um einen ersten Schritt zu wagen, werden wir erstmal probieren Daten von der Board-Komponente in die Square-Komponente weiterzugeben.

Wir empfehlen dir, während du das Tutorial durcharbeitest, den Code selbst zu tippen, statt ihn zu kopieren und einzufügen. Dies hilft dir, dein   Muskelgedächtnis (Muscle Memory) zu trainieren und ein besseres Verständnis zu entwickeln.

Ändere den Code in der `renderSquare`-Methode der Board-Komponente so, dass eine Prop namens `value` an die Square-Komponente weitergereicht wird:

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}
```

Ersetze in der `render`-Methode der Square-Komponente das `{/* TODO */}` mit `{this.props.value}`, sodass der Wert angezeigt werden kann:

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

Nachher: Du solltest in jedem Quadrat eine Nummer sehen.

![React Devtools](../images/tutorial/tictac-numbers.png)

**[Schau dir den bis jetzt vorhandenen Code an](https://codepen.io/gaearon/pen/aWWQOG?editors=0010)**

Glückwunsch! Du hast gerade von der Eltern-Board-Komponente an die Kind-Square-Komponente "eine Prop weitergegeben". Der Informationsfluss in React wird durch das Weitergeben von Props der Eltern an Kinder realisiert.

### Erstellen einer interaktiven Komponente {#making-an-interactive-component}

Nun werden wir ein Quadrat mit einem "X" füllen, wenn es geklickt wird.
Zuerst werden wir den Button-Tag, der von der `render()`-Methode der Square-Komponente zurückgegeben wird, in folgendes ändern:

```javascript{4}
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { console.log('click'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

Wenn du jetzt auf ein Quadrat klickst, solltest du in der devtools-Konsole deines Browsers 'click' sehen.

>Hinweis
>
>Um weniger schreiben zu müssen und das [verwirrende Verhalten von `this`](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) zu vermeiden, verwenden wir die [arrow-Funktion-Syntax](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/Pfeilfunktionen) für Event-Handler hier und weiter unten:
>
>```javascript{4}
>class Square extends React.Component {
>  render() {
>    return (
>      <button className="square" onClick={() => console.log('click')}>
>        {this.props.value}
>      </button>
>    );
>  }
>}
>```
>
>Wenn du `onClick={() => alert('click')}` betrachtest, kannst du feststellen, dass wir der `onClick`-Prop *eine Funktion* übergeben. React ruft diese Funktion nur nach einem Klick auf. Ein häufiger Fehler ist, `() =>` zu vergessen und stattdessen `onClick={alert('click')}` zu schreiben. Das führt dazu, dass alert jedes Mal aufgerufen wird, wenn die Komponente neu rendert.

Als nächstes möchten wir, dass sich die Square-Kompontente daran "erinnern" kann, dass sie geklickt wurde und befüllen sie mit einem "X". Damit Komponenten sich an Dinge "erinnern" können, nutzen sie einen **State**.

React-Komponenten können einen State haben, indem man `this.state` in ihren Konstruktoren setzt. `this.state` sollte als private Eigenschaft der React-Komponente verstanden werden, in der es definiert wurde. Nun speichern wir den aktuellen Wert des Quadrats in `this.state` und ändern ihn wenn das Quadrat geklickt wird.

Zuerst fügen wir einen Konstruktor zur Klasse hinzu um den State zu initialisieren:

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
      <button className="square" onClick={() => console.log('click')}>
        {this.props.value}
      </button>
    );
  }
}
```

>Hinweis
>
>In [JavaScript-Klassen](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Klassen) musst du immer `super` aufrufen wenn du den Konstruktor einer Subklasse definierst. Alle React-Komponenten-Klassen, die einen `constructor` haben, sollten mit einem `super(props)`-Aufruf starten.

Jetzt werden wir die `render`-Methode der Square-Komponente anpassen, um den aktuellen Wert von State darzustellen wenn sie geklickt wird:

* Ersetze im `<button>`-Tag `this.props.value` mit `this.state.value`.
* Ersetze den `onClick={...}` Event-Handler mit `onClick={() => this.setState({value: 'X'})}`.
* Schreibe die Props `className` und `onClick` in zwei separate Zeilen, um die Lesbarkeit zu verbessern.

Nachdem wir diese Änderungen durchgeführt haben, wird der von Squares `render`-Methode zurückgegebene `<button>`-Tag wie folgt aussehen:


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

Der Aufruf von `this.setState` durch einen `onClick`-Handler in Squares `render`-Methode teilt React mit, dass es die Square-Komponente neu rendern soll, sobald ihr `<button>` geklickt wird. Nach der Aktualisierung der Square-Komponente ist `this.state.value` `'X'`. Dadurch sehen wir ein `X` auf dem Spielbrett. Wenn du auf irgendein Feld klickst, sollte ein `X` erscheinen.

Wenn du `setState` in einer Komponente aufrufst, wird React automatisch alle Kindelemente aktualisieren.

**[Schau dir den bis jetzt vorhandenen Code an](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### Entwicklerwerkzeuge {#developer-tools}

Die React-DevTools-Erweiterung für [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) und [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) ermöglicht es dir, den Baum der React-Komponenten in den Entwicklerwerkzeugen deines Browsers anzusehen.

<img src="../images/tutorial/devtools.png" alt="React DevTools" style="max-width: 100%">

Die React-DevTools ermöglichen es dir, Props und State deiner React-Komponente zu prüfen.

Nach der Installation der React-DevTools kannst du mit Rechtsklick auf jedes Element der Seite im Kontextmenü mit "Untersuchen" die Entwicklerwerkzeuge öffnen. Die React-Tabs ("⚛️ Components" und "⚛️ Profiler") tauchen dann als letzte Tabs ganz rechts auf. Verwende "⚛️ Components", um den Komponentenbaum zu untersuchen.

**Jedoch sind noch ein paar Zusatzschritte notwendig, um sie mit CodePen nutzen zu können:**

1. Logge dich ein oder registriere dich und bestätige deine E-Mail (Zur Vermeidung von Spam).
2. Klicke auf "Fork".
3. Klicke auf "Change View" und wähle dann "Debug mode".
4. Im neuen Tab, der sich öffnet, sollten die Entwicklerwerkzeuge jetzt einen React-Tab anzeigen.

## Das Spiel fertigstellen {#completing-the-game}

Jetzt verfügen wir über die Grundbausteine unseres Tic-Tac-Toe-Spiels. Um das Spiel zu vervollständigen, müssen wir abwechselnd die 'X'e und 'O's auf dem Spielfeld platzieren. Außerdem müssen wir noch eine Möglichkeit finden, um den Gewinner festzustellen.

### Den State hochholen {#lifting-state-up}

Zurzeit verwaltet jede Square-Komponente den Spiel-State. Um zu prüfen, ob es einen Gewinner gibt, werden wir den Wert jedes der 9 Quadrate an einem Ort verwalten.

Man könnte denken, dass die Board-Komponente einfach jede Square-Komponente zu ihrem aktuellen State befragen sollte. Das ist zwar eine mögliche Herangehensweise in React, wir raten jedoch davon ab, da dies zu unverständlichem Code führt, der fehleranfällig und schwer zu überarbeiten ist.
Anstelle dessen ist die beste Herangehensweise den aktuellen State in der Eltern-Board-Komponente zu speichern statt in jeder Square-Komponente selbst. Die Board-Komponente kann jeder Square-Komponente durch props mitteilen, was sie anzeigen soll. [Genauso haben wir es gemacht, als wir Zahlen an die Square-Komponente übergeben haben](#passing-data-through-props).

**Um Daten von mehreren Kindern zu sammeln oder um zwei Kind-Komponenten miteinader kommunizieren zu lassen, musst du einen geteilten State in ihrer Elternkomponente deklarieren. Die Elternkomponente kann den State an die Kinder mittels Props zurückreichen. So können Kindkomponenten untereinander und mit der Elternkomponente synchronisiert werden.**

Das Hochholen des States in eine Eltern-Komponente ist üblich, wenn React-Komponenten überarbeitet werden — nutzen wir diese Gelegenheit, um es auszuprobieren.

Füge der Board-Komponente einen Konstruktor hinzu und setze den initialen State auf ein Array mit 9 `null`-Einträgen, die den 9 Quadraten entsprechen:

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

Die `renderSquare`-Methode der Board-Komponente sieht aktuell so aus:

```javascript
  renderSquare(i) {
    return <Square value={i} />;
  }
```

Am Anfang haben wir aus der Board-Komponente [`value` als Prop weitergegeben](#passing-data-through-props), um die Nummern 0 bis 8 in jeder Square-Komponente anzuzeigen. In einem anderen vorherigen Schritt haben wir die Zahlen dann durch ein "X", [bestimmt durch den State der Square-Komponente](#making-an-interactive-component), ersetzt. Deshalb ignoriert die Square-Komponente gerade die Prop `value`, die ihr von der Board-Komponente übergeben wurde.

Wir werden jetzt den Mechanismus zur Weitergabe von Props wieder verwenden. Wir werden die Board-Komponente so anpassen, dass sie jeder einzelnen Square-Komponente ihren aktuellen Wert (`'X'`, `'O'`, oder `null`) mitteilt. Wir haben bereits das `squares`-Array im Konstruktor der Board-Komponente definiert und werden nun die `renderSquare`-Methode so anpassen, dass diese daraus liest:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[Schau dir den bis jetzt vorhandenen Code an](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

Jede Square-Komponente erhält nun die Prop `value`, welche entweder den Wert `'X'`, `'O'`, oder `null` für leere Quadrate enthält.

Als nächstes müssen wir das Verhalten ändern, wenn ein Quadrat geklickt wird. Die Board-Komponente verwaltet nun, welche Quadrate gefüllt sind. Wir müssen jetzt eine Möglichkeit finden, damit die Square-Komponente den State in der Board-Komponente anpassen kann. Der State ist in der Komponente, in der er definiert wurde, eine private Variable. Somit können wir den State der Board-Komponente nicht direkt von der Square-Komponente aus aktualisieren.

Stattdessen übergeben wir eine Funktion von der Board-Komponente an die Square-Komponente und lassen die Square-Komponente diese aufrufen, wenn ein Quadrat geklickt wird. Wir ändern die "renderSquare"-Methode in der Board-Komponente folgendermaßen:

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
>Wir haben das zurückgegebene Element aus Gründen der Lesbarkeit in mehrere Zeilen aufgeteilt. Außerdem haben wir Klammern hinzugefügt, damit JavaScript kein Semikolon nach `return` einfügt und unseren Code kaputt macht.

Jetzt geben wir zwei Props von der Board-Komponente an die Square-Komponente weiter: `value` und `onClick`. Die `onClick`-Prop ist eine Funktion, die von der Square-Komponente immer aufgerufen wird, wenn sie geklickt wird. Dafür nehmen wir folgende Änderungen an der Square-Komponente vor:

* Ersetzen von `this.state.value` durch `this.props.value` in der `render`-Methode der Square-Komponente.
* Ersetzen von `this.setState()` durch `this.props.onClick()` in der `render`-Methode der Square-Komponente.
* Löschen des `constructor` in der Square-Komponente, da diese den State des Spiels nicht mehr verfolgt

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

Wenn ein Quadrat geklickt wird, wird die von der Board-Komponente bereitgestellte `onClick`-Funktion aufgerufen. Nachfolgend befindet sich eine Zusammenfassung, wie das erreicht wird:

1. Die `onClick`-Prop der nativen DOM-`<button>`-Komponente weist React an, einen Click-Event-Listener einzurichten.
2. Wenn der Button geklickt wird, ruft React den `onClick`-Event-Handler auf, der in der `render()`-Methode der Square-Komponente definiert ist.
3. Dieser Event-Handler ruft `this.props.onClick()` auf. Die `onClick`-Prop der Square-Komponente wurde von der Board-Komponente festgelegt.
4. Da die Board-Komponente der Square-Komponente `onClick={() => this.handleClick(i)}` übergeben hat, ruft die Square-Komponente `this.handleClick(i)` der Board-Komponente auf, wenn sie geklickt wird.
5. Wir haben die `handleClick()`-Methode noch nicht definiert, daher stürzt unser Code ab. Wenn du jetzt auf ein Quadrat klickst, solltest du einen roten Fehlerbildschirm sehen, der etwas sagt wie "this.handleClick is not a function".

>Hinweis
>
>Das `onClick`-Attribut des DOM-`<button>`-Elements hat eine besondere Bedeutung für React, weil es eine native Komponente ist. Die Benennung eigener Komponenten, wie Square, ist dir überlassen. Wir könnten die `onClick`-Prop der Square-Komponente oder die `handleClick`-Methode der Board-Komponente auch anders benennen und der Code würde trotzdem funktionieren. In React ist es eine Konvention, `on[Event]`-Namen für Props zu benutzen, die Events repräsentieren und `handle[Event]` für Methoden, die Events behandeln.

Wenn wir versuchen ein Quadrat anzuklicken, sollten wir einen Fehler bekommen, da wir `handleClick` bisher noch nicht definiert haben. Wir fügen `handleClick` nun zur Board-Komponente hinzu:

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

**[Schau dir den bis jetzt vorhandenen Code an](https://codepen.io/gaearon/pen/ybbQJX?editors=0010)**

Nach diesen Änderungen sind wir wieder in der Lage auf die Quadrate zu klicken, um diese zu befüllen. Jedoch wird der State jetzt in der Board-Komponente anstatt in jeder einzelnen Square-Komponente gespeichert. Wenn sich der State der Board-Komponente ändert, werden automatisch die Square-Komponenten neu gerendert. Das Speichern des States aller Quadrate in der Board-Komponente gibt ihr die Möglichkeit, später den Gewinner zu bestimmen.

Dadurch, dass die Square-Komponenten nicht mehr ihren eigenen State verwalten, erhalten sie die Werte von der Board-Komponente. Wenn die Square-Komponenten geklickt wurden, informieren sie die Board-Komponente. Im React-Jargon werden die Square-Komponenten nun als **kontrollierte Komponenten** (engl. **controlled components**) bezeichnet. Die Board-Komponente hat volle Kontrolle über sie.

Beachte, wie wir in der `handleClick`-Methode die `.slice()`-Methode aufrufen, um eine neue Kopie des `squares`-Arrays zu erzeugen, die wir bearbeiten, anstatt das bestehende Array zu bearbeiten. Im nächsten Abschnitt werden wir erklären, warum wir eine Kopie des `squares`-Arrays erzeugen.

### Warum Unveränderlichkeit (engl. Immutability) wichtig ist {#why-immutability-is-important}

Im vorherigen Codebeispiel haben wir vorgeschlagen, dass du eine Kopie des Arrays `squares` mit der `slice()`-Methode erstellst, anstatt das bestehende Array zu verändern. Wir werden nun die Unveränderlichkeit besprechen und warum es wichtig ist, diese zu lernen.

Prinzipiell gibt es zwei Ansätze, Daten zu verändern. Der erste Ansatz ist, die Daten *abzuändern* (engl. *mutate*) indem man die Werte der Daten direkt ändert. Der zweite Ansatz ist, die Daten durch eine neue Kopie zu ersetzen, welche die gewünschten Änderungen enthält.

#### Datenänderung durch direktes Abändern {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// player ist jetzt {score: 2, name: 'Jeff'}
```

#### Ändern von Daten auf Grundlage einer Kopie bestehender Daten {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// player ist unverändert, aber newPlayer ist jetzt {score: 2, name: 'Jeff'}

// Oder alternativ, wenn du die Object-Spread-Syntax verwendest:
// var newPlayer = {...player, score: 2};
```

Das Endergebnis ist das gleiche, aber dadurch, dass Daten nicht direkt abgeändert werden, gewinnen wir einige Vorteile, die nachfolgend beschrieben werden.

#### Komplexe Funktionalitäten werden einfach {#complex-features-become-simple}

Durch Unveränderlichkeit können komplexe Funktionalitäten einfacher implementiert werden. Später in diesem Tutorial werden wir eine "Zeitreise"-Funktionalität (engl. time travel) implementieren, die es uns erlaubt, Einsicht in die Tic-Tac-Toe-Spielhistorie zu gewinnen und zu vorherigen Zügen "zurückzuspringen". Diese Funktionalität ist nicht nur für Spiele geeignet — die Möglichkeit bestimmte Aktionen rückgängig zu machen und zu wiederholen ist eine häufige Anforderung für Anwendungen. Indem wir das direkte Abändern von Daten vermeiden, können wir  vorherige Versionen der Spielhistorie intakt lassen und diese zu einem späteren Zeitpunkt wiederverwenden.

#### Veränderungen erkennen {#detecting-changes}

Veränderungen in änderbaren Objekten zu erkennen ist schwierig, da diese direkt angepasst werden. Diese Erkennung erfordert, dass das änderbare Objekt mit seinen vorherigen Kopien verglichen wird. Außerdem müsste der gesamte Objekt-Baum durchlaufen werden.

Veränderungen in unveränderbaren Objekten zu erkennen ist erheblich leichter. Falls das unveränderbare Objekt, auf das verwiesen wird, anders ist als das vorhergehende, dann hat sich das Objekt verändert.

#### Entscheiden, wann in React neu gerendert werden soll {#determining-when-to-re-render-in-react}

Der Hauptvorteil von Unveränderlichkeit ist, dass es dir hilft *pure components* in React zu entwickeln. Anhand unveränderbarer Daten lässt sich leicht feststellen, ob Änderungen vorgenommen wurden. Dadurch lässt sich leichter ermitteln, wann eine Komponente neu gerendert werden muss.

Du kannst mehr über `shouldComponentUpdate()` und das Entwickeln von *pure components* lernen, wenn du [Performance-Optimierung](/docs/optimizing-performance.html#examples) liest.

### Funktionskomponenten {#function-components}

Wir ändern nun die Square-Komponente in eine **Funktionskomponente**.

In React sind **Funktionskomponenten** ein leichterer Weg, um Komponenten zu schreiben,
welche nur eine `render`-Methode beinhalten und keinen eigenen State haben.
Statt eine Klasse zu definieren, welche `React.Component` erweitert, können wir eine Funktion schreiben, welche `props` als Input nimmt und zurückgibt, was gerendert werden soll.
Funktionskomponenten sind weniger mühsam zu schreiben als Klassen und viele Komponenten können auf diesem Weg formuliert werden.

Ersetze die Square-Klasse mit dieser Funktion:

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

Wir haben beide vorkommenden `this.props` mit `props` ersetzt.

**[Schau dir den bis jetzt vorhandenen Code an](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>Hinweis
>
>Als wir die Square-Komponente in eine Funktionskomponente geändert haben, haben wir auch `onClick={() => this.props.onClick()}` in ein kürzeres `onClick={props.onClick}` geändert (beachte, dass die Klammern auf *beiden* Seiten fehlen).

### Abwechselnd einen Zug machen {#taking-turns}

Nun müssen wir einen offensichtlichen Defekt in unserem Tic-Tac-Toe Spiel beheben: Die "O"s können nicht auf dem Spielfeld gesetzt werden.

Wir setzen den ersten Zug standardmäßig auf "X".
Das können wir erreichen, indem wir den initialen State in unserem Board-Konstruktor verändern:

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

Jedes Mal wenn ein Spieler einen Zug macht, wird `xIsNext` (ein Boolean) geändert, um den nächsten Spieler zu bestimmen. Außerdem wird der Stand des Spiels gespeichert.
Wir aktualisieren die `handleClick`-Funktion der Board-Komponente, um den Wert von `xIsNext` zu ändern:

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

Durch diese Änderung wechseln sich "X"e und "O"s ab. Probiere es aus!

Lass uns ebenfalls den "status"-Text in der `render`-Funktion der Board-Komponente ändern, sodass sie anzeigt, welcher Spieler als nächstes an der Reihe ist:

```javascript{2}
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // Der Rest hat sich nicht geändert
```

Nachdem wir diese Änderungen angewandt haben, sollte deine Board-Komponente so aussehen:

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

**[Schau dir den bis jetzt vorhandenen Code an](https://codepen.io/gaearon/pen/KmmrBy?editors=0010)**

### Einen Gewinner verkünden {#declaring-a-winner}

Da wir nun den nächsten Spieler anzeigen können, sollten wir ebenfalls anzeigen, wann das Spiel gewonnen ist und dass keine Züge mehr möglich sind. Kopiere diese Hilfsfunktion an das Ende der Datei:

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

As we iterate through `history` array, `step` variable refers to the current `history` element value, and `move` refers to the current `history` element index. We are only interested in `move` here, hence `step` is not getting assigned to anything.

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

Notice in `jumpTo` method, we haven't updated `history` property of the state. That is because state updates are merged or in more simple words React will update only the properties mentioned in `setState` method leaving the remaining state as that is. For more info **[see the documentation](/docs/state-and-lifecycle.html#state-updates-are-merged)**.

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
