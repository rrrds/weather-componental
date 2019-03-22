// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"S//1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDomElement = createDomElement;
exports.updateClassList = updateClassList;
exports.attachEvents = attachEvents;
exports.attachAttributes = attachAttributes;
exports.removeAttributes = removeAttributes;
exports.TYPE_FRAGMENT_NODE = exports.TYPE_TEXT_NODE = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var TYPE_TEXT_NODE = 'TEXT_NODE';
exports.TYPE_TEXT_NODE = TYPE_TEXT_NODE;
var TYPE_FRAGMENT_NODE = 'TYPE_FRAGMENT_NODE';
exports.TYPE_FRAGMENT_NODE = TYPE_FRAGMENT_NODE;

function removeClass(dom) {
  dom.classList.remove('div--new');
}

function blinkHtmlElemen(dom) {
  dom.classList.add('div--new');
  setTimeout(function () {
    return removeClass(dom);
  }, 1000);
}

function createDomElement() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TYPE_TEXT_NODE;

  if (type === TYPE_TEXT_NODE) {
    return document.createTextNode('');
  }

  if (type === TYPE_FRAGMENT_NODE) {
    return document.createDocumentFragment();
  }

  if (typeof type === 'string') {
    return document.createElement(type);
  }

  return document.createElement('div');
}

function updateClassList(dom) {
  var classList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (dom.classList) {
    blinkHtmlElemen(dom);

    if (Array.isArray(classList)) {
      var _dom$classList;

      (_dom$classList = dom.classList).add.apply(_dom$classList, _toConsumableArray(classList));
    } else {
      dom.className = classList;
    }
  }
}

function attachEvents(dom) {
  var eventsList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  eventsList.forEach(function (evnt) {
    dom.addEventListener(evnt.eventType, evnt.handler);
  });
}

function attachAttributes(dom) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Object.keys(attrs).forEach(function (attrKey) {
    dom.setAttribute(attrKey, attrs[attrKey]);
  });
}

function removeAttributes(dom) {
  var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (attr) {
    dom.removeAttribute(attr);
  }
}
},{}],"Oi66":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElement = createElement;
exports.createVDom = createVDom;

function createElement(type, attr) {
  var _ref;

  var props = Object.assign({}, attr);

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var children = (_ref = []).concat.apply(_ref, args);

  var classList = props['class'] || [];
  var events = Object.keys(props).filter(function (key) {
    return key.startsWith('on');
  }).map(function (key) {
    var event = {
      eventType: key.substr(2).toLowerCase(),
      handler: props[key]
    };
    delete props[key];
    return event;
  });
  var element = {
    tag: type,
    props: props,
    classList: classList,
    children: children,
    events: events
  };
  return element;
}

function createVDom() {
  var component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var element = arguments.length > 1 ? arguments[1] : undefined;
  var dom = arguments.length > 2 ? arguments[2] : undefined;
  var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var vDom = {
    component: component,
    element: element,
    dom: dom,
    children: children
  };

  if (component) {
    component._vDom = vDom;
  }

  return vDom;
}
},{}],"Omvm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Dom = require("./Dom");

