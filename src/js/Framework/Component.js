import {
  TYPE_TEXT_NODE,
  createDomElement,
  updateClassList,
  attachEvents,
  attachAttributes,
  removeAttributes
} from './Dom';
import { createVDom } from './jsx';

// createElement -> element{tag, props, classList, children, events} -> vDom{component, element, dom, children}

export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this.state = {};

    this._vDom = null;
    this._rendered = false;
  }

  setState(changes) {
    this.state = Object.assign({}, this.state, changes);
    this.forceRender();
  }

  run() {
    this.beforeRender();

    // this.host.innerHTML = '';
    let content = this.render();

    if (!Array.isArray(content)) {
      content = [content];
    }

    if (!this._vDom) {
      createVDom(this, {}, this.host);
      console.log('create empty vDom');
    }

    if (!this._rendered) {
      this.renderChildren(content, this.host, this._vDom);
      this._rendered = true;
    } else {
      console.log(`update Component: ${this.constructor.name}`);
      this.diffChildren(content, this._vDom.children);
    }

    this.afterRender();
  }

  renderChildren(components, parentDom, parentVDom) {
    components
      .map(item => this.renderVdomElement(item))
      .forEach(vDom => {
        parentVDom.children.push(vDom);
        parentDom.append(vDom.dom);
      });
  }

  diff(newElement, vDom) {
    const { element } = vDom;

    const propsKeys = [
      ...Object.keys(newElement.props || {}),
      ...Object.keys(element.props || {})
    ];

    propsKeys.forEach(key => {
      if (
        newElement.props.hasOwnProperty(key) &&
        !element.props.hasOwnProperty(key)
      ) {
        console.log('Add prop: ' + key, newElement.props[key]);
      }

      if (
        !newElement.props.hasOwnProperty(key) &&
        element.props.hasOwnProperty(key)
      ) {
        console.log('Delete prop: ' + key);
      }

      if (
        newElement.props.hasOwnProperty(key) &&
        element.props.hasOwnProperty(key) &&
        typeof newElement.props[key] !== 'function' &&
        newElement.props[key] !== element.props[key]
      ) {
        console.log(
          'Update prop: ' + key,
          element.props[key],
          newElement.props[key]
        );
        element.props[key] = newElement.props[key];
      }
    });

    vDom.component.run();
  }

  diffChildren(newElements, vDom) {
    vDom.forEach((childVDom, index) => {
      const newElement = newElements[index];
      const oldElement = childVDom.element;

      if (typeof newElement === 'string') {
        console.log('Diff text node');
        if (newElement !== oldElement) {
          childVDom.dom.nodeValue = childVDom.element = newElement;
        }

        return;
      }

      if (typeof newElement.tag === 'function') {
        console.log('diff component');
        console.log(newElement, childVDom);
        this.diff(newElement, childVDom);
      } else {
        console.log('diff html', newElement.tag);
        if (newElement.tag !== oldElement.tag) {
          console.log('recreate html');
        }

        const propsKeys = [
          ...Object.keys(newElement.props || {}),
          ...Object.keys(oldElement.props || {})
        ];

        propsKeys.forEach(key => {
          if (
            newElement.props.hasOwnProperty(key) &&
            !oldElement.props.hasOwnProperty(key)
          ) {
            console.log('Add prop: ' + key);
            attachAttributes(childVDom.dom, { [key]: newElement.props[key] });
          }

          if (
            !newElement.props.hasOwnProperty(key) &&
            oldElement.props.hasOwnProperty(key)
          ) {
            console.log('Delete prop: ' + key);
            removeAttributes(childVDom.dom, key);
          }

          if (
            newElement.props.hasOwnProperty(key) &&
            oldElement.props.hasOwnProperty(key) &&
            typeof newElement.props[key] !== 'function' &&
            newElement.props[key] !== oldElement.props[key]
          ) {
            console.log('Update prop: ' + key);
            oldElement.props[key] = newElement.props[key];

            attachAttributes(childVDom.dom, { [key]: newElement.props[key] });
          }
        });

        this.diffChildren(newElement.children, childVDom.children);
      }
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
    this.run();
  }

  beforeRender() {}

  afterRender() {}

  render() {
    return '';
  }
}
