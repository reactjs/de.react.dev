function UserGreeting(props) {
  return <h1>Willkommen zurück!</h1>;
}

function GuestGreeting(props) {
  return <h1>Bitte melde dich an.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Probiere mal isLoggedIn={true} aus:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
