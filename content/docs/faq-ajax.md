---
id: faq-ajax
title: AJAX und APIs
permalink: docs/faq-ajax.html
layout: docs
category: FAQ
---

### Wie kann ich einen AJAX-Aufruf machen? {#how-can-i-make-an-ajax-call}

Du kannst jede AJAX-Bibliothek mit React verwenden. Beliebte Bibliotheken sind [Axios](https://github.com/axios/axios), [jQuery AJAX](https://api.jquery.com/jQuery.ajax/) und das im Browser integrierte [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

### Wann im Komponenten-Lifecycle sollte ich einen AJAX-Aufruf machen? {#where-in-the-component-lifecycle-should-i-make-an-ajax-call}

Du solltest Daten mit AJAX-Aufrufen in der [`componentDidMount`](/docs/react-component.html#mounting) Lifecycle-Methode laden. So kannst Du `setState` verwenden, um deine Komponente zu aktualisieren, sobald Daten geladen wurden.

### Beispiel: AJAX-Ergebnisse verwenden, um lokalen State zu setzen {#example-using-ajax-results-to-set-local-state}

Die folgende Komponente demonstriert, wie man einen AJAX-Aufruf in `componentDidMount` macht, um den lokalen Komponenten-State zu setzen.

Die Beispiel-API gibt ein JSON-Objekt wie das Folgende zurück:

```
{
  "items": [
    { "id": 1, "name": "Apples",  "price": "$2" },
    { "id": 2, "name": "Peaches", "price": "$5" }
  ] 
}
```

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Hinweis: Es ist wichtig, Fehler hier zu behandeln
        // anstatt im einem catch()-Block, damit wir Exceptions von
        // echten Bugs in der Komponente unterscheiden können.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
```

Here is the equivalent with [Hooks](https://reactjs.org/docs/hooks-intro.html): 

```js
function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    );
  }
}
```
