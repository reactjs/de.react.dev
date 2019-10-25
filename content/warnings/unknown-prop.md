---
title: Unknown Prop Warning
layout: single
permalink: warnings/unknown-prop.html
---
Die Warnung `unknown-prop` wird ausgelöst, wenn Sie versuchen, ein DOM-Element zu rendern. Sie sollten sicherstellen, dass Ihre DOM-Elemente keine herumschwebenden Sporenstützen haben.

Es gibt einige wahrscheinliche Gründe, warum diese Warnung angezeigt werden könnte:

1. Verwenden Sie `{...this.props}` oder `cloneElement(element, this.props)`? Ihre Komponente überträgt ihre eigenen Requisiten direkt auf ein untergeordnetes Element (eg. [transferring props](/docs/transferring-props.html)). Wenn Sie Requisiten an eine untergeordnete Komponente übertragen, sollten Sie sicherstellen, dass Sie nicht versehentlich Requisiten weiterleiten, die von der übergeordneten Komponente interpretiert werden sollen.

2. Sie verwenden ein nicht standardmäßiges DOM-Attribut auf einem nativen DOM-Knoten, um möglicherweise benutzerdefinierte Daten darzustellen. Wenn Sie versuchen, benutzerdefinierte Daten an ein Standard-DOM-Element anzuhängen, sollten Sie ein benutzerdefiniertes Datenattribut verwenden, wie [im MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes) beschrieben.

3. React erkennt das angegebene Attribut noch nicht. Dies wird wahrscheinlich in einer zukünftigen Version von React behoben. React entfernt jedoch derzeit alle unbekannten Attribute. Wenn Sie sie in Ihrer React-App angeben, werden sie nicht gerendert.

4. Sie verwenden eine React-Komponente ohne Großbuchstaben. React interpretiert es als DOM-Tag, da die [React JSX-Transformation die Groß- / Kleinschreibung verwendet, um zwischen benutzerdefinierten Komponenten und DOM-Tags zu unterscheiden](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

---

Um dies zu beheben, sollten Verbundkomponenten alle Requisiten "verbrauchen", die für die Verbundkomponente und nicht für die untergeordnete Komponente vorgesehen sind. Beispiel:

**Schlecht:** Unerwartetes `layout`-Prop wird an das `div`-Tag weitergeleitet.

```js
function MyDiv(props) {
  if (props.layout === 'horizontal') {
    // SCHLECHT! Weil Sie sicher wissen, dass "layout" keine Requisite ist, die <div> versteht.
    return <div {...props} style={getHorizontalStyle()} />
  } else {
    // SCHLECHT! Weil Sie sicher wissen, dass "layout" keine Requisite ist, die <div> versteht.
    return <div {...props} style={getVerticalStyle()} />
  }
}
```

**Gut:** Mit dem Spread-Operator können Sie Variablen von Requisiten abziehen und die verbleibenden Requisiten in eine Variable einfügen.

```js
function MyDiv(props) {
  const { layout, ...rest } = props
  if (layout === 'horizontal') {
    return <div {...rest} style={getHorizontalStyle()} />
  } else {
    return <div {...rest} style={getVerticalStyle()} />
  }
}
```

**Gut:** Sie können die Requisiten auch einem neuen Objekt zuweisen und die von Ihnen verwendeten Schlüssel aus dem neuen Objekt löschen. Achten Sie darauf, die Requisiten nicht aus dem ursprünglichen `this.props`-Objekt zu löschen, da dieses Objekt als unveränderlich angesehen werden sollte.

```js
function MyDiv(props) {

  const divProps = Object.assign({}, props);
  delete divProps.layout;

  if (props.layout === 'horizontal') {
    return <div {...divProps} style={getHorizontalStyle()} />
  } else {
    return <div {...divProps} style={getVerticalStyle()} />
  }
}
```
