---
id: code-splitting
title: Code-Aufteilung
permalink: docs/code-splitting.html
---

## Bundling {#bundling}

Die meisten React Anwendungen haben ihre Dateien durch Tools wie [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) oder [Browserify](http://browserify.org/) zusammenführen lassen.
Bundling nennt sich der Prozess, in dem importierte Dateien zu einer Datei zusammengefügt werden: ein "Bündel (engl. bundle)". Dieses Bundle kann dann in eine Webseite eingebettet werden um eine komplette Anwendung auf einmal zu laden.

#### Beispiel {#example}

**App:**

```js
// app.js
import { add } from './math.js';

console.log(add(16, 26)); // 42
```

```js
// math.js
export function add(a, b) {
  return a + b;
}
```

**Bündel:**

```js
function add(a, b) {
  return a + b;
}

console.log(add(16, 26)); // 42
```

> Hinweis:
>
> Deine Bundles werden am Ende ganz anders aussehen als das hier.

Wenn du [Create React App](https://github.com/facebookincubator/create-react-app), [Next.js](https://github.com/zeit/next.js/), [Gatsby](https://www.gatsbyjs.org/), oder ein ähnliches Tool benutzt, wirdt du ein Webpack-Setup haben welches sofort einsatzbereit ist um deine Anwendung zu
bundlen.

Wenn nicht, musst du das Bundling selbst einrichten. Siehe z. B. die Abschnitte
[Installation](https://webpack.js.org/guides/installation/) und
[Erste Schritte](https://webpack.js.org/guides/getting-started/) in der
Webpack-Dokumentation.

## Code-Splitting {#code-splitting}

Bundling ist großartig, aber sobald deine Anwendung wächst, wird dein Bundle es auch.
Insbesondere wenn du größere Bibliotheken von Drittanbietern einbeziehst. Du musst
ein Auge auf den Code haben, den du im Bundle enthälst, damit du ihn nicht versehentlich
so groß machst und deine Anwendung zu lange Zeit zum Laden benötigt.

Um zu vermeiden, dass du mit einem großen Bundle endest, ist es gut, dem Problem
voraus zu sein und mit dem "Aufteilen" seines Bundles zu beginnen.
Code-Splitting ist eine Funktion, die von Bundlern wie [Webpack](https://webpack.js.org/guides/code-splitting/), [Rollup](https://rollupjs.org/guide/en/#code-splitting) und Browserify unterstützt wird (via
[factor-bundle](https://github.com/browserify/factor-bundle)) und kann dadruch mehrere Bundles erzeugen,
die zur Laufzeit dynamisch geladen werden können.

Code-Splitting deiner Anwendung kann dir Helfen genau die Dinge "lazy zu laden",
die der Benutzer gerade benötigt, was die Performance deiner Anwendung drastisch
verbessern kann. Du hast zwar die Gesamtmenge an Code nicht verringert, du hast aber
das Laden von Code vermieden, den der Benutzer möglicherweise nie benötigen wird, zusätzlich
reduzierst du die Menge an Code die benötigt wird beim initialen Laden.

## `import()` {#import}

Der beste Weg Code-Splitting in deiner Anwendung einzuführen, ist durch die dynamische
`import()`-Syntax.

**Vorher:**

```js
import { add } from './math';

console.log(add(16, 26));
```

**Nachher:**

```js
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

> Hinweis:
>
> Die dynamische `import()`-Syntax ist ein ECMAScript (JavaScript)
> [Vorschlag](https://github.com/tc39/proposal-dynamic-import) der aktuell nicht
> Teil des Sprachenstandards ist. Es wird
> The dynamic `import()` syntax is a ECMAScript (JavaScript)
> [proposal](https://github.com/tc39/proposal-dynamic-import) not currently
> part of the language standard. Es wird erwartet, dass dieser in naher Zukunft
> akzeptiert wird.

Wenn Webpack auf diese Syntax stößt, fängt es automatisch mit dem Code-Splitting
deiner Anwendung an. Wenn du Create-React-App verwendest, ist dies alles vorkonfiguriert und du kannst [direkt loslegen](https://facebook.github.io/create-react-app/docs/code-splitting).
[Next.js](https://github.com/zeit/next.js/#dynamic-import) unterstützt dies auch direkt out of the box.

Wenn du Webpack selbst einrichtest, wirst du wahrschenlich Webpack's
[Code-Splitting Leitfaden](https://webpack.js.org/guides/code-splitting/) lesem wollen. Deine Webpack-Konfiguration sollte in etwa [so aussehen](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269).

Wenn du [Babel](https://babeljs.io/) verwendest, müsstest du sicherstellen, dass Babel
die Dynamic-Import-Syntax parsen kann, sie aber nicht transformiert. Für all die benötigst du [babel-plugin-syntax-dynamic-import](https://yarnpkg.com/en/package/babel-plugin-syntax-dynamic-import).

## `React.lazy` {#reactlazy}

> Hinweis:
>
> `React.lazy` und Suspense sind noch nicht für das serverseitige Rendering verfügbar. Wenn du Code-Splitting von deiner serverseitig gerenderten Anwendung durchführen möchtest, empfehlen wir dir [Loadable Components](https://github.com/smooth-code/loadable-components). Es gibt einen schönen [Leitfaden für das Bundle-Splitting mit serverseitigem Rendern](https://github.com/smooth-code/loadable-components/blob/master/packages/server/README.md).

Mit der Funktion `React.lazy` kannst du einen dynamischen Import als reguläre Komponente rendern.

**Before:**

```js
import OtherComponent from './OtherComponent';
```

**After:**

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

Dadurch wird automatisch das Bundle geladen, dass `OtherComponent` enthält, wenn die Komponente das erste Mal gerendert wird.

`React.lazy` nimmt eine Funktion entgegen, die tein dynamisches `import()` aufrufen muss. Dies muss ein `Promise` zurückgeben, welches eine Modul auflöst, dass eine React-Komponenten im `default` Export enthält.

Die Lazy-Komponente sollte dann in einer `Suspense`-Komponente gerendert werden, was es uns ermöglicht ein wenig Fallback-Inhalt anzuzeigen (z. B. eine Ladeanzeige), während wir darauf warten, dass die Lazy-Komponente lädt.

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

Das `fallback`-Prop akzeptiert jede React-Element, die du rendern möchtest, während du drauf wartest, dass die Komponente geladen wird. Du kannst die `Suspense`-Komponente überall über der Lazy-Komponente platzieren. Du kannst sogar mehrere Lazy-Komponenten mit einer einzigen `Suspense`-Komponente umhüllen.

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

### Fehlergrenzen {#error-boundaries}

Wenn das andere Modul nicht lädt (z. B. aufgrund eines Netzwerkausfalls), löst es einen Fehler aus. Du kannst diese Fehler behandeln, um eine schönere Benutzererfahrung zu bieten und die Wiederherstellung mit [Fehlergrenzen](/docs/error-boundaries.html) zu verwalten. Sobald du deine Fehlergrenze erstellt hast, kannst du sie überall über deinen Lazy-Komponenten verwenden, um einen Fehlerstatus anzuzeigem, wenn ein Netzwerkfehler vorliegt.

```js
import MyErrorBoundary from './MyErrorBoundary';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

## Routen basiertes Code-Splitting {#route-based-code-splitting}

Deciding where in your app to introduce code splitting can be a bit tricky. You
want to make sure you choose places that will split bundles evenly, but won't
disrupt the user experience.

A good place to start is with routes. Most people on the web are used to
page transitions taking some amount of time to load. You also tend to be
re-rendering the entire page at once so your users are unlikely to be
interacting with other elements on the page at the same time.

Here's an example of how to setup route-based code splitting into your app using
libraries like [React Router](https://reacttraining.com/react-router/) with `React.lazy`.

```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

## Benannte Exporte {#named-exports}

`React.lazy` unterstützt derzeit nur `default` Exporte. Wenn das Module, welches du importieren möchtest benannte `exports` enthält, kannst du ein Zwischenmodul erstellen, das es als `default` wieder exportiert. Dies stellt sicher, dass das Tree-Shaking weiter funktioniert und es keine unbenutzten Komponenten mit einbezieht.

```js
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
```

```js
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
```

```js
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```
