---
title: Eine zustandsabhängige Komponente
order: 1
domid: timer-example
---

Zusätzlich zur Übernahme von Eingabedaten (Zugriff durch `this.props`) kann eine Komponente interne Zustandsdaten pflegen (Zugriff durch `this.state`).

Wenn sich die Zustandsdaten einer Komponente ändern, wird das gerenderte Markup durch erneutes Aufrufen von `render()` aktualisiert.
