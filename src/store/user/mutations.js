export default {
  setUsers(state, { users }) {
    state.users = users;
  },

  addUser(state, { user }) {
    state.users.push(user);
  },

  updateUser(state, { id, user }) {
    const index = state.users.findIndex(item => item.id === id);
    if (index !== -1) {
      state.users[index] = user;
    }
  },

  deleteUser(state, { id }) {
    const index = state.users.findIndex(item => item.id === id);
    if (index !== -1) {
      state.users.splice(index, 1);
    }
  }
};
