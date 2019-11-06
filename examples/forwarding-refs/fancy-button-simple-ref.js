// highlight-range{1-2}
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// Du kannst jetzt ein Ref direkt zum DOM button bekommen:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
