define([
  'lib/virtual-dom',
  'components/WatchlistButton',
  'lib/utils',
], (VirtualDom, WatchlistButton, { capitalize, formatNumber }) => {

  class MediaItem extends VirtualDom.Component {
    render() {
      const { id, title, description, viewers, isLive, watchlist, location, labels } = this.props;
      const { city, country } = location;
      const headline = title.split(' ').map(capitalize).join(' ');
      const isAdded = !!watchlist.find(({ id: other }) => id === other);
      return (
        <li class="media-item">
          <h3>{headline}</h3>
          <p class="description">{description}</p>
          {isLive ? <p class="ribbon"><span>Live</span></p> : null}
          <p class="location">
            <i class="fa fa-map-marker" aria-hidden="true" />
            {`${city}, ${country}`}
          </p>
          <p class="viewers"><i class="fa fa-eye" aria-hidden="true" />{formatNumber(viewers)}</p>
          <p class="tags">{labels.join(', ')}</p>
          <WatchlistButton id={id} isAdded={isAdded} />
        </li>
      );
    }
  }

  return MediaItem;
});
