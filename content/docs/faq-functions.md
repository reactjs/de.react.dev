---
id: faq-functions
title: Funktionen an Komponenten weitergeben
permalink: docs/faq-functions.html
layout: docs
category: FAQ
---

### Wie gebe ich einen Event-Handler (wie onClick) an eine Komponente weiter? {#how-do-i-pass-an-event-handler-like-onclick-to-a-component}

Übergebe Event-Handler und andere Funktionen als Props an Unterkomponenten:

```jsx
<button onClick={this.handleClick}>
```

Wenn du Zugang zur höher gelegenen Komponente im Handler benötigst, musst du auch die Funktion an die Komponenteninstanz binden (siehe unten).

### Wie binde ich eine Funktion an eine Komponenteninstanz? {#how-do-i-bind-a-function-to-a-component-instance}

Es gibt mehrere Möglichkeiten um sicherzustellen, dass Funktionen Zugang zu Komponenteneigenschaften wie `this.props` und `this.state` haben, abhängig davon welche Syntax oder Build-Schritte benutzt werden.

#### Binden im Konstruktor (ES2015) {#bind-in-constructor-es2015}

```jsx
class Foo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
```

#### Klasseneigenschaften (vorgeschlagen für Stufe 3) {#class-properties-stage-3-proposal}

```jsx
class Foo extends Component {
  // Note: this syntax is experimental and not standardized yet.
  handleClick = () => {
    console.log('Click happened');
  }
  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
```

#### Binden beim Rendern {#bind-in-render}

```jsx
class Foo extends Component {
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <button onClick={this.handleClick.bind(this)}>Click Me</button>;
  }
}
```

>**Hinweis:**
>
>Wenn `Function.prototype.bind` beim Rendern benutzt wird, wird jedes mal eine neue Funktion erzeugt wenn die Komponente erneut gerendert wird. Dies kann Leistungseinbußen zur Folge haben (siehe unten).

#### Pfeilfunktion beim Rendern {#arrow-function-in-render}

```jsx
class Foo extends Component {
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <button onClick={() => this.handleClick()}>Click Me</button>;
  }
}
```

>**Hinweis:**
>
>Wenn Pfeilfunktionen beim Rendern benutzt werden, wird jedes Mal eine neue Funktion erzeugt wenn die Komponente gerendert wird. Dies kann Optimierungen mit strengem Identitätsvergleich zerstören.

### Ist es OK Pfeilfunktionen in Rendermethoden zu benutzen? {#is-it-ok-to-use-arrow-functions-in-render-methods}

Allgemein gesagt ja, es ist OK, und es ist oft der einfachste Weg um Parameter an Callback-Funktionen weiterzugeben.

Im Fall von Leistungsproblemen sollte man jedoch optimieren!

### Warum ist Binden überhaupt notwendig? {#why-is-binding-necessary-at-all}

In JavaScript, sind diese beiden Code-Schnipsel **nicht** equivalent:

```js
obj.method();
```

```js
var method = obj.method;
method();
```

Methoden zu Binden trägt dazu bei, dass sich der zweite Code-Schnipsel auf die selbe Weise wie der erste verhält.

Mit React musst du normalerweise nur die Methoden binden, die du an andere Komponenten *weitergeben* möchtest. Zum Beispiel gibt `<button onClick={this.handleClick}>` `this.handleClick` weiter, und deshalb sollte es gebunden werden. Es ist jedoch nicht notwendig die `render` oder die Lifecycle-Methode zu binden: Wir geben diese Methoden nicht an Komponenten weiter.

[Dieser Beitrag von Yehuda Katz](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) erklärt was Binden ist und wie Funktionen in JavaScript im Detail funktionieren.

### Warum wird meine Funktion jedes Mal aufgerufen, wenn die Komponente rendert?{#why-is-my-function-being-called-every-time-the-component-renders}

Du musst aufpassen, dass du nicht _die Funktion aufrufst_, wenn du sie and die Komponente übergibst:

```jsx
render() {
  // Wrong: handleClick is called instead of passed as a reference!
  return <button onClick={this.handleClick()}>Click Me</button>
}
```

Stattdessen *übergebe die Funktion selbst* (ohne Klammern)

