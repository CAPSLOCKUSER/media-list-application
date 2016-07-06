define(['constants'], ({ STORAGE_ID }) => {
  function getInitialState() {
    try {
      const data = localStorage.getItem(STORAGE_ID) || '{}';
      return JSON.parse(data);
    } catch (error) {
      console.error('error while read localStorage', error);
      return {};
    }
  }

  function saveState(state = {}) {
    try {
      localStorage.setItem(STORAGE_ID, JSON.stringify(state));
    } catch (error) {
      console.error('localStorage save failed (safari private mode, eh?)', error);
    }
  }

  return {
    getInitialState,
    saveState,
  };
});
