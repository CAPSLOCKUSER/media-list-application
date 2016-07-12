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

    describe('removeFromArrayByID', () => {
      it('should remove element by ID');
      it('should not modify the input array');
      it('should not remove item, if it`s actually the ID');
      it('should not modify the array if ID isn`t present');
    });

    describe('objectWithoutUndefined', () => {
      it('should remove the properties with the value `undefined`');
      it('should not modify the input object');
      it('should not touch `null` values');
      it('should leave every non-undefined values untouched');
    });

    describe('capitalize', () => {
      it('should convert string`s first letter uppercase');
      it('should not capitalise other word beginnings');
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
