---
id: addons
title: Add-Ons
permalink: docs/addons.html
---

> **Hinweis:**
>
> `React.addons` ist seit React v15.5 veraltet. Die Add-Ons sind in ein separates Modul verschoben worden und einige von ihnen nicht mehr dem neusten Stand.

React Add-Ons sind eine Ansammlung von nützlichen Modulen für das Erstellen von React-Apps. **Sie sollten aber als "experimentell" betrachtet werden**, da es sein kann, dass sie sich häufiger als React-Core ändern.

- [`createFragment`](/docs/create-fragment.html), um eine Menge von mit Schlüssel versehenden Kind-Elementen zu erstellen.

Die unten stehenden Add-Ons sind nur in der Entwicklungsversion (nicht minimiert und optimiert) von React integriert:

- [`Perf`](/docs/perf.html), ein Tool um Optimierungsmöglickeiten in der Performance zu finden.
- [`ReactTestUtils`](/docs/test-utils.html), kleine einfache Hilfsmittel zum Schreiben von Tests.

###  Add-on Altlasten {#legacy-add-ons}

Die unten stehenden Add-Ons gelten als Altlasten aus vorherigen Versionen. Sie werden wahrscheinlich noch in zukünftigen React-Versionen funktionieren, aber nicht mehr aktiv weiterentwickelt.

- [`PureRenderMixin`](/docs/pure-render-mixin.html). Benutze stattdessen [`React.PureComponent`](/docs/react-api.html#reactpurecomponent).
- [`shallowCompare`](/docs/shallow-compare.html), eine Hilfsfunktion, die dich durch das oberflächliche Vergleichen von props und states entscheiden lässt, ob eine Komponente aktualisiert werden soll oder nicht. Wir empfehlen dir aber stattdessen lieber  [`React.PureComponent`](/docs/react-api.html#reactpurecomponent) zu benutzen.
- [`update`](/docs/update.html). Benutze stattdessen [`kolodny/immutability-helper`](https://github.com/kolodny/immutability-helper).
- [`ReactDOMFactories`](https://www.npmjs.com/package/react-dom-factories), vorkonfigurierte DOM-Factories um es einfacher zu machen, React ohne JSX zu verwenden.

### Veraltete Add-Ons {#deprecated-add-ons}

- [`LinkedStateMixin`](/docs/two-way-binding-helpers.html) ist veraltet.
- [`TransitionGroup` und `CSSTransitionGroup`](/docs/animation.html) sind veraltet, da sie durch [ein Modul der Community](https://github.com/reactjs/react-transition-group/tree/v1-stable) ersetzt worden sind.

## React mit Add-Ons verwenden {#using-react-with-add-ons}

Du kannst die Add-Ons einzeln über npm (z. B. `npm install react-addons-create-fragment`) installieren und importieren:

```javascript
import createFragment from 'react-addons-create-fragment'; // ES6
var createFragment = require('react-addons-create-fragment'); // ES5 mit npm
```
Du kannst `react-with-addons.js` anstelle von `react.js` benutzen, wenn du React 15 oder einer frühere Version über ein CDN beziehst.

```html
<script src="https://unpkg.com/react@15/dist/react-with-addons.js"></script>
```

Die Add-Ons werden über `React.addons` global verfügbar sein (z. B. `React.addons.TestUtils`).
