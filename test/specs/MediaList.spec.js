define(['components/MediaList', 'sample-big-response.js'], (MediaList, SampleResponse) => {

  describe('MediaList Component', () => {
    let mediaList;
    const props = {
      list: SampleResponse,
      filter: 'none',
      sortBy: 'id',
      sortDirection: 'asc',
      watchlist: [],
      browseMode: 'home'
    };

    beforeEach(() => {
      mediaList = new MediaList(props);
    });

    it('should be a `class`', () => {
      expect(typeof MediaList).toBe('function');
      expect(typeof mediaList).toBe('object');
    });

    it('should render the default virtual dom', () => {
      const render = mediaList.render();
      const { children } = render;
      expect(render.type).toBe('ul');
      expect(Array.isArray(children)).toBe(true);
      expect(children.length).toBe(40);
      expect(children.every((child) => (typeof child.type === 'function'))).toBe(true);
      expect(children.every((child) => (child.type.toString().indexOf('function MediaItem(') === 0))).toBe(true);
    });

    it('should render accordingly the `filter` property', () => {
      mediaList.props = Object.assign({}, props, { filter: 'live-channel' });
      expect(mediaList.render().children.length).toBe(13);

      mediaList.props = Object.assign({}, props, { filter: 'offline-channel' });
      expect(mediaList.render().children.length).toBe(10);

      mediaList.props = Object.assign({}, props, { filter: 'video' });
      expect(mediaList.render().children.length).toBe(17);
    });


    it('should render accordingly the `sortBy` and `sortDirection` properties', () => {
      const isMonotonChange = isAsc => (value, index, array) => {
        if (isAsc) {
          return index === 0 || String(array[index - 1]) < String(value);
        } else {
          return index === 0 || String(array[index - 1]) > String(value);
        }
      };
      const mapProperty = property => ({ props }) => props[property];
      let render;

      mediaList.props = Object.assign({}, props, { sortBy: 'title' });
      render = mediaList.render();
      expect(render.children.map(mapProperty('title')).every(isMonotonChange(true))).toBe(true);

      mediaList.props = Object.assign({}, props, { sortBy: 'title', sortDirection: 'desc' });
      render = mediaList.render();
      expect(render.children.map(mapProperty('title')).every(isMonotonChange(false))).toBe(true);
    });

    it('should handle the `watchlist` feature correctly', () => {

      mediaList.props = Object.assign({}, props, {
        watchlist: [{ id: 142022 }, { id: 142023 }, { id: 142024 }, { id: 142025 }],
        browseMode: 'watchlist'
      });
      const render = mediaList.render();
      expect(render.type).toBe('ul');
      expect(render.children.length).toBe(4);
      expect(render.children.map(({ props: { id }}) => id)).toEqual([ 142022, 142023, 142024, 142025 ]);
    });
  });
});
