define(() => {

  function create(reducer, saveState) {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
      state = reducer(state, action);
      saveState(state);
      listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    };

    dispatch({});

    return { getState, dispatch, subscribe };
  }

  return {
    create,
  };
});
