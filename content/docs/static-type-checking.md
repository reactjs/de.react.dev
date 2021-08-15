---
id: static-type-checking
title: Statische Typprüfung
permalink: docs/static-type-checking.html
---

Statische Typprüfer, wie [Flow](https://flow.org/) und [TypeScript](https://www.typescriptlang.org/) erkennen bestimmte Arten von Problemen, bevor der Code ausgeführt wird. Der Workflow bei der Entwicklung wird zum Beispiel durch Autovervollständigung verbessert. Daher empfehlen wir Flow oder Typescript für größere Codebasen, anstelle von `PropTypes`.

## Flow {#flow}

[Flow](https://flow.org/) ist ein statischer Typprüfer für deinen JavaScript Code. Er wird bei Facebook entwickelt und oft mit React verwendet. Er ermöglicht dir Variablen, Funktionen und React-Komponenten mit einer speziellen Typ-Syntax zu versehen und so Fehler frühzeitig zu erkennen. Du kannst die [Einführung in Flow](https://flow.org/en/docs/getting-started/) lesen um die Grundlagen zu lernen.

Um Flow zu verwenden, musst du folgendes tun:

* Füge Flow deinem Projekt als Abhängigkeit hinzu.
* Stelle sicher, dass der Flow-Syntax aus kompiliertem Code entfernt wird.
* Füge Typ-Anmerkungen hinzu und führe Flow aus, um diese zu überprüfen.

Wir werden diese Schritte weiter unten im Detail erklären.

### Flow einem Projekt hinzufügen {#adding-flow-to-a-project}

Navigiere zunächst im Terminal zu einem Projektverzeichnis. Du musst folgenden Befehl ausführen:

Wenn du [Yarn](https://yarnpkg.com/) verwendest, führe folgendes aus:

```bash
yarn add --dev flow-bin
```

Wenn du [npm](https://www.npmjs.com/) verwendest, führe folgendes aus:

```bash
npm install --save-dev flow-bin
```

Dieser Befehl installiert in deinem Projekt die neuste Version von Flow.

Füge nun `flow` dem `"scripts"` Abschnitt deiner `package.json` hinzu, um es vom Terminal aus zu nutzen:

```js{4}
{
  // ...
  "scripts": {
    "flow": "flow",
    // ...
  },
  // ...
}
```

Abschließend, führe folgende Befehle aus:

Wenn du [Yarn](https://yarnpkg.com/) verwendest, führe folgendes aus:

```bash
yarn run flow init
```

Wenn du [npm](https://www.npmjs.com/) verwendest, führe folgendes aus:

```bash
npm run flow init
```

Dieser Befehl erstellt eine Flow-Konfigurationsdatei, die du committen musst.

### Entfernen der Flow-Syntax aus dem kompilierten Code {#stripping-flow-syntax-from-the-compiled-code}

Flow erweitert die Sprache JavaScript mit einer speziellen Syntax für Typ-Annotationen. Diese Syntax ist Browsern jedoch nicht bekannt, darum müssen wir sicherstellen, dass sie nicht im kompilierten JavaScript-Bundle landet, welches an den Browser gesendet wird.

Die genaue Vorgehensweise hängt von den Tools ab, die du zum kompilieren von JavaScript verwendest.

#### Create React App {#create-react-app}

Wenn dein Projekt mit [Create React App](https://github.com/facebookincubator/create-react-app) erstellt wurde, gratulieren wir dir! Die Flow-Annotationen werden bereits standardmäßig entfernt, so dass du nicht weiter tun musst.

#### Babel {#babel}

>Hinweis:
>
>Diese Anweisungen sind *nicht* für Create React App Benutzer. Auch wenn Create React App unter der Haube Babel verwendet. Es ist schon so vorkonfiguriert, dass Flow verstanden wird. Also folge diesen Schritten nur, wenn du *nicht* Create React App verwendest.

Wenn du Babel für dein Projekt selbst eingerichtet hast, musst du spezielles Preset für Flow installieren.

Wenn du Yarn verwendest, führe folgendes aus:

```bash
yarn add --dev @babel/preset-flow
```

Wenn du npm verwendest, führe folgendes aus:

```bash
npm install --save-dev @babel/preset-flow
```

Füge dann das `flow`-Preset deiner [Babel Konfiguration](https://babeljs.io/docs/usage/babelrc/) hinzu. Wenn du zum Beispiel Babel durch eine `.babelrc`-Datei konfigurierst, könnte es so aussehen:

```js{3}
{
  "presets": [
    "@babel/preset-flow",
    "react"
  ]
}
```

Dadurch kannst du die Flow-Syntax in deinem Code verwenden.

>Hinweis:
>
>Flow erfordert nicht das `react`-Preset, jedoch werden sich auf zusammen verwendet. Flow selbst versteht die JSX-Syntax out of the box.

#### Andere Build Einstellungen {#other-build-setups}

Wenn du weder Create React App, noch Babel verwendest, kannst du [flow-remove-types](https://github.com/flowtype/flow-remove-types) benutzen um die Typ-Annotationen zu entfernen.

### Ausführen von Flow {#running-flow}

Wenn du die obigen Anweisungen befolgt hast, wirst du in der Lage sein Flow das erste Mal zu ausführen.

```bash
yarn flow
```

Wenn du npm verwendest, führe folgendes aus:

```bash
npm run flow
```

Solltest du eine Nachricht sehen wie:

```
No errors!
✨  Done in 0.17s.
```

### Hinzufügen von Flow-Typ-Annotationen {#adding-flow-type-annotations}

Standardmäßig prüft Flow nur die Dateien, die diese Annotation enthalten:

```js
// @flow
```

In der Regel wird sie an den Anfang einer Datei geschrieben. Versuche sie zu ein paar Dateien hinzuzufügen und `yarn flow` oder `npm run flow` auszuführen, um zu schauen, ob Flow bereits irgendwelche Probleme gefunden hat.

Es gibt auch [eine Option](https://flow.org/en/docs/config/options/#toc-all-boolean), die Flow zwingt, *alle* Dateien unabhängig von der Annotation zu prüfen. Dies kann ein bisschen zu viel sein für bestehende Projekte, aber ist sinnvoll für neue Projekte, wenn du volle Typisierung mit Flow haben möchtest.

Jetzt bist du bereit! Wir empfehlen dir, die folgenden Quellen zu anzuschauen, um mehr über Flow zu erfahren:

* [Flow Documentation: Type Annotations](https://flow.org/en/docs/types/)
* [Flow Documentation: Editors](https://flow.org/en/docs/editors/)
* [Flow Documentation: React](https://flow.org/en/docs/react/)
* [Linting in Flow](https://medium.com/flow-type/linting-in-flow-7709d7a7e969)

## TypeScript {#typescript}

[TypeScript](https://www.typescriptlang.org/) ist eine Programmiersprache, die von Microsoft entwickelt wurde. Sie ist eine Superset von JavaScript und beinhaltet ihren eigenen Kompiler. Da es sich bei TypeScript um eine typisierte Sprache handelt, kann sie Fehler und Bugs zur Build-Zeit abfangen. Lange bevor deine Anwendung in Betrieb geht.Du kannst mehr über die Verwerdnung von TypeScript mit React [hier](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter) lernen.

Um TypeScript zu benutzen, benötigst du folgendes:
+ Füge TypeScript als Abhängigkeit in deinem Projekt hinzu
* Konfiguriere die Optionen des TypeScript-Kompilers
* Benutze die rictige Dateiendung
* Füge Definitionen für die Bibliotheken hinzu, die du verwendest

Lass uns diese im Detail durchgehen.

### Verwenden von TypeScript mit Create React App {#using-typescript-with-create-react-app}

Create React App unterstützt TypeScript out of the box.

Um ein **neues Projekt** mit TypeScript-Unterstützung zu erstellen, führe folgendes aus:

```bash
npx create-react-app my-app --template typescript
```

Du kannst es auch zu einem **bestehenden Create React App Projekt** hinzufügen, [wie hier dokumentiert](https://facebook.github.io/create-react-app/docs/adding-typescript).

>Hinweis:
>
>Wenn du Create React App benutzt, **kannst du den Rest dieser Seite überspringen**. Er beschreibt die manuelle Einrichtung, die nicht für Create React App benutzer gilt.


### Typescript einem Projekt hinzufügen {#adding-typescript-to-a-project}
Es beginnt alles mit dem Ausführem von einem Befehl im Terminal.

Wenn du [Yarn](https://yarnpkg.com/) verwendest, führe folgendes aus:

```bash
yarn add --dev typescript
```

Wenn du [npm](https://yarnpkg.com/) verwendest, führe folgendes aus:

```bash
npm install --save-dev typescript
```

Gratulation! Du hast die neueste Version von TypeScript in deinem Projekt. Das Installieren von TypeScript gibt uns Zugriff auf den `tsc`-Befehl. Lass uns vor der Konfiguration `tsc` zum "scripts"-Abschnitt in unserer `package.json` hinzufügen:

```js{4}
{
  // ...
  "scripts": {
    "build": "tsc",
    // ...
  },
  // ...
}
```

### Konfigurieren des TypeScript-Kompilers {#configuring-the-typescript-compiler}
The compiler is of no help to us until we tell it what to do. In TypeScript, these rules are defined in a special file called `tsconfig.json`. To generate this file:

Wenn du [Yarn](https://yarnpkg.com/) verwendest, führe folgendes aus:

```bash
yarn run tsc --init
```

Wenn du [npm](https://yarnpkg.com/) verwendest, führe folgendes aus:

```bash
npx tsc --init
```

Wenn du dir die jetzt genrierte `tsconfig.json` anschaust, siehst du, dass es viele Optionen für die Konfiguration des Kompilers gibt. Eine detailierte Beschreibung aller Optionen findest du [hier](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

Von den vielen Optionen werden wir uns `rootDir` und `outDir` ansehen. Im Grunde nimmt der Kompiler TypeScript-Dateien und generiert daraus JavaScript-Dateien. Wir wollen jedoch nicht drucheinander kommen mit unseren Quelldateien und den generierten Dateien.

Wir werden dies in zwei Schritten angehen:
* Lass uns als erstes unsere Projektstruktur wie folgt anlegen. Wir platzieren unseren Quellcode im `src`-Ordner.

```
├── package.json
├── src
│   └── index.ts
└── tsconfig.json
```

* Als nächstes werden wir dem Kompiler beibringen wo unsere Quelldateien liegen und er die genrierten Dateien ablegen soll.

```js{6,7}
// tsconfig.json

{
  "compilerOptions": {
    // ...
    "rootDir": "src",
    "outDir": "build"
    // ...
  },
}
```
Großartig! Wen wir jetzt unser Build-Script ausführen, wird der Kompiler unser generiertes JavaScipt im `build`-Ordner ablegen. [TypeScript React Starter](https://github.com/Microsoft/TypeScript-React-Starter/blob/main/tsconfig.json) bietet eine `tsconfig.json` mit einer Menge guten Optionen zum Starten an.

<<<<<<< HEAD
Generell möchtest du das generierte JavaScript nicht in deiner Versionskontrolle haben, stelle also sicher, dass du den Build-Ordner deiner `.gitignore` hinzugefügt hast.
=======
Great! Now when we run our build script the compiler will output the generated javascript to the `build` folder. The [TypeScript React Starter](https://github.com/Microsoft/TypeScript-React-Starter/blob/master/tsconfig.json) provides a `tsconfig.json` with a good set of rules to get you started.
>>>>>>> 95e15d063b205007a92c52efb5311f76ad5a0b6c

### Dateiendungen {#file-extensions}
In React schreibst du meistens deine Komponenten in eine `.js`-Datei. In TypeScript haben wir 2 Dateiendungen:

`.ts` ist die standardmäßige Dateiendung, wobei `.tsx` eine spezielle Endung für Dateien, die `JSX` beinhalten, ist.

### Ausführen von TypeScript {#running-typescript}

Wenn die obigen Anweisungen befolgt hast, solltest du in der Lage sein TypeScript zum ersten Mal auszuführen.

```bash
yarn build
```

Wenn du npm benutzt, führe folgendes aus:

```bash
npm run build
```

Wenn du keine Ausgabe sieht, bedeutet das, dass alles erfolgreich verlaufen ist.


### Typ-Definitionen {#type-definitions}
Um Fehler un Hinweise von anderen Paketen anzuzeigen, ist der Kompiler auf Deklarationsdateien angewiesen. Eine Deklarationsdatei liefert alle Typ-Informationen einer Bibliothek. Dies ermöglicht uns JavaScript-Bibliotheken, wie solche auf npm in unserem Projekt zu verwenden.

Es gibt im Wesentlichen zwei Möglichkeiten Deklarationen für eine Bibliothek zu erhalten:

__Bundled__ - Die Bibliothek beinhaltet ihre eigene Deklarationedatei. Das ist super für uns, da wir nur die Bibliothek installieren müssen und wir sie direkt benutzen können. Um zu prüfen ob eine Bibliothek Typen beinhaltet, halte im Projekt Ausschau nach einer `index.d.ts`-Datei. Manche Bibliotheken haben diese auch in ihrer `package.json` unter `typings` or `types` angegeben.

__[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)__ - DefinitelyTyped ist ein großes Repository für Bibliotheken, die keine eigene Deklarationsdatei haben. Die Deklarationen sind crowd-sourced und werden von Microsoft und Open-Source-Mitwirkenden verwaltet. React zum Beipsiel hat keine eigene Deklarationsdatei. Stattdessen können wir sie von DefinitelyTyped bekommen. gib dazu diesen Befehl im Terminal ein.

```bash
# yarn
yarn add --dev @types/react

# npm
npm i --save-dev @types/react
```

__Local Declarations__
Manchmal beinhaltet das Paket, welches du nutzt, keine Deklarationen oder ist auf DefinitelyTyped verfügbar. In diesem Fall können wir eine lokale Deklarationsdatei haben. Erstelle dazu eine `declarations.d.ts`-Datei und dem Stammverzeichnis deines Quellordners. Eine einfache Deklaration könnte wie folgt aussehen:

```typescript
declare module 'querystring' {
  export function stringify(val: object): string
  export function parse(val: string): object
}
```

Du bist jetzt bereit zu Coden! Wir empfehelen dir die folgenden Quellen zu besuchen um mehr über TypeScript zu lernen:

* [TypeScript Documentation: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
* [TypeScript Documentation: Migrating from JavaScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
* [TypeScript Documentation: React and Webpack](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)

## ReScript {#rescript}

[ReScript](https://rescript-lang.org/) ist eine typisierte Sprache, welche zu zu JavaScript kompliliert. Einige der Kernfunktionen sind eine garantierte 100%ige Typabdeckung, erstklassige JSX-Unterstützung und [dedizierte React-Bindings](https://rescript-lang.org/docs/react/latest/introduction), um die Integration in bestehende JS / TS React-Codebases zu ermöglichen.

Mehr Infos zur Integration von ReScript in deine bestehende JS / React Codebasis findest du [hier](https://rescript-lang.org/docs/manual/latest/installation#integrate-into-an-existing-js-project).

## Kotlin {#kotlin}

[Kotlin](https://kotlinlang.org/) ist von JetBrains entwickelte statisch typisierte Sprache. Zu ihren Zielplattformen zählt JVM, Android, LLVM und [JavaScript](https://kotlinlang.org/docs/reference/js-overview.html).

JetBrains entwickelt und pflegt verschiedenste Tools speziell für die React-Community: [React bindings](https://github.com/JetBrains/kotlin-wrappers) sowohl als auch [Create React Kotlin App](https://github.com/JetBrains/create-react-kotlin-app). Letzteres hilft dir dabei, ReactAnwendungen mit Kotlin ohne Build-Konfiguration zu verwenden.

## Andere Sprachen {#other-languages}

Beachte, dass es auch andere statisch typisierte Sprachen gibt, die nach JavaScript kompilieren und somit mit React kompatibel sind. Zum Beispiel [F#/Fable](https://fable.io/) mit [elmish-react](https://elmish.github.io/react). Schau dir die jeweiligen Seiten für mehr Informationen an und fühl dich frei dieser Seite weitere statisch typisierte Sprachen die mit React arbeiten hinzuzufügen!
