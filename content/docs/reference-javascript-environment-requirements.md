---
id: javascript-environment-requirements
title: Anforderungen an die JavaScript-Umgebung
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

<<<<<<< HEAD
React 16 ist von den Objekten [Map](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Map) und [Set](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Set) abhängig.
Wenn du ältere Browser oder Geräte unterstützen möchtest, die diese Funktionaltät nicht implementiert haben (z. B. IE < 11) oder nicht Standardkonform sind (z. B. IE 11), dann solltest du einen globalen
Polyfill wie z. B. [core-js](https://github.com/zloirock/core-js) oder [babel-polyfill](https://babeljs.io/docs/usage/polyfill/), in deine gebaute Anwendung laden.
=======
React 16 depends on the collection types [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). If you support older browsers and devices which may not yet provide these natively (e.g. IE < 11) or which have non-compliant implementations (e.g. IE 11), consider including a global polyfill in your bundled application, such as [core-js](https://github.com/zloirock/core-js).
>>>>>>> 957276e1e92bb48e5bb6b1c17fd0e7a559de0748

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
