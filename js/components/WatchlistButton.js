define([
  'lib/virtual-dom',
  'stores/store',
  'actions/watchlist',
], (VirtualDom, Store, { addToWatchlist, removeFromWatchlist }) => {

  class WatchlistButton extends VirtualDom.Component {

    componentDidUpdate() {
      $(this.$dom).on('click', () => {
        const { id, isAdded } = this.props;
        const action = isAdded ? removeFromWatchlist : addToWatchlist;
        Store.dispatch(action(id));
      });
    }

    render() {
      const { isAdded } = this.props;
      return (
        <button class={isAdded ? 'watchlist-button added' : 'watchlist-button'}>
          {isAdded ? 'Remove from watchlist' : 'Add to watchlist'}
        </button>
      );
    }
  }

  return WatchlistButton;
});
