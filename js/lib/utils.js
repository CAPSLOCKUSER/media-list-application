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

  function formatNumber(number) {
    const chars = number.toString().split('');
    const mirrorIndex = chars.length - 1;
    return chars.reduceRight((prev, curr, index) => {
      return (index - mirrorIndex) % 3 === 0 ? `${curr},${prev}` : `${curr}${prev}`;
    });
  }

  const validateObject = schema => object => {
    return Object.keys(schema).every(key => {
      if (typeof schema[key] === 'object') {
        if (typeof schema[key] !== typeof object[key]) {
          return false;
        }
        return validateObject(schema[key])(object[key] || {});
      } else {
        return typeof object[key] === schema[key];
      }
    });
  };

  return {
    mirror,
    removeFromArrayByID,
    objectWithoutUndefined,
    capitalize,
    humanize,
    formatNumber,
    validateObject,
  };
});
