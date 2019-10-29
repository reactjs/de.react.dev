---
id: render-props
title: Render Props
permalink: docs/render-props.html
---

Der Begriff ["render prop"](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) bezieht sich bezieht sich auf eine Technik um Code zwischen React Komponenten auszutauschen. Hierzu nutzt man ein "prop" dessen Wert eine Funktion ist.

Eine Komponente mit einem "render prop" nimmt eine Funktion, welches ein React Element wiedergibt und ruft es auf, anstatt es selbstständig zu rendern.

```jsx
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```

Bibliotheken, welche "render props" benutzen sind: [React Router](https://reacttraining.com/react-router/web/api/Route/render-func), [Downshift](https://github.com/paypal/downshift) und [Formik](https://github.com/jaredpalmer/formik).

In dieser Dokumentation wird besprochen wozu "render props" genutzt werden und wie Sie diese selbst nutzen können.

## Nutze Render Props für Cross-Cutting Concerns {#use-render-props-for-cross-cutting-concerns}

Komponenten sind die primäre Einheit der Wiederverwendung von Code, aber es ist nicht immer direkt ersichtlich wie man den Status, bzw. die Verhaltensweise einer bestimmten Komponente mit einer anderen Koponente teilt, welche die gleichen Eigenschaften benötigt.
Im folgenden Beispiel, wird die Mausbewegung von einer Webapp überwacht:

```js
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        <h1>Bewege die Maus!</h1>
        <p>Momentane Mausposition ist: ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}
```

Während der Mauszeiger sich über dem Bildschirm bewegt, zeigt die Komponente seine (x, y) Koordinaten in einem `<p>`.

Nun stellt sich eine Frage: Wie kann man dieses Verhalten auf eine andere Komponente übertragen? In anderen Worten: wenn eine andere Komponente die Position des Cursors kennen muss, kann das Verhalten so zusammenfasst werden, dass wir es mit der Komponente teilen können?

Da Komponente die primäre Einheit der Wiederverwendung von Code in React sind, versuchen wir den Code ein wenig zu überarbeiten in dem wir eine `<Mouse>` Komponente nutzen, dass das Verhalten zusammenfasst, welches wir woanders erneut nutzen können.

```js
// Die <Mouse> Komponente fasst das Verhalten zusammen, was wir benötigen...
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/* ...aber wie rendern wir etwas anderes als <p>? */}
        <p>Momentane Mausposition ist: ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Bewege die Maus!</h1>
        <Mouse />
      </div>
    );
  }
}
```

Jetzt fasst die `<Mouse>` Komponente alle Verhaltensweisen zusammen, welche mit dem lauschen für `mousemove` events und dem speichern der (x, y) Position des Cursors zusammenhängt. Allerdings ist es noch nicht wirklich wiederverwertbar.

Nehmen wir beispielsweise, wir hätten eine `<Cat>` Komponente, welche das Bild einer Katze rendert, die den Cursor hinterherjagt. Wir könnten ein `<Cat mouse={{ x, y }}>` Prop nutzen um der Komponente die Koordinaten der Maus zu übergeben, sodass es weiß wo es das Bild der Katze positionieren muss.

Für den ersten Versuch solltest du versuchen die `<Cat>` Komponente *in `<Mouse>`‘s `render` Methode zu rendern, so wie im folgenden Beispiel:

```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Wir könnten das <p> für ein <Cat> hier umtauschen ... aber dann müssten wir eine seperate <MouseWithSomethingElse>
          Komponente erstellen, wenn wir es nutzen möchten. Somit ist das <MouseWithCat>
          noch nicht wirklich nutzbar.
        */}
        <Cat mouse={this.state} />
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Bewege die Maus!</h1>
        <MouseWithCat />
      </div>
    );
  }
}
```

Dieser Ansatz funktioniert für unseren spezifischen Nutzen, aber wir haben es noch nicht geschafft das Verhalten objektiv zusammenzufassen und wiederverwertbar zu machen. Wenn wir jetzt die Mausposition für einen anderen Nutzen benötigen, müssen wir eine neue Komponente erschaffen (z.B. mit einem anderen `<MouseWithCat>`) und für speziell diesen Nutzen rendern.

Hier kommt das „render prop“ ins Spiel. Ansatt, dass wir ein `<Cat>` innerhalb der `<Mouse>` Komponente hard-coden und somit effektiv den gerenderten Output verändern, können wir `<Mouse>` mit einem Funktionsprop ausstatten, mit dem es dynamisch bestimmt was zu rendern ist – ein "render prop".


```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Anstatt statisch anzuzeigen was <Mouse> rendert,
          nutzen wir den `render` Prop um dynamisch zu bestimmen was gerendert werden muss.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Bewege die Maus!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

Anstatt die `<Mouse>` Komponente einfach zu klonen und etwas Anderes in die `render` Methode spezifisch zu hard-coden, verwenden wir ein `render` Prop, welches `<Mouse>` dynamisch nutzen und bestimmen kann, was es rendert.

Genauer ausgedrückt, **ein „render prop“ ist ein Funktionsprop, dass eine Komponente nutzt, um zu wissen, was es rendern muss.**

Diese Technik macht das gewünschte Verhalten übertragbar. Um das Verhalten zu erhalten, rendern wir eine `<Mouse>` mit einem `render` Prop, welches mitteilt, was es zu rendern hat. Selbstverständlich unter Berücksichtung der aktuellen (x, y) Koordinaten des Cursors.

Eine interessante Sache über „render props“: Man kann die meisten „[higher-order components](/docs/higher-order-components.html)“ (HOC) durch normale Komponenten mit einem "render prop" implementieren. Wenn Sie beispielsweise ein `withMouse` HOC anstelle einer `<Mouse>` Komponente nutzen möchten, können Sie dies einfach mit einer normalen `<Mouse>` mit "render prop" erstellen: 

```js
// Wenn Sie wirklich ein HOC benötigen können Sie einfach
// eines mit einer regulären Komponente mit "render prop" erstellen!
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}
```

Ein render Prop zu nutzen hat somit auch den Vorteil, beide Strukturen nutzen zu können.

## Andere Props außer `render` nutzen {#using-props-other-than-render}

Es ist wichtig sich zu merken, dass nur weil diese Struktur „render props“ heißt, es *nicht zwingend notwendig ist ein Prop namens `render` zu nutzen, um auch diese Struktur zu nutzen*. Tatsächlich ist [*jedes* Prop, welches eine Funktion ist, die auch eine Komponente nutzen kann, um zu wissen was zu rendern ist, technisch ein „render prop“](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce).

Auch wenn das Beispiel oben ein `render` nutzt, könnten wir auch einfach ein `children` Prop nutzen!

```js
<Mouse children={mouse => (
  <p>Momentane Mausposition ist: {mouse.x}, {mouse.y}</p>
)}/>
```

Merke! Das `children` Prop muss nicht in den Attributen im „JSX element“ gelistet sein. Stattdessen können sie es direkt *in* das element einfügen!

```js
<Mouse>
  {mouse => (
    <p>Momentane Mausposition ist: {mouse.x}, {mouse.y}</p>
  )}
