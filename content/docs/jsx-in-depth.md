---
id: jsx-in-depth
title: JSX im Detail
permalink: docs/jsx-in-depth.html
redirect_from:
  - "docs/jsx-spread.html"
  - "docs/jsx-gotchas.html"
  - "tips/if-else-in-JSX.html"
  - "tips/self-closing-tag.html"
  - "tips/maximum-number-of-jsx-root-nodes.html"
  - "tips/children-props-type.html"
  - "docs/jsx-in-depth-zh-CN.html"
  - "docs/jsx-in-depth-ko-KR.html"
---

Im Grunde stellt JSX nur eine schönere Syntax für die `React.createElement(component, props, ...children)`-Funktion zur Verfügung. Der JSX-Code:

```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

kompiliert zu:

```js
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

Du kannst auch die selbstschließende Version des Tags nutzen, sofern keine Kind-Elemente vorhanden sind. So kompiliert:

```js
<div className="sidebar" />
```

zu:

```js
React.createElement(
  'div',
  {className: 'sidebar'}
)
```

Wenn du ausprobieren möchtest, wie dein JSX zu welchem JavaScript konvertiert, kannst du [den Online-Babel-Compiler](babel://jsx-simple-example) nutzen.

## Den React Elementen-Typ spezifizieren {#specifying-the-react-element-type}

Der erste Teil eines JSX-Tags gibt den Typen des React-Elements an. 

Kapitalisierte Typen geben an, dass der JSX-Tag sich auf einen React-Komponenten bezieht. Solche Tags werden in eine direkte Referenz der benannten Variablen kompiliert, folglich muss sich `Foo` auch im entsprechenden Namensraum befinden, wenn du den JSX `<Foo />`-Ausdruck nutzt.


### React muss sich im Namensraum befinden {#react-must-be-in-scope}

Da JSX zu einem `React.createElement`-Aufruf kompiliert, muss auch die `React`-Bibliothek immer im Namensraum deines JSX-Codes eingebunden sein.

Beispielsweise sind beide Importierungen in diesem Code nötig, sogar wenn weder `React` noch `CustomButton` direkt im JavaScript aufgegriffen werden:

```js{1,2,5}
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```

Wenn du keinen JavaScript-Bundler nutzt und React via `<script>`-Tag lädst, dann befindet es sich bereits als `React`-Globale im Namensraum.

### Die Punkt-Notation als JSX-Typen nutzen {#using-dot-notation-for-jsx-type}

Es ist möglich einen React-Komponenten via Punkt-Notation innerhalb des JSX zu referenzieren. Dies ist besonders bequem, wenn du mehrere React-Komponenten aus einem Modul exportierst. Wenn zum Beispiel `MyComponents.DatePicker` eine Komponente ist, kannst du Diese direkt im JSX wie folgt nutzen:

```js{10}
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

### Nutzerdefinierte Komponenten müssen Kapitalisiert sein {#user-defined-components-must-be-capitalized}

Sobald ein Elemententyp mit einem Kleinbuchstaben beginnt, bezieht sich Dieser auf einen bereits eingebauten Komponenten wie `<div>` oder `<span>`, welche `React.createElement`   als `'div'` oder `'span'` String übergeben werden. Typen, die mit einem Großbuchstaben beginnen, wie z.B. `<Foo />`, kompilieren zu `React.createElement(Foo)` und beziehen sich auf eine Komponente, welche in deiner JavaScript-Datei eingebunden oder definiert wurde.

Wir empfehlen Komponenten mit einem Großbuchstaben beginnend zu benennen. Solltest du eine Komponente nutzen, die mit einem Kleinbuchstaben beginnt, ordne Diese einer kapitalisierten Variable zu, bevor du sie in JSX nutzt.  

Folgender Code würde zum Beispiel nicht wie erwartet laufen:

```js{3,4,10,11}
import React from 'react';

// Falsch! Dies ist eine Komponente und sollte mit einem Großbuchstaben beginnen:
function hello(props) {
  // Richtig! Diese Nutzung von <div> ist erlaubt, da div ein valider HTML-Tag ist:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Falsch! React denkt, dass <hello /> ein HTML-Tag ist, weil es nicht mit einem Großbuchstaben beginnt:
  return <hello toWhat="World" />;
}
```

Um dies zu beheben benennen wir `hello` zu `Hello` um und nutzen `<Hello />` zum einbinden:

```js{3,4,10,11}
import React from 'react';

// Richtig! Da dies eine Komponente ist, sollte Diese auch mit einem Großbuchstaben beginnen:
function Hello(props) {
  // Richtig! Diese Nutzung von <div> ist erlaubt, da div ein valider HTML-Tag ist:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Richtig! React weiß, dass <Hello /> eine Komponente ist, weil sie mit einem Großbuchstaben beginnt.
  return <Hello toWhat="World" />;
}
```

### Den Typen zur Laufzeit bestimmen {#choosing-the-type-at-runtime}

Das Nutzen eines generellen Ausdrucks als React Elementtyp ist nicht möglich. Solltest du dennoch einen generellen Ausdruck zur Bezeichnung eines Elementtyps nutzen wollen, weise diesen vorher einer kapitalisierten Variablen zu. Dieser Fall tritt häufig ein, wenn du eine Komponente abhängig von einer `prop` rendern willst: 

```js{10,11}
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Falsch! Der JSX-Typ kann kein Ausdruck sein.
  return <components[props.storyType] story={props.story} />;
}
```

Um dies zu beheben, weisen wir zunächst den Typ einer großgeschriebenen Variablen zu:

```js{10-12}
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Richtig! Der JSX Typ kann eine Variable sein welche mit einem Großbuchstaben beginnt.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

