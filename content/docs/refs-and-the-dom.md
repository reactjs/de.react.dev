---
id: refs-and-the-dom
title: Refs und das DOM
redirect_from:
  - "docs/working-with-the-browser.html"
  - "docs/more-about-refs.html"
  - "docs/more-about-refs-ko-KR.html"
  - "docs/more-about-refs-zh-CN.html"
  - "tips/expose-component-functions.html"
  - "tips/children-undefined.html"
permalink: docs/refs-and-the-dom.html
---

Refs bieten eine Möglichkeit, auf DOM-Knoten oder React-Elemente zuzugreifen, die mit der Rendermethode erstellt wurden.

Im normalen React-Datenfluss stellen [Props](/docs/components-and-props.html) die einzige Möglichkeit dar, um übergeordnete Komponenten mit ihren untergeordneten Komponenten interagieren zu lassen. Um ein untergeordnetes Element zu verändern, muss es mit neuen Props erneut gerendert werden. Es gibt jedoch einige Fälle, in denen du ein untergeordnetes Element unbedingt außerhalb des typischen Datenflusses ändern musst. Das zu ändernde untergeordnete Element kann eine Instanz einer React-Komponente oder ein DOM-Element sein. In beiden Fällen bietet React einen Ausweg.

### Wann man Refs benutzt {#when-to-use-refs}

Es gibt einige gute Anwendungsfälle für Refs:

* Verwalten des Fokus, der Textauswahl oder der Medienwiedergabe.
* Imperative Animationen auslösen.
* Integration in DOM-Bibliotheken von Drittanbietern.

Vermeide die Verwendung von Refs für alles, was deklarativ durchgeführt werden kann.

Anstatt beispielsweise die Methoden `open ()` und `close ()` in einer `Dialog` -Komponente verfügbar zu machen, übergebe ihr eine` isOpen`-Prop.

### Verwende Refs nicht zu häufig {#dont-overuse-refs}

Deine erste Neigung könnte sein, Refs zu verwenden, um Dinge in deier App "geschehen zu lassen". Wenn dies der Fall ist, nehme dich einen Moment Zeit und überlege genauer, wo sich der Status in der Komponentenhierarchie befinden sollte. Oft wird klar, dass der richtige Ort, um diesen Zustand zu "besitzen", auf einer höheren Ebene in der Hierarchie liegt. Beispiele hierfür findest du im Handbuch [State anheben](/docs/lifting-state-up.html).

