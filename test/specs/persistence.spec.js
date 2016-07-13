define(['lib/persistence', 'constants'], ({ getInitialState, saveState }, { STORAGE_ID }) => {

  describe('Persistence', () => {
    let store;

    beforeEach(() => {
      store = {
        [STORAGE_ID]: JSON.stringify({
          foo: 'bar',
          baz: 'foobar'
        })
      };

      spyOn(localStorage, 'getItem').and.callFake((key) => {
        return store[key];
      });
      spyOn(localStorage, 'setItem').and.callFake((key, value) => {
        return store[key] = value + '';
      });
    });

    it('should provide `getInitialState` and `saveState` functions', () => {
      expect(typeof getInitialState).toBe('function');
      expect(typeof saveState).toBe('function');
    });

    it('should return the correct initial state from LocalStorage with `getInitialState`', () => {
      const initState = getInitialState();
      expect(initState).toEqual(JSON.parse(store[STORAGE_ID]));
    });

    it('should save the correct state to LocalStorage with `saveState`', () => {
      saveState({ a: 10, b: 20 });
      expect(JSON.parse(store[STORAGE_ID])).toEqual({ a: 10, b: 20 });
    });
  });
});
