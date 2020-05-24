---
id: hooks-state
title: Benutzen der State Hook
permalink: docs/hooks-state.html
next: hooks-effect.html
prev: hooks-overview.html
---

*Hooks* sind ein neues Feature in React 16.8. Damit lassen sich State und andere React Features nutzen, ohne dass eine Klasse geschrieben werden muss.

Die [Einführungsseite](/docs/hooks-intro.html) verwendete dieses Beispiel um dir einen Ersteinblick in die Hooks zu bieten:

```js{4-5}
import React, { useState } from 'react';

function Example() {
  // Deklariere eine neue State Variable, die wir "count" nennen werden
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Du hast mich {count} mal geklickt</p>
      <button onClick={() => setCount(count + 1)}>
        Klick mich
      </button>
    </div>
  );
}
```

Wir beginnen mit dem Lernprozess über Hooks, indem wir diesen Code mit einem entsprechenden Klassenbeispiel vergleichen.

## Gleichwertiges Klassenbeispiel {#equivalent-class-example}

Falls du bereits mit den React-Klassen vertraut bist, dann sollte dir der nachfolgende Code bekannt vorkommen:

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>du hast mich {this.state.count} mal geklickt</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Klick mich
        </button>
      </div>
    );
  }
}
```

Der State startet mit `{ count: 0 }` und wir erhöhen `state.count`, wenn der Benutzer auf einen Button klickt, indem `this.setState()`aufgerufen wird. Nachfolgend werden wir auf der gesamten Seite Ausschnitte aus dieser Klasse verwenden.

>Hinweis
>
>Du fragst dich vielleicht, warum wir hier einen Zähler anstelle eines realistischeren Beispiels verwenden. Damit wollen wir uns vorerst auf die API konzentrieren, während wir noch unsere ersten Schritte mit den Hooks machen.

## Hooks und Funktionskomponenten {#hooks-and-function-components}

Zur Erinnerung: In React sehen die Funktionskomponenten so aus:

```js
const Example = (props) => {
  // Du kannst hier Hooks verwenden!
  return <div />;
}
```

oder so:

```js
function Example(props) {
  // Du kannst hier Hooks verwenden!
  return <div />;
}
```

Wahrscheinlich weißt du bereits, dass sich diese Komponenten "Zustandslose Komponenten" nennen. Nun führen wir die Möglichkeit ein, Zustände in den Komponenten zu verwenden, dementsprechend bevorzugen wir die Bezeichnung "Funktionskomponenten".

Hooks funktionieren **nicht** innerhalb von Klassen. Aber du kannst sie anstelle von Klassen verwenden.

## Was ist ein Hook? {#whats-a-hook}

Wir fangen mit dem Import des `useState` Hooks aus React an:

```js{1}
import React, { useState } from 'react';

function Example() {
  // ...
}
```

**Was ist ein Hook?** Ein Hook ist eine spezielle Funktion, mit der du dich in React-Funktionalitäten "einhaken" kannst. Schauen wir uns beispielsweise die `useState`-Funktion an, sie ist ein Hook, mit dem wir States zu einer zustandslosen Komponente hinzufügen können, so dass wir die sogenannte Funktionskomponente erhalten. Wir werden später weitere Hooks kennenlernen.

**Wann sollte ich einen Hook verwenden?** Falls du bereits eine zustandslose Komponente verwendest und später feststellst, dass du die Komponente um States erweitern musst, dann musstest du früher deine Komponente in eine Klassenkomponente umschreiben, dies ist nicht mehr nötig, da du jetzt Hooks verwenden kannst. Dies werden wir jetzt sofort tun!

>Hinweis:
>
>Es gibt einige spezielle Regeln dafür, wo man innerhalb einer Komponente Hooks verwenden kann und wo nicht. Wir werden sie in [Regeln von Hooks](/docs/hooks-rules.html) lernen.

## Deklarierung einer State-Variable {#declaring-a-state-variable}

In einer Klasse initialisieren wir den `count` State auf `0` indem wir `this.state` auf `{ count: 0 }` im Konstruktor setzen:

```js{4-6}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

In einer Funktionskomponente existiert das Schlüsselwort `this` nicht, wodurch wir `this.state` weder zuweisen noch lesen können. Stattdessen rufen wir den `useState` Hook direkt in unserer Komponente auf:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Deklariere eine neue State-Variable, die wir "count" nennen werden
  const [count, setCount] = useState(0);
