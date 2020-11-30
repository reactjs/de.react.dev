---
id: dom-elements
title: DOM Elemente
layout: docs
category: Reference
permalink: docs/dom-elements.html
redirect_from:
  - "docs/tags-and-attributes.html"
  - "docs/dom-differences.html"
  - "docs/special-non-dom-attributes.html"
  - "docs/class-name-manipulation.html"
  - "tips/inline-styles.html"
  - "tips/style-props-value-px.html"
  - "tips/dangerously-set-inner-html.html"
---

React implementiert ein browserunabhängiges DOM-System für Performance und browser-übergreifende Kompatibilität. Wir haben die Gelegenheit genutzt, um ein paar Ecken und Kanten in der DOM-Implementation der Browser zu bereinigen.

In React sollen alle DOM Eigenschaften und Attribute (einschließlich Event-Handler) in camelCase geschrieben sein. Das HTML-Attribut `tabindex` entspricht zum Beispiel dem Attribut `tabIndex` in React. Ausnahmen sind die `aria-*` und `data-*` Attribute, welche kleingeschrieben werden sollen. Beispielsweise kannst du in React weiterhin `aria-label` für das HTML-Attribut `aria-label` verwenden.

## Unterschiede bei Attributen {#differences-in-attributes}

Es gibt eine Reihe von Attributen, die in React anders funktionieren als in HTML:

### checked {#checked}

Das `checked` Attribut wird von `<input>` Komponenten des Typs `checkbox` oder `radio` unterstützt. Du kannst es benutzen, um festzulegen, ob die Komponente angekreuzt ist oder nicht. Das ist nützlich, um kontrollierte Komponenten zu erstellen. `defaultChecked` ist das unkontrollierte Äquivalent, welches festlegt, ob die Komponente angekreuzt ist, wenn sie erstmals gemounted wird.

### className {#classname}

Benutze das `className` Attribut, um eine CSS-Klasse anzugeben. Das trifft auf alle regulären DOM- und SVG-Elemente wie zum Beispiel `<div>` oder `<a>` zu.

Benutze stattdessen das `class` Attribut, wenn du React mit Web-Komponenten benutzt (was ungewöhnlich ist).

### dangerouslySetInnerHTML {#dangerouslysetinnerhtml}

`dangerouslySetInnerHTML` ist der Ersatz von React für die Benutzung von `innerHTML` im Browser-DOM. Im Allgemeinen ist es riskant, HTML aus dem Programmcode heraus zu manipulieren, da es einfach ist, unbeabsichtigt Benutzer einem [cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) Angriff auszusetzen. Deshalb ist es zwar möglich, HTML direkt aus React heraus zu manipulieren, man muss dafür aber `dangerouslySetInnerHTML` schreiben und ein Objekt mit `__html` als Schlüssel mitgeben, um sich daran zu erinnern, dass es gefährlich ist. Zum Beispiel:

```js
function createMarkup() {
  return {__html: 'Erstens &middot; Zweitens'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

### htmlFor {#htmlfor}

Da `for` ein für JavaScript reserviertes Wort ist, verwenden React-Elemente stattdessen `htmlFor`.

### onChange {#onchange}

Das `onChange` Event verhält sich, wie es zu erwarten ist: wann immer sich das Feld eines Formulars ändert, wird dieser Event ausgelöst. Wir verwenden absichtlich nicht das bereits existierende Verhalten des Browsers, da `onChange` keine passende Bezeichnung für dessen Verhalten ist. React verlässt sich auf dieses Event, um Eingaben des Users in Echtzeit zu bearbeiten.

### selected {#selected}

Setze den Wert des `value`-Attributs deines `<select>`-Elements, wenn du eine `<option>` als ausgewählt markieren willst. Eine ausführliche Bschreibung findest du unter ["Das Select-Tag"](/docs/forms.html#the-select-tag).

### style {#style}

>Hinweis
>
>Einige Beispiele in der Dokumentation verwenden `style` der Einfachheit halber. **Allerdings wird es nicht empfohlen, das `style` Attribut als das primäre Mittel für das Styling einzusetzen.** In den meisten Fällen sollte [`className`](#classname) benutzt werden, um Klassen in einem externen CSS-Stylesheet zu referenzieren. `style` wird in React-Anwendungen hauptsächlich dazu eingesetzt, um dynamisch berechnete Styles während des Renderings hinzuzufügen. Siehe auch [FAQ: Styling und CSS](/docs/faq-styling.html).

Das `style `Attribut akzeptiert ein JavaScript-Objekt mit in camelCase geschriebenen Attributen, anstelle von einem CSS String. Dies ist konsistent mit dem DOM `style` Attribut. Es ist effizienter und verhindert XSS Sicherheitslücken. Zum Beispiel:

```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hallo Welt!</div>;
}
```

Beachte, dass die Styles nicht automatisch einen Präfix erhalten. Um ältere Browser zu unterstüzen, musst du die passenden Style-Eigenschaften zur Verfügung stellen:

```js
const divStyle = {
  WebkitTransition: 'all', // beachte den Großbuchstaben 'W' hier
  msTransition: 'all' // 'ms' ist der einzige browserspezifische Prefix mit einem Kleinbuchstaben
};