## Props in JSX {#props-in-jsx}

Es gibt verschiedene Wege um props in JSX zu nutzen. 

### JavaScript-Ausdrücke als Props {#javascript-expressions-as-props}

Man kann jeden JavaScript-Ausdruck als Prop verwenden, indem du ihn mit `{}` ummantelst. Zum Beispiel im folgenden JSX:

```js
<MyComponent foo={1 + 2 + 3 + 4} />
```

Für `MyComponent` wird der Inhalt von `props.foo` 10 sein, da der Ausdruck `1 + 2 + 3 + 4` ausgeführt wird.

`if`-Anweisungen und `for`-Schleifen sind keine Ausdrücke in JavaScript, können also nicht direkt in JSX genutzt werden. Du kannst diese stattdessen wie im folgenden Beispiel umsetzen:

```js{3-7}
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return <div>{props.number} is an {description} number</div>;
}
```

Du kannst mehr über [bedingtes Rendering](/docs/conditional-rendering.html) und [Schleifen](/docs/lists-and-keys.html) in den entsprechenden Abschnitten erfahren.

### String-Literals {#string-literals}

Du kannst ein String-Literal als prop weitergeben. Die folgenden JSX-Ausdrücke sind gleich:

```js
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```

Wenn du ein String-Literal weitergibst, ist sein Wert HTML-unformatiert. Somit sind die folgenden beiden Ausdrücke gleich:

```js
<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```

Normalerweise ist dieser Umstand nicht relevant. Es wird nur zum Zwecke der Vollständigkeit erwähnt. 

### Props standardmäßig auf "Wahr" {#props-default-to-true}

Wenn du eine Prop ohne Inhalt weitergibst, ist deren Wert standardmäßig `true`. Diese beiden JSX-Ausdrücke sind gleich:

```js
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

Im Gesamten würden wir nicht empfehlen dies so zu benutzen, da hier Verwechslungsgefahr mit der [ES6 object Abkürzung](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015), `{foo}` als Abkürzung für `{foo: foo}` im Gegensatz zu `{foo: true}`, besteht. Dieses Verhalten gibt es nur, da es zum Verhalten von HTML passt. 

### Spread Attribute {#spread-attributes}

Solltest du bereits `props` als ein Objekt haben und möchtest es an JSX weitergeben, kannst du mit `...` einen "spread"-Operator für das ganze Props-Objekt nutzen. Diese beiden Komponenten sind gleich:

```js{7}
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

Du kannst dir auch spezielle Props aussuchen, welche deine Komponente konsumiert und trotzdem alle anderen Props mit dem "spread"-Operator weitergeben.

```js{2}
const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
};
```

Im obigen Beispiel wird die `kind`-Prop sicher ausgenommen und *wird nicht* zum `<button>`-Element im DOM weitergegeben.
Alle anderen Props werden mit Hilfe des `...other`-Objekts weitergegeben, was die Komponente sehr flexibel macht. Man erkennt, dass eine `onClick` und eine `children` Prop weitergegeben werden.

Spread-Attribute können sehr nützlich sein, sie machen es aber auch sehr einfach unnötige Props an Komponenten weiterzugeben, welche nicht auf sich oder darauf achten, ob sie ungültige Attribute an den DOM weitergeben. Wir empfehlen diese Syntax mit Bedacht einzusetzen. 


## Kindelemente in JSX {#children-in-jsx}

In JSX-Ausdrücken, die sowohl einen öffnenden als auch einen schließenden Tag beinhalten, wird der Inhalt zwischen diesen Tags als eine spezielle Prop weitergegeben: `props.children`. Es gibt verschiedene Wege um Kindelemente weiterzugeben:

### String-Literals {#string-literals-1}

Du kannst einen String zwischen den öffnenden und den schließenden Tags platzieren, dann würde `props.children` eben nur für diesen String stehen. Dies ist nützlich für viele der inklusiven HTML-Elemente. Zum Beispiel:

```js
<MyComponent>Hello world!</MyComponent>
```

