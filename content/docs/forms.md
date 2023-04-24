---
id: forms
title: Formulare
permalink: docs/forms.html
prev: lists-and-keys.html
next: lifting-state-up.html
redirect_from:
  - "tips/controlled-input-null-value.html"
  - "docs/forms-zh-CN.html"
---

<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [`<input>`](https://react.dev/reference/react-dom/components/input)
> - [`<select>`](https://react.dev/reference/react-dom/components/select)
> - [`<textarea>`](https://react.dev/reference/react-dom/components/textarea)

</div>

HTML-Formularelemente funktionieren in React ein bisschen anders als DOM-Elemente, weil Formularelemente einen natürlichen internen State besitzen. Beispielsweise akzeptiert dieses HTML-Formular einen einzelnen Namen:

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Absenden" />
</form>
```

Dieses Formular hat das Standard HTML Verhalten, dass es beim Absenden den Benutzer zu einer neuen Seite weiterleitet. Wenn du dieses Verhalten in React willst, funktioniert es einfach. In den meisten Fällen ist es jedoch sinnvoll, eine JavaScript-Funktion zu benutzen, die das Absenden des Formulars übernimmt und Zugriff auf die Eingabedaten des Benutzers hat. Um dies zu erreichen, wird standardmäßig eine Technik namens "kontrollierte Komponenten" verwendet.

## Kontrollierte Komponenten {#controlled-components}

Formelemente wie `<input>`, `<textarea>` und `<select>` behalten in HTML typischerweise ihren eigenen Zustand bei und aktualisiert ihn basierend auf Benutzereingaben. In React wird der veränderbare State typischerweise in der State-Eigenschaft der Komponente gehalten und nur mit [`setState()`](/docs/react-component.html#setstate) aktualisiert.

Wir können beides kombinieren, indem wir den React-State zur alleinigen "source of truth" machen. Die React-Komponente rendert dann das Formular und steuert ebenso die nachfolgenden Benutzereingaben. Ein Eingabeformular-Element, dessen Wert auf diese Art und Weise von React kontrolliert wird, wird "kontrollierte Komponente" genannt.

Wenn wir zum Beispiel das vorherige Formular-Beispiel nehmen und den eingegebenen Namen, wenn er abgeschickt wird, loggen, dann können wir das Formular als kontrollierte Komponente schreiben:

```javascript{4,10-12,21,24}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Ein Name wurde abgeschickt: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Absenden" />
      </form>
    );
  }
}
```

[**Auf CodePen ausprobieren**](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

Da das `value`-Attribut unseres Formular-Elementes gesetzt wurde, entspricht der angezeigte Wert immer `this.state.value` und macht somit den React-State zur "source of truth". Da `handleChange` bei jedem Tastendruck ausgeführt wird, um den React-State zu aktualisieren, wird der Wert es ebenso, sobald Benutzereingaben stattfinden.

Bei einer kontrollierten Komponente wird jede Änderung durch den React-State gesteuert. Während dies bedeutet, dass du immer etwas mehr Code schreiben musst, kannst du den Wert nun auch an andere UI-Elemente übergeben oder ihn von anderen Event-Handlern zurücksetzen lassen.

## Der textarea-Tag {#the-textarea-tag}

In HTML definiert ein `<textarea>`-Element seinen Text durch seine Kinder:

```html
<textarea>
  Hallo, dies ist ein bisschen Text im textarea-Tag
</textarea>
```

In React benutzt eine `<textarea>` stattdessen das `value`-Attribut. Auf diese Weise kann ein Formular, das eine `<textarea>` benutzt, sehr ähnlich geschrieben werden wie ein Formular, das ein einziges Eingabefeld verwendet:

```javascript{4-6,12-14,26}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Bitte schreibe einen Aufsatz über dein Lieblings-DOM-Element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Ein Aufsatz wurde eingereicht: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Aufsatz:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Absenden" />
      </form>
    );
  }
}
```

Beachte, dass `this.state.value` im Konstruktor initialisiert wird, so dass das Textfeld mit etwas Text gefüllt wird.

## Der select-Tag {#the-select-tag}

In HTML erstellt `<select>` eine Dropdown-Liste. Zum Beispiel erstellt dieses HTML eine Dropdown-Liste von Geschmacksrichtungen:

```html
<select>
  <option value="grapefruit">Pampelmuse</option>
  <option value="lime">Limette</option>
  <option selected value="coconut">Kokosnuss</option>
  <option value="mango">Mango</option>
