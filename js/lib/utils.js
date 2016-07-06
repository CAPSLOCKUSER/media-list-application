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

  return {
    mirror,
    removeFromArrayByID,
    objectWithoutUndefined,
    capitalize,
    humanize,
  };
});
