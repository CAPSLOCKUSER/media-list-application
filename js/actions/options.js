define(['constants'], ({ ACTION_TYPES }) => {
  function setPollInterval(interval) {
    return {
      type: ACTION_TYPES.SET_POLL_INTERVAL,
      interval,
    };
  }

  return {
    setPollInterval,
  };
});
