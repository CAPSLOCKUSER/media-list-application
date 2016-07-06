define(['constants'], ({ ACTION_TYPES }) => {
  function addToWatchlist(id) {
    return {
      type: ACTION_TYPES.ADD_TO_WATCHLIST,
      date: new Date().getTime(),
      id,
    };
  }

  function removeFromWatchlist(id) {
    return {
      type: ACTION_TYPES.REMOVE_FROM_WATCHLIST,
      id,
    };
  }

  return {
    addToWatchlist,
    removeFromWatchlist,
  };
});
