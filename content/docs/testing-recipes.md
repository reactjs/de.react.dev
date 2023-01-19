---
id: testing-recipes
title: Test-Rezepte
permalink: docs/testing-recipes.html
prev: testing.html
next: testing-environments.html
---

Allgemeine Testmuster für React-Komponenten.

> Hinweis:
>
> Diese Seite geht davon aus, dass Du [Jest](https://jestjs.io/) als Testrunner verwendest. Wenn Du einen anderen Testrunner verwendest, musst Du möglicherweise die API anpassen, aber die Art der Lösung wird wahrscheinlich ähnlich sein. Weitere Informationen zum Einrichten einer Testumgebung findest Du auf der Seite [Test-Umgebungen](/docs/testing-environments.html).

Auf dieser Seite verwenden wir hauptsächlich Funktionskomponenten. Diese Teststrategien hängen jedoch nicht von Implementierungsdetails ab und funktionieren genauso gut auch für Klassenkomponenten.

- [Einrichtung/Abbau](#setup--teardown)
- [`act()`](#act)
- [Rendering](#rendering)
- [Datenabruf](#data-fetching)
- [Module simulieren](#mocking-modules)
- [Ereignisse](#events)
- [Timer](#timers)
- [Snapshot-Testen](#snapshot-testing)
- [Mehrere Renderer](#multiple-renderers)
- [Etwas fehlt?](#something-missing)

---

### Einrichtung/Abbau {#setup--teardown}

Für jeden Test möchten wir normalerweise unseren React-Baum in ein DOM-Element rendern, das an `document` angehängt ist. Dies ist wichtig, damit es DOM-Ereignisse empfangen kann. Wenn der Test endet, wollen wir den Baum "aufräumen" und aus `document` aushängen.

Eine gängige Vorgehensweise besteht darin, ein Paar `beforeEach`- und `afterEach`-Blöcke zu verwenden, damit sie immer ausgeführt werden und die Auswirkungen eines Tests auf sich selbst isoliert bleiben:

```jsx
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  // Ein DOM-Element als Renderziel einrichten
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Bereinigung beim Beenden
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
```

Du kannst ein anderes Muster verwenden, aber denke daran, dass wir die Bereinigung ausführen möchten, _selbst wenn ein Test fehlschlägt_. Andernfalls können Tests "undicht" werden und ein Test kann das Verhalten eines anderen Tests ändern. Das macht sie schwer zu debuggen.

---

### `act()` {#act}

Beim Schreiben von UI-Tests können Aufgaben wie Rendering, Benutzerereignisse oder Datenabruf als "Einheiten" der Interaktion mit einer Benutzeroberfläche betrachtet werden. `react-dom/test-utils` stellt einen Helfer namens [`act()`](/docs/test-utils.html#act) bereit, der sicherstellt, dass alle Aktualisierungen im Zusammenhang mit diesen "Einheiten" verarbeitet und auf das DOM angewendet wurden, bevor Behauptungen aufgestellt werden:

```js
act(() => {
  // Komponenten rendern
});
// Behauptungen aufstellen
```

Dies trägt dazu bei, dass Deine Tests näher an dem ablaufen, was echte Benutzer bei der Verwendung Ihrer Anwendung erleben würden. Der Rest dieser Beispiele verwendet `act()`, um diese Garantien zu geben.

Möglicherweise findest Du die direkte Verwendung von `act()` etwas zu ausführlich. Um einen Teil der Boilerplate zu vermeiden, kannst Du eine Bibliothek wie die [React Testing Library](https://testing-library.com/react) verwenden, deren Helfer mit `act()` umschlossen sind.

> Hinweis:
>
> Der Name `act` kommt vom [Arrange-Act-Assert](http://wiki.c2.com/?ArrangeActAssert) Entwurfsmuster.

---

### Rendering {#rendering}

Normalerweise möchtest Du vielleicht testen, ob eine Komponente für bestimmte Props richtig gerendert wird. Stelle Dir eine einfache Komponente vor, die eine Nachricht basierend auf einer Prop rendert:

```jsx
// hello.js

import React from "react";

export default function Hello(props) {
  if (props.name) {
    return <h1>Hallo, {props.name}!</h1>;
  } else {
    return <span>Hallo Fremder!</span>;
  }
}
```

Du kannst einen Test für diese Komponente schreiben:

```jsx{24-27}
// hello.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Hello from "./hello";

let container = null;
beforeEach(() => {
  // Ein DOM-Element als Renderziel einrichten
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Bereinigung beim Beenden
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Rendert mit oder ohne Namen", () => {
  act(() => {
    render(<Hallo />, container);
  });
  expect(container.textContent).toBe("Hallo Fremder!");

  act(() => {
    render(<Hello name="Jenny" />, container);
  });
  expect(container.textContent).toBe("Hallo, Jenny!");

  act(() => {
    render(<Hello name="Margaret" />, container);
  });
  expect(container.textContent).toBe("Hallo, Margaret!");
});
```

---

### Datenabruf {#data-fetching}

Anstatt in all Deinen Tests echte APIs aufzurufen, kannst Du Requests mit Dummy-Daten simulieren. Das Simulieren des Datenabrufs mit "gefälschten" Daten verhindert fehlerhafte Tests aufgrund eines nicht verfügbaren Backends und beschleunigt ihre Ausführung. Hinweis: Möglicherweise möchtest Du dennoch eine Teilmenge von Tests mit [Ende-zu-Ende-Tests](/docs/testing-environments.html#end-to-end-tests-aka-e2e-tests) ausführen, damit sichergestellt wird, dass die gesamte App zusammenarbeitet.

```jsx
// user.js

import React, { useState, useEffect } from "react";

export default function User(props) {
  const [user, setUser] = useState(null);

  async function fetchUserData(id) {
    const response = await fetch("/" + id);
    setUser(await response.json());
  }

  useEffect(() => {
    fetchUserData(props.id);
  }, [props.id]);

  if (!user) {
    return "Wird geladen...";
  }

  return (
    <details>
      <summary>{user.name}</summary>
      <strong>{user.age}</strong> Jahre alt
      <br />
      lebt in {user.address}
    </details>
  );
}
```

Du kannst Tests dafür schreiben:

```jsx{23-33,44-45}
// user.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import User from "./user";

let container = null;
beforeEach(() => {
  // Ein DOM-Element als Renderziel einrichten
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Bereinigung beim Beenden
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Rendert Benutzerdaten", async () => {
  const fakeUser = {
    name: "Joni Baez",
    age: "32",
    address: "123, Charming Avenue"
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );

  // Verwende die asynchrone Version von act, um aufgelöste Promises anzuwenden
  await act(async () => {
    render(<User id="123" />, container);
  });

  expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
  expect(container.textContent).toContain(fakeUser.address);

  // Entferne die Simulation, um sicherzustellen, dass die Tests vollständig isoliert sind
  global.fetch.mockRestore();
});
```

---

### Module simulieren {#mocking-modules}

Einige Module funktionieren in einer Testumgebung möglicherweise nicht gut oder sind für den Test selbst nicht so wichtig. Das Simulieren dieser Module mit Dummy-Ersetzungen kann das Schreiben von Tests für Deinen eigenen Code erleichtern.

Stelle Dir eine `Contact`-Komponente vor, die eine `GoogleMap`-Komponente eines Drittanbieters einbettet.

```jsx
// map.js

import React from "react";

import { LoadScript, GoogleMap } from "react-google-maps";
export default function Map(props) {
  return (
    <LoadScript id="script-loader" googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap id="example-map" center={props.center} />
    </LoadScript>
  );
}

// contact.js

import React from "react";
import Map from "./map";

export default function Contact(props) {
  return (
    <div>
      <address>
        Kontakt {props.name} per{" "}
        <a data-testid="email" href={"mailto:" + props.email}>
          E-Mail
        </a>
        oder auf der <a data-testid="site" href={props.site}>
          Website
        </a>.
      </address>
      <Map center={props.center} />
    </div>
  );
}
```

Wenn Du diese Komponente nicht in Deinen Tests laden möchtest, kannst Du die Abhängigkeit selbst in einer Dummy-Komponente simulieren und Deine Tests ausführen:

```jsx{10-18}
// contact.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Contact from "./contact";
import MockedMap from "./map";

jest.mock("./map", () => {
  return function DummyMap(props) {
    return (
      <div data-testid="map">
        {props.center.lat}:{props.center.long}
      </div>
    );
  };
});

let container = null;
beforeEach(() => {
  // Ein DOM-Element als Renderziel einrichten
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Bereinigung beim Beenden
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Sollte Kontaktdaten liefern", () => {
  const center = { lat: 0, long: 0 };
  act(() => {
    render(
      <Contact
        name="Joni Baez"
        email="test@example.com"
        site="http://test.com"
        center={center}
      />,
      container
    );
  });

  expect(
    container.querySelector("[data-testid='email']").getAttribute("href")
  ).toEqual("mailto:test@example.com");

  expect(
    container.querySelector('[data-testid="site"]').getAttribute("href")
  ).toEqual("http://test.com");

  expect(container.querySelector('[data-testid="map"]').textContent).toEqual(
    "0:0"
  );
});
```

---

### Ereignisse {#events}

Wir empfehlen, echte DOM-Ereignisse für DOM-Elemente zu senden und dann das Ergebnis zu bestätigen. Betrachte eine `Toggle`-Komponente:

```jsx
// toggle.js

import React, { useState } from "react";

export default function Toggle(props) {
  const [state, setState] = useState(false);
  return (
    <button
      onClick={() => {
        setState(previousState => !previousState);
        props.onChange(!state);
      }}
      data-testid="toggle"
    >
      {state === true ? "Turn off" : "Turn on"}
    </button>
  );
}
```

Wir könnten Tests dafür schreiben:

```jsx
// toggle.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Toggle from "./toggle";

let container = null;
beforeEach(() => {
  // Ein DOM-Element als Renderziel einrichten
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Bereinigung beim Beenden
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("changes value when clicked", () => {
  const onChange = jest.fn();
  act(() => {
    render(<Toggle onChange={onChange} />, container);
  });

  // get a hold of the button element, and trigger some clicks on it
  const button = document.querySelector("[data-testid=toggle]");
  expect(button.innerHTML).toBe("Turn on");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(button.innerHTML).toBe("Turn off");

  act(() => {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  expect(onChange).toHaveBeenCalledTimes(6);
  expect(button.innerHTML).toBe("Turn on");
});
```

Verschiedene DOM-Events und ihre Eigenschaften werden in [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) beschrieben. Beachte, dass Du `{ bubbles: true }` in jedem von deinen erstellten Events übergeben musst, damit es den React-Listener erreicht, da React-Events automatisch an den Stamm (engl. root) delegiert werden.

> Hinweis:
>
> Die React Testing Library bietet einen [übersichtlicheren Helfer](https://testing-library.com/docs/dom-testing-library/api-events) für das Auslösen von Ereignissen.

---

### Timer {#timers}

Dein Code könnte zeitgeberbasierte Funktionen wie `setTimeout` verwenden, um mehr Arbeit in der Zukunft zu planen. In diesem Beispiel wartet ein Multiple-Choice-Feld auf eine Auswahl und rückt vor, wobei eine Zeitüberschreitung eintritt, wenn innerhalb von 5 Sekunden keine Auswahl getroffen wird:

```jsx
// card.js

import React, { useEffect } from "react";

export default function Card(props) {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      props.onSelect(null);
    }, 5000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [props.onSelect]);

  return [1, 2, 3, 4].map(choice => (
    <button
      key={choice}
      data-testid={choice}
      onClick={() => props.onSelect(choice)}
    >
      {choice}
    </button>
  ));
}
```

Wir können Tests für diese Komponente schreiben, indem wir [Jests Timer-Mocks](https://jestjs.io/docs/en/timer-mocks) nutzen und die verschiedenen Zustände testen, in denen sie sich befinden kann.

```jsx{7,31,37,49,59}
// card.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Card from "./card";

let container = null;
beforeEach(() => {
  // Ein DOM-Element als Renderziel einrichten
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.useFakeTimers();
});

afterEach(() => {
  // Bereinigung beim Beenden
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.useRealTimers();
});

it("should select null after timing out", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });

  // move ahead in time by 100ms
  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();

  // and then move ahead by 5 seconds
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(onSelect).toHaveBeenCalledWith(null);
});

it("should cleanup on being removed", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();

  // unmount the app
  act(() => {
    render(null, container);
  });

  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(onSelect).not.toHaveBeenCalled();
});

it("should accept selections", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });

  act(() => {
    container
      .querySelector("[data-testid='2']")
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onSelect).toHaveBeenCalledWith(2);
});
```

Sie können gefälschte Timer nur in einigen Tests verwenden. Oben haben wir sie aktiviert, indem wir `jest.useFakeTimers()` aufgerufen haben. Der Hauptvorteil, den sie bieten, besteht darin, dass Ihr Test nicht wirklich fünf Sekunden auf die Ausführung warten muss, und Sie mussten den Komponentencode auch nicht nur zum Testen komplizierter machen.

---

### Snapshot-Testen {#snapshot-testing}

Mit Frameworks wie Jest können Sie mit [`toMatchSnapshot` / `toMatchInlineSnapshot`](https://jestjs.io/docs/en/snapshot-testing) auch "Schnappschüsse" von Daten speichern. Mit diesen können wir die gerenderte Komponentenausgabe "speichern" und sicherstellen, dass eine Änderung daran explizit als Änderung am Snapshot festgeschrieben werden muss.
In diesem Beispiel rendern wir eine Komponente und formatieren den gerenderten HTML-Code mit dem [`pretty`](https://www.npmjs.com/package/pretty) Paket, bevor wir ihn als Inline-Snapshot speichern:

```jsx{29-31}
// hello.test.js, again

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import Hello from "./hello";

let container = null;
beforeEach(() => {
  // Ein DOM-Element als Renderziel einrichten
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Bereinigung beim Beenden
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render a greeting", () => {
  act(() => {
    render(<Hello />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */

  act(() => {
    render(<Hello name="Jenny" />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */

  act(() => {
    render(<Hello name="Margaret" />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */
});
```

Es ist in der Regel besser, spezifischere Behauptungen aufzustellen, als Snapshots zu verwenden. Diese Art von Tests beinhalten Implementierungsdetails, damit sie leicht brechen, und Teams können gegenüber Snapshot-Brüchen desensibilisiert werden. Das [selektive Simulieren einiger untergeordneter Komponenten](#mocking-modules) kann dazu beitragen, die Größe von Snapshots zu reduzieren und sie für die Codeüberprüfung lesbar zu halten.

---

### Mehrere Renderer {#multiple-renderers}

In seltenen Fällen führen Sie möglicherweise einen Test für eine Komponente aus, die mehrere Renderer verwendet. Beispielsweise können Sie Snapshot-Tests auf einer Komponente mit `react-test-renderer` ausführen, die intern `render` von `react-dom` innerhalb einer untergeordneten Komponente verwendet, um einige Inhalte zu rendern. In diesem Szenario können Sie Aktualisierungen mit `act()`s umschließen, die ihren Renderern entsprechen.

```jsx
import { act as domAct } from "react-dom/test-utils";
import { act as testAct, create } from "react-test-renderer";
// ...
let root;
domAct(() => {
  testAct(() => {
    root = create(<App />);
  });
});
expect(root).toMatchSnapshot();
```

---

### Etwas fehlt? {#something-missing}

Wenn ein gängiges Szenario nicht abgedeckt ist, teilen Sie uns dies bitte auf der [Problemverfolgungswebsite](https://github.com/reactjs/reactjs.org/issues) für die Dokumentation mit.