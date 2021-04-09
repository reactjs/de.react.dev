class FancyButton extends React.Component {
  focus() {
    // ...
  }

  // ...
}

// Anstatt die FancyButton Komponente zu exportieren, exportieren wir LogProps.
// Es wird trotzdem der FancyButton gerendert.
// highlight-next-line
export default logProps(FancyButton);