var _jsx = require("./jsx");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// createElement -> element{tag, props, classList, children, events} -> vDom{component, element, dom, children}
var Component =
/*#__PURE__*/
function () {
  function Component(host) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Component);

    this.host = host;
    this.props = props;
    this.state = {};
    this._vDom = null;
    this._rendered = false;
  }

  _createClass(Component, [{
    key: "setState",
    value: function setState(changes) {
      this.state = Object.assign({}, this.state, changes);
      this.forceRender();
    }
  }, {
    key: "run",
    value: function run() {
      this.beforeRender(); // this.host.innerHTML = '';

      var content = this.render();

      if (!Array.isArray(content)) {
        content = [content];
      }

      if (!this._vDom) {
        (0, _jsx.createVDom)(this, {}, this.host); // console.log('create empty vDom');
      }

      if (!this._rendered) {
        this.renderChildren(content, this.host, this._vDom);
        this._rendered = true;
      } else {
        // console.log(`update Component: ${this.constructor.name}`);
        this.diffChildren(content, this._vDom.children);
      }

      this.afterRender();
    }
  }, {
    key: "renderChildren",
    value: function renderChildren(components, parentDom, parentVDom) {
      var _this = this;

      components.filter(function (item) {
        return item !== null && typeof item !== 'boolean';
      }).map(function (item) {
        return _this.renderVdomElement(item);
      }).forEach(function (vDom) {
        parentVDom.children.push(vDom);
        parentDom.append(vDom.dom);
      });
    }
  }, {
    key: "diff",
    value: function diff(newElement, vDom) {
      var element = vDom.element;
      var propsKeys = [].concat(_toConsumableArray(Object.keys(newElement.props || {})), _toConsumableArray(Object.keys(element.props || {})));
      propsKeys.forEach(function (key) {
        if (newElement.props.hasOwnProperty(key) && !element.props.hasOwnProperty(key)) {
          // console.log('Add prop: ' + key, newElement.props[key]);
          element.props[key] = newElement.props[key];
        }

        if (!newElement.props.hasOwnProperty(key) && element.props.hasOwnProperty(key)) {
          // console.log('Delete prop: ' + key);
          delete element.props[key];
        }

        if (newElement.props.hasOwnProperty(key) && element.props.hasOwnProperty(key) && typeof newElement.props[key] !== 'function' && newElement.props[key] !== element.props[key]) {
          // console.log(
          //   'Update prop: ' + key,
          //   element.props[key],
          //   newElement.props[key]
          // );
          element.props[key] = newElement.props[key];
        }
      });
      vDom.component.run();
    }
  }, {
    key: "diffChildren",
    value: function diffChildren(newElements, vDom) {
      var _this2 = this;

      if (newElements.length !== vDom.length) {
        this.cleanDom();
        this.run();
      } else {
        vDom.forEach(function (childVDom, index) {
          var newElement = newElements[index];
          var oldElement = childVDom.element;

          if (newElement === null) {
            childVDom.dom.remove();
            vDom.splice(index, 1);
            return;
          }

          if (typeof newElement === 'string') {
            // console.log('Diff text node');
            if (newElement !== oldElement) {
              childVDom.dom.nodeValue = childVDom.element = newElement;
            }

            return;
          }

          if (typeof newElement.tag === 'function') {
            // console.log('diff component');
            _this2.diff(newElement, childVDom);
          } else {
            // console.log('diff html', newElement.tag);
            if (newElement.tag !== oldElement.tag) {// console.log('recreate html');
              // TODO: recreate html
            }

            var propsKeys = [].concat(_toConsumableArray(Object.keys(newElement.props || {})), _toConsumableArray(Object.keys(oldElement.props || {})));
            propsKeys.forEach(function (key) {
              if (newElement.props.hasOwnProperty(key) && !oldElement.props.hasOwnProperty(key)) {
                // console.log('Add prop: ' + key);
                (0, _Dom.attachAttributes)(childVDom.dom, _defineProperty({}, key, newElement.props[key]));
              } else if (!newElement.props.hasOwnProperty(key) && oldElement.props.hasOwnProperty(key)) {
                // console.log('Delete prop: ' + key);
                (0, _Dom.removeAttributes)(childVDom.dom, key);
              } else if (newElement.props.hasOwnProperty(key) && oldElement.props.hasOwnProperty(key) && typeof newElement.props[key] !== 'function' && newElement.props[key] !== oldElement.props[key]) {
                // console.log('Update prop: ' + key, newElement.props[key]);
                oldElement.props[key] = newElement.props[key];

                if (newElement.tag === 'input' && key === 'value') {
                  childVDom.dom.value = newElement.props[key];
                } else {
                  (0, _Dom.attachAttributes)(childVDom.dom, _defineProperty({}, key, newElement.props[key]));
                }
              }
            });

            _this2.diffChildren(newElement.children, childVDom.children);
          }
        });
      }
    }
  }, {
    key: "cleanDom",
    value: function cleanDom() {
      this.host.innerHTML = '';
      this._vDom.children = [];
      this._rendered = false;
    }
  }, {
    key: "renderVdomElement",
    value: function renderVdomElement(element) {
      if (element instanceof HTMLElement) {
        return (0, _jsx.createVDom)(null, element, element);
      }

      if (typeof element === 'string') {
        var dom = (0, _Dom.createDomElement)(_Dom.TYPE_TEXT_NODE);
        dom.nodeValue = element;
        return (0, _jsx.createVDom)(null, element, dom);
      }

      var htmlElement = (0, _Dom.createDomElement)(element.tag);
      (0, _Dom.updateClassList)(htmlElement, element.classList);
      (0, _Dom.attachEvents)(htmlElement, element.events);

      if (typeof element.tag === 'function') {
        var component = new element.tag(htmlElement, element.props);

        var _vDom = (0, _jsx.createVDom)(component, element, htmlElement);

        component.run();
        return _vDom;
      }

      (0, _Dom.attachAttributes)(htmlElement, element.props);
      var vDom = (0, _jsx.createVDom)(null, element, htmlElement);

      if (Array.isArray(element.children)) {
        this.renderChildren(element.children, htmlElement, vDom);
      }

      return vDom;
    }
  }, {
    key: "forceRender",
    value: function forceRender() {
      this.run();
    }
  }, {
    key: "beforeRender",
    value: function beforeRender() {}
  }, {
    key: "afterRender",
    value: function afterRender() {}
  }, {
    key: "render",
    value: function render() {
      return '';
    }
  }]);

  return Component;
}();

exports.default = Component;
},{"./Dom":"S//1","./jsx":"Oi66"}],"7okc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var ComponentFactory = {
  mappings: {},
  register: function register(componentClass) {
    ComponentFactory.mappings[componentClass.name] = componentClass;
  },
  get: function get(componentClassName) {
    return ComponentFactory.mappings[componentClassName];
  }
};
var _default = ComponentFactory;
exports.default = _default;
},{}],"BD41":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.stringify = stringify;
exports.parseTpl = parseTpl;
exports.parseJSX = parseJSX;

var _ComponentFactory = _interopRequireDefault(require("./ComponentFactory"));

var _jsx = require("./jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function parse(tpl) {
  // node = {tag, child, props }
  var re = new RegExp('<[^>]+>', 'g');
  var matches = null;
  var lifo = [];
  var all = [];
  var parent;

  while ((matches = re.exec(tpl)) !== null) {
    var element = {
      tag: '',
      selfClosed: false,
      customComponent: false,
      children: []
    };
    var tag = matches[0];
    element.selfClosed = tag.charAt(tag.length - 2) === '/';
    var endTag = tag.charAt(1) === '/';

    if (!endTag) {
      element.tag = tag.match(/<(\w+)/)[1];
      element.customComponent = /^[A-Z]/.test(element.tag);
    }

    if (element.selfClosed) {
      if (!parent) {
        all.push(element);
      } else {
        parent.children.push(element);
      }
    } else if (!endTag) {
      if (!parent) {
        all.push(element);
        parent = element;
      } else {
        parent.children.push(element);
        parent = element;
      }

      lifo.push(element);
    } else {
      lifo.pop(element);
      parent = lifo[lifo.length - 1] || null;
    }

    element.props = findProps(tag); // Find any textnodes

    var tagEndIndex = matches.index + tag.length;
    var startNextTagIndex = tpl.indexOf('<', tagEndIndex);

    if (startNextTagIndex > 0) {
      var text = tpl.substring(tagEndIndex, startNextTagIndex).trim();

      if (text) {
        parent.children.push({
          textNode: true,
          content: text
        });
      }
    }
  }

  return all;
}

