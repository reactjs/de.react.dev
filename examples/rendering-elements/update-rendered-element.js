function tick() {
  const element = (
    <div>
      <h1>Hallo, Welt!</h1>
      <h2>Es ist {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  // highlight-next-line
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
