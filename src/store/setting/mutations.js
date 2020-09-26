export default {
  setSettings(state, { settings }) {
    state.settings = settings;
  },

  addSetting(state, { data }) {
    state.settings.push(data);
  },

  updateSetting(state, { data }) {
    const index = state.settings.findIndex(item => item.date === data.date);
    if (index !== -1) {
      state.settings[index].price = data.price;
      state.settings[index].date = data.date;
    }
  }
};
