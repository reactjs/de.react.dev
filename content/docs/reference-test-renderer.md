---
id: test-renderer
title: Test Renderer
permalink: docs/test-renderer.html
layout: docs
category: Reference
---

**Importieren**

```javascript
import TestRenderer from 'react-test-renderer'; // ES6
const TestRenderer = require('react-test-renderer'); // ES5 mit npm
```

## Überblick {#overview}

Dieses Paket stellt einen React-Renderer zu Verfügung, mit dem React Komponenten in reine Javascript-Objekte umgewandelt werden können, ohne dabei vom DOM oder einer nativen mobilen Umgebungen abhängig zu sein.

Im Grunde macht es dieses Paket einfach, einen Snapshot der Plattform-Hierarchie (ähnlich eines DOM-Baums) zu erstellen, der von einer React DOM oder React Native Komponente erstellt wurde, ohne einen Browser oder [jsdom](https://github.com/tmpvar/jsdom) zu verwenden.

Beispiel:

```javascript
import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

Du kannst das Snapshot-Test-Feature von Jest nutzen, um automatisch eine Kopie des JSON-Baums in einer Datei zu speichern und deine Tests daraufhin zu überprüfen, ob sie sich nicht geändert hat: [Erfahre mehr darüber](https://jestjs.io/docs/en/snapshot-testing).

Du kannst auch die Ausgabe durchlaufen, um bestimmte Knoten zu finden und über sie Aussagen zu treffen.

```javascript
import TestRenderer from 'react-test-renderer';

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Hallo</p>
    </div>
  )
}

function SubComponent() {
  return (
    <p className="sub">Sub</p>
  );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);
```

### TestRenderer {#testrenderer}

* [`TestRenderer.create()`](#testrenderercreate)
* [`TestRenderer.act()`](#testrendereract)

### TestRenderer Instanz {#testrenderer-instance}

* [`testRenderer.toJSON()`](#testrenderertojson)
* [`testRenderer.toTree()`](#testrenderertotree)
* [`testRenderer.update()`](#testrendererupdate)
* [`testRenderer.unmount()`](#testrendererunmount)
* [`testRenderer.getInstance()`](#testrenderergetinstance)
* [`testRenderer.root`](#testrendererroot)

### TestInstance {#testinstance}

* [`testInstance.find()`](#testinstancefind)
* [`testInstance.findByType()`](#testinstancefindbytype)
* [`testInstance.findByProps()`](#testinstancefindbyprops)
* [`testInstance.findAll()`](#testinstancefindall)
* [`testInstance.findAllByType()`](#testinstancefindallbytype)
* [`testInstance.findAllByProps()`](#testinstancefindallbyprops)
* [`testInstance.instance`](#testinstanceinstance)
* [`testInstance.type`](#testinstancetype)
* [`testInstance.props`](#testinstanceprops)
* [`testInstance.parent`](#testinstanceparent)
* [`testInstance.children`](#testinstancechildren)

## Referenz {#reference}

### `TestRenderer.create()` {#testrenderercreate}

```javascript
TestRenderer.create(element, options);
```

Erstellt eine `TestRenderer`-Instanz mit dem übergebenem React-Element. Der echte DOM wird nicht verwendet, dennoch rendert es den gesamten Komponentenbaum in den Speicher, sodass du Aussagen darüber machen kannst. Die zurückgegebene [TestRenderer-Instanz](#testrenderer-instance) hat folgende Methoden und Properties.

### `TestRenderer.act()` {#testrendereract}

```javascript
TestRenderer.act(callback);
```

Similar to the [`act()` helper from `react-dom/test-utils`](/docs/test-utils.html#act), `TestRenderer.act` prepares a component for assertions. Use this version of `act()` to wrap calls to `TestRenderer.create` and `testRenderer.update`.

```javascript
import {create, act} from 'react-test-renderer';
import App from './app.js'; // The component being tested

// render the component
let root; 
act(() => {
  root = create(<App value={1}/>)
});

// make assertions on root 
expect(root.toJSON()).toMatchSnapshot();

// update with some different props
act(() => {
  root = root.update(<App value={2}/>);
})

