---
id: hooks-rules
title: Regeln von Hooks
permalink: docs/hooks-rules.html
next: hooks-custom.html
prev: hooks-effect.html
---

*Hooks* sind ein neues Feature in React 16.8. Damit lassen sich State und andere React-Features verwenden, ohne dass eine Klasse benutzt werden muss.

Hooks sind zwar JavaScript Funtionen, allerdings müssen dabei zwei Regeln beachtet werden. Es gibt ein [Linter-Plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks), das die folgenden Regeln erzwingt:

### Verwende Hooks nur auf dem Top-Level {#only-call-hooks-at-the-top-level}

**Rufe Hooks nicht innerhalb von Schleifen, Bedingungen oder in verschachtelten Funktionen auf.** Sie sollen ausschließlich auf dem Top-Level der React-Komponenten verwendet werden. Dadurch wird sichergestellt, dass die Hooks bei jedem Rendering der Komponente in der gleichen Reihenfolge ausgeführt werden. Das ist notwendig, damit zwischen mehreren Aufrufen von `useState` und `useEffect` der State korrekt erhalten bleibt. (Für Neugierige gibt es [unten](#explanation) eine ausführliche Erklärung.)

### Verwende Hooks nur innerhalb von React-Funktionen {#only-call-hooks-from-react-functions}

**Rufe Hooks nicht in normalen JavaScript-Funktionen auf.**  Stattdessen kannst du:

* ✅ Hooks in React-Funktions-Komponenten aufrufen.
* ✅ Hooks in eigenen Hooks aufrufen (Mehr dazu auf der [nächsten Seite](/docs/hooks-custom.html)).

Durch das Befolgen dieser Regeln stellst du sicher, dass die State-behaftete Logik einer Komponente aus dem Quellcode auf Anhieb erkennbar ist.

## ESLint Plugin {#eslint-plugin}

Wir haben das ESLint-Plugin [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) veröffentlicht, das diese Regeln durchsetzt. Du kannst dieses Plugin folgendermaßen zu deinem Projekt hinzufügen, falls du es ausprobieren möchtest:

This plugin is included by default in [Create React App](/docs/create-a-new-react-app.html#create-react-app).

```bash
npm install eslint-plugin-react-hooks --save-dev
```

```js
// ESLint Konfiguration
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
}
```

**Du kannst den den Rest überspringen, wenn du direkt lernen möchtest wie man [seine eigenen Hooks](/docs/hooks-custom.html) schreibt.** Im Folgenden werden die Gründe für die oben genannten Regeln noch genauer erläutert.

## Erklärung {#explanation}

Wie [zuvor erklärt](/docs/hooks-state.html#tip-using-multiple-state-variables), können mehrere State- oder Effect-Hooks in einer Komponente verwendet werden.

```js
function Form() {
  // 1. State-Variable name
  const [name, setName] = useState('Mary');

  // 2. Effect damit formData erhalten bleibt
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. State-Variable surname
  const [surname, setSurname] = useState('Poppins');

  // 4. Effect um den Titel zu aktualisieren
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```

Aber warum funktioniert es, dass immer genau der richtige State bei `useState` benutzt wird? Die Antwort darauf lautet, dass **React die Reihenfolge, in der Hooks aufgerufen werden, nutzt**.  Das Beispiel funktioniert, da bei jedem Rendering die Hooks in der gleichen Reihenfolge aufgerufen werden.

```js
// ------------
// Erstes Rendering
// ------------
useState('Mary')           // 1. Die State-Variable name mit 'Mary' initialisieren
useEffect(persistForm)     // 2. Effect hinzufügen, um das Formular persistent zu halten
useState('Poppins')        // 3. Die State-Variable surname mit 'Poppins' initialisieren
useEffect(updateTitle)     // 4. Effect hinzufügen, um den Titel zu aktualisieren

// -------------
// Zweites Rendering
// -------------
useState('Mary')           // 1. Die State-Variable name auslesen (Das Argument wird ignoriert)
useEffect(persistForm)     // 2. Den Effect ersetzen, der das Formular persistent hält
useState('Poppins')        // 3. Die State-Variable surname auslesen (Das Argument wird ignoriert)
useEffect(updateTitle)     // 4. Den Effect ersetzen, der den Titel aktualisiert

// ...
```

Solange die Reihenfolge der Hooks-Aufrufe zwischen den Rendering's gleich bleibt, kann React den richtigen lokalen State mit dem entsprechenden Hook assoziieren. Aber was passiert nun, wenn ein Hook (zum Beispiel der `persistForm` Effect) innerhalb einer bedingten Anweisung aufgerufen wird?

```js
  // 🔴 Die erste Regel wird gebrochen, indem wir ein Hook innerhalb einer bedingten Anweisung benutzt wird.
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
```

Bei dem ersten Rendering ist die Bedingung `name !== ''` `true`, also führen wir diesen Hook aus. Im nächsten Rendering könnte der Nutzer das Formular löschen, damit wäre die Bedingung `false`. Folglich würde im nächsten Rendering der Hook übersprungen, und die Reihenfolge würde sich ändern:

```js
useState('Mary')           // 1. Die State-Variable name auslesen (Das Argument wird ignoriert)
// useEffect(persistForm)  // 🔴 Dieser Hook wurde ausgelassen.
useState('Poppins')        // 🔴 2 (vorher 3). State-Variable surname kann nicht ausgelesen werden
useEffect(updateTitle)     // 🔴 3 (vorher 4). Der Effect kann nicht ersetzt werden
```

React erwartet hier, dass der zweite Hook `persistForm` entspricht. Ist das nicht der Fall, kann React nicht den korrekten State zurückgeben. Für alle Rendering's nach dem ausgelassenen Hook, verschiebt sich der Hook-Aufruf und führt zu Fehlern.

**Das ist der Grund, weshalb Hooks nur auf dem Top-Level der Komponenten aufgerufen werden sollen**. Ein Hook kann bedingt ausgeführt werden, indem die Bedingung *innerhalb* des Hooks ausgeführt wird.

```js
  useEffect(function persistForm() {
    // 👍 Die erste Regel wird so nicht mehr gebrochen.
    if (name !== '') {
      localStorage.setItem('formData', name);
    }
  });
```

**Das Problem muss nicht beachtet werden, wenn die [ESLint-Regeln] integriert werden (https://www.npmjs.com/package/eslint-plugin-react-hooks).** Jetzt weißt du aber auch *warum* es so funktioniert und welche Probleme durch diese Regel vermieden werden. 

## Nächste Schritte {#next-steps}

Nun ist es Zeit zu lernen wie man [seine eigenen Hooks](/docs/hooks-custom.html) schreibt. Das ist nützlich um State-behaftete Logik zwischen Komponenten zu teilen, wobei eigene Abstraktionen mit den von React bereitgestellten Hooks kombiniert werden können. 
