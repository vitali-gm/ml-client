export default {
  allLitersForMonth(state) {
    return date => {
      return state.users.reduce((accumulator, currentValue) => {
        if (currentValue.records) {
          accumulator += currentValue.records.reduce((acc, curr) => {
            const rDate = new Date(curr.date).toISOString().substr(0, 7);
            if (date === rDate) {
              acc += parseFloat(curr.liters);
            }
            return acc;
          }, 0);
        }
        return accumulator;
      }, 0);
    };
  },

  allNewLitersForMonth(state) {
    return date => {
      let res = 0;
      state.users.forEach(item => {
        let liters = 0;
        let greasiness = 0;
        if (item.records) {
          liters = item.records.reduce((acc, curr) => {
            const rDate = new Date(curr.date).toISOString().substr(0, 7);
            if (date === rDate) {
              acc += parseFloat(curr.liters);
            }
            return acc;
          }, 0);
        }

        if (item.greasiness) {
          const index = item.greasiness.findIndex(oneGreasiness => {
            return date === oneGreasiness.date;
          });
          if (index !== -1) {
            greasiness = parseFloat(item.greasiness[index].value);
          }
        }
        res += (liters * greasiness) / 3.4;
      });
      return parseFloat(res).toFixed(0);
    };
  },

  allNewLitersForMonthPeriod(state) {
    return date => {
      let res = {
        firstPeriod: 0,
        lastPeriod: 0
      };

      state.users.forEach(item => {
        let liters = {};
        let greasiness = 0;
        if (item.records) {
          liters = item.records.reduce(
            (acc, curr) => {
              const rDate = new Date(curr.date).toISOString().substr(0, 7);
              if (date === rDate) {
                const day = new Date(curr.date).toISOString().substr(8, 2);
                if (parseInt(day) <= 15) {
                  acc.firstPeriod += parseFloat(curr.liters);
                } else {
                  acc.lastPeriod += parseFloat(curr.liters);
                }
              }
              return acc;
            },
            {
              firstPeriod: 0,
              lastPeriod: 0
            }
          );
        }

        if (item.greasiness) {
          const index = item.greasiness.findIndex(oneGreasiness => {
            return date === oneGreasiness.date;
          });
          if (index !== -1) {
            greasiness = parseFloat(item.greasiness[index].value);
          }
        }

        res.firstPeriod += (liters.firstPeriod * greasiness) / 3.4;
        res.lastPeriod += (liters.lastPeriod * greasiness) / 3.4;
      });
      return {
        firstPeriod: parseFloat(res.firstPeriod),
        lastPeriod: parseFloat(res.lastPeriod)
      };
    };
  },

  litersForDate(state) {
    return date => {
      let liters = 0;

      state.users.forEach(item => {
        if (item.records) {
          liters += item.records.reduce((acc, curr) => {
            // const rDate = new Date(curr.date).toISOString().substr(0, 7);
            if (date === curr.date) {
              acc += parseFloat(curr.liters);
            }
            return acc;
          }, 0);
        }
      });
      return liters;
    };
  }
};
