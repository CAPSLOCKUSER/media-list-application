define([
  'constants',
  'lib/utils'
], ({ ACTION_TYPES: at }, { filterFromArrayByID }) => {

  return getInitialState => (state = getInitialState(), action = {}) => {
    switch (action.type) {
      case at.SET_BROWSE_MODE:
        return {
          ...state,
          browseMode: action.browseMode,
        };

      case at.UPDATE_MEDIA_LIST:
        const availableIDs = action.list.map(({ id }) => id);
        const watchlist = (state.watchlist || []).filter(({ id }) => availableIDs.includes(id));
        return {
          ...state,
          list: action.list,
          watchlist,
        };

      case at.FILTER:
        return {
          ...state,
          filter: action.filter,
        };

      case at.SORT:
        return {
          ...state,
          sortBy: action.sortBy,
          sortDirection: action.sortDirection,
        };

      case at.ADD_TO_WATCHLIST:
        const filteredWatchlist = filterFromArrayByID(state.watchlist || [], action.id);
        return {
          ...state,
          watchlist: filteredWatchlist.concat([{ id: action.id, date: action.date }]),
        };

      case at.REMOVE_FROM_WATCHLIST:
        return {
          ...state,
          watchlist: filterFromArrayByID(state.watchlist || [], action.id),
        };

      case at.SET_POLL_INTERVAL:
        return {
          ...state,
          pollingInterval: action.pollingInterval,
        };

      default:
        return state;
    }
  };
});