```jsx
render() {
  // Correct: handleClick is passed as a reference!
  return <button onClick={this.handleClick}>Click Me</button>
}
```

### Wie übergebe ich einen Parameter an einen Event-Handler oder Callback? {#how-do-i-pass-a-parameter-to-an-event-handler-or-callback}

Du kannst eine Pfeilfunktion dazu benutzten, um einen Event-Handler zu umschließen und Parameter weiterzugeben:

```jsx
<button onClick={() => this.handleClick(id)} />
```

Dies ist identisch zum Aufruf von `.bind`:

```jsx
<button onClick={this.handleClick.bind(this, id)} />
```

#### Beispiel: Weitergabe von Parametern mit Hilfe von Pfeilfunktionen{#example-passing-params-using-arrow-functions}

```jsx
const A = 65 // ASCII character code

class Alphabet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justClicked: null,
      letters: Array.from({length: 26}, (_, i) => String.fromCharCode(A + i))
    };
  }
  handleClick(letter) {
    this.setState({ justClicked: letter });
  }
  render() {
    return (
      <div>
        Just clicked: {this.state.justClicked}
        <ul>
          {this.state.letters.map(letter =>
            <li key={letter} onClick={() => this.handleClick(letter)}>
              {letter}
            </li>
          )}
        </ul>
      </div>
    )
  }
}
```

#### Beispiel: Weitergabe von Parametern mit Hilfe von data-Attributen{#example-passing-params-using-data-attributes}

Alternativ können DOM-APIs dazu benutzt werden, Daten für Event-Handler zu speichern. Dies solltest du in betracht ziehen, wenn du eine große Anzahl von Elementen optimieren möchte oder einen Renderbaum benutzt der sich auf die Gleichheitsprüfung von React.PureComponent verlässt.

```jsx
const A = 65 // ASCII character code

class Alphabet extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      justClicked: null,
      letters: Array.from({length: 26}, (_, i) => String.fromCharCode(A + i))
    };
  }

  handleClick(e) {
    this.setState({
      justClicked: e.target.dataset.letter
    });
  }

  render() {
    return (
      <div>
        Just clicked: {this.state.justClicked}
        <ul>
          {this.state.letters.map(letter =>
            <li key={letter} data-letter={letter} onClick={this.handleClick}>
              {letter}
            </li>
          )}
        </ul>
      </div>
    )
  }
}
```

### Wie kann ich verhindern, dass eine Funtion entweder zu schnell oder zu oft hintereinander aufgrufen wird.{#how-can-i-prevent-a-function-from-being-called-too-quickly-or-too-many-times-in-a-row}

Wenn du einen Event-Handler wie `onClick` oder `onScroll` benutzt und verhindern möchtest, dass der Callback zu schnell ausgelöst wird, dann kannst du die Häufigkeit mit der der Callback ausgeführt wird einschränken.

