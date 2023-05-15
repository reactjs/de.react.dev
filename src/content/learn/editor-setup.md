---
title: Editor einrichten
---

<Intro>

Ein richtig konfigurierter Editor kan es einfacher machen Code zu lesen und zu schreiben. Es kann dir helfen Fehler zu finden während man sie schreibt! Wenn du zum ersten Mal einen Editor einrichtest oder deinen aktuellen Editor optimieren willst haben wir ein paar Empfehlungen für dich.

</Intro>

<YouWillLearn>

* Die populärsten Editoren
* Code automatisch formatieren

</YouWillLearn>

## Dein Editor {/*your-editor*/}

[VS Code](https://code.visualstudio.com/) ist einer der populärsten Editoren die derzeit benutzt werden. Er verfügt über einen riesigen Markplatz mit Erweiterungen und kann populäre Dienste wie GitHub sehr gut integrieren. Die meisten der unten genannten Features können ebenfalls als Erweiterungen zu VS Code hinzugefügt werden und machen ihn dadurch sehr anpassungsfähig

Weitere populäre Texteditoren die von der React Community benutzt werden: 

* [WebStorm](https://www.jetbrains.com/webstorm/) ist eine integrierte Entwicklungsumgebung die speziell für JavaScript entworfen wurde.
* [Sublime Text](https://www.sublimetext.com/) unterstützt JSX und TypeScript, [syntax highlighting](https://stackoverflow.com/a/70960574/458193) und Autovervollständigung sind bereits integriert.
* [Vim](https://www.vim.org/) ist ein sehr flexibel konfigurierbarer Texteditor der entwickelt wurde um das erstellen und ändern von jeder Form von Text möglichst effizient zu machen. Er ist als "vi" in den meisten UNIX-Systemen und in Apple OS X enthalten.

## Empfohlene Features bei Texteditoren {/*recommended-text-editor-features*/}

Einige Editoren haben diese Features bereits integriert, während man bei anderen eine Eweiterung hinzufügen muss. 
Überprüfe sicherheitshalber, welche Features dein Editor unterstützt um

### Linting {/*linting*/}

Code Linter finden Probleme in deinem Code während du ihn schreibst, das hilft dir sie frühzeitig zu korrigieren. 
[ESLint](https://eslint.org/) ist ein beliebter, quelloffener Linter für JavaScript

* [ESLint mit den für React empfohlenen Einstellungen installieren](https://www.npmjs.com/package/eslint-config-react-app) (stelle sicher, dass du [Node installiert hast!](https://nodejs.org/en/download/current/))
* [Integriere ESLint mit der offiziellen Erweiterung in VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

**Stelle sicher, dass du alle [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) Regeln für dein Projekt eingeschalten hast.** Sie sind unverzichtbar und helfen dabei, die schwerwiegendsten Fehler frühzeitig zu erkennen. 
Die empfohlenen Voreinstellungen von [`eslint-config-react-app`](https://www.npmjs.com/package/eslint-config-react-app) enthalten diese bereits.

### Formatierung {/*formatting*/}

Was man in jedem Fall vermeiden möchte wenn man Code mit anderen Mitwirkenden teilt, ist es, über die Verwendung von [Tabs vs. Spaces](https://www.google.com/search?q=tabs+vs+spaces) zu diskutieren! Glücklicherweise kann  [Prettier](https://prettier.io/) den Code aufräumen indem es ihn gemäß anpassbarer Regeln neu formatiert. Führe Prettier aus und alle deine Tabs werden zu Spaces - und deine Einrückungen, Anführungszeichen, etc. werden ebenfalls geändert damit sie den Vorgaben entsprechen. Idealerweise ist dein Editor so eingestellt, dass Prettier ausgeführt wird sobald die Datei gespeichert wird um die Formatierungen für dich möglichst einfach vorzunehmen. 

Du kannst die [Prettier Erweiterung in VSCode einrichten](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) indem du die folgenden Schritten ausführst.

1. VS Code starten
2. Benutze den Schnellzugriff (STRG/CMD+P)
3. Fürge dort `ext install esbenp.prettier-vscode` ein
4. Drücke Enter

#### Formattieren beim speichern {/*formatting-on-save*/}

Idealerweise solltest du deinen Code bei jedem speichern formattieren. In VS Code lässt sich das einfach einstellen! 

1. In VS Code, drücke `CTRL/CMD + SHIFT + P`.
2. Tippe "settings" ein
3. Drücke Enter
4. In der Suchleiste, "format on save" eintippen
5. Stelle sicher dass die "format on save" Option markiert ist!

> If your ESLint preset has formatting rules, they may conflict with Prettier. We recommend disabling all formatting rules in your ESLint preset using [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) so that ESLint is *only* used for catching logical mistakes. If you want to enforce that files are formatted before a pull request is merged, use [`prettier --check`](https://prettier.io/docs/en/cli.html#--check) for your continuous integration.
