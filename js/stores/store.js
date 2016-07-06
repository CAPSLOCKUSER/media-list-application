define([
  'lib/storage',
  'lib/persistence',
  'reducers/reducer',
], (Storage, { getInitialState, saveState }, reducer) => {

  const store = Storage.create(reducer(getInitialState), saveState);

  return store;
});
