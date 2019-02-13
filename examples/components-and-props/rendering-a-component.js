function Willkommen(props) {
  return <h1>Hallo {props.name}</h1>;
}

const element = <Willkommen name="Sara" />;
ReactDOM.render(element, document.getElementById('root'));
