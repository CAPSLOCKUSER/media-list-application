const getAMD = require('get-amd-module');

describe('Api', () => {
  let Api;

  beforeEach(() => {
    Api = getAMD('api');
  });

  xdescribe('poll', () => {

    afterEach(() => {
      $.ajax.restore();
    });

    it('makes a GET request for todo items', () => {
      /*const { poll } = Api;
      sinon.stub($, 'ajax');
      //getTodos(42, sinon.spy());
      poll('/foo/bar')
        .then(list => {

        })
        .catch(() => {

        })
        .then(() => {

        });*/
      assert($.ajax.calledWithMatch({ url: "/todo/42/items" }));
    });
  });
});
