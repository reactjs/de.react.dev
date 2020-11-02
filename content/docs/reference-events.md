---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

Dieser Referenzleitfaden dokumentiert den `SyntheticEvent` Wrapper, welcher einen Bestandteil des Eventsystems von React darstellt. Siehe [Handhabung von Events](/docs/handling-events.html) für mehr Informationen zu diesem Thema.

## Übersicht {#overview}

Deine Event-Handler werden Instanzen von `SyntheticEvent`,  einem browserübergreifender Wrapper für das native Event-Objekt des Browsers. Das Interface ist zu dem des Browsers nativen Event identisch, inklusive `stopPropagation()` und `preventDefault()`. Eine Besonderheit von `SyntheticEvent` ist jedoch die identische Funktionsweise in allen Browsern.

Falls aus irgendeinem Grund der Zugriff auf das native Browser-Event notwendig ist, kann dieses mittels dem `nativeEvent`-Attribut abgerufen werden. Die Synthetic-Events unterscheiden sich von den nativen Events des Browsers und bilden diese nicht direkt ab. Zum Beispiel wird in `onMouseLeave` `event.nativeEvent` auf ein `mouseout`-Ereignis verweisen. Die spezifische Zuordnung ist nicht Teil der öffentlichen API und kann sich jederzeit ändern. Jedes `SyntheticEvent`-Objekt hat folgende Attribute:

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
void persist()
DOMEventTarget target
number timeStamp
string type
```

> Hinweis:
>
> Ab v17, macht `e.persist()` nichts mehr, da `SyntheticEvent` nicht mehr [gepoolt](/docs/legacy-event-pooling.html) wird.

> Hinweis:
>
> Ab der Version 0.14 führt die Rückgabe des Wertes `false` von einem Eventhandler nicht zu einer Unterbrechung der Eventkette. Stattdessen soll `e.stopPropagation()` oder `e.preventDefault()` explizit aufgerufen werden.

## Unterstützte Events {#supported-events}

React führt eine Normalisierung der Events durch, damit dessen Eigenschaften konsistent und Browserübergreifend sind.

Folgende Eventhandler werden von einem Event in der Bubbling-Phase ausgelöst. Um ein Eventhandler für die Capture-Phase zu registrieren, muss `Capture` zum Eventnamen hinzugefügt werden; Beispiel: Anstatt `onClick`, würde man `onClickCapture` für das Handling des Events in der Capture-Phase benutzen.

- [Zwischenablage Events](#clipboard-events)
- [Komposition Events](#composition-events)
- [Tastatur Events](#keyboard-events)
- [Fokus Events](#focus-events)
- [Formular Events](#form-events)
- [Generische Events](#generic-events)
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

Die Eigenschaft `key` kann jeden der in der [DOM Level 3 Events spec] (https://www.w3.org/TR/uievents-key/#named-key-attribute-values) dokumentierten Werte annehmen.

* * *

### Fokus Events {#focus-events}

Eventnamen:

```
onFocus onBlur
```

Diese Fokus Events gelten für alle Elemente von React DOM, nicht nur für Formular-Elemente.

Eigenschaften:

```js
DOMEventTarget relatedTarget
```

#### onFocus {#onfocus}

The `onFocus` event is called when the element (or some element inside of it) receives focus. For example, it's called when the user clicks on a text input.

```javascript
function Example() {
  return (
    <input
      onFocus={(e) => {
        console.log('Focused on input');
      }}
      placeholder="onFocus is triggered when you click this input."
    />
  )
}
```

#### onBlur {#onblur}

The `onBlur` event handler is called when focus has left the element (or left some element inside of it). For example, it's called when the user clicks outside of a focused text input.

```javascript
function Example() {
  return (
    <input
      onBlur={(e) => {
        console.log('Triggered because this input lost focus');
      }}
      placeholder="onBlur is triggered when you click this input and then you click outside of it."
    />
  )
}
```

#### Detecting Focus Entering and Leaving {#detecting-focus-entering-and-leaving}

You can use the `currentTarget` and `relatedTarget` to differentiate if the focusing or blurring events originated from _outside_ of the parent element. Here is a demo you can copy and paste that shows how to detect focusing a child, focusing the element itself, and focus entering or leaving the whole subtree.

```javascript
function Example() {
  return (
    <div
      tabIndex={1}
      onFocus={(e) => {
        if (e.currentTarget === e.target) {
          console.log('focused self');
        } else {
          console.log('focused child', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus entered self');
        }
      }}
      onBlur={(e) => {
        if (e.currentTarget === e.target) {
          console.log('unfocused self');
        } else {
          console.log('unfocused child', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus left self');
        }
      }}
    >
      <input id="1" />
      <input id="2" />
    </div>
  );
}
```

* * *

### Formular Events {#form-events}

Eventnamen:

```
onChange onInput onInvalid onReset onSubmit 
```

Für detaillierte Beschreibung des onChange Events, siehe [Formulare](/docs/forms.html).

* * *

### Generic Events {#generic-events}

Event names:

```
onError onLoad
```

* * *

### Maus Events {#mouse-events}

Eventnamen:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

Anstatt des gewöhnlichen Bubblings werden die `onMouseEnter` und `onMouseLeave` -Events, vom verlassenen Element, zum betretenden Element weitergegeben. Sie haben auch keine Capture-Phase.

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

>Hinweis
>
>Beginnend mit React 17, wird das `onScroll`-Event **nicht mehr nach oben gegeben (bubbling)**. Dies entspricht dem Verhalten des Browsers und verhindert die Verwirrung, wenn ein verschachteltes scrollbares Element, Events auf einem entfernten übergeordneten Element auslöst.

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
