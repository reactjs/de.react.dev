---
id: faq-functions
title: Funktionen an Komponenten weitergeben
permalink: docs/faq-functions.html
layout: docs
category: FAQ
---

### Wie gebe ich einen Enventhandler (wie onClick) an eine Komponente weiter? {#how-do-i-pass-an-event-handler-like-onclick-to-a-component}

Wietergabe von Eventhandlern and andere Funktionen als Props von Unterkomponenten:

```jsx
<button onClick={this.handleClick}>
```

Wenn Sie Zugang zur Oberkomponente im Handler benötigen dann müssen Sie auch die Funktion zur Komponenten Instanz binden (siehe unten). 

### Wie binde ich eine Funtion and eine Komponenteninstanz? {#how-do-i-bind-a-function-to-a-component-instance}

Es gibt mehrere Möglichkeiten um sicherzustellen dass Funktionen Zugang zu Komponenteneigenschaften haben wie `this.props` und `this.state`, abhängig davon welche Syntax odder Build Schritte benutzt werden.

#### Binden mit Constructor (ES2015) {#bind-in-constructor-es2015}

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

#### Binden im Renderschritt {#bind-in-render}

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
>Wenn `Function.prototype.bind` im Renderschritt benutzt wird, wird jedes mal ein eine neue Funktion erzeugt wenn die Komponente den Renderschritt durchläuft. Dies kann Leistungseinbusen zur Folge haben (siehe unten).

#### Pfeilfunktion im Renderschritt {#arrow-function-in-render}

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
>Wenn Pfeilfunktionen im Renderschritt benutzt werden, wird jedes Mal eine neue Funktion erzeugt wenn die Komponente den Renderschritt durchläuft. Dies kann Optimierungen mit strengem Identitätsvergleich zerstören.

### Ist es OK Pfeilfunktionen in Rendermethoden zu benutzen? {#is-it-ok-to-use-arrow-functions-in-render-methods}

Allgemein gesagt ja, es ist OK, und es ist oft der einfachste Weg um Parameter and Callback Funktionen weiterzugeben.

Im Fall von Leistungsproblemen sollte man jedoch optimieren!

### Warum ist Binden überhaupt notwendig? {#why-is-binding-necessary-at-all}

In JavaScript, sind diese beiden Code Stückchen **nicht** equivalent:

```js
obj.method();
```

```js
var method = obj.method;
method();
```

Binde Methoden tragen dazu bei sicherzustellen dass das zweite Code Stückchen wie das erste funktioniert.

Mit React muss man normalerweise nur die Methoden binden, die man an andere Komponenten *weitergeben* möchte. Zum Beispiel `<button onClick={this.handleClick}>` gibt `this.handleClick` weiter, und deshalb sollte es gebunden werden. Es ist jedoch nicht notwendig die `render` oder die Lifecycle Methode zu binden: Wir geben diese Methoden nicht an Komponenten weiter.

[Dies ist ein Post von Yehuda Katz](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) erklärt was Binden ist und wie Funktionen in JavaScript im Detail funktionieren.

### Warum wird meine Funktion jedes Mal aufgerufen, wenn die Komponente rendert?{#why-is-my-function-being-called-every-time-the-component-renders}

Make sure you aren't _calling the function_ when you pass it to the component:

```jsx
render() {
  // Wrong: handleClick is called instead of passed as a reference!
  return <button onClick={this.handleClick()}>Click Me</button>
}
```

Instead, *pass the function itself* (without parens):

```jsx
render() {
  // Correct: handleClick is passed as a reference!
  return <button onClick={this.handleClick}>Click Me</button>
}
```

### How do I pass a parameter to an event handler or callback? {#how-do-i-pass-a-parameter-to-an-event-handler-or-callback}

Eine Pfeil Funktion kann dazu benutzt werden einen Event Handler einzuschliessen und Parameter weiterzugebe:

```jsx
<button onClick={() => this.handleClick(id)} />
```

This is equivalent to calling `.bind`:

```jsx
<button onClick={this.handleClick.bind(this, id)} />
```

#### Beispiel: Weitergabe von Parametern mit Hilfe einer Pfeil Funktion{#example-passing-params-using-arrow-functions}

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

#### Beispiel: Weitergabe von Parametern mit Hilfe von Dateneigenschaften{#example-passing-params-using-data-attributes}

Alternativ dazu können DOM APIs dazu benutzt werden um Daten für Event Handlers zu speichern. Dies sollte man in Betracht ziehen wenn man eine grosse Anzahl von Elementen optimieren möchte oder wenn man einen render Baum benutzt der React.PureComponent Gleichheits Prüfungen verwendet.

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

