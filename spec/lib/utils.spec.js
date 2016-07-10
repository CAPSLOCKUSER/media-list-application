const getAMD = require('get-amd-module');

describe('Utils', () => {
  let Utils;

  beforeEach(() => {
    Utils = getAMD('lib/utils');
  });

  it('be ok', () => {

    expect(Object.keys(Utils).length).toBe(7);
  });
});
