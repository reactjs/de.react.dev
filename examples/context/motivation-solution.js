// highlight-range{1-4}
// Kontext lasst uns einen Wert tief durch den Komponenten-Baum
// übergeben ohne ihn explizit durch jede Komponente durchzureichen.
// Erstelle einen Kontext für das aktuelle Theme (mit "light" als den Default).
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // highlight-range{1-3,5}
    // Verwende einen Provider um das aktuelle Theme durch den Baum weitergeben.
    // Jede Komponente kann es lesen, ganz egal wie tief sie sind.
    // In diesem Beispiel, übergeben wir "dark" als den aktuellen Wert.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// highlight-range{1,2}
// Eine Komponente in der Mitte braucht jetzt nicht
// mehr explizit das Theme weitergeben.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // highlight-range{1-3,6}
  // Weise einen contextType zu, um den aktuellen Theme Kontext zu lesen.
  // React wird den nahestehensten Theme Provider darüber finden und dessen Wert lesen.
  // In diesem Beispiel ist das aktuelle Theme "dark".
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