// make assertions on root 
expect(root.toJSON()).toMatchSnapshot();
```

### `testRenderer.toJSON()` {#testrenderertojson}

```javascript
testRenderer.toJSON()
```

Gibt ein Objekt, dass den gerenderten Baum darstellt, zurück. Dieser Baum enthält die plattformspezifischen Knoten wie `<div>` oder `<View>` und deren Props, enthält jedoch keine benutzergeschriebenen Komponenten. Das ist nützlich für das [Testen von Snapshots](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest).

### `testRenderer.toTree()` {#testrenderertotree}

```javascript
testRenderer.toTree()
```

<<<<<<< HEAD
Gibt ein Objekt, dass den gerenderten Baum darstellt, zurück. Im Gegensatz zu `toJSON()` ist diese Repräsentation detaillierter und beinhaltet benutzergeschriebene Komponenten. Wahrscheinlich wirst du diese Method nicht benötigen, außer du schreibst eine eigene Assertions-Bibliothek, welche auf Test Renderer aufbaut.
=======
Return an object representing the rendered tree. The representation is more detailed than the one provided by `toJSON()`, and includes the user-written components. You probably don't need this method unless you're writing your own assertion library on top of the test renderer.
>>>>>>> 8b30ae43439818009213da86eca872a3d869c5eb

### `testRenderer.update()` {#testrendererupdate}

```javascript
testRenderer.update(element)
```

Rerendert den sich im Speicher befindenden Baum mit einem neuen Wurzelelement, das ein React Update im Wurzel simuliert. Falls das neue Element den gleichen Typ und Schlüssel (*type* und *key*) als das vorhergehende Element hat, wird der Baum sich updaten; andererweise wird ein neuer Baum remounten.

### `testRenderer.unmount()` {#testrendererunmount}

```javascript
testRenderer.unmount()
```

Unmountet den sich im Speicher befindenden Baum und triggert die angemessenen Lifecycle-Events.

### `testRenderer.getInstance()` {#testrenderergetinstance}

```javascript
testRenderer.getInstance()
```

Falls vorhanden, gibt die Instanz zurück, die mit dem Wurzelelement übereinstimmt. Wenn das Wurzelelement eine Funktionskomponente ist, funktioniert das nicht, da diese keine Instanzen haben.

### `testRenderer.root` {#testrendererroot}

```javascript
testRenderer.root
```

Gibt das Wurzelobjekt der "Testinstanz" zurück, welches für das Erstellen von Behauptungen von spezifischen Knoten in dem Baum nützlich ist. Weiter unten siehst du, wie man andere "Testinstanzen" findet. 

### `testInstance.find()` {#testinstancefind}

```javascript
testInstance.find(test)
```

Findet eine einzelne nachkommende Testinstanz, bei der `test(testInstance)` `true` zurückgibt. Falls `test(testInstance)` für genau eine Testinstanz nicht `true` zurückgibt, wird ein Fehler geworfen.

### `testInstance.findByType()` {#testinstancefindbytype}

```javascript
testInstance.findByType(type)
```

Findet eine einzelne nachkommende Testinstanz mit dem bereitgestellten `type`. Falls es nicht genau eine Testinstanz mit dem bereitgestellten `type` gibt, wird ein Fehler geworfen.

### `testInstance.findByProps()` {#testinstancefindbyprops}

```javascript
testInstance.findByProps(props)
```

Findet eine einzelne nachkommende Testinstanz mit dem bereitgestellten `props`. Falls es nicht exact eine Testinstanz mit dem bereitgestellten `props` gibt, wird ein Fehler geworfen.

### `testInstance.findAll()` {#testinstancefindall}

```javascript
testInstance.findAll(test)
```
Findet alle nachkommenden Testinstanzen, bei der `test(testInstance)` `true` zurückgibt.

### `testInstance.findAllByType()` {#testinstancefindallbytype}

```javascript
testInstance.findAllByType(type)
```

Findet alle nachkommenden Testinstanzen mit dem bereitgestellten `type`.

### `testInstance.findAllByProps()` {#testinstancefindallbyprops}

```javascript
testInstance.findAllByProps(props)
```
Findet alle nachkommenden Testinstanzen mit den bereitgestellten `props`.

### `testInstance.instance` {#testinstanceinstance}

```javascript
testInstance.instance
```

Die Komponenteninstanz welche mit der Testinstanz übereinstimmt. Dies ist nur bei Klassenkomponenten verfügbar, da Funktionskomponenten keine Instanzen besitzen. Der Wert von `this` stimmt mit dem der mitgegebenen Komponente überein.

### `testInstance.type` {#testinstancetype}

```javascript
testInstance.type
```

Der Komponententyp welcher mit der Testinstanz übereinstimmt. Eine `<Button />` Komponente hat zum Beispiel den Typ `Button`.

### `testInstance.props` {#testinstanceprops}

```javascript
testInstance.props
```
Die Props welche mit der Testinstanz übereinstimmen. Eine `<Button size="small" />` Komponente besitzt zum Beispiel folgende Props `{size: 'small'}`.

### `testInstance.parent` {#testinstanceparent}

```javascript
testInstance.parent
```
Die Eltern-Testinstanz dieser Testinstanz.

### `testInstance.children` {#testinstancechildren}

```javascript
testInstance.children
```
Die Kind-Testinstanzen dieser Testinstanz.

## Ideas {#ideas}

Du kannst die `createNodeMock`-Funktion `TestRenderer.create` als Option mitgeben, welche speziell geschriebene Pseudoreferenzen (*custom mock refs*) ermöglicht. `createNodeMock` akzeptiert das aktuelle Element und sollte ein Pseudoreferenz-Objekt zurückgeben. Dies ist für das Testen von Komponenten nützlich, die von Referenzen abhängen.

```javascript
import TestRenderer from 'react-test-renderer';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.input = null;
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return <input type="text" ref={el => this.input = el} />
  }
}

let focused = false;
TestRenderer.create(
  <MyComponent />,
  {
    createNodeMock: (element) => {
      if (element.type === 'input') {
        // erstellt eine pseudo Fokusfunktion
        return {
          focus: () => {
            focused = true;
          }
        };
      }
      return null;
    }
  }
);
expect(focused).toBe(true);
```
