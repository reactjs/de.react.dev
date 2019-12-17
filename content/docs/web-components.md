---
id: web-components
title: Web Components
permalink: docs/web-components.html
redirect_from:
  - "docs/webcomponents.html"
---

React und [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) wurden entwickelt um unterschiedliche Probleme zu lösen. Web Components bieten eine starke Kapselung für wiederverwendbare Komponenten, wobei React eine deklarative Bibliothek bietet, die das DOM mit deinen Daten synchronisiert. Die beiden Ziele ergänzen sich gegenseitig. Als Entwickler kannst du React in Web Components oder Web Componentens in React verwenden, oder beides.

Die meisten Leute, die React verwenden, verwenden keine Web Components, aber vielleicht möchtest du es, insbesondere wenn du UI Komponenten von Drittanbietern verwendest, die unter der Verwendung von Web Components geschrieben wurden.

## Web Components in React verwenden {#using-web-components-in-react}

```javascript
class HelloMessage extends React.Component {
  render() {
    return <div>Hallo <x-search>{this.props.name}</x-search>!</div>;
  }
}
```

> Hinweis:
>
> Web Componentes haben meist eine imperative API. Beispielsweise könnte eine `video` Web Component, die beiden Funktionen `play()` und `pause()` bereitstellen. Um auf die imperative API zuzugreifen, wird eine Referenz (ref) benötigt um mit dem DOM-Knoten direkt zu interagieren. Wenn du Web Components von Drittanbietern verwendest, ist die beste Herangehensweise, eine React-Komponente zu erstellen die, die diese umschließt.
>
> Events, welche von einer Web Component gesendet werden könnten sich möglicherweise nicht über den React-Baum ausbreiten.
> Du musst manuelle Event-Handler erstellen, um diese Events in deinen React-Komponenten zu vearbeiten.

Eine häufige Verwirrung besteht darin, dass Web Components "class" anstatt "className" verwenden.

```javascript
function BrickFlipbox() {
  return (
    <brick-flipbox class="demo">
      <div>vorne</div>
      <div>hinten</div>
    </brick-flipbox>
  );
}
```

## React in deinen Web Components verwenden {#using-react-in-your-web-components}

```javascript
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
  }
}
customElements.define('x-search', XSearch);
```

>Hinweis:
>
>Dieser Code **wird nicht** funktionieren, wenn du Klassen mit Babel umwandelst. Erfahre mehr [zur Problematik](https://github.com/w3c/webcomponents/issues/587) in dieser Diskussion.
>Um dieses Problem zu beseitigen, füge bevor deine Web Component lädt den [custom-elements-es5-adapter](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#custom-elements-es5-adapterjs) hinzu.