Hier handelt es sich um valides JSX und `props.children` wäre in `MyComponent` einfach nur der String `"Hello world!"`. HTML wird nicht ausgeschlossen, somit kannst du JSX generell einfach so schreiben, wie du auch HTML auf diesem Wege schreiben würdest:

```html
<div>This is valid HTML &amp; JSX at the same time.</div>
```

JSX entfernt Leerzeichen am Anfang und am Ende einer Zeile. Außerdem entfernt es auch Leerzeilen. Neue Zeilen benachbart zu Tags werden entfernt; Neue Zeilen, die in der Mitte von String-Literalen erscheinen, werden in ein einzelnes Leerzeichen umgewandelt. Somit rendert alles Folgende zu dem selben Ergebnis:

```js
<div>Hello World</div>

<div>
  Hello World
</div>

<div>
  Hello
  World
</div>

<div>

  Hello World
</div>
```

### JSX Kindelemente {#jsx-children}

Du kannst mehrere JSX-Elemente als Kindelemente zur Verfügung stellen. Dies ist nützlich um verschachtelte Komponenten anzuzeigen:

```js
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
```

Es ist möglich verschiedene Typen von Kindelementen miteinander zu vermischen, somit kannst du String-Literale zusammen mit JSX-Kindelementen nutzen. Dies ist eine weitere Gemeinsamkeit von JSX und HTML bei der das Folgende sowohl valides JSX als auch valides HTML darstellt:

```html
<div>
  Here is a list:
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

Eine React-Komponente kann auch ein Array von Elementen zurückgeben:

```js
render() {
  // Es ist nicht nötig die Listelemente mit einem extra Element zu umhüllen!
  return [
    // Die Keys nicht vergessen :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```

### JavaScript-Ausdrücke als Kindelemente {#javascript-expressions-as-children}

Du kannst jeden JavaScript-Ausdruck als Kindelement weitergeben, indem du es mit `{}` umhüllst. Die folgenden Ausdrücke sind zum Beispiel gleich:

```js
<MyComponent>foo</MyComponent>

<MyComponent>{'foo'}</MyComponent>
```

Dies erweist sich oft als nützlich, sobald du eine Liste von JSX-Ausdrücken mit unbestimmter Länge rendern möchtest. Das folgende Beispiel rendert eine HTML-Liste:

```js{2,9}
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
```

JavaScript-Ausdrücke können mit anderen Typen von Kindelementen vermischt werden. Dies ist oft nützlich im Gegensatz zu String-Templates:

```js{2}
function Hello(props) {
  return <div>Hello {props.addressee}!</div>;
}
```

### Funktionen als Kindelemente {#functions-as-children}

Normalerweise werden die in JSX eingefügten JavaScript-Ausdrücke als String, als React-Element, oder als Liste dieser Dinge ausgegeben. In jedem Fall funktioniert `props.children` genau wie jede andere Prop, da es in der Lage ist jede Art von Daten weiterzugeben, nicht nur Solche bei denen React weiß, wie es diese rendern soll. Wenn du zum Beispiel eine eigene Komponente hast, kannst du dieser eine Callback-Funktion als `props.children` übergeben: 

```js{4,13}
// Ruft die Kindelement-Callback-Funktion numTimes-mal auf und produziert mehrmals eine Komponente
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```
 
Kindelemente, die zu einer benutzerdefinierten Komponente weitergegeben werden, können alles sein, solange diese Komponente sie vor dem Rendern in etwas umwandelt, das React verstehen kann. Diese Verwendung ist nicht üblich, aber sie funktioniert, solltest du einmal die Möglichkeiten von JSX etwas ausreizen wollen.

### Boolean, Null, und Undefined werden ignoriert {#booleans-null-and-undefined-are-ignored}

`false`, `null`, `undefined` und `true` sind valide Kindelemente. Diese werden jedoch nicht gerendert. Die folgenden JSX-Ausdrücke rendern alle zum gleichen Ergebnis:

```js
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

Dies ist nützlich um React-Elemente, die an Bedingungen geknüpft sind, zu rendern. Das folgende JSX rendert die `<Header />`-Komponente nur wenn `showHeader` `true` ist:

```js{2}
<div>
  {showHeader && <Header />}
  <Content />
</div>
```

Diese Regel gilt nur unter Vorbehalt, da ["falsy" Werte](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), wie beispielsweise die Nummer `0`, trotzdem von React gerendert werden. Der folgende Code könnte sich zum Beispiel anders als erwartet verhalten, da hier `0` ausgegeben wird wenn `props.messages` ein leeres Array ist: 

```js{2}
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>
```

Um dies zu beheben, stelle sicher das der Ausdruck vor `&&` immer ein boolscher Wert ist:

```js{2}
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
```

Umgekehrt, solltest du Werte wie `false`, `true`, `null`, oder `undefined` ausgeben wollen, musst du diese zuerst [in einen String umwandeln](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion):

```js{2}
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
```
