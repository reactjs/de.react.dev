---
id: accessibility
title: Barrierefreiheit
permalink: docs/accessibility.html
---

## Warum Barrierefreiheit? {#why-accessibility}

Barrierefreiheit im Web (Auch bekannt unter dem Begriff [**a11y**](https://en.wiktionary.org/wiki/a11y)) beschreibt Design und Umsetzung von Websites welche ausnahmlos von Jedem genutzt werden können. Barriefreiheit ist notwendig um Assistenzprogrammen das Interpretieren von Websites zu ermöglichen. 

React unterstützt das Erstellen von barrierefreien Webseiten in vollem Ausmaß, unter anderem durch die Nutzung von Standard-HTML-Technologien. 

## Standards und Anleitungen {#standards-and-guidelines}

### WCAG {#wcag}

Die [Web Content Accessibility Guidelines](https://www.w3.org/WAI/intro/wcag) enthalten Anleitungen um barrierefreie Webseiten zu erstellen.

Die folgenden WCAG-Checklisten geben einen kurzen Überblick:

- [WCAG checklist von Wuhcag](https://www.wuhcag.com/wcag-checklist/)
- [WCAG checklist von WebAIM](https://webaim.org/standards/wcag/checklist)
- [Checklist von dem A11Y Project](https://a11yproject.com/checklist.html)

### WAI-ARIA {#wai-aria}

Das [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria) Dokument zeigt Techniken für das Entwickeln vollkommen barrierefreier JavaScript Widgets. 

Es gilt, dass alle `aria-*` HTML-Attribute in JSX komplett unterstützt werden. Während die meisten DOM-Eigenschaften und Attribute in React in camelCase umgesetzt werden, sollten diese Attribute hyphen-cased (auch bekannt als kebab-case, lisp-case, usw.) sein, so wie man es auch bei normalem HTML tun würde:

```javascript{3,4}
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```

## Semantisches HTML {#semantic-html}
Semantisches HTML ist das Fundament der Barrierefreiheit einer Webanwendung. Das Nutzen der verschiedenen HTML-Elemente, welche die Bedeutung einer Information betonen bringt dir oftmals Barrierefreiheit ohne extra Aufwand.  

- [MDN HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

Manchmal wird die Bedeutung verschiedener HTML Elemente verfälscht indem ein `<div>` Element um das JSX hinzugefügt wird um den React-Code zum laufen zu bringen, besonders häufig beim Arbeiten mit Listen (`<ol>`, `<ul>` und `<dl>`) und der HTML `<table>`. 
Hier sollten besser [React Fragments](/docs/fragments.html) genutzt werden um mehrere Elemente in einer Gruppe zusammenzufassen.

Zum Beispiel,

```javascript{1,5,8}
import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}
```

Es ist auch möglich mehrere Fragmente in einem Array mit Hilfe der `map`-Funktion zusammenzufassen, genauso wie du es bei anderen Element auch tun würdest:

```javascript{6,9}
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

Solltest du keine Props für einen Fragment-Tag brauchen kannst du die folgende [short syntax](/docs/fragments.html#short-syntax) nutzen, sofern dein JS-Tooling diese unterstützt:

```javascript{3,6}
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

Weitere Infos findest in der [Dokumentation über Fragments](/docs/fragments.html).

## Barrierefreie Formulare {#accessible-forms}

### Kennzeichnung {#labeling}
Jedes HTML Formularelement, wie zum Beispiel `<input>` und `<textarea>`, muss barrierefrei gekennzeichnet werden. Es müssen beschreibende Kennzeichnungen, welche für Screenreader relevant sind, vorhanden sein.  

In folgenden Quellen kannst du nachlesen wie dies am besten umzusetzen ist:

- [Das W3C zeigt wie Elemente zu kennzeichnen sind](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WebAIM zeigt wie Elemente zu kennzeichnen sind](https://webaim.org/techniques/forms/controls)
- [Die Paciello Gruppe erklärt barrierefreie Namen](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

Auch wenn diese HTML-Standards direkt in React genutzt werden können, solltest du darauf achten dass das `for`-Attribut in JSX `htmlFor` heißt.

```javascript{1}
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

### Den Nutzer über Fehler informieren  {#notifying-the-user-of-errors}

Fehlersituation müssen von allen Nutzern gleich verstanden werden. Die folgenden Links zeigen uns wie man Fehlermeldungen auch für Screenreader interpretierbar gestaltet:

- [Das W3C demonstriert Fehlermeldungen](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [WebAIM nimmt sich der Formularvalidierung an](https://webaim.org/techniques/formvalidation/)

## Fokuskontrolle {#focus-control}

Stelle sicher dass deine Webanwendung vollständig per Tastatur bedienbar ist: 

- [WebAIM spricht über Barrierefreiheit mit Tastatur](https://webaim.org/techniques/keyboard/)

### Tastatur-Fokus und Fokussierung  {#keyboard-focus-and-focus-outline}

Der Tastatur-Fokus zeigt auf das aktuell ausgewählte DOM-Element welches Eingaben der Tastatur annimmt. Man sieht dies überall anhand der Fokussierung (Außenlinie), genau wie diese im folgenden Bild:

<img src="../images/docs/keyboard-focus.png" alt="Blue keyboard focus outline around a selected link." />

Verwende nur dann CSS zum Entfernen dieser Linie, zum Beispiel indem du `outline: 0` setzt, wenn du sie durch eine andere Implementierung der Fokus-Markierung ersetzt. 

### Mechanismen um direkt zum wichtigsten Inhalt zu springen {#mechanisms-to-skip-to-desired-content}

Stelle einen Mechanismus zur Verfügung welcher die Navigationselemente deiner Webanwendung überspringt. Dies beschleunigt die Navigation mit der Tastatur.

Skiplinks, oder auch Skip-Navigation-Links sind versteckte Navigations-Links die nur dann sichtbar werden wenn Tastaturnutzer mit der Seite interagieren. Diese sind sehr einfach mit internen Seitenankern und etwas Styling umzusetzen:

- [WebAIM - Skip Navigation Links](https://webaim.org/techniques/skipnav/)

Also use landmark elements and roles, such as `<main>` and `<aside>`, to demarcate page regions as assistive technology allow the user to quickly navigate to these sections.
Nutze Außerdem semantische Elemente und Rollen, wie zum Beispiel `<main>`und `<aside>` um verschiedene Bereiche deiner Seite voneinander abzugrenzen, da es entprechende Assitenztechnologien so dem User erlauben sich schnell zwischen diesen Elementen zurecht zu finden.  

Mehr über den Einsatz dieser Elemente zur Verbesserung der Barrierefreiheit erfährst du hier:

- [Accessible Landmarks](https://www.scottohara.me/blog/2018/03/03/landmarks.html)

### Den Fokus programmatisch verwalten {#programmatically-managing-focus}

Unsere React-Anwendungen verändern das HTML-DOM kontinuierlich zur Laufzeit, dies führt dazu, dass der Tastatur-Fokus gelegentlich verloren geht oder auf ein unvorhersehbares Element gesetzt wird.
Um diesem Umstand zuvor zu kommen, müssen wir hier programmatisch nachhelfen. Zum Beispiel indem wir den Tastatur-Fokus wieder auf den Button setzen, welcher ein Modal geöffnet hat, nachdem dieses geschlossen wurde.

MDN Web Docs takes a look at this and describes how we can build [keyboard-navigable JavaScript widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).
Die MDN Web Docs beschreiben wie wir [Tastaturgesteurte JavaScript Widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets) realisieren können.

Um mit React einen Fokus zu setzen, können wir [Refs auf DOM-Elementen](/docs/refs-and-the-dom.html) nutzen.

Hierzu erstellen wir zuerst eine Elementreferenz im JSX einer Component-Klasse:

```javascript{4-5,8-9,13}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Create a ref to store the textInput DOM element
    this.textInput = React.createRef();
  }
  render() {
  // Use the `ref` callback to store a reference to the text input DOM
  // element in an instance field (for example, this.textInput).
    return (
      <input
        type="text"
        ref={this.textInput}
      />
    );
  }
}
```

Danach können wir den Fokus beliebig verändern, falls nötig:

 ```javascript
 focus() {
   // Explicitly focus the text input using the raw DOM API
   // Note: we're accessing "current" to get the DOM node
   this.textInput.current.focus();
 }
 ```

Gelegentlich ist es nötig, dass eine Eltern-Komponente den Fokus auf ein Element einer Kind-Komponente setzen muss. Dies lässt sich mit dem [Bereitstellen von DOM-Referenzen einer Eltern-Komponente](/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) mit einer speziellen Eigenschaft, welche die Referenz der Eltern-Komponente zur Kind-Komponente weitergibt, umsetzen. 

```javascript{4,12,16}
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  render() {
    return (
      <CustomTextInput inputRef={this.inputElement} />
    );
  }
}

// Now you can set focus when required.
this.inputElement.current.focus();
```

Falls du einen Higher-Order-Component nutzt empfiehtl es sich die [Referenz zum umschlossenen Component weiterzugeben](/docs/forwarding-refs.html) indem du die `forwardRef` React-Funktion nutzt.
Sollte ein Third-Party-HOC diese Technik nicht implentiert haben kannst du das oben verwendete Pattern als einen Fallback nutzen.  

Ein gutes Fokus-Beispielt ist das [react-aria-modal](https://github.com/davidtheclark/react-aria-modal). Dies ist ein relativ rares Beispiel eines vollständig barrierefreiem Modal-Fenster. Hier wird der initiale Fokus auf den Abbrechen Button gesetzt (Um den User davon abzuhalten versehentlich die Success-Action zu aktivieren) und der Fokus kann nicht aus dem Modal-Fenster springen. Nachdem das Modal geschlossen wird wird der Fokus wieder zurück auf das Element gesetzt welches das Modal-Fenster getriggered hat. 

>Hinweis:
>
>Es handelt sich hier um ein wichtiges Feature, welches jedoch in einem vernünftigen Rahmen genutzt werden sollte. Nutze dieses Feature, um den Tastatur-Fokus anzupassen, falls der Flow der App gestört sein sollte und versuche nicht, die Tastaturnutzung des Users zu antizipieren.

## Maus- und Pointerevents {#mouse-and-pointer-events}

Stelle sicher, dass alle Funktionalitäten, welche durch die Maus oder den Zeiger hervorgerufen werden, auch via Tastatur gesteuert werden können. Sich komplett von einem Zeigergerät abhängig zu machen, führt dazu, dass deine App für viele Tastaturnutzer unbrauchbar wird.

Um dies zu verdeutlichen, schauen wir uns ein Anwendungsbeispiel an, bei dem die Barrierefreiheit durch Click-Events gestört ist. Hier siehst du das "outside-click"-Pattern, in welchem der User eine geöffnete Popup-Nachricht schließen kann, indem er außerhalb des Elements klickt.

<img src="../images/docs/outerclick-with-mouse.gif" alt="Ein Togglebutton welcher eine Popoverliste öffnet, die zeigt dass diese per Klick außerhalb des Elements zu schließen ist." />

Typischerweise wird Dies durch ein Klick-Event auf dem `window`-Objekt implementiert welches die Popover-Nachricht schließt:

```javascript{12-14,26-30}
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```

Dies würde natürlich mit Zeigergeräten, wie zB. der Maus, super funktionieren, mit der Tastatur alleine führt dies jedoch zu mangelhafter Funktionalität wenn du das nächste Element per Tab erreichst. In diesem Fall das `click`-Event nie auf dem `window`-Objekt aufgerufen. Dies kann zu obskuren Fehlern führen, welche es manchen Usern unmöglich macht deine App zu nutzen.

<img src="../images/docs/outerclick-with-keyboard.gif" alt="Ein Togglebutton welcher eine Popoverliste öffnet, die nur per Click-Event wieder zu schließen ist." />

Die gleiche Funktionalität kann durch geeignete Eventhandler, wie zum Beispiel `onBLur` und `onFocus`, erreicht werden:

```javascript{19-29,31-34,37-38,40-41}
class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // If a child receives focus, do not close the popover.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React assists us by bubbling the blur and
    // focus events to the parent.
    return (
      <div onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```

Der obige Code gewährleistet die Funktionalität sowohl für Zeigergeräte als auch für Tastaturen. Beachte auch die `aria-*` Attribute zur Unterstützung von Screenreadern. Der Einfachheit halber wurden hier keine Pfeiltasten-Events implementiert um mit dem Popover zu interagieren.

<img src="../images/docs/blur-popover-close.gif" alt="Eine Popoverliste, welche sowohl per Maus als auch per Tastatur nutzbar ist." />

Dies hier ist nur ein Beispiel für viele Fälle bei denen die Funktionalität nicht gewährleistet ist wenn du dich nur auf Zeiger-Events verlässt. Ein beständiges Testen mit der Tastutur zeigt dir auch die Schwachstellen, welche mit angemessenen Eventhandlern beseitigt werden können.

## Kompliziertere Widgets {#more-complex-widgets}

Kompliziertere Handlungen sollten nicht mit weniger Barrierefreiheit einhergehen. Während Barrierefreiheit am einfachen damit umgesetzt werden kann sich so gut wie möglich an den HTML-Standard zu halten, können auch die kompliziertesten Widgets barrierefrei implementiert werden. 

Here we require knowledge of [ARIA Roles](https://www.w3.org/TR/wai-aria/#roles) as well as [ARIA States and Properties](https://www.w3.org/TR/wai-aria/#states_and_properties).
Wir setzen hier Grundkentinsse in den [ARIA Rollen](https://www.w3.org/TR/wai-aria/#roles) sowie den [ARIA Zuständen und Eigenschaften](https://www.w3.org/TR/wai-aria/#states_and_properties) hervor. 

Jede Art von Widget hat ein spezielles Designpattern und sollte für User und deren Useragents wie folgt funktionieren:

- [WAI-ARIA Konventionen - Designppatterns und Widgets](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
- [Heydon Pickering - ARIA Beispiele](https://heydonworks.com/practical_aria_examples/)
- [Inclusive Components](https://inclusive-components.design/)

## Andere wichtige Punkte {#other-points-for-consideration}

### Einstellung der Sprache {#setting-the-language}

Gib immer die in den Texten deiner Seite verwendete Sprache an, da Screen-Reader-Software diese Angabe nutzt um die richtigen Spracheinstellungen auszuwählen.

- [WebAIM - Document Language](https://webaim.org/techniques/screenreader/#language)

### Der Titel des Dokuments {#setting-the-document-title}

Verwende einen `<title>` welcher den aktuellen Inhalt der Seite korrekt beschreibt, um sicher zu gehen dass jeder User genau über den Kontext des Dokuments im Klaren ist. 

- [WCAG - Den Bedarf eines Dokumenten-Titels verstehen](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

In React können wir Diesen mit dem [React Document Title Component](https://github.com/gaearon/react-document-title) realisieren.

### Farbkontraste {#color-contrast}

Stelle sicher, dass die Texte deiner Webseite ausreichende Farbkontraste aufweisen, um auch von Nutzern mit Sehschwäche problemlos lesbar zu sein:

- [WCAG - Den Bedarf für Farbkontraste verstehen](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- [Alles über den Farbkontrast und warum man ihn überdenken sollte](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
- [A11yProject - Was sind Farbkontraste](https://a11yproject.com/posts/what-is-color-contrast/)

Es kann sehr anstrengend sein die richtigen Farbkombinationen für alle Anwendungsfälle deiner Website manuell zu erstellen, anstatt dessen kannst du [eine vollständig barrierefreie Farbpalette mit Colorable berechnen](https://jxnblk.com/colorable/).

Sowohl die unten erwähnten aXe als auch die WAVE-Werkzeuge beinhalten Farbkontrast-Tests welche dich über fehlerhafte Kontraste informieren.

Wenn du deine Kontraste noch genauer testen willst kannst du die folgenden Werkzeuge verwenden:

- [WebAIM - Farbkontrast Checker](https://webaim.org/resources/contrastchecker/)
- [Die Paciello Gruppe - Farbkontrast Analyzer](https://www.paciellogroup.com/resources/contrastanalyser/)

## Entwicklungs- und Testingtools {#development-and-testing-tools}

Es gibt eine Reihe von Werkzeugen um dich bei der Erstellung barrierefreier Webapplikationen zu unterstützen. 

### Die Tastatur {#the-keyboard}

Das bei Weitem Einfachste, aber auch eines der wichtigsten Dinge die du prüfen musst ist die Bedienbarkeit deiner vollständigen Website außschließlich via Tastatur. Teste dies wie folgt:

1. Deaktiviere deine Maus.
1. Nutze `Tab` und `Shift+Tab` um zu navigieren.
1. Nutze `Enter` um Elemente zu aktivieren.
1. Falls nötig, nutze die Pfeiltasten zur Interaktion mit manchen Elementen, wie z.B. Menüs und Dropdowns. 

### Hilfsmittel für Entwickler {#development-assistance}

Einige Punkte der Barrierefreiheit können direkt in unserem JSX-Code getestet werden. Oftmals gibt es bereits Intellisense-Tests für ARIA-Roles, States und Properties in JSX-fähigen IDE's. Außerdem steht uns das folgende Werkzeug zur Verfügung:

#### eslint-plugin-jsx-a11y {#eslint-plugin-jsx-a11y}

Das [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) ESLint-Plugin stellt AST-Linting-Feedback bezogen auf Probleme mit der Barrierefreiheit in deinem JSX zur Verfügung. Viele IDE's machen es dir möglich diese Funktionalität direkt in die Code-Analyse oder die Coding-Oberfläche zu integrieren. 

[Create React App](https://github.com/facebookincubator/create-react-app) verfügt über ein Plugin welches einen Teil dieser Regeln aktiviert hat. Solltest du noch mehr Regeln zur Barrierefreiheit nutzen wollen, kannst im Stammverzeichnis deines Projekts eine `.eslintrc`-Datei mit folgendem Inhalt anlegen: 

  ```json
  {
    "extends": ["react-app", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"]
  }
  ```

### Barrierefreiheit im Browser testen {#testing-accessibility-in-the-browser}

Es gibt eine Reihe von Werkzeugen um die Barriefreiheit deiner Webseiten im Browser zu kontrollieren. Bitte nutze Diese nur in Verbindung mit den bereits genannten Werkzeugen, da diese Tests nur die technische Barrierefreiheit in deinem HTML kontrollieren können.

#### aXe, aXe-core und react-axe {#axe-axe-core-and-react-axe}

Deque Systems bietet [aXe-core](https://github.com/dequelabs/axe-core) für automatisierte End-to-End-Tests deiner App an. Dieses Modul enthält auch Einbindungen für Selenium.

[The Accessibility Engine](https://www.deque.com/products/axe/), oder aXe, ist eine auf `aXe-core` basierende Browsererweiterung zur Kontrolle der Barrierefreiheit.

Außerdem kannst du das [react-axe](https://github.com/dylanb/react-axe)-Modul nutzen, um die Ergebnisse dieser Barrierefreiheitskontrollen während der Entwicklung direkt in der Konsole auszugeben.

#### WebAIM WAVE {#webaim-wave}

Das [Web Accessibility Evaluation Tool](https://wave.webaim.org/extension/) ist eine weitere Browsererweiterung.

#### Barrierefreiheitsprüfer und der Barrierefreiheitsbaum {#accessibility-inspectors-and-the-accessibility-tree}

[Der Barrierefreiheitsbaum](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) ist eine Teilmenge des DOM-Baums, welche barrierefreie Objekte für jedes DOM-Element, das für unterstützende Technologie wie z. B. Screen-Readern sichtbar sein sollte, enthält. 

In einigen Browsern ist es einfach möglich die Informationen zur Barrierefreiheit für jedes Element des Barrierefreiheitsbaums zu überprüfen:

- [Den Barrierefreiheitsprüfer in Firefox nutzen](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
- [Den Barrierefreiheitsprüfer in Chrome nutzen](https://developers.google.com/web/tools/chrome-devtools/accessibility/reference#pane)
- [Den Barrierefreiheitsprüfer in OS X Safari nutzen](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

### Screen-Reader {#screen-readers}

Das Testen mit einem Screen-Reader sollte bei deinen Barrierefreiheitstests nicht fehlen.

Beachte dass es auf die Browser / Screen-Reader Kombination ankommt. Es empfiehlt sich dass du deine Applikation in dem Browser testest, welcher am besten zu deinem favorisierten Screen-Reader passt.

### Häufig genutzte Screen-Reader {#commonly-used-screen-readers}

#### NVDA im Firefox {#nvda-in-firefox}

[NonVisual Desktop Access](https://www.nvaccess.org/), auch NVDA, ist ein häufig genutzter Screen-Reader für Windows. 

Nutze die folgenden Hinweise, um zu erfahren wie NVDA am besten zu nutzen ist:

- [WebAIM - NVDA zur Auswertung der Web-Barrierefreiheit](https://webaim.org/articles/nvda/)
- [Deque - NVDA Tastenkombinationen](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

#### VoiceOver im Safari {#voiceover-in-safari}

VoiceOver ist ein in Apple-Geräte integrierter Screen-Reader.

Nutze die folgenden Hinweise, um zu erfahren wie man VoiceOver aktiviert:

- [WebAIM - VoiceOver zur Auswertung der Web-Barrierefreiheit](https://webaim.org/articles/voiceover/)
- [Deque - VoiceOver für OS X Tastenkombinationen](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
- [Deque - VoiceOver für iOS Kombinationen](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)

#### JAWS im Internet Explorer {#jaws-in-internet-explorer}

[Job Access With Speech](https://www.freedomscientific.com/Products/software/JAWS/), auch JAWS, ist ein häufig genutzter Screen-Reader für Windows.

Nutze die folgenden Hinweise, um zu erfahren wie JAWS am besten zu nutzen ist:

- [WebAIM - JAWS zur Auswertung der Web-Barrierefreiheit](https://webaim.org/articles/jaws/)
- [Deque - JAWS Tastenkombinationen](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

### Weitere Screen-Reader {#other-screen-readers}

#### ChromeVox im Google Chrome {#chromevox-in-google-chrome}

[ChromeVox](https://www.chromevox.com/) ist ein in Chromebooks integrierter ScreenReader und ist außerdem [als eine Erweiterung](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=de) für Chrome verfügbar.

Nutze die folgenden Hinweise, um zu erfahren wie ChromeVox am besten zu nutzen ist:

- [Google Chromebook Hilfe - Nutzung des Integrierten Screen-Readers](https://support.google.com/chromebook/answer/7031755?hl=de)
- [ChromeVox Referenz der klassischen Tastenkombinationen](https://www.chromevox.com/keyboard_shortcuts.html)
