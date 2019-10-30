// Stelle sicher, dass die Form des Default-Wertes, welcher an createContext
// überreicht wird mit der Form die der Konsument erwartet, übereinstimmt!
// highlight-range{2-3}
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
