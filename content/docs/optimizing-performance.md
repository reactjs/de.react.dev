---
id: optimizing-performance
title: Performance-Optimierung
permalink: docs/optimizing-performance.html
redirect_from:
  - "docs/advanced-performance.html"
---

Intern verwendet React mehrere clevere Techniken, um die Anzahl kostspieliger DOM-Vorgänge zu minimieren, die nötig sind, um die Benutzeroberfläche zu aktualisieren. Für viele Anwendungen führt React zu einer schnellen Benutzeroberfläche, ohne dass die Performance mit viel Aufwand optimiert werden muss. Trotzdem gibt es mehrere Möglichkeiten, wie du deine React-Anwendung noch schneller machen kannst.

## Benutze den Produktions-Build {#use-the-production-build}

Falls du Benchmarking betreibst oder Performance-Probleme in deinen React-Apps feststellst, stelle sicher, dass du sie mit dem minifizierten Produktions-Build testest.

Standardmäßig enthält React viele hilfreiche Warnungen. Diese Warnungen sind während des Entwickelns sehr nützlich. Allerdings machen sie React größer und langsamer, weshalb du beim Deployen darauf achten solltest, die Produktions-Version zu verwenden.

Falls du nicht sicher bist, ob dein Build-Prozess korrekt eingerichtet ist, kannst du ihn überprüfen, indem du die [React Developer Tools für Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) installierst. Wenn du eine Seite mit React im Produktions-Modus besuchst, hat das Icon einen dunklen Hintergrund:

<img src="../images/docs/devtools-prod.png" style="max-width:100%" alt="React DevTools auf einer Webseite mit React im Produktions-Modus">

Wenn du eine Seite mit React im Entwickler-Modus besuchst, hat das Icon einen roten Hintergrund:

<img src="../images/docs/devtools-dev.png" style="max-width:100%" alt="React DevTools auf einer Webseite mit React im Entwickler-Modus">

Der Entwickler-Modus sollte benutzt werden, während du an der App arbeitest, und der Produktions-Modus, wenn du die Webseite deployst.

Weiter unten findest du eine Anleitung, wie du die Produktions-Version deiner App erstellst.

### Create React App {#create-react-app}

