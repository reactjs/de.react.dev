---
id: lifting-state-up
title: State anheben
permalink: docs/lifting-state-up.html
prev: forms.html
next: composition-vs-inheritance.html
redirect_from:
  - "docs/flux-overview.html"
  - "docs/flux-todo-list.html"
---

Häufig müssen mehrere Komponenten dieselben sich ändernden Daten widerspiegeln. Wir empfehlen, den gemeinsamen State bis zum nächsten gemeinsamen Vorfahren anzuheben. Schauen wir uns anhand eines Beispiels an, wie das funktioniert.

In diesem Abschnitt erstellen wir einen Temperaturrechner, der berechnet, ob das Wasser bei einer bestimmten Temperatur kocht.

Wir beginnen mit einer Komponente namens `BoilingVerdict`. Sie akzeptiert die Temperatur in Celsius als Prop und gibt aus, ob diese ausreichend ist, um das Wasser zu kochen:

```js{3,5}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

Als Nächstes erstellen wir eine Komponente namens `Calculator`. Sie rendert ein `<input>`, in das man die Temperatur eingeben kann, und speichert den Wert in `this.state.temperature`.

```js{5,9,13,17-21}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

## Ein zweites Eingabefeld hinzufügen {#adding-a-second-input}

Unsere neue Anforderung ist es, zusätzlich zu einem Celsius-Eingabefeld, ein Fahrenheit-Eingabefeld bereitzustellen und beide synchron zu halten.

Wir können mit dem Extrahieren einer `TemperatureInput` Komponente aus `Calculator` beginnen. Wir werden ihr eine neue `scale` Prop hinzufügen, die entweder "c" oder "f" sein kann:

```js{1-4,19,22}
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Wir können jetzt `Calculator` anpassen, um zwei separate Temperatur-Eingabefelder zu rendern:

```js{5,6}
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

Wir haben jetzt zwei Eingabefelder. Aber wenn du die Temperatur in eines von ihnen eingibst, wird das andere nicht aktualisiert. Das widerspricht unserer Anforderung: wir wollen sie synchron halten.

`BoilingVerdict` kann auch nicht von `Calculator` aus angezeigt werden. `Calculator` kennt die aktuelle Temperatur nicht, da sie in `TemperatureInput` verborgen ist.

## Konverterfunktionen schreiben {#writing-conversion-functions}

Zuerst schreiben wir zwei Funktionen, um von Celsius nach Fahrenheit und zurück zu konvertieren:

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

Diese beiden Funktionen konvertieren Zahlen. Wir schreiben eine weitere Funktion, die eine Zeichenfolge `temperature` und eine Konverterfunktion als Argumente akzeptiert und eine Zeichenfolge zurückgibt. Wir werden sie verwenden, um den Wert eines Eingabefelds basierend auf dem anderen Eingabefeld zu berechnen.

Ist `temperature` ungültig, gibt sie eine leere Zeichenfolge zurück. Außerdem rundet sie die Ausgabe auf die dritte Dezimalstelle:

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

Beispielsweise gibt `tryConvert('abc', toCelsius)` eine leere Zeichenfolge zurück, und `tryConvert('10 .22 ', toFahrenheit)` gibt `'50.396'` zurück.

## State anheben {#lifting-state-up}

Derzeit speichern beide `TemperatureInput` Komponenten ihre Werte unabhängig voneinaner im lokalen State:

```js{5,9,13}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...
```

Wir möchten jedoch, dass diese beiden Eingabefelder miteinander synchron sind. Wenn wir das Celsius-Eingabefeld aktualisieren, sollte das Fahrenheit-Eingabefeld die umgerechnete Temperatur widerspiegeln und umgekehrt.

In React ist gemeinsam genutzter State möglich, indem er auf den nächsten gemeinsamen Vorfahren der Komponenten verschoben wird, die ihn benötigen. Dies wird als "Anheben von State" bezeichnet. Wir werden den lokalen State aus `TemperatureInput` entfernen und ihn stattdessen in die `Calculator` Komponente verschieben.

Wenn `Calculator` den gemeinsam genutzten State verwaltet, wird er in beiden Eingabefeldern zur "Quelle der Wahrheit" für die aktuelle Temperatur. `Calculator` kann beide anweisen Werte zu haben, die miteinander übereinstimmen. Da die Props beider `TemperatureInput` Komponenten von derselben übergeordneten `Calculator` Komponente stammen, sind die beiden Eingabefelder immer synchron.

Schauen wir uns Schritt für Schritt an, wie das funktioniert.

Zuerst werden wir in der `TemperatureInput` Komponente `this.state.temperature` durch `this.props.temperature` ersetzen. Für den Moment tun wir einfach so, als ob `this.props.temperature` bereits vorhanden wäre, obwohl wir es erst noch von `Calculator` aus übergeben müssen:

