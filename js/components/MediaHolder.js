define([
  'lib/virtual-dom',
  'components/MediaList',
  'components/ErrorMessage',
  'stores/store',
  'actions/media-list',
  'lib/utils',
  'constants',
], (VirtualDom, MediaList, ErrorMessage, Store, { addToMediaList }, { DEFAULT_POLLING }) => {

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
          timeout: 5000,
        })
        .done(response => {
          console.log('ajax success'/*, response*/); // eslint-disable-line no-console
          Store.dispatch(addToMediaList(response));
        })
        .fail(() => {
          ErrorMessage.showMessage(`Polling error. Will continue.`)
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