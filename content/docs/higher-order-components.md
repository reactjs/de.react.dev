---
id: higher-order-components
title: Higher-Order Components
permalink: docs/higher-order-components.html
---

Ein Higher-Order-Component (HOC) ist eine moderne Technologie zur Wiederverwendung von Komponentenlogik in React. HOCs sind kein Teil der React API an sich, sondern ein Schema welches sich aus der Kompositionstechnik von React ergibt.

Konkret ist **ein Higher-Order Component eine Funktion, die eine Komponente übernimmt und eine neue Komponente zurückgibt.**

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

Während eine Komponente alle Props in UI umwandelt, wandelt die Higher-Order-Komponente eine Komponente in eine andere Komponente um.

HOCs finden sich häufig in React-Bibliotheken von Drittanbietern, als Beispiele dafür gelten [`connect`](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect) von Redux und [`createFragmentContainer`](http://facebook.github.io/relay/docs/en/fragment-container.html) von Relay.

In diesem Dokument, werden wir erörtern, warum Higher-Order-Komponenten nützlich sind und wie du deine eigene schreiben kannst.

## Nutze HOCs für übergreifende Belangen {#use-hocs-for-cross-cutting-concerns}

> **Hinweis**
>
> Früher haben wir Mixins für die Handhabung von übergreifenden Belangen empfohlen. Seither hat sich allerdings herausgestellt, dass Mixins mehr Probleme als Nutzen bereiten. [Lese darüber](/blog/2016/07/13/mixins-considered-harmful.html) warum wir uns von Mixins abgewandt haben und wie du deine existierenden Komponenten umwandeln kannst.

Komponenten sind die primäre Einheit der Quellcode-Wiederverwendbarkeit in React. Nichtsdestotrotz, wirst du feststellen, dass manche Patterns nicht immer für eine traditionelle Komponente geeignet sind.

Als Beispiel nehmen wir eine `CommentList` Komponente, die eine externe Datenequelle nutzt, um eine Liste mit Kommentaren zu rendern:

```js
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" ist irgendeine globale Datenquelle
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // "Höre" falls Änderungen auftreten sollten
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Aufräumen
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Update den Zustand der Komponente, jedes mal wenn die Datenquelle eine Änderung bekanntgibt
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
```

Später, erstellst du eine Komponente die auf Änderungen in einem Blog-Eintrag "hört" und ein ähnliches Pattern einsetzt:

```js
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
```

`CommentList` und `BlogPost` sind nicht identisch - sie rufen unterschiedliche Methoden von `DataSource` auf und sie rendern unterschiedlichen Output. Jedoch ist die Mehrheit der Implementierung gleich:

- Wenn die Komponente gemountet ist, füge einen Listener für Änderungen in `DataSource` hinzu.
- Innerhalb des Listeners, rufe `setState` auf, sobald sich die Datenquelle ändert.
- Wenn die Komponente unmountet wird, entferne den Listener.

Du kannst dir nun vorstellen, dass in einer großen Applikation, dieses Pattern sehr oft vorkommen wird. Wir wollen eine Abstraktion, die uns erlaubt diese Logik an einem Platz zu definieren und diese dann Komponentenübergreifend zu nutzen. Dies ist der Fall, wo sich die Higher-Order Komponenten auszeichnen.

Wir können eine Funktion schreiben, die Komponenten erstellt, sowie `CommentList` und `BlogPost`, die `DataSource` als Datenquelle nutzt. Die Funktion akzeptiert als einer der Argumente eine Kind-Komponente, die Daten aus der Datenquelle als Eigenschaft erhält. Lass uns die Funktion `withSubscription` nennen:

```js
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```

Der erste Parameter ist die umschlossene Komponente. Der zweite Parameter erhält die Daten, an denen wir interessiert sind, dies wird durch `DataSource` und aktuelle Props sichergestellt.

Wenn `CommentListWithSubscription` und `BlogPostWithSubscription` gerendert werden, wird eine `data` Eigenschaft an `CommentList` und `BlogPost` übermittelt, diese enthält die aktuellsten Daten, die von `DataSource` erhalten wurden.

```js
// Diese Funktion nimmt eine Komponente...
function withSubscription(WrappedComponent, selectData) {
  // ...und gibt eine andere Komponente zurück...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... Das stellt sicher, dass Datenänderungen bearbeitet werden...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... rendern der umschlossenen Komponente mit aktuellsten Daten!
      // Beachte, dass wir jegliche zusätzliche Props weiterleiten
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

Beachte, dass eine HOC die übergebene Komponente nicht modifiziert, des Weiteren findet auch keine Vererbung statt um dessen Verhalten zu kopieren. Stattdessen *setzt* eine HOC die ursprüngliche Komponente zusammen, in dem sie diese mit einer Container-Komponente *umschließt*. Eine HOC ist eine reine Funktion ohne Nebenwirkungen.

Das ist alles! Die umschlossene Komponente erhält alle Eigenschaften des Containers, zusammen mit einer neuen Eigenschaft, `data`, die für das Rendern des Outputs verwendet wird. Die HOC ist nicht dafür zuständig, das Wie oder Warum bei der Datenverwendung zu beantworten, ebenso wie die umschlossene Komponente nicht über die Herkunft der Daten zuständig ist.

Da `withSubscription` eine normale Funktion ist, kannst du beliebig viele, oder beliebig wenige Argumente übergeben. Zum Beispiel, du möchtest den Namen der `data` Eigenschaft konfigurierbar machen, um die HOC mehr von der umschlossenen Komponente zu isolieren. Oder du könntest ein Argument hinzufügen, welches `shouldComponentUpdate` konfiguriert, oder eines welches die Datenquelle konfiguriert. All das ist möglich, weil die HOC die volle Kontroll darübere hat, wie eine Komponente definiert wird.

Wie bei den Komponenten, ist die Abhängigkeit zwischen `withSubscription` und der umschlossenen Komponente rein Eigenschaftenbasiert. Dies ermöglicht einen einfachen Austausch einer bestehenden HOC durch eine andere, so lange diese die gleichen Eigenschaften an die umschlossene Komponente bereitstellen. Dies kann nützlich sein, wenn du zum Beispiel die Bibliothek für das Abrufen von Daten änderst.

## Verändere nicht die usprüngliche Komponente. Verwende Komposition. {#dont-mutate-the-original-component-use-composition}

Widerstehe der Versuchung den Prototype einer Komponente innerhalb einer HOC zu modifizieren (oder anderweitig zu verändern).

```js
function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
    console.log('Aktuelle Eigenschaften: ', this.props);
    console.log('Neue Eigenschaften: ', nextProps);
  };
  // Die Tatsache, dass wir die originale Eingang-Komponente zurückgeben, ist ein Hinweis
  // dass diese verändert wurde.
  return InputComponent;
}

