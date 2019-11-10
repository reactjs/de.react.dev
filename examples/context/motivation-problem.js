class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // highlight-range{1-4,7}  
  // Diese Toolbar-Komponente muss eine extra "theme" Prop annehmen
  // und an ThemedButton übergeben. Das kann sehr umständlich werden,
  // wenn jeder einzelne Button in der App über das Theme bescheid
  // wissen muss, weil es durch alle Komponenten durchgegeben werden muss.
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