```js{3}
  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

Wir wissen, dass Props schreibgeschützt sind. Wenn sich `temperature` im lokalen State befindet, kann `TemperatureInput` einfach `this.setState()` aufrufen, um sie zu ändern. Jetzt, da die Temperatur von der übergeordneten Komponente als Prop kommt, hat `TemperatureInput` keine Kontrolle darüber.

In React wird das üblicherweise gelöst, indem man eine "kontrollierte Komponente" erzeugt. Genau wie das `<input>` DOM-Element sowohl eine `value` als auch eine `onChange` Prop akzeptiert, kann auch die benutzerdefinierte `TemperatureInput` Komponente sowohl die Temperatur als auch die `onTemperatureChange` Prop der übergeordneten `Calculator` Komponente akzeptieren.

Wenn nun `TemperatureInput` seine Temperatur aktualisieren möchte, ruft sie `this.props.onTemperatureChange` auf:

```js{3}
  handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

>Hinweis:
>
>Die Namen der Props `temperature` oder `onTemperatureChange` haben keine besondere Bedeutung in benutzerdefinierten Komponenten. Wir hätten sie auch anders nennen können, z.B. `value` und `onChange`, was eine gängige Konvention ist.

Die `onTemperatureChange` Prop wird zusammen mit der `temperature` Prop von der übergeordneten Komponente `Calculator` bereitgestellt. Die Änderung wird durch Modifizieren des eigenen lokalen State verarbeitet, sodass beide Eingabefelder mit den neuen Werten erneut gerendert werden. Wir werden uns sehr bald mit der neuen `Calculator` Implementierung beschäftigen.

Bevor wir uns mit den Änderungen in `Calculator` befassen, sollten wir uns nochmals die Änderungen an der `TemperatureInput` Komponente anschauen. Wir haben den lokalen State entfernt, und anstatt `this.state.temperature` auszulesen, greifen wir jetzt auf `this.props.temperature` zu. Anstatt `this.setState()` aufzurufen, wenn wir eine Änderung vornehmen möchten, rufen wir jetzt `this.props.onTemperatureChange()` auf, die von `Calculator` bereitgestellt wird:

```js{8,12}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Wenden wir uns nun der `Calculator` Komponente zu.

Wir speichern `temperature` und `scale` des aktuellen Eingabefelds in seinem lokalen State. Dies ist der State, den wir von den Eingabefeldern "angehoben" haben, und er wird für beide als "Quelle der Wahrheit" dienen. Es ist die minimale Darstellung aller Daten, die wir benötigen, um beide Eingabefelder zu rendern.

Wenn wir zum Beispiel 37 in das Celsius-Eingabefeld eingeben, ist der State der `Calculator` Komponente:

```js
{
  temperature: '37',
  scale: 'c'
}
```

Wenn wir in das Fahrenheit-Feld später 212 eingeben, ist der State von `Calculator`:

```js
{
  temperature: '212',
  scale: 'f'
}
```

Wir hätten den Wert beider Eingabefelder speichern können, das erweist sich jedoch als unnötig. Es reicht aus, den Wert des zuletzt geänderten Eingabefelds und den von ihre verwendete Maßeinheit zu speichern. Wir können dann den Wert des anderen Eingabefelds allein auf Grundlage der aktuellen Werte von `temperature` und `scale` ableiten.

Die Eingabefelder bleiben synchron, da ihre Werte aus demselben State berechnet werden:

```js{6,10,14,18-21,27-28,31-32,34}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

