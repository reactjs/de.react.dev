---
title: Don't Call PropTypes Warning
layout: single
permalink: warnings/dont-call-proptypes.html
---

> Beachte:
>
> `React.PropTypes` ist seit React v15.5 in ein anderes Paket verschoben worden. Verwende stattdessen [die `prop-types` Bibliothek](https://www.npmjs.com/package/prop-types).
>
>Um die Umstellung zu automatisieren, haben wir [ein codemod Script](/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes) zur Verfügung gestellt.

Der Code, der die Funktionen der PropType-Validierung bereitstellt, wird in einem zukünftigen Major-Release der Produktionsversion von React, entfernt. Sobald dies geschehen ist, wird jeder manuelle Aufruf dieser Funktionen im Code (welcher nicht von Produktion entfernt worden ist), eine Fehlermeldung werfen.

### Deklaration von PropTypes ist immer noch in Ordnung {#declaring-proptypes-is-still-fine}

Die normale Verwendung von PropTypes wird immer noch unterstützt:

```javascript
Button.propTypes = {
  highlighted: PropTypes.bool
};
```

Hier hat sich nichts geändert.

### Rufe PropTypes nicht direkt auf {#dont-call-proptypes-directly}

Die Verwendung von PropTypes in jeder anderen Art und Weise, außer zum ansprechen von React Komponenten, wird nicht mehr unterstützt:

```javascript
var apiShape = PropTypes.shape({
  body: PropTypes.object,
  statusCode: PropTypes.number.isRequired
}).isRequired;

// Nicht untersützt!
var error = apiShape(json, 'response');
```

Falls du von dieser Verwendung von PropTypes abhängst, raten wir dir, eine Fork von Proptypes (zum Beispiel [diese](https://github.com/aackerman/PropTypes) [zwei](https://github.com/developit/proptypes) Pakete) zu erstellen oder zu verwenden.

Wird diese Warnung nicht aufgelöst, so wird der Code in der Produktion mit React 16 abstürzen.

### Falls du PropTypes nicht direkt aufrufst aber immer noch die Warnung siehst {#if-you-dont-call-proptypes-directly-but-still-get-the-warning}

Untersuche die Stack-Ablaufverfolgung, die von der Warnung entstanden ist. Du wirst die Komponentendefinition finden, die für den direkten Aufruf des PropTypes verantwortlich ist. Wahrscheinlich ist dieses Problem durch PropTypes Dritter verantwortlich, die die Proptypes von React umfassen: 


```js
Button.propTypes = {
  highlighted: ThirdPartyPropTypes.deprecated(
    PropTypes.bool,
    'Verwende `active` Prop stattdessen'
  )
}
```

In diesem Fall ist `ThirdPartyPropTypes.deprecated` ein Wrapper welches `PropTypes.bool` aufruft. Dieses Muster an sich ist in Ordnung, aber es triggert einen falschen Alarm. da React annimmt, dass PropTypes direkt aufgeruft werden. In dem nächsten Abschnitt wird erklärt, wie man dieses Problem löst, wenn eine Bibliothek so etwas wie `ThirdPartyPropTypes` verwendet. Falls es eine Bibliothek ist, die du nicht geschrieben hast, kannst du ein Issue dagegen aufmachen.

### Lösen der falschen Fehlermeldung in drittanbietenden PropTypes {#fixing-the-false-positive-in-third-party-proptypes}

Falls du ein Autor von Drittanbieter PropType-Bibliotheken bist und Konsumenten existierende React PropTypes umschließen lässt, werden die Konsumenten anfangen, diese Warnung von deiner Bibliothek zu bekommen. Das passiert, weil React das "geheime" letzte Argument, welches [es weitergibt](https://github.com/facebook/react/pull/7132), um manuelle PropType Aufrufe zu finden, nicht sieht.

So löst man dieses Problem. Wir werden `deprecated` von [react-bootstrap/react-prop-types](https://github.com/react-bootstrap/react-prop-types/blob/0d1cd3a49a93e513325e3258b28a82ce7d38e690/src/deprecated.js) als ein Beispiel hernehmen. Die aktuelle Implementation gibt die `props`, `propName` and `componentName` Argumente weiter:

```javascript
export default function deprecated(propType, explanation) {
  return function validate(props, propName, componentName) {
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
      if (!warned[message]) {
        warning(false, message);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName);
  };
}
```
 
Um diese falsche Fehlermeldung zu lösen, ist sicherzustellen, dass **alle** Argumente an das umschlossene PropType weitergegeben werden. Das ist mit der ES6 `...rest` Notation einfach zu machen: 
 
```javascript
export default function deprecated(propType, explanation) {
  return function validate(props, propName, componentName, ...rest) { // Beachte ...rest hier
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
      if (!warned[message]) {
        warning(false, message);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName, ...rest); // und hier
  };
}
```

Das wird die Warnung stumm schalten.
