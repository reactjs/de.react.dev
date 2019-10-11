---
id: faq-structure
title: Dateistruktur
permalink: docs/faq-structure.html
layout: docs
category: FAQ
---

### Gibt es eine empfohlene Dateistruktur für React-Projekte? {#is-there-a-recommended-way-to-structure-react-projects}

React hat keine Meinung dazu, wie du Dateien in Ordnern ablegst. Es gibt jedoch einige gängige Ansätze, die du in Betracht ziehen solltest.

#### Gruppierung nach Merkmalen oder Routen {#grouping-by-features-or-routes}

Eine gängige Methode zum Strukturieren von Projekten ist CSS, JS und Tests zu finden, die nach Features oder Routen in Ordnern gruppiert werden können.

```
common/
  Avatar.js
  Avatar.css
  APIUtils.js
  APIUtils.test.js
feed/
  index.js
  Feed.js
  Feed.css
  FeedStory.js
  FeedStory.test.js
  FeedAPI.js
profile/
  index.js
  Profile.js
  ProfileHeader.js
  ProfileHeader.css
  ProfileAPI.js
```

Die Definition eines "Features" ist nicht universell und es liegt an dir, die Granularität zu wählen. Wenn es dir schwer fällt eine top-level Ordnerstruktur zu erdenken, kannst du die Benutzer deines Produktes fragen aus welchen Hauptbestandteilen es aufgebaut ist, und dieses Modell als Entwurf verwenden.

#### Gruppierung nach Dateityp {#grouping-by-file-type}

Eine andere beliebte Methode zum Strukturieren von Projekten besteht darin, ähnliche Dateien zu gruppieren. Zum Beispiel:

```
api/
  APIUtils.js
  APIUtils.test.js
  ProfileAPI.js
  UserAPI.js
components/
  Avatar.js
  Avatar.css
  Feed.js
  Feed.css
  FeedStory.js
  FeedStory.test.js
  Profile.js
  ProfileHeader.js
  ProfileHeader.css
```

Einige Leute gehen einen Schritt weiter und sortieren Komponenten nach ihrer Rolle in der Anwendung. Das [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) ist ein Beispiel was die auf diesem Prinzip basiert ist. Denken Sie daran, dass es oft produktiver ist, solche Methoden als hilfreiche Beispiele, anstatt Regeln zu betrachten.

#### Vermeiden Sie zu viel Verschachtelung {#avoid-too-much-nesting}

Es gibt viele Probleme wenn JavaScript Projekte zu tief verschachtelt werden. Es wird schwieriger, relative Importe zwischen Dateien zu erstellen oder diese Importe zu aktualisieren, wenn Dateien verschoben werden. Sie sollten sich auf eine drei bis vier Ordner tiefe Struktur beschränken, es sei denn Sie haben einen guten Grund für eine Tiefere. Dies ist natürlich nur eine Empfehlung und möglicherweise für Ihr Projekt nicht relevant.

#### Überdenken Sie es nicht {#dont-overthink-it}

Wenn Sie ein neues Projekt anfangen, [verbringen Sie nicht mehr als fünf Minuten](https://de.wikipedia.org/wiki/Paralyse_durch_Analyse) um eine Datenstruktur auszuwählen. Wählen Sie einen der oben genannten Ansätze (oder überlegen Sie sich einen eigenen) und legen Sie los! Sie werden die Datenstruktur wahrscheinlich überdenken wollen, nachdem Sie ein wenig Code geschrieben haben.

Wenn Sie sich nicht sicher fühlen, sollten Sie zunächst alle Dateien in einem einzigen Ordner speichern. Irgendwann wird dieser so groß werden, dass Sie einige Dateien von dem Rest trennen möchten. Zu diesem Zeitpunkt werden Sie genug Wissen, um festzustellen zu können, welche Dateien Sie am häufigsten gemeinsam bearbeiten. Im Allgemeinen ist es eine gute Idee, Dateien, die Sie häufig gemeinsam ändern, nahe beieinander zu abzulegen. Dieses Prinzip nennt man "Kollokation".

Sobald Projekte größer werden, wird in der Praxis häufig eine Mischung aus beiden oben genannten Ansätzen verwendet. Daher ist es nicht sehr wichtig, am Anfang den "richtigen" zu wählen.
