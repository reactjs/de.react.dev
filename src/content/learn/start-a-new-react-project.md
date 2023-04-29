---
title: Ein neues React Projekt starten
---

<Intro>

Wenn du ine neue Anwendung oder eine neue Webseite vollständig mit React erstellen willst, empfehlen wir eines der auf React aufbauenden Frameworks zu benutzen die in der Community sehr populär sind.  
Frameworks stellen Features bereit die man vermutlich in den meisten Webseiten benötigt, darunter Routing, Data Fetching und HTML rendern  

</Intro>

<Note>

**Um ein Projekt lokal zu entwickeln musst du [Node.js](https://nodejs.org/en/) installieren**. Du kannst dich *optional* auch dazu entscheiden Node.js im Produktivbetrieb zu nutzen, musst aber nicht, denn viele React Frameworks unterstützen den export in statische HTML/CSS/JS Verzeichnisse
( für statische Ihalte benötigt man in der Regel keine NodeJs Umgebung )

</Note>

## Für den produktiven Betrieb geeignete React frameworks {/*production-grade-react-frameworks*/}

### Next.js {/*nextjs*/}

**[Next.js](https://nextjs.org/) ist ein FullStack React Framework.** Next.js ist sehr vielseitig und ermöglicht es React Apps jeder Größe zu erstellen - von einem überwiegend statischen Blog bis zu einer sehr komplexen und dynamischen Anwendung. Um ein neues Next.js Projekt zu starten führe folgenden Code in deinem Terminal aus:

<TerminalBlock>
npx create-next-app
</TerminalBlock>

Falls du Next.js noch nicht kennst sieh dir das [Next.js Tutorial.](https://nextjs.org/learn/foundations/about-nextjs) an

Next.js wird von [Vercel](https://vercel.com/) betrieben. Du kannst deine Next.js Anwendung auf jedem Node.js oder serverless Hosting [veröffentlichen](https://nextjs.org/docs/deployment) oder selbst hosten. [Vollständig statische Next.js Anwendungen](https://nextjs.org/docs/advanced-features/static-html-export) können auf jedem statischen Hosting veröffentlicht werden.

### Remix {/*remix*/}

**[Remix](https://remix.run/) ist ein Fullstack React Framework mit verschachteltem Routing.** Mit Remix lässt sich die Anwendung in verschachtelte Einheiten aufteilen, die Daten parallel laden und aktualisieren können um auf eine Benutzeraktion zu antworten.  
Um ein neues Remix Projekt zu erstellen führe folgenden Befehl im Terminal aus:

<TerminalBlock>
npx create-remix
</TerminalBlock>

Falls du Remix noch nicht kennst, sieh dir das Remix [Blog Tutorial](https://remix.run/docs/en/main/tutorials/blog) (kurz) und das [App Tutorial](https://remix.run/docs/en/main/tutorials/jokes) (lang) an.

Remix wird von [Shopify](https://www.shopify.com/) bereitgestellt. Wenn man ein Remix Projekt erstellt, muss man ein [Ziel für die veröffentlichung auswählen](https://remix.run/docs/en/main/guides/deployment). 
Man kann eine Remix Anwendung auf jedem Node.js oder serverless Hostng veröffentlichen indem man [Adapter](https://remix.run/docs/en/main/other-api/adapter) benutzt oder selbst erstellt.

### Gatsby {/*gatsby*/}

**[Gatsby](https://www.gatsbyjs.com/) ist ein React Framework für schnelle CMS-backed Webseiten.** Sein umfangreiches Plugin Ökosystem und sein GraphQL Datenlayer erleichtern es, Inhalte, API's und Sevices in eine Webseite zu integrieren.  
Um ein neues Gatsby Projekt zu erstellen führe foldenden befehl im Terminal aus:

<TerminalBlock>
npx create-gatsby
</TerminalBlock>

Falls du Gatsby noch nicht kennst, sieh dir das [Gatsby Tutorial.](https://www.gatsbyjs.com/docs/tutorial/) an.

Gatsby wird von [Netlify](https://www.netlify.com/) bereitgestellt. Eine [vollständig statische Gatsby Webseite](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting) kann man auf jedem statischen Hostingdienst veröffentlichen. Wenn du dich dazu entscheidest Funktionen zu verwenden, die nur auf dem Server laufen solltest du sicherstellen, dass diese vom Hosting Provider für Gatsby unterstützt werden

### Expo (for native apps) {/*expo*/}

**[Expo](https://expo.dev/) ist ein React Framework das es ermöglicht universelle Android, iOS, oder Web Apps mit native UIs zu erstellen.** 
Es stellt ein SDK für [React Native](https://reactnative.dev/) bereit das die Nutzung der nativen Bestandteile leicht zu benutzen.  
Um ein neues Expo Projekt zu erstellen führe folgenden Befehl im Terminal aus:

<TerminalBlock>
npx create-expo-app
</TerminalBlock>

Falls du Expo noch nicht kennst, sieh dir das[Expo Tutorial](https://docs.expo.dev/tutorial/introduction/) an.

Expo wird von [Expo (dem Unternehmen)](https://expo.dev/about) bereitgestellt. Das erstellen von Anwendungen mit Expo ist kostenlos und man kann diese ohne Beschränkungen an den Google oder den Apple Store übermitteln. Expo bietet optional einen kostenpflichtigen Clouddienst an

<DeepDive>

#### Can I use React without a framework? {/*can-i-use-react-without-a-framework*/}

You can definitely use React without a framework--that's how you'd [use React for a part of your page.](/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page) **However, if you're building a new app or a site fully with React, we recommend using a framework.**

Here's why.

Even if you don't need routing or data fetching at first, you'll likely want to add some libraries for them. As your JavaScript bundle grows with every new feature, you might have to figure out how to split code for every route individually. As your data fetching needs get more complex, you are likely to encounter server-client network waterfalls that make your app feel very slow. As your audience includes more users with poor network conditions and low-end devices, you might need to generate HTML from your components to display content early--either on the server, or during the build time. Changing your setup to run some of your code on the server or during the build can be very tricky.

**These problems are not React-specific. This is why Svelte has SvelteKit, Vue has Nuxt, and so on.** To solve these problems on your own, you'll need to integrate your bundler with your router and with your data fetching library. It's not hard to get an initial setup working, but there are a lot of subtleties involved in making an app that loads quickly even as it grows over time. You'll want to send down the minimal amount of app code but do so in a single client–server roundtrip, in parallel with any data required for the page. You'll likely want the page to be interactive before your JavaScript code even runs, to support progressive enhancement. You may want to generate a folder of fully static HTML files for your marketing pages that can be hosted anywhere and still work with JavaScript disabled. Building these capabilities yourself takes real work.

**React frameworks on this page solve problems like these by default, with no extra work from your side.** They let you start very lean and then scale your app with your needs. Each React framework has a community, so finding answers to questions and upgrading tooling is easier. Frameworks also give structure to your code, helping you and others retain context and skills between different projects. Conversely, with a custom setup it's easier to get stuck on unsupported dependency versions, and you'll essentially end up creating your own framework—albeit one with no community or upgrade path (and if it's anything like the ones we've made in the past, more haphazardly designed).

If you're still not convinced, or your app has unusual constraints not served well by these frameworks and you'd like to roll your own custom setup, we can't stop you--go for it! Grab `react` and `react-dom` from npm, set up your custom build process with a bundler like [Vite](https://vitejs.dev/) or [Parcel](https://parceljs.org/), and add other tools as you need them for routing, static generation or server-side rendering, and more.
</DeepDive>

## Bleeding-Edge React Frameworks {/*bleeding-edge-react-frameworks*/}

Als wir untersucht haben, wie wir React weiter verbessern können, haben wir erkannt, dass eine engere integration von React mit Frameworks ( insbedondere mit Routing-, Bundling-, und Server-Technologien) unsere größte Chance ist. React-Benutzern dabei zu helfen, bessere Anwendungen zu erstellen. Das Next.js Team hat zugestimmt, mit uns bei der Erfoschrung, Entwicklung, Integration und dem testen von Frameworkunabhängigen, bleeding-edge Features von React wie [React Server Components.](/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
zusammenzuarbeiten.

Diese Features nähern sich täglich um dem Punk, an dem sie für den produktiven Einsatz geeignet sind. Wir haben zudem Gespräche mit anderen Enwicklern von  Bundlern und Frameworks über deren Integration geführt. 
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

#### Which features make up the React team’s full-stack architecture vision? {/*which-features-make-up-the-react-teams-full-stack-architecture-vision*/}

Next.js's App Router bundler fully implements the official [React Server Components specification](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md). This lets you mix build-time, server-only, and interactive components in a single React tree.

For example, you can write a server-only React component as an `async` function that reads from a database or from a file. Then you can pass data down from it to your interactive components:

```js
// This component runs *only* on the server (or during the build).
async function Talks({ confId }) {
  // 1. You're on the server, so you can talk to your data layer. API endpoint not required.
  const talks = await db.Talks.findAll({ confId });

  // 2. Add any amount of rendering logic. It won't make your JavaScript bundle larger.
  const videos = talks.map(talk => talk.video);

  // 3. Pass the data down to the components that will run in the browser.
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
