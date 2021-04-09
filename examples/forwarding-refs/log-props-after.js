function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      // highlight-next-line
      const {forwardedRef, ...rest} = this.props;

      // Weise die benutzerdefinierte Eigenschaft "forwardRef" als Ref zu
      // highlight-next-line
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // Beachte das zweite Attribut "ref", welches von React.forwardRef bereitgestellt wird.
  // Wir können es an LogProps wie eine reguläre Eigenschaft weiterleiten, z.B. "forwardRef"
  // Und es kann einer Komponente zugewiesen werden.
  // highlight-range{1-3}
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
