// highlight-range{1-2}
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// Jetzt zeigt die ref direkt auf den DOM-button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
