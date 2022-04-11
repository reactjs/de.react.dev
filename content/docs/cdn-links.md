---
id: cdn-links
title: CDN Links
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: release-channels.html
---

React und ReactDOM sind beide über CDNs verfügbar.

```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

Diese beiden Versionen sind nur zu Entwicklung angedacht und nicht für den Live-Einsatz in Produktivsystemen.
Für diesen Gebrauch haben wir extra verkleinerte und optimierte Versionen von React bereitgestellt:

```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

<<<<<<< HEAD
Ersetze `17` mit einer gültigen Versionsnummer um eine bestimmte Version von `react` oder `react-dom` zu laden.
=======
To load a specific version of `react` and `react-dom`, replace `18` with the version number.
>>>>>>> 84ad3308338e2bb819f4f24fa8e9dfeeffaa970b

### Warum das `crossorigin` Attribut? {#why-the-crossorigin-attribute}

Wir empfehlen dir, wenn du React von einem CDN beziehst, dass du das [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) gesetzt lässt oder setzt:

```html
<script crossorigin src="..."></script>
```

Wir empfehlen außerdem zu überprüfen ob das verwendete CDN den `Access-Control-Allow-Origin: *` HTTP header gesetzt hat:

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

Dies ermöglicht dir ab React 16 eine bessere [Fehlerbehandlung](/blog/2017/07/26/error-handling-in-react-16.html).
