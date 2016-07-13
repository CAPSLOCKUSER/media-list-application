define(['lib/virtual-dom'], (VirtualDom) => {

  describe('VirtualDom', () => {

    it('should provide a Component class', () => {
      const { Component } = VirtualDom;
      const comp = new Component({ foo: 'bar' });

      expect(typeof Component).toBe('function');
      expect(typeof comp).toBe('object');
      expect(comp.props).toEqual({ foo: 'bar' });
    });

    it('should append a correct HTML to the document, based on a virtual DOM structure', () => {
      const virtualDom = {
        "type": "ul",
        "props": {},
        "children": [
          { "type": "li", "props": {}, "children": ["foo"] },
          { "type": "li", "props": {}, "children": ["bar"] },
          { "type": "li", "props": {}, "children": ["baz"] }
        ]
      };

      const { register } = VirtualDom;

      const testDiv = document.createElement('div');
      testDiv.style.display = 'none';
      testDiv.id = 'testDiv';
      document.body.appendChild(testDiv);
      register(document.getElementById('testDiv'), virtualDom);

      const renderedHTML = document.getElementById('testDiv').innerHTML;
      expect(renderedHTML).toBe('<ul><li>foo</li><li>bar</li><li>baz</li></ul>');
    });
  });
});