function findProps(tpl) {
  var props = {};
  var prop = tpl.match(/((\w+)=\{([^{]+)\})/);

  while (prop) {
    props[prop[2]] = prop[3];
    tpl = tpl.substring(prop.index + prop[1].length);
    prop = tpl.match(/((\w+)=\{(.+)\})/);
  }

  return props;
}

function stringify(ast) {
  var fnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'createElement';
  var res = ast.map(function (element) {
    if (element.textNode) {
      return "'".concat(element.content, "'");
    }

    var parts = [];
    parts.push("".concat(fnName, "("));
    parts.push(element.customComponent ? element.tag : "'".concat(element.tag, "'"));
    parts.push(", {");
    var props = Object.keys(element.props).map(function (propKey) {
      return "".concat(propKey, ": ").concat(element.props[propKey]);
    });
    parts.push(props.join(', '));
    parts.push('}');

    if (element.children.length > 0) {
      parts.push(', ');
      parts.push(stringify(element.children, fnName));
    }

    parts.push(')');
    return parts.join('');
  });
  return res.join(', ');
}

function findPropsTpl(tpl, values, placeholder) {
  var props = {};
  var prop = tpl.match(/(([\w-]+)=\{([^{]+)\})/);

  while (prop) {
    props[prop[2]] = prop[3] === placeholder ? values.shift() : prop[3];
    tpl = tpl.substring(prop.index + prop[1].length);
    prop = tpl.match(/(([\w-]+)=\{(.+)\})/);
  }

  return props;
}

function parseTpl(tpl, values, placeholder) {
  var re = new RegExp('<[^>]+>', 'g');
  var matches = null;
  var lifo = [];
  var all = [];
  var parent;

  while ((matches = re.exec(tpl)) !== null) {
    var element = {
      tag: '',
      selfClosed: false,
      customComponent: false,
      children: []
    };
    var tag = matches[0];
    element.selfClosed = tag.charAt(tag.length - 2) === '/';
    var endTag = tag.charAt(1) === '/';

    if (!endTag) {
      element.tag = tag.match(/<(\w+)/)[1];

      var customComponent = _ComponentFactory.default.get(element.tag);

      if (customComponent) {
        element.customComponent = true;
        element.tag = customComponent;
      }
    }

    if (element.selfClosed) {
      if (!parent) {
        all.push(element);
      } else {
        parent.children.push(element);
      }
    } else if (!endTag) {
      if (!parent) {
        all.push(element);
        parent = element;
      } else {
        parent.children.push(element);
        parent = element;
      }

      lifo.push(element);
    } else {
      lifo.pop(element);
      parent = lifo[lifo.length - 1] || null;
    }

    element.props = findPropsTpl(tag, values, placeholder); // Find any textnodes

    var tagEndIndex = matches.index + tag.length;
    var startNextTagIndex = tpl.indexOf('<', tagEndIndex);

    if (startNextTagIndex > 0) {
      var text = tpl.substring(tagEndIndex, startNextTagIndex).trim();

      if (text) {
        parent.children.push({
          textNode: true,
          content: text === placeholder ? values.shift() : text
        });
      }
    }
  }

  return all;
}

function buildComponents(ast) {
  return ast.map(function (element) {
    if (element.textNode) {
      return element.content;
    }

    return _jsx.createElement.apply(void 0, [element.tag, element.props].concat(_toConsumableArray(buildComponents(element.children))));
  });
}

function parseJSX(strings) {
  var placeholder = '__tplValue__';
  var fullstr = strings.join(placeholder);

  for (var _len = arguments.length, vars = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    vars[_key - 1] = arguments[_key];
  }

  var ast = parseTpl(fullstr, vars, placeholder);
  return buildComponents(ast);
}
},{"./ComponentFactory":"7okc","./jsx":"Oi66"}],"8Y+z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../../Framework/Component"));

var _jsx = require("../../Framework/jsx");

var _ComponentFactory = _interopRequireDefault(require("../../Framework/ComponentFactory"));

var _Template = require("../../Framework/Template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <form \n        class={search-form}\n        onSubmit={", "}>\n        <input \n          class={search__input} \n          name={searchField} \n          value={", "} />\n        <button class={button button--search}>Search</button>\n      </form>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SearchBar =
/*#__PURE__*/
function (_Component) {
  _inherits(SearchBar, _Component);

  function SearchBar() {
    _classCallCheck(this, SearchBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(SearchBar).apply(this, arguments));
  }

  _createClass(SearchBar, [{
    key: "handleSearchSubmit",
    value: function handleSearchSubmit(e) {
      e.preventDefault();
      var data = new FormData(e.target);
      this.props.handleSearch(data.get('searchField'));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return (0, _Template.parseJSX)(_templateObject(), function (e) {
        return _this.handleSearchSubmit(e);
      }, this.props.cityName || '');
    }
  }]);

  return SearchBar;
}(_Component2.default);

exports.default = SearchBar;

_ComponentFactory.default.register(SearchBar);
},{"../../Framework/Component":"Omvm","../../Framework/jsx":"Oi66","../../Framework/ComponentFactory":"7okc","../../Framework/Template":"BD41"}],"CCta":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SearchBar", {
  enumerable: true,
  get: function () {
    return _SearchBar.default;
  }
});

