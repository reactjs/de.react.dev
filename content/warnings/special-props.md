---
title: Special Props Warning
layout: single
permalink: warnings/special-props.html
---

Die meisten Attribute bei JSX Elementen werden zur Komponente weitergegeben, allerdings gibt es zwei spezielle Attribute (`ref` und `key`), welche von React genutzt und daher nicht zur Komponente weitergegeben werden.

Versuchst du beispielsweise `this.props.key` innerhalb einer Komponente zu nutzen (z.B. in der `render` Funktion oder in den [propTypes](/docs/typechecking-with-proptypes.html#proptypes)), ist dieses Feld nicht definiert. Wenn du diesen Wert an eine Subkomponente weitergeben möchtest, nutze ein anderes Attribut (bspw. `<ListItemWrapper key={result.id} id={result.id} />`). Auch wenn es redundant scheint ist es wichtig die Anwendungs- von der Darstellungslogik zu trennen.
