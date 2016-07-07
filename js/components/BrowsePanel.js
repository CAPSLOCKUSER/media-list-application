define([
  'lib/virtual-dom',
  'actions/media-list',
  'stores/store',
  'components/Filter',
  'components/Sorter',
], (VirtualDom, { setToNormalBrowse, setToWatchlist }, Store, Filter, Sorter) => {

  class BrowsePanel extends VirtualDom.Component {

    constructor(props) {
      super(props);
      this.state = {
        browseMode: props.browsingData.browseMode,
      };
    }

    componentDidUpdate() {
      const $this = $(this.$dom);
      $this.find('ul a.menu-home').on('click', event => {
        event.preventDefault();
        Store.dispatch(setToNormalBrowse());
      });
      $this.find('ul a.menu-watchlist').on('click', event => {
        event.preventDefault();
        Store.dispatch(setToWatchlist());
      });
    }

    componentDidMount() {
      Store.subscribe(() => {
        const { browseMode } = Store.getState();
        this.setState({ browseMode });
      });
    }

    shouldComponentUpdate(newProps, newState) {
      return newState.browseMode !== this.state.browseMode;
    }

    render() {
      const { sortBy, sortDirection, filter } = this.props.browsingData;
      const isWatchlist = this.state.browseMode === 'watchlist';
      return (
        <div class="browse-panel">
          <ul class="menu">
            <li><a href="#" class={"menu-home" + (!isWatchlist ? " active" : "")}>Home</a></li>
            <li><a href="#" class={"menu-watchlist" + (isWatchlist ? " active" : "")}>Watchlist</a></li>
          </ul>
          {!isWatchlist ?
            <div class="presenting-options">
              <Sorter sortBy={sortBy} sortDirection={sortDirection}/>
              <Filter filter={ filter } />
            </div>
          : null}
        </div>
      );
    }
  }

  return BrowsePanel;
});
