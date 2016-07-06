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

    constructor(props) {
      super(props);
      this.state = {
        ...props.appState,
      }
    }

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
        this.setState(Store.getState());
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
