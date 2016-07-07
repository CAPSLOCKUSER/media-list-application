define([
  'lib/virtual-dom',
  'components/MediaHolder',
  'components/PollingOption',
  'components/BrowsePanel',
  'components/ErrorMessage',
  'stores/store',
], (VirtualDom, MediaHolder, PollingOption, BrowsePanel, ErrorMessage, Store) => {

  class App extends VirtualDom.Component {
    render() {
      const appState = Store.getState();
      return (
        <div class="container">
          <h1>Media list application</h1>
          <PollingOption pollingInterval={appState.pollingInterval} />
          <BrowsePanel browsingData={appState} />
          <MediaHolder url={this.props.url} appState={appState} />
          <ErrorMessage />
        </div>
      );
    }
  }

  return App;
});