var _SearchBar = _interopRequireDefault(require("./SearchBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./SearchBar":"8Y+z"}],"LOE/":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.favoriteService = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var storageKey = 'kw-favorites';

var FavoriteService =
/*#__PURE__*/
function () {
  function FavoriteService() {
    _classCallCheck(this, FavoriteService);

    this.data = JSON.parse(localStorage.getItem(storageKey)) || [];
  }

  _createClass(FavoriteService, [{
    key: "removeCity",
    value: function removeCity(cityName) {
      this.data = this.data.filter(function (val) {
        return val !== cityName;
      });
      this.save();
    }
  }, {
    key: "addCity",
    value: function addCity(cityName) {
      this.data.push(cityName);
      this.save();
    }
  }, {
    key: "toggleCity",
    value: function toggleCity(cityName) {
      if (this.data.includes(cityName)) {
        this.removeCity(cityName);
      } else {
        this.addCity(cityName);
      }
    }
  }, {
    key: "isFavorite",
    value: function isFavorite(cityName) {
      return this.data.includes(cityName);
    }
  }, {
    key: "save",
    value: function save() {
      localStorage.setItem(storageKey, JSON.stringify(this.data));

      if (this.cb) {
        this.cb(this.getData());
      }
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.data;
    }
  }, {
    key: "subscribeForUpdate",
    value: function subscribeForUpdate(cb) {
      this.cb = cb;
    }
  }]);

  return FavoriteService;
}();

var favoriteService = new FavoriteService();
exports.favoriteService = favoriteService;
},{}],"/qle":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FavoriteService", {
  enumerable: true,
  get: function () {
    return _FavoriteService.favoriteService;
  }
});

var _FavoriteService = require("./FavoriteService");
},{"./FavoriteService":"LOE/"}],"SVCN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../../Framework/Component"));

var _FavoriteService = require("../../Services/FavoriteService");

var _ComponentFactory = _interopRequireDefault(require("../../Framework/ComponentFactory"));

var _Template = require("../../Framework/Template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      <div onClick={", "}>\n        ", "\n      </div>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        <button data-city={", "} class={button button--fav} type={button}>\n          ", "\n        </button>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FavouriteLocations =
/*#__PURE__*/
function (_Component) {
  _inherits(FavouriteLocations, _Component);

  function FavouriteLocations(host, props) {
    var _this;

    _classCallCheck(this, FavouriteLocations);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FavouriteLocations).call(this, host, props));
    _this.state = {
      favorites: _FavoriteService.FavoriteService.getData()
    };
    _this.onFavoritesUpdate = _this.onFavoritesUpdate.bind(_assertThisInitialized(_this));

    _FavoriteService.FavoriteService.subscribeForUpdate(_this.onFavoritesUpdate);

    return _this;
  }

  _createClass(FavouriteLocations, [{
    key: "onFavoritesUpdate",
    value: function onFavoritesUpdate(data) {
      this.setState({
        favorites: data
      });
    }
  }, {
    key: "handleFavClick",
    value: function handleFavClick(e) {
      if (e.target.localName === 'button') {
        var button = e.target;
        this.props.handleSearch(button.dataset.city);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.favorites.lenght === 0) {
        return false;
      }

      var buttons = this.state.favorites.map(function (city) {
        return (0, _Template.parseJSX)(_templateObject(), city, city)[0]; // parseJSX returns array of items
      });
      return (0, _Template.parseJSX)(_templateObject2(), function (e) {
        return _this2.handleFavClick(e);
      }, buttons);
    }
  }]);

  return FavouriteLocations;
}(_Component2.default);

exports.default = FavouriteLocations;

_ComponentFactory.default.register(FavouriteLocations);
},{"../../Framework/Component":"Omvm","../../Services/FavoriteService":"/qle","../../Framework/ComponentFactory":"7okc","../../Framework/Template":"BD41"}],"E8Wh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FavouriteLocations", {
  enumerable: true,
  get: function () {
    return _FavouriteLocations.default;
  }
});

var _FavouriteLocations = _interopRequireDefault(require("./FavouriteLocations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./FavouriteLocations":"SVCN"}],"PvAZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IWeatherDataService =
/*#__PURE__*/
function () {
  function IWeatherDataService() {
    _classCallCheck(this, IWeatherDataService);
  }

  _createClass(IWeatherDataService, [{
    key: "getCurrentWeather",
    value: function getCurrentWeather() {
      return [];
    }
  }, {
    key: "getWeatherForecast",
    value: function getWeatherForecast() {
      return [];
    }
  }, {
    key: "subscribeForCurrentWeather",
    value: function subscribeForCurrentWeather(cb) {}
  }, {
    key: "subscribeForForecastWeather",
    value: function subscribeForForecastWeather(cb) {}
  }]);

  return IWeatherDataService;
}();

var _default = IWeatherDataService;
exports.default = _default;
},{}],"+cZF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = fetchData;
exports.fetchCurrentData = fetchCurrentData;
exports.fetchForecastData = fetchForecastData;
var API_KEY = 'fe82917089f7afb293cb0e0619603570';
var API_UNITS = 'metric';
var API_URL = '//api.openweathermap.org/data/2.5/';
var API_CURRENT = "".concat(API_URL, "weather?APPID=").concat(API_KEY);
var API_FORECAST = "".concat(API_URL, "forecast?APPID=").concat(API_KEY);