function ComponentWithTransition() {
  return <div style={divStyle}>Dies sollte browserübergreifend funktionieren</div>;
}
```

Style-Keys sind in camelCase geschrieben, um beim Zugriff auf die Eigenschaften eines DOM Knotens von JS aus (z.B. `node.style.backgroundImage`) konsistent zu sein. Browserspezifische Prefixes [abgesehen von `ms`](https://www.andismith.com/blogs/2012/02/modernizr-prefixed/) sollten mit einem Großbuchstaben beginnen. Darum beginnt `WebkitTransition` mit einem großen "W".

React fügt automatisch einen "px" Suffix zu bestimmten numerischen inline Style-Eigenschaften hinzu. Wenn du andere Einheiten als "px" verwenden willst, kannst du den Wert als String mit der gewünschten Einheit angeben. Zum Beispiel:

```js
// Resultierender Style: '10px'
<div style={{ height: 10 }}>
  Hallo Welt!
</div>

// Resultierender Style: '10%'
<div style={{ height: '10%' }}>
  Hallo Welt!
</div>
```

Allerdings werden nicht alle Style-Eigenschaften zu Pixel-Strings konvertiert. Einigen Eigenschaften (z.B. `zoom`, `order` oder `flex`) wird keine Einheit zugewiesen. Die komplette Liste von Eigenschaften ohne Einheit kann [hier](https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js#L15-L59) gefunden werden.

### suppressContentEditableWarning {#suppresscontenteditablewarning}

Im Normalfall gibt es eine Warnung, wenn ein Element mit Kindern ebenfalls als `contentEditable` gekennzeichnet ist, da dies nicht funktionieren kann. Dieses Attribut unterdrückt diese Warnung. Verwende es nicht, außer du entwickelst eine Bibliothek wie [Draft.js](https://facebook.github.io/draft-js/), die `contentEditable` manuell verwaltet.

### suppressHydrationWarning {#suppresshydrationwarning}

Wenn du serverseitiges Rendering für React benutzt, gibt es im Normalfall eine Warnung, wenn der Server und der Client unterschiedliche Inhalte rendern. Allerdings ist es in seltenen Fällen sehr schwierig oder gar unmöglich eine exakte Übereinstimmung zu garantieren. Beispielsweise Timestamps können zwischen Server und Client voneinander abweichen.

Wenn du `suppressHydrationWarning` auf `true` setzt, wird React dich nicht mehr über nicht übereinstimmende Attribute und Inhalte des Elementes warnen. Dies funktioniert allerdings nur eine Stufe tief und soll lediglich in ganz bestimmten Fällen wenn es wirklich notwendig ist genutzt werden. Du kannst mehr über dieses Feature in der [`ReactDOM.hydrate()` Dokumentation](/docs/react-dom.html#hydrate) erfahren.

### value {#value}

Das `value` Attribut wird  von `<input>` und `<textarea>` Komponenten unterstützt. Du kannst es benutzen, um den Wert einer Komponente zu setzen. Dies ist nützlich, um kontrollierte Komponenten zu erstellen. `defaultValue` ist das unkontrollierte Äquivalent, welches den Wert der Komponente setzt, wenn sie erstmals gemountet wird.

## Alle unterstützen HTML Attribute {#all-supported-html-attributes}

Ab React 16 werden alle standardmäßigen oder [oder benutzerdefinierten](/blog/2017/09/08/dom-attributes-in-react-16.html) DOM-Attribute vollständig unterstützt.

React hat dem DOM schon immer eine auf JavaScript ausgerichtete API zur Verfügung gestellt. Da React-Komponenten oft eigene und dem DOM zugehörige Props brauchen, verwendet React, wie die DOM-APIs, die `camelCase` Konvention:

```js
<<<<<<< HEAD
<div tabIndex="-1" />      // Genau wie node.tabIndex DOM-API
<div className="Button" /> // Genau wie node.className DOM-API
<input readOnly={true} />  // Genau wie node.readOnly DOM-API
=======
<div tabIndex={-1} />      // Just like node.tabIndex DOM API
<div className="Button" /> // Just like node.className DOM API
<input readOnly={true} />  // Just like node.readOnly DOM API
>>>>>>> 5e437a10ed4e89cd5eaf990ce4f43e0857592b53
```

Diese Props funktionieren ähnlich wie die entsprechenden HTML-Attribute mit Ausnahme von den untenstehenden Sonderfällen.

Einige der von React unterstützten DOM-Attribute sind unter anderem:

```
accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap
```

Ebenso werden alle SVG-Attribute von React vollständig unterstützt:

```
accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
clip clipPath clipPathUnits clipRule colorInterpolation
colorInterpolationFilters colorProfile colorRendering contentScriptType
contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
end exponent externalResourcesRequired fill fillOpacity fillRule filter
filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
limitingConeAngle local markerEnd markerHeight markerMid markerStart
markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
numOctaves offset opacity operator order orient orientation origin overflow
overlinePosition overlineThickness paintOrder panose1 pathLength
patternContentUnits patternTransform patternUnits pointerEvents points
pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
spacing specularConstant specularExponent speed spreadMethod startOffset
stdDeviation stemh stemv stitchTiles stopColor stopOpacity
strikethroughPosition strikethroughThickness string stroke strokeDasharray
strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
textDecoration textLength textRendering to transform u1 u2 underlinePosition
underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase
xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
```

Du kannst auch benutzerdefinierte Attribute verwenden, sofern diese kleingeschrieben werden.
