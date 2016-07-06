define([
  'lib/virtual-dom',
  'components/MediaHolder',
  'components/PollingOption',
  'components/Filter',
  'components/Sorter',
  'stores/store',
], (VirtualDom, MediaHolder, PollingOption, Filter, Sorter, Store) => {

  class App extends VirtualDom.Component {
    render() {
      const { filter, sortBy, sortDirection, pollingInterval } = Store.getState();
      return (
        <div class="container">
          <h1>Media list application</h1>
          <PollingOption pollingInterval={pollingInterval} />
          <Sorter sortBy={sortBy} sortDirection={sortDirection} />
          <Filter filter={filter} />
          <MediaHolder url={this.props.url} />
        </div>
      );
    }
  }

  return App;
});
