define(() => {
  function mirror(obj) {
    return Object.keys(obj).reduce((prev, curr) => {
      return {
        ...prev,
        [curr]: curr,
      };
    }, {});
  }

  function removeFromArrayByID(array, id) {
    return array.filter(({ id: otherID }) => otherID !== id);
  }

  function objectWithoutUndefined(obj) {
    const result = {};
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] !== 'undefined') {
        result[key] = obj[key];
      }
    });
    return result;
  }

  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

  function humanize(text) {
    return text.split('-').map(capitalize).join(' ');
  }

  function throttle(fn, minTime = 1000) {
    let called = null;
    return (...data) => {
      const now = new Date().getDate();
      if (!called || called + minTime < now) {
        called = now;
        fn.apply(null, data);
      }
    }
  }

  function formatNumber(number) {
    const chars = number.toString().split('');
    const mirrorIndex = chars.length - 1;
    return chars.reduceRight((prev, curr, index) => {
      return (index - mirrorIndex) % 3 === 0 ? `${curr},${prev}` : `${curr}${prev}`;
    });
  }

  return {
    mirror,
    removeFromArrayByID,
    objectWithoutUndefined,
    capitalize,
    humanize,
    throttle,
    formatNumber,
  };
});
