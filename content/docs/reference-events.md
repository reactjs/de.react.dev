---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Referenz
---

Dieser Referenzleitfaden dokumentiert den `SyntheticEvent` Wrapper, welcher einen Bestandteil des Eventsystems von React darstellt. Siehe [Handhabung von Events](/docs/handling-events.html) für mehr Informationen zu diesem Thema.

## Übersicht {#overview}

Die Eventhandler stellen eine Instanz von `SyntheticEvent` dar, ein browserübergreifender Wrapper für das native Eventobjekt des Browsers. Das Interface ist identisch zu dem nativen Event des Browsers, inklusive `stopPropagation()` und `preventDefault()`. Eine Besonderheit von `SyntheticEvent` ist jedoch die identische Funktionsweise in allen Browsern.

Falls aus irgendeinem Grund der Zugriff auf das native Browser-Event notwendig ist, kann dieses mittels dem `nativeEvent`-Attribut abgerufen werden. Jedes `SyntheticEvent` Objekt hat folgende Attribute:

```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```

> Hinweis:
>
> Ab der Version 0.14 führt die Rückgabe des Wertes `false` von einem Eventhandler nicht zu einer Unterbrechung der Eventkette. Stattdessen soll `e.stopPropagation()` oder `e.preventDefault()` explizit aufgerufen werden.

### Event-Pooling {#event-pooling}

Das  `SyntheticEvent` wird aus einem Event-Pool entnommen. Im konkreten Fall bedeutet dies, dass das Objekt welches das  `SyntheticEvent` repräsentiert, wiederverwendet wird und alle Eigenschafen nach dem Aufruf des Event-Callbacks nullifiziert werden. Diese Umsetzung bringt eine bessere Performance mit sich. Somit ist ein asynchroner Zugriff auf das Event nicht möglich.

```javascript
function onClick(event) {
  console.log(event); // => nullifiziertes Objekt.
  console.log(event.type); // => "Klick"
  const eventType = event.type; // => "Klick"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "Klick"
  }, 0);

  // Dies wird nicht funktionieren. this.state.clickEvent wird nur null Werte beinhalten.
  this.setState({clickEvent: event});

  // Das Exportieren der Eigentschaften des Events ist trotzdem möglich.
  this.setState({eventType: event.type});
}
```

> Hinweis:
>
> Wenn ein asynchroner Zugriff notwendig ist, kann dies durch den Aufruf von `event.persist()` auf dem Eventobjekt erfolgen. Dies führt zu der Entfernung des syntethischen Events aus dem Eventpool und erlaubt die Verwendung der Eventreferenzen.

## Unterstützte Events {#supported-events}

React führt eine Normalisierung der Events durch, damit dessen Eigenschaften konsistent und Browserübergreifend sind.

Folgende Eventhandler werden von einem Event in der Bubbling-Phase ausgelöst. Um ein Eventhandler für die Capture-Phase zu registrieren, muss `Capture` zum Eventnamen hinzugefügt werden; Beispiel: Anstatt `onClick`, würde man `onClickCapture` für das Handling des Events in der Capture-Phase benutzen.

- [Zwischenablage Events](#clipboard-events)
- [Komposition Events](#composition-events)
- [Tastatur Events](#keyboard-events)
- [Fokus Events](#focus-events)
- [Formular Events](#form-events)
- [Maus Events](#mouse-events)
- [Pointer Events](#pointer-events)
- [Auswahl Events](#selection-events)
- [Touch Events](#touch-events)
- [UI Events](#ui-events)
- [Mausrad Events](#wheel-events)
- [Medien Events](#media-events)
- [Bild Events](#image-events)
- [Animation Events](#animation-events)
- [Transition Events](#transition-events)
- [Sonstige Events](#other-events)

* * *

## Referenz {#reference}

### Zwischenablage Events {#clipboard-events}

Eventnamen:

```
onCopy onCut onPaste
```

Eigenschaften:

```javascript
DOMDataTransfer clipboardData
```

* * *

### Komposition Events {#composition-events}

Eventnamen:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

Eigenschaften:

```javascript
string data

```

* * *

### Tastatur Events {#keyboard-events}

Eventnamen:

```
onKeyDown onKeyPress onKeyUp
```

Eigenschaften:

```javascript
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

The `key` property can take any of the values documented in the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values).

* * *

### Fokus Events {#focus-events}

Eventnamen:

```
onFocus onBlur
```

Diese Fokus Events gelten für alle Elemente von React DOM, nicht nur für Formular-Elemente.

Eigenschaften:

```javascript
DOMEventTarget relatedTarget
```

* * *

### Formular Events {#form-events}

Eventnamen:

```
onChange onInput onInvalid onSubmit
```

Für detaillierte Beschreibung des onChange Events, siehe [Formulare](/docs/forms.html).

* * *

### Maus Events {#mouse-events}

Eventnamen:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

Die `onMouseEnter` und `onMouseLeave` Events breiten sich vom verlassenen Element zu eintretenden aus, statt dem üblichen Propagieren der DOM-Hierarchie nach oben. Des Weiteren besitzen die Events keine Erfassungsphase.

Eigenschaften:

```javascript
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

* * *

### Pointer-Events {#pointer-events}

Eventnamen:

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

Die `onPointerEnter` und `onPointerLeave` Events breiten sich vom verlassenen Element zu eintretenden aus, statt dem üblichen Propagieren der DOM-Hierarchie nach oben. Des Weiteren besitzen die Events keine Erfassungsphase.

Eigenschaften:

Wie in der [W3 Spezifikation](https://www.w3.org/TR/pointerevents/) definiert, werden die [Maus-Events](#mouse-events) durch Pointer-Events mit folgenden Eigenschaften erweitert:

```javascript
number pointerId
number width
number height
number pressure
number tangentialPressure
number tiltX
number tiltY
number twist
string pointerType
boolean isPrimary
```

Hinweis bezüglich cross-browser Unterstützung:

Pointer-Events werden noch nicht von jedem Browser unterstützt (zur Zeit der Verfassung dieses Artikels wurden folgende Browser unterstützt: Chrome, Firefox, Edge und Internet Explorer). React verzichtet bewusst auf den Polyfill Support für andere Browser, da eine standard-konforme Polyfill Lösung den Umfang des `react-dom` Bündels deutlich steigern würde.

Wenn deine Applikation Pointer-Events voraussetzt, wäre es ratsam einen Pointer-Event Polyfill eines Drittanbieters zu nutzen.

* * *

### Auswahl Events {#selection-events}

Eventnamen:

```
onSelect
```

* * *

### Touch Events {#touch-events}

Eventnamen:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

Eigenschaften:

```javascript
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
```

* * *

### UI Events {#ui-events}

Eventnamen:

```
onScroll
```

Eigenschaften:

```javascript
number detail
DOMAbstractView view
```

* * *

### Mausrad Events {#wheel-events}

Eventnamen:

```
onWheel
```

Eigenschaften:

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### Medien Events {#media-events}

Eventnamen:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### Bild Events {#image-events}

Eventnamen:

```
onLoad onError
```

* * *

### Animation Events {#animation-events}

Eventnamen:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

Eigenschaften:

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### Transition Events {#transition-events}

Eventnamen:

```
onTransitionEnd
```

Eigenschaften:

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### Sonstige Events {#other-events}

Eventnamen:

```
onToggle
```
