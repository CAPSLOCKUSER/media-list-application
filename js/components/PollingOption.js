define([
  'constants',
  'lib/virtual-dom',
  'stores/store',
  'actions/options',
], ({ POLLING_OPTION, DEFAULT_POLLING }, VirtualDom, Store, { setPollInterval }) => {

  class PollingOption extends VirtualDom.Component {

    static defaultProps = {
      pollingInterval: DEFAULT_POLLING,
    };

    componentDidUpdate() {
      $(this.$dom).on('change', event => {
        const value = $(event.currentTarget).find('input:checked').val();
        Store.dispatch(setPollInterval(parseInt(value, 10)));
      });
    }

    render() {
      const radios = POLLING_OPTION.map(({ interval, name }) => (
        <div>
          <input
            type="radio"
            name="polling-interval"
            value={interval}
            checked={interval === this.props.pollingInterval}
            id={'polling-' + interval}
          />
          <label for={'polling-' + interval}>{name}</label>
        </div>
      ));
      return (
        <form class="options">
          <div class="container">
            <h2>Polling interval:</h2>
            <div>{radios}</div>
          </div>
        </form>
      );
    }
  }

  return PollingOption;
});
