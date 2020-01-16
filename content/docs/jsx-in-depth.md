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
  {className: 'sidebar'},
  null
)
```

Wenn du ausprobieren möchtest wie dein JSX zu welchem JavaScript konvertiert, kannst du [den Online-Babel-Compiler](babel://jsx-simple-example) nutzen.

## Den React Elementen-Typ spezifizieren {#specifying-the-react-element-type}

Der erste Teil eines JSX-Tags gibt den Typen des React-Elements an. 

Kapitalisierte Typen geben an dass der JSX-Tag sich auf einen React-Komponenten bezieht. Solche Tags werden in eine direkte Referenz der benannten Variablen kompiliert, folglich muss sich `Foo` auch im entsprechenden Namensraum befinden, wenn du den JSX `<Foo />`-Ausdruck nutzt.


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

Es ist möglich einen React-Komponenten via Punkt-Notation innerhalb des JSX zu referenzieren. Dies ist besonders bequem wenn du mehrere React-Komponenten aus einem Modul exportierst. Wenn zum Beispiel `MyComponents.DatePicker` eine Komponente ist, kannst du Diese direkt im JSX wie folgt nutzen:

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

Sobald ein Elemententyp mit einem Kleinbuchstaben beginnt, bezieht sich Dieser auf einen bereits eingebauten Komponenten wie `<div>` oder `<span>`, welche `React.createElement`   als `'div'` oder `'span'` Zeichenkette übergeben werden. Typen die mit einem Großbuchstaben beginnen, wie z.B. `<Foo />`, kompilieren zu `React.createElement(Foo)` und beziehen sich auf eine Komponente, welche in deiner JavaScript-Datei eingebunden oder definiert wurde.

Wir empfehlen Komponenten mit einem Großbuchstaben beginnend zu benennen. Solltest du eine Komponente nutzen die mit einem Kleinbuchstaben beginnt, ordne Diese einer kapitalisierten Variable zu, bevor du sie in JSX nutzt.  

Folgender Code würde zum Beispiel nicht wie erwartet laufen:

```js{3,4,10,11}
import React from 'react';

// Falsch! Dies ist eine Komponente und sollte mit einem Großbuchstaben beginnen:
function hello(props) {
  // Richtig! Diese Nutzung von <div> ist erlaubt, da div ein valider HTML-Tag ist:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Falsch! React denkt das <hello /> ein HTML-Tag ist, weil es nicht mit einem Großbuchstaben beginnt:
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
  // Richtig! React weiß dass <Hello /> eine Komponente ist, weil sie mit einem Großbuchstaben beginnt.
  return <Hello toWhat="World" />;
}
```

### Den Typen zur Laufzeit bestimmen {#choosing-the-type-at-runtime}

Das Nutzen eines generellen Ausdrucks als React Elementtyp ist nicht möglich. Solltest du dennoch einen generellen Ausdruck zur Bezeichnung eines Elementtyps nutzen wollen, weiße Diesem vorher einer kapitalisierten Variablen zu. Dieser Fall tritt häufig ein wenn du eine Komponente abhängig von einer `prop` rendern willst: 

```js{10,11}
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Falsch! Der JSX Typ darf kein Ausdruck sein.
  return <components[props.storyType] story={props.story} />;
}
```

Um dies zu beheben weisen wir dem Typen zuerst eine kapitalisierte Variable zu:

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

Man kann jeden JavaScript-Ausdruck als prop verwenden, indem du ihn mit `{}` ummantelst. Zum Beispiel im folgenden JSX:

```js
<MyComponent foo={1 + 2 + 3 + 4} />
```

Für `MyComponent` wird der Inhalt von `props.foo` 10 sein, da der Ausdruck `1 + 2 + 3 + 4` ausgeführt wird.

`if`-Anweisungen und `for`-Schleifen sind keine Ausdrücke in JavaScript, können also nicht direkt in JSX genutzt werden. Du kannst Diese stattdessen wie im folgenden Beispiel umsetzen:

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

### String Literals {#string-literals}

Du kannst ein String Literal als prop weitergeben. Die folgenden JSX-Ausdrücke sind gleich:

```js
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```

Wenn du ein String Literal weitergibst, ist der Inhalt des HTML-unformatiert. Somit sind die folgenden beiden Ausdrücke gleich:

```js
<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```

Normalerweise ist dieser Umstand nicht relevant. Es wird nur zum Zwecke der Vollständigkeit erwähnt. 

### Props standardmäßig auf "Wahr" {#props-default-to-true}

Wenn du eine Prop ohne Inhalt weitergibst ist deren Wert standardmäßig `wahr`. Diese beiden JSX-Ausdrücke sind gleich:

```js
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

