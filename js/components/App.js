define(['lib/virtual-dom'], (VirtualDom) => {

  class App extends VirtualDom.Component {
    render() {
      return (
        <h1>Media list application</h1>
      );
    }
  }

  return App;
});
