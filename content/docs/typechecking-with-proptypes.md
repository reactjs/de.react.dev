---
id: typechecking-with-proptypes
title: Typisierung mit PropTypes
permalink: docs/typechecking-with-proptypes.html
redirect_from:
  - "docs/react-api.html#typechecking-with-proptypes"
---

> Hinweis:
>
> `React.PropTypes` ist seit React v15.5 in ein anderes Paket umgezogen. Bitte benutze stattdessen [die `prop-types`-Bibliothek](https://www.npmjs.com/package/prop-types).
>
>Wir stellen [ein Codemod-Skript](/blog/2017/04/07/react-v15.5.0.html#migrating-from-reactproptypes) zur Verfügung, um die Konvertierung zu automatisieren.

Wenn deine Anwendung wächst, kannst du viele Bugs mit einer Typprüfung abfangen. Für einige Anwendungen lassen sich JavaScript-Erweiterungen wie [Flow](https://flow.org/) oder [TypeScript](https://www.typescriptlang.org/) verwenden, um die gesamte Anwendung zu überprüfen. Aber selbst wenn du diese nicht verwendest, hat React einige eingebaute Fähigkeiten zur Überprüfung von Typen. Um die Typprüfung an den Props für eine Komponente durchzuführen, kannst du die spezielle Eigenschaft `propTypes` zuweisen:

```javascript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hallo, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

In diesem Beispiel verwenden wir eine Klassenkomponente, aber die gleiche Funktionalität könnte auch auf Funktionskomponenten angewendet werden, oder auf Komponenten, die durch [`React.memo`](/docs/react-api.html#reactmemo) oder [`React.forwardRef`](/docs/react-api.html#reactforwardref) erstellt wurden.

`PropTypes` exportiert eine Reihe von Prüfern, die verwendet werden können, um sicherzustellen, dass die Daten die du erhältst gültig sind. In diesem Beispiel verwenden wir `PropTypes.string`. Wenn ein ungültiger Wert für ein Prop angegeben wird, wird eine Warnung in der JavaScript-Konsole angezeigt. Aus Performance-Gründen wird `propTypes` nur im Entwicklungsmodus geprüft.

### PropTypes {#proptypes}

Hier ist ein Beispiel, das die verschiedenen verfügbaren Validatoren dokumentiert:

```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // Du kannst eine Prop als einen bestimmten JS-Typ deklarieren.
  // Standardmäßig sind alle diese Optionen optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Alles, was gerendert werden kann: Zahlen, Zeichenketten, Elemente 
  // oder ein Array (oder Fragment), das diese Typen enthält.
  optionalNode: PropTypes.node,

  // Ein React-Element.
  optionalElement: PropTypes.element,

  // Ein React-Element-Typ (z.B. MyComponent).
  optionalElementType: PropTypes.elementType,
<<<<<<< HEAD
  
  // Du kannst auch deklarieren, dass eine Prop eine Instanz einer Klasse ist. 
  // Dies verwendet JS's instanceOf-Operator.
=======

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
>>>>>>> 5e437a10ed4e89cd5eaf990ce4f43e0857592b53
  optionalMessage: PropTypes.instanceOf(Message),

  // Du kannst sicherstellen, dass deine Prop auf bestimmte Werte beschränkt 
  // ist, indem du sie als Enum behandelst.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // Ein Objekt, das eines von vielen Typen sein könnte.
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // Ein Array eines bestimmten Typs.
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Ein Objekt mit Eigenschaftswerten eines bestimmten Typs.
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // Ein Objekt, das eine bestimmte Form annimmt.
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
<<<<<<< HEAD
  
  // Ein Objekt mit Warnungen zu zusätzlichen Eigenschaften.
=======

  // An object with warnings on extra properties
>>>>>>> 5e437a10ed4e89cd5eaf990ce4f43e0857592b53
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // Alle der oben genannten Möglichkeiten lassen sich mit `isRequired` 
  // verketten, um sicherzustellen, dass eine Warnung ausgegeben wird, 
  // wenn die Prop nicht vorhanden ist.
  requiredFunc: PropTypes.func.isRequired,

  // Ein erforderlicher Wert eines beliebigen Datentyps.
  requiredAny: PropTypes.any.isRequired,

  // Du kannst auch einen benutzerdefinierten Validierer angeben. 
  // Es sollte ein Error-Objekt zurückgeben, wenn die Validierung fehlschlägt.
  // Verzichte auf `console.warn` oder throw, da dies in `oneOfType` nicht funktioniert.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // Du kannst auch einen benutzerdefinierten Validierer für `arrayOf` 
  // und `objectOf` liefern. Es sollte ein Error-Objekt zurückgeben, wenn die 
  // Validierung fehlschlägt. Der Validator wird für jeden Schlüssel im Array 
  // oder Objekt aufgerufen. Die ersten beiden Argumente des Prüfers sind das 
  // Array oder Objekt selbst und der Schlüssel des aktuellen Elements.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

### Einzelnes Kind (Child) anfordern {#requiring-single-child}

Mit `PropTypes.element` kannst du festlegen, dass nur ein einzelnes Kind (Child) an eine Komponente als Children übergeben werden kann.

```javascript
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // Dies muss genau ein Element sein, sonst erscheint eine Warnung.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```

### Standard Prop Werte {#default-prop-values}

Du kannst Standardwerte für deine `Props` definieren, indem du sie der speziellen Eigenschaft `defaultProps` zuweist:

```javascript
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hallo, {this.props.name}</h1>
    );
  }
}

// Gibt die Standardwerte für Props an:
Greeting.defaultProps = {
  name: 'Fremder'
};

// Rendert "Hallo, Fremder":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

Wenn du eine Babel-Transformation wie [transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/) verwendest, kannst du auch `defaultProps` als statische Eigenschaft innerhalb einer React-Komponentenklasse deklarieren. Diese Syntax ist jedoch noch nicht finalisiert und erfordert einen Kompilierungsschritt, um in einem Browser zu funktionieren. Weitere Informationen findest du in der [Vorschau der Klassenfelder](https://github.com/tc39/proposal-class-fields).


```javascript
class Greeting extends React.Component {
  static defaultProps = {
    name: 'Fremder'
  }

  render() {
    return (
      <div>Hallo, {this.props.name}</div>
    )
  }
}
```

<<<<<<< HEAD
Die `defaultProps` werden verwendet, um sicherzustellen, dass `this.props.name` einen Wert hat, wenn er nicht von der übergeordneten Komponente angegeben wurde. Die Typüberprüfung von `propTypes` erfolgt nachdem `defaultProps` aufgelöst wurde, so dass die Typüberprüfung auch für die `defaultProps` gilt.
=======
The `defaultProps` will be used to ensure that `this.props.name` will have a value if it was not specified by the parent component. The `propTypes` typechecking happens after `defaultProps` are resolved, so typechecking will also apply to the `defaultProps`.

### Function Components

If you are using function components in your regular development, you may want to make some small changes to allow PropTypes to be proper applied.

Let's say you have a component like this:

```javascript
export default function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}
```

To add PropTypes, you may want to declare the component in a separate function before exporting, like this:

```javascript
function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}

export default HelloWorldComponent
```

Then, you can add PropTypes directly to the `HelloWorldComponent`:

```javascript
import PropTypes from 'prop-types'

function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string
}

export default HelloWorldComponent
```
>>>>>>> 5e437a10ed4e89cd5eaf990ce4f43e0857592b53
