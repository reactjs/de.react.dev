---
id: faq-internals
title: Virtuelles DOM und Interna
permalink: docs/faq-internals.html
layout: docs
category: FAQ
---

### Was ist das virtuelle DOM? {#what-is-the-virtual-dom}

Das virtuelle DOM (VDOM) ist ein Programmierkonzept, bei dem eine ideale oder "virtuelle" Darstellung der Benutzerschnittstelle (UI) im Speicher gehalten und mit dem "echten" DOM mittels einer Bibliothek names ReactDOM synchronisiert wird. Dieser Prozess wird [Abgleich (engl. reconcilation)](/docs/reconciliation.html) genannt.

Dieser Ansatz ermöglicht die deklarative API von React: Du sagst React, in welchem Zustand die UI sein soll, und React stellt sicher, dass das DOM zu diesem Zustand passt. Dies abstrahiert die Attributmanipulation, die Behandlung von Events und manuelle DOM-Updates, die man ansonsten verwenden müsste, um eine App zu bauen.

Nachdem "virtuelles DOM" eher ein Schema als eine spezifische Technologie ist, verwenden die Leute den Begriff manchmal für andere Dinge. Im Kontext von React wird der Begriff "virtuelles DOM" normalerweise mit [React-Elementen](/docs/rendering-elements.html) assoziiert, da diese die Objekte sind, die die UI repräsentieren. Allerdings nutzt React außerdem interne Objekte namens "Fasern", um zusätzliche Informationen über den Komponentenbaum zu speichern. Diese können ebenfalls als ein Teil der Implementierung des "virtuellen DOM" in React betrachtet werden.

### Ist das Schatten-DOM das selbe wie das virtuelle DOM? {#is-the-shadow-dom-the-same-as-the-virtual-dom}

Nein, das sind verschiedene Dinge. Das Schatten-DOM ist eine Browsertechnologie, die vorwiegend für das Scoping von Variablen und CSS in Webkomponenten designed wurde. Das virtuelle DOM ist ein Konzept, das von browserfremden Bibliotheken in JavaScript für Browser implementiert wird.

### Was ist "React Fiber"? {#what-is-react-fiber}

Fiber ist die neue Abgleich-Engine in React 16. Ihr hauptsächliches Ziel ist es, inkrementelles Rendering des virtuellen DOM zu erlauben. [Lies mehr dazu](https://github.com/acdlite/react-fiber-architecture).
