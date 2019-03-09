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

- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Referenz {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Rendert ein React-Element initial als HTML. React gibt einen HTML-String zurück. Du kannst diese Methode verwenden, um HTML auf dem Server zu generieren und beim ersten Request das Markup zurückzusenden, damit die Seite schneller lädt und Suchmaschinen zu SEO-Zwecken deine Seiten crawlen können.

Wenn du auf einen Knoten, der bereits dieses server-gerenderte Markup hat, [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) aufrufst, wird React das Markup behalten und nur Eventhandler hinzufügen. Das ermöglicht ein sehr schnelles erstes Laden der Seite.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Ähnlich wie [`renderToString`](#rendertostring), außer dass es keine extra React-internen DOM-Attribute wie z. B. `data-reactroot` generiert. Das ist nützlich, wenn du React dazu verwenden willst, eine einfache statische Seite zu generieren, denn ohne diese extra Attribute können einige Bytes gespart werden.

Falls du planst, auf dem Client React zu benutzten, um das Markup interaktiv zu gestalten, solltest du diese Methode nicht benutzen. Verwende stattdessen [`renderToString`](#rendertostring) auf dem Server und [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) auf dem Client.

* * *

### `renderToNodeStream()` {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Rendert ein React-Element initial als HTML. Gibt einen [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) zurück, dessen Ausgabe ein HTML-String ist. 
Die HTML-Ausgabe dieses Streams ist exakt die gleiche wie die von [`ReactDOMServer.renderToString`](#rendertostring). Du kannst diese Methode verwenden, um HTML auf dem Server zu generieren und beim ersten Request das Markup zurückzusenden, damit die Seite schneller lädt und Suchmaschinen zu SEO-Zwecken deine Seiten crawlen können.

Wenn du auf einen Knoten, der bereits dieses server-gerenderte Markup hat, [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) aufrufst, wird React das Markup behalten und nur Eventhandler hinzufügen. Das ermöglicht ein sehr schnelles erstes Laden der Seite.

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

Falls du planst, auf dem Client React zu benutzten, um das Markup interaktiv zu gestalten, solltest du diese Methode nicht benutzen. Verwende stattdessen [`renderToNodeStream`](#rendertonodestream) auf dem Server und [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) auf dem Client.

> Hinweis:
>
> Nur für den Server. Diese API ist im Browser nicht verfügbar.
>
> Die Stream-Ausgabe dieser Methode gibt einen utf-8 kodierten Bytestream zurück. Falls du einen anders kodierten Stream benötigst, schau dir z. B. das Projekt [iconv-lite](https://www.npmjs.com/package/iconv-lite) an, das Transformationsstreams bereitstellt, um Text umzukodieren.
