---
id: react-dom-server
title: ReactDOMServer
layout: docs
category: Reference
permalink: docs/react-dom-server.html
---

Mit dem `ReactDOMServer`-Objekt können Komponenten als statisches Markup gerendert werden. Normalerweise wird es auf einem Node-Server verwendet:

```js
// ES-Module
import ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## Übersicht {#overview}

Die folgenden Methoden können sowohl in Server- als auch in Browserumgebungen verwendet werden:

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

Diese zusätzlichen Methoden benötigen ein Package (`stream`), das **nur auf dem Server verfügbar** ist und im Browser nicht funktionieren wird:

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToReadableStream()`](#rendertoreadablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Referenz {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Rendert ein React-Element initial als HTML. React gibt einen HTML-String zurück. Du kannst diese Methode verwenden, um HTML auf dem Server zu generieren und beim ersten Request das Markup zurückzusenden, damit die Seite schneller lädt und Suchmaschinen zu SEO-Zwecken deine Seiten crawlen können.

<<<<<<< HEAD
Wenn du auf einen Knoten, der bereits dieses server-gerenderte Markup hat, [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) aufrufst, wird React das Markup behalten und nur Eventhandler hinzufügen. Das ermöglicht ein sehr schnelles erstes Laden der Seite.
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Ähnlich wie [`renderToString`](#rendertostring), außer dass es keine extra React-internen DOM-Attribute wie z. B. `data-reactroot` generiert. Das ist nützlich, wenn du React dazu verwenden willst, eine einfache statische Seite zu generieren, denn ohne diese extra Attribute können einige Bytes gespart werden.

<<<<<<< HEAD
Falls du planst, auf dem Client React zu benutzten, um das Markup interaktiv zu gestalten, solltest du diese Methode nicht benutzen. Verwende stattdessen [`renderToString`](#rendertostring) auf dem Server und [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) auf dem Client.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

Render a React element to its initial HTML. Returns a [Control object](https://github.com/facebook/react/blob/3f8990898309c61c817fbf663f5221d9a00d0eaa/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L49-L54) that allows you to pipe the output or abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" later through javascript execution. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note:
>
> This is a Node.js specific API and modern server environments should use renderToReadableStream instead.
>

```
const {pipe, abort} = renderToPipeableStream(
  <App />,
  {
    onAllReady() {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      pipe(res);
    },
    onShellError(x) {
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    }
  }
);
```

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
    ReactDOMServer.renderToReadableStream(element, options);
```

Streams a React element to its initial HTML. Returns a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```
let controller = new AbortController();
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
    }
  );
  
  // This is to wait for all suspense boundaries to be ready. You can uncomment
  // this line if you don't want to stream to the client
  // await stream.allReady;

  return new Response(stream, {
    headers: {'Content-Type': 'text/html'},
  });
} catch (error) {
  return new Response(
    '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>',
    {
      status: 500,
      headers: {'Content-Type': 'text/html'},
    }
  );
}
```
* * *

### `renderToNodeStream()` {#rendertonodestream} (Deprecated)

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Rendert ein React-Element initial als HTML. Gibt einen [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) zurück, dessen Ausgabe ein HTML-String ist. 
Die HTML-Ausgabe dieses Streams ist exakt die gleiche wie die von [`ReactDOMServer.renderToString`](#rendertostring). Du kannst diese Methode verwenden, um HTML auf dem Server zu generieren und beim ersten Request das Markup zurückzusenden, damit die Seite schneller lädt und Suchmaschinen zu SEO-Zwecken deine Seiten crawlen können.

<<<<<<< HEAD
Wenn du auf einen Knoten, der bereits dieses server-gerenderte Markup hat, [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) aufrufst, wird React das Markup behalten und nur Eventhandler hinzufügen. Das ermöglicht ein sehr schnelles erstes Laden der Seite.
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> Hinweis:
>
> Nur für den Server. Diese API ist im Browser nicht verfügbar.
>
> Die Stream-Ausgabe dieser Methode gibt einen utf-8 kodierten Bytestream zurück. Falls du einen anders kodierten Stream benötigst, schau dir z. B. das Projekt [iconv-lite](https://www.npmjs.com/package/iconv-lite) an, das Transformationsstreams bereitstellt, um Text umzukodieren.

* * *

### `renderToStaticNodeStream()` {#rendertostaticnodestream}

```javascript
ReactDOMServer.renderToStaticNodeStream(element)
```

Ähnlich wie [`renderToNodeStream`](#rendertonodestream), außer dass es keine extra React-internen DOM-Attribute wie z. B. `data-reactroot` generiert. Das ist nützlich, wenn du React dazu verwenden willst, eine einfache statische Seite zu generieren, denn ohne diese extra Attribute können einige Bytes gespart werden.

Die HTML-Ausgabe dieses Streams ist exakt die gleiche wie die von  [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup).

<<<<<<< HEAD
Falls du planst, auf dem Client React zu benutzten, um das Markup interaktiv zu gestalten, solltest du diese Methode nicht benutzen. Verwende stattdessen [`renderToNodeStream`](#rendertonodestream) auf dem Server und [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) auf dem Client.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToNodeStream`](#rendertonodestream) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> Hinweis:
>
> Nur für den Server. Diese API ist im Browser nicht verfügbar.
>
> Die Stream-Ausgabe dieser Methode gibt einen utf-8 kodierten Bytestream zurück. Falls du einen anders kodierten Stream benötigst, schau dir z. B. das Projekt [iconv-lite](https://www.npmjs.com/package/iconv-lite) an, das Transformationsstreams bereitstellt, um Text umzukodieren.
