define([
  'lib/virtual-dom',
  'components/MediaItem'
], (VirtualDom, MediaItem) => {

  class MediaList extends VirtualDom.Component {
    render() {
      const { list, filter, sortBy, sortDirection, watchlist, browseMode } = this.props;
      const isWatchlist = browseMode === 'watchlist';

      const filterMediaItem = ({ type, isLive, id }) => {
        const filterMode = !isWatchlist ? filter : 'watchlist';
        switch (filterMode) {
          case 'live-channel':
            return isLive && type === 'channel';
          case 'offline-channel':
            return !isLive && type === 'channel';
          case 'video':
            return type === 'recorded';
          case 'watchlist':
            return !!findWatchlistItem(id);
          default:
            return true;
        }
      };

      const findWatchlistItem = id => {
        return watchlist.find(({ id: other }) => other === id);
      };

      const sortByWatchlistAddedDate = (a, b) => {
        const addedA = findWatchlistItem(a.id).date;
        const addedB = findWatchlistItem(b.id).date;

        return addedA - addedB;
      };

      const sortMediaItem = (a, b) => {
        // makes stable sort
        if (a[sortBy] === b[sortBy]) {
          return a.id - b.id;
        }

        const local = a[sortBy] < b[sortBy] ? -1 : 1;

        return sortDirection === 'asc' ? local : -local;
      };

      const items = list
        .filter(filterMediaItem)
        .sort(browseMode === 'watchlist' ? sortByWatchlistAddedDate : sortMediaItem)
        .map(item => <MediaItem {...item} watchlist={watchlist} />);

      return (
        <ul class="media-list">
          {items.length === 0 ? (
            <li class="media-item">
              {isWatchlist ? 'Your watchlist is empty!' : 'Loading...'}
            </li>
          ) : items}
        </ul>
      );
    }
  }

  return MediaList;
});