function fetchData(apiUrl) {
  return fetch(apiUrl).then(function (response) {
    if (!response.ok) return {};
    return response.json();
  }).catch(function () {});
}

function fetchCurrentData(cityName, units) {
  return fetchData("".concat(API_CURRENT, "&units=").concat(units, "&q=").concat(cityName));
}

function fetchForecastData(cityName, units) {
  return fetchData("".concat(API_FORECAST, "&units=").concat(units, "&q=").concat(cityName));
}
},{}],"xE/A":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weatherDataService = void 0;

var _IWeatherDataService2 = _interopRequireDefault(require("./IWeatherDataService"));

var _api = require("../../api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var API_UNITS_METRIC = 'metric';
var API_UNITS_IMPERIAL = 'imperial';

var WeatherDataService =
/*#__PURE__*/
function (_IWeatherDataService) {
  _inherits(WeatherDataService, _IWeatherDataService);

  function WeatherDataService() {
    var _this;

    _classCallCheck(this, WeatherDataService);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WeatherDataService).call(this));
    _this.dataCurrent = null;
    _this.dataForecast = null;
    _this.selectedUnit = API_UNITS_METRIC;
    _this.lastSearch = null;
    return _this;
  }

  _createClass(WeatherDataService, [{
    key: "load",
    value: function load() {
      var _this2 = this;

      var cityName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (cityName) {
        Promise.all([(0, _api.fetchCurrentData)(cityName, this.selectedUnit), (0, _api.fetchForecastData)(cityName, this.selectedUnit)]).then(function (data) {
          if (data && data[0].cod == 200) {
            var _data = _slicedToArray(data, 2);

            _this2.dataCurrent = _data[0];
            _this2.dataForecast = _data[1];
            _this2.lastSearch = cityName;
          } else {
            var _ref = [null, null];
            _this2.dataCurrent = _ref[0];
            _this2.dataForecast = _ref[1];
          }

          _this2.dataLoaded();
        });
      }
    }
  }, {
    key: "dataLoaded",
    value: function dataLoaded() {
      if (this.cbCurrent) {
        this.cbCurrent(this.getCurrentWeather());
      }

      if (this.cbForecast) {
        this.cbForecast(this.getWeatherForecast());
      }
    }
  }, {
    key: "getCurrentWeather",
    value: function getCurrentWeather() {
      return this.dataCurrent;
    }
  }, {
    key: "getWeatherForecast",
    value: function getWeatherForecast() {
      return this.dataForecast;
    }
  }, {
    key: "subscribeForCurrentWeather",
    value: function subscribeForCurrentWeather(cb) {
      this.cbCurrent = cb;
    }
  }, {
    key: "subscribeForForecastWeather",
    value: function subscribeForForecastWeather(cb) {
      this.cbForecast = cb;
    }
  }, {
    key: "toggleUnit",
    value: function toggleUnit() {
      this.selectedUnit = this.selectedUnit === API_UNITS_METRIC ? API_UNITS_IMPERIAL : API_UNITS_METRIC;

      if (this.cbUnitChange) {
        this.cbUnitChange(this.getCurrentUnit());
      }

      this.load(this.getLastSearch());
    }
  }, {
    key: "getCurrentUnit",
    value: function getCurrentUnit() {
      return this.selectedUnit;
    }
  }, {
    key: "getLastSearch",
    value: function getLastSearch() {
      return this.lastSearch || '';
    }
  }]);

  return WeatherDataService;
}(_IWeatherDataService2.default);

var weatherDataService = new WeatherDataService();
exports.weatherDataService = weatherDataService;
},{"./IWeatherDataService":"PvAZ","../../api":"+cZF"}],"/F0e":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "WeatherDataService", {
  enumerable: true,
  get: function () {
    return _WeatherDataService.weatherDataService;
  }
});

var _WeatherDataService = require("./WeatherDataService");
},{"./WeatherDataService":"xE/A"}],"wCJZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../../Framework/Component"));

var _jsx = require("../../Framework/jsx");

var _ComponentFactory = _interopRequireDefault(require("../../Framework/ComponentFactory"));

var _Template = require("../../Framework/Template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <label class={button-unit}>\n        <div class={", "}>C</div>\n        <div class={", "}>F</div>\n        <input\n          class={visualy-hidden}\n          type={checkbox}\n          name={units}\n          value={}\n          onChange={", "}\n          title={} />"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var UnitsButton =
/*#__PURE__*/
function (_Component) {
  _inherits(UnitsButton, _Component);

  function UnitsButton() {
    _classCallCheck(this, UnitsButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(UnitsButton).apply(this, arguments));
  }

  _createClass(UnitsButton, [{
    key: "render",
    value: function render() {
      return (0, _Template.parseJSX)(_templateObject(), this.props.unit === 'metric' ? 'button-unit__type button-unit__type--current' : 'button-unit__type', this.props.unit === 'imperial' ? 'button-unit__type button-unit__type--current' : 'button-unit__type', this.props.handleUnitsChange);
    }
  }]);

  return UnitsButton;
}(_Component2.default);

exports.default = UnitsButton;

_ComponentFactory.default.register(UnitsButton);
},{"../../Framework/Component":"Omvm","../../Framework/jsx":"Oi66","../../Framework/ComponentFactory":"7okc","../../Framework/Template":"BD41"}],"4lDg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "UnitsButton", {
  enumerable: true,
  get: function () {
    return _UnitsButton.default;
  }
});

