---
id: hooks-custom
title: Erstelle deine eigenen Hooks
permalink: docs/hooks-custom.html
next: hooks-reference.html
prev: hooks-rules.html
---

*Hooks* sind ein neues Feature in React 16.8. Damit lassen sich State und andere React-Features verwenden, ohne dass eine Klasse benutzt werden muss.

Mithilfe eigener Hooks kannst du Komponenten-Logik in wiederverwendbare Funktionen auslagern.

Im Beispiel über das [Benutzen des Effect-Hooks](/docs/hooks-effect.html#example-using-hooks-1) haben wir die folgende Komponente aus einer Chat-Anwendung kennengelernt. Diese Komponente stellt mithilfe einer Nachricht den Online-Status eines Freundes dar:

```js{4-15}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

Nehmen wir an, dass unsere Chat-Anwendung auch eine Kontaktliste hat und wir die Namen der User die online sind in grün rendern wollen. Wir könnten die Logik des Beispiels oben einfach in unsere `FriendListItem`-Komponente kopieren, aber das wäre nicht ideal:

```js{4-15}
import React, { useState, useEffect } from 'react';

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

Stattdessen möchten wir diese Logik zwischen `FriendStatus` und `FriendListItem` teilen.

Bisher hatten wir bei React zwei Wege, um zustandsbezogene (engl. stateful) Logik zwischen zwei Komponenten zu teilen: [Render-Props](/docs/render-props.html) und [Higher-Order-Components](/docs/higher-order-components.html). Wir werden uns nun ansehen, wie Hooks viele der gleichen Probleme lösen und das, ohne neue Komponenten zum Komponenten-Baum hinzuzufügen.

## Extrahieren eines benutzerdefinierten Hooks {#extracting-a-custom-hook}

Wenn wir Logik zwischen zwei JavaScript-Funktionen teilen wollen, extrahieren wir sie in eine dritte Funktion. Sowohl Komponenten als auch Hooks sind Funktionen, also funktioniert dies auch für sie!

**Ein benutzerdefinierter Hook ist eine JavaScript-Funktion, deren Name mit "`use`" beginnt und die wiederum andere Hooks aufrufen kann.** Der `useFriendStatus`-Hook im Codebeispiel unten ist unser erster benutzerdefinierter Hook:

```js{3}
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

Darin ist nichts Neues enthalten - die Logik ist von den Komponenten oben kopiert. Genau wie in einer Komponente solltest du sicherstellen, dass du andere Hooks nur auf der obersten Ebene deines Hooks aufrufst.

Anders als eine React-Komponente muss ein Hook keine bestimmte Form haben. Wir können entscheiden, was er als Argumente annimmt, was er zurückgeben soll und ob er überhaupt etwas zurückgeben soll. Mit anderen Worten, er ist genau wie eine normale Funktion. Sein Name sollte immer mit `use` beginnen, damit man auf einen Blick erkennen kann, dass die [Regeln für Hooks](/docs/hooks-rules.html) für ihn gelten.


Der Zweck unseres `useFriendStatus` Hooks ist es, uns den Status eines Freundes zu melden. Deshalb nimmt er `friendID` als Argument und gibt zurück, ob dieser Freund online ist:

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}
```

Nun lass uns sehen, wie wir unseren benutzerdefinierten Hook verwenden können.

## Verwenden eines benutzerdefinierten Hooks {#using-a-custom-hook}

Am Anfang war es unser erklärtes Ziel, die doppelte Logik aus den Komponenten `FriendStatus` und `FriendListItem` zu entfernen. Beide wollen wissen, ob ein Freund online ist.

Jetzt, wo wir diese Logik in einen `useFriendStatus`-Hook extrahiert haben, können wir ihn *einfach verwenden:*

```js{2}
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```js{2}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

**Ist dieser Code äquivalent zu den Originalbeispielen?** Ja, er funktioniert auf genau dieselbe Weise. Wenn du genau hinsiehst, wirst du feststellen, dass wir keine Änderungen am Verhalten vorgenommen haben. Alles, was wir getan haben, war, etwas gemeinsamen Code zwischen zwei Funktionen in eine separate Funktion zu extrahieren. **Benutzerdefinierte Hooks sind eine Konvention, die natürlich aus dem Design von Hooks folgt, und kein React-Feature.**

**Muss ich meine benutzerdefinierten Hooks mit "`use`" beginnend benennen?** Bitte tu das. Diese Konvention ist sehr wichtig. Ohne sie wären wir nicht in der Lage, automatisch auf Verstöße gegen die [Regeln für Hooks](/docs/hookss-rules.html) zu prüfen, weil wir nicht erkennen könnten, ob eine bestimmte Funktion Aufrufe von Hooks in ihr enthält.

**Teilen zwei Komponenten, die den selben Hook verwenden, ihren Zustand?** Nein. Benutzerdefinierte Hooks sind ein Mechanismus zur Wiederverwendung von *Zustandslogik* (z. B. Einrichten eines Abonnements und Speichern des aktuellen Werts), aber jedes Mal, wenn du einen benutzerdefinierten Hook verwendest, sind alle Zustände und Effekte innerhalb des Hooks vollständig isoliert.

**Wie erhält ein benutzerdefinierter Hook einen isolierten State?** Jeder *Aufruf* eines Hooks erhält einen isolierten State. Weil wir `useFriendStatus` direkt aufrufen, ruft unsere Komponente aus Reacts Sicht nur `useState` und `useEffect` auf. Und wie wir [schon](/docs/hooks-state.html#tip-using-multiple-state-variables) [früher](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns) gelernt haben, können wir `useState` und `useEffect` viele Male in einer Komponente aufrufen, und sie werden völlig unabhängig voneinander sein.

### Tipp: Informationen zwischen Hooks weitergeben {#tip-pass-information-between-hooks}

Da Hooks Funktionen sind, können wir Information zwischen ihnen weitergeben.

Um dies zu veranschaulichen, verwenden wir eine andere Komponente aus unserem hypothetischen Chat-Beispiel. Sie ist eine Empfänger-Auswahl von Chatnachrichten, die anzeigt, ob der aktuell ausgewählte Freund online ist:

```js{8-9,13}
const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select
        value={recipientID}
        onChange={e => setRecipientID(Number(e.target.value))}
      >
        {friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
```

Wir behalten die aktuell ausgewählte Freund-ID in der State-Variable `recipientID` und aktualisieren sie, wenn der Benutzer einen anderen Freund im `<select>`-Element auswählt.

Da der `useState`-Hook den neuesten Wert der State-Variable `recipientID` liefert, können wir ihn als Argument an unseren benutzerdefinierten Hook "useFriendStatus" übergeben:

```js
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
```

Dies lässt uns wissen, ob der *aktuell ausgewählte* Freund online ist. Wenn wir einen anderen Freund auswählen und damit die State-Variable `recipientID` aktualisieren, wird unser `useFriendStatus`-Hook den zuvor ausgewählten Freund abmelden und den Status des neu ausgewählten Freundes abonnieren.
## `useYourImagination()` {#useyourimagination}

Benutzerdefinierte Hooks bieten eine Flexibilität die es vorher nicht gab und zwar Logik zwischen React-Komponenten zu teilen. Du kannst benutzerdefinierte Hooks schreiben, die eine breite Palette von Anwendungsfällen abdecken, wie z. B. Formularverarbeitung, Animation, Abonnements, Timer und wahrscheinlich noch viele mehr, die wir nicht berücksichtigt haben. Darüber hinaus kannst du Hooks erstellen, die genauso einfach zu bedienen sind wie die eingebauten Funktionen von React.

Versuche nicht zu früh Abstraktionsebenen hinzuzufügen. Jetzt, wo Funktionskomponenten mehr können, ist es wahrscheinlich, dass die durchschnittliche Funktionskomponente in deiner Codebase länger wird. Das ist vollkommen normal und heißt nicht, dass du sie sofort in Hooks herunterbrechen *musst*. Trotzdem solltest du damit anzufangen, Fälle zu erkennen, in denen ein benutzerdefinierter Hook komplexe Logik hinter einer einfachen Schnittstelle verstecken könnte oder dabei hilft, eine unübersichtliche Komponente zu entwirren.

Vielleicht hast du zum Beispiel eine komplexe Komponente, die eine Menge lokaler States enthält, die ad-hoc verwaltet werden. Mit `useState` wird die Zentralisierung der Aktualisierungslogik nicht einfacher, so dass du sie vielleicht lieber als [Redux](https://redux.js.org/)-Reducer schreiben:

```js
function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        text: action.text,
        completed: false
      }];
    // ... other actions ...
    default:
      return state;
  }
}
```

Reducer sind sehr einfach isoliert zu testen und eignen sich dazu, komplexe Aktualisierungslogik auszudrücken. Du kannst sie bei Bedarf weiter in kleinere Reducer aufteilen. Vielleicht genießt du aber auch die Vorteile der Verwendung des lokalen States von React oder willst einfach keine weitere Bibliothek installieren.

Was wäre, wenn wir einen `useReducer`-Hook schreiben könnten, der uns den *lokalen* State unserer Komponente mit einem Reducer verwalten lässt? Eine vereinfachte Version davon könnte wie folgt aussehen:

```js
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

Jetzt können wir den Hook in unserer Komponente verwenden und den Reducer ihren State verwalten lassen:

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```

Die Notwendigkeit, den lokalen State einer komplexen Komponente mit einem Reducer zu verwalten, ist so häufig, dass wir den `useReducer`-Hook direkt in React eingebaut haben. Du findest ihn zusammen mit anderen Standard-Hooks in der [Hooks-API-Referenz](/docs/hooks-reference.html).
