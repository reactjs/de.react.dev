import FancyButton from './FancyButton';

// highlight-next-line
const ref = React.createRef();

// Die FancyButton Komponente die wir importieren ist die LogProps HOK.
// Auch wenn die gerenderte Ausgabe gleich bleibt,
// wird unsere Ref auf `LogProps` statt auf die innere FancyButton Komponente verweisen!
// Dies bedeutet, dass wir z.B. kein ref.current.focus() aufrufen können.
// highlight-range{4}
<FancyButton
  label="Click Me"
  handleClick={handleClick}
  ref={ref}
/>;
