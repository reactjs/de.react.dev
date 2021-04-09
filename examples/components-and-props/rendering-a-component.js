function Welcome(props) {
  return <h1>Hallo {props.name}</h1>;
}

const element = <Welcome name="Sarah" />;
ReactDOM.render(element, document.getElementById('root'));