var _UnitsButton = _interopRequireDefault(require("./UnitsButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./UnitsButton":"wCJZ"}],"hrjF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../../Framework/Component"));

var _SearchBar = require("../SearchBar");

var _FavouriteLocations = require("../FavouriteLocations");

var _WeatherDataService = require("../../Services/WeatherDataService");

var _UnitsButton = require("../UnitsButton");

var _ComponentFactory = _interopRequireDefault(require("../../Framework/ComponentFactory"));

var _Template = require("../../Framework/Template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <h1>Weather App</h1>\n      <SearchBar \n        class={search} \n        handleSearch={", "}\n        cityName={", "} />\n      <FavouriteLocations \n        class={fav} \n        handleSearch={", "} />\n      <UnitsButton \n        unit={", "} \n        handleUnitsChange={", "} />"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Header =
/*#__PURE__*/
function (_Component) {
  _inherits(Header, _Component);

  function Header(host) {
    var _this;

    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Header);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Header).call(this, host, props));
    _this.state = {
      cityName: props.cityName || '',
      units: _WeatherDataService.WeatherDataService.getCurrentUnit()
    };
    return _this;
  }

  _createClass(Header, [{
    key: "handleSearch",
    value: function handleSearch(cityName) {
      if (cityName) {
        _WeatherDataService.WeatherDataService.load(cityName);

        this.setState({
          cityName: cityName
        });
      }
    }
  }, {
    key: "handleUnitsChange",
    value: function handleUnitsChange() {
      _WeatherDataService.WeatherDataService.toggleUnit();

      this.setState({
        units: _WeatherDataService.WeatherDataService.getCurrentUnit()
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return (0, _Template.parseJSX)(_templateObject(), function (e) {
        return _this2.handleSearch(e);
      }, this.state.cityName, function (e) {
        return _this2.handleSearch(e);
      }, this.state.units, function (e) {
        return _this2.handleUnitsChange(e);
      });
    }
  }]);

  return Header;
}(_Component2.default);

exports.default = Header;

_ComponentFactory.default.register(Header);
},{"../../Framework/Component":"Omvm","../SearchBar":"CCta","../FavouriteLocations":"E8Wh","../../Services/WeatherDataService":"/F0e","../UnitsButton":"4lDg","../../Framework/ComponentFactory":"7okc","../../Framework/Template":"BD41"}],"93b5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Header", {
  enumerable: true,
  get: function () {
    return _Header.default;
  }
});

var _Header = _interopRequireDefault(require("./Header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Header":"hrjF"}],"cxDV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTemperature = formatTemperature;
exports.formatHumidity = formatHumidity;
exports.formatPressure = formatPressure;
exports.formatWind = formatWind;

function formatTemperature(value) {
  return "".concat(Math.round(value), "\xB0");
}

function formatHumidity(value) {
  return "".concat(value, "%");
}

function formatPressure(value) {
  return "".concat(value, "hPa");
}

function formatWind(value) {
  return "".concat(value, "mps");
}
},{}],"4Js3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../../Framework/Component"));

var _FavoriteService = require("../../Services/FavoriteService");

var _FavoriteService2 = require("../../Services/FavoriteService/FavoriteService");

var _ComponentFactory = _interopRequireDefault(require("../../Framework/ComponentFactory"));

var _Template = require("../../Framework/Template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <button\n        class={", "}\n        title={", "}\n        onClick={", "}\n        type={button}\n      ></button>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FavoriteButton =
/*#__PURE__*/
function (_Component) {
  _inherits(FavoriteButton, _Component);

  function FavoriteButton() {
    _classCallCheck(this, FavoriteButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(FavoriteButton).apply(this, arguments));
  }

  _createClass(FavoriteButton, [{
    key: "handleClick",
    value: function handleClick() {
      _FavoriteService2.favoriteService.toggleCity(this.props.name);

      this.run();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var styleClass = 'button-fav far fa-star';
      var title = 'Add favorite';

      if (_FavoriteService2.favoriteService.isFavorite(this.props.name)) {
        styleClass = 'button-fav fas fa-star';
        title = 'Remove favorite';
      }

      return (0, _Template.parseJSX)(_templateObject(), styleClass, title, function () {
        return _this.handleClick();
      });
    }
  }]);

  return FavoriteButton;
}(_Component2.default);

exports.default = FavoriteButton;

_ComponentFactory.default.register(FavoriteButton);
},{"../../Framework/Component":"Omvm","../../Services/FavoriteService":"/qle","../../Services/FavoriteService/FavoriteService":"LOE/","../../Framework/ComponentFactory":"7okc","../../Framework/Template":"BD41"}],"wYeB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FavoriteButton", {
  enumerable: true,
  get: function () {
    return _FavoriteButton.default;
  }
});

var _FavoriteButton = _interopRequireDefault(require("./FavoriteButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./FavoriteButton":"4Js3"}],"f+F9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../../Framework/Component"));

var _WeatherDataService = require("../../Services/WeatherDataService");

var _formatters = require("../../formatters");

var _FavoriteButton = require("../FavoriteButton");

var _ComponentFactory = _interopRequireDefault(require("../../Framework/ComponentFactory"));