Im Gesamten würden wir nicht empfehlen Dies so zu benutzen, da hier Verwechslungsgefahr mit der [ES6 object Abkürzung](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015), `{foo}` als Abkürzung für `{foo: foo}` im Gegensatz zu `{foo: true}`, besteht.
Dieses Verhalten gibt es nur da es zum Verhalten von HTML passt. 

### Spread Attribute {#spread-attributes}

Solltest du bereits `props` als ein Objekt haben und möchtest es an JSX weitergeben, kannst du mit `...` einen "Aufteilungs"-Operator für das ganze Propsobjekt nutzen. Diese beiden Komponenten sind gleich:

```js{7}
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

Du kannst dir auch spezielle props aussuchen welche deine Komponente konsumiert und trotzdem alle anderen Props mit dem "Aufteilungs"-Operator weitergeben.

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

In the example above, the `kind` prop is safely consumed and *is not* passed on to the `<button>` element in the DOM.
All other props are passed via the `...other` object making this component really flexible. You can see that it passes an `onClick` and `children` props.

Spread attributes can be useful but they also make it easy to pass unnecessary props to components that don't care about them or to pass invalid HTML attributes to the DOM. We recommend using this syntax sparingly.  

## Children in JSX {#children-in-jsx}

In JSX expressions that contain both an opening tag and a closing tag, the content between those tags is passed as a special prop: `props.children`. There are several different ways to pass children:

### String Literals {#string-literals-1}

You can put a string between the opening and closing tags and `props.children` will just be that string. This is useful for many of the built-in HTML elements. For example:

```js
<MyComponent>Hello world!</MyComponent>
```

This is valid JSX, and `props.children` in `MyComponent` will simply be the string `"Hello world!"`. HTML is unescaped, so you can generally write JSX just like you would write HTML in this way:

```html
<div>This is valid HTML &amp; JSX at the same time.</div>
```

JSX removes whitespace at the beginning and ending of a line. It also removes blank lines. New lines adjacent to tags are removed; new lines that occur in the middle of string literals are condensed into a single space. So these all render to the same thing:

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

### JSX Children {#jsx-children}

You can provide more JSX elements as the children. This is useful for displaying nested components:

```js
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
```

You can mix together different types of children, so you can use string literals together with JSX children. This is another way in which JSX is like HTML, so that this is both valid JSX and valid HTML:

```html
<div>
  Here is a list:
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

A React component can also return an array of elements:

```js
render() {
  // No need to wrap list items in an extra element!
  return [
    // Don't forget the keys :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```

### JavaScript Expressions as Children {#javascript-expressions-as-children}

You can pass any JavaScript expression as children, by enclosing it within `{}`. For example, these expressions are equivalent:

```js
<MyComponent>foo</MyComponent>

<MyComponent>{'foo'}</MyComponent>
```

This is often useful for rendering a list of JSX expressions of arbitrary length. For example, this renders an HTML list:

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

JavaScript expressions can be mixed with other types of children. This is often useful in lieu of string templates:

```js{2}
function Hello(props) {
  return <div>Hello {props.addressee}!</div>;
}
```

### Functions as Children {#functions-as-children}

Normally, JavaScript expressions inserted in JSX will evaluate to a string, a React element, or a list of those things. However, `props.children` works just like any other prop in that it can pass any sort of data, not just the sorts that React knows how to render. For example, if you have a custom component, you could have it take a callback as `props.children`:

```js{4,13}
// Calls the children callback numTimes to produce a repeated component
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

Children passed to a custom component can be anything, as long as that component transforms them into something React can understand before rendering. This usage is not common, but it works if you want to stretch what JSX is capable of.

### Booleans, Null, and Undefined Are Ignored {#booleans-null-and-undefined-are-ignored}

`false`, `null`, `undefined`, and `true` are valid children. They simply don't render. These JSX expressions will all render to the same thing:

```js
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

This can be useful to conditionally render React elements. This JSX renders the `<Header />` component only if `showHeader` is `true`:

```js{2}
<div>
  {showHeader && <Header />}
  <Content />
</div>
```

One caveat is that some ["falsy" values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), such as the `0` number, are still rendered by React. For example, this code will not behave as you might expect because `0` will be printed when `props.messages` is an empty array:

```js{2}
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>
```

To fix this, make sure that the expression before `&&` is always boolean:

```js{2}
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
```

Conversely, if you want a value like `false`, `true`, `null`, or `undefined` to appear in the output, you have to [convert it to a string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion) first:

```js{2}
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
```
