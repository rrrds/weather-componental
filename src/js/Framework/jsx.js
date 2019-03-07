export function createElement(type, attr, ...args) {
  const props = Object.assign({}, attr);

  const children = [].concat(...args);
  const classList = props['class'] || [];

  const events = Object.keys(props)
    .filter(key => key.startsWith('on'))
    .map(key => {
      return {
        eventType: key.substr(2).toLowerCase(),
        handler: props[key]
      };
    });

  const element = {
    tag: type,
    props,
    classList,
    children,
    events
  };

  //   console.log(element);

  return element;
}
