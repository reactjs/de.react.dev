---
title: Die React-Denkweise
---

<Intro>

React kann die Art und Weise verändern, wie du über die Designs, die du betrachtest, und die Anwendungen, die du erstellst, denkst. Wenn du eine Benutzeroberfläche mit React erstellst, wirst du sie zunächst in Teile zerlegen, die *Komponenten* genannt werden. Dann wirst du die verschiedenen visuellen Zustände für jede ihrer Komponenten beschreiben. Schließlich wirst du ihre Komponenten miteinander verbinden, damit die Daten durch sie fließen. In diesem Tutorial führen wir dich durch den Gedankenprozess der Erstellung einer durchsuchbaren Produktdatentabelle mit React.

</Intro>

## Beginne mit dem Mockup {/*start-with-the-mockup*/}

Stelle dir vor, du hast bereits eine JSON-API und ein Mockup von einem Designer.

Die JSON-API gibt einige Daten zurück, die wie folgt aussehen:

```json
[
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
```

Das Mockup sieht folgendermaßen aus:

<img src="/images/docs/s_thinking-in-react_ui.png" width="300" style={{margin: '0 auto'}} />

Um eine Benutzeroberfläche in React zu implementieren, folgst du normalerweise denselben fünf Schritten.

## Schritt 1: Zerlege die Benutzeroberfläche in eine Komponentenhierarchie {/*step-1-break-the-ui-into-a-component-hierarchy*/}

Beginne damit, Kästchen um jede Komponente und Unterkomponente im Mockup zu zeichnen und sie zu benennen. Wenn du mit Designern zusammenarbeitest, haben sie diese Komponenten vielleicht schon in ihrem Designtool benannt. Frage sie!

Je nach deinem Hintergrund kannst du darüber nachdenken, ein Design auf verschiedene Weisen in Komponenten aufzuteilen:

