---
id: how-to-contribute
title: Wie man mithilft
layout: contributing
permalink: docs/how-to-contribute.html
next: codebase-overview.html
redirect_from:
  - "contributing/how-to-contribute.html"
  - "tips/introduction.html"
---

React ist eines der ersten Open-Source-Projekte von Facebook, das sowohl aktiv weiterentwickelt als auch für die Bereitstellung von Code für alle auf [facebook.com](https://www.facebook.com) verwendet wird. Wir arbeiten immer noch daran, den Beitrag zu diesem Projekt so einfach und transparent wie möglich zu gestalten, sind aber noch nicht ganz so weit. Dieses Dokument soll den Prozess des Mitwirkens erläutern und einige Fragen beantwortet, die du vielleicht hast.

### [Verhaltenskodex](https://github.com/facebook/react/blob/main/CODE_OF_CONDUCT.md) {#code-of-conduct}

Facebook hat die [Vereinbarung für Mitwirkende](https://www.contributor-covenant.org/) als Verhaltenskodex angenommen, und wir erwarten, dass sich die Projektteilnehmer daran halten. Bitte lies [den Text vollständig](https://github.com/facebook/react/blob/main/CODE_OF_CONDUCT.md), damit du verstehst, welche Handlungen toleriert werden und welche nicht.

### Offene Entwicklung {#open-development}

Die gesamte Arbeit an React findet direkt auf [GitHub](https://github.com/facebook/react) statt. Sowohl Mitglieder des Kernteams als auch externe Mitwirkende senden Pull Requests, die denselben Überprüfungsprozess durchlaufen.

### Semantic Versioning {#semantic-versioning}

React folgt dem [semantic versioning](https://semver.org/). Wir veröffentlichen Patch-Versionen für kritische Fehlerbehebungen, Minor-Versionen für neue Funktionen oder nicht-essentielle Änderungen, und Major-Versionen für alle funktionsgefährdenden Änderungen. Wenn wir funktionsgefährdende Änderungen vornehmen, geben wir in einer Minor-Version auch Warnungen über die Abschaffung von Funktionen heraus, damit unsere Benutzer von den bevorstehenden Änderungen erfahren und ihren Code im Voraus migrieren können. Erfahre mehr über unser Engagement für Stabilität und inkrementelle Migration in [unserer Versionierung](/docs/faq-versioning.html).

Jede wichtige Änderung wird in der [changelog file](https://github.com/facebook/react/blob/main/CHANGELOG.md) dokumentiert.

### Branchorganisation {#branch-organization}

Reiche alle Änderungen direkt an den [`main branch`](https://github.com/facebook/react/tree/main) ein. Wir verwenden keine separaten Branches für die Entwicklung oder für kommende Veröffentlichungen. Wir tun unser Bestes, um `main` in gutem Zustand zu halten, mit erfolgreicher Absolvierung aller Tests.

Code, der in `main` landet, muss mit der letzten stabilen Version kompatibel sein. Er kann zusätzliche Funktionen enthalten, aber keine funktionsgefährdenden Änderungen. Wir sollten in der Lage sein, jederzeit eine neue Minor-Version von der Spitze von `main` zu veröffentlichen.

### Feature Flags {#feature-flags}

Um den `main` branch in einem veröffentlichungsfähigen Zustand zu halten, müssen Änderungen und experimentelle Funktionen hinter einem Feature-Flag gesperrt werden.

Feature-Flags werden in [`packages/shared/ReactFeatureFlags.js`](https://github.com/facebook/react/blob/main/packages/shared/ReactFeatureFlags.js) definiert. Einige Builds von React können unterschiedliche Sets von Feature-Flags aktivieren; zum Beispiel kann der React Native Build anders konfiguriert sein als React DOM. Diese Flags sind in [`packages/shared/forks`](https://github.com/facebook/react/tree/main/packages/shared/forks) zu finden. Feature-Flags werden von Flow statisch typisiert, so dass du `yarn flow` ausführen kannst, um zu bestätigen, dass du alle notwendigen Dateien aktualisiert hast.

Das Build-System von React entfernt deaktivierte Feature Branches vor der Veröffentlichung. Bei jedem Commit wird ein Continuous-Integration-Job ausgeführt, um Änderungen an der Paketgröße zu überprüfen. Du kannst die Änderung der Größe als Signal dafür verwenden, dass ein Feature korrekt gated wurde.

### Bugs {#bugs}

#### Wo findet man bekannte Probleme? {#where-to-find-known-issues}

Wir verwenden [GitHub Issues](https://github.com/facebook/react/issues) für unsere öffentlichen Bugs. Wir behalten dies genau im Auge und versuchen, deutlich zu machen, wenn wir eine interne Lösung in Arbeit haben. Bevor du eine neue Aufgabe einreichst, solltest du sicherstellen, dass dein Problem nicht bereits existiert.

#### Neue Probleme melden {#reporting-new-issues}

Der beste Weg, deinen Fehler zu beheben, ist, einen reduzierten Testfall bereitzustellen. Diese [JSFiddle-Vorlage](https://jsfiddle.net/Luktwrdm/) ist ein guter Ausgangspunkt.

#### Sicherheitslücken {#security-bugs}

Facebook hat ein [Bounty-Programm](https://www.facebook.com/whitehat/) für die sichere Veröffentlichung von Sicherheitslücken. Bitte melde daher keine öffentlichen Probleme, sondern nimm den auf dieser Seite beschriebenen Weg.

### Wie du Kontakt aufnimmst {#how-to-get-in-touch}

* IRC: [#reactjs on freenode](https://webchat.freenode.net/?channels=reactjs)
* [Diskussionsforen](/community/support.html#popular-discussion-forums)

Es gibt auch [eine aktive Gemeinschaft von React-Nutzern auf der Chat-Plattform Discord](https://www.reactiflux.com/), falls du Hilfe mit React brauchst.

### Eine Veränderung vorschlagen {#proposing-a-change}

Wenn du vorhast, die öffentliche API zu ändern oder nicht-triviale Änderungen an der Implementierung vorzunehmen, empfehlen wir dir, ein [issue einzureichen](https://github.com/facebook/react/issues/new). Auf diese Weise können wir uns über deinen Vorschlag einigen, bevor du einen größeren Aufwand betreibst.

Wenn du nur einen Fehler behebst, kannst du auch gleich eine Pull Request einreichen, aber wir empfehlen dir trotzdem, ein Issue einzureichen, in dem du genau beschreibst, was du beheben willst. Das ist hilfreich für den Fall, dass wir eine bestimmte Korrektur nicht akzeptieren, aber das Problem im Auge behalten wollen.

### Deine erste Pull Request {#your-first-pull-request}

Du arbeitest an deiner ersten Pull Request? In dieser kostenlosen Video-Serie lernst du mehr dazu:

**[Wie du zu einem Open-Source-Projekt auf GitHub beiträgst](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)**

Um dir den Einstieg zu erleichtern und dich mit unserem Beitragsprozess vertraut zu machen, haben wir eine Liste von **[good first issues](https://github.com/facebook/react/issues?q=is:open+is:issue+label:"good+first+issue")**, die Fehler enthalten und einen relativ begrenzten Umfang haben. Das ist eine gute Stelle, um anzufangen.

Wenn du dich entscheidest, ein Problem zu beheben, sieh bitte im Kommentar-Thread nach, ob jemand bereits an einer Lösung arbeitet. Wenn gerade niemand daran arbeitet, hinterlasse bitte einen Kommentar, in dem du erklärst, dass du vorhast, daran zu arbeiten, damit andere Leute nicht aus Versehen deine Arbeit duplizieren.

Wenn jemand ein Problem meldet, sich aber mehr als zwei Wochen lang nicht darum kümmert, ist es in Ordnung, es zu übernehmen, aber du solltest trotzdem einen Kommentar hinterlassen.

### Eine Pull Request senden {#sending-a-pull-request}

Das Kernteam ist auf der Suche nach Pull Requests. Wir prüfen deine Pull Request und mergen sie entweder zusammen, fordern Änderungen an ihr an oder schließen sie mit einer Erklärung. Bei API-Änderungen müssen wir möglicherweise unsere internen Anwendungen auf Facebook.com anpassen, was zu einer gewissen Verzögerung führen kann. Wir werden unser Bestes tun, um dich während des gesamten Prozesses mit Updates und Feedback zu versorgen.

**Bevor du einen Pull-Request einreichst,** vergewissere dich bitte, dass das Folgende erledigt ist:

1. Forke [das Repository](https://github.com/facebook/react) und erstelle deinen Branch von `main`.
2. Führe `yarn` im Stammverzeichnis des Repositorys aus.
3. Wenn du einen Fehler behoben oder Code hinzugefügt hast, der getestet werden sollte, füge Tests hinzu!
4. Stelle sicher, dass die Testsuite erfolgreich ist (`yarn test`). Tipp: `yarn test --watch TestName` ist bei der Entwicklung hilfreich.
5. Führe `yarn test --prod` aus, um in der Produktionsumgebung zu testen.
6. Wenn du einen Debugger brauchst, führe `yarn debug-test --watch TestName` aus, öffne `chrome://inspect` und drücke "Inspect".
7. Formatiere deinen Code mit [prettier](https://github.com/prettier/prettier) (`yarn prettier`).
8. Stelle sicher, dass lint ausgeführt wurde (`yarn lint`). Tipp: `yarn linc`, um nur geänderte Dateien zu überprüfen.
9. Führe die [Flow](https://flowtype.org/) Typprüfungen durch (`yarn flow`).
10. Wenn du es noch nicht getan hast, vervollständige den CLA.

### Contributor License Agreement (CLA) {#contributor-license-agreement-cla}

Damit wir deine Pull Request akzeptieren können, musst du eine CLA einreichen. Das musst du nur einmal machen. Wenn du das also schon für ein anderes Open-Source-Projekt von Facebook gemacht hast, kannst du loslegen. Wenn du zum ersten Mal eine Pull Request einreichst, lass uns einfach wissen, dass du den CLA ausgefüllt hast, damit wir ihn mit deinem GitHub-Benutzernamen abgleichen können.

**[Fülle deine CLA hier aus.](https://code.facebook.com/cla)**

### Voraussetzungen zur Mitarbeit {#contribution-prerequisites}

* Du hast [Node](https://nodejs.org) LTS und [Yarn](https://yarnpkg.com/en/) mit Version 1.2.0+ installiert.
* Du hast [JDK](https://www.oracle.com/technetwork/java/javase/downloads/index.html) installiert.
* Du hast `gcc` installiert oder kannst bei Bedarf einen Compiler installieren. Einige unserer Abhängigkeiten erfordern möglicherweise einen Kompilierungsschritt. Unter OS X kannst du dies mit den Xcode Command Line Tools erledigen. Unter Ubuntu installiert `apt-get install build-essential` die benötigten Pakete. Ähnliche Befehle sollten auch auf anderen Linux-Distributionen funktionieren. Für Windows sind einige zusätzliche Schritte erforderlich, siehe die [`node-gyp` Installationsanweisungen](https://github.com/nodejs/node-gyp#installation) für Details.
* Du bist mit Git vertraut.

### Arbeitsablauf bei der Entwicklung {#development-workflow}

Nachdem du React geklont hast, rufe `yarn` auf, um die Abhängigkeiten zu fetchen.
Dann kannst du verschiedene Befehle ausführen:

* `yarn lint` prüft den Stil des Codes.
* `yarn linc` ist wie `yarn lint`, aber schneller, weil es nur Dateien überprüft, die sich in deinem Branch unterscheiden.
* `yarn test` führt die komplette Testsuite aus.
* `yarn test --watch` führt einen interaktiven Test Watcher aus.
* `yarn test --prod` führt Tests in der Produktionsumgebung aus.
* `yarn test <pattern>` führt Tests mit passenden Dateinamen aus.
* `yarn debug-test` ist genau wie `yarn test`, aber mit einem Debugger. Öffne `chrome://inspect` und drücke "Inspect".
* `yarn flow` führt die [Flow](https://flowtype.org/) Typprüfungen durch.
* `yarn build` erstellt einen `build` Ordner mit allen Paketen.
* `yarn build react/index,react-dom/index --type=UMD` erstellt UMD-Builds nur von React und ReactDOM.

Wir empfehlen, `yarn test` (oder die oben genannten Variationen) auszuführen, um sicherzustellen, dass du keine Regressionen einführst, während du an deiner Änderung arbeitest. Es kann aber auch praktisch sein, deinen Build von React in einem echten Projekt zu testen.

Führe zuerst `yarn build` aus. Das erzeugt vorgefertigte Bundles im Ordner `build` und bereitet npm-Pakete in `build/packages` vor.

Am einfachsten kannst du deine Änderungen ausprobieren, indem du `yarn build react/index,react-dom/index --type=UMD` ausführst und dann `fixtures/packaging/babel-standalone/dev.html` öffnest. Diese Datei verwendet bereits die Datei `react.development.js` aus dem Ordner `build`, so dass sie deine Änderungen übernehmen wird.

Wenn du deine Änderungen in deinem bestehenden React-Projekt ausprobieren möchtest, kannst du `build/node_modules/react/umd/react.development.js`, `build/node_modules/react-dom/umd/react-dom.development.js` oder andere Build-Produkte in deine App kopieren und sie anstelle der stabilen Version verwenden. 

Wenn dein Projekt React von npm verwendet, kannst du `react` und `react-dom` in den Abhängigkeiten löschen und sie mit `yarn link` in deinem lokalen `build` Ordner verweisen. Beachte, dass du **anstelle von `--type=UMD` beim Bauen `--type=NODE` übergeben musst**. Du musst auch das Paket `scheduler` bauen:

```sh
cd ~/path_to_your_react_clone/
yarn build react/index,react/jsx,react-dom/index,scheduler --type=NODE

cd build/node_modules/react
yarn link
cd build/node_modules/react-dom
yarn link

cd ~/path/to/your/project
yarn link react react-dom
```

Jedes Mal, wenn du `yarn build` im React-Ordner ausführst, erscheinen die aktualisierten Versionen in den `node_modules` deines Projekts. Du kannst dann dein Projekt neu builden, um deine Änderungen auszuprobieren.

Wenn noch ein Package fehlt (z.B. wenn du `react-dom/server` in deinem Projekt verwendest), kannst du jederzeit einen vollständigen Build mit `yarn build` durchführen. Beachte, dass die Ausführung von `yarn build` ohne Optionen sehr lange dauert.

Wir verlangen trotzdem, dass dein Pull Request Unit-Tests für alle neuen Funktionen enthält. Auf diese Weise können wir sicherstellen, dass wir deinen Code in Zukunft nicht kaputt machen.

### Style Guide {#style-guide}

Wir verwenden einen automatischen Code-Formatierer namens [Prettier](https://prettier.io/).
Führe `yarn prettier` aus, nachdem du Änderungen an deinem Code vorgenommen hast.

Dann wird unser Linter die meisten Probleme in deinem Code erkennen.
Du kannst den Status deines Code-Stylings überprüfen, indem du einfach `yarn linc` ausführst.

Es gibt jedoch immer noch einige Stile, die der Linter nicht erkennen kann. Wenn du dir unsicher bist, hilft dir ein Blick in den [Airbnb's Style Guide](https://github.com/airbnb/javascript) weiter.

### Request for Comments (RFC) {#request-for-comments-rfc}

Viele Änderungen, einschließlich Fehlerbehebungen und Verbesserungen der Dokumentation, können über den normalen GitHub-Pull-Request-Workflow implementiert und überprüft werden.

Einige Änderungen sind jedoch "substanziell" und wir bitten darum, dass diese einen gewissen Entwurfsprozess durchlaufen und einen Konsens im React-Kernteam finden.

Der "RFC"-Prozess (Request for Comments) soll einen konsistenten und kontrollierten Weg für neue Funktionen bieten, die in das Projekt einfließen sollen. Du kannst dazu beitragen, indem du das [RFCS Repository](https://github.com/reactjs/rfcs) besuchst.

### Lizenz {#license}

Wenn du zu React beiträgst, stimmst du zu, dass deine Beiträge unter der MIT-Lizenz lizenziert werden.

### Wie geht es weiter? {#what-next}

Lies den [nächsten Abschnitt](/docs/codebase-overview.html), um zu erfahren, wie die Codebase organisiert ist.