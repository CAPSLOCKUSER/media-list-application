define([
  'lib/virtual-dom',
  'components/MediaHolder',
  'components/PollingOption',
  'components/BrowsePanel',
  'components/ErrorMessage',
  'stores/store',
], (VirtualDom, MediaHolder, PollingOption, BrowsePanel, ErrorMessage, Store) => {

  class App extends VirtualDom.Component {
    componentDidMount() {
      $(this.$dom).on('click', 'a.toggle-settings', event => {
        event.preventDefault();
        $('form.options').slideToggle(500);
      })
    }

    render() {
      const appState = Store.getState();
      return (
        <div class="app">
          <div class="container">
            <h1 class="title">
              Media list application
              <a href="#" class="toggle-settings"><i class="fa fa-cog"/></a>
            </h1>
          </div>
          <PollingOption pollingInterval={appState.pollingInterval}/>
          <div class="container">
            <BrowsePanel browsingData={appState}/>
            <MediaHolder url={this.props.url} appState={appState}/>
            <ErrorMessage />
          </div>
        </div>
      );
    }
  }

  return App;
});
