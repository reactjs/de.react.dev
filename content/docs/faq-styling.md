---
id: faq-styling
title: Styling und CSS
permalink: docs/faq-styling.html
layout: docs
category: FAQ
---

### Wie füge ich CSS-Klassen zu Komponenten hinzu? {#how-do-i-add-css-classes-to-components}

Übergebe einen String für das `className`-Prop:

```jsx
render() {
  return <span className="menu navigation-menu">Menü</span>
}
```

CSS-Klassen hängen oft von den Props oder vom State der Komponente ab:

```jsx
render() {
  let className = 'menu';
  if (this.props.isActive) {
    className += ' menu-active';
  }
  return <span className={className}>Menü</span>
}
```

>Tipp
>
>Wenn du oft Code wie diesen schreibst, kann das [classnames](https://www.npmjs.com/package/classnames#usage-with-reactjs) Paket helfen.

### Kann ich Inline-Styles verwenden? {#can-i-use-inline-styles}

Ja, siehe dazu die Dokumentation zum Styling [hier](/docs/dom-elements.html#style).

### Sind Inline-Styles schlecht? {#are-inline-styles-bad}

CSS-Klassen sind üblicherweise besser für die Performance als Inline-Styles.

### Was ist CSS-in-JS? {#what-is-css-in-js}

"CSS-in-JS" bezieht sich auf ein Pattern, bei dem CSS mit Hilfe von JavaScript zusammengesetzt wird, anstatt in externen Dateien definiert zu werden.

_Beachte, dass dies keine Funktionalität von React ist, sondern durch Bibliotheken von Dritten bereitgestellt wird._ React hat keine Meinung dazu, wie Styles definiert werden; im Zweifel ist es ein guter Anfang, die Styles wie gewohnt in separaten `*.css`-Dateien zu definieren und mittels [`className`](/docs/dom-elements.html#classname) zu verwenden.

### Kann ich in React Animationen verwenden? {#can-i-do-animations-in-react}

React kann für Animationen verwendet werden. Siehe dazu z.B. [React Transition Group](https://reactcommunity.org/react-transition-group/) und [React Motion](https://github.com/chenglou/react-motion), [React Spring](https://github.com/react-spring/react-spring) oder [Framer Motion](https://framer.com/motion).
