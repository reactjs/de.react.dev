---
id: fragments
title: Fragments
permalink: docs/fragments.html
---

<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> These new documentation pages teach modern React:
>
> - [`<Fragment>`](https://react.dev/reference/react/Fragment)

</div>

Es kommt häufig vor, dass eine Komponente mehrere Elemente umfasst. Mit Fragments kannst du eine Liste von Kindelementen gruppieren, ohne dem DOM einen zusätzlichen Knoten hinzuzufügen.

```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

Es gibt auch eine neue [Kurzschreibweise](#short-syntax) um diese zu deklarieren.

## Motivation {#motivation}

Gängig ist, dass eine Komponente eine Liste von Kindelementen zurückgibt. Nehmen wir diesen React-Schnipsel:

```jsx
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```

`<Columns />` muss mehrere `<td>` Elemente zurückgeben, damit das gerenderte HTML gültig ist. Wenn ein übergeordnetes div in `render()` von `<Columns />` verwendet werden würde, würde das resultierende HTML ungültig sein.

```jsx
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hallo</td>
        <td>Welt</td>
      </div>
    );
  }
}
```

Eine Ausgabe von `<Table />` ergibt dann folgendes:

```jsx
<table>
  <tr>
    <div>
      <td>Hallo</td>
      <td>Welt</td>
    </div>
  </tr>
</table>
```

Fragmente lösen dieses Problem.

## Verwendung {#usage}

```jsx{4,7}
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hallo</td>
        <td>Welt</td>
      </React.Fragment>
    );
  }
}
```

dies resultiert in einer korrekten Ausgabe von `<Table />`:

```jsx
<table>
  <tr>
    <td>Hallo</td>
    <td>Welt</td>
  </tr>
</table>
```

### Kurzschreibweise {#short-syntax}

Es gibt eine neue kürzere Schreibweise, welche du verwenden kannst um Fragmente zu deklarieren. Diese sieht wie leere Tags aus:

```jsx{4,7}
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hallo</td>
        <td>Welt</td>
      </>
    );
  }
}
```

Du kannst `<></>` so verwenden, wie du jedes andere Element verwendest. Mit Ausnahme davon, dass es keine Keys oder andere Attribute unterstützt.

### Keyed Fragments {#keyed-fragments}

Fragmente, die mit der expliziten `<React.Fragment>` Syntax deklariert wurden, können Keys besitzen. Ein Anwendungsfall dafür ist das Durchlaufen von Daten um ein Array von Fragmenten zu erzeugen, z.B. um eine Beschreibungsliste zu erstellen:

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Ohne  `key`, wird React eine Key-Warnung ausgeben
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

`key` ist das einzige Attribut, welches an ein `Fragment` gegeben werden kann. Zukünftig könnten wir die Unterstützung für zusätzliche Attribute hinzufügen, wie z. B. Event-Handler.

### Live Demo {#live-demo}

Du kannst die neue JSX Fragment Syntax auf [CodePen](https://codepen.io/reactjs/pen/VrEbjE?editors=1000) ausprobieren.