* **Programmierung** - Verwende dieselben Techniken, um zu entscheiden, ob du eine neue Funktion oder ein neues Objekt erstellen solltest. Eine dieser Techniken ist das [Single-Responsibility-Prinzip](https://de.wikipedia.org/wiki/Single-Responsibility-Prinzip), d.h. eine Komponente sollte idealerweise nur eine Aufgabe erfüllen. Wenn sie größer wird, sollte sie in kleinere Unterkomponenten zerlegt werden.
* **CSS**--Du solltest überlegen, wofür Klassenselektoren erstellt werden können. (Komponenten sind jedoch etwas weniger granular.)
* **Design**-überlege, wie die Ebenen des Designs organisiert werden können.

Wenn dein JSON gut strukturiert ist, wirst du oft feststellen, dass es sich auf natürliche Weise der Komponentenstruktur deiner Benutzeroberfläche anpasst. Das liegt daran, dass UI- und Datenmodelle oft dieselbe Informationsarchitektur haben, d. h. dieselbe Form. Unterteile die Benutzeroberfläche in Komponenten, wobei jede Komponente einem Teil deines Datenmodells entspricht.

Auf diesem Bildschirm gibt es fünf Komponenten:

<FullWidth>

<CodeDiagram flip>

<img src="/images/docs/s_thinking-in-react_ui_outline.png" width="500" style={{margin: '0 auto'}} />

1. `FilterableProductTable` (grau) enthält die gesamte Anwendung.
2. `SearchBar` (blau) empfängt die Benutzereingaben.
3. `ProductTable` (lavendel) zeigt die Liste an und filtert sie entsprechend der Benutzereingabe.
4. `ProductCategoryRow` (grün) zeigt eine Überschrift für jede Kategorie an.
5. `ProductRow` (gelb) zeigt eine Zeile für jedes Produkt an.

</CodeDiagram>

</FullWidth>

Wenn du dir `ProductTable` (lavender) ansehen, wirst du feststellen, dass der Tabellenkopf (der die Bezeichnungen "Name" und "Preis" enthält) keine eigene Komponente ist. Dies ist eine Frage der Vorliebe, du kannst so oder so vorgehen. In diesem Beispiel ist sie ein Teil von "ProductTable", weil sie innerhalb der Liste von `ProductTable` erscheint. Wenn diese Kopfzeile jedoch zu komplex wird (z.B. wenn du eine Sortierung hinzufügst), kannst du sie in eine eigene Komponente `ProductTableHeader` verschieben.

Nachdem du nun die Komponenten im Mockup identifiziert hast, ordnen sie in einer Hierarchie an. Komponenten, die innerhalb einer anderen Komponente im Mockup erscheinen, sollten in der Hierarchie als untergeordnete Komponenten erscheinen:

* `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
        * `ProductCategoryRow`
        * `ProductRow`

## Schritt 2: Erstellen einer statischen Version in React {/*step-2-build-a-static-version-in-react*/}

Nun, da du deine Komponentenhierarchie hast, ist es an der Zeit, deine Anwendung zu implementieren. Der einfachste Ansatz besteht darin, eine Version zu erstellen, die die Benutzeroberfläche aus deinem Datenmodell wiedergibt, ohne Interaktivität hinzuzufügen... noch nicht! Oft ist es einfacher, zuerst die statische Version zu erstellen und die Interaktivität später hinzuzufügen. Die Erstellung einer statischen Version erfordert viel Tipparbeit und kein Nachdenken, aber das Hinzufügen von Interaktivität erfordert viel Nachdenken und nicht viel Tipparbeit.

Um eine statische Version deiner Anwendung zu erstellen, die dein Datenmodell wiedergibt, solltest du [Komponenten](/learn/your-first-component) erstellen, die andere Komponenten wiederverwenden und Daten mithilfe von [props.](/learn/passing-props-to-a-component) weitergeben. (Wenn du mit dem Konzept von [state](/learn/state-a-components-memory) vertraut bist, verwende für die Erstellung dieser statischen Version überhaupt keinen State. State ist nur für Interaktivität reserviert, d.h. für Daten, die sich mit der Zeit ändern. Da es sich um eine statische Version der Anwendung handelt, brauchst du es nicht).

Man kann entweder "von oben nach unten" bauen, indem man mit den Komponenten beginnt, die in der Hierarchie weiter oben stehen (wie `FilterableProductTable`), oder "von unten nach oben", indem man mit Komponenten arbeitet, die weiter unten stehen (wie `ProductRow`). Bei einfacheren Beispielen ist es in der Regel einfacher, von oben nach unten vorzugehen, und bei größeren Projekten ist es einfacher, von unten nach oben vorzugehen.

<Sandpack>

```jsx src/App.js
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 10px;
}
td {
  padding: 2px;
  padding-right: 40px;
}
```

</Sandpack>

(Wenn dieser Code einschüchternd wirkt, solltest du zuerst den [Schnellstart](/learn/) durchgehen!)

Nachdem du deine Komponenten erstellt hast, hast du eine Bibliothek mit wiederverwendbaren Komponenten, die dein Datenmodell darstellen. Da es sich um eine statische App handelt, geben die Komponenten nur JSX zurück. Die Komponente an der Spitze der Hierarchie (`FilterableProductTable`) nimmt dein Datenmodell als Props. Das nennt man _Einweg-Datenfluss_, weil die Daten von der obersten Komponente zu den Komponenten am unteren Ende des Baums fließen.

<Pitfall>

Zu diesem Zeitpunkt solltest du noch keine State-Werte verwenden. Das ist für den nächsten Schritt!

</Pitfall>

## Schritt 3: Finde die minimale, aber vollständige Darstellung des UI-State {/*step-3-find-the-minimal-but-complete-representation-of-ui-state*/}

Um die Benutzeroberfläche interaktiv zu gestalten, musst du den Benutzern die Möglichkeit geben, das zugrunde liegende Datenmodell zu ändern. Dafür verwendest du den *State*.

Der State ist die minimale Menge an sich ändernden Daten, die sich deine App merken muss. Das wichtigste Prinzip für die Strukturierung des States ist [DRY (Don't Repeat Yourself)] (https://de.wikipedia.org/wiki/Don%E2%80%99t_repeat_yourself). Überlege dir die absolut minimale Darstellung des States, den deine Anwendung braucht, und berechne alles andere nach Bedarf. Wenn du zum Beispiel eine Einkaufsliste erstellst, kannst du die Artikel als Array in state speichern. Wenn du auch die Anzahl der Artikel in der Liste anzeigen willst, speicherst du die Anzahl der Artikel nicht als weiteren Statewert, sondern liest die Länge deines Arrays.

Denke jetzt an alle Daten in dieser Beispielanwendung:

1. Die ursprüngliche Liste der Produkte
2. Der Suchtext, den der Benutzer eingegeben hat
3. Der Wert des Kontrollkästchens
4. Die gefilterte Liste der Produkte

Welche davon sind State? Identifiziere die, die es nicht sind:

* Bleiben sie im Laufe der Zeit **unverändert**? Wenn ja, handelt es sich nicht um einen State.
* Wird es **von einem Parent** über Props übergeben? Wenn ja, handelt es sich nicht um einen State.
* **Berechnest du ihn** auf der Grundlage von bestehenden States oder Props in deiner Komponente? Wenn ja, handelt es sich *definitiv* nicht um einen State!

Was noch übrig ist, ist wahrscheinlich ein State.

Gehen wir sie noch einmal der Reihe nach durch:

1. Die ursprüngliche Liste der Produkte wird **als Props übergeben, also ist es kein State**.
2. Der Suchtext scheint ein State zu sein, da er sich im Laufe der Zeit ändert und nicht aus irgendetwas errechnet werden kann.
3. Der Wert des Kontrollkästchens scheint ein State zu sein, da er sich im Laufe der Zeit ändert und nicht aus einem Wert berechnet werden kann.
4. Die gefilterte Produktliste **ist kein State, denn sie kann berechnet werden**, indem man die ursprüngliche Produktliste nimmt und sie nach dem Suchtext und dem Wert des Kontrollkästchens filtert.

Das bedeutet, dass nur der Suchtext und der Wert des Kontrollkästchens State sind! Sehr gut gemacht!

<DeepDive>

#### Props vs. State {/*props-vs-state*/}

Es gibt zwei Arten von "Modell"-Daten in React: props und state. Die beiden sind sehr unterschiedlich:

* [**Props** sind wie Argumente, die du](/learn/passing-props-to-a-component) an eine Funktion übergibst. Mit ihnen kann eine übergeordnete Komponente Daten an eine untergeordnete Komponente weitergeben und ihr Aussehen anpassen. Zum Beispiel kann ein "Formular" die Eigenschaft "Farbe" an einen "Button" weitergeben.
* [**State** ist so etwas wie das Gedächtnis einer Komponente.](/learn/state-a-components-memory) Mit ihm kann eine Komponente bestimmte Informationen speichern und sie als Reaktion auf Interaktionen ändern. Ein "Button" kann zum Beispiel den State "isHovered" speichern.

Props und States sind unterschiedlich, aber sie arbeiten zusammen. Eine übergeordnete Komponente speichert oft einige Informationen als State (damit sie sie ändern kann) und *gibt sie als Props an die untergeordneten Komponenten weiter*. Es ist in Ordnung, wenn dir der Unterschied beim ersten Lesen noch unklar ist. Es braucht ein bisschen Übung, um es wirklich zu verstehen!

</DeepDive>

## Schritt 4: Bestimme, wo dein State leben soll {/*step-4-identify-where-your-state-should-live*/}

Nachdem du die minimalen State-Daten deiner App identifiziert hast, musst du herausfinden, welche Komponente für die Änderung dieses States verantwortlich ist oder den State *besitzt*. Denke daran: React verwendet einen einseitigen Datenfluss, bei dem die Daten in der Komponentenhierarchie von der Eltern- zur Kindkomponente weitergegeben werden. Es ist vielleicht nicht sofort klar, welche Komponente für welchen State zuständig ist. Das kann eine Herausforderung sein, wenn du dich mit diesem Konzept nicht auskennst, aber du kannst es herausfinden, wenn du diese Schritte befolgst!

Für jeden State in deiner Anwendung:

1. Identifiziere *jede* Komponente, die etwas auf der Grundlage dieses States rendert.
2. Finde die nächstgelegene gemeinsame Elternkomponente - eine Komponente, die in der Hierarchie über allen steht.
3. Entscheide, wo der State gespeichert werden soll:
    1. Oft kannst du den State direkt in die gemeinsame übergeordnete Komponente einfügen.
    2. Du kannst den Staat auch in eine Komponente über dem gemeinsamen Elternteil einfügen.
    3. Wenn du keine Komponente findest, in der es sinnvoll ist, den State zu speichern, erstelle eine neue Komponente, die nur den State enthält, und füge sie irgendwo in der Hierarchie über der gemeinsamen übergeordneten Komponente ein.

Im vorigen Schritt hast du zwei Zustände in dieser Anwendung gefunden: den Sucheingabetext und den Wert des Kontrollkästchens. Da sie in diesem Beispiel immer zusammen vorkommen, ist es sinnvoll, sie an der gleichen Stelle einzufügen.

Gehen wir jetzt unsere Strategie für sie durch:

1. **Identifiziere Komponenten, die einen State verwenden:**
    * Die "Produkttabelle" muss die Produktliste nach diesem State filtern (Suchtext und Wert des Kontrollkästchens).
    * Die "SearchBar" muss diesen State anzeigen (Suchtext und Wert des Kontrollkästchens).
1. **Finde ihre gemeinsame übergeordnete Komponente:** Die erste übergeordnete Komponente, die beide Komponenten gemeinsam haben, ist `FilterableProductTable`.
2. **Entscheide, wo der State bleibt**: Wir behalten den Filtertext und die geprüften Statewerte in "FilterableProductTable".

Die Statewerte werden also in "FilterableProductTable" gespeichert.

Füge der Komponente mit dem [`useState()` Hook](/reference/react/useState) Hooks sind spezielle Funktionen, mit denen du dich in React "einhaken" kannst. Füge zwei Statesvariablen am Anfang von "FilterableProductTable" hinzu und gib ihren Anfangs-State an:

```js
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
}  
```

Dann übergibst du `filterText` und `inStockOnly` an `ProductTable` und `SearchBar` als Props:

```js
<div>
  <SearchBar 
    filterText={filterText} 
    inStockOnly={inStockOnly} />
  <ProductTable 
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly} />
</div>
```

Jetzt kannst du sehen, wie sich deine Anwendung verhalten wird. Ändere den Ausgangswert von "filterText" im Sandbox-Code unten von `useState("")` auf `useState("fruit")`. Du wirst sehen, dass sowohl der Sucheingabetext als auch die Tabelle aktualisiert werden:

<Sandpack>

```jsx src/App.js
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."/>
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 5px;
}
td {
  padding: 2px;
}
```

</Sandpack>

Beachte, dass das Bearbeiten des Formulars noch nicht funktioniert. In der Sandbox oben gibt es einen Konsolenfehler, der erklärt, warum das so ist:

<ConsoleBlock level="error">

You provided a \`value\` prop to a form field without an \`onChange\` handler. This will render a read-only field.

</ConsoleBlock>

In der obigen Sandbox lesen `ProductTable` und `SearchBar` die Props `filterText` und `inStockOnly`, um die Tabelle, die Eingabe und das Kontrollkästchen darzustellen. So füllt zum Beispiel die "SearchBar" den Eingabewert auf:

```js {1,6}
function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."/>
    </form>
  )}
