import {
  TYPE_TEXT_NODE,
  createDomElement,
  updateClassList,
  attachEvents,
  attachAttributes
} from './Dom';

export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this.state = {};
  }

  setState(changes) {
    Object.assign(this.state, changes);

    this.forceRender();
  }

  run() {
    this.beforeRender();

    this.host.innerHTML = '';
    let content = this.render();

    if (typeof content === 'string') {
      content = [content];
    }

    this.renderChildren(content, this.host);

    this.afterRender();
  }

  renderChildren(content, parentDom) {
    const components = [].concat(content);

    components
      .map(item => this.renderVdomElement(item))
      .forEach(element => {
        parentDom.append(element);
      });
  }

  renderVdomElement(vdom) {
    if (vdom instanceof HTMLElement) {
      return vdom;
    }

    if (typeof vdom === 'string') {
      return (createDomElement(TYPE_TEXT_NODE).nodeValue = vdom);
    }

    const htmlElement = createDomElement(vdom.tag);
    updateClassList(htmlElement, vdom.classList);
    attachEvents(htmlElement, vdom.events);

    if (typeof vdom.tag === 'function') {
      const component = new vdom.tag(htmlElement, vdom.props);
      component.run();
      htmlElement.__kottans_component = component;
      if (process.env.NODE_ENV === 'development') {
        htmlElement.classList.add('kottans-component');
        htmlElement.dataset.component = vdom.tag.name;
      }
    } else {
      attachAttributes(htmlElement, vdom.props);
      if (Array.isArray(vdom.children)) {
        this.renderChildren(vdom.children, htmlElement);
      }
    }

    return htmlElement;
  }

  forceRender() {
    this.run();
  }

  beforeRender() {}

  afterRender() {}

  render() {
    return '';
  }
}
