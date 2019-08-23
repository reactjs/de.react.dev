---
id: glossary
title: Glossar der React Begriffe
layout: docs
category: Reference
permalink: docs/glossary.html

---

## Single-Page Anwendung {#single-page-application}

Eine Single-Page Anwendung ist eine Anwendungen, die eine einzelne HTML Seite und all deren Ressourcen (wie JavaScript oder CSS) lädt, die für das Ausführen der Anwendung erforderlich sind. Jegliche Interaktionen mit der Seite und deren Unterseiten benötigen keine erneute Serveranfrage, d. h. die Seite muss nicht neu geladen werden.

Obwohl du mit React komplette Single-Page Anwendungen erstellen kannst, ist dies kein Muss. React kann auch nur für kleine Teile bestehender Webseiten verwendet werden um die Interaktivität zu erweitern. In React geschriebener Code kann in Ruhe mit Markup koexistieren, welches auf dem Server von beispielsweise PHP oder auch clientseitig anderen Bibliotheken gerendert wird. Tatsächlich wird React genau so bei Facebook eingesetzt.

## ES6, ES2015, ES2016, etc {#es6-es2015-es2016-etc}

Diese Kürzel beziehen sich alle auf den neuesten Standard der ECMAScript-Language-Specification, von dem JavaScript eine Implementierung ist. Die ES6-Version (auch bekannt als ES2015) enthält viele Ergänzungen zu den Vorgängerversionen wie: Pfeilfunktionen, Klassen, Template-Literale, `let` und `const` Anweisungen. Du kannst [hier](https://en.wikipedia.org/wiki/ECMAScript#Versions) mehr über bestimmte Versionen lernen.

## Kompiler {#compilers}

Ein JavaScript-Kompiler nimmt JavaScript Code, wandelt ihn um und gibt JavaScript Code in einem anderen Format zurück. Der häufigste Anwendungsfall ist die Umwandlung von ES6-Syntax in eine Syntax, die ältere Browser interpretieren können. [Babel](https://babeljs.io/) ist der Kompiler, der am häufigsten mit React verwendet wird.

## Bundler {#bundlers}

Bundler nehmen JavaScript und CSS-Code, geschrieben als seperate Module (oft hunderte von ihnen), und fügen diese zusammen in ein paar Dateien, die besser für den Browser optimiert sind. Häufig zusammen mit React-Anwendungen verwendete Bundler sind unter anderem [Webpack](https://webpack.js.org/) und [Browserify](http://browserify.org/).

## Paketmanager {#package-managers}

Paketmanager sind Tools, welche dir das Verwalten deiner Projekt-Abhängigkeiten ermöglichen. [npm](https://www.npmjs.com/) und [Yarn](https://yarnpkg.com/) sind zwei Paketmanager, die häufig in React-Anwendungen verwendet werden. Beides sind Clients für die gleiche npm-Paketregistrierung.

## CDN {#cdn}

CDN steht für Content Delivery Network. CDNs sind Netzwerke von Servern auf der ganzen Welt, die gecachte, statische Inhalte ausliefern.

## JSX {#jsx}

JSX ist eine Syntaxerweiterung für JavaScript. Es ist ähnlich einer Template-Sprache, hat aber den vollen Leistungsumfang von JavaScript. JSX wird bei `React.createElement()` Aufrufen kompiliert, welche das reine JavaScript-Objekt namens "React elements" zurückgeben. Um ein grundlegendes Verständnis für JSX zu bekommen, [sieh dir diese Dokumentation an](/docs/introducing-jsx.html) und ein ausfürliches Tutorial zu JSX findest du [hier](/docs/jsx-in-depth.html).

React DOM benutzt die camelCase Namenskonvention anstelle von HTML-Attributnamen. Zum Beispiel wird `tabindex` zu `tabIndex` in JSX. Das Attribut `class` wird zu `className`, da `class` ein reserviertes Wort in JavaScript ist:

```js
const name = 'Clementine';
ReactDOM.render(
  <h1 className="hello">Mein Name ist {name}!</h1>,
  document.getElementById('root')
);
```

## [Elemente](/docs/rendering-elements.html) {#elements}

React-Elemente sind die Bausteine von React-Anwendungen. Elemente könnten mit dem allgemein bekannteren Konzept der "Komponenten" verwechselt werden. Ein Element beschreibt was du auf dem Bildschirm sehen möchtest. React-Elemente sind unveränderbar.

```js
const element = <h1>Hallo, Welt</h1>;
```

Normalerweise werden Elemente nicht direkt verwendet, sondern von Komponenten zurückgegeben.

## [Komponenten](/docs/components-and-props.html) {#components}

React-Komponenten sind kleine, wiederverwendebare Codestücke, die ein zu renderndes React-Element an die Seite zurückgeben. Die einfachste Version einer React-Komponente ist eine simple JavaScript-Funktion, die ein React-Element zurückgibt:

```js
function Welcome(props) {
  return <h1>Hallo, {props.name}</h1>;
}
```

Komponenten können ebenso ES6-Klassen sein:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hallo, {this.props.name}</h1>;
  }
}
```

Komponenten können in mehrere kleinere Teile zerlegt und deren Funktionialität in anderen Komponenten wiederverwendet werden. Komponenten können andere Komponenten, Array, Strings und Nummer zurückgeben. Eine gute Faustregel ist, dass wenn ein Teil deiner Benutzeroberfläche mehrmals verwendet wird (Button, Panel, Avatar), oder komplex genug ist (App, FeedStory, Comment), sie ein guter Kandidat ist, eine wiederverwendebare Komponente zu sein. Kompomnentennamen sollten immer mit einem Großbuchstaben beginnen (`<Wrapper/>` **nicht** `<wrapper/>`). Weitere Informationen findest du in [dieser Dokumentation](/docs/components-and-props.html#rendering-a-component)  zum Rendern von Komponenten.

### [`props`](/docs/components-and-props.html) {#props}

`props` sind die Werte, die in eine React-Komponenten gegeben werden. Es handelt sich hierbei um Daten, die von einer übergeordneten Komponente an eine untergeordnete Komponente weitergegeben werden.

Denke daran, dass `props` nur lesbar(`readonly`) sind. Sie sollten in keiner Weise verändert werden:

```js
// Falsch!
props.number = 42;
```

Wenn du einen Wert aufgrund von Nutzereingaben oder Netzwerkantworten verändern möchtest, verwende `state`.

### `props.children` {#propschildren}

`props.children` ist in jeder Komponente verfügar. Es enthält den Inhalt, der zwischen dem öffnenden und schließenden Tag einer Komponente steht. Zum Beispiel:

```js
<Welcome>Hallo Welt!</Welcome>
```

Der String `Hallo Welt!` ist in `props.children` in der `Welcome`-Komponente verfügbar:

```js
function Welcome(props) {
  return <p>{props.children}</p>;
}
```

Für Komponenten die als Klassen definiert worden, verwende `this.props.children`:

```js
class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```

### [`state`](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) {#state}

Eine Komponente benötigt `state`, wenn sich mit ihr vebundene Daten im Laufe der Zeit ändern. Zum Beispiel könnte eine `Checkbox`-Komponente ein `isChecked` in ihrem State benötigen und eine `NewsFeed`-Komponente könnte in ihrem State `fetchedPosts` verfolgen wollen.

Der wichtigste Unterschied zwischen `state` und `props` ist, dass `props` von einer übergeordneten Komponente übergeben werden, aber `state` in einer Komponente selbst verwaltet wird. Eine Komponente kann nicht ihre `props` ändern, aber ihren `state`.

Für jedes einzelene Teil von Daten die sich ändern, sollte es nur eine Komponente geben, die diese Daten in ihrem State "besitzt". Versuche nicht States von zwei verschiedenen Komponenten zu synchronisieren. Verschiebe stattdessen den State in die am nächsten höhergelegende gemeinsame Komponente ([lift it up](/docs/lifting-state-up.html)) und gebe sie als Props an beide von ihnen weiter.

## [Lifecycle-Methoden](/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) {#lifecycle-methods}

Lifecycle-Methoden sind benutzerdefinierte Funktionen, die in den verschiedenen Phasen einer Komponente ausgeführt werden. Es stehen Methoden zur Verfügung, wenn die Komponenten erstellt und in das DOM ([eingefügt (mounting)](/docs/react-component.html#mounting)) wird, wenn die Komponente geupdatet wird und wenn die Komponente geunmountet oder entfernt wird vom DOM.

 ## [Kontrollierte](/docs/forms.html#controlled-components) vs. [Unkontrollierte Komponenten](/docs/uncontrolled-components.html)

React besitzt zwei verschiedene Ansätze, um mit Formulareingaben umzugehen.

Ein Eingabefeld dessen Wert (engl. value) von React gesteuert wird, wird als *kontrollierte Komponente* bezeichnet. Wenn ein Benutzer Daten in eine kontrollierte Komponente eingibt, wird ein Change-Event-Handlr ausgelöst und dein Code entscheidet ob der Wert gültig ist (durch erneutes Render mit dem aktualisierten Wert). Wenn du es nicht erneut renderst, bleibt das Formularelement unverändert.

Eine *unkontrollierte Komponente* funktioniert, wie sie es auch außerhalb von React tun würde. Wenn ein Benutzer Daten in ein Formularfeld (Eingabefeld, Dropdown, etc.) eingibt, werden die aktualisierten                              Informationen angezeigt, ohne dass React etwas tun muss. Das bedeutet aber auch, dass du das Feld nicht dazu zwingen kannst einen bestimmten Wert zu haben.

In den meisten Fällen solltest du kontrollierte Komponenten verwenden.

## [Keys](/docs/lists-and-keys.html) {#keys}

Ein "Key" ist ein spezielles String-Attribut, welches du bei der Erstellung von Arrays von Elementen berücksichtigen musst. Keys helfen React zu erkennen, welche Elemente geändert, hinzugefügt oder entfernt wurden. Keys sollten an Elemente innerhalb eines Arrays gegeben werden, um ihnen eine stabile Identität zu geben.

Keys müssen nur in einem Array untereinander eindeutig sein. Sie müssen nicht über die gesamte Anwendung oder in einer einzelnen Komponente eindeutig sein.

Übergebe nicht soetwas wie `Math.random` als Key. Es ist wichtig, dass Keys eine "stabile Identität" über mehrere Renderings hinweg aufweisen, damit React feststellen kann, wann Elemente hinzugefügt, gelöscht oder neu angeordnet werden. Im Idealfall sollten Keys eindeutigen und stabilen Identifikatoren aus ihren Daten entsprechen, wie z. B. `post.id`.

## [Refs](/docs/refs-and-the-dom.html) {#refs}

React unterstützt ein spezielles Attribut, das du an jede Komponente anhängen kannst. Das `ref`-Attribut kann ein Objekt sein, das mit der [`React.createRef()-Funktion`](/docs/react-api.html#reactcreateref), einer Callback-Funktion oder einem String (veraltete API) erstellt wurde. Wenn das `ref`-Attribut eine Callback-Funktion ist, erhält die Funktion das zugrundeliegende DOM-Element oder die Klassen-Instanz (je nach Elementtyp). Dadurch haben wir direkten Zugriff auf das DOM-Element oder die Komponenteninstanz.

Benutze refs sparsam. Wenn du dich da bei erwischst, refs in deiner Anwendung zu benutzen um "Dinge möglich zu machen", solltest du dich ein bisschen mehr mit dem [top-down Datenfluss](/docs/lifting-state-up.html) auseinandersetzen.

## [Events](/docs/handling-events.html) {#events}

Die Handhabung von Events in React-Elementen weist einige syntaktische Unterschiede auf:

* React Event-Handler werden nicht in Kleinbuchstaben, sondern in camelCase geschrieben.
* Bei JSX übergibst du als Event-Handler eine Funktion und keinen String.

## [Abgleich (reconciliation)](/docs/reconciliation.html) {#reconciliation}

Wenn sich Props oder State einer Komponente ändern, entscheidet React ob ein tatsächliches DOM-Update erforderlich ist, in dem es das neue zurückgegebene Element mir dem zuvor grenderten vergleicht. Wenn diese nicht übereinstimmen, wird React das DOM aktualisieren. Dieser Vorgang wird "Abgleich (engl. reconciliation)" genannt.
