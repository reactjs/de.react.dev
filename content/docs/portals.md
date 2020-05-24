---
id: portals
title: Portale
permalink: docs/portals.html
---

Portale bieten eine erstklassige Möglichkeit, Kinder in einen DOM-Node zu rendern, der außerhalb der DOM-Hierarchie der Eltern-Komponente existiert.

```js
ReactDOM.createPortal(child, container)
```

Das erste Argument (`child`) ist ein beliebiges [renderbares React-Kind](/docs/react-component.html#render), wie beispielsweise ein Element, eine Zeichenkette oder ein Fragment. Das zweite Argument (`container`) ist ein DOM-Element.

## Verwendung {#usage}

Wenn du ein Element aus der Render-Methode einer Komponente zurückgibst, wird es normalerweise als Kind des nächsten Eltern-Nodes in das DOM eingebunden:

```js{4,6}
render() {
  // React bindet ein neues div-Element ein und rendert die Kinder in diesem.
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```

Manchmal ist es jedoch nützlich, ein Kind an einer anderen Position im DOM einzufügen:

```js{6}
render() {
  // React erstellt *keinen* neuen Div. Es rendert die Kinder zu `domNode`.
  // `domNode` ist jeder valide DOM-Knoten, unabhängig von seiner Position im DOM.
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

Ein typischer Use-Case für Portale ist, wenn Eltern-Komponenten Styles mit den Attributen `overflow: hidden` oder `z-index` besitzen und du jedoch möchtest, dass das Kind visuell aus seinem Container "ausbricht". Zum Beispiel bei Dialogen, Hovercards und Tooltips.

> Hinweis:
>
> Wenn du mit Portalen arbeitest, denk daran, dass das [Verwalten des Tastaturfokus](/docs/accessibility.html#programmatically-managing-focus) sehr wichtig wird.
>
> Versichere dich bei Modal-Dialogen, dass jeder mit diesen interagieren kann, indem er die [WAI-ARIA Modal Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) befolgt. 

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/yzMaBd)

## Event-Bubbling durch Portale {#event-bubbling-through-portals}

Auch wenn sich ein Portal überall im DOM-Baum befinden kann, verhält es sich auf jede andere Weise wie ein normales React-Kind. Funktionen wie context funktionieren unabhängig davon, ob es sich bei dem Kind um ein Portal handelt, genau gleich, da das Portal unabhängig von der Position im *DOM-Baum* weiterhin im *React-Baum* existiert.

Dies schließt das Event-Bubbling mit ein. Ein Event, das innerhalb eines Portals ausgelöst wird, wird sich auf Vorfahren im enthaltenden *React-Baum* ausbreiten, auch wenn diese Elemente keine Vorfahren im *DOM-Baum* sein sollten. Unter der Annahme der folgenden HTML-Struktur:

```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

Eine `Eltern`-Komponente in `#app-root` wäre in der Lage, ein unerreichtes, aufsteigendes Event aus dem Geschwister-Knoten `#modal-root` zu erreichen.

```js{28-31,42-49,53,61-63,70-71,74}
// Diese beiden Container sind Geschwister im DOM
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Das Portal-Element wird in den DOM-Baum eingefügt, nachdem
    // die Modal-Kinder eingebunden wurden, d.h. die Kinder werden
    // in einem freistehenden DOM-Node eingebunden. Wenn eine Kind-
    // Komponente beim Einbinden voraussetzt direkt an den DOM-Baum
    // angehängt zu werden, z.B. um einen DOM-Knoten zu messen oder wenn
    // sie 'autoFocus' in einem Nachfahren nutzt, füge dem Modal den  
    // Status hinzu und rendere die Kinder-Komponenten nur, wenn das 
    // Modal in den DOM-Baum eingefügt ist. 
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // Dies wird ausgelöst, wenn auf den Button im Kind geklickt wird,
    // wodurch der Status der Eltern aktualisiert wird, auch wenn der
    // Button im DOM kein direkter Nachfahre ist.
    this.setState(state => ({
      clicks: state.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Anzahl der Klicks: {this.state.clicks}</p>
        <p>
          Öffne die Browser DevTools, 
          um zu sehen, dass der Button 
          kein Kind des div mit dem 
          onClick-Handler ist.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // Das Klick-Event auf diesem Button wird zu dem Elternelement aufsteigen, 
  // da kein 'onClick'-Attribut definiert ist.
  return (
    <div className="modal">
      <button>Klick</button>
    </div>
  );
}

ReactDOM.render(<Parent />, appRoot);
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/jGBWpE)

Das Auffangen eines Events, das von einem Portal in einer Eltern-Komponente aufsteigt, erlaubt die Entwicklung von flexibleren Abstraktionen, die nicht von Natur aus von Portalen abhängig sind. Wenn du zum Beispiel eine `<Modal />`-Komponente renderst, kann die Eltern-Komponente seine Events unabhängig davon, ob sie über Portale implementiert sind, erfassen.
