define([
  'lib/virtual-dom',
  'components/MediaList',
  'stores/store',
  'actions/media-list',
  'lib/utils',
], (VirtualDom, MediaList, Store, { addToMediaList }, { objectWithoutUndefined }) => {

  class MediaHolder extends VirtualDom.Component {

    state = {
      list: [],
      filter: 'none',
      sortBy: 'id',
      sortDirection: 'asc',
      watchlist: [],
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
          setTimeout(this.poll, 10000);
        });
    };

    componentDidMount() {
      Store.subscribe(() => {
        const { list, filter, sortBy, sortDirection, watchlist } = Store.getState();
        this.setState(objectWithoutUndefined({ list, filter, sortBy, sortDirection, watchlist }));
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