var _Template = require("../../Framework/Template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        <div class={main weather-details}>\n          <div class={weather-icon}>\n            <FavoriteButton name={", "} />\n            <h2>", "</h2>\n            <i \n              class={", "}\n              title={", "}></i>\n          </div>\n          <div>\n            <div class={row data-details}>\n              <div class={aux-temperature}>\n                <i class={fas fa-arrow-circle-down}></i>", "\n              </div>\n              <div class={main-temperature}>\n                ", "\n              </div>\n              <div class={aux-temperature}>\n                <i class={fas fa-arrow-circle-up}></i>\n                ", "\n              </div>\n            </div>\n          </div>\n          <ul class={row data-details data-details--sub}>\n            <li title={Wind}>\n              <i class={fas fa-wind}></i>\n              ", "\n            </li>\n            <li title={Humidity}>\n              <i class={fas fa-tint}></i>\n              ", "\n            </li>\n            <li title={Pressure}>\n              <i class={fas fa-weight-hanging}></i>\n              ", "\n            </li>\n          </ul>\n        </div>\n      </div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CurrentWeather =
/*#__PURE__*/
function (_Component) {
  _inherits(CurrentWeather, _Component);

  function CurrentWeather(host, props) {
    var _this;

    _classCallCheck(this, CurrentWeather);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CurrentWeather).call(this, host, props));
    _this.state = {
      data: null
    };
    _this.onServerResponse = _this.onServerResponse.bind(_assertThisInitialized(_this));

    _WeatherDataService.WeatherDataService.subscribeForCurrentWeather(_this.onServerResponse);

    return _this;
  }

  _createClass(CurrentWeather, [{
    key: "onServerResponse",
    value: function onServerResponse(weatherData) {
      this.setState({
        data: weatherData
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.data) {
        return false;
      }

      var iconClass = "owf owf-".concat(this.state.data.weather[0].id, " current-weather-icon");
      var fullName = "".concat(this.state.data.name, ",").concat(this.state.data.sys.country);
      return (0, _Template.parseJSX)(_templateObject(), fullName, this.state.data.name, iconClass, this.state.data.weather[0].description, (0, _formatters.formatTemperature)(this.state.data.main.temp_min), (0, _formatters.formatTemperature)(this.state.data.main.temp), (0, _formatters.formatTemperature)(this.state.data.main.temp_max), (0, _formatters.formatWind)(this.state.data.wind.speed), (0, _formatters.formatHumidity)(this.state.data.main.humidity), (0, _formatters.formatPressure)(this.state.data.main.pressure));
    }
  }]);

  return CurrentWeather;
}(_Component2.default);

exports.default = CurrentWeather;

_ComponentFactory.default.register(CurrentWeather);
},{"../../Framework/Component":"Omvm","../../Services/WeatherDataService":"/F0e","../../formatters":"cxDV","../FavoriteButton":"wYeB","../../Framework/ComponentFactory":"7okc","../../Framework/Template":"BD41"}],"576G":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CurrentWeather", {
  enumerable: true,
  get: function () {
    return _CurrentWeather.default;
  }
});

var _CurrentWeather = _interopRequireDefault(require("./CurrentWeather"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./CurrentWeather":"f+F9"}],"CRg0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../../Framework/Component"));

var _jsx = require("../../Framework/jsx");

var _ComponentFactory = _interopRequireDefault(require("../../Framework/ComponentFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var WeatherForecastItem =
/*#__PURE__*/
function (_Component) {
  _inherits(WeatherForecastItem, _Component);

  function WeatherForecastItem() {
    _classCallCheck(this, WeatherForecastItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(WeatherForecastItem).apply(this, arguments));
  }

  _createClass(WeatherForecastItem, [{
    key: "render",
    value: function render() {
      var mainData = this.props.data.main;
      var details = Object.keys(mainData).map(function (key) {
        return (0, _jsx.createElement)('li', {}, "".concat(key, ": ").concat(mainData[key]));
      });
      return (0, _jsx.createElement)('div', {}, this.props.data.dt_txt, (0, _jsx.createElement)('ul', {}, details));
    }
  }]);

  return WeatherForecastItem;
}(_Component2.default);

exports.default = WeatherForecastItem;

_ComponentFactory.default.register(WeatherForecastItem);
},{"../../Framework/Component":"Omvm","../../Framework/jsx":"Oi66","../../Framework/ComponentFactory":"7okc"}],"Afhc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "WeatherForecastItem", {
  enumerable: true,
  get: function () {
    return _WeatherForecastItem.default;
  }
});

var _WeatherForecastItem = _interopRequireDefault(require("./WeatherForecastItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./WeatherForecastItem":"CRg0"}],"35tP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../../Framework/Component"));

var _formatters = require("../../formatters");

var _ComponentFactory = _interopRequireDefault(require("../../Framework/ComponentFactory"));

var _Template = require("../../Framework/Template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <div\n        class={forecast__column}\n        data-temp={", "}\n        data-height={", "}\n        style={", "}\n        title={", "}\n      ></div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ForecastItem =
/*#__PURE__*/
function (_Component) {
  _inherits(ForecastItem, _Component);

  function ForecastItem() {
    _classCallCheck(this, ForecastItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(ForecastItem).apply(this, arguments));
  }

  _createClass(ForecastItem, [{
    key: "render",
    value: function render() {
      var customCssVar = "--height:".concat(this.props.height, "%");
      return (0, _Template.parseJSX)(_templateObject(), this.props.temp, this.props.height, customCssVar, (0, _formatters.formatTemperature)(this.props.temp));
    }
  }]);

  return ForecastItem;
}(_Component2.default);

exports.default = ForecastItem;

_ComponentFactory.default.register(ForecastItem);
},{"../../Framework/Component":"Omvm","../../formatters":"cxDV","../../Framework/ComponentFactory":"7okc","../../Framework/Template":"BD41"}],"p8FW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ForecastItem", {
  enumerable: true,
  get: function () {
    return _ForecastItem.default;
  }
});

