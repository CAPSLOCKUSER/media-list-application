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
  const POLLING_OPTION = [
    { interval: 1500, name: 'Very fast' },
    { interval: 3000, name: 'Fast' },
    { interval: 6000, name: 'Normal' },
    { interval: 12000, name: 'Slow' },
  ];
  const DEFAULT_POLLING = 6000;

  return {
    SORTABLE_PROPERTIES,
    FILTER_TYPES,
    ACTION_TYPES,
    STORAGE_ID,
    POLLING_OPTION,
    DEFAULT_POLLING,
  };
});
