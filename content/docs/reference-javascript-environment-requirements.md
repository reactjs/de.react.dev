---
id: javascript-environment-requirements
title: Anforderungen an die JavaScript-Umgebung
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

React 16 ist von den Objekten [Map](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Map) und [Set](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Set) abhängig.
Wenn du ältere Browser oder Geräte unterstützen möchtest, die diese Funktionaltät nicht implementiert haben (z. B. IE < 11) oder nicht Standardkonform sind (z. B. IE 11), dann solltest du einen globalen Polyfill wie z. B. [core-js](https://github.com/zloirock/core-js), in deine gebaute Anwendung laden.

Eine Anwendung für React 16 sollte wie folgt aussehen, wenn sie mit der Hilfe von
core-js gepolyfilled wird um älteren Browsern zur Verfügung gestellt zu werden:

```js
import 'core-js/es/map';
import 'core-js/es/set';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hallo Welt!</h1>,
  document.getElementById('root')
);
```

React ist auch von `requestAnimationFrame` abhängig (sogar in Testumgebungen).
Du kannst [raf](https://www.npmjs.com/package/raf) benutzen um `requestAnimationFrame` zu unterdrücken:

```js
import 'raf/polyfill';
```