Wenn man einen Event Handler wie `onClick` oder `onScroll` benutzt und man verhindern möchte dass der Rückruf zu schnell ausgelöst wird, dann kann man die Häufigkeit mit der der Rückruf ausgeführt wird einschränken.

- **throttling**: Eingabewert wechselt basierend auf einem Zeitinterval (z.Bsp. [`_.throttle`](https://lodash.com/docs#throttle))
- **debouncing**: Veröffentlichung von Veränderungen nach einer gewissen Zeit der Inaktivität (z.Bsp. [`_.debounce`](https://lodash.com/docs#debounce))
- **`requestAnimationFrame` throttling**: Eingabewert wechselt basierend auf [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) (z.Bsp. [`raf-schd`](https://github.com/alexreardon/raf-schd))

Siehe auch [diese Demonstration](http://demo.nimius.net/debounce_throttle/) für einen Verglich von `throttle` und `debounce` Funktionen.

> Hiinweis:
>
> `_.debounce`, `_.throttle`und `raf-schd` bieten eine `cancel` Methode um verzögerte Rückrufe zu löschen. Man sollte diese Methode entweder von `componentWillUnmount` aufrufen _oder_ perüfen, um sicherzustellen dass die Komponente immer noch in der verzögerten Funtion aktiv ist.

#### Throttle {#throttle}

Throttling verhindert dass eine Funtion mehr als einmal innerhalb eines definierten Zeitfensters aufgerufen wird. Das unten angegebene Beispiel throttles einen "click" Handler um zu verhindern, dass er mehr als einmal pro Sekunke aufgerufen wird.

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

Debouncing stellt sicher, dass eine Funktion nur ausgeführt wird wen eine bestimmte Zeit seit dem letzten Aufruf verstrichen ist. Das kann hielfreich sein wenn man aufwendige Berechnungen ausführen muss auf ein haüfig auftretendes Ereignis zu reagieren (z.Bsp. Scrollen oder Tastatur Ereignisse). Das Beispiel unten debounces Texteingabe mit einer 250ms Verzögerung.

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
    // React pools events, so we read the value before debounce.
    // Alternately we could call `event.persist()` and pass the entire event.
    // For more info see reactjs.org/docs/events.html#event-pooling
    this.emitChangeDebounced(e.target.value);
  }

  emitChange(value) {
    this.props.onChange(value);
  }
}
```

#### `requestAnimationFrame` throttling {#requestanimationframe-throttling}

[`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) ist eine Art um Funktionen in die Warteschlange zu stellen um sie dann zum optimalen Zeitpunkt für die beste Renderleistung auszuführen. Eine Funktion, die mit `requestAnimationFrame`in die Warteschlange gestellt wird wir mit dem nächsten Bildwechsel ausgelöst. Der Browser bemüht sich sehr um 60 Bildwechsel pro Sekunde auszuführen (60 fps). Wenn der Browser dies nicht schafft, dann wir die Anzahl der Bildwechsel pro Sekunde auf natürliche Weise *begrenzt*. Zum Beispiel ist es möglich dass ein Gerät nur 30 fps leisten kann und dann gibt es nur 30 Bildwechsel pro Sekunde. Der Einsatz von `requestAnimationFrame` zum Throttling ist eine hielfreicher Weg um zu verhindern dass mehr als 60 Updates pro Sekunde ausgeführt werden. Wenn mehr als 100 Updates pro Sekunde ausgeführt werden erzeugt dies zusätzliche Arbeit für den Browser die der Benutzer sowieso nicht sehen kann.

>**Hinweis:**
>
>Wenn man dieses Verfahren anwendet wir nur der zuletzt aktivierte Wert beim Bildwechsel festgehalten. Ein Beispiel um zu sehen wie diese Optimierung funktioniert kann man hier sehen 
[`MDN`](https://developer.mozilla.org/en-US/docs/Web/Events/scroll)

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

#### Testen der Wiederholungshäufigkeit Beschränkung {#testing-your-rate-limiting}

Um auszuprobieren ob der Wiederholungshäufigkeit beschränkte Code funktioniert ist ein Zeitraffer hielfreich. Wenn man [`jest`](https://facebook.github.io/jest/) benutzt, dann kann man [`mock timers`](https://facebook.github.io/jest/docs/en/timer-mocks.html) anwenden um die Zeit vorzuspulen. Wenn man `requestAnimationFrame` throttling benutzt dann ist [`raf-stub`](https://github.com/alexreardon/raf-stub) ein hilfreiches Instrument um den Fortschritt der einzelnen Annimationsframes zu kontrollieren.