```

**Was bewirkt das Aufrufen der `useState`-Funktion?** Es deklariert eine "State-Variable". Die Variable heißt `count`, aber wir könnten sie beliebig nennen, wie z.B. `banane`. Dies ist eine Möglichkeit, einige Werte zwischen den Funktionsaufrufen zu "erhalten" — `useState` ist eine neue Möglichkeit wie man exakt die selben Eigenschaften zu benutezn, wie bei `this.state` in einer Klasse. In der Regel "verschwinden" Variablen, wenn eine Funktion fertig ausgeführt ist, jedoch bleiben die State-Variablen durch React erhalten.

**Welche Argumente können wir an die `useState`-Funktion übergeben?** Das einzige Argument, dass der `useState()` Hook verwendet ist der initiale Zustand. Anders als es bei Klassen der Fall ist, muss der State nicht unbedingt ein Objekt sein. Wir könnten z.B. eine Zahl oder eine Zeichenkette verwenden falls dies für uns ausreichend ist. In unserem Beispiel ist die Verwendung einer Zahl ausreichend, da wir lediglich die Anzahl der Klicks auswerten möchten, demzufolge übergeben wir `0` als initialen Wert unserer State-Variable. (Falls wir zwei verschiedene Werte im State speichern wollen,  rufen wir `useState()` zweimal auf.)

**Was gibt die `useState`-Funktion zurück?** Sie gibt ein Tupel zurück: der aktuelle State und eine Funktion die, den aktuellen State aktualisieren kann. Aus diesem Grund schreiben wir `const [count, setCount] = useState()`. Dies ist vergleichbar mit `this.state.count` und `this.setState` die in Klassen verwendet werden, mit dem einzigen Unterschied, dass man sie als Tupel erhält. Falls du mit der von uns verwendeten Syntax nicht vertraut bist, werden wir [am Ende dieser Seite](/docs/hooks-state.html#tip-what-do-square-brackets-mean) nochmal darauf zurückkommen.

Da wir nun wissen, was der `useState` Hook macht, sollte unser Beispiel mehr Sinn machen:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Deklariere eine neue State-Variable, die wir "count" nennen werden
  const [count, setCount] = useState(0);
```

Wir deklarieren eine State-Variable namens `count` und setzen sie auf `0`. React merkt sich den aktuellen Wert der Variable zwischen dem neu Rendern und stellt uns diesen für unsere Funktion zur Verfügung. Falls wir den Wert der State-Variable `count` aktualisieren möchten, können wir die Methode `setCount` aufrufen.

>Hinweis
>
>Du fragst dich vielleicht: Warum heißt die Hook `useState` anstatt `createState`?
>
>"Create" wäre nicht ganz zutreffend, da der State nur beim ersten Rendern der Komponente erstellt wird. Während der nachfolgenden Rendervorgänge stellt uns die `useState`-Funktion den aktuellen State bereit. Andernfalls wäre es überhaupt kein "state"! Es hat auch seinen Grund, weshalb die Namen der Hooks *immer* mit `use` beginnen. Die Gründe dafür werden wir später in den [Regeln von Hooks](/docs/hooks-rules.html) erfahren.

## Lesen des States {#reading-state}

Wenn wir den aktuellen Zählerstand in einer Klasse anzeigen lassen wollen, lesen wir `this.state.count`:

```js
  <p>Du hast mich {this.state.count} mal geklickt</p>
```

In einer Funktion können wir `count` direkt verwenden:


```js
  <p>Du hast mich {count} mal geklickt</p>
```

## Aktualisieren des States {#updating-state}

In einer Klasse müssen wir `this.setState()` aufrufen, um den `count`-State zu aktualisieren:

```js{1}
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Klick mich
  </button>
```

In einer Funktion haben wir bereits `setCount` und `count` als Variablen, so dass wir `this` nicht mehr benötigen:

```js{1}
  <button onClick={() => setCount(count + 1)}>
    Klick mich
  </button>
```

## Zusammenfassung {#recap}

Wir möchten nun **das Gelernte Zeile für Zeile zusammenfassen** um unseren Wissensstand zu prüfen.

<!--
  I'm not proud of this line markup. Please somebody fix this.
  But if GitHub got away with it for years we can cheat.
-->
```js{1,4,9}
 1:  import React, { useState } from 'react';
 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0);
 5:
 6:    return (
 7:      <div>
 8:        <p>Du hast mich {count} mal geklickt</p>
 9:        <button onClick={() => setCount(count + 1)}>
10:         Klick mich
11:        </button>
12:      </div>
13:    );
14:  }
```

* **Zeile 1:** Wir importieren den `useState` Hook aus React, dadurch können wir einen lokalen State in einer Funktionskomponente halten.
* **Zeile 4:** Innerhalb der `Example`-Komponente deklarieren wir durch einen Aufruf des `useState`-Hooks eine neue State-Variable, die ein Tupel zurückgibt, dessen Inhalte wir dann Namen zuweisen. Wir nennen unsere Variable `count`, da sie die Anzahl der Button-Klicks enthält. Wir initialisieren Null, indem wir `0` als einziges Argument an `useState` geben. Die zweite Variable die zurückgegeben wird ist eine Funktion. Sie erlaubt uns den Wert von `count` zu aktualisieren, dementsprechend nennen wir sie `setCount`.
* **Zeile 9:** Beim Klick auf den Button durch den User rufen wir `setCount` mit einem neuen Wert auf. React wird dann die `Example`-Komponente erneut rendern und ihr den neuen Wert für den `count`-State übergeben.

