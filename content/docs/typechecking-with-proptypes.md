---
id: typechecking-with-proptypes
title: Typisierung mit PropTypes
permalink: docs/typechecking-with-proptypes.html
redirect_from:
  - "docs/react-api.html#typechecking-with-proptypes"
---

> Note:
>
> `React.PropTypes` ist umgezogen in ein anderes Paket seit React v15.5. Bitte benutze stattdessen [die `prop-types`-Bibliothek](https://www.npmjs.com/package/prop-types).
>
>Wir stellen [ein Codemod-Skript](/blog/2017/04/07/react-v15.5.0.html#migrating-from-reactproptypes) zur Verfügung, um die Konvertierung zu automatisieren.

Wenn deine App wächst, kannst du viele Bugs mit einer Typisierung abfangen. Für einige Anwendungen lassen sich JavaScript-Erweiterungen wie [Flow](https://flow.org/) oder [TypeScript](https://www.typescriptlang.org/) verwenden, um die gesamte Anwendung zu überprüfen. Aber selbst wenn du diese nicht verwendest, hat React einige eingebaute Fähigkeiten zur Typisierung. Um die Typisierung an den Props für eine Komponente durchzuführen, kannst du die spezielle Eigenschaft `propTypes` zuweisen:

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

`PropTypes` exportiert eine Reihe von Prüfern, die verwendet werden können, um sicherzustellen, dass die Daten, die du erhältst, gültig sind. In diesem Beispiel verwenden wir `PropTypes.string`. Wenn ein ungültiger Wert für einen Prop angegeben wird, wird eine Warnung in der JavaScript-Konsole angezeigt. Aus Performance-Gründen wird `propTypes` nur im Entwicklungsmodus geprüft.

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
  
  // Du kannst auch deklarieren, dass ein Prop eine Instanz einer Klasse ist. 
  // Dies verwendet JS's instanceOf-Operator.
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

  // Ein Array, eines bestimmten Typs 
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Ein Objekt mit Eigenschaftswerten eines bestimmten Typs.
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // Ein Objekt, das eine bestimmte Form annimmt.
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  
  // Ein Objekt mit Warnungen zu zusätzlichen Eigenschaften.
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // Alle der oben genannten Möglichkeiten lassen sich mit `isRequired` 
  // verketten, um sicherzustellen, dass eine Warnung ausgegeben wird, 
  // wenn die Prop nicht vorhanden ist.
  requiredFunc: PropTypes.func.isRequired,

  // Ein Wert eines beliebigen Datentyps
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

### Einzelnes Kind (Child) Anfordern {#requiring-single-child}

Mit `PropTypes.element` kannst du festlegen, dass nur ein einzelnes Kind (Child) an eine Komponente als Children übergeben werden kann.

```javascript
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // This must be exactly one element or it will warn.
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

### Default Prop Values {#default-prop-values}

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

// Renders "Hallo, Fremder":
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

Die `defaultProps` werden verwendet, um sicherzustellen, dass `this.props.name` einen Wert hat, wenn er nicht von der übergeordneten Komponente angegeben wurde. Die Typüberprüfung von `propTypes` erfolgt, nachdem `defaultProps` aufgelöst wurde, so dass die Typüberprüfung auch für die `defaultProps` gilt.