- **throttling**: Eingabewert wechselt basierend auf einem Zeitinterval (z. Bsp. [`_.throttle`](https://lodash.com/docs#throttle))
- **debouncing**: Veröffentlichung von Veränderungen nach einer gewissen Zeit der Inaktivität (z.Bsp. [`_.debounce`](https://lodash.com/docs#debounce))
- **`requestAnimationFrame` throttling**: Eingabewert wechselt basierend auf [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) (z. Bsp. [`raf-schd`](https://github.com/alexreardon/raf-schd))

Siehe [diese Visualisierung](http://demo.nimius.net/debounce_throttle/) für einen Vergleich von `throttle` und `debounce` Funktionen.

> Hinweis:
>
> `_.debounce`, `_.throttle` und `raf-schd` bieten eine `cancel`-Methode um verzögerte Callbacks zu löschen. Du solltest diese Methode entweder von `componentWillUnmount` aufrufen _oder_ prüfen und sicherstellen, dass die Komponente innerhalb der verzögerten Funktion gemountet ist.

#### Throttle {#throttle}

Throttling verhindert, dass eine Funktion mehr als einmal innerhalb eines definierten Zeitfensters aufgerufen wird. Das unten angegebene Beispiel throttlet einen "click"-Handler um zu verhindern, dass er mehr als einmal pro Sekunde aufgerufen wird.

```jsx
import throttle from 'lodash.throttle';

class LoadMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickThrottled = throttle(this.handleClick, 1000);
  }

  componentWillUnmount() {
    this.handleClickThrottled.cancel();
  }

  render() {
    return <button onClick={this.handleClickThrottled}>Load More</button>;
  }

  handleClick() {
    this.props.loadMore();
  }
}
```

#### Debounce {#debounce}

Debouncing stellt sicher, dass eine Funktion nur ausgeführt wird, wenn eine bestimmte Zeit seit dem letzten Aufruf verstrichen ist. Das kann hilfreich sein, wenn du aufwendige Berechnungen ausführen musst um auf ein häufig auftretendes Ereignis zu reagieren (z.Bsp. Scrollen oder Tastatur-Eingaben). Das Beispiel unten debouncet eine Texteingabe mit einer Verzögerung von 250ms.

```jsx
import debounce from 'lodash.debounce';

class Searchbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 250);
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.handleChange}
        placeholder="Search..."
        defaultValue={this.props.value}
      />
    );
  }

  handleChange(e) {
    this.emitChangeDebounced(e.target.value);
  }

  emitChange(value) {
    this.props.onChange(value);
  }
}
```

#### `requestAnimationFrame` throttling {#requestanimationframe-throttling}

[`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) ist ein Weg um eine Funktion in eine Warteschlange zu stellen um sie dann vom Browser zum optimalen Zeitpunkt für die beste Renderleistung ausführen zu lassen. Eine Funktion, die mit `requestAnimationFrame` in die Warteschlange gestellt wird, wifr mit dem nächsten Bildwechsel ausgelöst. Der Browser bemüht sich sehr um 60 Bildwechsel pro Sekunde auszuführen (60 fps). Wenn der Browser dies nicht schafft, dann wir die Anzahl der Bildwechsel pro Sekunde auf natürliche Weise *begrenzt*. Zum Beispiel ist es möglich, dass ein Gerät nur 30 fps leisten kann, dann gibt es nur 30 Bildwechsel pro Sekunde. Der Einsatz von `requestAnimationFrame` zum Throttling ist ein hilfreicher Weg um zu verhindern, dass mehr als 60 Updates pro Sekunde ausgeführt werden. Wenn mehr als 100 Updates pro Sekunde ausgeführt werden erzeugt dies zusätzliche Arbeit für den Browser die der Benutzer sowieso nicht sehen kann.

>**Hinweis:**
>
>Wenn du dieses Verfahren anwendest, wird nur der zuletzt aktivierte Wert beim Bildwechsel festgehalten. Du kannst ein Beispiel, wie diese Optimierung funktioniert auf [`MDN`](https://developer.mozilla.org/en-US/docs/Web/Events/scroll) sehen

```jsx
import rafSchedule from 'raf-schd';

class ScrollListener extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);

    // Create a new function to schedule updates.
    this.scheduleUpdate = rafSchedule(
      point => this.props.onScroll(point)
    );
  }

  handleScroll(e) {
    // When we receive a scroll event, schedule an update.
    // If we receive many updates within a frame, we'll only publish the latest value.
    this.scheduleUpdate({ x: e.clientX, y: e.clientY });
  }

  componentWillUnmount() {
    // Cancel any pending updates since we're unmounting.
    this.scheduleUpdate.cancel();
  }

  render() {
    return (
      <div
        style={{ overflow: 'scroll' }}
        onScroll={this.handleScroll}
      >
        <img src="/my-huge-image.jpg" />
      </div>
    );
  }
}
```

#### Testen der Durchsatzratenbegrenzung (engl. rate limiting)  {#testing-your-rate-limiting}

Um zu testen ob der durchsatzratenbegrenzte Code funktioniert ist es hilfreich, die Möglichkeit zu haben, die Zeit vorzuspulen. Wenn du [`jest`](https://facebook.github.io/jest/) benutzt kannst du [`mock timers`](https://facebook.github.io/jest/docs/en/timer-mocks.html) verwenden um die Zeit vorzuspulen. Wenn du `requestAnimationFrame` throttling benutzt, ist [`raf-stub`](https://github.com/alexreardon/raf-stub) ein hilfreiches Werkzeug um den Fortschritt der einzelnen Animation-Frames zu kontrollieren.