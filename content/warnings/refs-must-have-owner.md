---
title: Refs Must Have Owner Warning
layout: single
permalink: warnings/refs-must-have-owner.html
---

Du bist wahrscheinlich hier, weil eine der folgenden Fehlermeldungen angezeigt wird:

*React 16.0.0+*
> Warning:
>
> Element ref was specified as a string (myRefName) but no owner was set. You may have multiple copies of React loaded. (details: https://fb.me/react-refs-must-have-owner).

*frühere Versionen von React*
> Warning:
>
> addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component's `render` method, or you have multiple copies of React loaded.

Dies bedeutet normalerweise eines von drei Dingen:

- Du versuchst, einer Funktionskomponente ein `ref` hinzuzufügen.
- Du versuchst, einem Element, das außerhalb der render() Funktion einer Komponente erstellt wird, ein `ref` hinzuzufügen.
- Du hast mehrere (in Konflikt stehende) Kopien von React geladen (z. B. aufgrund einer falsch konfigurierten npm-Abhängigkeit)

## Refs auf Funktionskomponenten {#refs-on-function-components}

Wenn `<Foo>` eine Funktionskomponente ist, kannst du kein `ref` hinzufügen:

```js
// Doesn't work if Foo is a function!
<Foo ref={foo} />
```

Wenn du einer Komponente einen `ref` hinzufügen musst, konvertiere ihn zuerst in eine Klasse, oder verwende kein `ref`, da diese [selten erforderlich](/docs/refs-and-the-dom.html#when-to-use-refs) sind.

## String Refs außerhalb der Rendermethode {#strings-refs-outside-the-render-method}

Dies bedeutet normalerweise, dass du versuchst, einer Komponente, die keinen Eigentümer hat (dh nicht innerhalb der `render` Methode einer anderen Komponente erstellt wurde), einen `ref` hinzuzufügen. Zum Beispiel, dies funktioniert nicht:

```js
// Doesn't work!
ReactDOM.render(<App ref="app" />, el);
```

Versuchst du, diese Komponente in einer neuen Komponente der obersten Ebene zu rendern, die den `ref` enthält. Alternativ kannst du einen Rückruf `ref` verwenden:

```js
let app;
ReactDOM.render(
  <App ref={inst => {
    app = inst;
  }} />,
  el
);
```

Überlegst du, ob du [wirklich eine Referenz benötigst](/docs/refs-and-the-dom.html#when-to-use-refs), bevor du diesen Ansatz verwendest.

## Mehrere Kopien von React {#multiple-copies-of-react}

Bower leistet gute Arbeit bei der Deduplizierung von Abhängigkeiten, npm jedoch nicht. Wenn du mit `ref` nichts (Lustiges) machst, liegt das Problem wahrscheinlich nicht an deinen `ref`, sondern eher daran, dass mehrere Kopien von React in dein Projekt geladen wurden. Wenn du ein Modul eines Drittanbieters über npm aufrufst, erhaltest du manchmal eine doppelte Kopie der Abhängigkeitsbibliothek, was zu Problemen führen kann.

Wenn du npm verwendest, kann `npm ls` oder `npm ls react` zum Aufleuchten beitragen.
