define(['constants'], ({ ACTION_TYPES }) => {
  function setPollInterval(pollingInterval) {
    return {
      type: ACTION_TYPES.SET_POLL_INTERVAL,
      pollingInterval,
    };
  }

  return {
    setPollInterval,
  };
});
