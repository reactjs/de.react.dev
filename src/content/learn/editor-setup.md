---
title: Editor Setup
---

<Intro>

Ein richtig konfigurierter Editor kann den Code klarer lesbar machen und das Schreiben von Code beschleunigen. Er kann sogar dabei helfen, Fehler zu entdecken, während du sie schreibst! Wenn du zum ersten Mal einen Editor einrichtest oder deinen aktuellen Editor optimieren möchtest, haben wir ein paar Empfehlungen für dich.

</Intro>

<YouWillLearn>

* Welche die beliebtesten Editoren sind
* Wie du deinen Code automatisch formatierst

</YouWillLearn>

## Dein Editor {/*your-editor*/}

[VS Code](https://code.visualstudio.com/) ist einer der beliebtesten Editoren, die heute verwendet werden. Er verfügt über eine große Auswahl an Erweiterungen und lässt sich gut mit beliebten Diensten wie GitHub integrieren. Die meisten der unten aufgelisteten Funktionen können auch als Erweiterungen zu VS Code hinzugefügt werden, was ihn sehr konfigurierbar macht!

Andere beliebte Texteditoren, die in der React-Community verwendet werden, sind:

* [WebStorm](https://www.jetbrains.com/webstorm/) ist eine integrierte Entwicklungsumgebung, die speziell für JavaScript entwickelt wurde.
* [Sublime Text](https://www.sublimetext.com/) bietet bereits integrierte Unterstützung für JSX und TypeScript, [Syntaxhervorhebung](https://stackoverflow.com/a/70960574/458193) und automatische Vervollständigung.
* [Vim](https://www.vim.org/) ist ein sehr konfigurierbarer Texteditor, mit dem sich jede Art von Text sehr effizient erstellen und ändern lässt. Er ist in den meisten UNIX-Systemen und in Apple OS X als "vi" enthalten.

## Empfohlene Texteditor-Funktionen {/*recommended-text-editor-features*/}

Bei einigen Editoren sind diese Funktionen bereits integriert, bei anderen muss möglicherweise eine Erweiterung hinzugefügt werden. Um sicherzugehen, erkundige dich, welche Unterstüzung der Editor deiner Wahl bietet.

### Linting {/*linting*/}

Code-Linter finden Probleme in deinem Code, während du ihn schreibst, und helfen dir, sie frühzeitig zu beheben. [ESLint](https://eslint.org/) ist ein beliebter, Open-Source Linter für JavaScript.

* [Installiere ESLint mit der empfohlenen Konfiguration für React](https://www.npmjs.com/package/eslint-config-react-app) (Gehe sicher, dass du [Node installiert hast!](https://nodejs.org/en/download/current/))
* [Integriere ESLint in VSCode mit der offiziellen Erweiterung](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

**Vergewissere dich, dass du alle [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) Regeln für dein Projekt aktiviert hast.** Sie sind unverzichtbar und fangen die schwerwiegendsten Fehler frühzeitig ab. Die Empfohlene [`eslint-config-react-app`](https://www.npmjs.com/package/eslint-config-react-app) Voreinstellung enthält sie bereits.

### Formatierung {/*formatting*/}

Das Letzte, was du tun möchtest, wenn du deinen Code mit jemand anderem teilst, ist eine Diskussion über [Tabs vs Leerzeichen](https://www.google.com/search?q=tabs+oder+spaces) zu führen! Glücklicherweise räumt [Prettier](https://prettier.io/) deinen Code auf, indem es ihn so umformatiert, dass er den voreingestellten, konfigurierbaren Regeln entspricht. Starte Prettier, und alle Tabs werden in Leerzeichen umgewandelt - und auch die Einrückung, Anführungszeichen usw. werden entsprechend der Konfiguration geändert. Im Idealfall wird Prettier ausgeführt, wenn du deine Datei speicherst, und führt diese Änderungen schnell für dich durch.

Du kannst die [Prettier Erweiterung in VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) installieren, indem du folgende Schritte befolgst:

1. Starte VS Code
2. Benutze die "Quick Open"-Funktion (drücke Ctrl/Cmd+P)
3. Füge `ext install esbenp.prettier-vscode` ein
4. Drücke Enter

#### Formatierung beim Speichern {/*formatting-on-save*/}

Idealerweise solltest du deinen Code bei jedem Speichern formatieren. VS Code hat dafür Einstellungen!

1. Drücke `CTRL/CMD + SHIFT + P` in VS Code.
2. Schreibe "settings"
3. Drücke Enter
4. Gib in der Suchleiste "format on save" ein
5. Gehe sicher, dass die "format on save" Option angekreuzt ist!

> Wenn deine ESLint-Voreinstellung Formatierungsregeln enthält, können diese mit Prettier in Konflikt geraten. Wir empfehlen, alle Formatierungsregeln in deiner ESLint-Voreinstellung zu deaktivieren, indem du [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) benutzt, so dass ESLint *nur* zum Aufspüren logischer Fehler verwendet wird. Wenn du erzwingen willst, dass Dateien formatiert werden, bevor eine Pull Request zusammengeführt wird, verwende [`prettier --check`](https://prettier.io/docs/en/cli.html#--check) für eine kontinuierliche Integration.
