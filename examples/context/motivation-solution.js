// highlight-range{1-4}
// Context lasst uns einen Wert tief durch den Komponenten-Baum
// übergeben ohne ihn explizit durch jede Komponente durchzureichen.
// Erstelle einen Context für das aktuelle Theme (mit "light" als Standardwert).
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // highlight-range{1-3,5}
    // Verwende einen Provider um das aktuelle Theme durch den Baum zu leiten.
    // Jede Komponente kann es lesen, ganz egal wie tief sie liegt.
    // In diesem Beispiel, übergeben wir "dark" als den aktuellen Wert.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// highlight-range{1,2}
<<<<<<< HEAD
// Eine Komponente in der Mitte braucht jetzt nicht
// mehr explizit das Theme weitergeben.
function Toolbar(props) {
=======
// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar() {
>>>>>>> 9e5a358cb24a665fc48615ae224f26a4f2191b32
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // highlight-range{1-3,6}
  // Weise einen contextType zu, um den aktuellen Theme Context zu lesen.
  // React wird den nahestehensten Theme Provider darüber finden und dessen Wert lesen.
  // In diesem Beispiel ist das aktuelle Theme "dark".
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
