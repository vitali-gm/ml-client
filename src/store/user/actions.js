import axios from "axios";

const url = "http://localhost:3000/user";

export default {
  async listUsers({ commit }) {
    await axios.get(url).then(response => {
      commit("setUsers", { users: response.data });
    });
  },

  async create({ commit }, { data }) {
    await axios.post(url, data).then(response => {
      commit("addUser", response.data);
      window.location.href = "/";
    });
  },

  async update({ commit }, { id, user }) {
    await axios.put(`${url}/${id}`, user).then(response => {
      if (response.status === 200) {
        commit("updateUser", { id, user });
      }
    });
  },

  async delete({ commit }, { id }) {
    await axios.delete(`${url}/${id}`).then(response => {
      if (response.status === 200) {
        commit("deleteUser", { id });
      }
    });
  },

  async sort({ commit }, { users }) {
    await axios.post(`${url}/update-all`, users).then(response => {
      if (response) {
        commit("setUsers", { users: response.data });
      }
    });
  }
};
