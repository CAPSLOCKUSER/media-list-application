define(['lib/utils'], (Utils) => {

  describe('Utils', () => {

    describe('mirror', () => {
      it('should mirror input object', () => {
        const { mirror } = Utils;
        const mirrored = mirror({
          FOO: null,
          BAR: null,
        });
        expect(mirrored).toEqual({
          FOO: 'FOO',
          BAR: 'BAR',
        });
      });
    });

    describe('filterFromArrayByID', () => {
      it('should filter out element by ID', () => {
        const { filterFromArrayByID } = Utils;
        const array = [
          { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }
        ];
        expect(filterFromArrayByID(array, 3)).toEqual([
          { id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }
        ]);
      });
      it('should not modify the input array', () => {
        const { filterFromArrayByID } = Utils;
        const array = [{ id: 4 }, { id: 5 }];
        filterFromArrayByID(array, 5);
        expect(array).toEqual([{ id: 4 }, { id: 5 }]);
      });
      it('should only test for ID property, not if the element === ID', () => {
        const { filterFromArrayByID } = Utils;
        const array = [1, 2, 3];
        expect(filterFromArrayByID(array, 2)).toEqual([1, 2, 3]);
      });
      it('should not modify the array if ID isn`t present', () => {
        const { filterFromArrayByID } = Utils;
        const array = [
          { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }
        ];
        expect(filterFromArrayByID(array, 42)).toEqual([
          { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }
        ]);
      });
    });

    describe('objectWithoutUndefined', () => {
      it('should remove the properties with the value `undefined`', () => {
        const { objectWithoutUndefined } = Utils;
        expect(objectWithoutUndefined({ foo: 4, baz: false, bar: undefined })).toEqual({ foo: 4, baz: false });
        expect(objectWithoutUndefined({ foo: 5 })).toEqual({ foo: 5 });
        expect(objectWithoutUndefined({})).toEqual({});
        expect(objectWithoutUndefined({ a: undefined, b: undefined })).toEqual({});
      });
      it('should not modify the input object', () => {
        const { objectWithoutUndefined } = Utils;
        const obj = {
          foo: 'aaa',
          bar: undefined,
          baz: 'bbb'
        };
        objectWithoutUndefined(obj);
        expect(obj).toEqual({
          foo: 'aaa',
          bar: undefined,
          baz: 'bbb'
        });
      });
      it('should leave `null` values', () => {
        const { objectWithoutUndefined } = Utils;
        expect(objectWithoutUndefined({ a: null })).toEqual({ a: null });
      });
    });

    describe('firstLetterUppercase', () => {
      it('should capitalize the first letter of given string', () => {
        const { firstLetterUppercase } = Utils;
        expect(firstLetterUppercase('foobar')).toBe('Foobar');
        expect(firstLetterUppercase('')).toBe('');
      });
      it('should not capitalise other word beginnings', () => {
        const { firstLetterUppercase } = Utils;
        expect(firstLetterUppercase('foobar bar baz')).toBe('Foobar bar baz');
      });
    });

    describe('capitalize', () => {
      it('should capitalize given text', () => {
        const { capitalize } = Utils;
        expect(capitalize('foo bar bar foobar')).toBe('Foo Bar Bar Foobar');
        expect(capitalize('Foo')).toBe('Foo');
        expect(capitalize('')).toBe('');
      });
    });

    describe('humanize', () => {
      it('should remove dashes and capitalize words in input', () => {
        const { humanize } = Utils;
        expect(humanize('foo-bar-baz')).toBe('Foo Bar Baz');
      });
    });

    describe('formatNumber', () => {
      it('should place commas to every third gaps', () => {
        const { formatNumber } = Utils;
        expect(formatNumber(1234)).toBe('1,234');
        expect(formatNumber(0)).toBe('0');
        expect(formatNumber(42)).toBe('42');
        expect(formatNumber(367)).toBe('367');
        expect(formatNumber(1e6)).toBe('1,000,000');
        expect(formatNumber(1e10)).toBe('10,000,000,000');
      });
    });

    describe('validateObject', () => {
      it('should detect, if input object values on root level isn`t matching with types from schema', () => {
        const { validateObject } = Utils;
        const schema = {
          foo: 'number',
          bar: 'string',
          baz: 'boolean',
        };
        const validator = validateObject(schema);
        expect(validator({ foo: 10, bar: 'foobar', baz: false })).toBe(true);
        expect(validator({ foo: 10 })).toBe(false);
        expect(validator({ bar: 10 })).toBe(false);
      });
      it('should work recursively with object values on root', () => {
        const { validateObject } = Utils;
        const validator = validateObject({
          foo: 'number',
          bar: { a: 'boolean', b: 'number', c: { x: 'number', y: 'string' } },
          baz: ['string'],
        });
        expect(validator({
          foo: 10,
          bar: {
            a: true,
            b: 30,
            c: {
              x: 43,
              y: 'foo',
            }
          },
          baz: ['foo', 'bar'],
        })).toBe(true);
        expect(validator({
          foo: 10,
          bar: {
            a: true,
            b: 30,
            c: {
              x: 'THIS IS WRONG',
              y: 'foo',
            }
          },
          baz: ['foo', 'bar'],
        })).toBe(false);
      });
      it('should work if there is a `null` on root level at input object', () => {
        const { validateObject } = Utils;
        const validator = validateObject({ foo: 'number' });
        expect(validator({ foo: null })).toBe(false);
      });
    });
  });

});