Auf den ersten Blick mag dies eine Menge sein. Überstürzte nichts! Wenn du dich in der Fülle der Informationen verlierst, dann schau dir am Besten den oben bereitgestellten Code nochmal genauer an und wiederhole die dargestellten Schritte von oben nach unten. Wir versprechen dir, dass wenn du versuchst zu "vergessen" wie der State in Klassen funktioniert und du den Code mit kühlem Kopf anschaust, es Sinn machen wird.

### Tipp: Welche Bedeutung haben die eckigen Klammern? {#tip-what-do-square-brackets-mean}

Möglicherweise sind dir die eckigen Klammern aufgefallen, die wir bei der Deklaration der State-Variablen verwendet haben:

```js
  const [count, setCount] = useState(0);
```

Die Namen auf der linken Seite sind kein Bestandteil der React-API. Du kannst deine eigenen State-Variablen frei benennen:

```js
  const [fruit, setFruit] = useState('banane');
```

Diese JavaScript-Syntax wird als ["Destrukturierende Array-Zuweisung"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) bezeichnet. Dies bedeutet, dass wir zwei neue Variablen `fruit` und `setFruit` erstellen, wobei `fruit` auf den ersten Wert gesetzt wird, der von der `useState`-Hook zurückgegeben wird und `setFruit` auf den zweiten. Dies ist gleichwertig mit dem folgenden Code:

```js
  var fruitStateVariable = useState('banane'); // Gibt ein Tupel zurück
  var fruit = fruitStateVariable[0]; // Erstes Element im Tupel
  var setFruit = fruitStateVariable[1]; // Zweites Element im Tupel
```

Bei der Deklaration einer State-Variable mit Hilfe von `useState` erhalten wir einen Tupel zurück — ein Array mit zwei Werten. Der erste Wert ist der aktuelle des States, der zweite eine Funktion, mit der wir den Wert des States aktualisieren können. Die Verwendung von `[0]` und `[1]` um auf den Inhalt der Hook zuzugreifen mag etwas verwirrend sein, dementsprechend verwenden wir die Array-Destrukturierung.

>Hinweis
>
>Möglicherweise fragst du dich, woher React nun weiß, welche Komponente es `useState` zuordnen muss, da wir so etwas wie `this` nicht an React weitergeben. Wir werden die Antwort auf [diese Frage](/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components), sowie zahlreiche andere Fragen in der FAQ-Sektion beantworten.

### Tipp: Verwenden mehrerer State-Variablen {#tip-using-multiple-state-variables}

Die Deklaration von State-Variablen als ein Tupel in der Form `[something, setSomething]` ist insofern praktisch, da es uns erlaubt die State-Variabeln *unterschiedliche* Namen zu geben, dies ist speziell Nützlich wenn man mehrere States verwenden möchte:

```js
function ExampleWithManyStates() {
  // Deklaration von mehreren States-Variablen!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banane');
  const [todos, setTodos] = useState([{ text: 'Hooks erlernen' }]);
```

In der obigen Komponente stehen uns `age`, `fruit`, und `todos` als lokale Variablen zur Verfügung, die wir ebenfalls individuell aktualisieren können:

```js
  function handleOrangeClick() {
    // Vergleichbar mit this.setState({ fruit: 'orange' })
    setFruit('orange');
  }
```

Du brauchst **nicht** zahlreichen State-Variablen zu verwenden. Die Variablen können problemlos Arrays oder Objekte halten, dementsprechend kannst du zusammenhängende Daten gruppieren. Beachte aber, dass im Gegensatz zu der in Klassen verwendeten Funktion `this.setState` die Aktualisierung durch die Hooks etwas anders funktioniert, da die State-Variable *ersetzt* wird, anstatt sie mit dem bereits vorhandenen State zu verschmelzen.

Wir geben weitere Empfehlungen zur Aufteilung unabhängiger State-Variablen die du [in den FAQ](/docs/hooks-faq.html#should-i-use-one-or-many-state-variables) nachlesen kannst.

## Nächste Schritte {#next-steps}

Auf dieser Seite haben wir uns über einen der von React zur Verfügung gestellten Hooks, den sogenannten `useState`-Hook. Wir werden es gelegentlich auch als "State Hook" bezeichnen. Es ermöglicht uns einen lokalen State zu einer React-Funktionskomponente hinzuzufügen -- welches wir zum ersten Mal überhaupt getan haben!

Wir haben ebenfalls ein wenig mehr darüber erfahren, was Hooks überhaupt sind. Hooks sind Funktionen, mit denen man sich über Funktionskomponenten in die React-Funktionalität "einhaken" kann. Ihr Name beginnt immer mit `use`. Es gibt zahlreiche weitere Hooks, die wir noch nicht kennengelernt haben.

**Fahren wir nun fort mit der [nächsten Hook: `useEffect`.](/docs/hooks-effect.html)** Diese ermöglicht dir die Durchführung von Seiten-Effekten innerhalb von Komponenten und ähnelt den Lifecycle-Methoden in Klassen.
