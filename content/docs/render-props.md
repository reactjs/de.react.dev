---
id: render-props
title: Render Props
permalink: docs/render-props.html
---

Der Begriff ["render prop"](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) bezieht sich bezieht sich auf eine Technik um Code zwischen React-Komponenten auszutauschen. Hierzu nutzt man ein Prop dessen Wert eine Funktion ist.

Eine Komponente mit einem "render prop" nimmt eine Funktion, die ein React Element zurückgibt und ruft sie auf, anstatt eine eigene zu Render-Logik zu implementieren.

```jsx
<DataProvider render={data => (
  <h1>Hallo {data.target}</h1>
)}/>
```

Bibliotheken, welche "render props" benutzen sind: [React Router](https://reacttraining.com/react-router/web/api/Route/render-func), [Downshift](https://github.com/paypal/downshift) und [Formik](https://github.com/jaredpalmer/formik).

In dieser Dokumentation wird besprochen wozu "render props" genutzt werden und wie du sie selbst nutzen kannst.

## Nutze Render Props für Cross-Cutting Concerns {#use-render-props-for-cross-cutting-concerns}

Komponenten sind die Grundeinheit für Code-Wiederverwendung in React, aber es ist nicht immer direkt ersichtlich wie man den Status bzw. die Verhaltensweise einer bestimmten Komponente mit einer anderen Komponente teilt, welche die gleichen Eigenschaften benötigt.
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
<<<<<<< HEAD
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        <h1>Bewege die Maus umher!</h1>
        <p>Die momentane Mausposition ist: ({this.state.x}, {this.state.y})</p>
=======
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
>>>>>>> 9e5a358cb24a665fc48615ae224f26a4f2191b32
      </div>
    );
  }
}
```

Während der Mauszeiger sich über den Bildschirm bewegt, zeigt die Komponente seine (x, y) Koordinaten in einem `<p>`.

Nun stellt sich eine Frage: Wie kann man dieses Verhalten auf eine andere Komponente übertragen? In anderen Worten: wenn eine andere Komponente die Position des Cursors kennen muss, kann das Verhalten so gekapselt werden, dass wir es mit der Komponente teilen können?

Da Komponenten die Grundeinheit der Code-Wiederverwendung in React sind, versuchen wir den Code ein wenig zu überarbeiten in dem wir eine `<Mouse>` Komponente nutzen, die das Verhalten kapselt, welches wir woanders erneut nutzen möchten.

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
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/* ...aber wie rendern wir etwas anderes als <p>? */}
        <p>Die momentane Mausposition ist: ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <>
        <h1>Bewege die Maus umher!</h1>
        <Mouse />
      </>
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
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

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
        <h1>Bewege die Maus umher!</h1>
        <MouseWithCat />
      </div>
    );
  }
}
```

Dieser Ansatz funktioniert für unseren spezifischen Nutzen, aber wir haben es noch nicht geschafft das Verhalten objektiv zusammenzufassen und wiederverwendbar zu machen. Wenn wir jetzt die Mausposition für einen anderen Nutzen benötigen, müssen wir eine neue Komponente erstellen (z.B. mit einem weiteren `<MouseWithCat>`) und für speziell diesen Nutzen rendern.

Hier kommt das „render prop“ ins Spiel. Anstatt, dass wir ein `<Cat>` innerhalb der `<Mouse>` Komponente fest zu programmieren und ihren effektiven gerenderten Output zu verändern, können wir `<Mouse>` mit einem Funktions-Prop ausstatten, mit dem es dynamisch bestimmt was zu rendern ist – ein "render prop".


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
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          Anstatt statisch anzuzeigen was <Mouse> rendert,
          nutzen wir das `render`-Prop um dynamisch zu bestimmen was gerendert werden muss.
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
        <h1>Bewege die Maus umher!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

