export default {
  priceForMonth(state) {
    return date => {
      const index = state.settings.findIndex(item => item.date === date);
      if (index !== -1) {
        return state.settings[index].price;
      }
      return {
        firstPeriod: 6,
        lastPeriod: 6,
        mastit: 7.5
      };
    };
  },

  isSetPriceForMonth(state) {
    return date => {
      const index = state.settings.findIndex(item => item.date === date);
      return index !== -1;
    };
  }
};
