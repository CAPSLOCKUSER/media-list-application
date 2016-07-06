define([
  'lib/virtual-dom',
  'components/MediaHolder',
  'components/Filter',
  'components/Sorter',
  'stores/store',
], (VirtualDom, MediaHolder, Filter, Sorter, Store) => {

  class App extends VirtualDom.Component {

    shouldComponentUpdate() { return true; }

    render() {
      const { filter, sortBy, sortDirection } = Store.getState();
      return (
        <div class="container">
          <h1>Media list application</h1>
          <Sorter sortBy={sortBy} sortDirection={sortDirection} />
          <Filter filter={filter} />
          <MediaHolder url={this.props.url} />
        </div>
      );
    }
  }

  return App;
});