Anstatt die `<Mouse>` Komponente einfach zu klonen und etwas anderes in die `render`-Methode fest einzuprogrammieren, um einen bestimmten Anwendungsfall zu lösen, verwenden wir ein `render`-Prop, mit dem `<Mouse>` dynamisch bestimmen kann was es rendert.

Genauer ausgedrückt, **ein „render prop“ ist ein Funktion-Prop, dass eine Komponente nutzt, um zu wissen was es rendern muss.**

Diese Technik macht das gewünschte Verhalten übertragbar. Um das Verhalten zu erhalten, rendere eine `<Mouse>` mit einem `render`-Prop, welches ihr mitteilt, was sie mit dem aktuellen (x, y) Cursor rendern soll.

Eine interessante Sache über „render props“: Man kann die meisten „[higher-order components](/docs/higher-order-components.html)“ (HOC) durch normale Komponenten mit einem "render prop" implementieren. Wenn du beispielsweise eine `withMouse` HOC anstelle einer `<Mouse>` Komponente nutzen möchtest, kannst du einfach eine normale `<Mouse>` mit "render prop" erstellen:

```js
// Wenn du aus irgendeinem Grund wirklich eine HOC willst, kannst du sie einfach
// mit einer regulären Komponente mit einem "render prop" erstellen!
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

Auch wenn das Beispiel oben `render` nutzt, könnten wir auch einfach ein `children`-Prop nutzen!

```js
<Mouse children={mouse => (
  <p>Momentane Mausposition ist: {mouse.x}, {mouse.y}</p>
)}/>
```

Und merke, dass das `children`-Prop nicht unbedingt in der Liste der "Attribute" im JSX-Element genannt werden muss. Stattdessen kannst du es direkt *in* das Element einfügen!

```js
<Mouse>
  {mouse => (
    <p>Momentane Mausposition ist: {mouse.x}, {mouse.y}</p>
  )}
</Mouse>
```

Du kannst sehen wie diese Technik in der [react-motion](https://github.com/chenglou/react-motion) API genutzt wird.

Da diese Technik etwas ungewöhnlich ist, möchtest du wahrscheinlich explizit angeben, dass `children` eine Funktion in deinen `propTypes` ist, wenn du eine API wie diese erstellst.

```js
Mouse.propTypes = {
  children: PropTypes.func.isRequired
};
```

## Vorbehalte {#caveats}

### Sei vorsichtig wenn du render-Props mit React.PureComponent nutzt {#be-careful-when-using-render-props-with-reactpurecomponent}

Bei der Nutzung eines render-Props kann dieses die Vorteile zunichte machen, welche vom [`React.PureComponent`](/docs/react-api.html#reactpurecomponent) kommen, solltest du die Funktion innerhalb der `render` Methode erstellen. Grund hierfür ist, dass der oberflächliche Prop Vergleich immer ein `false` für neue Props zurückgibt und jedes `render` in diesem Fall einen neuen Wert für das render-Prop generiert.

Wenn wir zum Beispiel mit unserer `<Mouse>`-Komponente von oben fortfahren und `Mouse` statt `React.Component`, `React.PureComponent` nutzen würde, würde es folgendermaßen aussehen:

```js
class Mouse extends React.PureComponent {
  // Gleiche Implementierung wie oben...
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Bewege die Maus umher!</h1>

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

In diesem Beispiel wird jedes Mal, wenn `<MouseTracker>` rendert, eine neue Funktion mit dem Wert vom `<Mouse render>`-Prop generiert, wodurch der Effekt von der `<Mouse>` erweiterten `React.PureComponent` zunichte gemacht wird!

Um dieses Problem zu umgehen, kannst du manchmal das Prop als eine Instanz-Methode definieren, in etwa so:

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
        <h1>Bewege die Maus umher!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
```

In Fällen, in denen du das Prop nicht statisch definieren kannst (bspw., weil du es über die Props der Komponenten und/oder dem State schließen musst), sollte `<Mouse>` den `React.Component` stattdessen erweitern.
