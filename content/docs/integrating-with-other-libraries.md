---
id: integrating-with-other-libraries
title: Integration mit anderen Bibliotheken
permalink: docs/integrating-with-other-libraries.html
---

React kann in jeder Webanwendung verwendet werden. Es kann in andere Anwendungen eingebettet werden, und mit ein wenig Sorgfalt können andere Anwendungen in React eingebettet werden. In diesem Handbuch werden einige der gebräuchlichsten Anwendungsfälle untersucht, wobei der Schwerpunkt auf der Integration mit [jQuery](https://jquery.com/) und [Backbone](https://backbonejs.org/) liegt wird angewendet, um Komponenten in vorhandenen Code zu integrieren.

## Integration mit DOM-Manipulations-Plugins {#integrating-with-dom-manipulation-plugins}

React kennt keine Änderungen am DOM außerhalb von React. Es ermittelt Aktualisierungen auf der Grundlage seiner eigenen internen Darstellung. Wenn dieselben DOM-Knoten von einer anderen Bibliothek bearbeitet werden, ist React verwirrt und kann nicht wiederhergestellt werden.

Dies bedeutet nicht, dass es unmöglich oder sogar zwangsläufig schwer ist, React mit anderen Möglichkeiten zur Beeinflussung des DOM zu kombinieren. Du musst lediglich bedenken, welche Folgen einzelne Möglichkeiten mit sich bringen.

Der einfachste Weg Konflikte zu vermeiden, besteht darin, zu verhindern, dass die React-Komponente aktualisiert wird. Du kannst dies tun, indem du Elemente renderst, für die React keinen Grund zum Aktualisieren hat, z. B. ein leeres `<div />`.

### Wie nähere du dich dem Problem {#how-to-approach-the-problem}

Um dies zu demonstrieren, skizzieren wir einen Wrapper für ein generisches jQuery-Plugin.

Wir werden eine [ref](/ docs / refs-and-the-dom.html) an das Root-DOM-Element anhängen. In `componentDidMount` erhalten wir einen Verweis darauf, damit wir ihn an das jQuery-Plugin übergeben können.

Um zu verhindern, dass React das DOM nach dem Mounten berücksichtigt, geben wir ein leeres `<div />` von der `render()`-Methode zurück. Das `<div />`-Element hat keine Eigenschaften oder untergeordneten Elemente, daher hat React keinen Grund, es zu aktualisieren, sodass das jQuery-Plugin diesen Teil des DOM verwalten kann:

```js{3,4,8,12}
class SomePlugin extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.somePlugin();
  }

  componentWillUnmount() {
    this.$el.somePlugin('destroy');
  }

  render() {
    return <div ref={el => this.el = el} />;
  }
}
```

Beachte, dass wir sowohl `componentDidMount` als auch `componentWillUnmount` [Lebenszyklusmethoden](/docs/react-component.html#the-component-lifecycle) definiert haben. Viele jQuery-Plugins hängen Event-Listener an das DOM an, daher ist es wichtig, sie in "componentWillUnmount" zu entfernen. Wenn das Plugin keine Bereinigungsmethode bereitstellt, musst du wahrscheinlich eine eigene Methode bereitstellen. Denke daran, alle vom Plugin registrierten Event-Listener zu entfernen, um Speicherlecks zu vermeiden.

### Integration mit dem jQuery Chosen-Plugin {#integrating-with-jquery-chosen-plugin}

Um ein konkreteres Beispiel für diese Konzepte zu finden, schreiben wir einen minimalen Wrapper für das Plugin [Chosen](https://harvesthq.github.io/chosen/), der die Eingaben von `<select>` erweitert.

>**Hinweis:**
>
>Nur weil es möglich ist, heißt das nicht, dass es der beste Ansatz für React-Apps ist. Wir empfehlen dir die Verwendung von React-Komponenten, wenn du die freie Wahl hast. React-Komponenten lassen sich in React-Anwendungen leichter wiederverwenden und bieten häufig eine bessere Kontrolle über ihr Verhalten und Erscheinungsbild.

Schauen wir uns zunächst an, was Chosen mit dem DOM macht.

Wenn du es auf einem <select> -DOM-Knoten aufrufst, liest es die Attribute des ursprünglichen DOM-Knotens aus, blendet sie in einem Inline-Stil aus und fügt unmittelbar nach dem `<select>` einen separaten DOM-Knoten mit eigener visueller Darstellung hinzu. Anschließend werden jQuery-Events ausgelöst, um uns über die Änderungen zu informieren.

Angenommen, dies ist die API, die wir mit unserer `<Chosen>`-Wrapper-React-Komponente anstreben:

```js
function Example() {
  return (
    <Chosen onChange={value => console.log(value)}>
      <option>Vanille</option>
      <option>Schokolade</option>
      <option>Erdbeere</option>
    </Chosen>
  );
}
```

Der Einfachheit halber werden wir es als [unkontrollierte Komponente] (/docs/uncontrolled-components.html) implementieren.

Zuerst erstellen wir eine leere Komponente mit einer `render()`-Methode, in der wir `<select>` in ein `<div>` eingeschlossen zurückgeben:

```js{4,5}
class Chosen extends React.Component {
  render() {
    return (
      <div>
        <select className="Chosen-select" ref={el => this.el = el}>
          {this.props.children}
        </select>
      </div>
    );
  }
}
```

Beachte, wie wir `<select>` mit einem zusätzlichen `<div>` umschlossen haben. Dies ist notwendig, da Chosen ein weiteres DOM-Element direkt nach dem Knoten `<select>` anfügt, den wir an ihn übergeben haben. In Bezug auf React hat `<div>` jedoch immer nur ein einziges untergeordnetes Element. Auf diese Weise stellen wir sicher, dass React-Updates nicht mit dem von Chosen angehängten zusätzlichen DOM-Knoten in Konflikt stehen. Wenn du das DOM außerhalb von React Flow änderst, musst du sicherstellen, dass React keinen Grund hat, diese DOM-Knoten zu berücksichtigen.

Als nächstes werden wir die Lebenszyklusmethoden implementieren. Wir müssen Chosen mit dem ref auf den `<select>`-Knoten in `componentDidMount` initialisieren und ihn in `componentWillUnmount` herunterreißen:

```js{2,3,7}
componentDidMount() {
  this.$el = $(this.el);
  this.$el.chosen();
}

componentWillUnmount() {
  this.$el.chosen('destroy');
}
```

[**Probiere es mit CodePen aus**](https://codepen.io/gaearon/pen/qmqeQx?editors=0010)

Beachte, dass React dem Feld `this.el` keine besondere Bedeutung zuweist. Es funktioniert nur, weil wir dieses Feld zuvor von einem `ref` in der `render()`-Methode zugewiesen haben:

```js
<select className="Chosen-select" ref={el => this.el = el}>
```

Dies reicht aus, um unsere Komponente rendern zu lassen, wir möchten jedoch auch über die Wertänderungen informiert werden. Dazu abonnieren wir das `change` jQuery-Event für das von Chosen verwaltete `<select>`.

Wir werden `this.props.onChange` nicht direkt an Chosen übergeben, da sich die Requisiten der Komponente im Laufe der Zeit ändern können, und dies schließt Event-Handler ein. Stattdessen deklarieren wir eine `handleChange()`-Methode, die `this.props.onChange` aufruft und das jQuery-Events `change` abonniert:

```js{5,6,10,14-16}
componentDidMount() {
  this.$el = $(this.el);
  this.$el.chosen();

  this.handleChange = this.handleChange.bind(this);
  this.$el.on('change', this.handleChange);
}

componentWillUnmount() {
  this.$el.off('change', this.handleChange);
  this.$el.chosen('destroy');
}

handleChange(e) {
  this.props.onChange(e.target.value);
}
```

[**Probiere es mit CodePen aus**](https://codepen.io/gaearon/pen/bWgbeE?editors=0010)

Schließlich bleibt noch etwas zu tun. In React können sich Requisiten im Laufe der Zeit ändern. Beispielsweise kann die Komponente `<Chosen>` verschiedene untergeordnete Elemente erhalten, wenn sich der State der übergeordneten Komponente ändert. Dies bedeutet, dass es an Integrationspunkten wichtig ist, dass wir das DOM als Reaktion auf Requisitenaktualisierungen manuell aktualisieren, da React das DOM nicht mehr für uns verwalten kann.

Aus der Dokumentation von Chosen geht hervor, dass wir die jQuery `trigger()`-API verwenden können, um Änderungen am ursprünglichen DOM-Element zu melden. Wir überlassen es React, `this.props.children` in` <select> `zu aktualisieren, fügen aber auch eine `componentDidUpdate()`-Lebenszyklusmethode hinzu, die Chosen über Änderungen in der Liste der untergeordneten Elemente benachrichtigt:

```js{2,3}
componentDidUpdate(prevProps) {
  if (prevProps.children !== this.props.children) {
    this.$el.trigger("chosen:updated");
  }
}
```

Auf diese Weise kann Chosen das DOM-Element aktualisieren, wenn sich die von React verwalteten `<select>` untergeordneten Elemente ändern.

Die vollständige Implementierung der `Chosen`-Komponente sieht folgendermaßen aus:

```js
class Chosen extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.chosen();

    this.handleChange = this.handleChange.bind(this);
    this.$el.on('change', this.handleChange);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.$el.trigger("chosen:updated");
    }
  }

  componentWillUnmount() {
    this.$el.off('change', this.handleChange);
    this.$el.chosen('destroy');
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div>
        <select className="Chosen-select" ref={el => this.el = el}>
          {this.props.children}
        </select>
      </div>
    );
  }
}
```

[**Probiere es mit CodePen aus**](https://codepen.io/gaearon/pen/xdgKOz?editors=0010)

## Integration mit anderen View-Bibliotheken {#integrating-with-other-view-libraries}

Dank der Flexibilität von [`ReactDOM.render()`](/docs/react-dom.html#render) kann React in andere Anwendungen eingebettet werden.

Obwohl React häufig beim Start zum Laden einer einzelnen Root-React-Komponente in das DOM verwendet wird, kann `ReactDOM.render()` auch für unabhängige Teile der Benutzeroberfläche, die so klein wie eine Schaltfläche oder so groß wie eine Schaltfläche sein können, mehrmals aufgerufen werden eine App.

Genau so wird React bei Facebook eingesetzt. Auf diese Weise können wir Anwendungen in React Stück für Stück schreiben und sie mit unseren vorhandenen servergenerierten Vorlagen und anderem clientseitigen Code kombinieren.

### String-basiertes Rendern durch React ersetzen {#replacing-string-based-rendering-with-react}

Ein in älteren Webanwendungen übliches Muster besteht darin, Teile des DOM als Zeichenfolge zu beschreiben und wie folgt in das DOM einzufügen: `$el.html(htmlString)`. Diese Punkte in einer Codebasis eignen sich perfekt für die Einführung von React. Schreibe das stringbasierte Rendering einfach als React-Komponente um.

Also die folgende jQuery-Implementierung ...

```js
$('#container').html('<button id="btn">Sag Hallo</button>');
$('#btn').click(function() {
  alert('Hallo!');
});
```

...könnte also mit einer React-Komponente umgeschrieben werden:

```js
function Button() {
  return <button id="btn">Sag Hallo</button>;
}

ReactDOM.render(
  <Button />,
  document.getElementById('container'),
  function() {
    $('#btn').click(function() {
      alert('Hallo!');
    });
  }
);
```

Von hier aus kannst du mehr Logik in die Komponente verschieben und allgemeinere React-Praktiken anwenden. In Komponenten ist es beispielsweise am besten, sich nicht auf IDs zu verlassen, da dieselbe Komponente mehrmals gerendert werden kann. Stattdessen verwenden wir das [React-Event-System](/docs/handling-events.html) und registrieren den Click-Handler direkt im React-Element `<button>`:

```js{2,6,9}
function Button(props) {
  return <button onClick={props.onClick}>Sag Hallo</button>;
}

function HalloButton() {
  function handleClick() {
    alert('Hallo!');
  }
  return <Button onClick={handleClick} />;
}

ReactDOM.render(
  <HalloButton />,
  document.getElementById('container')
);
```

[**Probiere es mit CodePen aus**](https://codepen.io/gaearon/pen/RVKbvW?editors=1010)

Du kannst so viele isolierte Komponenten haben, wie du möchtest, und sie mit `ReactDOM.render()` in verschiedenen DOM-Containern rendern. Wenn du mehr von deiner App in React konvertierst, kannst du diese nach und nach zu größeren Komponenten zusammenfassen und einige der `ReactDOM.render()`-Aufrufe in die Hierarchie verschieben.

### Einbetten von React in eine Backbone-View {#embedding-react-in-a-backbone-view}

[Backbone](https://backbonejs.org/) Views verwenden normalerweise HTML-Strings oder Strings erzeugende Vorlagenfunktionen, um den Inhalt für ihre DOM-Elemente zu erstellen. Auch dieser Vorgang kann durch das Rendern einer React-Komponente ersetzt werden.

Im Folgenden erstellen wir eine Backbone-View mit dem Namen `ParagraphView`. Es überschreibt die `render()`-Funktion von Backbone, um eine React `<Paragraph>` - Komponente in das von Backbone (`this.el`) bereitgestellte DOM-Element zu rendern. Auch hier verwenden wir [`ReactDOM.render()`](/docs/react-dom.html#render):

```js{1,5,8,12}
function Paragraph(props) {
  return <p>{props.text}</p>;
}

const ParagraphView = Backbone.View.extend({
  render() {
    const text = this.model.get('text');
    ReactDOM.render(<Paragraph text={text} />, this.el);
    return this;
  },
  remove() {
    ReactDOM.unmountComponentAtNode(this.el);
    Backbone.View.prototype.remove.call(this);
  }
});
```

[**Probiere es mit CodePen aus**](https://codepen.io/gaearon/pen/gWgOYL?editors=0010)

Es ist wichtig, dass wir in der Methode `remove` auch `ReactDOM.unmountComponentAtNode()` aufrufen, damit React die Registrierung von Event-Handlern und anderen Ressourcen aufhebt, die der Komponentenstruktur zugeordnet sind, wenn diese getrennt wird.

Wenn eine Komponente *aus* einem React-Baum entfernt wird, wird die Bereinigung automatisch durchgeführt. Da wir jedoch den gesamten Baum manuell entfernen, müssen wir diese Methode aufrufen.

## Integration in Modellebenen {#integrating-with-model-layers}

Im Allgemeinen wird empfohlen, einen unidirektionalen Datenfluss zu verwenden, z. B. [React state](/docs/lifting-state-up.html), [Flux](https://facebook.github.io/flux/) oder [Redux](https://redux.js.org/), React-Komponenten können einen Modell-Layer aus anderen Frameworks und Bibliotheken verwenden.

### Verwenden von Backbone-Modellen in React-Komponente {#using-backbone-models-in-react-components}

Die einfachste Möglichkeit, Modelle und Sammlungen von [Backbone](https://backbonejs.org/) aus einer React-Komponente zu verwenden, besteht darin, die verschiedenen Änderungsereignisse zu überwachen und manuell eine Aktualisierung zu erzwingen.

Komponenten, die für das Rendern von Modellen verantwortlich sind, würden `'change'`-Events abhören, während Komponenten, die für das Rendern von Sammlungen verantwortlich sind, `'add'`- und `'remove'`-Events abhören würden. Rufe in beiden Fällen [`this.forceUpdate()`](/docs/react-component.html#forceupdate) auf, um die Komponente mit den neuen Daten neu zu rendern.

Im folgenden Beispiel rendert die `List`-Komponente eine Backbone-Sammlung, wobei die `Item`-Komponente zum Rendern einzelner Elemente verwendet wird.

```js{1,7-9,12,16,24,30-32,35,39,46}
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.model.on('change', this.handleChange);
  }

  componentWillUnmount() {
    this.props.model.off('change', this.handleChange);
  }

  render() {
    return <li>{this.props.model.get('text')}</li>;
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.collection.on('add', 'remove', this.handleChange);
  }

  componentWillUnmount() {
    this.props.collection.off('add', 'remove', this.handleChange);
  }

  render() {
    return (
      <ul>
        {this.props.collection.map(model => (
          <Item key={model.cid} model={model} />
        ))}
      </ul>
    );
  }
}
```

[**Probiere es mit CodePen aus**](https://codepen.io/gaearon/pen/GmrREm?editors=0010)

### Extrahieren von Daten aus Backbone-Modellen {#extracting-data-from-backbone-models}

Für die oben beschriebene Vorgehensweise müssen deine React-Komponenten die Backbone-Modelle und -Sammlungen kennen. Wenn du später auf eine andere Datenverwaltungslösung migrieren möchtest, möchtest du das Wissen über Backbone möglicherweise auf so wenige Teile des Codes wie möglich konzentrieren.

Eine Lösung hierfür besteht darin, die Attribute des Modells bei jeder Änderung als reine Daten zu extrahieren und diese Logik an einem einzigen Ort zu speichern. Das Folgende ist [eine übergeordnete Komponente](/docs/higher-order-components.html), die alle Attribute eines Backbone-Modells in den State extrahiert und die Daten an die umschlossene Komponente übergibt.

Auf diese Weise muss nur die übergeordnete Komponente die internen Daten des Backbone-Modells kennen, und die meisten Komponenten in der App können von Backbone unabhängig bleiben.

Im folgenden Beispiel erstellen wir eine Kopie der Modellattribute, um den Anfangszustand zu bilden. Wir abonnieren das `change`-Event (und kündigen das Abonnement beim Abmelden) und aktualisieren in diesem Fall den State mit den aktuellen Attributen des Modells. Schließlich stellen wir sicher, dass wir nicht vergessen, das Abonnement des alten Modells zu kündigen und das neue zu abonnieren, wenn sich die Modellstütze selbst ändert.

Beachte, dass dieses Beispiel in Bezug auf die Arbeit mit Backbone nicht erschöpfend sein soll, aber es sollte Ihnen eine Vorstellung davon geben, wie du dies allgemein angehen kannst:

```js{1,5,10,14,16,17,22,26,32}
function connectToBackboneModel(WrappedComponent) {
  return class BackboneComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = Object.assign({}, props.model.attributes);
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      this.props.model.on('change', this.handleChange);
    }

    componentWillReceiveProps(nextProps) {
      this.setState(Object.assign({}, nextProps.model.attributes));
      if (nextProps.model !== this.props.model) {
        this.props.model.off('change', this.handleChange);
        nextProps.model.on('change', this.handleChange);
      }
    }

    componentWillUnmount() {
      this.props.model.off('change', this.handleChange);
    }

    handleChange(model) {
      this.setState(model.changedAttributes());
    }

    render() {
      const propsExceptModel = Object.assign({}, this.props);
      delete propsExceptModel.model;
      return <WrappedComponent {...propsExceptModel} {...this.state} />;
    }
  }
}
```

Um zu demonstrieren, wie es verwendet wird, verbinden wir eine `NameInput`-React-Komponente mit einem Backbone-Modell und aktualisieren dessen `firstName`-Attribut jedes Mal, wenn sich die Eingabe ändert:

```js{4,6,11,15,19-21}
function NameInput(props) {
  return (
    <p>
      <input value={props.firstName} onChange={props.handleChange} />
      <br />
      Ich heiße {props.firstName}.
    </p>
  );
}

const BackboneNameInput = connectToBackboneModel(NameInput);

function Example(props) {
  function handleChange(e) {
    props.model.set('firstName', e.target.value);
  }

  return (
    <BackboneNameInput
      model={props.model}
      handleChange={handleChange}
    />
  );
}

const model = new Backbone.Model({ firstName: 'Frodo' });
ReactDOM.render(
  <Example model={model} />,
  document.getElementById('root')
);
```

[**Probiere es mit CodePen aus**](https://codepen.io/gaearon/pen/PmWwwa?editors=0010)

Diese Technik ist nicht auf Backbone beschränkt. Du kannst React mit jeder Modellbibliothek verwenden, indem du die Änderungen in den Lebenszyklusmethoden abonnierst und die Daten optional in den lokalen React-State kopierst.