</Mouse>
```

Sie können sehen wie diese Technik in der [react-motion](https://github.com/chenglou/react-motion) API genutzt wird.

Da diese Technik ein wenig ungewöhnlich ist, möchten Sie wahrscheinlich explizit angeben das `children` eine Funktion in Ihren `propTypes` ist, wenn Sie eine API wie diese erstellen.

```js
Mouse.propTypes = {
  children: PropTypes.func.isRequired
};
```

## Vorbehalte {#caveats}

### Seien Sie vorsichtig wenn Sie Render Props mit React.PureComponent nutzen {#be-careful-when-using-render-props-with-reactpurecomponent}

Bei der Nutzung eines render Props kann dieses die Vorteile negieren, welche vom [`React.PureComponent`](/docs/react-api.html#reactpurecomponent) kommen, sollten Sie die Funktion innerhalb der `render` Methode erstellen. Grund hierfür ist, dass der oberflächliche Prop Vergleich immer ein `false` für neue Props wiedergibt und jeder `render` in diesem Fall einen neuen Wert für den render Prop generiert.

Ein Beispiel: Sollten wir weiter mit unserer `<Mouse>` Komponente von oben arbeiten und `Mouse` erweitert, statt `React.Component`, `React.PureComponent` würde es folgendermaßen aussehen:

```js
class Mouse extends React.PureComponent {
  // Gleiche Implementierung wie oben...
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Bewege die Maus!</h1>

        {/*
          Nicht gut! Der Wert des `render` Prop wird
          bei jedem rendern verändert.
        */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

In diesem Beispiel wird jedes Mal, wenn `<MouseTracker>` rendert, eine neue Funktion mit dem Wert vom `<Mouse render>` Prop generiert, wodurch der Effekt von der `<Mouse>` erweiterten `React.PureComponent` negiert wird!

Um dieses Problem zu umgehen, können Sie manchmal das Prop als eine Instanz-Methode definieren, in etwa so:

```js
class MouseTracker extends React.Component {
  // Als Instanz-Methode definiert wird `this.renderTheCat` immer
  // die Selbe Funktion referrieren, wenn sie gerendert wird
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Bewege die Maus!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
```

In Fällen, in denen Sie das Prop nicht statisch definieren können (bspw., weil Sie es über den Props der Komponenten und/oder dem Zustand schließen müssen), sollte `<Mouse>` den `React.Component` stattdessen erweiten.
