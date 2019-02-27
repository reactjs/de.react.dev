---
id: web-components
title: Web Components
permalink: docs/web-components.html
redirect_from:
  - "docs/webcomponents.html"
---

React und [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) wurden entwickelt um unterschiedliche Probleme zu lösen. Web Components bieten eine starke Entkapselung für wiederverwendbare Komponenten, wobei React eine deklarative Bibliothek bietet, die das DOM mit deinen Daten synchronisiert. Die beiden Ziele ergänzen sich gegenseitig. Als Entwickler kannst du React in Web Components oder Web Componentens in React verwenden, oder beides.

Most people who use React don't use Web Components, but you may want to, especially if you are using third-party UI components that are written using Web Components.

## Web Components in React benutzen {#using-web-components-in-react}

```javascript
class HelloMessage extends React.Component {
  render() {
    return <div>Hallo <x-search>{this.props.name}</x-search>!</div>;
  }
}
```

> Hinweis:
>
> Web Components often expose an imperative API. For instance, a `video` Web Component might expose `play()` and `pause()` functions. To access the imperative APIs of a Web Component, you will need to use a ref to interact with the DOM node directly. If you are using third-party Web Components, the best solution is to write a React component that behaves as a wrapper for your Web Component.
>
> Events emitted by a Web Component may not properly propagate through a React render tree.
> You will need to manually attach event handlers to handle these events within your React components.

Eine häufige Verwirrung entsteht dadurch, dass Web Components "class" anstatt "className" verwenden.

```javascript
function BrickFlipbox() {
  return (
    <brick-flipbox class="demo">
      <div>front</div>
      <div>back</div>
    </brick-flipbox>
  );
}
```

## React in deinen Web Components benutzen {#using-react-in-your-web-components}

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
>Dieser Code **wird nicht** funktionieren, wenn du Klassen mit Babel transpilest. See [this issue](https://github.com/w3c/webcomponents/issues/587) for the discussion.
>Include the [custom-elements-es5-adapter](https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs) before you load your web components to fix this issue.
