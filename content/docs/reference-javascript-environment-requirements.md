---
id: javascript-environment-requirements
title: Anforderungen an die JavaScript-Umgebung
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

React 18 supports all modern browsers (Edge, Firefox, Chrome, Safari, etc).

If you support older browsers and devices such as Internet Explorer which do not provide modern browser features natively or have non-compliant implementations, consider including a global polyfill in your bundled application.

Here is a list of the modern features React 18 uses:
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

<<<<<<< HEAD
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
=======
The correct polyfill for these features depend on your environment. For many users, you can configure your [Browserlist](https://github.com/browserslist/browserslist) settings. For others, you may need to import polyfills like [`core-js`](https://github.com/zloirock/core-js) directly.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1
