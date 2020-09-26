export default {
  setSettings(state, { settings }) {
    state.settings = settings;
  },

  addSetting(state, { data }) {
    state.settings.push(data);
  },

  updateSetting(state, { data }) {
    const index = state.settings.findIndex(item => item.id === data.id);
    if (index !== -1) {
      state.settings[index] = data;
    }
  }
};
