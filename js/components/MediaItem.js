define([
  'lib/virtual-dom',
  'components/WatchlistButton',
  'lib/utils',
], (VirtualDom, WatchlistButton, { formatNumber }) => {

  class MediaItem extends VirtualDom.Component {

    static defaultProps = {
      title: '',
    };

    render() {
      const { id, title, description, viewers, isLive, watchlist, location, labels } = this.props;
      const { city, country } = location;
      const isAdded = !!watchlist.find(({ id: other }) => id === other);
      return (
        <li class="media-item">
          <h3>{title}</h3>
          <p class="description">{description}</p>
          {isLive ? (
            <p class="ribbon">
              <span>
                <i class="fa fa-video-camera" aria-hidden="true" />Live
              </span>
            </p>
          ): null}
          <div class="clearfix">
            <p class="location alignleft">
              <i class="fa fa-map-marker" aria-hidden="true" />
              {`${city}, ${country}`}
            </p>
            <p class="viewers alignright"><i class="fa fa-eye" aria-hidden="true" />{formatNumber(viewers)}</p>
          </div>

          <div class="clearfix">
            <p class="tags alignleft">{labels.join(', ')}</p>
            <WatchlistButton class="alignright" id={id} isAdded={isAdded} />
          </div>
        </li>
      );
    }
  }

  return MediaItem;
});
