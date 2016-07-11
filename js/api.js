define(['jquery', 'lib/utils'], ($, { validateObject }) => {

  function checkResponseShape(list) {
    if (!Array.isArray(list)) {
      throw new Error('Invalid data response from server');
    }
  }

  const validator = validateObject({
    id: 'number',
    type: 'string',
    isLive: 'boolean',
    title: 'string',
    description: 'string',
    viewers: 'number',
    picture: 'string',
    location: {
      country: 'string',
      city: 'string',
      coordinates: { latitude: 'number', longitude: 'number' },
    },
    labels: ['string'],
  });

  function poll(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
          url,
          dataType: 'jsonp',
          timeout: 5000,
        })
        .then(data => {
          checkResponseShape(data);
          const correctList = data.filter(validator);
          resolve(correctList);
        }, reject);
    });
  }

  return {
    poll,
  }
});