```

Du hast jedoch noch keinen Code hinzugefügt, um auf die Benutzeraktionen wie das Tippen zu reagieren. Das wird dein letzter Schritt sein.

## Step 5: Inversen Datenfluss hinzufügen {/*step-5-add-inverse-data-flow*/}

Derzeit wird deine App korrekt dargestellt, wenn Props und State in der Hierarchie nach unten fließen. Aber um den State entsprechend der Benutzereingabe zu ändern, musst du den Datenfluss in die andere Richtung unterstützen: Die Formularkomponenten tief in der Hierarchie müssen den State in `FilterableProductTable` aktualisieren.

React macht diesen Datenfluss explizit, aber er erfordert ein wenig mehr Tipparbeit als die Zwei-Wege-Datenbindung. Wenn du versuchst, das Kästchen im obigen Beispiel einzugeben oder anzukreuzen, wirst du feststellen, dass React deine Eingabe ignoriert. Das ist gewollt. Indem du `<input value={filterText} />` schreibst, hast du festgelegt, dass der "Wert" der Eingabe immer gleich dem "FilterText"-State ist, der von "FilterableProductTable" übergeben wird. Da der "filterText"-State nie gesetzt wird, ändert sich auch die Eingabe nicht.

Du möchtest, dass der State immer dann aktualisiert wird, wenn der Benutzer die Eingaben des Formulars ändert, um diese Änderungen widerzuspiegeln. Der State gehört zu `FilterableProductTable`, also kann nur sie `setFilterText` und `setInStockOnly` aufrufen. Damit die `SearchBar` den State der `FilterableProductTable` aktualisieren kann, musst du diese Funktionen an die `SearchBar` weitergeben:

```js {2,3,10,11}
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
    </div>
        )}
```

Innerhalb der `SearchBar` kannst du den `onChange`-Event-Handler hinzufügen and set the parent state from them:

```js {4,5,13,19}
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
```

Jetzt funktioniert die Anwendung vollständig!

<Sandpack>

```jsx src/App.js
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding: 4px;
}
td {
  padding: 2px;
}
```

</Sandpack>

Alles über den Umgang mit Ereignissen und die Aktualisierung des States erfährst du im Abschnitt [Interaktivität hinzufügen](/learn/adding-interactivity).

## Wo gehts weiter? {/*where-to-go-from-here*/}

Dies war eine sehr kurze Einführung in die Erstellung von Komponenten und Anwendungen mit React. Du kannst [gleich ein React-Projekt starten](/learn/installation) oder [tiefer in den Syntax eintauchen](/learn/describing-the-ui), die in diesem Tutorial verwendet wurde.
