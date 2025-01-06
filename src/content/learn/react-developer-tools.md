---
title: React Developer Tools
---

<Intro>

Nutze die React Developer Tools, um React [Komponenten](/learn/your-first-component) zu inspizieren, [Parameter](/learn/passing-props-to-a-component) und [Zustand](/learn/state-a-components-memory) zu bearbeiten, und Performance Probleme zu identifizieren.

</Intro>

<YouWillLearn>

* Wie man die React Developer Tools installiert

</YouWillLearn>

## Browser-Erweiterung {/*browser-extension*/}

Der leichteste Weg Fehler in einer Webseite, die mit React erstellt wurde, zu beheben ist es die React Developer Tools Browser Erweiterung zu installieren. Sie ist für mehrere beliebte Browser verfügbar:

* [Für **Chrome** installieren](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [Für **Firefox** installieren](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
* [Für **Edge** installieren](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)

Wenn du jetzt eine Webseite besuchst, **die mit React erstellt wurde**, wirst du das _Komponenten_- und _Profiler_ Panel sehen.

![React Developer Tools Erweiterung](/images/docs/react-devtools-extension.png)

### Safari und andere Browser {/*safari-and-other-browsers*/}
Für andere Browser (zum Beispiel Safari), musst du das [`react-devtools`](https://www.npmjs.com/package/react-devtools) npm Paket installieren:
```bash
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```

Öffne als Nächstes die Developer-Tools aus dem Terminal:
```bash
react-devtools
```

Verbinde dann deine Webseite, indem du das folgende `<script>` Tag zum Anfang des `<head>` deiner Webseite hinzufügst:
```html {3}
<html>
  <head>
    <script src="http://localhost:8097"></script>
```

Lade deine Webseite jetzt im Browser neu, um die Developer-Tools zu sehen.

![Eigenständige React Developer Tools](/images/docs/react-devtools-standalone.png)

## Mobile (React Native) {/*mobile-react-native*/}

<<<<<<< HEAD
Um mit [React Native](https://reactnative.dev/) erstellte Anwendungen zu überprüfen, kannst du [React Native DevTools](https://reactnative.dev/docs/debugging/react-native-devtools) verwenden, der eingebaute Debugger, der die React Developer Tools tief integriert. Alle Funktionen sind identisch mit denen der Browser-Erweiterung, einschließlich der Hervorhebung und Auswahl nativer Elemente.
=======
To inspect apps built with [React Native](https://reactnative.dev/), you can use [React Native DevTools](https://reactnative.dev/docs/react-native-devtools), the built-in debugger that deeply integrates React Developer Tools. All features work identically to the browser extension, including native element highlighting and selection.
>>>>>>> b1a249d597016c6584e4c186daa28b180cc9aafc

[Erfahren Sie mehr über Debugging in React Native](https://reactnative.dev/docs/debugging)

> Für Versionen von React Native vor 0.76 verwende bitte den Standalone-Build von React DevTools, indem du der obigen Anleitung [Safari und andere Browser](#safari-and-other-browsers) folgst.