[**Probier es auf CodePen aus**](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

Unabhängig davon, welches Eingabefeld du bearbeitest, `this.state.temperature` und `this.state.scale` werden jetzt in `Calculator` aktualisiert. Bei einem der Eingabefelder wird der Wert unverändert übernommen, sodass alle Benutzereingaben erhalten bleiben und der andere Eingabewert immer auf dieser Basis neu berechnet wird.

<<<<<<< HEAD
Fassen wir nochmal zusammen, was passiert, wenn du ein Eingabefeld bearbeitest:
=======
* React calls the function specified as `onChange` on the DOM `<input>`. In our case, this is the `handleChange` method in the `TemperatureInput` component.
* The `handleChange` method in the `TemperatureInput` component calls `this.props.onTemperatureChange()` with the new desired value. Its props, including `onTemperatureChange`, were provided by its parent component, the `Calculator`.
* When it previously rendered, the `Calculator` had specified that `onTemperatureChange` of the Celsius `TemperatureInput` is the `Calculator`'s `handleCelsiusChange` method, and `onTemperatureChange` of the Fahrenheit `TemperatureInput` is the `Calculator`'s `handleFahrenheitChange` method. So either of these two `Calculator` methods gets called depending on which input we edited.
* Inside these methods, the `Calculator` component asks React to re-render itself by calling `this.setState()` with the new input value and the current scale of the input we just edited.
* React calls the `Calculator` component's `render` method to learn what the UI should look like. The values of both inputs are recomputed based on the current temperature and the active scale. The temperature conversion is performed here.
* React calls the `render` methods of the individual `TemperatureInput` components with their new props specified by the `Calculator`. It learns what their UI should look like.
* React calls the `render` method of the `BoilingVerdict` component, passing the temperature in Celsius as its props.
* React DOM updates the DOM with the boiling verdict and to match the desired input values. The input we just edited receives its current value, and the other input is updated to the temperature after conversion.
>>>>>>> fb382ccb13e30e0d186b88ec357bb51e91de6504

* React ruft die als `onChange` angegebene Funktion im DOM-Element `<input>` auf. In unserem Fall ist dies die `handleChange` Methode in der `TemperatureInput` Komponente.
* Die `handleChange` Methode der `TemperatureInput` Komponente ruft `this.props.onTemperatureChange()` mit dem neuen gewünschten Wert auf. Ihre Props, einschließlich `onTemperatureChange`, wurden von der übergeordneten `Calculator` Komponente bereitgestellt.
* Als die `Calculator` Komponente zuletzt gerendert wurde, hat sie festgelegt, dass `onTemperatureChange` der Celsius `TemperatureInput` Komponente ihre `handleCelsiusChange` Methode ist, und `onTemperatureChange` der Fahrenheit `TemperatureInput` Komponente ihre `handleFahrenheitChange` Methode. Eine dieser beiden Methoden von `Calculator` wird also aufgerufen, je nachdem welche Eingabe wir bearbeitet haben.
* Innerhalb dieser Methoden fordert die `Calculator` Komponente React auf sich selbst erneut zu rendern, indem `this.setState()` mit dem neuen Eingabewert und der aktuellen Maßeinheit des gerade bearbeiteten Eingabefelds aufgerufen wird.
* React ruft die Render-Methode der `Calculator` Komponente auf, um zu erfahren, wie die Benutzeroberfläche aussehen soll. Die Werte beider Eingabefelder werden basierend auf der aktuellen Temperatur und des aktiven Maßstabs neu berechnet. Die Temperaturkonvertierung wird an dieser Stelle durchgeführt.
* React ruft die Render-Methoden der einzelnen `TemperatureInput` Komponenten mit ihren neuen, von `Calculcator` festgelegten Props auf. Es erfährt so, wie ihre Benutzeroberfläche aussehen soll.
* React ruft die Render-Methode der `BoilingVerdict` Komponente auf und übergibt die Temperatur in Celsius als Prop.
* React DOM aktualisiert das DOM mit dem kochenden Ergebnis und den gewünschten Eingabewerten. Das gerade bearbeitete Eingabefeld erhält seinen aktuellen Wert und das andere Eingabefeld wird nach der Umrechnung auf die entsprechende Temperatur aktualisiert.

Bei jedem Update werden dieselben Schritte durchlaufen, sodass die Eingabefelder synchron bleiben.

## Gewonnene Erkenntnisse {#lessons-learned}

Es sollte eine einzige "Quelle der Wahrheit" für alle Daten geben, die sich in einer React-Anwendung ändern. Normalerweise wird der State zuerst der Komponente hinzugefügt, die ihn zum Rendern benötigt. Wenn andere Komponenten ihn ebenfalls benötigen, kannst du ihn bis zu ihrem nächsten gemeinsamen Vorfahren anheben. Anstatt zu versuchen den State zwischen verschiedenen Komponenten zu synchronisieren, solltest du dich auf den [Top-Down-Datenfluss](/docs/state-and-lifecycle.html#the-data-flows-down) verlassen.

Beim Anheben des State muss mehr Code geschrieben werden als bei einer so genannten "bidirektionalen Bindung" (two-way binding). Der Vorteil ist jedoch, dass weniger Arbeit erfoderlich ist, um Fehler zu finden und zu isolieren. Da jeder State in einer Komponente "lebt" und nur diese Komponente ihn ändern kann, ist der Spielraum für Fehler stark eingeschränkt. Darüber hinaus kannst du jegliche benutzerdefinierte Logik implementieren, um Benutzereingaben abzulehnen oder umzuwandeln.

Wenn etwas aus den Props oder dem State abgeleitet werden kann, sollte es wahrscheinlich nicht im State sein. Anstatt `celsiusValue` und `fahrenheitValue` zu speichern, speichern wir nur die zuletzt bearbeitete Temperatur und deren Maßeinheit. Der Wert der anderen Eingabefelder kann in der Methode `render()` immer daraus berechnet werden. Auf diese Weise können wir das andere Feld löschen oder Rundungen anwenden, ohne dass dabei die Genauigkeit der Benutzereingaben verloren geht.

Wenn in der Benutzeroberfläche etwas nicht stimmt, kannst du die Props mithilfe der [React Developer Tools](https://github.com/facebook/react/tree/master/packages/react-devtools) überprüfen und den Komponenten-Baum nach oben durchgehen, bis du die für die Aktualisierung des State verantwortliche Komponente findest. So kannst du Fehler bis zu ihrer Quelle zurückverfolgen:

<img src="../images/docs/react-devtools-state.gif" alt="State in React DevTools überwachen" max-width="100%" height="100%">
