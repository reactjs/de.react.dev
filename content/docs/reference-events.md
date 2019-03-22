---
id: events
title: Synthetisches Event
permalink: docs/events.html
layout: docs
category: Referenz
---

Dieser Referenzleitfaden dokumentiert den `SyntheticEvent` Wrapper, welcher einen Bestandteil des Eventsystems von React darstellt.
. Siehe [Handhabung von Events](/docs/handling-events.html) für mehr Informationen zu diesem Thema.

## Übersicht {#overview}

Die Eventhandler stellen eine Instanz des synthetischen Events dar, ein browserübergreifender Wrapper für das native Eventobjekt des Browsers. Das Interface vom synthetischen Event ist ident zu dem nativen Event des Browsers, inklusive `stopPropagation()` und `preventDefault()`. Eine Besonderheit der synthetischen Events ist jedoch die identische Funktionsweise in allen Browsern.

Falls aus irgendeinem Grund der Zugriff auf das native Browserevent notwendig ist, kann dieses mittels `nativeEvent` Attributs abgerufen werden. Jedes `SyntheticEvent` Objekt hat folgende Attribute:

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
> Ab der Version 0.14 führt die Rückgabe des Wertes `false` von einem Eventhandler nicht zu einer Unterbrechung der Eventkette. Stattdessen soll `e.stopPropagation() oder `e.preventDefault()` explizit aufgerufen werden.

### Event Poolbildung {#event-pooling}

Das synthetische Event wird aus einem Eventpool entnommen. Im konkreten Fall bedeutet dies, dass das Objekt welches das synthetische Event repräsentiert, wiederverwendet wird und alle Eigenschafen nach dem Aufruf des Eventcallbacks nullifiziert werden.
Diese Umsetzung bringt eine bessere Performance mit sich.
Somit ist es ein asynchroner Zugriff auf das Event nicht möglich.

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

  // Das Exportieren der Eventeigenschaften ist trotzdem möglich.
  this.setState({eventType: event.type});
}
```

> Hinweis:
>
> Wenn ein asynchroner Zugriff notwendig ist, kann dies durch den Aufruf von `event.persist()` auf dem Eventobjekt erfolgen. Dies führt zu der Entfernung des syntethischen Events aus dem Eventpool und erlaubt die Verwendung der Eventreferenzen.

## Unterstützte Events {#supported-events}

React führt eine Normalisierung der Events durch, damit dessen Eigenschaften konsistent und Browserübergreifend sind.

Die folgenden Eventhandler werden von einem Event in der Bubbling-Phase ausgelöst. Um ein Eventhandler für die Capture-Phase zu registrieren, muss `Capture` zum Eventnamen hinzugefügt werden; Bepsiel: Anstatt `onClick`, würde man `onClickCapture` für das Handling des Events in der Capture-Phase benutzen.

- [Zwischenablage Events](#clipboard-events)
- [Composition Events](#composition-events)
- [Tastatur Events](#keyboard-events)
- [Fokus Events](#focus-events)
- [Form Events](#form-events)
- [Maus Events](#mouse-events)
- [Pointer Events](#pointer-events)
- [Auswahl Events](#selection-events)
- [Touch Events](#touch-events)
- [UI Events](#ui-events)
- [Wheel Events](#wheel-events)
- [Media Events](#media-events)
- [Bild Events](#image-events)
- [Animation Events](#animation-events)
- [Transition Events](#transition-events)
- [Other Events](#other-events)

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

### Composition Events {#composition-events}

Event names:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

Properties:

```javascript
string data

```

* * *

### Keyboard Events {#keyboard-events}

Event names:

```
onKeyDown onKeyPress onKeyUp
```

Properties:

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

### Focus Events {#focus-events}

Event names:

```
onFocus onBlur
```

These focus events work on all elements in the React DOM, not just form elements.

Properties:

```javascript
DOMEventTarget relatedTarget
```

* * *

### Form Events {#form-events}

Event names:

```
onChange onInput onInvalid onSubmit
```

For more information about the onChange event, see [Forms](/docs/forms.html).

* * *

### Mouse Events {#mouse-events}

Event names:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

The `onMouseEnter` and `onMouseLeave` events propagate from the element being left to the one being entered instead of ordinary bubbling and do not have a capture phase.

Properties:

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

### Pointer Events {#pointer-events}

Event names:

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

The `onPointerEnter` and `onPointerLeave` events propagate from the element being left to the one being entered instead of ordinary bubbling and do not have a capture phase.

Properties:

As defined in the [W3 spec](https://www.w3.org/TR/pointerevents/), pointer events extend [Mouse Events](#mouse-events) with the following properties:

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

A note on cross-browser support:

Pointer events are not yet supported in every browser (at the time of writing this article, supported browsers include: Chrome, Firefox, Edge, and Internet Explorer). React deliberately does not polyfill support for other browsers because a standard-conform polyfill would significantly increase the bundle size of `react-dom`.

If your application requires pointer events, we recommend adding a third party pointer event polyfill.

* * *

### Selection Events {#selection-events}

Event names:

```
onSelect
```

* * *

### Touch Events {#touch-events}

Event names:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

Properties:

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

Event names:

```
onScroll
```

Properties:

```javascript
number detail
DOMAbstractView view
```

* * *

### Wheel Events {#wheel-events}

Event names:

```
onWheel
```

Properties:

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### Media Events {#media-events}

Event names:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### Image Events {#image-events}

Event names:

```
onLoad onError
```

* * *

### Animation Events {#animation-events}

Event names:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

Properties:

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### Transition Events {#transition-events}

Event names:

```
onTransitionEnd
```

Properties:

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### Other Events {#other-events}

Event names:

```
onToggle
```
