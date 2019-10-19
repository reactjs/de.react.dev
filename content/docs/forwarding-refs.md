---
id: forwarding-refs
title: Weiterleiten von Refs
permalink: docs/forwarding-refs.html
---

Weiterleiten von Refs ist eine Technik für das automatische Weiterleiten einer [ref](/docs/refs-and-the-dom.html) durch eine Komponente zum einem der Kinder dieser Komponente. Dies ist des Öfteren nicht notwendig für die meisten Komponenten in der Applikation. Nichtsdestotrotz, kann es für gewisse Art von Komponenten nützlich sein, vor allem wenn es sich dabei um wiederverwendbare Komponenten-Bibliotheken handelt. Die gängisten Szenarien werden unterhalb beschrieben.

## Weiterleiten von Refs zu DOM-Komponenten {#forwarding-refs-to-dom-components}

Stelle dir eine `FancyButton` Komponente vor, welche das native `button` DOM-Element rendert:
`embed:forwarding-refs/fancy-button-simple.js`

React Komponenten verbergen ihre Implemenentierungsdetails, einschließlich der gerenderten Ausgabe. Andere Komponenten die `FancyButton` benutzen, werden **in den meisten Fällen keine Notwendigkeit** für den [Abruf einer Ref](/docs/refs-and-the-dom.html) zum inneren `button` DOM-Element haben. Das ist gut so, da dies eine zu starke Abhängigkeit unter den Komponenten auf die gegenseitige DOM-Struktur verhindert.

Trotz der Tatsache, dass solch eine Kapselung für Komponenten in der Anwendungsebene wie `FeedStory` oder `Comment` erwünscht ist, kann dies für "Blatt-Komponenten" mit hoher Wiederverwendbarkeit wie `FancyButton` oder `MyTextInput` unpraktisch sein. Diese Komponenten werden oft in der ganzen Anwendung als reguläre DOM `button` und `input` auf ähnliche Weise eingesetzt und der Zugriff auf dessen DOM-Knoten könnte für die Regelung von Fokus, Auswahl oder Animationen unvermeidlich sein.

**Ref Weiterleitung ist ein Opt-In Feature, welches manchen Komponenten die Möglichkeit bereitstellt, eine erhaltene `ref` weiter nach unten zu einem Kind durchzulassen (in anderen Worten, "weiterleiten").**

Im unteren Beispiel benutzt `FancyButton` `React.forwardRef`, um die übermittelte `ref` abzurufen und diese dann an den gerenderten DOM `button` zu weiterleiten.

`embed:forwarding-refs/fancy-button-simple-ref.js`

In diesem Fall, können die Komponenten die `FancyButton` nutzen, das Ref zum unterliegenden `button` DOM-Knoten abrufen und dies bei bedarf nutzen—so als ob sie direkt auf den DOM `button` zugreifen würden.

Hier ist eine Schritt für Schritt erklärung was im oberen Beispiel passiert:

1. We create a [React ref](/docs/refs-and-the-dom.html) by calling `React.createRef` and assign it to a `ref` variable.
1. We pass our `ref` down to `<FancyButton ref={ref}>` by specifying it as a JSX attribute.
1. React passes the `ref` to the `(props, ref) => ...` function inside `forwardRef` as a second argument.
1. We forward this `ref` argument down to `<button ref={ref}>` by specifying it as a JSX attribute.
1. When the ref is attached, `ref.current` will point to the `<button>` DOM node.

>Note
>
>The second `ref` argument only exists when you define a component with `React.forwardRef` call. Regular function or class components don't receive the `ref` argument, and ref is not available in props either.
>
>Ref forwarding is not limited to DOM components. You can forward refs to class component instances, too.

## Note for component library maintainers {#note-for-component-library-maintainers}

**When you start using `forwardRef` in a component library, you should treat it as a breaking change and release a new major version of your library.** This is because your library likely has an observably different behavior (such as what refs get assigned to, and what types are exported), and this can break apps and other libraries that depend on the old behavior.

Conditionally applying `React.forwardRef` when it exists is also not recommended for the same reasons: it changes how your library behaves and can break your users' apps when they upgrade React itself.

## Forwarding refs in higher-order components {#forwarding-refs-in-higher-order-components}

This technique can also be particularly useful with [higher-order components](/docs/higher-order-components.html) (also known as HOCs). Let's start with an example HOC that logs component props to the console:
`embed:forwarding-refs/log-props-before.js`

The "logProps" HOC passes all `props` through to the component it wraps, so the rendered output will be the same. For example, we can use this HOC to log all props that get passed to our "fancy button" component:
`embed:forwarding-refs/fancy-button.js`

There is one caveat to the above example: refs will not get passed through. That's because `ref` is not a prop. Like `key`, it's handled differently by React. If you add a ref to a HOC, the ref will refer to the outermost container component, not the wrapped component.

This means that refs intended for our `FancyButton` component will actually be attached to the `LogProps` component:
`embed:forwarding-refs/fancy-button-ref.js`

Fortunately, we can explicitly forward refs to the inner `FancyButton` component using the `React.forwardRef` API. `React.forwardRef` accepts a render function that receives `props` and `ref` parameters and returns a React node. For example:
`embed:forwarding-refs/log-props-after.js`

## Displaying a custom name in DevTools {#displaying-a-custom-name-in-devtools}

`React.forwardRef` accepts a render function. React DevTools uses this function to determine what to display for the ref forwarding component.

For example, the following component will appear as "*ForwardRef*" in the DevTools:

`embed:forwarding-refs/wrapped-component.js`

If you name the render function, DevTools will also include its name (e.g. "*ForwardRef(myFunction)*"):

`embed:forwarding-refs/wrapped-component-with-function-name.js`

You can even set the function's `displayName` property to include the component you're wrapping:

`embed:forwarding-refs/customized-display-name.js`
