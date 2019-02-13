function Willkommen(props) {
  return <h1>Hallo {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Willkommen name="Sara" />
      <Willkommen name="Cahal" />
      <Willkommen name="Edite" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
