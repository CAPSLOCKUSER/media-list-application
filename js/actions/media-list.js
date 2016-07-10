define(['constants'], ({ ACTION_TYPES }) => {
  function addToMediaList(list) {
    return {
      type: ACTION_TYPES.UPDATE_MEDIA_LIST,
      list,
    };
  }

  function filterMediaList(filter) {
    return {
      type: ACTION_TYPES.FILTER,
      filter,
    };
  }

  function sortMediaList(sortBy, sortDirection) {
    return {
      type: ACTION_TYPES.SORT,
      sortBy,
      sortDirection,
    };
  }

  function setToNormalBrowse() {
    return {
      type: ACTION_TYPES.SET_BROWSE_MODE,
      browseMode: 'normal',
    };
  }

  function setToWatchlist() {
    return {
      type: ACTION_TYPES.SET_BROWSE_MODE,
      browseMode: 'watchlist',
    };
  }

  return {
    addToMediaList,
    filterMediaList,
    sortMediaList,
    setToNormalBrowse,
    setToWatchlist,
  };
});
