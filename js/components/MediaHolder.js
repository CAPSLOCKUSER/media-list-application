define([
  'lib/virtual-dom',
  'components/MediaList',
  'stores/store',
  'actions/media-list',
  'lib/utils',
  'constants',
], (VirtualDom, MediaList, Store, { addToMediaList }, { objectWithoutUndefined }, { DEFAULT_POLLING }) => {

  class MediaHolder extends VirtualDom.Component {

    state = {
      list: [],
      filter: 'none',
      sortBy: 'id',
      sortDirection: 'asc',
      watchlist: [],
      pollingInterval: DEFAULT_POLLING,
    };

    poll = () => {
      $.ajax({
          url: this.props.url,
          dataType: 'jsonp',
        })
        .done(response => {
          console.log('ajax success'/*, response*/);
          Store.dispatch(addToMediaList(response));
        })
        .fail((msg) => {
          console.log('ajax failed', msg); // eslint-disable-line no-console
        })
        .always(() => {
          setTimeout(this.poll, this.state.pollingInterval);
        });
    };

    componentDidMount() {
      Store.subscribe(() => {
        const { list, filter, sortBy, sortDirection, watchlist, pollingInterval } = Store.getState();
        this.setState(objectWithoutUndefined({ list, filter, sortBy, sortDirection, watchlist, pollingInterval }));
      });
      this.poll();
    }

    render() {
      return (
        <div>
          <MediaList {...this.state} />
        </div>
      );
    }
  }

  return MediaHolder;
});
