define(['api', 'test/sample-small-response'], (Api, SampleResponse) => {

  describe('Api', () => {
    const { poll } = Api;

    describe('reject', () => {
      let result;

      beforeEach((done) => {
        spyOn($, 'ajax').and.callFake(() => {
          const d = $.Deferred();
          d.resolve({});
          return d.promise();
        });

        poll('/foo/bar')
          .then(() => {
            throw new Error('this should not happen, when response isn`t an array');
          })
          .catch(error => {
            result = error;
            done();
          });
      });

      it('should reject promise, if server response isn`t an array', () => {
        expect(result).toEqual('Server response is not an array');
      });
    });

    describe('accept', () => {
      let result;

      beforeEach((done) => {
        spyOn($, 'ajax').and.callFake(() => {
          const d = $.Deferred();
          d.resolve(SampleResponse);
          return d.promise();
        });

        poll('/foo/bar')
          .then(list => {
            result = list;
            done();
          })
          .catch(() => {
            throw new Error('should not throw, when response is an array');
          });
      });

      it('should return with an array', () => {
        expect(Array.isArray(result)).toBe(true);
      });

      it('should filter out the incorrect array elements', () => {
        const filteredResponse = [{
          "id": 142012,
          "type": "recorded",
          "isLive": false,
          "title": "esse incididunt culpa aute mollit ex",
          "description": "Magna amet reprehenderit sunt .\r\n",
          "viewers": 1059569,
          "picture": "http:\/\/placehold.it\/32x32",
          "location": {
            "country": "Tajikistan",
            "city": "Farmers",
            "coordinates": { "latitude": -4.793548, "longitude": 138.265869 }
          },
          "labels": ["proident", "amet", "dolor", "aliquip"]
        }];
        expect(Array.isArray(result)).toEqual(true);
        expect(result).toEqual(filteredResponse);
      });
    });
  });
});
