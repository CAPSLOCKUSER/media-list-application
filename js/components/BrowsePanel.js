define([
  'lib/virtual-dom',
  'actions/media-list',
  'stores/store',
  'components/Filter',
  'components/Sorter',
], (VirtualDom, { setToNormalBrowse, setToWatchlist }, Store, Filter, Sorter) => {

  class BrowsePanel extends VirtualDom.Component {

    componentDidUpdate() {
      const $this = $(this.$dom);
      $this.find('ul a.menu-home').on('click', event => {
        //$this.find('> div').show();
        Store.dispatch(setToNormalBrowse());
      });
      $this.find('ul a.menu-watchlist').on('click', event => {
        //$this.find('> div').hide();
        Store.dispatch(setToWatchlist());
      });

      Store.subscribe(() => {
        const { browseMode } = Store.getState();
        this.setState({ browseMode });
      });
    }

    render() {
      const { sortBy, sortDirection, filter, browseMode } = this.props.browsingData;
      const isWatchlist = (this.state.browseMode || browseMode) === 'watchlist';
      return (
        <div>
          <ul>
            <li><a href="#" class="menu-home">Home</a></li>
            <li><a href="#" class="menu-watchlist">Watchlist</a></li>
          </ul>
          {!isWatchlist ?
            <div class="presenting-options">
              <Sorter sortBy={sortBy} sortDirection={sortDirection}/>
              <Filter filter={ filter } />
            </div>
          : null}
        </div>
      )
    }
  }

  return BrowsePanel;
});
