---
id: testing
title: Test-Übersicht
permalink: docs/testing.html
redirect_from:
  - "community/testing.html"
next: testing-recipes.html
---

Du kannst React-Komponenten ähnlich wie anderen JavaScript-Code testen.

Es gibt einige Wege, React-Komponenten zu testen. Sie fallen in zwei Kategorien:

* **Komponenten-Bäume rendern** in einer vereinfachten Test-Umgebung und sicherstellen, dass sie die erwarteten Ausgaben liefern.
* **Eine komplette App ausführen** in einem realistischen Browser-Umgebung (auch bekannt als “Ende-zu-Ende”-Tests).

<<<<<<< HEAD
Dieses Dokumentationskapitel fokussiert sich auf Testing-Strategien für die erste Kategorie von Tests. Während volle Ende-zu-Ende-Tests nützlich sein können, um Regressionen an wichtigen Abläufen zu verhindern, befassen sie sich nicht direkt mit React-Komponenten und gehen über dieses Kapitel hinaus.
=======
This documentation section focuses on testing strategies for the first case. While full end-to-end tests can be very useful to prevent regressions to important workflows, such tests are not concerned with React components in particular, and are out of the scope of this section.
>>>>>>> b3c7f041586b71b31f556403426fcd7cab342535

### Tradeoffs {#tradeoffs}

Bei der Auswahl der Testing-Tools lohnt es sich, einige Tradeoffs zu betrachten:

* **Iterationsgeschwindigkeit vs. realistische Umgebung:** Einige Tools bieten einen sehr schnellen Feedbackzyklus zwischen dem Vornehmen von Änderungen und der Sichtbarkeit der Ergebnisse der Änderungen, stellen aber das tatsächliche Browserverhalten nicht präzise nach. Andere Tools mögen zwar eine echte Browserumgebung verwenden, reduzieren aber die Iterationsgeschwindigkeit und sind unzuverlässiger auf einem Continuous-Integration-Server.
* **Wie viel mocken:** Mit Komponenten kann die Grenze zwischen einem "Unit-" und "Integrationstest" schwammig werden. Wenn du ein Formular testest, sollte der Test auch die Buttons im Formular testen? Oder sollte eine Button-Komponente ihre eigene Test-Suite haben? Sollten Änderungen am Button jemals den Test des Formulars brechen können?

Unterschiedliche Antworten mögen für unterschiedliche Teams und Produkte funktionieren.

### Empfohlene Tools {#tools}

**[Jest](https://facebook.github.io/jest/)** ist ein JavaScript-Test-Runner, der dich auf das DOM via [`jsdom`](/docs/testing-environments.html#mocking-a-rendering-surface) zugreifen lässt. Während jsdom nur eine Näherung davon ist, wie der Browser funktioniert, ist es oft gut genug, um React-Komponenten zu testen. Jest bietet eine hohe Iterationsgeschwindigkeit kombiniert mit mächtigen Features wie [Mocking-Modulen](/docs/testing-environments.html#mocking-modules) und [Timern](/docs/testing-environments.html#mocking-timers), wodurch du mehr Kontrolle darüber hast, wie der Code ausgeführt wird.

**[React Testing Library](https://testing-library.com/react)** ist eine Menge von Helpern, die dich React-Komponenten testen lassen, ohne deren Implementierungsdetails zu kennen. Dieser Ansatz macht Refactoring einfach und spornt dich außerdem zu Best Practices für Barrierefreiheit an. Obwohl sie keine Möglichkeit bietet, eine Komponente "shallow" (d.h. ohne ihre Kinder) zu rendern, lässt ein Test-Runner wie Jest das via [Mocking](/docs/testing-recipes.html#mocking-modules) zu.

### Lerne mehr {#learn-more}

Dieses Kapitel ist in zwei Teile unterteilt:

- [Rezepte](/docs/testing-recipes.html): Übliche Patterns in Tests für React-Komponenten.
- [Umgebungen](/docs/testing-environments.html): Was zu beachten ist beim Setup einer Test-Umgebung für React-Komponenten.