// EnhancedComponent wird bei jedem Erhalt der Eigenschaften in die Konsole loggen
const EnhancedComponent = logProps(InputComponent);
```

Es gibt einige Probleme hier. Zum einen kann die Eingang-Komponente nicht abseits der erweiterten Komponente wiederverwendet werden. Des Weiteren, wenn du eine andere HOC auf die `EnhancedComponent` anwendest die *ebenso* `componentWillReceiveProps` verändert, wird die erste Funktionalität der HOC überschrieben! Diese HOC kann auch nicht auf funktionale Komponenten angewandt werden, da diese keine Lifecycle-Methoden besitzen.

Verändernde HOCs sind eine schlecht isolierte Abstraktion - der Anwender muss über die Implementierungsdetails bescheidwissen, um Konflikte mit anderen HOCs zu vermeiden.

Statt der Veränderung, sollte der Grundsatz der Komposition bei HOCs angewandt werden, in dem die Eingang-Komponente mit einer Container-Komponente umgeben wird:

```js
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Aktuelle Eigenschaften: ', this.props);
      console.log('Neue Eigenschaften: ', nextProps);
    }
    render() {
      // Umschließt die Eingang-Kompnente in ein Container, ohne diese zu verändern. Gut so!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

Diese HOC hat die gleiche Funktionalität wie die verändernde Version, jedoch ohne der potenziellen Gefahr für Konflikte. Es funktioniert gleich gut mit klassenbasierten und funktionalen Komponenten. Und da es eine reine Funktion ist, kann sie mit anderen HOCs, oder sogar mit sich selbst zusammengesetzt werden.

Vielleicht sind dir die Gemeinsamkeiten zwischen HOCs und dem **Container Komponenten** Pattern aufgefallen. Container Komponenten sind ein Teil der Strategie, in der eine Trennung der Zuständigkeiten zwischen übergreifenden und untergeordneten Anliegen vorgenommen wird. Container verwalten Dinge wie Abonnements und Zustand, des Weiteren geben die Eigenschaften an Komponenten weiter, die für das Rendering der UI zuständig sind. HOCs verwenden Container als Teil der Implementierung. Du kannst HOCs mit einer parametrisierten Container-Komponenten Definition vergleichen.

## Konvention: Übergeben von unzusammenhängenden Eigenschaften durch die umgschlossene Komponente {#convention-pass-unrelated-props-through-to-the-wrapped-component}

HOCs fügt Features zu einer Komponente hinzu. Diese sollten keine drastische Veränderungen an dessen Abhängigkeit vornehmen. Es wird erwartet, dass die von der HOC zurückgegebene Komponente ein ähnliches Interface besitzt, wie die umschlossene Komponente.

HOCs sollten Eigenschaften durchleiten, die keine Bedeutung für dessen Zweck besitzen. Die meisten HOCs besitzen eine Render-Methode die folgend aussieht:

```js
render() {
  // Filtere die extra Eigenschaften raus, die spezifisch für diese HOC sind
  // und nicht weitergeleitet werden sollen
  const { extraProp, ...passThroughProps } = this.props;

  // Injiziere Eigeschaften in die umschlossene Komponente. In den meisten Fällen
  // sind es Zustandswerte oder Instanzenmethoden
  const injectedProp = someStateOrInstanceMethod;

  // Übergebe die Eigenschaften an die umschlossene Komponente
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```

Diese Konvention hilft sicherzustellen, dass HOCs flexibel und wiederverwendbar sind.

## Konvention: Maximierung der Zusammensetzbarkeit {#convention-maximizing-composability}

Nicht alle HOCs sehen gleich aus. Manchmal nehmen diese nur ein einziges Argument an, die umschlossene Komponente:

```js
const NavbarWithRouter = withRouter(Navbar);
```

Normalerweise, akzeptieren HOCs zusätzliche Argumente. In diesem Beispiel von Relay, wird ein Konfigurationsobjekt verwendet um die Datenabhängigkeiten einer Komponente zu definieren:

```js
const CommentWithRelay = Relay.createContainer(Comment, config);
```

Die häufigste Signatur für HOCs sieht wie folgt aus:

```js
// React Redux's `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```

*Was?!* Wenn man es auseinanderbricht, ist es ersichtlicher was hier passiert.

```js
// connect ist eine Funktion die eine andere Funktion zurückgibt
const enhance = connect(commentListSelector, commentListActions);
// Die zurückgegebene Funktion ist eine HOC, die eine Komponente zurückgibt die
// mit dem Redux Store verbunden ist
const ConnectedComment = enhance(CommentList);
```
In anderen Worten, `connect` ist eine Higher-Order Funktion die eine Higher-Order Komponente zurückgibt!

Diese Form kann verwirrend oder unnötig erscheinen, es hat jedoch eine nützliche Eigenschaft. HOCs mit einzigem Argument, wie die, die von der `connect` Funktion zurückgegeben werden besitzen die Signatur `Component => Component`. Funktionen dessen Ausgabetyp dem Eingabetyp gleicht, können sehr einfach zusammengesetzt werden.

```js
// Anstatt folgendes zu machen...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// ... kannst du ein Utility zur Zusammensetzung der Funktion nutzen
// compose(f, g, h) ist gleichzusetzen mit (...args) => f(g(h(...args)))
const enhance = compose(
  // Dies sind HOCs mit einem einzelnen Argument
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```

(Diese Eigenschaft ermöglicht die Verwendung von `connect` und anderen Enhancer-basierten HOCs als Dekoratoren, welche ein experimentelles JavaScript Entwurf darstellen.)

Die `componse` Utility-Funktion wird von vielen Drittanbieter-Bibliotheken wie lodash (als [`lodash.flowRight`](https://lodash.com/docs/#flowRight)), [Redux](https://redux.js.org/api/compose) und [Ramda](https://ramdajs.com/docs/#compose) angeboten.

## Konvention: Umschließe den Anzeigenamen für ein einfaches Debugging {#convention-wrap-the-display-name-for-easy-debugging}

Die Container Komponenten di von HOCs erstellt werden, erscheinen in den [React Developer Tools](https://github.com/facebook/react-devtools) wie jede andere Komponente. Um das Debugging zu erleichtern, wähle einen Anzeigenamen aus, der mitteilt, dass es ein Ergebnis einer HOC ist.

Das Umschließen des Anzeigenamens der umzuschließenden Komponente ist ein gebräuchlicher Ansatz. Wenn deine Higher-Order Komponente `withSubscription` heißt und der Name der umschlossenen Komponente ist `CommentList`, nutze `WithSubscription(CommentList)` als Anzeigenamen:

```js
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```


## Vorbehalte {#caveats}

Higher-Order Komponenten kommen mit einigen Vorbehalten, die nicht sofort ersichtlich sind wenn du dich erst mit React vertraut machst.

### Vermeide die Nutzung von HOCs innerhalb der Render-Methode {#dont-use-hocs-inside-the-render-method}

Der Differenzierungsalgorithmus von React (auch Abgleich genannt) nutzt die Identität der Komponente, um zu bestimmen, ob der existierende Teilbaum aktualisiert, oder weggeworfen werden soll und ob das Mounten eines neuen Teilbaums notwendig ist. Wenn die von der `render` Methode zurückgegebene Komponente identisch (`===`) zu der vorher zurückgegebenen Komponente ist, wird der Teilbaum rekursiv von React upgedated, in dem eine Differenzierung des alten Teilbaums mit dem neuen Teilbaum stattfindet. Wenn die beiden ungleich sind, wird der vorherige Teilbaum zur Gänze unmounted.

Normalerweise, solltest du keine Gedanken darüber verlieren. Jedoch spielt dies eine wesentliche Rolle für HOCs, da dies bedeutet, dass du eine HOC auf eine Komponente innerhalb der Render-Methode einer Komponente nicht anwenden kannst:

```js
render() {
  // Eine neue Version von EnhancedComponent wird bei jedem Render-Vorgang erstellt
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // Dies bewirkt dass jedesmal ein Unmounten/Remounten des ganzen Teilbaus stattfindet
  return <EnhancedComponent />;
}
```

Das Problem hier ist nicht nur die Performance - das Remounten einer Komponente führt zum Verlust des Zustandes sowohl bei der Komponente selbst, als auch bei all ihren Kind-Komponenten.

Stattdessen, solltest du die HOCs außerhalb der Definition einer Komponente anwenden, um sicherzustellen, dass die Komponente nur ein einziges Mal erstellt wird. Nur dann ist dessen Identität konsistent und übergreifend zwischen den einzelnen Rendervorgängen sichergestellt. Normalerweise ist dies sowieso das, was du willst.

In den seltenen Fällen wo du eine HOC dynamisch anwenden möchtest, kannst du dies innerhalb der Lifecycle-Methoden einer Komponente oder im Konstruktor machen.

### Statische Methoden müssen kopiert werden {#static-methods-must-be-copied-over}

Manchmal ist es nützlich eine statische Methode in einer React Komponente zu definieren. Zum Beispiel, Relay Kontainer stellen eine statische Methode `getFragment` zur Verfügung, um die Zusammensetzung der GraphQL Fragmente zu erleichtern.

Wenn du jedoch eine HOC auf eine Komponente anwendest, wird die ursprüngliche Komponente mit einer Container-Komponente umgeben. Dies bedeutet, dass die neue Komponente keine der statischen Methoden der usprünglichen Komponente besitzt.

```js
// Definiere eine statische Methode
WrappedComponent.staticMethod = function() {/*...*/}
// Nun wende eine HOC an
const EnhancedComponent = enhance(WrappedComponent);

// Die erweiterte Komponente hat keine statische Methode
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

Um dies zu lösen, kannst du die Methoden in den Container kopieren, bevor du diesen zurückgibst

```js
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Du musst genau wissen, welche Methode(n) du kopieren möchtest :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```

Dennoch, dies erfordert dass du genau weißt welche Methoden kopiert werden müssen. Du kannst [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) nutzen, um automatisch alle statische Methoden die nicht zu React gehören zu kopieren:

```js
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

Eine andere mögliche Lösung wäre das Exportieren der statischen Methode unabhängig von der Komponente.

```js
// Statt...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...exportiere die Methode separat...
export { someFunction };

// ...importiere beide in die gewünschte Komponente
import MyComponent, { someFunction } from './MyComponent.js';
```

### Refs werden nicht weitergeleitet {#refs-arent-passed-through}

Obwohl die Konvention für Higher-Order Komponente besagt, dass alle Eigenschaften an die umschlossene Komponente weiteregeleitet werden sollen, funktioniert dieser Ansatz für Refs nicht. Das kommt daher, weil `ref` nicht wirklich eine Eigenschaft ist - wie `key`, wird es besonders von React behandelt. Wenn du eine Ref zu einem Element hinzufügen möchtest, welches das Ergebnis einer HOC ist, wird das Ref auf die Instanz der äußersten Container-Komponente zeigen und nicht auf die umschlossene Komponente.

Die Lösung für dieses Problem ist die Verwendung von `React.forwardRef` API (eingeführt mit React 16.3). [Learn more about it in the forwarding refs section](/docs/forwarding-refs.html).