</select>
```

Beachte, dass die Option "Kokosnuss" aufgrund des `selected`-Attributs zunächst ausgewählt ist. React benutzt statt dem `selected`-Attribut, ein `value`-Attribut auf dem `select`-Tag. Dies ist in einer kontrollierten Komponente komfortabler, da du sie nur an einer Stelle bearbeiten musst. Zum Beispiel:

```javascript{4,10-12,24}
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Dein Lieblingsgeschmack ist: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Pampelmuse</option>
            <option value="lime">Limette</option>
            <option value="coconut">Kokosnuss</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Absenden" />
      </form>
    );
  }
}
```

[**Auf CodePen ausprobieren**](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

Zusammenfassend ist es so, dass `<input type="text">`, `<textarea>` und `<select>` sehr ähnlich funktionieren - alle besitzen ein `value`-Attribut, welches benutzt wird, um eine kontrollierte Komponente umzusetzen.

> Hinweis
>
> Du kannst ein Array an das `value`-Attribut übergeben um somit mehrere Optionen im `select`-Tag auszuwählen:
>
>```js
><select multiple={true} value={['B', 'C']}>
>```

## Das Datei input Element {#the-file-input-tag}

In HTML ermöglicht ein `<input type="file">` dem Benutzer, eine oder mehrere Dateien aus seinem Gerätespeicher auszuwählen, die auf einen Server hochgeladen oder mit JavaScript über die [Datei-API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) bearbeitet werden sollen.

```html
<input type="file" />
```

Da dessen Wert schreibgeschützt ist, ist dies eine **unkontrollierte** Komponente in React. Es wird später zusammen mit anderen unkontrollierten Komponenten [in der Dokumentation](/docs/uncontrolled-components.html#the-file-input-tag) behandelt.

## Umgang mit mehreren Eingabefeldern {#handling-multiple-inputs}

Wenn du mehrere kontrollierte `input`-Elemente benötigst, kannst du das `name`-Attribut zu jedem Element hinzufügen und die Handler-Funktion entscheiden lassen, was, basierend auf dem Wert von `event.target.name`, zu tun ist.

Zum Beispiel:

```javascript{15,18,28,37}
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Wird hingehen:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Anzahl der Gäste:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[**Auf CodePen ausprobieren**](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

Beachte, dass wir die ES6-Syntax für [Berechnete Eigenschaftsnamen](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) verwenden, um den State entsprechend dem gegebenem Namen zu ändern:

```js{2}
this.setState({
  [name]: value
});
```

Ist das Äquivalent zu diesem ES5-Code:

```js{2}
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

Da `setState()` automatisch [die einzelne Teile in den aktuellen State überführt](/docs/state-and-lifecycle.html#state-updates-are-merged), benötigen wir nur den Aufruf der geänderten Teile.

## Gesteuerte Null-Wert-Eingaben {#controlled-input-null-value}

Das Angeben eines `value`-Prop auf einer [kontrollierten Komponente](/docs/forms.html#controlled-components) verhindert, dass der Benutzer den Eingabewert verändern kann, es sei denn, du wünschst es. Wenn du einen Wert angegeben hast, aber das Eingabefeld noch editierbar ist, hast du möglicherweise versehentlich `value` auf `undefined` oder `null` gesetzt.

Der folgende Code demonstriert dies. (Das Eingabefeld ist zuerst gesperrt, wird aber nach einer kurzen Verzögerung editierbar.)

```javascript
ReactDOM.createRoot(mountNode).render(<input value="hi" />);

setTimeout(function() {
  ReactDOM.createRoot(mountNode).render(<input value={null} />);
}, 1000);

```

## Alternativen zu kontrollierten Komponenten {#alternatives-to-controlled-components}

Es kann manchmal mühsam sein kontrollierte Komponenten zu verwenden, da du für jede Art und Weise der Änderung deiner Daten einen Event-Handler bereitstellen und den gesamten Eingabe-State durch die React-Komponente leiten musst. Dies kann besonders ärgerlich sein, wenn du eine bestehende Codebasis zu React konvertieren möchtest oder eine Nicht-React-Bibliothek in einer React-Anwendung integrierst. In diesen Situationen solltest du vielleicht [unkontrollierte Komponenten](/docs/uncontrolled-components.html) ausprobieren, eine alternative Technik zur Implementierung von Eingabeformularen.

## Vollumfassende Lösungen {#fully-fledged-solutions}

Wenn du nach einer Komplettlösung mit Validierung, dem Im-Blick-Behalten von besuchten Feldern und der Handhabung von Formularverarbeitung suchst, ist [Formik](https://jaredpalmer.com/formik) eine der beliebtesten Entscheidungen. Es basiert jedoch auf den selben Prinzipien von kontrollierten Komponenten und der Verwaltung des States - also vernachlässige es nicht, darüber etwas zu lernen.
