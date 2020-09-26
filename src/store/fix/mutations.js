export default {
  setFix(state, { settings }) {
    state.fix = settings;
  },

  addFix(state, { data }) {
    state.fix.push(data);
  },

  updateFix(state, { data }) {
    const index = state.fix.findIndex(item => item.date === data.date);
    if (index !== -1) {
      state.fix[index].value = data.value;
      state.fix[index].date = data.date;
    }
  }
};