Falls dein Projekt mit [Create React App](https://github.com/facebookincubator/create-react-app) erstellt wurde, führe Folgendes aus:

```
npm run build
```

Damit wird im `build/`-Ordner deines Projekts ein Produktions-Build deiner App erstellt. 

Denke daran, dass das nur erforderlich ist, bevor du deine App deployst. Zum normalen Entwickeln benutze `npm start`.

### Einzeldatei-Builds {#single-file-builds}

Wir bieten produktionsfertige Versionen von React und React DOM als Einzeldateien an:

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

Denke daran, dass nur React-Dateien, die mit `.production.min.js` enden, für die Produktionsumgebung geeignet sind.

### Brunch {#brunch}

Um den effizientesten Brunch-Produktions-Build zu bekommen, installiere das [`terser-brunch`](https://github.com/brunch/terser-brunch)-Plugin:

```bash
# Falls du npm verwendest
npm install --save-dev terser-brunch

# Falls du Yarn verwendest
yarn add --dev terser-brunch
```

Um dann einen Produktions-Build zu erstellen, füge zum `build`-Befehl das `-p`-Flag hinzu:

```
brunch build -p
```

Denke daran, dass du das nur für die Produktionsumgebung machen musst. Du solltest das `-p`-Flag oder dieses Plugin nicht während der Entwicklung verwenden, da sie nützliche React-Warnungen verbergen und die Builds viel langsamer machen.

### Browserify {#browserify}

Um den effizientesten Browserify-Produktions-Build zu bekommen, installiere ein paar Plugins:

```
# Falls du npm verwendest
npm install --save-dev envify terser uglifyify 

# Falls du Yarn verwendest
yarn add --dev envify terser uglifyify 
```

Um einen Produktions-Build zu erstellen, stelle sicher, dass du diese Transformer hinzufügst **(die Reihenfolge ist wichtig)**:

* Der [`envify`](https://github.com/hughsk/envify)-Transformer stellt sicher, dass die richtige Build-Umgebung gesetzt wird. Benutze ihn global (`-g`).
* Der [`uglifyify`](https://github.com/hughsk/uglifyify)-Transformer entfernt Entwickler-Importe. Benutze auch ihn global (`-g`).
* Schließlich wird das so entstandene Bundle an [`terser`](https://github.com/terser-js/terser) geleitet, wo es "gemangled" wird ([lies warum](https://github.com/hughsk/uglifyify#motivationusage)).

Zum Beispiel:

```
browserify ./index.js \
  -g [ envify --NODE_ENV production ] \
  -g uglifyify \
  | terser --compress --mangle > ./bundle.js
```

Denke daran, dass du das nur für die Produktionsumgebung machen musst. Du solltest diese Plugins nicht während der Entwicklung verwenden, da sie nützliche React-Warnungen verbergen und die Builds viel langsamer machen.

### Rollup {#rollup}

Um den effizientesten Rollup-Produktions-Build zu bekommen, installiere ein paar Plugins:

```bash
# Falls du npm benutzt
npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser

# Falls du Yarn benutzt
yarn add --dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser
```

Um einen Produktions-Build zu kreieren, stelle sicher, dass du diese Plugins hinzufügst **(die Reihenfolge ist wichtig)**:

* Das [`replace`](https://github.com/rollup/rollup-plugin-replace)-Plugin stellt sicher, dass die richtige Build-Umgebung gesetzt wird. 
* Das [`commonjs`](https://github.com/rollup/rollup-plugin-commonjs)-Plugin bietet CommonJS-Unterstützung in Rollup.
* Das [`terser`](https://github.com/TrySound/rollup-plugin-terser-Plugin komprimiert und "mangled" das finale Bundle.

```js
plugins: [
  // ...
  require('rollup-plugin-replace')({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  require('rollup-plugin-commonjs')(),
  require('rollup-plugin-terser')(),
  // ...
]
```

Siehe dir ein komplettes Setup-Beispiel [in diesem Gist](https://gist.github.com/Rich-Harris/cb14f4bc0670c47d00d191565be36bf0) an.

Denke daran, dass du das nur für die Produktionsumgebung machen musst. Du solltest das `terser`-Plugin oder das `replace`-Plugin mit `'production'` nicht während der Entwicklung verwenden, da sie nützliche React-Warnungen verbergen und die Builds viel langsamer machen.

### webpack {#webpack}

>**Hinweis:**
>
>Falls du Create React App verwendest, folge bitte den [Anweisungen weiter oben](#create-react-app).<br>
>Dieser Abschnitt ist nur relevant, wenn du webpack direkt konfigurierst.

Webpack v4+ minified deinen Code standardmäßig im `production`-Modus.

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({ /* additional options here */ })],
  },
};
```

Mehr Informationen darüber findest du in der [webpack-Dokumentation](https://webpack.js.org/guides/production/).

Denke daran, dass du das nur für die Produktionsumgebung machen musst. Du solltest `TerserPlugin` nicht während der Entwicklung verwenden, da es nützliche React-Warnungen verbergen wird und die Builds viel langsamer macht.

## Komponenten-Profiling mit dem DevTools-Profiler {#profiling-components-with-the-devtools-profiler}

`react-dom` 16.5+ und `react-native` 0.57+ bieten erweiterte Profiling-Funktionen im DEV-Modus mit dem React DevTools-Profiler.
Eine Übersicht über den Profiler gibt es im Blog-Post ["Vorstellung des React Profilers"](/blog/2018/09/10/introducing-the-react-profiler.html).
Es gibt auch eine Video-Anleitung zum Profiler [auf YouTube](https://www.youtube.com/watch?v=nySib7ipZdk).

Falls du die React DevTools noch nicht installiert hast, kannst du sie hier finden:

- [Chrome Browser-Erweiterung](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Firefox Browser-Erweiterung](https://addons.mozilla.org/en-GB/firefox/addon/react-devtools/)
- [Eigenständiges Node-Package](https://www.npmjs.com/package/react-devtools)

> Hinweis
>
> Ein Produktions-Profiling-Bundle von `react-dom` ist auch als `react-dom/profiling` verfügbar.
> Lese mehr über die Verwendung dieses Bundles auf [fb.me/react-profiling](https://fb.me/react-profiling).

> Note
>
> Before React 17, we use the standard [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API) to profile components with the chrome performance tab.
> For a more detailed walkthrough, check out [this article by Ben Schwarz](https://calibreapp.com/blog/react-performance-profiling-optimization).

## Virtualisieren von langen Listen {#virtualize-long-lists}

Falls deine Anwendung lange Datenlisten (mit Hunderten oder Tausenden von Zeilen) rendert, empfehlen die Verwendung einer Technik, die als "Windowing" bekannt ist. Diese Technik rendert zu jedem Zeitpunkt nur eine kleine Teilmenge deiner Zeilen. Dadurch kannst du sowohl die Zeit, die benötigt wird, um die Komponenten erneut zu rendern, als auch die Anzahl der erstellten DOM-Knoten drastisch reduzieren.

[react-window](https://react-window.now.sh/) und [react-virtualized](https://bvaughn.github.io/react-virtualized/) sind beliebte Windowing-Bibliotheken. Sie bieten eine Anzahl an wiederverwendbaren Komponenten, um Listen, Grids und Datentabellen anzuzeigen. Falls du etwas möchtest, das spezifischer auf deine Anwendung zugeschnitten ist, kannst du auch deine eigene Windowing-Komponente erstellen, wie [Twitter es getan hat](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3).

## Abgleiche vermeiden {#avoid-reconciliation}

React baut und pflegt eine interne Repräsentation der gerenderten Benutzeroberfläche. Sie beinhaltet die React-Elemente, die deine Komponenten zurückgeben. Diese Repräsentation erlaubt es React, zu vermeiden, neue DOM-Knoten zu erstellen oder auf bereits existierende zuzugreifen, wenn dies nicht nötig ist, da dies langsamer sein kann als Operationen an JavaScript-Objekten. Man spricht manchmal vom "virtuellen DOM", aber in React Native funktioniert es auf die gleiche Weise.

Wenn Props oder State einer Komponente sich verändern, entscheidet React, ob ein tatsächliches DOM-Update nötig ist, indem es das neu ausgegebene Element mit dem zuvor gerenderten abgleicht. Wenn sie unterschiedlich sind, aktualisiert React das DOM.

Obwohl React nur DOM-Knoten aktualisiert, die sich verändert haben, braucht das erneute Rendern etwas Zeit. In vielen Fällen ist das kein Problem, doch wenn die Verlangsamung sich bemerkbar macht, kannst du den Prozess beschleunigen, indem du die Lifecycle-Funktion `shouldComponentUpdate`, die vor jedem erneuten Rendern ausgelöst wird, überschreibst. Die Standard-Implementierung dieser Funktion gibt `true` zurück und lässt React somit das Update durchführen:

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

Wenn du weißt, dass deine Komponente in manchen Fällen kein Update benötigt, kannst du stattdessen `false` von `shouldComponentUpdate` zurückgeben lassen, um den kompletten Rendering-Prozess zu überspringen, einschließlich des Aufrufs der `render()`-Funktion auf diese und die darunterliegenden Komponenten.

In den meisten Fällen kannst du [`React.PureComponent`](/docs/react-api.html#reactpurecomponent) verwenden, statt `shouldComponentUpdate()` von Hand zu schreiben. Es ist äquivalent zur Implementierung von `shouldComponentUpdate()` mit einem flachen Vergleich von alten und neuen Props und State.

## shouldComponentUpdate in Aktion {#shouldcomponentupdate-in-action}

Hier ist ein Teilbaum von Komponenten. Für jede Komponente gibt `SCU` an, was `shouldComponentUpdate` zurückgegeben hat, und `vDOMEq` gibt an, ob die gerenderten React-Elemente übereinstimmen. Die Farbe des Kreises zeigt schließlich, ob eine Komponente abgeglichen werden musste oder nicht.

<figure><img src="../images/docs/should-component-update.png" style="max-width:100%" /></figure>

Da `shouldComponentUpdate` für den von C2 ausgehenden Teilbaum `false` zurückgegeben hat, hat React nicht versucht, C2 zu rendern, und musste somit für C4 und C5 nicht einmal `shouldComponentUpdate` aufrufen.

Für C1 und C3 hat `shouldComponentUpdate` `true` zurückgegeben, wodurch React zu den Blättern weiterwandern musste, um diese zu überprüfen. Für C6 hat `shouldComponentUpdate` `true` zurückgegeben, und da die gerenderten Elemente nicht übereinstimmten, musste React das DOM updaten.

Der letzte interessante Fall ist C8. React musste diese Komponente rendern, aber da die zurückgegebenen React-Elemente keinen Unterschied zu den zuvor gerenderten hatte, musste es das DOM nicht updaten.

Beachte, dass React nur für C6 das DOM verändern musste, was unvermeidlich war. C8 war nach dem Vergleich der gerenderten React-Elemente abgehakt, und für C7 sowie den Teilbaum von C2 musste nicht einmal ein Vergleich stattfinden, da der Prozess hier schon nach `shouldComponentUpdate` abgehakt war und somit `render` nicht aufgerufen werden musste.

## Beispiele {#examples}

Wenn deine Komponente sich ausschließlich dann verändert, wenn die `props.color`- oder die `state.count`-Variable sich verändert, sollte `shouldComponentUpdate` dies überprüfen: 

```javascript
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

In diesem Code überprüft `shouldComponentUpdate` lediglich, ob es eine Veränderung in `props.color` oder `state.count` gegeben hat. Wenn diese Werte sich nicht verändern, wird die Komponente nicht aktualisiert. Für den Fall, dass deine Komponente komplexer wird, könntest du ein ähnliches Muster verwenden, indem du einen "flachen Vergleich" zwischen allen Feldern von `props` und `state` machst, um festzustellen, ob die Komponente aktualisiert werden soll. Dieses Muster ist häufig genug, dass React einen Helfer zur Verfügung stellt, um diese Logik zu verwenden - durch Vererbung von `React.PureComponent`. Dieser Code ist ein einfacherer Weg, dasselbe zu erreichen:

```js
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

In den meisten Fällen kannst du `React.PureComponent` verwenden, statt dein eigenes `shouldComponentUpdate` zu schreiben. Es führt nur einen flachen Vergleich durch, also kannst du `React.PureComponent` nicht benutzen, wenn Props oder State sich auf eine Weise verändert haben, die ein flacher Vergleich übersehen würde.

Das kann bei komplexen Datenstrukturen ein Problem sein. Lass uns z. B. sagen, du möchtest eine `ListOfWords`-Komponente, die eine Komma-separierte Wörterliste rendert, mit einer Eltern-`WorldAdder`-Komponente, die dich einen Button klicken lässt, um ein Wort zur Liste zu addieren. Dieser Code funktioniert **nicht** korrekt:

```javascript
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // Dieser Abschnitt hat einen schlechten Stil und ruft einen Bug hervor
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
```

Das Problem ist, dass `PureComponent` einen einfachen Vergleich zwischen den alten und neuen Werten von `this.props.words` durchführt. Da dieser Code das `words`-Array in der `handleClick`-Methode von `WordAdder` mutiert, wird ein Vergleich der alten und neuen Werte von `this.props.words` diese als gleich befinden, obwohl die tatsächlichen Wörter im Array sich verändert haben. Die `ListOfWords`-Komponente wird daher nicht upgedatet, obwohl sie neue Wörter enthält und gerendert werden sollte.

## Die Macht, Daten nicht zu mutieren {#the-power-of-not-mutating-data}

Der einfachste Weg, dieses Problem zu umgehen, besteht darin, die Veränderung von Werten zu vermeiden, die du als Props oder State verwendest. Zum Beispiel könnte die `handleClick`-Methode von oben unter Verwendung von `concat` wie folgt umgeschrieben werden:

```javascript
handleClick() {
  this.setState(state => ({
    words: state.words.concat(['marklar'])
  }));
}
```

ES6 unterstützt die [Spread-Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) für Arrays, was das erleichtern kann. Solltest du Create React App verwenden, ist diese Syntax standardmäßig verfügbar.

```js
handleClick() {
  this.setState(state => ({
    words: [...state.words, 'marklar'],
  }));
};
```

Du kannst auch Code, der Objekte verändert, in ähnlicher Weise umschreiben. Lass uns z. B. sagen, wir haben ein Objekt namens `colormap` und möchten eine Funktion schreiben, die `colormap.blue` in `blue` umändert. Wir könnten schreiben:

```js
function updateColorMap(colormap) {
  colormap.right = 'blue';
}
```

Um dies zu schreiben, ohne das Original-Objekt zu verändern, können wir die [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)-Methode verwenden:

```js
function updateColorMap(colormap) {
  return Object.assign({}, colormap, {right: 'blue'});
}
```

`updateColorMap` gibt nun ein neues Objekt zurück, statt das alte zu ändern. `Object.assign` ist ES6 und benötigt ein Polyfill.

[Object Spread-Syntax](https://github.com/sebmarkbage/ecmascript-rest-spread), macht es einfacher, Objekte auch ohne Veränderung zu aktualisieren.

```js
function updateColorMap(colormap) {
  return {...colormap, right: 'blue'};
}
```

Dieses Funktion wurde JavaScript in ES2018 hinzugefügt. 

Solltest du Create React App verwenden, sind sowohl `Object.assign` als auch die Object Spread-Syntax standardmäßig verfügbar. 

Wenn du mit tief verschachtelten Objekten zu tun hast, kann sich das Aktualisieren des unveränderbaren Objektes, verworren anfühlen. Wenn du auf dieses Problem stößt, schaue dir [Immer](https://github.com/mweststrate/immer) oder [immutability-helper](https://github.com/kolodny/immutability-helper) an. Mit diesen Bibliotheken kannst du gut lesbaren Code schreiben, ohne die Vorteile der Unveränderlichkeit (engl. immutability) zu verlieren.
