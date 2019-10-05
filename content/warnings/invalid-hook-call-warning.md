---
title: Invalid Hook Call Warning
layout: single
permalink: warnings/invalid-hook-call-warning.html
---

Du bist vermutlich wegen der folgenden Fehlermeldung hier:

> Hooks can only be called inside the body of a function component.

Es gibt drei häufige Gründe warum du diese Meldung angezeigt bekommst:

1. Du nutzt **unterschiedliche Versionen** von React und React DOM.
2. Du **verletzt die [Regeln von Hooks](/docs/hooks-rules.html)**.
3. Du hast vielleicht **mehrere React Versionen** in der selben Anwendung.

Sehen wir uns die unterschiedlichen Ursachen im Detail an.

## Unterschiedliche Versionen von React und React DOM {#mismatching-versions-of-react-and-react-dom}

Du nutzt eventuell eine Version von `react-dom` (< 16.8.0) oder `react-native` (< 0.59), die Hooks noch nicht unterstützt. Um das zu prüfen, führe `npm ls react-dom` oder `npm ls react-native` im Ordner deiner Anwendung aus und prüfe welche Version du nutzt. Wenn du mehr als eine Version nutzt, kann das andere Probleme nach sich ziehen (mehr dazu weiter unten).

## Verletzen der Regeln von Hooks {#breaking-the-rules-of-hooks}

Du kannst Hooks nur aufrufen **während React eine React-Funktions-Komponente rendert**:

* ✅ Rufe sie ganz oben im Rumpf von React-Funktions-Komponente auf.
* ✅ Rufe sie ganz oben im Rumpf von [eigenen Hooks](/docs/hooks-custom.html) auf.

**Mehr dazu in den [Regeln von Hooks](/docs/hooks-rules.html).**

```js{2-3,8-9}
function Counter() {
  // ✅ Gut: ganz oben in einer React-Funktions-Komponente
  const [count, setCount] = useState(0);
  // ...
}

function useWindowWidth() {
  // ✅ Gut: ganz oben in einem eigenen Hook
  const [width, setWidth] = useState(window.innerWidth);
  // ...
}
```

Um Missverständnisse zu vermeiden ist es **nicht** möglich Hooks anders aufzurufen:

* 🔴 Rufe Hooks nicht in Klassenkomponenten auf.
* 🔴 Rufe Hooks nicht in Eventhandlern auf.
* 🔴 Rufe Hooks nicht in Funktionen auf, die an `useMemo`, `useReducer` oder `useEffect` übergeben werden.

Wenn du diese Regeln verletzt, siehst du möglicherweise diesen Fehler.

```js{3-4,11-12,20-21}
function Schlecht1() {
  function handleClick() {
    // 🔴 Schlecht: innerhalb eines Eventhandlers (zum Beheben den Aufruf nach außen ziehen)
    const theme = useContext(ThemeContext);
  }
  // ...
}

function Schlecht2() {
  const style = useMemo(() => {
    // 🔴 Schlecht: innerhalb von useMemo (zum Beheben den Aufruf nach außen ziehen)
    const theme = useContext(ThemeContext);
    return createStyle(theme);
  });
  // ...
}

class Schlecht3 extends React.Component {
  render() {
    // 🔴 Schlecht: innerhalb einer Klassenkomponente
    useEffect(() => {})
    // ...
  }
}
```

Du kannst das [`eslint-plugin-react-hooks` Plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) nutzen um einige dieser Fehler zu finden.

>Beachte
>
>[Eigene Hooks](/docs/hooks-custom.html) *dürfen* andere Hooks aufrufen (das ist ihr Sinn), da eigene Hooks auch nur während dem Rendern einer React-Funktions-Komponente aufgerufen werden dürfen.

## Mehrere React Versionen {#duplicate-react}

Damit Hooks funktionieren muss der `react` Import in deiner Anwendung zur selben Version vom `react` Import im `react-dom` Paket aufgelöst werden.

Wenn diese Imports zu zwei verschiedenen Exports aufgelöst werden, siehst du diese Warnung, zum Beispiel wenn du zufällig **zwei Versionen** des `react` Pakets hast.

Wenn du NPM als Paketmanager nutzt, kannst du das mit dem folgenden Befehl von deinem Projektordner aus testen:

    npm ls react

Wenn React mehr als einmal gelistet wird, dann musst du herausfinden warum das passiert und deine Projektabhängigkeiten beheben. Beispielsweise kann eine deiner Bibliotheken `react` fälschlicherweise als *dependency* (statt als *peer dependency*) deklarieren. Bis diese Bibliothek den Fehler behebt kannst du versuchen das Problem mittels [Yarn resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/) zu vermeiden.

Du kannst außerdem versuchen das Problem mittels Hinzufügen von Logging oder dem Neustart deines Entwicklungsservers zu ermitteln:

```js
// Füge das zu node_modules/react-dom/index.js hinzu
window.React1 = require('react');

// Füge das zu deiner Komponente hinzu
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);
```

Wenn dadurch `false` ausgegeben wird, dann hast du eventuell zwei Reacts und musst herausfinden warum das passiert. [Diese Diskussion](https://github.com/facebook/react/issues/13991) enthält einige häufige Gründe, auf die die Community gestoßen ist.

Das Problem kann zudem auftreten wenn du `npm link` oder Ähnliches verwendest. In diesem Fall könnte dein Bundler zwei Reacts finden, eines im Projektfolder und eines im Ordner einer Bibliothek. Angenommen, `myapp` und `mylib` befinden sich im selben Ordner, eine mögliche Lösung ist `npm link ../myapp/node_modules/react` von `mylib` auszuführen, wodurch die Bibliothek das React des Projektordners nutzt.

>Beachte
>
>React unterstützt das Verwenden mehrerer verschiedener Versionen auf einer Seite (beispielsweise wenn eine Anwendung und ein Drittanbieter-Element sie nutzen). Der Fehler tritt nur auf wenn `require('react')` zu verschiedenen Versionen in einer Komponente und in `react-dom` aufgelöst werden.

## Andere Gründe {#other-causes}

Wenn dir keiner der obigen Gründe geholfen hat, kommentiere bitte in [diesem Thread](https://github.com/facebook/react/issues/13991) und wir werden versuchen dir zu helfen. Versuche ein kleines Beispiel zu erstellen, welches den Fehler hervorruft - eventuell findest du dein Problem dabei.
