---
id: testing-environments
title: Test-Umgebungen
permalink: docs/testing-environments.html
prev: testing-recipes.html
---

<!-- Dieses Dokument ist für Leute gedacht, die mit JavaScript vertraut sind und Tests damit geschrieben haben. Es dient als Referenz für die Unterschiede in den Testumgebungen für React-Komponenten und wie sich diese Unterschiede auf die von ihnen geschriebenen Tests auswirken. Dieses Dokument geht auch von einer Neigung zu webbasierten React-Dom-Komponenten aus, enthält jedoch Hinweise für andere Renderer. -->

In diesem Dokument werden die Faktoren beschrieben, die sich auf Deine Umgebung auswirken können, sowie Empfehlungen für einige Szenarien.

### Testrunner {#test-runners}

Mit Testrunnern wie [Jest](https://jestjs.io/), [mocha](https://mochajs.org/), [ava](https://github.com/avajs/ava) kannst Du Testsuiten als normales JavaScript schreiben und sie als Teil Deines Entwicklungsprozesses ausführen. Darüber hinaus werden im Rahmen der kontinuierlichen Integration Testsuiten ausgeführt.

- Jest ist weitgehend kompatibel mit React-Projekten und unterstützt Funktionen wie simulierte [Module](#mocking-modules) und [Timer](#mocking-timers) sowie [`jsdom`](#mocking-a-rendering-surface)-Unterstützung. **Wenn Du Create React App verwendest, ist [Jest bereits mit nützlichen Standardeinstellungen enthalten](https://facebook.github.io/create-react-app/docs/running-tests).**
- Bibliotheken wie [mocha](https://mochajs.org/#running-mocha-in-the-browser) funktionieren gut in echten Browserumgebungen und könnten bei Tests helfen, die sie ausdrücklich benötigen.
- Ende-zu-Ende-Tests werden zum Testen längerer Abläufe über mehrere Seiten verwendet und erfordern eine [andere Einrichtung](#end-to-end-tests-aka-e2e-tests).

### Simulieren einer Rendering-Oberfläche {#mocking-a-rendering-surface}

Tests werden häufig in einer Umgebung ohne Zugriff auf eine echte Rendering-Oberfläche wie einen Browser ausgeführt. Für diese Umgebungen empfehlen wir, einen Browser mit [`jsdom`](https://github.com/jsdom/jsdom) zu simulieren, einer einfachen Browserimplementierung, die in Node.js ausgeführt wird.

In den meisten Fällen verhält sich jsdom wie ein normaler Browser, verfügt jedoch nicht über Funktionen wie [Layout und Navigation](https://github.com/jsdom/jsdom#unimplemented-parts-of-the-web-platform). Dies ist für die meisten webbasierten Komponententests immer noch nützlich, da es schneller ausgeführt wird, als für jeden Test einen Browser starten zu müssen. Es wird auch im selben Prozess wie Deine Tests ausgeführt, sodass Du Code schreiben kannst, um das gerenderte DOM zu untersuchen und zu bestätigen.

Genau wie in einem echten Browser können wir mit jsdom Benutzerinteraktionen modellieren. Tests können Ereignisse auf DOM-Knoten senden und dann die Nebeneffekte dieser Aktionen beobachten und bestätigen [<small>(Beispiel)</small>](/docs/testing-recipes.html#events).

Ein großer Teil der UI-Tests kann mit dem obigen Setup geschrieben werden: Verwendung von Jest als Test-Runner, gerendert in jsdom, mit Benutzerinteraktionen, die als Sequenzen von Browser-Ereignissen angegeben sind, unterstützt durch den `act()`-Helfer [<small>(Beispiel)</small>](/docs/testing-recipes.html). Beispielsweise werden viele eigene Tests von React mit dieser Kombination geschrieben.

Wenn Du eine Bibliothek schreibst, die hauptsächlich browserspezifisches Verhalten testet und natives Browserverhalten wie Layout oder echte Eingaben erfordert, kannst Du ein Framework wie [Mocha](https://mochajs.org/) verwenden.

In einer Umgebung, in der Du _kein_ DOM simulieren kannst (z. B. beim Testen von React Native-Komponenten von Node.js), kannst Du [Ereignissimulationshelfer](/docs/test-utils.html#simulate) verwenden, um Interaktionen mit Elementen zu simulieren. Alternativ kannst Du den `fireEvent`-Helfer von [`@testing-library/react-native`](https://testing-library.com/docs/react-native-testing-library/intro) verwenden.

Frameworks wie [Cypress](https://www.cypress.io/), [puppeteer](https://github.com/GoogleChrome/puppeteer) und [webdriver](https://www.seleniumhq.org/projects/webdriver/) sind nützlich, um  [Ende-zu-Ende-Tests](#end-to-end-tests-aka-e2e-tests) auszuführen.

### Simulieren von Funktionen {#mocking-functions}

Beim Schreiben von Tests möchten wir die Teile unseres Codes simulieren, die keine Entsprechungen in unserer Testumgebung haben (z. B. Überprüfung des `navigator.onLine`-Status in Node.js). Tests könnten auch einige Funktionen ausspionieren und beobachten, wie andere Teile des Tests mit ihnen interagieren. Dann ist es sinnvoll, diese Funktionen gezielt mit testfreundlichen Versionen nachahmen zu können.

Dies ist besonders nützlich für das Abrufen von Daten. Es ist in der Regel vorzuziehen, "gefälschte" Daten für Tests zu verwenden, um die Langsamkeit und Schwankungen aufgrund des Abrufs von echten API-Endpunkten zu vermeiden [<small>(Beispiel)</small>](/docs/testing-recipes.html#data-fetching). Dies trägt dazu bei, die Tests vorhersehbar zu machen. Bibliotheken wie [Jest](https://jestjs.io/) und [sinon](https://sinonjs.org/) unterstützen unter anderem Mock-Funktionen. Für Ende-zu-Ende-Tests kann das Simulieren von Netzwerkzugriffen schwieriger sein, aber Du möchtest vielleicht auch die echten API-Endpunkte dabei testen.

### Simulieren von Modulen {#mocking-modules}

Einige Komponenten haben Abhängigkeiten von Modulen, die in Testumgebungen möglicherweise nicht gut funktionieren oder für unsere Tests nicht wesentlich sind. Es kann sinnvoll sein, diese Module gezielt mit passendem Ersatz zu simulieren  [<small>(Beispiel)</small>](/docs/testing-recipes.html#mocking-modules).

Auf Node.js unterstützen Runner wie Jest [Simulationen](https://jestjs.io/docs/en/manual-mocks). Du kannst auch Bibliotheken wie [`mock-require`](https://www.npmjs.com/package/mock-require) verwenden.

### Timer simulieren {#mocking-timers}

Komponenten verwenden möglicherweise zeitbasierte Funktionen wie `setTimeout`, `setInterval` oder `Date.now`. In Testumgebungen kann es hilfreich sein, Zeitfunktionen zu simulieren, um andere Zeitstempel testen zu können. Dies ist großartig, um sicherzustellen, dass Deine Tests schnell ablaufen! Tests, die von Timern abhängig sind, würden immer noch der Reihe nach durchgeführt, aber schneller [<small>(Beispiel)</small>](/docs/testing-recipes.html#timers). Die meisten Frameworks, darunter [Jest](https://jestjs.io/docs/en/timer-mocks), [sinon](https://sinonjs.org/releases/latest/fake-timers) und [lolex](https://github.com/sinonjs/lolex), ermöglichen es Dir, Timer in Deinen Tests zu simulieren.

Manchmal möchtest Du Timer vielleicht nicht simulieren. Vielleicht testest Du beispielsweise eine Animation oder interagierst mit einem Endpunkt, der zeitempfindlich ist (wie ein API-Ratenbegrenzer). Bibliotheken mit Timer-Mocks ermöglichen es Dir, sie pro Test/Suite zu aktivieren und zu deaktivieren, sodass Du explizit auswählen kannst, wie diese Tests ausgeführt werden.

### Ende-zu-Ende-Tests {#end-to-end-tests-aka-e2e-tests}

Ende-zu-Ende-Tests sind nützlich, um längere Workflows zu testen, insbesondere wenn sie für Dein Unternehmen von entscheidender Bedeutung sind (z.B. Zahlungen oder Anmeldungen). Für diese Tests möchtest Du wahrscheinlich testen, wie ein echter Browser die gesamte App rendert, Daten von den echten API-Endpunkten abruft, Sitzungen und Cookies verwendet und zwischen verschiedenen Links navigiert. Möglicherweise möchtest Du auch Aussagen nicht nur zum DOM-Status, sondern auch zu den Sicherungsdaten machen (z.B. um zu überprüfen, ob die Aktualisierungen in der Datenbank gespeichert wurden).

In diesem Szenario würdest Du ein Framework wie [Cypress](https://www.cypress.io/), [Playwright](https://playwright.dev) oder eine Bibliothek wie [Puppeteer](https://pptr.dev/) verwenden, damit Du zwischen mehreren Routen navigieren kannst und Nebeneffekte nicht nur im Browser, sondern möglicherweise auch im Backend finden kannst.