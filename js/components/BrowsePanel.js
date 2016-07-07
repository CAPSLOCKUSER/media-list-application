define([
  'lib/virtual-dom',
  'actions/media-list',
  'stores/store',
  'components/Filter',
  'components/Sorter',
  'lib/utils',
], (VirtualDom, MediaListActions, Store, Filter, Sorter, { objectWithoutUndefined }) => {

  class BrowsePanel extends VirtualDom.Component {

    constructor(props) {
      super(props);
      this.state = {
        ...props.browsingData,
      };
    }

    componentDidUpdate() {
      const { setToNormalBrowse, setToWatchlist } = MediaListActions;
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
        const { sortBy, sortDirection, filter, browseMode } = Store.getState();
        this.setState(objectWithoutUndefined({ sortBy, sortDirection, filter, browseMode }));
      });
    }

    shouldComponentUpdate(newProps, newState) {
      return newState.browseMode !== this.state.browseMode;
    }

    render() {
      const { sortBy, sortDirection, filter, browseMode } = this.state;
      const isWatchlist = browseMode === 'watchlist';
      return (
        <div class="browse-panel">
          <ul class="menu">
            <li><a href="#" class={"menu-home" + (!isWatchlist ? " active" : "")}>Home</a></li>
            <li><a href="#" class={"menu-watchlist" + (isWatchlist ? " active" : "")}>Watchlist</a></li>
          </ul>
          {!isWatchlist ?
            <div class="presenting-options">
              <Sorter sortBy={sortBy} sortDirection={sortDirection}/>
              <Filter filter={filter} />
            </div>
          : null}
        </div>
      );
    }
  }

  return BrowsePanel;
});
