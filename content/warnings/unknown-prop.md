---
title: Unknown Prop Warning
layout: single
permalink: warnings/unknown-prop.html
---
Die Warnung `unknown-prop` wird ausgelöst, wenn du versuchst, ein DOM-Element mit einem Prop zu rendern, welches nicht von React als gültiges DOM-Attribut/Eigenschaft erkannt wird. Du solltest sicherstellen, dass deine DOM-Elemente keine falschen Props haben, die umherfliegen.

Es gibt einige wahrscheinliche Gründe, warum diese Warnung angezeigt werden könnte:

1. Verwendest du `{...this.props}` oder `cloneElement(element, this.props)`? Deine Komponente überträgt deine eigenen Requisiten direkt auf ein untergeordnetes Element (eg. [transferring props](/docs/transferring-props.html)). Wenn du Requisiten an eine untergeordnete Komponente übertragst, solltest du sicherstellen, dass du nicht versehentlich Requisiten weiterleitest, die von der übergeordneten Komponente interpretiert werden sollen.

2. Du verwendest ein nicht standardmäßiges DOM-Attribut auf einem nativen DOM-Knoten, um möglicherweise benutzerdefinierte Daten darzustellen. Wenn du versuchst, benutzerdefinierte Daten an ein Standard-DOM-Element anzuhängen, solltest du ein benutzerdefiniertes Datenattribut verwenden, wie [im MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes) beschrieben.

3. React erkennt das angegebene Attribut noch nicht. Dies wird wahrscheinlich in einer zukünftigen Version von React behoben. React entfernt jedoch derzeit alle unbekannten Attribute. Wenn du dich in deiner React-App angeben, werdest du nicht gerendert.

4. Du verwendest eine React-Komponente ohne Großbuchstaben. React interpretiert es als DOM-Tag, da die [React JSX-Transformation die Groß- / Kleinschreibung verwendet, um zwischen benutzerdefinierten Komponenten und DOM-Tags zu unterscheiden](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

---

Um dies zu beheben, sollten zusammengesetzte Komponenten alle Props "verbrauchen", die für die  zusammengesetzte Komponente und nicht für die untergeordnete Komponente vorgesehen sind. Beispiel:

**Schlecht:** Unerwartetes `layout`-Prop wird an das `div`-Tag weitergeleitet.

```js
function MyDiv(props) {
  if (props.layout === 'horizontal') {
    // SCHLECHT! Weil du sicher weißt, dass "layout" kein Prop ist, die <div> versteht.
    return <div {...props} style={getHorizontalStyle()} />
  } else {
    // SCHLECHT! Weil du sicher weißt, dass "layout" kein Prop ist, die <div> versteht.
    return <div {...props} style={getVerticalStyle()} />
  }
}
```

**Gut:** Mit dem Spread-Operator kannst du Variablen aus den Props herausziehen und die verbleibenden Props in eine Variable einfügen.

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

**Gut:** Du kannst die Requisiten auch einem neuen Objekt zuweisen und die von Ihnen verwendeten Schlüssel aus dem neuen Objekt löschen. Achtest du darauf, die Requisiten nicht aus dem ursprünglichen `this.props`-Objekt zu löschen, da dieses Objekt als unveränderlich angesehen werden sollte.

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
