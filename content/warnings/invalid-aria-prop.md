---
title: Invalid ARIA Prop Warnung
layout: single
permalink: warnings/invalid-aria-prop.html
---

Die Warnung `invalid-aria-prop` wird angezeigt, wenn du versuchst ein DOM Element mit einem `aria-*` Attribut zu rendern, dieses Attribut allerdings nicht in der Web Accessibility Initiative (WAI) Accessible Rich Internet Application (ARIA) [Spezifikation](https://www.w3.org/TR/wai-aria-1.1/#states_and_properties) enthalten ist.

1. Wenn du denkst, das Attribut ist korrekt und existiert, prüfe die verwendete Schreibweise. `aria-labelledby` und `aria-activedescendant` werden oft falsch geschrieben.

2. React kennt das Attribut noch nicht. Dieser Fall wird vermutlich in einer zukünftigen Version behoben. React entfernt allerdings alle unbekannten Attribute, daher werden sie trotz Nutzung nicht im DOM eingefügt.
