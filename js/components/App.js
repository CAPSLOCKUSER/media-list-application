define([
  'lib/virtual-dom',
  'components/MediaHolder',
  'components/PollingOption',
  'components/BrowsePanel',
  'stores/store',
], (VirtualDom, MediaHolder, PollingOption, BrowsePanel, Store) => {

  class App extends VirtualDom.Component {
    render() {
      const { pollingInterval, ...browsingData } = Store.getState();
      return (
        <div class="container">
          <h1>Media list application</h1>
          <PollingOption pollingInterval={pollingInterval} />
          <BrowsePanel browsingData={browsingData} />
          <MediaHolder url={this.props.url} />
        </div>
      );
    }
  }

  return App;
});
