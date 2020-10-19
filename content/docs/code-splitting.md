---
id: code-splitting
title: Code-Aufteilung
permalink: docs/code-splitting.html
---

## Bundling {#bundling}

<<<<<<< HEAD
Die meisten React Anwendungen werden ihre Dateien durch Tools wie [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) oder [Browserify](http://browserify.org/) zusammengeführt haben.
Bundling nennt sich der Prozess, in dem importierte Dateien zu einer Datei zusammengefügt werden: ein "Bündel (engl. bundle)". Dieses Bundle kann dann in eine Webseite eingebettet werden um eine komplette Anwendung auf einmal zu laden.
=======
Most React apps will have their files "bundled" using tools like [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) or [Browserify](http://browserify.org/). Bundling is the process of following imported files and merging them into a single file: a "bundle". This bundle can then be included on a webpage to load an entire app at once.
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

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

<<<<<<< HEAD
Wenn du [Create React App](https://create-react-app.dev/), [Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.org/), oder ein ähnliches Tool benutzt, wirst du ein Webpack-Setup haben welches sofort einsatzbereit ist um deine Anwendung zu
bundlen.

Wenn nicht, musst du das Bundling selbst einrichten. Siehe z. B. die Abschnitte
[Installation](https://webpack.js.org/guides/installation/) und
[Erste Schritte](https://webpack.js.org/guides/getting-started/) in der
Webpack-Dokumentation.
=======
If you're using [Create React App](https://create-react-app.dev/), [Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.org/), or a similar tool, you will have a Webpack setup out of the box to bundle your app.

If you aren't, you'll need to setup bundling yourself. For example, see the [Installation](https://webpack.js.org/guides/installation/) and [Getting Started](https://webpack.js.org/guides/getting-started/) guides on the Webpack docs.
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

## Code-Splitting {#code-splitting}

<<<<<<< HEAD
Bundling ist großartig, aber sobald deine Anwendung wächst, wird dein Bundle es auch.
Insbesondere wenn du größere Bibliotheken von Drittanbietern einbeziehst. Du musst
ein Auge auf den Code haben, den du im Bundle hast, damit du ihn nicht versehentlich
so groß machst und deine Anwendung zu lange zum Laden benötigt.

Um zu vermeiden, dass du mit einem großen Bundle endest, ist es gut, dem Problem
voraus zu sein und mit dem "Splitten" (dt. aufteilen) deines Bundles zu beginnen.
Code-Splitting ist eine Funktion, die von Bundlern wie [Webpack](https://webpack.js.org/guides/code-splitting/), [Rollup](https://rollupjs.org/guide/en/#code-splitting) und Browserify unterstützt wird (via
[factor-bundle](https://github.com/browserify/factor-bundle)). Durch sie werden mehrere Bundles erzeugt,
die zur Laufzeit dynamisch geladen werden können.

Code-Splitting deiner Anwendung kann dir helfen genau die Dinge "lazy zu laden",
die der Benutzer gerade benötigt, was die Performance deiner Anwendung drastisch
verbessern kann. Du hast zwar die Gesamtmenge an Code nicht verringert, aber du hast
das Laden von Code vermieden, den der Benutzer möglicherweise nie brauchen wird. Zusätzlich
reduzierst du die Menge an Code beim initialen Laden.

## `import()` {#import}

Der beste Weg Code-Splitting in deiner Anwendung einzuführen, ist durch die dynamische
`import()`-Syntax.
=======
Bundling is great, but as your app grows, your bundle will grow too. Especially if you are including large third-party libraries. You need to keep an eye on the code you are including in your bundle so that you don't accidentally make it so large that your app takes a long time to load.

To avoid winding up with a large bundle, it's good to get ahead of the problem and start "splitting" your bundle. Code-Splitting is a feature
supported by bundlers like [Webpack](https://webpack.js.org/guides/code-splitting/), [Rollup](https://rollupjs.org/guide/en/#code-splitting) and Browserify (via [factor-bundle](https://github.com/browserify/factor-bundle)) which can create multiple bundles that can be dynamically loaded at runtime.

Code-splitting your app can help you "lazy-load" just the things that are currently needed by the user, which can dramatically improve the performance of your app. While you haven't reduced the overall amount of code in your app, you've avoided loading code that the user may never need, and reduced the amount of code needed during the initial load.

## `import()` {#import}

The best way to introduce code-splitting into your app is through the dynamic `import()` syntax.
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

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

<<<<<<< HEAD
Wenn Webpack auf diese Syntax stößt, fängt es automatisch mit dem Code-Splitting
deiner Anwendung an. Wenn du Create-React-App verwendest, ist dies alles vorkonfiguriert
und du kannst [direkt loslegen](https://create-react-app.dev/docs/code-splitting/).
[Next.js](https://nextjs.org/docs/advanced-features/dynamic-import) unterstützt dies auch direkt out of the box.

Wenn du Webpack selbst einrichtest, wirst du wahrschenlich Webpack's
[Code-Splitting Leitfaden](https://webpack.js.org/guides/code-splitting/) lesen wollen. Deine Webpack-Konfiguration sollte in etwa [so aussehen](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269).

Wenn du [Babel](https://babeljs.io/) verwendest, müsstest du sicherstellen, dass Babel
die Dynamic-Import-Syntax parsen kann, sie aber nicht transformiert. Für all das benötigst du [@babel/plugin-syntax-dynamic-import](https://classic.yarnpkg.com/en/package/@babel/plugin-syntax-dynamic-import).
=======
When Webpack comes across this syntax, it automatically starts code-splitting your app. If you're using Create React App, this is already configured for you and you can [start using it](https://create-react-app.dev/docs/code-splitting/) immediately. It's also supported out of the box in [Next.js](https://nextjs.org/docs/advanced-features/dynamic-import).

If you're setting up Webpack yourself, you'll probably want to read Webpack's [guide on code splitting](https://webpack.js.org/guides/code-splitting/). Your Webpack config should look vaguely [like this](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269).

When using [Babel](https://babeljs.io/), you'll need to make sure that Babel can parse the dynamic import syntax but is not transforming it. For that you will need [@babel/plugin-syntax-dynamic-import](https://classic.yarnpkg.com/en/package/@babel/plugin-syntax-dynamic-import).
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

## `React.lazy` {#reactlazy}

> Hinweis:
>
> `React.lazy` und Suspense sind noch nicht für das serverseitige Rendering verfügbar. Wenn du Code-Splitting von deiner serverseitig gerenderten Anwendung durchführen möchtest, empfehlen wir dir [Loadable Components](https://github.com/gregberge/loadable-components). Es gibt einen schönen [Leitfaden für das Bundle-Splitting mit serverseitigem Rendern](https://loadable-components.com/docs/server-side-rendering/).

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

`React.lazy` nimmt eine Funktion entgegen, die ein dynamisches `import()` aufrufen muss. Dies muss ein `Promise` zurückgeben, welches eine Modul auflöst, dass eine React-Komponenten im `default` Export enthält.

Die Lazy-Komponente sollte dann in einer `Suspense`-Komponente gerendert werden, was es uns ermöglicht ein wenig Fallback-Inhalt anzuzeigen (z. B. eine Ladeanzeige), während wir darauf warten, dass die Lazy-Komponente lädt.

```js
import React, { Suspense } from 'react';

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

Das `fallback`-Prop akzeptiert jedes React-Element, das du rendern möchtest, während du drauf wartest, dass die Komponente geladen wird. Du kannst die `Suspense`-Komponente überall über der Lazy-Komponente platzieren. Du kannst sogar mehrere Lazy-Komponenten mit einer einzigen `Suspense`-Komponente umhüllen.

```js
import React, { Suspense } from 'react';

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

Wenn das andere Modul nicht lädt (z. B. aufgrund eines Netzwerkausfalls), löst es einen Fehler aus. Du kannst diese Fehler behandeln, um eine schönere Benutzererfahrung zu bieten und die Wiederherstellung mit [Fehlergrenzen](/docs/error-boundaries.html) zu verwalten. Sobald du deine Fehlergrenze erstellt hast, kannst du sie überall oberhalb deinen Lazy-Komponenten verwenden, um einen Fehlerstatus anzuzeigem, wenn ein Netzwerkfehler vorliegt.

```js
import React, { Suspense } from 'react';
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

<<<<<<< HEAD
Die Entscheidung wo in deiner Anwendung Code-Splitting einzuführen ist, kann etwas schwierig sein.
Du solltest sicherstellen, dass du Orte wählst, die die Bundles gleichmäßig splitten, aber nicht
die Benutzererfahrung beeinträchtigen.

Ein guter Ausgangspunkt sind Routen. Die meisten Leute im Web sind es
gewohnt Page-Transitions zu erstellen, die einige Zeit zum Laden benötigen.
Sie neigen auch dazu, die gesamte Seite auf einmal neu zu rendern, so dass die Benutzer
wahrscheinlich nicht gleichzeitig mit anderen Elementen auf der Seite interagieren.

Hier ist ein Beispiel wie du ein routenbasiertes Code-Splitting in deiner Anwendung
mit Hilfe von Bibliotheken, wie [React Router](https://reacttraining.com/react-router/) mit `React.lazy` einrichtest.
=======
Deciding where in your app to introduce code splitting can be a bit tricky. You want to make sure you choose places that will split bundles evenly, but won't disrupt the user experience.

A good place to start is with routes. Most people on the web are used to page transitions taking some amount of time to load. You also tend to be re-rendering the entire page at once so your users are unlikely to be interacting with other elements on the page at the same time.

Here's an example of how to setup route-based code splitting into your app using libraries like [React Router](https://reacttraining.com/react-router/) with `React.lazy`.
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Lade...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

## Benannte Exporte {#named-exports}

`React.lazy` unterstützt derzeit nur `default` Exporte. Wenn das Modul, das du importieren möchtest, benannte `exports` enthält, kannst du ein Zwischenmodul erstellen, das es als `default` wieder exportiert. Dies stellt sicher, dass das Tree-Shaking weiter funktioniert und es keine unbenutzten Komponenten mit einbezieht.

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
