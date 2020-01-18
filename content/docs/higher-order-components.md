---
id: higher-order-components
title: Higher-Order-Komponenten
permalink: docs/higher-order-components.html
---

Eine Higher-Order-Komponente (HOC) ist eine fortgeschrittene Vorgehensweise für Wiederverwendung der Komponentenlogik in React. HOCs sind kein Teil der React API an sich. Sie sind ein Pattern welches sich aus der Kompositionseigenschaft von React ergibt.

Konkret, **eine Higher-Order-Komponente ist eine Funktion, die eine Komponente übernimmt und eine neue Komponente zurückgibt.**

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

Während eine Komponente alle Props in UI umwandelt, wandelt die Higher-Order-Komponente eine Komponente in eine andere Komponente um.

HOCs sind häufig in React-Bibliotheken von Drittanbietern anzutrefen, als Beispiele dafür könnten [`connect`](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect) von Redux und das [`createFragmentContainer`](http://facebook.github.io/relay/docs/en/fragment-container.html) von Relay herangeführt werden.

In diesem Dokument, werden wir erörtern, warum Higher-Order-Komponenten nützlich sind und wie du deine eigene schreiben kannst.

## Nutze HOCs für übergreifende Belangen {#use-hocs-for-cross-cutting-concerns}

> **Hinweis**
>
> Früher haben wir Mixins für die Handhabung von übergreifenden Belangen empfohlen. Seit dem haben wir begriffen, dass Mixins mehr Probleme als Nutzen bereiten. [Lese darüber](/blog/2016/07/13/mixins-considered-harmful.html) warum wir uns von Mixins abgewand haben und wie du deine existierende Komponenten umwandeln kannst.

Komponenten sind die primäre Einheit der Quellcode-Wiederverwendbarkeit in React. Nichtsdestotrotz, wirst du feststellen, dass manche Patterns nicht immer für eine traditionelle Komponente geeignet sind.

Als Beispiel nehmen wir eine `CommentList` Komponente, die eine externe Datenequelle nutzt, um eine Liste mit Kommentaren zu rendern:

```js
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" ist irgendeine globale Datenquellee
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

## Convention: Pass Unrelated Props Through to the Wrapped Component {#convention-pass-unrelated-props-through-to-the-wrapped-component}

HOCs add features to a component. They shouldn't drastically alter its contract. It's expected that the component returned from a HOC has a similar interface to the wrapped component.

HOCs should pass through props that are unrelated to its specific concern. Most HOCs contain a render method that looks something like this:

```js
render() {
  // Filter out extra props that are specific to this HOC and shouldn't be
  // passed through
  const { extraProp, ...passThroughProps } = this.props;

  // Inject props into the wrapped component. These are usually state values or
  // instance methods.
  const injectedProp = someStateOrInstanceMethod;

  // Pass props to wrapped component
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```

This convention helps ensure that HOCs are as flexible and reusable as possible.

## Convention: Maximizing Composability {#convention-maximizing-composability}

Not all HOCs look the same. Sometimes they accept only a single argument, the wrapped component:

```js
const NavbarWithRouter = withRouter(Navbar);
```

Usually, HOCs accept additional arguments. In this example from Relay, a config object is used to specify a component's data dependencies:

```js
const CommentWithRelay = Relay.createContainer(Comment, config);
```

The most common signature for HOCs looks like this:

```js
// React Redux's `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```

*What?!* If you break it apart, it's easier to see what's going on.

```js
// connect is a function that returns another function
const enhance = connect(commentListSelector, commentListActions);
// The returned function is a HOC, which returns a component that is connected
// to the Redux store
const ConnectedComment = enhance(CommentList);
```
In other words, `connect` is a higher-order function that returns a higher-order component!

This form may seem confusing or unnecessary, but it has a useful property. Single-argument HOCs like the one returned by the `connect` function have the signature `Component => Component`. Functions whose output type is the same as its input type are really easy to compose together.

```js
// Instead of doing this...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// ... you can use a function composition utility
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
const enhance = compose(
  // These are both single-argument HOCs
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```

(This same property also allows `connect` and other enhancer-style HOCs to be used as decorators, an experimental JavaScript proposal.)

The `compose` utility function is provided by many third-party libraries including lodash (as [`lodash.flowRight`](https://lodash.com/docs/#flowRight)), [Redux](https://redux.js.org/api/compose), and [Ramda](https://ramdajs.com/docs/#compose).

## Convention: Wrap the Display Name for Easy Debugging {#convention-wrap-the-display-name-for-easy-debugging}

The container components created by HOCs show up in the [React Developer Tools](https://github.com/facebook/react-devtools) like any other component. To ease debugging, choose a display name that communicates that it's the result of a HOC.

The most common technique is to wrap the display name of the wrapped component. So if your higher-order component is named `withSubscription`, and the wrapped component's display name is `CommentList`, use the display name `WithSubscription(CommentList)`:

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


## Caveats {#caveats}

Higher-order components come with a few caveats that aren't immediately obvious if you're new to React.

### Don't Use HOCs Inside the render Method {#dont-use-hocs-inside-the-render-method}

React's diffing algorithm (called reconciliation) uses component identity to determine whether it should update the existing subtree or throw it away and mount a new one. If the component returned from `render` is identical (`===`) to the component from the previous render, React recursively updates the subtree by diffing it with the new one. If they're not equal, the previous subtree is unmounted completely.

Normally, you shouldn't need to think about this. But it matters for HOCs because it means you can't apply a HOC to a component within the render method of a component:

```js
render() {
  // A new version of EnhancedComponent is created on every render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // That causes the entire subtree to unmount/remount each time!
  return <EnhancedComponent />;
}
```

The problem here isn't just about performance — remounting a component causes the state of that component and all of its children to be lost.

Instead, apply HOCs outside the component definition so that the resulting component is created only once. Then, its identity will be consistent across renders. This is usually what you want, anyway.

In those rare cases where you need to apply a HOC dynamically, you can also do it inside a component's lifecycle methods or its constructor.

### Static Methods Must Be Copied Over {#static-methods-must-be-copied-over}

Sometimes it's useful to define a static method on a React component. For example, Relay containers expose a static method `getFragment` to facilitate the composition of GraphQL fragments.

When you apply a HOC to a component, though, the original component is wrapped with a container component. That means the new component does not have any of the static methods of the original component.

```js
// Define a static method
WrappedComponent.staticMethod = function() {/*...*/}
// Now apply a HOC
const EnhancedComponent = enhance(WrappedComponent);

// The enhanced component has no static method
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

To solve this, you could copy the methods onto the container before returning it:

```js
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Must know exactly which method(s) to copy :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```

However, this requires you to know exactly which methods need to be copied. You can use [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) to automatically copy all non-React static methods:

```js
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

Another possible solution is to export the static method separately from the component itself.

```js
// Instead of...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...export the method separately...
export { someFunction };

// ...and in the consuming module, import both
import MyComponent, { someFunction } from './MyComponent.js';
```

### Refs Aren't Passed Through {#refs-arent-passed-through}

While the convention for higher-order components is to pass through all props to the wrapped component, this does not work for refs. That's because `ref` is not really a prop — like `key`, it's handled specially by React. If you add a ref to an element whose component is the result of a HOC, the ref refers to an instance of the outermost container component, not the wrapped component.

The solution for this problem is to use the `React.forwardRef` API (introduced with React 16.3). [Learn more about it in the forwarding refs section](/docs/forwarding-refs.html).
