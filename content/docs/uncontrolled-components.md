---
id: uncontrolled-components
title: Unkontrollierte Komponenten
permalink: docs/uncontrolled-components.html
---

<<<<<<< HEAD
In den meisten Fällen empfehlen wir die Verwendung von [kontrollierten Komponenten](/docs/forms.html#controlled-components) zur Implementierung von Formularen. In einer kontrollierten Komponente werden Formulardaten von einer React Komponente verarbeitet. Die Alternative sind unkontrollierte Komponenten, bei denen die Formulardaten vom DOM selbst verarbeitet werden.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [`<input>`](https://beta.reactjs.org/reference/react-dom/components/input)
> - [`<select>`](https://beta.reactjs.org/reference/react-dom/components/select)
> - [`<textarea>`](https://beta.reactjs.org/reference/react-dom/components/textarea)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

In most cases, we recommend using [controlled components](/docs/forms.html#controlled-components) to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

Um eine unkontrollierte Komponente zu erstellen, kannst du anstelle eines Event-Handlers für jede Aktualisierung des States [ein ref](/docs/refs-and-the-dom.html) verwenden, um Formularwerte aus dem DOM abzurufen.

Dieser Codeschnipsel akzeptiert beispielsweise einen einzelnen Namen in einer unkontrollierten Komponente:

```javascript{5,9,18}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('Ein Name wurde übermittelt: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**Auf CodePen ausprobieren**](https://codepen.io/gaearon/pen/WooRWa?editors=0010)

Mit unkontrollierten Komponenten ist es manchmal einfacher, React und nicht-React Code zu integrieren, da die Quelle der Wahrheit in einer unkontrollierten Komponente das DOM ist. Es kann auch etwas weniger Code sein, wenn du eine schnelle Lösung haben möchtest. Ansonsten solltest du in der Regel kontrollierte Komponenten verwenden.

Wenn es immer noch nicht klar ist, welche Art von Komponente du für eine bestimmte Situation verwenden solltest, findest du möglicherweise [diesen Artikel über kontrollierte gegen unkontrollierte Komponente](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/) hilfreich.

### Standardwerte {#default-values}

Im React-Rendering-Lifecycle überschreibt das `value` Attribut für Formularelemente den Wert im DOM. Bei einer unkontrollierten Komponente möchte man häufig, dass React den Anfangswert angibt, wobei nachfolgende Aktualisierungen nicht kontrolliert werden. Um diesen Fall zu behandeln, kannst du anstelle von `value` ein `defaultValue`-Attribut angeben.

```javascript{7}
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

Ebenso unterstützen `<input type="checkbox">` und `<input type="radio">` `defaultChecked`, und `<select>` und `<textarea>` unterstützen `defaultValue`.

## Das Datei input Element {#the-file-input-tag}

In HTML kann der Benutzer mit `<input type="file">` eine oder mehrere Dateien aus dem Gerätespeicher auswählen, die auf einen Server hochgeladen oder von JavaScript über die [File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications) bearbeitet werden können.

```html
<input type="file" />
```

In React ist `<input type="file" />` immer eine unkontrollierte Komponente, da ihr Wert nur von einem Benutzer und nicht programmatisch festgelegt werden kann.

Du solltest die File API verwenden, um mit den Dateien zu interagieren. Das folgende Beispiel zeigt, wie du einen [ref auf dem DOM-Knoten](/docs/refs-and-the-dom.html) erstellst, um auf Dateien in einem Submit-Handler zuzugreifen:

`embed:uncontrolled-components/input-type-file.js`

[](codepen://uncontrolled-components/input-type-file)

