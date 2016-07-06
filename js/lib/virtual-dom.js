/*
  Basic Virtual Dom lib written by Miklos Megyes (https://github.com/CAPSLOCKUSER)
  Licence is WTFPL (http://www.wtfpl.net/)
*/

define(['lib/utils'], ({ objectWithoutUndefined }) => {
  function vDom(type, props, ...children) {
    const isChildrenInArray = children.length === 1 && Array.isArray(children[0]);

    return {
      type,
      props: props || {},
      children: isChildrenInArray ? children[0] : children,
    };
  }

  function getVNodeType(vNode) {
    const type = typeof vNode;
    switch (type) {
      case 'boolean':
      case 'string':
      case 'number':
      case 'undefined':
        return type;
      case 'object':
        if (vNode === null) {
          return 'null';
        }
        if (typeof vNode.type === 'function') {
          return 'component';
        }
        return 'element';
      default:
        return 'unsupported';
    }
  }

  const booleanProps = ['selected', 'disabled', 'checked'];

  function manifestElement(vNode) {
    const { type, props, children } = vNode;
    const $el = document.createElement(type);

    Object.keys(props).forEach(attr => {
      if (booleanProps.includes(attr)) {
        if (props[attr]) {
          $el.setAttribute(attr, attr);
        }
        return;
      }
      $el.setAttribute(attr, props[attr]);
    });

    children.forEach(vNodeChild => {
      const $new = vCreate(vNodeChild);
      $el.appendChild($new)
    });

    return $el;
  }

  function manifestComponent(vNode) {
    const { props, componentInstance } = vNode;
    if (componentInstance.isMounted) {
      componentInstance.update(props);
    } else {
      componentInstance.mount();
    }
    return componentInstance.$dom;
  }

  function vCreate(vNode) {
    switch (getVNodeType(vNode)) {
      case 'boolean':
        return document.createTextNode(vNode ? 'true' : 'false');
      case 'string':
      case 'number':
        return document.createTextNode(vNode);
      case 'null':
        return document.createTextNode('');
      case 'undefined':
        console.error('this should not happen');
        return document.createTextNode('');
      case 'component':
        return manifestComponent(vNode);
      case 'element':
        return manifestElement(vNode);
      default:
        console.error(vNode);
        throw new Error('Unsupported vNode type');
    }
  }

  function isVNodeComponent(vNode) {
    return getVNodeType(vNode) === 'component';
  }

  function isVNodeElement(vNode) {
    return getVNodeType(vNode) === 'element';
  }

  function vConstructComponents(vNew, vOld) {
    if (isVNodeComponent(vNew)) {
      if (isVNodeComponent(vOld) && vNew.type === vOld.type) {
        vNew.componentInstance = vOld.componentInstance;
      } else {
        const Component = vNew.type;
        vNew.componentInstance = new Component(vNew.props);
        vNew.componentInstance.vTree = vNew;
      }
    }
    if (isVNodeElement(vNew)) {
      vNew.children.forEach((vChild, index) => {
        const vTwin = isVNodeElement(vOld) ? vOld.children[index] : null;
        vConstructComponents(vChild, vTwin);
      });
    }
  }

  function vRender(vNode, vOld) {
    vConstructComponents(vNode, vOld);
    return vCreate(vNode);
  }

  class Component {
    constructor(props) {
      const defaultProps = Object.getPrototypeOf(this).constructor.defaultProps || {};
      this.props = { ...defaultProps, ...objectWithoutUndefined(props) };
      this.state = this.state || {};
      this.$dom = null;
      this.vTree = null;
      this.isMounted = false;
    }

    componentDidMount() {}
    componentDidUpdate() {}
    shouldComponentUpdate() { return true; }

    setState(data) {
      this.state = {
        ...this.state,
        ...data,
      };
      this.update();
    }

    update(props) {
      const shouldUpdate = this.shouldComponentUpdate(props);
      if (props) this.props = props;
      if (!shouldUpdate) return;

      const vNode = this.render();
      const $actual = vRender(vNode, this.vTree);
      this.vTree = vNode;

      this.$dom.parentNode.replaceChild($actual, this.$dom);
      this.$dom = $actual;

      this.componentDidUpdate();
    }

    mount() {
      const vNode = this.render();
      this.$dom = vRender(vNode);
      this.vTree = vNode;
      this.isMounted = true;

      this.componentDidMount();
      this.componentDidUpdate();
    }
  }

  function register($node, vNode) {
    const $app = vRender(vNode);
    $node.appendChild($app);
  }

  return {
    vDom,
    Component,
    register,
  }
});
