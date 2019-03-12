import {
  TYPE_TEXT_NODE,
  createDomElement,
  updateClassList,
  attachEvents,
  attachAttributes
} from './Dom';
import { createVDom } from './jsx';

// createElement -> element{tag, props, classList, children, events} -> vDom{component, element, dom, children}

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

  run(vDom = null) {
    this.beforeRender();

    this.host.innerHTML = '';
    let content = this.render();

    if (!Array.isArray(content)) {
      content = [content];
    }

    if (!vDom) {
      vDom = createVDom(this, {}, this.host);
      // console.log('New vDom');
    } else {
      // console.log('Diff prev & new vDom');
    }

    this.renderChildren(content, this.host, vDom);

    this.afterRender();

    return vDom;
  }

  renderChildren(components, parentDom, parentVDom) {
    components
      .map(item => this.renderVdomElement(item))
      .forEach(vDom => {
        parentVDom.children.push(vDom);
        parentDom.append(vDom.dom);
      });
  }

  renderVdomElement(element) {
    if (element instanceof HTMLElement) {
      return createVDom(null, element, element);
    }

    if (typeof element === 'string') {
      const dom = createDomElement(TYPE_TEXT_NODE);
      dom.nodeValue = element;
      return createVDom(null, element, dom);
    }

    const htmlElement = createDomElement(element.tag);
    updateClassList(htmlElement, element.classList);
    attachEvents(htmlElement, element.events);

    if (typeof element.tag === 'function') {
      const component = new element.tag(htmlElement, element.props);
      const vDom = createVDom(component, element, htmlElement);
      component.run();

      return vDom;
    }

    attachAttributes(htmlElement, element.props);
    const vDom = createVDom(null, element, htmlElement);
    if (Array.isArray(element.children)) {
      this.renderChildren(element.children, htmlElement, vDom);
    }

    return vDom;
  }

  forceRender() {
    this.run(this._vDom);
  }

  beforeRender() {}

  afterRender() {}

  render() {
    return '';
  }
}