> Hinweis
>
> Die folgenden Beispiele wurden aktualisiert, um die in React 16.3 eingeführte API `React.createRef()` zu verwenden. Wenn du eine frühere Version von React verwendest, empfehlen wir stattdessen die Verwendung von [callback Refs](#callback-refs).

### Refs erstellen {#creating-refs}

Refs werden mit `React.createRef()` erstellt und über das Attribut `ref` an React-Elemente angehängt. Refs werden häufig einer Instanzeigenschaft zugewiesen, wenn eine Komponente erstellt wird, sodass auf sie in der gesamten Komponente verwiesen werden kann.

```javascript{4,7}
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

### Zugreifen auf Refs {#accessing-refs}

Wenn eine Ref an ein Element in `render` übergeben wird, wird eine Referenz auf den Knoten unter dem Attribut `current` der Ref zugänglich.

```javascript
const node = this.myRef.current;
```

Der Wert der Ref hängt vom Typ des Knotens ab:

- Wenn das Attribut `ref` für ein HTML-Element verwendet wird, erhält das im Konstruktor mit `React.createRef()` erstellte `ref` das zugrunde liegende DOM-Element als `current`-Eigenschaft.
- Wenn das Attribut `ref` für eine benutzerdefinierte Klassenkomponente verwendet wird, empfängt das Objekt `ref` die angehängte Instanz der Komponente als `current`.
- **Darf das Attribut `ref` für Funktionskomponenten nicht verwenden**, da diese keine Instanzen haben.

Die folgenden Beispiele zeigen die Unterschiede.

#### Hinzufügen eines Ref zu einem DOM-Element {#adding-a-ref-to-a-dom-element}

Dieser Code verwendet ein `ref`, um einen Verweis auf einen DOM-Knoten zu speichern:

```javascript{5,12,22}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Erstelle ein Ref zum Speichern des textInput-DOM-Elements
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Fokussiere die Texteingabe explizit mit der Raw-DOM-API
    // inweis: Wir greifen auf "current" zu, um den DOM-Knoten zu erhalten
    this.textInput.current.focus();
  }

  render() {
    // Sage, dass wir den <input>-Ref mit dem im Konstruktor
    // erstellten `textInput` verknüpfen möchten
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

React weist dem DOM-Element die Eigenschaft `current` zu, wenn die Komponente bereitgestellt wird, und weist sie beim Aufheben der Bereitstellung wieder `null` zu. `ref`-Aktualisierungen erfolgen vor `componentDidMount`- oder `componentDidUpdate`-Lebenszyklusmethoden.

#### Hinzufügen eines Ref zu einer Klassenkomponente {#adding-a-ref-to-a-class-component}

Wenn wir den oben genannten `CustomTextInput` umbrechen wollten, um zu simulieren, dass er unmittelbar nach dem Mounten angeklickt wird, könnten wir einen ref verwenden, um auf die benutzerdefinierte Eingabe zuzugreifen und die Methode` focusTextInput` manuell aufzurufen:

```javascript{4,8,13}
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

Beachte, dass dies nur funktioniert, wenn `CustomTextInput` als Klasse deklariert ist:

```js{1}
class CustomTextInput extends React.Component {
  // ...
}
```

#### Refs und Funktionskomponenten {#refs-and-function-components}

**Darf das Attribut `ref` nicht für Funktionskomponenten verwenden**, da diese keine Instanzen haben:


```javascript{1,8,13}
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // Das wird *nicht* funktionieren!
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}
```

Wenn du zulassen möchtest, dass Benutzer eine Referenz zu deiner Funktionskomponente hinzufügen, kannst du [`forwardRef`](https://reactjs.org/docs/forwarding-refs.html) verwenden (möglicherweise in Verbindung mit [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle)), oder du kannst die Komponente in eine Klasse konvertieren.


Du kannst jedoch **das Attribut `ref` in einer Funktionskomponente verwenden**, solange du auf ein DOM-Element oder eine Klassenkomponente verweist:

```javascript{2,3,6,13}
function CustomTextInput(props) {
  // Hier muss textInput deklariert werden, damit der Verweis darauf verweisen kann
  let textInput = React.createRef();

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={textInput} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
```

### Offenlegen von DOM-Refs für übergeordnete Komponenten {#exposing-dom-refs-to-parent-components}

In seltenen Fällen möchtest du möglicherweise von einer übergeordneten Komponente aus auf den DOM-Knoten eines untergeordneten Elements zugreifen können. Dies wird im Allgemeinen nicht empfohlen, da es die Verkapselung von Komponenten unterbricht. Es kann jedoch gelegentlich nützlich sein, um den Fokus auszulösen oder die Größe oder Position eines untergeordneten DOM-Knotens zu messen.

Du könntest zwar [Hinzufügen eines Ref zu einer Klassenkomponente](#adding-a-ref-to-a-class-component), dies ist jedoch keine ideale Lösung, da du nur eine Komponenteninstanz anstelle eines DOM-Knotens erhalten würdest. Darüber hinaus würde dies nicht mit Funktionskomponenten funktionieren.

Wenn du React 16.3 oder höher verwendest, empfehlen wir in diesen Fällen die Verwendung von [Weiterleiten von Refs](/docs/forwarding-refs.html). **Mit der Weiterleitung von Refs können Komponenten festlegen, dass der Ref jeder untergeordneten Komponente als ihr eigener angezeigt wird**. Ein detailliertes Beispiel, wie der DOM-Knoten eine untergeordnete Komponente für eine übergeordnete Komponente verfügbar gemacht wird, findest du [in der Dokumentation zur Weiterleiten von Refs](/docs/forwarding-refs.html#forwarding-refs-to-dom-components).

Wenn du React 16.2 oder eine niedrigere Version verwendest oder mehr Flexibilität benötigst, als durch die Weiterleiten von Refs bereitgestellt wird, kannst du [diesen alternativen Ansatz](https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509) verwenden und einen Ref explizit als übergeben anders benanntes Prop.

Wenn möglich, raten wir davon ab, DOM-Knoten freizulegen, dies kann jedoch ein nützlicher Ausweg sein. Beachte, dass du bei diesem Ansatz der untergeordneten Komponente Code hinzufügen musst. Wenn du absolut keine Kontrolle über die Implementierung der untergeordneten Komponente hast, kannst du als letzte Option [`findDOMNode ()`](/docs/react-dom.html#finddomnode) verwenden, dies wird jedoch in [`StrictMode`](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage) nicht empfohlen und ist veraltet.

### Callback Refs {#callback-refs}

React unterstützt auch eine andere Methode zum Festlegen von Refs mit der Bezeichnung "Callback Refs", mit der du genauer steuern kannst, wann Refs festgelegt und deaktiviert werden.

Anstatt ein von `createRef()` erzeugtes `ref`-Attribut zu übergeben, übergebe eine Funktion. Die Funktion erhält als Argument die Instanz der React-Komponente oder das HTML-DOM-Element, auf das an anderer Stelle zugegriffen werden kann.

Das folgende Beispiel implementiert ein allgemeines Muster: Speichern eines Verweises auf einen DOM-Knoten in einer Instanzeigenschaft mit dem Rückruf `ref`.

```javascript{5,7-9,11-14,19,29,34}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // Fokussiere die Texteingabe mithilfe der DOM-API
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // Autofokussiere den Eingang auf Mount
    this.focusTextInput();
  }

  render() {
    // Verwenden Sie den `ref` Callback, um einen Verweis auf das
    // Texteingabe-DOM-Element in einem Instanzfeld (z. B. this.textInput)
    // zu speichern.
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

React ruft den Rückruf `ref` mit dem DOM-Element auf, wenn die Komponente bereitgestellt wird, und ruft ihn mit `null` auf, wenn die Bereitstellung aufgehoben wird. Refs sind garantiert auf dem neuesten Stand, bevor `componentDidMount` oder `componentDidUpdate` ausgelöst werden.

Du kannst callback Refs zwischen Komponenten übergeben, wie du es mit Objektreferenzen kannst, die mit `React.createRef()` erstellt wurden.

```javascript{4,13}
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

Im obigen Beispiel übergibt `Parent` seinen ref Callback als `inputRef`-Prop an `CustomTextInput`, und` CustomTextInput` übergibt die gleiche Funktion wie ein spezielles `ref`-Attribut an `<input> `. Infolgedessen wird `this.inputElement` in `Parent` auf den DOM-Knoten gesetzt, der dem `<input>`-Element in `CustomTextInput` entspricht.

### Legacy-API: String Refs {#legacy-api-string-refs}

Wenn du zuvor mit React gearbeitet hast, kennst du möglicherweise eine ältere API, bei der das Attribut `ref` eine String wie `"textInput"` ist und auf den DOM-Knoten als `this.refs.textInput` zugegriffen wird. Wir raten davon ab, da String-Refs [einige Probleme](https://github.com/facebook/react/pull/8333#issuecomment-271648615) haben, als Legacy betrachtet werden und **wahrscheinlich in einem der entfernt werden zukünftige Versionen**.

> Hinweis
>
> Wenn du derzeit `this.refs.textInput` für den Zugriff auf Refs verwendest, empfehlen wir, stattdessen entweder das [Callback Muster](#callback-refs) oder die [`createRef` API](#creating-refs) zu verwenden.

### Caveats mit callback refs {#caveats-with-callback-refs}

Wenn der `ref`-Callback als Inline-Funktion definiert ist, wird er bei Aktualisierungen zweimal aufgerufen, zuerst mit `null` und dann erneut mit dem DOM-Element. Dies liegt daran, dass mit jedem Rendern eine neue Instanz der Funktion erstellt wird. React muss daher die alte Referenz löschen und die neue einrichten. Du kannst dies vermeiden, indem du den `ref`-Callback als gebundene Methode für die Klasse definierst. Beachte jedoch, dass dies in den meisten Fällen keine Rolle spielen sollte.
