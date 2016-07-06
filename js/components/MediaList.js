define([
  'lib/virtual-dom',
  'components/MediaItem'
], (VirtualDom, MediaItem) => {

  class MediaList extends VirtualDom.Component {
    render() {
      const { list, filter, sortBy, sortDirection, watchlist } = this.props;

      const filterMediaItem = ({ type, isLive }) => {
        switch (filter) {
          case 'live-channel':
            return isLive && type === 'channel';
          case 'offline-channel':
            return !isLive && type === 'channel';
          case 'video':
            return type === 'recorded';
          default:
            return true;
        }
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
        .sort(sortMediaItem)
        .map(item => <MediaItem {...item} watchlist={watchlist} />);

      return (
        <ul class="media-list">{items}</ul>
      );
    }
  }

  return MediaList;
});
