define([
  'jquery',
  'lib/virtual-dom',
  'stores/store',
  'actions/media-list',
  'constants',
  'lib/utils',
], ($, VirtualDom, Store, { filterMediaList }, { FILTER_TYPES }, { humanize }) => {

  class Filter extends VirtualDom.Component {

    static defaultProps = {
      filter: 'none',
    };

    componentDidUpdate() {
      $(this.$dom).on('change', event => {
        const value = $(event.currentTarget).find('input:checked').val();
        Store.dispatch(filterMediaList(value));
      });
    }

    shouldComponentUpdate() { return false; }

    render() {
      const radios = FILTER_TYPES.map(value => (
        <div class="filter-option">
          <input
            type="radio"
            name="content-filter"
            value={value}
            checked={this.props.filter === value}
            id={'filter-' + value}
          />
          <label for={'filter-' + value}>
            {humanize(value)}
          </label>
        </div>
      ));
      return (
        <form>
          <h3>Filter</h3>
          <div class="horizontal-group radio-group">{radios}</div>
        </form>
      );
    }
  }

  return Filter;
});
