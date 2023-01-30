---
id: reconciliation
title: Abgleich
permalink: docs/reconciliation.html
---

> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Preserving and Resetting State](https://beta.reactjs.org/learn/preserving-and-resetting-state)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

React bietet eine deklarative API, sodass du dich nicht bei jeder Aktualisierung um die genauen Änderungen kümmern musst. Dies erleichtert das Erstellen von Anwendungen erheblich. Es ist jedoch möglicherweise nicht offensichtlich, wie dies in React implementiert ist. Dieser Artikel erklärt welche Entscheidungen wir in Reacts Vergleichsalgorithmus getroffen haben, damit Komponentenaktualisierungen vorhersehbar und gleichzeitig schnell genug für leistungsstarke Apps sind.

## Motivation {#motivation}

Wenn du React verwendest, kannst du dir die `render()`-Funktion so vorstellen, dass sie zu einem bestimmten Zeitpunkt einen Baum von React-Elementen erstellt. Bei der nächsten Aktualisierung von State oder Props gibt diese `render()`-Funktion einen anderen Baum von React-Elementen zurück. React muss dann herausfinden, wie die Benutzeroberfläche effizient aktualisiert werden kann, um sie an den neuesten Baum anzupassen.

Es gibt einige generische Lösungen für dieses algorithmische Problem, die Mindestanzahl von Operationen zu generieren um einen Baum in einen anderen umzuwandeln. Die modernsten Algorithmen weisen jedoch eine Komplexität in der Größenordnung von O(n3) auf, wobei n die Anzahl der Elemente im Baum ist.

Würden wir diese in React verwenden, dann wären für das Anzeigen von 1000 Elementen Vergleiche in der Größenordnung von einer Milliarde notwenig, was viel zu aufwendig ist. Stattdessen implementiert React einen heuristischen O(n)-Algorithmus, der auf zwei Annahmen basiert:

1. Zwei Elemente unterschiedlicher Art erzeugen unterschiedliche Bäume.
2. Der Entwickler kann mit einer `key`-Prop andeuten, welche Kind-Elemente in verschiedenen Renderings stabil sein können.

In der Praxis gelten diese Annahmen für fast alle Anwendungsfälle.

## Der Vergleichsalgorithmus {#the-diffing-algorithm}

Beim Vergleichen ("diffing") zweier Bäume betrachtet React zuerst die beiden Wurzelelemente. Das Verhalten hängt von den Typen der Wurzelelemente ab.

### Elemente verschiedener Typen {#elements-of-different-types}

Wenn die Wurzelelemente unterschiedliche Typen haben, entfernt React den alten Baum und erstellt den neuen Baum von Grund auf neu. Ein Wechsel von `<a>` nach `<img>` oder von `<Article>` nach `<Comment>` oder von `<Button>` nach `<div>` führt zu einer vollständigen Neuerstellung.

Beim Entfernen eines Baumes werden alte DOM-Knoten gelöscht. Komponenteninstanzen erhalten den Befehl zum Ausführen von `componentWillUnmount()`. Beim Aufbau eines neuen Baums werden neue DOM-Knoten in das DOM eingefügt. Komponenteninstanzen erhalten den Befehl zum Ausführen von `UNSAFE_componentWillMount()` und dann `componentDidMount()`. Jeder mit dem alten Baum verknüpfte State geht verloren.

Alle Komponenten unterhalb der Wurzel werden ebenfalls geunmountet und ihr State wird gelöscht. Zum Beispiel beim Vergleichen von:

```xml
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```

>Note:
>
>Diese Methoden gelten als veraltet und du solltest sie in neuem Code [vermeiden](/blog/2018/03/27/update-on-async-rendering.html):
>
>- `UNSAFE_componentWillMount()`

### DOM-Elemente desselben Typs {#dom-elements-of-the-same-type}

Beim Vergleich von zwei React-DOM-Elementen desselben Typs überprüft React die Attribute von beiden, behält denselben zugrunde liegenden DOM-Knoten bei und aktualisiert nur die geänderten Attribute. Zum Beispiel:

```xml
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

Durch den Vergleich dieser beiden Elemente weiß React, dass nur der Klassenname (`className`) auf dem zugrunde liegenden DOM-Knoten zu ändern ist.

Beim Aktualisieren von `style` weiß React ebenfalls, dass nur die geänderten Eigenschaften zu aktualisieren sind. Zum Beispiel:

```xml
<div style={{color: 'red', fontWeight: 'bold'}} />

<div style={{color: 'green', fontWeight: 'bold'}} />
```

Beim Konvertieren zwischen diesen beiden Elementen weiß React, dass nur der `color` style zu ändern ist und nicht `fontWeight`.

Nach der Behandlung des DOM-Knotens kehrt React zu den Kind-Knoten zurück.

### Komponentenelemente desselben Typs {#component-elements-of-the-same-type}

Wenn eine Komponente aktualisiert wird, bleibt die Instanz unverändert, sodass der State renderübergreifend beibehalten wird. React aktualisiert die Props der zugrunde liegenden Komponenteninstanz so, dass sie mit dem neuen Element übereinstimmen, und ruft `UNSAFE_componentWillReceiveProps()`, `UNSAFE_componentWillUpdate()` und `componentDidUpdate()` auf der zugrunde liegenden Instanz auf.

Als nächstes wird die `render()`-Methode aufgerufen und der Vergleichsalgorithmus rekursiv auf das vorherige und das neue Ergebnis angewendet.

>Note:
>
>Diese Methoden gelten als veraltet und du solltest sie in neuem Code [vermeiden](/blog/2018/03/27/update-on-async-rendering.html):
>
>- `UNSAFE_componentWillUpdate()`
>- `UNSAFE_componentWillReceiveProps()`

### Auf Kind-Elementen rekursieren {#recursing-on-children}

Standardmäßig durchläuft React bei einer Rekursion der Kind-Elemente eines DOM-Knotens beide Listen von Kind-Elementen gleichzeitig und generiert eine Mutation, wenn ein Unterschied besteht.

Wenn du beispielsweise ein Element am Ende der Kind-Elemente hinzufügst, funktioniert die Konvertierung zwischen diesen beiden Bäumen gut:

```xml
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

React übernimmt die beiden `<li>first</li>` Bäume, übernimmt ebenso die beiden `<li>second</li>` Bäume und fügt dann den `<li>thirds</li>` Baum ein.

Wenn du es unbedarft implementierst, hat das Einfügen eines Elements am Anfang eine schlechtere Leistung. Das Konvertieren zwischen diesen beiden Bäumen funktioniert beispielsweise schlecht:

```xml
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

React mutiert jedes Kind, anstatt zu realisieren, dass die Teilbäume `<li>Duke</li>` und `<li>Villanova</li>` intakt bleiben können. Diese Ineffizienz kann ein Problem sein.

### Schlüssel {#keys}

Um dieses Problem zu beheben, unterstützt React ein Schlüssel-Attribut: `key`. Wenn Kind-Elemente Schlüssel haben, verwendet React den Schlüssel, um Kind-Elemente in der ursprünglichen Struktur mit Kind-Elementen in der nachfolgenden Struktur abzugleichen. Wenn du beispielsweise einen Schlüssel zu unserem ineffizienten Beispiel oben hinzufügst, kann die Baumkonvertierung effizienter werden:

```xml
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

Jetzt weiß React, dass das Element mit dem Schlüssel `'2014'` das neue ist und die Elemente mit den Schlüsseln `'2015'` und `'2016'` gerade verschoben wurden.

In der Praxis ist es normalerweise nicht schwierig, einen Schlüssel zu finden. Das Element, das du anzeigen möchtest, verfügt möglicherweise bereits über eine eindeutige ID, sodass der Schlüssel einfach aus deinen Daten stammen kann:

```xml
<li key={item.id}>{item.name}</li>
```

Ist dies nicht der Fall, kannst du deinem Modell eine neue ID-Eigenschaft hinzufügen oder Teile des Inhalts mit einem Hash versehen, um einen Schlüssel zu generieren. Der Schlüssel muss nur unter Geschwister-Elementen eindeutig sein und nicht auf globaler Ebene.

Als letzte Möglichkeit kannst du den Index eines Elements im Array als Schlüssel übergeben. Dies kann gut funktionieren, wenn die Elemente nie neu angeordnet werden. Neuanordnungen werden jedoch langsam sein.

Neuanordnungen können auch Probleme mit dem State von Komponenten verursachen, wenn Indizes als Schlüssel verwendet werden. Komponenteninstanzen werden basierend auf ihrem Schlüssel aktualisiert und wiederverwendet. Wenn der Schlüssel ein Index ist, wird er durch Verschieben eines Elements geändert. Infolgedessen kann der State von Komponenten für Dinge wie ungesteuerte Eingabefelder auf unerwartete Weise verwechselt und aktualisiert werden.

[Hier](codepen://reconciliation/index-used-as-key) findest du ein Codepen-Beispiel für Probleme, die durch die Verwendung von Indizes als Schlüssel verursacht werden können. [Hier] (codepen://reconciliation/no-index-used-as-key) findest du eine aktualisierte Version desselben Beispiels, in der gezeigt wird, wie durch die Nichtverwendung von Indizes als Schlüssel diese Probleme beim Neuordnen, Sortieren und Voranstellen behoben werden.

## Kompromisse {#tradeoffs}

Es ist wichtig, sich daran zu erinnern, dass der Vergleichsalgorithmus ein Implementierungsdetail ist. React könnte die gesamte App bei jeder Aktion erneut rendern. Das Endergebnis wäre das gleiche. Nur um dies klarzustellen, re-rendern in diesem Kontext bedeutet, dass `render` für alle Komponenten aufgerufen wird. Das heißt jedoch nicht, dass React sie unmountet und dann wieder mountet. Es werden nur die Unterschiede angewendet, die den in den vorherigen Abschnitten beschriebenen Regeln entsprechen.

Wir verfeinern die Heuristiken regelmäßig, um gängige Anwendungsfälle zu beschleunigen. In der aktuellen Implementierung kannst du die Tatsache ausdrücken, dass ein Teilbaum zwischen seinen Geschwister-Elementen verschoben wurde. Du kannst jedoch nicht feststellen, dass er an eine andere Stelle verschoben wurde. Der Algorithmus rendert den vollständigen Teilbaum erneut.

Da sich React auf Heuristiken stützt, wirkt es sich negativ auf die Leistung aus, wenn die zugrunde liegenden Annahmen nicht erfüllt werden.

1. Der Algorithmus versucht nicht, Teilbäume verschiedener Komponententypen abzugleichen. Wenn du feststellst, dass du zwischen zwei Komponententypen mit sehr ähnlicher Ausgabe wechselst, solltest du möglicherweise denselben Typ festlegen. In der Praxis ist dies normalerweise kein Problem.

2. Schlüssel sollten stabil, vorhersehbar und eindeutig sein. Instabile Schlüssel (wie die von `Math.random()` erzeugten) führen dazu, dass viele Komponenteninstanzen und DOM-Knoten unnötigerweise neu erstellt werden, was zu Leistungseinbußen und zum Verlust des States in untergeordneten Komponenten führen kann.
