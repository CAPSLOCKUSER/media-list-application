define([
  'lib/virtual-dom',
  'api',
  'components/MediaList',
  'components/ErrorMessage',
  'stores/store',
  'actions/media-list',
  'lib/utils',
  'constants',
], (
  VirtualDom,
  { poll },
  MediaList,
  ErrorMessage,
  Store,
  { addToMediaList },
  { objectWithoutUndefined },
  { DEFAULT_POLLING }
) => {

  class MediaHolder extends VirtualDom.Component {

    constructor(props) {
      super(props);
      this.state = {
        list: [],
        filter: 'none',
        sortBy: 'id',
        sortDirection: 'asc',
        watchlist: [],
        pollingInterval: DEFAULT_POLLING,
        ...objectWithoutUndefined(props.appState),
      }
    }

    componentDidMount() {
      Store.subscribe(() => {
        this.setState(Store.getState());
      });

      this.pollMediaList();
    }

    pollMediaList = () => {
      poll(this.props.url)
        .then(list => {
          console.log('ajax success', list.length);
          Store.dispatch(addToMediaList(list));
        })
        .catch((error) => {
          console.error('Error at polling:', error);
          ErrorMessage.showMessage('Polling error. Will continue.');
        })
        .then(() => {
          setTimeout(() => this.pollMediaList(this.props.url), this.state.pollingInterval);
        });
    };

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
