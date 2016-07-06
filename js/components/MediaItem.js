define([
  'lib/virtual-dom',
  'components/WatchlistButton',
], (VirtualDom, WatchlistButton) => {

  class MediaItem extends VirtualDom.Component {
    render() {
      const { id, title, type, viewers, isLive, watchlist } = this.props;
      const isAdded = !!watchlist.find(({ id: other }) => id === other);
      return (
        <li class="media-item">
          <h4>Title: {title}</h4>
          <p>Type: {type}</p>
          <p>Is Live: {isLive}</p>
          <p>ID: {id}</p>
          <p>Viewers: {viewers}</p>
          <WatchlistButton id={id} isAdded={isAdded} />
        </li>
      );
    }
  }

  return MediaItem;
});
