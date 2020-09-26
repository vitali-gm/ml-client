export default {
  setUsers(state, { users }) {
    state.users = users;
  },

  addUser(state, { user }) {
    state.users.push(user);
  },

  updateUser(state, { id, data }) {
    const index = state.users.findIndex(item => item._id === id);
    if (index !== -1) {
      state.users[index].name = data.name;
      state.users[index].lastName = data.lastName;
    }
  },

  updateRecords(state, { id, data }) {
    const index = state.users.findIndex(item => item._id === id);
    if (index !== -1) {
      state.users[index].records = data.records;
    }
  },
  updateGreasiness(state, { id, data }) {
    const index = state.users.findIndex(item => item._id === id);
    if (index !== -1) {
      state.users[index].greasiness = data.greasiness;
    }
  },

  updateCountCows(state, { id, data }) {
    const index = state.users.findIndex(item => item._id === id);
    if (index !== -1) {
      state.users[index].countCows = data.countCows;
    }
  },

  deleteUser(state, { id }) {
    const index = state.users.findIndex(item => item._id === id);
    if (index !== -1) {
      state.users.splice(index, 1);
    }
  }
};
