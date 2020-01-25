---
id: static-type-checking
title: Statische Typprüfung
permalink: docs/static-type-checking.html
---

Statische Typprüfer, wie [Flow](https://flow.org/) und [TypeScript](https://www.typescriptlang.org/) erkennen bestimmte Arten von Problemen, bevor du überhaupt deinen Code ausführst. Sie können den Workflow bei der Entwicklung verbessern, indem zum Beispiel Features, wie die Autovervollständigung hinzugefügt werden. Aus diesem Grund empfehlen wir Flow oder Typescript für größere Codebasen, anstatt `PropTypes` zu verwenden.

## Flow {#flow}

[Flow](https://flow.org/) ist ein statischer Typprüfer für deinen JavaScript Code. Es wird bei Facebook entwickelt und oft mit React verwendet. Es ermöglicht dir Variablen, Funktionen und React-Komponenten mit einer speziellen Typ-Syntax zu verseehen und so Fehler frühzeitig zu erkennen. Du kannst eine [Einführung in Flow](https://flow.org/en/docs/getting-started/) lesen um die Grundlagen zu lernen.

Um Flow zu verwenden, musst du folgendes tun:

* Füge Flow deinem Projekt als Abhängigkeit hinzu.
* stelle sicher, dass doe Flow-Syntax aus kompiliertem Code entfernt wird.
* Füge Typ-Anmerkungen hinzu und führe Flow aus, um diese zu überprüfen.

Wir werden diese Schtitte weiter unten im Detail erklären.

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

Typically it is placed at the top of a file. Try adding it to some files in your project and run `yarn flow` or `npm run flow` to see if Flow already found any issues.

There is also [an option](https://flow.org/en/docs/config/options/#toc-all-boolean) to force Flow to check *all* files regardless of the annotation. This can be too noisy for existing projects, but is reasonable for a new project if you want to fully type it with Flow.

Now you're all set! We recommend to check out the following resources to learn more about Flow:

* [Flow Documentation: Type Annotations](https://flow.org/en/docs/types/)
* [Flow Documentation: Editors](https://flow.org/en/docs/editors/)
* [Flow Documentation: React](https://flow.org/en/docs/react/)
* [Linting in Flow](https://medium.com/flow-type/linting-in-flow-7709d7a7e969)

## TypeScript {#typescript}

[TypeScript](https://www.typescriptlang.org/) is a programming language developed by Microsoft. It is a typed superset of JavaScript, and includes its own compiler. Being a typed language, TypeScript can catch errors and bugs at build time, long before your app goes live. You can learn more about using TypeScript with React [here](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter).

To use TypeScript, you need to:
* Add TypeScript as a dependency to your project
* Configure the TypeScript compiler options
* Use the right file extensions
* Add definitions for libraries you use

Let's go over these in detail.

### Using TypeScript with Create React App {#using-typescript-with-create-react-app}

Create React App supports TypeScript out of the box.

To create a **new project** with TypeScript support, run:

```bash
npx create-react-app my-app --template typescript
```

You can also add it to an **existing Create React App project**, [as documented here](https://facebook.github.io/create-react-app/docs/adding-typescript).

>Hinweis:
>
>If you use Create React App, you can **skip the rest of this page**. It describes the manual setup which doesn't apply to Create React App users.


### Adding TypeScript to a Project {#adding-typescript-to-a-project}
It all begins with running one command in your terminal.

Wenn du [Yarn](https://yarnpkg.com/) verwendest, führe folgendes aus:

```bash
yarn add --dev typescript
```

Wenn du [npm](https://yarnpkg.com/) verwendest, führe folgendes aus:

```bash
npm install --save-dev typescript
```

Congrats! You've installed the latest version of TypeScript into your project. Installing TypeScript gives us access to the `tsc` command. Before configuration, let's add `tsc` to the "scripts" section in our `package.json`:

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

### Configuring the TypeScript Compiler {#configuring-the-typescript-compiler}
The compiler is of no help to us until we tell it what to do. In TypeScript, these rules are defined in a special file called `tsconfig.json`. To generate this file:

Wenn du [Yarn](https://yarnpkg.com/) verwendest, führe folgendes aus:

```bash
yarn run tsc --init
```

Wenn du [npm](https://yarnpkg.com/) verwendest, führe folgendes aus:

```bash
npx tsc --init
```

Looking at the now generated `tsconfig.json`, you can see that there are many options you can use to configure the compiler. For a detailed description of all the options, check [here](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

Of the many options, we'll look at `rootDir` and `outDir`. In its true fashion, the compiler will take in typescript files and generate javascript files. However we don't want to get confused with our source files and the generated output.

We'll address this in two steps:
* Firstly, let's arrange our project structure like this. We'll place all our source code in the `src` directory.

```
├── package.json
├── src
│   └── index.ts
└── tsconfig.json
```

* Next, we'll tell the compiler where our source code is and where the output should go.

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

Great! Now when we run our build script the compiler will output the generated javascript to the `build` folder. The [TypeScript React Starter](https://github.com/Microsoft/TypeScript-React-Starter/blob/master/tsconfig.json) provides a `tsconfig.json` with a good set of rules to get you started.

Generally, you don't want to keep the generated javascript in your source control, so be sure to add the build folder to your `.gitignore`.

### File extensions {#file-extensions}
In React, you most likely write your components in a `.js` file. In TypeScript we have 2 file extensions:

`.ts` is the default file extension while `.tsx` is a special extension used for files which contain `JSX`.

### Running TypeScript {#running-typescript}

If you followed the instructions above, you should be able to run TypeScript for the first time.

```bash
yarn build
```

If you use npm, run:

```bash
npm run build
```

If you see no output, it means that it completed successfully.


### Type Definitions {#type-definitions}
To be able to show errors and hints from other packages, the compiler relies on declaration files. A declaration file provides all the type information about a library. This enables us to use javascript libraries like those on npm in our project.

There are two main ways to get declarations for a library:

__Bundled__ - The library bundles its own declaration file. This is great for us, since all we need to do is install the library, and we can use it right away. To check if a library has bundled types, look for an `index.d.ts` file in the project. Some libraries will have it specified in their `package.json` under the `typings` or `types` field.

__[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)__ - DefinitelyTyped is a huge repository of declarations for libraries that don't bundle a declaration file. The declarations are crowd-sourced and managed by Microsoft and open source contributors. React for example doesn't bundle its own declaration file. Instead we can get it from DefinitelyTyped. To do so enter this command in your terminal.

```bash
# yarn
yarn add --dev @types/react

# npm
npm i --save-dev @types/react
```

__Local Declarations__
Sometimes the package that you want to use doesn't bundle declarations nor is it available on DefinitelyTyped. In that case, we can have a local declaration file. To do this, create a `declarations.d.ts` file in the root of your source directory. A simple declaration could look like this:

```typescript
declare module 'querystring' {
  export function stringify(val: object): string
  export function parse(val: string): object
}
```

You are now ready to code! We recommend to check out the following resources to learn more about TypeScript:

* [TypeScript Documentation: Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
* [TypeScript Documentation: Migrating from Javascript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
* [TypeScript Documentation: React and Webpack](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)

## Reason {#reason}

[Reason](https://reasonml.github.io/) is not a new language; it's a new syntax and toolchain powered by the battle-tested language, [OCaml](https://ocaml.org/). Reason gives OCaml a familiar syntax geared toward JavaScript programmers, and caters to the existing NPM/Yarn workflow folks already know.

Reason is developed at Facebook, and is used in some of its products like Messenger. It is still somewhat experimental but it has [dedicated React bindings](https://reasonml.github.io/reason-react/) maintained by Facebook and a [vibrant community](https://reasonml.github.io/docs/en/community.html).

## Kotlin {#kotlin}

[Kotlin](https://kotlinlang.org/) is a statically typed language developed by JetBrains. Its target platforms include the JVM, Android, LLVM, and [JavaScript](https://kotlinlang.org/docs/reference/js-overview.html).

JetBrains develops and maintains several tools specifically for the React community: [React bindings](https://github.com/JetBrains/kotlin-wrappers) as well as [Create React Kotlin App](https://github.com/JetBrains/create-react-kotlin-app). The latter helps you start building React apps with Kotlin with no build configuration.

## Other Languages {#other-languages}

Note there are other statically typed languages that compile to JavaScript and are thus React compatible. For example, [F#/Fable](https://fable.io/) with [elmish-react](https://elmish.github.io/react). Check out their respective sites for more information, and feel free to add more statically typed languages that work with React to this page!
