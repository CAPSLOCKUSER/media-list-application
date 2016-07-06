define(['lib/Utils'], ({ mirror }) => {
  const SORTABLE_PROPERTIES = ['id', 'title', 'description', 'viewers'];
  const FILTER_TYPES = ['none', 'live-channel', 'offline-channel', 'video'];
  const ACTION_TYPES = mirror({
    'UPDATE_MEDIA_LIST': null,
    'FILTER': null,
    'SORT': null,
    'ADD_TO_WATCHLIST': null,
    'REMOVE_FROM_WATCHLIST': null,
    'SET_POLL_INTERVAL': null,
  });
  const STORAGE_ID = 'MEDIA_LIST_APP_STORAGE';

  return {
    SORTABLE_PROPERTIES,
    FILTER_TYPES,
    ACTION_TYPES,
    STORAGE_ID,
  };
});
