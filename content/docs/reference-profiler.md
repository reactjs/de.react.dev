---
id: profiler
title: Profiler API
layout: docs
category: Reference
permalink: docs/profiler.html
---

Der `Profiler` misst, wie oft eine React-Anwendung rendert und wie hoch die "Kosten" des Renderns sind. 
Sein Zweck besteht darin, Teile einer Anwendung zu identifizieren, die langsam sind und von [Optimierungen wie Memoisierung](/docs/hooks-faq.html#how-to-memoize-calculations) profitieren könnten.

> Hinweis:
>
> Profiling fügt zusätzlichen Overhead hinzu, sodass **es im [Produktions-Build](/docs/optimizing-performance.html#use-the-production-build) deaktiviert ist**.
> 
> Um sich für Profiling in der Produktion zu entscheiden, bietet React einen speziellen Produktions-Build mit aktiviertem Profiling. Lesen Sie mehr über die Verwendung dieses Builds unter [fb.me/react-profiling](https://fb.me/react-profiling)

## Verwendung {#usage}

Ein `Profiler` kann überall in einem Reactbaum hinzugefügt werden, um die Kosten für das Rendern dieses Teils des Baums zu messen. 
Es erfordert zwei Props: eine `id` (String) und einen `onRender`-Callback (Funktion), die React jedes Mal aufruft, wenn eine Komponente innerhalb des Baums ein Update "committet".

Um beispielsweise eine `Navigation`-Komponente und ihre Nachkommen zu profilieren:

```js{3}
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
```

Mehrere `Profiler`-Komponenten können verwendet werden, um verschiedene Teile einer Anwendung zu messen:

```js{3,6}
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Profiler id="Main" onRender={callback}>
      <Main {...props} />
    </Profiler>
  </App>
);
```

`Profiler`-Komponenten können auch verschachtelt werden, um verschiedene Komponenten innerhalb desselben Unterbaums zu messen:

```js{3,5,8}
render(
  <App>
    <Profiler id="Panel" onRender={callback}>
      <Panel {...props}>
        <Profiler id="Content" onRender={callback}>
          <Content {...props} />
        </Profiler>
        <Profiler id="PreviewPane" onRender={callback}>
          <PreviewPane {...props} />
        </Profiler>
      </Panel>
    </Profiler>
  </App>
);
```

> Hinweis
>
> Obwohl `Profiler` eine leichtgewichtige Komponente ist, sollte sie nur bei Bedarf verwendet werden. Jede Verwendung fügt einer Anwendung etwas CPU- und Speicher-Overhead hinzu.

## `onRender` Callback {#onrender-callback}

Der `Profiler` benötigt eine `onRender`-Funktion als Prop.
React ruft diese Funktion jedes Mal auf, wenn eine Komponente innerhalb des profilierten Baums eine Aktualisierung "übergibt".
Es erhält Parameter, die beschreiben, was gerendert wurde und wie lange es gedauert hat.

```js
function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  // Aggregate or log render timings...
}
```

Schauen wir uns die einzelnen Props genauer an:

* **`id: string`** -
Das 'id'-Prop des `Profiler`-Baums, der gerade übergeben wurde.
Dies kann verwendet werden, um zu identifizieren, welcher Teil des Baums festgeschrieben wurde, wenn Sie mehrere Profiler verwenden.
* **`phase: "mount" | "update"`** -
Gibt an, ob der Baum gerade zum ersten Mal gemountet oder aufgrund einer Änderung der Props, des Status oder der Hooks neu gerendert wurde.
* **`actualDuration: number`** -
Zeit, die für das Rendern des `Profiler` und seiner Nachkommen für das aktuelle Update aufgewendet wurde.
Dies zeigt an, wie gut der Teilbaum von Memoization Gebrauch macht (z. B. [`React.memo`](/docs/react-api.html#reactmemo), [`useMemo`](/docs/hooks-reference.html#usememo), [`shouldComponentUpdate`](/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate)).
Idealerweise sollte dieser Wert nach dem anfänglichen Einhängen deutlich sinken, da viele der Nachkommen nur erneut rendern müssen, wenn sich ihre spezifischen Props ändern.
* **`baseDuration: number`** -
Dauer der letzten `render`-Zeit für jede einzelne Komponente innerhalb des `Profiler`-Baums.
Dieser Wert schätzt die Kosten des Renderns im schlimmsten Fall (z. B. das anfängliche Einhängen oder ein Baum ohne Memoisierung).
* **`startTime: number`** -
Zeitstempel, wann React mit dem Rendern des aktuellen Updates begonnen hat.
* **`commitTime: number`** -
Zeitstempel, als React das aktuelle Update committed hat.
Dieser Wert wird von allen Profilern in einem Commit gemeinsam genutzt, sodass sie bei Bedarf gruppiert werden können.
* **`interactions: Set`** -
Satz von ["Interaktionen"](https://fb.me/react-interaction-tracing), die nachverfolgt wurden, als das Update geplant wurde (z. B. wenn `render` oder `setState` aufgerufen wurden).

> Hinweis
>
> Interaktionen können verwendet werden, um die Ursache eines Updates zu identifizieren, obwohl die API zu ihrer Verfolgung noch experimentell ist.
>
> Erfahren Sie mehr darüber unter [fb.me/react-interaction-tracing](https://fb.me/react-interaction-tracing)
