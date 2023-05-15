---
title: Ein neues React Projekt starten
---

<Intro>

Wenn du eine neue Anwendung oder eine neue Webseite vollständig mit React erstellen willst, empfehlen wir eines der auf React aufbauenden Frameworks zu benutzen die in der Community sehr populär sind.  
Frameworks stellen Features bereit, die man vermutlich in den meisten Webanwendungen benötigt, darunter Routing, Data Fetching und HTML rendern  

</Intro>

<Note>

**Um ein Projekt lokal zu entwickeln musst du [Node.js](https://nodejs.org/en/) installieren**. Du kannst dich *optional* auch dazu entscheiden Node.js im Produktivbetrieb zu nutzen, musst aber nicht, denn viele React Frameworks unterstützen den export in statische HTML/CSS/JS Verzeichnisse
( für statische Inhalte benötigt man in der Regel keine NodeJs Umgebung )

</Note>

## Für den produktiven Betrieb geeignete React Frameworks {/*production-grade-react-frameworks*/}

### Next.js {/*nextjs*/}

**[Next.js](https://nextjs.org/) ist ein FullStack React Framework.** Next.js ist sehr vielseitig und ermöglicht es React Apps jeder Größe zu erstellen - von einem überwiegend statischen Blog bis zu einer sehr komplexen und dynamischen Anwendung. Um ein neues Next.js Projekt zu starten führe folgenden Code in deinem Terminal aus:

<TerminalBlock>
npx create-next-app
</TerminalBlock>

Falls du Next.js noch nicht kennst sieh dir das [Next.js Tutorial.](https://nextjs.org/learn/foundations/about-nextjs) an

Next.js wird von [Vercel](https://vercel.com/) bereitgestellt. Du kannst deine Next.js Anwendung auf jedem Node.js oder serverless Hosting [veröffentlichen](https://nextjs.org/docs/deployment) oder selbst hosten. [Vollständig statische Next.js Anwendungen](https://nextjs.org/docs/advanced-features/static-html-export) können auf jedem statischen Hosting veröffentlicht werden.

### Remix {/*remix*/}

**[Remix](https://remix.run/) ist ein Fullstack React Framework mit verschachteltem Routing.** Mit Remix lässt sich die Anwendung in verschachtelte Einheiten aufteilen, die Daten parallel laden und aktualisieren können, um auf eine Benutzeraktion zu antworten.  
Um ein neues Remix Projekt zu erstellen führe folgenden Befehl im Terminal aus:

<TerminalBlock>
npx create-remix
</TerminalBlock>

Falls du Remix noch nicht kennst, sieh dir das Remix-[Blog-Tutorial](https://remix.run/docs/en/main/tutorials/blog) (kurz) und das [App-Tutorial](https://remix.run/docs/en/main/tutorials/jokes) (lang) an.

Remix wird von [Shopify](https://www.shopify.com/) bereitgestellt. Wenn man ein Remix Projekt erstellt, muss man ein [Ziel für die veröffentlichung auswählen](https://remix.run/docs/en/main/guides/deployment). 
Man kann eine Remix Anwendung auf jedem Node.js oder serverless Hostng veröffentlichen indem man [Adapter](https://remix.run/docs/en/main/other-api/adapter) benutzt oder selbst erstellt.

### Gatsby {/*gatsby*/}

**[Gatsby](https://www.gatsbyjs.com/) ist ein React Framework für schnelle CMS-backed Webseiten.** Sein umfangreiches Plugin Ökosystem und sein GraphQL Datenlayer erleichtern es, Inhalte, API's und Sevices in eine Webseite zu integrieren.  
Um ein neues Gatsby Projekt zu erstellen führe foldenden befehl im Terminal aus:

<TerminalBlock>
npx create-gatsby
</TerminalBlock>

Falls du Gatsby noch nicht kennst, sieh dir das [Gatsby-Tutorial.](https://www.gatsbyjs.com/docs/tutorial/) an.

Gatsby wird von [Netlify](https://www.netlify.com/) bereitgestellt. Eine [vollständig statische Gatsby Webseite](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting) kann man auf jedem statischen Hostingdienst veröffentlichen. Wenn du dich dazu entscheidest Funktionen zu verwenden, die nur auf dem Server laufen solltest du sicherstellen, dass diese vom Hosting Provider für Gatsby unterstützt werden

### Expo (für native Anwendungen) {/*expo*/}

**[Expo](https://expo.dev/) ist ein React Framework das es ermöglicht universelle Android, iOS, oder Web Apps mit native UIs zu erstellen.** 
Es stellt ein SDK für [React Native](https://reactnative.dev/) bereit das die Nutzung der nativen Bestandteile leicht zu benutzen.  
Um ein neues Expo Projekt zu erstellen führe folgenden Befehl im Terminal aus:

<TerminalBlock>
npx create-expo-app
</TerminalBlock>

Falls du Expo noch nicht kennst, sieh dir das [Expo-Tutorial](https://docs.expo.dev/tutorial/introduction/) an.

Expo wird von [Expo (dem Unternehmen)](https://expo.dev/about) bereitgestellt. Das erstellen von Anwendungen mit Expo ist kostenlos und man kann diese ohne Beschränkungen an den Google oder den Apple Store übermitteln. Expo bietet optional einen kostenpflichtigen Clouddienst an

<DeepDive>

#### Kann ich React auch ohne Framework verwenden ? {/*can-i-use-react-without-a-framework*/}

Du kannst React natürlich auch ohne ein Framework verwenden - und so gehts [use React for a part of your page.](/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page) 
**Wenn du jedoch eine neue Anwendung oder eine Website vollständig mit React erstellen willst, empfehlen wir die Verwendung eines Frameworks.**

Hier ist der Grund dafür

Selbst wenn du anfangs vielleicht kein Routing oder Datenfetching benötigst, wirst du wahrscheinlich einige Bibliotheken dafür hinzufügen wollen. Mit jedem neuen Feature, das du in dein React-Projekt einbaust, wächst aber dein JavaScript-Bundle und du könntest dich damit konfrontiert sehen, den Code für jede Route einzeln aufzuteilen.
Wenn deine Anforderungen an das Datafetchging komplexer werden, könntest du auf Netzwerk-Wasserfälle zwischen Server und Client stoßen, die deine Anwendung sehr langsam wirken lassen. Wenn in deiner Zielgruppe viele Nutzer mit schlechten Netzwerkbedingungen und schwach ausgestatteten Geräten sind, könntest du gezwungen sein, HTML aus deinen React-Komponenten zu generieren, um Inhalte frühzeitig darzustellen - entweder auf dem Server oder während der Build-Zeit. Es kann sehr knifflig sein, deine Konfiguration so anzupassen, dass ein Teil deines Codes auf dem Server oder während des Build-Prozesses ausgeführt wird.

**Dieses Problem ist nicht spezifisch für React. Deshalb gibt es SvelteKit für Svelte, Nuxt für Vue uns so weiter.**
Um diese Probleme selbst zu lösen, musst du deinen Bundler mit deinem Router und deiner Datenfetching-Bibliothek integrieren. Es ist zwar nicht schwer, eine erste Konfiguration zum Laufen zu bringen, aber es gibt viele Feinheiten, die man beachten mus, damit die Anwendung auch schnell bleibt wenn sie mit der Zeit größer wird.
Du wirst den minimalen Umfang an Anwendungs-Code senden wollen, aber das in einem einzigen Client-Server-Roundtrip und s parallel zu jeglichen anderen Daten die für die Seite benötigt werden. Du möchtest wahrscheinlich, dass deine Seite bereits interaktiv ist bevor dein JavaScript Code überhaupt ausgeführt wird, um stufenweise Verbesserung zu unterstützen. Du möchtest vielleicht einen Ordner mit vollständig statischen HTML-Dateien für deine Marketingseiten generieren, die überall gehostet werden können und auch bei deaktiviertem JavaScript noch funktionieren. All diese Funktionalitäten selbst zu erstellen bedeutet echte Arbeit.

**Die auf dieser Seite erwähnten React Frameworks lösen solche Probleme standardmäßig, ohne das man selbst noch etwas tun muss.** Sie ermöglichen es, sehr einfach anzufangen und anschliessend die Anwendung gemäß den Anforderungen zu skalieren. Jedes der Frameworks hat eine Community, dadurch ist es einfach, Antworten auf Fragen zu finden und Tools zu aktualisieren.
Frameworks geben dem Code ausseredem eine Struktur, die dir und anderen helfen den Kontext und die Fähigkeiten zwischen verschiedneen Projekten zu behalten. Im Gegensatz dazu kann man mit einer benutzerdefinierten Einrichtung leicht bei nicht unterstützten Abhängigkeitsversionen hängen bleiben, und man endet im Grunde damit, sein eigenes Framework zu erstellen - allerdings eines ohne Community oder Upgrade-Pfad (und wenn es so ist wie die, die wir in der Vergangenheit erstellt haben, eher planlos gestaltet)

Wenn du immer noch nicht überzeugt bist oder deine App ungewöhnliche Einschränkungen aufweist, die von diesen Frameworks nicht gut abgedeckt werden, und du dein eigenes benutzerdefiniertes Setup implementieren möchtest, können wir dich nicht davon abhalten – leg los! Hol dir `react` und `react-dom` von npm, setze deinen eigenen individuellen Build-Prozess mit einem Bundler wie [Vite](https://vitejs.dev/) oder [Parcel](https://parceljs.org/) auf, und füge nach Bedarf weitere Tools für Routing, statische Generierung oder serverseitiges Rendering und mehr hinzu.

</DeepDive>

## Bleeding-Edge React Frameworks {/*bleeding-edge-react-frameworks*/}

Als wir untersucht haben, wie wir React weiter verbessern können, haben wir erkannt, dass eine engere integration von React mit Frameworks ( insbedondere mit Routing-, Bundling-, und Server-Technologien) unsere größte Chance ist. React-Benutzern dabei zu helfen, bessere Anwendungen zu erstellen. Das Next.js Team hat zugestimmt, mit uns bei der Erfoschrung, Entwicklung, Integration und dem testen von Frameworkunabhängigen, bleeding-edge Features von React wie [React Server Components.](/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
zusammenzuarbeiten.

Diese Features nähern sich täglich dem Punkt, an dem sie für den produktiven Einsatz geeignet sind. Wir haben zudem Gespräche mit anderen Enwicklern von  Bundlern und Frameworks über deren Integration geführt. 
Wir hoffen, dass in ein bis zwei Jahren alle auf dieser Seite aufgeführten Frameworks vollständige Unterstützung für diese Funktionen beiten werden

(Wenn du ein Framework-Autor bist und Intersse an einer Kooperation mit uns hast, um diese Funktionen auszuprobieren, melde dich bei uns!)

### Next.js (App Router) {/*nextjs-app-router*/}

**[Next.js's App Router](https://beta.nextjs.org/docs/getting-started) ist ein redesign der Next.js APIs und hat das Ziel die Vision einer Fullstack Architektur des React Team’s zu erfüllen.** Es ermöglicht das fetchen von Daten in asynchronen Komponenten, die auf dem Server laufen oder sogar bereits während des Build Vorgangs.

Next.js wird von [Vercel](https://vercel.com/) betrieben. Du kannst deine Next.js Anwendung auf jedem Node.js oder serverless Hosting [veröffentlichen](https://nextjs.org/docs/deployment) oder selbst hosten. [Vollständig statische Next.js Anwendungen](https://nextjs.org/docs/advanced-features/static-html-export) können auf jedem statischen Hosting veröffentlicht werden, da sie keinen Server benötigen.

<Pitfall>

Next.js's App Router ist **derzeit in Beta und wird noch nicht für den produktiven Betrieb empfohlen** (Stand März 2023). 
Um damit in einem bestehenden Next.js Projekt zu experimentieren [folge dieser schrittweisen Migrationsanleitung](https://beta.nextjs.org/docs/upgrade-guide#migrating-from-pages-to-app).

</Pitfall>

<DeepDive>

#### Welche Funktionen machen die Full-Stack-Architekturvision des React-Teams aus? {/*which-features-make-up-the-react-teams-full-stack-architecture-vision*/}

Next.js's App Router Bundler implementiert vollständig die offizielle [React Server Komponenten Spezifikation](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md). Auf diese Weise kannst du Build-Time-, Server-Only- und interaktive Komponenten in einem einzigen React-Baum kombinieren.

Beispielsweise kannst du eine reine Server-Komponente als `async` Funktion schreiben, die aus einer Datenbank oder einer Datei liest und die Daten anschliessend an eine interaktive Komponente weitergeben

```js
// Diese Komponente wird *nur* auf dem Server ausgeführt (oder während der Build-Zeit)
async function Talks({ confId }) {
  // 1. Du bist auf dem Server, dadurch kannst du mit der Datenebene kommunizieren. Ein API Endpunkt ist nicht erforderlich
  const talks = await db.Talks.findAll({ confId });

  // 2. Füge eine beliebige Menge von rendering Logik hinzu. Dadurch wird dein JavaScipt bundle nicht größer
  const videos = talks.map(talk => talk.video);

  // 3. Reiche die Daten an die Komponente weiter die im Browser ausgeführt wird
  return <SearchableVideoList videos={videos} />;
}
```

Next.js's App Router also integrates [data fetching with Suspense](/blog/2022/03/29/react-v18#suspense-in-data-frameworks). This lets you specify a loading state (like a skeleton placeholder) for different parts of your user interface directly in your React tree:

```js
<Suspense fallback={<TalksLoading />}>
  <Talks confId={conf.id} />
</Suspense>
```

Server Components and Suspense are React features rather than Next.js features. However, adopting them at the framework level requires buy-in and non-trivial implementation work. At the moment, the Next.js App Router is the most complete implementation. The React team is working with bundler developers to make these features easier to implement in the next generation of frameworks.

</DeepDive>
