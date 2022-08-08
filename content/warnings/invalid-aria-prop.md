---
title: Invalid ARIA Prop Warnung
layout: single
permalink: warnings/invalid-aria-prop.html
---

Die Warnung `invalid-aria-prop` wird angezeigt, wenn du versuchst ein DOM Element mit einem `aria-*` Attribut zu rendern, dieses Attribut allerdings nicht in der Web Accessibility Initiative (WAI) Accessible Rich Internet Application (ARIA) [Spezifikation](https://www.w3.org/TR/wai-aria-1.1/#states_and_properties) enthalten ist.

1. Wenn du denkst, das Attribut ist korrekt und existiert, prüfe die verwendete Schreibweise. `aria-labelledby` und `aria-activedescendant` werden oft falsch geschrieben.

<<<<<<< HEAD
2. React erkennt das von dir angegebene Attribut noch nicht. Dies wird wahrscheinlich in einer zukünftigen Version von React behoben werden.
=======
2. If you wrote `aria-role`, you may have meant `role`.

3. Otherwise, if you're on the latest version of React DOM and verified that you're using a valid property name listed in the ARIA specification, please [report a bug](https://github.com/facebook/react/issues/new/choose).
>>>>>>> 4808a469fa782cead9802619b0341b27b342e2d3
