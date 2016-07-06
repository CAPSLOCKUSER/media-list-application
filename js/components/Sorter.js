define([
  'constants',
  'lib/virtual-dom',
  'stores/store',
  'actions/media-list',
  'lib/utils'
], ({ SORTABLE_PROPERTIES }, VirtualDom, Store, { sortMediaList }, { capitalize }) => {

  class Sorter extends VirtualDom.Component {

    static defaultProps = {
      sortBy: 'id',
      sortDirection: 'asc',
    };

    componentDidUpdate() {
      const $this = $(this.$dom);
      $this.on('change', () => {
        const sortBy = $this.find('#sort-property').val();
        const sortDirection = $this.find('[name="sort-direction"]:checked').val();
        Store.dispatch(sortMediaList(sortBy, sortDirection));
      });
    }

    shouldComponentUpdate() { return false; }

    render() {
      const { sortBy, sortDirection } = this.props;
      const options = SORTABLE_PROPERTIES.map(item => (
        <option value={item} selected={sortBy === item}>
          {item.length <=2 ? item.toUpperCase() : capitalize(item)}
        </option>
      ));
      return (
        <form>
          <h2>Sort</h2>
          <select name="sort-property" id="sort-property">
            {options}
          </select>
          <label>
            <input
              type="radio"
              name="sort-direction"
              value="asc"
              checked={sortDirection === 'asc'}
            />
            Asc
          </label>
          <label>
            <input
              type="radio"
              name="sort-direction"
              value="desc"
              checked={sortDirection === 'desc'}
            />
            Desc
          </label>
        </form>
      );
    }
  }

  return Sorter;
});
