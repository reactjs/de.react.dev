---
id: context
title: Kontext
permalink: docs/context.html
---

Kontext ermöglicht es, Daten durch den Komponentenbaum zu übergeben, ohne die Props in jeder Schicht manuell zu übergeben.

In einer typischen React-Applikation werden Daten von oben herab (Elternkomponete zu Kindkomponente) durch Props übergeben. Für bestimmte Arten von Props (z.B. lokale Preferenzen, UI Theme), welche von vielen Komponenten innerhalb der Applikation benötigt werden kann dies sehr umständlich werden. Mit Kontext ist es möglich, solche Werte zwischen Komponenten zu teilen, ohne diese explizit als Prop durch alle Schichten des Baumes zu übergeben. 


- [Wann Kontext verwendet werden soll](#when-to-use-context)
- [Bevor du Kontext verwendest](#before-you-use-context)
- [API](#api)
  - [React.createContext](#reactcreatecontext)
  - [Context.Provider](#contextprovider)
  - [Class.contextType](#classcontexttype)
  - [Context.Consumer](#contextconsumer)
- [Beispiele](#examples)
  - [Dynamischer Kontext](#dynamic-context)
  - [Updaten des Kontextes von einer genesteten Komponente](#updating-context-from-a-nested-component)
  - [Konsumieren mehrerer Kontexten](#consuming-multiple-contexts)
- [Fallen](#caveats)
- [Legacy API](#legacy-api)

## Wann Kontext verwendet werden soll {#when-to-use-context}

Kontext wurde entwickelt, um Daten zu teilen, welche für einen Baum von React Komponenten als "global" bezeichnet werden können, zum Beispiel der aktelle authentifizierter Nutzer, das Theme oder die bevorzugte Sprache. In dem unten angeführten Codebeispiel zum Beispiel, ziehen wir ein Theme Prop manuell durch den Code, um die Button-Komponente zu stylen:

`embed:context/motivation-problem.js`

Mit der Verwendung von Kontext können wir das Übergeben der Props durch Zwischenelemente verhindern:

`embed:context/motivation-solution.js`

## Bevor du Kontext verwendest {#before-you-use-context}

Kontext wird hauptsächlich verwendet, wenn Daten von *vielen* Komponenten in verschiedenen genesteten Schichten erreichbar sein müssen. Benütze es sparsam, weil es das Wiederverwenden von Komponenten schwieriger macht.

**Wenn du nur das Übergeben von Props durch mehrere Schichten verhindern möchtest, ist [Komponenten-Komposition](/docs/composition-vs-inheritance.html) oft die bessere Lösung als Kontext.**

Betrachte zum Beispiel eine `Page` Komponente, welche eine `user` und `avatarSize` Prop durch mehrere Schichten übergibt, damit die tief genestete `Link` und `Avatar` Komponenten sie lesen können:

```js
<Page user={user} avatarSize={avatarSize} />
// ... rendert ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... rendert ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... rendert ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

Es kann überflüßig erscheinen, die `user` und `avatarSize` Props durch so viele Schichten zu übergeben, wenn am Ende nur die `Avatar` Komponente sie wirklich benötigt. Außerdem ist es nervig, wenn die `Avatar` Komponente mehrere Props von oben benötigt, weil man diese dann auch in alle Zwischenschichten hinzufügen muss.

Der einzige Weg dieses Problem **ohne Kontext** zu lösen ist,  [die `Avatar` Komponente sich selber zu übergeben](/docs/composition-vs-inheritance.html#containment), damit die Zwischenkomponenten nichts über die `user` or `avatarSize` Props wissen müssen.


```js
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// Jetzt haben wir:
<Page user={user} avatarSize={avatarSize} />
// ... rendert ...
<PageLayout userLink={...} />
// ... rendert ...
<NavigationBar userLink={...} />
// ... rendert ...
{props.userLink}
```

Mit dieser Veränderung muss nur die obereste Seitenkomponente über die Verwendung der `user` und `avatarSize` Props der `Link` und `Avatar` Komponenten Bescheid wissen.

Diese *inversion of control* (engl. für Umkehrung der Steuerung) macht den Code, durch das Reduzieren der Anzahl an überreichten Props  durch die Applikation und durch die Steigerung der Kontrolle der Wurzelkomponenten, in vielen Fällen sauberer. Jedoch ist das nicht in jedem Fall die richtige Entscheidung: durch das Schieben der Komplexität höher in den Baum, werden diese Higher-Level-Komponenten komplizierter und erzwingen die Lower-Level-Komponenten flexibler als erwünscht zu sein.

Du bist nicht auf ein einzelnes Kind für eine Komponente beschränkt. Du kann mehrere Kinder durchgeben, sogar mehrere seperate Slots für Kinder aben, [wie hier dokumentiert wird](/docs/composition-vs-inheritance.html#containment):


```js
function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
```

Dieses Muster ist für viele Fälle ausreichend, in denen man ein Kind von seinen unmittelbaren Eltern entkoppeln möchte. Du kannst es noch einen Schritt mit "[render props](/docs/render-props.html)" weitertreiben, wenn das Kind mit dem Elternteil vor dem Rendern kommunizieren muss.

Manchmal jedoch müssen die gleichen Daten von vielen Komponenten im Baum auf verschiedenen Schichten erreichbar sein. Mit Kontext kannst du solche Daten und dessen Veränderungen zu allen nachfolgenden Komponenten "broadcasten". Gängige Beispiele, bei denen das Verwenden von Kontext einfacher ist als eine der Alternativen inkludieren das Managen von aktuellen lokalen Daten, Theme oder Daten Cache.

## API {#api}

### `React.createContext` {#reactcreatecontext}

```js
const MyContext = React.createContext(defaultValue);
```

Erstellt ein Kontext-Objekt. Wenn React eine Komponente rendert, die dieses Kontext-Objekt abonniert hat, wird es den aktuellen Kontext-Wert des am meisten übereinstimmenden `Providers`, welcher im Baum oberhalb des Wertes ist, lesen.

Das `defaultValue` Argument wird **nur** dann benützt, wenn eine Komponente keinen übereinstimmenden Provider im Baum oberhalb hat. Das kann für das isolierte Testen von Komponenten, ohne sie umwickeln zu müssen, hilfreich sein. Beachte: `undefined` als übergebener Providerwert verursacht nicht, dass `defaultValue` von konsumierenden Komponenten verwendet wird.

### `Context.Provider` {#contextprovider}

```js
<MyContext.Provider value={/* irgendein Wert */}>
```

Jedes Kontext-Objekt kommt mit einer Provider React Komponente, welche konsumierenden Komponenten erlaubt, die Veränderungen von Kontext zu abonnieren.

Ein `value` Prop wird von konsumierenden Komponenten akzeptiert, welche von dem Provider abstammen. Ein Provider kann mit vielen Konsumenten verbunden sein. Provider können genestet werden, um tiefer im Baum liegende Werte zu überschreiben.

Alle Konsumenten, welche von dem Provider abstammen, werden rerendert, wenn sich das `value` Prop des Providers ändert. Die Verbreitung des Providers zu dessen abstammenden Konsumenten hängt nicht von der `shouldComponentUpdate` Methode ab, weshalb der Konsument ein Update bekommt, auch wenn eine zuvorkommende Komponente aus dem Update ausbricht.

Veränderungen werden mit dem Vergleichen des neuen und alten Werten ermittelt, welches den gleichen Algorithmus wie [`Object.is`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) verwendet.

> Beachte
> 
> Diese Art und Weise wie Veränderungen ermittelt werden, kann Probleme schaffen, wenn Objekte als `value` überreicht werden: siehe [Fallen](#caveats)

### `Class.contextType` {#classcontexttype}

```js
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* führe einen Nebeneffekt beim Mounten mit dem Wert von MyContext beim Mounten aus */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* rendere etwas basierend auf dem Wert von MyContext */
  }
}
MyClass.contextType = MyContext;
```

Das `contextType` Prop einer Klasse kann mit [`React.createContext()`](#reactcreatecontext) ein Kontext-Objekt zugewiesen werden. Das lässt dich den nahestehensten aktuellen Wert des Kontext-Types, welcher `this.context` verwendet, konsumieren. Du kannst auf das in jeder Lifecycle-Methode, inklusive der Render-Funktion verweisen.

> Beachte:
>
> Du kannst nur einen einzigen Kontext mit dieser API abonnieren. Falls du mehrere benötigst, kannst du hier mehr darüber lesen: [Konsumieren von mehreren Kontexte](#consuming-multiple-contexts)
>
> Falls du die experimentellen ["public class fields syntax"](https://babeljs.io/docs/plugins/transform-class-properties/) verwendest, kannst du das **static** Klassen-Feld verwenden, um deinen `contextType` zu initialisieren.

```js
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* rendere etwas auf dem Wert basierend */
  }
}
```

### `Context.Consumer` {#contextconsumer}

```js
<MyContext.Consumer>
  {value => /* rendere etwas auf dem Kontext-Wert basierend */}
</MyContext.Consumer>
```

Eine React-Komponente die Kontext-Veränderungen abonniert hat. Das lässt dich einen Kontext innerhalb einer [Funktions-Komponente](/docs/components-and-props.html#function-and-class-components) abonnieren.

Benötigt eine [Funktion als Kind](/docs/render-props.html#using-props-other-than-render). Diese Funktion erhält den aktuellen Kontext-Wert und gibt einen React-Knoten zurück. Das der Funktion übergebende `value` Argument wird mit dem `value` Prop des nahestehensten Provider von diesem Kontext im Baum darüber übereinstimmen. Falls es keinen Provider für diesen Kontext im Baum oberhalb gibt, wird das `value` Argument mit dem `defaultValue`, welches `createContext()` übergeben wurde, übereinstimmen.

> Beachte
> 
> Für nähere Informationen über das 'Funkion als Kind' Muster, siehe [render props](/docs/render-props.html).

## Beispiele {#examples}

### Dynamischer Kontext {#dynamic-context}

Ein komplizierteres Beispiel mit dynamischen Werten für ein Theme:

**theme-context.js**
`embed:context/theme-detailed-theme-context.js`

**themed-button.js**
`embed:context/theme-detailed-themed-button.js`

**app.js**
`embed:context/theme-detailed-app.js`

### Updaten des Kontextes von einer genesteten Komponente {#updating-context-from-a-nested-component}

Oft ist es nötig, den Kontext von einer Komponente zu updaten, die sehr tief innerhalb des Komponenten-Baumes sitzt. In diesem Fall kannst du eine Funktion durch den Kontext übergeben, welche es allen Konsumenten ermöglicht, den Kontext zu updaten:

**theme-context.js**
`embed:context/updating-nested-context-context.js`

**theme-toggler-button.js**
`embed:context/updating-nested-context-theme-toggler-button.js`

**app.js**
`embed:context/updating-nested-context-app.js`

### Konsumieren mehrerer Kontexten {#consuming-multiple-contexts}

Um einem Kontext das schnelle Rerendern beizubehalten, muss React für einen Kontext-Konsumenten einen eigenen Knoten im Baum erstellen.

`embed:context/multiple-contexts.js`

Falls zwei oder mehr Kontext-Werte oft gemeinsam verwendet werden, sollte man vielleicht überlegen, ob man eine eigene Render Prop Komponente erstellt, die beide Werte zur Verfügung stellt.

## Fallen {#caveats}

Da Kontext eine Referenz-Identität verwendet, um festzustellen, wann es rerendern soll, gibt es einige Fallen die ungewollte Renders in Komsumten auslösen können, wenn ein Elternteil eines Providers rerendert. Der untenstehende Code zum Beispiel wird alle Konsumenten jedes Mal wenn der Provider rerendert, rerendern, weil jedes Mal ein neues Objekt für `value` erstellt wird:

`embed:context/reference-caveats-problem.js`


Um dieses Problem zu umgehen, hebe den Wert in den State des Elternteils:

`embed:context/reference-caveats-solution.js`

## Legacy API {#legacy-api}

> Beachte
> 
> Früher hat React eine experimentelle Kontext API geliefert. Diese alte API wird von allen 16.x Releases supported, jedoch sollten alle Applikationen die es verwenden, zur neuesten Version migrieren. Diese Legacy API wird in zukünftigen React Versionen entfernt werden. Lese die [Legacy Kontext Dokumentation hier](/docs/legacy-context.html).
 
