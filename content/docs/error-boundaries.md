---
id: error-boundaries
title: Fehlergrenzen
permalink: docs/error-boundaries.html
---

In der Vergangenheit, führten JavaScript-Fehler in Komponenten zu einem fehlerhaften Zustand innerhalb von React, welcher ein [Auftreten](https://github.com/facebook/react/issues/4026) [kryptischer](https://github.com/facebook/react/issues/6895) [Fehlermeldungen](https://github.com/facebook/react/issues/8579) in den folgenden Render-Vorgängen verursachte. Diese Fehler wurden immer von einem zuvor aufgetretenen Fehler in der Anwendung verursacht, jedoch war seitens React keine Möglichkeit bereitgestellt, um mit Fehlern in Komponenten elegant umzugehen.


## Einführung zu Fehlergrenzen {#introducing-error-boundaries}

Ein JavaScript-Fehler in einem Teil der UI sollte nicht die ganze Anwendung zerstören. Um eine Lösung für dieses Problem bereitzustellen, wurde mit React 16 das Konzept einer "Fehlergrenze" vorgestellt.

Fehlergrenzen sind React-Komponenten die **JavaScript-Fehler in ihrem ganzen Kind-Komponenten Baum abfangen, diese loggen und eine Fallback-UI**, anstatt eines zerstörten Komponenten-Baums anzeigen. Fehlergrenzen fangen Fehler während des Renderings, in Lifecycle-Methoden und in Konstruktoren des ganzen Komponenten-Baums darunter.

> Hinweis
>
> Fehlergrenzen fangen in folgenden Fällen **keine** Fehler ab :
>
> * Event-Handler ([Lies mehr dazu](#how-about-event-handlers))
> * Asynchroner Code (z.B. `setTimeout` oder `requestAnimationFrame` Callbacks)
> * Serverseitiges Rendering
> * Fehler die in der Fehlergrenze selbst und nicht in dessen Kind-Komponenten auftreten

Eine Klassen-Komponente wird zu einer Fehlergrenze wenn es eine oder beide der folgenden Lifecycle-Methoden definiert [`static getDerivedStateFromError()`](/docs/react-component.html#static-getderivedstatefromerror) oder [`componentDidCatch()`](/docs/react-component.html#componentdidcatch). Benutze `static getDerivedStateFromError()` um eine Fallback-UI zu rendern, nachdem ein Fehler aufgetreten ist. Benutze `componentDidCatch()` um Informationen über den Fehler zu loggen.

```js{7-10,12-15,18-21}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update den State damit beim nächsten Render-Vorgang die Fallback-UI angezeigt wird.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Du kannst den Fehler auch zu einem Fehlermonitoring-Service loggen
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Du kannst eine beliebige Fallback-UI rendern
      return <h1>Etwas ist schiefgelaufen.</h1>;
    }

    return this.props.children;
  }
}
```

Die Fehlergrenze kann wie eine reguläre Komponente genutzt werden:

```js
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

Fehlergrenzen funktionieren wie das `catch {}` in JavaScript, nur für Komponenten. Die Definition der Fehlergrenze als Klassenkomponente ist Voraussetzung. In der Praxis wirst du wahrscheinlich die Fehlergrenze-Komponente ein einziges mal deklarieren und diese dann durchgehend in deiner Anwendung benutzen.

Beachte dass **Fehlergrenzen nur Fehler in den Komponenten abfangen, die sich im Komponenten-Baum unter der Fehlergrenze befinden**. Eine Fehlergrenze kann keine Fehler abfangen, die innerhalb der Fehlergrenze selbst aufgetreten sind. Wenn die Fehlergrenze den in ihr aufgetretenen Fehler nicht verarbeiten kann, wird dieser zur nächstgelegenen Fehlergrenze nach oben weitergereicht. Dies ist ebenso ähnlich der Funktionalität eines `catch {}` Blocks in JavaScript.

## Live Demo {#live-demo}

Schau dir [folgendes Beispiel für die Deklaration und Nutzung einer Fehlergrenze](https://codepen.io/gaearon/pen/wqvxGa?editors=0010) mit [React 16](/blog/2017/09/26/react-v16.0.html) an.


## Wo platziert man Fehlergrenzen {#where-to-place-error-boundaries}

Über die Granularität der Fehlergrenzen kannst du frei entscheiden. Du kannst die top-level Route-Komponenten umschließen, um dem User eine "Etwas ist schiefgelaufen" Meldung anzuzeigen, diese Variante wird oft von serverseitigen Frameworks zur Fehlerbehandlung eingesetzt. Du kannst aber auch individuelle Widgets mit einer Fehlergrenze umschließen, um zu verhindern, dass diese den Rest der Anwendung zum Absturz bringen.


## Neues Verhalten für nicht abgefangene Fehlermeldungen {#new-behavior-for-uncaught-errors}

Diese Änderung hat eine wesentliche Auswirkung. **Mit React 16 führen Fehler, die nicht von einer Fehlergrenze abgefangen wurden, zum Unmounten des gesamten React Komponenten-Baums.**

Wir haben über diese Entscheidung diskutiert, unserer Erfahrung nach ist es jedoch schlimmer eine fehlerhafte UI anzuzeigen, anstatt diese komplett zu entfernen. Zum Beispiel in einem Produkt wie einem Messenger, wäre es möglich, dass durch das Anzeigen einer fehlerhaften UI, die Nachricht an eine falsche Person verschickt werden könnte. Ebenso ist es in einer Zahlunganwendung schlimmer einen falschen Betrag anzuzeigen, statt einfach nichts zu rendern.

Diese Änderung bedeutet, dass sobald du auf React 16 migrierst, wirst du höchstwahrscheinlich einige zuvor unbemerkte Fehler in deiner Anwendung entdecken. Wenn etwas schief läuft, gibt das Hinzufügen von Fehlergrenzen dir die Möglichkeit, eine bessere Nutzererfahrung zu gewährleisten.

Zum Beispiel, der Facebook Messenger umschließt den Inhalt der Seitenleiste, des Informationspanels, des Unterhaltungsverlaufs und der Nachrichteneingabe mit separaten Fehlergrenzen. Wenn eines dieser UI-Bereiche abstürzt, bleibt der Rest interaktiv.

Des Weiteren raten wir dir ein Fehlermonitoring-Service zu nutzen (oder dein eigenes zu implementieren), damit du über die am Live-System aufgetretenen Fehler informiert bist und diese beheben kannst.


## Strack-Trace von Komponenten {#component-stack-traces}

React 16 gibt alle Fehlermeldungen in der Konsole aus, die im Zuge des Renderingvorgangs während der Entwicklung aufgetreten sind. Dies passiert auch dann, wenn die Anwendung die Fehlermeldungen unabsichtlich unterdrückt. Zusätzlich zu den Fehlermeldungen und dem JavaScript-Stack, werden auch die Komponenten Stack-Traces ausgegeben. Somit kannst du genau sehen, wo im Komponenten-Baum der Fehler zuerst aufgetreten ist:

<img src="../images/docs/error-boundaries-stack-trace.png" style="max-width:100%" alt="Fehler der durch eine Fehlergrenzen-Komponente abgefangen wurde">

Du kannst auch die Dateinamen und Zeilennummern im Komponenten Stack-Trace sehen. Dies funktionert standardmäßig in [Create React App](https://github.com/facebookincubator/create-react-app) Projekten:

<img src="../images/docs/error-boundaries-stack-trace-line-numbers.png" style="max-width:100%" alt="Fehler der durch eine Fehlregrenze-Komponente abgefangen wurde, mit Angabe zur Zeilennummern">

Wenn du Create React App nicht verwendest, kannst du [folgende Erweiterung](https://www.npmjs.com/package/babel-plugin-transform-react-jsx-source) manuell zu deiner Babel-Konfiguration hinzufügen. Hinweis: Diese ist nur für den Einsatz während des Entwicklungsprozesses gedacht und **muss am Live-System deaktiviert werden**.

> Hinweis
>
> Namen von Komponenten die im Stack-Trace angezeigt werden, hängen von der [`Function.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name) Eigenschaft ab. Wenn du ältere Browser und Endgeräte unterstützen möchtest, welche diese Eigenschaft noch nicht unterstützen (z.B. IE 11), könntest du den Einsatz eines `Function.name` Polyfills wie [`function.name-polyfill`](https://github.com/JamesMGreene/Function.name) in deiner gebündelten Anwendung, in Erwägung ziehen. Alternativ, kannst du auch die [`displayName`](/docs/react-component.html#displayname) Eigenschaft explizit für alle deine Komponenten definieren.


## Wie sieht es mit try/catch aus? {#how-about-trycatch}

`try` / `catch` ist großartig, funktioniert jedoch nur bei imperativen Code:

```js
try {
  showButton();
} catch (error) {
  // ...
}
```

React-Komponenten sind deklarativ und spezifizieren *was* gerendert werden soll:

```js
<Button />
```

Fehlergrenzen bewahren die deklarative Natur von React bei und verhalten sich so wie du es erwarten würdest. Auch, wenn beispielsweise ein Fehler in einer `componentDidUpdate` Methode auftritt, der von einem `setState` irgendwo tief im Komponenten-Baum verursacht wurde. Dieser Fehler wird trotzdem zur nächstgelegenen Fehlergrenze weitergeleitet.

## Wie sieht es mit Event-Handler aus? {#how-about-event-handlers}

Fehlergrenzen fangen **keine** Fehler innerhalb der Event-Handler ab.

React braucht keine Fehlergrenzen um sich von Fehlern innerhalb von Event-Handlern zu erholen. Im Gegensatz zu Render- und Lifecycle-Methoden finden Event-Handler nicht während des Renderings statt. Das heißt, im Falle eines Fehlers weiß React noch immer, was angezeigt werden soll.

Wenn du einen Fehler innerhalb von Event-Handlern abfangen möchtest, nutze das normale `try` / `catch` JavaScript-Statement:

```js{9-13,17-20}
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      // Mache etwas, was zu einem Fehler führt
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Ein Fehler wurde abgefangen.</h1>
    }
    return <div onClick={this.handleClick}>Klick mich</div>
  }
}
```

Hinweis: Das Beispiel oben demonstriert das normale JavaScript-Verhalten und setzt keine Fehlergrenzen ein.

## Änderung von Benennungen in React 15 {#naming-changes-from-react-15}

React 15 besaß einen sehr limitierten Support für Fehlergrenzen unter dem Methodennamen: `unstable_handleError`. Diese Methode funktioniert nicht mehr und muss stattdessen im Quellcode durch `componentDidCatch`, angefangen beim ersten 16 Beta-Release, ersetzt werden.

Für diese Änderungen, stellen wir einen [Codemod](https://github.com/reactjs/react-codemod#error-boundaries) zur Verfügung, um die Migration in deinem Quellcode automatisch vorzunehmen.