var _ForecastItem = _interopRequireDefault(require("./ForecastItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./ForecastItem":"35tP"}],"e2OI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../../Framework/Component"));

var _jsx = require("../../Framework/jsx");

var _WeatherDataService = require("../../Services/WeatherDataService");

var _WeatherForecastItem = require("../WeatherForecastItem");

var _ForecastItem = require("../ForecastItem");

var _ComponentFactory = _interopRequireDefault(require("../../Framework/ComponentFactory"));

var _Template = require("../../Framework/Template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<div class={forecast-grid}>", "</div>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        <ForecastItem temp={", "} height={", "} />"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var WeatherForecast =
/*#__PURE__*/
function (_Component) {
  _inherits(WeatherForecast, _Component);

  function WeatherForecast(host, props) {
    var _this;

    _classCallCheck(this, WeatherForecast);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WeatherForecast).call(this, host, props));
    _this.state = {};
    _this.onServerResponse = _this.onServerResponse.bind(_assertThisInitialized(_this));

    _WeatherDataService.WeatherDataService.subscribeForForecastWeather(_this.onServerResponse);

    return _this;
  }

  _createClass(WeatherForecast, [{
    key: "onServerResponse",
    value: function onServerResponse(weatherData) {
      this.setState({
        data: weatherData
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.data) return null;
      var minMaxTemp = this.state.data.list.reduce(function (acc, item) {
        return {
          min: Math.min(item.main.temp_min, acc.min),
          max: Math.max(item.main.temp_max, acc.max)
        };
      }, {
        min: Infinity,
        max: -Infinity
      });
      minMaxTemp.min -= 1;
      minMaxTemp.max += 1;
      var step = (minMaxTemp.max - minMaxTemp.min) / 100;
      var items = this.state.data.list.map(function (item) {
        var height = (item.main.temp - minMaxTemp.min) / step;
        return (0, _Template.parseJSX)(_templateObject(), item.main.temp, height)[0]; // TODO: fix
      });
      return (0, _Template.parseJSX)(_templateObject2(), items);
    }
  }]);

  return WeatherForecast;
}(_Component2.default);

exports.default = WeatherForecast;

_ComponentFactory.default.register(WeatherForecast);
},{"../../Framework/Component":"Omvm","../../Framework/jsx":"Oi66","../../Services/WeatherDataService":"/F0e","../WeatherForecastItem":"Afhc","../ForecastItem":"p8FW","../../Framework/ComponentFactory":"7okc","../../Framework/Template":"BD41"}],"Q97q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "WeatherForecast", {
  enumerable: true,
  get: function () {
    return _WeatherForecast.default;
  }
});

var _WeatherForecast = _interopRequireDefault(require("./WeatherForecast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./WeatherForecast":"e2OI"}],"VRHU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../../Framework/Component"));

var _Header = require("../Header");

var _CurrentWeather = require("../CurrentWeather");

var _WeatherForecast = require("../WeatherForecast");

var _ComponentFactory = _interopRequireDefault(require("../../Framework/ComponentFactory"));

var _Template = require("../../Framework/Template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <div class={app}>\n        <Header class={header} />\n        <CurrentWeather />\n        <WeatherForecast class={forecast} />\n      </div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var cmps = [_Header.Header, _CurrentWeather.CurrentWeather, _WeatherForecast.WeatherForecast];
      return (0, _Template.parseJSX)(_templateObject());
    }
  }]);

  return App;
}(_Component2.default);

exports.default = App;

_ComponentFactory.default.register(App);
},{"../../Framework/Component":"Omvm","../Header":"93b5","../CurrentWeather":"576G","../WeatherForecast":"Q97q","../../Framework/ComponentFactory":"7okc","../../Framework/Template":"BD41"}],"CZdB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "App", {
  enumerable: true,
  get: function () {
    return _App.default;
  }
});

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./App":"VRHU"}],"QP75":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showChanges = showChanges;
var boxShadow = '0 0 5px 2px red';

function showChanges(root) {
  var targetNode = root;
  var config = {
    characterData: true,
    attributes: true,
    childList: false,
    subtree: true,
    attributeFilter: ['class', 'value', 'data-height', 'data-temp', 'title']
  };

  function callback(mutationsList) {
    blinkAll(mutationsList);
  }

  function toggleAll(mutationList) {
    mutationList.forEach(function (mutation) {
      var dom = mutation.type === 'characterData' ? mutation.target.parentElement : mutation.target;
      dom.style.boxShadow = boxShadow;
    });
  }

  function removeAll(mutationList) {
    mutationList.forEach(function (mutation) {
      var dom = mutation.type === 'characterData' ? mutation.target.parentElement : mutation.target;
      dom.style.boxShadow = '';
    });
  }

  function blinkAll(domList) {
    toggleAll(domList);
    setTimeout(function () {
      removeAll(domList);
    }, 500);
  }

  var observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}
},{}],"QvaY":[function(require,module,exports) {
"use strict";

var _App = require("./Components/App");

var _devHelpers = require("./devHelpers");

var app = new _App.App(document.getElementById('app'));
app.run();
(0, _devHelpers.showChanges)(document.getElementById('app'));
},{"./Components/App":"CZdB","./devHelpers":"QP75"}]},{},["QvaY"], null)
//# sourceMappingURL=js.d72db887.map